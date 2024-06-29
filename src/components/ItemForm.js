import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemForm = ({ currentItem, onSave }) => {
  const [item, setItem] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    if (currentItem) {
      setItem(currentItem);
    }
  }, [currentItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prevItem => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.id) {
      axios.put(`http://localhost:3000/api/items/${item.id}`, item)
        .then(response => onSave(response.data))
        .catch(error => console.error('There was an error updating the item!', error));
    } else {
      axios.post('http://localhost:8000/items', item)
        .then(response => onSave(response.data))
        .catch(error => console.error('There was an error adding the item!', error));
    }
    setItem({ name: '', description: '', price: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={item.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <textarea
        name="description"
        value={item.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="number"
        name="price"
        value={item.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default ItemForm;
