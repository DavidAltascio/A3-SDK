import React, { useEffect } from 'react'

import { ExampleComponent, A3Service } from 'a3-connector';
import 'a3-connector/dist/index.css';

const App = () => {
  A3Service.Initialize('http://localhost:4000/Gateway');

const encrypt = (d) => {
  console.log(d);
  const encD = A3Service.CommonService.encrypt(d);
  const encE = A3Service.CommonService.decrypt(encD);
  console.log(encD);
  console.log(encE);
}
useEffect(() => {
encrypt('vincent');
})
const login = () => {
  var loginModel = {};
  loginModel.userName = document.getElementById('txtUserName').value;
  loginModel.password = document.getElementById('txtPassword').value;
  A3Service.AuthService.login('/Account/Login', loginModel).then(res =>{
    if(res.apiSuccess){

    } else {
      var userModel ={ userName: loginModel.userName, 
        password: A3Service.CommonService.encrypt(document.getElementById('txtPassword').value), 
        userType:'developer', 
        email: loginModel.userName,
        isEmailVerified: false,
        isEnableMFA:false,
        registeredDate:new Date()
      }
      A3Service.BaseApiService.Post('/Account/SignUp', null, userModel, false).then(res=>{

      });
    }
  });
  
}
const emailExists=()=>{
  const userName = document.getElementById('txtUserName').value;
  A3Service.BaseApiService.Get('/Account/VerifyEmailExists/'+ userName, null, null, false).then(res=>{
console.log(res);
  });
}

  return <div>
    <div><ExampleComponent text="My First Project" /></div>
    <div><input type="text" id="txtUserName" /></div>
    <div><input type="password" id="txtPassword" /></div>
    
    <div><button onClick={login}>Login</button></div>
    <div><button onClick={emailExists}>Check Email Exists</button></div>
    
    </div>
  
}

export default App
