import { Switch, Route } from 'react-router-dom';
import Downloads from './Downloads';
import Upload from './Upload';

const Routes = (user) => {
    return (
      <main>
        <Switch>
          <Route exact path="/upload" component={() => <Upload user={user} />}></Route>
          <Route exact path="/download" component={() => <Downloads user={user} />}></Route>
          <Route path="/*" component={() => <Downloads user={user} />}></Route>
        </Switch>
      </main>
    )
}
export default Routes;