const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const userSchema    = new Schema({
    userName :{
        type: String
    },
    accountNumber : {
        type : Number
    },
    emailAddress : {
        type : String
    },
    identityNumber : {
        type : Number
    }
}, {timestamp : true});

const User = mongoose.model('User', userSchema);
module.exports = User;
