const Item = require('../models/itemModel');

exports.getAllItems = (req, res) => {
  Item.getAllItems((err, results) => {
    if (err) res.status(500).send(err);
    res.status(200).json(results);
  });
};

exports.getItemById = (req, res) => {
  Item.getItemById(req.params.id, (err, results) => {
    if (err) res.status(500).send(err);
    res.status(200).json(results[0]);
  });
};

exports.addItem = (req, res) => {
  const newItem = req.body;
  Item.addItem(newItem, (err, results) => {
    if (err) res.status(500).send(err);
    res.status(201).json({ id: results.insertId, ...newItem });
  });
};

exports.updateItem = (req, res) => {
  const updatedItem = req.body;
  Item.updateItem(req.params.id, updatedItem, (err, results) => {
    if (err) res.status(500).send(err);
    res.status(200).json({ id: req.params.id, ...updatedItem });
  });
};

exports.deleteItem = (req, res) => {
  Item.deleteItem(req.params.id, (err, results) => {
    if (err) res.status(500).send(err);
    res.status(200).json({ id: req.params.id });
  });
};
