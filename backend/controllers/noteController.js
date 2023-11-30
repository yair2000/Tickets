const asyncHandler = require("express-async-handler");

const Note = require("../models/Note");
const Ticket = require("../models/Ticket");
const User = require("../models/User");

const getNotes = asyncHandler(async (req, res) =>{
  const user = await User.findById(req.user.id);

  if(!user){
    res.status(401);
    throw new Error("User Not Found");
   }
   const ticket = await Ticket.findById(req.params.ticketId);

   if(ticket.user.toString() !== req.user.id){
     res.status(401);
     throw new Error("Not Authorized For This Action");
   }
   const notes = await Note.find({ticket: req.params.ticketId});
   res.status(200).json(notes);
});

const addNote = asyncHandler(async (req, res) =>{
  const user = await User.findById(req.user.id);

  if(!user){
    res.status(401);
    throw new Error("User Not Found");
  }
  const ticket = await Ticket.findById(req.params.ticketId);
  
  if(ticket.user.toString() !== req.user.id){
    res.status(401);
    throw new Error("Not Authorized For This Action");
  }
  const note = await Note.create({
    user: req.user.id,
    isStaff: false,
    ticket: req.params.ticketId,
    text: req.body.text
  });
  res.status(200).json(note);
});

module.exports = { getNotes, addNote }