from django.contrib import admin
from .models import SleepHealth

@admin.register(SleepHealth)
class SleepHealthAdmin(admin.ModelAdmin):
    list_display = ['person_id', 'gender', 'age', 'occupation', 'sleep_duration',
                    'quality_sleep', 'physical_activity_level', 'stress_level',
                    'bmi_category', 'blood_pressure', 'heart_rate',
                    'daily_steps', 'sleep_disorder']

