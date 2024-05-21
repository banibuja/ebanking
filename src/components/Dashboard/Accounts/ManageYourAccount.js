import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import Cards from "react-credit-cards-2";
import './Cards.css';
import Nav from '../Nav';

export const ManageYourAccount = () => {
    const [userId, setUserId] = useState('');
    const [account, setAccount] = useState([]);
    const [cards, setCards] = useState([]);
    const [numAccount, setNumAccount] = useState(0); 
    const [savings, setSavings] = useState([]);
    const [numSavings, setNumSavings] = useState(0); 
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

    useEffect(() => {
        getaccount();
        axios.get('http://localhost:8080')
        .then(res => {
          if (res.data.valid) {
            setUserId(res.data.uId); 
          } else {
            navigate('/login');
          }
        })
        .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        getSavings();
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

    const getaccount = () => {
        axios.post(`http://localhost:8080/getAccountBySession`)
            .then(res => {
                const fetchedMess = res.data;
                console.log(fetchedMess);
                setAccount(fetchedMess);
                setNumAccount(fetchedMess.length); 
            })
            .catch(err => console.log(err));
    };

    const getSavings = () => {
        axios.post(`http://localhost:8080/getSavingsBySesison`)
            .then(res => {
                const fetchedSavings = res.data;
                console.log(fetchedSavings);
                setSavings(fetchedSavings);
                setNumSavings(fetchedSavings.length); 
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/deleteAccounts/${id}`)
            .then(res => {
                getaccount();
            })
            .catch(err => console.log(err));
    };
    const handleDeletee = (id) => {
        axios.delete(`http://localhost:8080/deleteSavings/${id}`)
            .then(res => {
                getSavings();
            })
            .catch(err => console.log(err));
    };
    const handleDeletet = (cardId) => {
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
            <main style={{ display: 'flex', minHeight: '10vh', backgroundColor: 'rgb(233, 233, 233)', color: 'black' }}>
                <Sidebar />
                <div className="container-fluid" style={{ marginTop: '100px' }}>
                <Nav />

                    <h2 className='' style={{ color: 'grey', padding: '5px' }}>Account summary</h2>
                    <div className="row">
                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                            <table className="table table-hover no-border-table dataTable no-footer" style={{ width: '100%', marginLeft: '9px' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">CurrentAccount</th>
                                        <th scope="col">Account name</th>
                                        <th scope="col">Currency</th>
                                        <th scope="col">Balance</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(account) && account.map((item) => (
                                        <tr key={item.AccountID}>
                                            <td>{item.CurrentAccount}</td>
                                            <td>{item.name + ' ' + item.lastname}</td>
                                            <td>{item.CurrencyCode}</td>
                                            <td>{parseFloat(item.Balance).toFixed(2)}</td> 
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="container-fluid" style={{ marginTop: '20px' }}>
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                <table className="table table-hover no-border-table dataTable no-footer" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th scope="col">FlexSaveAccount</th>
                                            <th scope="col">Account name</th>
                                            <th scope="col">Currency</th>
                                            <th scope="col">Balance</th> 
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(savings) && savings.map((item) => (
                                            <tr key={item.SavingsID}>
                                                <td>{item.SavingsType}</td>
                                                <td>{item.name + ' ' + item.lastname}</td>
                                                <td>{item.CurrencyCode}</td>
                                                <td>{parseFloat(item.Balance).toFixed(2)}</td> 
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid" style={{ marginTop: '90px' }}>
                        <h2 className='' style={{ color: 'grey', padding: '5px' }}>Card summary</h2>
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                <table className="table table-hover no-border-table dataTable no-footer" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
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
                        <Cards
                            number={maskCardNumber(state.number)}
                            expiry={state.expiry}
                            cvc={state.cvc}
                            name={state.name}
                            focused={state.focus}
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ManageYourAccount;
