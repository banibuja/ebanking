import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddPlanet() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        PlanetId: '',
        name: '',
        Type: '',
        isDeleted: false // Set default value to false
    });

    const handleInput = (event) => {
        const { name, type, checked, value } = event.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setValues(prev => ({ ...prev, [name]: inputValue }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/AddPlanet', values);
            if (response.data === 'success') {
                navigate('/AddPlayers');
            } else {
                console.error('Failed to add team');
            }
        } catch (error) {
            console.error('Failed to add goal:', error);
        }
    };

    return (
        <div>
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white', color: 'black' }}>
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
                                                <label htmlFor="PlanetId">PlanetID</label>
                                                <input type="text" placeholder='PlanetID' name='PlanetId' value={values.PlanetId} onChange={handleInput} className='form-control rounded-0' required />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="name">Name</label>
                                                <input type="text" placeholder='Name' name='name' value={values.name} onChange={handleInput} className='form-control rounded-0' required />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="Type">Type</label>
                                                <input type="text" placeholder='Type' name='Type' value={values.Type} onChange={handleInput} className='form-control rounded-0' required />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="isDeleted">isDeleted</label>
                                                <input type="checkbox" name='isDeleted' checked={values.isDeleted} onChange={handleInput} className='form-control rounded-0' />
                                            </div>
                                        </div>
                                    </div>
                                    <center>
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-success">Add Planet</button>
                                        </div>
                                    </center>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AddPlanet;
