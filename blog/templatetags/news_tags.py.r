from django import template
 
from ..models import Date
 
register = template.Library()
 
 
@register.simple_tag()
def get_news(count):
    return Date.get_next(count)