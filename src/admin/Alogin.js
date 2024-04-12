import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../LoginSignup/Login.css';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8080')
            .then(res => {
                if (res.data.valid) {
                    navigate('/dashboard');
                } else {
                    navigate('/Alogin');
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8080/Alogin', values)
            .then(res => {
                if (res.data.Login) {
                    navigate('/dashboard');
                } else {
                    alert("No record");
                }
                console.log(res);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-in</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            placeholder='Email Address' 
                            name='email' 
                            value={values.email} 
                            onChange={handleInput} 
                            className='form-control'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="Password">Password</label>
                        <input 
                            type="password" 
                            placeholder='Password' 
                            name='password' 
                            value={values.password} 
                            onChange={handleInput} 
                            className='form-control'
                        />
                    </div>
                    <button type='submit' className='btn btn-success btn-block'>Log in</button>
                    <p>You agree to our terms and policies</p>
                    <Link to="/signup" className='btn btn-default btn-block border bg-light text-decoration-none'>Create Account</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
