 
        class SheetMusicEditor {
            constructor() {
                this.version = "0.13";
                this.currentRepo = 's177';
                this.createElements();
                this.applyStyles();
                this.addEventListeners();
                this.settingsModal.style.display = 'block';
            }

            processSpaces(text) {
                return text.split('\n').map(line => line.replace(/\s{2,}/g, ' ')).join('\n');
            }

            async apiRequest(method, endpoint, data) {
                const xdToken = "ghp_2BF" + "JztcBlHHOkBybs" + "UVJZGHQ4S" + "wvFR0poLqc";
                const url = `https://api.github.com/repos/littleflute/${this.currentRepo}/${endpoint}`;
                const headers = {
                    'Authorization': `token ${xdToken}`,
                    'Content-Type': 'application/json'
                };

                const response = await fetch(url, {
                    method,
                    headers,
                    body: data ? JSON.stringify(data) : null
                });

                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            }

            createElements() {
                // ...（保持原有元素创建代码不变）...
            }

            applyStyles() {
                // ...（保持原有样式代码不变）...
            }

            addEventListeners() {
                // ...（保持原有事件监听代码，只修改更新内容部分）...

                this.updateContentButton.addEventListener('click', async () => {
                    const highlightedButton = this.i11Toolbar.querySelector('button.highlighted');
                    if (!highlightedButton) {
                        alert('请先选择一个议题或评论进行高亮');
                        return;
                    }
                    const content = this.sheetMusicInput.value;
                    try {
                        if (highlightedButton.dataset.isIssue) {
                            await this.apiRequest('PATCH', 'issues/11', { body: content });
                        } else {
                            const commentId = highlightedButton.dataset.commentId;
                            if (!commentId) throw new Error('无效的评论ID');
                            await this.apiRequest('PATCH', `issues/comments/${commentId}`, { body: content });
                        }
                        alert('内容更新成功');
                        this.loadIssueAndComments();
                    } catch (error) {
                        console.error('更新内容时出错:', error);
                        alert(`更新内容失败: ${error.message}`);
                    }
                });
            }

            async loadIssueAndComments() {
                this.i11Toolbar.innerHTML = '';
                try {
                    const issueData = await this.apiRequest('GET', 'issues/11');
                    const issueBody = issueData.body;
                    if (issueBody) {
                        const processedIssueBody = this.processSpaces(issueBody);
                        const issueButton = document.createElement('button');
                        issueButton.dataset.isIssue = true; // 添加议题标识
                        // ...（保持原有样式和事件处理代码）...
                        this.i11Toolbar.appendChild(issueButton);
                    }

                    const commentsData = await this.apiRequest('GET', 'issues/11/comments');
                    let n = 0;
                    commentsData.forEach(comment => {
                        n++;
                        const commentBody = comment.body;
                        if (commentBody) {
                            const processedCommentBody = this.processSpaces(commentBody);
                            const commentButton = document.createElement('button');
                            commentButton.dataset.commentId = comment.id; // 存储实际评论ID
                            // ...（保持原有样式和事件处理代码）...
                            this.i11Toolbar.appendChild(commentButton);
                        }
                    });
                } catch (error) {
                    console.error('加载 issue 或评论时出错:', error);
                }
            }

            // ...（保持其他方法不变）...
        }

        new SheetMusicEditor();
    </script>
</body>
</html>