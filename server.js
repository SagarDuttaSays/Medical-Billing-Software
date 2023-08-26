const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

//can be used for connecting with front end -- SCALABILITY
app.use(cors());
app.options('*', cors())

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

//Routes
const productsRoutes = require('./routes/products');
const servicesRoutes = require('./routes/services');
const usersRoutes = require('./routes/users');
const userCartRoutes = require('./routes/userCart')

const api = process.env.API_URL;

app.use(`${api}/products`, productsRoutes);
app.use(`${api}/services`, servicesRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/user/cart`, userCartRoutes);

//Database
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

app.get(`/`, (_,res)=>{
    res.status(200).json({message:"Welcome to Online Billing System"})
})
//Server
app.listen(3000, ()=>{

    console.log('server is running http://localhost:3000');
})