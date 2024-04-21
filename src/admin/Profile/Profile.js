import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar';
import './Profile.css';


export const Profile = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8080')
            .then(res => {
                if (res.data.valid) {
                    setUser(res.data);
                } else {
                    navigate('/login')
                }
            })
            .catch(err => console.log(err))
    }, [])

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
        axios.get(`http://localhost:8080/getUserData/${user.role}/${user.uId}`)
            .then(res => {
                console.log(res.data);
                setValues(res.data);
            })
            .catch(err => console.log(user));
    }, [user.uId]);

    const handeInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setErrors({});

        if (Object.keys(errors).length === 0) {
            axios.put(`http://localhost:8080/updateUsers/${user.uId}`, values)
                .then(res => {
                    navigate('/dashboard');
                })
                .catch(err => console.log(err));
        }
    };


    return (
        <div>
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white', color: 'black' }}>
                <Sidebar />
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Client</h5>
                            <button type="button" className="close" onClick={() => navigate('/dashboard')}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" placeholder='Enter name' name='name' onChange={handeInput} className='form-control roundend-0' value={values.name} disabled />
                                    {errors.name && <span className='text-danger'>{errors.name}</span>}                            </div>
                                <div className="form-group">
                                    <label>Lastname</label>
                                    <input type="text" placeholder='Enter name' name='lastname' onChange={handeInput} className='form-control roundend-0' value={values.lastname} disabled />
                                    {errors.lastname && <span className='text-danger'>{errors.lastname}</span>}                            </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" placeholder='update email' name='email' onChange={handeInput} className='form-control roundend-0' value={values.email} />
                                    {errors.email && <span className='text-danger'>{errors.email}</span>}                            </div>
                                <div className="form-group">
                                    <label>password</label>
                                    <input type="password" placeholder='Enter password' name='password' onChange={handeInput} className='form-control roundend-0' value={values.password} />
                                    {errors.password && <span className='text-danger'>{errors.password}</span>}                            </div>

                                <div className="form-group">
                                    <label>Birthday</label>
                                    <input type="date"  name='dateb' className="form-control form-control-lg" placeholder="Enter Birthdate" onChange={handeInput} disabled value={values.dob ? values.dob.split('T')[0] : ''} 
/>                                </div>
                                <div className="form-group">
                                    <label>Gender</label>
                                    <select name="gender" onChange={handeInput} value={values.gender} className="form-control rounded-0" disabled>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    {errors.gender && <span className="text-danger">{errors.gender}</span>}
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="text" placeholder='Enter phone number' name='phonenumber' onChange={handeInput} className='form-control roundend-0' value={values.nrTel} />
                                </div>                        </form>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )

}

export default Profile;