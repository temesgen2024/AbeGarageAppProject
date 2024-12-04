// Import the express module 
const express = require("express");
// Call the router method from express to create the router 
const router = express.Router();
//  Import the install router 
const installRouter = require("./install.router");
// Add the install router to the main router 
router.use("/install", installRouter);
// Export the router for use in the application
module.exports = router;