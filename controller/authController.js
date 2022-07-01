const { User } = require("../models/user");
const bcrypt = require("bcrypt");

const { upload } = require('../middlewares/upload')

//defining the file upload type

const storage = upload.single('image') 

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
const loginUser = async (req, res) => {
  try {
    const body = req.body;
    if (!body.email || !body.password) {
      // send an error Message
      req.flash("error", "please do well to provide all the information below");

      return res.status(400).redirect("/auth/signin");
    }
    //finding user
    const user = await User.findOne({ email: body.email.toLowerCase() });

    //if user not found
    if (!user) {
      req.flash("error", "Invalid email or password");
      return res.status(404).redirect("/auth/signin");
    }
    // if user found
    //check password match
    const valid = helpers.validatePassword(body.password, user.password);
    if (!valid) {
      req.flash("error", "Invalid email or password");
      return res.status(404).redirect("/auth/signin");
    }
    //if password match
    //create a session
    req.session.user = user;
    // sending a success message
    req.flash("success", "Login Succesful");
    return res.status(200).redirect(`/auth/dash/${user._id}`);
  } catch (error) {
    req.flash("error", "something went wrong");
    // send a failed message
    return res.status(500).redirect("/auth/signin");
  }
};
const renderdashboard = (req, res) => {
  return res.render("dash");
};

const logoutUser = (req, res)=>{
  return req.session.destroy(()=>{
    res.redirect('/auth/signin')
  })

}
const updateUser = async (req ,res)=>{
  storage(req, res ,async(error)=>{
    if(error){
      req.flash('error', error.message);
      return res.status(400).redirect('/auth/dash' + req.user._id)
    }
    const body = req.body;

    if(req.file){
      body.image = req.file.path;
    }

    if (!body.firstname && !body.lastname && !body.email && !body.phone && !body.about) {
      req.flash("error", "Update Information required");

      return res.status(200).redirect(`/auth/dash/${req.user._id}`);
      // send an error Message
    }
    // updating the user
    // console.log(body);
    if (body.email) {
      const duplicateEmail = await User.findOne({ email: body.email.toLowerCase() });
      if (duplicateEmail && (duplicateEmail._id.toString() != req.user._id.toString())) {
        req.flash('error', ' The email is already in use')
        return res.status(400).redirect(`/auth/dash/${req.user._id}`);
      }
    }

    const user = await User.findByIdAndUpdate(req.user._id,body,
       {new: true })
       req.session.user = user;
       //sending a success message
       req.flash('success','successfully Update Profile')
       return res.status(400).redirect(`/auth/dash/${req.user._id}`);  
  })
}
const updatePassword = async(req,res)=>{
  const body = req.body;

  if (!body.currentPassword || !body.newPassword || !body.confirmPassword ) {
    // send an error Message
    req.flash("error", "Password Update Information required");

    return res.status(200).redirect(`/auth/dash/${req.user._id}`);
    
  }
  if(body.newPassword != body.confirmPassword){
    // send an error Message
    req.flash("error", "Password does not match");

    return res.status(400).redirect(`/auth/dash/${req.user._id}`); 
  }
  const user = await User.findById(req.user._id)
  isValid = helpers.validatePassword(body.currentPassword,user.password);
  if(!isValid){
    // send an error Message
    req.flash("error", "Invalid Password");

    return res.status(400).redirect(`/auth/dash/${req.user._id}`); 

  }
  user.password = helpers.generatepasswordhash(body.newPassword);
  await user.save()

  //send a success message
  req.flash("success", "Password update successfulf");

  return res.status(200).redirect(`/auth/dash/${req.user._id}`); 
  
}
// const loginUser = async (req, res) => {
// try {
// const body = req.body;
// const user = await User.findOne({ email: body.email });
// if (user) {
// const valid = await bcrypt.compare(body.password, user.password);
// if (valid) {
// req.session.user_id = user._id;
// sending a successful message
// req.flash("success", "You have successfully signin to your dashbord");
// res.redirect("/user/dash");
// } else {
// login error
// req.flash("error", "Password is incorrect");
// res.redirect("/auth/sginin");
// }
// } else {
// login error
// req.flash("error", "Password is incorrect");
// res.redirect("/auth/signin");
// }
// } catch (error) {
// login error
// req.flash("error", "Error from server");
//  console.log(error);
// res.status(500).redirect("/auth/signin");
// }
// };

module.exports = {
  renderregisterUser,
  registerUser,
  renderloginUser,
  loginUser,
  renderdashboard,
  logoutUser,
  updateUser,
  updatePassword,
};
