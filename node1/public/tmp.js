<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" rel="stylesheet">
    <title>简谱编辑系统</title>
</head>

<body class="bg-gray-100">
    <script> 
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
        class C4Beat {
            constructor(...notes) {
                this.notes = notes;
            }

            drawMe(ctx, x, y) {
                let currentX = x;
                this.notes.forEach(note => {
                    note.drawMe(ctx, currentX, y);
                    currentX += note.getWidth(ctx);
                });
                // draw green rect to wrap the beat
                ctx.strokeStyle = 'green';
                ctx.strokeRect(x, y - 30, this.getWidth(ctx), 60);
            }

            getWidth(ctx) {
                return this.notes.reduce((sum, note) => sum + note.getWidth(ctx), 0);
            }
        }
        class C4Bar {
            constructor(barContent) {
                this.barContent = barContent;
                this.durationMap = {
                        '//': '16th',  // 修改处：两个斜杠对应16分音符
                        '/':   '8th',
                        '':    '4th',
                        '-':   '2nd',
                        '---': 'whole'
                    };
                this.durationValues = {  
                    '16th': 0.25,
                    '8th': 0.5,
                    '4th': 1,
                    '2nd': 2,
                    'whole':4
                };
                this.beats = [];
                // 解析小节内容并添加节拍
                this.#parseBarContent();
                this.width = this.#calculateWidth();
            }
            addBeat(...notes) {
                this.beats.push(new C4Beat(...notes));
            }

            #parseBarContent() {
                const noteRegex = /(\d+)([\/-]*)(?:\("([^"]+)"\))?/g;
                let match;
                let currentBeatNotes = [];
                let currentDuration = 0;

                while ((match = noteRegex.exec(this.barContent)) !== null) {
                    const durationSymbol = this.#matchLongestSymbol(match[2]); // 新增最长匹配方法
                    const duration = this.durationMap[durationSymbol];
                    const durationValue = this.durationValues[duration];
                    
                    currentDuration += durationValue;
                    currentBeatNotes.push(new C4Note(
                        match[1], 
                        duration,
                        match[3]
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
                // 优先匹配更长的符号组合
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
                       this.beats.length * 4; // 节拍间距
            }

            drawMe(ctx, x, y) {
                ctx.save();
                ctx.translate(x, y);
                
                // 绘制小节线
                ctx.strokeStyle = '#666';
                ctx.setLineDash([]);
                ctx.strokeRect(-6, -33, this.getWidth(ctx) + 12, 70);

                // 绘制音符
                let currentX = 0;
                this.beats.forEach(beat => {
                    beat.drawMe(ctx, currentX, 0);
                    currentX += beat.getWidth(ctx);
                });
                
                ctx.restore();
            }
        }

        class SheetMusicEditor {
            constructor() { 
                this.version = '0.22';  // 版本升级
                this.currentRepo = 's177';
                this.canvasX = 0;
                this.canvasY = 0;
                this.lineSpacing = 115;
                this.createElements();
                this.applyStyles();
                this.addEventListeners();
                this.settingsModal.style.display = 'block';
            }
            // ...其余方法保持不变...
        }

        new SheetMusicEditor();
    </script>
</body>
</html>