import { baseUrl } from '@app/helpers/variables';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function ProductDetails() {

    const { slug } = useParams();

    const fecthProduct = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/special-offers?slug=${slug}`);
            return data;
        } catch (error) {
            console.log(error.message)
        }
    }

    const { data: productDetails = [], isLoading, isError, isStale  } = useQuery({
        refetchOnWindowFocus : false,
        queryKey: ["product-detail"],
        queryFn: fecthProduct,
        staleTime: 1 * 6 * 1000,
    })


    useEffect(() => {
        console.log(isStale)
    }, [isStale])


    if (isLoading) return (
        <h1>Product information is loading ...</h1>
    )

    if (isError) return (
        <h1>Product fetching failed ❌ </h1>
    )


    return (
        <>
            {productDetails.map((product) => (
                <h1 key={product.id} >{product.title}</h1>
            ))}

        </>

    )
}