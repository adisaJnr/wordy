const express = require('express');

const { Post } = require('../models/post');

const authRouter = express.Router();

const authController = require('../controller/authController');
 
// get_new_post_form,publish_new_post,get_single_post,get_update_post_form,update_single_post,delete-single_post
 //new post
 authRouter.get('/register',authController.renderregisterUser);
 authRouter.post('/register',authController.registerUser);
 authRouter.get('/signin',authController.renderloginUser);
 authRouter.post('/signin',authController.loginUser);
//  authRouter.get('/dash',authController.dashboard);



// exporting our Postrouter
module.exports = { authRouter }