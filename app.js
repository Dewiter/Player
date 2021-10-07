//ENV
const dotenv = require('dotenv').config()

// express
const express = require('express');
const app = express();

//database
const  mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;


//db handling
db.on('error', (error) => {
 console.error(error);
});

db.once('open', () => {
 console.log('connected to database');
})


app.use(express.json());

const playerRouter = require('./Routes/Players');

app.use('/Players', playerRouter);

app.listen(process.env.PORT, () => {
 console.log(`process started at PORT : ${process.env.PORT}`);
})