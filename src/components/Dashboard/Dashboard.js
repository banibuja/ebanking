import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Nav from './Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Dashboard.css';

export const Dashboard = () => {
  const [numClients, setNumClients] = useState(0);
  const [numAccount, setNumAccounts] = useState(0);
  const [SaveAccount, setSaveAccount] = useState(0);
  const [Transaction, setTransactions] = useState(0);
  const [loans, setLoans] = useState(0); 
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8080', { withCredentials: 'true' })
      .then(res => {
        if (res.status === 401) navigate('/login');
        if (res.data.valid) {
          setRole(res.data.role);
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
        const fetchedAccounts = res.data;
        setNumAccounts(fetchedAccounts.length);
      })
      .catch(err => console.log(err));

    axios.post('http://localhost:8080/getAllLoans') 
      .then(res => {
        const fetchedLoans = res.data; 
        setLoans(fetchedLoans.length);
      })
      .catch(err => console.log(err));

    axios.post('http://localhost:8080/getAllSavingAccount')
      .then(res => {
        const fetchedAccounts = res.data;
        setSaveAccount(fetchedAccounts.length);
      })
      .catch(err => console.log(err));

    axios.post('http://localhost:8080/getAllInterTransactions') 
      .then(res => {
        const fetchedTransactions = res.data;
        setTransactions(fetchedTransactions.length);
      })
      .catch(err => console.log(err));
  }, []);

  const data = [
    { name: 'Clients', value: numClients },
    { name: 'CurrentAcc', value: numAccount },
    { name: 'SavingsAcc', value: SaveAccount },
    { name: 'Transactions', value: Transaction },
    { name: 'Loans', value: loans } 
  ];

  return (
    <div>
      <main className="d-flex min-vh-100 bg-light text-dark">
        <Sidebar />
        <div className="container-fluid mt-4">
          <Nav />
          <div className="row mt-5">
            {role !== 'User' && (
              <>
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

                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                            Current Account Types
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

                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-info shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                            Savings Account Types
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">{SaveAccount}</div>
                        </div>
                        <div className="col-auto">
                          <i className="fa fa-upload fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Transaction
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{Transaction}</div>
                    </div>
                    <div className="col-auto">
                      <i className="fa fa-users fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {role === 'User' && (
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          Loans
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">{loans}</div> {/* Fixed variable name */}
                      </div>
                      <div className="col-auto">
                        <i className="fa fa-calendar fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="welcome-dashboard welcome-message">
          <span className="text1">Welcome to</span>
          <span className="text2">E-Banking</span>
          <div className="additional-text">
            <p className="welcome-message">You can manage your account,</p>
            <p>transfer money to another account, (History for transfer)</p>
            <p>transfer money to save accounts (History for transfer),</p>
            <p>you can apply for Loans,</p>
            <p>you can add goals for your investments,</p>
            <p>and view reports, and view your Profile.</p>
          </div>
        </div>

        {/* <div className='rechartat'>
          <BarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div> */}
        
      </main>
    </div>
  );
};
