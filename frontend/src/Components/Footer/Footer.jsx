import React from 'react'
import logo from '../Assets/Frontend_Assets/logo.png'
import instagram_icon from '../Assets/Frontend_Assets/instagram_icon.png'
import pintester_icon from '../Assets/Frontend_Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/Frontend_Assets/whatsapp_icon.png'
import './Footer.css'

const Footer = () => {
  return (
    <div className="footer_container">
    <div className='footer'>
        <div className="footer_logo">
            <img src={logo} />
            <p>SHOPPER</p>
        </div>
        <div>
            <ul className='footer_links'>
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>
        <div className="footer_social_icons">
                <img src={instagram_icon} alt="instagram_icon" />
                <img src={pintester_icon} alt="pintester_icon" />
                <img src={whatsapp_icon} alt="whatsapp_icon" />
            </div>
        <hr />
        <div className="footer_copyright">
            <p>&copy; {new Date().getFullYear()} Shopper. All rights reserved.</p>
        </div>
    </div></div>
  )
}

export default Footer