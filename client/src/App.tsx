import { useState } from 'react'
import './App.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './components/Login'
import { Authentication } from './services/Authentication'
import CreateBook from './components/CreateBook'
import { Database } from './services/Database'


const authentication = new Authentication(); 
const database = new Database(authentication);

function App(): JSX.Element {
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
          path:"/login",
          element: <Login authentication={authentication} setUserNameCb={setuserName}/>
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
          path:"/createBook",
          element: <CreateBook database={database}/>
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
