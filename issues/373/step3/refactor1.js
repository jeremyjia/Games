function CRefactorChessBoard(){
  this.dbgText = function(ctx){
    ctx.fillText("v0.45",10, 10);
  }

  // 画楚河/漢界
  this.pbzDrawText = function(_this){    
    _this.ctx.font = "bold 30px Courier New";
    _this.ctx.fillStyle = "#000";
    _this.ctx.fillText("楚 河", _this.chunk*2, _this.chunk*5+_this.chunk/2+10);
    _this.ctx.fillText("漢 界", _this.chunk*6, _this.chunk*5+_this.chunk/2+10);
    _this.ctx.font = "12px Courier New";
    _this.text_arr =["九","八","七","六","五","四","三","二","一"];
    for(var i=0;i<9;i++){
      _this.ctx.fillText((i+1).toString(), _this.chunk*(i+1)-5, 20);
      _this.ctx.fillText(_this.text_arr[i], _this.chunk*(i+1)-5,_this.chunk*10+30+10);
    }
  }

  // 画横线
  this.pbzDrawRowLine = function(_this){
    for(var i =1;i<=10;i++){
      _this.drawLine(_this,1,i,9,i);
    }
  } 

  // 画竖线
  this.pbzDrawColLine = function(_this){
    for(var i =1;i<=9;i++){
        _this.drawLine(_this,i,1,i,10);
      }
  }

  // 画#
  this.drawsharpS = function(_this){
    _this.round(_this,2,3);
    _this.round(_this,8,3);
    _this.round(_this,1,4);
    _this.round(_this,3,4);
    _this.round(_this,5,4);
    _this.round(_this,7,4);
    _this.round(_this,9,4);
    _this.round(_this,2,8);
    _this.round(_this,8,8);
    _this.round(_this,1,7);
    _this.round(_this,3,7);
    _this.round(_this,5,7);
    _this.round(_this,7,7);
    _this.round(_this,9,7);
  }
  // 画单个#
  this.round = function(_this,x0,y0){
    var x0 = x0*_this.chunk;
    var y0 = y0*_this.chunk;
    _this.ctx.beginPath();
    _this.ctx.strokeStyle = "#000";
    _this.ctx.lineWidth =1;
    if(x0!=_this.chunk){
    // 左上
    _this.ctx.moveTo(x0-5,y0-10);
    _this.ctx.lineTo(x0-5,y0-5);
    _this.ctx.lineTo(x0-10,y0-5);
    // 左下
    _this.ctx.moveTo(x0-5,y0+10);
    _this.ctx.lineTo(x0-5,y0+5);
    _this.ctx.lineTo(x0-10,y0+5);
    }
    if(x0!=_this.chunk*9){
    // 右上
    _this.ctx.moveTo(x0+5,y0-10);
    _this.ctx.lineTo(x0+5,y0-5);
    _this.ctx.lineTo(x0+10,y0-5);
    // 右下
    _this.ctx.moveTo(x0+5,y0+10);
    _this.ctx.lineTo(x0+5,y0+5);
    _this.ctx.lineTo(x0+10,y0+5);
    }
    _this.ctx.stroke();
    _this.ctx.closePath(); 
  }

  // 画直线
  this.drawLine = function(_this,x0,y0,x1,y1,lw){
      var x0 = x0*_this.chunk;
      var y0 = y0*_this.chunk;
      var x1 = x1*_this.chunk;
      var y1 = y1*_this.chunk;
      _this.ctx.beginPath();
      _this.ctx.strokeStyle = "#000";
      _this.ctx.lineWidth =lw?lw:1;
      _this.ctx.moveTo(x0,y0);
      _this.ctx.lineTo(x1,y1);
      _this.ctx.stroke();
      _this.ctx.closePath();
  }

  // 画X
  this.drawX = function(_this){
    _this.drawLine(_this,4,1,6,3,0.5);
    _this.drawLine(_this,4,3,6,1,0.5);
    _this.drawLine(_this,4,8,6,10,0.5);
    _this.drawLine(_this,4,10,6,8,0.5);
  }

  // 棋盘初始化
  this.drawBoard = function(_this){ 
    _this.pbzDrawRowLine(_this);
    _this.pbzDrawColLine(_this);
    _this.ctx.clearRect(_this.chunk+1, _this.chunk*5+1, _this.chunk*8-2, _this.chunk-2);
    _this.drawsharpS(_this);
    _this.drawX(_this); 
    _this.pbzDrawText(_this);
    _this.dbgText(_this.ctx);
  }
}


var obj = new CRefactorChessBoard();

// 初始化
obj.init = function(args){
    var canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    //  this.chunk =args&&args.chunk?args.chunk:50; 
    //  this.radius =args&&args.radius?args.radius:23; 
    //  this.CandidateCircleR =args&&args.ccr?args.ccr:5;
    this.radius = 23;
    this.chunk =50;
    this.CandidateCircleR = 5;
    $("#currActive").text("红方");
    this.steps = [];      // 记录步骤
    this.currActive = "red";  // 先下
    this.drawBoard(this);
    //this.init_chess();
    $(canvas).unbind();
    this.addEvent();
}

// 棋子初始化
obj.init_chess = function(){
var Car_b1 = {x:1,y:1,text:"車"}
var Horse_b1 = {x:2,y:1,text:"馬"}
var Elephant_b1 = {x:3,y:1,text:"象"}
var Scholar_b1 = {x:4,y:1,text:"士"}
var Boss_b = {x:5,y:1,text:"将"} 
var Scholar_b2 = {x:6,y:1,text:"士"}
var Elephant_b2 = {x:7,y:1,text:"象"}
var Horse_b2 = {x:8,y:1,text:"馬"}
var Car_b2 = {x:9,y:1,text:"車"}
var Cannon_b1 = {x:2,y:3,text:"炮"}
var Cannon_b2 = {x:8,y:3,text:"炮"}
var Soldier_b1 = {x:1,y:4,text:"卒"}
var Soldier_b2 = {x:3,y:4,text:"卒"}
var Soldier_b3 = {x:5,y:4,text:"卒"}
var Soldier_b4 = {x:7,y:4,text:"卒"}
var Soldier_b5 = {x:9,y:4,text:"卒"}
var Car_r1 = {x:1,y:10,text:"車"}
var Horse_r1 = {x:2,y:10,text:"馬"}
var Elephant_r1 = {x:3,y:10,text:"相"}
var Scholar_r1 = {x:4,y:10,text:"仕"}
var Boss_r = {x:5,y:10,text:"帅"} 
var Scholar_r2 = {x:6,y:10,text:"仕"}
var Elephant_r2 = {x:7,y:10,text:"相"}
var Horse_r2 = {x:8,y:10,text:"馬"}
var Car_r2 = {x:9,y:10,text:"車"}
var Cannon_r1 = {x:2,y:8,text:"炮"}
var Cannon_r2 = {x:8,y:8,text:"炮"}
var Soldier_r1 = {x:1,y:7,text:"兵"}
var Soldier_r2 = {x:3,y:7,text:"兵"}
var Soldier_r3 = {x:5,y:7,text:"兵"}
var Soldier_r4 = {x:7,y:7,text:"兵"}
var Soldier_r5 = {x:9,y:7,text:"兵"}
this.cheer_arr_B = [Car_b1,Horse_b1,Elephant_b1,Scholar_b1,Boss_b,Scholar_b2,Elephant_b2,Horse_b2,Car_b2,
Cannon_b1,Cannon_b2,Soldier_b1,Soldier_b2,Soldier_b3,Soldier_b4,Soldier_b5];
this.cheer_arr_R = [Car_r1,Horse_r1,Elephant_r1,Scholar_r1,Boss_r,Scholar_r2,Elephant_r2,Horse_r2,Car_r2,
Cannon_r1,Cannon_r2,Soldier_r1,Soldier_r2,Soldier_r3,Soldier_r4,Soldier_r5];
var that = this;
$.each(this.cheer_arr_B,function(i,e){ 
 e.color = "#000";
 e.bgcolor = "#fff";
 e.bgColor_b = "#000";
 e.type = "black";
 that.drawPiece(e);
 that.drawChessText(e);
});
$.each(this.cheer_arr_R,function(i,e){ 
 e.color = "#f00";
 e.bgcolor = "#fff";
 e.bgColor_b = "#f00";
 e.type = "red";
 that.drawPiece(e);
 that.drawChessText(e);
});
this.cheer_arr_ALL = this.cheer_arr_B.concat(this.cheer_arr_R); 
}
// 更新棋局
obj.updateChess = function(){
this.ctx.clearRect(0,0,canvas.width,canvas.height);
this.drawBoard(this);
var that = this;
$.each(this.cheer_arr_ALL,function(i,e){   
 that.drawPiece(e);
 that.drawChessText(e);
});
$("#ul").empty();
$.each(this.steps,function(iii,eee){
 $("#ul").append("<li>"+eee+"</li>");
});
} 
 
// 画棋子形状
obj.drawPiece = function(e){
this.ctx.beginPath();
this.ctx.fillStyle =e.bgcolor;
this.ctx.strokeStyle = e.bgColor_b;
this.ctx.lineWidth =2;
     this.ctx.arc(e.x*this.chunk, e.y*this.chunk, this.radius, 0, Math.PI * 2, true);
     this.ctx.closePath();
     this.ctx.fill();
     this.ctx.stroke();
}
// 画棋子文字
obj.drawChessText = function(e){
this.ctx.font = "bold 30px Courier New";
  this.ctx.fillStyle = e.color;
  var offset = this.ctx.measureText(e.text).width/2;
  this.ctx.fillText(e.text, e.x*this.chunk-offset, e.y*this.chunk+10);
}
// 增加点击事件
obj.addEvent = function(){
var that = this;
this.checked = false;
$(canvas).on("mousedown",function(ev){
 for(var j=1;j<=10;j++){
 for(var i=1;i<=9;i++){
  var temp_i = i*that.chunk;
  var temp_j = j*that.chunk;
  var distanct = Math.sqrt(Math.pow(temp_i-ev.offsetX,2)+Math.pow(temp_j-ev.offsetY,2));
  if(distanct<=that.radius){
  var overChess = false;
  $.each(that.cheer_arr_ALL,function(ii,ee){
   if(ee.x ==i&&ee.y==j){
   overChess = true;
   var p ={x:ee.x,y:ee.y};
//     console.log(that.checked); 
   if(that.currActive != ee.type&&!that.checked){
    return false;
   }
   if(!that.checked){
//      console.log("选中一个棋子");
    that.drawChecked(p);
    that.preChess = ee;
    that.drawCandidate();
    that.checked = true;
   }else if(that.preChess.x == ee.x&&that.preChess.y == ee.y){
//      console.log("点在原棋子上");
    that.updateChess();
    that.checked = false;
   }else if(that.preChess.type == ee.type){
//      console.log("切换棋子");
    that.updateChess();
    that.drawChecked(p);
    that.preChess = ee;
    that.drawCandidate();
   }else{
    // 是否能吃子
    if(that.Eat_rule(i,j)){
    that.eat(ii,ee,i,j);
    }else if(that.preChess.text == "帅"){ // 对将
    if(that.preChess.x == i){
     var canEat =true;
     $.each(that.cheer_arr_ALL,function(iii,eee){
     if(eee.x ==that.preChess.x&&eee.y==j){
      if(eee.text == "将"){
      for(var t=that.preChess.y-1;t>j;t--){
       if(that.inArray(that.preChess.x,t)){
       canEat = false;
       break;
       }
      }
      }else{
      canEat = false;
      }
      return false;
     }
     });
     if(canEat){
     that.eat(ii,ee,i,j);
     }
    }
    }else if(that.preChess.text == "将"){
    if(that.preChess.x == i){
     var canEat =true;
     $.each(that.cheer_arr_ALL,function(iii,eee){
     if(eee.x ==that.preChess.x&&eee.y==j){
      if(eee.text == "帅"){
      for(var t=that.preChess.y+1;t<j;t++){
       if(that.inArray(that.preChess.x,t)){
       canEat = false;
       break;
       }
      }
      }else{
      canEat = false;
      }
      return false;
     }
     });
     if(canEat){
     that.eat(ii,ee,i,j);
     }
    }
    }
   } 
   return false;
   }
  });
  if(overChess){
//     alert("点在棋子上");
  }else{
   // 是否能移动
   if(that.checked&&that.Move_rule(i,j)){
//     console.log("移动棋子");
   that.move(i,j);
   }
  }
  }
 }
 }
});
}
// 记谱
obj.note = function(ee,i,j){
var distance = Math.abs(ee.y-j);
var step;
if(ee.type=="red"){
 $("#currActive").text("黑方");
 var oldP = this.text_arr[ee.x-1];
 var newP = this.text_arr[i-1];
 var num = this.text_arr[9-distance];
 if(j<ee.y){
 if(ee.x == i){
  console.log(ee.text+oldP+"进"+num);
  step = ee.text+oldP+"进"+num;
 }else{
  console.log(ee.text+oldP+"进"+newP);
  step = ee.text+oldP+"进"+newP;
 }
 }else if(j>ee.y){
 if(ee.x == i){
  console.log(ee.text+oldP+"退"+num);
  step = ee.text+oldP+"退"+num;
 }else{
  console.log(ee.text+oldP+"退"+newP);
  step = ee.text+oldP+"退"+newP;
 }
 }else{
 console.log(ee.text+oldP+"平"+newP);
 step = ee.text+oldP+"平"+newP;
 }
}else{
 $("#currActive").text("红方");
 if(j>ee.y){
 if(ee.x == i){
  console.log(ee.text+ee.x+"进"+distance);
  step = ee.text+ee.x+"进"+distance
 }else{
  console.log(ee.text+ee.x+"进"+i);
  step = ee.text+ee.x+"进"+i;
 }
 }else if(j<ee.y){
 if(ee.x == i){
  console.log(ee.text+ee.x+"退"+distance);
  step = ee.text+ee.x+"退"+distance;
 }else{
  console.log(ee.text+ee.x+"退"+i);
  step = ee.text+ee.x+"退"+i;
 }
 }else{
 console.log(ee.text+ee.x+"平"+i);
 step = ee.text+ee.x+"平"+i;
 } 
}
this.steps.push(step); 
}
// 是否结束
obj.isOver = function(ee){
if(ee.text == "将"){
 alert("you win");
 $("#ul").empty();
 return true;
}else if(ee.text == "帅"){
 alert("you lose");
 $("#ul").empty();
 return true;
}else{
 return false;
}
}
// 吃子
obj.eat = function(ii,ee,i,j){
this.cheer_arr_ALL.splice(ii,1);
this.move(i,j);
if(this.isOver(ee)){
 this.ctx.clearRect(0,0,canvas.width,canvas.height);
 this.init();
 return false;
};
}
// 移动
obj.move = function(i,j){
var that = this;
$.each(that.cheer_arr_ALL,function(iii,eee){
 if(eee.x ==that.preChess.x&&eee.y==that.preChess.y){
 that.note(eee,i,j);
 eee.x= i;
 eee.y = j;
 that.currActive = eee.type=="red"?"black":"red";
 return false;
 }
});
that.updateChess();
that.checked = false;
}
// 画选中棋子状态
obj.drawChecked = function(p){
var temp_x = p.x*this.chunk;
var temp_y = p.y*this.chunk;
this.ctx.beginPath();
this.ctx.strokeStyle = "#00f";
this.ctx.lineWidth =1;
this.ctx.moveTo(temp_x-this.radius,temp_y-this.radius+10);
this.ctx.lineTo(temp_x-this.radius,temp_y-this.radius);
this.ctx.lineTo(temp_x-this.radius+10,temp_y-this.radius);
this.ctx.moveTo(temp_x-this.radius,temp_y+this.radius-10);
this.ctx.lineTo(temp_x-this.radius,temp_y+this.radius);
this.ctx.lineTo(temp_x-this.radius+10,temp_y+this.radius);
this.ctx.moveTo(temp_x+this.radius,temp_y-this.radius+10);
this.ctx.lineTo(temp_x+this.radius,temp_y-this.radius);
this.ctx.lineTo(temp_x+this.radius-10,temp_y-this.radius);
this.ctx.moveTo(temp_x+this.radius,temp_y+this.radius-10);
this.ctx.lineTo(temp_x+this.radius,temp_y+this.radius);
this.ctx.lineTo(temp_x+this.radius-10,temp_y+this.radius);
this.ctx.stroke();
this.ctx.closePath(); 
}
// 画候选位置
obj.drawCandidate = function(){
switch(this.preChess.text){
 case "車":
 var temp_y = this.preChess.y;
 while(!this.inArray(this.preChess.x,++temp_y)&&temp_y<=10){
  this.drawCandidateCircle(this.preChess.x,temp_y);
 }
 var temp_y = this.preChess.y;
 while(!this.inArray(this.preChess.x,--temp_y)&&temp_y>0){
  this.drawCandidateCircle(this.preChess.x,temp_y);
 }
 var temp_x = this.preChess.x;
 while(!this.inArray(++temp_x,this.preChess.y)&&temp_x<10){
  this.drawCandidateCircle(temp_x,this.preChess.y);
 }
 var temp_x = this.preChess.x;
 while(!this.inArray(--temp_x,this.preChess.y)&&temp_x>0){
  this.drawCandidateCircle(temp_x,this.preChess.y);
 }
 break;
 case "馬":
 if(!this.inArray(this.preChess.x-2,this.preChess.y-1)
 &&this.preChess.x-2>=1&&this.preChess.y-1>=1
 &&!this.inArray(this.preChess.x-1,this.preChess.y)){
  this.drawCandidateCircle(this.preChess.x-2,this.preChess.y-1);
 }
 if(!this.inArray(this.preChess.x-1,this.preChess.y-2)
 &&this.preChess.x-1>=1&&this.preChess.y-2>=1
 &&!this.inArray(this.preChess.x,this.preChess.y-1)){
  this.drawCandidateCircle(this.preChess.x-1,this.preChess.y-2);
 }
 if(!this.inArray(this.preChess.x+1,this.preChess.y-2)
 &&this.preChess.x+1<=9&&this.preChess.y-2>=1
 &&!this.inArray(this.preChess.x,this.preChess.y-1)){
  this.drawCandidateCircle(this.preChess.x+1,this.preChess.y-2);
 }
 if(!this.inArray(this.preChess.x+2,this.preChess.y-1)
 &&this.preChess.x+2<=9&&this.preChess.y-1>=1
 &&!this.inArray(this.preChess.x+1,this.preChess.y)){
  this.drawCandidateCircle(this.preChess.x+2,this.preChess.y-1);
 }
 if(!this.inArray(this.preChess.x+2,this.preChess.y+1)
 &&this.preChess.x+2<=9&&this.preChess.y+1<=10
 &&!this.inArray(this.preChess.x+1,this.preChess.y)){
  this.drawCandidateCircle(this.preChess.x+2,this.preChess.y+1);
 }
 if(!this.inArray(this.preChess.x+1,this.preChess.y+2)
 &&this.preChess.x+1<=9&&this.preChess.y+2<=10
 &&!this.inArray(this.preChess.x,this.preChess.y+1)){
  this.drawCandidateCircle(this.preChess.x+1,this.preChess.y+2);
 }
 if(!this.inArray(this.preChess.x-1,this.preChess.y+2)
 &&this.preChess.x-1>=1&&this.preChess.y+2<=10
 &&!this.inArray(this.preChess.x,this.preChess.y+1)){
  this.drawCandidateCircle(this.preChess.x-1,this.preChess.y+2);
 }
 if(!this.inArray(this.preChess.x-2,this.preChess.y+1)
 &&this.preChess.x-2>=1&&this.preChess.y+1<=10
 &&!this.inArray(this.preChess.x-1,this.preChess.y)){
  this.drawCandidateCircle(this.preChess.x-2,this.preChess.y+1);
 }
 break;
 case "相":
 if(this.preChess.y==10){
  if(!this.inArray(this.preChess.x-2,this.preChess.y-2)
  &&!this.inArray(this.preChess.x-1,this.preChess.y-1)){
  this.drawCandidateCircle(this.preChess.x-2,this.preChess.y-2);
  }
  if(!this.inArray(this.preChess.x+2,this.preChess.y-2)
  &&!this.inArray(this.preChess.x+1,this.preChess.y-1)){
  this.drawCandidateCircle(this.preChess.x+2,this.preChess.y-2);
  }
 }else if(this.preChess.y==6){
  if(!this.inArray(this.preChess.x-2,this.preChess.y+2)
  &&!this.inArray(this.preChess.x-1,this.preChess.y+1)){
  this.drawCandidateCircle(this.preChess.x-2,this.preChess.y+2);
  }
  if(!this.inArray(this.preChess.x+2,this.preChess.y+2)
  &&!this.inArray(this.preChess.x+1,this.preChess.y+1)){
  this.drawCandidateCircle(this.preChess.x+2,this.preChess.y+2);
  }
 }else if(this.preChess.x==1){
  if(!this.inArray(this.preChess.x+2,this.preChess.y-2)
  &&!this.inArray(this.preChess.x+1,this.preChess.y-1)){
  this.drawCandidateCircle(this.preChess.x+2,this.preChess.y-2);
  }
  if(!this.inArray(this.preChess.x+2,this.preChess.y+2)
  &&!this.inArray(this.preChess.x+1,this.preChess.y+1)){
  this.drawCandidateCircle(this.preChess.x+2,this.preChess.y+2);
  }
 }else if(this.preChess.x==9){
  if(!this.inArray(this.preChess.x-2,this.preChess.y-2)
  &&!this.inArray(this.preChess.x-1,this.preChess.y-1)){
  this.drawCandidateCircle(this.preChess.x-2,this.preChess.y-2);
  }
  if(!this.inArray(this.preChess.x-2,this.preChess.y+2)
  &&!this.inArray(this.preChess.x-1,this.preChess.y+1)){
  this.drawCandidateCircle(this.preChess.x-2,this.preChess.y+2);
  }
 }else{
  if(!this.inArray(this.preChess.x+2,this.preChess.y-2)
  &&!this.inArray(this.preChess.x+1,this.preChess.y-1)){
  this.drawCandidateCircle(this.preChess.x+2,this.preChess.y-2);
  }
  if(!this.inArray(this.preChess.x+2,this.preChess.y+2)
  &&!this.inArray(this.preChess.x+1,this.preChess.y+1)){
  this.drawCandidateCircle(this.preChess.x+2,this.preChess.y+2);
  }
  if(!this.inArray(this.preChess.x-2,this.preChess.y-2)
  &&!this.inArray(this.preChess.x-1,this.preChess.y-1)){
  this.drawCandidateCircle(this.preChess.x-2,this.preChess.y-2);
  }
  if(!this.inArray(this.preChess.x-2,this.preChess.y+2)
  &&!this.inArray(this.preChess.x-1,this.preChess.y+1)){
  this.drawCandidateCircle(this.preChess.x-2,this.preChess.y+2);
  }
 }
 break;
 case "象":
 if(this.preChess.y==1){
  if(!this.inArray(this.preChess.x-2,this.preChess.y+2)
  &&!this.inArray(this.preChess.x-1,this.preChess.y+1)){
  this.drawCandidateCircle(this.preChess.x-2,this.preChess.y+2);
  }
  if(!this.inArray(this.preChess.x+2,this.preChess.y+2)
  &&!this.inArray(this.preChess.x+1,this.preChess.y+1)){
  this.drawCandidateCircle(this.preChess.x+2,this.preChess.y+2);
  }
 }else if(this.preChess.y==5){
  if(!this.inArray(this.preChess.x-2,this.preChess.y-2)
  &&!this.inArray(this.preChess.x-1,this.preChess.y-1)){
  this.drawCandidateCircle(this.preChess.x-2,this.preChess.y-2);
  }
  if(!this.inArray(this.preChess.x+2,this.preChess.y-2)
  &&!this.inArray(this.preChess.x+1,this.preChess.y-1)){
  this.drawCandidateCircle(this.preChess.x+2,this.preChess.y-2);
  }
 }else if(this.preChess.x==1){
  if(!this.inArray(this.preChess.x+2,this.preChess.y-2)
  &&!this.inArray(this.preChess.x+1,this.preChess.y-1)){
  this.drawCandidateCircle(this.preChess.x+2,this.preChess.y-2);
  }
  if(!this.inArray(this.preChess.x+2,this.preChess.y+2)
  &&!this.inArray(this.preChess.x+1,this.preChess.y+1)){
  this.drawCandidateCircle(this.preChess.x+2,this.preChess.y+2);
  }
 }else if(this.preChess.x==9){
  if(!this.inArray(this.preChess.x-2,this.preChess.y-2)
  &&!this.inArray(this.preChess.x-1,this.preChess.y-1)){
  this.drawCandidateCircle(this.preChess.x-2,this.preChess.y-2);
  }
  if(!this.inArray(this.preChess.x-2,this.preChess.y+2)
  &&!this.inArray(this.preChess.x-1,this.preChess.y+1)){
  this.drawCandidateCircle(this.preChess.x-2,this.preChess.y+2);
  }
 }else{
  if(!this.inArray(this.preChess.x+2,this.preChess.y-2)
  &&!this.inArray(this.preChess.x+1,this.preChess.y-1)){
  this.drawCandidateCircle(this.preChess.x+2,this.preChess.y-2);
  }
  if(!this.inArray(this.preChess.x+2,this.preChess.y+2)
  &&!this.inArray(this.preChess.x+1,this.preChess.y+1)){
  this.drawCandidateCircle(this.preChess.x+2,this.preChess.y+2);
  }
  if(!this.inArray(this.preChess.x-2,this.preChess.y-2)
  &&!this.inArray(this.preChess.x-1,this.preChess.y-1)){
  this.drawCandidateCircle(this.preChess.x-2,this.preChess.y-2);
  }
  if(!this.inArray(this.preChess.x-2,this.preChess.y+2)
  &&!this.inArray(this.preChess.x-1,this.preChess.y+1)){
  this.drawCandidateCircle(this.preChess.x-2,this.preChess.y+2);
  }
 }
 break;
 case "仕":
 if(this.preChess.x==5&&this.preChess.y==9){
  if(!this.inArray(this.preChess.x-1,this.preChess.y-1)){
  this.drawCandidateCircle(this.preChess.x-1,this.preChess.y-1);
  }
  if(!this.inArray(this.preChess.x-1,this.preChess.y+1)){
  this.drawCandidateCircle(this.preChess.x-1,this.preChess.y+1);
  }
  if(!this.inArray(this.preChess.x+1,this.preChess.y-1)){
  this.drawCandidateCircle(this.preChess.x+1,this.preChess.y-1);
  }
  if(!this.inArray(this.preChess.x+1,this.preChess.y+1)){
  this.drawCandidateCircle(this.preChess.x+1,this.preChess.y+1);
  }
 }else{
  this.drawCandidateCircle(5,9);
 }
 break;
 case "士":
 if(this.preChess.x==5&&this.preChess.y==2){
  if(!this.inArray(this.preChess.x-1,this.preChess.y-1)){
  this.drawCandidateCircle(this.preChess.x-1,this.preChess.y-1);
  }
  if(!this.inArray(this.preChess.x-1,this.preChess.y+1)){
  this.drawCandidateCircle(this.preChess.x-1,this.preChess.y+1);
  }
  if(!this.inArray(this.preChess.x+1,this.preChess.y-1)){
  this.drawCandidateCircle(this.preChess.x+1,this.preChess.y-1);
  }
  if(!this.inArray(this.preChess.x+1,this.preChess.y+1)){
  this.drawCandidateCircle(this.preChess.x+1,this.preChess.y+1);
  }
 }else{
  this.drawCandidateCircle(5,2);
 }
 break;
 case "帅":
 if(!this.inArray(this.preChess.x,this.preChess.y-1)&&this.preChess.y>8){
  this.drawCandidateCircle(this.preChess.x,this.preChess.y-1);
 }
 if(!this.inArray(this.preChess.x,this.preChess.y+1)&&this.preChess.y<10){
  this.drawCandidateCircle(this.preChess.x,this.preChess.y+1);
 }
 if(!this.inArray(this.preChess.x-1,this.preChess.y)&&this.preChess.x>4){
  this.drawCandidateCircle(this.preChess.x-1,this.preChess.y);
 }
 if(!this.inArray(this.preChess.x+1,this.preChess.y)&&this.preChess.x<6){
  this.drawCandidateCircle(this.preChess.x+1,this.preChess.y);
 }
 break;
 case "将":
 if(!this.inArray(this.preChess.x,this.preChess.y-1)&&this.preChess.y>1){
  this.drawCandidateCircle(this.preChess.x,this.preChess.y-1);
 }
 if(!this.inArray(this.preChess.x,this.preChess.y+1)&&this.preChess.y<3){
  this.drawCandidateCircle(this.preChess.x,this.preChess.y+1);
 }
 if(!this.inArray(this.preChess.x-1,this.preChess.y)&&this.preChess.x>4){
  this.drawCandidateCircle(this.preChess.x-1,this.preChess.y);
 }
 if(!this.inArray(this.preChess.x+1,this.preChess.y)&&this.preChess.x<6){
  this.drawCandidateCircle(this.preChess.x+1,this.preChess.y);
 }
 break;
 case "兵":
 if(this.preChess.y>5&&!this.inArray(this.preChess.x,this.preChess.y-1)){
  this.drawCandidateCircle(this.preChess.x,this.preChess.y-1);
 }else if(this.preChess.y<=5){
  if(!this.inArray(this.preChess.x,this.preChess.y-1)&&this.preChess.y>1){
  this.drawCandidateCircle(this.preChess.x,this.preChess.y-1);
  }
  if(!this.inArray(this.preChess.x-1,this.preChess.y)&&this.preChess.x>1){
  this.drawCandidateCircle(this.preChess.x-1,this.preChess.y);
  }
  if(!this.inArray(this.preChess.x+1,this.preChess.y)&&this.preChess.x<9){
  this.drawCandidateCircle(this.preChess.x+1,this.preChess.y);
  }
 }
 break;
 case "卒":
 if(this.preChess.y<=5&&!this.inArray(this.preChess.x,this.preChess.y+1)){
  this.drawCandidateCircle(this.preChess.x,this.preChess.y+1);
 }else if(this.preChess.y>5){
  if(!this.inArray(this.preChess.x,this.preChess.y+1)&&this.preChess.y<10){
  this.drawCandidateCircle(this.preChess.x,this.preChess.y+1);
  }
  if(!this.inArray(this.preChess.x-1,this.preChess.y)&&this.preChess.x>1){
  this.drawCandidateCircle(this.preChess.x-1,this.preChess.y);
  }
  if(!this.inArray(this.preChess.x+1,this.preChess.y)&&this.preChess.x<9){
  this.drawCandidateCircle(this.preChess.x+1,this.preChess.y);
  }
 }
 break;
 case "炮":
 var temp_y = this.preChess.y;
 while(!this.inArray(this.preChess.x,++temp_y)&&temp_y<=10){
  this.drawCandidateCircle(this.preChess.x,temp_y);
 }
 var temp_y = this.preChess.y;
 while(!this.inArray(this.preChess.x,--temp_y)&&temp_y>0){
  this.drawCandidateCircle(this.preChess.x,temp_y);
 }
 var temp_x = this.preChess.x;
 while(!this.inArray(++temp_x,this.preChess.y)&&temp_x<10){
  this.drawCandidateCircle(temp_x,this.preChess.y);
 }
 var temp_x = this.preChess.x;
 while(!this.inArray(--temp_x,this.preChess.y)&&temp_x>0){
  this.drawCandidateCircle(temp_x,this.preChess.y);
 }
 break;
}
}
// 画候选形状
obj.drawCandidateCircle = function(x,y){
this.ctx.beginPath();
this.ctx.fillStyle ="#eee";
this.ctx.strokeStyle = "#000";
this.ctx.lineWidth =2;
     this.ctx.arc(x*this.chunk, y*this.chunk, this.CandidateCircleR, 0, Math.PI * 2, true);

//  this.ctx.translate(x*this.chunk,y*this.chunk);
//  this.ctx.rotate(45*Math.PI/180);
//  this.ctx.translate(1*this.chunk,1*this.chunk);//设置画布上的(0,0)位置，也就是旋转的中心点
//   this.ctx.rotate(1*Math.PI/180);
//       this.ctx.fillRect(x*this.chunk-5,y*this.chunk-5,10,10);

     this.ctx.closePath();
     this.ctx.fill();
     this.ctx.stroke();
}
// 棋子移动规则
obj.Move_rule = function(i,j){
switch(this.preChess.text){
 case "車":
 return this.rule_Car(i,j);
 case "馬":
 return this.rule_Horse(i,j); 
 case "相":
 return this.rule_Elephant_r(i,j);
 case "象":
 return this.rule_Elephant_b(i,j);
 case "仕":
 return this.rule_Scholar_r(i,j);
 case "士":
 return this.rule_Scholar_b(i,j);
 case "帅":
 return this.rule_Boss_r(i,j);
 case "将":
 return this.rule_Boss_b(i,j);
 case "兵":
 return this.rule_Soldier_r(i,j);
 case "卒":
 return this.rule_Soldier_b(i,j);
 case "炮":
 if(this.rule_Cannon(i,j)==0){
  return true;
 }
 return false;
}
}
// 棋子吃子规则
obj.Eat_rule = function(i,j){
switch(this.preChess.text){
 case "車":
 return this.rule_Car(i,j);
 case "馬":
 return this.rule_Horse(i,j); 
 case "相":
 return this.rule_Elephant_r(i,j);
 case "象":
 return this.rule_Elephant_b(i,j);
 case "仕":
 return this.rule_Scholar_r(i,j);
 case "士":
 return this.rule_Scholar_b(i,j);
 case "帅":
 return this.rule_Boss_r(i,j);
 case "将":
 return this.rule_Boss_b(i,j);
 case "兵":
 return this.rule_Soldier_r(i,j);
 case "卒":
 return this.rule_Soldier_b(i,j);
 case "炮":
 if(this.rule_Cannon(i,j)==1){
  return true;
 }
 return false;
}
}
// 車的规则
obj.rule_Car = function(i,j){
if(this.preChess.x ==i||this.preChess.y==j){
 if(this.preChess.x ==i){
 if(this.preChess.y<j){
//    console.log("下");
  var hasObstacle = false;
  for(var p = this.preChess.y+1;p<j;p++){
  if(this.inArray(i,p)){
   hasObstacle = true;
   break;
  }
  }
  if(hasObstacle){
  return false;
  }
 }
 if(this.preChess.y>j){
//    console.log("上");
  var hasObstacle = false;
  for(var p = this.preChess.y-1;p>j;p--){
  if(this.inArray(i,p)){
   hasObstacle = true;
   break;
  }
  }
  if(hasObstacle){
  return false;
  }
 }
 }
 if(this.preChess.y ==j){
 if(this.preChess.x <i){
//    console.log("右");
  var hasObstacle = false;
  for(var p = this.preChess.x+1;p<i;p++){
  if(this.inArray(p,j)){
   hasObstacle = true;
   break;
  }
  }
  if(hasObstacle){
  return false;
  }
 }
 if(this.preChess.x >i){
//    console.log("左");
  var hasObstacle = false;
  for(var p = this.preChess.x-1;p>i;p--){
  if(this.inArray(p,j)){
   hasObstacle = true;
   break;
  }
  }
  if(hasObstacle){
  return false;
  }
 }
 }
 return true;
}
return false;
}
// 馬的规则
obj.rule_Horse = function(i,j){
var hasObstacle = false;
var that = this;
if((Math.abs(this.preChess.x-i)==1&&Math.abs(this.preChess.y-j)==2)
||(Math.abs(this.preChess.x-i)==2&&Math.abs(this.preChess.y-j)==1)){
 if(this.preChess.x-i==2){ // 左
 $.each(that.cheer_arr_ALL,function(ii,ee){
  if(ee.x ==that.preChess.x-1&&ee.y==that.preChess.y){
  hasObstacle =true;
  return false;
  }
 });
 if(hasObstacle){
  return false;
 }
 }else if(i-that.preChess.x==2){ // 右
 $.each(that.cheer_arr_ALL,function(ii,ee){
  if(ee.x ==that.preChess.x+1&&ee.y==that.preChess.y){
  hasObstacle =true;
  return false;
  }
 });
 if(hasObstacle){
  return false;
 }
 }else if(that.preChess.y-j==2){ // 上
 $.each(that.cheer_arr_ALL,function(ii,ee){
  if(ee.x ==that.preChess.x&&ee.y==that.preChess.y-1){
  hasObstacle =true;
  return false;
  }
 });
 if(hasObstacle){
  return false;
 }
 }else if(j-that.preChess.y==2){ // 下
 $.each(that.cheer_arr_ALL,function(ii,ee){
  if(ee.x ==that.preChess.x&&ee.y==that.preChess.y+1){
  hasObstacle =true;
  return false;
  }
 });
 if(hasObstacle){
  return false;
 }
 }
 return true;
}
return false;
}
// 红相的规则
obj.rule_Elephant_r = function(i,j){
var hasObstacle = false;
var that = this;
if((Math.abs(that.preChess.x-i)==2&&Math.abs(that.preChess.y-j)==2)&&j>=6){
 var vgaX = (that.preChess.x+i)/2;
 var vgaY = (that.preChess.y+j)/2;
 console.log(vgaX);
 $.each(that.cheer_arr_ALL,function(ii,ee){
 if(ee.x ==vgaX&&ee.y==vgaY){
  hasObstacle =true;
  return false;
 }
 });
 if(hasObstacle){
 return false;
 }
 return true;
}
return false;
}
// 黑象的规则
obj.rule_Elephant_b = function(i,j){
var hasObstacle = false;
var that = this;
if((Math.abs(that.preChess.x-i)==2&&Math.abs(that.preChess.y-j)==2)&&j<6){
 var vgaX = (that.preChess.x+i)/2;
 var vgaY = (that.preChess.y+j)/2;
//   console.log(vgaX);
 $.each(that.cheer_arr_ALL,function(ii,ee){
 if(ee.x ==vgaX&&ee.y==vgaY){
  hasObstacle =true;
  return false;
 }
 });
 if(hasObstacle){
 return false;
 }
 return true;
}
return false;
}
// 红仕的规则
obj.rule_Scholar_r = function(i,j){
if(this.preChess.x==5&&this.preChess.y==9){
 if(Math.abs(this.preChess.x-i)==1&&Math.abs(this.preChess.y-j)==1){
 return true;
 }
}else if(i==5&&j==9){
 return true;
}
return false;
}
// 黑仕的规则
obj.rule_Scholar_b = function(i,j){
if(this.preChess.x==5&&this.preChess.y==2){
 if(Math.abs(this.preChess.x-i)==1&&Math.abs(this.preChess.y-j)==1){
 return true;
 }
}else if(i==5&&j==2){
 return true;
}
return false;
}
// 帅的规则
obj.rule_Boss_r = function(i,j){
if((Math.abs(this.preChess.x-i)==1&&this.preChess.y==j)
||(this.preChess.x==i&&Math.abs(this.preChess.y-j)==1)){
 if(i>=4&&i<=6&&j>=8&&j<=10){
 return true;
 }else{
 return false;
 }
}
return false;
}
// 将的规则
obj.rule_Boss_b = function(i,j){
if((Math.abs(this.preChess.x-i)==1&&this.preChess.y==j)
||(this.preChess.x==i&&Math.abs(this.preChess.y-j)==1)){
 if(i>=4&&i<=6&&j>=1&&j<=3){
 return true;
 }else{
 return false;
 }
}
return false;
}
// 兵的规则
obj.rule_Soldier_r = function(i,j){
if(this.preChess.y<=5){
 if((this.preChess.x ==i&&this.preChess.y-1==j)||(this.preChess.x-1 ==i&&this.preChess.y==j)||(this.preChess.x+1 ==i&&this.preChess.y==j)){
 return true;
 }
}else{
 if(this.preChess.x ==i&&this.preChess.y-1==j){
 return true;
 }
}
return false;
}
// 卒的规则
obj.rule_Soldier_b = function(i,j){
if(this.preChess.y>5){
 if((this.preChess.x ==i&&this.preChess.y+1==j)||(this.preChess.x-1 ==i&&this.preChess.y==j)||(this.preChess.x+1 ==i&&this.preChess.y==j)){
 return true;
 }
}else{
 if(this.preChess.x ==i&&this.preChess.y+1==j){
 return true;
 }
}
return false;
}
// 炮的规则
obj.rule_Cannon = function(i,j){
var that = this;
if(this.preChess.x ==i||this.preChess.y==j){
 var t =0;
 if(this.preChess.x ==i){
 var temp = this.preChess.y;
 if(temp<j){
  while(++temp!=j){
  $.each(this.cheer_arr_ALL,function(ii,ee){
   if(ee.x ==that.preChess.x&&ee.y==temp){
   t++;
   return false;
   }
  });
  }
  return t;
 }else{
  while(--temp!=j){
  $.each(this.cheer_arr_ALL,function(ii,ee){
   if(ee.x ==that.preChess.x&&ee.y==temp){
   t++;
   return false;
   }
  });
  }
  return t;
 }
 }else{
 var temp = this.preChess.x;
 if(temp<i){
  while(++temp!=i){
  $.each(this.cheer_arr_ALL,function(ii,ee){
   if(ee.x ==temp&&ee.y==that.preChess.y){
   t++;
   return false;
   }
  });
  }
  return t;
 }else{
  while(--temp!=i){
  $.each(this.cheer_arr_ALL,function(ii,ee){
   if(ee.x ==temp&&ee.y==that.preChess.y){
   t++;
   return false;
   }
  });
  }
  return t;
 }
 }
}
return 2;
}
obj.inArray = function(x,y){
var hasObstacle = false;
$.each(this.cheer_arr_ALL,function(ii,ee){
 if(ee.x ==x&&ee.y==y){
 hasObstacle = true;
 return false;
 }
});
return hasObstacle;
}
obj.init();
//  obj.init({
//  chunk:50, // 格子大小
//  radius:23, // 棋子半径
//  ccr:3   // 候选小圆半径
//  });

