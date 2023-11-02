$(document).ready(function() {
    $('#dataTable').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "",
        "columns": [
            {"data": "person_id"},
            {"data": "gender"},
            {"data": "age"},
            {"data": "occupation"},
            {"data": "sleep_duration"},
            {"data": "quality_sleep"},
            {"data": "physical_activity_level"},
            {"data": "stress_level"},
            {"data": "bmi_category"},
            {"data": "blood_pressure"},
            {"data": "heart_rate"},
            {"data": "daily_steps"},
            {"data": "sleep_disorder"},
            {"data": "date_added"}
        ]
    });
});