//password mongodb: uQ2tb9ESYdyZ292x
//connect MONGODB: mongodb+srv://dario:<password>@cluster0-kqqh5.mongodb.net/test?retryWrites=true&w=majority


const express = require('express');
const bodyParser = require('body-parser');

const app = express()

//connect to MONGODB - npm install --save mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dario:uQ2tb9ESYdyZ292x@cluster0-kqqh5.mongodb.net/test?retryWrites=true&w=majority')
.then(() => {
  console.log('Successfully connected to MongoDB Atlas!');
})
.catch((error) => {
  console.log('Unable to connect to MongoDB Atlas!');
  console.error(error);
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());  



module.exports = app