// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "NewItem index",
		hideLog: false
	} );
var navManager = require("/services/navManager"),
    barCode = require("/module/barcode");


// Constructor ---------------------------------------------
(function constructor(){
    barCode.onSuccessListener(onScanSuccess);
})();

// PRIVATE FUNCTIONS ---------------------------------------------
function onScanSuccess(e){
    log(e, "onScanSuccess");
    barCode.removeSuccessListener(this);
}

function onScanCode(e){
    barCode.scanneCode(e);
}

function navigateUp(e){
    navManager.closeWindow($);
}
