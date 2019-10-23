// DEPENDENCIES ------------------------------------------
const log = require( '/services/logger' )( {
		tag: "inventory index",
		hideLog: false
	} );
var navManager = require("/services/navManager");

// CONSTRUCTOR ------------------------------------------
(function constructor(){
    var data = [];
    for (var i = 0; i < 9; i++) {
        data.push({
            template: "itemTemplate",
            title: {text: "Product Title "+i},
            quantity: {text: i%2==0 ? "100":"190000"},
            expirationText: {text: i%2==0 ? L("expiration_text"):""},
        })
    }
    $.itemSection.items = data;
})();

// PRIVATE FUNCTIONS ------------------------------------------
function navigateUp(e){
    navManager.closeWindow($);
}

function onItemclick(e){
    log(e);
    navManager.openWindow("home/inventory/history");
}
