// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "outBoundItem index",
		hideLog: false
	} );


var navManager = require("/services/navManager");


function navigateUp(e){
    navManager.closeWindow($);
}
