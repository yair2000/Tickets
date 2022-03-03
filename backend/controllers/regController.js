const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const User = require("../models/User");

const regUser = asyncHandler(async (req, res) =>{
   const {name, email, password} = req.body

   if(!name || !email || !password){
      res.status(400);
      throw new Error("Please fill all fields");
   }

   const userValid = await User.findOne({email});
   if(userValid){
      res.status(400);
      throw new Error("User and/or Mail already exists");
   }
   const salt = await bcrypt.genSalt(10);
   const hashedPass = await bcrypt.hash(password, salt);

   const user = await User.create({
      name,
      email,
      password: hashedPass
   });

   if(user){
      res.status(201).json({
         id: user._id,
         name: user.name,
         email: user.email,
         token: genToken(user._id)
      });
   }
   else{
      res.status(400);
      throw new Error("Invalid Data");
   }
});

const genToken = (id) =>{
   return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
      expiresIn: "365d"
   });
}
module.exports = regUser