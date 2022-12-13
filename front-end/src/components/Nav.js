import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/money_logo.png';

const Nav=()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate(); //Ensures nav bar always updated properly, checks whenever navigate is called even by other components.
    const logout = ()=>{
        localStorage.clear();
        navigate('/signup')
    }

    return(
        <nav className = "navbar navbar-expand-md nav">
            <img src = {logo} className = "logo" />
            <button className="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse" data-bs-target="#main-navigation">
		        <span className="navbar-toggler-icon"></span>
	        </button>
            <div className='collapse navbar-collapse' id='main-navigation'>
                <ul className='navbar-nav nav-ul'>
                    {auth ? <>
                        <li className='nav-item'><Link to="/">Products</Link></li>
                        <li className='nav-item'><Link to="/add">Add Products</Link></li>
                        {/*<li><Link to="/update/:id">Update Products</Link></li>*/}
                        <li className='nav-item'><Link to="/profile">Profile</Link></li>
                        <li className='nav-item'><Link onClick={logout} to="/signup">Log Out ({JSON.parse(auth).name})</Link></li></> : <>
                        <li className='nav-item'><Link to="/signup">Sign Up</Link></li>
                        <li className='nav-item'><Link to = "/login">Log In</Link></li></>}
                </ul>
            </div>
        </nav>
    )
}

export default Nav;