import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import EditCards from './EditCards';
import VerifyLogin from '../VerifyLogin';
import Nav from '../Nav';

export const Manageclientcards = () => {
    const [cards, setCards] = useState([]);
    const [numCards, setNumCards] = useState(0); 
    const [editCards, setEditCardsId] = useState(null);
    const [recordsPerPage, setRecordsPerPage] = useState(10); 
    const [showAll, setShowAll] = useState(false);
    const [searchUserID, setSearchUserID] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    VerifyLogin();
    useEffect(() => {
        getCards();
    }, []);

    const navigate = useNavigate();

    const getCards = () => {
        axios.post('http://localhost:8080/getCardsclients')
            .then(res => {
                const fetchedCards = res.data;
                setCards(fetchedCards);
                setNumCards(fetchedCards.length); 
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/deleteCard/${id}`)
            .then(res => {
                getCards();
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (id) => {
        setEditCardsId(id); 
    };

    const handleCloseEditModal = () => {
        setEditCardsId(null); 
    };

    const maskCardNumber = (cardNumber) => {
        if (cardNumber.length <= 10) {
            return '****'.repeat(Math.max(0, Math.ceil(cardNumber.length / 4))); 
        }
        const visibleDigits = 6;
        const masked = cardNumber.slice(0, visibleDigits) + '*'.repeat(cardNumber.length - visibleDigits - 4) + cardNumber.slice(-4);
        return masked;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    };

    const handleRecordsPerPageChange = (value) => {
        setRecordsPerPage(value);
        setShowAll(false);
    };

    const handleShowAll = () => {
        setShowAll(true);
    };

    const handleSearch = () => {
        if (searchUserID.trim() === '') {
            setSearchResult([]);
            getCards();
            return;
        }
        axios.post('http://localhost:8080/searchCards', { username: searchUserID })
            .then(res => {
                setSearchResult(res.data);
            })
            .catch(err => console.log(err));
    };

    const paginatedCards = showAll ? cards : cards.slice(0, recordsPerPage);
    const renderData = searchResult.length > 0 ? searchResult : paginatedCards;

    return (
        <div> 
           <main className="d-flex min-vh-100 bg-light text-dark">
                <Sidebar />
                <div className="container-fluid mt-4 ">
                    <Nav />
                    <h2 className="text-center mt-4 text-secondary">Manage Cards </h2>
                    <div className="row">
                        <caption>List of Cards</caption>
                        <div className="search-container">
                            <input type="text" value={searchUserID} onChange={(e) => setSearchUserID(e.target.value)} placeholder="Search by Nr. personal" />
                            <button onClick={handleSearch}>Search</button>
                        </div>
                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                        <table className="table table-hover border-table dataTable no-footer" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">Nr. Personal</th>
                                        <th scope="col">Card Number</th>
                                        <th scope="col">Card Holder Name</th>
                                        <th scope="col">Valid From</th>
                                        <th scope="col">Valid Util</th>
                                        <th scope="col">Card Type</th>
                                        <th scope="col">Card Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(renderData) && renderData.map((card, index) => (
                                        <tr key={card.CardID}>
                                            {/* <th scope="row">{card.CardID}</th> */}
                                            <td>{card.username}</td>
                                            <td>{maskCardNumber(card.CardNumber)}</td>
                                            <td>{card.CardHolderName}</td>
                                            <td>{formatDate(card.ValidFrom)}</td>
                                            <td>{formatDate(card.ExpiryDate)}</td>
                                            <td>{card.CardType}</td>
                                            <td>{card.CardStatus}</td>
                                            <td>
                                                <button onClick={() => handleEdit(card.CardID)} className="btn btn-primary mr-2">Edit</button>
                                                <button onClick={() => handleDelete(card.CardID)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>Total Cards: {numCards}</div> 
                    <div>
                        <button onClick={() => handleRecordsPerPageChange(10)}>Show 10 records</button>
                        <button onClick={() => handleRecordsPerPageChange(30)}>Show 30 records</button>
                        <button onClick={() => handleRecordsPerPageChange(50)}>Show 50 records</button>
                        <button onClick={handleShowAll}>Show All</button>
                    </div>
                    {editCards !== null && <EditCards id={editCards} onClose={handleCloseEditModal} />}
                </div>
            </main>
        </div>
    );
};

export default Manageclientcards;
