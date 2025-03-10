import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "@app/ui/layouts/navbar";

import Home from "@pages/home";
import NotFound from "@app/pages/404";
import Register from "@pages/auth/register";
import Login from "@app/pages/auth/login";
import Verification from "@app/pages/auth/verification";
import SpecialOffers from "@app/pages/products/special-offers";
import User from "@app/pages/profile/user";
import Admin from "@app/pages/profile/admin";

function App() {
  const location = useLocation();

  const notAllowed = [
    "/auth/register",
    "/auth/login",
    "/auth/verify",
    "/auth/forget-password",
  ];
  const hideNav = notAllowed.includes(location.pathname);

  return (
    <>
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/verify" element={<Verification />} />
        <Route path="/products/special-offers/:slug" element={<SpecialOffers />} />
        <Route path="/profile/user" element={<User />} />
        <Route path="/profile/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
