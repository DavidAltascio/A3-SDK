export class A3AppContent {
    get appCode(){return this._appCode;}
    set appCode(value){this._appCode = value;}
    get userCode(){return this._userCode;}
    set userCode(value){this._userCode = value;}
    get apiUrl(){return this._apiUrl;}
    set apiUrl(value){this._apiUrl = value;}
    get customHeaders(){return this._customHeaders;}
    set customHeaders(value){this._customHeaders = value;}
    get contentType(){return this._contentType;} // = "application/json";
    set contentType(value){this._contentType = value;}
    get bodyContent(){return this._bodyContent;}
    set bodyContent(value){this._bodyContent = value;}
    constructor(appCode, contentType, apiUrl){
        this.appCode = appCode;
        this.contentType = contentType;
        this.apiUrl = apiUrl;
    }
}