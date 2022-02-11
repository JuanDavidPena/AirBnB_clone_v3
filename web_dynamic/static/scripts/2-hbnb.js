const tag_list = {};

$(document).ready(function (){
    $('div.amenities input:checkbox').change(function () {
        if ($(this).is(':checked')) {
            tag_list[$(this).attr('data-id')] = $(this).attr('data-name');
        }
        else if (!$(this).is(':checked')) {
            delete tag_list[$(this).attr('data-id')];
        }
        const names = Object.values(tag_list);

        $('div.amenities h4').text(names.join(', '));
    });

   const available_status = $('div#api_status');
   $.ajax('http://0.0.0.0:5001/api/v1/status/').done(function (statusCode) {
       if (statusCode === 200) {
           available_status.addClass('available');
        } else {
            available_status.removeClass('available');
        }
    });
});