import { A3RequestHeader } from '../model/requestHeader';
import { A3Response } from '../model/response';
import { A3CommonService } from './commonservice';
import { A3ApiService } from './apiservice';

export class A3BaseService extends A3ApiService {
    #baseUrl = '';
    constructor(url = ''){
        super();
        this.#baseUrl = this.#baseUrl + url;
    }
    #resolveApiUrl(url){
        const httpPath = A3CommonService.getSessionStorage('apiPath');
        if(httpPath != null){
            return httpPath + this.#baseUrl + url;
        }
        return this.#baseUrl + url;
    }
    #resolveApiHeaders(customHeaders = null){
        let headerArray = [];
        const userKey = A3CommonService.a3UserKey();
        headerArray.push(new A3RequestHeader('Content-Type', 'application/json').renderData());
        if(userKey != null){
            headerArray.push(new A3RequestHeader('Authorization', userKey.accessToken).renderData());
            headerArray.push(new A3RequestHeader('AccountID', userKey.accountCode).renderData());
        }
        headerArray.push(new A3RequestHeader('IsPortal', 'Y').renderData());
        if(customHeaders !== null){
            customHeaders.forEach(x =>{
                headerArray.push(x);
            });
        }
        return headerArray;
    }
    #resolveApiBodyContent(bodyContent = null){
        if(bodyContent != null){
            return JSON.stringify(bodyContent);
        }
        return null;
    }
    #resolveApiResponse(apiResponse){
        const a3Response = new A3Response(apiResponse.isSuccess, apiResponse.message, null);
        if(apiResponse.isSuccess && A3CommonService.checkJSONData(apiResponse.data)){
            a3Response.apiData = JSON.parse(apiResponse.data);
        }
        return a3Response;
    }
    async get(url, customHeaders = null, bodyContent = null, showloading = false){
       const getResponse =  await this._apiGet(this.#resolveApiUrl(url), 
        this.#resolveApiHeaders(customHeaders), this.#resolveApiBodyContent(bodyContent), showloading);
        return this.#resolveApiResponse(getResponse);
    }
    async getAll(url, customHeaders = null, bodyContent = null, showloading = false){
        const getResponse =  await this._apiGet(this.#resolveApiUrl(url), 
         this.#resolveApiHeaders(customHeaders), this.#resolveApiBodyContent(bodyContent), showloading);
         return this.#resolveApiResponse(getResponse);
     }
     async post(url, customHeaders = null, bodyContent = null, showloading = false){
        const getResponse =  await this._apiPost(this.#resolveApiUrl(url), 
         this.#resolveApiHeaders(customHeaders), this.#resolveApiBodyContent(bodyContent), showloading);
         return this.#resolveApiResponse(getResponse);
     }
     async put(url, customHeaders = null, bodyContent = null, showloading = false){
        const getResponse =  await this._apiPut(this.#resolveApiUrl(url), 
         this.#resolveApiHeaders(customHeaders), this.#resolveApiBodyContent(bodyContent), showloading);
         return this.#resolveApiResponse(getResponse);
     }
     async delete(url, customHeaders = null, bodyContent = null, showloading = false){
        const getResponse =  await this._apiDelete(this.#resolveApiUrl(url), 
         this.#resolveApiHeaders(customHeaders), this.#resolveApiBodyContent(bodyContent), showloading);
         return this.#resolveApiResponse(getResponse);
     }
}