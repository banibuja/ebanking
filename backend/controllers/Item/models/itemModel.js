const db = require('../config/dbConfig');

const Item = {
  getAllItems: (callback) => {
    return db.query('SELECT * FROM items', callback);
  },
  getItemById: (id, callback) => {
    return db.query('SELECT * FROM items WHERE id = ?', [id], callback);
  },
  addItem: (item, callback) => {
    return db.query('INSERT INTO items SET ?', item, callback);
  },
  updateItem: (id, item, callback) => {
    return db.query('UPDATE items SET ? WHERE id = ?', [item, id], callback);
  },
  deleteItem: (id, callback) => {
    return db.query('DELETE FROM items WHERE id = ?', [id], callback);
  }
};

module.exports = Item;
