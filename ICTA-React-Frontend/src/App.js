import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './Navbar';
import Routes from './Routes';
import './App.css';

export default function App() {

  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect,
    user, 
    //getAccessTokenSilently,
  } = useAuth0();

 

  if (isLoading) 
    return <div>Loading...</div>;
  
  if (error) 
    return <div>Oops... {error.message}</div>;
  
  if (isAuthenticated) {
    // const accessToken = await getAccessTokenSilently();
    return (
      <div className="App">       
        <BrowserRouter>
          <Navbar/>
          <Routes user={user} />
        </BrowserRouter>
        {};
      </div>
    );
  } else {
    return (
      <div className="App App-login">
        <button onClick={loginWithRedirect}>Log in</button>
      </div>
    )
  }
}
