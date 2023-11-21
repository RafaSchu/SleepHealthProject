$(document).ready(function() {
    function format(d) {
        return (
            '<dl>' +
            '<dt>Gender:</dt><dd>' + d.gender + '</dd>' +
            '<dt>BMI Category:</dt><dd>' + d.bmi_category + '</dd>' +
            '<dt>Sleep Disorder:</dt><dd>' + d.sleep_disorder + '</dd>' +
            '</dl>'
        );
    }

    table = $('#dataTable').DataTable({
        "processing": true,
        "serverSide": false,
        "ajax": "",
        "ordering": true,
        "columns": [
            {
            "className": 'details-control', // Add this column for child row toggles
            "orderable": false,
            "data": null,
            "defaultContent": '+'
            },
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

    $('#dataTable tbody').on('click', 'td.details-control', function() {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });
});