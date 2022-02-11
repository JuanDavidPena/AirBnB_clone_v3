const tag_list = {};

$(document).ready(function () {
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
    $.ajax('http://localhost:5001/api/v1/status/').done(function (status_code) {
        if (status_code.status === "OK") {
            available_status.addClass('available');
        }
        else {
            available_status.removeClass('available');
        }
    });

});

$.ajax({
    type: 'POST',
    url: 'http://localhost:5001/api/v1/places_search',
    contentType: 'application/json',
    data: JSON.stringify({})
}).done (function(data){
    for (const place of data) {
        const article_section = `<article>
                <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                    <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                    <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                </div>
                <div class="description">
                    ${place.description}
                </div>
            </article>`;
        $('section.places').append($(article_section))
    }
});