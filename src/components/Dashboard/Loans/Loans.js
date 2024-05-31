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
       // AccountNumber: '',
       // firstName: '',
        //lastName: '',
        //dateOfBirth: '',
        //loanType: '',
        //city: '',
        //address: '',
        
        //email: '',
        //employmentStatus: '',
        //annualIncome: '',
        //loanAmount: '',
        //loanPurpose: ''
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
        axios.post('http://localhost:8080/getAllLoansForClient')
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
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
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
                                        <th scope="col">Name</th>
                                        <th scope="col">Birthday</th>
                                        <th scope="col">loanType</th>
                                        <th scope="col">city</th>
                                        <th scope="col">address</th>
                                        <th scope="col">email</th>
                                        <th scope="col">employmentStatus</th>
                                        <th scope="col">annualIncome</th>
                                        <th scope="col">loanAmount</th>
                                        <th scope="col">loanPurpose</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(loans) && loans.map((Loan, index) => (
                                        <tr key={Loan.LoanID}>
                                             <td>{Loan.firstName + ' ' + Loan.lastName}</td>
                                                    <td>{formatDate(Loan.dateOfBirth)}</td>
                                                    <td>{Loan.loanType}</td>
                                                    <td>{Loan.city}</td>
                                                    <td>{Loan.address}</td>
                                                    <td>{Loan.email}</td>
                                                    <td>{Loan.employmentStatus}</td>
                                                    <td>{Loan.annualIncome}</td>
                                                    <td>{Loan.loanAmount}</td>
                                                    <td>{Loan.loanPurpose}</td>
                                                    <td>{Loan.Status}</td>
                                            {/* <td>
                                                <button onClick={() => handleEdit(Loan.LoanID)} className="btn btn-primary mr-2">Edit</button>
                                                <button onClick={() => handleDelete(Loan.LoanID)} className="btn btn-danger">Delete</button>
                                            </td> */}
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
