import { Link } from "react-router-dom";
import { useAuthContext } from "./security/AuthProvider";
import logo from "../images/logo_header.jpg"


export default function HeaderComponent(){
  const authContext = useAuthContext();
  const isAuthenticated = authContext.authenticated;

  function logout(){
    authContext.logoutFunction();
  }

  return (
      <div className="header-component">
          <div className="header-profile">
              <img src={logo} className="header-logo" alt="logo for Car sale Application" />
          </div>   
        <div className="header-component-inner">

        {isAuthenticated && ( <Link  to='/home' className="link home-link">
          <button className="btn header-btn">
            Home
          </button>
        </Link> )}
        {!isAuthenticated && (<Link to="/login" className="link login-link">
          <button className="btn header-btn">
            Login
          </button>
        </Link>)}
        {isAuthenticated && (<Link to="/my-cars" className="link my-cars-link">
          <button className="btn header-btn">
            My Cars
          </button>
        </Link>)}
        {!isAuthenticated && (<Link to={'/create-user'} className="link create-account-link">
          <button className="btn header-btn">
            Create Account
          </button>
        </Link>)}
        {isAuthenticated && (<Link to="/sell-car" className="link sell-link">
          <button className="btn header-btn">
            Add Car
          </button>
        </Link>)}
        {isAuthenticated && (<Link onClick={logout} to="/login" className="link logout-link">
          <button className="btn header-btn">
            Log Out
          </button>
          </Link>)}
          </div>
      </div>

  )

}