import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import axios from 'axios';


export const Transaction = () => {
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

        useEffect(() => {
            fetchCards();
            axios.get('http://localhost:8080')
            .then(res => {
              if (res.data.valid) {
                setUserId(res.data.uId); 
              } else {
                navigate('/login');
              }
            })
            .catch(err => console.log(err))
        }, []);
    
       const fetchCards = async () => {
        try{
            const response = await fetch(`http://localhost:8080/getCardsByUserId/${userId}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data); // Set user data to state
            } else {
                console.error('Failed to fetch user data');
            }
        }catch (error) {
            console.error('Error fetching user data:', error);
        }
       };

  return (

      
          <div>
              <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white', color: 'black' }}>
                  <Sidebar />
                  <div className="content-wrapper" style={{ marginRight: '100px' }}>
                      <section className="content">
                          <div className="container-fluid">
                              <div className="row">
                                  <div className="col-md-12">
                                      <div className="card card-purple">
                                          <div className="card-header">
                                              <h3 className="card-title">Interbank Money Transfer</h3>
                                          </div>
                                          <form>
                                              <div className="card-body">
                                                  <div className="row">
                                                      <div className="col-md-6 form-group">
                                                          <label htmlFor="name">Contributor Account</label>
                                                         
                                                      </div>
                                                      <div className="col-md-6 form-group">
                                                          <label htmlFor="name">Client Name</label>
                                                          <input type="text" placeholder='Name' name='name' className='form-control roundend-0' />

                                                      </div>
                                                      <div className="col-md-6 form-group">
                                                          <label htmlFor="name">Client Lastname</label>
                                                          <input type="text" placeholder='Lastname' name='lastname' className='form-control roundend-0' />

                                                      </div>
                                                      <div className="col-md-6 form-group">
                                                          <label htmlFor="name">Client Email</label>
                                                          <input type="email" placeholder='Email' name='email' className='form-control roundend-0' />


                                                      </div>
                                                      <div className="col-md-6 form-group">
                                                          <label htmlFor="name">Client Password</label>
                                                          <input type="password" placeholder='Password' name='password' className='form-control roundend-0' />

                                                      </div>
                                                      <div className="col-md-6 form-group">
                                                          <label htmlFor="gender">Client Gender</label>
                                                          <select name="gender" className="form-control rounded-0">
                                                              <option value="">Select Gender</option>
                                                              <option value="M">Male</option>
                                                              <option value="F">Female</option>
                                                          </select>

                                                      </div>
                                                      <div className="col-md-6 form-group">
                                                          <input type="date" name='birthday' className="form-control form-control-lg" placeholder="Birthdate" />
                                                      </div>
                                                      <div className="col-md-6 form-group">
                                                          <label htmlFor="name">Client Address</label>
                                                          <input type="text" placeholder='Country' name='Country' className='form-control roundend-0' />
                                                          <input type="text" placeholder='City' name='City' className='form-control roundend-0' />
                                                          <input type="text" placeholder='Street' name='Street' className='form-control roundend-0' />
                                                      </div>
                                                  </div>
                                              </div>
                                              <center>
                                                  <div className="card-footer">
                                                      <button type="submit" className="btn btn-success ">Add Client</button>
                                                  </div>
                                              </center>
                                          </form>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </section>
                  </div>
              </main>
          </div>
  );
}

export default Transaction;