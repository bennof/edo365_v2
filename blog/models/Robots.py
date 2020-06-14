from django.db import models

from wagtail.contrib.settings.models import BaseSetting, register_setting

# Store Robots Setting in Settings
@register_setting
class Robots(BaseSetting):
    robots = models.TextField(
        help_text='Robots.txt definition',default='User-agent: *\nDisallow:\n')
