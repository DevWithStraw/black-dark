import React from "react";

import "./home.scss";
import SpecialSale from "./layouts/special-sale";

export default function Home() {
    return (
        <>
        <section className="hero">
            <img className="logo" src="/assets/images/hakopian-logo.svg"/>
            <div className="hero-contents">
                    <h1>کت و شلوار های هاکوپیان</h1>
                    <h2> انواع کت شلوار های مردانه و زنانه در بلک دارک <div className="arrow"></div></h2>
            </div>
            <div className="hero-offset"></div>
            <div className="masked-shape">
                <img src="/assets/images/model.png" alt="" />
            </div>
            <div className="forward">
                <button onClick={"forwardUser"}>
                    {/* Forward user to the promoted product */}
                </button>
            </div>
        </section>
        <section className="special-sales">
            <h2> فروش ویژه فصل </h2>
            <SpecialSale/>
        </section>
        </>
    )
}
