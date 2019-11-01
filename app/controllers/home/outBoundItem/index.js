// DEPENDENCIES
const log = require( '/services/logger' )( {
		tag: "outBoundItem index",
		hideLog: false
	} );


var navManager = require("/services/navManager"),
    barCode = require("/module/barcode");


// Constructor ------------------------------------
(function constructor(){
    barCode.onSuccessListener(onScanSuccess);
})();


// PRIVATE FUNCTIONS ------------------------------------
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

function onGetName(e){
    $.alertBox.show(L("get_item_name"),"Ok")
}
