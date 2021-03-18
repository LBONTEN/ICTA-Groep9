import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Downloads from './Components/Downloads';
import Upload from './Components/Upload';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

export default function App() {

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
  

  if (isAuthenticated) {
    return (
      <div className="App">
        <BrowserRouter>
          <nav>
            <div class="brand">
              <h1>Text App</h1>
            </div>
            <Link to={'/upload'}>
              <button>Upload</button>
            </Link>
            <Link to={'/download'}>
              <button>Download</button>
            </Link>
            <div class="login">
              <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
            </div>
          </nav>
          <main>
            <Switch>
              <Route exact path="/upload" component={Upload}></Route>
              <Route exact path="/download" component={Downloads}></Route>
              <Route path="/*" component={Downloads}></Route>
            </Switch>
          </main>
        </BrowserRouter>
      </div>
    );
  } else {
    return (
      <div class="App App-login">
        <button onClick={loginWithRedirect}>Log in</button>
      </div>
    )
  }
}
