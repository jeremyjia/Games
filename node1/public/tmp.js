// 在 DrawingTool 基类中添加抽象方法
class DrawingTool {
    // ... 其他原有代码
    
    containsPoint(x, y, obj) {
        throw new Error("必须实现 containsPoint 方法");
    }
}

// 直线工具类
class LineTool extends DrawingTool {
    // ... 其他原有代码
    
    containsPoint(x, y, obj) {
        // 直线点击检测逻辑
        const dx = x - obj.startX;
        const dy = y - obj.startY;
        const distance = Math.abs(dx * (obj.endY - obj.startY) - dy * (obj.endX - obj.startX)) 
                        / Math.sqrt((obj.endY - obj.startY) ** 2 + (obj.endX - obj.startX) ** 2);
        return distance < 5;
    }
}

// 圆形工具类 
class CircleTool extends DrawingTool {
    // ... 其他原有代码
    
    containsPoint(x, y, obj) {
        const radius = Math.sqrt((obj.endX - obj.startX) ** 2 + (obj.endY - obj.startY) ** 2);
        const dist = Math.sqrt((x - obj.startX) ** 2 + (y - obj.startY) ** 2);
        return dist <= radius;
    }
}

// 矩形工具类
class RectTool extends DrawingTool {
    // ... 其他原有代码
    
    containsPoint(x, y, obj) {
        return x >= obj.startX && x <= obj.startX + obj.width &&
               y >= obj.startY && y <= obj.startY + obj.height;
    }
}

// 三角形工具类
class TriangleTool extends DrawingTool {
    // ... 其他原有代码
    
    containsPoint(x, y, obj) {
        const x1 = obj.startX + obj.width/2;
        const y1 = obj.startY;
        const x2 = obj.startX;
        const y2 = obj.startY + obj.height;
        const x3 = obj.startX + obj.width;
        const y3 = y2;

        const areaOrig = Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));
        const area1 = Math.abs((x1 - x) * (y2 - y) - (x2 - x) * (y1 - y));
        const area2 = Math.abs((x2 - x) * (y3 - y) - (x3 - x) * (y2 - y));
        const area3 = Math.abs((x3 - x) * (y1 - y) - (x1 - x) * (y3 - y));
        
        return (area1 + area2 + area3) <= (areaOrig + 0.001);
    }
}

// 修改 Blackboard 类中的检测方法
class C4Blackboard {
    // ... 其他原有代码
    
    getObjectAtPoint(x, y) {
        for (let i = this.drawnObjects.length - 1; i >= 0; i--) {
            const obj = this.drawnObjects[i];
            const tool = this.tools.find(t => t.name === obj.type);
            if (tool && tool.containsPoint(x, y, obj)) {
                return obj;
            }
        }
        return null;
    }
}