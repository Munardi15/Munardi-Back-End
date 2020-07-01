const express = require ('express');
const mongoose = require ('mongoose');
const morgan = require ('morgan');
const bodyParser = require ('body-parser');
const UserRoute = require('./routes/User')

mongoose.connect('mongodb://localhost:27017/munardi');
const db = mongoose.connection;

db.on('err', (err) =>{
    console.log(err)
})

db.once('open', () =>{
    console.log('Database Connected db');
})

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log(`server is running on port`, PORT)
})

app.use('/', UserRoute);
