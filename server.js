//zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach
//                              DEPENDENCIES                                //
//zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach

const bodyParser = require('body-parser');
const cors = require('cors')
const express = require('express');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config()

//zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach
//                              CONFIGURATION                               //
//zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach

const app = express();
const PORT = process.env.PORT || 3333;
const db = mongoose.connection
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: false }
}));

//zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach
//                               MIDDLEWARE                                 //
//zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach

app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cors({origin:'http://localhost:3000', credentials:true}));

//zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach
//                                DATABASE                                  //
//zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach

const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
)

//zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach
//                             ERROR HANDLING                               //
//zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: '));
db.on('disconnected', () => console.log('mongo disconnected'));

//zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach
//                               CONTROLLERS                                //
//zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach

app.get('/', (req, res)=>{
	res.send('this is the distro api!')
});

const usersController = require('./controllers/usersController.js');
app.use('/users', usersController);

const callsheetController = require('./controllers/callsheetController.js');
app.use('/callsheet', callsheetController);

const sessionController = require('./controllers/sessionController.js');
app.use('/session', sessionController);

//zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach
//                                LISTENER                                  //
//zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach~//~zach

app.listen(PORT, () => {
  console.log(`I'm so ${PORT + 8}, you so ${PORT} and late`);
})
