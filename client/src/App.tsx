import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NavBar from './components/NavBar'

function App() {
  const [userName, setuserName] = useState<string | undefined>(undefined)

  
  const router = createBrowserRouter([
    {
      element: (
        <NavBar userName={userName}/> 
      ),
      children: [
        {
          path:"/",
          element: <div> welcome home </div>
        }
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
