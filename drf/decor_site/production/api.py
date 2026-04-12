from rest_framework.generics import ListAPIView,RetrieveAPIView
from rest_framework.permissions import AllowAny
from .models import Production
from .serializers import ProductionListBySubCatalogSerializer,ProductionSerializer
'''
Api:
    ProductionList - для отображения товара в каталоге
    ProductionDetail - для карточки товара
'''
class ProductionList(ListAPIView):
    serializer_class=ProductionListBySubCatalogSerializer
    permission_classes=[AllowAny]
    def get_queryset(self):
        queryset=Production.objects.all().order_by('data_added')
        slug=self.kwargs.get('subcatalog')
        if slug:
            queryset=queryset.filter(subcatalog__slug=slug)
        return queryset

class ProductionDetail(RetrieveAPIView):
    queryset=Production.objects.all().select_related('subcatalog').prefetch_related('images')
    permission_classes=[AllowAny]
    serializer_class=ProductionSerializer
    lookup_field='slug'


    