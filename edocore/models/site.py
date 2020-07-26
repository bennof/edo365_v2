from django.db import models
from django_extensions.db.fields import AutoSlugField

from modelcluster.fields import ParentalKey
from modelcluster.models import ClusterableModel

from wagtail.admin.edit_handlers import (
    MultiFieldPanel,
    InlinePanel,
    FieldPanel,
    PageChooserPanel
)
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.core.fields import RichTextField
from wagtail.core.models import Orderable
from wagtail.snippets.models import register_snippet
from wagtail.contrib.settings.models import BaseSetting, register_setting
 
class EdoMenuItem(Orderable):
    link_title = models.CharField(
        blank=True,
        null=True,
        max_length=50
    )
    link_url = models.CharField(
        max_length=500,
        blank=True
    )
    link_page = models.ForeignKey(
        "wagtailcore.Page",
        null=True,
        blank=True,
        related_name="+",
        on_delete=models.CASCADE,
    )
    open_in_new_tab = models.BooleanField(default=False, blank=True)
 
    page = ParentalKey("EdoMenu", related_name="edo_menu_items")
 
    panels = [
        FieldPanel("link_title"),
        FieldPanel("link_url"),
        PageChooserPanel("link_page"),
        FieldPanel("open_in_new_tab"),
    ]
 
    @property
    def link(self):
        if self.link_page:
            return self.link_page.url
        elif self.link_url:
            return self.link_url
        return '#'
 
    @property
    def title(self):
        if self.link_page and not self.link_title:
            return self.link_page.title
        elif self.link_title:
            return self.link_title
        return 'Missing Title'
        

@register_snippet
class EdoMenu(ClusterableModel):
    """The main menu clusterable model."""
 
    title = models.CharField(max_length=100)
    slug = AutoSlugField(populate_from="title", editable=True)
    #slug = models.SlugField()
 
    panels = [
        MultiFieldPanel([
            FieldPanel("title"),
            FieldPanel("slug"),
        ], heading="Menu"),
        InlinePanel("edo_menu_items", label="Menu Item")
    ]
 
    def __str__(self):
        return self.title

# Store Site Settings
@register_setting
class SiteConfig(BaseSetting):
    name = models.CharField(
        max_length=64,
        default="MyWebPage")
    logo = models.ForeignKey(
        'wagtailimages.Image', null=True, blank=True,
        on_delete=models.PROTECT, related_name='+'
    )
    static_logo = models.CharField(
        max_length=128,
        blank=True)

    default_menu = models.CharField(
        max_length=64, 
        blank=True)
    show_search_in_menu = models.BooleanField(
        default=False, 
        help_text='Include a search field in menu')

    copyright = models.CharField(
        max_length=64,
        default="2020 Me")

    contact = models.EmailField(
        max_length=64,
        blank=True)

    footer_richt_text = RichTextField(blank=True)

    panels = [
        MultiFieldPanel([
            FieldPanel('name'),
            ImageChooserPanel('logo'),
            FieldPanel('static_logo'),
        ],heading="Site"),

        MultiFieldPanel([
            FieldPanel('default_menu'),
            FieldPanel('show_search_in_menu')
        ],heading="Menu"),

        MultiFieldPanel([
            FieldPanel('copyright'),
            FieldPanel('contact'),
            FieldPanel("footer_richt_text"),
        ],heading="Footer"),
    ]