const { User } = require("../models/user");

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
      req.flash(
        "error",
        "This email is already in use."
      );
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
module.exports = {
  renderregisterUser,
  registerUser,
  renderloginUser,
};
