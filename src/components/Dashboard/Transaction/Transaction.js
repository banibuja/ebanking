import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import axios from 'axios';

function Transaction() {
    const navigate = useNavigate();

    const [currentAccount, setCurrentAccount] = useState();
    const [values, setValues] = useState({
        ReceiverAccID: '',
        TransactionType: '',
        TransactionAmount: '',
        Currency: '',
        AdditionalInfo: ''
    });
    useEffect(() => {
        CurrentAccount();
    }, []);

    const [errors, setErrors] = useState({});

    const CurrentAccount = async () => {
        await axios.post('http://localhost:8080/getCurrentAcc')
            .then(res => { setCurrentAccount(res.data[0].CurrentAccount) })
            .catch(err => console.log(err));
    }

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        setErrors({});

        if (Object.keys(errors).length === 0) {
            axios.post(`http://localhost:8080/insertTransaction`, { SenderAccID: currentAccount, ...values })
                .then(res => {
                    console.log(res);
                    // navigate('/Transaction');
                })
                .catch(err => console.log(err));
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
                                            <h3 className="card-title">Interbank Money Transfer</h3>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label htmlFor="CurrentAccount">Contributor Account</label>
                                                    <input type="text" name='CurrentAccount' className='form-control roundend-0' value={currentAccount} disabled />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="ClientName">Beneficiary account</label>
                                                    <input type="numbers" placeholder='Beneficiary Account' name='ReceiverAccID' className='form-control roundend-0' onChange={handleInput} value={values.ReceiverAccID} />
                                                    {errors.ReceiverAccID && <span className='text-danger'>{errors.ReceiverAccID}</span>}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="details">Details</label>
                                                    <input type="text" placeholder='Details' name='AdditionalInfo' className='form-control roundend-0' onChange={handleInput} value={values.AdditionalInfo} />
                                                    {errors.AdditionalInfo && <span className='text-danger'>{errors.AdditionalInfo}</span>}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="vlera">Amount</label>
                                                    <input type="text" placeholder='Vlera' name='TransactionAmount' className='form-control roundend-0' onChange={handleInput} value={values.TransactionAmount} />
                                                    {errors.TransactionAmount && <span className='text-danger'>{errors.TransactionAmount}</span>}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="currency">Currency</label>
                                                    <select name="Currency" className="form-control roundend-0" onChange={handleInput}>
                                                        <option value="Euro">Euro</option>
                                                        <option value="Dollar">Dollar</option>
                                                        <option value="Frang">Frang</option>
                                                    </select>
                                                    {errors.Currency && <span className='text-danger'>{errors.Currency}</span>}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="transferType">Transfer type</label>
                                                    <input type="text" placeholder='Transfer Type' name='TransactionType' className='form-control roundend-0' onChange={handleInput} value={values.TransactionType} />
                                                    {errors.TransactionType && <span className='text-danger'>{errors.TransactionType}</span>}
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

export default Transaction;
