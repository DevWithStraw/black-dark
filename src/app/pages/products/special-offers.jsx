import { baseUrl } from '@app/helpers/variables';
import axios from 'axios';
import React from 'react';

import {Link , useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function SpecialOffers() {
    const { slug } = useParams();

    const currentLocation = window.location.pathname;
    const optimizedSlug = slug.replace(/ /g,"%20");

    const filtredLocation = currentLocation.replace(optimizedSlug , "");

    const queryFn = async () => {
        const {data} = await axios.get(`${baseUrl}/products?slug=${slug}`);
        return data
    }
    
    const {data : productDetails} = useQuery({
        queryKey : ['product-details'],
        queryFn
    })

    const category = productDetails?.map((product) => product.category)

    return (
        <>
        <div className="bread-crumb">
            <Link to={'/'}> خانه </Link>
            <Link to={filtredLocation}> پوشاک </Link>
            <Link to={currentLocation}> {category} </Link>
        </div>
            {productDetails?.map((product) => (
                <div key={product.id}>
                    <h1>{product.title}</h1>
                    <span>{product.originalPrice}</span>
                    <span>{product.offerPrice}</span>
                    <img src={product.imageSrc} alt={product.title} />
                    <p>Product offer sale : {product.offer}</p>
                </div>
            ))}
        </>
    )
}
