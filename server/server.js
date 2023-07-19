const express = require('express');
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

//express app
const app = express();

//middleweare to read body, parse it and place results in req.bdoy
app.use(express.urlencoded({extended: true}));       // for application/x-www-form-urlencoded

//set requesst size to 50mb
const bodyParser = require('body-parser'); 
app.use(bodyParser.json({ limit: "50mb" }))

//middleware to enable requests between multiple browsers 
const cors = require('cors')
app.use(cors())

//connect to mongodb
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`)))
  .catch((err) => console.log(err));

//Api routes 
app.use('/user', userRoutes);