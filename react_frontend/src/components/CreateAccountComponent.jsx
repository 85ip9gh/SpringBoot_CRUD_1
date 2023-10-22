import { useState } from "react";
import { createUser } from "../api/CarSaleApiService";


export default function LoginComponent(){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [userCreated, setUserCreated] = useState(false);

  function handleUsernameChange(event){
    setUsername(event.target.value)
  }

  function handlePasswordChange(event){
    setPassword(event.target.value);
  }

  function handlePasswordConfirmChange(event){
    setPasswordConfirm(event.target.value);
  }

   async function submit(){
    if(password === passwordConfirm){
        createUser(username,password);
        setUserCreated(true);
    } else {
        setPasswordMatch(false);
    }
    
  }


  return(
    <div className="container" >
        {!passwordMatch && <h1 className="create-account-pop-up">Your passwords don't match!</h1>}

        {userCreated && 
            <div>
                <h1 className="create-account-pop-up">
                    User {username} has been created!
                </h1>
            </div>}

        {!userCreated && 
        <form>

        <div>
          <label name="username" >Username: </label>
          <input name="username"  type="text" value={username} onChange={handleUsernameChange}></input>
        </div>

        <div>
          <label name="password">Password: </label>
          <input name="password" type="password" value={password} onChange={handlePasswordChange} ></input>
        </div>

        <div>
          <label name="password-confirm">Confirm Password: </label>
          <input name="password-confirm" type="password" value={passwordConfirm} onChange={handlePasswordConfirmChange} ></input>
        </div>

        <button type="button" className="btn" onClick={submit} >Submit</button>
      </form>}
      
    </div>

  )
}