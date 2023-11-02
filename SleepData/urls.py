from django.urls import path
from . import views

urlpatterns = [
    path('', views.sleep_data_table, name='sleep_data_table'),
]
