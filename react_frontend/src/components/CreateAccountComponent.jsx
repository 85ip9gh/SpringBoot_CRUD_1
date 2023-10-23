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

  const submit = async (e) => {
    e.preventDefault();
    if(password === passwordConfirm){
        const created = await createUser(username,password);
        if(created.status == 200){
          setUserCreated(true);
        } 

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
        <form method="POST" onSubmit={submit}>
          <p className="form-title">
            Enter Details
          </p>
        <div className="form-row">
          <label name="username" >Username: </label>
          <input name="username" className="input-text"  type="text" value={username} onChange={handleUsernameChange} required></input>
        </div>

        <div className="form-row">
          <label name="password">Password: </label>
          <input name="password" className="input-password" type="password" value={password} onChange={handlePasswordChange} required></input>
        </div>

        <div>
          <label name="password-confirm">Confirm Password: </label>
          <input name="password-confirm" className="input-password" type="password" value={passwordConfirm} onChange={handlePasswordConfirmChange} required></input>
        </div>

        <button type="submit" className="btn">Create Account</button>
      </form>}
      
    </div>

  )
}