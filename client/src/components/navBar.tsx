import { NavLink } from "react-router-dom";


type NavBarProps = {
    userName: string | undefined;
};

export default function NavBar({ userName } : NavBarProps){
    function setNavBar() {
        if (userName) {
            <NavLink to = '/logout'> 
            {userName} 
            </NavLink>
        }
        else {
            <NavLink to = '/signup'>
                
            </NavLink>
        }
    }
    
}
