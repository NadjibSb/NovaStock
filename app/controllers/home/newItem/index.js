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
            //value:new Date()
        });

        picker.showDatePickerDialog({
            //value: new Date(),
            callback: function(e) {
                if (!e.cancel) {
                    $.tfDate.hideErrorMessage();
                    log(e.value);
                    var date = JSON.stringify(e.value);
                    var d = date.split("\"")[1].split("-");
                    var year = d[0],
                        month = d[1],
                        day = d[2][0]+d[2][1];
                    $.tfDate.setText(day+"/"+month+"/"+year);
                    // display error msg
                    var diff = parseInt(dateDiff(year,month,day)/(60*60*24)); // in days
                    if ( diff < 91) {// 3 months
                        $.tfDate.showErrorMessage(String.format(L("expiration_text"),diff.toString()),{noBackground: true});
                    }
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
    $.tfDate.hideErrorMessage();
    exitPicker(e);
    //log($.picker.value);
    // get date value
    var date = JSON.stringify($.picker.value);
    var d = date.split("\"")[1].split("-");
    var year = parseInt(d[0]),
        month = parseInt(d[1]),
        day = parseInt(d[2][0]+d[2][1]);
    $.tfDate.setText(day+"/"+month+"/"+year);
    // display error msg
    var diff = parseInt(dateDiff(year,month,day)/(60*60*24)); // in days
    if ( diff < 91) {// 3 months
        $.tfDate.showErrorMessage(String.format(L("expiration_text"),diff.toString()),{noBackground: true});
    }

}

function dateDiff(year,month,day){
    var currentDate = new Date();
    var selectedDate = toTimestamp(year,month,day,currentDate.getHours(),currentDate.getMinutes(),0);//new Date(year,month-1,day+1);
    return (selectedDate - (currentDate.getTime()/1000))

    function toTimestamp(year,month,day,hour,minute,second){
        var datum = new Date(Date.UTC(year,month-1,day,hour,minute,second));
        return datum.getTime()/1000;
    }
}

function exitPicker(e){
    $.pickerContainer.animate({
        height: 2,
        duration: 150
    },()=>{
        $.pickerView.visible = false;
    });
}
