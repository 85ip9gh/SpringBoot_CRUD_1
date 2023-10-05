import { Link } from "react-router-dom";
import { useAuthContext } from "./security/AuthProvider";


export default function HeaderComponent(){
  const authContext = useAuthContext();
  const isAuthenticated = authContext.authenticated;

  function logout(){
    authContext.logout();
  }

  return (

    <div className="header-component">
      {isAuthenticated && <Link  to='/home' className="home-link">Home</Link> }
      {!isAuthenticated && <Link to="/login" className="login-link">Login</Link>}
      {isAuthenticated && <Link onClick={logout} to="/login">Logout</Link>}
      {!isAuthenticated && <Link to={'/create-user'} className="create-account-link">Create Account</Link>}
    </div>

  )

}