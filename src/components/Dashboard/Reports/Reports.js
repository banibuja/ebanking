import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav';
import * as XLSX from 'xlsx';

export const Reports = () => {
    const [reports, setReports] = useState([]);
    const [numReports, setNumReports] = useState(0);

    useEffect(() => {
        fetchReports(new Date(0), new Date());
    }, []);

    // const navigate = useNavigate();
    const exportToExcel = () => {
        const wb = XLSX.utils.table_to_book(document.getElementById('table'));
        XLSX.writeFile(wb, 'table.xlsx');
    }
    const fetchReports = (startDate, endDate) => {
        const formatedStartDate = formatimeTime(startDate)
        const formatedEndDate = formatimeTime(endDate)
        axios.post('http://localhost:8080/getAllTransactions', { startDate:formatedStartDate, endDate:formatedEndDate })
            .then(res => {
                const fetchedReports = res.data;
                setReports(fetchedReports);
                setNumReports(fetchedReports.length);
            })
            .catch(err => console.log(err));
    };

    const handleShowToday = () => {
        const date = new Date();
        date.setMilliseconds(0);
        date.setSeconds(0);
        date.setMinutes(0);
        date.setHours(0);

        fetchReports(date, new Date());
    }
    const handleShowWeek = () => {
        const today = new Date();

        const dayOfWeek = today.getDay();

        const date = new Date(today);
        
        date.setMilliseconds(0);
        date.setSeconds(0);
        date.setMinutes(0);
        date.setHours(0);
        date.setDate(today.getDate() - dayOfWeek);

        fetchReports(date, new Date());
    }
    const handleShowMonth = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();

        const thisMonth = new Date(year, month, 1);
        thisMonth.setMilliseconds(0);
        thisMonth.setSeconds(0);
        thisMonth.setMinutes(0);
        thisMonth.setHours(0);

        fetchReports(thisMonth, new Date());
    }
    const handleShowYear = () => {
        const today = new Date();
        const year = today.getFullYear();

        const thisYear = new Date(year, 1, 1);
        thisYear.setMilliseconds(0);
        thisYear.setSeconds(0);
        thisYear.setMinutes(0);
        thisYear.setHours(0);

        fetchReports(thisYear, new Date());
    }
    const handleShowAll = () => {
        fetchReports(new Date(0), new Date());
    }
    const formatimeTime = (time) => {
        const formattedTime = `${time.getFullYear()}-${("0" + (time.getMonth() + 1)).slice(-2)}-${("0" + time.getDate()).slice(-2)} ${("0" + time.getHours()).slice(-2)}:${("0" + time.getMinutes()).slice(-2)}:${("0" + time.getSeconds()).slice(-2)}`;
        return formattedTime;
    }

    return (
        <div>
            <main className="d-flex min-vh-100 bg-light text-dark">
                <Sidebar />

                <div className="container-fluid mt-4 ">
                    < Nav />
                    <h2 className="text-center mt-4 text-secondary">Manage Reports</h2>
                    <div className="row">
                        <div className='d-flex justify-content-end'>
                            <button type="button" className="btn btn-primary" onClick={handleShowToday}>Today</button>
                            <button type="button" className="btn btn-primary" onClick={handleShowWeek}>This Week</button>
                            <button type="button" className="btn btn-primary" onClick={handleShowMonth}>This Month</button>
                            <button type="button" className="btn btn-primary" onClick={handleShowYear}>This Year</button>
                            <button type="button" className="btn btn-success" onClick={handleShowAll}>All time</button>
                            <button onClick={exportToExcel}>Export to Excel</button>

                        </div>

                        <div className="search-container">

                        </div>
                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                            <table className="table table-hover table-bordered table-striped dataTable no-footer" id="table" style={{ width: '100%' }}>

                                <caption>List of Reports</caption>
                                <thead>
                                    <tr>
                                        <th scope="col">Transaction ID</th>
                                        <th scope="col">Sender Account ID</th>
                                        <th scope="col">Receiver Account ID</th>
                                        <th scope="col">Transaction Type</th>
                                        <th scope="col">Transaction Amount</th>
                                        <th scope="col">Currency</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Additional Info</th>
                                        <th scope="col">Transaction Fee</th>
                                        <th scope="col">Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(reports) && reports.map((report, index) => (
                                        <tr key={index}>
                                            <td>{report.TransactionID}</td>
                                            <td>{report.SenderAccID.toString()}</td>
                                            <td>{report.ReceiverAccID.toString()}</td>
                                            <td>{report.TransactionType}</td>
                                            <td>{report.TransactionAmount}</td>
                                            <td>{report.Currency}</td>
                                            <td>{report.Statusi}</td>
                                            <td>{report.AdditionalInfo}</td>
                                            <td>{report.TransactionFee}</td>
                                            <td>{report.CreatedAt}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>Total transactions: {numReports}</div>

                </div>
            </main><script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.0/xlsx.full.min.js"></script>


        </div>
    );
}

export default Reports;