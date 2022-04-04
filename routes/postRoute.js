const express = require('express');

const { Post } = require('../models/post');

const postRouter = express.Router();

const postController = require('../controller/postController');
 
// get_new_post_form,publish_new_post,get_single_post,get_update_post_form,update_single_post,delete-single_post
 //new post
 postRouter.get('/new_post',postController.get_new_post_form);

// postRouter.get('/',(req,res)=>{
//   res.render('new_post')
// })

//new post using app.post
// publish new post

postRouter.post('/new_post',postController.publish_new_post);


// readmore on posts  
postRouter.get('/read/:id',postController.get_single_post);


//updating post

postRouter.get('/update/:id',postController.get_update_post_form);

postRouter.post('/update/:id',postController.update_single_post);
 
//deleting of post
postRouter.delete('/delete_post/:id',postController.delete_single_post,);


// exporting our Postrouter
module.exports = { postRouter }