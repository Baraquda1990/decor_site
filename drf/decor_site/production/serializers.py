from .models import Production,ProductionImage
from rest_framework import serializers
from catalog_and_subcatalog.serializers import SubCatalogSerializer
from card.models import Card_item
'''
Серимализаторы для предоставления товаров.
ProductionListBySubCatalogSerializer - для отображения в каталоге.
ProductionImageSerializer - для нескольких изображений в товаре.
ProductionSerializer - для карточки товара.
'''
class ProductionListBySubCatalogSerializer(serializers.ModelSerializer):
    cart_quantity = serializers.SerializerMethodField()
    class Meta:
        model=Production
        fields=['id','name','slug','price','nominal','image_url','width','length','height','diameter','unit','cart_quantity']
    def get_cart_quantity(self, obj):
        request = self.context.get('request')
        user = request.user if request else None
        if not user or not user.is_authenticated:
            return 0
        item = Card_item.objects.filter(
            card__user=user,
            card__status='pending',
            product=obj
        ).first()
        print(item)
        return item.quantity if item else 0
        
class ProductionImageSerializer(serializers.ModelSerializer):
    class Meta:
        model=ProductionImage
        fields=['id','image_url']

class ProductionSerializer(serializers.ModelSerializer):
    cart_quantity = serializers.SerializerMethodField()
    images=ProductionImageSerializer(many=True,read_only=True)
    subcatalog=SubCatalogSerializer(many=False,read_only=True)
    class Meta:
        model=Production
        fields=['id','name','slug','price','nominal','image_url','description','width','length','height','diameter','unit','subcatalog','images','cart_quantity']
    def get_cart_quantity(self, obj):
        request = self.context.get('request')
        user = request.user if request else None
        if not user or not user.is_authenticated:
            return 0
        item = Card_item.objects.filter(
            card__user=user,
            card__status='pending',
            product=obj
        ).first()
        return item.quantity if item else 0
