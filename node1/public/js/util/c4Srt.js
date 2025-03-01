// srt.js
class C4Srt{
    constructor(srtText) {
        this.srtText = srtText;
        this.subtitles = [];
        this.currentSubtitleText = '';
        this.parseSrt();
    }

    showCurrentSubTxt(ctx,canvas){
        const subtitleText = this.currentSubtitleText;
        // 新增字幕绘制
        if (subtitleText) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            
            // 处理多行字幕
            const lines = subtitleText.split('\n');
            const lineHeight = 24;
            const startY = canvas.height - 40;
            
            lines.forEach((line, index) => {
                ctx.fillText(
                    line,
                    canvas.width / 2,
                    startY - (lines.length - 1 - index) * lineHeight
                );
            });
        }
    }
    parseSrt() {
        this.subtitles = [];
        const blocks = this.srtText.trim().split('\n\n');
        
        for (const block of blocks) {
            const lines = block.split('\n');
            if (lines.length < 3) continue;

            const id = parseInt(lines[0]);
            const timecodes = lines[1].split(' --> ');
            const start = this.parseTimecode(timecodes[0]);
            const end = this.parseTimecode(timecodes[1]);
            const text = lines.slice(2).join('\n');

            this.subtitles.push({ 
                id, 
                start,
                end,
                text: this.formatSubtitleText(text)
            });
        }
    }

    parseTimecode(timecode) {
        const [hms, ms] = timecode.split(',');
        const [h, m, s] = hms.split(':');
        return parseFloat(h) * 3600 + 
               parseFloat(m) * 60 + 
               parseFloat(s) + 
               parseFloat(ms) / 1000;
    }

    formatSubtitleText(text) {
        // 删除多余空格，保留换行
        return text
            .replace(/(\S) {2,}(\S)/g, '$1 $2')  // 替换多个空格为单空格
            .replace(/(\r\n|\n|\r)/gm, '\n')      // 统一换行符
            .trim();
    }

    getCurrentSubtitle(currentTime) {
        this.currentSubtitleText = '';
        for (const sub of this.subtitles) {
            if (currentTime >= sub.start && currentTime < sub.end) {
                this.currentSubtitleText = sub.text;
                break;
            }
        }
        return this.currentSubtitleText;
    }

    updateSrt(newSrt) {
        this.srtText = newSrt;
        this.parseSrt();
    }
}