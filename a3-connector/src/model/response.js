export class A3Response {
    get apiSuccess(){return this._apiSuccess;}
    set apiSuccess(value){this._apiSuccess = value;}
    get apiErrorMessage(){return this._apiErrorMessage;}
    set apiErrorMessage(value){this._apiErrorMessage = value;}
    get apiData(){return this._apiData;}
    set apiData(value){this._apiData = value;}
    constructor(success, errorMessage, data){
        this.apiSuccess = success;
        this.errorMessage = errorMessage;
        this.data = data;
    }
}