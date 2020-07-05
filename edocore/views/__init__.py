from django.shortcuts import render
from django.http import HttpResponse
from ..models import RobotsTXT


# create robots.txt
def robots(request):
    r = RobotsTXT.for_site(request.site)
    return HttpResponse(r.content, content_type="text/plain")

