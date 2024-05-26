import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import arrowImage from '../../imgs/arrow.png';
// import Header from '../HeaderNav/Header';
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
      <div>
      
      <Navbar /> 
    
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form action="" onSubmit={handleSubmit}>
                <div className="h1">Login</div> <br />
                <div className="form-outline mb-4 d-flex">
                </div>
                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                  <input type="text" name='username' className="form-control form-control-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} placeholder="Enter a valid email address" onChange={handleInput} />
                </div>
                {/* <!-- Password input --> */}
                <div className="form-outline mb-3">
                  <input type="password" name='password' className="form-control form-control-lg" placeholder="Enter password" onChange={handleInput}  />
                </div>
                {/* <!-- Birthday --> */}
               
                 <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Login</button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Dont Have an account? <a href="/applyonline" className="link-danger">Apply Online </a></p>
                </div>
                
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  
                  <script src="https://apis.google.com/js/platform.js" async defer></script> 
                </div>
              </form>
            </div>
            
          </div>
        </div>
      </section>
  </div>
    );
}

export default Login;
