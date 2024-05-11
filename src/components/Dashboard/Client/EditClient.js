import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar';

function EditClient({ id, onClose }) {
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
        Street: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/getUsers/${id}`)
            .then(res => {
                setValues(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        
        axios.put(`http://localhost:8080/updateUsers/${id}`, values)
            .then(res => {
                navigate('/dashboard');
            })
            .catch(err => console.log(err));
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
                                <label>Client Username</label>
                                <input type="text" placeholder='Username' name='username' onChange={handleInput} className='form-control roundend-0' value={values.username} />
                            </div>
                            <div className="form-group">
                                <label>Client Name</label>
                                <input type="text" placeholder='Name' name='name' onChange={handleInput} className='form-control roundend-0' value={values.name} />
                            </div>
                            <div className="form-group">
                                <label>Client Lastname</label>
                                <input type="text" placeholder='Lastname' name='lastname' onChange={handleInput} className='form-control roundend-0' value={values.lastname} />
                            </div>
                            <div className="form-group">
                                <label>Client Email</label>
                                <input type="email" placeholder='Email' name='email' onChange={handleInput} className='form-control roundend-0' value={values.email} />
                            </div>
                            <div className="form-group">
                                <label>Client Password</label>
                                <input type="password" placeholder='Password' name='password' onChange={handleInput} className='form-control roundend-0' value={values.password} />
                            </div>
                            <div className="form-group">
                                <label>Client Gender</label>
                                <select name="gender" onChange={handleInput} value={values.gender} className="form-control rounded-0">
                                    <option value="">Select Gender</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Client Birthday</label>
                                <input type="date" name='birthday' onChange={handleInput} className="form-control form-control-lg" value={values.birthday} />
                            </div>
                            <div className="form-group">
                                <label>Client Address</label>
                                <input type="text" placeholder='Country' name='Country' onChange={handleInput} className='form-control roundend-0' value={values.Country} />
                                <input type="text" placeholder='City' name='City' onChange={handleInput} className='form-control roundend-0' value={values.City} />
                                <input type="text" placeholder='Street' name='Street' onChange={handleInput} className='form-control roundend-0' value={values.Street} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditClient;
