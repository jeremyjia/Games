const tag = "[old/plx/ejson.js_v0.0.22]";
var d = bl$("id_MDIV_4_ejson");
//*
    d.tb = blo0.blDiv(d,d.id+"tb", "tb_4_ejson.js",blGrey[1]);
    d.v1 = blo0.blDiv(d,d.id+"v1", tag+"v1", blGrey[0]);
    d.tb.b1 = blo0.blBtn(d.tb,d.tb.id+"b1","b1",blGrey[2]);
    d.tb.b2 = blo0.blBtn(d.tb,d.tb.id+"bb21","b2",blGrey[2]);

    var w = {};
    w._2do = function(txt){
        d.v1.innerHTML = txt;
    } 
    d.tb.b1.onclick = function(){
      blo0.blAjx(w,"https://littleflute.github.io/english/NewConceptEnglish/Book2/1.lrc");
    }
    d.tb.b2.onclick = function(){
      var vj = new _vjClass;
      vj.loadUrl("http://localhost:3000/old/json/v1.json");
      vj.parse(d.v1);
    }
//*/

 function _vjClass () { 
     var url = null;
     var ovj = null;
     
     this.loadUrl = function(_url){  
        url = _url;
        //*
        var w2 = {}; 
        w2._2do = function(txt){
              eval("var o="+txt);
              ovj = o;
        }
        blo0.blAjx(w2,url);
        //*/
     };
     this.parse = function(_v){ 
        var d = _v;
        d.innerHTML = "";
        d.tb = blo0.blDiv(d,d.id+"tb", "tb",blGrey[1]);
        
        d.v0 = blo0.blDiv(d,d.id+"v0", url,blGrey[1]);
        //*
        d.v1 = blo0.blDiv(d,d.id+"v1", "v1",blGrey[1]);
        d.v2 = blo0.blDiv(d,d.id+"v2", "v2",blGrey[1]);
        d.tb.b1 = blo0.blBtn(d.tb,d.tb+"b1","b1",blGrey[2]);
        d.tb.b2 = blo0.blBtn(d.tb,d.tb+"b2","b2_showFrames",blGrey[2]); 
      
        d.tb.b1.onclick = function(){
          _blShowObj2Div(d.v1,ovj.request);
          _on_off_div(this,d.v1);
          this.style.background = this.style.background=="red"?blGrey[5]:blColor[4]; 
        }
        
        d.tb.b2.onclick = function(){
          _blFrames2Div(d.v2,ovj.request.frames);
          _on_off_div(this,d.v2);
          this.style.background = this.style.background=="red"?blGrey[5]:blColor[4]; 
        } 
        //*/
    };
};

var _blShowObj2Div = function (oDivBoss,obj)
{        
    var oBoss = oDivBoss;        
    oBoss.innerHTML = "";    
    for(i in obj)
		{
			  var b = document.createElement("button");
			  b.id = b.innerHTML = i;
			  b.style.backgroundColor = "gray";
			  if(i.charAt(0)=="b"&&i.charAt(1)=="l") b.style.backgroundColor = "yellow";
			  oBoss.appendChild(b);
			  var d = document.createElement("div");
			  d.innerHTML = obj[i];
			  d.style.border = "blue 1px solid";
			  d.style.backgroundColor = "green";
			  d.style.color = "yellow";
			  oBoss.appendChild(d);
			 
			  if(i.charAt(0)=="f"&&i.charAt(1)=="r"&&i.charAt(2)=="a"){ 
          b.style.backgroundColor = "blue";
					d.innerHTML = "Frames";		
			  } 
		}
}  

var _blFrames2Div = function (oFrames,obj)
{        
    var oBoss = oFrames;        
    oBoss.innerHTML = "";    
    for(i in obj)
		{
			  var b = document.createElement("button");
			  b.id = b.innerHTML = i;
        b.style.backgroundColor = "gray";
        b.onclick = function(_oBoss,_this,_oi){
          return function(){
              _ShowFrame_i_in_MD(_oBoss,_this,_oi);
          }
        }(oBoss,b,obj[i]);

        oBoss.appendChild(b);        
		}
}  

var _ShowFrame_i_in_MD = function(_oBoss,_this,_oi){
    var s = "Frame_v0.13: FrameNO." + _this.id;
    var d = blo0.blMD("id_MDIV_4_FrameNO." + _this.id, s, 400,100,500,400, blGrey[5]); 
    
    d.tb = blo0.blDiv(d,d.id+"tb", "tb_Frame_No."+_this.id,blGrey[1]);        
    d.v0 = blo0.blDiv(d,d.id+"v0", "Frame_div",blGrey[1]);
    _parseFrame(d.v0,_oi);

    _on_off_div(_this,d);
    _this.style.background = _this.style.background=="red"?blGrey[5]:blColor[4]; 
}
var _parseFrame = function (oFrames,obj)
{        
    var oBoss = oFrames;        
    oBoss.innerHTML = "";    
    for(i in obj)
		{
			  var b = document.createElement("button");
			  b.id = b.innerHTML = i;
        b.style.backgroundColor = "gray";
        b.onclick = function(_oBoss,_this,_oi){
          return function(){              
            //  alert(_this.id);
          }
        }(oBoss,b,obj[i]);

        oBoss.appendChild(b);   

        var d = document.createElement("div");
        d.innerHTML = obj[i];
        d.id = "FrameNO." + i;
        d.style.border = "blue 1px solid";
        d.style.backgroundColor = "green";
        d.style.color = "yellow";
        if(b.id=="objects"){
          d.innerHTML = "Os";
          d.id = "FrameNO." + i;
          _parseSpritesInFrame(oBoss,d,obj[i]);
        }
        oBoss.appendChild(d); 

		}
}  

var _parseSpritesInFrame = function (oFrame,oSprites,obj)
{        
    var oBoss = oSprites;        
    oBoss.innerHTML = "";    
    for(i in obj)
		{
			  var b = document.createElement("button");
			  b.id = b.innerHTML = i;
        b.style.backgroundColor = "gray";
        b.onclick = function(_oFrame,_oBoss,_this,_oi){
          return function(){       
              _ShowSprite_in_MD(_oFrame,_oBoss,_this,_oi);
          }
        }(oFrame,oBoss,b,obj[i]);

        oBoss.appendChild(b);   
        /*
        var d = document.createElement("div");
        _blShowObj2Div(d,obj[i]);
        d.style.border = "blue 1px solid";
        d.style.backgroundColor = "green";
        d.style.color = "yellow"; 
        oBoss.appendChild(d); 
        //*/

		}
}  

var _ShowSprite_in_MD = function(_oFrame,_oBoss,_this,_oi){
  var s = "Sprite_v0.13:" +  _oFrame.id + "::" + _this.id;
  var d = blo0.blMD("id_MDIV_4_" + _oFrame.id + _this.id, s, 500,100,500,400, blGrey[5]); 
  
  d.tb = blo0.blDiv(d,d.id+"tb", "tb",blGrey[1]);        
  d.v0 = blo0.blDiv(d,d.id+"v0", "v0",blGrey[1]); 
  _blShowObj2Div(d.v0,_oi);

  _on_off_div(_this,d);
  _this.style.background = _this.style.background=="red"?blGrey[5]:blColor[4]; 
}