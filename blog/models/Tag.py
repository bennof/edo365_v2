from django.db import models
from modelcluster.fields import ParentalKey
from taggit.models import TaggedItemBase



class Tag(TaggedItemBase):
    content_object = ParentalKey(
        'Page',
        related_name='tagged_items',
        on_delete=models.CASCADE
    )