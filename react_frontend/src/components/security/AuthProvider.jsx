import React, { createContext, useContext, useState } from 'react';
import { basicAuthentication } from '../../api/CarSaleApiService';
import { apiClient } from '../../api/ApiBaseURL';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext)

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState();

    async function login(username, password){

        const basicAuthToken = 'Basic ' + window.btoa(username + ":" + password)

        await basicAuthentication(basicAuthToken).then(
            response =>{
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
                return true;
              }else{
                console.log("check3");
                setAuthenticated(false);
                setUser(null);
                setToken(null);
                return false;
              }
            } 
             
              ).catch(error => console.log(error))
        }

    function logout(){
      setAuthenticated(false);
      setUser(null);
      setToken(null);
    }
  
      return (
          <AuthContext.Provider value={{ user, login, logout, authenticated, setAuthenticated, token }}>
              {children}
          </AuthContext.Provider>
      )
}

    