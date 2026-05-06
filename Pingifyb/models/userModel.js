const mongoose = require("mongoose");
const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    ProfilePic: {
        type: String,
        default: ""
    }
}, { timestamps: true })
const UserModel = mongoose.model("User", userModel)
module.exports = UserModel;