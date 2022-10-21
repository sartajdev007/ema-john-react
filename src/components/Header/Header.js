import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import logo from '../../images/Logo.svg'
import './Header.css'

const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    return (
        <nav className='navigation'>
            <img src={logo} alt="" />
            <div>
                <Link to="/shop">Shop</Link>
                <Link to="/order">Order</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>
                {
                    user?.uid ?
                        < button className='log-out-btn' onClick={logOut}>Sign Out</button>
                        :
                        <>
                            <Link to="/login">Log In</Link>
                            <Link to="/register">Sign Up</Link>
                        </>
                }

            </div>

        </nav >
    );
};

export default Header;