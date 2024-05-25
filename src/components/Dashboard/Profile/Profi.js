import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Validation from '../../LoginSignup/SignupValidation';
import Sidebar from '../Sidebar';
import { Buffer } from 'buffer';
function Profile() {
    const [values, setValues] = useState({
        username: '',
        name: '',
        lastname: '',
        email: '',
        birthday: '',
        profilePicture: 'http://bootdey.com/img/Content/avatar/avatar1.png'

    });
    const [allPasswords, setAllPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [usernameExists, setUsernameExists] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const [errors, setErrors] = useState({});
    const [imageSource, setImageSource] = useState('');
    const [showPasswordFields, setShowPasswordFields] = useState(false);

    useEffect(() => {
        axios.post('http://localhost:8080/getClientforProfile', {}, { withCredentials: true })
            .then(res => {
                const data = res.data;
                let fetchedBlob = data.profilePicture;
                let bufferredImage = Buffer.from(fetchedBlob)
                setValues(prevValues => ({
                    ...prevValues,
                    username: data.username || '',
                    name: data.name || '',
                    lastname: data.lastname || '',
                    email: data.email || '',
                    birthday: data.birthday.split("T")[0] || '',
                    profilePicture: bufferredImage.toString() || 'http://bootdey.com/img/Content/avatar/avatar1.png'
                    

                }));
            })
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (e.target.name == 'username') {
            axios.get(`http://localhost:8080/checkUsername?username=${e.target.value}`)
                .then(response => {
                    if (response.data.exists) {
                        setUsernameExists(true);
                    } else {
                        setUsernameExists(false);
                    }
                })
                .catch(err => console.log(err));
        }
        if (e.target.name == 'email') {
            axios.get(`http://localhost:8080/checkemail?email=${e.target.value}`)
                .then(response => {
                    if (response.data.exists) {
                        setEmailExists(true);
                    } else {
                        setEmailExists(false);
                    }
                })
                .catch(err => console.log(err));
        }
    };
    const handlePasswordChanges = (e) => {
        setAllPasswords(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const updateProfile = (event) => {
        event.preventDefault();

        setErrors(Validation(values));
        if (usernameExists || emailExists) {
            return false;
        } else {
            axios.put('http://localhost:8080/updateProfile', values, { withCredentials: true })
                .then(res => {
                    console.log('Profile updated successfully');
                    window.location.reload();
                })
                .catch(err => {
                    console.error(err);
                });
        }
    };
    const updatePassword = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8080/updatePassword', allPasswords, { withCredentials: true })
            .then(res => {
                console.log('Profile updated successfully');
                window.location.reload();
            })
            .catch(err => {
                console.error(err);
            });
    };



    const togglePasswordFields = () => {
        setShowPasswordFields(!showPasswordFields);
    };
    const handleProfilePicture = (e) => {
        const image = e.target.files[0];
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValues(prev => ({ ...prev, profilePicture: reader.result }));
            }
            reader.readAsDataURL(image);
        }
    }
    const updateProfilePicture = () => {
        axios.post('http://localhost:8080/updateProfilePicture', { base64: values.profilePicture }, { withCredentials: true })
            .then(res => {
                console.log(res.data);
            })
    }
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
                                    <img width="200px" height="200px" className="img-account-profile rounded-circle mb-2" src={values.profilePicture} alt="" />
                                    <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                                    <input type="file" id="profilePicture" onChange={handleProfilePicture} accept='image/*' hidden />
                                    <label for="profilePicture" className="btn btn-secondary">Upload new image</label>

                                    <button className="btn btn-primary" onClick={updateProfilePicture} type="button">Save</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="card mb-4">
                                <div className="card-header">Account Details</div>
                                <div className="card-body">
                                    <form onSubmit={updateProfile}>
                                        <div className="mb-3">
                                            <label className="small mb-1" htmlFor="inputUsername">Username</label>
                                            <input className="form-control" id="inputUsername" name="username" type="text" placeholder="Enter your username" value={values.username} onChange={handleChange} />
                                            {errors.username && <span className='text-danger'>{errors.username}</span>}
                                            {usernameExists ? (
                                                <span style={{ marginLeft: '10px' }}>
                                                    <span style={{ color: 'red' }}>This username is already taken.</span>
                                                </span>
                                            ) : ('')}
                                        </div>
                                        <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                                                <input className="form-control" id="inputFirstName" name="name" type="text" placeholder="Enter your first name" value={values.name} onChange={handleChange} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                                                <input className="form-control" id="inputLastName" name="lastname" type="text" placeholder="Enter your last name" value={values.lastname} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="row gx-3 mb-3">
                                            <div className="col-md-6">
                                                <label className="small mb-1" htmlFor="inputEmail">Email</label>
                                                <input className="form-control" id="inputEmail" name="email" type="email" placeholder="Enter your email" value={values.email} onChange={handleChange} />
                                                {errors.email && <span className='text-danger'>{errors.email}</span>}
                                                {emailExists ? (
                                                    <span style={{ marginLeft: '10px' }}>
                                                        <span style={{ color: 'red' }}>This email is already in use.</span>
                                                    </span>
                                                ) : ('')}
                                            </div>
                                            <div className="col-md-6">
                                                <label className="small mb-1" htmlFor="inputBirthday">Birthday</label>
                                                <input className="form-control" id="inputBirthday" name="birthday" type="date" placeholder="Enter your birthday" value={values.birthday} onChange={handleChange} />
                                            </div>
                                        </div>
                                        {/* <div className="row gx-3 mb-3">
                                            <div className="col-md-3">
                                                <label className="small mb-1" htmlFor="inputCountry">Country</label>
                                                <input className="form-control" id="inputCountry" name="Country" type="text" placeholder="Enter your Country" value={values.Country} onChange={handleChange} disabled />
                                            </div>
                                            <div className="col-md-3">
                                                <label className="small mb-1" htmlFor="inputCity">City</label>
                                                <input className="form-control" id="inputCity" name="City" type="text" placeholder="Enter your last City" value={values.City} onChange={handleChange} disabled />
                                            </div>
                                            <div className="col-md-3">
                                                <label className="small mb-1" htmlFor="inputStreet">Street</label>
                                                <input className="form-control" id="inputStreet" name="Street" type="text" placeholder="Enter your last Street" value={values.Street} onChange={handleChange} disabled />
                                            </div>
                                        </div> */}
                                        <button type="button" className="btn btn-secondary" onClick={togglePasswordFields}>
                                            Change Password
                                        </button>
                                        <button className="btn btn-primary" type="submit">Save changes</button>
                                        {showPasswordFields && (
                                            <>
                                                <div className="row gx-3 mb-3">
                                                    <div className="col-md-6">
                                                        <label className="small mb-1" htmlFor="inputCurrentPassword">Current Password</label>
                                                        <input className="form-control" id="inputCurrentPassword" name="currentPassword" type="password" placeholder="Enter your current password" value={values.currentPassword} onChange={handlePasswordChanges} />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="small mb-1" htmlFor="inputNewPassword">New Password</label>
                                                        <input className="form-control" id="inputNewPassword" name="newPassword" type="password" placeholder="Enter your new password" value={values.newPassword} onChange={handlePasswordChanges} />
                                                    </div>
                                                </div>
                                                <div className="row gx-3 mb-3">
                                                    <div className="col-md-6">
                                                        <label className="small mb-1" htmlFor="inputConfirmPassword">Confirm New Password</label>
                                                        <input className="form-control" id="inputConfirmPassword" name="confirmPassword" type="password" placeholder="Confirm your new password" value={values.confirmPassword} onChange={handlePasswordChanges} />
                                                    </div>
                                                </div>
                                                <button className="btn btn-secondary" onClick={updatePassword} type="submit">Save Password</button>
                                            </>
                                        )}
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
