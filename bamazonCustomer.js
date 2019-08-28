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

var shopping = function() {
    inquirer.prompt({
        name: "productToBuy",
        type: "input",
        message: "Please enter the Product Id of the item you wish to purchase.!"
    }).then(function(answer1){

        var selection = answer1.productToBuy;
        connection.query("SELECT * FROM products WHERE Id=?", selection, function(err, res){
            if (err) throw err;
            if (res.length === 0){
                console.log("Product selected does not exist, please choose from list above.");
                shopping();
            }else{
                inquirer.prompt({
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to purchase?"
                }).then(function(answer2){
                    var quantity = answer2.quantity;
                    if (quantity > res[0].stock_quantity) {
                        console.log("We apologize, we only have " + res[0].stock_quantity + " left in stock of selected item.")
                    shopping();
                    }else{
                        console.log("");
                        console.log(res[0].product_name + " purchased");
                        console.log(quantity + " qty @ $" + res[0].price);
                        

                        var newQuantity = res[0].stock_quantity - quantity;
                        connection.query(
                            "UPDATE products SET stock_quantity = " + newQuantity + " WHERE id = " + res[0].id, function(err, resUpdate) {
                                if (err) throw err;
                                console.log("");
                                console.log("Your order has been processed.");
                                console.log("Thank you for shopping at Bamazon.");
                                console.log("");
                                connection.end();

                            }
                        );
                    }
                });
            }
            
        });
    });
};

display();