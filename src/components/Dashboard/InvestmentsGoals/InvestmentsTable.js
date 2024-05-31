import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import EditInvesmentsGoals from './EditInvesmentsGoals';

export const InvestmentsTable = () => {
    const [goals, setGoals] = useState([]);
    const [numGoals, setNumGoals] = useState(0);
    const [editGoalId, setEditGoalId] = useState(null);

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = () => {
        axios.post('http://localhost:8080/getGoalsWithSession')
            .then(res => {
                //console.log(res.data); 
                const fetchedGoals = res.data;
                if (Array.isArray(fetchedGoals)) { 
                    setGoals(fetchedGoals);
                    setNumGoals(fetchedGoals.length);
                } else {
                    setGoals([]); 
                    setNumGoals(0);
                }
            })
            .catch(err => {
                console.log(err);
                setGoals([]); 
                setNumGoals(0);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/deleteGoals/${id}`)
            .then(res => {
                fetchGoals();
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (id) => {
        setEditGoalId(id);
    };

    const handleCloseEditModal = () => {
        setEditGoalId(null);
    };

    return (
        <div>
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white', color: 'black' }}>
                <Sidebar />
                <div className="container-fluid" style={{ marginTop: '100px' }}>
                    <h1 className="text-center">MANAGE Your Goals</h1>
                    <div className="row">
                        <caption>List of Goals</caption>
                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                            <table className="table table-hover table-bordered table-striped dataTable no-footer" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">InvestmentGoalID</th>
                                        <th scope="col">UserID</th>
                                        <th scope="col">GoalName</th>
                                        <th scope="col">GoalAmount</th>
                                        <th scope="col">Deadline</th>
                                        <th scope="col">Impact</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(goals) && goals.map((goal, index) => (
                                        <tr key={goal.InvestmentGoalID}>
                                            <th scope="row">{goal.InvestmentGoalID}</th>
                                            <td>{goal.UserID}</td>
                                            <td>{goal.GoalName}</td>
                                            <td>{goal.GoalAmount}</td>
                                            <td>{goal.Deadline}</td>
                                            <td>{goal.Impact}</td>
                                            <td>
                                                <button onClick={() => handleEdit(goal.InvestmentGoalID)} className="btn btn-primary mr-2">Edit</button>
                                                <button onClick={() => handleDelete(goal.InvestmentGoalID)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>Total goals: {numGoals}</div>
                    {editGoalId !== null && <EditInvesmentsGoals id={editGoalId} onClose={handleCloseEditModal} />}
                </div>
            </main>
        </div>
    );
};

export default InvestmentsTable;
