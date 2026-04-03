from django.db import models
from django.contrib.auth import get_user_model
from production.models import Production
from phonenumber_field.modelfields import PhoneNumberField
User=get_user_model()
'''
Card - Модель корзины и Card_item - товаров в корзине. Корзина связана с моделью пользователя внешним ключем.
Статус "Ожидает" или "Арендован", может быть только одна активная корзина со статусом "Ожидает", а предыдущие 
заказы имеют тип "Арендован". Card_item - имеет связь "один к многим" с моделью продуктов. 
'''
class Card(models.Model):
    user=models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        related_name='card',
        verbose_name='Корзина'
    )
    created=models.DateTimeField(auto_now_add=True,verbose_name="Дата создания")
    STATUS_CARD=(
        ('pending','Ожидает'),
        ('rented','Арендован')
    )
    status=models.CharField(max_length=20,choices=STATUS_CARD,default='pending',verbose_name='Статус')
    start_date = models.DateField(verbose_name='Дата начала аренды',null=True,blank=True)
    end_date = models.DateField(verbose_name='Дата конца аренды',null=True,blank=True)
    phone = PhoneNumberField(verbose_name="Номер телефона",blank=True,null=True)
    def __str__(self):
        return f"Корзина {self.id} - {self.user}"

class Card_item(models.Model):
    card=models.ForeignKey(
        Card,
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        related_name='card_item',
        verbose_name='Корзина'
    )
    product=models.ForeignKey(
        Production,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='card_item',
        verbose_name='Продукт в корзине'
    )
    added=models.DateTimeField(auto_now_add=True,verbose_name='Дата добавления')
    quantity=models.PositiveIntegerField(default=1,verbose_name='Количество')
    @property
    def price_by_quantity(self):
        return self.quantity*self.product.price
    class Meta:
        ordering=('added',)
        verbose_name='Товар в корзине'
        verbose_name_plural='Товары в корзине'
    def __str__(self):
        return f"{self.product.name} x {self.quantity}"


