 
        class C4Note {
            constructor(note, duration, chord = null) {
                this.note = note;
                this.duration = duration;
                this.chord = chord;
            }

            drawMe(ctx, x, y, selectedNote) {
                const isSelected = this === selectedNote;

                ctx.save();
                const baseY = y + 5;
                
                if (isSelected) {
                    ctx.fillStyle = '#FF0000';
                    ctx.strokeStyle = '#FF0000';
                } else {
                    ctx.fillStyle = '#000000';
                    ctx.strokeStyle = '#333';
                }

                if (this.chord) {
                    ctx.font = '12px Arial';
                    ctx.textBaseline = 'bottom';
                    const chordWidth = ctx.measureText(this.chord).width;
                    ctx.fillText(this.chord, x + (this.getWidth(ctx) - chordWidth)/2, y - 15);
                }

                ctx.font = '20px Arial';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.note, x, baseY);

                const symbolX = x + ctx.measureText(this.note).width + 3;
                
                switch(this.duration) {
                    case '8th':
                        this.#drawLine(ctx, symbolX, baseY + 8, 12);
                        break;
                    case '16th':
                        this.#drawLine(ctx, symbolX, baseY + 8, 12);
                        this.#drawLine(ctx, symbolX, baseY + 12, 12);
                        break;
                    case '2nd':
                        this.#drawLine(ctx, x + 15, baseY + 15, 8, -45);
                        break;
                    case 'whole':
                        ctx.beginPath();
                        ctx.arc(x + 10, baseY, 6, 0, Math.PI * 2);
                        ctx.stroke();
                        break;
                    case 'dotted4th':
                        ctx.beginPath();
                        ctx.arc(x + ctx.measureText(this.note).width + 5, baseY, 2, 0, Math.PI * 2);
                        ctx.fill();
                        break;
                }
                ctx.restore();
            }

            #drawLine(ctx, x, y, length, angle = 0) {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle * Math.PI / 180);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(length, 0);
                ctx.stroke();
                ctx.restore();
            }

            getWidth(ctx) {
                ctx = ctx || document.createElement('canvas').getContext('2d');
                
                ctx.font = '20px Arial';
                const noteWidth = ctx.measureText(this.note).width;
                
                let symbolWidth = 0;
                switch(this.duration) {
                    case '8th':  symbolWidth = 15; break;
                    case '16th': symbolWidth = 18; break;
                    case '2nd':   symbolWidth = 10; break;
                    case 'whole':symbolWidth = 15; break;
                    case 'dotted4th': symbolWidth = 10; break;
                    default:     symbolWidth = 5;
                }

                let chordWidth = 0;
                if (this.chord) {
                    ctx.font = '12px Arial';
                    chordWidth = ctx.measureText(this.chord).width;
                }

                return Math.max(noteWidth + symbolWidth, chordWidth) + 8;
            }
        }

        class C4Beat {
            constructor(...notes) {
                this.notes = notes;
            }

            drawMe(ctx, x, y, selectedNote) {
                let currentX = x;
                const notesInfo = [];
                this.notes.forEach(note => {
                    notesInfo.push({
                        note,
                        x: currentX,
                        y,
                        width: note.getWidth(ctx),
                        height: 20
                    });
                    note.drawMe(ctx, currentX, y, selectedNote);
                    currentX += note.getWidth(ctx);
                });
                return notesInfo;
            }

            getWidth(ctx) {
                return this.notes.reduce((sum, note) => sum + note.getWidth(ctx), 0);
            }
        }
       
        class C4Bar {
            constructor(barContent) {
                this.barContent = barContent;
                this.durationMap = {
                    '//': '16th',
                    '/':   '8th',
                    '':    '4th',
                    '-':   '2nd',
                    '---': 'whole',
                    '.': 'dotted4th'
                };
                this.durationValues = {  
                    '16th': 0.25,
                    '8th': 0.5,
                    '4th': 1,
                    '2nd': 2,
                    'whole':4,
                    'dotted4th': 1.5
                };
                this.beats = [];
                this.#parseBarContent();
                this.width = this.#calculateWidth();
            }

            addBeat(...notes) {
                this.beats.push(new C4Beat(...notes));
            }

            #parseBarContent() {
                const noteRegex = /(\d+)([\/-]*)(\.?)(?:\("([^"]+)"\))?/g;
                let match;
                let currentBeatNotes = [];
                let currentDuration = 0;

                while ((match = noteRegex.exec(this.barContent)) !== null) {
                    const durationSymbol = this.#matchLongestSymbol(match[2]);
                    let duration = this.durationMap[durationSymbol];
                    if (match[3] === '.') duration = 'dotted4th';
                    
                    currentDuration += this.durationValues[duration];
                    currentBeatNotes.push(new C4Note(
                        match[1], 
                        duration,
                        match[4]
                    ));

                    if ([1, 2, 4].includes(currentDuration)) {
                        this.addBeat(...currentBeatNotes);
                        currentBeatNotes = [];
                        currentDuration = 0;
                    }
                }

                if (currentBeatNotes.length > 0) {
                    this.addBeat(...currentBeatNotes);
                }
            }

            #matchLongestSymbol(symbols) {
                const possible = ['---', '//', '/', '-', ''];
                for (const s of possible) {
                    if (symbols.startsWith(s)) return s;
                }
                return '';
            }
            
            #calculateWidth() {
                return this.beats.reduce((sum, beat) => sum + beat.getWidth(), 0);
            }

            getWidth(ctx) {
                return this.beats.reduce((sum, beat) => sum + beat.getWidth(ctx), 0) + 
                       this.beats.length * 4;
            }

            drawMe(ctx, x, y, selectedNote) {
                ctx.save();
                ctx.translate(x, y);
                
                ctx.strokeStyle = '#666';
                ctx.setLineDash([]);
                ctx.strokeRect(-6, -33, this.getWidth(ctx) + 12, 70);

                let currentX = 0;
                const notesInfo = [];
                this.beats.forEach(beat => {
                    const beatNotes = beat.drawMe(ctx, currentX, 0, selectedNote);
                    notesInfo.push(...beatNotes.map(n => ({
                        ...n,
                        x: x + n.x,
                        y: y + n.y
                    })));
                    currentX += beat.getWidth(ctx);
                });
                
                ctx.restore();
                return notesInfo;
            }
        }

        class SheetMusicEditor {
            constructor() { 
                this.version = '0.25';
                this.currentRepo = 's177';
                this.canvasX = 0;
                this.canvasY = 0;
                this.lineSpacing = 115;
                this.selectedNote = null;
                this.notesInfo = [];
                this.createElements();
                this.applyStyles();
                this.addEventListeners();
                this.settingsModal.style.display = 'block';
            }

            handleCanvasClick(e) {
                const rect = this.canvas.getBoundingClientRect();
                const scaleX = this.canvas.width / rect.width;
                const scaleY = this.canvas.height / rect.height;
                const canvasX = (e.clientX - rect.left) * scaleX;
                const canvasY = (e.clientY - rect.top) * scaleY;

                for (const noteInfo of this.notesInfo) {
                    if (canvasX >= noteInfo.x && canvasX <= noteInfo.x + noteInfo.width &&
                        canvasY >= noteInfo.y && canvasY <= noteInfo.y + noteInfo.height) {
                        this.selectedNote = noteInfo.note;
                        this.parseSheetMusic(this.sheetMusicInput.value);
                        break;
                    }
                }
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
                // ...（保持原有元素创建逻辑不变）...
            }

            applyStyles() {
                // ...（保持原有样式不变）...
            }

            addEventListeners() {
                // ...（保持原有事件监听逻辑不变）...
            }

            async loadIssueAndComments() {
                // ...（保持原有issue加载逻辑不变）...
            }
            
            parseSheetMusic(input) {
                const lines = input.split('\n').filter(l => l.startsWith('Q:'));
                const musicLines = lines.map(line => line.replace('Q:', '').trim());
                this.selectedNote = null;
                this.#drawMusicLines(musicLines);
            }

            #drawMusicLines(lines) {
                const ctx = this.canvas.getContext('2d');
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.notesInfo = [];

                let y = this.y0;
                lines.forEach(line => {
                    const barGroup = line.split('|').map(b => new C4Bar(b));
                    let x = this.x0;
                    
                    barGroup.forEach(bar => {
                        const barNotes = bar.drawMe(ctx, x, y, this.selectedNote);
                        this.notesInfo.push(...barNotes);
                        x += bar.getWidth(ctx) + 20;
                    });
                    
                    y += this.lineSpacing;
                });
            }

            // ...（保持其他辅助方法不变）...
        }

        new SheetMusicEditor();
    </script>
</body>
</html>