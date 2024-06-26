import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditPlayers from './EditPlayers'

export const Currencies = () => {
    const [mess, setMess] = useState([]);
    const [numMess, setNumMess] = useState(0); 
    const [editPlayers, setPlayers] = useState(null);

    useEffect(() => {
        getMess();
    }, []);

    const navigate = useNavigate();

    const getMess = () => {
        axios.post('http://localhost:8080/getPlayers')
            .then(res => {
                const fetchedMess = res.data;
                setMess(fetchedMess);
                setNumMess(fetchedMess.length); 
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/deletePlayers/${id}`)
            .then(res => {
                getMess();
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (id) => {
        setPlayers(id);
    };

    const handleCloseEditModal = () => {
        setPlayers(null);
    };

    return (
        <div> 
      <main className="d-flex min-vh-100 bg-light text-dark">

                <div className="container-fluid " style={{  marginTop: '100px' }} >
                    <h1 className=''>MANAGE Players</h1>
                    <div className="row">
                        <caption>List of Messages</caption>
                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                            <table className="table table-hover table-bordered table-striped dataTable no-footer" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        {/* <th scope="col">PlayerID</th> */}
                                        <th scope="col">TeamId</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Number</th> 
                                        <th scope="col">BirthYear</th>
                                        <th scope="col">Actions</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(mess) && mess.map((item, index) => (
                                        <tr key={item.PlayerId}>
                                            <td>{item.TeamId}</td>
                                            <td>{item.Name}</td>
                                            <td>{item.Number}</td>
                                            <td>{item.BirthYear}</td>

                                            <td>
                                            <button onClick={() => handleEdit(item.PlayerId)} className="btn btn-primary mr-2">Edit</button>
                                                <button onClick={() => handleDelete(item.PlayerId)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>Total message: {numMess}</div> 
                    {editPlayers !== null && <EditPlayers id={editPlayers} onClose={handleCloseEditModal} />}

                </div>
            </main>
        </div>
    )
}

export default Currencies;
