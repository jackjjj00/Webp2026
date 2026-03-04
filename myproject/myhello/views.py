from django.http import HttpResponse

def hello_cgu_view(request):
    return HttpResponse("Hello CGU")