//password mongodb: uQ2tb9ESYdyZ292x
//connect MONGODB: mongodb+srv://dario:<password>@cluster0-kqqh5.mongodb.net/test?retryWrites=true&w=majority


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

const app = express()

//connect to MONGODB - npm install --save mongoose

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

app.use('/api/auth',userRoutes);
app.use('/api/sauces',sauceRoutes)



module.exports = app