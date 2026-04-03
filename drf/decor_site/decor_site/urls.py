from django.contrib import admin
from django.urls import path,re_path,include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.jwt')),
    path('',include('catalog_and_subcatalog.urls')),
    path('',include('production.urls')),
    path('',include('favourites.urls')),
    path('',include('card.urls')),
    path('',include('search.urls')),
    path('',include('feedback.urls')),
    path('',include('get_count.urls')),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
