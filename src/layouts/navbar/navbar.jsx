import React from 'react';
import './navbar.scss';

import { Link } from 'react-router-dom';

export default function navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/contact-us'>تماس با ما</Link>
                </li>
                <li>
                    <Link to='/blog'>وبلاگ</Link>
                </li>
                <li>
                    <Link to='/about-us'>درباره ما</Link>
                </li>
            </ul>

            <Link to='/purchase/cart'>
                <button className='cart'>سبد خرید
                    <div className="badge">2</div>
                </button>
            </Link>
            <Link to='/profiles/me'>
                <button>پروفایل من</button>
            </Link>
        </nav>
    )
}
