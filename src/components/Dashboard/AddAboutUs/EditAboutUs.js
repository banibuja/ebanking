import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VerifyLogin from '../VerifyLogin';

function EditAboutUs({ id, onClose }) {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        Tittle:'',
        Info: ''
        
    });
    VerifyLogin();
    useEffect(() => {
        axios.get(`http://localhost:8080/getAboutUsEdit/${id}`)
            .then(res => {
                const data = res.data;
                setValues({
                    ...data,
                });
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));

    };

  const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.put(`http://localhost:8080/updateAboutUs/${id}`, values)
            .then(res => {
                window.location.reload(); 
            })
            .catch(err => console.log(err));
    };
    return (
        <div className="modal fade show text-black" style={{ display: 'block' }} aria-modal="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit AboutUs section</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                        <div className="form-group">
                                <label>Tittle</label>
                                <input type="text" placeholder='Name' name='Tittle' onChange={handleInput} className='form-control roundend-0' value={values.Tittle} />
                            </div>
                            <div className="form-group">
                                <label>Text</label>
                                <input type="text" placeholder='Name' name='Info' onChange={handleInput} className='form-control roundend-0' value={values.Info} />
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

export default EditAboutUs;
