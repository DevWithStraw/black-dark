import React, { useState } from 'react';
import './special-sales.scss';
import Product from '../components/product';

import Model1 from '@assets/images/model-1.png';
import Model2 from '@assets/images/model-2.png';
import Model3 from '@assets/images/model-3.png';
import Model4 from '@assets/images/model-4.png';
import Model5 from '@assets/images/model-5.png';

export default function SpecialSale() {

  const [productDetails, setProductDetails] = useState([
    {
      id: 0,
      title: "کت بربری Burberry مدل A8 ",
      ogPrice: "2,000,000",
      finalPrice: "1,416,000",
      image: Model1,
      offer : 27
    }, {
      id: 1,
      title: "کت شلوار  بروکس Brooks  ",
      ogPrice: "2,000,000",
      finalPrice: "1,416,000",
      image: Model2,
      offer : 25
    }, {
      id: 2,
      title: "کت شلوارکانالی 320 Canali ",
      ogPrice: "2,000,000",
      finalPrice: "1,416,000",
      image: Model3,
      offer : 18
    },
    {
      id: 3,
      title: "کت زنانه اس پی ایتالیا SP Italy",
      ogPrice: "2,000,000",
      finalPrice: "1,416,000",
      image: Model4,
      offer : 32
    },
    {
      id: 4,
      title: "کت چرمی بلک مدل وسطای vstay",
      ogPrice: "2,000,000",
      finalPrice: "1,416,000",
      image: Model5,
      offer : 25
    },
  ]);

  return (
    <div className='products-details'>
      {productDetails.map((product)=>(
        <Product
        key={product.id}
          title={product.title}
          ogPrice={product.ogPrice}
          finalPrice={product.finalPrice}
          image={product.image}
          offer={product.offer}
        />
      ))}
    </div>
  )
}
