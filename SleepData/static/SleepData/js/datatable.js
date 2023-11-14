$(document).ready(function() {
    $('#dataTable').DataTable({
        "processing": true,
        "serverSide": false,
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
        ],
         initComplete: function() {
            // Setup - add a text input to each footer cell
            $('#dataTable tfoot th').each(function() {
                var title = $(this).text();
                $(this).html('<input type="text" placeholder="Search ' + title + '" />');
            });

            // Apply the search
            this.api().columns().every(function() {
                var that = this;

                $('input', this.footer()).on('keyup change clear', function() {
                    if (that.search() !== this.value) {
                        that.search(this.value).draw();
                    }
                });
            });
        }
    });
});