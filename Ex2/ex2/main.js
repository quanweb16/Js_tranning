function get_Name(){
    var getInfor = document.getElementById('form1');
    for(var i= 0; i<getInfor.length; i++){
        if(getInfor.elements[i].value !='Submit'){
            console.log(getInfor.elements[i].value)
        }
    }
}

get_Name();

