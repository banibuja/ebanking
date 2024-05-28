import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import axios from 'axios';
import Nav from '../Nav';

function SaveTransaction() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        Info: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
    }, []);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/insertInfoSection', values);
            if (response.data === 'success') {
                navigate('/InvestmentsTable'); 
            } else {
                console.error('Failed to add goal');
            }
        } catch (error) {
            console.error('Failed to add goal:', error);
        }
    };

    return (
        <div>
            <main className="d-flex min-vh-100 bg-light text-dark">
                <Sidebar />
                <div className="container-fluid mt-4">
                    <Nav />
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-purple">
                                <div className="card-header">
                                    <h3 className="card-title">Add info section on Home-Page</h3>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="CurrentAccount">Information Section</label>
                                            <input type="text" name='Info' className='form-control rounded-0' onChange={handleInput} value={values.Info}/>
                                        </div>
                                    </div>
                                    <center>
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-success">Add InfoSection</button>
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

export default SaveTransaction;
