import React from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Drawer from './Drawer'

const routePath = {
  home: '/home',
  drawer: '/drawer'
}

const Home = () => <h1>Hello Lucky Draw</h1>

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={routePath.home} component={Home} />
        <Route exact path={routePath.drawer} component={Drawer} />
        <Redirect to={routePath.home} />
      </Switch>
    </Router>
  )
}
