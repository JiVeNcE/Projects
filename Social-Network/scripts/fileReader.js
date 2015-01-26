
// Change later to a more concrete selector
var selector = document.body;

// Trigger file selection window
$(selector).on('click', '#upload-file-button', function() {
	$('#picture').click();
});

// Reads the selected file and returns the data as a base64 encoded string
$(selector).on('change', '#picture', function() {
	var file = this.files[0],
		reader;
	
	if (file.type.match(/image\/.*/)) {
		reader = new FileReader();
		reader.onload = function(e) {
            $('.picture-preview').attr('src', e.target.result);
            $('#fileName').html(file.name);
		};
		reader.readAsDataURL(file);
	} else {
		// TODO: Display type-mismatch error message
	}
});