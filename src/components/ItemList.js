import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Item from './Item';

const ItemList = ({ onEdit }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('There was an error fetching the items!', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/items/${id}`)
      .then(() => setItems(items.filter(item => item.id !== id)))
      .catch(error => console.error('There was an error deleting the item!', error));
  };

  return (
    <div>
      {items.map(item => (
        <Item key={item.id} item={item} onDelete={handleDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default ItemList;
