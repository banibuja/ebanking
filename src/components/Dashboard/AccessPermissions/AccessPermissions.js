import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import EditAccesPermissions from './EditAccesPermissions';
import Nav from '../Nav';
import VerifyLogin from '../VerifyLogin';

export const AccesPermissions = () => {
    const [acces, setAcces] = useState([]);
    const [numAcces, setNumAcces] = useState(0);
    const [editAcces, setEditAccesId] = useState(null);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [showAll, setShowAll] = useState(false);
    const [clientID, setClientID] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        fetchAcces();
    }, []);

    const navigate = useNavigate();
    VerifyLogin();
    const fetchAcces = () => {
        axios.post('http://localhost:8080/getAllPermissions')
            .then(res => {
                const fetchedAcces = res.data;
                setAcces(fetchedAcces);
                setNumAcces(fetchedAcces.length);
            })
            .catch(err => console.log(err));
    };

    // const handleDelete = (id) => {
    //     axios.delete(`http://localhost:8080/deleteAccessPermissions/${id}`)
    //         .then(res => {
    //             fetchAcces();
    //         })
    //         .catch(err => console.log(err));
    // };

    const handleEdit = (id) => {
        setEditAccesId(id);
    };

    const handleCloseEditModal = () => {
        setEditAccesId(null);
    };

    const handleChangeRecordsPerPage = (value) => {
        setRecordsPerPage(value);
        setShowAll(false);
    };

    const handleShowAll = () => {
        setShowAll(true);
    };

    const handleSearch = () => {
        if (clientID.trim() === '') {
            setSearchResult([]);
            fetchAcces();
            return;
        }
        axios.post('http://localhost:8080/searchAccessPermissionss', { username: clientID })
            .then(res => {
                setSearchResult(res.data);
            })
            .catch(err => console.log(err));
    };

    const paginatedAcces = showAll ? acces : acces.slice(0, recordsPerPage);
    const renderData = searchResult.length > 0 ? searchResult : paginatedAcces;

    return (
        <div>
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white', color: 'black' }}>
                <Sidebar />

                <div className="container-fluid" style={{ marginTop: '100px' }}>
                <Nav />

                    <h2 className="text-center" style={{ marginTop: '20px', color: 'grey' }}>Manage AccesPermissions</h2>
                    <div className="row">
                        <caption>List of Access</caption>
                        <div className="search-container">
                            <input type="text" value={clientID} onChange={(e) => setClientID(e.target.value)} placeholder="Search by username" />
                            <button onClick={handleSearch}>Search</button>
                        </div>
                        <div className="col-md-12 d-flex justify-content-center align-items-center">

                            <table className="table table-hover border-table dataTable no-footer" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">username</th>
                                        <th scope="col">Name Lastname</th>
                                        <th scope="col">AccessLevel</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {Array.isArray(renderData) && renderData.map((acces, index) => (
                                        <tr key={acces.PermissionID}>
                                            <td>{acces.username}</td>
                                            <td>{acces.name + '  ' + acces.lastname}</td>
                                            <td>{acces.AccessLevel}</td>
                                            <td>
                                                <button onClick={() => handleEdit(acces.PermissionID)} className="btn btn-primary mr-2">Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>Total access: {numAcces}</div>
                    <div>
                        <button onClick={() => handleChangeRecordsPerPage(10)}>Show 10 records</button>
                        <button onClick={() => handleChangeRecordsPerPage(30)}>Show 30 records</button>
                        <button onClick={() => handleChangeRecordsPerPage(50)}>Show 50 records</button>
                        <button onClick={handleShowAll}>Show All</button>
                    </div>
                    {editAcces !== null && <EditAccesPermissions id={editAcces} onClose={handleCloseEditModal} />}

                </div>
            </main>
        </div>
    )
}

export default AccesPermissions;
