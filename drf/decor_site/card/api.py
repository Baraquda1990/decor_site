from rest_framework.generics import CreateAPIView,UpdateAPIView,RetrieveAPIView,DestroyAPIView,ListAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Card,Card_item
from .serializers import CardSerializer,AddToCartSerializer,UpdateQuantitySerializer
from rest_framework.response import Response
from rest_framework import status
'''
Api:
    AddToCartApi - для добавления товара в корзину,
    CartUpdateApi - изменения элементов корзины,
    CartRetrieveApi - предоставление корзины для пользователя,
    CheckoutApi - для проверки наличия необходимых полей и затем изменение статуса корзины на "Арендован",
    RemoveCartItemApi - удаление товара из корзины,
    UpdateQuantityApi - изменение количества товара в корзине,
    PastOrdersApi - предоставление предыдущих заказов (корзины со статусом "Арендован")
'''
class AddToCartApi(CreateAPIView):
    serializer_class = AddToCartSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        user = self.request.user
        cart, _ = Card.objects.get_or_create(
            user=user,
            status='pending'
        )
        product_id = serializer.validated_data['product_id']
        quantity = serializer.validated_data['quantity']
        item, created = Card_item.objects.get_or_create(
            card=cart,
            product_id=product_id,
            defaults={'quantity': quantity}
        )
        if not created:
            item.quantity += quantity
            item.save()

class CartUpdateApi(UpdateAPIView):
    serializer_class = CardSerializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        return Card.objects.get(
            user=self.request.user,
            status='pending'
        )

class CartRetrieveApi(RetrieveAPIView):
    serializer_class = CardSerializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        cart, _ = Card.objects.get_or_create(
            user=self.request.user,
            status='pending'
        )
        return cart
    
class CheckoutApi(UpdateAPIView):
    serializer_class = CardSerializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        return Card.objects.get(
            user=self.request.user,
            status='pending'
        )

    def update(self, request, *args, **kwargs):
        cart = self.get_object()
        if not cart.start_date or not cart.end_date:
            return Response(
                {"error": "Укажите даты"},
                status=status.HTTP_400_BAD_REQUEST
            )
        if not cart.phone:
            return Response(
                {"error": "Укажите номер телефона"},
                status=status.HTTP_400_BAD_REQUEST
            )
        '''
        for item in cart.card_item.all():
            conflict = Card_item.objects.filter(
                product=item.product,
                card__status='rented',
                card__start_date__lt=cart.end_date,
                card__end_date__gt=cart.start_date
            ).exists()

            if conflict:
                return Response(
                    {"error": f"{item.product.name} занят"},
                    status=status.HTTP_400_BAD_REQUEST
                )
        '''
        cart.status = 'rented'
        cart.save()
        Card.objects.create(user=request.user, status='pending')
        return Response({"message": "Заказ оформлен"})

class RemoveCartItemApi(DestroyAPIView):
    queryset = Card_item.objects.all()
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return super().get_queryset().filter(
            card__user=self.request.user,
            card__status='pending'
        )

class UpdateQuantityApi(UpdateAPIView):
    serializer_class = UpdateQuantitySerializer
    permission_classes = [IsAuthenticated]
    def update(self, request, *args, **kwargs):
        user = request.user
        product_id = kwargs.get('pk')
        try:
            item = Card_item.objects.get(
                card__user=user,
                card__status='pending',
                product_id=product_id
            )
        except Card_item.DoesNotExist:
            return Response(
                {"error": "Товар не найден в корзине"},
                status=404
            )
        quantity = request.data.get('quantity')
        if quantity is None:
            return Response({"error": "quantity обязателен"}, status=400)
        quantity = int(quantity)
        if quantity == 0:
            item.delete()
            return Response({"message": "Товар удалён"})
        item.quantity = quantity
        item.save()
        return Response({"message": "Количество обновлено"})

class PastOrdersApi(ListAPIView):
    serializer_class = CardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Card.objects.filter(
            user=self.request.user,
            status='rented'
        ).order_by('-created')