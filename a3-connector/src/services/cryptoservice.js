import CryptoJS from 'crypto-js';

export class A3CryptoService {
   static #a3Key = CryptoJS.enc.Utf8.parse(this.#getA3Key());
   static #a3CryptoOpt = {
        keySize: 128,
        iv: this.#a3Key,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }
    static #getA3Key(){
        const charDecimals = [64,108,116,64,53,99,49,48,99,114,121,116,48,107,101,121];
        let finalKey = '';
        charDecimals.forEach(x=>finalKey += String.fromCharCode(x));
        charDecimals.reverse().forEach(x=> finalKey += String.fromCharCode(x));
        return finalKey;
    }
    static encrypt(data){
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), this.#a3Key, this.#a3CryptoOpt);
        return encryptedData.toString();
    }
    static decrypt(data){
        const decrypted = CryptoJS.AES.decrypt(data.toString(), this.#a3Key, this.#a3CryptoOpt);
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}