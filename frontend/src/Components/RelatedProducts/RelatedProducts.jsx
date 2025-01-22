import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './RelatedProducts.css';
import Item from '../Item/Item';

const RelatedProducts = ({ category, currentProductId }) => {
  const { all_product } = useContext(ShopContext);

  // Filter products by the same category and exclude the current product
  const relatedProducts = all_product
    .filter(
      (product) => product.category.toLowerCase() === category.toLowerCase() && product.id !== currentProductId
    )
    .slice(0, 4); // Limit to 4 related products

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-items">
        {relatedProducts.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;