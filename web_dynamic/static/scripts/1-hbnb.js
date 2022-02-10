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
});