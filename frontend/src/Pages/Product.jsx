import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import './CSS/Product.css';

const Product = () => {
    const { all_product } = useContext(ShopContext);
    const { productId } = useParams();
    
    const product = all_product.find((p) => p.id === Number(productId));

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className='product'>
            <Breadcrum product={product} />
            <ProductDisplay product={product} />
            <DescriptionBox/>
            <RelatedProducts 
                category={product.category} 
                currentProductId={product.id} 
            />
        </div>
    );
}

export default Product;