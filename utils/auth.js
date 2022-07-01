const bcrypt = require('bcrypt')

const generatepasswordhash = (password) =>{
    return bcrypt.hashSync(password,10);
}
const validatePassword = (password,hash)=>{
    return bcrypt.compareSync(password,hash)
}
module.exports = {
     generatepasswordhash,
     validatePassword,
 }