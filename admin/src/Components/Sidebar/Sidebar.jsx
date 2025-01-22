import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink 
        to="/add-product" 
        className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}
        id = "add-product"
        style={{ textDecoration: 'none' }}
      >
        <span className="icon">🛒</span>
        <span>Add Product</span>
      </NavLink>
      
      <NavLink 
        to="/list-products" 
        className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}
        id = "products-list"
        style={{ textDecoration: 'none' }}
      >
        <span className="icon">📁</span>
        <span>Product List</span>
      </NavLink>
    </div>
  );
};

export default Sidebar;