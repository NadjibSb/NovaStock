// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "register index",
		hideLog: false
	} );


var navManager = require("/services/navManager");


function btnOnClick(e){
    $.tfName.blur();
    log($.tfName.getText(), e.buttonId);

    if ($.tfName.getText() && ($.tfName.getText() != "")) {
        let name = $.tfName.getText();
        Alloy.Globals.setUserName(name);
        navManager.openAndCloseAll("home/index");
    }else {
        setTimeout(()=>{
            $.tfName.showErrorMessage(L("register_tf_error"));
        },50);
    }
}
