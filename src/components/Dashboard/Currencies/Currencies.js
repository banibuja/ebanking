import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import EditCurrencies from './EditCurrencies';
export const Currencies = () => {
    const [mess, setMess] = useState([]);
    const [numMess, setNumMess] = useState(0); 
    const [editCurrencies, setCurrencies] = useState(null);


    useEffect(() => {
        getMess();
    }, []);

    const navigate = useNavigate();

    const getMess = () => {
        axios.post('http://localhost:8080/getCurrencies')
            .then(res => {
                const fetchedMess = res.data;
                setMess(fetchedMess);
                setNumMess(fetchedMess.length); 
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/deleteCurrencies/${id}`)
            .then(res => {
                getMess();
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (id) => {
        setCurrencies(id);
    };

    const handleCloseEditModal = () => {
        setCurrencies(null);
    };

    return (
        <div> 
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white', color: 'black' }}>
                <Sidebar />

                <div className="container-fluid " style={{  marginTop: '100px' }} >
                    <h1 className=''>MANAGE Currencies</h1>
                    <div className="row">
                        <caption>List of Messages</caption>
                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                            <table className="table table-hover table-bordered table-striped dataTable no-footer" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">ClientID</th>
                                        <th scope="col">CurrencyCode</th>
                                        <th scope="col">ExchangeRate</th>
                                        <th scope="col">Action</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(mess) && mess.map((item, index) => (
                                        <tr key={item.CurrencyID}>
                                            <td>{item.UserID}</td>
                                            <td>{item.CurrencyCode}</td>
                                            <td>{item.ExchangeRate}</td>
                                            <td>
                                            <button onClick={() => handleEdit(item.CurrencyID)} className="btn btn-primary mr-2">Edit</button>
                                                <button onClick={() => handleDelete(item.CurrencyID)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>Total message: {numMess}</div> 
                    {editCurrencies !== null && <EditCurrencies id={editCurrencies} onClose={handleCloseEditModal} />}

                </div>
            </main>
        </div>
    )
}

export default Currencies;
