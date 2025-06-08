import React from "react";
import { Link } from "react-router-dom";
import "./home.scss";
import SpecialSale from "./layouts/special-sale";

export default function Home() {

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

        </>
    );
}
