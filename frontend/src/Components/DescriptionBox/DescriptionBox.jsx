import React, { useState } from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
    const [activeTab, setActiveTab] = useState("description");

    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div className={`descriptionbox-nav-box ${activeTab==="description"?"active":""}`}
                    onClick={()=>{setActiveTab("description")}}>
                    Description
                </div>
                <div className={`descriptionbox-nav-box ${activeTab==="reviews"?"active":""}`}
                    onClick={()=>{setActiveTab("reviews")}}>
                    Reviews (122)
                </div>
                <div className={`descriptionbox-nav-box ${activeTab==="shipping"?"active":""}`}
                    onClick={()=>{setActiveTab("shipping")}}>
                    Shipping Policy
                </div>
            </div>
            <div className="descriptionbox-description">
                {activeTab==="description" ? 
                    <div className="description-content">
                        <p>
                            An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a digital marketplace where businesses and individuals can showcase their products, interact with customers, and conduct secure transactions without the need for a physical presence. E-commerce websites have become increasingly popular due to their convenience, accessibility, and the global reach they offer to businesses of all sizes.
                        </p>
                        <p>
                            E-commerce websites typically include features such as product catalogs, shopping carts, secure payment gateways, and order management systems. They often incorporate user reviews, ratings, and detailed product descriptions to help customers make informed purchasing decisions.
                        </p>
                    </div> 
                : activeTab==="reviews" ?
                    <div className="reviews-content">
                        <p>Customer Reviews Content</p>
                        <p>No reviews yet.</p>
                    </div>
                :
                    <div className="shipping-content">
                        <p>Shipping Policy Content</p>
                        <p>Free shipping on orders over $50</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default DescriptionBox