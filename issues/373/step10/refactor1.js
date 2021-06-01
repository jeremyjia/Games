function CRefactorChessBoard(){
  this.dbgText = function(ctx){
    ctx.fillText("v0.234",10, 10);
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

  // 画棋子形状
  this.drawPiece = function(_this,e){
    _this.ctx.beginPath();
    _this.ctx.fillStyle =e.bgcolor;
    _this.ctx.strokeStyle = e.bgColor_b;
    _this.ctx.lineWidth =2;
    _this.ctx.arc(e.x*_this.chunk, e.y*_this.chunk, _this.radius, 0, Math.PI * 2, true);
    _this.ctx.closePath();
    _this.ctx.fill();
    _this.ctx.stroke();
  }

  // 画棋子文字
  this.drawChessText = function(_this,e){
    _this.ctx.font = "bold 30px Courier New";
    _this.ctx.fillStyle = e.color;
    var offset = _this.ctx.measureText(e.text).width/2;
    _this.ctx.fillText(e.text, e.x*_this.chunk-offset, e.y*_this.chunk+10);
  }

  // 棋子初始化
  this.drawAllChesses = function(_this){
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
    _this.cheer_arr_B = [Car_b1,Horse_b1,Elephant_b1,Scholar_b1,Boss_b,Scholar_b2,Elephant_b2,Horse_b2,Car_b2,
    Cannon_b1,Cannon_b2,Soldier_b1,Soldier_b2,Soldier_b3,Soldier_b4,Soldier_b5];
    _this.cheer_arr_R = [Car_r1,Horse_r1,Elephant_r1,Scholar_r1,Boss_r,Scholar_r2,Elephant_r2,Horse_r2,Car_r2,
    Cannon_r1,Cannon_r2,Soldier_r1,Soldier_r2,Soldier_r3,Soldier_r4,Soldier_r5];
    var that = _this;
    $.each(_this.cheer_arr_B,function(i,e){ 
      e.color = "#000";
      e.bgcolor = "#fff";
      e.bgColor_b = "#000";
      e.type = "black";
      that.drawPiece(that,e);
      that.drawChessText(that,e);
    });
    $.each(_this.cheer_arr_R,function(i,e){ 
      e.color = "#f00";
      e.bgcolor = "#fff";
      e.bgColor_b = "#f00";
      e.type = "red";
      that.drawPiece(that,e);
      that.drawChessText(that,e);
    });
    _this.cheer_arr_ALL = _this.cheer_arr_B.concat(_this.cheer_arr_R); 
  }

  // 增加点击事件
this.addEvent = function(_this){
  var that = _this;
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
      that.drawChecked(that,p);
      that.preChess = ee;
      that.drawCandidate(that);
      that.checked = true;
     }else if(that.preChess.x == ee.x&&that.preChess.y == ee.y){
  //      console.log("点在原棋子上");
      that.updateChess(that);
      that.checked = false;
     }else if(that.preChess.type == ee.type){
  //      console.log("切换棋子");
      that.updateChess(that);
      that.drawChecked(that,p);
      that.preChess = ee;
      that.drawCandidate(that);
     }else{
      // 是否能吃子
      if(that.Eat_rule(that,i,j)){
        that.eat(that,ii,ee,i,j);
      }else if(that.preChess.text == "帅"){ // 对将
      if(that.preChess.x == i){
       var canEat =true;
       $.each(that.cheer_arr_ALL,function(iii,eee){
       if(eee.x ==that.preChess.x&&eee.y==j){
        if(eee.text == "将"){
        for(var t=that.preChess.y-1;t>j;t--){
         if(that.inArray(that,that,that.preChess.x,t)){
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
       that.eat(that,ii,ee,i,j);
       }
      }
      }else if(that.preChess.text == "将"){
      if(that.preChess.x == i){
       var canEat =true;
       $.each(that.cheer_arr_ALL,function(iii,eee){
       if(eee.x ==that.preChess.x&&eee.y==j){
        if(eee.text == "帅"){
        for(var t=that.preChess.y+1;t<j;t++){
         if(that.inArray(that,that.preChess.x,t)){
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
       that.eat(that,ii,ee,i,j);
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
     if(that.checked&&that.Move_rule(that,i,j)){
  //     console.log("移动棋子");
     that.move(that,i,j);
     }
    }
    }
   }
   }
  });
  }

  
 // 记谱
 this.note = function(that,ee,i,j){    
    var distance = Math.abs(ee.y-j);
    var step;
    if(ee.type=="red"){
    $("#currActive").text("黑方");
    var oldP = that.text_arr[ee.x-1];
    var newP = that.text_arr[i-1];
    var num = that.text_arr[9-distance];
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
    that.steps.push(step); 
  }

  // 是否结束
  this.isOver = function(ee){
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
  this.eat = function(that,ii,ee,i,j){ 
    that.cheer_arr_ALL.splice(ii,1);
    that.move(that,i,j);
    if(that.isOver(ee)){
      that.ctx.clearRect(0,0,canvas.width,canvas.height);
      that.init();
      return false;
    };
  }

    
  // 移动
  this.move = function(that,i,j){  
    $.each(that.cheer_arr_ALL,function(iii,eee){
      if(eee.x ==that.preChess.x&&eee.y==that.preChess.y){
        that.note(that,eee,i,j);
        eee.x= i;
        eee.y = j;
        that.currActive = eee.type=="red"?"black":"red";
        return false;
      }
    });
    that.updateChess(that);
    that.checked = false;
  }

    // 画选中棋子状态
  this.drawChecked = function(that,p){
    var temp_x = p.x*that.chunk;
    var temp_y = p.y*that.chunk;
    that.ctx.beginPath();
    that.ctx.strokeStyle = "#00f";
    that.ctx.lineWidth =1;
    that.ctx.moveTo(temp_x-that.radius,temp_y-that.radius+10);
    that.ctx.lineTo(temp_x-that.radius,temp_y-that.radius);
    that.ctx.lineTo(temp_x-that.radius+10,temp_y-that.radius);
    that.ctx.moveTo(temp_x-that.radius,temp_y+that.radius-10);
    that.ctx.lineTo(temp_x-that.radius,temp_y+that.radius);
    that.ctx.lineTo(temp_x-that.radius+10,temp_y+that.radius);
    that.ctx.moveTo(temp_x+that.radius,temp_y-that.radius+10);
    that.ctx.lineTo(temp_x+that.radius,temp_y-that.radius);
    that.ctx.lineTo(temp_x+that.radius-10,temp_y-that.radius);
    that.ctx.moveTo(temp_x+that.radius,temp_y+that.radius-10);
    that.ctx.lineTo(temp_x+that.radius,temp_y+that.radius);
    that.ctx.lineTo(temp_x+that.radius-10,temp_y+that.radius);
    that.ctx.stroke();
    that.ctx.closePath(); 
  }

  // 画候选位置
this.drawCandidate = function(that){ 
  switch(that.preChess.text){
   case "車":
   var temp_y = that.preChess.y;
   while(!that.inArray(that,that.preChess.x,++temp_y)&&temp_y<=10){
    that.drawCircleOfCandidate(that,that.preChess.x,temp_y);
   }
   var temp_y = that.preChess.y;
   while(!that.inArray(that,that.preChess.x,--temp_y)&&temp_y>0){
    that.drawCircleOfCandidate(that,that.preChess.x,temp_y);
   }
   var temp_x = that.preChess.x;
   while(!that.inArray(that,++temp_x,that.preChess.y)&&temp_x<10){
    that.drawCircleOfCandidate(that,temp_x,that.preChess.y);
   }
   var temp_x = that.preChess.x;
   while(!that.inArray(that,--temp_x,that.preChess.y)&&temp_x>0){
    that.drawCircleOfCandidate(that,temp_x,that.preChess.y);
   }
   break;
   case "馬":
   if(!that.inArray(that,that.preChess.x-2,that.preChess.y-1)
   &&that.preChess.x-2>=1&&that.preChess.y-1>=1
   &&!that.inArray(that,that.preChess.x-1,that.preChess.y)){
    that.drawCircleOfCandidate(that,that.preChess.x-2,that.preChess.y-1);
   }
   if(!that.inArray(that,that.preChess.x-1,that.preChess.y-2)
   &&that.preChess.x-1>=1&&that.preChess.y-2>=1
   &&!that.inArray(that,that.preChess.x,that.preChess.y-1)){
    that.drawCircleOfCandidate(that,that.preChess.x-1,that.preChess.y-2);
   }
   if(!that.inArray(that,that.preChess.x+1,that.preChess.y-2)
   &&that.preChess.x+1<=9&&that.preChess.y-2>=1
   &&!that.inArray(that,that.preChess.x,that.preChess.y-1)){
    that.drawCircleOfCandidate(that,that.preChess.x+1,that.preChess.y-2);
   }
   if(!that.inArray(that,that.preChess.x+2,that.preChess.y-1)
   &&that.preChess.x+2<=9&&that.preChess.y-1>=1
   &&!that.inArray(that,that.preChess.x+1,that.preChess.y)){
    that.drawCircleOfCandidate(that,that.preChess.x+2,that.preChess.y-1);
   }
   if(!that.inArray(that,that.preChess.x+2,that.preChess.y+1)
   &&that.preChess.x+2<=9&&that.preChess.y+1<=10
   &&!that.inArray(that,that.preChess.x+1,that.preChess.y)){
    that.drawCircleOfCandidate(that,that.preChess.x+2,that.preChess.y+1);
   }
   if(!that.inArray(that,that.preChess.x+1,that.preChess.y+2)
   &&that.preChess.x+1<=9&&that.preChess.y+2<=10
   &&!that.inArray(that,that.preChess.x,that.preChess.y+1)){
    that.drawCircleOfCandidate(that,that.preChess.x+1,that.preChess.y+2);
   }
   if(!that.inArray(that,that.preChess.x-1,that.preChess.y+2)
   &&that.preChess.x-1>=1&&that.preChess.y+2<=10
   &&!that.inArray(that,that.preChess.x,that.preChess.y+1)){
    that.drawCircleOfCandidate(that,that.preChess.x-1,that.preChess.y+2);
   }
   if(!that.inArray(that,that.preChess.x-2,that.preChess.y+1)
   &&that.preChess.x-2>=1&&that.preChess.y+1<=10
   &&!that.inArray(that,that.preChess.x-1,that.preChess.y)){
    that.drawCircleOfCandidate(that,that.preChess.x-2,that.preChess.y+1);
   }
   break;
   case "相":
   if(that.preChess.y==10){
    if(!that.inArray(that,that.preChess.x-2,that.preChess.y-2)
    &&!that.inArray(that,that.preChess.x-1,that.preChess.y-1)){
    that.drawCircleOfCandidate(that,that.preChess.x-2,that.preChess.y-2);
    }
    if(!that.inArray(that,that.preChess.x+2,that.preChess.y-2)
    &&!that.inArray(that,that.preChess.x+1,that.preChess.y-1)){
    that.drawCircleOfCandidate(that,that.preChess.x+2,that.preChess.y-2);
    }
   }else if(that.preChess.y==6){
    if(!that.inArray(that,that.preChess.x-2,that.preChess.y+2)
    &&!that.inArray(that,that.preChess.x-1,that.preChess.y+1)){
    that.drawCircleOfCandidate(that,that.preChess.x-2,that.preChess.y+2);
    }
    if(!that.inArray(that,that.preChess.x+2,that.preChess.y+2)
    &&!that.inArray(that,that.preChess.x+1,that.preChess.y+1)){
    that.drawCircleOfCandidate(that,that.preChess.x+2,that.preChess.y+2);
    }
   }else if(that.preChess.x==1){
    if(!that.inArray(that,that.preChess.x+2,that.preChess.y-2)
    &&!that.inArray(that,that.preChess.x+1,that.preChess.y-1)){
    that.drawCircleOfCandidate(that,that.preChess.x+2,that.preChess.y-2);
    }
    if(!that.inArray(that,that.preChess.x+2,that.preChess.y+2)
    &&!that.inArray(that,that.preChess.x+1,that.preChess.y+1)){
    that.drawCircleOfCandidate(that,that.preChess.x+2,that.preChess.y+2);
    }
   }else if(that.preChess.x==9){
    if(!that.inArray(that,that.preChess.x-2,that.preChess.y-2)
    &&!that.inArray(that,that.preChess.x-1,that.preChess.y-1)){
    that.drawCircleOfCandidate(that,that.preChess.x-2,that.preChess.y-2);
    }
    if(!that.inArray(that,that.preChess.x-2,that.preChess.y+2)
    &&!that.inArray(that,that.preChess.x-1,that.preChess.y+1)){
    that.drawCircleOfCandidate(that,that.preChess.x-2,that.preChess.y+2);
    }
   }else{
    if(!that.inArray(that,that.preChess.x+2,that.preChess.y-2)
    &&!that.inArray(that,that.preChess.x+1,that.preChess.y-1)){
    that.drawCircleOfCandidate(that,that.preChess.x+2,that.preChess.y-2);
    }
    if(!that.inArray(that,that.preChess.x+2,that.preChess.y+2)
    &&!that.inArray(that,that.preChess.x+1,that.preChess.y+1)){
    that.drawCircleOfCandidate(that,that.preChess.x+2,that.preChess.y+2);
    }
    if(!that.inArray(that,that.preChess.x-2,that.preChess.y-2)
    &&!that.inArray(that,that.preChess.x-1,that.preChess.y-1)){
    that.drawCircleOfCandidate(that,that.preChess.x-2,that.preChess.y-2);
    }
    if(!that.inArray(that,that.preChess.x-2,that.preChess.y+2)
    &&!that.inArray(that,that.preChess.x-1,that.preChess.y+1)){
    that.drawCircleOfCandidate(that,that.preChess.x-2,that.preChess.y+2);
    }
   }
   break;
   case "象":
   if(that.preChess.y==1){
    if(!that.inArray(that,that.preChess.x-2,that.preChess.y+2)
    &&!that.inArray(that,that.preChess.x-1,that.preChess.y+1)){
    that.drawCircleOfCandidate(that,that.preChess.x-2,that.preChess.y+2);
    }
    if(!that.inArray(that,that.preChess.x+2,that.preChess.y+2)
    &&!that.inArray(that,that.preChess.x+1,that.preChess.y+1)){
    that.drawCircleOfCandidate(that,that.preChess.x+2,that.preChess.y+2);
    }
   }else if(that.preChess.y==5){
    if(!that.inArray(that,that.preChess.x-2,that.preChess.y-2)
    &&!that.inArray(that,that.preChess.x-1,that.preChess.y-1)){
    that.drawCircleOfCandidate(that,that.preChess.x-2,that.preChess.y-2);
    }
    if(!that.inArray(that,that.preChess.x+2,that.preChess.y-2)
    &&!that.inArray(that,that.preChess.x+1,that.preChess.y-1)){
    that.drawCircleOfCandidate(that,that.preChess.x+2,that.preChess.y-2);
    }
   }else if(that.preChess.x==1){
    if(!that.inArray(that,that.preChess.x+2,that.preChess.y-2)
    &&!that.inArray(that,that.preChess.x+1,that.preChess.y-1)){
    that.drawCircleOfCandidate(that,that.preChess.x+2,that.preChess.y-2);
    }
    if(!that.inArray(that,that.preChess.x+2,that.preChess.y+2)
    &&!that.inArray(that,that.preChess.x+1,that.preChess.y+1)){
    that.drawCircleOfCandidate(that,that.preChess.x+2,that.preChess.y+2);
    }
   }else if(that.preChess.x==9){
    if(!that.inArray(that,that.preChess.x-2,that.preChess.y-2)
    &&!that.inArray(that,that.preChess.x-1,that.preChess.y-1)){
    that.drawCircleOfCandidate(that,that.preChess.x-2,that.preChess.y-2);
    }
    if(!that.inArray(that,that.preChess.x-2,that.preChess.y+2)
    &&!that.inArray(that,that.preChess.x-1,that.preChess.y+1)){
    that.drawCircleOfCandidate(that,that.preChess.x-2,that.preChess.y+2);
    }
   }else{
    if(!that.inArray(that,that.preChess.x+2,that.preChess.y-2)
    &&!that.inArray(that,that.preChess.x+1,that.preChess.y-1)){
    that.drawCircleOfCandidate(that,that.preChess.x+2,that.preChess.y-2);
    }
    if(!that.inArray(that,that.preChess.x+2,that.preChess.y+2)
    &&!that.inArray(that,that.preChess.x+1,that.preChess.y+1)){
    that.drawCircleOfCandidate(that,that.preChess.x+2,that.preChess.y+2);
    }
    if(!that.inArray(that,that.preChess.x-2,that.preChess.y-2)
    &&!that.inArray(that,that.preChess.x-1,that.preChess.y-1)){
    that.drawCircleOfCandidate(that,that.preChess.x-2,that.preChess.y-2);
    }
    if(!that.inArray(that,that.preChess.x-2,that.preChess.y+2)
    &&!that.inArray(that,that.preChess.x-1,that.preChess.y+1)){
    that.drawCircleOfCandidate(that,that.preChess.x-2,that.preChess.y+2);
    }
   }
   break;
   case "仕":
   if(that.preChess.x==5&&that.preChess.y==9){
    if(!that.inArray(that,that.preChess.x-1,that.preChess.y-1)){
    that.drawCircleOfCandidate(that,that.preChess.x-1,that.preChess.y-1);
    }
    if(!that.inArray(that,that.preChess.x-1,that.preChess.y+1)){
    that.drawCircleOfCandidate(that,that.preChess.x-1,that.preChess.y+1);
    }
    if(!that.inArray(that,that.preChess.x+1,that.preChess.y-1)){
    that.drawCircleOfCandidate(that,that.preChess.x+1,that.preChess.y-1);
    }
    if(!that.inArray(that,that.preChess.x+1,that.preChess.y+1)){
    that.drawCircleOfCandidate(that,that.preChess.x+1,that.preChess.y+1);
    }
   }else{
    that.drawCircleOfCandidate(that,5,9);
   }
   break;
   case "士":
   if(that.preChess.x==5&&that.preChess.y==2){
    if(!that.inArray(that,that.preChess.x-1,that.preChess.y-1)){
    that.drawCircleOfCandidate(that,that.preChess.x-1,that.preChess.y-1);
    }
    if(!that.inArray(that,that.preChess.x-1,that.preChess.y+1)){
    that.drawCircleOfCandidate(that,that.preChess.x-1,that.preChess.y+1);
    }
    if(!that.inArray(that,that.preChess.x+1,that.preChess.y-1)){
    that.drawCircleOfCandidate(that,that.preChess.x+1,that.preChess.y-1);
    }
    if(!that.inArray(that,that.preChess.x+1,that.preChess.y+1)){
    that.drawCircleOfCandidate(that,that.preChess.x+1,that.preChess.y+1);
    }
   }else{
    that.drawCircleOfCandidate(that,5,2);
   }
   break;
   case "帅":
   if(!that.inArray(that,that.preChess.x,that.preChess.y-1)&&that.preChess.y>8){
    that.drawCircleOfCandidate(that,that.preChess.x,that.preChess.y-1);
   }
   if(!that.inArray(that,that.preChess.x,that.preChess.y+1)&&that.preChess.y<10){
    that.drawCircleOfCandidate(that,that.preChess.x,that.preChess.y+1);
   }
   if(!that.inArray(that,that.preChess.x-1,that.preChess.y)&&that.preChess.x>4){
    that.drawCircleOfCandidate(that,that.preChess.x-1,that.preChess.y);
   }
   if(!that.inArray(that,that.preChess.x+1,that.preChess.y)&&that.preChess.x<6){
    that.drawCircleOfCandidate(that,that.preChess.x+1,that.preChess.y);
   }
   break;
   case "将":
   if(!that.inArray(that,that.preChess.x,that.preChess.y-1)&&that.preChess.y>1){
    that.drawCircleOfCandidate(that,that.preChess.x,that.preChess.y-1);
   }
   if(!that.inArray(that,that.preChess.x,that.preChess.y+1)&&that.preChess.y<3){
    that.drawCircleOfCandidate(that,that.preChess.x,that.preChess.y+1);
   }
   if(!that.inArray(that,that.preChess.x-1,that.preChess.y)&&that.preChess.x>4){
    that.drawCircleOfCandidate(that,that.preChess.x-1,that.preChess.y);
   }
   if(!that.inArray(that,that.preChess.x+1,that.preChess.y)&&that.preChess.x<6){
    that.drawCircleOfCandidate(that,that.preChess.x+1,that.preChess.y);
   }
   break;
   case "兵":
   if(that.preChess.y>5&&!that.inArray(that,that.preChess.x,that.preChess.y-1)){
    that.drawCircleOfCandidate(that,that.preChess.x,that.preChess.y-1);
   }else if(that.preChess.y<=5){
    if(!that.inArray(that,that.preChess.x,that.preChess.y-1)&&that.preChess.y>1){
    that.drawCircleOfCandidate(that,that.preChess.x,that.preChess.y-1);
    }
    if(!that.inArray(that,that.preChess.x-1,that.preChess.y)&&that.preChess.x>1){
    that.drawCircleOfCandidate(that,that.preChess.x-1,that.preChess.y);
    }
    if(!that.inArray(that,that.preChess.x+1,that.preChess.y)&&that.preChess.x<9){
    that.drawCircleOfCandidate(that,that.preChess.x+1,that.preChess.y);
    }
   }
   break;
   case "卒":
   if(that.preChess.y<=5&&!that.inArray(that,that.preChess.x,that.preChess.y+1)){
    that.drawCircleOfCandidate(that,that.preChess.x,that.preChess.y+1);
   }else if(that.preChess.y>5){
    if(!that.inArray(that,that.preChess.x,that.preChess.y+1)&&that.preChess.y<10){
    that.drawCircleOfCandidate(that,that.preChess.x,that.preChess.y+1);
    }
    if(!that.inArray(that,that.preChess.x-1,that.preChess.y)&&that.preChess.x>1){
    that.drawCircleOfCandidate(that,that.preChess.x-1,that.preChess.y);
    }
    if(!that.inArray(that,that.preChess.x+1,that.preChess.y)&&that.preChess.x<9){
    that.drawCircleOfCandidate(that,that.preChess.x+1,that.preChess.y);
    }
   }
   break;
   case "炮":
   var temp_y = that.preChess.y;
   while(!that.inArray(that,that.preChess.x,++temp_y)&&temp_y<=10){
    that.drawCircleOfCandidate(that,that.preChess.x,temp_y);
   }
   var temp_y = that.preChess.y;
   while(!that.inArray(that,that.preChess.x,--temp_y)&&temp_y>0){
    that.drawCircleOfCandidate(that,that.preChess.x,temp_y);
   }
   var temp_x = that.preChess.x;
   while(!that.inArray(that,++temp_x,that.preChess.y)&&temp_x<10){
    that.drawCircleOfCandidate(that,temp_x,that.preChess.y);
   }
   var temp_x = that.preChess.x;
   while(!that.inArray(that,--temp_x,that.preChess.y)&&temp_x>0){
    that.drawCircleOfCandidate(that,temp_x,that.preChess.y);
   }
   break;
  }
  }

  // 画候选形状
  this.drawCircleOfCandidate = function(that,x,y){ 
    that.ctx.beginPath();
    that.ctx.fillStyle ="#eee";
    that.ctx.strokeStyle = "#000";
    that.ctx.lineWidth =2;
    that.ctx.arc(x*that.chunk, y*that.chunk, that.CandidateCircleR, 0, Math.PI * 2, true);

    //  that.ctx.translate(x*that.chunk,y*that.chunk);
    //  that.ctx.rotate(45*Math.PI/180);
    //  that.ctx.translate(1*that.chunk,1*that.chunk);//设置画布上的(0,0)位置，也就是旋转的中心点
    //   that.ctx.rotate(1*Math.PI/180);
    //       that.ctx.fillRect(x*that.chunk-5,y*that.chunk-5,10,10);

    that.ctx.closePath();
    that.ctx.fill();
    that.ctx.stroke();
  }

  
  // 棋子移动规则
  this.Move_rule = function(that,i,j){ 
    switch(that.preChess.text){
      case "車":
      return that.rule_Car(that,i,j);
      case "馬":
      return that.rule_Horse(that,i,j); 
      case "相":
      return that.rule_Elephant_r(that,i,j);
      case "象":
      return that.rule_Elephant_b(that,i,j);
      case "仕":
      return that.rule_Scholar_r(that,i,j);
      case "士":
      return that.rule_Scholar_b(that,i,j);
      case "帅":
      return that.rule_Boss_r(that,i,j);
      case "将":
      return that.rule_Boss_b(that,i,j);
      case "兵":
      return that.rule_Soldier_r(that,i,j);
      case "卒":
      return that.rule_Soldier_b(that,i,j);
      case "炮":
      if(that.rule_Cannon(that,i,j)==0){
        return true;
      }
      return false;
    }
  }
  
  // 棋子吃子规则
  this.Eat_rule = function(that,i,j){
    switch(that.preChess.text){
      case "車":
      return that.rule_Car(that,i,j);
      case "馬":
      return that.rule_Horse(that,i,j); 
      case "相":
      return that.rule_Elephant_r(that,i,j);
      case "象":
      return that.rule_Elephant_b(that,i,j);
      case "仕":
      return that.rule_Scholar_r(that,i,j);
      case "士":
      return that.rule_Scholar_b(that,i,j);
      case "帅":
      return that.rule_Boss_r(that,i,j);
      case "将":
      return that.rule_Boss_b(that,i,j);
      case "兵":
      return that.rule_Soldier_r(that,i,j);
      case "卒":
      return that.rule_Soldier_b(that,i,j);
      case "炮":
      if(that.rule_Cannon(that,i,j)==1){
        return true;
      }
      return false;
    }
  }

  // 車的规则
  this.rule_Car = function(that,i,j){
    if(that.preChess.x ==i||that.preChess.y==j){
    if(that.preChess.x ==i){
    if(that.preChess.y<j){
    //    console.log("下");
      var hasObstacle = false;
      for(var p = that.preChess.y+1;p<j;p++){
      if(that.inArray(that,i,p)){
      hasObstacle = true;
      break;
      }
      }
      if(hasObstacle){
      return false;
      }
    }
    if(that.preChess.y>j){
    //    console.log("上");
      var hasObstacle = false;
      for(var p = that.preChess.y-1;p>j;p--){
      if(that.inArray(that,i,p)){
      hasObstacle = true;
      break;
      }
      }
      if(hasObstacle){
      return false;
      }
    }
    }
    if(that.preChess.y ==j){
    if(that.preChess.x <i){
    //    console.log("右");
      var hasObstacle = false;
      for(var p = that.preChess.x+1;p<i;p++){
      if(that.inArray(that,p,j)){
      hasObstacle = true;
      break;
      }
      }
      if(hasObstacle){
      return false;
      }
    }
    if(that.preChess.x >i){
    //    console.log("左");
      var hasObstacle = false;
      for(var p = that.preChess.x-1;p>i;p--){
      if(that.inArray(that,p,j)){
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
  this.rule_Horse = function(that,i,j){
    var hasObstacle = false; 
    if((Math.abs(that.preChess.x-i)==1&&Math.abs(that.preChess.y-j)==2)
    ||(Math.abs(that.preChess.x-i)==2&&Math.abs(that.preChess.y-j)==1)){
    if(that.preChess.x-i==2){ // 左
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

  
  // 炮的规则
  this.rule_Cannon = function(that,i,j){ 
    if(that.preChess.x ==i||that.preChess.y==j){
    var t =0;
    if(that.preChess.x ==i){
    var temp = that.preChess.y;
    if(temp<j){
      while(++temp!=j){
      $.each(that.cheer_arr_ALL,function(ii,ee){
      if(ee.x ==that.preChess.x&&ee.y==temp){
      t++;
      return false;
      }
      });
      }
      return t;
    }else{
      while(--temp!=j){
      $.each(that.cheer_arr_ALL,function(ii,ee){
      if(ee.x ==that.preChess.x&&ee.y==temp){
      t++;
      return false;
      }
      });
      }
      return t;
    }
    }else{
    var temp = that.preChess.x;
    if(temp<i){
      while(++temp!=i){
      $.each(that.cheer_arr_ALL,function(ii,ee){
      if(ee.x ==temp&&ee.y==that.preChess.y){
      t++;
      return false;
      }
      });
      }
      return t;
    }else{
      while(--temp!=i){
      $.each(that.cheer_arr_ALL,function(ii,ee){
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

  
// 红相的规则
this.rule_Elephant_r = function(that,i,j){
  var hasObstacle = false; 
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
  this.rule_Elephant_b = function(that,i,j){
  var hasObstacle = false; 
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
this.rule_Scholar_r = function(that,i,j){
  if(that.preChess.x==5&&that.preChess.y==9){
   if(Math.abs(that.preChess.x-i)==1&&Math.abs(that.preChess.y-j)==1){
   return true;
   }
  }else if(i==5&&j==9){
   return true;
  }
  return false;
  }
  // 黑仕的规则
  this.rule_Scholar_b = function(that,i,j){
  if(that.preChess.x==5&&that.preChess.y==2){
   if(Math.abs(that.preChess.x-i)==1&&Math.abs(that.preChess.y-j)==1){
   return true;
   }
  }else if(i==5&&j==2){
   return true;
  }
  return false;
  }

  
// 帅的规则
this.rule_Boss_r = function(that,i,j){
  if((Math.abs(that.preChess.x-i)==1&&that.preChess.y==j)
  ||(that.preChess.x==i&&Math.abs(that.preChess.y-j)==1)){
   if(i>=4&&i<=6&&j>=8&&j<=10){
   return true;
   }else{
   return false;
   }
  }
  return false;
  }
  // 将的规则
  this.rule_Boss_b = function(that,i,j){
  if((Math.abs(that.preChess.x-i)==1&&that.preChess.y==j)
  ||(that.preChess.x==i&&Math.abs(that.preChess.y-j)==1)){
   if(i>=4&&i<=6&&j>=1&&j<=3){
   return true;
   }else{
   return false;
   }
  }
  return false;
  }

  // 兵的规则
this.rule_Soldier_r = function(that,i,j){
  if(that.preChess.y<=5){
   if((that.preChess.x ==i&&that.preChess.y-1==j)||(that.preChess.x-1 ==i&&that.preChess.y==j)||(that.preChess.x+1 ==i&&that.preChess.y==j)){
   return true;
   }
  }else{
   if(that.preChess.x ==i&&that.preChess.y-1==j){
   return true;
   }
  }
  return false;
  }
  // 卒的规则
  this.rule_Soldier_b = function(that,i,j){
  if(that.preChess.y>5){
   if((that.preChess.x ==i&&that.preChess.y+1==j)||(that.preChess.x-1 ==i&&that.preChess.y==j)||(that.preChess.x+1 ==i&&that.preChess.y==j)){
   return true;
   }
  }else{
   if(that.preChess.x ==i&&that.preChess.y+1==j){
   return true;
   }
  }
  return false;
  }

  this.inArray = function(that,x,y){  
    var hasObstacle = false;
    $.each(that.cheer_arr_ALL,function(ii,ee){
      if(ee.x ==x&&ee.y==y){
        hasObstacle = true;
        return false;
      }
    });
    return hasObstacle;
  }

  // 更新棋局
this.updateChess = function(that){ 
  that.ctx.clearRect(0,0,canvas.width,canvas.height);
  that.drawBoard(that);
  $.each(that.cheer_arr_ALL,function(i,e){   
    that.drawPiece(that,e);
    that.drawChessText(that,e);
  });
  $("#ul").empty();
  $.each(that.steps,function(iii,eee){
    $("#ul").append("<li>"+eee+"</li>");
  });
} 

  // 初始化
  this.init = function(that,args){
    var canvas = document.getElementById("canvas");
    that.ctx = canvas.getContext("2d");
    //  that.chunk =args&&args.chunk?args.chunk:50; 
    //  that.radius =args&&args.radius?args.radius:23; 
    //  that.CandidateCircleR =args&&args.ccr?args.ccr:5;
    that.radius = 23;
    that.chunk =50;
    that.CandidateCircleR = 5;
    $("#currActive").text("红方");
    that.steps = [];      // 记录步骤
    that.currActive = "red";  // 先下
    that.drawBoard(that);
    that.drawAllChesses(that);
    $(canvas).unbind();
    that.addEvent(that);
  } 


}
var obj = new CRefactorChessBoard();
obj.init(obj);
//  obj.init({
//  chunk:50, // 格子大小
//  radius:23, // 棋子半径
//  ccr:3   // 候选小圆半径
//  });

