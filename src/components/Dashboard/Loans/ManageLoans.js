import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../../Dashboard/Nav';
import Sidebar from '../../Dashboard/Sidebar';
import EditLoan from './EditLoan'; // Ensure this is the correct path to your EditLoan component

const ManageLoans = () => {
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
        axios.post('http://localhost:8080/getAllLoans')
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
        axios.delete(`http://localhost:8080/deleteLoan/${id}`)
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
        const applicant = users.find(user => user.AccountID === id);
        if (!applicant) {
            console.error('Applicant not found');
            return;
        }

        axios.post(`http://localhost:8080/addLoan`, applicant)
            .then(res => {
                axios.put(`http://localhost:8080/updateStatusLoans/${id}`, { Status: 'Accepted' })
                    .then(res => {
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
                    <div className='mb-4'>
                        <Nav />
                    </div>
                    <h2 className="text-center mt-4 text-secondary">Online Loans Management</h2>
                    <div className="search-bar">
                        <input
                            type="text"
                            value={searchUserID}
                            onChange={(e) => setSearchUserID(e.target.value)}
                            placeholder="Search by Nr. personal"
                            className="form-control"
                        />
                        <button onClick={handleSearch} className="btn btn-primary ml-2">Search</button>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                            <table className="table table-hover border-table dataTable no-footer" style={{ width: '100%' }}>
                                <caption>List of clients</caption>
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Birthday</th>
                                        <th scope="col">Loan Type</th>
                                        <th scope="col">City</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Employment Status</th>
                                        <th scope="col">Annual Income</th>
                                        <th scope="col">Loan Amount</th>
                                        <th scope="col">Loan Purpose</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(renderData) && renderData.length > 0 ? (
                                        renderData.map((item) => (
                                            item && item.AccountID !== null && (
                                                <tr key={item.AccountID}>
                                                    <td>{item.firstName + ' ' + item.lastName}</td>
                                                    <td>{formatDate(item.dateOfBirth)}</td>
                                                    <td>{item.loanType}</td>
                                                    <td>{item.city}</td>
                                                    <td>{item.address}</td>
                                                    <td>{item.employmentStatus}</td>
                                                    <td>{item.annualIncome}</td>
                                                    <td>{item.loanAmount}</td>
                                                    <td>{item.loanPurpose}</td>
                                                    <td>{item.Status}</td>
                                                    <td>
                                                        {item.Status !== 'Accepted' && (
                                                            <>
                                                                {editClientId === item.AccountID && (
                                                                    <EditLoan clientId={editClientId} closeEditModal={handleCloseEditModal} />
                                                                )}
                                                                <button
                                                                    onClick={() => handleEdit(item.LoanID)}
                                                                    className="btn btn-primary mr-2">
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(item.LoanID)}
                                                                    className="btn btn-danger mr-2">
                                                                    Delete
                                                                </button>
                                                                <button
                                                                                                                                       onClick={() => handleAccept(item.AccountID)}
                                                                                                                                       className="btn btn-success">
                                                                                                                                       Accept
                                                                                                                                   </button>
                                                                                                                               </>
                                                                                                                           )}
                                                                                                                       </td>
                                                                                                                   </tr>
                                                                                                               )
                                                                                                           ))
                                                                                                       ) : (
                                                                                                           <tr>
                                                                                                               <td colSpan="11" className="text-center">No clients found</td>
                                                                                                           </tr>
                                                                                                       )}
                                                                                                   </tbody>
                                                                                               </table>
                                                                                           </div>
                                                                                       </div>
                                                                                       <div className="text-center mt-4">
                                                                                           <div>Total Clients: {numClients}</div>
                                                                                           <button onClick={() => handleChangeRecordsPerPage(10)} className="btn btn-outline-secondary mr-2">Show 10 records</button>
                                                                                           <button onClick={() => handleChangeRecordsPerPage(30)} className="btn btn-outline-secondary mr-2">Show 30 records</button>
                                                                                           <button onClick={() => handleChangeRecordsPerPage(50)} className="btn btn-outline-secondary mr-2">Show 50 records</button>
                                                                                           <button onClick={handleShowAll} className="btn btn-outline-secondary">Show All</button>
                                                                                       </div>
                                                                                   </div>
                                                                               </main>
                                                                               {editClientId !== null && <EditLoan id={editClientId} onClose={handleCloseEditModal} />}

                                                                           </div>
                                                                       );
                                                                   };
                                                                   
                                                                   export default ManageLoans;
                                                                   
