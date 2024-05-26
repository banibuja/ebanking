import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../Dashboard/Sidebar';

function ApplyLoans() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        AccountNumber: '',
        LoanAmount: '',
        LoanConditions: '',
        Status: ''
    });

    const [accountNumber, setAccountNumber] = useState('');

    useEffect(() => {
        const fetchAccountNumber = async () => {
            try {
                const response = await axios.get('http://localhost:8080/getAccountNumber'); 
                if (response.data.accountNumber) {
                    setAccountNumber(response.data.accountNumber);
                    setValues(prevValues => ({ ...prevValues, AccountNumber: response.data.accountNumber }));
                }
            } catch (error) {
                console.error('Error fetching account number:', error);
            }
        };

        fetchAccountNumber();
    }, []);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/addLoan', values);
            if (response.data.message === 'Loan added successfully') {
                navigate('/loans');
            } else {
                console.error('Failed to add loan');
            }
        } catch (error) {
            console.error('Failed to add loan:', error);
        }
    };

    return (
        <div>
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white', color: 'black' }}>
                <Sidebar />
                
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card card-purple">
                                        <div className="card-header">
                                            <h3 className="card-title">Fill All Fields</h3>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col-md-6 form-group">
                                                            <label htmlFor="AccountNumber">AccountNumber</label>
                                                            <input 
                                                                type="text" 
                                                                placeholder='AccountNumber' 
                                                                name='AccountNumber' 
                                                                value={accountNumber}
                                                                className='form-control roundend-0' 
                                                                disabled 
                                                                required 
                                                            />
                                                        </div>
                                                        <div className="col-md-6 form-group">
                                                            <label htmlFor="LoanAmount">LoanAmount</label>
                                                            <input 
                                                                type="number" 
                                                                placeholder='LoanAmount' 
                                                                name='LoanAmount' 
                                                                onChange={handleInput} 
                                                                className='form-control roundend-0' 
                                                                required 
                                                            />
                                                        </div>
                                                        <div className="col-md-6 form-group">
                                                            <label htmlFor="LoanConditions">LoanConditions</label>
                                                            <input 
                                                                type="text" 
                                                                placeholder='LoanConditions' 
                                                                name='LoanConditions' 
                                                                onChange={handleInput} 
                                                                className='form-control roundend-0' 
                                                                required 
                                                            />
                                                        </div>
                                                        <div className="col-md-6 form-group">
                                                            <label htmlFor="Status">Status</label>
                                                            <input 
                                                                type="text" 
                                                                placeholder='Status' 
                                                                name='Status' 
                                                                onChange={handleInput} 
                                                                className='form-control roundend-0' 
                                                                required 
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <center>
                                                <div className="card-footer">
                                                    <button type="submit" className="btn btn-success">Apply For Loans</button>
                                                </div>
                                            </center>
                                        </form>
                                    </div>
                                </div>
                            </div>
                      
                </div>
            </main>
        </div>
    );
}

export default ApplyLoans;
