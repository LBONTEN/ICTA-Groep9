import './App.css';
import { useAuth0 } from '@auth0/auth0-react';

function App() {

  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect,
    logout,
  } = useAuth0();


  if (isLoading) 
    return <div>Loading...</div>;
  
  if (error) 
    return <div>Oops... {error.message}</div>;
  

  if (isAuthenticated)
    return (
      <div className="App">
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log out
        </button>
      </div>
    );
    else
      return (
        <div class="App">
          <button onClick={loginWithRedirect}>Log in</button>
        </div>
      )

}

export default App;
