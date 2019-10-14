// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "inBoundItem index",
		hideLog: false
	} );


var navManager = require("/services/navManager");


function navigateUp(e){
    navManager.closeWindow($);
}
