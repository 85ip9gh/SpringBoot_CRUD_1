import { Link } from "react-router-dom";


export default function HeaderComponent(){

  return (

    <div className="header-component">
      {<Link  to='/home' className="home-link">Home</Link> }
      {<Link to="/login" className="login-link">Login</Link>}
      {/* {<Link onClick={logout} to="/login">Logout</Link>} */}
      {<Link to={'/create-user'} className="create-account-link">Create Account</Link>}
    </div>

  )

}