$(document).ready(function(){
	console.log("$ fired");
		//checking to see if it's cart page. if it is, fired blabalbal
		// $(function(){
		//   if($('body').is('.cart')){
		//   	console.log("cart page fired correctly");
		//   }
		//   else {
		//   	console.log("fired correctly for not firing on cart");
		//   }
		// });
})


function add_product(){
	Cookies.set("item_added",true);
	Cookies.set($("#product_ID").html(), JSON.stringify({price:$("#product_price").html(), quantity: 1}));
	console.log("add_product fired");
	//console.log(Cookies.get)
}


function populate_cart(){

}

function checkOut(){
	console.log("checkout fired");
}



function sign_in(){
	console.log("signin () fired");

	var email = $("#signin_userid").val(); 				//"qzhang@gmail.com";
	var password = $("#signin_password").val(); 		//"pass";
	console.log("email is: " + email);
	console.log("password is: " + password);
	$.ajax({
		type: "POST",
		url: "http://art-share.herokuapp.com/api/v1/sessions/new",
		data: {
		email: email,
		password: password
		},
		success: function(response){
			//window.response=response;
			if (response.result===null){
			console.log("wrong login !!");
			//document.getElementById('welcome').innerHTML="Wrong Credential";
			}
			else {
			console.log("firstName is: "+ response.result.fname);
			$("#myModal").hide();
			$("#welcome_modal").show();
			$("#welcome_text").html("WELCOME BACK "+ response.result.fname);
			Cookies.set("userlogged", true);
			}

		}


	})
}





function signup(){
	console.log("sign UP () fired");
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