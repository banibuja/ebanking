import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../Dashboard/Sidebar';

function InvesmentsGoals() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        goalname: '',
        GoalAmount: '',
        deadline: '',
        impact: ''
    });

    const handeInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/addGoal', values);
            if (response.data === 'success') {
                navigate('/InvestmentsTable'); 
            } else {
                console.error('Failed to add goal');
            }
        } catch (error) {
            console.error('Failed to add goal:', error);
        }
    };

    return (
        <div>
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white', color: 'black' }}>
                <Sidebar />
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
                                                        <label htmlFor="name">Goal Name</label>
                                                        <input type="text" placeholder='GoalName' name='goalname' value={values.goalname} onChange={handeInput} className='form-control roundend-0' required />
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="name">Goal Amount</label>
                                                        <input type="text" placeholder='GoalAmount' name='GoalAmount' value={values.GoalAmount} onChange={handeInput} className='form-control roundend-0' required />
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="name">Deadline</label>
                                                        <input type="date" placeholder='Deadline' name='deadline' value={values.deadline} onChange={handeInput} className='form-control roundend-0' required />
                                                    </div>
                                                    <div className="form-group">
                                                    <label for="important" class="form-label">Impact</label>
                                                    <input type="range" class="form-range" name='impact' onChange={handeInput} className='form-control roundend-0' value={values.impact} />
                                                </div>
                                                </div>
                                            </div>
                                            <center>
                                                <div className="card-footer">
                                                    <button type="submit" className="btn btn-success">Add Goal</button>
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

export default InvesmentsGoals;
// EditInvesmentsGoals