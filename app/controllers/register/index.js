// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "register index",
		hideLog: false
	} );


function btnOnClick(e){
    log($.tfName.getText(), e.buttonId);
    //$.tfName.hideErrorMessage();
    $.tfName.blur();
}

function onTfFocus(e){
    //$.tfName.showErrorMessage("showErrorMessage");
}
