document.getElementById('nickname').textContent="Doan Minh Quan";
document.getElementById('favorites').textContent="I like writing programming code";
document.getElementById('hometown').textContent="Da Nang City";

let listItems = document.querySelectorAll('li');
listItems.forEach(item =>{
    item.className='listitem';
})

let img = document.createElement('img');
img.src= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrHlKQaWJ1vX4IPv0Vb2G8dp2AafY7zbUUMg&s';
document.body.appendChild(img);
