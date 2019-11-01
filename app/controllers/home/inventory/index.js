// DEPENDENCIES ------------------------------------------
const log = require( '/services/logger' )( {
		tag: "inventory index",
		hideLog: false
	} );
var navManager = require("/services/navManager");

// CONSTRUCTOR ------------------------------------------
(function constructor(){
    setTimeout(()=>{
        var data = [];
        for (var i = 0; i < 9; i++) {
            data.push({
                template: "itemTemplate",
                title: {text: "Product Title "+i},
                quantity: {text: i%2==0 ? "12000":"100"},
                expirationText: {text: i%2==0 ? L("expiration_text"):""},
                properties:{
                    selectionStyle: Alloy.Globals.isAndroid ? "":Titanium.UI.iOS.ListViewCellSelectionStyle.NONE
                }
            })
        }
        $.itemSection.items = data;
        $.loaderContainer.visible = false;
    },2000);

})();

// PRIVATE FUNCTIONS ------------------------------------------
function navigateUp(e){
    navManager.closeWindow($);
}

function onItemclick(e){
    //log(e);
    navManager.openWindow("home/inventory/history");
}
