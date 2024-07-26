Object.defineProperty(Element.prototype, 'className', {
    get: function() {
       console.log('Getter invoked');
       return this.getAttribute('class');
    },
    set: function(value) {
       console.log('Setter invoked');
       this.setAttribute('class', value);
    }
 });
                
 var h1Element = document.getElementById('h1');
 
 // Add the class 'text-blue'.
 h1Element.className = 'text-blue';