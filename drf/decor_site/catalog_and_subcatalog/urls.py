from django.urls import path,include
from .api import CatalogList
'''
Эндпоинт предоставления списка Каталога
'''
urlpatterns = [
    path('listcatalog/',CatalogList.as_view())
]
