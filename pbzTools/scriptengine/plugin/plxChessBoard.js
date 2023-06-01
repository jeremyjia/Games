// https://www.jb51.net/article/105958.htm

var tag = "[plxChessBoard.js_v0.202] ";
var nTest = 0;

function animateFrame(time) {
    oPlxChess.makeFrame(time);
}


function CPlxCChessBoard(){
    nTest++;
	var _lr = true;
	var _x = 110;
    var _w = 800;
    var _h = 800;
    var _radius = 23;
	var _chunk = 50;
	var _dy = 4;

	var _time = 0;
	var _index = 0;

	var Car_b1 = { x: 1, y: 1, text: "車", alias:"车", "alive":true }
	var Horse_b1 = { x: 2, y: 1, text: "馬", alias:"马","alive":true }
	var Elephant_b1 = { x: 3, y: 1, text: "象","alive":true }
	var Scholar_b1 = { x: 4, y: 1, text: "士","alive":true }
	var Boss_b = { x: 5, y: 1, text: "将","alive":true }
	var Scholar_b2 = { x: 6, y: 1, text: "士","alive":true }
	var Elephant_b2 = { x: 7, y: 1, text: "象","alive":true }
	var Horse_b2 = { x: 8, y: 1, text: "馬", alias:"马","alive":true }
	var Car_b2 = { x: 9, y: 1, text: "車",alias:"车","alive":true }
	var Cannon_b1 = { x: 2, y: 3, text: "炮","alive":true }
	var Cannon_b2 = { x: 8, y: 3, text: "炮","alive":true }
	var Soldier_b1 = { x: 1, y: 4, text: "卒","alive":true }
	var Soldier_b2 = { x: 3, y: 4, text: "卒","alive":true }
	var Soldier_b3 = { x: 5, y: 4, text: "卒","alive":true }
	var Soldier_b4 = { x: 7, y: 4, text: "卒","alive":true }
	var Soldier_b5 = { x: 9, y: 4, text: "卒","alive":true }

	var Car_r1 = { x: 1, y: 10, text: "車", alias:"车" ,"alive":true}
	var Horse_r1 = { x: 2, y: 10, text: "馬", alias:"马","alive":true }
	var Elephant_r1 = { x: 3, y: 10, text: "相","alive":true }
	var Scholar_r1 = { x: 4, y: 10, text: "仕" , alias:"士", "alive":true}
	var Boss_r = { x: 5, y: 10, text: "帅","alive":true }
	var Scholar_r2 = { x: 6, y: 10, text: "仕","alive":true }
	var Elephant_r2 = { x: 7, y: 10, text: "相","alive":true }
	var Horse_r2 = { x: 8, y: 10, text: "馬", alias:"马","alive":true }
	var Car_r2 = { x: 9, y: 10, text: "車", alias:"车","alive":true }
	var Cannon_r1 = { x: 2, y: 8, text: "炮","alive":true }
	var Cannon_r2 = { x: 8, y: 8, text: "炮","alive":true }
	var Soldier_r1 = { x: 1, y: 7, text: "兵","alive":true }
	var Soldier_r2 = { x: 3, y: 7, text: "兵","alive":true }
	var Soldier_r3 = { x: 5, y: 7, text: "兵","alive":true}
	var Soldier_r4 = { x: 7, y: 7, text: "兵" ,"alive":true}
	var Soldier_r5 = { x: 9, y: 7, text: "兵","alive":true } 

	var _cheer_arr_B = [Car_b1,Horse_b1,Elephant_b1,Scholar_b1,Boss_b,Scholar_b2,Elephant_b2,Horse_b2,Car_b2,
		Cannon_b1,Cannon_b2,Soldier_b1,Soldier_b2,Soldier_b3,Soldier_b4,Soldier_b5];

	var _cheer_arr_R = [Car_r1,Horse_r1,Elephant_r1,Scholar_r1,Boss_r,Scholar_r2,Elephant_r2,Horse_r2,Car_r2,
			Cannon_r1,Cannon_r2,Soldier_r1,Soldier_r2,Soldier_r3,Soldier_r4,Soldier_r5];

	var canvas = document.getElementById("myCanvas");
    var _ctx = canvas.getContext("2d"); 
	// 画直线
	var drawLine = function (i0, j0, i1, j1, lw) {
		var x0 = _x + i0 * _chunk;
		var y0 = j0 * _chunk;
		var x1 = _x + i1 * _chunk;
		var y1 = j1 * _chunk;
		_ctx.beginPath();
		_ctx.strokeStyle = "#000";
		_ctx.lineWidth = lw ? lw : 1;
		_ctx.moveTo(x0, y0);
		_ctx.lineTo(x1, y1);
		_ctx.stroke();
		_ctx.closePath();
	}
	// 画横线
	var drawRowLine = function () {
		for (var i = 1; i <= 10; i++) {
			drawLine(1, i, 9, i);
		}
	}
	// 画竖线
	var drawColLine = function () {
		for (var i = 1; i <= 9; i++) {
			drawLine(i, 1, i, 10);
		}
	}

	

	// 画单个#
	var round = function (i, j) {
		var x0 = _x + i * _chunk;
		var y0 = j * _chunk;
		_ctx.beginPath();
		_ctx.strokeStyle = "#000";
		_ctx.lineWidth = 1;
		if (i != 1) {
			// 左上
			_ctx.moveTo(x0 - 5, y0 - 10);
			_ctx.lineTo(x0 - 5, y0 - 5);
			_ctx.lineTo(x0 - 10, y0 - 5);
			// 左下
			_ctx.moveTo(x0 - 5, y0 + 10);
			_ctx.lineTo(x0 - 5, y0 + 5);
			_ctx.lineTo(x0 - 10, y0 + 5);
		}
		if (i != 9) {
			// 右上
			_ctx.moveTo(x0 + 5, y0 - 10);
			_ctx.lineTo(x0 + 5, y0 - 5);
			_ctx.lineTo(x0 + 10, y0 - 5);
			// 右下
			_ctx.moveTo(x0 + 5, y0 + 10);
			_ctx.lineTo(x0 + 5, y0 + 5);
			_ctx.lineTo(x0 + 10, y0 + 5);
		}
		_ctx.stroke();
		_ctx.closePath();
	}

	// 画#
	var drawsharpS = function () {
		round(2, 3);
		round(8, 3);
		round(1, 4);
		round(3, 4);
		round(5, 4);
		round(7, 4);
		round(9, 4);
		round(2, 8);
		round(8, 8);
		round(1, 7);
		round(3, 7);
		round(5, 7);
		round(7, 7);
		round(9, 7);
	}
	// 画X
	var drawX = function () {
		drawLine(4, 1, 6, 3, 0.5);
		drawLine(4, 3, 6, 1, 0.5);
		drawLine(4, 8, 6, 10, 0.5);
		drawLine(4, 10, 6, 8, 0.5);
	}
	// 画楚河/漢界
	var drawText = function () {
		_ctx.font = "30px Courier New";
		_ctx.fillStyle = "#000";
		_ctx.fillText("楚 河",_x + _chunk * 2, _chunk * 5 + _chunk / 2 + 10);
		_ctx.fillText("漢 界",_x + _chunk * 6, _chunk * 5 + _chunk / 2 + 10);
		_ctx.font = "12px Courier New";
		var text_arr = ["九", "八", "七", "六", "五", "四", "三", "二", "一"];
		for (var i = 0; i < 9; i++) {
			_ctx.fillText((i + 1).toString(), _x + _chunk * (i + 1) - 5, 20+_dy);
			_ctx.fillText(text_arr[i],_x + _chunk * (i + 1) - 5, _chunk * 10 + 30 + 10);
		}
	}

	// 棋盘初始化
    var drawBoard = function () {
		drawRowLine();
		drawColLine();
		_ctx.clearRect(_x + _chunk + 1, _chunk * 5 + 1, _chunk * 8 - 2, _chunk - 2);
		drawsharpS();
		drawX();
		drawText();
	}

 
    // 画棋子形状
    var _drawPiece = function (ctx,chunk, radius,e) {
        ctx.beginPath();
        ctx.fillStyle = e.bgcolor;
        ctx.strokeStyle = e.bgColor_b;
        ctx.lineWidth = 2;
        ctx.arc(_x + e.x * chunk, e.y * chunk, radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    // 画棋子文字
    var _drawChessText = function (ctx,chunk,e) {
        ctx.font = "30px Arial";
        ctx.fillStyle = e.color;
        var offset = 16;//this.ctx.measureText(e.text).width / 2;
        ctx.fillText(e.text, _x + e.x * chunk - offset, e.y * chunk + 10);
    }

    // 棋子初始化
    var _init_chess = function () {
	
	for(var i=0; i< _cheer_arr_B.length; i++){
		var cheerObj = _cheer_arr_B[i];
		cheerObj.color = "green";
		cheerObj.bgcolor = "blue";
		cheerObj.bgColor_b = "green";
		cheerObj.type = "black";
		if(cheerObj.alive == true){
			_drawPiece(_ctx,_chunk, _radius, cheerObj);
			_drawChessText(_ctx,_chunk,cheerObj);
		}
	}

	for(i=0; i< _cheer_arr_R.length; i++){
		var cheerObj = _cheer_arr_R[i];
		cheerObj.color = "red";
		cheerObj.bgcolor = "blue";
		cheerObj.bgColor_b = "#f00";
		cheerObj.type = "red";
		if(cheerObj.alive == true){
		  _drawPiece(_ctx,_chunk, _radius, cheerObj);
		  _drawChessText(_ctx,_chunk,cheerObj);
	   }
	}

}

    var _dbg = function(time){
		/*
		_x += 5 * (_lr?1:-1);
		if(_lr && _x>222) {
			_lr = false;
		} 
		else if(!_lr && _x<10)  _lr = true;*/

        var oldFont = _ctx.font;
        var old_fillText = _ctx.fillText;
        var old_fillStyle = _ctx.fillStyle;
	    _ctx.fillStyle = "lightblue";
        
        _ctx.clearRect(0,0,_w,_h);
        _ctx.fillRect(0,0,_w,_h);

        var s = tag;
        s += " _index = " + _index;
		s += " time = " + time;
		s += " -----NextStep = " + global_ChessLog[_index];

        
        _ctx.font = 15 + "px Arial";
	    _ctx.fillStyle = "brown";
        _ctx.fillText(s, 50,11);

        _ctx.font = oldFont;
        _ctx.fillText = old_fillText;
	    _ctx.fillStyle = old_fillStyle;
	}
	
	var _reSetAllChessPositon = function(){
		Car_b1.x=1; Car_b1.y = 1; Car_b1.alive = true;
		Horse_b1.x = 2; Horse_b1.y = 1; Horse_b1.alive = true;
		Elephant_b1.x = 3; Elephant_b1.y = 1; Elephant_b1.alive = true;
		Scholar_b1.x = 4; Scholar_b1.y = 1; Scholar_b1.alive = true;
		Boss_b.x = 5; Boss_b.y = 1; Boss_b.alive = true;
		Scholar_b2.x = 6; Scholar_b2.y = 1; Scholar_b2.alive = true;
		Elephant_b2.x = 7; Elephant_b2.y =1; Elephant_b2.alive = true;
		Horse_b2.x = 8; Horse_b2.y = 1; Horse_b2.alive = true;
		Car_b2.x = 9; Car_b2.y = 1; Car_b2.alive=true;
		Cannon_b1.x = 2; Cannon_b1.y = 3; Cannon_b1.alive = true;
		Cannon_b2.x = 8; Cannon_b2.y = 3; Cannon_b2.alive = true;
		Soldier_b1.x = 1; Soldier_b1.y = 4; Soldier_b1.alive = true;
		Soldier_b2.x = 3; Soldier_b2.y = 4; Soldier_b2.alive = true;
		Soldier_b3.x = 5; Soldier_b3.y = 4; Soldier_b3.alive = true;
		Soldier_b4.x=7; Soldier_b4.y = 4; Soldier_b4.alive = true;
		Soldier_b5.x = 9; Soldier_b5.y = 4;Soldier_b5.alive = true;
		Car_r1.x = 1; Car_r1.y = 10; Car_r1.alive = true;
		Horse_r1.x = 2; Horse_r1.y=10; Horse_r1.alive = true;
		Elephant_r1.x = 3; Elephant_r1.y = 10; Elephant_r1.alive = true;
		Scholar_r1.x = 4; Scholar_r1.y = 10; Scholar_r1.alive = true;
		Boss_r.x = 5; Boss_r.y = 10; Boss_r.alive = true;
		Scholar_r2.x = 6; Scholar_r2.y = 10; Scholar_r2.alive = true;
		Elephant_r2.x = 7; Elephant_r2.y = 10; Elephant_r2.alive = true;
		Horse_r2.x = 8; Horse_r2.y = 10; Horse_r2.alive = true;
		Car_r2.x = 9; Car_r2.y = 10; Car_r2.alive = true;
		Cannon_r1.x = 2; Cannon_r1.y = 8; Cannon_r1.alive = true;
		Cannon_r2.x=8; Cannon_r2.y=8; Cannon_r2.alive=true;
		Soldier_r1.x=1; Soldier_r1.y=7; Soldier_r1.alive = true;
		Soldier_r2.x = 3; Soldier_r2.y = 7; Soldier_r2.alive = true;
		Soldier_r3.x = 5; Soldier_r3.y = 7; Soldier_r3.alive = true;
		Soldier_r4.x = 7; Soldier_r4.y = 7; Soldier_r4.alive = true;
		Soldier_r5.x = 9; Soldier_r5.y=7; Soldier_r5.alive = true;
	}
	//
	//Parsing functions below:
	//

	var _findShiNextPos = function(startPoint, c, d, type){
		var curX = startPoint.x;
		var curY = startPoint.y;
		var destX = _getBXPosition(d);
		if((type==0 && c=="进") || (type==1 && c=="退")){
			if(curX-1 == destX){
				return {x:destX, y:curY-1};
			}
			if(curX+1 == destX){
				return {x:destX, y:curY-1};
			}
		}else {
			if(curX-1 == destX){
				return {x:destX, y:curY+1};
			}
			if(curX+1 == destX){
				return {x:destX, y:curY+1};
			}
		}
		return {x:-1,y:-1};
	}

	var _findXiangNextPos = function(startPoint, c, d, type){
		var curX = startPoint.x;
		var curY = startPoint.y;
		var destX = _getBXPosition(d);
		//红方的进，与黑方的退等价
		if((type==0 && c=="进") || (type==1 && c=="退")){
			if(curX-2 == destX){
				return {x:destX, y:curY-2};
			}
			if(curX+2 == destX){
				return {x:destX, y:curY-2};
			}
		}else {
			if(curX-2 == destX){
				return {x:destX, y:curY+2};
			}
			if(curX+2 == destX){
				return {x:destX, y:curY+2};
			}
		}
		return {x:-1,y:-1};
	}

	var _findeBingOrZuNextPos = function(startPoint, c, d, type){
		var dValue = _getDYPosition(d);
		var destPos = null;
		if(c=="平"){
		   destPos = {x:dValue, y:startPoint.y};
		}else if(c=="进"){
			if(type == 0){
			   destPos = {x:startPoint.x, y:startPoint.y-dValue};
			}else{
			   destPos = {x:startPoint.x, y:startPoint.y+dValue};
			}
		}
        return destPos;
	}

	var _findePaoOrCheNextPos = function(startPoint, c, d, type){
		var dValue = _getDYPosition(d);
		var destPos = null;
		if(c=="平"){
		   var dValue = _getBXPosition(d);
		   destPos = {x:dValue, y:startPoint.y};
		}else if(c=="进"){
			if(type == 0){
			   destPos = {x:startPoint.x, y:startPoint.y-dValue};
			}else{
			   destPos = {x:startPoint.x, y:startPoint.y+dValue};
			}
		}else if(c == "退"){
		   if(type == 0){
			   destPos = {x:startPoint.x, y:startPoint.y+dValue};
			}else{
			   destPos = {x:startPoint.x, y:startPoint.y-dValue};
			}
		}
        return destPos;
	}

	var _findeHorseNextPos = function(startPoint, c, d, type){
		var curX = startPoint.x;
		var curY = startPoint.y;
		var destX = _getBXPosition(d);
		//红方的进，与黑方的退等价
		if((type==0 && c=="进") || (type==1 && c=="退")){
			if(curX-2 == destX){
				return {x:destX, y:curY-1};
			}
			if(curX-1 == destX){
				return {x:destX, y:curY-2};
			}
			if(curX+1 == destX){
				return {x:destX, y:curY-2};
			}
			if(curX+2 == destX){
				return {x:destX, y:curY-1};
			}
		}else {
			if(curX-2 == destX){
				return {x:destX, y:curY+1};
			}
			if(curX-1 == destX){
				return {x:destX, y:curY+2};
			}
			if(curX+1 == destX){
				return {x:destX, y:curY+2};
			}
			if(curX+2 == destX){
				return {x:destX, y:curY+1};
			}
		}
		return {x:-1,y:-1};
	}

	var _findChessObjectbyPos = function(X,Y){

		for(var i=0; i< _cheer_arr_B.length; i++){
			var chessObj = _cheer_arr_B[i];
			if(!chessObj.alive){
				continue;
			}
			if(chessObj.x == X && chessObj.y == Y){
                 return chessObj;
			}
		}
	
		for(i=0; i< _cheer_arr_R.length; i++){
			var chessObj = _cheer_arr_R[i];
			if(!chessObj.alive){
				continue;
			}
			if(chessObj.x == X && chessObj.y == Y){
				return chessObj;
		   }
		}
        return null;
	}

	var _getYPosition = function(a, nX, type){
		if(type == 0 )
		{
			for(i=0; i< _cheer_arr_R.length; i++){
				var item = _cheer_arr_R[i];
				if((item.text == a || item.alias == a) && item.x == nX)
				{
					//console.log("find red:"+item.text);
					return item.y;
				}
			}
		}
		else if(type == 1)
		{
			for(i=0; i< _cheer_arr_B.length; i++){
				var item = _cheer_arr_B[i];
				if((item.text == a || item.alias == a) && item.x == nX)
				{
					//console.log("find black:"+item.text);
					return item.y;
				}
			}

		}
        return -1;
	}

	var _getBXPosition = function(b){
		var table = {"一":1, "二":2, "三":3, "四":4,"五":5, "六":6,"七":7, "八":8,"九":9};
		for(var key in  table){
            if(key == b){
               return 9 - table[key] + 1;
			}
		}
		//BUG-fix, 注意网站中的数字可能是特殊的字符(下面的转换中的key,并非真正键盘录入的数字)
		var table2 = {"１":1, "２":2, "３":3, "４":4,"５":5, "６":6,"７":7, "８":8,"９":9};
		for(var key2 in  table2){
            if(key2 == b){
               return table2[key2];
			}
		}

		//普通的数字
		var table3 = {"1":1, "2":2, "3":3, "4":4,"5":5, "6":6,"7":7, "8":8,"9":9};
		for(var key3 in  table3){
            if(key3 == b){
               return table3[key3];
			}
		}

		//TODO: 特殊位置的特殊走法，如2兵

       return b;
	}

	var _getDYPosition = function(d){
		var table = {"一":1, "二":2, "三":3, "四":4,"五":5, "六":6,"七":7, "八":8,"九":9};
		for(var key in  table){
            if(key == d){
               return table[key];
			}
		}
		var table2 = {"１":1, "２":2, "３":3, "４":4,"５":5, "６":6,"７":7, "８":8,"９":9};
		for(var key2 in  table2){
            if(key2 == d){
               return table2[key2];
			}
		}

		var table3 = {"1":1, "2":2, "3":3, "4":4,"5":5, "6":6,"7":7, "8":8,"9":9};
		for(var key3 in  table3){
            if(key3 == d){
               return table3[key3];
			}
		}	
       return d;
	}

	var _getStartPositoin = function(a,b, type){
		var nX = _getBXPosition(b);
		var nY = _getYPosition(a, nX, type);
		return {x:nX, y:nY};       
	}
	var _moveChess = function(step){
		// 1. 找到要移动的棋子， 2. 改变棋子的坐标， 3.目标位置如果有棋子则将该棋子吃掉
		var type = step%2; //0-Red, 1-Black
		var str = global_ChessLog[step];
		var a = str.substring(0,1);
		var b = str.substring(1,2);
		var c = str.substring(2,3);
		var d = str.substring(3);

		var startPoint = _getStartPositoin(a,b,type); //找到待走棋子的起始坐标
		if(startPoint.x == -1 || startPoint.y==-1){
            return;
		}
		var destPos = null;
		if(a == "马"){
			destPos = _findeHorseNextPos(startPoint, c, d, type);	
			_ctx.fillText(a+" "+destPos.x+","+destPos.y, 10,81);
		}else if( a == "炮" || a == "车"){
			destPos = _findePaoOrCheNextPos(startPoint,c,d, type);
			 _ctx.fillText(a+" "+destPos.x+","+destPos.y, 10,81);
		}else if( a == "卒" || a == "兵"){
			destPos = _findeBingOrZuNextPos(startPoint,c,d, type);
			_ctx.fillText(a+" "+destPos.x+","+destPos.y, 10,81);
		}else if( a == "象" || a == "相"){
			destPos = _findXiangNextPos(startPoint,c,d, type);
			_ctx.fillText(a+" "+destPos.x+","+destPos.y, 10,81);
		}else if(a == "士" || a == "仕"){
			destPos = _findShiNextPos(startPoint,c,d, type);
			_ctx.fillText(a+" "+destPos.x+","+destPos.y, 10,81);
		}else if(a == "帅" || a == "将"){
			destPos = _findePaoOrCheNextPos(startPoint,c,d, type);
			 _ctx.fillText(a+" "+destPos.x+","+destPos.y, 10,81);
		}

		var o1 = _findChessObjectbyPos(startPoint.x, startPoint.y);  //寻找原始位置的棋子
		if(o1 == null){
			return;
		}
		_ctx.fillText(o1.text, 10,51);
		_ctx.fillText(o1.x+","+o1.y, 10,61);
		if(destPos !=null){
			var o2 = _findChessObjectbyPos(destPos.x, destPos.y);   //寻找目标位置的棋子
			if(o2 != null){
				o2.alive = false;// 目标位置已有棋子，则吃子
			}
			//更新棋子的坐标
	         o1.x = destPos.x;
		     o1.y = destPos.y;
		}
	}

    this.makeFrame = function (time){ 
        _dbg(time); 
		drawBoard();
		_index = _time%global_ChessLog.length;
		if(_index == 0){
			_reSetAllChessPositon();
		}
		
		if(time%10==9){
			_moveChess(_index);
			_time++;
		}
        _init_chess();
	}
	
	this.getCurrentStepLog = function(){
		return global_ChessLog[_index];
	}

	this.setChessLog = function (strChessLog){ 
		global_ChessLog = strChessLog.split(" "); //将棋谱字符串转化为棋谱组
		_index = 0;
		_time = 0;
	}
	
	var global_ChessLog; //象棋棋谱数组, var global_ChessLog = ["马八进七","卒3进１","炮二平四", "炮8平４", "马二进一","马８进７", "炮八进7"];

}//End of CPlxCChessBoard defination

var oPlxChess = new CPlxCChessBoard();
//https://www.xqbase.com/xqbase/?gameid=1575  许银川VS吕钦
var strLog = "相三进五 卒７进１ 马八进七 马８进７ 炮八平九 马２进３ 车九平八 车１平２ 兵七进一 车９进１ 马二进三 炮２进５ 兵三进一 卒７进１ 相五进三 象３进５ 马七进六 炮２平８ 车八进九 马3退2 炮九平二 车９平４ 炮二进二 车４进３ 仕四进五 马７进６ 马六进四 车４平６ 车一平四 车６进５ 帅五平四 卒３进１ 兵七进一 象５进３ 马三进四 马２进４ 炮二退二 炮８平９";
oPlxChess.setChessLog(strLog);

//此接口用于给上层Java调用程序设置棋谱
function setChessLogWrapper(strlog) {
    oPlxChess.setChessLog(strlog);
}

