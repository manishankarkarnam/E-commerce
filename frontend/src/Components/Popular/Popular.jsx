import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import Item from '../Item/Item'
import './Popular.css'

const Popular = () => {
    const { getLatestWomenProducts } = useContext(ShopContext);
    const popularWomenProducts = getLatestWomenProducts(4);

    return (
        <div className='popular'>
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className='popular_items'>
                {popularWomenProducts.map((item) => (
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
    )
}

export default Popular











// import React from 'react'
// import Item from '../Item/Item'
// import data_items from '../Assets/Frontend_Assets/data'
// import './Popular.css'

// const Popular = () => {
//   return (
//     <div className='popular'>
//         <h1>POPULAR IN WOMEN</h1>
//         <hr />
//         <div className='popular_items'>
//         {data_items.map((item) => {
//         return <Item 
//             key={item.id} 
//             id={item.id}
//             name={item.name} 
//             image={item.image} 
//             new_price={item.new_price} 
//             old_price={item.old_price} 
//         />
//     })}
//         </div>
//     </div>
//   )
// }

// export default Popular