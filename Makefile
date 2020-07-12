# Makefile for edo365
# written by Benno Falkner




all: build



# install
install:  
	chown -R www-data:www-data $(shell pwd)
	# systemd
	./systemd.service.sh /etc/systemd/system/edo365.service www-data www-data
	systemctl start edo365
	# nginx
	./site.nginx.sh /etc/nginx/sites-available/edo365.nginx "www2.edo365.de www.edo365.de edo365.de"
	ln -s /etc/nginx/sites-available/edo365.nginx /etc/nginx/sites-enabled/
	nginx -t
	systemctl restart nginx

enable-ssl:
	certbot --nginx -d www2.edo365.de -d www.edo365.de -d edo365.de
	

	
# run server
run: build
	pipenv run python manage.py migrate
	pipenv run gunicorn --bind localhost:8080 edo365.wsgi

# run dev server 
rundev: 
	pipenv run python manage.py makemigrations
	pipenv run python manage.py migrate
	pipenv run python manage.py runserver

# node js stuff
node_init:
	npm init --prefix ./edo365/js_src/
	npm install --prefix ./edo365/js_src/

node_dev:
	npm run dev --prefix ./edo365/js_src/ 
	
node_build:
	npm run build --prefix ./edo365/js_src/

# create superuser account
superuser:
	pipenv run python manage.py createsuperuser 

# build all
build: init
	pipenv run python manage.py makemigrations
	pipenv run python manage.py migrate
	pipenv run python manage.py collectstatic

# prepare
init: .venv edo365/static/jsdox.js

.venv: 
	mkdir -p .venv
	pipenv install -r requirements.txt
	mkdir -p static
	mkdir -p media

edo365/static/jsdox.js: edo365/js_src/node_modules
	mkdir -p edo365/static/js
	mkdir -p edo365/static/css
	npm run build --prefix ./edo365/js_src/

edo365/js_src/node_modules:
	#npm init --prefix ./edo365/js_src/
	npm install --prefix ./edo365/js_src/ --unsafe-perm node-sass