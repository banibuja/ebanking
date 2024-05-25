import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Validation from '../../LoginSignup/SignupValidation';
import axios from 'axios';
import Sidebar from '../../Dashboard/Sidebar';
import Nav from '../Nav';

function AddClient() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        name: '',
        lastname: '',
        email: '',
        password: '',
        gender: '',
        birthday: '',
        Country: '',
        City: '',
        Street: '',
        currency: '',
        emailExists: false,
        usernameExists: false
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
    }, []);

    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (e.target.name == 'username') {
            axios.get(`http://localhost:8080/checkUsername?username=${e.target.value}`)
                .then(response => {
                    if (response.data.exists) {
                        setValues(prev => ({ ...prev, usernameExists: true }));
                    } else {
                        setValues(prev => ({ ...prev, usernameExists: false }));
                    }
                })
                .catch(err => console.log(err));
        }
        if (e.target.name == 'email') {
            axios.get(`http://localhost:8080/checkemail?email=${e.target.value}`)
                .then(response => {
                    if (response.data.exists) {
                        setValues(prev => ({ ...prev, emailExists: true }));
                    } else {
                        setValues(prev => ({ ...prev, emailExists: false }));
                    }
                })
                .catch(err => console.log(err));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();



        setErrors(Validation(values));
        if (values.usernameExists || values.emailExists || errors) {
            return "please check inputs";
        } else {

            if (Object.keys(errors).length === 0) {
                axios.post('http://localhost:8080/addClient', values)
                    .then(res => {
                        navigate('/client');
                    })
                    .catch(err => console.log(err));
            }
        }
    };

    return (
        <div>
      <main className="d-flex min-vh-100 bg-light text-dark">
        <Sidebar />
        <div className="content-wrapper" style={{ marginRight: '100px' }}>
            <section className="content">
            < Nav />

            <div className="container-fluid mt-5 ">
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
                                                <label htmlFor="name">Client Username</label>
                                                <input type="text" placeholder='Username' name='username' onChange={handleInput} className='form-control roundend-0' required />
                                                            {errors.username && <span className='text-danger'>{errors.username}</span>}
                                                            {values.usernameExists ? (
                                                                <span style={{ marginLeft: '10px' }}>
                                                                    <span style={{ color: 'red' }}>This username is already taken.</span>
                                                                </span>
                                                            ) : ('')}
                                            </div>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="name">Client Name</label>
                                                <input type="text" placeholder='Name' name='name' onChange={handleInput} className='form-control roundend-0' />
                                                {errors.name && <span className='text-danger'>{errors.name}</span>}
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="name">Client Lastname</label>
                                                <input type="text" placeholder='Lastname' name='lastname' onChange={handleInput} className='form-control roundend-0' />
                                                {errors.lastname && <span className='text-danger'>{errors.lastname}</span>}
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="name">Client Email</label>
                                                <input type="email" placeholder='Email' name='email' onChange={handleInput} className='form-control roundend-0' />
                                                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                                                        {values.emailExists ? (
                                                            <span style={{ marginLeft: '10px' }}>
                                                                <span style={{ color: 'red' }}>This email is already in use.</span>
                                                            </span>
                                                        ) : ('')}
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="name">Client Password</label>
                                                <input type="password" placeholder='Password' name='password' onChange={handleInput} className='form-control roundend-0' />
                                                {errors.password && <span className='text-danger'>{errors.password}</span>}
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="gender">Client Gender</label>
                                                <select name="gender" onChange={handleInput} value={values.gender} className="form-control rounded-0">
                                                    <option value="">Select Gender</option>
                                                    <option value="M">Male</option>
                                                    <option value="F">Female</option>
                                                </select>
                                                {errors.gender && <span className="text-danger">{errors.gender}</span>}
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="name">Client Birthday</label>
                                                <input type="date" name='birthday' className="form-control form-control-lg" placeholder="Birthdate" onChange={handleInput} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Selecr Currency</label>
                                                <select name='currency' onChange={handleInput} className='form-control roundend-0'>
                                                    <option value="">Select Currency</option>
                                                    <option value="EUR">EUR</option>
                                                    <option value="USD">USD</option>
                                                    <option value="GBP">GBP</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="name">Client Address</label>
                                                <input type="text" placeholder='Country' name='Country' onChange={handleInput} className='form-control roundend-0' />
                                                <input type="text" placeholder='City' name='City' onChange={handleInput} className='form-control roundend-0' />
                                                <input type="text" placeholder='Street' name='Street' onChange={handleInput} className='form-control roundend-0' />
                                            </div>
                                           
                                        </div>
                                    </div>
                                    <center>
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-success ">Add Client</button>
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

export default AddClient;
