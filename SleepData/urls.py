from django.urls import path
from . import views

urlpatterns = [
    path('sleep-data/', views.sleep_data_table, name='sleep_data_table'),
]
