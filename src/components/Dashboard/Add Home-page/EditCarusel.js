import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VerifyLogin from '../VerifyLogin';

function EditCarusel({ id, onClose }) {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        Titulli: '',
        Teksti: '',
        Photo: ''
    });
    VerifyLogin();
    useEffect(() => {
        axios.get(`http://localhost:8080/getCaruselForEdit/${id}`)
            .then(res => {
                const data = res.data;
                setValues({
                    ...data,
                    birthday: formatDate(data.birthday)
                });
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.put(`http://localhost:8080/updateCarusel/${id}`, values)
            .then(res => {
                window.location.reload(); 
            })
            .catch(err => console.log(err));
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
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
        <div className="modal fade show text-black" style={{ display: 'block' }} aria-modal="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Client</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" placeholder='Title' name='Titulli' onChange={handleInput} className='form-control roundend-0'  value={values.Titulli}/>
                            </div>
                            <div className="form-group">
                                <label>Text</label>
                                <input type="text" placeholder='Name' name='Teksti' onChange={handleInput} className='form-control roundend-0' value={values.Teksti} />
                            </div>
                            <div className="form-group">
                                <input type="file" id="profilePicture" placeholder='Teksi' name='Photo' onChange={handleProfilePicture} accept='image/*' hidden/>
                                <label htmlFor="profilePicture" className="btn btn-secondary">Upload new image</label>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCarusel;
