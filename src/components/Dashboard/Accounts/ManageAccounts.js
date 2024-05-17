import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import EditAccounts from './EditAccounts';

export const ManageAccounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [numAccounts, setNumAccounts] = useState(0); 
    const [editAccount, setEditAccountId] = useState(null); 


    useEffect(() => {
        fetchAccounts();
    }, []);

    const navigate = useNavigate();

    const fetchAccounts = () => {
        axios.post('http://localhost:8080/getAccounts')
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


    return (
        <div> 
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white', color: 'black' }}>
                <Sidebar />

                <div className="container-fluid" style={{ marginTop: '100px' }}>
                    <h1 className="text-center">MANAGE Current Accounts</h1>
                    <div className="row">
                        <caption>List of Accounts</caption>
                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                            <table className="table table-hover table-bordered table-striped dataTable no-footer" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">AccountID</th>
                                        <th scope="col">UserId</th>
                                        <th scope="col">CurrentAccount</th>
                                        <th scope="col">Currency</th>
                                        <th scope="col">Balance</th> 
                                        <th scope="col">Action</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {accounts.map((account, index) => (
                                        <tr key={account.AccountID}>
                                            <th scope="row">{account.AccountID}</th> 
                                            <td>{account.UserID}</td>
                                            <td>{account.CurrentAccount}</td>
                                            <td>{account.CurrencyCode}</td>
                                            <td>{parseFloat(account.Balance).toFixed(2)}</td> 
                                            <td>
                                            <button onClick={() => handleEdit(account.AccountID)} className="btn btn-primary mr-2">Edit</button>
                                                <button onClick={() => handleDelete(account.AccountID)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>Total accounts: {numAccounts}</div> 
                    {editAccount !== null && <EditAccounts id={editAccount} onClose={handleCloseEditModal} />}

                </div>
            </main>
        </div>
    )
}

export default ManageAccounts;
