 
        class SheetMusicEditor {
            // ... 保持原有构造函数和其他方法不变 ...

            parseSheetMusic(input) {
                const lines = input.split('\n');
                let output = '';
                
                lines.forEach(line => {
                    if (line.startsWith('Q:')) {
                        const content = line.substring(2).trim();
                        output += `<span class="blue-note">${this.parseMusicLine(content)}</span>`;
                    } else {
                        output += `<span class="green-text">${line}</span>`;
                    }
                    output += '<br>';
                });
                return output;
            }

            parseMusicLine(line) {
                let output = '';
                let currentNote = '';
                for (let i = 0; i < line.length; i++) {
                    const char = line[i];
                    if (/[0-9]/.test(char)) {
                        if (currentNote) {
                            output += this.formatNote(currentNote);
                            currentNote = '';
                        }
                        currentNote += char;
                    } else if (char === '/') {
                        currentNote += char;
                    } else if (char === '"') {
                        if (currentNote) {
                            const chord = this.extractChord(line, i);
                            output += this.formatNoteWithChord(currentNote, chord);
                            currentNote = '';
                            i += chord.length + 1;
                        }
                    } else {
                        if (currentNote) {
                            output += this.formatNote(currentNote);
                            currentNote = '';
                        }
                        output += char;
                    }
                }
                if (currentNote) {
                    output += this.formatNote(currentNote);
                }
                return output;
            }

            // ... 保持其他辅助方法不变 ...

            applyStyles() {
                const style = document.createElement('style');
                style.textContent = `
                    /* 新增样式 */
                    .blue-note {
                        color: #2563eb;
                    }
                    .green-text {
                        color: #16a34a;
                    }
                    /* 保持原有样式不变 */
                    #canvas {
                        width: 100%;
                        height: calc(100vh - 64px);
                        border: 1px solid #ccc;
                        font-family: monospace;
                        overflow-y: auto;
                    }
                    /* ... 其他原有样式保持不变 ... */
                `;
                document.head.appendChild(style);
            }

            // ... 保持事件监听和其他方法不变 ...
        }

        new SheetMusicEditor();  