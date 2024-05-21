import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../Sidebar';

function Profile() {
    const [values, setValues] = useState({
        username: '',
        name: '',
        lastname: '',
        email: '',
        birthday: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPasswordFields, setShowPasswordFields] = useState(false);

    useEffect(() => {
        axios.post('http://localhost:8080/getClientforProfile', {}, { withCredentials: true })
            .then(res => {
                const data = res.data;
                setValues(prevValues => ({
                    ...prevValues,
                    username: data.username || '',
                    name: data.name || '',
                    lastname: data.lastname || '',
                    email: data.email || '',
                    birthday: formatDate(data.birthday) || '',
                }));
            })
            .catch(err => console.error(err));
    }, []);

    const handleChange = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8080/updateProfile', values, { withCredentials: true })
            .then(res => {
                console.log('Profile updated successfully');
            })
            .catch(err => {
                console.error(err);
            });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    };

    const togglePasswordFields = () => {
        setShowPasswordFields(!showPasswordFields);
    };

    return (
        <div>
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white', color: 'black' }}>
                <Sidebar />
                <div className="container-xl px-4 mt-4">
                    <hr className="mt-0 mb-4" />
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="card mb-4 mb-xl-0">
                                <div className="card-header">Profile Picture</div>
                                <div className="card-body text-center">
                                    <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                    <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                                    <button className="btn btn-primary" type="button">Upload new image</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="card mb-4">
                                <div className="card-header">Account Details</div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="small mb-1" htmlFor="inputUsername">Username</label>
                                            <input className="form-control" id="inputUsername" name="username" type="text" placeholder="Enter your username" value={values.username} onChange={handleChange} disabled />
                                        </div>
                                        <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                                                <input className="form-control" id="inputFirstName" name="name" type="text" placeholder="Enter your first name" value={values.name} onChange={handleChange} disabled />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                                                <input className="form-control" id="inputLastName" name="lastname" type="text" placeholder="Enter your last name" value={values.lastname} onChange={handleChange} disabled />
                                            </div>
                                        </div>
                                        <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label className="small mb-1" htmlFor="inputEmail">Email</label>
                                                <input className="form-control" id="inputEmail" name="email" type="email" placeholder="Enter your email" value={values.email} onChange={handleChange} disabled />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small mb-1" htmlFor="inputBirthday">Birthday</label>
                                                <input className="form-control" id="inputBirthday" name="birthday" type="text" placeholder="Enter your birthday" value={values.birthday} onChange={handleChange} disabled />
                                            </div>
                                        </div>
                                        <button type="button" className="btn btn-secondary mb-3" onClick={togglePasswordFields}>
                                            Change Password
                                        </button>
                                        {showPasswordFields && (
                                            <>
                                                <div className="row gx-3 mb-3">
                                                    <div className="col-md-6">
                                                        <label className="small mb-1" htmlFor="inputCurrentPassword">Current Password</label>
                                                        <input className="form-control" id="inputCurrentPassword" name="currentPassword" type="password" placeholder="Enter your current password" value={values.currentPassword} onChange={handleChange} />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="small mb-1" htmlFor="inputNewPassword">New Password</label>
                                                        <input className="form-control" id="inputNewPassword" name="newPassword" type="password" placeholder="Enter your new password" value={values.newPassword} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="row gx-3 mb-3">
                                                    <div className="col-md-6">
                                                        <label className="small mb-1" htmlFor="inputConfirmPassword">Confirm New Password</label>
                                                        <input className="form-control" id="inputConfirmPassword" name="confirmPassword" type="password" placeholder="Confirm your new password" value={values.confirmPassword} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        <button className="btn btn-primary" type="submit">Save changes</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Profile;
