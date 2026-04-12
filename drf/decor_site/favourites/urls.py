from django.urls import path
from .api import CreateFavourites,ListFavoritesID,DestroyFavorites,ListFavourites
'''
Эндпоинты:
    favourites_create - добавление товара в избранное
    favourites_list_id - предоставление товаров в избранном с id
    favourites_destroy/<int:production> - удаление товара с Избранное
    favourites - предоставление товаров в избранном с детальной информацией о товарах
'''
urlpatterns = [
    path('favourites_create/',CreateFavourites.as_view()),
    path('favourites_list_id/',ListFavoritesID.as_view()),
    path('favourites_destroy/<int:production>',DestroyFavorites.as_view()),
    path('favourites/',ListFavourites.as_view()),

]