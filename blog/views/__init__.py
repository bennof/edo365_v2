from django.shortcuts import render
from django.http import HttpResponse

from ..models import Robots


# create robots.txt
def robots(request):
    r = Robots.for_site(request.site)
    return HttpResponse(r.robots, content_type="text/plain")


def presenter(request):
    return HttpResponse("presenter", content_type="text/plain")
