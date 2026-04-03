import React, { useContext, useMemo } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import Productitem from './Productitem';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);

    // Use useMemo to efficiently sort and slice the latest products.
    // This calculation only re-runs when the 'products' array changes.
    const latestProducts = useMemo(() => {
        return [...products]
            .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date to get the newest first
            .slice(0, 10);
    }, [products]);

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'LATEST'} text2={'COLLECTION'} />
                <p className='w-full max-w-3xl m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-4'>
                    These are the latest products added to our collection. Check them out and grab your favorites before they are gone!
                </p>
            </div>

            <div>
                {/* The grid layout now ensures items in the same row will stretch to an equal height */}
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6'>
                    {latestProducts.map((item) => (
                        // This wrapper with `className="flex"` helps ensure that the Productitem component
                        // stretches to fill the grid cell, creating a uniform size.
                        <div key={item._id} className="flex">
                            <Productitem
                                id={item._id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LatestCollection;
