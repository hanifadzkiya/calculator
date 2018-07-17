var now = "";
var queOperand = [];
var queNum = [];
var totalCount;
var historyCount = "";

document.getElementById("numbers").addEventListener("click",function(event){
	if(queNum.length != queOperand.length){
		queNum.length = 0;
		queOperand.length = 0;
	}
	var num = event.target.innerText;
	if(now == ''){
		now = num;
	} else {
		now = now + num;
	}
	if(historyCount == ''){
		historyCount = num;
	} else {
		historyCount = historyCount + num;
	}
	setDisplayTextNow(now); 
	setDisplayHistory(historyCount);
})

document.querySelector(`div[data-operator="add"]`).addEventListener("click",function(event){
	setDisplayTextNow('+');
	historyCount += '+';
	setDisplayHistory(historyCount);
	//Masukkan ke operand lagi
	if(queOperand.length === 0){
		queNum.push(parseFloat(now));
		queOperand.push('+');
	} else {
		queNum.push(parseFloat(now));
		var totalCount = countIt();
		console.log(totalCount);
		queNum.length = 0;
		queOperand.length = 0;
		queNum.push(totalCount);
		queOperand.push('+');
	}
	now = "";
})

document.querySelector(`div[data-operator="subtract"]`).addEventListener("click",function(event){
	setDisplayTextNow('-');
	historyCount += '-';
	setDisplayHistory(historyCount);
	if(queOperand.length === 0){
		queNum.push(parseFloat(now));
		queOperand.push('-');
	} else {
		queNum.push(parseFloat(now));
		var totalCount = countIt();
		queNum.length = 0;
		queOperand.length = 0;
		queNum.push(totalCount);
		queOperand.push('-');
	}
	now = "";
})

document.querySelector(`div[data-operator="multiply"]`).addEventListener("click",function(event){
	setDisplayTextNow('*');
	historyCount += '*';
	setDisplayHistory(historyCount);
	queOperand.push('*');
	if(now != '') queNum.push(parseFloat(now));
	now = '';
})

document.querySelector(`div[data-operator="divide"]`).addEventListener("click",function(event){
	setDisplayTextNow('/');
	historyCount += '/';
	setDisplayHistory(historyCount);
	queOperand.push('/');
	if(now != '') queNum.push(parseFloat(now));
	now = '';
})

document.querySelector(`div[data-operator="equal"]`).addEventListener("click",function(event){
	historyCount += '=';
	setDisplayHistory(historyCount);queNum.push(parseFloat(now));
	var totalCount = countIt();
	queNum.length = 0;
	queOperand.length = 0;
	now = totalCount.toString();
	setDisplayTextNow(now);
	if(now === 'NaN'){
		speakIt('Formula Salah');
	} else speakIt(now);
	historyCount = totalCount.toString();
})

function countIt(){
	var totalCount = queNum[0];
	var lenQue = queOperand.length;
	var countFront = queNum[0];
	var found = 0;
	while((found < queOperand.length) && ((queOperand[found] != '*') && (queOperand[found] != '/'))) found++;
	console.log(found);
	for(var i = 0;i<found-1;i++){
		if(queOperand[i] === '+'){
			countFront += queNum[i+1];
		} else {
			countFront -= queNum[i+1];
		}
	}
	totalCount = queNum[found];
	
	for(var i = found;i<queOperand.length;i++){
		if(queOperand[i] === '*'){
			totalCount = totalCount * queNum[i+1];
		} else {
			totalCount = totalCount / queNum[i+1];
		}
	}
	if((queOperand.length > 1) || ((queOperand[0] === '+') || (queOperand[0] === '-'))){
		if(queOperand[found-1] === '+'){
			totalCount = totalCount + countFront;
		} else if(queOperand[found-1]) totalCount = countFront - totalCount;
	}
	return totalCount;
}

document.querySelector('#clear').addEventListener("click",function(event){
	//EMPTY ALL
	queNum.length = 0;
	queOperand.length = 0;
	now = '';
	historyCount = '';
	setDisplayHistory(0);
	setDisplayTextNow(0);
})

function setDisplayTextNow(text) {
    var display = document.getElementsByClassName("now");
    console.log(text);
   	display[0].innerHTML = cutText(text,17);
} 

function setDisplayHistory(text) {
    var display = document.querySelector(".history");
    console.log(text);
   	display.innerHTML = cutText(text,27);
} 

function cutText(text,nb) {
	var textLength = text.length;
	var textAfter = "";
	if(textLength <= nb) {
		textAfter = text;
	} else {
		for(var i = textLength - nb;i<textLength;i++){
			textAfter = textAfter + text[i];
		}
	}
	return textAfter;
}


function speakIt(text) {
	   console.log("speech time?");
	   responsiveVoice.speak(
	  text,
	  "Indonesian Female",
	  {
	   pitch: 1, 
	   rate: 1, 
	   volume: 1
	  }
	 );
}