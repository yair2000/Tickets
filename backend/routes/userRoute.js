const express = require("express");
const router = express.Router();
const regUser = require("../controllers/regController");
const logUser = require("../controllers/logController");
const getUser = require("../controllers/userController");
const {protect} = require("../middleware/authMiddleware");


router.post("/", regUser);
router.post("/login", logUser);
router.get("/me", protect, getUser);

module.exports = router;