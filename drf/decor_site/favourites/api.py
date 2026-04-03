from production.serializers import ProductionListBySubCatalogSerializer
from .models import Favourites
from production.models import Production
from rest_framework.generics import ListAPIView,CreateAPIView,DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import FavouritesSerializer,FavouritesListID
'''
Api:
    CreateFavourites - добавление товара в избранное,
    ListFavoritesID - список товаров в Избранном
    DestroyFavorites - удаление товара с модели Избранного
    ListFavourites - список товаров в Избранном с вложенным сериализатором товара
'''
class CreateFavourites(CreateAPIView):
    queryset = Favourites.objects.all()
    serializer_class = FavouritesSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ListFavoritesID(ListAPIView):
    serializer_class=FavouritesListID
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        user=self.request.user
        queryset=Favourites.objects.filter(user=user)
        return queryset

class DestroyFavorites(DestroyAPIView):
    permission_classes=[IsAuthenticated]
    lookup_field = 'production'
    def get_queryset(self):
        return Favourites.objects.filter(user=self.request.user)

class ListFavourites(ListAPIView):
    permission_classes=[IsAuthenticated]
    serializer_class=ProductionListBySubCatalogSerializer
    def get_queryset(self):
        user=self.request.user
        queryset = Production.objects.filter(favourites__user=user).order_by('data_added')
        return queryset
