from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.fields import CharField, IntegerField
from django.urls import reverse
from django.shortcuts import  get_object_or_404




#Mudamos o nome da coluna 'Last_name' para que pudesemos usar ela para guardar a informação do cpf do ususário 
class User(AbstractUser):
    last_name = models.CharField(db_column="cpf", verbose_name='Curso', max_length = 200, blank=True)
    




#The event object. Ithink it showld be at the mvp and we will only have the sapiens event
class Event(models.Model):
    name = models.CharField(max_length=50, null=True, blank=True)
    slug = models.SlugField(max_length=200, unique=True)
    image = models.ImageField( null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    days = models.IntegerField(default=1)
                            

    def __str__(self):
        return self.name


    class Meta:
        verbose_name = 'Evento'




#ITS where the manager will set the rooms (sla plenária, encontros, boas práticas) 
class Room(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, null= True,blank=True)
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=200, unique=True)
    days = models.IntegerField(default=1)
    date = models.DateField(max_length=50)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Sala'


#This is the content of each room. This is where people will click to zoom link
class Program(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, null= True, blank=True) #many to one relationship
    name = models.CharField(max_length=100, null= True, blank=True) 
    title = models.CharField(max_length=100, null= True, blank=True)
    day = models.IntegerField(default=1)
    image = models.CharField(max_length=250, null= True, blank=True)
    date = models.DateField(max_length=50, )
    hour = models.CharField(max_length=250, null=True ,blank=True)
    link = models.CharField(max_length=1000, null= True, blank=True)


    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Atividade'

#Esse models foi criando no processo de desnvolvimento para servir de BD dos cpfs autorizados a acessar o site
class AutorizedCpfs(models.Model):
    cpf = CharField(max_length=11, default=1)

    def __str__(self):
        return self.cpf



#Here the classes to customize de site with diferent kind of icons. The icon will be at the login page, for example
class AddIcon(models.Model):
    #icon_name = models.CharField(max_lenght=20)
    all_icons = models.ImageField(upload_to='icons/')

class SelectIcon(models.Model):
    icon = models.ForeignKey(AddIcon, related_name='AddIcon', null=True,
                                 blank=True, on_delete=models.SET_NULL,
                                  verbose_name='Ícone Principal' )

