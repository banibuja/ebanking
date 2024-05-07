import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../LoginSignup/SignupValidation';
import axios from 'axios';
import footerImg from '../imgs/black&white-logo.png';
import Navbar from '../HeaderNav&Footer/Navbar';

function ContactForm() {
    const [values, setValues] = useState({
        Subject: '',
        Message: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false); 
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8080/')
            .then(res => {
                if (!res.data.valid) {
                    alert("You need to log in to send a message");
                    navigate('/login'); 
                }
            })
            .catch(err => console.log(err));
    }, []); 

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setErrors(Validation(values));
        // Kontrollojme nëse ka gabime në formën, nese jo atehere dërgojmë mesazhin
        if (!errors.Subject) {
            axios.post('http://localhost:8080/contactUs', values)
                .then(res => {
                    setIsSubmitted(true); 
                    setValues({  Subject: '', Message: '' }); 
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <>
            <Navbar />
            <div className="contact-us">
                <img src={footerImg} className="contactus-img" />
                <div className="contactus-form ">
                    <form action="" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="usr">Subject:</label>
                            <input type="text" name='Subject' className="form-control" onChange={handleInput} value={values.name} />
                            {errors.Subject && <span className='text-danger'> {errors.Subject}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="comment">Message:</label>
                            <textarea className="form-control" rows="5" id="comment" name='Message' onChange={handleInput} value={values.message}></textarea>
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
