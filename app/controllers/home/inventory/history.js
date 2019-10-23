// DEPENDENCIES ------------------------------------------
const log = require( '/services/logger' )( {
		tag: "inventory history",
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
            icon: {image: i%2==0 ? "/images/icn_destocked_mobile.png":"/images/icn_stocked_mobile.png"},
            place: {text: i%2==0 ? "Blida center":""},
            expirationDate: {text: "12/12/2009"},
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
}
