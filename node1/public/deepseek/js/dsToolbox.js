class DeepSeekToolbox {
    constructor() { 
        this.init();
    }

    init() {
        this.#createStyle(); 
    }

    #createStyle() {
        const style = document.createElement('style');
        style.textContent = `
            body {
                margin: 0;
                padding: 0 0 60px 0;
            }
            .c_toolbar_fixed_at_bottom {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                height: 60px;
                background: #ffffff;
                display: flex;
                justify-content: space-around;
                align-items: center;
                box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
                z-index: 1000;
            }
            .c_toolbar_btn {
                padding: 12px;
                border: none;
                background: none;
                font-size: 24px;
                cursor: pointer;
                transition: opacity 0.3s;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .c_toolbar_btn span {
                font-size: 12px;
                margin-top: 4px;
            }
            @media (hover: hover) {
                .c_toolbar_btn:hover {
                    opacity: 0.7;
                }
            }
        `;
        document.head.appendChild(style);
    }

    createToolbar(parentElement,styleClass) {
        const tb = document.createElement('div');
        tb.className = styleClass; 
        parentElement.appendChild(tb);
        return tb;
    }

    addButtons(parentElement,cBtnStyle,bts) {
        bts.forEach(btnConfig => {
            const button = document.createElement('button');
            button.className = cBtnStyle;
            button.innerHTML = `${btnConfig.icon}<span>${btnConfig.text}</span>`;
            button.onclick = btnConfig.action;
            parentElement.appendChild(button);
        });
    }
}
