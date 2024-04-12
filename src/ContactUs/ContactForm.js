import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from '../LoginSignup/SignupValidation';
import axios from 'axios'




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


        <div>
           

            <section className="vh-100">
      <div className="contact">
        <div className="right-side">
          <form action="" onSubmit={handleSubmit}>           
             <div className="h1 ">Contact Us</div> <br />
             <p className='m-3s'>If you have any work from me or any types of queries related to my tutorial, you can send me a message from here. It's my pleasure to help you.</p>
              <div className="input-box">
                <input type="text"  name='name' className="form-control form-control-lg m-3" placeholder="Your first name"
                onChange={handeInput}  />
                {errors.name && <span className='text-danger'> {errors.name}</span>} 
                 
                

              <div className="input-box">
                <input type="email"  name='email' className="form-control form-control-lg m-3" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} placeholder="Enter a valid email address" 
                   onChange={handeInput}  />
                   {errors.email && <span className='text-danger'> {errors.email}</span>} 
                  
              </div>

              <div className="input-box message-box">
              <input type="text"  name='message' className="form-control form-control-lg m-3" placeholder="Message"
                onChange={handeInput}  />
                 

              </div>
               
              </div>
             
              
              <div className="text-center text-lg-start mt-4 pt-2">
              <button type="submit" className="btn btn-danger btn-lg m-3" style={{ margin: '5px', paddingLeft: '2.5rem', paddingRight: '2.5rem', justifyContent: 'center' }}>Sends</button>
               </div>
             
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
              </div>
            </form>
          </div>
          
        </div>
      
    </section>
    </div>
    )
}

export default ContactForm