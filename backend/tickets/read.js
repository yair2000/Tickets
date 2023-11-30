const asyncHandler = require("express-async-handler");

const User = require("../models/User");
const Ticket = require("../models/Ticket");

const getTicket = asyncHandler(async(req, res) =>{
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
  res.status(200).json(ticket);
});

const getTickets = asyncHandler(async (req, res) =>{
  const user = await User.findById(req.user.id);
  if(!user){
    res.status(401);
    throw new Error("User Not Found");
  }
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

module.exports = { getTicket, getTickets };