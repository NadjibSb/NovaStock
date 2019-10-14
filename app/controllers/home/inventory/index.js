// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "inventory index",
		hideLog: false
	} );


var navManager = require("/services/navManager");


function navigateUp(e){
    navManager.closeWindow($);
}
