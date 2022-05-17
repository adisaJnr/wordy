const express = require('express');

// creating the router
const dashRouter = express.Router();
const dashController = require('../controller/dashController');

// profile 
dashRouter.get('/dash', dashController.profile);

// exporting our dash router
module.exports = { dashRouter }; 