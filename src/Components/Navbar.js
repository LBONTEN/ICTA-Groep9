import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


const Navbar = () => {
    const { logout, user } = useAuth0();
    return(
      <nav>   
        <div className="brand">
          <h1>ICTA-Groep9 App</h1>
        </div>
        <Link to={'/upload'}>
          <button className="hoverable">Upload</button>
        </Link>
        <Link to={'/download'}>
          <button className="hoverable">Download</button>
        </Link>
        <Link to={'/logs'}>
          <button className="hoverable">Logs</button>
        </Link>
        <div id="welcome">
          <p>Welcome {user.name}</p>
        </div>
        <div className="login">
          <button className="hoverable" onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
        </div>
      </nav>
    )
}
export default Navbar 