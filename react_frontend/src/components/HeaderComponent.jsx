import { Link } from "react-router-dom";
import { useAuthContext } from "./security/AuthProvider";


export default function HeaderComponent(){
  const authContext = useAuthContext();
  const isAuthenticated = authContext.authenticated;

  function logout(){
    authContext.logoutFunction();
  }

  return (
      <div className="header-component">
        {authContext.authenticated &&
          <div className="header-profile">
              <p className="header-user">
              {authContext.user}
              </p>
          </div>   
      }
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