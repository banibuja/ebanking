// src/routes/ProfileRoutes.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Profile from '../components/Dashboard/Profile/Profile';
import Profi from '../components/Dashboard/Profile/Profi';

const ProfileRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/Profile" element={<Profile />} /> */}
      <Route path="/Profi" element={<Profi />} />
    </Routes>
  );
}

export default ProfileRoutes;
