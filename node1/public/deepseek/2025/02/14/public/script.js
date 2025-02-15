let paragraphCount = 0;
const ParagraphType = {
    TEXT: 'text',
    IMAGE: 'image',
   CODE: 'code'
};
let generatedHtmlContent = '';

let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let modalOffsetX = 0;
let modalOffsetY = 0;
// 在script.js中添加
const exampleTexts = {
    techIntro: "近年来，随着人工智能技术的快速发展，深度学习在自然语言处理领域取得了突破性进展。Transformer架构的提出，使得模型能够更好地捕捉长距离依赖关系。",
    newsLead: "【本报快讯】今日上午，在科技创新大会上，多位行业专家表示，量子计算将在未来十年内进入实用化阶段。",
    storyStart: "那是一个风雨交加的深夜，实验室的警报突然响起。我冲进主控室时，发现所有显示屏都在闪烁同样的警告信息——系统已突破临界值！",
    analysis: "从数据可以看出，用户活跃度与功能更新呈现强正相关（r=0.82）。这表明持续优化产品功能对保持用户黏性至关重要。",
    quote: "爱因斯坦曾说过：'想象力比知识更重要，因为知识是有限的，而想象力概括着世界的一切。' 这句话在当今科技创新中依然适用。"
};
async function save2Examples(filename) {
    // 检查文件类型是否支持
    const allowedExts = ['txt', 'md', 'html', 'css', 'js', 'py'];
    const ext = filename.split('.').pop().toLowerCase();
    if (!allowedExts.includes(ext)) {
        alert('仅支持文本类型文件（如.txt,.md等）');
        return;
    }

    try {
        // 获取文件内容
        const response = await fetch(`/files/${encodeURIComponent(filename)}`);
        if (!response.ok) throw new Error('文件获取失败');
        const content = await response.text();

        // 生成唯一键
        const baseKey = filename.replace(/\.[^.]+$/, '');
        let finalKey = baseKey;
        let counter = 1;
        while (exampleTexts[finalKey]) {
            finalKey = `${baseKey}_${counter}`;
            counter++;
        }

        // 添加到示例文本
        exampleTexts[finalKey] = content;
        loadExampleTexts(); // 刷新显示
        alert(`已添加示例文本: ${finalKey}`);
    } catch (error) {
        console.error('保存失败:', error);
        alert(`保存失败: ${error.message}`);
    }
}

let currentDraggingModal = null;

function showExampleTexts() {
    const modal = document.getElementById('exampleTextsModal');
    modal.style.display = 'block';
    loadExampleTexts();
    
    // 初始居中定位
    modal.style.left = '50%';
    modal.style.top = '100px';
    modal.style.transform = 'translateX(-50%)';
}

function closeExampleTexts() {
    document.getElementById('exampleTextsModal').style.display = 'none';
}

function loadExampleTexts() {
    const container = document.getElementById('exampleTextsContent');
    container.innerHTML = `
        <div class="example-category">
            <h4>预设示例</h4>
            <div class="example-text-group">
                ${Object.entries(exampleTexts)
                    .filter(([key]) => !key.includes('_custom'))
                    .map(([key, text]) => exampleButton(key, text))
                    .join('')}
            </div>
        </div>
        
        <div class="example-category">
            <h4>自定义示例</h4>
            <div class="example-text-group">
                ${Object.entries(exampleTexts)
                    .filter(([key]) => key.includes('_custom'))
                    .map(([key, text]) => exampleButton(key, text))
                    .join('')}
            </div>
        </div>
    `;
}

function exampleButton(key, text) {
    return `
        <div class="example-item">
            <button class="example-btn" 
                    onclick="insertExampleText('${key}')">
                ${getButtonLabel(key)}
            </button>
            ${key.includes('_custom') ? 
                `<button class="delete-btn control-btn" 
                        onclick="deleteExample('${key}')">×</button>` : ''}
        </div>
    `;
}

function deleteExample(key) {
    if (confirm(`确定要删除示例 "${key}" 吗？`)) {
        delete exampleTexts[key];
        loadExampleTexts();
    }
}

function getButtonLabel(key) {
    const labels = {
        techIntro: "技术导语",
        newsLead: "新闻开篇",
        storyStart: "故事开头",
        analysis: "数据分析",
        quote: "名人引用"
    }; 
    return labels[key] || key.replace(/_/g, ' '); // 显示更友好的名称
}

function insertExampleText(key) {
    const text = exampleTexts[key];
    const activeElement = document.activeElement;
    
    if (activeElement && activeElement.classList.contains('paragraph-title')) {
        insertAtCursor(activeElement, text);
        updateDataModel();
    } else if (activeElement && activeElement.classList.contains('paragraph-body')) {
        insertAtCursor(activeElement, text);
        updateDataModel();
    } else {
        addNewParagraphWithText(text);
    }
}

function insertAtCursor(field, text) {
    const start = field.selectionStart;
    const end = field.selectionEnd;
    field.value = field.value.substring(0, start) + 
                 text + 
                 field.value.substring(end);
    // 移动光标到插入内容之后
    field.selectionStart = field.selectionEnd = start + text.length;
    field.focus();
}

function addNewParagraphWithText(text) {
    const newParagraph = createParagraphElement();
    newParagraph.querySelector('.paragraph-body').value = text;
    document.getElementById('paragraphsContainer').appendChild(newParagraph);
    updateDataModel();
}

// 模态窗口拖动逻辑
document.querySelectorAll('.server-files-modal').forEach(modal => {
    modal.addEventListener('mousedown', (e) => {
        if (e.target.closest('.server-files-header')) {
            currentDraggingModal = modal;
            const rect = modal.getBoundingClientRect();
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            modalOffsetX = dragStartX - rect.left;
            modalOffsetY = dragStartY - rect.top;
        }
    });
});

function showServerFiles() {
    const modal = document.getElementById('serverFilesModal');
    modal.style.display = 'block';
    loadServerFiles();
    
    // 初始居中
    modal.style.left = '50%';
    modal.style.top = '100px';
    modal.style.transform = 'translateX(-50%)';
}

function closeServerFiles() {
    document.getElementById('serverFilesModal').style.display = 'none';
}

async function loadServerFiles() {
    try {
        const response = await fetch('/get-files');
        const files = await response.json();
        renderFiles(files);
    } catch (error) {
        document.getElementById('serverFilesContent').innerHTML = 
            '<div class="error">加载文件列表失败</div>';
    }
}
function renderFiles(files) {
    const container = document.getElementById('serverFilesContent');
    
    // 清空现有内容
    container.innerHTML = '';

    if (files.length === 0) {
        container.innerHTML = '<div class="file-item">暂无文件</div>';
        return;
    }

    files.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        // 文件图标和基本信息
        fileItem.innerHTML = `
            <div style="flex:1; min-width: 300px;">
                <span class="file-icon"></span>
                <span class="file-name">${file.name}</span>
                <span class="file-type">(${file.type === 'folder' ? '文件夹' : '文件'})</span>
            </div>
            <div style="width:120px;">
                ${file.type === 'file' ? formatFileSize(file.size) : '-'}
            </div>
            <div style="width:180px;">
                ${new Date(file.modified).toLocaleDateString()} 
                ${new Date(file.modified).toLocaleTimeString()}
            </div>
        `;

        // 操作按钮容器
        const actions = document.createElement('div');
        actions.className = 'file-actions';

        // 文件类型相关操作
        if (file.type === 'file') {
            const ext = file.name.split('.').pop().toLowerCase();
            
            // 插入按钮
            const insertBtn = createActionButton('插入', () => insertServerFile(file.name));
            
            // 下载按钮
            const downloadBtn = createActionButton('下载', () => downloadServerFile(file.name));
            
            actions.append(insertBtn, downloadBtn);

            // 文本文件支持保存为示例
            if (['txt', 'md', 'html', 'css', 'js', 'py'].includes(ext)) {
                const saveBtn = createActionButton('存为示例', () => save2Examples(file.name));
                actions.appendChild(saveBtn);
            }
        }

        fileItem.appendChild(actions);
        container.appendChild(fileItem);
    });
}

// 辅助函数：创建操作按钮
function createActionButton(text, onClick) {
    const btn = document.createElement('button');
    btn.className = 'control-btn';
    btn.textContent = text;
    btn.onclick = onClick;
    return btn;
}

// 辅助函数：格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

// 添加拖动功能
document.getElementById('serverFilesModal').addEventListener('mousedown', (e) => {
    if (e.target.closest('.server-files-header')) {
        isDragging = true;
        const modal = document.getElementById('serverFilesModal');
        const rect = modal.getBoundingClientRect();
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        modalOffsetX = dragStartX - rect.left;
        modalOffsetY = dragStartY - rect.top;
    }
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const modal = document.getElementById('serverFilesModal');
        modal.style.left = `${e.clientX - modalOffsetX}px`;
        modal.style.top = `${e.clientY - modalOffsetY}px`;
        modal.style.transform = 'none';
    }
    if (currentDraggingModal) {
        currentDraggingModal.style.left = `${e.clientX - modalOffsetX}px`;
        currentDraggingModal.style.top = `${e.clientY - modalOffsetY}px`;
        currentDraggingModal.style.transform = 'none';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    currentDraggingModal = null;
});

// 文件操作函数
function insertServerFile(filename) {
    const fileType = filename.split('.').pop().toLowerCase();
    
    if (['png', 'jpg', 'jpeg', 'gif'].includes(fileType)) {
        insertImageFromServer(filename);
    } else if (['js', 'html', 'css', 'py','txt','md','json'].includes(fileType)) {
        insertCodeFromServer(filename);
    } else {
        alert('不支持此文件类型');
    }
}

async function insertCodeFromServer(filename) {
    try {
        const response = await fetch(`/files/${encodeURIComponent(filename)}`);
        if (!response.ok) throw new Error(`HTTP错误! 状态码: ${response.status}`);
        const code = await response.text();
        const codeElement = createCodeElement(filename, code, detectLanguage(filename));
        document.getElementById('paragraphsContainer').appendChild(codeElement);
        updateDataModel();
        closeServerFiles();
    } catch (error) {
        console.error('加载代码失败:', error);
        alert(`加载代码失败: ${error.message}`);
    }
}


async function insertImageFromServer(filename) {
    const imgUrl = `/files/${filename}`;
    
    const div = document.createElement('div');
    div.className = 'image-container';
    div.innerHTML = `
        <div class="image-preview">
            <img src="${imgUrl}">
            <button class="control-btn delete-btn" onclick="deleteParagraph(this)">删除</button>
        </div>
        <input type="text" 
               class="image-caption" 
               placeholder="请输入图片描述文字"
               oninput="updateDataModel()">
    `;
    
    const container = document.getElementById('paragraphsContainer');
    container.appendChild(div);
    updateDataModel();
    closeServerFiles();
}

function downloadServerFile(filename) {
    window.open(`/files/${filename}`, '_blank');
}


 function createCodeElement(filename, content, language = 'javascript') {
         const div = document.createElement('div');
         div.className = 'code-container';
         div.dataset.type = ParagraphType.CODE;
         
         div.innerHTML = `
        <div class="code-header">
            <span class="code-filename">${filename}</span>
            <select class="language-select" onchange="updateCodeLanguage(this)">
                <option value="javascript" ${language === 'javascript' ? 'selected' : ''}>JavaScript</option>
                <option value="html" ${language === 'html' ? 'selected' : ''}>HTML</option>
                <option value="css" ${language === 'css' ? 'selected' : ''}>CSS</option>
                <option value="python" ${language === 'python' ? 'selected' : ''}>Python</option>
                <option value="java" ${language === 'java' ? 'selected' : ''}>Java</option>
            </select>
        </div>
        <div class="code-content">
            <pre><code class="language-${language}">${hljs.highlight(content, { language }).value}</code></pre>
        </div>
        <div class="paragraph-controls">
            <button class="control-btn delete-btn" onclick="deleteParagraph(this)">删除</button>
        </div>
         `;
        div.innerHTML += `
        <button class="copy-btn" onclick="copyCode(this)">复制</button>
        `;

        // 添加高亮初始化
        setTimeout(() => {
            hljs.highlightElement(div.querySelector('code'));
        }, 0);

         return div;
     }

    // 添加复制函数
function copyCode(button) {
    const code = button.closest('.code-container').querySelector('code').textContent;
    navigator.clipboard.writeText(code);
}
    // 新增代码上传处理
     async function handleCodeUpload(event) {
         const files = Array.from(event.target.files);
         if (files.length === 0) return;
     
         for (const file of files) {
             const reader = new FileReader();
             reader.onload = async (e) => {
                 const content = e.target.result;
                 const language = detectLanguage(file.name);
                 const codeElement = createCodeElement(file.name, content, language);
                 
                 const lastFocused = document.querySelector('.paragraph-container:focus-within');
                 if (lastFocused) {
                     lastFocused.insertAdjacentElement('afterend', codeElement);
                 } else {
                     document.getElementById('paragraphsContainer').appendChild(codeElement);
                 }
                 
                 updateDataModel();
             };
             reader.readAsText(file);
         }
         event.target.value = '';
     }
    
    // 新增语言检测函数
     function detectLanguage(filename) {
         const ext = filename.split('.').pop().toLowerCase();
         const map = {
             'js': 'javascript',
             'html': 'html',
             'css': 'css',
             'py': 'python',
             'java': 'java'
         };
         return map[ext] || 'plaintext';
     }
    
function createImageParagraph(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const div = document.createElement('div');
            div.className = 'image-container';
            div.innerHTML = `
                <div class="image-preview">
                    <img src="${e.target.result}">
                    <button class="control-btn delete-btn" onclick="deleteParagraph(this)">删除</button>
                </div>
                <input type="text" 
                       class="image-caption" 
                       placeholder="请输入图片描述文字"
                       oninput="updateDataModel()">
            `;
            resolve(div);
        };
        reader.readAsDataURL(file);
    });
}

async function insertImage(button, file) {
    const currentContainer = button.closest('.paragraph-container, .image-container');
    const newImage = await createImageParagraph(file);
    currentContainer.insertAdjacentElement('afterend', newImage);
    updateDataModel();
}
async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.type.match(/image\/(png|jpeg|gif|bmp)/i)) {
        alert('仅支持PNG、JPEG、GIF和BMP格式的图片');
        return;
    }
    // 添加大小检查
    if (file.size > 2 * 1024 * 1024) {
        alert('图片大小不能超过2MB');
        event.target.value = '';
        return;
    }
    

    // 获取最近的容器
    const lastFocused = document.querySelector('.paragraph-container:focus-within, .image-container:focus-within');
    const container = lastFocused || document.querySelector('.paragraph-container, .image-container');

    const progress = document.createElement('div');
    progress.textContent = '上传中...';
    container.appendChild(progress);
    // 上传完成后移除
    progress.remove();

    const newImage = await createImageParagraph(file);
    
    if (container) {
        container.insertAdjacentElement('afterend', newImage);
    } else {
        document.getElementById('paragraphsContainer').appendChild(newImage);
    }
    
    updateDataModel();
    event.target.value = ''; // 重置文件输入
}

function generateHtml() {
    updateDataModel();
    
    const title = document.getElementById('articleTitle').value;
    if (!title) {
        alert('请输入文章标题');
        return;
    }

    // 构建HTML内容
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <style>
            /* 保留原有样式 */
            .image-section {
                margin: 30px 0;
                text-align: center;
            }
            .image-section img {
                max-width: 80%;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .image-caption {
                color: #666;
                font-size: 0.9em;
                margin-top: 10px;
                font-style: italic;
            }
        </style>
    </head>
    <body>
        <h1 class="article-title">${title}</h1>
        
        ${paragraphsData.map(item => {
            if (item.type === ParagraphType.IMAGE) {
                return `
                <div class="image-section">
                    <img src="${item.src}" alt="${item.caption || ''}">
                    ${item.caption ? `<div class="image-caption">${item.caption}</div>` : ''}
                </div>`;
            }
            return `
            <div class="paragraph-section">
                <h2 class="paragraph-title">${item.title}</h2>
                <p class="paragraph-body">${item.body}</p>
            </div>`;
        }).join('')}
    </body>
    </html>
    `;

    generatedHtmlContent = htmlContent;
    showPreview(htmlContent);
}
function showPreview(content) {
    const modal = document.getElementById('previewModal');
    const iframe = document.getElementById('previewFrame');
    
    modal.style.display = 'block';
    iframe.srcdoc = content;
}

function closePreview() {
    document.getElementById('previewModal').style.display = 'none';
}

function downloadHtml() {
    const blob = new Blob([generatedHtmlContent], {type: 'text/html'});
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `document-${new Date().toISOString().slice(0,10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function createParagraphElement(title = '', body = '') {
    const div = document.createElement('div');
    div.className = 'paragraph-container';
    div.dataset.type = ParagraphType.TEXT;  // 添加类型标识
    div.innerHTML = `
        <input type="text" 
               class="paragraph-title" 
               placeholder="段落标题"
               value="${title}">
        <textarea class="paragraph-body" 
                  placeholder="段落内容">${body}</textarea>
        <div class="paragraph-controls">
            <button class="control-btn insert-btn" onclick="insertParagraph(this)">在此插入</button>
            <button class="control-btn delete-btn" onclick="deleteParagraph(this)">删除</button>
        </div>
    `;
    return div;
}

// 简化后的添加段落函数
function addParagraph() {
    const container = document.getElementById('paragraphsContainer');
    const newParagraph = createParagraphElement();
    container.appendChild(newParagraph);
    updateDataModel();
}
// 修改后的插入段落函数
function insertParagraph(button) {
    const currentContainer = button.closest('.paragraph-container');
    const allContainers = Array.from(document.querySelectorAll('.paragraph-container'));
    const currentIndex = allContainers.indexOf(currentContainer);
    
    const newContainer = createParagraphElement();
    currentContainer.insertAdjacentElement('afterend', newContainer);
    updateDataModel();
}

function deleteParagraph(button) {
    const containers = document.querySelectorAll('.paragraph-container, .image-container');
    if (containers.length <= 1) {
        alert('至少需要保留一个段落');
        return;
    }
    
    const container = button.closest('.paragraph-container');
    container.remove();
    updateDataModel();
}

function updateDataModel() {
    paragraphsData = Array.from(document.querySelectorAll('.paragraph-container, .image-container, .code-container')).map(container => {
        if (container.classList.contains('code-container')) {
                        return {
                            type: ParagraphType.CODE,
                            filename: container.querySelector('.code-filename').textContent,
                            content: container.querySelector('code').textContent,
                            language: container.querySelector('.language-select').value
                        };
                    }
        if (container.classList.contains('image-container')) {
            return {
                type: ParagraphType.IMAGE,
                src: container.querySelector('img').src,
                caption: container.querySelector('.image-caption').value
            };
        }
        return {
            type: ParagraphType.TEXT,
            title: container.querySelector('.paragraph-title').value,
            body: container.querySelector('.paragraph-body').value
        };
    });
}
function exportJson() {
    const data = {
        title: document.getElementById('articleTitle').value,
        paragraphs: paragraphsData
    };
    
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `document-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            loadDataIntoUI(data);
        } catch (error) {
            alert('无效的JSON文件');
        }
    };
    reader.readAsText(file);
});

function updateCodeLanguage(select) {
    const container = select.closest('.code-container');
    const codeBlock = container.querySelector('code');
    const lang = select.value;
    
    // 移除旧的高亮类
    codeBlock.className = codeBlock.className.replace(/\blanguage-\S+/g, '');
    codeBlock.classList.add(`language-${lang}`);
    
    // 重新高亮代码
    codeBlock.innerHTML = hljs.highlight(codeBlock.textContent, { 
        language: lang,
        ignoreIllegals: true 
    }).value;
    
    hljs.highlightElement(codeBlock);
    updateDataModel();
}

 
function loadDataIntoUI(data) {
    document.getElementById('articleTitle').value = data.title || '';
    const container = document.getElementById('paragraphsContainer');
    container.innerHTML = '';

    data.paragraphs.forEach(p => {
        if (p.type === ParagraphType.CODE) {
            const codeElement = createCodeElement(p.filename, p.content, p.language);
            container.appendChild(codeElement);
        }
        else if (p.type === ParagraphType.IMAGE) {  // 改为 else if
            const imageDiv = document.createElement('div');
            imageDiv.className = 'image-container';
            imageDiv.innerHTML = `
                <div class="image-preview">
                    <img src="${p.src}">
                    <button class="control-btn delete-btn" onclick="deleteParagraph(this)">删除</button>
                </div>
                <input type="text" 
                       class="image-caption" 
                       placeholder="请输入图片描述文字"
                       value="${p.caption || ''}">
            `;
            container.appendChild(imageDiv);
        } else {
            const element = createParagraphElement(p.title, p.body);
            container.appendChild(element);
        }
    });

    if (data.paragraphs.length === 0) addParagraph();
    updateDataModel();
}


async function generateDoc() {
    updateDataModel();
    
    const articleTitle = document.getElementById('articleTitle').value;
    if (!articleTitle) {
        alert('请填写文章主标题');
        return;
    }
    const hasInvalid = paragraphsData.some(p => {
        if (p.type === ParagraphType.TEXT) {
            return !p.title || !p.body;
        }
        if (p.type === ParagraphType.IMAGE) {
            return !p.src;
        }
        return true; // 未知类型视为无效
    });

    if (hasInvalid) {
        alert('请填写完整的段落信息（图片需要上传成功）');
        return;
    }

    try {
        const response = await fetch('/generate-doc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: articleTitle,
                paragraphs: paragraphsData
            })
        });

        if (!response.ok) throw new Error('生成失败');
        
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = '专业文档.docx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error:', error);
        alert('文档生成失败');
    }
}
document.addEventListener('input', () => updateDataModel());

// 初始添加一个段落
addParagraph();