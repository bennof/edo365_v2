from django.contrib.auth.models import AbstractUser

# override user model (always useful)
class User(AbstractUser): 
    pass
