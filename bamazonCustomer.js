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
connection.connect();

var display = function() {

connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log();
        console.log("Thank you, come again.");
        console.log("Your total for this transaction was $" + purchaseTotal);
        connection.end();
    })
}