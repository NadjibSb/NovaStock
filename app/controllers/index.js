// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "root index",
		hideLog: false
	} );

var navManager = require("/services/navManager");

navManager.openWindow("register/index");
