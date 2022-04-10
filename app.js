const express = require('express');

const mongoose = require('mongoose');

const { Post } = require('./models/post')

const { postRouter } = require('./routes/postRoute')

const { mainRouter } = require('./routes/mainRoute')

const bodyParser = require('body-parser');

const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 5500;




const app = express();

// setting the default views
app.set('view engine' ,'ejs');
  
//setting up middleware

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

dburi =
  "mongodb+srv://Joshman:Joshman@joshua.v1ym4.mongodb.net/wordy?retryWrites=true&w=majority";
mongoose
  .connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Connected to server on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));


// everything related to CRUD posts
  app.use('/posts',postRouter);


// everything related to home about and 404
   app.use(mainRouter);

  


 
