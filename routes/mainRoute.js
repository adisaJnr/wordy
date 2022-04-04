const express = require('express')

const { Post } = require('../models/post')

const mainRouter = express.Router()



  // homepage
  mainRouter.get('/',(req,res)=>{
    Post.find()
    // arranging it according to time deployed
    .sort({createdAt: -1})
    .then((result)=>{
          // console.log(result);
      res.render('home', { posts: result});
    })
    .catch((error)=>{
      console.log(error);
    });
   
  });

  // about wordy
  mainRouter.get('/about',(req,res)=>{
    res.render('about');
  })


  mainRouter.all('*',(req,res)=>{
    // res.send('The webpage you requested does not exist')
    res.status(404).render('404');
  })


  // exporting our mainRouter
module.exports = { mainRouter }