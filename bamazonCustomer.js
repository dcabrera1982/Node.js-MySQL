var mysql = require("mysql");
var inquirer = require("inquirer");

// Create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

// Port
port: 3306,

// Username
user: "root",

// Password 
password: "IlmkJD&L4life",
database: "bamazon_db"
})

// Connect to the mysql server and sql database
connection.connect(function(err) {
    console.log("Connected as id: "+connection.threadId);
    if (err) throw err;
    // Run the start function after the connection is made to prompt the user
    start();
    
});

// Display purchase amount
function start() {
    inquirer
        .prompt({
            name: "item_id",
            type: "list",
            message: "Please select which item you would like to purchase by item_id",
            choices: [1, 2, 3]
        })
        connection.end();
    }
