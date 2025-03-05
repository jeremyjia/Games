//c4SpringWnd.js
function C4SpringWnd(tb){
    let divContent = document.createElement('div');
    divContent.className = 'springServer-content';
    divContent.style.cssText = `
            padding: 10px;
            max-height: 200px;
            overflow: auto;
            margin: 0;
            background: white;
        `;
    let o = new C4DraggableWindow('C4SpringWnd-v0.11', divContent, 120, 333);
 
    const addToggleBtn = function(){
        const btnToggle = document.createElement('button');
        btnToggle.textContent = 'toggleSpringWnd';
        btnToggle.style.color = 'white';
        
        // Track visibility state
        let isWindowVisible = true;
        btnToggle.style.background = '#2196F3'; // Blue when visible
        
        btnToggle.onclick = () => {
            o.toggleVisibility();
            isWindowVisible = !isWindowVisible;
            // Change button color based on visibility
            btnToggle.style.background = isWindowVisible ? '#2196F3' : '#808080';
        };
        tb.appendChild(btnToggle); 
    }();
    return o;
}