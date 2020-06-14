from wagtail.core.models import Page as WPage

from .Page import Page

class TagIndex(WPage):

    def get_context(self, request):

        # Filter by tag
        tag = request.GET.get('tag')
        pages = WPage.objects.filter(tags__name=tag)

        tags = WPage.objects.all()

        # Update template context
        context = super().get_context(request)
        context['pages'] = pages
        context['tags'] = tags
        return context