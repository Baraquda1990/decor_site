from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from .models import Catalog
from .serializers import CatalogSerializer
'''
Api для предоставления списка каталога с субкаталогом
'''
class CatalogList(ListAPIView):
    queryset=Catalog.objects.prefetch_related('subcatalog').all()
    serializer_class=CatalogSerializer
    permission_classes = [AllowAny]