from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
'''
Модель обратной связи
'''
class Feedback(models.Model):
    name=models.CharField(max_length=100,verbose_name='Имя')
    phone = PhoneNumberField(verbose_name="Номер телефона",blank=False,null=False,error_messages={
        'invalid': 'Введите корректный номер телефона'
    })
    message=models.TextField(verbose_name='Сообщение')

