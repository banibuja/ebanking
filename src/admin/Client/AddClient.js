import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Validation from '../../LoginSignup/SignupValidation';
import axios from 'axios';
import Sidebar from '../Dashboard/Sidebar';

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
                        axios.post('http://localhost:8080/addClient', values)
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
                                                        <label htmlFor="name">Client Username</label>
                                                        <input type="text" placeholder='Username' name='username' onChange={handeInput} className='form-control roundend-0' />
                                                        {errors.username && <span className='text-danger'>{errors.username}</span>}
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="name">Client Name</label>
                                                        <input type="text" placeholder='Name' name='name' onChange={handeInput} className='form-control roundend-0' />
                                                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="name">Client Lastname</label>
                                                        <input type="text" placeholder='Lastname' name='lastname' onChange={handeInput} className='form-control roundend-0' />
                                                        {errors.lastname && <span className='text-danger'>{errors.lastname}</span>}
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="name">Client Email</label>
                                                        <input type="email" placeholder='Email' name='email' onChange={handeInput} className='form-control roundend-0' />
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
                                                        <input type="password" placeholder='Password' name='password' onChange={handeInput} className='form-control roundend-0' />
                                                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="gender">Client Gender</label>
                                                        <select name="gender" onChange={handeInput} value={values.gender} className="form-control rounded-0">
                                                            <option value="">Select Gender</option>
                                                            <option value="M">Male</option>
                                                            <option value="F">Female</option>
                                                        </select>
                                                        {errors.gender && <span className="text-danger">{errors.gender}</span>}
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <input type="date" name='birthday' className="form-control form-control-lg" placeholder="Birthdate" onChange={handeInput} />
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="name">Client Address</label>
                                                        <input type="text" placeholder='Country' name='Country' onChange={handeInput} className='form-control roundend-0' />
                                                        <input type="text" placeholder='City' name='City' onChange={handeInput} className='form-control roundend-0' />
                                                        <input type="text" placeholder='Street' name='Street' onChange={handeInput} className='form-control roundend-0' />
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
