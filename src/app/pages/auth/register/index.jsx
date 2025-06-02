import React, { useContext, useEffect } from "react";
import "../authentication.scss";
import { Link, useNavigate } from "react-router-dom";
import Input from "@app/ui/components/input";
import { AuthenticationContext } from '@app/context/AuthenticationContext';
import { baseUrl } from "@app/helpers/variables";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";


export default function Register({backgroundImage}) {
  const { username, email, password } = useContext(AuthenticationContext);
  const formType = "register";
  const navigate = useNavigate();

  const registerUser  = async (userData) => {
    try {
      await axios.post(`${baseUrl}/users`, userData);
      navigate('/auth/login');
    } catch (error) {
      console.error(error.message);
    }
  };

  const { mutate: register } = useMutation({
    mutationKey: ["register"],
    mutationFn: registerUser ,
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    register({ username, password, email , admin : false}); // Pass the user data to the mutate function
  };

  return (
    <div className="wrapper">
      <div className="image-container" style={{backgroundImage : `url(${backgroundImage})`}}></div>
      <form onSubmit={handleSubmit}>
        <h3> BLACK DARK </h3>
        <div className="details">
          <Input formType={formType} />
          <button type="submit" className="formBtns">ثبت نام</button>
        </div>
        <Link to="/auth/login"> حساب کاربری دارید؟ ورود </Link>
      </form>
    </div>
  );
}