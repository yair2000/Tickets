const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Ticket"
  },
  text: {
    type: String,
    required: [true, "Please add your text"]
  },
  isStaff: {
    type: Boolean,
    default: false
  },
  staffId: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Note", NoteSchema);