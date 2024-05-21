import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import NewTransaction from './NewTransaction';

export const Transactions = () => {
    const [transactions, setTransactions] = useState([]);

       useEffect(() => {
        fetchTransactions();
    }, []);

    const navigate = useNavigate();

    const fetchTransactions = () => {
        axios.post('http://localhost:8080/getAllTransactions')
            .then(res => {
                // const fetchedTransactions = res.data;
                // setTransactions(fetchedTransactions);
                // setNumTransactions(fetchedTransactions.length);
            })
            .catch(err => console.log(err));
    };


    // const handleChangeRecordsPerPage = (value) => {
    //     setRecordsPerPage(value);
    //     setShowAll(false);
    // };

    // const handleShowAll = () => {
    //     setShowAll(true);
    // };

    // const handleSearch = () => {
    //     if (clientID.trim() === '') {
    //         setSearchResult([]);
    //         fetchTransactions();
    //         return;
    //     }
    //     axios.post('http://localhost:8080/searchTransactions', { username: clientID })
    //         .then(res => {
    //             setSearchResult(res.data);
    //         })
    //         .catch(err => console.log(err));
    // };

    // const paginatedTransactions = showAll ? transactions : transactions.slice(0, recordsPerPage);
    // const renderData = searchResult.length > 0 ? searchResult : paginatedTransactions;

    return (
        <div>
            {/* <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white', color: 'black' }}>
                <Sidebar />

                <div className="container-fluid" style={{ marginTop: '100px' }}>
                    <h1 className="text-center">MANAGE Transactions</h1>
                    <div className="row">
                        <caption>List of Transactions</caption>
                        <div className="search-container">
                            <input type="text" value={clientID} onChange={(e) => setClientID(e.target.value)} placeholder="Search by username" />
                            <button onClick={handleSearch}>Search</button>
                        </div>
                        <div className="col-md-12 d-flex justify-content-center align-items-center">

                            <table className="table table-hover table-bordered table-striped dataTable no-footer" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">Transaction ID</th>
                                        <th scope="col">Sender Account ID</th>
                                        <th scope="col">Receiver Account ID</th>
                                        <th scope="col">Transaction Type</th>
                                        <th scope="col">Transaction Amount</th>
                                        <th scope="col">Currency</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Additional Info</th>
                                        <th scope="col">Transaction Fee</th>
                                        <th scope="col">Created At</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(renderData) && renderData.map((transaction, index) => (
                                        <tr key={transaction.TransactionID}>
                                            <td>{transaction.TransactionID}</td>
                                            <td>{transaction.SenderAccID}</td>
                                            <td>{transaction.ReceiverAccID}</td>
                                            <td>{transaction.TransactionType}</td>
                                            <td>{transaction.TransactionAmount}</td>
                                            <td>{transaction.Currency}</td>
                                            <td>{transaction.Statusi}</td>
                                            <td>{transaction.AdditionalInfo}</td>
                                            <td>{transaction.TransactionFee}</td>
                                            <td>{transaction.CreatedAt}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>Total transactions: {numTransactions}</div>
                    <div>
                        <button onClick={() => handleChangeRecordsPerPage(10)}>Show 10 records</button>
                        <button onClick={() => handleChangeRecordsPerPage(30)}>Show 30 records</button>
                        <button onClick={() => handleChangeRecordsPerPage(50)}>Show 50 records</button>
                        <button onClick={handleShowAll}>Show All</button>
                    </div>
                </div>
            </main> */}
        </div>
    );
}

export default Transactions;
