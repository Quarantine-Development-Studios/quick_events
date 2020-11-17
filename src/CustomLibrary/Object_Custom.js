
//#region interactable 
class ButtonReq {
    constructor(name, textValue, callback, callbackPointer) {


        this.name = name + '-button';
        this.value = (textValue) ? textValue : '';
        this.callback = callback;
        this.callbackPointer = (callbackPointer !== undefined) ? callbackPointer : this.name;
    }
}

class LabelReq {
    constructor(name, textValue, callbackPointer) {
        this.name = name;
        this.value = textValue;
        this.callbackPointer = (callbackPointer !== undefined) ? callbackPointer : this.name;
    }
}

module.exports = {
    ButtonReq,
    LabelReq,

}
