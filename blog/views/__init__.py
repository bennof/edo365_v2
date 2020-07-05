from django.shortcuts import render
from django.http import HttpResponse
from wagtail.core.models import Page as WPage
from ..models import Page




def dashboard(request):
    return HttpResponse("presenter: "+request.path, content_type="text/plain")
