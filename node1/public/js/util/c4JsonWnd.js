//c4JsonWnd.js
function C4JsonWnd(){
    let divContent = document.createElement('div');
    divContent.className = 'json-content';
    divContent.style.cssText = `
            padding: 10px;
            max-height: 200px;
            overflow: auto;
            margin: 0;
            background: white;
        `;
    let o = new C4DraggableWindow('jsonWnd_v0.11', divContent, 444, 333);

    o.getJsonContent = function(){
        return divContent;
    }
    return o;
}