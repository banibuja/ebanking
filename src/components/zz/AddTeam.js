import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddTeam() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        teamid: '',
        name: ''
    });

    const handeInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/AddTeam', values);
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
                {/*<div className="content-wrapper" style={{ marginRight: '100px' }}>
                    <section className="content">*/}
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
                                                        <label htmlFor="name">TeamID</label>
                                                        <input type="text" placeholder='teamdID' name='teamid' value={values.teamid} onChange={handeInput} className='form-control roundend-0' required />
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="name">Name</label>
                                                        <input type="text" placeholder='GoalAmount' name='name' value={values.name} onChange={handeInput} className='form-control roundend-0' required />
                                                        </div>

                                                </div>
                                            </div>
                                            <center>
                                                <div className="card-footer">
                                                    <button type="submit" className="btn btn-success">Add Team</button>
                                                </div>
                                            </center>
                                        </form>
                                    </div>
                                </div>
                            </div>
                       {/* </div>
                    </section>*/}
                </div>
            </main>
        </div>
    );
}

export default AddTeam;
// EditInvesmentsGoals