 
        class SheetMusicEditor {
            constructor() {
                this.currentRepo = 's177';
                this.createElements();
                this.applyStyles();
                this.addEventListeners();
                this.settingsModal.style.display = 'block';
            }

            // 新增空格处理方法
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
                // ...保持原有元素创建代码不变...
            }

            applyStyles() {
                // ...保持原有样式代码不变...
            }

            addEventListeners() {
                // ...保持原有事件监听代码不变...
            }

            async loadIssueAndComments() {
                this.i11Toolbar.innerHTML = '';
                try {
                    const issueData = await this.apiRequest('GET', 'issues/11');
                    const issueBody = issueData.body;
                    if (issueBody) {
                        const issueButton = document.createElement('button');
                        issueButton.classList.add('bg-orange-500', 'hover:bg-orange-600', 'text-white', 'py-2', 'px-4', 'rounded', 'mr-2');
                        issueButton.textContent = '议题 11 内容';
                        issueButton.addEventListener('click', () => {
                            this.resetHighlight();
                            issueButton.classList.add('highlighted');
                            // 添加空格处理
                            this.sheetMusicInput.value = this.processSpaces(issueBody);
                            let parsedSheetMusic;
                            if (issueBody.includes('V:')) {
                                parsedSheetMusic = this.parseSheetMusic(issueBody);
                            } else {
                                parsedSheetMusic = `<span class="error">${issueBody}</span>`;
                            }
                            this.canvas.innerHTML = `<pre>${parsedSheetMusic}</pre>`;
                        });
                        this.i11Toolbar.appendChild(issueButton);
                    }

                    const commentsData = await this.apiRequest('GET', 'issues/11/comments');
                    let n = 0;
                    commentsData.forEach(comment => {
                        n++;
                        const commentBody = comment.body;
                        if (commentBody) {
                            const commentButton = document.createElement('button');
                            commentButton.classList.add('bg-pink-500', 'hover:bg-pink-600', 'text-white', 'py-2', 'px-4', 'rounded', 'mr-2');
                            commentButton.textContent = `C${n}`;
                            commentButton.addEventListener('click', () => {
                                this.resetHighlight();
                                commentButton.classList.add('highlighted');
                                // 添加空格处理
                                this.sheetMusicInput.value = this.processSpaces(commentBody);
                                let parsedSheetMusic;
                                if (commentBody.includes('V:')) {
                                    parsedSheetMusic = this.parseSheetMusic(commentBody);
                                } else {
                                    parsedSheetMusic = `<span class="error">${commentBody}</span>`;
                                }
                                this.canvas.innerHTML = `<pre>${parsedSheetMusic}</pre>`;
                            });
                            this.i11Toolbar.appendChild(commentButton);
                        }
                    });
                } catch (error) {
                    console.error('加载 issue 或评论时出错:', error);
                }
            }

            // ...保持其他方法不变...
        }

        new SheetMusicEditor(); 