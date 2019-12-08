$(function ready() {
    $("#confirm").click(function (event) {
        console.log("can you get here???");

        const selectedMeats = [];
        const selectedVeggies = [];

        $('input[name="meats"]:checked').each(function () {
            selectedMeats.push(this.value)
        });

        $('input[name="veg"]:checked').each(function () {
            selectedVeggies.push(this.value)
        });

        event.preventDefault();

        var pizzaInfo = JSON.stringify({
            size: $('#psize').val(),
            crust: $('#crusts').val(),
            meats: selectedMeats,
            veggies: selectedVeggies,
            tax: 5,
            name: $('#name').val(),
            phone:($('#phone').val()).replace(/[^0-9]/g, ''),
            house: Number($('#house').val()),
            street: $('#street').val(),
            city: $('#city').val(),
            postal: $('#pcode').val()
        });


        console.log("pizzaInfo");
        console.log(pizzaInfo);

        $.ajax({
            url: '/api/order',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: pizzaInfo,
            success: function (json, status, request) {
                $('#statusMsg').removeClass();
                $('#statusMsg').addClass('alert alert-success');
                $('#statusMsg').html('Added the course');
            },
            error: function (request, status) {
                $('#statusMsg').removeClass();
                $('#statusMsg').addClass('alert alert-danger');
                $('#statusMsg').html('Error adding the course');
                console.log('Request failed : ', status);
            }
        });
    });
});

