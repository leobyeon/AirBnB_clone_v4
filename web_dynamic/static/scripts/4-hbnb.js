document.addEventListener('DOMContentLoaded', function () {
  let list = [];
  $('div.amenities h4').css({ 'width': '120%', 'height': '45%', 'overflow': 'auto', 'margin-bottom': '-15px' });
  $('input').each(function (index, el) {
    let id = $(this).attr('data-id');
    let name = $(this).attr('data-name');
    $(el).change(function () {
      if (this.checked) {
        list.push(id);
        $('div.amenities h4').append('<span id=' + id + '>' + name + '<br></span>');
      } else {
        if (list.includes(id)) { let idx = list.indexOf(id); list.splice(idx, 1); }
        $('#' + id).remove();
      }
    });
  });
    $(function () {
      $.ajax({
        type: 'GET',
        url: 'http://0.0.0.0:5001/api/v1/status/',
        success: function (data) {
          let apiDiv = $('DIV#api_status');
          if (data.status === 'OK') { apiDiv.addClass('api_status available'); } else { apiDiv.removeClass('api_status available'); }
        }
      });
      $('button').click(function() {
      $.ajax({
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({"amenities": list}),
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        success: function (data) {
          $('article').remove()
          $.each(data, function (key, place) {
            $('.places').append(`
            <article>

	    <div class="title">

	      <h2>${place.name}</h2>

	      <div class="price_by_night">

				${place.price_by_night}

	      </div>
	    </div>
	  <div class="information">
	    <div class="max_guest">
		<i class="fa fa-users fa-3x" aria-hidden="true"></i>

		<br />

		${place.max_guest} Guests

	    </div>
	    <div class="number_rooms">
		<i class="fa fa-bed fa-3x" aria-hidden="true"></i>

		<br />

		${place.number_rooms} Bedrooms
	      </div>
	      <div class="number_bathrooms">
		<i class="fa fa-bath fa-3x" aria-hidden="true"></i>

		<br />

		${place.number_bathrooms} Bathroom

	      </div>
	    </div>

	    <!-- **********************
		 USER
		 **********************  -->

	    <div class="description">

	      ${place.description}

	    </div>

	  </article>
            `)
          });
        }
      });
    })

  });
});
