import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import Navbar from '../Layout/Navbar';

function Login() {
  const [values, setValues] = useState({
    username: '',
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
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.defaults.withCredentials = true;
    axios.post('http://localhost:8080/loginform', values)
      .then(res => {
        if (res.data.Login) {
          navigate('/dashboard');
        } else {
          alert("No record");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-background">
          <div className="login-form">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" name='username' className="form-control" placeholder="User name" onChange={handleInput} />
              </div>
              <div className="form-group">
                <input type="password" name='password' className="form-control" placeholder="Enter password" onChange={handleInput} />
              </div>
              
              <button type="submit" className="btn btn-primary btn-block">Log In</button>
              <p className="small mt-2 mb-0">Don't have an account? <a href="/applyonline">Apply Online</a></p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;