const {Schema, model} = require('mongoose');

const schema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
},{
  collection: 'adminusers'
});

module.exports = model('AdminUsers', schema);
