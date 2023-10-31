import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./security/AuthProvider";
import { useState } from "react";
import logo from "../images/logo.jpg"


export default function LoginComponent(){

const navigate = useNavigate();
  const authContext = useAuthContext();


  const [username, setUsername] = useState("sam");
  const [password, setPassword] = useState("man");
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [hideLogin, sethideLogin] = useState(false);

  function handleUsernameChange(event){
    setUsername(event.target.value)
  }

  function handlePasswordChange(event){
    setPassword(event.target.value);
  }

   const submit = async (e) => {
    e.preventDefault();
    console.log("submit");
    const loginReply = await authContext.login(username, password);
    if(loginReply == 200){
      sethideLogin(true);
      navigate("/home");
    } else {
      setWrongCredentials(true);
    }
  }


  return(

    <div className="container" >

      {wrongCredentials && 
      <div className="error-msg-box">
        <h1 className="error-msg">
        {authContext.errorMsg}
        </h1>
      </div>  
      }

      {!hideLogin &&
        <form method="POST" onSubmit={submit}>
          <img src={logo} className="logo" alt="logo for Car sale Application" />
          {/* <p className="form-title">
            Login
          </p> */}
          <div className="form-row">
            {/* <label name="username" className="login-label">Username: </label> */}
            <input name="username"  type="text" className="input-text" placeholder="Username" value={username} onChange={handleUsernameChange} required></input>
          </div>

          <div className="form-row">
            {/* <label name="password" className="login-label">Password: </label> */}
            <input name="password" className="input-password" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required></input>
          </div>

          <button type="submit" className="btn btn-form">Login</button>
      </form>
      }
      
    </div>

  )
}