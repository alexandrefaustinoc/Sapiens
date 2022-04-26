from django.contrib import admin
from .models import Event, Room, Program, User, AutorizedCpfs, AddIcon, SelectIcon



@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug":("name",)} 
    
     
@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug":("name",)}
    

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    #Quais são os atributos da postagem que irá aparecer
    fields = ("first_name","last_name","email", "is_superuser")

    list_display = ["first_name","last_name","email", "is_superuser"]
    
    


admin.site.register(Program)

#admin.site.register(AutorizedCpfs)

#admin.site.register(AddIcon)
#admin.site.register(SelectIcon)


"""from django.contrib import admin
from myapp.models import Article

@admin.action(description='Mark selected stories as published')
def make_published(modeladmin, request, queryset):
    queryset.update(status='p')

class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'status']
    ordering = ['title']
    actions = [make_published]

admin.site.register(Article, ArticleAdmin)"""