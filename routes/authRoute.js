const express = require('express');

const { Post } = require('../models/post');

const authRouter = express.Router();

const authController = require('../controller/authController');

const {loggedRequired , logoutRequired}  = require('../middlewares/auth')
 
// get_new_post_form,publish_new_post,get_single_post,get_update_post_form,update_single_post,delete-single_post
 //new post
 authRouter.get('/register', logoutRequired ,authController.renderregisterUser);
 authRouter.post('/register', logoutRequired,authController.registerUser);
 authRouter.get('/signin', logoutRequired,authController.renderloginUser);
 authRouter.post('/signin', logoutRequired,authController.loginUser);
 authRouter.get('/dash/:userId',loggedRequired,authController.renderdashboard);

 authRouter.get('/signout',loggedRequired,authController.logoutUser);
 authRouter.post('/update',loggedRequired,authController.updateUser);
 authRouter.post('/update/password',loggedRequired,authController.updatePassword);




// exporting our Postrouter
module.exports = { authRouter }