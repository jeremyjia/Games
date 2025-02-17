/*
 当1个8分音符紧跟着一个l字母，就把它和下一个8分音符相连的意思就是他们下面的横杠是连在一起的。
例如：1,,/l 2/,  ；  5/l   6/ 

*/

class CBlDSMusic {
    constructor() {
        this.version = "CBlDSMusic v0.14"; 
        this.conf = musicConfigManager.getConfig();
    }

    testDrawNotes(cx,ns,x,y,dx){  
        cx.beginPath();
        cx.arc(x, y, 20, 0, Math.PI * 2);
        cx.fillStyle = '#ff11f2';
        cx.fill();
        cx.fillText(this.version,x,y);
        this.#drawNotes(cx,ns,x,y,dx);
    }
    #drawNotes(cx,ns,x,y,dx){ 
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