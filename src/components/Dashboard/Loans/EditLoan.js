import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditLoans({ id, onClose }) {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        AccountID: '',
        LoanAmount: '',
        LoanConditions: '',
        Status: ''

    });

    useEffect(() => {
        axios.get(`http://localhost:8080/editLoans/${id}`)
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
        
        axios.put(`http://localhost:8080/updateLoan/${id}`, values)
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
                        <h5 className="modal-title">Edit Loans</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>CurrentAccount</label>
                                <input type="text" placeholder='AccountID' name='AccountID' onChange={handleInput} className='form-control rounded-0' value={values.AccountID} disabled />
                            </div>
                            <div className="form-group">
                                <label>LoanAmount</label>
                                <input type="text" placeholder='LoanAmount' name='LoanAmount' onChange={handleInput} className='form-control rounded-0' value={values.LoanAmount} disabled />
                            </div>
                            <div className="form-group">
                                <label>LoanConditions</label>
                                <input type="text" placeholder='LoanConditions' name='LoanConditions' onChange={handleInput} className='form-control rounded-0' value={values.LoanConditions}  />
                            </div>
                           
                            <div className="form-group">
                                <label>Loans Status</label>
                                                              <select name='Status' onChange={handleInput}  className='form-control roundend-0' value={values.Status} >
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

export default EditLoans;
