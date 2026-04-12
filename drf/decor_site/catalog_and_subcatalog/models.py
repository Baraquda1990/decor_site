from django.db import models
from django.conf import settings
'''
Модель Каталога и СубКаталога. 
Один Каталог может иметь несколько СубКаталогов
'''
class Catalog(models.Model):
    name=models.CharField(max_length=100,verbose_name="Название категории")
    class Meta:
        ordering=('name',)
        verbose_name='Каталог'
        verbose_name_plural='Каталог'
    def __str__(self):
        return self.name


class SubCatalog(models.Model):
    catalog=models.ForeignKey(
        Catalog,
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        related_name='subcatalog',
        verbose_name='Каталог' 
        )
    name=models.CharField(max_length=100,verbose_name="Название категории")
    slug=models.SlugField(verbose_name='URL',max_length=255,blank=True,unique=True,null=True)
    image=models.ImageField(upload_to="uploads/catalog")
    def image_url(self):
        if self.image:
            return f'{settings.WEBSITE_URL}{self.image.url}'
        else:
            return ''
    class Meta:
        ordering=('name',)
        verbose_name='СубКаталог'
        verbose_name_plural='СубКаталог'
    def __str__(self):
        return self.name
