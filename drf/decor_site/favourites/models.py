from django.db import models
from production.models import Production
from django.contrib.auth import get_user_model
User=get_user_model()
'''
Модель добавления товара в избранное. Относится к пользователям и продуктам один к многим.
'''
class Favourites(models.Model):
    production=models.ForeignKey(
        Production,
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        related_name='favourites',
        verbose_name='Товар'
    )
    user=models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        related_name='favourites',
        verbose_name='Пользователь'
    )
    created=models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering=('created',)
        verbose_name='Избранное'
        verbose_name_plural='Избранное'
        unique_together = ('user', 'production')