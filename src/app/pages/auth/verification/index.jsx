import React, { useState, useRef, useEffect, useContext } from "react";
import "../authentication.scss";
import { Link, useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { AuthenticationContext } from "@app/context/AuthenticationContext";


const numberInputs = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

export default function Verification() {

    const {username } = useContext(AuthenticationContext)

    emailjs.init({
        publicKey: 'WS-6P9Da4FvGQ41yR',
        limitRate: {
            id: 'app',
            throttle: 50000,
        },

    });

    const navigate = useNavigate();
    
    const [code, setCode] = useState(() => String(Math.floor(Math.random() * 100000)).padStart(5, '0'));



    useEffect(() => {

        if (localStorage.getItem('verified') === null) {
            navigate('/auth/login')
        } else if (localStorage.getItem('verified') == "true") {
            let to_email = localStorage.getItem('email');
            emailjs.send("service_8nul34o", "template_i0rju3l", { code, to_email , username }).then(
                (response) => {
                    console.log('ایمیل ارسال شد!', response.status, response.text);
                },
                (error) => {
                    console.log('خطا...', error);
                })
        }
    }, [])

    const [values, setValues] = useState(["", "", "", "", ""]); // Track values of each input
    const inputRefs = useRef([]); // Store refs for each input element

    const handleChange = (e, index) => {
        const value = e.target.value;
        const newValues = [...values];
        newValues[index] = value;

        // Move to the next input if there's a value
        setValues(newValues);
        if (value && index < numberInputs.length - 1) {
            // Focus next input
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && values[index] === "") {
            // Focus previous input if backspace is pressed and the current input is empty
            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        } else if (e.key === "Backspace" && values[index] !== "") {
            // If there's a value, just delete it
            const newValues = [...values];
            newValues[index] = "";
            setValues(newValues);
        } else if (e.key === "Delete" && values[index] === "") {
            // Focus next input if delete is pressed and current input is empty
            if (index < numberInputs.length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        } else if (e.key === "Delete" && values[index] !== "") {
            // If there's a value, just delete it
            const newValues = [...values];
            newValues[index] = "";
            setValues(newValues);
        }
    };

    const checkCode = (e) => {
        e.preventDefault();
        localStorage.setItem('code', values.join(''))
        let enteredCode = localStorage.getItem('code')

        if (enteredCode == code) {
            alert('Verification was successful!')
        } else {
            alert('error')
        }
    }

    return (
        <div className="wrapper">
            <div className="model">
                <img src="/assets/images/verification.png" alt="model sign up" />
            </div>
            <form onSubmit={checkCode}>
                <h3>BLACK DARK</h3>
                <div className="details">
                    <div className="box-container">
                        {numberInputs.map((number, index) => (
                            <input
                                key={number.id}
                                type="text"
                                className="numbers"
                                value={values[index]}
                                maxLength="1"
                                ref={(el) => (inputRefs.current[index] = el)}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>
                    <button type="submit">
                        {" "}
                        تایید کد{" "}
                    </button>
                    <div className="row">
                        <span className="countdown"> ارسال مجدد ۴:۵۹ </span>
                        <Link to="/auth/login"> ویرایش ایمیل </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}