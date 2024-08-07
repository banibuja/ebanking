import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import EditAccounts from './EditAccounts';
import VerifyLogin from '../VerifyLogin';
import Nav from '../Nav';

export const ManageAccounts = () => {
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
        axios.post('http://localhost:8080/getAllAccounts')
            .then(res => {
                const fetchedAccounts = res.data;
                setAccounts(fetchedAccounts);
                setNumAccounts(fetchedAccounts.length);
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/deleteAccounts/${id}`)
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
        axios.post('http://localhost:8080/searchAccounts', { username: clientID })
            .then(res => {
                setSearchResult(res.data);
            })
            .catch(err => console.log(err));
    };

    
    function formatBalance(balance) {
        const floatBalance = parseFloat(balance);
        const integerPart = Math.floor(floatBalance).toLocaleString();
        const fractionalPart = floatBalance % 1 !== 0 ? floatBalance.toFixed(2).split('.')[1] : '';
        return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
    }

    const paginatedAccounts = showAll ? accounts : accounts.slice(0, recordsPerPage);
    const renderData = searchResult.length > 0 ? searchResult : paginatedAccounts;

    return (
        <div>
          <main className="d-flex min-vh-100 bg-light text-dark">
                <Sidebar />

                <div className="container-fluid mt-4 ">
                    <Nav  />
                    <h2 className="text-center mt-4 text-secondary">Manage Current Account</h2>
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
                                        <th scope="col">CurrentAccount</th>
                                        <th scope="col">Currency</th>
                                        <th scope="col">Balance</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {Array.isArray(renderData) && renderData.map((account, index) => (
                                        <tr key={account.CurrentAccount}>
                                             {/* <th scope="row">{account.CurrentAccount}</th> */}
                                            {/* <td>{account.UserID}</td> */}
                                            <td>{account.username}</td>
                                            <td>{account.name + '  ' + account.lastname}</td>
                                            <td>{account.CurrentAccount}</td>
                                            <td>{account.CurrencyCode}</td>
                                            <td>{formatBalance(account.Balance)}</td>
                                            <td>{account.AccountStatus}</td>

                                            <td>
                                                <button onClick={() => handleEdit(account.CurrentAccount)} className="btn btn-primary mr-2">Edit</button>
                                                <button onClick={() => handleDelete(account.CurrentAccount)} className="btn btn-danger">Delete</button>
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
                    {editAccount !== null && <EditAccounts id={editAccount} onClose={handleCloseEditModal} />}

                </div>
            </main>
        </div>
    )
}

export default ManageAccounts;
