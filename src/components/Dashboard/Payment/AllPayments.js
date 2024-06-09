import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


function AllPayments() {
    const [bills, setBills] = useState([]);

    const fetchBills = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getAllBillsForStaff');
            setBills(response.data);
        } catch (error) {
            console.error('Failed to fetch bills', error);
        }
    };

    useEffect(() => {
        fetchBills();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/deleteBills/${id}`)
            .then(res => {
                fetchBills();
            })
            .catch(err => console.log(err));
    };

    const downloadPdf = () => {
        const input = document.getElementById('billsTable');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save("bills.pdf");
            });
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
            <Sidebar />
            <div style={{ flex: 1, padding: '20px' }}>
                <h2 style={{ textAlign: 'center', margin: '20px 0', color: '#333' }}>Bills List</h2>
                <button onClick={downloadPdf} style={{ margin: '10px', padding: '10px' }}>Download PDF</button>
                <div id="billsTable">
                    <table style={{ width: '100%', borderCollapse: 'collapse',color: 'black' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#ddd', textAlign: 'left'  }}>
                                <th style={{ padding: '8px' }}>Bill ID</th>
                                <th style={{ padding: '8px' }}>User ID</th>
                                <th style={{ padding: '8px' }}>Service Type</th>
                                <th style={{ padding: '8px' }}>Amount</th>
                                <th style={{ padding: '8px' }}>Due Date</th>
                                <th style={{ padding: '8px' }}>Status</th>
                                <th style={{ padding: '8px' }}>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {bills.map(bill => (
                                <tr key={bill.BillID}>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{bill.BillID}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{bill.UserID}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{bill.ServiceType}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>${bill.Amount.toFixed(2)}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{bill.DueDate}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{bill.Status}</td>
                               
                                <td>
                                 <button onClick={() => handleDelete(bill.BillID)} className="btn btn-danger">Delete</button>
                                            </td> </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AllPayments;