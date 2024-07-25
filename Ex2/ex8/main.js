function removecolor(){
     var x = document.getElementById('colorSelect');
     //trả về chỉ số của option đang được chọn trong dropdown.
    // sẽ xóa đi option tại chỉ số đó.
     x.remove(x.selectedIndex);


    
}
removecolor();