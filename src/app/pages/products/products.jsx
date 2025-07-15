import { baseUrl } from '@app/helpers/variables';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from '../home/components/product';
import Navbar from '@app/ui/layouts/navbar';

import './products.scss';

export default function Products() {

    const [selectedCategory, setSelectedCategory] = useState(""); //set value selected category

    const queryFn = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/products`);
            console.log(data)
            return data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    const { data: products } = useQuery({
        queryKey: ['products'],
        queryFn,
    });

    const categories = [...new Set(products?.map(product => product.category))];

    const filteredProducts = products?.filter((product) => product.category === selectedCategory);


    return (
        <>
            <Navbar />
            <div className="container">

                {/* <ul style={{ width: '600px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '1rem', cursor: 'pointer' }}>
                {categories?.map((category, index) => (
                    <li onClick={() => setSelectedCategory(category)} key={index}> {category} </li>
                    ))}
                    </ul> */}

                <section className='products'>
                    {selectedCategory !== "" ? filteredProducts?.map((product) => (
                        <Product key={product.id}
                            title={product.title}
                            category={product.category}
                            ogPrice={product.originalPrice}
                            offerPrice={product.offerPrice}
                            brand={product.brand}
                            percentage={product.percentage}
                            image={product.imageSrc}
                            width={'326px'}
                            height={'560px'}
                        />
                    )) : products?.map((product) => (
                        <Product key={product.id}
                            title={product.title}
                            category={product.category}
                            ogPrice={product.originalPrice}
                            offerPrice={product.offerPrice}
                            brand={product.brand}
                            percentage={product.percentage}
                            image={product.imageSrc}
                            width={'326px'}
                            height={'560px'}
                        />
                    ))}
                </section>
            </div>
        </>
    );
}
