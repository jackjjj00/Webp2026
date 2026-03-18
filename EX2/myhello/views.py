from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import Post

@api_view(['GET'])
def list_post(request):
    posts = Post.objects.all().values()
    return JsonResponse(list(posts), safe=False)