const bcrypt = require('bcrypt')

const generatepasswordhash = (password) =>{
    return bcrypt.hashSync(password,10);
}
module.exports = {
     generatepasswordhash,
 }