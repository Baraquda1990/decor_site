from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from production.models import Production
from production.serializers import ProductionListBySubCatalogSerializer
from rest_framework import filters
from rest_framework.pagination import PageNumberPagination
'''
Аpi для поиска товара - SearchApi с пагинацией.
'''
class MyPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100
    
class SearchApi(ListAPIView):
    queryset=Production.objects.all()
    permission_classes=[AllowAny]
    serializer_class=ProductionListBySubCatalogSerializer
    filter_backends=[filters.SearchFilter]
    search_fields=['name','description']
    pagination_class = MyPagination