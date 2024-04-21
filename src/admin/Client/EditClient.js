import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Validation from '../../LoginSignup/SignupValidation';
import axios from 'axios';
import Sidebar from '../Dashboard/Sidebar';

function EditClient({ id, onClose }) {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        dateb: '',
        gender: '',
        phonenumber: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/getUsers/${id}`)
            .then(res => {
                setValues(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handeInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        setErrors(Validation(values));
    
        if (Object.keys(errors).length === 0) {
            axios.put(`http://localhost:8080/updateUsers/${id}`, values)
                .then(res => {
                    navigate('/dashboard');
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="modal fade show text-black" style={{ display: 'block' }} aria-modal="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Client</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                        <div className="form-group">
                                <label>Name</label>
                                <input type="text" placeholder='Enter name' name='name' onChange={handeInput} className='form-control roundend-0' value={values.name} />
                                 {errors.name && <span className='text-danger'>{errors.name}</span>}                            </div>
                            <div className="form-group">
                                <label>Lastname</label>
                                <input type="text" placeholder='Enter name' name='lastname' onChange={handeInput} className='form-control roundend-0' value={values.lastname} />
                                                        {errors.lastname && <span className='text-danger'>{errors.lastname}</span>}                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" placeholder='Enter email' name='email' onChange={handeInput} className='form-control roundend-0' value={values.email} />
                                                        {errors.email && <span className='text-danger'>{errors.email}</span>}                            </div>
                                                        <div className="form-group">
                                <label>password</label>
                                <input type="password" placeholder='Enter password' name='password' onChange={handeInput} className='form-control roundend-0' value={values.password} />
                                                        {errors.password && <span className='text-danger'>{errors.password}</span>}                            </div>                        

                            <div className="form-group">
                                <label>Birthday</label>
                                <input type="date"  name='dateb' className="form-control form-control-lg" placeholder="Enter Birthdate" onChange={handeInput}  />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <select name="gender" onChange={handeInput} value={values.gender} className="form-control rounded-0">
                                                            <option value="">Select Gender</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                        </select>
                                                        {errors.gender && <span className="text-danger">{errors.gender}</span>}
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="text" placeholder='Enter staff number' name='phonenumber' onChange={handeInput} className='form-control roundend-0' value={values.phonenumber} />
                            </div>                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditClient;
