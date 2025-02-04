import React, { useState } from 'react';
import { createContext } from 'react';

export const AuthenticationContext = createContext();

export default function AuthenticationProvider({children}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  return (
    <AuthenticationContext.Provider value={{username , email , password , confirmPassword , loginUsername , loginPassword , setUsername , setEmail , setPassword , setConfirmPassword , setLoginUsername , setLoginPassword }}>
        {children}
    </AuthenticationContext.Provider>
  )
}

