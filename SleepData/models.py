from django.utils import timezone

from django.db import models

class SleepHealth(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
    ]

    person_id = models.IntegerField(primary_key=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    age = models.IntegerField()
    occupation = models.CharField(max_length=100)
    sleep_duration = models.FloatField()
    quality_sleep = models.IntegerField()
    physical_activity_level = models.IntegerField()
    stress_level = models.IntegerField()
    bmi_category = models.CharField(max_length=50)
    blood_pressure = models.CharField(max_length=10)
    heart_rate = models.IntegerField()
    daily_steps = models.IntegerField()
    sleep_disorder = models.CharField(max_length=100)
    date_added = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return str(self.person_id)
