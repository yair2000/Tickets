const asyncHandler = require("express-async-handler");

const User = require("../models/User");
const Ticket = require("../models/Ticket");

const deleteTicket = asyncHandler(async (req, res) =>{
   const user = await User.findById(req.user.id);
   if(!user){
      res.status(401);
      throw new Error("User Not Found");
   }
   const ticket = await Ticket.findById(req.params.id);
   if(!ticket){
      res.status(404);
      throw new Error("Ticket Not Found");
   }
   if(ticket.user.toString() !== req.user.id){
      res.status(401);
      throw new Error("Not Authorized For This Action");
   }
   await ticket.remove();
   
   res.status(200).json({success: true});
});

module.exports = deleteTicket