import { baseUrl } from '@app/helpers/variables';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';

export default function Products() {
    const [queryValue, setQueryValue] = useState('');

    const queryFn = async () => { 
        try {
            const { data } = await axios.get(`${baseUrl}/products?category=${queryValue}`);
            return data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    const { data : products } = useQuery({
        queryKey: ['products', queryValue], 
        queryFn,
    });

    const handleCategory = (category) => {
       setQueryValue(category)
    }

    return (
        <div className="container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <ul style={{ width: '600px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '1rem', cursor: 'pointer' }}>
                <li onClick={(e) => handleCategory(e.target.textContent)}>پیراهن</li>
                <li onClick={(e) => handleCategory(e.target.textContent)}>تیشرت</li>
                <li onClick={(e) => handleCategory(e.target.textContent)}>شلوار</li>
                <li onClick={(e) => handleCategory(e.target.textContent)}>کت و شلوار</li>
                <li onClick={(e) => handleCategory(e.target.textContent)}>ژاکت</li>
                <li onClick={(e) => handleCategory(e.target.textContent)}>کاپشن</li>
            </ul>

             <section style={{ margin: "3rem" }}>
                {products && products.map((product) => (
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
