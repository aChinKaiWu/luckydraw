import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../../constants/routes'

const Home = () => {
  return (
    <>
      <h1>Hello Lucky Draw</h1>
      <ul>
        <li>
          <Link to={routes.winner}>Winner</Link>
        </li>
        <li>
          <Link to={routes.drawer}>Drawer</Link>
        </li>
      </ul>
    </>
  )
}

export default Home
