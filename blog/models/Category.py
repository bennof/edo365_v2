from django.db import models

from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.snippets.models import register_snippet



@register_snippet
class Category(models.Model):
    name = models.CharField(max_length=255)
    desc = RichTextField(blank=True)

    panels = [
        FieldPanel('name'),
        FieldPanel('desc'),
    ]

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'page categories'