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
    await authContext.login(username, password).then(()=>navigate("/home")).catch(error => console.log("loginSubmitError"))
  }


  return(

    <div className="loginComponent" > 
      <form>

        <div>
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