import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


const Navbar = () => {
    const { logout } = useAuth0();
    return(
      <nav>   
        <div className="brand">
          <h1>Text App</h1>
        </div>
        <Link to={'/upload'}>
          <button>Upload</button>
        </Link>
        <Link to={'/download'}>
          <button>Download</button>
        </Link>
        <div className="login">
          <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
        </div>
      </nav>
    )
}
export default Navbar 