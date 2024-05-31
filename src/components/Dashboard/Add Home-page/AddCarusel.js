import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import axios from 'axios';
import Nav from '../Nav';
import { Buffer } from 'buffer';
import {Table } from 'react-bootstrap';
import EditCarusel from './EditCarusel';

function AddCarusel() {
    const navigate = useNavigate();
    const [carouselItems, setCarouselItems] = useState([]);
    const [numClients, setNumClients] = useState(0);
    const [editClientId, setEditClientId] = useState(null);
    const [values, setValues] = useState({
        Titulli: '',
        Teksti: '',
        Photo: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchCarouselItems();
    }, []);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/insertCarusel', values);
            if (response.data === 'success') {
                navigate('/AddCarusel'); 
            } else {
                console.error('Failed to add goal');
            }
        } catch (error) {
            console.error('Failed to add goal:', error);
        }
    };

    const handleProfilePicture = (e) => {
        const image = e.target.files[0];
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValues(prev => ({ ...prev, Photo: reader.result }));
            }
            reader.readAsDataURL(image);
        }
    }
    const fetchCarouselItems = () => {
        axios.post('http://localhost:8080/getCarusel')
          .then(res => {
            const items = res.data;
            console.log(items);
            const processedItems = items.map(item => {
              const base64Image = Buffer.from(item.Photo.data).toString();
              const imageSrc = `${base64Image}`;
              return { ...item, Photo: imageSrc };
            });
            setCarouselItems(processedItems);
          })
          .catch(err => console.log(err));
      };
      const handleEdit = (id) => {
        setEditClientId(id);
    };

    const handleCloseEditModal = () => {
        setEditClientId(null);
    };

    const handleDelete = (id) => {
      axios.delete(`http://localhost:8080/deleteCarusel/${id}`)
          .then(res => {
            fetchCarouselItems();
            window.location.reload();
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
                                            <label htmlFor="Titulli">Title</label>
                                            <input type="text" name='Titulli' className='form-control rounded-0' onChange={handleInput} value={values.Titulli}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Teksti">Paragraph</label>
                                            <input type="text" name='Teksti' className='form-control rounded-0' onChange={handleInput} value={values.Teksti}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="file" id="profilePicture" onChange={handleProfilePicture} accept='image/*' hidden />
                                            <label htmlFor="profilePicture" className="btn btn-secondary">Upload new image</label>
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
                            <th scope="col">Photo</th>
                            <th scope="col">Title</th>
                            <th scope="col">Text</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.isArray(carouselItems) && carouselItems.length > 0 ? (
                            carouselItems.flat().map((item, index) => (
                              <tr key={index}>
                                <td>
                                  <img src={item.Photo} alt="Carousel Item" className='carusel-img'/>
                                </td>
                                <td>{item.Titulli}</td>
                                <td>{item.Teksti}</td>
                                <td>
                                  <button 
                                      onClick={() => handleEdit(item.CaruselId)} 
                                      className="btn btn-primary mr-2">
                                      Edit
                                  </button>
                                  <button 
                                      onClick={() => handleDelete(item.CaruselId)} 
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
            {editClientId !== null && <EditCarusel id={editClientId} onClose={handleCloseEditModal} />}
        </div>
    );
}

export default AddCarusel;
