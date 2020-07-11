# Makefile for edo365
# written by Benno Falkner




all: build



# install
install:  
	
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
	npm install --xprefix ./edo365/js_src/

node_dev:
	npm run dev --prefix ./edo365/js_src/ 
	
node_build:
	npm run build --prefix ./edo365/js_src/

# build all
build: .venv
	pipenv run python manage.py makemigration
	python manage.py collectstatic


# prepare
.venv: 
	mkdir -p .venv
	pipenv install -r requirements.txt
	mkdir -p static
	mkdir -p media
