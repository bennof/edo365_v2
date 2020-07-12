from .base import *

DEBUG = False
DEFAULT_PORT = "8080"
ALLOWED_HOSTS = ['*.edo365.de','localhost','127.0.0.1'] 
ADMINS = [('Benno','benno.falkner@gmail.com')]

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

try:
    SECRET_KEY
except NameError:
    SECRET_FILE = os.path.join(BASE_DIR, 'secret.txt')
    try:
        SECRET_KEY = open(SECRET_FILE).read().strip()
    except IOError:
        try:
            import random
            SECRET_KEY = ''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)') for i in range(50)])
            secret = open(SECRET_FILE, 'w')
            secret.write(SECRET_KEY)
            secret.close()
        except IOError:
            Exception('Please create a %s file with random characters \
            to generate your secret key!' % SECRET_FILE)

try:
    from .local import *
except ImportError:
    pass
