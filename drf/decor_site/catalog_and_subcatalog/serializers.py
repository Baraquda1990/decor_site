from .models import Catalog,SubCatalog
from rest_framework import serializers
'''
Сериализаторы Каталога. Сериализатор СубКаталога вложен в Каталог.
'''
class SubCatalogSerializer(serializers.ModelSerializer):
    class Meta:
        model=SubCatalog
        fields=['id','name','image_url','slug']

class CatalogSerializer(serializers.ModelSerializer):
    subcatalog=SubCatalogSerializer(many=True,read_only=True)
    class Meta:
        model=Catalog
        fields=['id','name','subcatalog']
        