import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../Dashboard/Sidebar';
import Nav from '../Nav';

function AddClient() {
    const navigate = useNavigate();
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            const url = 'https://polar-everglades-58451-8c8c26171cdb.herokuapp.com/getAllCountries';
            const response = await fetch(url);
            const data = await response.json();
            const countryList = data.map(country => ({
                name: country.country,
                code: country.iso2
            }));
            setCountries(countryList);
            
        }
        fetchCountries();
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            const fetchCities = async () => {
                const url = `https://polar-everglades-58451-8c8c26171cdb.herokuapp.com/getAllCitiesFromCountry/${selectedCountry.code}`;
                const response = await fetch(url);
                const data = await response.json();
                setCities(data);
            }
            fetchCities();
        }
    }, [selectedCountry]);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleCountryChange = (event) => {
        const countryCode = event.target.value;
        const country = countries.find(country => country.code === countryCode);
        setSelectedCountry(country);
        setSelectedCity('');
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
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
                                    axios.post('http://localhost:8080/addClient', { ...values, Country: selectedCountry.name, City: selectedCity })
                                        .then(res => {
                                            setSuccessMessage('Client added successfully!');
                                            navigate('/client');
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

    return (
        <div>
            <main className="d-flex min-vh-100 bg-light text-dark">
                <Sidebar />
                <div className="container-fluid mt-4 ">
                    <Nav />
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
                                                <label htmlFor="username">Client Username</label>
                                                <input type="text" placeholder='Username' name='username' onChange={handleInput} className='form-control roundend-0' required />
                                                {errors.username && <span className='text-danger'>{errors.username}</span>}
                                                {values.username && (
                                                    <span style={{ marginLeft: '10px' }}>
                                                        {errors.username ? (
                                                            <span style={{ color: 'red' }}>{errors.username}</span>
                                                        ) : (
                                                            <span style={{ color: 'green' }}>Username is available.</span>
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="name">Client Name</label>
                                                <input type="text" placeholder='Name' name='name' onChange={handleInput} className='form-control roundend-0' />
                                                {errors.name && <span className='text-danger'>{errors.name}</span>}
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="lastname">Client Lastname</label>
                                                <input type="text" placeholder='Lastname' name='lastname' onChange={handleInput} className='form-control roundend-0' />
                                                {errors.lastname && <span className='text-danger'>{errors.lastname}</span>}
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="email">Client Email</label>
                                                <input type="email" placeholder='Email' name='email' onChange={handleInput} className='form-control roundend-0' />
                                                {errors.email && <span className='text-danger'>{errors.email}</span>}
                                                {values.email && (
                                                    <span style={{ marginLeft: '10px' }}>
                                                        {errors.email ? (
                                                            <span style={{ color: 'red' }}>{errors.email}</span>
                                                        ) : (
                                                            <span style={{ color: 'green' }}>Email is available.</span>
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                            {/* <div className="col-md-6 form-group">
                                                <label htmlFor="password">Client Password</label>
                                                <input type="password" placeholder='Password' name='password' onChange={handleInput} className='form-control roundend-0' />
                                                {errors.password && <span className='text-danger'>{errors.password}</span>}
                                            </div> */}
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="gender">Client Gender</label>
                                                <select name="gender" onChange={handleInput} value={values.gender} className="form-control rounded-0">
                                                    <option value="">Select Gender</option>
                                                    <option value="M">Male</option>
                                                    <option value="F">Female</option>
                                                </select>
                                                {errors.gender && <span className="text-danger">{errors.gender}</span>}
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="birthday">Client Birthday</label>
                                                <input type="date" name='birthday' className="form-control form-control-lg" placeholder="Birthdate" onChange={handleInput} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="Country">Country</label>
                                                <select 
                                                    id="Country"
                                                    name="Country"
                                                    value={selectedCountry?.code || ''}
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
                                            </div>
                                            {selectedCountry && (
                                                <div className="col-md-6 form-group">
                                                    <label htmlFor="City">City</label>
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
                                                </div>
                                            )}
                                            {selectedCity && (
                                                <div className="col-md-6 form-group">
                                                    <label htmlFor="Street">Street</label>
                                                    <input
                                                        type="text"
                                                        id="Street"
                                                        name="Street"
                                                        placeholder="Street"
                                                        onChange={handleInput}
                                                        className="form-control form-control-lg"
                                                        required
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <center>
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-success ">Add Client</button>
                                        </div>
                                    </center>
                                    {successMessage && (
                                        <div className="alert alert-success mt-4">
                                            {successMessage}
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AddClient;