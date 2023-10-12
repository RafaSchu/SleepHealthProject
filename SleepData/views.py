import csv
from django.shortcuts import render, redirect
from .models import SleepHealth
from django.http import JsonResponse

def import_csv_data():
    # The path to .csv file
    file_path = "SleepHealthProject/Sleep_health_and_lifestyle_dataset.csv"

    # Use Python's csv module to read .csv data
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)

        # Loop through each row in the .csv and create a SleepHealth object
        for row in reader:
            sleep_health = SleepHealth(
                person_id=int(row['Person ID']),
                gender=row['Gender'],
                age=int(row['Age']),
                occupation=row['Occupation'],
                sleep_duration=float(row['Sleep Duration']),
                quality_sleep=int(row['Quality Sleep']),
                physical_activity_level=int(row['Physical Activity Level']),
                stress_level=int(row['Stress Level']),
                bmi_category=row['BMI Category'],
                blood_pressure=row['Blood Pressure'],
                heart_rate=int(row['Heart Rate']),
                daily_steps=int(row['Daily Steps']),
                sleep_disorder=row['Sleep Disorder']
            )
            sleep_health.save()


def sleep_data_table(request):
    # Check if the request is for DataTable
    draw = request.GET.get('draw')

    if draw:
        # Fetch the necessary parameters from request for pagination and filtering
        start = int(request.GET.get('start', 0))
        length = int(request.GET.get('length', 10))

        # Query your model
        records = SleepHealth.objects.all()[start:start + length]

        # Convert your data to the format DataTable expects
        data = [{
            'person_id': record.person_id,
            # ... [include other fields]
        } for record in records]

        # Create the final response
        response = {
            "draw": draw,
            "recordsTotal": SleepHealth.objects.count(),
            "recordsFiltered": SleepHealth.objects.count(),  # This should be the count after filters are applied
            "data": data
        }

        return JsonResponse(response)

    # If not a DataTable request, proceed as before
    data = SleepHealth.objects.all()
    return render(request, 'sleep_data_table.html', {'data': data})
