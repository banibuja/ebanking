import React from 'react';
// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './admin/Dashboard/Dashboard';
import { Client } from './admin/Client/Client';



import Login from './LoginSignup/Login'
import Signup from './LoginSignup/Signup'
import AddClient from './admin/Client/AddClient';
import ContactUs from './ContactUs/ContactUs'
import EditClient from './admin/Client/EditClient';

import ContactForm from './ContactUs/ContactForm';
import Home from './Home/Home';
import AddAcc from './admin/accounts/AddAcc';
import Acc from './admin/accounts/Acc';
import OpenAcc from './admin/accounts/OpenAcc';
import OpenAction from './admin/accounts/OpenAction';
import Profile from './admin/Profile/Profile';
import ManageAccIban from './admin/accounts/ManageAccIban';
import Sidebar from './admin/Dashboard/Sidebar';
import EditAcc from './admin/accounts/EditAcc';



function App() {
  return (

    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/client" element={<Client />} />
        <Route path="/addclient" element={<AddClient />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/editclient" element={<EditClient />} />
        <Route path="/ContactForm" element={<ContactForm />} />
        <Route path="/Profile" element={<Profile />} />

        <Route path="/" element={<Home />} />

        <Route path="/AddAcc" element={<AddAcc />} />
        <Route path="/acc" element={<Acc />} />
        <Route path="/OpenAcc" element={<OpenAcc />} />
        <Route path="/OpenAction" element={<OpenAction />} />
        <Route path="/ManageAccIban" element={<ManageAccIban />} />
        <Route path="/Sidebar" element={<Sidebar/>} />
        <Route path="/EditAcc" element={<EditAcc/>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
