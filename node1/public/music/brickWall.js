document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('brickWall');
    const ctx = canvas.getContext('2d');

    const brickWidth = 75;
    const brickHeight = 20;
    const brickPadding = 10;
    const brickRowCount = 10;
    const brickColumnCount = 12;
    
    const brickRed = '#9B111E';
    const mortar = '#D3D3D3'; // 灰浆颜色

    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            let brickX = (c * (brickWidth + brickPadding)) + brickPadding;
            let brickY = (r * (brickHeight + brickPadding)) + brickPadding;
            
            // 绘制砖块
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = brickRed;
            ctx.fill();
            ctx.closePath();
            
            // 绘制灰浆（可选）
            // 顶部
            ctx.beginPath();
            ctx.rect(brickX, brickY - brickPadding, brickWidth, brickPadding);
            ctx.fillStyle = mortar;
            ctx.fill();
            ctx.closePath();
            
            // 右侧（除了最后一列）
            if (c < brickColumnCount - 1) {
                ctx.beginPath();
                ctx.rect(brickX + brickWidth, brickY, brickPadding, brickHeight);
                ctx.fillStyle = mortar;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
});