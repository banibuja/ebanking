import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddPlayer() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        PlayerId: '',
        NameP: '',
        number: '',
        BirthYear: '',
        TeamId: '',
    });

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('http://localhost:8080/getTeam');
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
            const response = await axios.post('http://localhost:8080/AddPlayer', values);
            if (response.data === 'success') {
                navigate('/GetPlayers');  
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
                                                <label htmlFor="PlayerId">PlayerId</label>
                                                <input type="text" placeholder='PlayerId' name='PlayerId' value={values.PlayerId} onChange={handleInput} className='form-control roundend-0' required />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="NameP">Player name</label>
                                                <input type="text" placeholder='NameP' name='NameP' value={values.NameP} onChange={handleInput} className='form-control roundend-0' required />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="number">Number</label>
                                                <input type="text" placeholder='number' name='number' value={values.number} onChange={handleInput} className='form-control roundend-0' required />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="BirthYear">BirthYear</label>
                                                <input type="text" placeholder='BirthYear' name='BirthYear' value={values.BirthYear} onChange={handleInput} className='form-control roundend-0' required />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label htmlFor="TeamId">Team</label>
                                                <select name="TeamId" value={values.TeamId} onChange={handleInput} className='form-control roundend-0' required>
                                                    <option value="" disabled>Select Team</option>
                                                    {teams.map(team => (
                                                        <option key={team.id} value={team.id}>{team.TeamId}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <center>
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-success">Add Player</button>
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

export default AddPlayer;
