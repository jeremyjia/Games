// https://www.jb51.net/article/105958.htm

function animateFrame(time) {
	obj.XdInit();
	obj.init_chess();
}
function Class1(){

}
var obj = new Class1();

//var obj = {};
// 初始化
obj.XdInit = function () {
	var canvas = document.getElementById("myCanvas");
	this.ctx = canvas.getContext("2d");
	this.radius = 23;
	this.chunk = 50;
	this.CandidateCircleR = 5;
	this.steps = [];      // 记录步骤
	this.currActive = "red";  // 先下
	this.init_back();
}
// 棋盘初始化
obj.init_back = function () {
	this.drawRowLine();
	this.drawColLine();
	this.ctx.clearRect(this.chunk + 1, this.chunk * 5 + 1, this.chunk * 8 - 2, this.chunk - 2);
	this.drawsharpS();
	this.drawX();
	this.drawText();
}
// 棋子初始化
obj.init_chess = function () {
	var Car_b1 = { x: 1, y: 1, text: "2-車" }
	var Horse_b1 = { x: 2, y: 1, text: "馬" }
	var Elephant_b1 = { x: 3, y: 1, text: "象" }
	var Scholar_b1 = { x: 4, y: 1, text: "士" }
	var Boss_b = { x: 5, y: 1, text: "将" }
	var Scholar_b2 = { x: 6, y: 1, text: "士" }
	var Elephant_b2 = { x: 7, y: 1, text: "象" }
	var Horse_b2 = { x: 8, y: 1, text: "馬" }
	var Car_b2 = { x: 9, y: 1, text: "車" }
	var Cannon_b1 = { x: 2, y: 3, text: "炮" }
	var Cannon_b2 = { x: 8, y: 3, text: "炮" }
	var Soldier_b1 = { x: 1, y: 4, text: "卒" }
	var Soldier_b2 = { x: 3, y: 4, text: "卒" }
	var Soldier_b3 = { x: 5, y: 4, text: "卒" }
	var Soldier_b4 = { x: 7, y: 4, text: "卒" }
	var Soldier_b5 = { x: 9, y: 4, text: "卒" }
	var Car_r1 = { x: 1, y: 10, text: "車" }
	var Horse_r1 = { x: 2, y: 10, text: "馬" }
	var Elephant_r1 = { x: 3, y: 10, text: "相" }
	var Scholar_r1 = { x: 4, y: 10, text: "仕" }
	var Boss_r = { x: 5, y: 10, text: "帅" }
	var Scholar_r2 = { x: 6, y: 10, text: "仕" }
	var Elephant_r2 = { x: 7, y: 10, text: "相" }
	var Horse_r2 = { x: 8, y: 10, text: "馬" }
	var Car_r2 = { x: 9, y: 10, text: "車" }
	var Cannon_r1 = { x: 2, y: 8, text: "炮" }
	var Cannon_r2 = { x: 8, y: 8, text: "炮" }
	var Soldier_r1 = { x: 1, y: 7, text: "兵" }
	var Soldier_r2 = { x: 3, y: 7, text: "兵" }
	var Soldier_r3 = { x: 5, y: 7, text: "兵" }
	var Soldier_r4 = { x: 7, y: 7, text: "兵" }
	var Soldier_r5 = { x: 9, y: 7, text: "兵" }
	this.cheer_arr_B = [Car_b1, Horse_b1, Elephant_b1, Scholar_b1, Boss_b, Scholar_b2, Elephant_b2, Horse_b2, Car_b2,
		Cannon_b1, Cannon_b2, Soldier_b1, Soldier_b2, Soldier_b3, Soldier_b4, Soldier_b5];
	this.cheer_arr_R = [Car_r1, Horse_r1, Elephant_r1, Scholar_r1, Boss_r, Scholar_r2, Elephant_r2, Horse_r2, Car_r2,
		Cannon_r1, Cannon_r2, Soldier_r1, Soldier_r2, Soldier_r3, Soldier_r4, Soldier_r5];
	var that = this;
	this.cheer_arr_ALL = this.cheer_arr_B.concat(this.cheer_arr_R);

	//Jeremy for debug
	Car_b1.color = "white";
	Car_b1.bgcolor = "blue";
	Car_b1.bgColor_b = "green";
	Car_b1.type = "black";
	this.drawPiece(Car_b1);
	this.drawChessText(Car_b1);

	
	Car_b2.color = "white";
	Car_b2.bgcolor = "blue";
	Car_b2.bgColor_b = "green";
	Car_b2.type = "black";
	this.drawPiece(Car_b2);
	this.drawChessText(Car_b2);
}
// 画横线
obj.drawRowLine = function () {
	for (var i = 1; i <= 10; i++) {
		this.drawLine(1, i, 9, i);
	}
}
// 画竖线
obj.drawColLine = function () {
	for (var i = 1; i <= 9; i++) {
		this.drawLine(i, 1, i, 10);
	}
}
// 画直线
obj.drawLine = function (x0, y0, x1, y1, lw) {
	var x0 = x0 * this.chunk;
	var y0 = y0 * this.chunk;
	var x1 = x1 * this.chunk;
	var y1 = y1 * this.chunk;
	this.ctx.beginPath();
	this.ctx.strokeStyle = "#000";
	this.ctx.lineWidth = lw ? lw : 1;
	this.ctx.moveTo(x0, y0);
	this.ctx.lineTo(x1, y1);
	this.ctx.stroke();
	this.ctx.closePath();
}
// 画#
obj.drawsharpS = function () {
	this.round(2, 3);
	this.round(8, 3);
	this.round(1, 4);
	this.round(3, 4);
	this.round(5, 4);
	this.round(7, 4);
	this.round(9, 4);
	this.round(2, 8);
	this.round(8, 8);
	this.round(1, 7);
	this.round(3, 7);
	this.round(5, 7);
	this.round(7, 7);
	this.round(9, 7);
}
// 画单个#
obj.round = function (x0, y0) {
	var x0 = x0 * this.chunk;
	var y0 = y0 * this.chunk;
	this.ctx.beginPath();
	this.ctx.strokeStyle = "#000";
	this.ctx.lineWidth = 1;
	if (x0 != this.chunk) {
		// 左上
		this.ctx.moveTo(x0 - 5, y0 - 10);
		this.ctx.lineTo(x0 - 5, y0 - 5);
		this.ctx.lineTo(x0 - 10, y0 - 5);
		// 左下
		this.ctx.moveTo(x0 - 5, y0 + 10);
		this.ctx.lineTo(x0 - 5, y0 + 5);
		this.ctx.lineTo(x0 - 10, y0 + 5);
	}
	if (x0 != this.chunk * 9) {
		// 右上
		this.ctx.moveTo(x0 + 5, y0 - 10);
		this.ctx.lineTo(x0 + 5, y0 - 5);
		this.ctx.lineTo(x0 + 10, y0 - 5);
		// 右下
		this.ctx.moveTo(x0 + 5, y0 + 10);
		this.ctx.lineTo(x0 + 5, y0 + 5);
		this.ctx.lineTo(x0 + 10, y0 + 5);
	}
	this.ctx.stroke();
	this.ctx.closePath();
}
// 画X
obj.drawX = function () {
	this.drawLine(4, 1, 6, 3, 0.5);
	this.drawLine(4, 3, 6, 1, 0.5);
	this.drawLine(4, 8, 6, 10, 0.5);
	this.drawLine(4, 10, 6, 8, 0.5);
}
// 画楚河/漢界
obj.drawText = function () {
	this.ctx.font = "30px Courier New";
	this.ctx.fillStyle = "#000";
	this.ctx.fillText("楚 河", this.chunk * 2, this.chunk * 5 + this.chunk / 2 + 10);
	this.ctx.fillText("漢 界", this.chunk * 6, this.chunk * 5 + this.chunk / 2 + 10);
	this.ctx.font = "12px Courier New";
	this.text_arr = ["九", "八", "七", "六", "五", "四", "三", "二", "一"];
	for (var i = 0; i < 9; i++) {
		this.ctx.fillText((i + 1).toString(), this.chunk * (i + 1) - 5, 20);
		this.ctx.fillText(this.text_arr[i], this.chunk * (i + 1) - 5, this.chunk * 10 + 30 + 10);
	}
}
// 画棋子形状
obj.drawPiece = function (e) {
	this.ctx.beginPath();
	this.ctx.fillStyle = e.bgcolor;
	this.ctx.strokeStyle = e.bgColor_b;
	this.ctx.lineWidth = 2;
	this.ctx.arc(e.x * this.chunk, e.y * this.chunk, this.radius, 0, Math.PI * 2, true);
	this.ctx.closePath();
	this.ctx.fill();
	this.ctx.stroke();
}
// 画棋子文字
obj.drawChessText = function (e) {
	this.ctx.font = "30px Arial";
	this.ctx.fillStyle = e.color;
	var offset = 16;//this.ctx.measureText(e.text).width / 2;
	this.ctx.fillText(e.text, e.x * this.chunk - offset, e.y * this.chunk + 10);
}

