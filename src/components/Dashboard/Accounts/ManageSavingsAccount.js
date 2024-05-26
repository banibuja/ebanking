import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import EditSavings from './EditSavings';
import Nav from '../Nav';
import VerifyLogin from '../VerifyLogin';

export const ManageSavingsAccount = () => {
    const [accounts, setAccounts] = useState([]);
    const [numAccounts, setNumAccounts] = useState(0);
    const [editAccount, setEditAccountId] = useState(null);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [showAll, setShowAll] = useState(false);
    const [clientID, setclientID] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        fetchAccounts();
    }, []);

    const navigate = useNavigate();
    VerifyLogin();

    const fetchAccounts = () => {
        axios.post('http://localhost:8080/getAllSavingAccount')
            .then(res => {
                const fetchedAccounts = res.data;
                setAccounts(fetchedAccounts);
                setNumAccounts(fetchedAccounts.length);
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/deleteSavings/${id}`)
            .then(res => {
                fetchAccounts();
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (id) => {
        setEditAccountId(id);
    };

    const handleCloseEditModal = () => {
        setEditAccountId(null);
    };

    const handleChangeRecordsPerPage = (value) => {
        setRecordsPerPage(value);
        setShowAll(false);
    };

    const handleShowAll = () => {
        setShowAll(true);
    };

    const handleSearch = () => {
        if (clientID.trim() === '') {
            setSearchResult([]);
            fetchAccounts();
            return;
        }
        axios.post('http://localhost:8080/searchSavingsAccounts', { username: clientID })
            .then(res => {
                setSearchResult(res.data);
            })
            .catch(err => console.log(err));
    };

    const paginatedAccounts = showAll ? accounts : accounts.slice(0, recordsPerPage);
    const renderData = searchResult.length > 0 ? searchResult : paginatedAccounts;

    return (
        <div>
           <main className="d-flex min-vh-100 bg-light text-dark">
                <Sidebar />

                <div className="container-fluid mt-4 ">
                    <Nav />
                    <h2 className="text-center mt-4 text-secondary">Manage Savings Account</h2>
                    <div className="row">
                        <caption>List of Accounts</caption>
                        <div className="search-container">
                            <input type="text" value={clientID} onChange={(e) => setclientID(e.target.value)} placeholder="Search by Nr. personal" />
                            <button onClick={handleSearch}>Search</button>
                        </div>
                        <div className="col-md-12 d-flex justify-content-center align-items-center">

                        <table className="table table-hover border-table dataTable no-footer" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        {/* <th scope="col">AccountID</th> */}
                                        {/* <th scope="col">Client ID</th> */}
                                        <th scope="col">Nr. Personal</th>
                                        <th scope="col">Name Lastname</th>
                                        <th scope="col">SavingsType</th>
                                        <th scope="col">Currency</th>
                                        <th scope="col">Balance</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {Array.isArray(renderData) && renderData.map((account, index) => (
                                        <tr key={account.SavingsType}>
                                             {/* <th scope="row">{account.CurrentAccount}</th> */}
                                            {/* <td>{account.UserID}</td> */}
                                            <td>{account.username}</td>
                                            <td>{account.name + ' ' + account.lastname}</td>
                                            <td>{account.SavingsType}</td>
                                            <td>{account.CurrencyCode}</td>
                                            <td>{parseFloat(account.Balance).toFixed(2)}</td>
                                            <td>{account.AccountStatus}</td>

                                            <td>
                                                <button onClick={() => handleEdit(account.SavingsType)} className="btn btn-primary mr-2">Edit</button>
                                                <button onClick={() => handleDelete(account.SavingsType)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>Total accounts: {numAccounts}</div>
                    <div>
                        <button onClick={() => handleChangeRecordsPerPage(10)}>Show 10 records</button>
                        <button onClick={() => handleChangeRecordsPerPage(30)}>Show 30 records</button>
                        <button onClick={() => handleChangeRecordsPerPage(50)}>Show 50 records</button>
                        <button onClick={handleShowAll}>Show All</button>
                    </div>
                    {editAccount !== null && <EditSavings id={editAccount} onClose={handleCloseEditModal} />}

                </div>
            </main>
        </div>
    )
}

export default ManageSavingsAccount;
