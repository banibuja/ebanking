import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard } from 'react-icons/fa';
import axios from 'axios';

export default function Sidebar() {
  const [role, setRole] = useState('');
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8080', {withCredentials:true})
      .then(res => {
        if (res.data.valid) {
          setRole(res.data.role);

        } else {
          navigate('/login');
        }
      })
      .catch(err => 
        navigate('/login')
      )
  }, []);

  useEffect(() => {
    // axios.get('http://localhost:8080/sessionTimeRemaining')
    //   .then(res => {
    //     const { timeRemaining } = res.data;
    //     if (timeRemaining === 0) {
    //       handleLogout(); 
    //     } else {
    //       setSessionTimeRemaining(timeRemaining); 
    //     }
    //   })
    //   .catch(err => console.log(err));

    // const timer = setInterval(() => {
    //   setSessionTimeRemaining(prevTime => {
    //     if (prevTime > 0) {
    //       return prevTime - 1; 
    //     } else {
    //       clearInterval(timer); 
    //       handleLogout(); 
    //       return 0;
    //     }
    //   });

    // }, 1000);

    // return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:8080/logout')
      .then(res => {
          navigate('/login');
       
      })
      .catch(err => {
      });
  };

  // const formatTime = (timeInSeconds) => {
  //   const minutes = Math.floor(timeInSeconds / 60);
  //   const seconds = timeInSeconds % 60;
  //   return minutes;  
  // };

  const handleManageClick = async (e) => {
    e.preventDefault();
    // await axios.get('http://localhost:8080/resetSession');
    navigate(e.target.getAttribute('href'));
  };

  return (
    <div>

<div className="d-flex flex-column flex-shrink-0 p-3" style={{ width: '300px', height: '100%', color: 'black', background: 'linear-gradient(to bottom right, #FFB347, #A9A9A9)', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)' }}>
  

        <a href="/" className="d-flex align-items-center mb-3 link-dark text-decoration-none">
          <i className="bi me-2 fas fa-university fa-2x text-gray-300" ></i>
          <span className="fs-4">E-Banking</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
              
          {role !== 'User' && (
            <>
              <li>
                <a href="/dashboard" className="nav-link link-dark" onClick={handleManageClick}>
                  <i className="bi me-2 fas fa-dashboard fa-1x text-gray-300"></i>
                  Dashboard
                </a>
              </li>
              <li>
                <Dropdown>
                  <Dropdown.Toggle variant="link" id="dropdown-clients" className="nav-link link-dark">
                    <i className="bi me-2 fas fa-user fa-1x text-gray-300  "></i>
                    Clients
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/addclient" onClick={handleManageClick}>Add Client</Dropdown.Item>
                    <Dropdown.Item href="/client" onClick={handleManageClick}>Manage Clients</Dropdown.Item>
                    <Dropdown.Item href="/manageaccounts" onClick={handleManageClick}>Manage CurrentAccounts</Dropdown.Item>
                    <Dropdown.Item href="/managesavingsaccount" onClick={handleManageClick}>Manage SavingsAccounts</Dropdown.Item>
                    <Dropdown.Item href="/Manageclientcards" onClick={handleManageClick}>Manage ClientCards</Dropdown.Item>
                    <Dropdown.Item href="/ManagaeApplicantsOnline" onClick={handleManageClick}>ManagaeApplicantsOnline</Dropdown.Item>
                    <Dropdown.Item href="/ManageLoans" onClick={handleManageClick}>Manage Loans</Dropdown.Item>
                    <Dropdown.Item href="/AllPayments" onClick={handleManageClick}>Manage Payment</Dropdown.Item>
                    <Dropdown.Item href="/AccessPermissions" onClick={handleManageClick}>Managae AccessPermissions</Dropdown.Item>
                    <Dropdown.Item href="/CardsForm" onClick={handleManageClick}>Add Cards</Dropdown.Item>

                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </>
          )}
          <li>
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-clients" className="nav-link link-dark">
                <i className="bi me-2 fas fa-user fa-1x text-gray-300  "></i>
                Accounts
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/manageyouraccount" onClick={handleManageClick}>Product summary</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          
          {role !== 'User' && (

          <li>
            
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-accounts" className="nav-link link-dark">
                <i className="bi me-2 fas fa-money-bill-wave fa-1x text-gray-300  "></i>
                Manage Home-Page
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/AddHomePage" onClick={handleManageClick}>Add infosection</Dropdown.Item>
                <Dropdown.Item href="/AddCarusel" onClick={handleManageClick}>Carsel</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          )}
          {role !== 'User' && (

          <li>
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-accounts" className="nav-link link-dark">
                <i className="bi me-2 fas fa-money-bill-wave fa-1x text-gray-300  "></i>
                Manage AboutUS
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/AddAboutUs" onClick={handleManageClick}>Add infosection</Dropdown.Item>
                {/* <Dropdown.Item href="/AddTeam" onClick={handleManageClick}>Team</Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          </li>
          )}
          <li>
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-accounts" className="nav-link link-dark">
                <i className="bi me-2 fas fa-exchange-alt fa-1x text-gray-300  "></i>
                Transactions
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/NewTransaction" onClick={handleManageClick}>InterBank</Dropdown.Item>
                <Dropdown.Item href="/SaveTransaction" onClick={handleManageClick}>Save</Dropdown.Item>
                <Dropdown.Item href="/Transaction" onClick={handleManageClick}>InterHistory</Dropdown.Item>
                <Dropdown.Item href="/SaveHistory" onClick={handleManageClick}>SaveHistory</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-accounts" className="nav-link link-dark">
                <i className="bi me-2 fas fa-hand-holding-usd fa-1x text-gray-300  "></i>
                Loans
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/applyloans" onClick={handleManageClick}>New Loans</Dropdown.Item>
                <Dropdown.Item href="/loans" onClick={handleManageClick}>Loans</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li>
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-accounts" className="nav-link link-dark">
                <i className="bi me-2 fas fa-hand-holding-usd fa-1x text-gray-300  "></i>
                Payment
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/AddBillForm" onClick={handleManageClick}>Add BillForm</Dropdown.Item>
                <Dropdown.Item href="/BillsList" onClick={handleManageClick}>BillsList</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
                        <li>
                                      <a href="/Reports" className="nav-link link-dark" onClick={handleManageClick}>
                                        <i className="fas fa-file-alt fa-1x text-gray-300 me-2"></i>
                                        Reports
                                      </a>
              </li>
              <li>
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-accounts" className="nav-link link-dark">
                <i className="bi me-2 fas fa-money-bill-wave fa-1x text-gray-300  "></i>
                Invesments
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/InvesmentsGoals" onClick={handleManageClick}>Add Goal</Dropdown.Item>
                <Dropdown.Item href="/InvestmentsTable" onClick={handleManageClick}>Goals</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>

          <li>
                <a href="/profi" className="nav-link link-dark" onClick={handleManageClick}>
                  <i className="bi me-2 fas fa-user fa-1x text-gray-300" ></i>
                  Profile
                </a>
              </li>
              <li>
                                      <a href="/Notifications" className="nav-link link-dark" onClick={handleManageClick}>
                                        <i className=" fa-solid fa-comment text-gray-300 me-2"></i>
                                        Notifications
                                      </a>
              </li>
              <li>
                                      <a href="/Support" className="nav-link link-dark" onClick={handleManageClick}>
                                        <i className=" fa-solid fa-circle-info text-gray-300 me-2"></i>
                                        Support
                                      </a>
              </li>
             
          {/* <li><i class="fa-solid fa-circle-info"></i>
            <a href="#" className="nav-link link-dark" onClick={handleManageClick}>
              <i className="bi me-2 fas fa-exchange-alt fa-1x text-gray-300" ></i>
              Notifications
            </a>
          </li> */}
          <li>Advanced Modules</li>
          {/* <li>
            <a href="#" className="nav-link link-dark" onClick={handleManageClick}>
              <i className="bi me-2 fas fa-exchange-alt fa-1x text-gray-300" ></i>
              Transactions History
            </a>
          </li> */}

          <li>
            <a href="#" className="nav-link link-dark" onClick={handleLogout}>
              <i className="bi me-2 fas fa-sign-out-alt fa-1x text-gray-300" ></i>
              Log Out
            </a>
          </li>
        </ul>
        <hr />

        {/* <Dropdown>
          <Dropdown.Toggle variant="link" id="dropdown-profile" className="nav-link link-dark">
            <i className="bi me-2 fas fa-user fa-1x text-gray-300  " ></i>
            Profile
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/settings" onClick={handleManageClick}>Settings</Dropdown.Item>
            <Dropdown.Item href="/profile" onClick={handleManageClick}>Profile</Dropdown.Item>
            <Dropdown.Item href="/signout" onClick={handleManageClick}>Sign Out</Dropdown.Item>
            <Dropdown.Item href="/ContactUs" onClick={handleManageClick}>ContactUs</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
        {/* <small>Session Time Remaining: {formatTime(sessionTimeRemaining)}</small> */}
      </div>
    </div>
  );
}
