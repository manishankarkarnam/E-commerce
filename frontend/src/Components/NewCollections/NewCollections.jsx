import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import Item from '../Item/Item'
import './NewCollections.css'

const NewCollections = () => {
    const { getLatestProducts } = useContext(ShopContext);
    const latestProducts = getLatestProducts(8);

    return (
        <div>
            <div className='new_collections'>
                <h1>New Collections</h1>
                <hr />
                <div className="new_collections_items">
                    {latestProducts.map((item) => (
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
        </div>
    )
}

export default NewCollections













// import React from 'react'
// import new_collections from '../Assets/Frontend_Assets/new_collections.js'
// import Item from '../Item/Item.jsx'
// import './NewCollections.css'

// const NewCollections = () => {
//   return (
//     <div>
//         <div className='new_collections'>
//             <h1>New Collections</h1>
//             <hr />
//             <div className="new_collections_items">
//                 {new_collections.map((item) => {
//                     return (
//                         <Item
//                         key={item.id}
//                         id={item.id}
//                         name={item.name}
//                         image={item.image}
//                         new_price={item.new_price}
//                         old_price={item.old_price}
//                         />
//                     )
//                 })}
//             </div>
//         </div>
//     </div>
//   )
// }

// export default NewCollections