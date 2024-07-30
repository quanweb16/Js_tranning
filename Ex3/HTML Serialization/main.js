Element.prototype.getInnerHTML = function() {
    var html = '';
 
    for (var i = 0, len = this.childNodes.length; i < len; i++) {
       var node = this.childNodes[i];
 
       if (node instanceof Element) {
          var tagName = node.tagName.toLowerCase();
          var attributesArray = Array.prototype.slice.call(node.attributes);
          var attributesStr = attributesArray.map(function(attribute) {
             return attribute.name + '="' + attribute.value + '"';
          }).join(' ');
          attributesStr = attributesStr === '' ? '' : (' ' + attributesStr);
 
          html += '<' + tagName + attributesStr + '>' +
                  node.getInnerHTML() +
                  '</' + tagName + '>';
       }
 
       else if (node instanceof Text) {
          html += node.nodeValue;
       }
 
       else {
          html += '<!--' + node.nodeValue + '-->';
       }
    }
 
    return html;
 }