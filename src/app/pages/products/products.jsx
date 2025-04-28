import { baseUrl } from '@app/helpers/variables';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Products() {

    const [selectedCategory, setSelectedCategory] = useState(""); //set value selected category

    const queryFn = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/products`);
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
        <div className="container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <ul style={{ width: '600px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '1rem', cursor: 'pointer' }}>
                {categories?.map((category, index) => (
                    <li onClick={() => setSelectedCategory(category)} key={index}> {category} </li>
                ))}
            </ul>

            <section style={{ margin: "3rem" }}>
                {selectedCategory !== "" ? filteredProducts?.map((product) => (
                    <div key={product.id} style={{ marginBottom: '20px' }}>
                        <h3>{product.title}</h3>
                        <p>{product.category}</p>
                        <p>Brand: {product.brand}</p>
                        <p>Original Price: {product.originalPrice} تومان</p>
                        <p>Offer Price: {product.offerPrice ? product.offerPrice : 'Not Available'} تومان</p>
                        <p>Discount: {product.percentage}</p>
                    </div>
                )) : products?.map((product) => (
                    <div key={product.id} style={{ marginBottom: '20px' }}>
                        <h3>{product.title}</h3>
                        <p>{product.category}</p>
                        <p>Brand: {product.brand}</p>
                        <p>Original Price: {product.originalPrice} تومان</p>
                        <p>Offer Price: {product.offerPrice ? product.offerPrice : 'Not Available'} تومان</p>
                        <p>Discount: {product.percentage}</p>
                    </div>
                ))}
            </section>
        </div>
    );
}
