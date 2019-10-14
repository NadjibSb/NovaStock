// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "Home index",
		hideLog: false
	} );


var navManager = require("/services/navManager");

function btnClicked(e){
    switch (e.buttonId) {
        case "newItem":
            navManager.openWindow("home/newItem/index");
            break;
        case "inboundItem":
            navManager.openWindow("home/inBoundItem/index");
            break;
        case "outboundItem":
            navManager.openWindow("home/outBoundItem/index");
            break;
        case "inventory":
            navManager.openWindow("home/inventory/index");
            break;
    }
}
