# Makefile for edo365
# written by Benno Falkner


all: build



# install
install:  
	

# run dev server 
rundev: 
	pipenv run python manage.py makemigrations
	pipenv run python manage.py migrate
	pipenv run python manage.py runserver


# build all
build: 
	pipenv run python manage.py makemigrations
	pipenv run python manage.py migrate


	
# prepare
init: deps update static media

# folders
static:
	mkdir -p static
media:
	mkdir -p media

# install dependencies 
deps:
	pipenv install 


# update dependencies
update: 
