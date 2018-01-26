const mysql = require("mysql");
const inquirer = require('inquirer');
//validates and only allows letters
var isString = require('is-string');
//validates numbers
var isNumber = require('is-number');

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
	doWhat();
}); 
function doWhat(){
	inquirer
	  		.prompt([
		  	{
		      name: "whatDo",
		      type: "list",
		      message: "What do you Want to do?",
		      choices: [
		        "View Products for Sale",
		        "View Low Inventory",
		        "Add to Inventory",
		        "Add New Product"
		      ]
		    },
			]).then(function(answer){
				if (answer.whatDo === "View Products for Sale") {
					viewAll();
				} else if (answer.whatDo === "View Low Inventory") {
					viewLow();
				} else if (answer.whatDo === "Add to Inventory") {
					addI();
				}else {
					addP();
				}
			});
};
function viewAll(){
	var query = "select id, product, price, stock from products2"
	connection.query(query, function(err, res)
	{
		if (err) throw err;
		console.log(res);
		console.log("-----------------------");
		doWhat();
	});
};
function viewLow(){
	var query = "SELECT product, stock FROM products2 WHERE stock BETWEEN ? AND ?";
	connection.query(query, [0, 5], function(err, res){
		if(err) throw err;
		console.log(res);
		doWhat();
	});
};
function addI(){

}
function addP(){
	  console.log("What product do you wanna add...\n");
	  	inquirer
	  		.prompt([
		  	{
		      name: "item",
		      type: "input",
		      message: "What do you Want to add?",
		    	validate: function(val){
					if(isString(val)){
						return true;
					}else{
						return false;
					}
				}		      	      
		    },
		    {
		      name: "department",
		      type: "input",
		      message: "Which department does it belong too?",
		    	validate: function(val){
					if(isString(val)){
						return true;
					}else{
						return false;
					}
				}		      
		    },
		    {
		    	name:"price",
		    	type:"input",
		    	message:"What is the price of the product?",			
		    	validate: function(val){
					if(isNumber(val)){
						return true;
					}else{
						return false;
					}
				}
		    },
		    {
		    	name:"stock",
		    	type:"input",
		    	message:"How many are you inserting?",
		    	validate: function(val){
					if(isNumber(val)){
						return true;
					}else{
						return false;
					}
				}		    	
		    },
			]).then(function(answer){
	    var query = connection.query(
	    "INSERT INTO products2 SET ?",
	    {
	      product: answer.item,
	      department: answer.department,
	      price: answer.price,
	      Stock: answer.stock
	    },
		    function(err, res) {
	   	      console.log(" product Added!\n");
	   	      doWhat();
		    });
		});
};
