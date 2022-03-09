const express = require("express");
const router = express.Router();

const createTicket = require("../tickets/create");
const { getTicket, getTickets } = require("../tickets/read");
const updateTicket = require("../tickets/update");
const deleteTicket = require("../tickets/delete");

const { protect } = require("../middleware/authMiddleware");

const noteRouter = require("./noteRoute");
const { route } = require("./noteRoute");
router.use("/:ticketId/notes", noteRouter);

router.route("/").get(protect, getTickets).post(protect, createTicket);
router.route("/:id").get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket);

module.exports = router