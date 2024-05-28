import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../Dashboard/Sidebar';

function ApplyLoans() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [values, setValues] = useState({
        id: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        loanType: '',
        city: '',
        address: '',
        phoneNumber: '',
        email: '',
        employmentStatus: '',
        annualIncome: '',
        loanAmount: '',
        loanPurpose: ''
    });

    const loanTypes = [
        { id: 1, name: 'Personal Loan' },
        { id: 2, name: 'Home Loan' },
        { id: 3, name: 'Car Loan' },
        { id: 4, name: 'Student Loan' }
    ];

    const cities = [
        { id: 1, name: 'Prishtina' },
        { id: 2, name: 'Peja' },
        { id: 3, name: 'Gjakova' },
        { id: 4, name: 'Mitrovica' },
        { id: 5, name: 'Prizren' },
        { id: 6, name: 'Ferizaj' },
        { id: 7, name: 'Gjilan' }
    ];

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/applyLoan', values);
            if (response.data.message === 'Loan application submitted successfully') {
                navigate('/loans');
            } else {
                console.error('Failed to submit loan application');
            }
        } catch (error) {
            console.error('Failed to submit loan application:', error);
        }
    };

    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    const prevStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa', color: '#343a40' }}>
            <Sidebar />
            <main style={{ flex: 1, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '100%', maxWidth: '1200px', margin: 'auto' }}>
                    <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', width: '100%' }}>
                        <div style={{ background: 'black', color: 'white', padding: '30px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                            <h3 style={{ margin: 0, fontSize: '1.5em' }}>Apply for a Loan</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div style={{ padding: '30px' }}>
                                {step === 1 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        <div style={{ width: '100%', maxWidth: '50%', padding: '0 15px', marginBottom: '20px' }}>
                                            <label htmlFor="id">ID</label>
                                            <input
                                                type="text"
                                                placeholder="ID"
                                                name="id"
                                                value={values.id}
                                                onChange={handleInput}
                                                style={{ borderRadius: '5px', padding: '15px', border: '1px solid #ced4da', fontSize: '1.2em', width: '100%' }}
                                                required
                                            />
                                        </div>
                                        <div style={{ width: '100%', maxWidth: '50%', padding: '0 15px', marginBottom: '20px' }}>
                                            <label htmlFor="firstName">First Name</label>
                                            <input
                                                type="text"
                                                placeholder="First Name"
                                                name="firstName"
                                                value={values.firstName}
                                                onChange={handleInput}
                                                style={{ borderRadius: '5px', padding: '15px', border: '1px solid #ced4da', fontSize: '1.2em', width: '100%' }}
                                                required
                                            />
                                        </div>
                                        <div style={{ width: '100%', maxWidth: '50%', padding: '0 15px', marginBottom: '20px' }}>
                                            <label htmlFor="lastName">Last Name</label>
                                            <input
                                                type="text"
                                                placeholder="Last Name"
                                                name="lastName"
                                                value={values.lastName}
                                                onChange={handleInput}
                                                style={{ borderRadius: '5px', padding: '15px', border: '1px solid #ced4da', fontSize: '1.2em', width: '100%' }}
                                                required
                                            />
                                        </div>
                                        <div style={{ width: '100%', maxWidth: '50%', padding: '0 15px', marginBottom: '20px' }}>
                                            <label htmlFor="dateOfBirth">Date of Birth</label>
                                            <input
                                                type="date"
                                                name="dateOfBirth"
                                                value={values.dateOfBirth}
                                                onChange={handleInput}
                                                style={{ borderRadius: '5px', padding: '15px', border: '1px solid #ced4da', fontSize: '1.2em', width: '100%' }}
                                                required
                                            />
                                        </div>
                                        <div style={{ width: '100%', maxWidth: '50%', padding: '0 15px', marginBottom: '20px' }}>
                                            <label htmlFor="loanType">Loan Type</label>
                                            <select
                                                name="loanType"
                                                value={values.loanType}
                                                onChange={handleInput}
                                                style={{ borderRadius: '5px', padding: '15px', border: '1px solid #ced4da', fontSize: '1.2em', width: '100%' }}
                                                required
                                            >
                                                <option value="">Select Loan Type</option>
                                                {loanTypes.map((loan) => (
                                                    <option key={loan.id} value={loan.id}>{loan.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div style={{ width: '100%', maxWidth: '50%', padding: '0 15px', marginBottom: '20px' }}>
                                            <label htmlFor="city">City</label>
                                            <select
                                                name="city"
                                                value={values.city}
                                                onChange={handleInput}
                                                style={{ borderRadius: '5px', padding: '15px', border: '1px solid #ced4 da', fontSize: '1.2em', width: '100%' }}
                                                required
                                            >
                                                <option value="">Select City</option>
                                                {cities.map((city) => (
                                                    <option key={city.id} value={city.id}>{city.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )}
                                {step === 2 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        <div style={{ width: '100%', maxWidth: '50%', padding: '0 15px', marginBottom: '20px' }}>
                                            <label htmlFor="address">Address</label>
                                            <input
                                                type="text"
                                                placeholder="Address"
                                                name="address"
                                                value={values.address}
                                                onChange={handleInput}
                                                style={{ borderRadius: '5px', padding: '15px', border: '1px solid #ced4da', fontSize: '1.2em', width: '100%' }}
                                                required
                                            />
                                        </div>
                                        <div style={{ width: '100%', maxWidth: '50%', padding: '0 15px', marginBottom: '20px' }}>
                                            <label htmlFor="phoneNumber">Phone Number</label>
                                            <input
                                                type="text"
                                                placeholder="Phone Number"
                                                name="phoneNumber"
                                                value={values.phoneNumber}
                                                onChange={handleInput}
                                                style={{ borderRadius: '5px', padding: '15px', border: '1px solid #ced4da', fontSize: '1.2em', width: '100%' }}
                                                required
                                            />
                                        </div>
                                        <div style={{ width: '100%', maxWidth: '50%', padding: '0 15px', marginBottom: '20px' }}>
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                name="email"
                                                value={values.email}
                                                onChange={handleInput}
                                                style={{ borderRadius: '5px', padding: '15px', border: '1px solid #ced4da', fontSize: '1.2em', width: '100%' }}
                                                required
                                            />
                                        </div>
                                    </div>
                                )}
                                {step === 3 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        <div style={{ width: '100%', maxWidth: '50%', padding: '0 15px', marginBottom: '20px' }}>
                                            <label htmlFor="employmentStatus">Employment Status</label>
                                            <input
                                                type="text"
                                                placeholder="Employment Status"
                                                name="employmentStatus"
                                                value={values.employmentStatus}
                                                onChange={handleInput}
                                                style={{ borderRadius: '5px', padding: '15px', border: '1px solid #ced4da', fontSize: '1.2em', width: '100%' }}
                                                required
                                            />
                                        </div>
                                        <div style={{ width: '100%', maxWidth: '50%', padding: '0 15px', marginBottom: '20px' }}>
                                            <label htmlFor="annualIncome">Annual Income</label>
                                            <input
                                                type="number"
                                                placeholder="Annual Income"
                                                name="annualIncome"
                                                value={values.annualIncome}
                                                onChange={handleInput}
                                                style={{ borderRadius: '5px', padding: '15px', border: '1px solid #ced4da', fontSize: '1.2em', width: '100%' }}
                                                required
                                            />
                                        </div>
                                    </div>
                                )}
                                {step === 4 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        <div style={{ width: '100%', maxWidth: '50%', padding: '0 15px', marginBottom: '20px' }}>
                                            <label htmlFor="loanAmount">Loan Amount</label>
                                            <input
                                                type="number"
                                                placeholder="Loan Amount"
                                                name="loanAmount"
                                                value={values.loanAmount}
                                                onChange={handleInput}
                                                style={{ borderRadius: '5px', padding: '15px', border: '1px solid #ced4da', fontSize: '1.2em', width: '100%' }}
                                                required
                                            />
                                        </div>
                                        <div style={{ width: '100%', maxWidth: '50%', padding: '0 15px', marginBottom: '20px' }}>
                                            <label htmlFor="loanPurpose">Loan Purpose</label>
                                            <input
                                                type="text"
                                                placeholder="Loan Purpose"
                                                name="loanPurpose"
                                                value={values.loanPurpose}
                                                onChange={handleInput}
                                                style={{ borderRadius: '5px', padding: '15px', border: '1px solid #ced4da', fontSize: '1.2em', width: '100%' }}
                                                required
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div style={{ background: '#f8f9fa', padding: '30px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                {step > 1 && (
                                    <button type="button" onClick={prevStep} style={{ background: '#6c757d', border: 'none', padding: '15px 30px', borderRadius: '5px', color: 'white', cursor: 'pointer', fontSize: '1.2em' }}>Back</button>
                                )}
                                {step < 4 ? (
                                    <button type="button" onClick={nextStep} style={{ background: '#FFB347', border: 'none', padding: '15px 30px', borderRadius: '5px', color: 'white', cursor: 'pointer', fontSize: '1.2em' }}>Next</button>
                                ) : (
                                    <button type="submit" style={{ background: '#FFB347', border: 'none', padding: '15px 30px', borderRadius: '5px', color: 'white', cursor: 'pointer', fontSize: '1.2em' }}>Submit</button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ApplyLoans;

