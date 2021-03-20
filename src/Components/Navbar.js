import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


const Navbar = () => {
    const { logout, user } = useAuth0();
    return(
      <nav>   
        <div className="brand">
          <h1>Text App</h1>
        </div>
        <Link to={'/upload'}>
          <button class="hoverable">Upload</button>
        </Link>
        <Link to={'/download'}>
          <button class="hoverable">Download</button>
        </Link>
        <div id="welcome">
          Welcome {user.name}
        </div>
        <div className="login">
          <button class="hoverable" onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
        </div>
      </nav>
    )
}
export default Navbar 