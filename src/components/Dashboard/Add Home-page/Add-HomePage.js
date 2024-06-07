import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import axios from 'axios';
import Nav from '../Nav';
import {Table } from 'react-bootstrap';
import EditHomePage from './EditHomePage';

function SaveTransaction() {
    const navigate = useNavigate();
    const [InfoItems, setInfo] = useState([]);
    const [InfoSectionId, setEditInfoId] = useState(null);
    const [values, setValues] = useState({
        Info: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
      fetchInfo();
    }, []);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/insertInfoSection', values);
            if (response.data === 'success') {
              window.location.reload();
            } else {
                console.error('Failed to add goal');
            }
        } catch (error) {
            console.error('Failed to add goal:', error);
        }
    };
    const handleEdit = (id) => {
      setEditInfoId(id);
  };
  const handleCloseEditModal = () => {
    setEditInfoId(null);
};
const fetchInfo = () => {
  axios.get('http://localhost:8080/getInfoSection')
    .then(res => {
      const fetchedInfo = res.data;
      setInfo(fetchedInfo);
    })
    .catch(err => console.log(err));
};

      const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/deleteInfo/${id}`)
            .then(res => {
                if (res.data === 'success') {
                    window.location.reload();
                } else {
                    console.error('Failed to delete carousel item');
                }
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
                                    <h3 className="card-title">Add info section on Home-Page</h3>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="CurrentAccount">Information Section</label>
                                            <input type="text" name='Info' className='form-control rounded-0' onChange={handleInput} value={values.Info}/>
                                        </div>
                                    </div>
                                    <center>
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-success">Add InfoSection</button>
                                        </div>
                                    </center>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                    <div className="col-md-12 d-flex justify-content-center align-items-center">
                      <Table className="table table-hover border-table dataTable no-footer" style={{ width: '100%' }}>
                        <caption>List of Carousel Items</caption>
                        <thead>
                          <tr>
                            <th scope="col">Text</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.isArray(InfoItems) && InfoItems.length > 0 ? (
                           InfoItems.flat().map((item, index) => (
                              <tr key={index}>
                                <td>{item.Info}</td>
                                <td>
                                  <button 
                                      onClick={() => handleEdit(item.InfoSectionId)} 
                                      className="btn btn-primary mr-2">
                                      Edit
                                  </button>
                                  <button 
                                      onClick={() => handleDelete(item.InfoSectionId)} 
                                      className="btn btn-danger">
                                      Delete
                                  </button>
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
            {InfoSectionId !== null && <EditHomePage id={InfoSectionId} onClose={handleCloseEditModal} />}
        </div>
    );
}

export default SaveTransaction;
