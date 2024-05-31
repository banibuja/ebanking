import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditLoans({ id, onClose }) {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        AccountID: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        loanType: '',
        city: '',
        address: '',
        employmentStatus: '',
        annualIncome: '',	
        loanAmount: '',
        loanPurpose: '',
        Status: ''
    });

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/editLoans/${id}`)
                .then(res => {
                    console.log('Edit Account API', res.data);
                    setValues(res.data);
                })
                .catch(err => console.error('Error fetching loan details:', err));
        } else {
            console.error("Loan ID is undefined");
        }
    }, [id]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!id) {
            console.error('Loan ID is undefined');
            return;
        }
        axios.put(`http://localhost:8080/updateLoan/${id}`, values)
            .then(res => {
                console.log('Update API', res.data);
                window.location.reload(); // Consider using a more React-friendly way of updating the view
            })
            .catch(err => {
                console.error('Error updating loan:', err);
                alert('Failed to update loan. Check console for more details.');
            });
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
                                <label>First Name</label>
                                <input type="text" name='firstName' onChange={handleInput} className='form-control rounded-0' value={values.firstName} />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" name='lastName' onChange={handleInput} className='form-control rounded-0' value={values.lastName} />
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input type="date" name='dateOfBirth' onChange={handleInput} className='form-control rounded-0' value={values.dateOfBirth} />
                            </div>
                            <div className="form-group">
                                <label>Loan Type</label>
                                <input type="text" name='loanType' onChange={handleInput} className='form-control rounded-0' value={values.loanType} />
                            </div>
                            <div className="form-group">
                                <label>City</label>
                                <input type="text" name='city' onChange={handleInput} className='form-control rounded-0' value={values.city} />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" name='address' onChange={handleInput} className='form-control rounded-0' value={values.address} />
                            </div>
                            <div className="form-group">
                                <label>Employment Status</label>
                                <input type="text" name='employmentStatus' onChange={handleInput} className='form-control rounded-0' value={values.employmentStatus} />
                            </div>
                            <div className="form-group">
                                <label>Annual Income</label>
                                <input type="number" name='annualIncome' onChange={handleInput} className='form-control rounded-0' value={values.annualIncome} />
                            </div>
                            <div className="form-group">
                                <label>Loan Amount</label>
                                <input type="number" name='loanAmount' onChange={handleInput} className='form-control rounded-0' value={values.loanAmount} />
                            </div>
                            <div className="form-group">
                                <label>Loan Purpose</label>
                                <input type="text" name='loanPurpose' onChange={handleInput} className='form-control rounded-0' value={values.loanPurpose} />
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <input type="text" name='Status' onChange={handleInput} className='form-control rounded-0' value={values.Status} />
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
