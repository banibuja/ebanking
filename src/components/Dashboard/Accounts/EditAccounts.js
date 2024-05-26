import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VerifyLogin from '../VerifyLogin';

function EditAccount({ id, onClose }) {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        CurrentAccount: '',
        Balance: ''
    });
    VerifyLogin();
    useEffect(() => {
        axios.get(`http://localhost:8080/getAccountForEdit/${id}`)
            .then(res => {
                console.log('Edit Account API', res.data);
                setValues(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
  };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.put(`http://localhost:8080/updateAccount/${id}`, values)
            .then(res => {
                console.log('Update API', res.data);
                
                window.location.reload(); 
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="modal fade show text-black" style={{ display: 'block' }} aria-modal="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Account</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Client username</label>
                                <input type="text" placeholder='User ID' name='username' onChange={handleInput} className='form-control rounded-0' value={values.username} disabled />
                            </div>
                            <div className="form-group">
                                <label>Client FullName</label>
                                <input type="text" placeholder='fullname' name='name' onChange={handleInput} className='form-control rounded-0' value={values.name + ' ' + values.lastname} disabled />
                            </div>
                            <div className="form-group">
                                <label>Current Account</label>
                                <input type="text" placeholder='Current Account' name='CurrentAccount' onChange={handleInput} className='form-control rounded-0' value={values.CurrentAccount} disabled />
                            </div>
                            <div className="form-group">
                                <label>Balance</label>
                                <input type="text" placeholder='Balance' name='Balance' onChange={handleInput} className='form-control rounded-0' value={values.Balance} disabled/>
                            </div>
                            <div className="form-group">
                                <label>Account Status</label>
                                                              <select name='AccountStatus' onChange={handleInput}  className='form-control roundend-0' value={values.AccountStatus} >
                                                                 <option value="">Select Status</option>
                                                                  <option value="Open">Open</option>
                                                                   <option value="Closed">Closed</option>

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

export default EditAccount;
