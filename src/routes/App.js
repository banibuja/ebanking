import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { Client } from '../components/Dashboard/Client/Client';
import Transaction from '../components/Dashboard/Transaction/Transactions';
import ApplyOnline from '../components/ApplyOnline/ApplyOnline'
import AddClient from '../components/Dashboard/Client/AddClient';
import EditClient from '../components/Dashboard/Client/EditClient';
import ContactForm from '../components/Dashboard/ContactUs/ContactForm';
import Home from '../components/Home/Home';
import Sidebar from '../components/Dashboard/Sidebar';
import CardsForm from '../components/Dashboard/Cards/CardsForm';
import ManageAccounts from '../components/Dashboard/Accounts/ManageAccounts';
import ManageYourAccount from '../components/Dashboard/Accounts/ManageYourAccount';
import Manageclientcards from '../components/Dashboard/Cards/Manageclientcards';
import AccessPermissions from '../components/Dashboard/AccessPermissions/AccessPermissions';
import ManageSavingsAccount from '../components/Dashboard/Accounts/ManageSavingsAccount';
import Currencies from '../components/Dashboard/Currencies/Currencies';
import Loans from '../components/Dashboard/Loans/Loans';
import InvesmentsGoals from '../components/Dashboard/InvestmentsGoals/InvestmentsGoals';
import InvestmentsTable from '../components/Dashboard/InvestmentsGoals/InvestmentsTable';
import ProfileRoutes  from './ProfileRoutes'; 
import Nav from '../components/Dashboard/Nav';
import AboutUs from '../components/AboutUS/AboutUs';
import Login from './Login';
import NewTransaction from '../components/Dashboard/Transaction/NewTransaction';
import SaveTransaction from '../components/Dashboard/Transaction/SaveTransaction';
import ManagaeApplicantsOnline from '../components/ApplyOnline/ManagaeApplicantsOnline';
import ApplyLoans from '../components/Dashboard/Loans/ApplyLoans';
import SaveHistory from '../components/Dashboard/Transaction/SaveHistory';
import AddHomePage from '../components/Dashboard/Add Home-page/Add-HomePage';
import AddCarusel from '../components/Dashboard/Add Home-page/AddCarusel';
import ManageLoans from '../components/Dashboard/Loans/ManageLoans';
import AddAboutUS from '../components/Dashboard/AddAboutUs/AddAboutUs';
import BillsList from '../components/Dashboard/Payment/BillsList';
import AddBillForm from '../components/Dashboard/Payment/AddBillForm';
import Reports from '../components/Dashboard/Reports/Reports';
import Support from '../components/Dashboard/Support/Support';
import LogsAdmin from '../components/Dashboard/Logs/LogsAdmin';
import AllPayments from '../components/Dashboard/Payment/AllPayments';
import AddTeam from '../components/zz/AddTeam';
import AddPlayers from '../components/zz/AddPlayers'
import GetPlayers from '../components/zz/GetPlayers'
import AddPlanet from '../components/zz/AddPlanet'
import AddSatellite from '../components/zz/AddSatellite'
import GetSatellite from '../components/zz/GetSatellite';
import Item from '../components/Item'
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';










function App() {
  return (

    

    <BrowserRouter>
      <Routes>
      <Route path="/LogsAdmin" element={<LogsAdmin/>}/>
     
      <Route path="/Item" element={<Item/>}/>
      <Route path="/ItemForm" element={<ItemForm/>}/>
      <Route path="/ItemList" element={<ItemList/>}/>



        <Route path="/SaveTransaction" element={<SaveTransaction/>}/>
        <Route path="/Transaction" element={<Transaction/>}></Route> 
        <Route path="/AddHomePage" element={<AddHomePage/>}/>
        <Route path="/AddCarusel" element={<AddCarusel/>}/>
        <Route path="/AboutUs" element={<AboutUs/> } />
        <Route path="/AddAboutUS" element={<AddAboutUS/> } />
        <Route path="/ApplyOnline" element={<ApplyOnline />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/client" element={<Client />} />
        <Route path="/addclient" element={<AddClient />} />
        <Route path="/editclient" element={<EditClient />} />
        <Route path="/ContactForm" element={<ContactForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/Sidebar" element={<Sidebar/>} />
        <Route path="/CardsForm" element={<CardsForm/>} />
                <Route path="/ManageAccounts" element={<ManageAccounts/>} /> 
        <Route path="/ManageYourAccount" element={<ManageYourAccount/>} /> 
        <Route path="/Manageclientcards" element={<Manageclientcards/>} /> 
        <Route path="/ManageSavingsAccount" element={<ManageSavingsAccount/>} /> 
        <Route path="/AccessPermissions" element={<AccessPermissions/>} /> 
        <Route path="/currencies" element={<Currencies/>} /> 
        <Route path="/Loans" element={<Loans/>}/>
        <Route path="/InvesmentsGoals" element={<InvesmentsGoals/>} /> 
        <Route path="/InvestmentsTable" element={<InvestmentsTable/>} /> 
        <Route path="/Nav" element={<Nav/>} /> 
        <Route path="/NewTransaction" element={<NewTransaction/>} /> 
        <Route path="/ManagaeApplicantsOnline" element={<ManagaeApplicantsOnline/>} /> 
        <Route path="/ApplyLoans" element={<ApplyLoans/>} /> 
        <Route path="/SaveHistory" element={<SaveHistory/>} /> 
        <Route path="/ManageLoans" element={<ManageLoans />} />
        <Route path="/Reports" element={<Reports />} /> 
         <Route path="/BillsList" element={<BillsList />}/> 
        <Route path="/AddBillForm" element={<AddBillForm />} />
        <Route path="/Support" element={<Support />} /> 
        <Route path="/AllPayments" element={<AllPayments />} /> 


        <Route path="/AddTeam" element={<AddTeam/>}/>
      <Route path="/AddPlanet" element={<AddPlanet/>}/>
      <Route path="/AddSatellite" element={<AddSatellite/>}/>
      
      <Route path="/AddPlayers" element={<AddPlayers/>}/>
      <Route path="/GetPlayers" element={<GetPlayers/>}/>
      <Route path="/GetSatellite" element={<GetSatellite/>}/>

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
