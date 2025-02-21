
class CBlDSMusic {
    constructor() {
        this.version = "CBlDSMusic v0.15";  
    }

    testDrawNotes(cx,mode,txt,x0,y0,dx){
        let x = x0;
        let y = y0;   
        cx.fillText(this.version,x,y);
        x += dx*5;
        cx.fillText(" : " + mode ,x,y);
        y += 20; 
        const lines = txt.split('\n');
        lines.forEach(line => {
            y += 20 *3;
            if(mode=="Mode1"){ 
                this.#drawNotes(cx,line,x,y,dx); 
            } else if(mode=="Mode2"){
                this.#drawSentence(cx,line,x,y,dx);  
            }
            else{ 
                cx.fillText(line,x,y);
            }
        }); 
 
    } 
 
    #drawSentence(cx, line, x, y, dx) {
        const measures = line.split('|').filter(m => m.trim() !== '');
        let currentX = x;
        for (const measure of measures) {
            const total = this.#calculateMeasureDuration(measure);
            const isTotalFour = Math.abs(total - 4) < 1e-6;
            const notes = measure.split(' ').filter(n => n.trim() !== '');
            const noteData = [];
            let measureStartX = currentX;

            // 绘制每个音符并记录数据
            notes.forEach(noteStr => {
                const parsed = this.#parseNote(noteStr);
                const displayText = noteStr;
                const textWidth = cx.measureText(displayText).width;
                cx.fillStyle = isTotalFour ? '#FF0000' : '#000000';
               // cx.fillText(displayText, currentX, y); should like drawTextNote to do ... 
                
                noteData.push({ x: currentX, width: textWidth, slash: parsed.slash });
                currentX += textWidth + dx;
            });
            this.#drawNotes(cx,measure,x,y,dx);

            // 绘制总时长
            const totalText = `[${total.toFixed(2)}]`;
            cx.fillText(totalText, currentX, y);
            currentX += cx.measureText(totalText).width + dx;

            // 绘制符尾线
            this.#drawMeasureBeams(cx, noteData, y);
        }
    }

    #drawMeasureBeams(cx, noteData, y) {
        if (noteData.length === 0) return;

        let currentSlash = noteData[0].slash;
        let groupStartX = noteData[0].x;
        let groupEndX = noteData[0].x + noteData[0].width;

        for (let i = 1; i < noteData.length; i++) {
            if (noteData[i].slash === currentSlash) {
                groupEndX = noteData[i].x + noteData[i].width;
            } else {
                this.#drawBeamGroup(cx, currentSlash, groupStartX, groupEndX, y);
                currentSlash = noteData[i].slash;
                groupStartX = noteData[i].x;
                groupEndX = noteData[i].x + noteData[i].width;
            }
        }
        this.#drawBeamGroup(cx, currentSlash, groupStartX, groupEndX, y);
    }

    #drawBeamGroup(cx, slash, startX, endX, y) {
        if (slash === 0) return;

        const config = this.conf;
        const baseY = y + config.fontSize / 2 + config.slashVerticalOffset;
        cx.strokeStyle = '#000';
        cx.lineWidth = config.slashLineWidth || 2;

        for (let i = 0; i < slash; i++) {
            const lineY = baseY + i * config.slashLineSpacing;
            cx.beginPath();
            cx.moveTo(startX, lineY);
            cx.lineTo(endX, lineY);
            cx.stroke();
        }
    }

    #calculateMeasureDuration(measureStr) {
        const notes = measureStr.split(' ').filter(n => n.trim() !== '');
        let total = 0;
        for (const noteStr of notes) {
            const parsed = this.#parseNote(noteStr);
            const baseDuration = 1 / (2 ** parsed.slash);
            const duration = baseDuration * (2 - (1 / (2 ** parsed.dash)));
            total += duration;
        }
        return total;
    }

    #drawNotes(cx,line,x,y,dx){ 
        const ns = line.split(' ');
        cx.save(); 
        for(let i =0; i < ns.length; i++) { 
            const parsed = this.#parseNote(ns[i]);
            this.#drawTextNote(
                cx,
                x + i * dx,
                y,
                parsed
            );
        }
        cx.restore();
    }
    #parseNote = function(noteStr) {
        const numMatch = noteStr.match(/^[0-7]/);
        if (!numMatch) return { value: '0', highOctave: 0, lowOctave: 0, slash: 0, dash: 0 };
        
        const symbols = noteStr.slice(1);
        let highOctave = 0, lowOctave = 0, slash = 0, dash = 0;

        for (const c of symbols) {
            switch(c) {
                case "'": highOctave++; break;
                case ",": lowOctave++; break;
                case "/": slash++; break;
                case "-": dash++; break;
            }
        }

        return {
            value: numMatch[0],
            highOctave,
            lowOctave,
            slash,
            dash,
            isRest: numMatch[0] === '0'
        };
    }
    #drawTextNote = function(cx, x, y, note) {
        const _tntc = this.conf;
                
        cx.save();
        cx.font = _tntc.fontSize + "px Arial";
        cx.textAlign = 'center';
        cx.textBaseline = 'middle';

        cx.fillStyle = note.isRest ? '#FF4444' : '#000';
        cx.fillText(note.value, x, y);

        // 高音点绘制（保持不变）...
        if (note.highOctave > 0) {
            const noteTop = y - _tntc.fontSize/2;
            const startY = noteTop - _tntc.highOctaveDotOffset;
            for (let i = 0; i < note.highOctave; i++) {
                cx.beginPath();
                cx.arc(x, startY - i * _tntc.octaveDotSpacing, 3, 0, Math.PI * 2);
                cx.fill();
            }
        }

        if (note.slash > 0) {
            cx.strokeStyle = '#000';
            cx.lineWidth = 2;
            const baseY = y + _tntc.fontSize/2 + _tntc.slashVerticalOffset; // 基于字体大小计算位置
            for (let i = 0; i < note.slash; i++) {
                cx.beginPath();
                cx.moveTo(
                    x - _tntc.slashLineLength/2, 
                    baseY + i * _tntc.slashLineSpacing
                );
                cx.lineTo(
                    x + _tntc.slashLineLength/2, 
                    baseY + i * _tntc.slashLineSpacing
                );
                cx.stroke();
            }
        }

        // 低音点绘制（保持不变）...
        if (note.lowOctave > 0) {
            const slashHeight = note.slash > 0 
                ? _tntc.slashVerticalOffset + (note.slash - 1) * _tntc.slashLineSpacing 
                : 0;
            const baseY = y + slashHeight + _tntc.lowOctaveDotOffset;
            for (let i = 0; i < note.lowOctave; i++) {
                cx.beginPath();
                cx.arc(x, baseY + i * _tntc.octaveDotSpacing, 3, 0, Math.PI * 2);
                cx.fill();
            }
        }

        // 修改后的右侧横杠绘制（水平排列）
        if (note.dash > 0) {
            cx.strokeStyle = '#000';
            cx.lineWidth = 2;
            const baseX = x + _tntc.dashHorizontalOffset;
            const baseY = y;  // 保持同一水平线
            for (let i = 0; i < note.dash; i++) {
                cx.beginPath();
                cx.moveTo(
                    baseX + i * _tntc.dashLineSpacing,
                    baseY
                );
                cx.lineTo(
                    baseX + i * _tntc.dashLineSpacing + _tntc.dashLineLength,
                    baseY
                );
                cx.stroke();
            }
        }
        cx.restore();
    }
    
}