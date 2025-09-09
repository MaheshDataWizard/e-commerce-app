import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const RelativeProducts = ({ category, subCategory }) => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const filtered = products.filter((item) => 
                (subCategory ? item.subCategory === subCategory : item.category === category)
            );
            // Exclude current product if needed (optional)
            setRelated(filtered.slice(0, 5));
        }
    }, [products, category, subCategory]);

    if (related.length === 0) {
        return null; // or display a friendly message
    }

    return (
        <div className="my-24">
            <div className="text-center text-3xl py-2">
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {related.map((item) => (
                    <ProductItem key={item._id} id={item._id} name={item.name} price={item.price} image={item.image} />
                ))}
            </div>
        </div>
    )
}

export default RelativeProducts
