function fillUpList(listElement) {
  
    var list = listElement.getAttribute('data-list').split('|');
 
    var fragment = document.createDocumentFragment();
    var listItemElement;
 
    for (var i = 0, len = list.length; i < len; i++) {
       listItemElement = document.createElement('li');
       listItemElement.textContent = list[i];
       fragment.appendChild(listItemElement);
    }
 
    
    listElement.appendChild(fragment);
 }
 function fillUpList(listElement) {
   
 }
 
 var listElements = document.querySelectorAll('ol, ul');
 
 for (var i = 0, len = listElements.length; i < len; i++) {
    
    if (listElements[i].hasAttribute('data-list')) {
       fillUpList(listElements[i]);
    }
 }