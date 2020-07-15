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
  password: String,
  phone: String,
  projectId: String,
  role: String,
  title: String,
  username: String
},
{
  timestamps: true
})

const User = mongoose.model('User', userSchema);

module.exports = User;
