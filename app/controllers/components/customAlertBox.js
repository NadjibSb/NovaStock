

_.extend($, {
  show : show
});

function show(text, btnText){
    $.text.text = text;
    $.btn.setTitle(btnText);
    $.masque.visible = true;
}

function exit(e){
    $.masque.visible = false;
}
