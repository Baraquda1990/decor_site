from django.contrib import admin
from .models import Feedback
'''
Регистация модели обратной связи в админ панели
'''
@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display=('name','phone')
    list_display_links=('name',)
