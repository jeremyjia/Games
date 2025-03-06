//c4MusicScript.js

class C4MusicScript {
    constructor() {
      this.BPM = 120; // 默认BPM为120
      this.beatType = '4/4'; // 默认拍号为4/4
      this.beatNumerator = 4; // 拍号分子
      this.beatDenominator = 4; // 拍号分母
      this.barsPerLine = 4; // 每行默认4小节
    }
  
    /**
     * 设置UI控件到指定的div元素中
     * @param {HTMLElement} div - 用于放置UI控件的div元素
     */
    setUI(div) {
      div.innerHTML = ''; // 清空div内容
  
      // 创建BPM输入控件
      const bpmContainer = document.createElement('div');
      const bpmLabel = document.createElement('label');
      bpmLabel.textContent = 'BPM: ';
      this.bpmInput = document.createElement('input');
      this.bpmInput.type = 'number';
      this.bpmInput.min = 1;
      this.bpmInput.value = this.BPM;
      bpmLabel.appendChild(this.bpmInput);
      bpmContainer.appendChild(bpmLabel);
  
      // 创建拍号选择控件
      const beatTypeContainer = document.createElement('div');
      const beatTypeLabel = document.createElement('label');
      beatTypeLabel.textContent = '拍号: ';
      this.beatTypeSelect = document.createElement('select');
      ['4/4', '3/4', '6/8', '2/4'].forEach(beat => {
        const option = document.createElement('option');
        option.value = beat;
        option.textContent = beat;
        if (beat === this.beatType) option.selected = true;
        this.beatTypeSelect.appendChild(option);
      });
      beatTypeLabel.appendChild(this.beatTypeSelect);
      beatTypeContainer.appendChild(beatTypeLabel);
  
      // 创建每行小节数输入控件
      const barsPerLineContainer = document.createElement('div');
      const barsPerLineLabel = document.createElement('label');
      barsPerLineLabel.textContent = '每行小节数: ';
      this.barsPerLineInput = document.createElement('input');
      this.barsPerLineInput.type = 'number';
      this.barsPerLineInput.min = 1;
      this.barsPerLineInput.value = this.barsPerLine;
      barsPerLineLabel.appendChild(this.barsPerLineInput);
      barsPerLineContainer.appendChild(barsPerLineLabel);
  
      // 将控件添加到div中
      div.append(bpmContainer, beatTypeContainer, barsPerLineContainer);
  
      // 绑定事件处理函数
      this.bpmInput.addEventListener('change', (e) => {
        this.BPM = parseInt(e.target.value) || 120;
      });
  
      this.beatTypeSelect.addEventListener('change', (e) => {
        this.beatType = e.target.value;
        const [numerator, denominator] = e.target.value.split('/').map(Number);
        this.beatNumerator = numerator;
        this.beatDenominator = denominator;
      });
  
      this.barsPerLineInput.addEventListener('change', (e) => {
        this.barsPerLine = parseInt(e.target.value) || 4;
      });
    }
  
    /**
     * 在画布上显示当前时间对应的小节和拍数
     * @param {CanvasRenderingContext2D} ctx - 画布上下文
     * @param {number} currentTime - 当前时间（秒）
     */
    showInf(ctx, currentTime) {
      // 计算每拍时长和小节时长
      const beatDuration = 60 / this.BPM;
      const beatsPerBar = this.beatNumerator;
      const barDuration = beatsPerBar * beatDuration;
  
      // 计算总拍数、当前小节和拍数
      const totalBeats = currentTime / beatDuration;
      const barNumber = Math.floor(totalBeats / beatsPerBar) + 1;
      const beatNumber = Math.floor(totalBeats % beatsPerBar) + 1;
  
      // 清除画布并绘制文本
      ctx.font = '20px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText(`小节: ${barNumber}, 拍: ${beatNumber}`, 10, 30);
      console.log(`小节: ${barNumber}, 拍: ${beatNumber}`);
    }
  }