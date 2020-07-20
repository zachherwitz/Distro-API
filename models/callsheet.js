const mongoose = require('mongoose');

const callsheetSchema = mongoose.Schema({
  projectTitle: String,
  projectId: String,
  date: String,
  episode: String,
  day: String,
  scriptDraft: String,
  generalCallTime: String,
  generalLocation: String,
  nearestHospital: String,
  allCalled: [{
    userId: String,
    callTime: String,
    location: String,
    date: String
  }],
  weather: [{
    max: Number,
    min: Number,
    rainChance: Number,
    weatherText: String,
    sunrise: String,
    sunset: String
  }],
  zip: Number
},
{
  timestamps: true
});

const Callsheet = mongoose.model('Callsheet', callsheetSchema)

module.exports = Callsheet;
