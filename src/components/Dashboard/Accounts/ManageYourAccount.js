import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';

export const ManageYourAccount = () => {
    const [userId, setUserId] = useState('');
    const [mess, setMess] = useState([]);
    const [numMess, setNumMess] = useState(0); 
    const [savings, setSavings] = useState([]);
    const [numSavings, setNumSavings] = useState(0); 

    useEffect(() => {
        getMess();
        axios.get('http://localhost:8080')
        .then(res => {
          if (res.data.valid) {
            setUserId(res.data.uId); 
          } else {
            navigate('/login');
          }
        })
        .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        getSavings();
    }, []);

    const navigate = useNavigate();

    const getMess = () => {
        axios.post(`http://localhost:8080/getAccountBySession`)
            .then(res => {
                const fetchedMess = res.data;
                console.log(fetchedMess);
                setMess(fetchedMess);
                setNumMess(fetchedMess.length); 
            })
            .catch(err => console.log(err));
    };

    const getSavings = () => {
        axios.post(`http://localhost:8080/getSavingsBySesison`)
            .then(res => {
                const fetchedSavings = res.data;
                console.log(fetchedSavings);
                setSavings(fetchedSavings);
                setNumSavings(fetchedSavings.length); 
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/deleteAccounts/${id}`)
            .then(res => {
                getMess();
            })
            .catch(err => console.log(err));
    };
    const handleDeletee = (id) => {
        axios.delete(`http://localhost:8080/deleteSavings/${id}`)
            .then(res => {
                getSavings();
            })
            .catch(err => console.log(err));
    };
    

    return (
        <div> 
            <main style={{ display: 'flex', minHeight: '10vh', backgroundColor: 'white', color: 'black' }}>
                <Sidebar />

                <div className="container-fluid" style={{ marginTop: '100px' }}>
                {/* <h1 className="text-center">MANAGE Accounts</h1> */}
                    <h1 className=''>Current Accounts</h1>
                    <div className="row">
                        <caption>List of Messages</caption>
                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                            <table className="table table-hover table-bordered table-striped dataTable no-footer" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        {/* <th scope="col">AccountID</th> */}
                                        {/* <th scope="col">Your ID</th> */}
                                        <th scope="col">CurrentAccount</th>
                                        <th scope="col">Currency</th>
                                        <th scope="col">Balance</th> 
                                        {/* <th scope="col">Action</th>  */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(mess) && mess.map((item, index) => (
                                        <tr key={item.AccountID}>
                                            {/* <th scope="row">{item.AccountID}</th>  */}
                                            {/* <td>{item.UserID}</td> */}
                                            <td>{item.CurrentAccount}</td>
                                            <td>{item.CurrencyCode}</td>
                                            <td>{parseFloat(item.Balance).toFixed(2)}</td> 
                                            <td>
                                                {/* <button onClick={() => handleDelete(item.AccountID)} className="btn btn-danger">Delete</button> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>Total message: {numMess}</div> 
                    <div className="container-fluid" style={{ marginTop: '10px' }}>
                        <h1 className=''>Savings Account</h1>
                        <div className="row">
                            <caption>List of Messages</caption>
                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                <table className="table table-hover table-bordered table-striped dataTable no-footer" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            {/* <th scope="col">AccountID</th> */}
                                            <th scope="col">Your ID</th>
                                            <th scope="col">FlexSaveAccount</th>
                                            <th scope="col">Currency</th>
                                            <th scope="col">Balance</th> 
                                            {/* <th scope="col">Action</th>  */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(savings) && savings.map((item, index) => (
                                            <tr key={item.SavingsID}>
                                                {/* <th scope="row">{item.SavingsID}</th>  */}
                                                <td>{item.UserID}</td>
                                                <td>{item.SavingsType}</td>
                                                <td>{item.CurrencyCode}</td>
                                                <td>{parseFloat(item.Balance).toFixed(2)}</td> 
                                                <td>
                                                    {/* <button onClick={() => handleDeletee(item.SavingsID)} className="btn btn-danger">Delete</button> */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>Total message: {numSavings}</div> 
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ManageYourAccount;
