import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import Cards from "react-credit-cards-2";
import './Cards.css';

const ManageCards = () => {
    const [cards, setCards] = useState([]);
    const [numCards, setNumCards] = useState(0);
    const [state, setState] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        focus: "",
        cardType: "",
    });

    useEffect(() => {
        getCards();
    }, []);

    const navigate = useNavigate();

    const getCards = () => {
        axios.post('http://localhost:8080/getCardsWithSession')
            .then(res => {
                const fetchedCards = res.data;
                if (fetchedCards !== "fail") {
                    setCards(fetchedCards);
                    setNumCards(fetchedCards.length);
                    if (fetchedCards.length > 0) {
                        setState({
                            number: fetchedCards[0].CardNumber,
                            name: fetchedCards[0].CardHolderName,
                            expiry: fetchedCards[0].ExpiryDate.substring(2, 7).replace('-', '/'),
                            cvc: "", 
                            focus: "",
                            cardType: fetchedCards[0].CardType,
                        });
                    }
                }
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (cardId) => {
        axios.delete(`http://localhost:8080/deleteCard/${cardId}`)
            .then(res => {
                getCards();
            })
            .catch(err => console.log(err));
    };

    const handleBlock = (cardId) => {
        axios.put(`http://localhost:8080/blockCard/${cardId}`)
            .then(res => {
                getCards();
            })
            .catch(err => console.log(err));
    };

    const handleEnable = (cardId) => {
        axios.put(`http://localhost:8080/enableCard/${cardId}`)
            .then(res => {
                getCards();
            })
            .catch(err => console.log(err));
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

    const handleCardAdded = () => {
        getCards();  
    };

    return (
        <div>
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white', color: 'black' }}>
                <Sidebar />
                <div className="container-fluid" style={{ marginTop: '100px' }}>
                    <h1>MANAGE CARDS</h1>
                    <div className="row">
                        <caption>List of Cards</caption>
                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                            <table className="table table-hover table-bordered table-striped dataTable no-footer" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">Your Id</th>
                                        <th scope="col">Card Number</th>
                                        <th scope="col">Card Holder Name</th>
                                        <th scope="col">Valid From</th>
                                        <th scope="col">Valid Until</th>
                                        <th scope="col">Card Type</th>
                                        <th scope="col">Card Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(cards) && cards.map((card) => (
                                        <tr key={card.CardID}>
                                            <td>{card.UserID}</td>
                                            <td>{maskCardNumber(card.CardNumber)}</td>
                                            <td>{card.CardHolderName}</td>
                                            <td>{formatDate(card.ValidFrom)}</td>
                                            <td>{formatDate(card.ExpiryDate)}</td>
                                            <td>{card.CardType}</td>
                                            <td>{card.CardStatus}</td>
                                            <td>
                                                {card.CardStatus === 'ACTIVE' ? (
                                                    <button onClick={() => handleBlock(card.CardID)} className="btn btn-danger mr-2">Block</button>
                                                ) : (
                                                    <button onClick={() => handleEnable(card.CardID)} className="btn btn-success mr-2">Enable</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>Total Cards: {numCards}</div>
                    <Cards
                        number={maskCardNumber(state.number)}
                        expiry={state.expiry}
                        cvc={state.cvc}
                        name={state.name}
                        focused={state.focus}
                    />
                </div>
            </main>
        </div>
    );
};

export default ManageCards;
