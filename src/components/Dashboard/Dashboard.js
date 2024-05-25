import Sidebar from './Sidebar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const Dashboard = () => {
  const [numClients, setNumClients] = useState(0);
  const [numAccount, setNumAccounts] = useState(0);
  const [role, setRole] = useState(0);
  const [numStaff, setNumStaff] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get('http://localhost:8080')
      .then(res => {
        if (res.data.valid) {
          setRole(!res.data.role);
        } else {
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);

  useEffect(() => {
    axios.post('http://localhost:8080/getUsers')
      .then(res => {
        const fetchedUsers = res.data;
        setNumClients(fetchedUsers.length);
      })
      .catch(err => console.log(err));

      axios.post('http://localhost:8080/getAllAccounts')
      .then(res => {
        const fetchedUsers = res.data;
        setNumAccounts(fetchedUsers.length);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>

      <main className="d-flex min-vh-100 bg-light text-dark">
        <Sidebar />
        <div className="container-fluid mt-4">
          <Nav />
          <div className="container">
            <header className="mb-4">
              <h1 className="text-center">Dashboard</h1>
            </header>
            <div className="row">
              {role !== 'User' && (
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            Clients
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">{numClients}</div>
                        </div>
                        <div className="col-auto">
                          <i className="fa fa-users fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {role !== 'User' && (
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                            Account Types
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">{numAccount}</div>
                        </div>
                        <div className="col-auto">
                          <i className="fa fa-calendar fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-info shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                          Deposits
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">$0,0</div>
                      </div>
                      <div className="col-auto">
                        <i className="fa fa-upload fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-warning shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                          Withdrawal
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">$0,0</div>
                      </div>
                      <div className="col-auto">
                        <i className="fa fa-download fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-danger shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                          Transfers
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">$00,000</div>
                      </div>
                      <div className="col-auto">
                        <i className="fa fa-random fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-secondary shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                          Wallet Balance
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">$00,000</div>
                      </div>
                      <div className="col-auto">
                        <i className="fa fa-money-bill-alt fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {role !== 'user' && (
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            Accounts
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">0</div>
                        </div>
                        <div className="col-auto">
                          <i className="fa fa-users fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
