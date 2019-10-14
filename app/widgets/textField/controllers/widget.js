

_.extend($, {
    showErrorMessage: showErrorMessage,
    hideErrorMessage: hideErrorMessage,

});



// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = arguments[ 0 ] || {};

/**
*
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

    $.lbErrorText.addEventListener('focus', (e)=>{
        $.trigger('focus' , e)
    })
})();

function showErrorMessage(text, textColor){
    $.lbErrorText.text = text;
    color && ($.lbErrorText.color = color);
    $.errorContainer.visible = true
}

function hideErrorMessage(){
    $.errorContainer.visible = false
}
