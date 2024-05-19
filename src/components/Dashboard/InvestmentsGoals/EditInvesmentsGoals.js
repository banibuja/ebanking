import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditInvesmentsGoals({ id, onClose }) {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        UserID: '',
        GoalName: '',
        GoalAmount: '',
        Deadline: '',
        Impact: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/getGoalsForEdit/${id}`)
            .then(res => {
                setValues(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8080/updateGoal/${id}`, values)
            .then(res => {
                window.location.reload(); 
                onClose(); 
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="modal fade show text-black" style={{ display: 'block' }} aria-modal="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Goal </h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Client ID</label>
                                <input type="text" placeholder='User ID' name='UserID' onChange={handleInput} className='form-control roundend-0' value={values.UserID} disabled/>
                            </div>
                            <div className="form-group">
                                <label>GoalName</label>
                                <input type="text" placeholder='goalname' name='GoalName' onChange={handleInput} className='form-control roundend-0' value={values.GoalName}  />
                            </div>
                            <div className="form-group">
                                <label>GoalAmount</label>
                                <input type="text" placeholder='GoalAmount' name='GoalAmount' onChange={handleInput} className='form-control roundend-0' value={values.GoalAmount} />
                            </div>
                            <div className="form-group">
                                <label>Deadline</label>
                                <input type="date" placeholder='deadline' name='Deadline' onChange={handleInput} className='form-control roundend-0' value={values.Deadline} />
                            </div>
                            <div className="form-group">
                                                    <label for="important" class="form-label">Impact</label>
                                                    <input type="range" class="form-range" name='Impact' onChange={handleInput} className='form-control roundend-0' value={values.Impact} />
                                                </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditInvesmentsGoals;
//InvestmentsTable