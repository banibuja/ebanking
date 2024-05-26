import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Layout/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import eLogo from '../../imgs/e-bankinglogo.png';


function AplikimiOnline() {
    const navigate = useNavigate();
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [idPhotos, setIdPhotos] = useState({frontPhoto:'', backPhoto:''});


    const handlefront = (e) => {
        const image = e.target.files[0];
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setIdPhotos(prev => ({ ...prev, frontPhoto: reader.result }));
            }
            reader.readAsDataURL(image);
        }
    }
    
    const handleback = (e) => {
        const image = e.target.files[0];
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setIdPhotos(prev => ({ ...prev, backPhoto: reader.result }));
            }
            reader.readAsDataURL(image);
        }
    }

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 400);

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
                                    
                                    axios.post('http://localhost:8080/addApply', {...values, frontPhoto:idPhotos.frontPhoto, backPhoto: idPhotos.backPhoto}, 
                                        
                                    )
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
            <div className="content-wrapper" >
                <section className="content" style={{ marginRight: '400px' }}>

                    <div className="container-fluid" >

                        <div className="row">

                            <div className="container-fluid h-custom">

                                <div className="row d-flex justify-content-center align-items-center h-100">
                                {/* <img src={eLogo} className="eLogo-img" alt="eLogo"  /> */}

                                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                        <h3 className="card-title text-center">Fill All Fields</h3>
                                        <form onSubmit={handleSubmit} className="mt-4">
                                            <div className="form-outline mb-4">
                                                <label htmlFor="username" className="form-label">Nr. Personal</label>
                                                <input
                                                    type="text"
                                                    id="username"
                                                    name="username"
                                                    placeholder="Write your Nr. Personal ID"
                                                    onChange={handleInput}
                                                    className="form-control form-control-lg"
                                                    required
                                                />
                                                {errors.username && <span className="text-danger">{errors.username}</span>}
                                                {values.username && (
                                                    <div className="mt-2">
                                                        {values.usernameExists ? (
                                                            <span className="text-danger">This username is already taken.</span>
                                                        ) : (
                                                            <span className="text-success">Username is available.</span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label htmlFor="name" className="form-label"> Name</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Name"
                                                    onChange={handleInput}
                                                    className="form-control form-control-lg"
                                                />
                                                {errors.name && <span className="text-danger">{errors.name}</span>}
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label htmlFor="lastname" className="form-label">Lastname</label>
                                                <input
                                                    type="text"
                                                    id="lastname"
                                                    name="lastname"
                                                    placeholder="Lastname"
                                                    onChange={handleInput}
                                                    className="form-control form-control-lg"
                                                />
                                                {errors.lastname && <span className="text-danger">{errors.lastname}</span>}
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label htmlFor="email" className="form-label">Email</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    onChange={handleInput}
                                                    className="form-control form-control-lg"
                                                />
                                                {errors.email && <span className="text-danger">{errors.email}</span>}
                                                {values.email && (
                                                    <div className="mt-2">
                                                        {values.emailExists ? (
                                                            <span className="text-danger">This email is already in use.</span>
                                                        ) : (
                                                            <span className="text-success">Email is available.</span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label htmlFor="gender" className="form-label">Gender</label>
                                                <select
                                                    id="gender"
                                                    name="gender"
                                                    onChange={handleInput}
                                                    value={values.gender}
                                                    className="form-select form-select-lg"
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="M">Male</option>
                                                    <option value="F">Female</option>
                                                </select>
                                                {errors.gender && <span className="text-danger">{errors.gender}</span>}
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label htmlFor="birthday" className="form-label">Birthday</label>
                                                <input
                                                    type="date"
                                                    id="birthday"
                                                    name="birthday"
                                                    className="form-control form-control-lg"
                                                    onChange={handleInput}
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label htmlFor="package" className="form-label">Select Package</label>
                                                <select
                                                    id="package"
                                                    name="package"
                                                    onChange={handleInput}
                                                    className="form-select form-select-lg"
                                                >
                                                    <option value="">Select Package</option>
                                                    <option value="StudentPackage">Student Package</option>
                                                    <option value="Advanced">Advanced Package</option>
                                                    <option value="Premium">Premium</option>
                                                    <option value="Basic">Basic</option>
                                                </select>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label htmlFor="frontPhoto" className="form-label">Front ID photo</label>
                                                <input
                                                    type="file"
                                                    id="frontPhoto"
                                                    className="form-control form-control-lg"
                                                    onChange={handlefront}
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label htmlFor="backPhoto" className="form-label">Back ID photo</label>
                                                <input
                                                    type="file"
                                                    id="backPhoto"
                                                    className="form-control form-control-lg"
                                                    onChange={handleback}
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label htmlFor="Country" className="form-label">Address</label>
                                                <input
                                                    type="text"
                                                    id="Country"
                                                    name="Country"
                                                    placeholder="Country"
                                                    onChange={handleInput}
                                                    className="form-control form-control-lg mb-2"
                                                />
                                                <input
                                                    type="text"
                                                    id="City"
                                                    name="City"
                                                    placeholder="City"
                                                    onChange={handleInput}
                                                    className="form-control form-control-lg mb-2"
                                                />
                                                <input
                                                    type="text"
                                                    id="Street"
                                                    name="Street"
                                                    placeholder="Street"
                                                    onChange={handleInput}
                                                    className="form-control form-control-lg"
                                                />
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <button type="submit" className="btn btn-success btn-lg">Apply</button>
                                            </div>
                                            {successMessage && (
                                                <div className="alert alert-success mt-4">
                                                    {successMessage}
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AplikimiOnline;
