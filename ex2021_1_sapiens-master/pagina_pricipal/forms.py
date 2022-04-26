
from allauth.account.forms import SignupForm
from allauth.account.forms import EmailAddress

from django import forms
from .models import *
from django.shortcuts import redirect

from allauth.account  import views


           

class CustomSignupForm(SignupForm):
    #Usamos aqui a coluna 'lastname' do allauth para introduzirmos o CURSO do usuário


    first_name = forms.CharField(max_length=200, label='', widget=forms.TextInput(attrs={"placeholder": "Nome"}),)
    last_name = forms.CharField(max_length=200, label='', widget=forms.TextInput(attrs={"placeholder": "Curso"}),)
    email = forms.CharField(max_length=200, label='', widget=forms.TextInput(attrs={"placeholder": "Email INSTITUCIONAL", "type": "se deu certo tshow"}),)
    
    


    def save(self, request):

        user = super(CustomSignupForm, self).save(request)

        return user

        

            