var inforDisplay = document.getElementById('display');
var congElement = document.getElementById('increment');
var truElement = document.getElementById('decrement');
var resetElement = document.getElementById('reset');

var count = 0;


congElement.onclick= function(){
    count++;
    inforDisplay.textContent = count;
}

truElement.onclick = function (){
    if(count != 0){
        count--;
    }
    inforDisplay.textContent= count;

}

resetElement.onclick = function(){
    count= 0;
    inforDisplay.textContent = count;
}