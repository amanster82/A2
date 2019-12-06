$(function ready() {
    $.getJSON("/api/order", function (data) {
        let count = 1
        data.forEach(function (item) {

            console.log(item);
            let pizza = item.size + '<br>' + item.crust + '<br>' + item.meats + '<br>' + item.veggies;
            let address = item.house+" "+item.street + '<br>' + item.city + '<br>' + item.postal;

            let col_1 = '<td>' + count + '</td>';
            let col_2 = '<td>' + pizza + '</td>';
            let col_3 = '<td>' + item.name + '</td>';
            let col_4 = '<td>' + item.phone + '</td>';
            let col_5 = '<td>' + address + '</td>';
            let col_6 = '<td>' + item.totalCost + '</td>';

            $('#orderLine').append(
            
            '<tr>' +col_1+ col_2+ col_3+ col_4+ col_5+ col_6+ '</tr>');

            count++;
        });
    });
});


$(function ready(){
    $('#search').keyup(function(){
        var txt = $(this).val();
        console.log(txt);

        var query = JSON.stringify({search: txt})

        if(txt != ""){
            $.ajax({
                url: '/api/lookup',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: query,
                success: function (json, status, request) {
                    console.log(json)
                    console.log(status)
                    console.log(request)
                    $('#orderLine').html(request);
                },
                error: function (request, status) {

                }
            });
        }

    })

});



