from django.shortcuts import render, redirect 
from django.http import HttpResponse
from django.forms import inlineformset_factory
from django.contrib.auth.forms import UserCreationForm
import requests

from django.contrib.auth import authenticate, login, logout

from django.contrib import messages

from django.contrib.auth.decorators import login_required

# Create your views here.
from .models import *
from .forms import CreateUserForm

def showsignuppage(request):

	form = CreateUserForm()
	if request.method == 'POST':
		form = CreateUserForm(request.POST)
		if form.is_valid():
			form.save()
			user = form.cleaned_data.get('username')
			messages.success(request, 'Account was created for ' + user)

			return redirect('login')
			

	context = {'form':form}
	return render(request, 'signup.html', context)

def loginpage(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password =request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.info(request, 'Username OR password is incorrect')
            
    return render(request, 'login.html')

def home(request):
    context={}
   

    return render(request,'index.html',context)

def caloriescalculator(request):
    context={}
    if request.method == 'POST':
        anything = request.POST.get('anything')
        print(anything)
        url = "https://food-calorie-data-search.p.rapidapi.com/api/search"
        querystring = {"keyword":anything}

        headers = {
        'x-rapidapi-key': "29bae7c67bmsh5e33f608a0b93c4p1e42d6jsn8e4e057c974a",
        'x-rapidapi-host': "food-calorie-data-search.p.rapidapi.com"
         }
        response = requests.request("GET", url, headers=headers, params=querystring)
        # print(response.json())
        r=response.json()
        print(r[0])
        calories={
            'name':anything,
            'Energy_in_Kcal':r[0]['energ_kcal'],
            'Protein':r[0]['protein'],
            'Carbohydrates':r[0]['carbohydrt'],
            'Calcium':r[0]['calcium'],
            'Iron':r[0]['iron'],
            'Vitamin_C':r[0]['vit_c']
        }
        # for i in r[0]:
        #     print(i)
        context={'calories':calories}
    
    return render(request,"caloriescalculator.html",context)
    
def logoutpage(request):
    return redirect('login')