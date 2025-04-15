 
        class C4Note {
            constructor(note, duration, chord = null) {
                this.note = note;
                this.duration = duration;
                this.chord = chord;
            }

            drawMe(ctx, x, y) {
                ctx.save();
                const baseY = y + 5; // 基准线调整
                
                // 绘制和弦
                if (this.chord) {
                    ctx.font = '12px Arial';
                    ctx.textBaseline = 'bottom';
                    const chordWidth = ctx.measureText(this.chord).width;
                    ctx.fillText(this.chord, x + (this.getWidth(ctx) - chordWidth)/2, y - 15);
                }

                // 绘制主音符
                ctx.font = '20px Arial';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.note, x, baseY);

                // 绘制时值符号
                ctx.strokeStyle = '#333';
                ctx.lineWidth = 1.2;
                const symbolX = x + ctx.measureText(this.note).width + 3;
                
                switch(this.duration) {
                    case '8th':   // 八分音符：单下划线
                        this.#drawLine(ctx, symbolX, baseY + 8, 12);
                        break;
                    case '16th':  // 十六分音符：双下划线
                        this.#drawLine(ctx, symbolX, baseY + 8, 12);
                        this.#drawLine(ctx, symbolX, baseY + 12, 12);
                        break;
                    case '2nd':   // 二分音符：右侧短线
                        this.#drawLine(ctx, x + 15, baseY + 15, 8, -45);
                        break;
                    case 'whole': // 全音符：环绕圆圈
                        ctx.beginPath();
                        ctx.arc(x + 10, baseY, 6, 0, Math.PI * 2);
                        ctx.stroke();
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
                ctx = ctx || document.createElement('canvas').getContext('2d'); // 兼容测量
                
                // 测量音符宽度
                ctx.font = '20px Arial';
                const noteWidth = ctx.measureText(this.note).width;
                
                // 符号附加宽度
                let symbolWidth = 0;
                switch(this.duration) {
                    case '8th':  symbolWidth = 15; break;
                    case '16th': symbolWidth = 18; break;
                    case '2nd':   symbolWidth = 10; break;
                    case 'whole':symbolWidth = 15; break;
                    default:     symbolWidth = 5;
                }

                // 测量和弦宽度
                let chordWidth = 0;
                if (this.chord) {
                    ctx.font = '12px Arial';
                    chordWidth = ctx.measureText(this.chord).width;
                }

                return Math.max(noteWidth + symbolWidth, chordWidth) + 8; // 总宽度
            }
        }

        class C4Bar {
            constructor(barContent) {
                this.barContent = barContent;
                this.notes = this.#parseBarContent();
            }

            #parseBarContent() {
                const noteRegex = /(\d+)(\/+|[-]+)?(?:"(\w+)")?/g; // 改进正则匹配和弦
                const notes = [];
                let match;
                
                while ((match = noteRegex.exec(this.barContent)) !== null) {
                    const durationMap = {
                        '///': '16th',
                        '/':   '8th',
                        '':    '4th',
                        '-':   '2nd',
                        '---': 'whole'
                    };
                    notes.push(new C4Note(
                        match[1],
                        durationMap[match[2]?.trim() || '4th'],
                        match[3] 
                    ));
                }
                return notes;
            }

            getWidth(ctx) {
                return this.notes.reduce((sum, note) => sum + note.getWidth(ctx), 0) + 
                       this.notes.length * 4; // 音符间距
            }

            drawMe(ctx, x, y) {
                ctx.save();
                ctx.translate(x, y);
                
                // 绘制小节线
                ctx.strokeStyle = '#666';
                ctx.setLineDash([]);
                ctx.strokeRect(-6, -24, this.getWidth(ctx) + 12, 40);

                // 绘制音符
                let currentX = 0;
                this.notes.forEach(note => {
                    note.drawMe(ctx, currentX, 0);
                    currentX += note.getWidth(ctx);
                });
                
                ctx.restore();
            }
        }

        class SheetMusicEditor {
            constructor() {
                this.version = '0.14'; // 直接版本管理
                this.currentRepo = 's177';
                this.lineSpacing = 55;
                this.createElements();
                this.applyStyles();
                this.addEventListeners();
                this.settingsModal.style.display = 'block';
            }

            // ... [保持其他方法不变，主要修改解析和绘制部分] ...

            parseSheetMusic(input) {
                const lines = input.split('\n').filter(l => l.startsWith('Q:'));
                const musicLines = lines.map(line => line.replace('Q:', '').trim());
                this.#drawMusicLines(musicLines);
            }

            #drawMusicLines(lines) {
                const ctx = this.canvas.getContext('2d');
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                
                let y = this.y0;
                lines.forEach(line => {
                    const barGroup = line.split('|').map(b => new C4Bar(b));
                    let x = this.x0;
                    
                    barGroup.forEach(bar => {
                        bar.drawMe(ctx, x, y);
                        x += bar.getWidth(ctx) + 20; // 小节间距
                    });
                    
                    y += this.lineSpacing;
                });
            }
        }

        new SheetMusicEditor();
    </script>
</body>
</html>