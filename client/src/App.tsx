import { useState } from 'react'
import './App.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './components/Login'
import { Authentication } from './services/Authentication'
import CreateBook from './components/CreateBook'
import { Database } from './services/Database'
import ViewAllBooks from './components/ViewAllBooks'


const authentication = new Authentication(); 
const database = new Database(authentication);


function App() {
  const [userName, setUserName] = useState<string | undefined>(undefined)
  
  authentication.getCurUser().then(user => {
        if (user.username) {
          setUserName(user.username);
          authentication.setCurrentUser(user);
        }
    })
    .catch(err => {
        console.log(err)
    });

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
          element: <Login authentication={authentication} setUserNameCallBack={setUserName}/>
        },
        {
          path:"/profile",
          element: <div> profile pg </div>
        },
        {
          path:"/books",
          element: <ViewAllBooks database={database}/>
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
