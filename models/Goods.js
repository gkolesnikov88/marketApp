const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  _id: {type: Number, required: true},
  name: {type: String, required: true},
  purchasePrice: {type: Number, required: true},
  sellingPrice: {type: Number, required: true},
  category: {type: Types.ObjectId, ref: 'Categories'},
  urlImg: {type: String,},
});

module.exports = model('Goods', schema);
