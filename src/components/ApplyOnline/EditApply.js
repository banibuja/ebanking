import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Buffer } from 'buffer';
                

function EditApply({ id, onClose }) {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        name: '',
        lastname: '',
        email: '',
        password: '',
        gender: '',
        birthday: '',
        Country: '',
        City: '',
        Street: '',
        frontPhoto: '',
        backPhoto: ''
    });
    

    useEffect(() => {
        axios.get(`http://localhost:8080/getApplicantForEdit/${id}`)
            .then(res => {
                const data = res.data;
                console.log(res.data);
                let fetchedFront = data.frontPhoto;
                let bufferredimageFront = Buffer.from(fetchedFront);
                let fetchBack = data.backPhoto;
                let bufferredimageBack = Buffer.from(fetchBack);
                setValues({
                    ...data,
                    birthday: formatDate(data.birthday),
                    frontPhoto: bufferredimageFront.toString(),
                    backPhoto: bufferredimageBack.toString()


                });
              
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.put(`http://localhost:8080/updateAplicant/${id}`, { values })
            .then(res => {
                window.location.reload(); 
            })
            .catch(err => console.log(err));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    };

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
                                <label>Client NrPersonal</label>
                                <input type="text" placeholder='Username' name='username' onChange={handleInput} className='form-control roundend-0' value={values.username} />
                            </div>
                            <div className="form-group">
                                <label>Client Name</label>
                                <input type="text" placeholder='Name' name='name' onChange={handleInput} className='form-control roundend-0' value={values.name} />
                            </div>
                            <div className="form-group">
                                <label>Client Lastname</label>
                                <input type="text" placeholder='Lastname' name='lastname' onChange={handleInput} className='form-control roundend-0' value={values.lastname} />
                            </div>
                            <div className="form-group">
                                <label>Client Email</label>
                                <input type="email" placeholder='Email' name='email' onChange={handleInput} className='form-control roundend-0' value={values.email} />
                            </div>
                            <div className="form-group">
                                <label>Client Gender</label>
                                <select name="gender" onChange={handleInput} value={values.gender} className="form-control rounded-0">
                                    <option value="">Select Gender</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Client Birthday</label>
                                <input type="text" name='birthday' onChange={handleInput} className="form-control form-control-lg" value={values.birthday} />
                            </div>
                            <div className="form-group">
                                <label>Client Address</label>
                                <input type="text" placeholder='Country' name='Country' onChange={handleInput} className='form-control roundend-0' value={values.Country} />
                                <input type="text" placeholder='City' name='City' onChange={handleInput} className='form-control roundend-0' value={values.City} />
                                <input type="text" placeholder='Street' name='Street' onChange={handleInput} className='form-control roundend-0' value={values.Street} />
                            </div>
                            {values.frontPhoto && (
                                <div className="form-group">
                                    <label>Front ID Photo</label>
                                    <div>
                                        <img src={values.frontPhoto} alt="Front ID" style={{ width: '100%', maxHeight: '300px' }} />
                                    </div>
                                </div>
                            )}
                            {values.backPhoto && (
                                <div className="form-group">
                                    <label>Back ID Photo</label>
                                    <div>
                                        <img src={values.backPhoto} alt="Back ID" style={{ width: '100%', maxHeight: '300px' }} />
                                    </div>
                                </div>
                            )}
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

export default EditApply;
