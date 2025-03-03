import React from 'react';

import './sales-badge.scss';

export default function SalesBadge({offValue}) {

  return (
    <div className='sales-badge'>
        <span>OFF</span>
        <span>{offValue}%</span>
    </div>
  )
}
