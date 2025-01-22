import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';

const AddProduct = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [hasOffer, setHasOffer] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: '',
    category: '',
    old_price: '',
    new_price: '',
    available: true, // Set default value
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setProductDetails((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const calculateSavings = () => {
    if (productDetails.old_price && productDetails.new_price) {
      const savings =
        ((productDetails.old_price - productDetails.new_price) / productDetails.old_price) * 100;
      return Math.round(savings);
    }
    return 0;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Generate a preview URL
      const previewURL = URL.createObjectURL(file);
      setImageURL(previewURL);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImageFile(file);
      // Generate a preview URL
      const previewURL = URL.createObjectURL(file);
      setImageURL(previewURL);
    }
  };

  useEffect(() => {
    // Cleanup the URL object when the component unmounts or when imageFile changes
    return () => {
      if (imageURL) {
        URL.revokeObjectURL(imageURL);
      }
    };
  }, [imageURL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Product Details:', productDetails);

    try {
      if (!imageFile) {
        console.error('No image file selected');
        alert('Please select an image to upload.');
        return; // Exit if no image is selected
      }

      // Prepare formData
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('name', String(productDetails.name));
      formData.append('category', String(productDetails.category));
      formData.append('old_price', Number(productDetails.old_price));
      if (hasOffer) {
        formData.append('new_price', Number(productDetails.new_price));
      }
      formData.append('available', productDetails.available);

      // Send product data to backend
      const response = await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Product added:', data);
        // Reset form
        setProductDetails({
          name: '',
          category: '',
          old_price: '',
          new_price: '',
          available: true,
        });
        setImageFile(null);
        setImageURL('');
        setHasOffer(false);
        alert('Product added successfully!');
        // Optionally, navigate to the list products page
        // navigate('/list-products');
      } else {
        const errorData = await response.json();
        console.error('Error adding product:', errorData.message);
        alert('Failed to add product. Please try again.');
      }
    } catch (error) {
      console.error('Error adding product:', error.message);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="add-product">
      <div className="add-product-container">
        <h2>Add New Product</h2>
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-left">
              <div className="form-group">
                <label>Product Title</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter product title"
                  value={productDetails.name}
                  onChange={changeHandler}
                  required
                />
              </div>

              <div className="price-section">
                <div className="form-group">
                  <label>Regular Price</label>
                  <input
                    type="number"
                    name="old_price"
                    placeholder="Regular price"
                    value={productDetails.old_price}
                    onChange={changeHandler}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="offer-toggle">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={hasOffer}
                      onChange={(e) => setHasOffer(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                  <span>Add Offer Price</span>
                </div>

                {hasOffer && (
                  <div className="form-group offer-price">
                    <label>Offer Price</label>
                    <input
                      type="number"
                      name="new_price"
                      placeholder="Offer price"
                      value={productDetails.new_price}
                      onChange={changeHandler}
                      required={hasOffer}
                      min="0"
                      step="0.01"
                    />
                    {calculateSavings() > 0 && (
                      <span className="savings-badge">
                        Save {calculateSavings()}%
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={productDetails.category}
                  onChange={changeHandler}
                  required
                >
                  <option value="">Select category</option>
                  <option value="women">Women</option>
                  <option value="men">Men</option>
                  <option value="kids">Kids</option>
                </select>
              </div>
            </div>

            <div className="form-right">
              <div
                className="image-upload-container"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="image-upload"
                  onChange={handleImageUpload}
                  accept="image/*"
                  required
                />

                <label
                  htmlFor="image-upload"
                  className={`upload-area ${dragActive ? 'drag-active' : ''}`}
                >
                  {imageFile ? (
                    <div className="image-preview">
                      <img
                        src={imageURL}
                        alt="Product preview"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImageURL('');
                        }}
                        className="remove-image"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <>
                      <i className="upload-icon">📸</i>
                      <p>Drag and drop image here or click to upload</p>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;