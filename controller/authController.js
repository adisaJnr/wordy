const { User } = require("../models/user");
const bcrypt = require('bcrypt');

const helpers = require("../utils/auth");

const renderregisterUser = (req, res) => {
  return res.render("register");
};
const registerUser = async (req, res) => {
  try {
    const body = req.body;

    if (!body.firstname || !body.lastname || !body.email || !body.password) {
      req.flash("error", "please do well to provide all the information below");

      return res.status(400).redirect("/auth/register");
      // send an error Message
    }
    body.password = helpers.generatepasswordhash(body.password);
    body.email = body.email.toLowerCase();
    const isExisting = await User.findOne({ email: body.email });
    if (isExisting) {
      req.flash("error", "This email is already in use.");
      // send a message that email is duplicated
      return res.status(400).redirect("/auth/register");
    }
    await new User(body).save();
    // send a success message
    req.flash("success", "Register sucessful please sign in");
    return res.status(201).redirect("/auth/signin");
  } catch (error) {
    req.flash("error", "something went wrong");
    // send a failed message
    return res.status(500).redirect("/auth/register");
  }
};
const renderloginUser = (req, res) => {
  return res.render("signin");
};
// const loginUser = ((req,res)=>{
//   const email = req.body.email;
//   const password = req.body.password;
// console.log(email);
const loginUser = async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
      const valid = await bcrypt.compare(body.password, user.password);
      if (valid) {
        req.session.user_id = user._id;
        //sending a successful message
        req.flash("success", "You have successfully signin to your dashbord");
        res.redirect("/user/dash");
      } else {
        //login error
        req.flash("error", "Password is incorrect");
        res.redirect("/auth/sginin");
      }
    } else {
      //login error
      req.flash("error", "Password is incorrect");
      res.redirect("/auth/signin");
    }
  } catch (error) {
    // login error
    req.flash("error", "Error from server");
    //  console.log(error);
    res.status(500).redirect("/auth/signin");
  }
};

module.exports = {
  renderregisterUser,
  registerUser,
  renderloginUser,
  loginUser,
};
