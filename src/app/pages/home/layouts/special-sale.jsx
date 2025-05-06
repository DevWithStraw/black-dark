import React, { useState } from 'react';
import './special-sales.scss';
import Product from '../components/product';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl } from '@app/helpers/variables';

export default function SpecialSale() {

  const queryFn = async () => {
    try {
      const {data} = await axios.get(`${baseUrl}/products`);
      return data
    } catch (error) {
      console.error(error)
    }
  }


  const {data : specialProducts} = useQuery({
    queryKey : ['special-products'],
    queryFn 
  })


  return (
    <div className='products-details'>
      {specialProducts?.map((product)=>(
        <Product
        key={product.id}
        address={`/products/special-offers/${product.slug}`}
        title={product.title}
        ogPrice={product.originalPrice}
        finalPrice={product.offerPrice}
        image={product.imageSrc}
        offer={product.offer}
        />
      ))}
    </div>
  )
}
