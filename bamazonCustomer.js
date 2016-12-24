var mysql = require("mysql");
var inquirer = require("inquirer");
var columnify = require('columnify')


var connection = mysql.createConnection({
	host: "localhost",
	port: "3306",
	user: "root",
	password: "kellsa",	
	database: "Bamazon"
});

var sql = 'Select product_name, department_name, price, stock_quantity from products ';
var itemPurch = "";

var showOrderQuestions = function(){
	inquirer.prompt([
		{	
			name: "userResponse1",
			type: "input",
			message: "Enter Product ID"
		},
				{	
			name: "userResponse2",
			type: "input",
			message: "Enter Qty to Order"
		}
	])

	.then(function(answer){
		getAnswers(answer)
		});		
	};




function getAnswers(answer){
		sql += 'where item_id = ' + answer.userResponse1 ;
		response1 = answer.userResponse1;
		response2 = answer.userResponse2;
		setSQL(response1, response2);
		checkQtyOnHand(sql);
		//console.log("this msg : " + itemPurch );
		if (response2 <= stockQty ){
			console.log("stockerror = " + stockQty);
		updateTable(sql);	
		customerMessage(itemPurch, response2);
		}
		else {console.log("you are here -- ERROR")
			console.log("stockerror IN ERROR= " + stockQty);
			// console.log("stockQty error = " + stockQty);
	};
		
}






function getAllItems(){
	sql = "select Item_id as Item, product_name as Product, department_name as Dept, price, stock_quantity as Qty from products";
	connection_query(sql);
}



function connection_query(sql){
	connection.connect(function(err){
		if (err) throw err;
		//console.log("connected as id " + connection.threadId);
		
	connection.query(sql, function(err, res){
		if (err) throw err;
		var columns = columnify(res, {
  		columnSplitter: ' | ' 
		})
			console.log("\n" + columns +"\n");
 		//connection.end();

		// for (var i = 0; res.length > i; i++){
		// 	var id = JSON.stringify(res[i].item_id);
		// 	var product = JSON.stringify(res[i].product_name);
		// 	var dept = JSON.stringify(res[i].department_name);
		//	var price = JSON.stringify(res[i].price);
		// 	var qty = JSON.stringify(res[i].stock_quantity);
			//console.log(id + "\t| " + product + "\t| " + dept+ "\t| " + price+ "\t| " + qty );
			//console.table([id,product,dept, price,qty ]);
		//}
		 //,["price", "product_name"],null,2);
		//	 var keys = Object.keys(res2);   
	 	//var properties = Object.getOwnPropertyNames(res2);
		//return price;
		showOrderQuestions();
		  //***Very important as a callback function!****
		});
	});
	
};

function setSQL(resp1,resp2){
	sql = "update products set stock_quantity = stock_quantity - " + resp2;
	sql += " where item_id = " + resp1; 
	itemPurch = "select product_name, price, stock_quantity from products where item_id = " + resp1; 
	//console.log("mysql statement is : " + sql)
	//console.log(" Item Purchased: " + itemPurch);
	return sql;
	return itemPurch;
}

function updateTable(sql){
	// connection.connect(function(err){
	// 	if (err) throw err;
		connection.query(sql, function(err, res){
		if (err) throw err;
		// console.log(res);
		// console.log("heres update table : " + sql);	
		}); //closeConnection();
	//})	
};

function customerMessage(sql,resp2){
	connection.query(sql, function(err, res){
		if (err) throw err;
		//console.log(res);
		for (var i = 0; res.length > i; i++){
		 	var product = JSON.stringify(res[i].product_name);
		 	var price = parseFloat(res[i].price);
		 	var qtyOrd = parseInt(resp2);
		 	var cost = (price * qtyOrd);
		 	//console.log(price + " " + qtyOrd + " " + cost + " "+ product); 
		 }
		var custMsg = "Thank You for your order" ;
		 	custMsg += "\n Your purchase of " + resp2 + " " + product + "'s";
		 	custMsg += " \n Total Cost = $" + cost;
		// console.log(price + " " + qtyOrd + " " + cost); 	
		console.log(custMsg); 	
		return custMsg; 	
		return stockQty;
	});
};


function closeConnection(){
	connection.end();
}

function checkQtyOnHand(sql){
		connection.query(sql, function(err, res){
		if (err) throw err;
		console.log("res2: " + JSON.stringify(res));
	for (var i = 0; res.length > i; i++){
		var stockQty = parseInt(res[i].stock_quantity);
		console.log("stockQty error = " + stockQty);
	};	
	return stockQty;
});
}		


getAllItems();
//showQuestions();





// function connection_query2(answer){

// 		connection.connect(function(err){
// 		if (err) throw err;
// 			else {
// 			sql += 'where item_id = ' + answer.userResponse1 ;
// 			response1 = answer.userResponse1;
// 			response2 = answer.userResponse2;
// 			connection.query(sql,function(err, res){
// 				if (err) throw err;
				
// 					else{
// 						var sqlResponse = JSON.stringify(res,null,2);
// 						//console.log(sqlResponse);
// 						//console.log("answer1 = " + answer.userResponse1);
// 						//console.log("answer2 = " + answer.userResponse2);
// 						//console.log("res = " + res);
// 					}
// 				//console.log(sql); 
// 				return response1; 
// 				return response2; 						
// 			});
// 			setSQL(response1,response2);		
// 			updateTable(sql);
// 		}
// 	});	
// }

