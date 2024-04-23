import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Sidebar() {
  const [role, setRole] = useState('');
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(); 
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8080')
      .then(res => {
        if (res.data.valid) {
          setRole(res.data.role); 
        } else {
          navigate('/login');
        }
      })
      .catch(err => console.log(err))
  }, [navigate]);

  useEffect(() => {
    axios.get('http://localhost:8080/sessionTimeRemaining')
      .then(res => {
        const { timeRemaining } = res.data;
        if (timeRemaining === 0) {
          handleLogout(); 
        } else {
          setSessionTimeRemaining(timeRemaining); // Update session time remaining
        }
      })
      .catch(err => console.log(err));
  
    const timer = setInterval(() => {
      setSessionTimeRemaining(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1; 
        } else {
          clearInterval(timer); 
          handleLogout(); 
          return 0;
        }
      });

    }, 1000);
  
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:8080/logout')
      .then(res => {
        if (res.data.success) {
          navigate('/');
        } else {
        }
      })
      .catch(err => {
      });
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    // const seconds = timeInSeconds % 60;
    return minutes;  
  };

  const handleManageClick = (e) => {
    e.preventDefault(); 
    navigate(e.target.getAttribute('href'));
  };

  return (
    <div>
      <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '300px', height: '100%', color: 'black', backgroundColor: 'white'}}>
        <a href="/" className="d-flex align-items-center mb-3 link-dark text-decoration-none">
          <i className="bi me-2 fas fa-university fa-2x text-gray-300" ></i>
          <span className="fs-4">E-Banking</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          {role !== 'user' && (
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
                    <i className="bi me-2 fas fa-user fa-1x text-gray-300 bg-light"></i>
                    Clients
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/addclient" onClick={handleManageClick}>Add Client</Dropdown.Item>
                    <Dropdown.Item href="/client" onClick={handleManageClick}>Manage Clients</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </>
          )}
          {role !== 'staff' && role !== 'user' && (
            <li>
              <Dropdown>
                <Dropdown.Toggle variant="link" id="dropdown-staff" className="nav-link link-dark">
                  <i className="bi me-2 fas fa-user fa-1x text-gray-300 bg-light"></i>
                  Staff
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/addstaff" onClick={handleManageClick}>Add Staff</Dropdown.Item>
                  <Dropdown.Item href="/staff" onClick={handleManageClick}>Manage Staff</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          )}
          {role !== 'user' && (
            <>
              <li>
                <a href="/ContactUs" className="nav-link link-dark" onClick={handleManageClick}>
                  <i className="bi me-2 fas fa-user fa-1x text-gray-300"></i>
                  ContactUs
                </a>
              </li>
              <li>
                <Dropdown>
                  <Dropdown.Toggle variant="link" id="dropdown-accounts" className="nav-link link-dark">
                    <i className="bi me-2 fas fa-user-secret fa-1x text-gray-300 bg-light"></i>
                    Accounts
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/addacc" onClick={handleManageClick}>Add Acc</Dropdown.Item>
                    <Dropdown.Item href="/acc" onClick={handleManageClick}>Manage Acc</Dropdown.Item>
                    <Dropdown.Item href="/openacc" onClick={handleManageClick}>Open acc</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </>
          )}
          
          <li>
          <Dropdown>
                  <Dropdown.Toggle variant="link" id="dropdown-accounts" className="nav-link link-dark">
                    <i className="bi me-2 fas fa-money-bill-wave fa-1x text-gray-300 bg-light"></i>
                    Finances
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#" onClick={handleManageClick}>Deposists</Dropdown.Item>
                    <Dropdown.Item href="#" onClick={handleManageClick}>Withdrawals</Dropdown.Item>
                    <Dropdown.Item href="#" onClick={handleManageClick}>Funds Transfers</Dropdown.Item>
                    <Dropdown.Item href="#" onClick={handleManageClick}>Balanace</Dropdown.Item>

                  </Dropdown.Menu>
                </Dropdown>
          </li>
          <li>
            <a href="/Profile" className="nav-link link-dark" onClick={handleManageClick}>
              <i className="bi me-2 fas fa-user fa-1x text-gray-300" ></i>
              Profile
            </a>
          </li>
          <li>Advanced Modules</li>
          <li>
            <a href="#" className="nav-link link-dark" onClick={handleManageClick}>
              <i className="bi me-2 fas fa-exchange-alt fa-1x text-gray-300" ></i>
              Transactions History
            </a>
          </li>
          <li>
            <a href="#" className="nav-link link-dark" onClick={handleManageClick}>
              <i className="bi me-2 fas fa-chart-line fa-1x text-gray-300" ></i>
              Financial Reports
            </a>
          </li>
          <li>
            <a href="#" className="nav-link link-dark" onClick={handleManageClick}>
              <i className="bi me-2 fas fa-cogs fa-1x text-gray-300" ></i>
              System Settings
            </a>
          </li>
          <li>
            <a href="#" className="nav-link link-dark" onClick={handleLogout}> 
              <i className="bi me-2 fas fa-sign-out-alt fa-1x text-gray-300" ></i>
              Log Out
            </a>
          </li>
        </ul>
        <hr />       

        <Dropdown>
          <Dropdown.Toggle variant="link" id="dropdown-profile" className="nav-link link-dark">
            <i className="bi me-2 fas fa-user fa-1x text-gray-300 bg-light" ></i>
            Profile
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/settings" onClick={handleManageClick}>Settings</Dropdown.Item>
            <Dropdown.Item href="/profile" onClick={handleManageClick}>Profile</Dropdown.Item>
            <Dropdown.Item href="/signout" onClick={handleManageClick}>Sign Out</Dropdown.Item>
            <Dropdown.Item href="/ContactUs" onClick={handleManageClick}>ContactUs</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <small>Session Time Remaining: {formatTime(sessionTimeRemaining)}</small>
      </div>
    </div>
  );
}
