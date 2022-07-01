const { User } = require('../models/user')

loggedRequired =  async (req, res, next) => {
  if (req.session && req.session.user) {
    //find the user
    const user = await User.findById(req.session.user._id);
    if (!user) {
      //if user not found
      req.flash('error', 'You need to sign in first')
      return res.redirect('/auth/signin')
    }
    //if user found
    req.user = user;
    return next()
  }
  //if no user in seesion
  req.flash('error', 'You need to sign in first')
  return res.redirect('/auth/signin')
}
logoutRequired = (req, res, next)=>{
  if (req.session && req.session.user) {
    //find user in session
    return res.redirect('/auth/dash/' + req.session.user.
    _id)
  }
  return next()
}
module.exports = { loggedRequired, logoutRequired }