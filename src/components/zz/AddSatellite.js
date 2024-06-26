import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddSatellite() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        SatelliteId: '',
        PlanetId: '',
        Name: '',
        isDeleted: 'false'
    });

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('http://localhost:8080/getPlanet');
                if (response.data) {
                    setTeams(response.data);
                }
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        fetchTeams();
    }, []);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/AddSatellite', values);
            if (response.data === 'success') {
                navigate('/GetSatellite');  
            } else {
                console.error('Failed to add player');
            }
        } catch (error) {
            console.error('Failed to add player:', error);
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
                                                <label htmlFor="PlayerId">SatelliteId</label>
                                                <input type="text" placeholder='SatelliteId' name='SatelliteId' value={values.SatelliteId} onChange={handleInput} className='form-control roundend-0' required />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="NameP">name</label>
                                                <input type="text" placeholder='NameP' name='Name' value={values.Name} onChange={handleInput} className='form-control roundend-0' required />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <input type="text" placeholder='isDeleted' name='isDeleted' value={values.isDeleted} onChange={handleInput} className='form-control roundend-0' required hidden />
                                            </div>
                                           
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="PlanetId">Team</label>
                                                <select name="PlanetId" value={values.PlanetId} onChange={handleInput} className='form-control roundend-0' required>
                                                    <option value="" disabled>Select Planet</option>
                                                    {teams.map(planet => (
                                                        <option key={planet.id} value={planet.id}>{planet.PlanetId}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <center>
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-success">Add Satellite</button>
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

export default AddSatellite;
