import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import axios from 'axios';
import Nav from '../Nav';

function AddCarusel() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        Titulli: '',
        Teksti: '',
        Photo: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
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
                navigate('/dashboard'); 
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
                </div>
            </main>
        </div>
    );
}

export default AddCarusel;
