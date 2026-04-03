from rest_framework import generics
from .models import Feedback
from .serializers import FeedbackSerializer
'''
Api создания записи для модели обратной связи
'''
class FeedbackCreateView(generics.CreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer