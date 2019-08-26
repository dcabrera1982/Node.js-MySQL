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
    // start();
    connection.end();
});

// Display purchase amount
// var totalPurchase = (id, quantity) => {
//     connection.query("SELECT price FROM products WHERE item_id=?", function(err, result) {
//         if (err) throw err;
//         var price = result[0].price;
//         var purchaseTotal = price*quantity;
//         console.log("Thank you, come again.");
//         console.log("Your total for this transaction was $" + purchaseTotal);
//         connection.end();
//     })
// }