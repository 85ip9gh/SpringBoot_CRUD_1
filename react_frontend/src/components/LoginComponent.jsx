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

    <div className="loginComponent" >
      <h2 id="error-message">

      </h2>
      <form>
        <div id="username-div">
          <label name="username" >Username: </label>
          <input name="username"  type="text" value={username} onChange={handleUsernameChange}></input>
        </div>

        <div>
          <label name="password">Password: </label>
          <input name="password" type="password" value={password} onChange={handlePasswordChange} ></input>
        </div>

        <button type="button" onClick={submit} >Submit</button>
      </form>
    </div>

  )
}