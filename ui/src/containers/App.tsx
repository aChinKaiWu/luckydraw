import React from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Drawer from './Drawer/Drawer'
import Winner from './Winner'
import Home from './Home'
import routes from '../constants/routes'
import Award from './Award'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <Route exact path={routes.drawer} component={Drawer} />
        <Route exact path={routes.winner} component={Winner} />
        <Route exact path={routePath.award} component={Award} />
        <Redirect to={routePath.home} />
      </Switch>
    </Router>
  )
}
