from .Page import Page

from wagtail.core.models import Page as WPage

from .Page import Page


class CategoryIndex(WPage):
    def get_context(self, request):
        # Filter by tag
        cat = request.GET.get('categories')
        pages = WPage.objects.filter(categories__name=cat)

        categories = Page.objects.all()

        # Update template context
        context = super().get_context(request)
        context['pages'] = pages
        context['tags'] = tags
        return context