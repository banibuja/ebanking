import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import EditSavings from './EditSavings';

export const ManageSavingsAccounts = () => {
    const [savingsAccounts, setSavingsAccounts] = useState([]);
    const [numSavingsAccounts, setNumSavingsAccounts] = useState(0);
    const [editSavings, setEditSavingsId] = useState(null);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [showAll, setShowAll] = useState(false);
    const [searchClientID, setSearchClientID] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        fetchSavingsAccounts();
    }, []);

    const navigate = useNavigate();

    const fetchSavingsAccounts = () => {
        axios.post('http://localhost:8080/getAllSavingAccount')
            .then(res => {
                const fetchedSavingsAccounts = res.data;
                setSavingsAccounts(fetchedSavingsAccounts);
                setNumSavingsAccounts(fetchedSavingsAccounts.length);
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/deleteSavings/${id}`)
            .then(res => {
                fetchSavingsAccounts();
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (id) => {
        setEditSavingsId(id);
    };

    const handleCloseEditModal = () => {
        setEditSavingsId(null);
    };

    const handleChangeRecordsPerPage = (value) => {
        setRecordsPerPage(value);
        setShowAll(false);
    };

    const handleShowAll = () => {
        setShowAll(true);
    };

    const handleSearch = () => {
        if (searchClientID.trim() === '') {
            setSearchResult([]);
            fetchSavingsAccounts();
            return;
        }
        axios.post('http://localhost:8080/searchSavingsAccounts', { UserID: searchClientID })
            .then(res => {
                setSearchResult(res.data);
            })
            .catch(err => console.log(err));
    };

    const paginatedSavingsAccounts = showAll ? savingsAccounts : savingsAccounts.slice(0, recordsPerPage);
    const renderData = searchResult.length > 0 ? searchResult : paginatedSavingsAccounts;

    return (
        <div>
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white', color: 'black' }}>
                <Sidebar />

                <div className="container-fluid" style={{ marginTop: '100px' }}>
                    <h1 className="text-center">MANAGE Savings Accounts</h1>
                    <div className="row">
                        <caption>List of Savings Accounts</caption>
                        <div className="search-container">
                            <input type="text" value={searchClientID} onChange={(e) => setSearchClientID(e.target.value)} placeholder="Search by Client ID" />
                            <button onClick={handleSearch}>Search</button>
                        </div>
                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                            <table className="table table-hover table-bordered table-striped dataTable no-footer" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">SavingsID</th>
                                        <th scope="col">Client ID</th>
                                        <th scope="col">Savings Type</th>
                                        <th scope="col">Currency</th>
                                        <th scope="col">Balance</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderData.map((savingsAccount, index) => (
                                        <tr key={savingsAccount.SavingsID}>
                                            <th scope="row">{savingsAccount.SavingsID}</th>
                                            <td>{savingsAccount.UserID}</td>
                                            <td>{savingsAccount.SavingsType}</td>
                                            <td>{savingsAccount.CurrencyCode}</td>
                                            <td>{parseFloat(savingsAccount.Balance).toFixed(2)}</td>
                                            <td>
                                                <button onClick={() => handleEdit(savingsAccount.SavingsID)} className="btn btn-primary mr-2">Edit</button>
                                                <button onClick={() => handleDelete(savingsAccount.SavingsID)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>Total savings accounts: {numSavingsAccounts}</div>
                    <div>
                        <button onClick={() => handleChangeRecordsPerPage(10)}>Show 10 records</button>
                        <button onClick={() => handleChangeRecordsPerPage(30)}>Show 30 records</button>
                        <button onClick={() => handleChangeRecordsPerPage(50)}>Show 50 records</button>
                        <button onClick={handleShowAll}>Show All</button>
                    </div>
                    {editSavings !== null && <EditSavings id={editSavings} onClose={handleCloseEditModal} />}

                </div>
            </main>
        </div>
    );
};

export default ManageSavingsAccounts;
