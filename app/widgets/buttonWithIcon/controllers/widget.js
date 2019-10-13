

_.extend($, {
  setTitle : setTitle,
  setIcon : setIcon
})



// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = arguments[ 0 ] || {};

/**

*   args:{
*       buttonId {String}
*       text {String}
*       icon {String}
*       color {String}
*       fontColor {String}
*       fontFamily {String}
*       fontSize {Int}
*       alignLeft {boolean}
*       top {Int}
*       bottom {Int}
*       left {Int}
*       right {Int}
    }
**/

//traintement

(function constructor(){
    args.color && ($.viewButton.backgroundColor = args.color);
    if (args.icon) {
        $.image_button.image = args.icon;
    }else {
        $.image_button.visible = false;
    }
    args.text && ($.label.text = args.text);
    args.fontColor && ($.label.color = args.fontColor);
    if (args.alignLeft) {
        $.content.left = 24
    }
    args.top && ($.viewButton.top = args.top);
    args.bottom && ($.viewButton.bottom = args.bottom);
    args.left && ($.viewButton.left = args.left);
    args.right && ($.viewButton.right = args.right);
    args.fontSize && args.fontFamily && ($.label.font = {fontFamily: args.fontFamily , fontSize: args.fontSize});
})();


function setTitle(title){
    $.label.text = title? title : '';
}
function setIcon(icon){
    $.image_button.image = icon? icon : '';
}

//function
function buttonClick(e){
  $.trigger('click' ,_.extend(e,{ buttonId: args.buttonId}))
}
