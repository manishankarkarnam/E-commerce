import React, { useState, useEffect } from 'react';
import './ListProduct.css';

const ListProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);
  
  const handleDelete = (id) => {
    fetch('http://localhost:4000/removeproduct', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setProducts(products.filter(product => product.id !== id));
        } else {
          console.error('Failed to delete product.');
        }
      })
      .catch(err => console.error('Error deleting product:', err));
  };

  return (
    <div className="list-product">
      <h2>List of Products</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Category</th>
            <th>Old Price</th>
            <th>New Price</th>
            <th>Available</th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td data-label="ID">{product.id}</td>
              <td data-label="Name">{product.name}</td>
              <td data-label="Image">
                <img src={product.image} alt={product.name} />
              </td>
              <td data-label="Category">{product.category}</td>
              <td data-label="Old Price">${product.old_price}</td>
              <td data-label="New Price">{product.new_price ? `$${product.new_price}` : 'N/A'}</td>
              <td data-label="Available">
                <span className={product.available ? 'available' : 'not-available'}>
                  {product.available ? 'Yes' : 'No'}
                </span>
              </td>
              <td data-label="Actions">
                <button 
                  className="delete-btn" 
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListProduct;