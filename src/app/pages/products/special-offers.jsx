import React, { useState } from 'react';
import './special-offers.scss';
import { baseUrl } from '@app/helpers/variables';
import axios from 'axios';

import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function SpecialOffers() {
    const { slug } = useParams();

    const currentLocation = window.location.pathname;
    const optimizedSlug = slug.replace(/ /g, "%20");

    const filtredLocation = currentLocation.replace(optimizedSlug, "");

    const queryFn = async () => {
        const { data } = await axios.get(`${baseUrl}/products?slug=${slug}`);
        return data
    }

    const { data: productDetails } = useQuery({
        queryKey: ['product-details'],
        queryFn
    })

    const category = productDetails?.map((product) => product.category)

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    const handleSize = (index) => {
        setSelectedSize(index)
    }

    const handleColor = (index) => {
        setSelectedColor(index)
    }

    return (
        <>
            <div className="bread-crumb">
                <Link to={'/'}> خانه </Link>
                <button className='bread-arrow' />
                <Link to={filtredLocation}> پوشاک </Link>
                <button className='bread-arrow' />
                <Link to={currentLocation}> {category} </Link>
            </div>

            {productDetails?.map((product) => (
                <div className="special-offers-container">
                    <section className="general-info">
                        <section className="purchase-info">
                            <h2 className="title">{product.title}</h2>
                            <h3 className="en-title">{product.enTitle}</h3>
                            <ul className="sizes-chooser">
                                <span> راهنما سایــز </span>
                                {product.sizes.map((size, index) => (
                                    <li onClick={() => handleSize(index)} className={selectedSize === index ? 'selectedSize' : ''} key={index}> {size} </li>
                                ))}
                            </ul>
                            <ul className="colors-picker">
                                {product.colors.map((color, index) => (
                                    <li onClick={() => handleColor(index)} style={{backgroundColor : color}} className={selectedColor === index ? 'selectedColor' : ''} key={index}> {color} </li>
                                ))}
                            </ul>
                            <div className="row">
                                <span className='brand'>{product.brand}</span>
                                <div className="prices">

                                </div>
                            </div>
                            <button> افزودن به سبد خرید </button>
                        </section>
                        <section className="more-details"></section>
                    </section>
                    <section className="image-holder"></section>
                </div>
            ))}
        </>
    )
}
