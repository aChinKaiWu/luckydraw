import React from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

const routePath = {
  home: '/home',
  draw: '/draw'
}

const Home = () => <h1>Hello Lucky Draw</h1>
const Draw = () => <h1>Draw Draw Draw</h1>

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={routePath.home} component={Home} />
        <Route exact path={routePath.draw} component={Draw} />
        <Redirect to={routePath.home} />
      </Switch>
    </Router>
  )
}
