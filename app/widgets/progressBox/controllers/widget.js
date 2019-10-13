
_.extend($ , {
    sucess: sucess,
    failed: failed,
    hide: hide,
    show: show
})

hide();
/*
setTimeout(()=>{
    sucess("eeeee");
},3000);
*/

function hide(){
    $.vue.hide();
}
function show(text){
    $.title.text = text;
    $.indecator.visible = true;
    $.crossContainer.visible = false;
    $.checkContainer.visible = false;
    $.vue.show();
}

function sucess(text){
    $.title.text = text;
    $.indecator.visible = false;
    $.checkContainer.visible = true;
    var matrix = Ti.UI.createMatrix2D();
    matrix = matrix.scale(1.15, 1.15);
    var a = Ti.UI.createAnimation({
        transform : matrix,
        duration : 150,
        autoreverse : true,
        repeat : 2
    });
    $.checkContainer.animate(a);
}

function failed(text){
    $.title.text = text;
    $.indecator.visible = false;
    $.crossContainer.visible = true;
    var matrix = Ti.UI.createMatrix2D();
    matrix = matrix.scale(1.1, 1.1);
    var a = Ti.UI.createAnimation({
        transform : matrix,
        duration : 150,
        autoreverse : true,
        repeat : 2
    });
    $.crossContainer.animate(a);
}

function exit(e){
    $.trigger('exit', e);
}
