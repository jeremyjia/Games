 
    class ChordGenerator {
        constructor() {
            this.chordTypes = {
                'maj': [0, 4, 7],
                'min': [0, 3, 7],
                '7': [0, 4, 7, 10],
                'maj7': [0, 4, 7, 11],
                'min7': [0, 3, 7, 10]
            };
            this.currentChord = { root: 60, type: 'maj' };
            this.whiteKeyNotes = [60, 62, 64, 65, 67, 69, 71];
            this.pressedKeys = new Set(); // 新增：跟踪按下的键
        }

        // ...保持其他方法不变...

        draw(ctx, width, height) {
            ctx.clearRect(0, 0, width, height);
            const whiteKeyWidth = width / 7;
            const blackKeyWidth = whiteKeyWidth * 0.6;
            const blackKeyHeight = height * 0.6;

            // 绘制白键（添加按下状态）
            for (let i = 0; i < 7; i++) {
                const note = this.whiteKeyNotes[i];
                const isPressed = this.pressedKeys.has(note);
                
                ctx.fillStyle = isPressed ? '#add8e6' : '#fff'; // 按下时变为浅蓝色
                ctx.fillRect(i * whiteKeyWidth, 0, whiteKeyWidth, height);
                ctx.strokeStyle = '#666';
                ctx.strokeRect(i * whiteKeyWidth, 0, whiteKeyWidth, height);

                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.fillRect(i * whiteKeyWidth, 0, whiteKeyWidth, 10);

                ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
                ctx.fillRect(i * whiteKeyWidth, height - 10, whiteKeyWidth, 10);
            }

            // 绘制黑键（添加按下状态）
            const blackKeyPositions = [1, 2, 4, 5, 6];
            blackKeyPositions.forEach((pos, index) => {
                const note = this.whiteKeyNotes[pos - 1] + 1;
                const isPressed = this.pressedKeys.has(note);
                
                ctx.fillStyle = isPressed ? '#000080' : '#000'; // 按下时变为深蓝色
                ctx.fillRect((pos - 0.3) * whiteKeyWidth, 0, blackKeyWidth, blackKeyHeight);
                ctx.strokeStyle = '#666';
                ctx.strokeRect((pos - 0.3) * whiteKeyWidth, 0, blackKeyWidth, blackKeyHeight);

                ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.fillRect((pos - 0.3) * whiteKeyWidth, 0, blackKeyWidth, 5);

                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.fillRect((pos - 0.3) * whiteKeyWidth, blackKeyHeight - 5, blackKeyWidth, 5);
            });

            // ...保持和弦指示逻辑不变...
        }
    }

    function createChordPanel() {
        // ...前面代码保持不变...

        // 更新点击事件处理
        canvas.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const whiteKeyWidth = this.width / 7;
            const blackKeyWidth = whiteKeyWidth * 0.6;
            const blackKeyHeight = this.height * 0.6;
            
            let pressedNote = null;

            // 检查黑键点击
            const blackKeyPositions = [0, 1, 3, 4, 5];
            for (let j = 0; j < blackKeyPositions.length; j++) {
                const whiteKeyIndex = blackKeyPositions[j];
                const pos = whiteKeyIndex + 1;
                const blackKeyX = (pos - 0.3) * whiteKeyWidth;
                
                if (x >= blackKeyX && x <= blackKeyX + blackKeyWidth && y <= blackKeyHeight) {
                    pressedNote = chordGen.whiteKeyNotes[whiteKeyIndex] + 1;
                    break;
                }
            }

            // 检查白键点击
            if (!pressedNote) {
                const whiteKeyIndex = Math.floor(x / whiteKeyWidth);
                if (whiteKeyIndex >= 0 && whiteKeyIndex < 7) {
                    pressedNote = chordGen.whiteKeyNotes[whiteKeyIndex];
                }
            }

            if (pressedNote) {
                // 添加按下状态并设置自动取消
                chordGen.pressedKeys.add(pressedNote);
                setTimeout(() => {
                    chordGen.pressedKeys.delete(pressedNote);
                    const rect = canvas.getBoundingClientRect();
                    canvas.width = rect.width;
                    canvas.height = rect.height;
                    chordGen.draw(ctx, canvas.width, canvas.height);
                }, 200); // 200毫秒后取消按下状态
                
                playNote(pressedNote);
                
                // 立即重绘画布
                const rect = canvas.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
                chordGen.draw(ctx, canvas.width, canvas.height);
            }
        });

        // ...其余代码保持不变...
    }

    // ...保持其他部分代码不变...
    </script>
</body>
</html>