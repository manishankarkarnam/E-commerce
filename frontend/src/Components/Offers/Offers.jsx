import React from 'react'
import exclusive_image from '../Assets/Frontend_Assets/exclusive_image.png'
import './Offers.css'

const Offers = () => {
  return (
    <div className='offers_container'>
    <div className='offers'>
        <div className="offers_left">
            <h1>Exclusive <br /> Offers For You</h1>
            <p>ONLY ON BEST SELLERS PRODUCTS</p>
            <button>Check Now</button>
        </div>
        <div className="offers_right">
            <img src={exclusive_image} />
        </div>
    </div></div>
  )
}

export default Offers