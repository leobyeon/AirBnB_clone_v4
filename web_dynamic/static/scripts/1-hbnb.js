/* This script listens for changes on each Input checkbox. Adds or removes the
   amenity id's from a list when its checked. Script runs when the DOM is
   loaded. */

document.addEventListener('DOMContentLoaded', function () {
  let dict = {};

  $('input').each(function(index, el) {
    let id = $(this).attr('data-id');
    let name = $(this).attr('data-name');

    $(el).change(function() {
      if (this.checked) {
	dict[id] = {name: name, checked: true};
	$('div.amenities h4').append('<span id=' + id + '>' + name +' ' + '</span>');
      } else {
	console.log('Unchecked');
	dict[id] = {name: name, checked: false};
	$('#' + id).remove();
      }
    });
  });
});
