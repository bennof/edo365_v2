from django.db import models

from wagtail.core.models import Page as WPage
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel



class Index(WPage):
    intro = RichTextField(blank=True)

    hero = models.ForeignKey(
        'wagtailimages.Image', null=True, blank=True,
        on_delete=models.PROTECT, related_name='+'
    )

    # body
    body = RichTextField(blank=True)

    content_panels = WPage.content_panels + [
        FieldPanel('intro', classname="full"),
        ImageChooserPanel('hero'),
        FieldPanel('body'),
    ]