import { useState } from "react";
import { useAuthContext } from "./security/AuthProvider";


export default function LoginComponent(){

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [userCreated, setUserCreated] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const authContext = useAuthContext();

  function handleFormChange(event){
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  const submit = async (e) => {
    e.preventDefault();
    if(form.password === form.confirmPassword){
        const created = await authContext.createAccount(form.username,form.password);
        if(created == 200){
          setUserCreated(true);
          setWrongCredentials(false);
        } else{
          setWrongCredentials(true);
        } 

    }
    
  }


  return(
    <div className="container container-create-account" >
        {form.password !== form.confirmPassword ? 
        <div className="error-msg-box">
          <p className="error-msg">
            passwords do not match
          </p>
        </div> : <></>
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
                    user {form.username} has been created
                </p>
            </div>}

        {!userCreated && 
        <form method="POST" onSubmit={submit} className="create-account-container" >
          <p className="form-title">
            Create Account
          </p>
        <div className="form-row">
          {/* <label name="username" >Username: </label> */}
          <input name="username" className="input-text"  type="text" value={form.username} placeholder="Username" onChange={handleFormChange} required></input>
        </div>

        <div className="form-row">
          {/* <label name="password">Password: </label> */}
          <input name="password" className="input-password" type="password" placeholder="Password" value={form.password} onChange={handleFormChange} required></input>
        </div>

        <div className="form-row">
          {/* <label name="password-confirm">Confirm Password: </label> */}
          <input name="confirmPassword" className="input-password" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleFormChange} required></input>
        </div>
          <p className="forgot-password">Forgot password?</p>

        <button type="submit" className="btn btn-form">Create Account</button>
      </form>}
      
    </div>

  )
}