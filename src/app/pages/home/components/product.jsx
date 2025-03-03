import React from 'react';
import SalesBadge from '@app/ui/components/sales-badge';

import './product.scss';

export default function Product({title , image , ogPrice , finalPrice , offer}) {
    return (
        <div className='product-container'>
            <SalesBadge offValue={offer} /> 
            <img src={image} alt="product model" />
            <div className="info">
                <span className='title'>{title}</span>
                <div className="prices">
                    <span className='finalPrice'>{finalPrice}</span>
                    <span className='originalPrice'>{ogPrice}</span>
                </div>
                <div className="side-arrow-bg">
                    <img className='shape' src="/assets/icons/Side-Arrow-BG.svg" alt="" />
                    <img className='arrow' src="/assets/icons/Arrows/Arrow-Right-Up.svg" alt="side arrow" />
                </div>
            </div>
        </div>
    )
}
