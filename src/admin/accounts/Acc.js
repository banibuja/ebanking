import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Dashboard/Sidebar';

export const Acc = () => {
    const [users, setUsers] = useState([]);
    const [numAcc, setNumClients] = useState(0);

    useEffect(() => {
        getAcc();
    }, []);

    const getAcc = () => {
        axios.post('http://localhost:8080/getAcc')
            .then(res => {
                const fetchedUsers = res.data;
                setUsers(fetchedUsers);
                setNumClients(fetchedUsers.length);
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/deleteAcc/${id}`)
            .then(res => {
                getAcc();
            })
            .catch(err => console.log(err));
    };

    // const handleEdit = (id) => {
    //     setEditClientId(id); 
    // };

    // const handleCloseEditModal = () => {
    //     setEditClientId(null); 
    // };

    return (
        <div>
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white', color: 'black' }}>
                <Sidebar />
                <div className="container-fluid" style={{  marginTop: '100px' }} >

                    <h1 className=''>MANAGE Acc</h1>

                    <div className="row">
                    <caption>List of Account categories</caption>

                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                        <table className="table table-hover table-bordered table-striped dataTable no-footer" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Rate</th>
                                        <th scope="col">Code</th>
                                        <th scope="col">Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(users) && users.map((item, index) => (
                                        <tr key={item.id}>
                                            <th scope="row">
                                                {item.id}</th>
                                            <td>{item.name }</td>
                                            <td>{item.ratings}  %</td>
                                            <td>{item.code}</td>
                                            <td>
                                                <button onClick={() => handleDelete(item.id)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div><div>Total Acc: {numAcc}</div> 
                </div>
            </main>
            {/* {editClientId !== null && <EditAcc id={editClientId} onClose={handleCloseEditModal} />} */}
        </div>
    )
}
export default Acc