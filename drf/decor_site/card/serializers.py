from rest_framework import serializers
from .models import Card, Card_item
from production.serializers import ProductionListBySubCatalogSerializer
'''
Сериализаторы:
    CardItemSerializer - товар в корзине
    CardSerializer - корзина с вложенными товарами
    AddToCartSerializer - сериализатор для проверки полей при добавлении товара
    UpdateQuantitySerializer - для изменения количества товара
'''
class CardItemSerializer(serializers.ModelSerializer):
    product = ProductionListBySubCatalogSerializer(read_only=True)
    class Meta:
        model = Card_item
        fields = ['id', 'product', 'quantity', 'price_by_quantity']

class CardSerializer(serializers.ModelSerializer):
    items = CardItemSerializer(source='card_item', many=True, read_only=True)
    class Meta:
        model = Card
        fields = [
            'id',
            'status',
            'start_date',
            'end_date',
            'items',
            'phone',
            'created'
        ]
    def get_total_price(self, obj):
        return sum(item.price_by_quantity for item in obj.card_item.all())

class AddToCartSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(default=1)

class UpdateQuantitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Card_item
        fields = ['quantity']

    def validate_quantity(self, value):
        if value < 0:
            raise serializers.ValidationError("Количество не может быть меньше 0")
        return value