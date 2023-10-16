from django.apps import AppConfig
from django.db.utils import OperationalError, ProgrammingError

class SleepDataConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'SleepData'

    def ready(self):
        try:
            from .views import import_csv_data
            import_csv_data()
        except (OperationalError, ProgrammingError):
            # This will skip the data import if the database table doesn't exist yet.
            # It's useful when you are running migrate command for the first time.
            pass
