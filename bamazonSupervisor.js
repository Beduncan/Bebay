const mysql = require("mysql");
const inquirer = require('inquirer');
var isString = require('is-string');
var isNumber = require('is-number');
var Table = require('cli-table');


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
	action();
});
function action(){
	inquirer
	  	.prompt([
		{
		name: "action",
		type: "list",
		message: "What do you Want to do?",
		choices: [
			"View Products Sales by Department",
		    "Create New Department",
		    "exit"
		    ]
		},
		]).then(function(answer){
		    switch (answer.action) {
				case "View Products Sales by Department":
			    ViewProducts();
			    break;

			    case "Create New Department":
			    Create();
			    break;

			    case "exit":
			    Exit();
			    break;
      		}
		});
}
function ViewProducts(){
	var query = "select department_name, over_head_costs, product_sales from products2 join departments on products2.department = departments.department_name group by department_name"; 
	connection.query(query , function(err, res) {
	var table = new Table({
		head: ["Department Name", "Overhead Costs", "Product Sales", "Total Profit"],
		colWidths: [20, 20, 20, 20],
	});
		if (err) throw err;
			for(var i = 0; i < res.length; i++) {
				var totalProfit = parseFloat(res[i].over_head_costs - res[i].product_sales);
			 	table.push(
					[res[i].department_name, parseFloat(res[i].over_head_costs).toFixed(2), parseFloat(res[i].product_sales).toFixed(2), totalProfit]
			 	);
			};
			console.log(table.toString());	
			action();
	});
}
function Create(){
		  	inquirer
	  		.prompt([
		  	{
		      name: "department",
		      type: "input",
		      message: "What department do you Want to add?",
		    	validate: function(val){
					if(isString(val)){
						return true;
					}else{
						return false;
					}
				}		      	      
		    },
		    {
		      name: "over_head_costs",
		      type: "input",
		      message: "What is the over head costs?",
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
	    "INSERT INTO departments SET ?",
	    {
	      department_name: answer.department,
	      over_head_costs: answer.over_head_costs,
	    },
		    function(err, res) {
	   	      console.log(" product Added!\n");
	   	      action();
		    });
		});
}
function Exit(){
	connection.end();
}