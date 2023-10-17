import React from 'react'
import { A3AppService } from './services/appservice';
import { A3AuthService } from './services/authservice';
import { A3BaseService } from './services/baseservice';
import { A3CommonService } from './services/commonservice';
import { A3CryptoService } from './services/cryptoservice';
import styles from './styles.module.css'

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}
export const A3Service = {
  Initialize: (baseApiUrl) => A3CommonService.setSessionStorage('apiPath', baseApiUrl),
  BaseApiService: { 
    Get: (url, customHeaders = null, bodyConent = null, showloading = false) => new A3BaseService().get(url, customHeaders, bodyConent, showloading),
    Post: (url, customHeaders = null, bodyConent = null, showloading = false) => new A3BaseService().post(url, customHeaders, bodyConent, showloading),
    Put: (url, customHeaders = null, bodyConent = null, showloading = false) => new A3BaseService().put(url, customHeaders, bodyConent, showloading),
    Delete: (url, customHeaders = null, bodyConent = null, showloading = false) => new A3BaseService().delete(url, customHeaders, bodyConent, showloading),
  },
  AppApiService:  {
    Get: (url, customHeaders = null, bodyConent = null, showloading = false) => new A3AppService().get(url, customHeaders, bodyConent, showloading),
    Post: (url, customHeaders = null, bodyConent = null, showloading = false) => new A3AppService().post(url, customHeaders, bodyConent, showloading),
    Put: (url, customHeaders = null, bodyConent = null, showloading = false) => new A3AppService().put(url, customHeaders, bodyConent, showloading),
    Delete: (url, customHeaders = null, bodyConent = null, showloading = false) => new A3AppService().delete(url, customHeaders, bodyConent, showloading),
  },
  AuthService: {
    login:(url, loginModel, showloading = false) => new A3AuthService().login(url, loginModel, showloading),
    logout:(url, showloading = false) => new A3AuthService().logout(url,showloading),
    isAuth:() => A3CommonService.a3UserToken(),
    loggedInUser:()=> A3CommonService.a3UserKey()
  },
  CommonService:{
    encrypt:(data) => A3CryptoService.encrypt(data),
    decrypt:(data) => A3CryptoService.decrypt(data)
  }
}