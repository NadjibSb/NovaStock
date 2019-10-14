// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "register index",
		hideLog: false
	} );


var navManager = require("/services/navManager");


function btnOnClick(e){
    log($.tfName.getText(), e.buttonId);
    $.tfName.blur();

    if ($.tfName.getText() && ($.tfName.getText() != "")) {
        let name = $.tfName.getText();
        Alloy.Globals.setUserName(name);
        navManager.openAndCloseAll("home/index");
    }else {
        $.tfName.showErrorMessage(L("register_tf_error"));
    }
}
