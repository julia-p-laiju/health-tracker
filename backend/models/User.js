const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  healthData: [{
    date: { type: Date, default: Date.now },
    bp: String,
    sugar: String,
    weight: String
  }]
});

module.exports = mongoose.model('User', UserSchema);
