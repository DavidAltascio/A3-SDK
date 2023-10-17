export class A3RequestHeader {
    _key = '';
    _value = '';
    constructor(key, value){
        this._key = key;
        this._value = value;
    }
    renderData(){
        return [this._key, this._value];
    }
}