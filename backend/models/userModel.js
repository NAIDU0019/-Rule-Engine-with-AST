const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  age: { type: Number, required: true },
  department: { type: String, required: true },
  salary: { type: Number, required: true },
  experience: { type: Number, required: true },
});

module.exports = mongoose.model('User', userSchema);
