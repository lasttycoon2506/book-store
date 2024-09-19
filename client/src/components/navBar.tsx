import { NavLink } from "react-router-dom";


type NavBarProps = {
    userName: string | undefined;
};

export default function NavBar({ userName } : NavBarProps): JSX.Element {
    function renderLoginLogout(): JSX.Element {
        if (userName) {
            return (
                <NavLink to ="/logout" style={{float:"right"}}> 
                    {userName} 
                </NavLink> 
            );
        }
        else {
            return (
                <NavLink to = "/login" style={{float:"right"}}>
                    Login
                </NavLink>
            );
        }
    }
    return (
        <div className="navbar">
            <NavLink to="/"> Home </NavLink>
            <NavLink to="/profile"> Profile </NavLink>
            <NavLink to="/books"> Books </NavLink>
            <NavLink to="/createBook"> Create Book</NavLink>
            {renderLoginLogout()}
        </div>
    )
}
