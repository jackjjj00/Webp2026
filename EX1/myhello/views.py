from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def hello_api(request):

    name = request.GET.get('name')
    if name is None:
        return Response(
            {"data": "helloCJ"},
            status=status.HTTP_200_OK
        )
    return Response({"data": f"MYhello, {name}!"})