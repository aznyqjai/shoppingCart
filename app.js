$(document).ready(function(){
	console.log("$ fired");
})

function add_product(){
	Cookies.set($("#product_ID").html(), JSON.stringify({price:$("#product_price").html(), quantity: 1}));
	console.log("add_product fired")
}




// var people = [
//    { 'name' : 'Abel', 'age' : 1 },
//    { 'name' : 'Bella', 'age' : 2 },
//    { 'name' : 'Chad', 'age' : 3 },
// ];

// Cookies.set("people", JSON.stringify(people));
// // later on to add more 
// var people = $.parseJSON(Cookies.get("people"));

// people.push(
//     { 'name' : 'Daniel', 'age' : 4 }
// );

// Cookies.set("people", JSON.stringify(people));