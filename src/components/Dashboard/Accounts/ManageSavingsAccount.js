import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
 import EditSavings from './EditSavings';


export const ManageSavingsAccounts = () => {
    const [mess, setMess] = useState([]);
    const [numMess, setNumMess] = useState(0); 
    const [editSavings, setEditSavingsId] = useState(null); 


    useEffect(() => {
        getMess();
    }, []);

    const navigate = useNavigate();

    const getMess = () => {
        axios.post('http://localhost:8080/getSavings')
            .then(res => {
                const fetchedMess = res.data;
                setMess(fetchedMess);
                setNumMess(fetchedMess.length); 
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/deleteSavings/${id}`)
            .then(res => {
                getMess();
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (id) => {
        setEditSavingsId(id); 
    };

    const handleCloseEditModal = () => {
        setEditSavingsId(null); 
    };

    return (
        <div> 
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white', color: 'black' }}>
                <Sidebar />

                <div className="container-fluid " style={{  marginTop: '100px' }} >
                <h1 className="text-center">MANAGE Current Accounts</h1>
                    <div className="row">
                        <caption>List of Messages</caption>
                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                            <table className="table table-hover table-bordered table-striped dataTable no-footer" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">SavingsID</th>
                                        <th scope="col">UserID</th>
                                        <th scope="col">FlexSaveAccount</th>
                                        <th scope="col">Balance</th> 
                                        <th scope="col">Action</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(mess) && mess.map((item, index) => (
                                        <tr key={item.SavingsID}>
                                            <th scope="row">{item.SavingsID}</th> 
                                            <td>{item.UserID}</td>
                                            <td>{item.SavingsType}</td>
                                            <td>{parseFloat(item.Balance).toFixed(3)}</td> 
                                            <td>
                                            <button onClick={() => handleEdit(item.SavingsID)} className="btn btn-primary mr-2">Edit</button>
                                                <button onClick={() => handleDelete(item.SavingsID)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>Total message: {numMess}</div> 
                    {editSavings !== null && <EditSavings id={editSavings} onClose={handleCloseEditModal} />}

                </div>
            </main>
        </div>
    )
}

export default ManageSavingsAccounts;