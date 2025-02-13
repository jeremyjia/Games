let paragraphCount = 0;
// 在script.js中添加以下函数
let generatedHtmlContent = '';

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
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 40px auto;
                padding: 20px;
                line-height: 1.6;
            }
            .article-title {
                color: #2E74B5;
                font-size: 2.4em;
                border-bottom: 3px solid #2EAD4B;
                padding-bottom: 15px;
                margin-bottom: 30px;
            }
            .paragraph-section {
                margin-bottom: 40px;
            }
            .paragraph-title {
                color: #2EAD4B;
                font-size: 1.8em;
                margin-bottom: 15px;
                font-family: Calibri, sans-serif;
            }
            .paragraph-body {
                color: #444;
                font-size: 1.1em;
                font-family: "Times New Roman", serif;
                line-height: 1.8;
                text-indent: 2em;
            }
        </style>
    </head>
    <body>
        <h1 class="article-title">${title}</h1>
        
        ${paragraphsData.map(p => `
        <div class="paragraph-section">
            <h2 class="paragraph-title">${p.title}</h2>
            <p class="paragraph-body">${p.body}</p>
        </div>
        `).join('')}
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
    paragraphsData = Array.from(document.querySelectorAll('.paragraph-container')).map(container => ({
        title: container.querySelector('.paragraph-title').value,
        body: container.querySelector('.paragraph-body').value
    }));
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