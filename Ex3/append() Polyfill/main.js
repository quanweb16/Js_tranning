Element.prototype.append = function() {
    var fragment = document.createDocumentFragment();
 
    for (var i = 0, len = arguments.length; i < len; i++) {
       fragment.appendChild(
          arguments[i] instanceof Node
          ? arguments[i]
          : document.createTextNode(String(arguments[i]))
       );
    }
 
    // Since this method is append(), dump fragment into the
    // last-child position of the calling element node.
    this.appendChild(fragment);
 }
 var h2Element = document.createElement('h2');
h2Element.textContent = 'A smaller heading';

var italicElement = document.createElement('i');
italicElement.textContent = 'italic text';

var mainElement = document.getElementById('main');
mainElement.append(h2Element, 'Simple ', italicElement);