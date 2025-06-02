import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "@app/ui/layouts/navbar";

import bgRegister from '/assets/images/register.png';
import bgLogin from '/assets/images/login.png';
import bgVerify from '/assets/images/verification.png';

import Home from "@pages/home";
import NotFound from "@app/pages/404";
import Register from "@pages/auth/register";
import Login from "@app/pages/auth/login";
import Verification from "@app/pages/auth/verification";
import SpecialOffers from "@app/pages/products/special-offers";
import User from "@app/pages/profile/user";
import Admin from "@app/pages/profile/admin";
import NewProduct from "@app/pages/profile/newProduct";
import ProductDetails from "@app/ui/components/productDetails";
import Products from "@app/pages/products/products";

function App() {
  const location = useLocation();

  const notAllowed = [
    "/auth/register",
    "/auth/login",
    "/auth/verify",
    "/auth/forget-password",
    "/products"
  ];
  const hideNav = notAllowed.includes(location.pathname);

  return (
    <>
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/auth/register" element={<Register backgroundImage={bgRegister}/>} />
        <Route path="/auth/login" element={<Login backgroundImage={bgLogin} />} />
        <Route path="/auth/verify" element={<Verification backgroundImage={bgVerify} />} />
        <Route path="/products/special-offers/:slug" element={<SpecialOffers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/profile/user" element={<User />} />
        <Route path="/profile/admin" element={<Admin />} />
        <Route path="/profile/admin/new-product" element={<NewProduct />} />
      </Routes>
    </>
  );
}

export default App;
