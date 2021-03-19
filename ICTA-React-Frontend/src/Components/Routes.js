import { Switch, Route } from 'react-router-dom';
import Downloads from './Downloads';
import Upload from './Upload';

const Routes = () => {
    return (
      <main>
        <Switch>
          <Route exact path="/upload" component={Upload}></Route>
          <Route exact path="/download" component={Downloads}></Route>
          <Route path="/*" component={Downloads}></Route>
        </Switch>
      </main>
    )
}
export default Routes;