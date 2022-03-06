const asyncHandler = require("express-async-handler");

const User = require("../models/User");
const Ticket = require("../models/Ticket");

const createTicket = asyncHandler(async (req, res) =>{
   const {product, description} = req.body
   if(!product || !description){
      res.status(400);
      throw new Error("Enter A Product And Provide Its Description");
   }
   const user = await User.findById(req.user.id);
   if(!user){
      res.status(401);
      throw new Error("User Not Found");
    }
    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: "New"
    });
    res.status(201).json(ticket);
});

module.exports = createTicket
