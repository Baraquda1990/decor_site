from django.contrib import admin
from .models import Production,ProductionImage
'''
Регистрация модели товаров в админке сайта. 
Для добавления нескольких изображений используется ProductImageInline
'''
class ProductImageInline(admin.TabularInline):
    model=ProductionImage
    extra=0

@admin.register(Production)
class ProductionAdmin(admin.ModelAdmin):
    list_display=('name','price','subcatalog','data_added')
    inlines=[ProductImageInline]
    prepopulated_fields={'slug':('name',)}

