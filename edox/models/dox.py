import datetime

from django.db import models
from django import forms

from modelcluster.fields import ParentalManyToManyField
from modelcluster.contrib.taggit import ClusterTaggableManager

from wagtail.core.models import Page 

from wagtail.search import index
from wagtail.admin.edit_handlers import FieldPanel, StreamFieldPanel, MultiFieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel

from .tag import Tag

#from  ..fields import EDoxField

from .. import blocks
from wagtail.core import blocks as wt_blocks
from wagtail.core.fields import RichTextField, StreamField


class EDoX(Page): 
    date = models.DateField("Date", default=datetime.date.today)
    authors = ParentalManyToManyField('edox.Author', blank=True)

    hero = models.ForeignKey(
        'wagtailimages.Image', null=True, blank=True,
        on_delete=models.PROTECT, related_name='+'
    )
    intro = models.CharField(max_length=250)

    tags = ClusterTaggableManager(through=Tag, blank=True)
    categories = ParentalManyToManyField('edox.Category', blank=True)

    # body = EDoxField([])
    body = StreamField([
        ('text', wt_blocks.RichTextBlock()),
        ('raw', wt_blocks.RawHTMLBlock()),
        ('code', blocks.CodeBlock()),
        ('image', blocks.ImageBlock()),
        ('plot', blocks.PlotBlock()),
        ('table', blocks.TableBlock()),
        ('program', blocks.JSProgramInlineBlock()),
    ])
    # panel layout
    content_panels = Page.content_panels + [
        MultiFieldPanel([
            FieldPanel('date'),
            FieldPanel('authors', widget=forms.CheckboxSelectMultiple),
            FieldPanel('tags'),
            FieldPanel('categories', widget=forms.CheckboxSelectMultiple),
        ], heading="Blog information"),
        FieldPanel('intro'),
        ImageChooserPanel('hero'),
        StreamFieldPanel('body'),
    ]

    class Meta:
        verbose_name = "EDoX"
