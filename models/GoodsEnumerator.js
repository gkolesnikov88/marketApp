const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  name: {type: String, required: true},
  currentNumber: {type: Number, required: true},
},{
  collection: 'goodsEnumerators'
});

module.exports = model('GoodsEnumerator', schema);
