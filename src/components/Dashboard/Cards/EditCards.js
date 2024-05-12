import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditCards({ id, onClose }) {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        UserID: '',
        CardNumber: '',
        ExpiryDate: '',
        CardHolderName: '',
        CardType: '',
        CardStatus: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/getCards/${id}`)
            .then(res => {
                console.log('Edit Cards API', res.data);
                setValues(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.put(`http://localhost:8080/updateCards/${id}`, values)
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
                        <h5 className="modal-title">Edit Card </h5>
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
                                <label>CardNumber</label>
                                <input type="text" placeholder='CardNumber' name='CardNumber' onChange={handleInput} className='form-control roundend-0' value={values.CardNumber} disabled />
                            </div>
                            <div className="form-group">
                                <label>ExpiryDate</label>
                                <input type="date" placeholder='ExpiryDate' name='ExpiryDate' onChange={handleInput} className='form-control roundend-0' value={values.ExpiryDate} />
                            </div>
                            <div className="form-group">
                                <label>CardHolderName</label>
                                <input type="text" placeholder='CardHolderName' name='CardHolderName' onChange={handleInput} className='form-control roundend-0' value={values.CardHolderName} />
                            </div>
                            <div className="form-group">
                                <label>CardType</label>
                                <select name='CardType' onChange={handleInput} className='form-control roundend-0' value={values.CardType}>
                                    <option value="">Select CardType</option>
                                    <option value="Debit">Debit</option>
                                    <option value="Credit">Credit</option>
                                    <option value="Prepaid">Prepaid</option>

                                </select>
                            </div>
                            <div className="form-group">
                                <label>CardStatus</label>
                                <select name='CardStatus' onChange={handleInput} className='form-control roundend-0' value={values.CardStatus}>
                                    <option value="">Select CardStatus</option>
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="OFFLINE">OFFLINE</option>

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


export default EditCards;