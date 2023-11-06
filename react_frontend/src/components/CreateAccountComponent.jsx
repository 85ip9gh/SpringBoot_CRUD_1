import { useState } from "react";
import { createUser } from "../api/CarSaleApiService";
import { useAuthContext } from "./security/AuthProvider";
import logo from "../images/logo.jpg";


export default function LoginComponent(){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [userCreated, setUserCreated] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const authContext = useAuthContext();

  function handleUsernameChange(event){
    setUsername(event.target.value)
  }

  function handlePasswordChange(event){
    setPassword(event.target.value);
  }

  function handlePasswordConfirmChange(event){
    setPasswordConfirm(event.target.value);
  }

  const submit = async (e) => {
    e.preventDefault();
    if(password === passwordConfirm){
        setPasswordMatch(true);
        const created = await authContext.createAccount(username,password);
        
        if(created == 200){
          setUserCreated(true);
          setWrongCredentials(false);
        } else{
          setWrongCredentials(true);
        } 

    } else {
        setPasswordMatch(false);
    }
    
  }


  return(
    <div className="container" >
        {!passwordMatch && 
        <div className="error-msg-box">
          <p className="error-msg">
            passwords do not match
          </p>
        </div>
        }

        {wrongCredentials &&
        <div className="error-msg-box">
          <p className="error-msg">
            {authContext.errorMsg}
          </p>
        </div> 

        }

        {userCreated && 
            <div className="success-msg-box">
                <p className="success-msg">
                    User {username} has been created!
                </p>
            </div>}

        {!userCreated && 
        <form method="POST" onSubmit={submit}>
          <img src={logo} className="logo" alt="logo for Car sale Application" />
          {/* <p className="form-title">
            Create Account
          </p> */}
        <div className="form-row">
          {/* <label name="username" >Username: </label> */}
          <input name="username" className="input-text"  type="text" value={username} placeholder="Username" onChange={handleUsernameChange} required></input>
        </div>

        <div className="form-row">
          {/* <label name="password">Password: </label> */}
          <input name="password" className="input-password" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required></input>
        </div>

        <div className="form-row">
          {/* <label name="password-confirm">Confirm Password: </label> */}
          <input name="password-confirm" className="input-password" type="password" placeholder="Confirm Password" value={passwordConfirm} onChange={handlePasswordConfirmChange} required></input>
        </div>

        <button type="submit" className="btn btn-form">Create Account</button>
      </form>}
      
    </div>

  )
}