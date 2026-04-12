from django.urls import path
from .api import AddToCartApi,CartRetrieveApi,CartUpdateApi,CheckoutApi,RemoveCartItemApi,UpdateQuantityApi,PastOrdersApi
'''
Эндпоинты корзины.
    cart - предоставление корзины
    cart/add/ - добавление товара в корзину
    cart/update/ - изменение корзины
    cart/checkout/ - оформление заказа
    cart/item/<int:pk>/ - удаление товара из корзины
    cart/item/<int:pk>/update/ - инкремент или декремент количества товара
    cart/past-orders/ - заказы, которые были оформлены
'''
urlpatterns = [
    path('cart/', CartRetrieveApi.as_view(), name='cart'),
    path('cart/add/', AddToCartApi.as_view(), name='cart-add'),
    path('cart/update/', CartUpdateApi.as_view(), name='cart-update'),
    path('cart/checkout/', CheckoutApi.as_view(), name='cart-checkout'),
    path('cart/item/<int:pk>/', RemoveCartItemApi.as_view(), name='cart-item-delete'),
    path('cart/item/<int:pk>/update/', UpdateQuantityApi.as_view()),
    path('cart/past-orders/', PastOrdersApi.as_view(), name='past-orders'),
]