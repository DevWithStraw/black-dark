import { baseUrl } from '@app/helpers/variables';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from '../home/components/product';
import Navbar from '@app/ui/layouts/navbar';
import { useQueryClient } from '@tanstack/react-query';

import './products.scss';

export default function Products() {

    const queryClient = useQueryClient();

    const [selectedCategory, setSelectedCategory] = useState(""); //set value selected category

    const [priceQuery , setPriceQuery] = useState("");

    const queryFn = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/products?${priceQuery}`);
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

    const filteredProducts = products?.filter((product) => product.category === selectedCategory);

    const handlePrice = async () => {
         await setPriceQuery("originalPrice=۵،۲۰۰،۰۰۰");
        queryClient.invalidateQueries({ queryKey: ['products'] });
    }


    return (
        <>
            <Navbar
                products={products}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />  

            <button onClick={handlePrice}> show 5,200,000 </button>

            {priceQuery}



            <div className="container">
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
                            colors={product.colors}
                        />
                    ))}
                </section>
            </div>
        </>
    );
}
