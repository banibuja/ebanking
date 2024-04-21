import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../LoginSignup/SignupValidation';
import axios from 'axios';
import footerImg from '../imgs/black&white-logo.png';
import Navbar from '../HeaderNav&Footer/Navbar';

function ContactForm() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false); 
    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setErrors(Validation(values));
    };

    useEffect(() => {
        console.log(errors);

        if (errors.name === "" && errors.email === "") {
            axios.post('http://localhost:8080/contactUs', values)
                .then(res => {
                    setIsSubmitted(true); 
                    setValues({ name: '', email: '', message: '' }); 
                })
                .catch(err => console.log(err));
        }
    }, [errors]);

    return (
        <>

            <Navbar />
            <div className="contact-us">
                <img src={footerImg} className="contactus-img" />
                <div className="contactus-form ">
                    <form action="" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="usr">Name:</label>
                            <input type="text" name='name' className="form-control" onChange={handleInput} value={values.name} />
                            {errors.name && <span className='text-danger'> {errors.name}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Email:</label>
                            <input type="email" name='email' className="form-control" onChange={handleInput} value={values.email} />
                            {errors.email && <span className='text-danger'> {errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="comment">Comment:</label>
                            <textarea className="form-control" rows="5" id="comment" name='message' onChange={handleInput} value={values.message}></textarea>
                        </div>
                        <button type="submit" className="btn btn-danger btn-lg m-3" style={{ margin: '5px', paddingLeft: '2.5rem', paddingRight: '2.5rem', justifyContent: 'center' }}>Send</button>
                        {isSubmitted && <p className="text-success">Message sent successfully!</p>} 
                    </form>
                </div>
            </div>
        </>
    );
}

export default ContactForm;
