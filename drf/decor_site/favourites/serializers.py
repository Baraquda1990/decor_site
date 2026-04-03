from rest_framework.exceptions import ValidationError
from rest_framework import serializers
from .models import Favourites
'''
Сериализаторы Избранного и списка товаров.
'''
class FavouritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favourites
        fields = ['production']

    def validate(self, data):
        user = self.context['request'].user
        production = data['production']

        if Favourites.objects.filter(user=user, production=production).exists():
            raise ValidationError("Уже в избранном")

        return data

class FavouritesListID(serializers.ModelSerializer):
    class Meta:
        model=Favourites
        fields=['production']

