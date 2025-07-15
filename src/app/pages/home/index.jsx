import React from "react";
import "./home.scss";

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

import Product from "./components/product";
import QuickCards from "./components/quickCards";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@app/helpers/variables";

export default function Home() {

    const Clothing = [
        {
            title: 'کت بربری Burberry مدل A8',
            ogPrice: '۱،۴۱۶،۰۰',
            offerPrice: '۱،۲۸۹،۲۰۰',
            percentage: 27,
            imageSrc: 'https://i.ibb.co/60GzP0c7/model-1.png'
        },
        {
            title: 'کت شلوار  بروکس Brooks',
            ogPrice: '۱،۴۱۶،۰۰',
            offerPrice: '۱،۲۸۹،۲۰۰',
            percentage: 25,
            imageSrc: 'https://i.ibb.co/7twmcCSr/model-3.png'
        },
        {
            title: 'کت شلوارکانالی 320 Canali',
            ogPrice: '۱،۴۱۶،۰۰',
            offerPrice: '۱،۲۸۹،۲۰۰',
            percentage: 18,
            imageSrc: 'https://i.ibb.co/cX2qsfk4/model-2.png'
        },
        {
            title: 'کت زنانه اس پی ایتالیا SP Italy',
            ogPrice: '۱،۴۱۶،۰۰',
            offerPrice: '۱،۲۸۹،۲۰۰',
            percentage: 32,
            imageSrc: 'https://i.ibb.co/0jKHvGgC/model-4.png'
        },
        {
            title: 'کت چرمی بلک مدل وسطای vstay',
            ogPrice: '۱،۴۱۶،۰۰',
            offerPrice: '۱،۲۸۹،۲۰۰',
            percentage: 25,
            imageSrc: 'https://i.ibb.co/bg4Vz1GH/model-5.png'
        }
    ];


    const Quicks = [
        {
            title: 'پالتو',
            enTitle: 'OVERCOAT',
            imageSrc: 'https://i.ibb.co/3mY7RPBF/coat-model.png',
            link: '/overcoats',
        },
        {
            title: 'تیشرت',
            enTitle: 'T-SHIRT',
            imageSrc: 'https://i.ibb.co/FLD9k69Q/t-shirt-model.png',
            link: '/t-shirts',
        },
        {
            title: 'کت تک',
            enTitle: 'COAT',
            imageSrc: 'https://i.ibb.co/FkzdrZXq/coat-model.png',
            link: '/coats',
        },
        {
            title: 'پیراهن',
            enTitle: 'SHIRT',
            imageSrc: 'https://i.ibb.co/Q7MgLnTC/shirt-model.png',
            link: '/shirts',
        },
    ];

    const queryFn = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/products`);
            return data
        } catch (error) {
            console.error(error)
        }
    }


    const { data: Newest } = useQuery(({
        queryKey: ['newest'],
        queryFn
    }))

    return (
        <>
            <section className="hero">
                <div className="texts-container">
                    <div className="texts">
                        <h2>کت شلوار های هاکوپیان</h2>
                        <h3>
                            انواع کت شلوار های مردانه و زنانه در بلک دارک
                            <Link className="arrow-left" to={'/special-sale'}></Link>
                        </h3>
                        <span>HAKOPIAN</span>
                        <div className="shine"></div>
                    </div>
                </div>

                <div className="banner">
                    <img src="/assets/images/hero-banner.png" alt="hero banner" />
                    <Link to={'/special-sale'} className="link-forward"></Link>
                    <img className="logo" src="/assets/images/hakopian-logo.svg" alt="logo" />
                </div>
            </section>

            <section className="gendred-collections">
                <section className="background">
                    <div className="borders border-top"></div>
                    <div className="borders border-center"></div>
                    <div className="borders border-bottom"></div>
                    <div className="borders extra"></div>
                </section>
                <div className="womens-section">
                    <img src="/assets/images/womens-collection-model.png" alt="" />
                    <span> WOMENS CLOTHING </span>
                    <Link to={'/products/womens-collection'}> پـوشـاک  زنـانـه <div className="hyper-anchor"></div> </Link>
                </div>
                <div className="mens-section">
                    <img src="/assets/images/mens-collection-model.png" alt="" />
                    <span> MENS CLOTHING </span>
                    <Link to={'/products/mens-collection'}> پـوشـاک مـردانـه <div className="hyper-anchor"></div> </Link>
                </div>
            </section>

            <section className="special-season-sale">
                <h2> فروش ویژه فصل </h2>
                <div className="background">

                    <div className="right-dot"></div> {/* dots that are placed on the both side */}
                    <div className="left-dot"></div>


                    <div className="countdown">
                        <div className="hour">
                            <span>12</span>
                        </div>
                        :
                        <div className="minute">
                            <span>24</span>
                        </div>
                        :
                        <div className="second">
                            <span>50</span>
                        </div>


                        <div className="top-right-line"></div> {/* lines that are placed on right side */}
                        <div className="bottom-right-line"></div>

                        <div className="top-left-line"></div> {/* lines that are placed on left side */}
                        <div className="bottom-left-line"></div>

                    </div>

                    {Clothing.map((clothing, index) => (
                        <Product
                            key={index}
                            title={clothing.title}
                            ogPrice={clothing.originalPrice}
                            offerPrice={clothing.offerPrice}
                            percentage={clothing.percentage}
                            image={clothing.imageSrc}
                        />
                    ))}

                </div>
            </section>

            <section className="quick-access-links">
                {Quicks.map((card, index) => (
                    <QuickCards
                        key={index}
                        imageSrc={card.imageSrc}
                        title={card.title}
                        enTitle={card.enTitle}
                        link={card.link} />
                ))}
            </section>


            <section className="newest-of-black-dark">
                <h2> جدیدترین ها در بلک دارک </h2>

                <Swiper
                    navigation={true}
                    pagination={true}
                    mousewheel={true}
                    keyboard={true}
                    spaceBetween={34}
                    slidesPerView={'auto'}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
                    className="newerSwiper"
                >
                    {Newest?.map((clothing) => (
                        <SwiperSlide key={clothing.id} className="slide-card">
                            <Product
                                title={clothing.title}
                                ogPrice={clothing.originalPrice}
                                offerPrice={clothing.offerPrice}
                                percentage={clothing.percentage}
                                image={clothing.imageSrc}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

            </section>

        </>
    );
}
