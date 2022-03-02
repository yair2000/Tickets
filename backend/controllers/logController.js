const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const User = require("../models/User");

const logUser = asyncHandler(async (req, res) =>{
    const {email, password} = req.body
    const user = await User.findOne({email});
 
    if(user && (await bcrypt.compare(password, user.password))){
       res.status(200).json({
          id: user.id,
          name: user.name,
          email: user.email,
          token: genToken(user._id)
       });
    }
    else{
       res.status(401);
       throw new Error("Invalid Login Data");
    }
 });

 const genToken = (id) =>{
    return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
       expiresIn: "365d"
    });
 }
 module.exports = logUser