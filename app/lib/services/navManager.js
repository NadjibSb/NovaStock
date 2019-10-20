const log = require('/services/logger')({
    tag : "navManager",
    hideLog : true
});



//PUBLIC INTERFACE
var $ = module.exports = {
    openWindow: openWindow,
    closeWindow: closeWindow,
    openAndCloseAll: openAndCloseAll,
    popUpTo: popUpTo
};


//PRIVATE VARIABLES

var stackController = [];
var tabGroupWindow;
var currentNavWindow;
var previousEvent;
var previousStackSize = 0;



// PRIVATE FUNCTIONS

function openWindow(path,params={},newNavWindowFlag, oldNavWindow) {
	try {
        // if newNavWindowFlag is on
        if (newNavWindowFlag && oldNavWindow) {
            _.extend(params, {navWindow: oldNavWindow})
        }
        log("create controller", "openWindow");
    	var controller = Alloy.createController(path, params);
        stackController.push(controller);
        log("stackController.length after push : "+ stackController.length);

        if (Alloy.Globals.isAndroid) {
          // quand on press back
            controller.getView().addEventListener('android:back',(e)=>{
                if( _.isFunction( controller.androidBack ) ) {
    				controller.androidBack(e);
    			} else {
                    var cont = stackController.pop();
                    log("apres le pop :"+ stackController.length , "android:back");
                    cont.getView().close();
    			}
            });
          //ouvrire la view
          controller.getView().open();

        }else{//sinon ios
            if(!newNavWindowFlag && currentNavWindow){ //il existe deja un nav windows
              log("there is a navwindow", "openWindow");
              currentNavWindow.openWindow(controller.getView());

            }else{ // il n'existe pas deja un navigationWindow
                log("New navWindow", "openWindow");
                var navigationWindow = Ti.UI.createNavigationWindow( {
                		window: controller.getView(),
                } );
                navigationWindow.hideNavBar();
                currentNavWindow = navigationWindow;
                currentNavWindow.open();
            }
        }
    	return controller;

	} catch(e) {
    log(e, "openWindow");
	}
};

// to close window
function closeWindow(controller, animate= true) {
    log("closeWindow");
    if (OS_ANDROID) {
        var cont = stackController.pop();
        log("apres le pop :"+ stackController.length , "closeWindow");
        cont.getView().close();
    }else{
        log(controller.args, "closeWindow > ========== Close ");
        stackController.pop();
        currentNavWindow.closeWindow(controller.getView(), {animated: animate});
    }
};

function popUpTo(controller, returnTag, animate = true){
    controller = stackController.pop();
    if (OS_ANDROID) {
        //closeWindow(controller);
        // popup into the taged controller
        while (controller && controller.args && (controller.args.tag != returnTag)) {
            log(controller.args, "popUpTo > ========== Close ");
            controller.getView().close();
            controller = stackController.pop();
        }

    }else {
        // popup into the taged controller
        var currentCont = controller; // stock the current controller (preserve it for the return animation)
        // close all the previous controllers till the returnTag controller (without animation)
        controller = stackController.pop();
        while (controller && controller.args && (controller.args.tag != returnTag)) {
            log(controller.args, "popUpTo > ========== Close ");
            currentNavWindow.closeWindow(controller.getView(), {animated: false});
            controller = stackController.pop();
        }
        // close the curent controller (with/without animation)
        currentNavWindow.closeWindow(currentCont.getView(), {animated: animate});
    }
    // if the controller existe re-push it to the stack
    if (controller) {
        stackController.push(controller);
    }
}

// pour ouvrire un liste de window et
function openAndCloseAll(path,params={}){
    log("stackController.length "+stackController.length, "before openAndCloseAll");

    if(OS_ANDROID){
        var currentController = openWindow(path, params);
        currentController.getView().exitOnClose = true;
        var controller = stackController.pop(); // pop the currentController

        setTimeout( function() {
            controller = stackController.pop(); // pop the previous controllers and close them
            while (controller) {
                log(controller, "openAndCloseAll > ========== Close ");
                controller.getView().exitOnClose = false;
                controller.getView().close();
                controller = stackController.pop();
            }
            stackController.push(currentController);
    	}, 100 );

    }else{ //iOS
        var currentController = openWindow(path, params, true, currentNavWindow);
        if (currentController.args && currentController.args.navWindow) {
            currentController.args.navWindow.close();
        }
        stackController = [];
        stackController.push(currentController);
    }
    log("stackController.length "+stackController.length, "after openAndCloseAll");
};
