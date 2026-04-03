from django.urls import path
from .api import GetCountsView
'''
Эндпоинт для предоставления количества товаров в корзине и в избранном
'''
urlpatterns = [
    path('count/', GetCountsView.as_view(), name='count'),
]