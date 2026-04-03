from rest_framework import serializers
from .models import Feedback
'''
Сериализатор модели обратной связи
'''
class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model=Feedback
        fields="__all__"