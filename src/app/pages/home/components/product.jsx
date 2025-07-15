import React from 'react';
import SalesBadge from '@app/ui/components/sales-badge';

import './product.scss';

import { Link } from 'react-router-dom';

export default function Product({ title, image, ogPrice, offerPrice, address, percentage ,width, height }) {
``
    return (
        <>
            <Link to={address}>
                <div className='product-container' style={{ width: width, height: height }}>
                    {percentage && <SalesBadge offValue={percentage} />}
                    <img src={image} alt="product model" />
                    <div className="info">
                        <span className='title'>{title}</span>
                        <div className="prices">
                            {offerPrice !== "" ? <>
                                <span className='finalPrice'>{offerPrice}</span>
                                <span className='originalPrice'>{ogPrice}</span>
                            </> : <span className='finalPrice'>{ogPrice}</span>}

                        </div>
                        <div className="side-arrow-bg">
                            <svg className='shape' width="36" height="36" viewBox="0 0 50 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M50.0002 0.0539856C49.9354 6.0367 45.0655 10.8666 39.0675 10.8666C38.7765 10.8666 38.4882 10.8553 38.2029 10.833C38.191 10.8442 38.179 10.8554 38.167 10.8666H22.6668C15.1502 10.8666 11.7335 17.9008 11.7335 20.4333V37.3598L11.7038 37.3913C11.7233 37.6583 11.7332 37.928 11.7332 38.2C11.7332 44.2321 6.84818 49.1233 0.818359 49.1333H50.0002V0.0539856Z" fill="url(#paint0_linear_2247_2372)" />
                                <defs>
                                    <linearGradient id="paint0_linear_2247_2372" x1="14.48" y1="13.0055" x2="49.9246" y2="49.2072" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#282828" />
                                        <stop offset="1" stopColor="#0C0C0C" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            <img className='arrow' src="/assets/icons/Arrows/arrow-right-up.svg" alt="side arrow" />
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}
