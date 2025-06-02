import React from "react";

import "./home.scss";
import SpecialSale from "./layouts/special-sale";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <section className="hero">
                <div className="texts-container">
                    <div className="texts">
                        <h2>
                            کت شلوار های هاکوپیان
                        </h2>
                        <h3>
                            انواع کت شلوار های مردانه و زنانه در بلک دارک
                            <Link className="arrow-left" to={'/special-sale'}></Link>
                        </h3>
                        <span> HAKOPIAN </span>
                        <div className="shine"></div>
                    </div>
                </div>

                <div className="banner">
                    <img src="/assets/images/hero-banner.png" alt="hero banner" />
                    <Link to={'/special-sale'} className="link-forward"></Link>
                    <img className="logo" src="/assets/images/hakopian-logo.svg" alt="logo" />
                </div>
            </section>
            <section className="special-sales">
                <h2> فروش ویژه فصل </h2>
                <SpecialSale />
            </section>
        </>
    )
}
