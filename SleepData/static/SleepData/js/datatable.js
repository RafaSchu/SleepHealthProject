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
        "stateSave": true,
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
            {"data": "date_added",
             "type": "date"}
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

    // Add event listeners for toggling column visibility
    document.querySelectorAll('a.toggle-vis').forEach((el) => {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            let columnIdx = this.getAttribute('data-column');
            let column = table.column(columnIdx);
            column.visible(!column.visible()); // Toggle visibility
        });
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