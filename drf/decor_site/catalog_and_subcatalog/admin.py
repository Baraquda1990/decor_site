from django.contrib import admin
from .models import Catalog,SubCatalog
'''
Настройка модели Каталога и СубКаталога в админ панели
'''
@admin.register(Catalog)
class Catalog_admin(admin.ModelAdmin):
    list_display=('name',)
    list_display_links=('name',)

@admin.register(SubCatalog)
class SubCatalog_admin(admin.ModelAdmin):
    list_display=('name','catalog','image_url','slug')
    list_display_links=('name',)
    prepopulated_fields={'slug':('name',)}
