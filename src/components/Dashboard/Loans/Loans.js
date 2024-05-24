import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import EditLoan from './EditLoan';
import './Loans.css';


export const Loans = () => {
    const [loans, setLoans] = useState([]);
    const [numLoans, setNumLoans] = useState(0); 
    const [editLoan, setEditLoan] = useState(null);
    const [newLoan, setNewLoan] = useState({
        AccountID: '',
        LoanAmount: '',
        LoanType: '', // Added LoanType
        LoanConditions: '',
        Status: ''
    });

    const loanTypes = [
        { value: '', label: 'Select Loan Type' },
        { value: 'personal', label: 'Personal Loan' },
        { value: 'home', label: 'Home Loan' },
        { value: 'car', label: 'Car Loan' },
        { value: 'education', label: 'Education Loan' }
    ];

    useEffect(() => {
        fetchLoans();
    }, []);

    const navigate = useNavigate();

    const fetchLoans = () => {
        axios.post('http://localhost:8080/getAllLoans')
            .then(res => {
                const fetchedLoans = res.data;
                setLoans(fetchedLoans);
                setNumLoans(fetchedLoans.length); 
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/deleteLoan/${id}`)
            .then(res => {
                fetchLoans();
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (id) => {
        setEditLoan(id);
    };

    const handleCloseEditModal = () => {
        setEditLoan(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLoan(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/applyLoan', newLoan)
            .then(res => {
                fetchLoans();
                setNewLoan({
                    AccountID: '',
                    LoanAmount: '',
                    LoanType: '', // Reset LoanType
                    LoanConditions: '',
                    Status: ''
                });
            })
            .catch(err => console.log(err));
    };

    return (
        <div> 
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white', color: 'black' }}>
                <Sidebar />

                <div className="container-fluid" style={{ marginTop: '100px' }}>
                    <h1>MANAGE Loans</h1>
                    <div className="row">
                        <caption>List of Loans</caption>
                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                            <table className="table table-hover table-bordered table-striped dataTable no-footer" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">Loan ID</th>
                                        <th scope="col">Account ID</th>
                                        <th scope="col">Loan Amount</th>
                                        <th scope="col">Loan Type</th> {/* Added LoanType column */}
                                        <th scope="col">Loan Conditions</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(loans) && loans.map((loan, index) => (
                                        <tr key={loan.LoanID}>
                                            <td>{loan.LoanID}</td>
                                            <td>{loan.AccountID}</td>
                                            <td>{loan.LoanAmount}</td>
                                            <td>{loan.LoanType}</td> {/* Added LoanType column */}
                                            <td>{loan.LoanConditions}</td>
                                            <td>{loan.Status}</td>
                                            <td>
                                                <button onClick={() => handleEdit(loan.LoanID)} className="btn btn-primary mr-2">Edit</button>
                                                <button onClick={() => handleDelete(loan.LoanID)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>Total loans: {numLoans}</div> 
                    {editLoan !== null && <EditLoan id={editLoan} onClose={handleCloseEditModal} />}

                    <div className="row" style={{ marginTop: '50px' }}>
                        <h2>Apply for a New Loan</h2>
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <div className="form-group">
                                <label>Account ID:</label>
                                <input
                                    type="text"
                                    name="AccountID"
                                    value={newLoan.AccountID}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Loan Amount:</label>
                                <input
                                    type="number"
                                    name="LoanAmount"
                                    value={newLoan.LoanAmount}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Loan Type:</label>
                                <select
                                    name="LoanType"
                                    value={newLoan.LoanType}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                >
                                    {loanTypes.map(type => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Loan Conditions:</label>
                                <input
                                    type="text"
                                    name="LoanConditions"
                                    value={newLoan.LoanConditions}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Status:</label>
                                <input
                                    type="text"
                                    name="Status"
                                    value={newLoan.Status}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success">Apply</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Loans;
