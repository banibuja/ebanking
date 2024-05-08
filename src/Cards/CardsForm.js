import React, { useState } from "react";
import axios from "axios";
import Cards from "react-credit-cards-2";
import Sidebar from '../admin/Dashboard/Sidebar';
import "react-credit-cards-2/dist/es/styles-compiled.css";
import './Cards.css';

const CreditCardForm = () => {
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
    cardType: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/addCard', {
        CardNumber: state.number,
        ExpiryDate: state.expiry,
        CardHolderName: state.name,
        CardType: state.cardType,
        CardStatus: "ACTIVE",
        AvailableBalance: 0 
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  return (
    <div>
      <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white', color: 'black'}}>
        <Sidebar />
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />
        <div className="container mt-3" style={{ marginTop: '120px', marginRight: '190px' }}>
          <form onSubmit={handleAddCard}>
            <div className="mb-3">
              <input
                type="number"
                name="number"
                className="form-control"
                placeholder="Card Number"
                value={state.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
              />
            </div>
            <div className="row">
              <div className="col-4 mb-3">
                <input
                  type="number"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  value={state.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />
              </div>
              <div className="col-4 mb-3">
                <input
                  type="number"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  value={state.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />
              </div>
              <div className="col-4 mb-3">
                <select
                  name="cardType"
                  value={state.cardType}
                  className="form-control"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                >
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                  <option value="Prepaid">Prepaid</option>
                </select>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-dark">Add Card</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};


export default CreditCardForm;
