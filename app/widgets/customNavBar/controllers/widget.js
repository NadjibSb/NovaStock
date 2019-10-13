var args = arguments[ 0 ] || {};
/**
 *   args :
 *       title {string}
 *       leftIcon {string}
 *       rightIcon {string}
 *       visible {bool}
 *       backgroundColor {string} color nav bar
 *       separatorColor {string} bottom bar separator color
 *   events :
 *       leftButtonClick
 *       rightButtonClick
 */

// PUBLIC INTERFACE

_.extend( $, {
	getHeight: getHeight,
	setTitle: setTitle,
	updateTitleStyle: updateTitleStyle,
	setLeftButtonAction: setLeftButtonAction,
	setLeftButtonIcon: setLeftButtonIcon,
	setRightButtonAction: setRightButtonAction,
	setRightButtonIcon: setRightButtonIcon,
	setVisible: setVisible,
	removeLeftBotton: removeLeftBotton,
	removeRightBotton: removeRightBotton
} )

// PRIVATE VARIABLE

const events = {
	leftButtonClick: "leftButtonClick",
	rightButtonClick: "rightButtonClick"
};
var _leftBottonClickCallback, _rightBottonClickCallback;

// INIT

if( args.backgroundColor != undefined ) {
	$.navBarContainer.backgroundGradient = null;
	$.navBarContainer.backgroundColor =  args.backgroundColor;
} else if( args.backgroundGradient ) {
	$.navBarContainer.backgroundGradient = args.backgroundGradient;
}

args.separatorColor != undefined && ($.separator.backgroundColor =  args.separatorColor);

setTitle( args.title )
setLeftButtonIcon( args.leftIcon );
setRightButtonIcon( args.rightIcon );
setVisible( args.visible )


/**
 * TODO Handle adding custom views insde the navigation bar
 */

/*_.each(args.children, function (child) {
  $.navBarContainer.add(child);
});*/

// PRIVATE FUNCTIONS


function leftButtonClick() {
	_.isFunction( _leftBottonClickCallback ) && _leftBottonClickCallback();
	$.trigger( events.leftButtonClick );
}

function rightButtonClick() {
	_.isFunction( _rightBottonClickCallback ) && _rightBottonClickCallback();
	$.trigger( events.rightButtonClick );
}

function getHeight() {
	return $.navBarContainer.height;
};


function setTitle( title ) {
	$.titleWindow.text = title ? title : '';
};

function updateTitleStyle( style ) {
	if( !style ) {
		return;
	}
	_.extend( $.titleWindow, style );
};

function setLeftButtonAction( action ) {
	_leftBottonClickCallback = action;
};

function setRightButtonAction( action ) {
	_rightBottonClickCallback = action;
};

function setLeftButtonIcon( icon ) {
	if( icon ) {
		$.leftButton.image = icon;
		$.zoneClickLeft.visible = true;
		$.zoneClickLeft.touchEnabled = true;
	} else {
		$.leftButton.image = "";
		$.zoneClickLeft.visible = false;
		$.zoneClickLeft.touchEnabled = false;
	}
};

function setRightButtonIcon( icon ) {
	if( icon ) {
		$.rightButton.image = icon;
		$.zoneClickRight.visible = true;
		$.zoneClickRight.touchEnabled = true;
	} else {
		$.rightButton.image = "";
		$.zoneClickRight.visible = false;
		$.zoneClickRight.touchEnabled = false;
	}
};

function setVisible( value ) {
	if( value == undefined ) {
		return
	}
	$.navBarContainer.visible = value;
}

function removeLeftBotton() {
	$.zoneClickLeft.visible = false;
	$.zoneClickLeft.touchEnabled = false;
}

function removeRightBotton() {
	$.zoneClickRight.visible = false;
	$.zoneClickRight.touchEnabled = false;
}
