import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../Dashboard/Nav';
import Sidebar from '../Dashboard/Sidebar';
import EditApply from './EditApply';

export const Client = () => {
    const [users, setUsers] = useState([]);
    const [numClients, setNumClients] = useState(0);
    const [editClientId, setEditClientId] = useState(null);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [showAll, setShowAll] = useState(false);
    const [searchUserID, setSearchUserID] = useState('');
    const [searchResult, setSearchResult] = useState([]);
     


    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        axios.get('http://localhost:8080/getApply')
            .then(res => {
                const fetchedUsers = res.data;
                const sortedUsers = fetchedUsers.sort((a, b) => {
                    if (a.Status === 'Pending' && b.Status !== 'Pending') return -1;
                    if (a.Status !== 'Pending' && b.Status === 'Pending') return 1;
                    return new Date(b.applicationDate) - new Date(a.applicationDate);
                });
                setUsers(sortedUsers);
                setNumClients(sortedUsers.length);
            })
            .catch(err => {
                console.error('Error fetching users:', err);
                setUsers([]);
                setNumClients(0);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/deleteApplicant/${id}`)
            .then(res => {
                getUsers();
                window.location.reload();
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

    const handleAccept = (id) => {
        const applicant = users.find(user => user.userId === id);
        if (!applicant) {
            console.error('Applicant not found');
            return;
        }

        console.log('Applicant data:', applicant);

        axios.post(`http://localhost:8080/addClient`, applicant)
            .then(res => {
                console.log('Applicant accepted and registered as a client:', res.data);

                axios.put(`http://localhost:8080/updateStatus/${id}`, { Status: 'Accepted' })
                    .then(res => {
                        console.log('Client status updated to Active:', res.data);
                        getUsers();
                    })
                    .catch(err => {
                        console.error('Error updating client status:', err);
                    });
            })
            .catch(err => {
                console.error('Error accepting applicant:', err);
            });
    };

    const handleSearch = () => {
        if (searchUserID.trim() === '') {
            return;
        }
        axios.post('http://localhost:8080/searchApplicant', { username: searchUserID })
            .then(res => {
                setSearchResult(res.data);
            })
            .catch(err => console.log(err));
    };

    const paginatedUser = showAll ? users : users.slice(0, recordsPerPage);
    const renderData = searchResult.length > 0 ? searchResult : paginatedUser;

    return (
        <div>
           <main className="d-flex min-vh-100 bg-light text-dark">
                <Sidebar />
                <div className="container-fluid mt-4">
                    <div className='mb-4' >
                        <Nav />
                    </div>
                    <h2 className="text-center mt-4 text-secondary">Online application management</h2>
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
                                        <th scope="col">Nr.Personal</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Birthday</th>
                                        <th scope="col">Gender</th>
                                        <th scope="col">Package</th>
                                        <th scope="col">Country</th>
                                        <th scope="col">City</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(renderData) && renderData.length > 0 ? (
                                        renderData.map((item) => (
                                            item && item.userId !== null && (
                                                <tr key={item.userId}>
                                                    <td>{item.username}</td>
                                                    <td>{item.name + ' ' + item.lastname}</td>
                                                    <td>{item.email}</td>
                                                    <td>{formatDate(item.birthday)}</td>
                                                    <td>{item.gender}</td>
                                                    <td>{item.package}</td>
                                                    <td>{item.Country}</td>
                                                    <td>{item.City}</td>
                                                    <td>{item.Status}</td>
                                                    <td>
                                                        {item.Status !== 'Accepted' && (
                                                            <>
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
                                                            </>
                                                        )}
                                                        {item.Status !== 'Accepted' && (
                                                            <button
                                                                onClick={() => handleAccept(item.userId)}
                                                                
                                                                className="btn btn-success ">
                                                                    
                                                                Accept
                                                            </button>
                                                        )}
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
                    <button onClick={handleShowAll}>Show All</button>
                </div>
            </main>
            {editClientId !== null && <EditApply id={editClientId} onClose={handleCloseEditModal} />}
        </div>
    );
};

export default Client;
