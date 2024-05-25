import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import axios from 'axios';

function SaveTransaction() {
    const navigate = useNavigate();

    const [currentAccount, setCurrentAccount] = useState();
    const [savingsAccounts, setSavingsAccounts] = useState([]);
    const [values, setValues] = useState({
        TransactionAmount: 0,
        ReceiverAccID: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchCurrentAccount();
        fetchSavingsAccounts();
    }, []);

    const fetchCurrentAccount = async () => {
        try {
            const res = await axios.post('http://localhost:8080/getCurrentAcc');
            setCurrentAccount(res.data[0].CurrentAccount);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchSavingsAccounts = async () => {
        try {
            const res = await axios.post('http://localhost:8080/getAllFlexSave');
            setSavingsAccounts(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({});

        if (Object.keys(errors).length === 0) {
            try {
                const res = await axios.post('http://localhost:8080/insertSaveTransaction', {
                    SenderAccID: currentAccount,
                    ...values
                });
                console.log(res);
                navigate('/Dashboard');
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div>
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white', color: 'black' }}>
                <Sidebar />
                <div className="content-wrapper" style={{ marginRight: '100px' }}>
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card card-purple">
                                        <div className="card-header">
                                            <h3 className="card-title">Save Money Transfer</h3>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="CurrentAccount">Contributor Account</label>
                                                    <input type="number" name='CurrentAccount' className='form-control rounded-0' value={currentAccount} disabled />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="ReceiverAccID">Receiver Savings Account</label>
                                                    <select name='ReceiverAccID' className='form-control rounded-0' onChange={handleInput} value={values.ReceiverAccID}>
                                                        <option value=''>Select Savings Account</option>
                                                        {savingsAccounts.map(account => (
                                                            <option key={account.SavingsType} value={account.SavingsType}>
                                                                {account.SavingsType}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.ReceiverAccID && <span className='text-danger'>{errors.ReceiverAccID}</span>}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="TransactionAmount">Amount</label>
                                                    <input type="text" placeholder='Amount' name='TransactionAmount' className='form-control rounded-0' onChange={handleInput} value={values.TransactionAmount} />
                                                    {errors.TransactionAmount && <span className='text-danger'>{errors.TransactionAmount}</span>}
                                                </div>
                                            </div>
                                            <center>
                                                <div className="card-footer">
                                                    <button type="submit" className="btn btn-success">Transfer</button>
                                                </div>
                                            </center>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default SaveTransaction;

