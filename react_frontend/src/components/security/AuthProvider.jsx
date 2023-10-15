import React, { createContext, useContext, useState } from 'react';
import { basicAuthentication } from '../../api/CarSaleApiService';
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

     async function login(username, password){

        const basicAuthToken = 'Basic ' + window.btoa(username + ":" + password)

       const loginResponse = basicAuthentication(basicAuthToken).then(
            (response) =>{
              console.log(response)
      
              if(response.status == 200){
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
                console.log("check2");  
              }else{
                console.log("check3");
                setAuthenticated(false);
                setUser(null);
                setToken(null);
              }
            } 
              ).catch((error) => {
                console.log(error);
              } )

              console.log("login Response " + loginResponse)
              return await loginResponse;
        }

    function logout(){
      setAuthenticated(false);
      setUser(null);
      setToken(null);
    }
  
      return (
          <AuthContext.Provider value={{ user, login, logout, authenticated, setAuthenticated, token, type, setType, brand, setBrand, age, setAge, color, setColor }}>
              {children}
          </AuthContext.Provider>
      )
}

    