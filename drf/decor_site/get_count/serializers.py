from rest_framework import serializers
from favourites.models import Favourites
from card.models import  Card_item
from django.db.models import Sum
'''
Сериализатор для предоставления количества товаров в корзине и в избранном. 
'''
class GetCountSerializers(serializers.Serializer):
    favourites_count = serializers.SerializerMethodField()
    card_count = serializers.SerializerMethodField()
    def get_favourites_count(self, obj):
        user = self.context['request'].user
        return Favourites.objects.filter(user=user).count()

    def get_card_count(self, obj):
        user = self.context['request'].user
        result = Card_item.objects.filter(
            card__user=user,
            card__status='pending'
        ).aggregate(total=Sum('quantity'))

        return result['total'] or 0
