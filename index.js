require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');


/**
 * setup mongo connection
* */
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Mongo database connected'))
  .catch((err) => {
    console.log(err);
    console.log('Mongo database connection faild');
  });

/**
 * middlewares
* */

const app = express();
const corsOptions = {
  origin: 'https://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/static', express.static(path.join(__dirname, 'uploads')));


/**
 * routes
* */

app.get('/', async (req, res) => {
  res.send({ status: 'ping' });
});
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));

app.use((req, res) => {
  res.send({ message: 'url not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT , ()=> {  console.log(`Server running on: htto://localhost:${PORT}`)  })