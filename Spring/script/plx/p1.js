const p1Tag = "[plx/p1.js_v0.124]";

const btn4p1 = bl$("plx_p1_btn");

if(btn4p1){ 
    btn4p1.v = blo0.blMD(btn4p1.id+p1Tag,p1Tag,210,11,333,150,blGrey[0]);
    var tb = blo0.blDiv(btn4p1.v,btn4p1.v.id+"tb","tb0",blGrey[1]);
    tb.btnStoryBoard = blo0.blBtn(tb,"btnStoryBoard","storyBoard",blGrey[2]);
    tb.btnStoryBoard.style.float = "left";
    
    tb.btnStoryBoard.onclick = function(){
       if(!this.sb)  this.sb = new CStoryBoard(btn4p1.v);
       this.sb.show(this);
    }
    
    tb.btnPlayground = blo0.blBtn(tb,"btnPlayground","Playground",blGrey[2]);
    tb.btnPlayground.style.float = "left";
    
    tb.btnPlayground.onclick = function(){
        if(!this.pg)  this.pg = new CPlayground(btn4p1.v);
        this.pg.show(this);
    }
    
    tb.btnServer = blo0.blBtn(tb,"btnServer","Server",blGrey[2]);
    tb.btnServer.style.float = "left";
    
    tb.btnServer.onclick = function(){
        if(!this.pg)  this.pg = new CServer(btn4p1.v);
        this.pg.show(this);
    }
    
    btn4p1.onclick = function(){
        var b = this;
        _on_off_div(b,b.v);
        b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];   
    } 
    btn4p1.onclick();
    btn4p1.onclick();
}
 
function CServer(parentDiv){
    var p = parentDiv;
    var ui = null;
    var x = 0;
    var y = 220;
    var w = 500;
    var h = 50;
    var xDbg = 20;
    var yDbg = 55;
    var wDbg = 20;
    var hDbg = 20;
    var cDbg = "lightgreen";
    
    this.show = function(b){ 
        if(!ui){
            ui=blo0.blMDiv(p,"id_mdiv_4_server","server",x,y,w,h,blGrey[0]);
            
            ui.inf = {};
            ui.inf.x = 123;
            ui.inf.y = 321;
            ui.inf.l8080 = "http://localhost:8080";  
            ui.inf.href = window.location.href;  
            ui.inf.file = "No file.";  
            ui.inf.text = "CServer.text";   

            var tb = blo0.blDiv(ui, "id_4_tb_server","tb",blGrey[1]);
            var v = blo0.blDiv(ui, "id_4_v_server","v",blGrey[2]);
            tb.b1 = o.dbgBtn(tb,"id_btn_4_dbgServer","dbg");
            var lst = ["json","mp3","mp4","jpg","html"];
            for (i in lst){                 o.getServerFiles(tb,v,lst[i]);            } 

            ui.draw = function(ctx){
                if(tb.b1.b)  {
                    o.rect(ctx,xDbg,yDbg,wDbg,hDbg,cDbg);    
                    o.text(ctx,ui.id,xDbg,yDbg);
                    o.rendFile(ctx,ui.inf.file,xDbg+20,yDbg+20,192,108);
                }   
            }
            ui.mousedown = function(x,y){   
                if(!tb.b1.b) return;

                if(cDbg=="lightgreen"){
                    if(o.inRect(x,y,xDbg,yDbg,wDbg,hDbg)){
                        cDbg = "yellow";
                        o.status(ui);
                    }
                }
                else if(cDbg=="yellow"){
                    cDbg = "lightgreen";
                    xDbg =x;
                    yDbg = y;
                }
            }
            o.regMousedown(ui);
            o.reg2draw(ui);
        }
        _on_off_div(b,ui);
        b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];    
    }
}

function CPlayground(parentDiv){
    var p = parentDiv;
    var ui = null;
    var w = 360;
    var h = 240;
    var xDbg = 20;
    var yDbg = 111;
    var wDbg = 20;
    var hDbg = 20;
    var cDbg = "brown";
    // 存储所有绘图模式按钮，用于互斥控制
    var drawModeButtons = [];

    // 提取指针按下处理逻辑（同时支持鼠标和触摸）
    const handleCanvasPointerDown = (ctx, x, y) => {
        o.mousedown(ctx, x, y);
        
        // 检查是否有选中的绘图模式和当前卡片
        if (o.currentDrawMode === 'selectMove' && o.curCard > 0 && o.listCards.length > 0) {
            const curCard = o.listCards[o.curCard - 1];
            
            // 先检查是否点击了调整大小的控制点
            if (o.selectedObj) {
                const handle = o.checkResizeHandle(o.selectedObj, x, y);
                if (handle) {
                    o.resizeHandle = handle; // 存储选中的控制点
                    o.isResizing = true;
                    o.isDragging = false;
                    ui.inf.click = `Resizing ${o.selectedObj.graphic}`;
                    o.status(curCard);
                    return;
                }
            }
            
            // 尝试选择图形
            if (curCard.inf && curCard.inf.objects) {
                // 从后往前检查，确保顶层图形先被选中
                for (let i = curCard.inf.objects.length - 1; i >= 0; i--) {
                    const obj = curCard.inf.objects[i];
                    if (o.isPointInObject(obj, x, y)) {
                        o.selectedObj = obj;
                        o.isDragging = true;
                        o.isResizing = false;
                        o.resizeHandle = null; // 清除调整大小状态
                        // 计算鼠标在对象内的偏移量
                        o.offsetX = x - o.getObjectCenterX(obj);
                        o.offsetY = y - o.getObjectCenterY(obj);
                        ui.inf.click = `Selected ${obj.graphic} #${i}`;
                        o.status(obj);
                        return; // 只选中一个对象
                    }
                }
                // 如果没选中任何对象，清除选中状态
                o.selectedObj = null;
                o.isDragging = false;
                o.isResizing = false;
                o.resizeHandle = null;
                ui.inf.click = "No object selected";
                o.status(curCard);
            }
        }
        // 绘图模式
        else if (o.currentDrawMode && o.currentDrawMode !== 'selectMove' && o.curCard > 0 && o.listCards.length > 0) {
            const curCard = o.listCards[o.curCard - 1];
            let newObj;
            
            // 根据当前模式创建不同的图形对象
            switch(o.currentDrawMode) {
                case 'drawCircle':
                    // 创建圆形对象 (使用随机半径 10-30)
                    const radius = 10 + Math.random() * 20;
                    newObj = o.createObj(
                        'circle',
                        Math.round(x - radius),
                        Math.round(y - radius),
                        Math.round(x + radius),
                        Math.round(y + radius),
                        Math.round(radius),
                        // 对RGB值进行取整处理
                        `${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)}`
                    );
                    break;
                    
                case 'drawRect':
                    // 创建矩形对象 (使用随机尺寸 20-60)
                    const rectW = 20 + Math.random() * 40;
                    const rectH = 20 + Math.random() * 40;
                    newObj = o.createObj(
                        'rect',
                        Math.round(x - rectW/2),
                        Math.round(y - rectH/2),
                        Math.round(rectW),
                        Math.round(rectH),
                        Math.round(Math.max(rectW, rectH)),
                        // 对RGB值进行取整处理
                        `${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)}`
                    );
                    break;
                    
                case 'drawLine':
                    // 创建直线对象 (使用随机长度 30-100)
                    const length = 30 + Math.random() * 70;
                    const angle = Math.random() * Math.PI * 2; // 随机角度
                    const endX = x + Math.cos(angle) * length;
                    const endY = y + Math.sin(angle) * length;
                    
                    newObj = o.createObj(
                        'line',
                        Math.round(x),
                        Math.round(y),
                        Math.round(endX),
                        Math.round(endY),
                        Math.round(length),
                        // 对RGB值进行取整处理
                        `${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)}`
                    );
                    break;
            }
            
            // 将新图形添加到当前卡片的对象数组
            if (newObj && curCard.inf && curCard.inf.objects) {
                curCard.inf.objects.push(newObj);
                ui.inf.click = `Drew ${o.currentDrawMode} at (${x},${y})`;
                o.status(curCard); // 更新状态显示
            }
        }
    };

    // 提取指针移动处理逻辑（同时支持鼠标和触摸）
    const handleCanvasPointerMove = (x, y) => {
        const curCard = o.listCards[o.curCard - 1];
        
        // 处理调整大小
        if (o.isResizing && o.selectedObj && o.currentDrawMode === 'selectMove' && o.resizeHandle) {
            o.resizeObject(o.selectedObj, x, y);
            ui.inf.click = `Resized to (${Math.round(x)},${Math.round(y)})`;
            o.status(curCard);
        }
        // 处理拖拽
        else if (o.isDragging && o.selectedObj && o.currentDrawMode === 'selectMove') {
            // 计算新的中心位置（考虑偏移量）
            const newCenterX = x - o.offsetX;
            const newCenterY = y - o.offsetY;
            
            // 根据图形类型更新位置
            if (o.selectedObj.graphic === 'circle') {
                const radius = (o.selectedObj.attribute.right - o.selectedObj.attribute.left) / 2;
                o.selectedObj.attribute.left = newCenterX - radius;
                o.selectedObj.attribute.top = newCenterY - radius;
                o.selectedObj.attribute.right = newCenterX + radius;
                o.selectedObj.attribute.bottom = newCenterY + radius;
            } else if (o.selectedObj.graphic === 'rect') {
                const width = o.selectedObj.attribute.right;
                const height = o.selectedObj.attribute.bottom;
                o.selectedObj.attribute.left = newCenterX - width / 2;
                o.selectedObj.attribute.top = newCenterY - height / 2;
            } else if (o.selectedObj.graphic === 'line') {
                // 计算直线的长度和角度
                const dx = o.selectedObj.attribute.right - o.selectedObj.attribute.left;
                const dy = o.selectedObj.attribute.bottom - o.selectedObj.attribute.top;
                const length = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx);
                
                // 计算新的起点和终点
                o.selectedObj.attribute.left = newCenterX - Math.cos(angle) * length / 2;
                o.selectedObj.attribute.top = newCenterY - Math.sin(angle) * length / 2;
                o.selectedObj.attribute.right = newCenterX + Math.cos(angle) * length / 2;
                o.selectedObj.attribute.bottom = newCenterY + Math.sin(angle) * length / 2;
            }
            
            ui.inf.click = `Moved to (${Math.round(x)},${Math.round(y)})`;
            o.status(curCard);
        }
        // 显示鼠标悬停在控制点上的效果
        else if (o.selectedObj && o.currentDrawMode === 'selectMove') {
            const handle = o.checkResizeHandle(o.selectedObj, x, y);
            // 触摸设备不需要光标样式
        }
    };

    // 添加删除选中对象的函数
    const deleteSelectedObject = () => {
        // 检查是否有选中的对象和当前卡片
        if (o.selectedObj && o.curCard > 0 && o.listCards.length > 0) {
            const curCard = o.listCards[o.curCard - 1];
            
            // 找到对象在数组中的索引
            const objIndex = curCard.inf.objects.findIndex(obj => obj === o.selectedObj);
            
            if (objIndex !== -1) {
                // 从数组中移除对象
                curCard.inf.objects.splice(objIndex, 1);
                ui.inf.click = `Deleted ${o.selectedObj.graphic}`;
                
                // 清除选中状态
                o.selectedObj = null;
                o.isDragging = false;
                o.isResizing = false;
                o.resizeHandle = null;
                
                // 更新状态显示
                o.status(curCard);
            }
        } else {
            ui.inf.click = "No object selected to delete";
            o.status(ui);
        }
    };

    this.show = function(b){
        if(!ui){
            ui=blo0.blMDiv(p,"id_mdiv_4_playground","playground",11,222,w,111,blGrey[0]);
            ui.inf = {};
            ui.inf.x = 0;
            ui.inf.y = 0;
            ui.inf.click = "no click";
                        
            ui.inf.text = "playground.text";     

            var tb = blo0.blDiv(ui, "id_4_tb_playground","tb",blGrey[1]);
            tb.btnPlay = blo0.blBtn(tb,"id_4_btnPlay","play",blGrey[2]);
            tb.btnPlay.style.float = "left";
            tb.btnPlay.onclick = function(){
                o.playVideo(this);
            }
            tb.b1 = o.dbgBtn(tb,"id_btn_4_dbgPlayground","dbg");

            // 升级绘图模式定义，添加直线模式
            const lsToolMode = [
                { name: 'drawCircle', id: 1, label: 'Circle' },
                { name: 'drawRect', id: 2, label: 'Rectangle' },
                { name: 'drawLine', id: 4, label: 'Line' }, // 新增直线模式
                { name: 'selectMove', id: 3, label: 'Select/Move' } // 选择/移动/调整大小模式
            ]; 
            
            // 重置当前绘图模式
            o.currentDrawMode = null;
            
            // 创建绘图模式按钮并实现互斥
            for(let i in lsToolMode){ 
                const mode = lsToolMode[i];
                const btn = blo0.blBtn(tb, tb.id + mode.name, mode.label, blGrey[2]);
                btn.style.float = "left";
                btn.mode = mode.name;
                drawModeButtons.push(btn);
                
                // 按钮点击事件 - 实现互斥
                btn.onclick = function() {
                    // 重置所有按钮样式
                    drawModeButtons.forEach(b => {
                        b.style.backgroundColor = blGrey[2];
                        b.style.color = "black";
                    });
                    
                    // 设置当前按钮为选中状态
                    this.style.backgroundColor = "blue";
                    this.style.color = "white";
                    
                    // 更新当前绘图模式
                    o.currentDrawMode = this.mode;
                    
                    // 清除选中状态
                    if (this.mode !== 'selectMove') {
                        o.selectedObj = null;
                        o.isResizing = false;
                        o.resizeHandle = null;
                    }
                };
            }

            // 添加播放速度控制
            const speedControls = blo0.blDiv(tb, tb.id + "speedControls", "Speed:", blGrey[2]);
            speedControls.style.float = "left";
            speedControls.style.marginLeft = "10px";

            const speeds = [0.5, 1, 2, 4]; // 速度倍数选项
            for (let s of speeds) {
                const speedBtn = blo0.blBtn(speedControls, tb.id + "speed" + s, s + "x", blGrey[2]);
                speedBtn.style.float = "left";
                speedBtn.onclick = function() {
                    o.setPlaybackSpeed(parseFloat(this.innerHTML));
                    // 更新按钮样式以显示当前选中的速度
                    const buttons = speedControls.getElementsByTagName("button");
                    for (let b of buttons) {
                        b.style.backgroundColor = blGrey[2];
                    }
                    this.style.backgroundColor = "blue";
                    this.style.color = "white";
                };
            }

            // 默认选中1x速度
            const defaultSpeedBtn = bl$(tb.id + "speed1");
            if (defaultSpeedBtn) {
                defaultSpeedBtn.style.backgroundColor = "blue";
                defaultSpeedBtn.style.color = "white";
            }


            // 添加删除按钮
            const deleteBtn = blo0.blBtn(tb, tb.id + "deleteObj", "Delete", "red");
            deleteBtn.style.float = "left";
            deleteBtn.style.color = "white";
            deleteBtn.onclick = deleteSelectedObject;
            drawModeButtons.push(deleteBtn);

            var vStatus = blo0.blDiv(ui,"id_4_vStatus","status::",blGrey[3]);   
            var v1 = blo0.blDiv(ui,ui.id+"v1","",blGrey[1]);          
                

            var cvs = document.createElement("canvas");
            cvs.width = w;
            cvs.height = h;
            cvs.style.backgroundColor = "grey";
            cvs.style.float = "left";

            v1.appendChild(cvs);
            
            // 鼠标按下事件 - 桌面设备
            cvs.addEventListener('mousedown', function (e) {
                const x = e.offsetX;
                const y = e.offsetY;
                const ctx = cvs.getContext("2d");
                handleCanvasPointerDown(ctx, x, y);
            });
            
            // 触摸开始事件 - 移动设备
            cvs.addEventListener('touchstart', function(e) {
                e.preventDefault(); // 阻止默认行为（如滚动）
                const touch = e.touches[0];
                const rect = cvs.getBoundingClientRect();
                // 计算触摸点在canvas中的相对位置
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                const ctx = cvs.getContext("2d");
                handleCanvasPointerDown(ctx, x, y);
            });
            
            // 鼠标移动事件 - 桌面设备
            cvs.addEventListener('mousemove', function(e) {
                const x = e.offsetX;
                const y = e.offsetY;
                handleCanvasPointerMove(x, y);
            });
            
            // 触摸移动事件 - 移动设备
            cvs.addEventListener('touchmove', function(e) {
                e.preventDefault(); // 阻止默认行为
                const touch = e.touches[0];
                const rect = cvs.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                handleCanvasPointerMove(x, y);
            });
            
            // 鼠标释放事件 - 桌面设备
            cvs.addEventListener('mouseup', function() {
                o.isDragging = false;
                o.isResizing = false;
                o.resizeHandle = null;
            });
            
            // 触摸结束事件 - 移动设备
            cvs.addEventListener('touchend', function() {
                o.isDragging = false;
                o.isResizing = false;
                o.resizeHandle = null;
            });
            
            // 鼠标离开画布事件 - 桌面设备
            cvs.addEventListener('mouseleave', function() {
                o.isDragging = false;
                o.isResizing = false;
                o.resizeHandle = null;
            });
            
            ui.mousedown = function(x,y){   
                if(!tb.b1.b) return;

                if(cDbg=="brown"){
                    if(o.inRect(x,y,xDbg,yDbg,wDbg,hDbg)){
                        cDbg = "yellow";
                        o.status(ui);
                    }
                }
                else if(cDbg=="yellow"){
                    cDbg = "brown";
                    xDbg =x;
                    yDbg = y;                    
                }
            }
            ui.draw = function(ctx){
                if(tb.b1.b)  {
                    o.rect(ctx,xDbg,yDbg,wDbg,hDbg,cDbg);    
                    o.text(ctx,ui.id,xDbg,yDbg);
                    o.text(ctx,ui.inf.click,xDbg,yDbg+20);
                }   
            }
            o.reg2draw(ui);
            o.regMousedown(ui);

            var itv = setInterval(o.ftnTimer, 20,cvs.getContext("2d"),w,h);
        }
        _on_off_div(b,ui);
        b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];   
    }; 
}

function CStoryBoard(parentDiv){

    var v = "CStoryBoard v0.13";
    var ui = null;
    var p = parentDiv; 
       
     
    this.show = function(b){
        if(!ui){           

            var xDbg = 11;
            var yDbg = 222;
            var wDbg = 20;
            var hDbg = 20;
            var cDbg = "lightgreen";
            
            ui=blo0.blDiv(p,p.id+"_StoryBoard",v,blGrey[1]);   
            ui.inf = {};
            ui.inf.x = 17809;
            ui.inf.y = 17809;
            ui.inf.text = "storyBoard.text";   

            var tb =blo0.blDiv(ui,"tb4StoryBoard","tb2",blGrey[1]);
            tb.b1 = o.dbgBtn(tb,"id_btn_4_StoryBoardDbg","dbg");
            tb.btnAllGray = blo0.blBtn(tb,"id_4_btnAllGray","allGray","gray");
            tb.btnAllGray.style.float="left";
            tb.btnAllGray.onclick = function(){
                let n = 0;
                for(i in o.listCards){
                    o.listCards[i].inf.bgColor = "lightGray";
                } 
            }
            tb.btnClearObjs = blo0.blBtn(tb,"id_4_btnClearObjs","clearObjs","gray");
            tb.btnClearObjs.style.float="left";
            tb.btnClearObjs.onclick = function(){
                let n = 0;
                for(i in o.listCards){
                    o.listCards[i].inf.objects = []; 
                } 
            }

            tb.btnCurStory = blo0.blBtn(tb,"id_4_btnCurStory","curStory",blGrey[2]);
            tb.btnCurStory.style.float="left";
            tb.btnCurStory.onclick = function(_this){  
                _this.inf={};
                var d = new Date();
                _this.inf.D = d;
                _this.inf.n = 0; 
                _this.inf.v = "0.0.3";
                _this.inf.w = 1920;
                _this.inf.h = 1080;
                _this.inf.music = "1.mp3";
                _this.inf.rate = "1";
                
                _this.inf2JSON = function(_btn){
                    return function(){
                        _btn.inf.n = o.listCards.length;
                        var r = o.newScript(_btn.inf.v,
                                _btn.inf.w,
                                _btn.inf.h,
                                _btn.inf.music,
                                _btn.inf.rate);
                        var n=0;
                        for(i in o.listCards){
                            n++;
                            var c = o.listCards[i].inf.bgColor == "red"?"255,0,0":"125,125,125";
                            c = o.listCards[i].inf.bgColor == "green"?"0,255,0":c;
                            c = o.listCards[i].inf.bgColor == "blue"?"0,0,255":c;
                            var f = o.newFrame(n,1,c); 
                            for(j in o.listCards[i].inf.objects){
                                o.AddObj2Frame(f.objects,o.listCards[i].inf.objects[j]);
                            } 

                            o.AddFrame2Script(r,f);                            
                        }
                        var s = JSON.stringify(r); 
                        return s;
                    }
                }(_this);
                _this.inf.toJSON = function(_btn){
                    return function(v1){        
                        var vta = blo0.blDiv(v1,v1.id+"vta","vta" ,"grey"); 
                        vta.innerHTML = "";
                        vta.v1 = blo0.blDiv(vta,vta.id+"v1","v1" ,blGrey[1]); 
                        vta.v2 = blo0.blDiv(vta,vta.id+"v2","v2" ,blGrey[2]); 
                        vta.v3 = blo0.blDiv(vta,vta.id+"v3","v3" ,blColor[2]); 
        
                        var ta = blo0.blTextarea(vta.v1,vta.v1.id+"ta","ta","lightgreen");
                        ta.style.width = 100 + "%";
                        ta.value = _btn.inf2JSON();
        
                        vta.v2.saveAs_v3 = blo0.blBtn(vta.v2,vta.v2.id+"b1","saveAs_2_v3.json",blGrey[0]);
                        vta.v2.saveAs_v3.onclick = function(){ 
                            var data = ta.value;
                            var xhr = new XMLHttpRequest();
                            xhr.withCredentials = true;
                            xhr.addEventListener("readystatechange", function() {
                            if(this.readyState === 4) {
                                ta.value = this.responseText;
                            }	
                            });
                            xhr.open("POST", "http://localhost:8080/json?fileName=v3.json");
                            xhr.setRequestHeader("Content-Type", "text/plain");
                            xhr.send(data);
                        }
                        vta.v2.btn_v3_2_mp4 = blo0.blBtn(vta.v2,vta.v2.id+"b2","v3.json_2_mp4",blColor[1]);
                        vta.v2.btn_v3_2_mp4.onclick = function(_v,_f,_mp4){ 
                            return function(){ 
                                var url = "http://localhost:8080/image/json2video?script=" + _f + "&video=" + _mp4 + ".mp4"; 
                                b._2do = function(txt){_v.innerHTML = txt};
                                blo0.blAjx(b,url);
                            }
                        }(vta.v3,"v3.json","v3.mp4");
                    }
                }(_this);
                return function(){
                     o.status(this);
                }
            }(tb.btnCurStory);

            
            tb.btnRemoveAllCards = blo0.blBtn(tb,"id_4_btnRemoveAllCards","- All",blColor[2]);
            tb.btnRemoveAllCards.style.float="left";
            tb.btnRemoveAllCards.onclick = function(){
                 o.removeAllCards(this);
            }
            tb.btnAddCard = blo0.blBtn(tb,"id_4_btnAddCard","+1",blGrey[2]);
            tb.btnAddCard.style.float="left";
            tb.btnAddCard.onclick = function(){
                o.addCard(this);
            }
            tb.btnAdd2Cards = blo0.blBtn(tb,"id_4_btnAdd2Cards","+2",blGrey[2]);
            tb.btnAdd2Cards.style.float="left";
            tb.btnAdd2Cards.onclick = function(){
                o.addCard(this);o.addCard(this);
            }
            tb.btnAdd5Cards = blo0.blBtn(tb,"id_4_btnAdd5Cards","+5",blGrey[2]);
            tb.btnAdd5Cards.style.float="left";
            tb.btnAdd5Cards.onclick = function(){
                o.addCard(this);o.addCard(this);o.addCard(this);o.addCard(this);o.addCard(this);
            }
            tb.btnAdd10Cards = blo0.blBtn(tb,"id_4_btnAdd10Cards","+10",blGrey[2]);
            tb.btnAdd10Cards.style.float="left";
            tb.btnAdd10Cards.onclick = function(){
                o.addCard(this);o.addCard(this);o.addCard(this);o.addCard(this);o.addCard(this);
                o.addCard(this);o.addCard(this);o.addCard(this);o.addCard(this);o.addCard(this);
            }
            tb.btnAdd100Cards = blo0.blBtn(tb,"id_4_btnAdd100Cards","+100",blGrey[2]);
            tb.btnAdd100Cards.style.float="left";
            tb.btnAdd100Cards.onclick = function(){
                for(var i = 0; i < 100; i++ ){o.addCard(this);}
            }
            
            

            o.addClass(ui,"w3-row");  
            o.addClass(ui,"w3-red");

            o.uiColum(ui);   

            ui.draw = function(ctx){
                if(tb.b1.b)       
                {
                    o.rect(ctx,xDbg,yDbg,wDbg,hDbg,cDbg);
                    o.text(ctx,ui.id,xDbg,yDbg);

                }  
            }
            ui.mousedown = function(x,y){   
                if(!tb.b1.b) return;

                if(cDbg=="lightgreen"){
                    if(o.inRect(x,y,xDbg,yDbg,wDbg,hDbg)){
                        cDbg = "yellow";
                        o.status(ui);
                    }
                }
                else if(cDbg=="yellow"){
                    cDbg = "lightgreen";
                    xDbg =x;
                    yDbg = y;
                }
            }
            o.regMousedown(ui);
            o.reg2draw(ui);
        }
        _on_off_div(b,ui);
        b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];   
    }; 
} 

function CClient(){
    var w = {};
    this.exeCmd = function(v0,v1,v2){
        var ta = bl$("id_ta_4_script_editor");
        if(!ta){
            ta = blo0.blTextarea(v1,"id_ta_4_script_editor","dir",blGrey[0]);
        } 
        {
            ta.value = "exeCmd" + Date();
            var btnRun = blo0.blBtn(v1, v1.id+ "btnRun", "run", "green");
            btnRun.onclick = function(){                    
                w._2do = function(txt){ 
                    v0.innerHTML = txt;        
                } 
                blo0.blAjx(w, "http://localhost:8080/command?cmd="+ta.value ); 
            }
        }
    };
    this.getJSFiles = function(v0,v1,v2){
			w._2do = function(txt){ 
				v0.innerHTML = ""; 
				eval("var o=" + txt);
				for(i in o.resource){
					var b = blo0.blBtn(v0,v0.id+i,i,blGrey[2]);
					b.onclick = function(_this,_jsf){						
						return function(){
							 v1.innerHTML = _this.id;
							 var btnMP4 = blo0.blBtn(v1, v1.id+ "b1", "createMP4", blGrey[2]);
							 v2.innerHTML = _jsf;
							 var vMP4 = blo0.blDiv(v2, v2.id + "vMP4", "vMP4", blGrey[2]);  

							 btnMP4.onclick = function(){
								var url = "http://localhost:8080/image/video?script="+_jsf; 
								var w1 = {};
								w1._2do = function(txt){ 
									vMP4.innerHTML = txt;	
								}
								blo0.blAjx(w1,url);							
							}
						}
					}(b,o.resource[i]);					
				}  
			}
			blo0.blAjx(w, "http://localhost:8080/getResourceOnServer?filetype=json" ); 
    };
    
    this.getMp3Files = function(v0){
        w._2do = function(txt){ 
            eval("var o=" + txt);
            v0.innerHTML = "";
            for(i in o.resource){
                var b = blo0.blBtn(v0,v0.id+i,i,blGrey[2]);
                b.onclick = function(_this,_r){						
                    return function(){
                         alert(_r);                          
                    }
                }(b,o.resource[i]);	                		
            }  
        }
        blo0.blAjx(w, "http://localhost:8080/getResourceOnServer?filetype=mp3" ); 
    };
}

function CHelper(){
    this.createObj = function(type,left,top,right,bottom,size,color){
        var r = {};
        r.graphic = type; 
        r.attribute = {};
        r.attribute.left = left; 
        r.attribute.top = top;
        r.attribute.right = right;
        r.attribute.bottom = bottom;
        r.attribute.size = size;
        r.attribute.color = color;  
        r.inf={};
        r.inf.type = type;
        return r;
    }
    this.newScript = function(v,w,h,m,r){ 
        var json = {}; 
        json.request = {}; 
        json.request.version    = v;
        json.request.width      = w;
        json.request.height     = h;
        json.request.music      = m;
        json.request.rate       = r;  
        json.request.frames     = [];
        return json;
    }
    this.getServerFiles = function(tb,v,ft){
        var b = blo0.blBtn(tb,tb.id+ft,ft,blGrey[1]);
        b.style.float = "left";
        b.onclick = function(_v,_ft){
            return function(){
                _v.dbg = blo0.blDiv(_v,_v.id+"dbg","dbg","lightgreen");   
                _v.d = blo0.blDiv(_v,_v.id+"d","d","lightblue");   
                _v.d.style.overflow = "auto";           
                _v.d.innerHTML = Date();
                
                _v.d.v = blo0.blDiv(_v.d,_v.d.id+"v","v","grey");   
                _v.d.v.style.width = 11100 + "px";
    
                var w = {};
                w._2do = function(txt){
                    var s = 'var ro='+txt;
                    eval(s); 
                    for(i in ro.resource){
                        var bf=blo0.blBtn(_v.d.v,_v.d.v.id+"_bf_"+i,ro.resource[i],blGrey[2]);
                        bf.style.float = "left";
                        bf.inf = {};
                        bf.onclick = function(_this,_dbg,_me){
                            return function(){    
                                _dbg.innerHTML = _me ; 
                                o.makeINF(_this,_me);
                                o.status(_this);
                            }
                        }(bf,_v.dbg,ro.resource[i]);
                    }
                }
                var url = 'http://localhost:8080/getResourceOnServer?filetype='+_ft;
                blo0.blAjx(w,url);
            }
        }(v,ft);
    }
    
    this.makeINF = function(obj,fileName){
        obj.inf.file = fileName; 
        var a = fileName.split(".");
        obj.inf.n = a.length;
        
        if(a[1]=="html") _makeInf4HTML(obj.inf,fileName);
        if(a[1]=="json"){
            obj.inf.toDo = function(v1){
                var vta = blo0.blDiv(v1,v1.id+"vta","vta" ,"grey"); 
                vta.innerHTML = "";
                var tb = blo0.blDiv(vta,vta.id + "tb","tb",blGrey[0]);
                var v = blo0.blDiv(vta,vta.id + "v","v",blGrey[0]);
                tb.showMe = blo0.blBtn(tb,tb.id+"showMe","showMe",blGrey[1]);
                tb.showMe.style.float="left";
                tb.showMe.onclick = function(){
                    var w = {};
                    w._2do = function(txt){       
                        v.innerHTML = "";             
                        var ta = blo0.blTextarea(v,v.id+"ta","ta","lightgreen");
                        ta.style.width = 100 + "%";
                        ta.style.height = 100 + "px";
                        ta.value = txt;
                    }
                    blo0.blAjx(w,"http://localhost:8080/"+fileName);
                }
                tb.makeMP4 = blo0.blBtn(tb,tb.id+"b1","makeMP4",blGrey[1]);
                tb.makeMP4.style.float="left";
                tb.makeMP4.onclick = function(){
                    var w = {};
                    w._2do = function(txt){
                        v.innerHTML = txt;
                    }
                    blo0.blAjx(w,"http://localhost:8080/image/json2video?script="+fileName);
                }
            }
        }
        if(a[1]=="mp4" || a[1]=="mp3"){
            obj.inf.toDo = function(v1){
                var vta = blo0.blDiv(v1,v1.id+"vta","vta" ,"grey"); 
                vta.innerHTML = "";
                var tb = blo0.blDiv(vta,vta.id + "tb","tb",blGrey[0]);
                var v = blo0.blDiv(vta,vta.id + "v","v",blGrey[0]);
                tb.play = blo0.blBtn(tb,tb.id+"b1","play",blGrey[1]);
                tb.play.style.float="left";
                tb.play.onclick = function(){
                    //*
                    var sss = '<video id="myVideo" width="180" height="120" controls>';
                    sss+= '<source src="'
                    sss+= 'http://localhost:8080/';
                    sss+= fileName;
                    sss+= ' " type="video/mp4">';
                    sss+='Your browser does not support HTML5 video. '
                    sss+='</video>'; 
                    v.v1 = blo0.blDiv(v,v.id+"v1",sss,blGrey[1]);
                    
                }
                tb.getDuration = blo0.blBtn(tb,tb.id+"getDuration","getDuration",blGrey[1]);
                tb.getDuration.style.float="left";
                tb.getDuration.onclick = function(){
                    var p = bl$("myVideo");
                    if(p){
                        o.music = fileName;
                        o.duration = p.duration;
                        alert(o.music);
                    }
                    else{
                        alert("No myVideo");
                    }
                }
            }
        }    
    }
    this.status = function(me){
        var d = bl$("id_4_vStatus");
        d.innerHTML = "";
        var md = blo0.blMDiv(d,d.id+"md","o._status "+me.id ,3,340,555,100,blGrey[0]); 
        var vs = blo0.blDiv(md,md.id+"vs","",blGrey[1]);
        var v1 = blo0.blDiv(md,md.id+"v1","v1",blGrey[1]);
        var n = 0; 
        for(i in me.inf){
            n++;
            var b = blo0.blBtn(vs,vs.id+"b" + n, i ,blGrey[1]);
            var clr = "brown";
            var bv = blo0.blBtn(vs,vs.id+"bv"+ n, me.inf[i] ,clr);
            if(i=="c") bv.style.backgroundColor = me.inf[i];
            b.style.float="left";
            bv.style.float="left";
            bv.onclick = function(_this){
                return function(){
                    var uiPG = bl$("id_mdiv_4_playground");
                    uiPG.inf.click = _this.innerHTML;
                }
            }(bv);
            if(i=="text" || i=="bgColor"){
                b.style.backgroundColor = "lightblue";
                b.onclick = function(_this,_bv,_me,_i){
                    return function(){ 
                        var vta = blo0.blDiv(v1,v1.id+"vta","vta" ,"green"); 
                        vta.innerHTML = "";
                       if(_this.style.backgroundColor=="lightblue"){
                            _this.style.backgroundColor="grey";
                             _bv.ta = blo0.blTextarea(vta,vta.id+"ta",_me.inf[_i],"grey");
                            _bv.ta.style.width= "100%";
                            ta.value = _bv.innerHTML;
                       }
                       else if(_this.style.backgroundColor=="grey"){
                            _this.style.backgroundColor="lightblue";
                            _bv.innerHTML = _bv.ta.value;
                            _me.inf[_i] = _bv.ta.value; 
                            vta.innerHTML = "";
                            o.status(_me);
                       }
                    }
                }(b,bv,me,i);
            }
            else if(i=="toJSON"){
                bv.innerHTML = "fn...";
                b.style.backgroundColor = "green";            
                b.onclick = function(_this,_v1,_me,_i){
                    return function(){ 
                        _me.inf[_i](_v1);
                    }
                }(b,v1,me,i);
            }
            else if(i=="toDo"){
                bv.innerHTML = ".";
                b.style.backgroundColor = "green";            
                b.onclick = function(_this,_v1,_me,_i){
                    return function(){ 
                        _me.inf[_i](_v1);
                    }
                }(b,v1,me,i);
            }
        } 
    }
    this.AddFrame2Script = function(oScript,oFrame){
        oScript.request.frames.push(oFrame);
    }
    this.AddObj2Frame = function(ls,oObj){ 
        ls.push(oObj);
    }    

    function _makeInf4HTML(_inf,_fileName){
        _inf.toDo =  function(v1){
            var vta = blo0.blDiv(v1,v1.id+"vta","vta" ,"grey"); 
            var s = "<a target = '_blank' href='";
            s += _fileName;
            s += "'>";
            s += _fileName;
            s += "</a>"
            vta.innerHTML = s;
        }
    }
}
var o = new CHelper();
// 新增变量定义
o.currentFrame = 0;       // 当前播放的帧索引
o.frameInterval = 1000;   // 帧间隔时间(毫秒)，控制播放速度
o.playbackInterval = null; // 播放定时器ID
o.music = "1.mp3";
o.duration = 120;
o.x = 50;
o.y = 30;
o.s = "o.s";
o.s1 = "s1:";
o.list2draw = [];
o.listMousedown = [];
o.listCards = [];
o.curCard = 0;
o.bPlay = false;
// 绘图模式
o.currentDrawMode = null;
// 图形选择和移动相关变量
o.selectedObj = null;    // 当前选中的图形对象
o.isDragging = false;    // 是否正在拖拽
o.offsetX = 0;           // 鼠标在对象内的X偏移
o.offsetY = 0;           // 鼠标在对象内的Y偏移
// 新增：图形调整大小相关变量
o.isResizing = false;    // 是否正在调整大小
o.resizeHandle = null;   // 当前调整的控制点


o.newFrame = function(number,time,backgroundColor){
    var r = {};
    r.number = number;
    r.time = time;
    r.objects = [];
    r.backgroundColor = backgroundColor;
    return r;
}


o.newTextObj = function(txt,x,y,size,color){
    var r = {};
    r.text = txt; 
    r.x = x;
    r.y = y; 
    r.size = size;
    r.color = color; 
    return r;
}

// 升级：绘制对象时添加选中状态和调整大小控制点
o.drawObj = function(ctx,obj){
    // 判断是否为选中对象
    const isSelected = obj === o.selectedObj;
    
    o.text(ctx, obj.graphic , obj.attribute.left,obj.attribute.top);

    if(obj.graphic=="line"){
        ctx.beginPath();
        ctx.moveTo(obj.attribute.left,obj.attribute.top);
        ctx.lineTo(obj.attribute.right,obj.attribute.bottom);
        ctx.strokeStyle = isSelected ? "yellow" : `rgb(${obj.attribute.color})`;
        ctx.lineWidth = isSelected ? 3 : 1;
        ctx.stroke();
        
        // 选中时绘制端点控制点和中心点
        if (isSelected) {
            // 起点控制点
            ctx.fillStyle = "red";
            ctx.fillRect(obj.attribute.left - 3, obj.attribute.top - 3, 6, 6);
            
            // 终点控制点
            ctx.fillStyle = "blue";
            ctx.fillRect(obj.attribute.right - 3, obj.attribute.bottom - 3, 6, 6);
            
            // 中心点
            const centerX = (obj.attribute.left + obj.attribute.right) / 2;
            const centerY = (obj.attribute.top + obj.attribute.bottom) / 2;
            ctx.fillStyle = "yellow";
            ctx.fillRect(centerX - 2, centerY - 2, 4, 4);
        }
    }
    else if(obj.graphic=="circle"){
        ctx.beginPath();
        const centerX = obj.attribute.left + (obj.attribute.right - obj.attribute.left)/2;
        const centerY = obj.attribute.top + (obj.attribute.bottom - obj.attribute.top)/2;
        const radius = (obj.attribute.right - obj.attribute.left)/2;
        
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = isSelected ? "yellow" : `rgb(${obj.attribute.color})`;
        ctx.lineWidth = isSelected ? 3 : 1;
        ctx.stroke();
        
        // 选中时绘制控制点和中心点
        if (isSelected) {
            // 右侧控制点（用于调整大小）
            ctx.fillStyle = "red";
            ctx.fillRect(centerX + radius - 3, centerY - 3, 6, 6);
            
            // 中心点
            ctx.fillStyle = "yellow";
            ctx.fillRect(centerX - 2, centerY - 2, 4, 4);
        }
    }
    else if(obj.graphic=="rect"){
        ctx.strokeStyle = isSelected ? "yellow" : `rgb(${obj.attribute.color})`;
        ctx.lineWidth = isSelected ? 3 : 1;
        ctx.strokeRect(
            obj.attribute.left, 
            obj.attribute.top, 
            obj.attribute.right, 
            obj.attribute.bottom
        );
        
        // 选中时绘制四个角的控制点
        if (isSelected) {
            const handleSize = 6;
            // 左上角
            ctx.fillStyle = "red";
            ctx.fillRect(
                obj.attribute.left - handleSize/2, 
                obj.attribute.top - handleSize/2, 
                handleSize, 
                handleSize
            );
            // 右上角
            ctx.fillRect(
                obj.attribute.left + obj.attribute.right - handleSize/2, 
                obj.attribute.top - handleSize/2, 
                handleSize, 
                handleSize
            );
            // 左下角
            ctx.fillRect(
                obj.attribute.left - handleSize/2, 
                obj.attribute.top + obj.attribute.bottom - handleSize/2, 
                handleSize, 
                handleSize
            );
            // 右下角
            ctx.fillRect(
                obj.attribute.left + obj.attribute.right - handleSize/2, 
                obj.attribute.top + obj.attribute.bottom - handleSize/2, 
                handleSize, 
                handleSize
            );
            
            // 中心点
            ctx.fillStyle = "yellow";
            const centerX = obj.attribute.left + obj.attribute.right / 2;
            const centerY = obj.attribute.top + obj.attribute.bottom / 2;
            ctx.fillRect(centerX - 2, centerY - 2, 4, 4);
        }
    }
    else if(obj.graphic=="text"){
        o.text(ctx,"TEXT",obj.attribute.left, obj.attribute.top);
    }
}

// 新增：检查点是否在调整大小的控制点上
o.checkResizeHandle = function(obj, x, y) {
    const handleSize = 6; // 控制点大小
    
    if (obj.graphic === 'line') {
        // 起点控制点
        if (x >= obj.attribute.left - handleSize/2 && 
            x <= obj.attribute.left + handleSize/2 && 
            y >= obj.attribute.top - handleSize/2 && 
            y <= obj.attribute.top + handleSize/2) {
            return { type: 'line-start', cursor: 'move' };
        }
        // 终点控制点
        if (x >= obj.attribute.right - handleSize/2 && 
            x <= obj.attribute.right + handleSize/2 && 
            y >= obj.attribute.bottom - handleSize/2 && 
            y <= obj.attribute.bottom + handleSize/2) {
            return { type: 'line-end', cursor: 'move' };
        }
    }
    else if (obj.graphic === 'circle') {
        const centerX = obj.attribute.left + (obj.attribute.right - obj.attribute.left)/2;
        const centerY = obj.attribute.top + (obj.attribute.bottom - obj.attribute.top)/2;
        const radius = (obj.attribute.right - obj.attribute.left)/2;
        
        // 右侧控制点
        if (x >= centerX + radius - handleSize/2 && 
            x <= centerX + radius + handleSize/2 && 
            y >= centerY - handleSize/2 && 
            y <= centerY + handleSize/2) {
            return { type: 'circle-right', cursor: 'ew-resize' };
        }
    } 
    else if (obj.graphic === 'rect') {
        // 左上角
        if (x >= obj.attribute.left - handleSize/2 && 
            x <= obj.attribute.left + handleSize/2 && 
            y >= obj.attribute.top - handleSize/2 && 
            y <= obj.attribute.top + handleSize/2) {
            return { type: 'rect-tl', cursor: 'nwse-resize' };
        }
        // 右上角
        if (x >= obj.attribute.left + obj.attribute.right - handleSize/2 && 
            x <= obj.attribute.left + obj.attribute.right + handleSize/2 && 
            y >= obj.attribute.top - handleSize/2 && 
            y <= obj.attribute.top + handleSize/2) {
            return { type: 'rect-tr', cursor: 'nesw-resize' };
        }
        // 左下角
        if (x >= obj.attribute.left - handleSize/2 && 
            x <= obj.attribute.left + handleSize/2 && 
            y >= obj.attribute.top + obj.attribute.bottom - handleSize/2 && 
            y <= obj.attribute.top + obj.attribute.bottom + handleSize/2) {
            return { type: 'rect-bl', cursor: 'nesw-resize' };
        }
        // 右下角
        if (x >= obj.attribute.left + obj.attribute.right - handleSize/2 && 
            x <= obj.attribute.left + obj.attribute.right + handleSize/2 && 
            y >= obj.attribute.top + obj.attribute.bottom - handleSize/2 && 
            y <= obj.attribute.top + obj.attribute.bottom + handleSize/2) {
            return { type: 'rect-br', cursor: 'nwse-resize' };
        }
    }
    
    return null;
}

// 新增：调整对象大小
o.resizeObject = function(obj, x, y) {
    if (obj.graphic === 'line') {
        // 根据选中的控制点调整直线
        if (o.resizeHandle?.type === 'line-start') {
            obj.attribute.left = x;
            obj.attribute.top = y;
        } else if (o.resizeHandle?.type === 'line-end') {
            obj.attribute.right = x;
            obj.attribute.bottom = y;
        }
        // 更新直线长度属性
        const dx = obj.attribute.right - obj.attribute.left;
        const dy = obj.attribute.bottom - obj.attribute.top;
        obj.attribute.size = Math.sqrt(dx * dx + dy * dy);
    }
    else if (obj.graphic === 'circle') {
        const centerX = obj.attribute.left + (obj.attribute.right - obj.attribute.left)/2;
        const centerY = obj.attribute.top + (obj.attribute.bottom - obj.attribute.top)/2;
        
        // 计算新半径（基于鼠标位置与圆心的距离）
        const dx = x - centerX;
        const newRadius = Math.max(5, Math.abs(dx)); // 最小半径为5
        
        // 更新圆形属性
        obj.attribute.left = centerX - newRadius;
        obj.attribute.top = centerY - newRadius;
        obj.attribute.right = centerX + newRadius;
        obj.attribute.bottom = centerY + newRadius;
        obj.attribute.size = newRadius;
    } 
    else if (obj.graphic === 'rect') {
        const originalLeft = obj.attribute.left;
        const originalTop = obj.attribute.top;
        const originalWidth = obj.attribute.right;
        const originalHeight = obj.attribute.bottom;
        
        // 根据不同的控制点调整大小
        switch(o.resizeHandle?.type) {
            case 'rect-tl':
                // 左上角：同时调整位置和大小
                const newWidth = originalWidth + (originalLeft - x);
                const newHeight = originalHeight + (originalTop - y);
                if (newWidth > 10 && newHeight > 10) { // 最小尺寸限制
                    obj.attribute.left = x;
                    obj.attribute.top = y;
                    obj.attribute.right = newWidth;
                    obj.attribute.bottom = newHeight;
                }
                break;
            case 'rect-tr':
                // 右上角
                const newWidthTr = x - originalLeft;
                const newHeightTr = originalHeight + (originalTop - y);
                if (newWidthTr > 10 && newHeightTr > 10) {
                    obj.attribute.top = y;
                    obj.attribute.right = newWidthTr;
                    obj.attribute.bottom = newHeightTr;
                }
                break;
            case 'rect-bl':
                // 左下角
                const newWidthBl = originalWidth + (originalLeft - x);
                const newHeightBl = y - originalTop;
                if (newWidthBl > 10 && newHeightBl > 10) {
                    obj.attribute.left = x;
                    obj.attribute.right = newWidthBl;
                    obj.attribute.bottom = newHeightBl;
                }
                break;
            case 'rect-br':
                // 右下角
                const newWidthBr = x - originalLeft;
                const newHeightBr = y - originalTop;
                if (newWidthBr > 10 && newHeightBr > 10) {
                    obj.attribute.right = newWidthBr;
                    obj.attribute.bottom = newHeightBr;
                }
                break;
        }
    }
}

// 检查点是否在对象内
o.isPointInObject = function(obj, x, y) {
    if (obj.graphic === 'line') {
        // 直线的起点和终点
        const x1 = obj.attribute.left;
        const y1 = obj.attribute.top;
        const x2 = obj.attribute.right;
        const y2 = obj.attribute.bottom;
        
        // 计算点到直线的距离
        const A = x - x1;
        const B = y - y1;
        const C = x2 - x1;
        const D = y2 - y1;
        
        const dot = A * C + B * D;
        const lenSq = C * C + D * D;
        let param = -1;
        
        if (lenSq !== 0) param = dot / lenSq;
        
        let xx, yy;
        
        if (param < 0) {
            xx = x1;
            yy = y1;
        } else if (param > 1) {
            xx = x2;
            yy = y2;
        } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }
        
        const dx = x - xx;
        const dy = y - yy;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // 如果距离小于3像素，则认为点在直线上
        return distance < 3;
    }
    else if (obj.graphic === 'circle') {
        const centerX = obj.attribute.left + (obj.attribute.right - obj.attribute.left) / 2;
        const centerY = obj.attribute.top + (obj.attribute.bottom - obj.attribute.top) / 2;
        const radius = (obj.attribute.right - obj.attribute.left) / 2;
        const dx = x - centerX;
        const dy = y - centerY;
        return dx * dx + dy * dy <= radius * radius;
    } else if (obj.graphic === 'rect') {
        return x >= obj.attribute.left && 
               x <= obj.attribute.left + obj.attribute.right && 
               y >= obj.attribute.top && 
               y <= obj.attribute.top + obj.attribute.bottom;
    }
    return false;
}

// 获取对象中心X坐标
o.getObjectCenterX = function(obj) {
    if (obj.graphic === 'line') {
        return (obj.attribute.left + obj.attribute.right) / 2;
    }
    else if (obj.graphic === 'circle') {
        return obj.attribute.left + (obj.attribute.right - obj.attribute.left) / 2;
    } else if (obj.graphic === 'rect') {
        return obj.attribute.left + obj.attribute.right / 2;
    }
    return 0;
}

// 获取对象中心Y坐标
o.getObjectCenterY = function(obj) {
    if (obj.graphic === 'line') {
        return (obj.attribute.top + obj.attribute.bottom) / 2;
    }
    else if (obj.graphic === 'circle') {
        return obj.attribute.top + (obj.attribute.bottom - obj.attribute.top) / 2;
    } else if (obj.graphic === 'rect') {
        return obj.attribute.top + obj.attribute.bottom / 2;
    }
    return 0;
}

o.img = function(ctx,f,x,y,w,h){
    var i = new Image();
    i.src = "http://localhost:8080/"+f; 
    o.text(ctx,i.src,x,y);
    ctx.drawImage(i,x,y,w,h);
}
o.rendFile = function(ctx,f,x,y,w,h){
    o.img(ctx,f,x,y,w,h);
}  
 
o.removeAllCards = function(_ls){
    return function(btn){
        // 获取卡片容器
        const cardContainer = bl$("id_4_cardV");
        if (!cardContainer) return;
        
        // 遍历并移除所有卡片元素
        for (let i = 0; i < _ls.length; i++) {
            if (_ls[i] && _ls[i].parentNode === cardContainer) {
                cardContainer.removeChild(_ls[i]);
            }
        }
        
        // 清空卡片列表
        _ls.length = 0;
        
        // 重置当前卡片索引
        o.curCard = 0;
        
        // 更新状态显示
        const statusDiv = bl$("id_4_vStatus");
        if (statusDiv) {
            statusDiv.innerHTML = "All cards removed";
        }
    }
}(o.listCards);

o.addCard= function(_ls){
    return function(btn){
        var n = _ls.length;
        var v=bl$("id_4_cardV");
        s = btn.id + ":" + n;
        var b = blo0.blBtn(v,v.id+"_"+n,n+1,"grey");
        b.style.float="left";
        b.No = n+1;
        b.inf = {};
        b.inf.type = "t_Card";
        b.inf.index = n; 
        b.inf.toJSON = function(_btn){
            return function(v1){        
                var vta = blo0.blDiv(v1,v1.id+"vta","vta" ,"grey"); 
                vta.innerHTML = "";
                vta.v1 = blo0.blDiv(vta,vta.id+"v1","v1" ,blGrey[1]); 
                vta.v2 = blo0.blDiv(vta,vta.id+"v2","v2" ,blGrey[2]); 

                var ta = blo0.blTextarea(vta.v1,vta.v1.id+"ta","ta","lightgreen");
                ta.style.width = 100 + "%";
                ta.value = _btn.inf2JSON();

                vta.v2.saveAs_v3 = blo0.blBtn(vta.v2,vta.v2.id+"b1","saveAs_v3.json",blGrey[0]);
                vta.v2.saveAs_v3.onclick = function(){ 
                    var data = ta.value;
                    var xhr = new XMLHttpRequest();
                    xhr.withCredentials = true;
                    xhr.addEventListener("readystatechange", function() {
                    if(this.readyState === 4) {
                        ta.value = this.responseText;
                    }	
                    });
                    xhr.open("POST", "http://localhost:8080/json?fileName=v3.json");
                    xhr.setRequestHeader("Content-Type", "text/plain");
                    xhr.send(data);
                }
                vta.v2.setMusic = blo0.blBtn(vta.v2,vta.v2.id+"setMusic","setMusic",blGrey[0]);
                vta.v2.setMusic.onclick = function(){ 
                    o.music = "a.mp3";
                }
            }
        }(b);
        b.inf.version = "0.0.11";
        b.inf.x = 17;
        b.inf.y = 80;
        b.inf.w = 1920;
        b.inf.h = 1080;
        b.inf.music = o.music; 
        b.inf.duration = o.duration;
        b.inf.rate = "1";
        b.inf.objects = [];
        b.inf.bgColor = "skyblue";
        b.inf.text = "Card.txt";  
        // 添加示例直线对象
        o.AddObj2Frame(b.inf.objects,o.createObj("line",100,100,300,200,223,"255,11,1"));
        o.AddObj2Frame(b.inf.objects,o.createObj("circle",155,22,333,222,15,"255,11,1"));
        o.AddObj2Frame(b.inf.objects,o.createObj("rect",111,110,200,100,5,"255,255,1"));
        b.inf2JSON = function(_this){
            return function(){
                var r = o.newScript(b.inf.version,
                            b.inf.w,
                            b.inf.h,
                            b.inf.music,
                            b.inf.rate);
                var f = o.newFrame(1,120,"1,100,200");                
                for(i in b.inf.objects){
                    o.AddObj2Frame(f.objects,b.inf.objects[i]);
                } 
                o.AddFrame2Script(r,f);
                
                var s = JSON.stringify(r); 
                return s;
            }
        }(b);
        b.onclick = function(_o,_this){
            return function(){
                _o.curCard = _this.No;
                for(i in _o.listCards){
                    if((_this.No-1)==i){
                        _o.listCards[i].style.backgroundColor = "yellow";
                        _o.status(_this);
                    }
                    else{
                        _o.listCards[i].style.backgroundColor = "grey";
                    }
                }
            }
        }(o,b);
        b._2_draw = function(_this){
            return function(ctx){
                var x = _this.inf.x;
                var y = _this.inf.y;
                var w = _this.inf.w;
                var h = _this.inf.h;
                var c = _this.inf.bgColor;
                var s = "o.bPlay: " + o.bPlay ;
                s += " o.list2draw.length=" + o.list2draw.length;
                s += ": " + o.curCard + "/" + o.listCards.length;
                o.text(ctx,s,x,y);        
                o.rect(ctx,x,y,w,h,c);
                s = _this.inf.text + ": N[Obj]=" + _this.inf.objects.length;
                o.text(ctx,s,x ,y+h/2);       
                for(i in _this.inf.objects){
                    var a = _this.inf.objects[i]; 
                    o.drawObj(ctx,a);                    
                } 

            }
        }(b);
        _ls.push(b);
    }
}(o.listCards);

// 新增播放视频函数，实现帧播放逻辑
o.playVideo = function(btn) {
    if (o.bPlay) {
        // 停止播放
        o.bPlay = false;
        btn.innerHTML = "play";
        if (o.playbackInterval) {
            clearInterval(o.playbackInterval);
            o.playbackInterval = null;
        }
    } else {
        // 开始播放
        o.bPlay = true;
        btn.innerHTML = "stop";
        
        // 重置当前帧为0
        o.currentFrame = 0;
        
        // 启动播放定时器
        o.playbackInterval = setInterval(function() {
            // 切换到下一帧
            o.currentFrame++;
            
            // 如果到达最后一帧，循环回到开始
            if (o.currentFrame >= o.listCards.length) {
                o.currentFrame = 0;
            }
            
            // 更新当前选中的卡片
            o.curCard = o.currentFrame + 1;
            
            // 更新卡片显示状态
            for (let i = 0; i < o.listCards.length; i++) {
                if (i === o.currentFrame) {
                    o.listCards[i].style.backgroundColor = "yellow";
                } else {
                    o.listCards[i].style.backgroundColor = "grey";
                }
            }
        }, o.frameInterval);
    }
};
// 新增播放速度控制函数
o.setPlaybackSpeed = function(speed) {
    // speed为倍数，1.0为正常速度
    o.frameInterval = 1000 / speed;
    
    // 如果正在播放，重新启动定时器以应用新速度
    if (o.bPlay && o.playbackInterval) {
        clearInterval(o.playbackInterval);
        o.playbackInterval = setInterval(function() {
            o.currentFrame++;
            if (o.currentFrame >= o.listCards.length) {
                o.currentFrame = 0;
            }
            o.curCard = o.currentFrame + 1;
            
            for (let i = 0; i < o.listCards.length; i++) {
                o.listCards[i].style.backgroundColor = i === o.currentFrame ? "yellow" : "grey";
            }
        }, o.frameInterval);
    }
};

o.inRect = function(x,y,x0,y0,w,h){
    var b = false;
    if(x<x0 || x>(x0+w) || y<y0 || y>(y0+h)){
        b = false;
    }
    else{
        b = true;
    }
    return b;
}
o._2drawCurCard = function(ctx){
    if(o.curCard > 0)    o.listCards[o.curCard-1]._2_draw(ctx);
}
 
// 修改绘图函数，添加帧序号显示
o.draw = function(ctx) {
    o._2drawCurCard(ctx);

    // 显示当前帧序号和总帧数
    if (o.listCards.length > 0) {
        const frameInfo = `Frame: ${o.currentFrame + 1}/${o.listCards.length}`;
        ctx.font = "16px Arial";
        ctx.fillStyle = "red";
        ctx.fillText(frameInfo, 10, 30);
    }

    for (let i in o.list2draw) {
        o.list2draw[i].draw(ctx);
    }
};
o.reg2draw  = function(user){
    o.list2draw.push(user);
}
o.regMousedown = function(user){
    o.listMousedown.push(user);
    o.listMousedown.push(user);
}
o.dbgBtn = function(tb,id,html){
    var btn = blo0.blBtn(tb,id,html,"grey"); 
           
    btn.style.float = "left";
       
    btn.onclick = function(_tb){ 
        return function(){
                if("grey"==this.style.backgroundColor){
                    this.style.backgroundColor = "green";
                    this.b = true;
                }
                else{
                    this.style.backgroundColor = "grey";
                    this.b = false;
                }
            }
    }(tb); 
    return btn;            
}
o.mousedown = function(ctx,x,y){ 
    x = Math.round(x);
    y = Math.round(y);
    o.s = x + ":" + y;
    o.x = x;
    o.y = y;    
    for(i in o.listMousedown){
        o.listMousedown[i].mousedown(x,y);
    }
};
o.ftnTimer = function(ctx,w,h){ 
    ctx.clearRect(0, 0, w, h);
    
    ctx.fillStyle = "grey";
    ctx.fillRect(0,0,w,h);
 
    o.text(ctx,"xd--" + Date(),15,20);   

    o.draw(ctx);
};
o.text = function(ctx,txt,x,y){ 
    ctx.font= 12 + "px Comic Sans MS";
    ctx.fillStyle = "white";
    ctx.fillText(txt, x,y); 
};
o.rect = function(ctx,x,y,w,h,c){ 
    ctx.fillStyle = c;
    ctx.fillRect(x,y,w,h); 
};
    o.uiCards = function(_p,_c){  
        _p.style.overflow = "auto";        
        var cardV = blo0.blDiv(_p,"id_4_cardV","cardV",blGrey[2]);
        cardV.style.width = 20*111 +"px";
        cardV.style.height = "50px";
        cardV.style.backgroundColor = "lightblue";
        cardV.style.float = "left";
    };
    o.uiColum = function(ui){           
        var s = '<div class="w3-col s3 w3-green w3-center"><p>s6</p></div>';
        s+='<div class="w3-col s9 w3-dark-grey w3-center" id="uiRight">   </div>';
        var v1 = blo0.blDiv(ui,ui.id+"v1",s,blGrey[2]);
       
        o.addClass(v1,"w3-row"); 
        var r = bl$("uiRight");  
        o.uiCards(r,"red");  
    };
    o.addClass = function (d,cn) {        d.classList.add(cn);    };
      

    var b = bl$("btnStoryBoard");    
    o.addClass(b,"w3-button"); 
    o.addClass(b,"w3-blue"); 
 

    var b = bl$("btnPlayground");    
    o.addClass(b,"w3-button"); 
    o.addClass(b,"w3-green"); 

    var b = bl$("btnServer");    
    o.addClass(b,"w3-button"); 
    o.addClass(b,"w3-brown"); 
