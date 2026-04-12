from django.urls import path
from .api import SearchApi
'''
Эндпоинт для поиска товаров на сайте
'''
urlpatterns = [
    path('search',SearchApi.as_view())
]
