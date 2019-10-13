// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "register index",
		hideLog: false
	} );


function btnOnClick(e){
    log("click", e.buttonId);
}
