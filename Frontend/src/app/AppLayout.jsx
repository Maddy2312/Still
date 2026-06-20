import React from 'react'
import { Outlet } from 'react-router'
import Nav from '../shared/components/Nav.jsx'

const AppLayout = () => {
  return (
    <>
        <Nav/>
        <Outlet />
    </>
  )
}

export default AppLayout