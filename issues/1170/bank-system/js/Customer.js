/**
 * 独立 Customer 类
 * 特点：
 * 1. 不依赖任何特定系统
 * 2. 通过回调函数与外部系统交互
 * 3. 可配置的外观和行为
 * 4. 支持多种消息类型
 */

// 默认配置
var CustomerDefaults = {
    // 外观配置
    appearance: {
        hairColors: ['#5D4037', '#3E2723', '#6D4C41'],
        clothColors: ['#4A90E2', '#00C853', '#D50000', '#AA00FF'],
        numberDisplay: true
    },
    
    // 行为配置
    behavior: {
        messageChance: 0.3,
        drawTypes: {
            CIRCLE: 'circle',
            LIKE: 'like'
        }
    },
    
    // 消息配置
    messages: [
        '服务很好，但等待时间有点长',
        '工作人员非常专业',
        '希望能增加更多的服务点',
        '系统效率很高，点赞！',
        '等待时间太久了，建议改进',
        '环境很舒适，服务态度好',
        '希望能有更多的自助设备',
        '这是我见过最有效率的服务'
    ]
};

/**
 * Customer 构造函数
 * @param {number|string} id - 客户标识
 * @param {object} options - 配置选项
 */
function Customer(id, options) {
    if (!id && id !== 0) {
        throw new Error('Customer必须有一个id');
    }
    
    // 合并配置
    this.config = Object.assign({}, CustomerDefaults, options);
    this.id = id;
    this.messages = [];
    
    // 创建DOM元素
    this.element = this._createElement();
    
    // 初始化事件
    this._initEvents();
}

/* ========== 外观相关方法 ========== */

/**
 * 创建客户DOM元素
 */
Customer.prototype._createElement = function() {
    var element = document.createElement('div');
    element.className = 'customer';
    
    // 基础结构
    element.innerHTML = `
        <div class="hair"></div>
        <div class="head">
            <div class="eye left"></div>
            <div class="eye right"></div>
        </div>
        <div class="arm left"></div>
        <div class="arm right"></div>
        <div class="body"></div>
        <div class="leg left"></div>
        <div class="leg right"></div>
    `;
    
    // 应用随机样式
    this._applyRandomAppearance(element);
    
    return element;
};

/**
 * 应用随机外观
 */
Customer.prototype._applyRandomAppearance = function(element) {
    var hairColor = this._getRandomHairColor();
    var clothColor = this._getRandomClothColor();
    
    element.querySelector('.hair').style.background = hairColor;
    var body = element.querySelector('.body');
    body.style.background = clothColor;
    
    // 显示ID
    if (this.config.appearance.numberDisplay) {
        body.textContent = this.id;
    }
    
    // 统一腿部颜色
    var legs = element.querySelectorAll('.leg');
    for (var i = 0; i < legs.length; i++) {
        legs[i].style.background = clothColor;
    }
};

/**
 * 获取随机头发颜色
 */
Customer.prototype._getRandomHairColor = function() {
    var colors = this.config.appearance.hairColors;
    return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * 获取随机衣服颜色
 */
Customer.prototype._getRandomClothColor = function() {
    var colors = this.config.appearance.clothColors;
    return colors[Math.floor(Math.random() * colors.length)];
};

/* ========== 事件相关方法 ========== */

/**
 * 初始化事件
 */
Customer.prototype._initEvents = function() {
    var self = this;
    this.element.addEventListener('click', function(e) {
        self._handleClick(e);
    });
};

/**
 * 处理点击事件
 */
Customer.prototype._handleClick = function(event) {
    if (typeof this.onClick === 'function') {
        this.onClick({
            customer: this,
            event: event,
            defaultAction: this._showInfo.bind(this)
        });
    } else {
        this._showInfo();
    }
};

/**
 * 显示客户信息
 */
Customer.prototype._showInfo = function() {
    console.log('客户信息 - ID:', this.id, '留言数:', this.messages.length);
};

/* ========== 消息相关方法 ========== */

/**
 * 创建消息
 * @param {function} [callback] - 消息创建后的回调
 */
Customer.prototype.createMessage = function(callback) {
    if (Math.random() < this.config.behavior.messageChance) {
        var message = Math.random() > 0.5 
            ? this._createTextMessage() 
            : this._createDrawingMessage();
        
        this.messages.push(message);
        
        if (typeof callback === 'function') {
            callback(message);
        }
        
        return message;
    }
    return null;
};

/**
 * 创建文字消息
 */
Customer.prototype._createTextMessage = function() {
    var messages = this.config.messages;
    return {
        type: 'text',
        id: this.id,
        content: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date().toISOString()
    };
};

/**
 * 创建绘图消息
 */
Customer.prototype._createDrawingMessage = function() {
    var drawType = Math.random() > 0.5 
        ? this.config.behavior.drawTypes.CIRCLE 
        : this.config.behavior.drawTypes.LIKE;
    
    return {
        type: 'drawing',
        id: this.id,
        drawType: drawType,
        element: this._createDrawingElement(drawType),
        timestamp: new Date().toISOString()
    };
};

/**
 * 创建绘图元素
 */
Customer.prototype._createDrawingElement = function(type) {
    var container = document.createElement('div');
    container.className = 'customer-drawing';
    
    var canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    
    var ctx = canvas.getContext('2d');
    this._drawOnCanvas(ctx, type);
    
    container.appendChild(canvas);
    return container;
};

/**
 * 在画布上绘制
 */
Customer.prototype._drawOnCanvas = function(ctx, type) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    switch(type) {
        case this.config.behavior.drawTypes.CIRCLE:
            this._drawCircle(ctx);
            break;
        case this.config.behavior.drawTypes.LIKE:
            this._drawLike(ctx);
            break;
        default:
            this._drawCircle(ctx);
    }
};

/**
 * 绘制圆形
 */
Customer.prototype._drawCircle = function(ctx) {
    ctx.beginPath();
    ctx.arc(50, 50, 40, 0, Math.PI * 2);
    ctx.strokeStyle = this.config.appearance.clothColors[0];
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#FFEB3B';
    ctx.fill();
};

/**
 * 绘制点赞手势
 */
Customer.prototype._drawLike = function(ctx) {
    ctx.save();
    ctx.strokeStyle = '#FF9800';
    ctx.lineWidth = 4;
    ctx.fillStyle = '#FFC107';
    
    ctx.beginPath();
    ctx.moveTo(50, 60);
    ctx.arcTo(80, 60, 80, 20, 20);
    ctx.lineTo(70, 20);
    ctx.lineTo(60, 10);
    ctx.lineTo(50, 20);
    ctx.lineTo(40, 10);
    ctx.lineTo(30, 20);
    ctx.lineTo(40, 30);
    ctx.lineTo(50, 30);
    ctx.closePath();
    
    ctx.fill();
    ctx.stroke();
    ctx.restore();
};

/* ========== 公共方法 ========== */

/**
 * 添加到DOM
 * @param {HTMLElement} container - 容器元素
 */
Customer.prototype.appendTo = function(container) {
    if (container && container.appendChild) {
        container.appendChild(this.element);
    }
    return this;
};

/**
 * 从DOM移除
 */
Customer.prototype.remove = function() {
    if (this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
    }
    return this;
};

/**
 * 更新配置
 * @param {object} newConfig - 新配置
 */
Customer.prototype.updateConfig = function(newConfig) {
    Object.assign(this.config, newConfig);
    return this;
};