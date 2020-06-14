from .base import *

DEBUG = False
DEFAULT_PORT = "8080"
ALLOWED_HOSTS = ['*.edo365.de'] 
ADMINS = [('Benno','benno.falkner@gmail.com')]

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'


try:
    from .local import *
except ImportError:
    pass
