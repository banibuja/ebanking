import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import NewTransaction from './NewTransaction';
import Nav from '../Nav';

export const SaveHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [numTransactions, setNumTransactions] = useState(0);

       useEffect(() => {
        fetchTransactions();
    }, []);

    const navigate = useNavigate();

    const fetchTransactions = () => {
        axios.post('http://localhost:8080/getAllHistory')
            .then(res => {
                const fetchedTransactions = res.data;
                setTransactions(fetchedTransactions);
                setNumTransactions(fetchedTransactions.length);
            })
            .catch(err => console.log(err));
    };




    return (
        <div>
            <main className="d-flex min-vh-100 bg-light text-dark">
                <Sidebar />

                <div className="container-fluid mt-4 ">
                    < Nav />
                <h2 className="text-center mt-4 text-secondary">Manage SaveTransactions</h2>
                    <div className="row">
                        <caption>List of Transactions</caption>
                        <div className="search-container">
              
                        </div>
                        <div className="col-md-12 d-flex justify-content-center align-items-center">

                            <table className="table table-hover table-bordered table-striped dataTable no-footer" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        {/* <th scope="col">Sender Account ID</th> */}
                                        <th scope="col">CurrentAccount</th>
                                        <th scope="col">FlexSaveAccountID</th>
                                        <th scope="col">Transaction Amount</th>
                                        <th scope="col">Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(transactions) && transactions.map((transaction, index) => (
                                        <tr key={index}>
                                            {/* <td>{transaction.SavingsHistoryID}</td> */}
                                            <td>{transaction.CurrentAccountID}</td>
                                            <td>{transaction.FlexSaveAccountID}</td>
                                            <td>{transaction.TransactionAmount}</td>
                                            <td>{transaction.CreatedAt}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>Total transactions: {numTransactions}</div>
                    {/*<div>
                        <button onClick={() => handleChangeRecordsPerPage(10)}>Show 10 records</button>
                        <button onClick={() => handleChangeRecordsPerPage(30)}>Show 30 records</button>
                        <button onClick={() => handleChangeRecordsPerPage(50)}>Show 50 records</button>
                        <button onClick={handleShowAll}>Show All</button> */}
                    {/* </div> */}
                </div>
            </main> 
        </div>
    );
}

export default SaveHistory;
