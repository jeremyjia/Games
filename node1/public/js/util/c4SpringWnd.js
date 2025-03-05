//c4SpringWnd.js
function c4SpringWnd(){
    let divContent = document.createElement('div');
    divContent.className = 'springServer-content';
    divContent.style.cssText = `
            padding: 10px;
            max-height: 200px;
            overflow: auto;
            margin: 0;
            background: white;
        `;
    let o = new C4DraggableWindow('c4SpringWnd-v0.11', divContent, 20, 200);
 
    return o;
}
