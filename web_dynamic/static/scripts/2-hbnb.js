/* This script listens for changes on each Input checkbox. Adds or removes the
   amenity id's from a list when its checked. Script runs when the DOM is
   loaded. */
document.addEventListener('DOMContentLoaded', function () {
  let list = [];
  $('div.amenities h4').css({'width': '120%', 'height': '45%',
			     'overflow': 'auto', 'margin-bottom': '-15px'});
  $('input').each(function(index, el) {
    let id = $(this).attr('data-id');
    let name = $(this).attr('data-name');
    $(el).change(function() {
      if (this.checked) {
	list.push(id)
	$('div.amenities h4').append('<span id=' + id + '>'
				     + name +'<br></span>');
      } else {
	if (list.includes(id)){
	  let idx = list.indexOf(id);
	  list.splice(idx, 1);
	}
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
	if (data.status === 'OK') { apiDiv.addClass('api_status available'); }
	else { apiDiv.removeClass('api_status available'); }
	}
    });
  });
});
