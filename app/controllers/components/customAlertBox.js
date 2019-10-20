

_.extend($, {
  show : show
});

function show(text, btnText){
    $.masque.visible = true;
    $.text.text = text;
    $.btn.setTitle(btnText);
}

function exit(e){
    $.masque.visible = false;
}
