var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table2');

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

var display = function () {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("--------------------------");
        console.log("Thank you for visiting Bamazon.");
        console.log("--------------------------");
        console.log("");
        console.log("Choose your Crossfit gear from the list below");
        console.log("");
        connection.end();

        var table = new Table({
            head: ["Product Id", "Description", "Cost"],
            colWidths: [12, 50, 8],
            colAligns: ["center", "left", "right"],
            style: {
                head: ["aqua"],
                compact: true
            }
        });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].id, res[i].product_name, res[i].price]);
        }
        console.log(table.toString());
        console.log("");
    });
};

var productChoice + function() {
    inquirer.prompt({
        name: "productToBuy",
        type: "input",
        message: "Please enter the Product Id of the item you wish to purchase."
    }).then(function(answer1){

        var choice = answer1.productToBuy;
        connection.query("SELECT * FROM products WHERE Id=?", choice, function(err, res){
            if (err) throw err;
            if (res.length === 0){
                console.log("Product selected does not exist, please choose from list above.")
            };
        })
    })
}

display();