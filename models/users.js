const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  callsheet: {
    callTime: String,
    location: String,
  },
  department: String,
  distros: [String],
  email: String,
  name: String,
  phone: String,
  projectId: String,
  role: String
},
{
  timestamps: true
})

const User = mongoose.model('User', userSchema);

module.exports = User;
