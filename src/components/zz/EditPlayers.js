import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditPlayers({ id, onClose }) {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        PlayerId: '',
        TeamId: '',
        Name: '',
        Number: '',
        BirthYear: ''

    });

    useEffect(() => {
        axios.get(`http://localhost:8080/getForEdit/${id}`)
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
        axios.put(`http://localhost:8080/updatePlayers/${id}`, values)
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
                        <h5 className="modal-title">Edit Players </h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Client ID</label>
                                <input type="text" placeholder='PlayerId' name='PlayerId' onChange={handleInput} className='form-control roundend-0' value={values.PlayerId} />
                            </div>
                            <div className="form-group">
                                <label>TeamId</label>
                                <input type="text" placeholder='TeamId' name='TeamId' onChange={handleInput} className='form-control roundend-0' value={values.TeamId} />
                            </div>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" placeholder='Name' name='Name' onChange={handleInput} className='form-control roundend-0' value={values.Name} />
                            </div>
                            <div className="form-group">
                                <label>Number</label>
                                <input type="text" placeholder='Number' name='Number' onChange={handleInput} className='form-control roundend-0' value={values.Number} />
                            </div>
                            <div className="form-group">
                                <label>BirthYear</label>
                                <input type="text" placeholder='BirthYear' name='BirthYear' onChange={handleInput} className='form-control roundend-0' value={values.BirthYear} />
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

export default EditPlayers;
