// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "NewItem index",
		hideLog: false
	} );


var navManager = require("/services/navManager"),
    barCode = require("/module/barcode");


(function constructor(){
    barCode.onSuccessListener(onScanSuccess);
})();

function navigateUp(e){
    navManager.closeWindow($);
}

function onScanSuccess(e){
    log(e, "onScanSuccess");
    barCode.removeSuccessListener(this);
}

function onScanCode(e){
    barCode.scanneCode(e);
}
