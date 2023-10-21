import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./security/AuthProvider";
import { useState } from "react";


export default function LoginComponent(){

  const authContext = useAuthContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState("sam");
  const [password, setPassword] = useState("man");

  function handleUsernameChange(event){
    setUsername(event.target.value)
  }

  function handlePasswordChange(event){
    setPassword(event.target.value);
  }

   async function submit(){
    const loginReply = await authContext.login(username, password);

    navigate("/home");
  }


  return(

    <div className="container" >
      <h2 id="error-message">

      </h2>
      <form>
          <h3>
            Log in 
          </h3>
          <div className="login-row">
            <label name="username" >Username: </label>
            <input name="username"  type="text" className="input-text" value={username} onChange={handleUsernameChange}></input>
          </div>

          <div className="login-row">
            <label name="password">Password: </label>
            <input name="password" className="input-password" type="password" value={password} onChange={handlePasswordChange} ></input>
          </div>

          <button type="button" onClick={submit} className="btn">Submit</button>
      </form>
    </div>

  )
}