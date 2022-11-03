const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        minlength: [3, "Name must be at least 3 characters"]
    },
    
}, { timestamps: true });
module.exports.User = mongoose.model('User', UserSchema);