import { baseUrl } from '@app/helpers/variables';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

export default function SpecialOffers() {

    const [productDetails, setProductDetails] = useState([]);

    const { slug } = useParams();


    useEffect(() => {
        const getProductData = async () => {

            const response = await axios.get(`${baseUrl}/special-offers?slug=${slug}`);
            setProductDetails(response.data);
        }
        getProductData();
    }, [])


    return (
        <>
            {productDetails.map((product) => (
                <div key={product.id}>
                    <h1>{product.title}</h1>
                    <span>{product.ogPrice}</span>
                    <span>{product.finalPrice}</span>
                    <img src={product.image} alt={product.title} />
                    <p>Product offer sale : {product.offer}</p>
                </div>
            ))}
        </>
    )
}
