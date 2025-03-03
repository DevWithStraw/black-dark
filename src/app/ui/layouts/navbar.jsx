import React from "react";
import "./navbar.scss";

import { Link } from "react-router-dom";

export default function navbar() {
  const links = [
    {
      id: 0,
      title: "تماس با ما",
      url: "/contact-us",
    },
    {
      id: 1,
      title: "درباره ما",
      url: "/about-us",
    },
    {
      id: 2,
      title: "وبلاگ",
      url: "/blog",
    },
  ];

  return (
    <>
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.id}>
              <Link to={link.url}> {link.title} </Link>
            </li>
          ))}
        </ul>

        <button className="cart">
          سبد خرید
          <div className="indicator">2</div>
        </button>
        <button className="profile-me">پروفایل من</button>
      </nav>
      <div className="sub-nav">
        <div className="search-bar">
          <img src="/assets/icons/search.svg" alt="search ico" />
          <input type="text" name="search-all" id="searchTheWholeSite" placeholder="جستجو" />
        </div>
        <ul>
          <li> پیراهن </li>
          <li> تیشرت </li>
          <li> شلوار </li>
          <li> کت و شلوار </li>
          <li> ژاکت </li>
          <li> کاپشن </li>
        </ul>
        <h3>BLACK DARK</h3>
      </div>
    </>
  );
}
