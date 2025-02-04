import React, { useContext, useState } from "react";
import "../authentication.scss";


import { Link } from "react-router-dom";

import Input from "@ui/components/input";
import axios from "axios";
import { baseUrl } from "@app/helpers/variables";
import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

import { AuthenticationContext } from "@app/context/AuthenticationContext";

export default function Login() {

  const navigate = useNavigate();

  const { loginUsername, loginPassword } = useContext(AuthenticationContext)

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${baseUrl}/register`);
      const users = response.data;

      const user = users.find(
        (user) => user.username === loginUsername && user.password === loginPassword
      )

      if (user) {
        alert("Login Successful");
        localStorage.setItem("verified", true);
        localStorage.setItem("email" , user.email)
        setTimeout(() => {
          navigate("/auth/verify")
        }, 2000)
      }else{
        console.error('falied')
      }

    } catch (error) {
      console.error(error)
    }
  };

  const formType = "login";

  return (
    <div className="wrapper">
      <div className="model">
        <img src="/assets/images/login.png" alt="model login" />
      </div>

      <form onSubmit={loginUser}>
        <h3>BLACK DARK</h3>
        <div className="details">
          <Input formType={formType} />
          <button type="submit">
            ورود
          </button>
          <div className="row">
            <Link to="/auth/register">ثبت نام</Link>
            <Link to="/auth/forget-password">فراموشی رمز عبور</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
