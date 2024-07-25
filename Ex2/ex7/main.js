function creatTable(){
    rn = window.prompt("Input number of rows",1);

    cn = window.prompt("Input number of colum",1);

    for(var r=0; r< rn; r++){
        var x = document.getElementById('myTable').insertRow(r);
        for(var c = 0 ;c<parseInt(cn,10);c++){
            var z = x.insertCell(c);
            z.innerHTML="Row-"+r+"Column-"+c;
        }
    }
}
creatTable();