// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};




Alloy.Globals.isAndroid = (Ti.Platform.osname=='android') ? true : false;
Alloy.Globals.isIOS = (Ti.Platform.osname=='iphone') ? true : false;

Alloy.Globals.setUserName = (name)=>{
    Ti.App.Properties.setString("novastock.userName",name);
}
Alloy.Globals.getUserName = ()=>{
    return Ti.App.Properties.getString("novastock.userName",null);
}
