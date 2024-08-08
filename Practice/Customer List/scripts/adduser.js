const form1= document.querySelector('form');


function dataform(event){
    event.preventDefault(); 

    const formElements = form1.elements;
    for(var i =0; i<formElements.length; i++){
        const Element = formElements[i];
        const valueForm = Element.value;
        if(valueForm){
            console.log(`${valueForm}`);
        }
    }

}
form1.addEventListener('submit', dataform);
