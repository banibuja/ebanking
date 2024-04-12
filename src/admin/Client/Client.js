import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Dashboard/Sidebar';
import EditClient from './EditClient'; 

export const Client = () => {
    const [users, setUsers] = useState([]);
    const [numClients, setNumClients] = useState(0);
    const [editClientId, setEditClientId] = useState(null); 

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        axios.post('http://localhost:8080/getUsers')
            .then(res => {
                const fetchedUsers = res.data;
                setUsers(fetchedUsers);
                setNumClients(fetchedUsers.length);
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/deleteUsers/${id}`)
            .then(res => {
                getUsers();
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (id) => {
        setEditClientId(id); 
    };

    const handleCloseEditModal = () => {
        setEditClientId(null); 
    };

    return (
        <div>
            <main style={{ display: 'flex', minHeight: '100vh' }}>
                <Sidebar />
                <div className="container-fluid" style={{  marginTop: '100px' }} >

                    <h1 className=''>MANAGE Client</h1>

                    <div className="row">
                    <caption>List of client</caption>

                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                        <table className="table table-hover table-bordered table-striped dataTable no-footer" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Emri</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Birthday</th>
                                        <th scope="col">banknumber</th>
                                        <th scope="col">Gender</th>
                                        <th scope="col">PhoneNumber</th>
                                        <th scope="col">Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(users) && users.map((item, index) => (
                                        <tr key={item.id}>
                                            <th scope="row">
                                                {item.id}</th>
                                            <td>{item.name + ' ' + item.lastname}</td>
                                            <td>{item.email}</td>
                                            <td>{item.dateb}</td>
                                            <td>{item.banknumber}</td>
                                            <td>{item.gender}</td>
                                            <td>{item.phonenumber}</td>
                                            <td>
                                                <button onClick={() => handleEdit(item.id)} className="btn btn-primary mr-2">Edit</button>
                                                <button onClick={() => handleDelete(item.id)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div><div>Total Client: {numClients}</div> 
                </div>
            </main>
            {editClientId !== null && <EditClient id={editClientId} onClose={handleCloseEditModal} />}
        </div>
    )
}
