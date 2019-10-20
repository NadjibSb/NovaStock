exports.setHighlightEffect = setHighlightEffect;

function setHighlightEffect( ui, highlightOpacity ) {
	if( !highlightOpacity ) {
		highlightOpacity = 0.7;
	}

	function touchStart() {
		ui.opacity = highlightOpacity;
	}

	function touchEnd() {
		ui.animate( {
			opacity: 1,
			duration: 250,
		}, function() {
			ui.opacity = 1;
		} );
	}

	ui.addEventListener( 'touchstart', touchStart );
	ui.addEventListener( 'touchend', touchEnd );
	ui.addEventListener( 'touchcancel', touchEnd );
};


exports.createImageView = function( e ) {
	var imageView = Ti.UI.createImageView( e );
	setHighlightEffect( imageView );
	return imageView;
};

exports.createView = function( e ) {
	var view = Ti.UI.createView( e );
	setHighlightEffect( view );
	return view;
};


exports.createButton = function( e ) {
	var button = Ti.UI.createButton( e );
	if( OS_ANDROID ) {
		setHighlightEffect( button, 0.6 );
	}
	return button;
};

exports.createLabel = function( e ) {
	var label = Ti.UI.createLabel( e );
	setHighlightEffect( label );
	return label;
};
