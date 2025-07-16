import React from 'react';
import SalesBadge from '@app/ui/components/sales-badge';

import './product.scss';

import { Link } from 'react-router-dom';

export default function Product({ title, image, ogPrice, offerPrice, address, percentage, width, height, colors }) {
    return (
        <Link to={address}>
            <div className='product-container' style={{ width, height }}>
                <div className="colors-container">
                    {colors?.slice(0, 4).map((colors, index) => (
                        <div
                            key={index}
                            className="box"
                            style={{ backgroundColor: colors.color }}
                        />
                    ))}
                </div>
                {percentage && <SalesBadge offValue={percentage} />}
                <img src={image} alt="product model" />
                <div className="info">
                    <span className='title'>{title}</span>
                    <div className="prices">
                        {offerPrice !== "" ? (
                            <>
                                <span className='finalPrice'>{offerPrice}</span>
                                <span className='originalPrice'>{ogPrice}</span>
                            </>
                        ) : (
                            <span className='finalPrice'>{ogPrice}</span>
                        )}
                    </div>
                    <div className="side-arrow-bg">
                        {/* SVG and arrow here */}
                    </div>
                </div>
            </div>
        </Link>
    );
}
