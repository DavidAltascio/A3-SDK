import { A3RequestHeader } from '../model/requestHeader';
import { A3Response } from '../model/response';
import { A3ApiService } from './apiservice';
import { A3CommonService } from './commonservice';
import { A3CryptoService } from './cryptoservice';

export class A3AuthService {
    constructor(){}
    #resolveApiUrl(url){
        const httpPath = A3CommonService.getSessionStorage('apiPath');
        if(httpPath != null){
            return httpPath + url;
        }
        return url;
    }
    #resolveApiHeaders(){
        let headerArray = [];
        const userKey = A3CommonService.a3UserKey();
        headerArray.push(new A3RequestHeader('Content-Type', 'application/json').renderData());
        if(userKey != null){
            headerArray.push(new A3RequestHeader('Authorization', userKey.accessToken).renderData());
            headerArray.push(new A3RequestHeader('AccountID', userKey.accountCode).renderData());
        }
        headerArray.push(new A3RequestHeader('IsPortal', 'Y').renderData());
        return headerArray;
    }
    #resolveApiResponse(apiResponse){
        const a3Response = new A3Response(apiResponse.isSuccess, apiResponse.message, null);
        if(apiResponse.isSuccess && A3CommonService.checkJSONData(apiResponse.data)){
            a3Response.apiData = JSON.parse(apiResponse.data);
        }
        return a3Response;
    }
    async login(url, loginModel, showloading = false) {
        loginModel.password = A3CryptoService.encrypt(loginModel.password);
        const getResponse =  await new A3ApiService()._apiPost(this.#resolveApiUrl(url), 
        this.#resolveApiHeaders(), JSON.stringify(loginModel), showloading);
        const data = this.#resolveApiResponse(getResponse)
        if(data.apiSuccess){
            A3CommonService.a3Login(data.apiData);
        }
        return data;
    }
    async logout(url, showloading = false) {
        const getResponse =  await new A3ApiService()._apiPost(this.#resolveApiUrl(url), 
        this.#resolveApiHeaders(), showloading);
        const data = this.#resolveApiResponse(getResponse)
        if(data.apiSuccess){
            A3CommonService.a3Logout();
        }
        return data;
    }
}