const express = require('express');
const authRoute = require('./routes/api/authRoute');
const templateRoutes = require('./routes/api/templateRoutes-DB');
const userRoute = require('./routes/api/userRoute');
const aboutRoutes = require('./routes/api/aboutRoutes');

const cors = require('cors'); 

const connectDB = require ('./config/connectDB');
 

const app = express();

//connect to db
//set a middleware to parse dat
connectDB();

app.use(express.json());
app.use(cors());

//** Ismaila api, templates,user,abouts ****/
app.use('/api/templates', templateRoutes);
app.use('/api/user', userRoute);
app.use('/api/abouts',aboutRoutes);
app.use('/api/auth', authRoute);

//in index.js make sure prot point to process .env port
let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('server started');
});
