const mysql = require("mysql");
const inquirer = require('inquirer');
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
	readItems();
}); 
function readItems() {
	var query = "select id, product, price from products2"
	connection.query(query, function(err, res)
	{
		if (err) throw err;
		console.log(res);
		console.log("-----------------------");
	});
	askQ();
};
function askQ(){	
	 setTimeout(function () {
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
			]).then(function(answer){
	      		connection.query("select * from products2 where ?", { id:answer.id },  function(err, res) {
	      			if(answer.amount > res[0].stock){
	      				console.log('Insufficient quantity!');
	      			}else{
						console.log("One second... proessing order");
						var query = connection.query(
						"UPDATE products2 SET ? WHERE ?",
						[
							{
							 stock: - answer.amount
							},
							{
							 id: answer.id
							}
						],
						function(err, res) {
							//findPrice();
						});
					}
				});
      		});		
		}, 500);	 
};   				
// function findPrice(){
// 	var query = "select price from products2"
// 	connection.query(query, function(err, res)	{
// 		console.log(res);
// 		if (err) throw err;
// 		console.log("your total is... " + (res[0].price * answer.amount));
// 	});
// 	connection.end();
// }
