import React from 'react'
import { Link } from 'react-router-dom'
import './Breadcrum.css'

const Breadcrum = ({ product }) => {
  if (!product) {
    return <div className='breadcrum'>Loading...</div>
  }

  return (
    <div className='breadcrum'>
      <Link to="/">HOME</Link>
      <span className="separator">/</span>
      <Link to="/">SHOP</Link>
      <span className="separator">/</span>
      {product.category && (
        <>
          <Link to={`/${product.category.toLowerCase()}`}>
            {product.category.toUpperCase()}
          </Link>
          <span className="separator">/</span>
        </>
      )}
      <span className="current">{product.name}</span>
    </div>
  )
}

export default Breadcrum