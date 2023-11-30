const asyncHandler = require("express-async-handler");

const User = require("../models/User");
const Ticket = require("../models/Ticket");

const updateTicket = asyncHandler(async(req, res) =>{
  const user = await User.findById(req.user.id);
  if(!user){
    res.status(401);
    throw new Error("User Not Found");
  }

  const ticket = await Ticket.findById(req.params.id);
  res.status(200).json(ticket);
  if(!ticket){
    res.status(404);
    throw new Error("Ticket Not Found");
  }
  if(ticket.user.toString() !== req.user.id){
    res.status(401);
    throw new Error("Not Authorized For This Action");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
  req.params.id,
  req.body, { new: true });
  res.status(200).json(updatedTicket);
});

module.exports = updateTicket;