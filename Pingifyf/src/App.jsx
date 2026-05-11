import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ChatPage from './pages/ChatPage'
import Welcome from './pages/Welcome'
import ProtectedRoute from './components/ProtectedRoute'
import { useContext } from 'react'
import { Context } from './context/Context'
// import 'App.css'

const App = () => {
  const { userdata } = useContext(Context)
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    }
    , {
      path: '/dash',
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      )
    }
    , {
      path: '/',
      element: (userdata ? <Dashboard /> : <Welcome />)
    }
  ])
  return (
    <div >
      <RouterProvider router={router} />
    </div>
  )
}

export default App