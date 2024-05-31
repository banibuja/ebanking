import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import axios from 'axios';
import Nav from '../Nav';
import {Table } from 'react-bootstrap';


function AddAboutUs() {
    const navigate = useNavigate();
    const [AboutUsItems, setAboutUsItems] = useState([]);


    const [values, setValues] = useState({
        Tittle: '',
        Info: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchAboutUslItems();
    }, []);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/insertAboutUs', values);
            if (response.data === 'success') {
                navigate('/AddAboutUs'); 
            } else {
                console.error('Failed to add about us');
            }
        } catch (error) {
            console.error('Failed to add about us:', error);
        }
    };
    
      const fetchAboutUslItems = () => {
        axios.post('http://localhost:8080/getAboutUs')
          .then(res => {
            const items = res.data;
            console.log(items);
            const processedItems = items.map(item => {
              return { ...item};
            });
            setAboutUsItems(processedItems);

          })
          .catch(err => console.log(err));
      };

    return (
        <div>
            <main className="d-flex min-vh-100 bg-light text-dark">
                <Sidebar />
                <div className="container-fluid mt-4">
                    <Nav />
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-purple">
                                <div className="card-header">
                                    <h3 className="card-Tittle">Add AboutUs</h3>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="CurrentAccount">Tittle</label>
                                            <input type="text" name='Tittle' className='form-control rounded-0' onChange={handleInput} value={values.Tittle}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="CurrentAccount">Information Section</label>
                                            <input type="text" name='Info' className='form-control rounded-0' onChange={handleInput} value={values.Info}/>
                                        </div>
                                    </div>
                                    <center>
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-success">Add</button>
                                        </div>
                                    </center>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                    <div className="col-md-12 d-flex justify-content-center align-items-center">
                      <Table className="table table-hover border-table dataTable no-footer" style={{ width: '100%' }}>
                        <caption>List of AboutUs Items</caption>
                        <thead>
                          <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Text</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.isArray(AboutUsItems) && AboutUsItems.length > 0 ? (
                            AboutUsItems.flat().map((item, index) => (
                              <tr key={index}>
                                <td>{item.Tittle}</td>
                                <td>{item.Text}</td>
                                <td>
                                  {/* <button 
                                      onClick={() => handleEdit(item.CaruselId)} 
                                      className="btn btn-primary mr-2">
                                      Edit
                                  </button>
                                  <button 
                                      onClick={() => handleDelete(item.CaruselId)} 
                                      className="btn btn-danger">
                                      Delete
                                  </button> */}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3" className="text-center">No items found</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                    </div>
            </main>
        </div>
    );
}

export default AddAboutUs;
