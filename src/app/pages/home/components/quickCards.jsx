import React from 'react';
import './quickCards.scss';

import { Link } from 'react-router-dom';

export default function QuickCards({ imageSrc, enTitle, title, link }) {
    return (
        <div className="card" style={{ backgroundImage: `url(${imageSrc})` }}>
            <h3>{enTitle}</h3>
            <h4> {title} </h4>
            <Link to={link} className="anchor">  </Link>
        </div>
    )
}
