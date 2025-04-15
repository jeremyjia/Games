 
        class C4Note {
            constructor(rawNote) {
                this.raw = rawNote;
                this.chord = '';
                this.duration = 1;
                this.parseNote();
            }

            parseNote() {
                // 解析和弦
                const chordMatch = this.raw.match(/"([^"]+)"/);
                if (chordMatch) {
                    this.chord = chordMatch[1];
                    this.raw = this.raw.replace(chordMatch[0], '');
                }

                // 解析时值和音符
                const noteMatch = this.raw.match(/(\d+)(\/*)(\.?)/);
                if (noteMatch) {
                    this.pitch = noteMatch[1];
                    this.duration = Math.pow(2, noteMatch[2].length); // 1/, 2// 等转换为分数
                    this.dotted = noteMatch[3] === '.';
                }
            }

            getHTML() {
                let html = '';
                // 添加和弦
                if (this.chord) {
                    html += `<span class="chord">${this.chord}</span>`;
                }

                // 处理时值样式
                let noteClass = '';
                if (this.duration === 2) {
                    noteClass = 'eighth-note';
                } else if (this.duration >= 4) {
                    noteClass = 'sixteenth-note';
                }

                // 构建音符HTML
                html += `<span class="${noteClass}">${this.pitch}`;
                if (this.dotted) {
                    html += '<span class="dot">.</span>';
                }
                html += '</span>';

                return this.chord 
                    ? `<span class="note-with-chord">${html}</span>`
                    : html;
            }
        }

        class SheetMusicEditor {
            constructor() {
                this.version = '0.24';
                // ...其余原有构造函数代码不变...
            }

            parseMusicLine(line) {
                let output = '';
                let currentNote = '';
                
                for (let i = 0; i < line.length; i++) {
                    const char = line[i];
                    if (this.isNoteStart(char)) {
                        if (currentNote) {
                            output += this.processCurrentNote(currentNote);
                            currentNote = '';
                        }
                        currentNote += char;
                    } else if (this.isNoteContinuation(char, currentNote)) {
                        currentNote += char;
                    } else {
                        if (currentNote) {
                            output += this.processCurrentNote(currentNote);
                            currentNote = '';
                        }
                        output += char;
                    }
                }
                if (currentNote) {
                    output += this.processCurrentNote(currentNote);
                }
                return output;
            }

            isNoteStart(char) {
                return /[0-9]/.test(char) || char === '"';
            }

            isNoteContinuation(char, currentNote) {
                return /[\/"0-9.]/.test(char) && 
                      !(currentNote.startsWith('"') && char === '"');
            }

            processCurrentNote(noteStr) {
                try {
                    const note = new C4Note(noteStr);
                    return note.getHTML();
                } catch (e) {
                    console.error('解析音符失败:', e);
                    return `<span class="error">${noteStr}</span>`;
                }
            }

            // ...其余原有方法保持不变...
        }

        new SheetMusicEditor();
    </script>
</body>
</html>