const mongoose = require('mongoose');

const callsheetSchema = mongoose.Schema({
  projectId: String,
  date: String,
  episode: String,
  day: String,
  scriptDraft: String,
  generalCallTime: String,
  generalLocation: String,
  nearestHospital: String,
  allCalled: [String],
  singles: [{
    name: String,
    callTime: String,
    location: String
  }],
  distros: [{
    distroName: String,
    callTime: String,
    location: String
  }]
},
{
  timestamps: true
})

const Callsheet = mongoose.model('Callsheet', callsheetSchema)

module.exports = Callsheet;
