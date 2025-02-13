let paragraphCount = 0;

function addParagraph() {
    const container = document.getElementById('paragraphsContainer');
    
    const div = document.createElement('div');
    div.className = 'paragraph-container';
    div.innerHTML = `
        <input type="text" 
               class="paragraph-title" 
               placeholder="段落标题 ${paragraphCount + 1}">
        <textarea class="paragraph-body" 
                  placeholder="段落内容 ${paragraphCount + 1}"></textarea>
    `;
    
    container.appendChild(div);
    paragraphCount++;
}

async function generateDoc() {
    const articleTitle = document.getElementById('articleTitle').value;
    const paragraphs = Array.from(document.querySelectorAll('.paragraph-container'))
        .map(container => ({
            title: container.querySelector('.paragraph-title').value,
            body: container.querySelector('.paragraph-body').value
        }));

    if (!articleTitle || paragraphs.some(p => !p.title || !p.body)) {
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
                paragraphs: paragraphs
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

// 初始添加一个段落
addParagraph();