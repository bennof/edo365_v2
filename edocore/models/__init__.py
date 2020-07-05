from django.contrib.auth.models import AbstractUser
from django.db import models

from wagtail.contrib.settings.models import BaseSetting, register_setting

from .site import *

# Store Robots Setting in Settings
@register_setting
class RobotsTXT(BaseSetting):
    content = models.TextField(help_text='Robots.txt definition',default='User-agent: *\nDisallow:\n')
    pass


# override user model (always useful)
class User(AbstractUser): 
    pass




