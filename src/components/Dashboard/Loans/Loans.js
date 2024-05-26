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

                    </div>

                    </main>

                    </div>

                   
    );
}

export default Loans;
