import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./security/AuthProvider";
import { useState } from "react";


export default function LoginComponent(){

const navigate = useNavigate();
  const authContext = useAuthContext();

  const [form, setForm] = useState({
    username: "sam",
    password: "man"
  });

  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [hideLogin, sethideLogin] = useState(false);

  function handleFormChage(event){
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
    console.log(form);
  }

   const submit = async (e) => {
    e.preventDefault();
    console.log("submit");
    const loginReply = await authContext.login(form.username, form.password);
    if(loginReply == 200){
      sethideLogin(true);
      navigate("/market");
    } else {
      setWrongCredentials(true);
    }
  }


  return(

    <div className="container" >

      {wrongCredentials && 
      <div className="error-msg-box">
        <p className="error-msg">
        {authContext.errorMsg}
        </p>
      </div>  
      }

      {!hideLogin &&
        <form method="POST" onSubmit={submit} className="login-container">

          <p className="form-title">
            Login
          </p>
          <div className="form-row">
            <input name="username"  type="text" className="input-text" placeholder="Username" value={form.username} onChange={handleFormChage} required></input>
          </div>

          <div className="form-row">
            <input name="password" className="input-password" type="password" placeholder="Password" value={form.password} onChange={handleFormChage} required></input>
          </div>
            <p className="forgot-password">Forgot password?</p>

          <button type="submit" className="btn btn-form">Login</button>
      </form>
      }
      
    </div>

  )
}