import './App.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './components/Login'
import { Authentication } from './services/Authentication'
import { Database } from './services/Database'
import ViewBooks from './components/ViewBooks'
import Profile from './components/Profile'
import AddBook from './components/AddBook'
import AddUser from './components/AddUser'
import Home from './components/Home'

const authentication = new Authentication()
const database = new Database(authentication)

//gets initial logged-in user (if-any)
authentication
    .getCurUser()
    .then((user) => {
        if (user) {
            authentication.setCurrentUser(user)
            authentication.setUserName(user.username)
            authentication.setSessionToken()
            return user
        }
        return undefined
    })
    .catch((err) => {
        console.log(err)
    })

function App(): JSX.Element {
    const router = createBrowserRouter([
        {
            element: (
                <>
                    <NavBar authentication={authentication} />
                    <Outlet />
                </>
            ),
            children: [
                {
                    path: '/',
                    element: <Home/>,
                },
                {
                    path: '/login',
                    element: <Login authentication={authentication} />,
                },
                {
                    path: '/profile',
                    element: <Profile />,
                },
                {
                    path: '/books',
                    element: <ViewBooks database={database} />,
                },
                {
                    path: '/addBook',
                    element: <AddBook database={database} />,
                },
                {
                    path: '/addUser',
                    element: <AddUser database={database} />,
                },
            ],
        },
    ])
    return (
        <div className="wrapper">
            <RouterProvider router={router} />
        </div>
    )
}

export default App
