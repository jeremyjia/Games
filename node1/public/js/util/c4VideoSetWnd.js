// c4VideoSetWnd.js

function C4VideoSetWnd(videoEditor) {
    const ve = videoEditor;
    let activeTabIndex = 0;

    // TAB配置
    const tabsConfig = [
        {
            label: "Audio",
            content: createAudioPresetContent,
        },
        {
            label: "Dimensions",
            content: createDimensionsContent,
        },
        {
            label: "debug",
            content: createDebugContent,
        },
    ];

    // 主容器
    const mainDiv = document.createElement("div");
    mainDiv.style.cssText = `
        display: flex;
        flex-direction: column;
        height: 100%;
    `;

    // 工具条
    const toolbar = document.createElement("div");
    toolbar.style.cssText = `
        display: flex;
        gap: 5px;
        padding: 5px;
        background: #f0f0f0;
        border-bottom: 1px solid #ddd;
    `;

    // 创建TAB按钮
    tabsConfig.forEach((tab, index) => {
        const tabBtn = document.createElement("button");
        tabBtn.textContent = tab.label;
        tabBtn.style.cssText = `
            padding: 4px 12px;
            background: ${index === 0 ? "#9C27B0" : "#666"};
            color: white;
            border: none;
            cursor: pointer;
            font-size: 12px;
        `;
        tabBtn.onclick = () => switchTab(index);
        toolbar.appendChild(tabBtn);
    });
    mainDiv.appendChild(toolbar);

    // 内容容器
    const contentContainer = document.createElement("div");
    contentContainer.style.cssText = `
        flex: 1;
        overflow-y: auto;
        padding: 10px;
    `;

    // 创建内容面板
    const tabPanels = tabsConfig.map(tab => tab.content(ve));
    tabPanels.forEach((panel, index) => {
        panel.style.display = index === 0 ? "block" : "none";
        contentContainer.appendChild(panel);
    });
    mainDiv.appendChild(contentContainer);

    // TAB切换函数
    function switchTab(index) {
        activeTabIndex = index;
        tabPanels.forEach((panel, i) => {
            panel.style.display = i === index ? "block" : "none";
        });
        toolbar.querySelectorAll("button").forEach((btn, i) => {
            btn.style.background = i === index ? "#9C27B0" : "#666";
        });
    }

    return new C4DraggableWindow(
        "videoSettings",
        mainDiv,
        420,
        400,
        false
    );

    function createDebugContent(){
        const divContent = document.createElement("div");
        divContent.style.cssText = `
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 5px;
        `;
        divContent.textContent = "show info:" + Date(); 
        ve.musicScript.setUI(divContent);
        return divContent;
    }
    // 音频预设内容
    function createAudioPresetContent() {
        const divContent = document.createElement("div");
        divContent.style.cssText = `
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 5px;
        `;

        const baseURL = "https://littleflute.github.io/english/NewConceptEnglish/Book2/";
        for (let i = 1; i <= 36; i++) {
            const btn = document.createElement("button");
            btn.textContent = `第 ${i} 课`;
            btn.style.cssText = `
                padding: 4px 8px;
                background: #9C27B0;
                color: white;
                font-size: 12px;
                border: none;
                cursor: pointer;
            `;
            btn.onclick = () => {
                const url = `${baseURL}${i}.mp3`;
                ve.audioUrlInput.value = url;
                ve.audio.src = url;
                ve.updateJson();
            };
            divContent.appendChild(btn);
        }
        return divContent;
    }

    // 尺寸设置内容
    function createDimensionsContent() {
        const divContent = document.createElement("div");
        divContent.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;

        const config = [
            { label: "Canvas Width", prop: "canvasWidth" },
            { label: "Canvas Height", prop: "canvasHeight" },
            { label: "Video Width", prop: "width" },
            { label: "Video Height", prop: "height" },
            { label: "FPS", prop: "fps" },
        ];

        config.forEach(item => {
            const wrapper = document.createElement("div");
            wrapper.style.cssText = `
                display: flex;
                align-items: center;
                gap: 8px;
            `;

            const label = document.createElement("label");
            label.textContent = item.label;
            label.style.width = "100px";

            const input = document.createElement("input");
            input.type = "number";
            input.value = ve[item.prop];
            input.style.cssText = `
                padding: 4px;
                width: 80px;
            `;

            input.addEventListener("change", () => {
                ve[item.prop] = parseInt(input.value);
                ve.updateJson();
            });

            wrapper.appendChild(label);
            wrapper.appendChild(input);
            divContent.appendChild(wrapper);
        });

        return divContent;
    }
}

 