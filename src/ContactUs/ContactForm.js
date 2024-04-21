import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from '../LoginSignup/SignupValidation';
import axios from 'axios'
import footerImg from '../imgs/black&white-logo.png';

import Navbar from '../HeaderNav&Footer/Navbar';


function ContactForm() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        message: ''

    })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();
    const handeInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        setErrors(Validation(values));
    }

    useEffect(() => {
        console.log(errors);

        if (errors.name === "" && errors.email === "") {
            axios.post('http://localhost:8080/contactUs', values)
                .then(res => {
                  window.location.reload();
                })
                .catch(err => console.log(err));
        }
    }, [errors]);


    return (
<>
 <Navbar/>

<div class="contact-us">
<img src={footerImg} class="contactus-img" />

  <div class="contactus-form">
    <form action="" onSubmit={handleSubmit}>  
      <div className="form-group">         
        <label for="usr">Name:</label>
          <input type="text"  name='name' className="form-control" onChange={handeInput}/>
          {errors.name && <span className='text-danger'> {errors.name}</span>} 
      </div>     
          
      <div class="form-group">
        <label for="pwd">Email:</label>
        <input type="email"  name='email' className="form-control" onChange={handeInput}/>
        {errors.email && <span className='text-danger'> {errors.email}</span>}   
      </div>

      <div class="form-group">
        <label for="comment">Comment:</label>
        <textarea class="form-control" rows="5" id="comment" name='message' onChange={handeInput}></textarea>
      </div>

      <button type="submit" className="btn btn-danger btn-lg m-3" style={{ margin: '5px', paddingLeft: '2.5rem', paddingRight: '2.5rem', justifyContent: 'center' }}>Sends</button>
    </form>
  </div>
</div>
</>
    )
}

export default ContactForm