// PUBLIC INTERFACE
var $ = module.exports = {
	show: show,
	showDialog: showDialog
};



// PRIVATE FUNCTIONS

/**
 * Cree et affiche une alert ( title + message ) si args de type objet sinon affiche le contenue de args sans titre
 * @param {Object || string} args
 * @param {Object} callback a la fermeture de l'alert
 */
function show( args, callback ) {
	var title = "",
		message = "";

	if( typeof( args ) == "object" ) {
		title = args.title;
		message = args.message;
	} else {
		message = args;
	}

	var simpleAlert = Ti.UI.createAlertDialog( {
		title: title,
		message: message,
		ok: 'OK',
		persistent: true
	} );
	_.isFunction( callback ) && simpleAlert.addEventListener( 'click', callback );
	simpleAlert.show();
}

/**
 *
 * @param {Object || string} args
 * @param {Array} buttonNames
 * @param {Function} callback
 */
function showDialog( args, buttonNames, callback ) {
	var title = "",
		message = "";

	if( typeof( args ) == "object" ) {
		title = args.title;
		message = args.message;
	} else {
		message = args;
	}

	var dialog = Titanium.UI.createAlertDialog( {
		title: title,
		message: message,
		buttonNames: buttonNames,
		persistent: true,
		cancelled: false,
		//cancel : -1
	} );

	_.isFunction( callback ) && dialog.addEventListener( 'click', callback );
	dialog.show();
	return dialog;
};
