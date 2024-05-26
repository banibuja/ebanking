import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import EditClient from './EditClient';
import Nav from '../Nav';
import VerifyLogin from '../VerifyLogin';

export const Client = () => {
    const [users, setUsers] = useState([]);
    const [numClients, setNumClients] = useState(0);
    const [editClientId, setEditClientId] = useState(null);
    const [recordsPerPage, setRecordsPerPage] = useState(10); 
    const [showAll, setShowAll] = useState(false);
    const [searchUserID, setSearchUserID] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    VerifyLogin();
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
            .catch(err => {
                console.error('Error fetching users:', err);
                setUsers([]); 
                setNumClients(0);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/deleteClient/${id}`)
            .then(res => {
                getUsers();
                // window.location.reload(); 

            })
            .catch(err => console.log(err));
    };

    const handleEdit = (id) => {
        setEditClientId(id);
    };

    const handleCloseEditModal = () => {
        setEditClientId(null);
    };

    const handleChangeRecordsPerPage = (value) => {
        setRecordsPerPage(value);
        setShowAll(false);
    };

    const handleShowAll = () => {
        setShowAll(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    };

    const handleSearch = () => {
        if (searchUserID.trim() === '') {
            return;
        }
        axios.post('http://localhost:8080/searchUsers', { username: searchUserID })
            .then(res => {
                setSearchResult(res.data);
            })
            .catch(err => console.log(err));
    };

    const paginatedusers = showAll ? users : users.slice(0, recordsPerPage); 
    const renderData = searchResult.length > 0 ? searchResult : paginatedusers;

    return (
        <div>
      <main className="d-flex min-vh-100 bg-light text-dark">
                <Sidebar />
                <div className="container-fluid mt-4 ">
                    <Nav />

                    <h2 className="text-center mt-5 text-secondary">Manage Client</h2>
                    <input 
                        type="text" 
                        value={searchUserID} 
                        onChange={(e) => setSearchUserID(e.target.value)} 
                        placeholder="Search by Nr. personal" 
                    />
                    <button onClick={handleSearch}>Search</button>
                    <div className="row">
                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                        <table className="table table-hover border-table dataTable no-footer" style={{ width: '100%' }}>
                                <caption>List of clients</caption>
                                <thead>
                                    <tr>
                                        {/* <th scope="col">ClientID</th> */}
                                        <th scope="col">Nr. Personal</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Birthday</th>
                                        <th scope="col">Gender</th>
                                        <th scope="col">Country</th>
                                        {/* <th scope="col">City</th> */}
                                        {/* <th scope="col">Address</th> */}
                                        <th scope="col">Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(renderData) && renderData.length > 0 ? (
                                        renderData.map((item) => (
                                            item && item.userId !== null && (
                                                <tr key={item.userId}>
                                                    {/* <th scope="row">{item.userId}</th> */}
                                                    <td>{item.username}</td>
                                                    <td>{item.name + ' ' + item.lastname}</td>
                                                    <td>{item.email}</td>
                                                    <td>{formatDate(item.birthday)}</td>
                                                    <td>{item.gender}</td>
                                                    <td>{item.Country}</td>
                                                    {/* <td>{item.City}</td> */}
                                                    {/* <td>{item.Street}</td> */}
                                                    <td>
                                                        <button 
                                                            onClick={() => handleEdit(item.userId)} 
                                                            className="btn btn-primary mr-2">
                                                            Edit
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(item.userId)} 
                                                            className="btn btn-danger">
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="10" className="text-center">No clients found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>Total Clients: {numClients}</div>
                    <button onClick={() => handleChangeRecordsPerPage(10)}>Show 10 records</button>
                    <button onClick={() => handleChangeRecordsPerPage(30)}>Show 30 records</button>
                    <button onClick={() => handleChangeRecordsPerPage(50)}>Show 50 records</button>
                    <button onClick={handleShowAll}>Show All</button> {/* Show all button */}
                </div>
            </main>
            {editClientId !== null && <EditClient id={editClientId} onClose={handleCloseEditModal} />}
        </div>
    );
};

export default Client;