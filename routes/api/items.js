const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Items');

// @route     GET api/items
// @desc      Get ALL items
// @access    Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route     POST api/items
// @desc      Create a item
// @access    Private
router.post('/', auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save().then(item => res.json(item));
});

// @route     DELETE api/items
// @desc      Delete a item
// @access    Private
router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(error => res.status(404).json({ success: false }));
});

module.exports = router;
