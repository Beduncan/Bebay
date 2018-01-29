const mysql = require("mysql");
const inquirer = require('inquirer');
//gettting connection
const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user:'root',

	password: '1988Vwgti',
	database: "bamazon"
});

connection.connect(function(err){
	if (err) throw err; 
	console.log("connected as id " + connection.threadId);
}); 
connection.query("select product_sales from products2", function(err, res) {
 console.log(res);
}