let paragraphCount = 0;
const ParagraphType = {
    TEXT: 'text',
    IMAGE: 'image'
};
let generatedHtmlContent = '';

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
    
    if (!file.type.startsWith('image/')) {
        alert('请选择有效的图片文件');
        return;
    }

    // 获取最近的容器
    const lastFocused = document.querySelector('.paragraph-container:focus-within, .image-container:focus-within');
    const container = lastFocused || document.querySelector('.paragraph-container, .image-container');

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
    if (document.querySelectorAll('.paragraph-container').length <= 1) {
        alert('至少需要保留一个段落');
        return;
    }
    
    const container = button.closest('.paragraph-container');
    container.remove();
    updateDataModel();
}

function updateDataModel() {
    paragraphsData = Array.from(document.querySelectorAll('.paragraph-container, .image-container')).map(container => {
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
function loadDataIntoUI(data) {
    // 清空现有内容
    document.getElementById('articleTitle').value = data.title || '';
    const container = document.getElementById('paragraphsContainer');
    container.innerHTML = '';

    // 加载段落
    data.paragraphs.forEach(p => {
        const element = createParagraphElement(p.title, p.body);
        container.appendChild(element);
    });

    // 确保至少一个段落
    if (data.paragraphs.length === 0) addParagraph();
    updateDataModel();
}
async function generateDoc() {
    updateDataModel();
    
    const articleTitle = document.getElementById('articleTitle').value;
    
    if (!articleTitle || paragraphsData.some(p => !p.title || !p.body)) {
        alert('请填写完整的主标题和所有段落信息');
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