const tag = "[plx12.js_v0.424]";
var v1 = bl$("id_div_4_Plx1_v1");
v1.innerHTML = tag+new Date;
//* 
v1.g = new classFrame( );
v1.g.initGame();
v1.g.startGame();
//*/

function classFrame(){    
  const _tag = "[classFrame]";
  var   xx = 0;
  var   yy = 0;
  var _curNO = 0;
  var curFrame = new CFrame(0,1);  
  var bXdTest = false;
  var myGameArea = { 
    setXdTextOnOff: function(){
      bXdTest = bXdTest?false:true;
    },
    runDbg: function(){
        blo0.ondraw(this);  
    },
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.canvas.style.backgroundColor = "grey";
        this.context = this.canvas.getContext("2d");

        v1.appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 20);

        this.canvas.addEventListener('mousedown', function (e) {
              var x = myGameArea.x = e.offsetX;//e.pageX;
              var y = myGameArea.y = e.offsetY;// e.pageY;  
              blo0.toCtxMousedown(x,y);

              if(e.button==2){                          
                    for(i in curFrame.objects){                   
                      curFrame.objects[i].reset();                  
                    }     
              }
              else{
                    for(i in curFrame.objects){
                      var b = curFrame.objects[i].clicked(myGameArea);
                      if(b){
                        curFrame.objects[i].dbgShow();
                        break;
                      } 
                    }
              }              
        });

        this.canvas.addEventListener('mouseup', function (e) { 
          myGameArea.x = e.offsetX;//e.pageX;
          myGameArea.y = e.offsetY;// e.pageY;
        });

        this.canvas.addEventListener('mousemove', function (e) { 
          xx = e.offsetX;//e.pageX;
          yy = e.offsetY;// e.pageY;
        });
        this.canvas.addEventListener('contextmenu', function(e) {
          //alert("You've tried to open context menu"); //here you draw your own menu
          e.preventDefault();
        }, false);
    },
    redrawStage : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var ctx = this.context;
        ctx.fillStyle = "grey";
        ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
        
        ctx.fillStyle = "brown";
        ctx.fillText(_tag +"[" + xx + ","+yy + "]", 40,20);
    },
    setWH: function(_w,_h){
      this.canvas.width = _w;
      this.canvas.height = _h;
    },
    xdText: function(_txt,_x,_y,_w,_h,_c1,_c2){
        if(!bXdTest) return;
        var ctx = this.context;
        var d = 22;
        ctx.fillStyle = _c1;
        ctx.fillRect(_x-d,_y-d,_w,_h);
        
        ctx.fillStyle = _c2;
        ctx.fillText(_txt, _x,_y);
    },
    drawListOfSprites: function(_sp){
      var ctx = this.context; 
      ctx.fillStyle = "green";
      var x = 50;
      var y = 50;
      var w = 100;
      var h = 100;
      ctx.font= 33 + "px Comic Sans MS";
      ctx.fillRect(x,y,w,h);
      ctx.fillStyle = "white";
      var s = _sp.i + ": " + _sp.listSrites.length;
      ctx.fillText(s, x,y);

      ctx.fillText(_sp.markText, x+150,y);

    }
  } 
  
  function CFrame(number,time){
      var _NO = 0;
      this.number = number;
      this.time   = time;
      this.objects = [];
      this.backgroundColor = "123,45,200";

      this.onDraw = function(ga){        

        var ctx = ga.context;
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,20,20);
        ctx.fillText( this.number++, 30,10);
        ctx.fillText( ga.x, 130,10);

        for(i in this.objects){
          this.objects[i].update();
        }

      }
      this.toDo = function(){
        this.number++;
        for(i in this.objects){
          this.objects[i].x++;
          this.objects[i].text = "number="+this.number;
        }
      }
  }

  function sprite(txt,width, height, clr, x, y) {
    this.text = txt;
    this.x = x;
    this.y = y;    
    this.size = 50;
    this.color= "125,1,1"; 

    var _c = clr; 
    var _width = width;
    var _height = height; 
    this.test = function(_this,_oBass){ 
      var dd = blo0.blDiv(_oBass,_oBass.id+"id_mdiv_test_in-sprite", "[Editor]", blGrey[5]);
      dd.tb = blo0.blDiv(dd,dd.id+"tb","tb",blGrey[0]);
      dd.v = blo0.blDiv(dd,dd.id+"v","",blGrey[0]);
      const ta = blo0.blTextarea(dd.v,dd.v.id+"ta",_this.text,blGrey[1]);
      ta.style.width = "95%";
      ta.style.height = "95px";
      var b1 = blo0.blBtn(dd.tb,dd.tb.id+"b1","[set: text]",blGrey[1]);
      b1.onclick = function(){
        _this.text = ta.value;
      }

      _on_off_div(null,dd);       
    }
    this.tellPlxMng = function(){ 
        if(blo0.tellPlxMng){
          blo0.tellPlxMng(this);
        }
    }
    this.reset = function(){ 
        _c= "red";
    }
    this.dbgShow = function(){ 
      var ds = this.text; 
      ds += "[" + this.x + "," + this.y + "] "; 
      bl$("id_4_debug").innerHTML = ds;
    }
    this.update = function(){ 
        var ctx = myGameArea.context;
        ctx.fillStyle = _c;
        ctx.fillRect(this.x, this.y, _width, _height);
        ctx.fillText(this.text, this.x, this.y);
    }
    this.clicked = function(a) {
      var myleft = this.x;
      var myright = this.x + _width;
      var mytop = this.y;
      var mybottom = this.y + _height;
      var rClick = true;
            
      if ((mybottom < a.y) || (mytop > a.y) ||
          (myright < a.x) || (myleft > a.x)) 
      {
        rClick = false;
        if(_c == "yellow"){
          this.x =  a.x;
          this.y =  a.y;      
        }
        _c = "red";        
      }
      else{
        rClick = true;
        _c = "yellow";     
        this.tellPlxMng();     
      } 
      return rClick;
    }; 
  }

  function updateGameArea() {
    myGameArea.redrawStage(); 
    myGameArea.runDbg();

    curFrame.onDraw(myGameArea);    

    _curNO++;
    var go = blo0.showFrame2PlxMng; 
    if(go){   
             go(_curNO,myGameArea);        
    } 
    
  }

  this.initGame = function () { 
    var w = 1280;
    var h = 1024;
    var tb = blo0.blDiv(v1, v1.id + "tb","tb",blGrey[1]);
    var b1 = blo0.blBtn(tb,tb.id + "b1","b1",blGrey[2]);
    var btn_760x480 = blo0.blBtn(tb,tb.id + "btn_760x480","760x480",blGrey[2]);
    var btn_1280x1024 = blo0.blBtn(tb,tb.id + "btn_1280x1024","1280x1024",blGrey[2]);
    var btn_createJSON = blo0.blBtn(tb,tb.id + "btn_createJSON","createJSON",blGrey[2]);
    var btn_setXdText = blo0.blBtn(tb,tb.id + "btn_setXdText","dbg",blGrey[2]);
    btn_setXdText.onclick = function(){
      myGameArea.setXdTextOnOff();
      var b = this;
      b.style.background = b.style.background==blColor[4]?blGrey[5]:blColor[4];  
    }
    
   
    var d1 = blo0.blDiv(v1, "id_4_debug","d1",blGrey[3]);
    b1.onclick = function(){
      if(!b1.i) b1.i = 0;
      b1.i++;
      var d = new Date;
      d1.innerHTML = d.getMilliseconds();
      var x = d.getMilliseconds()/3;
      var y = d.getMilliseconds()%100;
      var sp = new sprite("sp" + b1.i, 20, 20, "green", x, y);
      curFrame.objects.push(sp);
    }
    btn_760x480.onclick = function(){     
      myGameArea.setWH(760,480);
    }
    btn_1280x1024.onclick = function(){    
      myGameArea.setWH(1280,1024);
    }
    btn_createJSON.onclick = function(){
      var s = "2";
      var o = {};
      var r = {};
      var fs = [];
      o.request = r;
      r.version = "v0. 22";
      r.width   = w;
      r.height  = h;
      r.music   = "1.mp3";
      r.rate    = "1";
      r.frames  = fs; 
 
      for(var i=0;i<121;i++){
        var f = new CFrame(i+1,1);
        
        //* 
        for(j in curFrame.objects){
          var sp = new sprite("xxx", 20, 20, "green", 
                    curFrame.objects[j].x+10*i, curFrame.objects[j].y+10*i);
          sp.text = "spite " + i + "=text!";
          f.objects.push(sp);  
        }
        //*/

        fs.push(f);
        curFrame.toDo();         
      }     
      
      s =   JSON.stringify(o);
      bl$("id_ta_4_script_editor").value = s;
    }
  };

  this.startGame = function () {   
      myGameArea.start();  
  };  
}

