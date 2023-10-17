import { A3UserInfo } from '../model/userInfo';
import { A3CryptoService } from './cryptoservice';

export class A3CommonService {
   static setSessionStorage(key, value, isEncrypt = false) {
        let data = value;
        if(isEncrypt){
            data = A3CryptoService.encrypt(value);
        }
        const storingData = JSON.stringify({isEncrypt:isEncrypt, data: data});
        sessionStorage.setItem(key, storingData);
    }
   static getSessionStorage(key) {
        const storedData = sessionStorage.getItem(key);
        if(!storedData){
            return null;
        }
        const parsedData = JSON.parse(storedData);
        if(parsedData.isEncrypt){
            return A3CryptoService.decrypt(parsedData.data);
        }
       return parsedData.data;
    }
    static removeSession(key){       
        sessionStorage.removeItem(key);
    }
   static checkJSONData(data){
        try{
            JSON.parse(data);
        }catch(Error){
           return false;
        }
        return true;
    }

    static a3Login(data){
        if(data){
            this.setSessionStorage('userKey', data, true);
            this.setSessionStorage('userToken', data.accessToken, true);
        }       
    }
    static a3Logout(){
        this.removeSession('userKey');
        this.removeSession('userToken');
    }

    static a3UserToken(){
        return this.getSessionStorage('userToken');
    }

    static a3UserKey(){
        return JSON.parse(this.getSessionStorage('userKey'));
    }
}