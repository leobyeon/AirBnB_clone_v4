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
    $(function () {
      $.ajax({
        type: 'GET',
        url: 'http://0.0.0.0:5001/api/v1/status/',
        success: function (data) {
          let apiDiv = $('DIV#api_status');
          if (data.status === 'OK') { apiDiv.addClass('api_status available'); } else { apiDiv.removeClass('api_status available'); }
        }
      });
    $.ajax({
      type: 'POST',
      content-type: 'application/json',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      success: function (data) {
        $('SECTION.places').append('<article>');
        data = JSON.parse(data)
        $.each(JSON.parse(data), function (i, el) {
          console.log(el);
        })
      }
    });
  });
});
