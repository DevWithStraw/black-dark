import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { baseUrl } from '@app/helpers/variables';

export default function ProductDetails() {
    const { slug } = useParams();

    const fetchProduct = async () => {
        const { data } = await axios.get(`${baseUrl}/special-offers?slug=${slug}`);
        return data;
    };

    const {
        data: productDetails = [],
        isLoading,
        isError
    } = useQuery({
        queryKey: ['product-detail'],
        queryFn: fetchProduct,
        refetchOnWindowFocus: false,
        staleTime: 2 * 60 * 1000
    });

    if (isLoading) return <h1>Product information is loading ...</h1>;
    if (isError) return <h1>Product fetching failed ❌</h1>;

    return (
        <>
            {productDetails.map((product) => (
                <>
                <h1 key={product.id}>{product.title}</h1>
                <p>{product.sizeSM && "SM"}</p>
                <p>{product.sizeM && "M"}</p>
                <p>{product.sizeL && "L"}</p>
                <p>{product.sizeXL && "XL"}</p>
                </>
            ))}
        </>
    );
}
