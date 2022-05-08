const session = require('express-session');

const dotenv = require("dotenv").config();

const MongoStore = require('connect-mongo');

const newSession = session({ 
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI  })
  });

  module.exports = { newSession };