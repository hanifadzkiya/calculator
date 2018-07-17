document.querySelector(".count").addEventListener("click",function(e){
	var quot = document.querySelector(".form-control");
	var quotion = quot.value;
	console.log(encodeURI(quotion));
	var queryURL = "http://api.mathjs.org/v4/?expr=" + encodeURIComponent(quotion);
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET',queryURL,true);
	
	xhttp.onload = function(e){
		tampil = document.querySelector('.result');
		response = xhttp.response;
		tampil.value = response; 
	}
	xhttp.onerror = function(err) {
      console.log("Error: " + err);
    }
    xhttp.send(); 
})

document.querySelector(".docs").addEventListener("click",function(e){
	window.location.href = "http://mathjs.org/docs/expressions/syntax.html";
})

