import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { store } from './app.store.js'
import { RouterProvider } from 'react-router'
import { routes } from './app.routes.jsx'
import { useEffect } from 'react'  
import { useSelector } from 'react-redux'
import useAuth from '../features/auth/hooks/useAuth.js'

const App = () => {
  const { handleGetCurrentUser } = useAuth();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    handleGetCurrentUser();
  }, [])
  
  return (
        <RouterProvider router={routes} />
  )
}

export default App