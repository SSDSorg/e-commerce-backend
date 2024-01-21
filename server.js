const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// importing routes 
const signupRoute = require('./routes/signup');
const signinRoute = require('./routes/signin');
const addressRoute = require('./routes/address');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const pastordersRoutes = require('./routes/pastorders');

dotenv.config();


const connectDB = require('./connectDB'); // importing db connection function

connectDB(); // initializing db connection


const port = 8080;

const app = express();


app.use(express.json());
app.use(cors());


// using different routes 
app.use('/signup', signupRoute);
app.use('/signin', signinRoute);
app.use('/address', addressRoute);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/pastorders',pastordersRoutes);


app.listen(port, () => {
    console.log(`Server listening at ${port}`);
});