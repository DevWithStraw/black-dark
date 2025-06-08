import React from 'react';
import SalesBadge from '@app/ui/components/sales-badge';

import './product.scss';

import { Link } from 'react-router-dom';

export default function Product({ title, image, ogPrice, finalPrice, offer, address }) {

    return (
        <>
            <Link to={address}>
                <div className='product-container'>
                    {offer && <SalesBadge offValue={offer} />}
                    <img src={image} alt="product model" />
                    <div className="info">
                        <span className='title'>{title}</span>
                        <div className="prices">
                            {finalPrice ? <>
                                <span className='finalPrice'>{finalPrice}</span>
                                <span className='originalPrice'>{ogPrice}</span>
                                </> : <span className='finalPrice'>{ogPrice}</span> }
                            
                        </div>
                        <div className="side-arrow-bg">
                            <img className='shape' src="/assets/icons/Side-Arrow-BG.svg" alt="" />
                            <img className='arrow' src="/assets/icons/Arrows/arrow-right-up.svg" alt="side arrow" />
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}
