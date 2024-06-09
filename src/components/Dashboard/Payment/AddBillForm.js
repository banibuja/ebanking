import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import visa from './visa.png';
import master from './mastercard.png';
import paypal from './paypal.png';
import giropay from './giropay.png';
import ideal from './ideal.png';
import jcb from './jcb.png';

function AddBillForm() {
    const [username, setUsername] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        ServiceType: '',
        Amount: '',
        DueDate: '',
        Status: 'Unpaid'
    });
    const [paymentMethod, setPaymentMethod] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          

            try {
                const clientResponse = await axios.post('http://localhost:8080/getClientforProfile');
                if (clientResponse.data) {
                    const { username } = clientResponse.data;
                    setFormData(prevValues => ({
                        ...prevValues,
                        username: username
                    }));
                }
            } catch (error) {
                console.error('Error fetching client details:', error);
            }
        };

        fetchData();
    }, []);

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
            setFormData({ username, ServiceType: '', Amount: '', DueDate: '', Status: 'Unpaid' }); // Reset form, keep NrPersonal
            setPaymentMethod(''); // Reset payment method
        } catch (error) {
            console.error('Failed to add bill', error);
            setError('Failed to add bill. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {!paymentMethod ? (
                <div style={{ width: '100%', maxWidth: '1000px', backgroundColor: '#ffffff', padding: '80px', borderRadius: '25px', boxShadow: '0 10px 20px rgba(0,0,0,0.3)', color: '#333' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '50px', color: '#333', fontSize: '34px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>How would you like to pay?</h2>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '50px', flexWrap: 'wrap' }}>
                        {[
                            { src: visa, alt: "Visa", bgColor: 'white' },
                            { src: master, alt: "MasterCard", bgColor: 'white' },
                            { src: paypal, alt: "PayPal", bgColor: 'white' },
                            { src: giropay, alt: "GiroPay", bgColor: 'white' },
                            { src: ideal, alt: "iDEAL", bgColor: 'white' },
                            { src: jcb, alt: "JCB", bgColor: 'white' }
                        ].map((payment, index) => (
                            <div key={index} style={{
                                margin: '10px',
                                padding: '20px',
                                textAlign: 'center',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                cursor: 'pointer',
                                backgroundColor: payment.bgColor,
                                color: '#ffffff',
                                borderRadius: '15px',
                                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4)',
                                width: '160px',
                                height: '100px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                    boxShadow: '0 8px 16px rgba(212, 175, 55, 0.6)'
                                }
                            }}>
                                <img src={payment.src} alt={payment.alt} style={{ width: '80px', height: '80px' }} onClick={() => handlePaymentMethodChange(payment.alt)} />
                            </div>
                        ))}
                    </div>
                </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px', backgroundColor: '#ffffff', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.15)', color: '#333' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333', fontSize: '24px' }}>Add New Bill</h2>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', fontSize: '16px' }}>Nr personal:</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="NrPersonal"
                                required
                                style={{ width: '100%', padding: '12px', margin: '5px 0', border: '1px solid #ccc', borderRadius: '5px' }}
                                readOnly
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
