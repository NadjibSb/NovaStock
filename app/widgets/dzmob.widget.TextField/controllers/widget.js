var args = arguments[0] || {};

var inputColor = "black" ;
Ti.API.info(inputColor);
var errorColor = args.errorColor ;
var validations = args.validations;
var focusBarColor = args.focusBarColor;
var blurBarColor = args.blurBarColor ;
var errorMessage = args.errorMessage;
var isOptionDialog = args.isOptionDialog || false;
var subjects = _.isString(args.subjects) ? args.subjects.split(",") : args.subjects;
var defaultErrorMessage = args.defaultErrorMessage;
var title = args.title || "";
var findError = false;
var hintText = args.hintText

$.editable = args.editable;

var isAndroid = (Ti.Platform.osname=='android') ? true : false;

/**
 * Widget methodes
 */
_.extend($, {
	focus : focus,
	blur : blur,
	getValue : getValue,
	setValue : setValue,
	setValueSilently : setValueSilently,
	//checkAndGetValue : checkAndGetValue,
	setInvalid : setInvalid,
	setEnabled : setEnabled,
	isValid : isValid,
	setValidations : setValidations,
	setReturnKeyType : setReturnKeyType,
	setEditable : setEditable,
	isFocused : false,
	reset : reset,
	setValidationValue : setValidationValue,
	getValidationValue : getValidationValue,
	setMessageError : setMessageError,
	removeError : removeError,
	hideField: hideField,
	showField: showField,
	resetColor: resetColor
});

//Container style
args.top && $.container.setTop(args.top);
args.bottom && $.container.setBottom(args.bottom);
args.left && $.container.setLeft(args.left);
args.right && $.container.setRight(args.right);
args.height && $.container.setHeight(args.height);
args.width && $.container.setWidth(args.width);
args.backgroundColor && ($.container.backgroundColor =  args.backgroundColor);
$.tfInput.setKeyboardType(args.keyboardType);
//Input Style
$.tfInput.color = inputColor;
$.tfInput.hintText = hintText;
args.value && $.tfInput.setValue(args.value);
args.returnKeyType != undefined && $.tfInput.setReturnKeyType(args.returnKeyType);
args.keyboardType != undefined && $.tfInput.setKeyboardType(args.keyboardType);
args.autocorrect != undefined && $.tfInput.setAutocorrect(args.autocorrect);
args.autocapitalization != undefined && $.tfInput.setAutocapitalization(args.autocapitalization);
args.enableReturnKey != undefined && $.tfInput.setEnableReturnKey(args.enableReturnKey);
args.disabled && $.tfInput.setTouchEnabled(false);
$.tfInput.passwordMask = args.passwordMask;


// lineBar style
$.lineBar.backgroundColor = blurBarColor;

//Text common style
if ( typeof (args.textStyle) == "object") {
	_.extend($.tfInput, args.textStyle);
}

//force custom styles
if ( typeof (args.containerStyle) == "object") {
	for (var key in args.containerStyle) {
		$.container[key] = args.containerStyle[key];
	}
}
if ( typeof (args.inputStyle) == "object") {
	for (var key in args.inputStyle) {
		$.tfInput[key] = args.inputStyle[key];
	}
}

// for DialogOption
if (isOptionDialog ) {
	$.tfInput.editable = false;
	$.tfInput.focusable = false;
	$.subject.setOptions(subjects);
	$.tfInput.setValue(title);
	$.subject.setTitle(title);
	$.subject.setCancel(subjects.length - 1);
}

if($.editable === false){
	setEditable(false);
}



/*
 * Widget events
 *  return
 *  focus
 * 	change
 *
 *
 */

function focusInput(e) {
	/*if (e.source.id == $.container.id) {
			$.tfInput.focus();
	} */
	show();
}


function onReturn(e) {
	e.source.id = args.id;
	$.trigger('return', e);
}

function onClick(e) {
	show();
}

function onFocus(e) {
	$.isFocused = true;
	Alloy.Globals.lastFocusedTextField = $.tfInput;
	$.lineBar.backgroundColor = focusBarColor;
	$.trigger('focus', e);
}

function onBlur(e){
	$.isFocused = false;
	$.lineBar.backgroundColor = blurBarColor;
	$.trigger('blur', e);
}


function onChange(e) {
	if (findError) {
		$.tfInput.color = inputColor;
		findError = false;
	}
	if (isFocused=true && !isOptionDialog) $.lineBar.backgroundColor = focusBarColor;
	if (e) {
		e.source.id = args.id;
	} else {
		e = {
			source : $.tfInput
		};
	}
	$.trigger('change', e);
}

function clickSubject(e) {
	if (e.index != subjects.length - 1) {
		setValue(subjects[e.index]);
	}
}

function setValidationValue (value) {
	if(!value || value == null){
		return;
	}
	validations.value = value;
}

function getValidationValue() {
	return validations.value || "";
}

function setValue(value) {
	if(!value || value == null){
		return;
	}
	$.tfInput.value = value;
	onChange();
	$.lineBar.backgroundColor = blurBarColor;
}


//
// Set the value of the input without triggering onChange event
//
function setValueSilently(value) {
	if(value == null){
		return;
	}
	$.tfInput.value = value;
	$.lineBar.backgroundColor = blurBarColor;
}

function setMessageError(message) {
	Ti.API.info("setMessage"+message);

	$.messageErorLogin.text = message;
	$.messageErorLogin.height = Ti.UI.SIZE;
	if (!isAndroid) $.messageErorLogin.visible = true;
	$.lineBar.backgroundColor = errorColor;
	findError = true;
}

function isValid() {
	var value = $.tfInput.value;
	var objectValid = {valid : false, message :defaultErrorMessage };
	if (!value || value == '') {
		setInvalid(objectValid);
		return false;
	}
	if ( typeof (validations) != "object") {
		objectValid.valid = true;
		setInvalid(objectValid);
		return true;
	}

	for (var key in validations) {
		switch(key) {
			case "emailTel" :
				if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) && !/^(00213|\+213|0)(5|6|7)[0-9]{8}$/.test(value)) {
					objectValid.message = errorMessage;
					setInvalid(objectValid);
					return false;
				}
				break;
			case "username" :
				// '\-' is for the dash and the '—' at the end is for the combined dash that iOS generates if u type 2 dashes consecutively
				var validValue = /^[a-zA-ZÀ-ÿ0-9_\-.—]+$/g.test(value);
				if (!validValue) {
					objectValid.message = errorMessage;
					setInvalid(objectValid);
					return false;
				}
				break;
			case "length" :
				if (value.length < validations.length) {
					objectValid.message = errorMessage;
					setInvalid(objectValid);
					return false;
				}
				break;
			case "value" : // pour identifier si les deux mot de passe sont identiques
				if ($.tfInput.value != validations.value) {
					objectValid.message = errorMessage;
					setInvalid(objectValid);
					return false;
				}
				break;
			case "multipleChoice" :
				if ($.tfInput.value ==  title) {
					objectValid.message = errorMessage;
					setInvalid(objectValid);
					return false;
				}
				break;
			case "email" :
				if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
					objectValid.message = errorMessage;
					setInvalid(objectValid);
					return false;
				}
				break;
			case "Tel" :
				if (!/^(00213|\+213|0)(5|6|7)[0-9]{8}$/.test(value)) {
					objectValid.message = errorMessage;
					setInvalid(objectValid);
					return false;
				}
				break;
			case "lengthstrict" :
				if (value.length != validations.lengthstrict || !/^[0-9]*$/.test(value) ) {
					objectValid.message = errorMessage;
					setInvalid(objectValid);
					return false;
				}
				break;
			case "nom" :
				if (!/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/.test(value)) {
					objectValid.message = errorMessage;
					setInvalid(objectValid);
					return false;
				}


		}
	}
	objectValid.valid = true;
	setInvalid(objectValid);
	return true;
}

function reset() {
	$.messageErorLogin.heigh = 0;
	if (!isAndroid) $.messageErorLogin.visible = false;
	$.tfInput.color = inputColor;
	$.lineBar.backgroundColor = blurBarColor;
}

function setInvalid(args) {
	if (!args.valid) {
		setMessageError(args.message);
	} else  {
		$.messageErorLogin.height = 0;
		if (!isAndroid) $.messageErorLogin.visible = false;
		$.lineBar.backgroundColor = $.isFocused ? focusBarColor :  blurBarColor;
	}
}

function removeError() {
	$.messageErorLogin.height = 0;
	if (!isAndroid) $.messageErorLogin.visible = false;
	$.lineBar.backgroundColor = $.isFocused ? focusBarColor :  blurBarColor;
	$.tfInput.color = inputColor;
}

function setEnabled(status) {
	$.tfInput.touchEnabled = status;
}

function setValidations(_validations) {
	validations = _validations;
}

function setReturnKeyType(returnKeyType) {
	$.tfInput.setReturnKeyType(returnKeyType);
}

function show() {
	if (isOptionDialog) {
		$.subject.show();
	}
}

function focus() {
	$.tfInput.focus();
}

function blur() {
	$.tfInput.blur();
}

function getValue() {
	return $.tfInput.getValue() || "";
}

function setEditable(editable){
	$.subView.touchEnabled = editable;
	$.mask.height = editable ? 0 : Ti.UI.FILL;
	$.tfInput.editable = editable;
	$.editable = editable;
}

function hideField(){
	$.container.hide();
}

function showField(){
	$.container.show();
}
function resetColor(){
	$.tfInput.color = inputColor;
}
