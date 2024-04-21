import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Validation from '../../LoginSignup/SignupValidation';
import axios from 'axios';
import Sidebar from '../Dashboard/Sidebar';

function OpenAction({ id, onClose }) {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/getUsers/${id}`)
            .then(res => {
                setValues(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handeInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
    
        if (Object.keys(errors).length === 0) {
            axios.put(`http://localhost:8080/updateUsers/${id}`, values)
                .then(res => {
                    navigate('/dashboard');
                })
                .catch(err => console.log(err));
        }
    };



    return (
        <div className="modal fade show text-black" style={{ display: 'block' }} aria-modal="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Open Acc</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                        <div className="form-group">
                               <div className="col-md-6 form-group">
    <label htmlFor="name">Account Name</label>
    <select name="account" onChange={handeInput} className="form-control roundend-0">
        <option value="">Select Accname</option>
        <option value="Fixed Deposit Account">Fixed Deposit Account</option>
        <option value="Recurring deposit">Recurring deposit	</option>
        <option value="Savings">Savings	</option>
        <option value="Retirement">Retirement </option>
        <option value="Current account">Current account	</option>
    </select>
</div>
</div>
                                                     </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpenAction;
