from django.urls import path
from .api import FeedbackCreateView
'''
Эндпоинт создания записи в модели обратной связи
'''
urlpatterns = [
    path('feedback/', FeedbackCreateView.as_view(), name='feedback-create'),
]