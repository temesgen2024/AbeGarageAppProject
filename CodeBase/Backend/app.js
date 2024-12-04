//  Import the express module 
const express = require("express");
// Import the dotenv module and call the config method to load the environment variables
require("dotenv").config();
// Create a variable to hold our port number
const PORT = process.env.PORT || 5500;
// import the router
const router = require("./routes/index");
// Create the webserver 
const app = express();
// Add the router to the application as middleware
app.use(router);
// start the webserver
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// export the webserver for use in the application
module.exports = app;

