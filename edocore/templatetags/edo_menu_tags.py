from django import template
 
from ..models import EdoMenu
 
register = template.Library()

@register.simple_tag()
def get_menu(slug):
    try:
        return EdoMenu.objects.get(slug=slug)
    except:
        return []