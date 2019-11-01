_.extend($, {
    showErrorMessage: showErrorMessage,
    hideErrorMessage: hideErrorMessage,
    getText: getText,
    setText: setText,
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
*       icon {image}
*       disabled {boolean}
*       keyboardType
    }
**/

//traintement
(function constructor(){
    args.top && ($.viewContainer.top = args.top);
    args.bottom && ($.viewContainer.bottom = args.bottom);
    args.left && ($.viewContainer.left = args.left);
    args.right && ($.viewContainer.right = args.right);
    args.hintText && ($.tf.hintText = args.hintText);
    args.keyboardType && ($.tf.keyboardType = args.keyboardType);

    if (args.icon) {
        $.tf.width = "90%";
        $.icon.image = args.icon;
    }
    if (!args.disabled) {
        $.tfContainer.addEventListener("click",(e)=>{
            $.tf.focus(e);
        });
        $.tf.addEventListener('focus', (e)=>{
            $.tfContainer.backgroundColor = "#201461AB";
            $.separator.backgroundColor = "#1461AB";
            $.separator.height = 3;
            $.errorContainer.visible = false
            $.trigger('focus' , e)
        });
        $.tf.addEventListener('blur', (e)=>{
            $.tfContainer.backgroundColor = "transparent";
            $.separator.backgroundColor = "#5A5A5A";
            $.separator.height = 2;
        });
    }else {
        $.tfContainer.addEventListener("click",(e)=>{
            $.trigger('click' , e);
        });
        $.tf.editable = false;
        $.tf.hintTextColor = "#9E9E9E";
    }
})();

function showErrorMessage(text,args){
    $.lbErrorText.text = text;
    $.lbErrorText.color = "#FF0000";
    $.errorContainer.visible = true;
    $.separator.backgroundColor = "#FF0000";
    if (!(args && args.noBackground)) {
        $.tfContainer.backgroundColor = "#19FF0000";
    }
}

function hideErrorMessage(){
    $.separator.backgroundColor = "#5A5A5A";
    $.tfContainer.backgroundColor = "transparent";
    $.errorContainer.visible = false
}

function changeSeparatorStyle(style){
    style && _.extend($.separator, style);
}

function getText(){
    return $.tf.value ? $.tf.value : ""
}

function setText(text){
    return $.tf.value = text;
}

function blur(){
    $.tf.blur();
}
