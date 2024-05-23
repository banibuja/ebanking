import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../LoginSignup/SignupValidation';
import axios from 'axios';
import Navbar from '../Layout/Navbar';

function AplikimiOnline() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        name: '',
        lastname: '',
        email: '',
        password: '',
        package: '',
        gender: '',
        birthday: '',
        currency: '',
        Country: '',
        City: '',
        Street: '',
        emailExists: false,
        usernameExists: false
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 10000);

            return () => clearTimeout(timer); 
        }
    }, [successMessage, navigate]);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.get(`http://localhost:8080/checkemail?email=${values.email}`)
            .then(response => {
                if (response.data.exists) {
                    setValues(prev => ({ ...prev, emailExists: true }));
                } else {
                    setValues(prev => ({ ...prev, emailExists: false }));
                    axios.get(`http://localhost:8080/checkUsername?username=${values.username}`)
                        .then(response => {
                            if (response.data.exists) {
                                setValues(prev => ({ ...prev, usernameExists: true }));
                            } else {
                                setValues(prev => ({ ...prev, usernameExists: false }));
                                if (Object.keys(errors).length === 0) {
                                    axios.post('http://localhost:8080/addApply', values)
                                        .then(res => {
                                            setSuccessMessage('You have successfully applied, we will notify you in your email when your data is accepted.');
                                            sendEmail(values.email, values.username, values.password);
                                        })
                                        .catch(err => console.log(err));
                                }
                            }
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    };

    const sendEmail = (email, username, password) => {
        axios.post('http://localhost:8080/sendEmail', { email, username, password })
            .then(res => {
                console.log('Email sent successfully');
            })
            .catch(err => console.log('Error sending email', err));
    };

    return (
        <div>
            <Navbar />
            <div className="content-wrapper" style={{ marginRight: '100px' }}>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="container-fluid h-custom">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                        <h3 className="card-title">Fill All Fields</h3>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6 form-group">
                                                    <label htmlFor="username">Nr. Personal</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Write your Nr. Personal ID"
                                                        name="username"
                                                        onChange={handleInput}
                                                        className="form-control form-control-lg"
                                                        required
                                                    />
                                                    {errors.username && <span className="text-danger">{errors.username}</span>}
                                                    {values.username && (
                                                        <span style={{ marginLeft: '10px' }}>
                                                            {values.usernameExists ? (
                                                                <span style={{ color: 'red' }}>This username is already taken.</span>
                                                            ) : (
                                                                <span style={{ color: 'green' }}>Username is available.</span>
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label htmlFor="name">Client Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Name"
                                                        name="name"
                                                        onChange={handleInput}
                                                        className="form-control form-control-lg"
                                                    />
                                                    {errors.name && <span className="text-danger">{errors.name}</span>}
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label htmlFor="lastname">Client Lastname</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Lastname"
                                                        name="lastname"
                                                        onChange={handleInput}
                                                        className="form-control form-control-lg"
                                                    />
                                                    {errors.lastname && <span className="text-danger">{errors.lastname}</span>}
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label htmlFor="email">Client Email</label>
                                                    <input
                                                        type="email"
                                                        placeholder="Email"
                                                        name="email"
                                                        onChange={handleInput}
                                                        className="form-control form-control-lg"
                                                    />
                                                    {errors.email && <span className="text-danger">{errors.email}</span>}
                                                    {values.email && (
                                                        <span style={{ marginLeft: '10px' }}>
                                                            {values.emailExists ? (
                                                                <span style={{ color: 'red' }}>This email is already in use.</span>
                                                            ) : (
                                                                <span style={{ color: 'green' }}>Email is available.</span>
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label htmlFor="gender">Client Gender</label>
                                                    <select
                                                        name="gender"
                                                        onChange={handleInput}
                                                        value={values.gender}
                                                        className="form-control form-control-lg"
                                                    >
                                                        <option value="">Select Gender</option>
                                                        <option value="M">Male</option>
                                                        <option value="F">Female</option>
                                                    </select>
                                                    {errors.gender && <span className="text-danger">{errors.gender}</span>}
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label htmlFor="birthday">Client Birthday</label>
                                                    <input
                                                        type="date"
                                                        name="birthday"
                                                        className="form-control form-control-lg"
                                                        placeholder="Birthdate"
                                                        onChange={handleInput}
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label>Select Package</label>
                                                    <select
                                                        name="package"
                                                        onChange={handleInput}
                                                        className="form-control form-control-lg"
                                                    >
                                                        <option value="">Select Package</option>
                                                        <option value="StudentPackage">Student Package</option>
                                                        <option value="Advanced">Advanced Package</option>
                                                        <option value="Premium">Premium</option>
                                                        <option value="Basic">Basic</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label htmlFor="Country">Client Address</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Country"
                                                        name="Country"
                                                        onChange={handleInput}
                                                        className="form-control roundend-0"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="City"
                                                        name="City"
                                                        onChange={handleInput}
                                                        className="form-control roundend-0"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Street"
                                                        name="Street"
                                                        onChange={handleInput}
                                                        className="form-control roundend-0"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <center>
                                            <div className="card-footer">
                                                <button type="submit" className="btn btn-success">Apply</button>
                                            </div>
                                        </center>
                                    </form>
                                    {successMessage && (
                                        <div className="alert alert-success mt-4">
                                            {successMessage}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AplikimiOnline;
