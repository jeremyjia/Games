 
        class SheetMusicEditor {
            // ...（保持其他代码不变，主要修改以下部分）

            exampleButton.addEventListener('click', () => {
                const exampleCode = `V:1.0
                    3/"C" 3// 3// 3. 2/ 3/ 5/
                    // `;
                // 新增空格处理
                this.sheetMusicInput.value = this.processSpaces(exampleCode);
                const parsedSheetMusic = this.parseSheetMusic(exampleCode);
                this.canvas.innerHTML = `<pre>${parsedSheetMusic}</pre>`;
            });

            newSheetButton.addEventListener('click', () => {
                const newSheetCode = `
                    V:1.1
                    3/"C" 3// 3// 3. 2/ 3/ 5/
                    // 
                    // `;
                // 新增空格处理
                this.sheetMusicInput.value = this.processSpaces(newSheetCode);
                const parsedSheetMusic = this.parseSheetMusic(newSheetCode);
                this.canvas.innerHTML = `<pre>${parsedSheetMusic}</pre>`;
            });

            // ...（保持其他方法不变）
            
            processSpaces(text) {
                return text.split('\n')
                    .map(line => line.replace(/\s{2,}/g, ' ').trim())
                    .join('\n');
            }
        }

        new SheetMusicEditor(); 