_.extend($, {
    showErrorMessage: showErrorMessage,
    hideErrorMessage: hideErrorMessage,
    getText: getText,
    blur: blur

});
// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = arguments[ 0 ] || {};

/**
*   args:{
*       hintText {String}
*       top {Int}
*       bottom {Int}
*       left {Int}
*       right {Int}
    }
**/

//traintement
(function constructor(){
    args.top && ($.viewContainer.top = args.top);
    args.bottom && ($.viewContainer.bottom = args.bottom);
    args.left && ($.viewContainer.left = args.left);
    args.right && ($.viewContainer.right = args.right);
    args.hintText && ($.tf.hintText = args.hintText);


    $.tf.addEventListener('focus', (e)=>{
        $.tfContainer.backgroundColor = "#201461AB";
        $.separator.backgroundColor = "#1461AB";
        $.separator.height = 2;
        $.errorContainer.visible = false
        $.trigger('focus' , e)
    });
    $.tf.addEventListener('blur', (e)=>{
        $.tfContainer.backgroundColor = "transparent";
        $.separator.backgroundColor = "#000";
        $.separator.height = 1;
    });

})();

function showErrorMessage(text){
    $.lbErrorText.text = text;
    $.lbErrorText.color = "#FF0000";
    $.tfContainer.backgroundColor = "#19FF0000";
    $.separator.backgroundColor = "#FF0000";
    $.errorContainer.visible = true
}

function hideErrorMessage(){
    $.separator.backgroundColor = "#000";
    $.tfContainer.backgroundColor = "transparent";
    $.errorContainer.visible = false
}

function changeSeparatorStyle(style){
    style && _.extend($.separator, style);
}

function getText(){
    return $.tf.value ? $.tf.value : ""
}

function blur(){
    $.tf.blur();
}
