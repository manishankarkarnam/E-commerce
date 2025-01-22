import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Assets/Frontend_Assets/logo.png';
import cart_icon from '../Assets/Frontend_Assets/cart_icon.png';
import { Outlet, Link } from "react-router-dom";
import { ShopContext } from '../../Context/ShopContext';
import './Navbar.css';

const Navbar = ({ setIsAuthenticated }) => {
    const { getTotalCartItems } = useContext(ShopContext);
    const [activeIndex, setActiveIndex] = useState(null);
    const navigate = useNavigate();

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    const handleLogout = () => {
        console.log('Logout clicked');
        localStorage.removeItem('token');
        setIsAuthenticated(false); // Update authentication state
        navigate('/login');
    };

  return (
    <div className='navbar'>
        <div className="nav_logo">
            <img src={logo} alt="logo" />
            <p id='shoper_icon'>SHOPPER</p>
        </div>
        <div className="nav_menu">
        <ul>
    {[
        { name: 'Shop', path: '/shop' },
        { name: 'Men', path: '/men' },
        { name: 'Women', path: '/women' },
        { name: 'Kids', path: '/kids' }
    ].map((item, index) => (
        <Link key={index} to={item.path} style={{ textDecoration: 'none' }}>
            <li
                className={activeIndex === index ? 'active' : ''}
                onClick={() => handleClick(index)}
            >
                {item.name}
                <hr />
            </li>
        </Link>
    ))}
    <Outlet />
</ul>
        </div>
        <div className='nav_login'>
            <button onClick={handleLogout}>Logout</button>
            <Link to='/cart'>
                <div className="cart-icon-container">
                    <img src={cart_icon} alt="cart-icon" />
                    {getTotalCartItems() > 0 && (
                        <span className="cart-item-count">{getTotalCartItems()}</span>
                    )}
                </div>
            </Link>
        </div>
        </div> 
  )
}

export default Navbar;