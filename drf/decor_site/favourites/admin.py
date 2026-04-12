from django.contrib import admin
from .models import Favourites
'''
Отображение модели "Избранное" в админ панели
'''
@admin.register(Favourites)
class FavouritesAdmin(admin.ModelAdmin):
    list_display=('production','user','created')
    list_display_links=('production',)

