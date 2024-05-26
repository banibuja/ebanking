import React, { useRef, useState } from "react";
import axios from 'axios';
import footerImg from '../../../imgs/black&white-logo.png';
import Navbar from '../../Layout/Navbar';
import VerifyLogin from '../VerifyLogin';

const Contact = () => {
    const form = useRef();
    const [isSubmitted, setIsSubmitted] = useState(false); 
    const [values, setValues] = useState({
        name: '',
        email: '',
        message: ''
    });
    VerifyLogin();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const sendEmail = async (e) => {
        e.preventDefault();
    
        const { name, email, message } = values;
    
        try {
            await axios.post('http://localhost:8080/sendEmailContactUs', { name, email, message });
            console.log('Email sent successfully');
            setIsSubmitted(true);
            // sendEmail(values.name, values.email, values.message);

        } catch (error) {
            console.error('Error sending email', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="contact-us">
                <img src={footerImg} className="contactus-img" />
                <div className="contactus-form ">
                    <form ref={form} onSubmit={sendEmail}>
                        <div className="form-group">
                            <label htmlFor="from_name">Name:</label>
                            <input type="text" name="name" className="form-control" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="from_email">Email:</label>
                            <input type="email" name="email" className="form-control" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message:</label>
                            <textarea className="form-control" rows="5" id="message" name="message" onChange={handleChange}></textarea>
                        </div>
                        
                        <button type="submit" className="btn btn-danger btn-lg m-3">Send</button>
                        {isSubmitted && <p className="text-success">Message sent successfully!</p>} 
                    </form>
                </div>
            </div>
        </>
    );
}

export default Contact;
