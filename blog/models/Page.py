from django.db import models
from django import forms

from modelcluster.fields import ParentalManyToManyField
from modelcluster.contrib.taggit import ClusterTaggableManager

from wagtail.core.models import Page as WPage
from wagtail.core.fields import RichTextField
from wagtail.search import index
from wagtail.admin.edit_handlers import FieldPanel, MultiFieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel

from .Tag import Tag

class Page(WPage):
    date = models.DateField("Post date")
    intro = models.CharField(max_length=250)
    tags = ClusterTaggableManager(through=Tag, blank=True)
    categories = ParentalManyToManyField('Category', blank=True)

    hero = models.ForeignKey(
        'wagtailimages.Image', null=True, blank=True,
        on_delete=models.PROTECT, related_name='+'
    )

    body = RichTextField(blank=True)

    def next(self):
        r = False
        for x in self.get_siblings().live():
            if r == True:
                return x.get_url()
            if x.get_url() == self.get_url():
                r = True
        return self.get_siblings().live()[0].get_url()

    search_fields = WPage.search_fields + [
        index.SearchField('intro'),
        index.SearchField('body'),
    ]

    content_panels = WPage.content_panels + [
        MultiFieldPanel([
            FieldPanel('date'),
            FieldPanel('tags'),
            FieldPanel('categories', widget=forms.CheckboxSelectMultiple),
        ], heading="Blog information"),
        FieldPanel('intro'),
        ImageChooserPanel('hero'),
        FieldPanel('body'),
    ]