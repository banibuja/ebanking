// src/routes/ProfileRoutes.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/LoginSignup/Login';

const LoginForm = () => {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
    </Routes>
  );
}

export default LoginForm;
