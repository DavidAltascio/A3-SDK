import { A3AppContent } from '../model/appContent';
import { A3RequestHeader } from '../model/requestHeader';
import { A3ApiService } from './apiservice';
import { A3Response } from '../model/response';
import { A3CommonService } from './commonservice';

export class A3AppService extends A3ApiService {
    constructor(){
        super();
    }
    #resolveApiUrl(appUrl, apiRoutes){
        const baseApiUrl = A3CommonService.getSessionStorage('apiPath');
        if(baseApiUrl != null){
            if(apiRoutes !== null && apiRoutes !== ''){
                apiRoutes = apiRoutes.replace('/', '-');
                return baseApiUrl + appUrl + '/'+apiRoutes;
            }
            return baseApiUrl + appUrl ;
        }
        return appUrl;
    }
    #resolveApiHeaders(){
        let headerArray = [];
        const userKey = A3CommonService.a3UserKey();
        headerArray.push(new A3RequestHeader('Content-Type', 'application/json').renderData());
        if(userKey != null){
            headerArray.push(new A3RequestHeader('Authorization', userKey.accessToken).renderData());
            headerArray.push(new A3RequestHeader('AccountID', userKey.accountCode).renderData());
        }
        if(A3CommonService.getSessionStorage('appCode') != null){
            headerArray.push(new A3RequestHeader('AppKey', A3CommonService.getSessionStorage('appCode')).renderData());
        }
        headerArray.push(new A3RequestHeader('IsPortal', 'N').renderData());       
        return headerArray;
    }
    #resolveApiBodyContent(apiRoutes, customHeaders = null, bodyContent = null){
        const appBodyContent = new A3AppContent(A3CommonService.getSessionStorage('appCode'), 'application/json', apiRoutes);
        appBodyContent.userCode = '';
        appBodyContent.customHeaders = customHeaders;
        appBodyContent.bodyContent = bodyContent;
        return JSON.stringify(appBodyContent);
    }
    #resolveApiResponse(apiResponse){
        const a3Response = new A3Response(apiResponse.isSuccess, apiResponse.message, null);
        if(apiResponse.isSuccess && A3CommonService.checkJSONData(apiResponse.data)){
            a3Response.apiData = JSON.parse(apiResponse.data);
        }
        return a3Response;
    }
    async get(apiRoutes, customHeaders = null, bodyContent = null, showloading = false){
       const getResponse =  await this._apiPost(this.#resolveApiUrl('Apps/Get', apiRoutes), 
        this.#resolveApiHeaders(), this.#resolveApiBodyContent(apiRoutes, customHeaders, bodyContent), showloading);
        return this.#resolveApiResponse(getResponse);
    }
     async post(apiRoutes, customHeaders = null, bodyContent = null, showloading = false){
        const getResponse =  await this._apiPost(this.#resolveApiUrl('Apps/Post', apiRoutes), 
         this.#resolveApiHeaders(), this.#resolveApiBodyContent(apiRoutes, customHeaders, bodyContent), showloading);
         return this.#resolveApiResponse(getResponse);
     }
     async put(apiRoutes, customHeaders = null, bodyContent = null, showloading = false){
        const getResponse =  await this._apiPost(this.#resolveApiUrl('Apps/Put', apiRoutes), 
         this.#resolveApiHeaders(), this.#resolveApiBodyContent(apiRoutes, customHeaders, bodyContent), showloading);
         return this.#resolveApiResponse(getResponse);
     }
     async delete(apiRoutes, customHeaders = null, bodyContent = null, showloading = false){
        const getResponse =  await this._apiPost(this.#resolveApiUrl('Apps/Delete', apiRoutes), 
         this.#resolveApiHeaders(), this.#resolveApiBodyContent(apiRoutes, customHeaders, bodyContent), showloading);
         return this.#resolveApiResponse(getResponse);
     }
}