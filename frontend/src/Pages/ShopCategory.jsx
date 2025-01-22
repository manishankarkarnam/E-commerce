import React, { useContext, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/Frontend_Assets/dropdown_icon.png'
import Item from '../Components/Item/Item.jsx'
import './CSS/ShopCategory.css'

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext)
  const [showAll, setShowAll] = useState(false)

  // Filter products by category
  const categoryProducts = all_product.filter(item => item.category === props.category)
  
  // Get visible products based on showAll state
  const visibleProducts = showAll ? categoryProducts : categoryProducts.slice(0, 12)

  // Toggle function
  const toggleProducts = () => {
    setShowAll(!showAll)
  }

  return (
    <div className='shop_category'>
      <img src={props.banner} alt="Category Banner" />
      <div className="shop_category_indexsort">
        <p>
          <span>Showing {visibleProducts.length}</span> out of {categoryProducts.length} products
        </p>
      </div>
      <div className='shop_category_products_container'>
        <div className="shop_category_products">
          {visibleProducts.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>
        <button onClick={toggleProducts}>
          {showAll ? 'Show Less' : 'Explore More'} <img src={dropdown_icon} alt="Dropdown icon" className={showAll ? 'rotated' : ''} />
        </button>
      </div>
    </div>
  )
}

export default ShopCategory