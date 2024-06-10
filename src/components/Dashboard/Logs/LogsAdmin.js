import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import VerifyLogin from '../VerifyLogin';

const LogsTable = () => {
    const [logs, setLogs] = useState([]);
    const [numLogs, setNumLogs] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(10); 
    const [showAll, setShowAll] = useState(false);
    VerifyLogin();

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = () => {
        axios.get('http://localhost:8080/getLogs')
            .then(res => {
                const fetchedLogs = res.data;
                if (Array.isArray(fetchedLogs)) {
                    setLogs(fetchedLogs);
                    setNumLogs(fetchedLogs.length);
                } else {
                    setLogs([]);
                    setNumLogs(0);
                }
            })
            .catch(err => {
                console.error("Error fetching logs:", err);
                setLogs([]);
                setNumLogs(0);
            });
    };
    const handleChangeRecordsPerPage = (value) => {
        setRecordsPerPage(value);
        setShowAll(false);
    };
    const handleShowAll = () => {
        setShowAll(true);
    };

    
    return (
        <div>
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white', color: 'black' }}>
                <Sidebar />
                <div className="container-fluid" style={{ marginTop: '100px' }}>
                    <h1 className="text-center">Logs</h1>
                    <div className="row">
                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                            <table className="table table-hover table-bordered table-striped dataTable no-footer" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">LogID</th>
                                        <th scope="col">UserID</th>
                                        <th scope="col">Action</th>
                                        <th scope="col">Details</th>
                                        <th scope="col">Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(logs) && logs.map((log) => (
                                        <tr key={log.logId}>
                                            <th scope="row">{log.logId}</th>
                                            <td>{log.userId}</td>
                                            <td>{log.action}</td>
                                            <td>{log.details}</td>
                                            <td>{log.timestamp}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>Total logs: {numLogs}</div>
                    <button onClick={() => handleChangeRecordsPerPage(10)}>Show 10 records</button>
                    <button onClick={() => handleChangeRecordsPerPage(30)}>Show 30 records</button>
                    <button onClick={() => handleChangeRecordsPerPage(50)}>Show 50 records</button>
                    <button onClick={handleShowAll}>Show All</button> {/* Show all button */}
                </div>
            </main>
        </div>
    );
};

export default LogsTable;
