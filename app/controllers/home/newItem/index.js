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

function displayDatePicker(e){
    if (Alloy.Globals.isAndroid) {
        var picker = Ti.UI.createPicker({
            type:Ti.UI.PICKER_TYPE_DATE,
            minDate:new Date(),
            value:new Date()
        });

        picker.showDatePickerDialog({
            value: new Date(),
            callback: function(e) {
                if (!e.cancel) {
                    log(e.value);
                    var date = JSON.stringify(e.value);
                    var d = date.split("\"")[1].split("-");
                    var year = d[0],
                        month = d[1],
                        day = d[2][0]+d[2][1];
                    $.tfDate.setText(day+"/"+month+"/"+year);
                }
            }
        });
    }else {
        $.pickerView.visible = true;
        $.pickerContainer.animate({
            height: Ti.UI.SIZE,
            duration: 200
        });
    }
}

function chooseDate(e){
    exitPicker(e);
    log($.picker.value);
    // get date value
    var date = JSON.stringify($.picker.value);
    var d = date.split("\"")[1].split("-");
    var year = d[0],
        month = d[1],
        day = d[2][0]+d[2][1];
    $.tfDate.setText(day+"/"+month+"/"+year);

}

function exitPicker(e){
    $.pickerContainer.animate({
        height: 2,
        duration: 150
    },()=>{
        $.pickerView.visible = false;
    });
}
