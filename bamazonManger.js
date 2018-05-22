const mysql = require("mysql");
const inquirer = require('inquirer');
//validates and only allows letters
var isString = require('is-string');
//validates numbers
var isNumber = require('is-number');
require("dotenv").config();


const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user:process.env.DB_USERNAME,

	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE
});

connection.connect((err) => {
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
		        "Add New Product",
		        "Exit"
		      ]
		    },
			]).then((answer) => {
				switch (answer.whatDo) {
					case "View Products for Sale":
				    viewAll();
				    break;
					
					case "View Low Inventory":
				    viewLow();
				    break;
					
					case "Add to Inventory":
				    addI();
				    break;

					case "Add New Product":
				    addP();
				    break;

				    case "Exit":
			    	Exit();
			    	break;
			    };
			});
};
//shows table 
function viewAll(){
	var query = "select id, product, price, stock from products2"
	connection.query(query, (err, res) =>{
		if (err) throw err;
		console.log(res);
		console.log("-----------------------");
		doWhat();
	});
};
//shows all iteams with a stock lower then 5
function viewLow(){
	var query = "SELECT product, stock FROM products2 WHERE stock BETWEEN ? AND ?";
	connection.query(query, [0, 5], (err, res) => {
		if(err) throw err;
		console.log(res);
		doWhat();
	});
};
// add to inventory
function addI(){
	//promting user
	  	inquirer
	  	.prompt([
		  	{
		      name: "id",
		      type: "input",
		      message: "Which item number do you wanna update?",
		    	validate: (val) => {
					if(isNumber(val)){
						return true;
					}else{
						return false;
					}
				}		      	      
		    },
		    {
		    	name: "amount",
		    	type: "input",
		    	message:"How much was added?",
		    	validate: (val) => {
					if(isNumber(val)){
						return true;
					}else{
						return false;
					}
				}
		    }
		]).then((answer) =>{
			// getting stocks from product wanted 
			 query = "select stock from products2 where ?"
			connection.query(query, { id:answer.id }, function(err, res)
			{
				if (err) throw err;
				for (var i = 0; i < res.length; i++) {
					var stocks = parseFloat(res[0].stock) + parseFloat(answer.amount)
				}
				var query = connection.query(
			    "UPDATE products2 SET ? WHERE ?",
			    [
			      {

			        stock: stocks 
			      },
			      {
			        id: answer.id
			      }
			    ],
			    (error, responce) => {
			      console.log("products updated!\n");
			      doWhat();
			    });
			});
		});     
}	
//adds a new product to table 
function addP(){
	  	inquirer
	  		.prompt([
		  	{
		      name: "item",
		      type: "input",
		      message: "What do you Want to add?",
		    	validate: (val) => {
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
		    	validate: (val) => {
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
		    	validate: (val) =>{
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
		    	validate:  (val) => {
					if(isNumber(val)){
						return true;
					}else{
						return false;
					}
				}		    	
		    },
			]).then((answer) => {
	    var query = connection.query(
	    "INSERT INTO products2 SET ?",
	    {
	      product: answer.item,
	      department: answer.department,
	      price: answer.price,
	      Stock: answer.stock,
	      product_sales: 0
	    },
		    (err, res) => {
	   	      console.log(" product Added!\n");
	   	      doWhat();
		    });
		});
};
const Exit = () => { connection.end(); } 			