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
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleSize = (index) => {
        setSelectedSize(index)
    }

    const handleColor = (index) => {
        setSelectedColor(index)
    }

    const toggleDetail = (index) => {
        setIsDetailOpen(prevIndex => (prevIndex === index ? null : index));
    };


    const informations = [
        {
            summary: " توضیحات",
            details: " کت و شلوارهای سبک اروپایی که ممکن است کت و شلوارهای قاره‌ای یا ایتالیایی نیز نامیده شوند، معمولاً نزدیک به سایز بدن و جذب بریده می‌شوند و دارای دو دکمه و در یک ردیف هستند. این کت‌وشلوارها برای مردان لاغراندام بسیار خوب به نظر می‌رسند. در سبک اروپایی شانه‌ها اغلب پد دارند و جایگاه دکمه‌ها و قسمت برگردان یقه کت بالاتر از سبک آمریکایی و انگلیسی است. سبک اروپایی برخلاف سبک انگلیسی، به دلیل اینکه در آب‌وهوای گرم‌تری پوشیده می‌شود با پارچه‌های سبک و خنک‌ دوخته می‌شود."
        }, {
            summary: "جزئیات و مراقبت",
            details: " کت و شلوارهای سبک اروپایی که ممکن است کت و شلوارهای قاره‌ای یا ایتالیایی نیز نامیده شوند، معمولاً نزدیک به سایز بدن و جذب بریده می‌شوند و دارای دو دکمه و در یک ردیف هستند. این کت‌وشلوارها برای مردان لاغراندام بسیار خوب به نظر می‌رسند. در سبک اروپایی شانه‌ها اغلب پد دارند و جایگاه دکمه‌ها و قسمت برگردان یقه کت بالاتر از سبک آمریکایی و انگلیسی است. سبک اروپایی برخلاف سبک انگلیسی، به دلیل اینکه در آب‌وهوای گرم‌تری پوشیده می‌شود با پارچه‌های سبک و خنک‌ دوخته می‌شود."
        }, {
            summary: "اندازه و تناسب",
            details: " کت و شلوارهای سبک اروپایی که ممکن است کت و شلوارهای قاره‌ای یا ایتالیایی نیز نامیده شوند، معمولاً نزدیک به سایز بدن و جذب بریده می‌شوند و دارای دو دکمه و در یک ردیف هستند. این کت‌وشلوارها برای مردان لاغراندام بسیار خوب به نظر می‌رسند. در سبک اروپایی شانه‌ها اغلب پد دارند و جایگاه دکمه‌ها و قسمت برگردان یقه کت بالاتر از سبک آمریکایی و انگلیسی است. سبک اروپایی برخلاف سبک انگلیسی، به دلیل اینکه در آب‌وهوای گرم‌تری پوشیده می‌شود با پارچه‌های سبک و خنک‌ دوخته می‌شود."
        }
        , {
            summary: "تحویل و مرجوعی",
            details: " کت و شلوارهای سبک اروپایی که ممکن است کت و شلوارهای قاره‌ای یا ایتالیایی نیز نامیده شوند، معمولاً نزدیک به سایز بدن و جذب بریده می‌شوند و دارای دو دکمه و در یک ردیف هستند. این کت‌وشلوارها برای مردان لاغراندام بسیار خوب به نظر می‌رسند. در سبک اروپایی شانه‌ها اغلب پد دارند و جایگاه دکمه‌ها و قسمت برگردان یقه کت بالاتر از سبک آمریکایی و انگلیسی است. سبک اروپایی برخلاف سبک انگلیسی، به دلیل اینکه در آب‌وهوای گرم‌تری پوشیده می‌شود با پارچه‌های سبک و خنک‌ دوخته می‌شود."
        }
       
    ]

    const [progress , setProgresss] = useState('initial');

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
                <>
                <div className="special-offers-container" key={product.id}>
                    <section className="general-info">
                        <section className="purchase-info">
                            <div className="title-container">
                                <h2 className="title">{product.title}</h2>
                                <h3 className="en-title">{product.enTitle}</h3>
                            </div>
                            <ul className="sizes-chooser">
                                <span> راهنما سایــز </span>
                                {product.sizes.map((size, index) => (
                                    <li onClick={() => handleSize(index)} className={selectedSize === index ? 'selectedSize' : ''} key={index}> {size} </li>
                                ))}
                            </ul>
                            <ul className="colors-picker">
                                {product.colors.map((color, index) => (
                                    <li onClick={() => handleColor(index)} style={{ backgroundColor: color.color }} className={selectedColor === index ? 'selectedColor' : ''} key={index}> {selectedColor === index ? color.expanded : color.letter} </li>
                                ))}
                            </ul>
                            <div className="row">
                                <span className='brand'>{product.brand}</span>
                                <div className="prices">{product.originalPrice}</div>
                            </div>
                            <button className='add-to-cart'> افزودن به سبد خرید <div className="cart"></div> </button>
                        </section>
                        <section className="more-details">
                            {informations.map((info, index) => (
                                <div className="detail-container" key={index}>
                                    <div className={isDetailOpen === index ? "anchor opened" : "anchor"} onClick={() => toggleDetail(index)}></div>
                                    <details open={isDetailOpen === index}>
                                        <summary onClick={(e) => {
                                            e.preventDefault();
                                            toggleDetail(index);
                                        }}>
                                            {info.summary}
                                        </summary>
                                        <p>{info.details}</p>
                                    </details>

                                </div>
                            ))}
                        </section>
                    </section>
                    <section className="image-holder">
                        <img src={product.imageSrc} alt="" />
                    </section>
                </div>
                <section className='product-info'>
                    <ul className={progress}>
                        <li onClick={() => setProgresss('initial')}> توضیحات </li>
                        <li onClick={() => setProgresss('second')}> مشخصات </li>
                        <li onClick={() => setProgresss('third')}>دیدگاه کاربران </li>
                    </ul>
                </section>
                </>
            ))}
        </>
    )
}
