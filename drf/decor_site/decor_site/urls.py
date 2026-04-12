from django.contrib import admin
from django.urls import path,re_path,include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
    path('api/',include('catalog_and_subcatalog.urls')),
    path('api/',include('production.urls')),
    path('api/',include('favourites.urls')),
    path('api/',include('card.urls')),
    path('api/',include('search.urls')),
    path('api/',include('feedback.urls')),
    path('api/',include('get_count.urls')),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
