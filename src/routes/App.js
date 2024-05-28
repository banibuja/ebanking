import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { Client } from '../components/Dashboard/Client/Client';
import Transaction from '../components/Dashboard/Transaction/Transactions';
// import Login from '../components/LoginSignup/Login'
import ApplyOnline from '../components/ApplyOnline/ApplyOnline'
import AddClient from '../components/Dashboard/Client/AddClient';
// import ContactUs from '../components/Dashboard/ContactUs/ContactUs'
import EditClient from '../components/Dashboard/Client/EditClient';
import ContactForm from '../components/Dashboard/ContactUs/ContactForm';
import Home from '../components/Home/Home';
// import Profile from '../components/Dashboard/Profile/Profile';
import Sidebar from '../components/Dashboard/Sidebar';
import CardsForm from '../components/Dashboard/Cards/CardsForm';
// import ManageCards from '../components/Dashboard/Cards/ManageCards';
import ManageAccounts from '../components/Dashboard/Accounts/ManageAccounts';
import ManageYourAccount from '../components/Dashboard/Accounts/ManageYourAccount';
import Manageclientcards from '../components/Dashboard/Cards/Manageclientcards';
import AccessPermissions from '../components/Dashboard/AccessPermissions/AccessPermissions';
import ManageSavingsAccount from '../components/Dashboard/Accounts/ManageSavingsAccount';
// import ManageYourSavings from '../components/Dashboard/Accounts/ManageYourSavings';
import Currencies from '../components/Dashboard/Currencies/Currencies';
// import Contact from '../components/Dashboard/ContactUs/Contact';
import Loans from '../components/Dashboard/Loans/Loans';
import InvesmentsGoals from '../components/Dashboard/InvestmentsGoals/InvestmentsGoals';
import InvestmentsTable from '../components/Dashboard/InvestmentsGoals/InvestmentsTable';
import ProfileRoutes  from './ProfileRoutes'; // Import ProfileRoutes
import Nav from '../components/Dashboard/Nav';
// Make sure the file path is correct
import AboutUs from '../components/AboutUS/AboutUs';

//
import Login from './Login';
import NewTransaction from '../components/Dashboard/Transaction/NewTransaction';
import SaveTransaction from '../components/Dashboard/Transaction/SaveTransaction';

import ManagaeApplicantsOnline from '../components/ApplyOnline/ManagaeApplicantsOnline';
import ApplyLoans from '../components/Dashboard/Loans/ApplyLoans';
import SaveHistory from '../components/Dashboard/Transaction/SaveHistory';
// import PhotoUpload from '../components/PhotoUpload';
// import PhotoGallery from '../components/PhotoGallery';
import AddHomePage from '../components/Dashboard/Add Home-page/Add-HomePage';
import AddCarusel from '../components/Dashboard/Add Home-page/AddCarusel';

function App() {
  return (

    

    <BrowserRouter>
      <Routes>
        <Route path="/SaveTransaction" element={<SaveTransaction/>}/>
        <Route path="/Transaction" element={<Transaction/>}></Route> 
        <Route path="/AddHomePage" element={<AddHomePage/>}/>
        <Route path="/AddCarusel" element={<AddCarusel/>}/>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/AboutUs" element={<AboutUs/> } />
        <Route path="/ApplyOnline" element={<ApplyOnline />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/client" element={<Client />} />
        <Route path="/addclient" element={<AddClient />} />
        {/* <Route path="/ContactUs" element={<ContactUs />} /> */}
        <Route path="/editclient" element={<EditClient />} />
        <Route path="/ContactForm" element={<ContactForm />} />
        {/* <Route path="/Profile" element={<Profile />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/Sidebar" element={<Sidebar/>} />
        <Route path="/CardsForm" element={<CardsForm/>} />
        {/* <Route path="/ManageCards" element={<ManageCards/>} /> */}
        <Route path="/ManageAccounts" element={<ManageAccounts/>} /> 
        <Route path="/ManageYourAccount" element={<ManageYourAccount/>} /> 
        <Route path="/Manageclientcards" element={<Manageclientcards/>} /> 
        <Route path="/ManageSavingsAccount" element={<ManageSavingsAccount/>} /> 
        {/* <Route path="/ManageYourSavings" element={<ManageYourSavings/>} />  */}
        <Route path="/AccessPermissions" element={<AccessPermissions/>} /> 
        <Route path="/currencies" element={<Currencies/>} /> 
        {/* <Route path="/Contact" element={<Contact/>} />  */}
        <Route path="/Loans" element={<Loans/>}/>
        <Route path="/InvesmentsGoals" element={<InvesmentsGoals/>} /> 
        <Route path="/InvestmentsTable" element={<InvestmentsTable/>} /> 
        <Route path="/Nav" element={<Nav/>} /> 
        <Route path="/NewTransaction" element={<NewTransaction/>} /> 
        <Route path="/ManagaeApplicantsOnline" element={<ManagaeApplicantsOnline/>} /> 
        <Route path="/ApplyLoans" element={<ApplyLoans/>} /> 
        <Route path="/SaveHistory" element={<SaveHistory/>} /> 

{/* 
        
        <Route path="/PhotoUpload" element={<PhotoUpload/>} /> 
        <Route path="/PhotoGallery" element={<PhotoGallery/>} />  */}


        {/* <Route path="/Profi" element={<Profi/>} />  */}

        SaveHistory






      </Routes>
      <ProfileRoutes  />
      <Login   />
     
    </BrowserRouter>
  );
}

export default App;
