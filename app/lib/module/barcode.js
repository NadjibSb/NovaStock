// DEPENDENCIES
var log = require( 'services/logger' )( {
		tag: "barCode",
		hideLog: true
	} );

// PUBLIC INTERFACE
var $ = module.exports = {
	scanneCode: scanneCode,
	onSuccessListener: onSuccessListener,
	removeSuccessListener: removeSuccessListener,
};


var barcode = require('ti.barcode');
barcode.allowRotation = true;
barcode.displayedMessage = 'Scanner le code QR';
barcode.allowMenu = false;
barcode.allowInstructions = false;
barcode.useLED = false;

// construct the view ------------------------------
var overlay = Ti.UI.createView({
    backgroundColor: 'transparent',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
});
var cancelButton = Ti.UI.createButton({
    title: 'Cancel',
    textAlign: 'center',
    color: '#000',
    backgroundColor: '#fff',
    style: 0,
    font: {
        fontWeight: 'bold',
        fontSize: 16
    },
    borderRadius: 20,
    opacity: 0.7,
    width: "50%",
    height: 40,
    bottom: 20,
    elevation: 5
});
cancelButton.addEventListener('click', function() {
    barcode.cancel();
});
overlay.add(cancelButton);

// addEventListener ------------------------------
barcode.addEventListener('error', function(e) {
    var resultCode = e.message;
    log(e, 'An Error occured: ' );
});

barcode.addEventListener('cancel', function(e) {
    log('Cancel received');
});



// private function
function cameraPermission(callback) {
    if (Alloy.Globals.isAndroid) {
        if (Ti.Media.hasCameraPermissions()) {
            _.isFunction(callback) && callback(true);
        } else {
            Ti.Media.requestCameraPermissions(function(e) {
                if (e.success) {
                    _.isFunction(callback) && callback(true);
                } else {
                    _.isFunction(callback) && callback(false);
                    alert('No camera permission');
                }
            });
        }
    }
    if (Alloy.Globals.isIOS) {
        _.isFunction(callback) && callback(true);
    }
};


// Public functions
function scanneCode(e){
  cameraPermission(function(re) {
      barcode.capture({
          animate: true,
          overlay: overlay,
          showCancel: false,
          showRectangle: false,
          keepOpen: true
      });
  });
}

function onSuccessListener(callback){
    barcode.addEventListener('success', function(e) {
        _.isFunction(callback) && callback(e);
    });
}

function removeSuccessListener(callback){
    barcode.removeEventListener('success', callback);
}
