// //  Import the query function from the db.config.js file 
// const conn = require("..config/db.config");
// const { ifError } = require("assets");
// const { table } = require("console");
// const { create } = require("domain");
// // import the fs module to read the sql file
// const fs = require("fs");
// //  Write a function to create the database tables 
// async function install() {
// // Create a variable to hold the path to the sql folder 
// const queryfile = __dirname + "/sql/install_quaries.sql";
// // Temporary variable, used to store all queries, the return message and the current query
// let query = [];
// let finalMessage = [];
// let templines =[ ];
// }
// // Read the sql file
// const lines = await fs.readFileSync(queryfile).toString().split("\n");
// // Create a promise to handle the asynchronous reading of the file and storing of the queries in the variables 
// const promise = new Promise((resolve, reject) => {
//     // itrate over all linees
//     lines.forEach((line) => {
//         // check if the line is a comment
//         if (line.trim().endsWith(";")) {
//             // if the simcolan is at the end, it is th end of the query
//             // prepare the individual query
//             const queryline = templines.trim();
//             // add query  to the list of queries
//             query.push(sqlquery);
//             templines = "";
    
//         }
//     });
//   resolve("query are added to the list");
// });
// // Loop through the queries and execute them one by one asynchronously  
// for (let i = 0; i < query.length; i++) {
//     try {
//         // Execute the query
//         const result = await conn.query(query[i]);
//         console.log("table are created");

//         // Check if the query was successful
//         if (result[0].serverStatus === 2) {
//             // If the query was successful, add the success message to the final message
//             finalMessage.push(`Query ${i + 1} was successful`);
//         } else {
//             // If the query was unsuccessful, add the error message to the final message
//             finalMessage.push(`Query ${i + 1} failed`);
//         }
//     } catch (error) {
//         // console.log the error occurred(all table are not created)
//         finalMessage.push(" all table are not created");
//     }
// }
// // eport the install function for use in the controller
// module.exports = install;



// Import the query function from the db.config.js file 
const conn = require("../config/db.config"); // Fixed path to db.config
const fs = require("fs");
console.log('Loading install module...');
const install = require('./path/to/install');

// Write a function to create the database tables 
async function install() {
    // Create a variable to hold the path to the sql folder 
    const queryfile = __dirname + "/sql/install_queries.sql"; // Fixed typo in filename
    let query = []; // Store queries
    let finalMessage = []; // Store messages
    let templines = ""; // Temporary variable for constructing queries

    // Read the sql file asynchronously
    const lines = await fs.promises.readFile(queryfile, 'utf-8'); // Use promises for async/await
    const splitLines = lines.split("\n");

    // Iterate over all lines
    splitLines.forEach((line) => {
        // Check if the line is not empty and not a comment
        if (line.trim() && !line.trim().startsWith("--")) {
            templines += line.trim() + " "; // Append line to temporary variable
            
            // Check for the end of a query
            if (line.trim().endsWith(";")) {
                // Prepare the individual query
                const queryline = templines.trim(); // Finalize the query
                query.push(queryline); // Add query to the list
                templines = ""; // Reset temporary variable
            }
        }
    });

    // Loop through the queries and execute them one by one asynchronously  
    for (let i = 0; i < query.length; i++) {
        try {
            // Execute the query
            const result = await conn.query(query[i]);
            console.log("Table created");

            // Check if the query was successful
            if (result[0].serverStatus === 2) {
                finalMessage.push(`Query ${i + 1} was successful`);
            } else {
                finalMessage.push(`Query ${i + 1} failed`);
            }
        } catch (error) {
            // Log the error and add to the final message
            console.error("Error executing query:", error);
            finalMessage.push(`Query ${i + 1} failed: ${error.message}`);
        }
    }

    // Optionally log all messages
    console.log(finalMessage.join("\n"));
}

// Export the install function for use in the controller
module.exports = install;
