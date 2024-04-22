import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from '../LoginSignup/SignupValidation';
import axios from 'axios'
import Sidebar from '../admin/Dashboard/Sidebar';




function Addstaff() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        lastname: '',
        banknumber: '',
        account: '',
        email: '',
        password: '',
        dateb: '',
        gender: '',
        phonenumber: '',
        emailExists: false 
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
    }, []);

    const handeInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.get(`http://localhost:8080/check-email?email=${values.email}`)
            .then(response => {
                if (response.data.exists) {
                    setValues(prev => ({ ...prev, emailExists: true }));
                } else {
                    setValues(prev => ({ ...prev, emailExists: false }));
                    setErrors(Validation(values));

                    if (Object.keys(errors).length === 0) {
                        axios.post('http://localhost:8080/addStaff', values)
                            .then(res => {
                                navigate('/staff');
                            })
                            .catch(err => console.log(err));
                    }
                }
            })
            .catch(err => console.log(err));
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
                                            <h3 className="card-title">Fill All Fields</h3>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="name">Client Name</label>
                                                        <input type="text" placeholder='Enter name' name='name' onChange={handeInput} className='form-control roundend-0' />
                                                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="name">Lastname</label>
                                                        <input type="text" placeholder='Enter name' name='lastname' onChange={handeInput} className='form-control roundend-0' />
                                                        {errors.lastname && <span className='text-danger'>{errors.lastname}</span>}
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="name">Client Bank Number</label>
                                                        <input type="text" placeholder='2223****' name='banknumber' onChange={handeInput} className='form-control roundend-0' readOnly/>
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="name">Account type</label>
                                                        <input type="text" placeholder='*****' name='account' onChange={handeInput} className='form-control roundend-0' readOnly/>
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="name">Client Email</label>
                                                        <input type="email" placeholder='Enter email' name='email' onChange={handeInput} className='form-control roundend-0' />
                                                        {errors.email && <span className='text-danger'>{errors.email}</span>}
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
                                                        <label htmlFor="name">Client Password</label>
                                                        <input type="password" placeholder='Enter password' name='password' onChange={handeInput} className='form-control roundend-0' />
                                                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <input type="date"  name='dateb' className="form-control form-control-lg" placeholder="Enter Birthdate" onChange={handeInput}  />
                                                    </div>
                                                   
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="gender">Client Gender</label>
                                                        <select name="gender" onChange={handeInput} value={values.gender} className="form-control rounded-0">
                                                            <option value="">Select Gender</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                        </select>
                                                        {errors.gender && <span className="text-danger">{errors.gender}</span>}
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="name">client Phone Number</label>
                                                        <input type="text" placeholder='Enter staff number' name='phonenumber' onChange={handeInput} className='form-control roundend-0' />
                                                    </div>
                                                </div>
                                            </div>
                                            <center>
                                                <div className="card-footer">
                                                    <button type="submit" className="btn btn-success ">Add Staff</button>
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

export default Addstaff;
