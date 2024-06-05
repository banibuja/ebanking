import React, { useRef, useState } from "react";
import axios from 'axios';
import Navbar from '../../Layout/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import elsaaImage from './elsaa.png'; // Importoni imazhin nëse është në të njëjtin direktori

const Contact = () => {
    const form = useRef();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [values, setValues] = useState({
        name: '',
        email: '',
        message: ''
    });

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
            await axios.post('http://localhost:8080/sendEmailContactUs', { name, email, message })
            .then(() => {

                console.log('Email sent successfully');
                setIsSubmitted(true)
            }
            )
                .catch(error => console.log(error))
        } catch (error) {
            console.error('Error sending email', error);
        }
    };

    return (
        <>
            <Navbar />                             
            <div className="container mt-5" style={{ background: 'linear-gradient(to right, black, #EDC14A)', padding: '50px', borderRadius: '15px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}>
                <h2 className="text-center mb-4" style={{ fontSize: '32px', fontWeight: '700', color: '#fff' }}>Contact us</h2>
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-6 text-center mb-4">
                        <img src={elsaaImage} alt="Bank Image" className="img-fluid mb-3" style={{ maxWidth: '80%', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1) ' }} />
                        <p style={{ fontSize: '16px', color: '#fff' }}>
                            "Welcome to our e-banking platform, where convenience and security are our top priorities. We are here to provide you with fast and reliable financial services, anytime and anywhere!"
                        </p>
                    </div>
                    <div className="col-lg-6">
                        <form ref={form} onSubmit={sendEmail} className="card card-body shadow p-4" style={{ backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #ddd' }}>
                            <div className="mb-3">
                                <input type="text" name="name" className="form-control" onChange={handleChange} placeholder="Name" style={{ borderRadius: '25px', padding: '10px 20px', fontSize: '16px', border: '1px solid #ddd' }} />
                            </div>
                            <div className="mb-3">
                                <input type="email" name="email" className="form-control" onChange={handleChange} placeholder="Email" style={{ borderRadius: '25px', padding: '10px 20px', fontSize: '16px', border: '1px solid #ddd' }} />
                            </div>
                            <div className="mb-3">
                                <textarea className="form-control" rows="5" id="message" name="message" onChange={handleChange} placeholder="Message" style={{ borderRadius: '25px', padding: '10px 20px', fontSize: '16px', border: '1px solid #ddd' }}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#ff6b6b', border: 'none', borderRadius: '25px', fontSize: '18px', padding: '10px 20px' }}>Contact us now</button>
                            {isSubmitted && <p className="text-success text-center mt-2">Your message has been sent successfully!</p>}
                        </form>
                    </div>
                </div>
                {/*<div className="row mt-5">
                    <div className="col-lg-4 text-center mb-4">
                        <div className="card card-body shadow p-4 bounce card-style">
                            <h5>Apply</h5>
                           
                        </div>
                    </div>
                    <div className="col-lg-4 text-center mb-4">
                        <div className="card card-body shadow p-4 bounce card-style">
                            <h5>Email</h5>
                           
                        </div>
                    </div>
                    <div className="col-lg-4 text-center mb-4">
                        <div className="card card-body shadow p-4 bounce card-style">
                            <h5>Phone</h5>
                           
    </div>
                    </div>
    </div>*/}
            </div>
        </>
    );
}

export default Contact;
