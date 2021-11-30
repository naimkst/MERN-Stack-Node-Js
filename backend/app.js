const express = require("express");
const product = require('./routes/productRouter');
const errorMiddleware = require('./middleware/error');
const userRoute = require('./routes/userRouter');
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cookieParser());

//Routers
app.use('/api', product);
app.use('/api', userRoute);


//For Error Middleware
// app.use(errorMiddleware);



module.exports = app;