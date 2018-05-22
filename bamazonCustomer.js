const mysql = require("mysql");
const inquirer = require('inquirer');
require("dotenv").config();

//gettting connection
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
	readItems();
}); 
//shows items to customer
function readItems() {
	var query = "select id, product, price from products2"
	connection.query(query, (err, res) =>
	{
		if (err) throw err;
		console.log(res);
		console.log("-----------------------");
	});
	askQ();
};
// starts prompt takes answers and proesses how much is bought by the customer removes that from table 
function askQ(){	
	setTimeout(() => {
		inquirer
	  		.prompt([
		  	{
		      type: "input",
		      message: "What is the ID Number of the product you want?",
		      name: "id"
		    },
		    {
		      type: "input",
		      message: "how many units of this item would you like?",
		      name: "amount"
		    },
			]).then((answer) => {
	      		connection.query("select * from products2 where ?", { id:answer.id },  (err, res) => {
	      			if(answer.amount > res[0].stock){
	      				console.log('Insufficient quantity!');
	      				connection.end();
	      			}else{
	      				var stock = res[0].stock;
						console.log("One second... proessing order");
						var query = connection.query(
						"UPDATE products2 SET ? WHERE ?",
						[
							{
							 stock: stock - answer.amount
							},
							{
							 id: answer.id
							}
						],
						(err, res) => {
							var query = "select price from products2 where ?"
								connection.query(query,{id:answer.id}, (err, res) =>{
								if (err) throw err;
								total = res[0].price * answer.amount;
								console.log("your total is... " + total);
							});
							 var query = "select product_sales from products2 where ?"
							 	connection.query(query, {id:answer.id},(err, res) => {
							 		if(err) throw err;
							 		sales = res[0].product_sales;
									 	connection.query("UPDATE products2 set ? where ?", 
										[ 	
										 	{
										 		product_sales: sales + total
										 	},
										 	{
										 		id: answer.id
										 	}
										]),
										(err, res) => {if (err) throw err};
										ending();
							 });
						});
					}
				});
      		});		
	}, 500);	 
};
const ending = () => {
	inquirer
		.prompt([		    
		  	{
		      name: "whatDo",
		      type: "list",
		      message: "Now What Wanna do you Want to do?",
		      choices: [
		        "Buy More",
		        "Exit"
		      ]
		    },
			]).then((answer) => {
			    switch (answer.whatDo) {
					case "Buy More":
				    askQ();
				    break;

				    case "Exit":
			    	Exit();
			    	break;
			    };
			});    	
}  
const Exit = () => connection.end(); 	 			

