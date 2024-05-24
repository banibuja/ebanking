import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const EditLoan = ({ id, onClose }) => {
    const [loanData, setLoanData] = useState({
        accountId: '',
        loanAmount: '',
        loanConditions: '',
        status: ''
    });

    useEffect(() => {
        // Fetch loan data when the component mounts or ID changes
        fetchLoanData();
    }, [id]);

    const fetchLoanData = () => {
        axios.get(`http://localhost:8080/api/loans/${id}`)
            .then(res => {
                setLoanData(res.data);
            })
            .catch(err => console.log(err));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoanData({ ...loanData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update loan data
        axios.put(`http://localhost:8080/api/loans/${id}`, loanData)
            .then(res => {
                onClose(); // Close modal on success
            })
            .catch(err => console.log(err));
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Loan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="accountId">
                        <Form.Label>Account ID</Form.Label>
                        <Form.Control
                            type="text"
                            name="accountId"
                            value={loanData.accountId}
                            onChange={handleChange}
                            placeholder="Enter Account ID"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="loanAmount">
                        <Form.Label>Loan Amount</Form.Label>
                        <Form.Control
                            type="text"
                            name="loanAmount"
                            value={loanData.loanAmount}
                            onChange={handleChange}
                            placeholder="Enter Loan Amount"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="loanConditions">
                        <Form.Label>Loan Conditions</Form.Label>
                        <Form.Control
                            type="text"
                            name="loanConditions"
                            value={loanData.loanConditions}
                            onChange={handleChange}
                            placeholder="Enter Loan Conditions"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="status">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            type="text"
                            name="status"
                            value={loanData.status}
                            onChange={handleChange}
                            placeholder="Enter Status"
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditLoan;
