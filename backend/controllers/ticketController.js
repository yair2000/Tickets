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

const getTicket = asyncHandler(async (req, res) =>{
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
   const tickets = await Ticket.find({user: req.user.id});
   res.status(200).json(tickets);
});

const updateTicket = asyncHandler(async (req, res) =>{
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
       req.body,
       { new: true });
   res.status(200).json(updatedTicket);
});

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

module.exports = {getTicket, deleteTicket, updateTicket, getTickets, createTicket}
