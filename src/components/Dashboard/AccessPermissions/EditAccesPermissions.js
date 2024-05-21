import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditAccesPermissions({ id, onClose }) {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        AccessLevel: '',
        Balance: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/getAccesForEdit/${id}`)
            .then(res => {
                console.log('Edit Acces API', res.data);
                setValues(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.put(`http://localhost:8080/updateAccessPermissions/${id}`, values)
            .then(res => {
                console.log('Update APi', res.data)
                
                window.location.reload(); 
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="modal fade show text-black" style={{ display: 'block' }} aria-modal="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Acces</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>username</label>
                                <input type="text" placeholder='username' name='username' onChange={handleInput} className='form-control roundend-0' value={values.username} disabled/>
                            </div>
                            <div className="form-group">
                                <label>Full name</label>
                                <input type="text" placeholder='full name' name='fullname' onChange={handleInput} className='form-control roundend-0' value={values.name + ' ' + values.lastname} disabled/>
                            </div>
                            <div className="form-group">
                                <label>Access Level</label>
                                <select name='AccessLevel' onChange={handleInput} className='form-control roundend-0' value={values.AccessLevel}>
                                    <option value="">Select Access Level</option>
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                </select>
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


export default EditAccesPermissions;