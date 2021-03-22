import { Switch, Route } from 'react-router-dom';
import Downloads from './Downloads';
import Upload from './Upload';
import Logs from './accessLogs'

const Routes = (user) => {
    return (
      <main>
        <Switch>
          <Route exact path="/upload" component={() => <Upload user={user} />}></Route>
          <Route exact path="/download" component={() => <Downloads user={user} />}></Route>
          <Route path="/logs" component={Logs}></Route>
          <Route path="/*" component={Logs}></Route>
        </Switch>
      </main>
    )
}
export default Routes;