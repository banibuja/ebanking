import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation';
import axios from 'axios'
import Navbar from '../Layout/Navbar';





function Signup() {
    const [values, setValues] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        dateb: '',
        gender:'',
        phonenumber: ''

    })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();
    const handeInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };
  axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {

  event.preventDefault();
        
  axios.get(`http://localhost:8080/check-email?email=${values.email}`)
      .then(response => {
          if (response.data.exists) {
              alert('This email is already in use.');
          } else {
              setErrors(Validation(values));

              if (Object.keys(errors).length === 0) {
                  axios.post('http://localhost:8080/signup', values)
                      .then(res => {
                          navigate('/client');
                      })
                      .catch(err => console.log(err));
              }
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
             <div className="h1">Register</div> <br />
              <div className="form-outline mb-4 d-flex">
                  <input type="text" id="form3Example3" name='name' className="form-control form-control-lg" placeholder="Your first name" onChange={handeInput} />
                {errors.name && <span className='text-danger'> {errors.name}</span>} 
                  <input type="text" id="form3Example3" name='lastname' className="form-control form-control-lg" placeholder="Your last name" onChange={handeInput} />
                  {errors.name && <span className='text-danger'> {errors.name}</span>}
                </div>

              <div className="form-outline mb-4 ">
                  <input type="email" id="form3Example3" name='email' className="form-control form-control-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} placeholder="Enter a valid email address" onChange={handeInput} />
                  {errors.email && <span className='text-danger'> {errors.email}</span>}
              </div>
              <div className="form-outline mb-3">
                  <input type="password" name='password' className="form-control form-control-lg" placeholder="Enter password" onChange={handeInput} />
                   {errors.password && <span className='text-danger'> {errors.password}</span>} 
              </div>
              <div className="form-outline mb-3">
                <input type="date"  name='dateb' className="form-control form-control-lg" placeholder="Enter Birthdate" onChange={handeInput} />
              </div>
              <div className="form-outline mb-4 d-flex">
                  <select name="gender" className="form-control form-control-lg" onChange={handeInput} value={values.gender} >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && <span className="text-danger">{errors.gender}</span>}
                </div>
                <div className="form-outline mb-3">
                  <input type="text" placeholder='Phone Number' name='phonenumber' onChange={handeInput} className="form-control form-control-lg" />
                </div>
              <div className="text-center text-lg-start mt-4 pt-2">
              <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', justifyContent: 'center' }}>Register</button>
                <p className="small fw-bold mt-2 pt-1 mb-0">Have an account? <a href="/login" className="link-danger">Log in</a></p>
              </div>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Register with</p>
                <div className="g-signin2" data-onsuccess="onSignIn"></div>
                <script src="https://apis.google.com/js/platform.js" async defer></script>
              </div>
            </form>
            </div>
        </div>
      </div>
    </section>
    </div>
    )
  }


export default Signup