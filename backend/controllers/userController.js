const asyncHandler = require("express-async-handler");

const getUser = asyncHandler(async (req, res) =>{
    const user = {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
    }
    res.status(200).json(user);
    return user
})
module.exports = getUser