import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import { AuthContext} from '../context/AuthContext';

export const Navbar = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const handleLogout = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (
        <nav className="navbar navbar-dark bg-dark d-flex jd-flex justify-content-between">
            <ul className="nav">
                <li className="nav-item">
                    <NavLink to="/main" className="nav-link active link-light"> [ t a b l e] </NavLink>
                </li>
            </ul>
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link active link-danger" href="/" onClick={handleLogout}> LOGOUT</a>
                </li>
            </ul>
        </nav>
    )
}
