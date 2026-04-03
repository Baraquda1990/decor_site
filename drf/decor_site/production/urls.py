from django.urls import path
from .api import ProductionList,ProductionDetail
'''
Эндпоинты:
    catalog - для отображения всех товаров
    catalog/<slug:subcatalog>/ - для товаров из субкаталога
    product/<slug:slug> - для карточки товара
'''
urlpatterns = [
    path('catalog/',ProductionList.as_view()),
    path('catalog/<slug:subcatalog>/',ProductionList.as_view()),
    path('product/<slug:slug>',ProductionDetail.as_view()),
]
