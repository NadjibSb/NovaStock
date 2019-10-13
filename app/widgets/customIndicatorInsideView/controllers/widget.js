// PUBLIC INTERFACE
_.extend( $, {
	show: show,
	hide: hide,
	setMessage : setMessage,

} );

// PRIVATE FUNCTION
function show() {
    $.activityContainer.show();
	$.activityIndicator.show();
}

function hide() {
    $.activityContainer.hide();
	$.activityIndicator.hide();
}


function setMessage(message){
	$.activityIndicator.message = message;
}
