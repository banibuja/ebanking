import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import { Button, Spinner, Form } from 'react-bootstrap';

const Loans = () => {
    const [loansData, setLoansData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [newLoanData, setNewLoanData] = useState({
        accountId: '',
        loanAmount: '',
        loanConditions: '',
        status: '',
        clientName: ''
    });

    useEffect(() => {
        fetchLoansData();
    }, []);

    const fetchLoansData = async () => {
        try {
            const response = await fetch('api/loans');
            if (response.ok) {
                const data = await response.json();
                setLoansData(data);
                setLoading(false);
            } else {
                console.error('Failed to fetch loan data');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching loan data:', error);
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleNewLoanChange = (e) => {
        setNewLoanData({ ...newLoanData, [e.target.name]: e.target.value });
    };

    const handleSubmitNewLoan = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('api/loans', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newLoanData)
            });
            if (response.ok) {
                fetchLoansData();
                setNewLoanData({
                    accountId: '',
                    loanAmount: '',
                    loanConditions: '',
                    status: '',
                    clientName: ''
                });
            } else {
                console.error('Failed to add new loan');
            }
        } catch (error) {
            console.error('Error adding new loan:', error);
        }
    };

    const filteredLoans = loansData.filter(loan =>
        loan.LoanConditions.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa', color: '#212529' }}>
                <Sidebar />
                <div className="content-wrapper" style={{ marginRight: '100px' }}>
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card card-purple">
                                        <div className="card-header">
                                            <h3 className="card-title">Loans</h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="mb-3">
                                                <Form.Label>Filter by Loan Conditions:</Form.Label>
                                                <Form.Control type="text" placeholder="Enter keyword" value={filter} onChange={handleFilterChange} />
                                            </div>
                                            <Form onSubmit={handleSubmitNewLoan}>
                                                <div className="row">
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="accountId">Account ID</label>
                                                        <input type="text" placeholder="Account ID" name="accountId" value={newLoanData.accountId} onChange={handleNewLoanChange} className="form-control rounded-0" />
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="loanAmount">Loan Amount</label>
                                                        <input type="text" placeholder="Loan Amount" name="loanAmount" value={newLoanData.loanAmount} onChange={handleNewLoanChange} className="form-control rounded-0" />
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="loanConditions">Loan Conditions</label>
                                                        <input type="text" placeholder="Loan Conditions" name="loanConditions" value={newLoanData.loanConditions} onChange={handleNewLoanChange} className="form-control rounded-0" />
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="status">Status</label>
                                                        <input type="text" placeholder="Status" name="status" value={newLoanData.status} onChange={handleNewLoanChange} className="form-control rounded-0" />
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="clientName">Client Name</label>
                                                        <input type="text" placeholder="Client Name" name="clientName" value={newLoanData.clientName} onChange={handleNewLoanChange} className="form-control rounded-0" />
                                                    </div>
                                                </div>
                                                <Button type="submit" className="btn btn-primary rounded-0">Add Loan</Button>
                                            </Form>
                                            {loading ? (
                                                <div className="text-center">
                                                    <Spinner animation="border" variant="primary" />
                                                </div>
                                            ) : (
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>Loan ID</th>
                                                            <th>Account ID</th>
                                                            <th>Loan Amount</th>
                                                            <th>Loan Conditions</th>
                                                            <th>Status</th>
                                                            <th>Client Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {filteredLoans.map(loan => (
                                                            <tr key={loan.LoanID}>
                                                                <td>{loan.LoanID}</td>
                                                                <td>{loan.AccountID}</td>
                                                                <td>{loan.LoanAmount}</td>
                                                                <td>{loan.LoanConditions}</td>
                                                                <td>{loan.Status}</td>
                                                                <td>{loan.ClientName}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Loans;
