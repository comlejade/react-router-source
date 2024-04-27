/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route, Link, NavLink, Navigate, useRoutes} from './react-router-dom'
// import {createBrowserHistory} from './history'
// import { Home } from './components/Home'
// import { User } from './components/User'
// import { About } from './components/About'
// import { UserAdd } from './components/UserAdd'
// import { UserList } from './components/UserList'
// import { UserDetail } from './components/UserDetail'

// let activeStyle = {color: 'red'}

import RoutesConfig from './RouterConfig'
import { useState } from 'react'
import { Foo } from './components/Foo'

function AppRouter() {
  let [routes, setRoutes] = useState(RoutesConfig)

  const handleClick = () => {
    setRoutes([
      ...routes,
      {path: '/foo', element: <Foo></Foo>}
    ])
  }
  return (
    <div>
      {useRoutes(routes)}
      <button onClick={handleClick}>动态路由</button>
    </div>
  )
}

let activeStyle =  {color: 'red'}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ul>
    <li>
      <NavLink style={({isActive}) => isActive ? activeStyle: {}} to="/">去首页</NavLink>
    </li>
    <li>
      <Link to="/user">用户</Link>
    </li>
    <li>
      {/* <Link to="/about">关于</Link> */}
      {/* <Navigate to= '/about'/> */}
    </li>
  </ul>
  <AppRouter />
    {/* <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/user' element={<User />}>
        <Route path='add' element={<UserAdd />} />
        <Route path='list' element={<UserList />} />
        <Route path='detail/:id' element={<UserDetail />} />
      </Route>
      <Route path='/about' element={<About />} />
    </Routes> */}
  </BrowserRouter>
)
