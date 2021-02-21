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
@login_required(login_url='login')
def home(request):
    context={}
   

    return render(request,'index.html',context)
@login_required(login_url='login')
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
            'Short_Description':r[0]['shrt_desc'],
            'Energy_in_Kcal':r[0]['energ_kcal'],
            'Protein':r[0]['protein'],
            'Carbohydrates':r[0]['carbohydrt'],
            'Calcium':r[0]['calcium'],
            'Iron':r[0]['iron'],
            'Cholestrol':r[0]['cholestrl'],
            'Vitamin_C':r[0]['vit_c'],
            'Vitamin_b6':r[0]['vit_b6'],
            'Vitamin_b12':r[0]['vit_b12'],
            'Vitamin_D':r[0]['vit_d'],
            'Vitamin_A':r[0]['vit_a_iu'],
            'Vitamin_E':r[0]['vit_e'],
            'Water':r[0]['water'],
            'Sodium':r[0]['sodium'],
            'Zinc':r[0]['zinc'],
            'Copper':r[0]['copper'],
        }
        # for i in r[0]:
        #     print(i)
        context={'calories':calories}
    
    return render(request,"caloriescalculator.html",context)
    
def logoutpage(request):
    return redirect('login')

@login_required(login_url='login')
def getrecomendation(request):
    context={}
    if request.method == 'POST':
        anything = request.POST.get('anything')
        print(anything)
        url = "https://edamam-food-and-grocery-database.p.rapidapi.com/parser"

        querystring = {"ingr":anything}

        headers = {
        'x-rapidapi-key': "29bae7c67bmsh5e33f608a0b93c4p1e42d6jsn8e4e057c974a",
        'x-rapidapi-host': "edamam-food-and-grocery-database.p.rapidapi.com"
        }

        response = requests.request("GET", url, headers=headers, params=querystring)

        # print(response.json())
        r=response.json()
        print(r['hints'][1]['food'])
        rec=[]
        for i in range(20):
            recom={
            "Label":r['hints'][i]['food']['label'],
            'Energy_Kcal':r['hints'][i]['food']['nutrients']['ENERC_KCAL'],
            'Fat':r['hints'][i]['food']['nutrients']['FAT'],
            'Protein':r['hints'][i]['food']['nutrients']['PROCNT'],
            'Total_Carbohydrates':r['hints'][i]['food']['nutrients']['CHOCDF'],
            # 'Fibre':r['hints'][i]['food']['nutrients']['FIBTG'],
            'Category':r['hints'][i]['food']['category'],
            }
            rec.append(recom)
        context={"rec":rec}
        print("hello")
        print(rec)
    return render(request,"recommendation.html",context)