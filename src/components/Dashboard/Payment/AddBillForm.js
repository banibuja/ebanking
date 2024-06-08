import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';

function AddBillForm() {
    const [formData, setFormData] = useState({
        UserID: '',
        ServiceType: '',
        Amount: '',
        DueDate: '',
        Status: 'Unpaid'
    });
    const [paymentMethod, setPaymentMethod] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        try {
            await axios.post('http://localhost:8080/AddBillForm', formData);
            alert('Bill added successfully!');
            setFormData({ UserID: '', ServiceType: '', Amount: '', DueDate: '', Status: 'Unpaid' }); // Reset form
            setPaymentMethod(''); // Reset payment method
        } catch (error) {
            console.error('Failed to add bill', error);
            setError('Failed to add bill. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
            <Sidebar />
            <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {!paymentMethod ? (
                    <div style={{ width: '100%', maxWidth: '600px', backgroundColor: '#ffffff', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.15)', color: '#333' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333', fontSize: '24px' }}>How would you like to pay?</h2>
                        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                            <img src="/Payment/visa.png" alt="Visa" style={{ cursor: 'pointer', width: '50px', height: '50px' }} onClick={() => handlePaymentMethodChange('Visa')} />
                            <img src="/Payment/mastercard.png" alt="MasterCard" style={{ cursor: 'pointer', width: '50px', height: '50px' }} onClick={() => handlePaymentMethodChange('MasterCard')} />
                            <img src="/Payment/paypal.png" alt="PayPal" style={{ cursor: 'pointer', width: '50px', height: '50px' }} onClick={() => handlePaymentMethodChange('PayPal')} />
                            <img src="/Payment/giropay.png" alt="GiroPay" style={{ cursor: 'pointer', width: '50px', height: '50px' }} onClick={() => handlePaymentMethodChange('GiroPay')} />
                            <img src="/Payment/ideal.png" alt="iDEAL" style={{ cursor: 'pointer', width: '50px', height: '50px' }} onClick={() => handlePaymentMethodChange('iDEAL')} />
                            <img src="/Payment/jcb.png" alt="JCB" style={{ cursor: 'pointer', width: '50px', height: '50px' }} onClick={() => handlePaymentMethodChange('JCB')} />
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px', backgroundColor: '#ffffff', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.15)', color: '#333' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333', fontSize: '24px' }}>Add New Bill</h2>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', fontSize: '16px' }}> Nr personal:</label>
                            <input
                                type="number"
                                name="UserID"
                                value={formData.UserID}
                                onChange={handleChange}
                                placeholder="User ID"
                                required
                                style={{ width: '100%', padding: '12px', margin: '5px 0', border: '1px solid #ccc', borderRadius: '5px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', fontSize: '16px' }}>Service Type:</label>
                            <select
                                name="ServiceType"
                                value={formData.ServiceType}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '12px', margin: '5px 0', border: '1px solid #ccc', borderRadius: '5px' }}
                            >
                                <option value="">Select Service</option>
                                <option value="water">Water</option>
                                <option value="electricity">Electricity</option>
                                <option value="telephone">Telephone</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', fontSize: '16px' }}>Amount:</label>
                            <input
                                type="number"
                                name="Amount"
                                value={formData.Amount}
                                onChange={handleChange}
                                placeholder="Amount"
                                required
                                style={{ width: '100%', padding: '12px', margin: '5px 0', border: '1px solid #ccc', borderRadius: '5px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', fontSize: '16px' }}>Due Date:</label>
                            <input
                                type="date"
                                name="DueDate"
                                value={formData.DueDate}
                                onChange={handleChange}
                                placeholder="Due Date"
                                required
                                style={{ width: '100%', padding: '12px', margin: '5px 0', border: '1px solid #ccc', borderRadius: '5px' }}
                            />
                        </div>
                        <button type="submit" style={{ width: '100%', padding: '15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', transition: 'background-color 0.3s' }}>Add Bill</button>
                        {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
                    </form>
                )}
            </div>
        </div>
    );
}

export default AddBillForm;
