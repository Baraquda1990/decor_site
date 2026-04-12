from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import GetCountSerializers
'''
Api для предоставления количества товара в избранном и в корзине
'''
class GetCountsView(APIView):
    def get(self, request):
        serializer = GetCountSerializers(
            instance={},
            context={'request': request}
        )
        return Response(serializer.data)