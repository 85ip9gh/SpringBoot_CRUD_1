import React, { createContext, useContext, useState } from 'react';
import { basicAuthentication, createUser, logout } from '../../api/CarSaleApiService';
import { apiClient } from '../../api/ApiBaseURL';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext)

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState();
    const [type, setType] = useState();
    const [brand, setBrand] = useState();
    const [color, setColor] = useState();
    const [age, setAge] = useState();
    const [carID, setCarID] = useState();
    const [errorMsg, setErrorMsg] = useState();
    const [role, setRole] = useState();

     async function login(username, password){

      const basicAuthToken = 'Basic ' + window.btoa(username + ":" + password)
      try{
        const loginResponse = await basicAuthentication(basicAuthToken);
        setRole(loginResponse.data);
        console.log("LOGIN AUTH " + JSON.stringify(loginResponse.status));
        if(loginResponse.status === 200){
          setAuthenticated(true);
          setUser(username);
          setToken(basicAuthToken);
          
          apiClient.interceptors.request.use(
              (config) => {
                  console.log('intercepting')
                  config.headers.Authorization = basicAuthToken
                  return config
                }
                )
        } else{
          setAuthenticated(false);
          setUser(null);
          setToken(null);
        }

       return JSON.stringify(loginResponse?.status);
      } catch(error){
        setAuthenticated(false);
        setUser(null);
        setToken(null);
        if(!error.response){
          setErrorMsg('no server response');
        } else if(error.response.status === 401){
          setErrorMsg('unauthorized');
        } else {
          setErrorMsg('login Failed')
        }
      }
    }
    
    async function createAccount(username, password){
      try{
        const createResponse = await createUser(username, password);
        console.log(JSON.stringify(createResponse));
        return JSON.stringify(createResponse?.status);
      }catch(error){
        if(!error.response){
          setErrorMsg('no server response');
        } else if(error.response.status == 409){
          setErrorMsg('user already exists, please choose a different username')
        }else{
          setErrorMsg('create account failed')
        }
      }
    }


    function logoutFunction(){
      logout().then(
        setAuthenticated(false),
        setUser(null),
        setToken(null)
      ).catch(error => console.log(error));
     
    }
  
      return (
          <AuthContext.Provider value={{role, user, login, createAccount, logout, authenticated, setAuthenticated, token, type, setType, brand, setBrand, age, setAge, color, setColor, carID, setCarID, errorMsg }}>
              {children}
          </AuthContext.Provider>
      )
}

    