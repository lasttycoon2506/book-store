import { createContext, useState } from 'react'
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



  authentication.getCurUser().then(user => {
    if (user) {
      authentication.setCurrentUser(user);
      authentication.setUserName(user.username);
      authentication.setSessionToken();
      return user;
    }
    return undefined;
  })
  .catch(err => {
    console.log(err)
});



function App() {
  
  
  const router = createBrowserRouter([
    {
      element: (
        <>
            <NavBar authentication={authentication}/> 
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
          element: <Login authentication={authentication} />
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
