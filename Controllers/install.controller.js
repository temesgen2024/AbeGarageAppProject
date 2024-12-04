// Import the install service to handle communication with the database
const installService = require("../services/install.service");
// Create a function to handle the install request
exports.install = async (req, res) => {
    // Call the install service to create the database
    const install = await installService.install
    // check if th install was successful or not send the appropriate to the client
    if (install === "200") {
    // if seccessful send a success message
    res.status(200).send({ message: "installmessage" });
    } else {
    // if  not successful send an error message
    res.status(500).send({ message: "installerror" });
    }
};
// export the install function
module.exports = { install };
