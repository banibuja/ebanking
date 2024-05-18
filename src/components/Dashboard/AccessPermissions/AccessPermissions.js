import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import EditAccesPermissions from './EditAccesPermissions';

export const AccessPermissions = () => {
    const [mess, setMess] = useState([]);
    const [numMess, setNumMess] = useState(0);
    const [editAcces, setEditAccessId] = useState(null);
    const [recordsPerPage, setRecordsPerPage] = useState(10); 
    const [showAll, setShowAll] = useState(false);
    const [searchUserID, setSearchUserID] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        getMess();
    }, []);

    const navigate = useNavigate();

    const getMess = () => {
        axios.post('http://localhost:8080/getAccessPermissions')
            .then(res => {
                const fetchedMess = res.data;
                setMess(fetchedMess);
                setNumMess(fetchedMess.length);
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/deleteAccessPermissions/${id}`)
            .then(res => {
                getMess();
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (id) => {
        setEditAccessId(id);
    };

    const handleCloseEditModal = () => {
        setEditAccessId(null);
    };

    const handleChangeRecordsPerPage = (value) => {
        setRecordsPerPage(value);
        setShowAll(false);
    };

    const handleShowAll = () => {
        setShowAll(true);
    };

    const handleSearch = () => {
        if (searchUserID.trim() === '') {
            return;
        }
        axios.post('http://localhost:8080/searchAccessPermissionss', { UserID: searchUserID })
            .then(res => {
                setSearchResult(res.data);
            })
            .catch(err => console.log(err));
    };

    const paginatedMess = showAll ? mess : mess.slice(0, recordsPerPage); 
    const renderData = searchResult.length > 0 ? searchResult : paginatedMess;

    return (
        <div>
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white', color: 'black' }}>
                <Sidebar />

                <div className="container-fluid " style={{ marginTop: '100px' }}>
                    <h1 className=''>MANAGE AccessPermissions</h1>
                    <input type="text" value={searchUserID} onChange={(e) => setSearchUserID(e.target.value)} placeholder="Search by Client ID" />
                                <button onClick={handleSearch}>Search</button>
                    <div className="row">
                        <caption>List of Messages</caption>
                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                            
                            <table className="table table-hover table-bordered table-striped dataTable no-footer" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">PermissionID</th>
                                        <th scope="col">UserId</th>
                                        <th scope="col">AccessLevel</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(renderData) && renderData.map((item, index) => (
                                        <tr key={item.PermissionID}>
                                            <th scope="row">{item.PermissionID}</th>
                                            <td>{item.UserID}</td>
                                            <td>{item.AccessLevel}</td>
                                            <td>
                                                <button onClick={() => handleEdit(item.PermissionID)} className="btn btn-primary mr-2">Edit</button>
                                                {/* <button onClick={() => handleDelete(item.PermissionID)} className="btn btn-danger">Delete</button> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>Total AccesPermissions: {numMess}</div>
                    <div>
                        <button onClick={() => handleChangeRecordsPerPage(10)}>Show 10 records</button>
                        <button onClick={() => handleChangeRecordsPerPage(30)}>Show 30 records</button>
                        <button onClick={() => handleChangeRecordsPerPage(50)}>Show 50 records</button>
                        <button onClick={handleShowAll}>Show All</button> {/* Show all button */}
                    </div>
                    {editAcces !== null && <EditAccesPermissions id={editAcces} onClose={handleCloseEditModal} />}
                </div>
            </main>
        </div>
    )
}

export default AccessPermissions;
