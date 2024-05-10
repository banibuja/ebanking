import React from 'react';
// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './admin/Dashboard/Dashboard';
import { Client } from './admin/Client/Client';

import Transaction from './admin/Transaction/Transaction';

import Login from './LoginSignup/Login'
import Signup from './LoginSignup/Signup'
import AddClient from './admin/Client/AddClient';
import ContactUs from './ContactUs/ContactUs'
import EditClient from './admin/Client/EditClient';

import ContactForm from './ContactUs/ContactForm';
import Home from './Home/Home';

import Profile from './admin/Profile/Profile';
import Sidebar from './admin/Dashboard/Sidebar';
import CardsForm from './Cards/CardsForm';
import ManageCards from './Cards/ManageCards';
import ManageAccounts from './Accounts/ManageAccounts';
import ManageYourAccount from './Accounts/ManageYourAccount';
import Manageclientcards from './Cards/Manageclientcards';
import AccessPermissions from './AccessPermissions/AccessPermissions';



import ManageSavingsAccount from './Accounts/ManageSavingsAccount';
import ManageYourSavings from './Accounts/ManageYourSavings';
// import ManageAcc from './Accounts/ManageAcc';




function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/Transaction" element={<Transaction/>}></Route> 
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

        <Route path="/Sidebar" element={<Sidebar/>} />
        <Route path="/CardsForm" element={<CardsForm/>} />
        <Route path="/ManageCards" element={<ManageCards/>} />
        <Route path="/ManageAccounts" element={<ManageAccounts/>} /> 
        <Route path="/ManageYourAccount" element={<ManageYourAccount/>} /> 
        <Route path="/Manageclientcards" element={<Manageclientcards/>} /> 
        <Route path="/ManageSavingsAccount" element={<ManageSavingsAccount/>} /> 
        <Route path="/ManageYourSavings" element={<ManageYourSavings/>} /> 
        <Route path="/AccessPermissions" element={<AccessPermissions/>} /> 

        






        




      </Routes>
    </BrowserRouter>
  );
}

export default App;
