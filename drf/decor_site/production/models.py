from django.db import models
from django.conf import settings
from catalog_and_subcatalog.models import SubCatalog
'''
Модель товара для аренды. Имеет связь с субкаталогом один к многим.
Для добавление нескольких изображений исполуется модель ProductionImage
'''
class Production(models.Model):
    name=models.CharField(verbose_name='Наименование',max_length=300)
    slug=models.SlugField(verbose_name='URL',max_length=255,unique=True,blank=True,null=True)
    price=models.DecimalField(verbose_name="Цена",max_digits=10, decimal_places=2)
    image=models.ImageField(verbose_name="Изображение карточки продукции",upload_to='products/',null=True)
    subcatalog=models.ForeignKey(
        SubCatalog,
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        related_name='production',
        verbose_name='Каталог продукции'
    )
    description=models.TextField(verbose_name="Описание")
    width=models.PositiveIntegerField(verbose_name="Ширина продукции",default=0,blank=True,null=True)
    length=models.PositiveIntegerField(verbose_name="Длина продукции",default=0,blank=True,null=True)
    height=models.PositiveIntegerField(verbose_name="Высота продукции",default=0,blank=True,null=True)
    diameter=models.PositiveIntegerField(verbose_name='Диаметр продукции',default=0,blank=True,null=True)
    class Unit(models.TextChoices):
        MM='mm','миллиметры'
        SM='sm','сантиметры'
        M='m','метры'
    unit=models.CharField(verbose_name='Единица измерения',max_length=20,choices=Unit.choices,default=Unit.SM)
    class Nominal(models.TextChoices):
        RUB='rub','Рубли'
        KAZ='kaz','Тенге'
        USD='usd','Доллар'
    nominal=models.CharField(verbose_name='Номинал валюты',max_length=20,choices=Nominal.choices,default=Nominal.KAZ,null=True,blank=True)
    data_added=models.DateTimeField(auto_now_add=True)
    def image_url(self):
        if self.image:
            return f'{settings.WEBSITE_URL}{self.image.url}'
        else:
            return ''
    class Meta:
        ordering=('name',)
        verbose_name='Продукция'
        verbose_name_plural='Продукция'
    def __str__(self):
        return self.name

class ProductionImage(models.Model):
    product=models.ForeignKey(
        Production,
        on_delete=models.CASCADE,
        related_name='images'
    )
    image=models.ImageField(upload_to='products/')
    def image_url(self):
        if self.image:
            return f'{settings.WEBSITE_URL}{self.image.url}'
        else:
            return ''
    