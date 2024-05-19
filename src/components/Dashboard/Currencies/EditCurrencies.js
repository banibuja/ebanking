import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditCurrencies({ id, onClose }) {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        UserID: '',
        CurrencyCode: '',
        ExchangeRate: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/getCurrenciesForEdit/${id}`)
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
        axios.put(`http://localhost:8080/updateCurrencies/${id}`, values)
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
                                                                        <label>Select Currency</label>
                                                                        <select name='CurrencyCode' onChange={handleInput}  className='form-control roundend-0'  value={values.CurrencyCode} >
                                                                            <option value="">Select Currency</option>
                                                                            <option value="EUR">EUR</option>
                                                                            <option value="USD">USD</option>
                                                                                <option value="GBP">GBP</option>

                                            </select>
                                            </div>
                            
                            <div className="form-group">
                                <label>ExchangeRate</label>
                                <input type="text" placeholder='ExchangeRate' name='ExchangeRate' onChange={handleInput} className='form-control roundend-0' value={values.ExchangeRate} />
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

export default EditCurrencies;
