// srt.js
class C4Srt{
    constructor() {
        const srtText = `
1
00:00:00,000 --> 00:00:04,000
Lesson 1 A Private Conversation

2
00:00:04,000 --> 00:00:09,000
First listen and then answer the question.

3
00:00:09,000 --> 00:00:14,000
Why did the writer complain to the people behind him?

4
00:00:14,000 --> 00:00:19,000
Last week I went to the theatre.

5
00:00:19,000 --> 00:00:22,000
I had a very good seat.

6
00:00:22,000 --> 00:00:24,000
The play was very interesting.

7
00:00:24,000 --> 00:00:27,000
Idid not enjoy it.

8
00:00:27,000 --> 00:00:31,000
A young man and a young woman were sitting behind me.

9
00:00:31,000 --> 00:00:34,000
They were talking loudly.

10
00:00:34,000 --> 00:00:36,000
I got very angry.

11
00:00:36,000 --> 00:00:40,000
I could not hear the actors.

12
00:00:40,000 --> 00:00:46,000
I turned round.I looked at the man and the woman angrily.

13
00:00:46,000 --> 00:00:50,000
They did not pay any attention.

14
00:00:50,000 --> 00:00:54,000
In the end,I could not bear it.

15
00:00:54,000 --> 00:01:02,000
I turned round again 'I can't hear a word!'I said angrily

16
00:01:02,000 --> 00:01:08,000
'It's none of your business,'the young man said rudely.
 
`;

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