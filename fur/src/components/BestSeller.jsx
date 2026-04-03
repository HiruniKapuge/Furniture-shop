import React, { useContext, useMemo } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import Productitem from './Productitem';

const BestSeller = () => {
    const { products } = useContext(ShopContext);

    // Use useMemo to efficiently filter and memoize the bestseller list.
    // This calculation only re-runs when the 'products' array changes.
    const bestSellerProducts = useMemo(() => {
        // Correctly filter by the 'bestsellers' boolean flag
        return products
            .filter((item) => item.bestsellers) 
            .slice(0, 8); // Display up to 8 bestsellers
    }, [products]);

    // Don't render the component if there are no bestsellers to show
    if (bestSellerProducts.length === 0) {
        return null;
    }

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='w-full max-w-3xl m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-4'>
                    Discover our best-selling products that have captured the hearts of our customers. These items are loved for their quality, style, and performance. Don't miss out on the chance to own these favorites!
                </p>
            </div>

            {/* Grid for displaying the products */}
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6'>
                {bestSellerProducts.map((item) => (
                    <Productitem
                        key={item._id} // Use the unique item ID as the key
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default BestSeller;
