import React, { useState, useRef, useEffect, useContext } from "react";
import "../authentication.scss";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import axios from "axios";
import { baseUrl } from "@app/helpers/variables";


const numberInputs = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

export default function Verification() {

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

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
            emailjs.send("service_8nul34o", "template_i0rju3l", { code, to_email }).then(
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
        }
    }

    const [toggleEditComponent, setToggleEditComponent] = useState(true);
    const [edittedEmail, setEddittedEmail] = useState("");

    const editEmail = async () => {
        try {
            const getallUsers = await axios.get(`${baseUrl}/users`); //Get all users info
            const users = getallUsers.data;

            const user = users.find(
                (user) => user.username === username && user.password === password
            )
            
            if (user) {
                const response = await axios.patch(`${baseUrl}/users/${user.id}`, {
                    email: edittedEmail
                });
                if (response.status === 200) {
                    setTimeout(() => {
                        setToggleEditComponent(true)
                    }, 4000)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
    
        const sendEmail = async () => {
            let to_email = edittedEmail;
            try {
                const response = await emailjs.send(
                    "service_8nul34o",
                    "template_i0rju3l",
                    { code, to_email },
                    { signal }
                );
                console.log('ایمیل ارسال شد!', response.status, response.text);
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('ارسال ایمیل لغو شد.');
                } else {
                    console.log('خطا...', error);
                }
            }
        };
    
        sendEmail();
    
        return () => {
            abortController.abort(); 
        };
    }, []); 

    return (
        <div className="wrapper">
            <div className="model">
                <img src="/assets/images/verification.png" alt="model sign up" />
            </div>
            <form onSubmit={checkCode}>
                <h3>BLACK DARK</h3>
                {toggleEditComponent ?
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
                        <button type="submit" className="formBtns">
                            {" "}
                            تایید کد{" "}
                        </button>
                        <div className="row">
                            <span className="countdown"> ارسال مجدد ۴:۵۹ </span>
                            <button type="button" onClick={() => setToggleEditComponent(false)} className="editEmail"> ویرایش ایمیل </button>
                        </div>
                    </div>
                    :
                    <div className="details">
                        <input type="email" placeholder="آدرس ایمیل جدید را وارد کنید!
                        " value={edittedEmail} onInput={(e) => setEddittedEmail(e.target.value)} />
                        <button type="button" className="formBtns" onClick={editEmail}>ارسال کد به آدرس جدید</button>
                    </div>
                }
            </form>
        </div>
    );
}