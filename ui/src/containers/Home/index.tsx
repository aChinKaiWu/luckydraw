import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../../constants/routes'

const Home = () => {
  const routesList = [routes.winner, routes.drawer, routes.award]
  return (
    <>
      <h1>Hello Lucky Draw</h1>
      <ul>
        {routesList.map((route, index) => (
          <li key={`route${index}`}>
            <Link to={route}>{route}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Home
