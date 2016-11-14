$(document).ready(function(){
	console.log("$ fired");
	check_user_logged();
	carted_total();
	populate_cart();
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
	var item_carted=Cookies.get("item_carted");
	// add object to array if it's cookied
	if (item_carted){
		console.log("item_carted cookied");
		var item = $.parseJSON(Cookies.get("item_carted"));
		item.push({product_id:$("#product_ID").html(), price:$("#product_price").html(),  picture_source: $("#product_pic")[0].src, quantity: 1});

		Cookies.set("item_carted", JSON.stringify(item));
		location.reload();

	}
	// create cookie if not found
	else{
		console.log("no cookied");
		Cookies.set("item_carted", JSON.stringify([{product_id:$("#product_ID").html(), price:$("#product_price").html(),  picture_source: $("#product_pic")[0].src, quantity: 1}]));
		console.log("add_product fired");
		//console.log(Cookies.get)
		cookie_item_obj=$.parseJSON(Cookies.get("item_carted"));
		console.log("cookie created");
		location.reload();
	}

	//$("#item_carted").html(item_carted.length);
}

function carted_total(){
	var item_carted=Cookies.get("item_carted");
	if (item_carted){
		var item=$.parseJSON(Cookies.get("item_carted"));
		console.log("item_length is:  " + item.length);
		$("#item_carted").html(item.length);
	}
	else{
		console.log("item length is 0");
	}
}

function populate_cart(){
	var item_carted=Cookies.get("item_carted");
	if (item_carted){
		var item=$.parseJSON(Cookies.get("item_carted"));
		var total_cost=0;
		for (var i=0; i<item.length; i++){
		$("#itemize").append(' <div id="pro_1" class="row"> <div class="col-xs-2"><img class="img-responsive" src="' + item[i].picture_source + '">'+  '</div> <div class="col-xs-4"> <h4 class="product-name"><strong>'+item[i].product_id+'</strong></h4><h4><small>Product description</small></h4> </div> <div class="col-xs-6"> <div class="col-xs-6 text-right"> <h6><strong>' + item[i].price + ' <span class="text-muted">x</span></strong></h6> </div> <div class="col-xs-4"> <input id ="inputid1" type="text" class="form-control input-sm" value="1"> </div> <div class="col-xs-2"> <button type="button" class="btn btn-link btn-xs"> <span class="glyphicon glyphicon-trash"> </span></button></div></div><hr>');
		parseInt(total_cost+=parseInt(item[i].price));
		}
		$("#total_cost").html('$'+total_cost);
	}

}

function checkOut(){
	console.log("checkout fired");
	//check_user_logged();
	if (Cookies.get("userlogged")){
		if (Cookies.get("item_carted")){
		$("#container_page").hide();
		$("#success_checkout").show();
		console.log("checking out")
		Cookies.expire("item_carted");
		//location.reload();			
		}
		else {
			alert("nothing in cart");
		}
	}

	else {
		//alert("Login First");
		$("#container_page").effect("shake");
		location.replace("signin.html");
	}

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
			$("#myModal").effect( "shake" );
		
		}
		else {
			console.log("firstName is: "+ response.result.fname);
			$("#myModal").hide();
			$("#welcome_modal").show();
			$("#welcome_text").html("WELCOME BACK "+ response.result.fname);
			$("#youraccount").html(response.result.fname);

			Cookies.set("userlogged", JSON.stringify({username:email, name:response.result.fname}));
		}

	}
})
}

function log_out(){
	Cookies.expire("userlogged");
	location.reload();
}


function check_user_logged(){
	if (Cookies.get("userlogged")) {
		console.log("user logged in");
		var name=$.parseJSON(Cookies.get("userlogged")).name;
		$("#youraccount").html(name);
		$("#myModal").hide();
		$("#welcome_modal").show();
		$("#welcome_text").html("WELCOME BACK "+ name);		
	}
	else {
		console.log("user not logged in");
		//location.replace("signin.html");
	}

}


function signup(){
	console.log("sign UP () fired");
	var fname = $("#first_name").val();
	var lname = $("#last_name").val();
	var email = $("#signup_userid").val(); 				//"qzhang@gmail.com";
	var password = $("#signup_password").val();
	var reenterpassword = $("#reenterpassword").val();
	if (password==reenterpassword && password!==""){
		console.log("same password and it is: " + password);

		$.ajax({
		  type: "POST",
		  url: "http://art-share.herokuapp.com/api/v1/users/",
		  data:{
		    user: {
		      fname: fname,
		      lname: lname,
		      password: password,
		      email: email
		    },

		    success: function(response){
				console.log("sign up success");
				$("#myModal").hide();
				$("#welcome_modal").show();
				$("#welcome_text").html("WELCOME "+ fname);
				$("#youraccount").html(fname);
				Cookies.set("userlogged", JSON.stringify({username:email, name:fname}));
			}
		  }
		})
	}
	else {
		$("#myModal").effect( "shake" );
	}
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