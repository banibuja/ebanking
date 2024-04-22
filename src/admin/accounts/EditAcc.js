import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Sidebar from '../Dashboard/Sidebar';

function EditAcc({id, onClose}) {

    const navigate =  useNavigate();

     const [values, setValues] = useState({
        name: '',
        ratings: '',
});

const [errors] = useState({});

useEffect(() => {
    axios.get(`http://localhost:8080/getAcc/${id}`)
    .then(res => {
        setValues(res.data);
    })
    .catch(err => console.log(err));
}, [id]);

const handeInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.name}));
}

const handleSubmit = (event) => {
    event.preventDefault();

    if(Object.keys(errors).length === 0){
        axios.put(`http://localhost:8080/updateAcc/${id}`, values)
        .then(res => {
            navigate('/dashboard');
        })
        .catch(err => console.log(err));
    }
    
}







  return (
    <div className="modal fade show" style={{ display: 'block' }} aria-modal="true">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Edit Acc</h5>
                <button type="button" className="close" onClick={onClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                        <label>Name</label>
                        <input type="text" placeholder='Enter name' name='name' onChange={handeInput} className='form-control roundend-0'  />
                                                    </div>

                    <div className="form-group">
                        <label>Ratings</label>
                        <input type="text" placeholder='Enter ratings' name='ratings' onChange={handeInput} className='form-control roundend-0' />
                                               
                       
                                                                       </div>                        

                                       </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
            </div>
        </div>
    </div>
</div>
);
};
export default EditAcc