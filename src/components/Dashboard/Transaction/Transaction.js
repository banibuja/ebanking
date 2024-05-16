import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import axios from 'axios';

function Transaction() {

    const [values, setValues] = useState({
        CurrentAccount: ''
    });

    useEffect(() => {
        axios.post('http://localhost:8080/getCurrentAcc')
            .then(res => {
                console.log('Edit Cards API', res.data);
                if (res.data !== "fail") {
                    setValues(res.data[0]); 
                } else {
                    console.error('Failed to fetch current account');
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
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
                                        <form>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="CurrentAccount">Contributor Account</label>
                                                        <input type="text" name='CurrentAccount' className='form-control roundend-0' value={values.CurrentAccount} disabled />
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="ClientName">Client Name</label>
                                                        {/* Additional input fields for client information */}
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="lastname">Client Lastname</label>
                                                        <input type="text" placeholder='Lastname' name='lastname' className='form-control roundend-0' onChange={handleInput} />
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="email">Client Email</label>
                                                        <input type="email" placeholder='Email' name='email' className='form-control roundend-0' onChange={handleInput} />
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="password">Client Password</label>
                                                        <input type="password" placeholder='Password' name='password' className='form-control roundend-0' onChange={handleInput} />
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="gender">Client Gender</label>
                                                        <select name="gender" className="form-control rounded-0" onChange={handleInput}>
                                                            <option value="">Select Gender</option>
                                                            <option value="M">Male</option>
                                                            <option value="F">Female</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <input type="date" name='birthday' className="form-control form-control-lg" placeholder="Birthdate" onChange={handleInput} />
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="Country">Client Address</label>
                                                        <input type="text" placeholder='Country' name='Country' className='form-control roundend-0' onChange={handleInput} />
                                                        <input type="text" placeholder='City' name='City' className='form-control roundend-0' onChange={handleInput} />
                                                        <input type="text" placeholder='Street' name='Street' className='form-control roundend-0' onChange={handleInput} />
                                                    </div>
                                                </div>
                                            </div>
                                            <center>
                                                <div className="card-footer">
                                                    <button type="submit" className="btn btn-success">Add Client</button>
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
