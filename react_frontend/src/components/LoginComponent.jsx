import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./security/AuthProvider";
import { useState } from "react";


export default function LoginComponent(){

const navigate = useNavigate();
  const authContext = useAuthContext();


  const [username, setUsername] = useState("sam");
  const [password, setPassword] = useState("man");
  const [authenticated, setAuthenticated] = useState(authContext.authenticated);
  const [navigated, setNavigated] = useState(false);

  function handleUsernameChange(event){
    setUsername(event.target.value)
  }

  function handlePasswordChange(event){
    setPassword(event.target.value);
  }

   async function submit(){
    await authContext.login(username, password);
    navigate("/home");
  }


  return(

    <div className="container" >
      {!navigated && 
      <h2 id="error-message">
        Wrong Credentials
      </h2>}
      <form>
          <p className="login-form-title">
            Login
          </p>
          <div className="login-row">
            <label name="username" className="login-label">Username: </label>
            <input name="username"  type="text" className="input-text" value={username} onChange={handleUsernameChange}></input>
          </div>

          <div className="login-row">
            <label name="password" className="login-label">Password: </label>
            <input name="password" className="input-password" type="password" value={password} onChange={handlePasswordChange} ></input>
          </div>

          <button type="button" onClick={submit} className="btn">Submit</button>
      </form>
    </div>

  )
}