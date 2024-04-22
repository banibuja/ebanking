import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar';
import axios from 'axios';


function AddAcc() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        ratings: '',
        code: '',
        description: '',
       
    });

    const [errors] = useState({});

   
    useEffect(() => {
    }, []);

    const handeInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

   

    const handleSubmit = (event) => {
        event.preventDefault();
        
        console.log(values); 
        
    
        if (Object.keys(errors).length === 0) {
            axios.post('http://localhost:8080/accountsacc', values)
                .then(res => {
                    navigate('/dashboard');
                })
                .catch(err => console.log(err));
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
                                            <h3 className="card-title">Fill All Fields</h3>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="name">Account Category Name</label>
                                                        <input type="text" placeholder='Enter name' name='name' onChange={handeInput} className='form-control roundend-0' />
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="name">Account Category Rates % Per Year</label>
                                                        <input type="text" placeholder='Enter rates' name='ratings' onChange={handeInput} className='form-control roundend-0' />
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="name">Account Category Code</label>
                                                        <input type="text" placeholder='ACC-CAT-' name='code' onChange={handeInput} className='form-control roundend-0' readOnly/>
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="name">Account Category Description </label>
                                                        <input type="text" placeholder='Enter description' name='description' onChange={handeInput} className='form-control roundend-0' />
                                                    </div>
                                                   </div>
                                            </div>
                                            <center>
                                                <div className="card-footer">
                                                    <button type="submit" className="btn btn-success ">Add Acc</button>
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
  )
}
export default AddAcc
