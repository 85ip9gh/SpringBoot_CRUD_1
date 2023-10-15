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
      {isAuthenticated && <Link  to='/home' className="link home-link">Home</Link> }
      {!isAuthenticated && <Link to="/login" className="link login-link">Login</Link>}
      {isAuthenticated && <Link to="/my-cars" className="link my-cars-link">My Cars</Link>}
      {!isAuthenticated && <Link to={'/create-user'} className="link create-account-link">Create Account</Link>}
      {isAuthenticated && <Link to="/sell-car" className="link sell-link">Add Car</Link>}
      {isAuthenticated && <Link onClick={logout} to="/login" className="link logout-link">Logout</Link>}
    </div>

  )

}