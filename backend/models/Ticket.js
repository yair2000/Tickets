const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  product: {
    type: String,
    required: [true, "Please select a product"],
    enum: ["Laptop", "Smartphone", "Lamp", "Printer"]
    // enum: []
  },
  description: {
    type: String,
    required: [true, "Please describe your problem"]
  },
  status: {
    type: String,
    required: true,
    enum: ["New", "Open", "Closed"],
    default: "New",
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Ticket", TicketSchema);