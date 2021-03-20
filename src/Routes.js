import { Switch, Route } from 'react-router-dom';
import Downloads from './Components/Downloads';
import Upload from './Components/Upload';



const Routes = (user) => {
  console.log(user)
    return (
      <main>
        <Switch>
          <Route exact path="/upload" component={() => <Upload user={user} />}></Route>
          <Route exact path="/download" component={Downloads}></Route>
          <Route path="/*" component={Downloads}></Route>
        </Switch>
      </main>
    )
}
export default Routes;