import { useState } from 'react'
import './App.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import NavBar from './components/NavBar'

function App() {
  const [userName, setuserName] = useState<string | undefined>(undefined)

  
  const router = createBrowserRouter([
    {
      element: (
        <>
          <NavBar userName={userName}/> 
          <Outlet />
        </>
      ),
      children: [
        {
          path:"/",
          element: <div> welcome home </div>
        },
        {
          path:"/profile",
          element: <div> profile pg </div>
        },
        {
          path:"/books",
          element: <div> books pg </div>
        },
        {
          path:"/createBooks",
          element: <div> createbooks pg </div>
        },
      ]
    }
  ])
  return (
    <div className="wrapper">
      <RouterProvider router={router}/>
    </div>
  )

}

export default App
