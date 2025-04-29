import React, { useEffect } from 'react'
import { useNavigate , Link } from 'react-router-dom';

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

  useEffect(()=>{
   const adminState = localStorage.getItem('admin');

    if(adminState !== "true"){
      navigate('/profile/user')
    }

  },[])

  return (
    <div>
        <h1>پنل ادمین {localStorage.getItem('username')}</h1>
        <Link to='/profile/admin/new-product'> ایجاد محصول جدید </Link>
        <button style={{color : 'red'}} onClick={logOut}> خروج از حساب </button>
    </div>
  )
}
