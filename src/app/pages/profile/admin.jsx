import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Admin() {

  const navigate = useNavigate();

  const logOut = () => {
      localStorage.removeItem('username')
      localStorage.removeItem('password')
      localStorage.removeItem('email')
      localStorage.removeItem('code');
      localStorage.removeItem('loginState');
      localStorage.removeItem('verified');

      navigate('/auth/login');
  }

  return (
    <div>
        <h1>پنل ادمین {localStorage.getItem('username')}</h1>
        <button style={{color : 'red'}} onClick={logOut}> خروج از حساب </button>
    </div>
  )
}
