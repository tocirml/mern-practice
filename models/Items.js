const mongoose = require('mongoose');
// const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create a Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Item = mongoose.model('item', ItemSchema);
