import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Layout/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ApplyOnline.css'; // Shto një skedar CSS për stilizimin

function AplikimiOnline() {
    const navigate = useNavigate();
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [idPhotos, setIdPhotos] = useState({ frontPhoto: '', backPhoto: '' });
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const handlePhotoUpload = (e, type) => {
        const image = e.target.files[0];
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setIdPhotos(prev => ({ ...prev, [type]: reader.result }));
            };
            reader.readAsDataURL(image);
        }
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [successMessage, navigate]);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.get(`http://localhost:8080/checkemail?email=${values.email}`)
            .then(response => {
                if (response.data.exists) {
                    setErrors(prev => ({ ...prev, email: 'This email is already in use.' }));
                } else {
                    setErrors(prev => ({ ...prev, email: '' }));

                    axios.get(`http://localhost:8080/checkUsername?username=${values.username}`)
                        .then(response => {
                            if (response.data.exists) {
                                setErrors(prev => ({ ...prev, username: 'This username is already taken.' }));
                            } else {
                                setErrors(prev => ({ ...prev, username: '' }));
                                if (Object.keys(errors).length === 0) {

                                    axios.post('http://localhost:8080/addApply', { ...values, frontPhoto: idPhotos.frontPhoto, backPhoto: idPhotos.backPhoto })
                                        .then(res => {
                                            setSuccessMessage('Application submitted successfully!');
                                            navigate('../');
                                        })
                                        .catch(err => console.log(err));
                                }
                            }
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    };

    const sendEmail = (email, username, password) => {
        axios.post('http://localhost:8080/sendEmail', { email, username, password })
            .then(res => {
                console.log('Email sent successfully');
            })
            .catch(err => console.log('Error sending email', err));
    };

    useEffect(() => {
        axios.get('http://localhost:8080/getAllCountries')
            .then(response => {
                const countryList = response.data.map(country => ({
                    name: country.country,
                    code: country.iso2
                }));
                setCountries(countryList);
            })
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            axios.post(`http://localhost:8080/getAllCitiesFromCountry`, { iso2: selectedCountry })
                .then(response => {
                    setCities(response.data);
                })
                .catch(error => console.error('Error fetching cities:', error));
        }
    }, [selectedCountry]);

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
        setSelectedCity('');
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };
    return (
        <>
            <Navbar />
            <div className="apply-online-container">
                <div className="content-wrapper">
                    <div className="column">
                        <h3 className="card-title text-center">Fill All Fields</h3>
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="form-outline mb-4">
                                <label htmlFor="username" className="form-label">Nr. Personal</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Write your Nr. Personal ID"
                                    onChange={handleInput}
                                    className="form-control form-control-lg"
                                    required
                                />
                                {errors.username && <span className="text-danger">{errors.username}</span>}
                                {values.username && (
                                    <div className="mt-2">
                                        {errors.username ? (
                                            <span className="text-danger">{errors.username}</span>
                                        ) : (
                                            <span className="text-success">Username is available.</span>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="form-outline mb-4">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    onChange={handleInput}
                                    className="form-control form-control-lg"
                                    required
                                />
                                {errors.name && <span className="text-danger">{errors.name}</span>}
                            </div>
                            <div className="form-outline mb-4">
                                <label htmlFor="lastname" className="form-label">Lastname</label>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    placeholder="Lastname"
                                    onChange={handleInput}
                                    className="form-control form-control-lg"
                                    required
                                />
                                {errors.lastname && <span className="text-danger">{errors.lastname}</span>}
                            </div>
                            <div className="form-outline mb-4">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleInput}
                                    className="form-control form-control-lg"
                                    required
                                />
                                {errors.email && <span className="text-danger">{errors.email}</span>}
                                {values.email && (
                                    <div className="mt-2">
                                        {errors.email ? (
                                            <span className="text-danger">{errors.email}</span>
                                        ) : (
                                            <span className="text-success">Email is available.</span>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="form-outline mb-4">
                                <label htmlFor="gender" className="form-label">Gender</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    onChange={handleInput}
                                    value={values.gender}
                                    className="form-select1 form-select-lg"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </select>
                                {errors.gender && <span className="text-danger">{errors.gender}</span>}
                            </div>
                            <div className="form-outline mb-4">
                                <label htmlFor="birthday" className="form-label">Birthday</label>
                                <input
                                    type="date"
                                    id="birthday"
                                    name="birthday"
                                    className="form-control form-control-lg"
                                    onChange={handleInput}
                                    required
                                />
                            </div>
                        </form>
                    </div>
                    <div className="column">
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="form-outline mb-4">
                                <label htmlFor="package" className="form-label">Select Package</label>
                                <select
                                    id="package"
                                    name="package"
                                    onChange={handleInput}
                                    className="form-select form-select-lg"
                                    required
                                >
                                    <option value="">Select Package</option>
                                    <option value="StudentPackage">Student Package</option>
                                    <option value="Advanced">Advanced Package</option>
                                    <option value="Premium">Premium</option>
                                    <option value="Basic">Basic</option>
                                </select>
                                {errors.package && <span className="text-danger">{errors.package}</span>}
                            </div>
                            <div className="form-outline mb-4">
                                <label htmlFor="frontPhoto" className="form-label">Front ID photo</label>
                                <input
                                    type="file"
                                    accept='image/*'
                                    id="frontPhoto"
                                    className="form-control form-control-lg"
                                    onChange={(e) => handlePhotoUpload(e, 'frontPhoto')}
                                    required
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <label htmlFor="backPhoto" className="form-label">Back ID photo</label>
                                <input
                                    type="file"
                                    accept='image/*'
                                    id="backPhoto"
                                    className="form-control form-control-lg"
                                    onChange={(e) => handlePhotoUpload(e, 'backPhoto')}
                                    required
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <label htmlFor="Country" className="form-label">Address</label>
                                <select 
                                    id="Country"
                                    name="Country"
                                    value={selectedCountry}
                                    onChange={handleCountryChange}
                                    className="form-control form-control-lg mb-2"
                                >
                                    <option value="" disabled>Select a country</option>
                                    {countries.map((country, index) => (
                                        <option key={index} value={country.code}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>

                                {selectedCountry && (
                                    <select
                                        id="City"
                                        name="City"
                                        value={selectedCity}
                                        onChange={handleCityChange}
                                        className="form-control form-control-lg mb-2">
                                        <option value="" disabled>Select a city</option>
                                        {cities.map((city, index) => (
                                            <option key={index} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                )}

                                {selectedCity && (
                                    <input
                                        type="text"
                                        id="Street"
                                        name="Street"
                                        placeholder="Street"
                                        onChange={handleInput}
                                        className="form-control form-control-lg"
                                        required
                                    />
                                )}
                                {errors.address && <span className="text-danger">{errors.address}</span>}
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-success btn-lg">Apply</button>
                            </div>
                            {successMessage && (
                                <div className="alert alert-success mt-4">
                                    {successMessage}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AplikimiOnline;
