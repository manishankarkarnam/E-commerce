import React from 'react'
import { Link } from 'react-router-dom'
import './Item.css'

const Item = (props) => {
  const handleClick = () => {
    scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  return (
    <div className="item">
    <Link to={`/product/${props.id}`}>
      <img src={props.image} alt={props.name} onClick={handleClick}/>
      <p className='name'>{props.name}</p>
      <div className="item_prices">
          <div className="item_price_new">
              <p>${props.new_price}</p>
          </div>
          <div className="item_old_price">
              <p>${props.old_price}</p>
          </div>
      </div>
    </Link>
    </div>
  )
}

export default Item