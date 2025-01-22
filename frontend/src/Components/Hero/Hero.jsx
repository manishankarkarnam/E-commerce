import React from 'react'
import { Link } from 'react-scroll';
import hand_icon from '../Assets/Frontend_Assets/hand_icon.png'
import hero_image from '../Assets/Frontend_Assets/hero_image.webp'
import arrow from '../Assets/Frontend_Assets/arrow.png'
import './Hero.css'

const Hero = () => {
  return (
    <div className='container'>
        <div className="left">
            <p>NEW ARRIVALS ONLY</p>
            <h2>new <img src={hand_icon} alt="hand-icon" className='handIcon'/> <br /> collections <br /> for everyone</h2>
            <Link
              to="new-collections-section"
              smooth={true}
              duration={500}
            >
              <button>
                Latest Collection <img src={arrow} alt="arrow" />
              </button>
            </Link>
        </div>
        <div className='right'>
            <img src={hero_image} alt="hero_image" />
        </div>
    </div>
  )
}

export default Hero