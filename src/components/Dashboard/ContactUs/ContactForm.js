import React, { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import footerImg from '../../../imgs/black&white-logo.png';
import Navbar from '../../Layout/Navbar';

const Contact = () => {
    const form = useRef();
    const [isSubmitted, setIsSubmitted] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:8080/')
            .then(res => {
                if (!res.data.valid) {
                    alert("You need to log in to send a message");
                    navigate('/login'); 
                }
            })
            .catch(err => console.log(err));
    }, [navigate]); 

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_3op3a8c",
                "template_58kosfr",
                form.current,
                "c1JG3-cDGVIkBDuNN"
            )
            .then(
                (result) => {
                    console.log(result.text);
                    console.log("message sent");
                    setIsSubmitted(true);
                },
                (error) => {
                    console.log(error.text);
                }
            );
    };

    return (
        <>
            <Navbar />
            <div className="contact-us">
                <img src={footerImg} className="contactus-img" />
                <div className="contactus-form ">
                    <form ref={form} onSubmit={sendEmail}>
                        <div className="form-group">
                            <label htmlFor="usr">Name:</label>
                            <input type="text" name='from_name' className="form-control"  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="usr">Email:</label>
                            <input type="email" name='from_email' className="form-control"  />
                        </div>
                        <div className="form-group">
                            <label htmlFor="comment">Message:</label>
                            <textarea className="form-control" rows="5" id="comment" name='message'></textarea>
                        </div>
                        
                        <button type="submit" className="btn btn-danger btn-lg m-3" value="Send" style={{ margin: '5px', paddingLeft: '2.5rem', paddingRight: '2.5rem', justifyContent: 'center' }}>Send</button>
                        {isSubmitted && <p className="text-success">Message sent successfully!</p>} 

                    </form>
                </div>
            </div>
        </>
    );
}

export default Contact;
