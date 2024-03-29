// file: blclass.js    by littleflute 

var g_ver_blClass = "CBlClass_v1.5.21"

function myAjaxCmd(method, url, data, callback){
	var xmlHttpReg = null;
	if (window.XMLHttpRequest){
	  xmlHttpReg = new XMLHttpRequest();
	}else{
	  xmlHttpReg = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlHttpReg.onreadystatechange = function (){
	  callback(xmlHttpReg);
	};
	xmlHttpReg.open(method, url, true);
	if(method == "PATCH" || method == "POST"){
		xmlHttpReg.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlHttpReg.send(JSON.stringify(data));
	}else if(method == "GET"){
		xmlHttpReg.setRequestHeader('If-Modified-Since', '0');
		xmlHttpReg.send(null);
	}
}
var _load_plx_btn = function(blo,oBoss,plxName,src, color ){
			var idBtn	= oBoss.id + plxName + "btn";
			var b		=  blo.blBtn(oBoss,idBtn,plxName,color);
			b.onclick = function(btn_){
				var v = null;
				var n = 0; 
				return function(){
					n++; 
					var idWrap	= oBoss.id + plxName + "wrap";
					v = blo.blDiv(oBoss,idWrap,"","green");  
					var srcHTML = "<a target='_blank' href=" + src + " style='color:white;'>" + plxName + "-source</a>";
					var ds	= blo.blDiv(v,oBoss.id + plxName + "src",srcHTML,"gray");

					var id		= "id_div_" + plxName;
					var dPlx = blo.blDiv(v,id,plxName + ":" + n,"gray"); 
					blo0.blScript("id_script_" + plxName,src);
					_on_off_div(btn_,v);
				}
			}(b);
		};
function _move_div(oDiv,dx,dy){
			var l = oDiv.style.left;
			l = parseInt(l);
			oDiv.style.left = l + dx + "px";

			var t = oDiv.style.top;
			t = parseInt(t);
			oDiv.style.top = t + dy + "px";
		}
function bl$(id){	return document.getElementById(id); }
var QueryString = function () 
{
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
  return query_string;
}(); 

var blColor	= ["red","tomato","gold","black","green","blue","lightblue","yellow","brown","pink","gray","white","mediumpurple",
	"cyan"];
var blPink	= ["Pink","LightPink","HotPink","DeepPink","PaleVioletRed","MediumVioletRed"];
var blGrey	= ["Gainsboro","LightGray","Silver","DarkGray",
			   "DimGray","Gray","LightSlateGray","SlateGray","DarkSlateGray","black"];

var blon = function(b,d,c1,c2){
	if(b.b){
		b.b = false;
		b.style.backgroundColor = c1;
		d.style.display="none"; 
	}
	else{
		b.b = true;
		b.style.backgroundColor = c2;
		d.style.display="block";
	}
}
	var _blMove = function(o,x,y){o.style.left = x;o.style.top = y;};
	function _on_off_div(b,d){if(d.style.display=="block"){d.style.display="none"; b.style.backgroundColor="red"; }else{d.style.display="block"; b.style.backgroundColor="green"; }};
	function _on_off_bd_1(b,d){ 
		if(b.bOnOff){
			b.bOnOff = false;
			b.style.backgroundColor="green"; 
		}
		else{
			b.bOnOff = true;
			b.style.backgroundColor="red"; 
		}
		if(d.style.display=="block"){
			d.style.display="none"; 
		}
		else{
			d.style.display="block";
		}
	}
	function _on_off_bd(b,d){  
		if(b.innerHTML=="+"){
			b.innerHTML = "-";
			b.style.backgroundColor="green"; 
		}
		else{
			b.innerHTML = "+";
			b.style.backgroundColor="red"; 
		}
		if(d.style.display=="block"){
			d.style.display="none"; 
		}
		else{
			d.style.display="block";
		}
	}
	function _getXY(){
			
			var scrlY =document.body.scrollTop;
			var scrlX =document.body.scrollLeft;
			var r = {};
			r.x=event.clientX+scrlX;
			r.y=event.clientY+scrlY; 
			return r;
	}
	

function CBlClass ()
{ 
    var _id = "id_div_4_blClass";
	var _tmpDiv = null;
	 
	var blTitle4Script = "No title";
	var blScriptName = "noName";
	var blRed = 120, blGreen=11, blBlue=220;
	var _ps = []; 


	function CTest(){
		var _ot = {};
		_ot.blr_test_edit_script = function(b,d){
			if(!d.v){
				d.v = blo0.blDiv(d,d.id+"v","v",blGrey[0]);
				blo0.blShowScript(d.v);
			}
			_on_off_div(b,d);
			b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
		}
		_ot.bll1_blr_test_edit_script= "-blr_test_edit_script-";
		_ot.out = "ouTest";
		this.runAt = function(_v){
			blo0.blParseText("abc",_ot);
			blo0.blShowObj2Div(_v,_ot);
			bl$("blr_test_edit_script").click();
			bl$("blr_test_edit_script").click();
		};
	}
	var _test = new CTest();
	
	var _blVideo = document.createElement("VIDEO");
	_blVideo.id = "id_blVideo";
	if (_blVideo.canPlayType("video/mp4")) {
		_blVideo.setAttribute("src","https://littleflute.github.io/english/NewConceptEnglish/Book2/1.mp3");
	}
	_blVideo.setAttribute("width", "1");
	_blVideo.setAttribute("height", "1"); 
	document.body.appendChild(_blVideo);

	this.v = g_ver_blClass;
	this.blrAboutMe= function(b,d){		
		var s = ""; 
		s += _blhMakeLink('blclass.js ','https://littleflute.github.io/Games/blclass.js','color:skyblue;','_blank');
		s += _blhMakeLink(' blclass.js*','https://github.com/littleflute/Games/edit/master/blclass.js','color:skyblue;','_blank');
		s += _blhMakeLink(' blog','https://github.com/littleflute/blog','color:yellow;','_blank');
		d.innerHTML = s;
		_on_off_div(b,d);
		b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
	}
	this.bllAboutMe = "--aboutMe--";

	this.blShowScript = function(_v){
		var now = new Date();
		now = now.toLocaleString();	 
		_blScript.now = now;
		_blShowObj2Div(_v,_blScript);
		
		bl$("blrVersion").click();
		bl$("blrWidth").click();
		bl$("blrMakeFrames").click();
		bl$("blrInfo").click();
		bl$("blrFrames").click();		
		bl$("blrTimer").click();
	}

	function CBlScript(){
		var _v1 = 0, _v2 = 0, _v3 = 44, _w = 1920;
		var _updateFrames = function(_div,_inFrames){
			_div.innerHTML = "FrameBtns";
			var v = blo0.blDiv(_div,_div.id+"v","v","lightgreen");
			var ls = [];
			for(i in _inFrames){
				var btn = blo0.blBtn(_div,"FRAME_ID_" + i,i,blGrey[2]);
				btn.onclick = function(_fs,_i,_ls,_btn){
					return function(){
						blo0.blMarkBtnInList(_btn,_ls,"green","grey");
						_blVideo.currentTime = _fs[_i].number;

						v.innerHTML = _fs[_i].number;
						_fs.FrameIndex = _i;
						v.tb = blo0.blDiv(v,v.id+"tb","tb",blGrey[0]);
						v.v = blo0.blDiv(v,v.id+"v","v",blGrey[2]);
						
						var btnRed = blo0.blBtn(v.tb,v.tb.id+"btnRed","red","rgb(255,0,0)");
						btnRed.onclick = function(_cf){ 
							return function(){
								_cf.backgroundColor = "255,0,0";
							}
						}(_fs[_i]);
						var btnGreen= blo0.blBtn(v.tb,v.tb.id+"btnGreen","green","rgb(0,255,0)");
						btnGreen.onclick = function(_cf){ 
							return function(){
								_cf.backgroundColor = "0,255,0";
							}
						}(_fs[_i]);

						var btnBlue= blo0.blBtn(v.tb,v.tb.id+"btnBlue","blue","rgb(0,0,255)");
						btnBlue.onclick = function(_cf){ 
							return function(){
								_cf.backgroundColor = "0,0,255";
							}
						}(_fs[_i]);

						var btnObjs = blo0.blBtn(v.tb,v.tb.id+"btnObjs","btnObjs",blGrey[1]);
						btnObjs.onclick = function(){ 
							v.v.innerHTML = "";
							var otb = blo0.blDiv(v.v,v.v.id+"otb","otb",blGrey[0]);
							var ov = blo0.blDiv(v.v,v.v.id+"ov","ov",blGrey[1]);
							var fos = _fs[_i].objects;
							var lsobtn = [];
							for(i in fos){
								var obtn = blo0.blBtn(otb,otb.id+i,i,blGrey[1]);
								obtn.onclick = function(_fos,_i,_obtn){
									return function(){
										blo0.blMarkBtnInList(_obtn,lsobtn,"green","grey");
										_blShowObj2Div(ov,_fos[_i]);
									}
								}(fos,i,obtn);
								lsobtn.push(obtn);
							}
						}
						btnObjs.click();
					}
				}(_frames,i,ls,btn);
				ls.push(btn);
			}
		}
		this.setVersion = function(v1,v2,v3){ _v1 = v1; _v2 = v2; _v3 = v3;};
		this.getVersion = function(){return "v"+_v1+"."+_v2+"."+_v3;}; 
		this.getWidth = function(){return _w;};
		this.getFrameNumber = function(){return _frames.length;};
		this.setSuperObjects = function(_ls){_sos = _ls;};
		this.getSuperObjects = function(){ return _sos;};
		this.drawCurFrame = function(ctx){
			var xF = 444, yF = 111, wF = 200, hF= 200;
			var c = "#347B98"; 
			ctx.fillStyle = c;
			ctx.fillRect(xF,yF,wF,hF);		
			if(_frames.FrameIndex) { 				_frames[_frames.FrameIndex].draw_Frame(ctx,xF,yF,wF,hF);			}
		}
		this.drawSuperObjects = function(ctx){
			ctx.fillStyle = "#11f100"; 
			ctx.fillRect(111,111,222,222);
		}
		this.blrAdd_1_Frame = function(_div,r,g,b){
			var n = _frames.length;
			var f = new CFrame(n,"1",r+ ","+g+","+b);
			_frames.push(f);
			_updateFrames(_div,_frames);		
		}
		this.blrAddFrames_by_Audio = function(_div){ 
			_frames = [];
			for(var i = 0; i < _blVideo.duration; i++){
				var n = _frames.length;				
				var f = new CFrame(n,"1",blRed+ ","+blGreen+","+blBlue);
				var t1 = {
					"text": i + ": by Littleflute", 
					"x": 100,
					"y": 955,
					"size": 111,
					"color": "80,151,255"
				};
				f.addObj(t1);
				f.addTextAsObj(this.getVersion() + ": w=" + this.getWidth(),100,111,100,255,0,0);				
				f.addTextAsObj(blTitle4Script,100,222,55,255,0,250);
				f.addTextAsObj('"'+_ps.length+'"',500,222,55,55,220,250); 
				_frames.push(f); 
			}
			_updateFrames(_div,_frames);			
		}
		this.blrUpdateFramesTxt = function(){
			var ps = blo0.blGetPS();
			ps.lastText = "";
			for(i in _frames){
					var f = _frames[i];
					var s = "ps:" + f.number + "  ";
					var find = false;
					for(j in ps){
						if(ps[j].t==f.number){
							s += ps[j].innerHTML;	
							ps.lastText = s;
							find = true;						
							break;
						}
					}
					if(false==find) s = ps.lastText;
					f.add_Text_As_Obj_1(s,100,333,50,255,255,1);
			}
		}

		var _oScript = {};
		_oScript.blhVersion = function(){return "xdTest..."};
		_oScript.blrVersion = function(_thisOBlScript){
			return function(b,d){
				if(!d.loadVersion){d.loadVersion = true; 				b.style.color = "white"; 
					var tb = blo0.blDiv(d,d.id+"tb","version:",blGrey[0]);
					var btnV = blo0.blBtn(tb,tb.id+"btnV",_thisOBlScript.getVersion(),"brown");btnV.style.color = "white";
					var btnV3Plus1 = blo0.blBtn(tb,tb.id+"btnV3Plus1","+1",blGrey[1]);
					btnV3Plus1.onclick = function(){	_v3++;	btnV.innerHTML = _thisOBlScript.getVersion();					}
					var btnV3Minus1 = blo0.blBtn(tb,tb.id+"btnV3Minus1","-1",blGrey[1]);
					btnV3Minus1.onclick = function(){	_v3--;	btnV.innerHTML = _thisOBlScript.getVersion();					}
				}
				_on_off_div(b,d);
				b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
			};
		}(this);
		_oScript.bll_blrVersion = "--blrVersion--";

		
		_oScript.blhWidth = function(){return 1920;};
		_oScript.blrWidth = function(_thisOBlScript){
			return function(b,d){
				if(!d.loadWidth){d.loadWidth = true; 				b.style.color = "white"; 
					var tb = blo0.blDiv(d,d.id+"tb","width:",blGrey[0]);
					var btnW= blo0.blBtn(tb,tb.id+"btnW",_thisOBlScript.getWidth(),"brown");btnW.style.color = "white";
					var btnWPlus1 = blo0.blBtn(tb,tb.id+"btnWPlus1","+1",blGrey[1]);
					btnWPlus1.onclick = function(){	_w++;	btnW.innerHTML = _thisOBlScript.getWidth();					}
					var btnWMinus1 = blo0.blBtn(tb,tb.id+"btnWMinus1","-1",blGrey[1]);
					btnWMinus1.onclick = function(){	_w--;	btnW.innerHTML = _thisOBlScript.getWidth();					}
					var btnWPlus10 = blo0.blBtn(tb,tb.id+"btnWPlus10","+10",blGrey[1]);
					btnWPlus10.onclick = function(){	_w+=10;	btnW.innerHTML = _thisOBlScript.getWidth();					}
					var btnWMinus10 = blo0.blBtn(tb,tb.id+"btnWMinus10","-10",blGrey[1]);
					btnWMinus10.onclick = function(){	_w-=10;	btnW.innerHTML = _thisOBlScript.getWidth();					}
				}
				_on_off_div(b,d);
				b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
			};
		}(this);
		_oScript.bll_blrWidth = "--blrWidth--";
 
		
		_oScript.blrMakeFrames = function(_thisOBlScript){
			return function(b,d){
				if(!d.loadFrames){d.loadFrames = true; 				b.style.color = "white"; 
					var tb = blo0.blDiv(d,d.id+"tb","Frames:",blGrey[0]); 
					d.v = blo0.blDiv(d,d.id+"v","v:","lightblue"); 
					var btnFrames= blo0.blBtn(tb,tb.id+"btnFrames",_thisOBlScript.getFrameNumber(),"brown");btnFrames.style.color = "white";
					var btnFramesMakeFromMp3 = blo0.blBtn(tb,tb.id+"btnFramesMakeFromMp3","fromMP3",blGrey[1]);
					btnFramesMakeFromMp3.onclick = function(){
						_thisOBlScript.blrAddFrames_by_Audio(d.v);	
						btnFrames.innerHTML = _thisOBlScript.getFrameNumber();	
					}
					var btnAdd_1_Frame = blo0.blBtn(tb,tb.id+"btnAdd_1_Frame","+1",blGrey[1]);
					btnAdd_1_Frame.onclick = function(){
						_thisOBlScript.blrAdd_1_Frame(d.v,200,100,50);	
						btnFrames.innerHTML = _thisOBlScript.getFrameNumber();	
					}

					var btnFramesUpdateTxt = blo0.blBtn(tb,tb.id+"btnFramesUpdateTxt","updateTxt",blGrey[1]);
					btnFramesUpdateTxt.onclick = function(){_thisOBlScript.blrUpdateFramesTxt();	}
					var btnUI = blo0.blBtn(tb,tb.id+"btnUI","ui",blGrey[1]);
					btnUI.onclick = function(){
						if(!d.ui){
							var w = 960, h = 540;
							d.ui = blo0.blMDiv(d, d.id + "ui", "ui",555,10,w,h,blGrey[1]);
							var tb4CVS = blo0.blDiv(d.ui,d.ui.id+"tb4CVS","tb4CVS",blGrey[2]);
							var v4canvas = blo0.blDiv(d.ui,d.ui.id+"v4canvas","v4canvas",blGrey[0]);
							var fCVS = blo0.blCanvas2(v4canvas,w,h); fCVS.n = 0;
							var btnPlay = blo0.blBtn(tb4CVS,tb4CVS.id+"play","play","grey"); btnPlay.isRunning = false;
							function uiFnTimer() {   
								fCVS.n++;
								var ls = _thisOBlScript.getSuperObjects();
								var ctx = fCVS.getContext("2d");
								 
								ctx.fillStyle = "grey"; 
								ctx.fillRect(0,0,w,h);
								_thisOBlScript.drawCurFrame(ctx);
								_thisOBlScript.drawSuperObjects(ctx);
 
								ctx.font = 12 + "px Consolas";
								ctx.fillStyle = "yellow";
								ctx.fillText(ls.length + "_ " + fCVS.ms + "_ " + fCVS.n + " " + Date(), 11, 22);

								
								ctx.font = 22 + "px Consolas";
								ctx.fillStyle = "rgb("+ls[0].attribute.color+")";
								ctx.fillText(ls[0].attribute.name,ls[0].attribute.x1,ls[0].attribute.y1);

								var image = new Image();
								image.src = ls[1].attribute.name;

								ctx.drawImage(image, 
									ls[1].attribute.x1, 
									ls[1].attribute.y1,
									ls[1].attribute.x2, 
									ls[1].attribute.y2);
							}
							btnPlay.onclick = function(){
								if(false ==this.isRunning){
									this.isRunning = true;
									this.innerHTML = "stop";
									this.uiTimer = setInterval(uiFnTimer, 20);
								}
								else{
									this.isRunning = false;
									this.innerHTML = "play";
									clearInterval(this.uiTimer); 
								}
								blon(this,null,"green","grey");
							}
							var btnSuperObjects = blo0.blBtn(tb4CVS,tb4CVS.id+"sos","setSOS",blGrey[1]);
							btnSuperObjects.onclick = function(){
								var ls = [];
								var so1 ={
									"type": "text",
									"attribute": {
										"x1": 50,
										"y1": 222,
										"x2": -1,
										"y2": -1,
										"size": 50,
										"color": "200,182,193",
										"name": "漂泊者乐园: 英语慢速听力！"
									},
									"frameRange": "(2,100)",
									"action": {
										"trace": "y=0*x*x+1*x+0",
										"step": 10
									}
								};
					
								var so2 = 
								{
									"type": "picture",
									"attribute": {
										"x1": 555,
										"y1": 555,
										"x2": 580,
										"y2": 55,
										"size": 50,
										"color": "111,255,22",
										"name": "https://user-images.githubusercontent.com/17950965/124674375-74f6ce80-de6f-11eb-8fe4-fc919cd5a96e.png"
									},
									"frameRange": "(1,100)",
									"action": {
										"trace": "y=0*x*x+0*x+444",
										"step": -10
									}
								};
								var so3 = 
								{
									"type": "picture",
									"attribute": {
										"x1": 900,
										"y1": 800,
										"x2": 580,
										"y2": 55,
										"size": 50,
										"color": "255,255,0",
										"name": "https://raw.githubusercontent.com/littleflute/blog/master/img/vleLogo1.png"
									},
									"frameRange": "(1,100)",
									"action": {
										"trace": "y=0*x*x+0*x+555",
										"step": -10
									}
								};
								var so4 = 
								{
									"type": "picture",
									"attribute": {
										"x1": 1920,
										"y1": 500,
										"x2": 180,
										"y2": 180,
										"size": 50,
										"color": "255,0,0",
										"name": "https://gdb.voanews.com/47E37481-CAD6-4AEF-9AD4-74FC8B936E46_w256_r1.jpg"
									},
									"frameRange": "(1,100)",
									"action": {
										"trace": "y=0*x*x+0*x+888",
										"step": -10
									}
								};
						
								ls.push(so1); 
								ls.push(so2); 
								ls.push(so3); 
								ls.push(so4);
								_thisOBlScript.setSuperObjects(ls);
							}
						}
						_on_off_div(btnUI,d.ui);
						btnUI.style.background = btnUI.style.background=="red"?blGrey[5]:blColor[4];
					}
					
				}
				_on_off_div(b,d);
				b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
			};
		}(this);
		_oScript.bll_blrMakeFrames = "--blrMakeFrames--";

		_oScript.height = 1080;
		_oScript.music = _blVideo.src;
		_oScript.rate = "1";


		function CFrame(_number,_time,_backgroundColor){
			this.number = _number;
			this.time = _time;
			this.backgroundColor = _backgroundColor;
			this.objects = []; 

			this.draw_Frame = function(_this,_time){
				return function(ctx,x,y,w,h){
					var oldFillStyle = ctx.fillStyle;				
				
					ctx.font = 22 + "px Consolas";
					ctx.fillStyle = "rgb(" + _this.backgroundColor + ")";
					ctx.fillRect(x,y,w/2,h/2);		
					
					ctx.fillStyle = "yellow";
					ctx.fillText("Frame.number = " + _this.number, x, y+30); 
					ctx.fillText("Frame.time = " + _this.time, x+222, y+30); 
					ctx.fillText("Frame.backgroundColor = " + _this.backgroundColor, x, y+50); 
					ctx.fillText("objects.length = " + _this.objects.length, x, y+80); 
					var os = _this.objects;
					
					for(i in os){
						ctx.fillText("o"+i + ":" + os[i].x +","+ os[i].y, x+30, y + i*30 + 110); 

					}
					ctx.fillStyle = oldFillStyle;
				}
			}(this);
	 

			this.addObj = function(_o){
				this.objects.push(_o);
			};
			this.addTextAsObj = function(_txt,_x,_y,_size,_r,_g,_b){
				var _o = {};
				_o.text = _txt;
				_o.x = _x;
				_o.y = _y;
				_o.size = _size;
				_o.color = _r + ","+_g+","+_b;
				this.objects.push(_o);
			};
			this.add_Text_As_Obj_1 = function(_txt,_x,_y,_size,_r,_g,_b){
				var s0 = _txt.replace("<br>","");
				s0 = s0.replace("\n","");
				s0 = s0.replace("<strong>","");
				s0 = s0.replace("</strong>","");
				s0 = s0.replace("<em>","");
				s0 = s0.replace("</em>","");
				var s1 = s0.split(" ");
				var n = 0;
				var line = "";
				var lineNum = 0;
				for(var i=0; i<s1.length; i++){
					n++;
					line += s1[i] + " ";
					if(n>8){							
						var _o = {};
						_o.text = line;
						_o.x = _x;
						_o.y = _y + lineNum * _size	;
						_o.size = _size;
						_o.color = _r + ","+_g+","+_b;
						this.objects.push(_o);
						n = 0;
						line = "";						
						lineNum ++;	
					}
				}
				
				if(n>0){							
					var _o = {};
					_o.text = line;
					_o.x = _x;
					_o.y = _y + lineNum * _size	;
					_o.size = _size;
					_o.color = _r + ","+_g+","+_b;
					this.objects.push(_o);
					n = 0;
					line = "";						
					lineNum ++;	
				}
			};
		};

		var _bl2MakeScript = function(_os,_fs,_supObjs){		 
			var s = {};
			var r = {};		
			r.version 	= _os.blhVersion();
			r.width 	= _os.blhWidth();
			r.height 	= _os.height;
			r.music = _os.music;
			r.rate = _os.rate; 
			r.frames = _fs;		
			r.superObjects = _supObjs;	
			s.request = r;			
			return s;		 
		}
		var _sos = [];
		

		_oScript.blrPlay = function(b,d){
			_blVideo.play();
		}
		_oScript.blrPause = function(b,d){
			_blVideo.pause();
		}	
		_oScript.blrScript2Mp4 = function(b,d){ 			
			var url = "http://localhost:8080/image/json2video?script=" + blScriptName + ".json&video=" + blScriptName + ".mp4"; 
			b._2do = function(txt){d.innerHTML = txt};
			blo0.blAjx(b,url);
		}		
		_oScript.blrSaveScript = function(b,d){ 			

			var pl = _bl2MakeScript(_oScript,_frames,_sos);
			_oScript.music = _blVideo.src;

			var url = "http://localhost:8080/json?fileName=" + blScriptName + ".json"; 
        	blo0.blPOST(url,pl,function(txt){
         		 d.innerHTML = txt;
        	});
		}
		_oScript.blrShowPlainScript = function(b,d){
			var os = _bl2MakeScript(_oScript,_frames,_sos);
			var txt = JSON.stringify(os);
			d.innerHTML = txt;
			_on_off_div(b,d);
			b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
		}
		
		var _frames = [];
		this.blrInfo = function(b,d){
			_blShowObj2Div(d,_oScript);
			_on_off_div(b,d);
			b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
		};
		this.bll1 = "-1-";
		this.blrFrames = function(b,d){
			var tb = blo0.blDiv(d,d.id+"tb","tb",blGrey[0]);
			var v = blo0.blDiv(d,d.id+"v","v",blGrey[1]);
			var btnC1 = blo0.blBtn(tb,tb.id+"btnC1","btnC1","rgb(255,0,0)");
			btnC1.onclick = function(){
				v.style.backgroundColor = "rgb(255,0,0)";
				blRed = 255; blGreen = 0; blBlue = 0;
			}
			var btnC2 = blo0.blBtn(tb,tb.id+"btnC2","btnC2","rgb(0,255,0)");
			btnC2.onclick = function(){
				v.style.backgroundColor = "rgb(0,255,0)";
				blRed = 0; blGreen = 255; blBlue = 0;
			}
			var btnC3 = blo0.blBtn(tb,tb.id+"btnC3","btnC3","rgb(0,0,255)");
			btnC3.onclick = function(){
				v.style.backgroundColor = "rgb(0,0,255)";
				blRed = 0; blGreen = 0; blBlue = 255;
			} 
			var ls = [];
			for(i in _frames){
				var btn = blo0.blBtn(tb,"FRAME_ID_" + i,i,blGrey[2]);
				btn.onclick = function(_fs,_i,_ls,_btn){
					return function(){
						blo0.blMarkBtnInList(_btn,_ls,"green","grey");
						_blVideo.currentTime = _fs[_i].number;

						v.innerHTML = _fs[_i].number;
						v.tb = blo0.blDiv(v,v.id+"tb","tb",blGrey[0]);
						v.v = blo0.blDiv(v,v.id+"v","v",blGrey[2]);
						var btnObjs = blo0.blBtn(v.tb,v.tb.id+"btnObjs","btnObjs",blGrey[1]);
						btnObjs.onclick = function(){
							//_blShowObj2Div(v.v,_fs[_i].objects);
							v.v.innerHTML = "";
							var otb = blo0.blDiv(v.v,v.v.id+"otb","otb",blGrey[0]);
							var ov = blo0.blDiv(v.v,v.v.id+"ov","ov",blGrey[1]);
							var fos = _fs[_i].objects;
							var lsobtn = [];
							for(i in fos){
								var obtn = blo0.blBtn(otb,otb.id+i,i,blGrey[1]);
								obtn.onclick = function(_fos,_i,_obtn){
									return function(){
										blo0.blMarkBtnInList(_obtn,lsobtn,"green","grey");
										_blShowObj2Div(ov,_fos[_i]);
									}
								}(fos,i,obtn);
								lsobtn.push(obtn);
							}
						}
						btnObjs.click();
					}
				}(_frames,i,ls,btn);
				ls.push(btn);
			}

			_on_off_div(b,d);
			b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
		};
		this.bll2 = "-2-";
		
		this.blrTimer = function(b,d){
			if(!d.bTimerRun){
				d.bTimerRun = true;
				var tb = blo0.blDiv(d,d.id+"tb","tb",blGrey[0]);
				var v1 = blo0.blDiv(d,d.id+"v1","v1","green");
				var v2 = blo0.blDiv(d,d.id+"v2","v2","green");
				var _fn4Timer = function(_v1,_v2){
					return function(){
						var ct = Math.floor(_blVideo.currentTime);

						_v1.innerHTML = _blVideo.currentTime  + "/" + _blVideo.duration;
						_v2.innerHTML = "f="+_frames[ct].objects[4].text;
					}
				}(v1,v2);
				_blScript.timer = setInterval(_fn4Timer, 100);
			}
			_on_off_div(b,d);
			b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];			
		}

		return _oScript;
	};
	var _blScript = new CBlScript();

	
	function _blhMakeLink(txt,href,style,target){
		var r = "";
		r += "<a href='" + href + "' ";
		r += " style=" + style;
		r += " target=" + target;
		r +=">" + txt; 
		r += "</a>";   
		return r;
	}  
	this.blTags = function(txtHTML,tagName){ 
		if(!_tmpDiv)
		{
			_tmpDiv = this.blDiv(document.body,"id_div_4_tmpDiv","","green");
			_tmpDiv.style.display = "none";
		}
		_tmpDiv.innerHTML = txtHTML;
		var rs = _tmpDiv.getElementsByTagName(tagName);
		return rs;
	} 
	
	this.blMakeScript = function(){		
		var now = new Date();
		now = now.toLocaleString();
		var d = {};
		var r = {};		
		r.version = "v0.21";
		r.width = 1920;
		r.height = 1080;
		r.music = _blVideo.src;
		r.rate = "1";
		var fs =  [
			{
				"number": "1", 
				"time": Math.floor(_blVideo.duration), 
				"objects": [  					
                    {
                        "text": "blAd 2", 
                        "x": 100,
                        "y": 50,
                        "size": 50,
                        "color": "0,255,0"
                    }, 				
                    {
                        "text": blTitle4Script, 
                        "x": 100,
                        "y": 150,
                        "size": 50,
                        "color": "255,255,0"
                    }, 						
                    {
                        "text": "by Littleflute", 
                        "x": 100,
                        "y": 222,
                        "size": 50,
                        "color": "0,255,0"
                    },	
                    {
                        "text": now, 
                        "x": 100,
                        "y": 311,
                        "size": 50,
                        "color": "0,255,255"
                    },
					{						
						"graphic": "rect", 
						"attribute": {
							"left": 500, 
							"top": 400, 
							"width": 100, 
							"height": 150, 
							"color": "142,28,124"
						}
					}
				], 
				"backgroundColor": "1,100,222"
			}
		];
		r.frames = fs;		
		d.request = r;		
		return d;		 
	}
	this.blSetPS = function(ps){		_ps = ps;	}
	this.setScriptName = function(_scriptName){
		blScriptName = _scriptName;
	}
	this.setTitle4Script = function(title){
		blTitle4Script = title;
	}
	this.getTitle4Script = function(){
		return blTitle4Script;
	}
	this.blGetCurTime = function(){		return _blVideo.currentTime;	}
	this.blGetPS = function(){		return _ps;	}
	this.setPlayerURL = function(url){
		_blVideo.src = url;
		_blVideo.load();
	}
	this.getPlayerSrc = function(url){
		return _blVideo.src;
	}

	this.getDuration = function(){ 
		return _blVideo.duration;
	}
	this.toPlay = function(){ 
		_blVideo.play();
	}

	
	this.blhInitUI		= function(divUI){	
		var divMove		= blo0.blMDiv(document.body,_id,"divShowMe_divMove_blClass",550,150,500,200,blColor[8]);
		var dMe			= blo0.blDiv(divMove,divMove.id + "ShowMe","divShowMe",blColor[6]);
		var dUI			= blo0.blDiv(divUI,divUI.id + "_initUI_blClass" + this.v,this.v,"green");
		var b1			= blo0.blBtn(dUI,"blhInitUI_btn1","[blClass]",blColor[8]);
		b1.onclick		= function(this_){	return function(){ 	blo0.blShowObj2Div(dMe,this_);_on_off_div(this,divMove);}}(this);
		
	};

	this.blMarkBtnInList= function(_btn,_ls,_highlightColor,_darkColor){  
		for(j in _ls){
			if(_btn.id==_ls[j].id){
				_btn.style.backgroundColor = _highlightColor;
			}
			else{
				_ls[j].style.backgroundColor = _darkColor;
			}
		}		
	}
	
	this.blParseText = function(_2ParseTxt,_oCfg){  
		_oCfg.toParseTxt = _2ParseTxt; 
		_oCfg.resTxt = "_resTxt";
	}
	
	this.showMe = function(myHandle){ 
		if(!myHandle.m){
			myHandle.m = blo0.blMD(myHandle.id+"showMe"," blo0 ",555,50,555,500,"lightgreen");
			myHandle.n = 1;
			myHandle.b = true;
			myHandle.style.backgroundColor = "green"; 
			var v = blo0.blDiv(myHandle.m,myHandle.m.id+"v","v","lightblue");	
			var tb			= blo0.blDiv(v,v.id + "tb" + this.v,this.v,"lightgreen");			
			var d4URL			= blo0.blDiv(v,v.id + "d4URL","d4URL",blColor[4]);	
			d4URL.innerHTML = blo0.blURL();
			var div4Parse			= blo0.blDiv(v,v.id + "ShowMe","divShowMe",blColor[6]);
			var btnParseMe			= blo0.blBtn(tb,tb.id+"btnParseMe","[blo0]",blGrey[0]);
			btnParseMe.onclick		= function(_this,_v){
					return function(){
						blo0.blShowObj2Div(_v,blo0);blon(_this,_v,"grey","green");
						bl$("blrAboutMe").click();						
					}
			}(btnParseMe,div4Parse);
			var btnTest			= blo0.blBtn(tb,tb.id+"btnTest","[test]",blGrey[0]);
			btnTest.onclick		= function(_this,_v){
				return function(){ 
						_v.innerHTML = _this.id;						
						_test.runAt(_v);
						blon(_this,_v,"grey","green");
				}
			}(btnTest,div4Parse);
			
		}
		if(myHandle.n>1){			blon(myHandle,myHandle.m,"grey","green");		}		myHandle.n++;
	}

	this.blURL = function(){
		return window.location.href;
	}
    this.blhMakeLink = function (txt,href,style,target) { return _blhMakeLink(txt,href,style,target); } 
    this.blrMax = function (b,d)
    {        
		 d.parentElement.parentElement.style.left = 0+"px";
		 d.parentElement.parentElement.style.top = 0+"px";
		 d.parentElement.parentElement.style.width = "100%";
	}
    this.blCreatePage = function (titleTxt,bodyHtml){
		var r = "";
		r	+= "<HTML><HEAD><TITLE>";
		r	+= titleTxt;
		r	+= "</TITLE></HEAD>";
		r	+= "<body>";
		r	+= bodyHtml;
		r	+= "</body></HTML>";

		return r;
	};
    this.blPageCoor = function (element){
  	var c= { X : 0, Y : 0 }; 
 	 while (element){
    		c.X += element.offsetLeft;
    		c.Y += element.offsetTop;
    		element = element.offsetParent;
  	}
 	return c;
    }
    this.blHandle = function (oBoss,id,x,y,w,h,bkClr){
		var x1 = 0;
		var y1 = 0; 
        var r = document.getElementById(id);
        if(!r){
            r = document.createElement("div");
            r.id = id;
    	    r.innerHTML = ""; 
            r.style.backgroundColor=bkClr?bkClr:"gold";
			r.style.position = "absolute";
			r.style.left		= x+"px";
			r.style.top			= y+"px";
			r.style.width		= w+"px";
			r.style.height		= h+"px";
			r.style.cursor		= "default";
    	    if(oBoss!=null)oBoss.appendChild(r);
		}	
		var divMoveHandle	= this.blDiv(r,id+"divMoveHandle","",bkClr);
		divMoveHandle.style.cursor		= "move"; 
		
		divMoveHandle.style.width		= "100%"; 
		divMoveHandle.style.height		= "100%"; 
		var dm = r;
		divMoveHandle.onmousedown = function(){
			var c = _getXY(); 
			x1 = c.x;
			y1 = c.y;
			return false;
		};
		divMoveHandle.onmousemove = function(){
			var c = _getXY(); 
			if(x1==0 &&y1==0) return false; 
			_move_div(dm,c.x-x1,c.y-y1);
			x1 = c.x;
			y1 = c.y;
			return false;
		};
		divMoveHandle.onmouseup = function(){
			var c = _getXY(); 
			x1 = 0;
			y1 = 0; 
		}; 
		divMoveHandle.onmouseout = function(){
			var c = _getXY(); 
			x1 = 0;
			y1 = 0; 
		};  
        return r;
    }
    this.blMDiv = function (oBoss,id,html,x,y,w,h,bkClr){
		var x1 = 0;
		var y1 = 0; 
        var r = document.getElementById(id);
        if(!r){
            r = document.createElement("div");
            r.id = id;
    	    r.innerHTML = html; 
            r.style.backgroundColor=bkClr?bkClr:"gold";
			r.style.position = "absolute";
			r.style.left		= x+"px";
			r.style.top			= y+"px";
			r.style.width		= w+"px";
			r.style.height		= h+"px";
			r.style.cursor		= "default";
    	    if(oBoss!=null)oBoss.appendChild(r);
		}	
		var divMoveHandle	= this.blDiv(r,id+"divMoveHandle","divMoveHandle","skyblue");r.handle = divMoveHandle;
		divMoveHandle.style.cursor		= "move";
		var main	= this.blDiv(r,id+"main","main","lightblue");r.main = main;
		var dm = r;
		divMoveHandle.onmousedown = function(){
			var c = _getXY();
			main.innerHTML = "down:" + c.x + "," + c.y;
			x1 = c.x;
			y1 = c.y;
			return false;
		};
		divMoveHandle.onmousemove = function(){
			var c = _getXY();
			main.innerHTML = "move:" + c.x + "," + c.y; 
			if(x1==0 &&y1==0) return false;
			_move_div(dm,c.x-x1,c.y-y1); 
			if(dm.followDiv){_move_div(dm.followDiv,c.x-x1,c.y-y1);}
			
			x1 = c.x;
			y1 = c.y;
			return false;
		};
		divMoveHandle.onmouseup = function(){
			var c = _getXY();
			main.innerHTML = "up:" + c.x + "," + c.y; 
			x1 = 0;
			y1 = 0; 
		}; 
		divMoveHandle.onmouseout = function(){
			var c = _getXY();
			main.innerHTML = "out:" + c.x + "," + c.y; 
			x1 = 0;
			y1 = 0; 
		};  
        return r;
    }
    this.blMD = function(id,html,x,y,w,h,bkClr){
	    var md = this.blDiv(document.body, id, g_ver_blClass + ":" + html,bkClr);  
		if(!md.run){
		    md.run = true; 
			var style ="position: absolute;";
			style += "z-index: 9;";
			style += "background-color: #f1f1f1;";
			style += "text-align: center;";
			style += "border: 1px solid #d3d3d3;";
			style += "left: 400px";
			style += "top: 40px";
			md .style =style;

			var title = blo0.blDiv(md , md.id + "Header", "Header");
			style ="padding: 10px;";
			style += "z-index: 10;";
			style += "cursor: move;";
			style += "text-align: center;";
			style += "border: 1px solid #fff;";
			style += "background-color: #2196F3;";
			title.style =style;

			blo0.blMakeDivMovable(md );
			md.style.left = x+"px";
			md.style.top = y+"px";
			md.style.width = w+"px";			
			md.style.height = h+"px";
		}
	    	return md;
    }
    _blShowObj_2_Div_all = function (oBoss,obj,l) //blclassdbg 1039
    {	  
        oBoss.innerHTML = "";
        for(i in obj)
		{
			var bOK = i.charAt(0)=="b"&&i.charAt(1)=="l"&&i.charAt(2)=="r"; 
			if(!bOK) continue;

			  var b = document.createElement("button");
			  b.id = b.innerHTML = i;
			  var color = "gray";
			  if(1==l) color = "blue";
			  else if( 2==l) color = "pink";
			  else if( 3==l) color = "red";

			  b.style.backgroundColor = color;
			  if(i.charAt(0)=="b"&&i.charAt(1)=="l") b.style.backgroundColor = "yellow";
			  oBoss.appendChild(b);
			  var d = document.createElement("div");
			  if("object" == typeof obj[i])
			  {
					_blShowObj_2_Div_all(d,obj[i],l+1);
			  }
			  else{
				d.innerHTML = obj[i];
			  }
			  d.style.border = "blue 1px solid";
			  d.style.backgroundColor = "green";
			  d.style.color = "yellow";
			  oBoss.appendChild(d);

			  
			  if(bOK){
				b.style.backgroundColor = "red";
				d.innerHTML = ""; 
				d.id = b.id + "Div";
				b.onclick = function(i_,b_,v_,o_){
					return function(){
						var go = obj[i_];
						if (typeof go == "function") {
			    			go(b_,v_,o_);
						}
					} 
				}(i,b,d,obj);
			  }
		}		 
	}
    this.blShowObj2Div_all = function (oBoss,obj,l) 
    {	 
        _blShowObj_2_Div_all(oBoss,obj,l);	 
	}
    this.blShowObj2Div = function (oDivBoss,obj)
    {	 
		_blShowObj2Div(oDivBoss,obj);
		 
	}
    _blShowObj2Div = function (oDivBoss,obj)
    {        
        var oBoss = oDivBoss;
        if(!oBoss) {
           oBoss = document.createElement("div");
           oBoss.id = "divBlShowObj";
           oBoss.style.border = "green 1px solid";
           document.body.appendChild(oBoss);
        } 
        if(!oBoss){
            alert("boss error!");return;
        }
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

			  if(i.charAt(0)=="b"&&i.charAt(1)=="l"&&i.charAt(2)=="r"){
				b.style.backgroundColor = "red";
				d.innerHTML = ""; 
				d.id = b.id + "Div";
				b.onclick = function(i_,b_,v_){
					return function(){
						var go = obj[i_];
						if (typeof go == "function") {
			    			go(b_,v_);
						}
					} 
				}(i,b,d);
			  }
			  if(i.charAt(0)=="b"&&i.charAt(1)=="l"&&i.charAt(2)=="l"){ 
					b.style.display = "none";	 
					d.id			= d.html;	 
			  }
			  if(i.charAt(0)=="b"&&i.charAt(1)=="l"&&i.charAt(2)=="h"){ 
					b.style.display = "none";	 
					d.style.display = "none";	 
			  }
		}
    }    

	this.blAudio = function (oBoss,id,src)					
 	{  								
   		var s = "";							 
	   	s += "<";						 
	   	s += "audio id=";						
   		s += id;							
	   	s += " controls>";								 
	   	s += "<source src='";
		s += src;
		s += "' type='audio/mpeg'>";		 
		s += "Your browser does not supoort hte audio element"				
	   	s += "</audio>";								 
	   	oBoss.innerHTML = s;						 
	 }	

	this.blScript = function (id,src){
    		var r = document.getElementById(id);
    		if(!r){
        		r = document.createElement("script");
        		r.id = id;
    		}
    		r.src = src; 
    		document.body.appendChild(r);
    		return r;
	}

    this.blAjx = function(worker,href)
    {
        var xmlhttp;
        if (window.XMLHttpRequest)
        {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
        }
        else
        {// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200){
               worker._2do(xmlhttp.responseText);
            }
			else{    
			  worker._2do("error");
			}
        }
        xmlhttp.open("GET",href,true);
        xmlhttp.send();
    }

    this.blDiv = function (oBoss,id,html,bkClr){
        var r = document.getElementById(id);
        if(!r){
            r = document.createElement("div");
            r.id = id;
    	    r.innerHTML = html; 
            r.style.backgroundColor=bkClr?bkClr:"gray";
    	    if(oBoss!=null)oBoss.appendChild(r);
        }
        return r;
    }
    this.blTextarea = function (oBoss,id,html,bkClr){
        var r = document.getElementById(id);
        if(!r){
            r = document.createElement("Textarea");
            r.id = id;
    	    r.innerHTML = html; 
            r.style.backgroundColor=bkClr?bkClr:"gray";
    	    if(oBoss!=null)oBoss.appendChild(r);
        }
        return r;
	}
	this.blTA = function(oBoss,id,txt){
		var b1 = this.blBtn(oBoss,oBoss.id+"b1","b1","grey"); b1.style.float = "left";
		var b2 = this.blBtn(oBoss,oBoss.id+"b2","b2","grey"); b2.style.float = "right";
		var b3 = this.blBtn(oBoss,oBoss.id+"b3","b3","grey");  
		var b4 = this.blBtn(oBoss,oBoss.id+"b4","b4","grey");  
		var v1 = this.blDiv(oBoss,oBoss.id+"v1","v1","lightblue");
		var v2 = this.blDiv(oBoss,oBoss.id+"v2","v2","lightblue");
		var r 	= this.blTextarea(v1,id,txt,"grey");
		r.style.width="95%"; 
		r.style.height="30px"; 
		b1.onclick = function(){
			var p = bl$("myVideo"); p.src = r.value;
		}

		b2.onclick = function(){			
			var url ="http://localhost:8080/download?url="+ r.value + "&filename=d.html";  
			var w = {};
			w._2do = function(txt){
				var str = "var a =" +  txt;  
				eval(str);  
				v2.innerHTML =  a.filename;
				b3.click();
			}
			blo0.blAjx(w,url);		 
		}
		b3.onclick = function(){			
			var url ="http://localhost:8080/" + v2.innerHTML;  
			var w = {};
			w._2do = function(txt){
				r.value = txt;
				b4.click();
			}
			blo0.blAjx(w,url);		 
		}
		b4.onclick = function(){		 			
			v2.innerHTML = r.value;
			var p = bl$("myVideo"); p.src = v2.innerHTML;
		}
		return r;
	}

    this.blBtn = function (oBoss,id,html,bkClr){
        var r = document.getElementById(id);
        if(!r){
            r = document.createElement("button");
            r.id = id;
    	    r.innerHTML = html; 
            r.style.backgroundColor=bkClr?bkClr:"green";
    	    if(oBoss!=null)oBoss.appendChild(r);
        }
        return r;
    }
    this.blLink = function (oBoss,id,html,href,bkClr){
        var r = document.getElementById(id);
        if(!r){
            r = document.createElement("a");
    	    var t = document.createTextNode(html);
    	    r.setAttribute("href", href);
            r.id = id; 
    	    r.style.backgroundColor = bkClr?bkClr:"blue";
        }
        r.innerHTML = html + " "; 
        oBoss.appendChild(r);
        return r;
    }

    this.blMakeDivMovable = function (elmnt) {
      	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
		var idHeader = document.getElementById(elmnt.id + "Header");
      	if (idHeader) {
        	/* if present, the header is where you move the DIV from:*/
        	idHeader.onmousedown = dragMouseDown;
      	} else {
        	/* otherwise, move the DIV from anywhere inside the DIV:*/
        	elmnt.onmousedown = dragMouseDown;
      	}

      	function dragMouseDown(e) {
        	e = e || window.event;
        	// get the mouse cursor position at startup:
        	pos3 = e.clientX;
        	pos4 = e.clientY;
        	document.onmouseup = closeDragElement;
        	// call a function whenever the cursor moves:
        	document.onmousemove = elementDrag;
		if (idHeader) {
        		idHeader.innerHTML = pos3 + "," + pos4;
      		}	
      	}

      function elementDrag(e) {
        e = e || window.event;
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
      }
	}
	this.sXY = function(x,y){
		return " ["+x+","+y+"]";
	}
	this.blRect = function(cvs,x,y,w,h,color){
		var ctx = cvs.getContext("2d");
		ctx.fillStyle = color;
		ctx.fillRect(x,y,w,h);	
	}
	this.drawSpade = function (cvs, x, y, width, height){
        var context = cvs.getContext("2d");
        
        context.fillStyle = "black";

        context.save();
        var bottomWidth = width * 0.7;
        var topHeight = height * 0.7;
        var bottomHeight = height * 0.3;
        
        context.beginPath();
        context.moveTo(x, y);
        
        // top left of spade          
        context.bezierCurveTo(
               x, y + topHeight / 2, // control point 1
               x - width / 2, y + topHeight / 2, // control point 2
               x - width / 2, y + topHeight // end point
                             );
        
        // bottom left of spade
        context.bezierCurveTo(
  x - width / 2, y + topHeight * 1.3, // control point 1
        x, y + topHeight * 1.3, // control point 2
        x, y + topHeight // end point
      );
        
        // bottom right of spade
        context.bezierCurveTo(
  x, y + topHeight * 1.3, // control point 1
        x + width / 2, y + topHeight * 1.3, // control point 2
        x + width / 2, y + topHeight // end point
      );
        
        // top right of spade
        context.bezierCurveTo(
  x + width / 2, y + topHeight / 2, // control point 1
        x, y + topHeight / 2, // control point 2
        x, y // end point
      );
        
        context.closePath();
        context.fill();
        
        // bottom of spade
        context.beginPath();
        context.moveTo(x, y + topHeight);
        context.quadraticCurveTo(
  x, y + topHeight + bottomHeight, // control point
        x - bottomWidth / 2, y + topHeight + bottomHeight // end point
      );
        context.lineTo(x + bottomWidth / 2, y + topHeight + bottomHeight);
        context.quadraticCurveTo(
  x, y + topHeight + bottomHeight, // control point
        x, y + topHeight // end point
      );
        context.closePath();
        context.fillStyle = "black";
        context.fill();
        context.restore();
    }
	 
	this.drawDiamond = function(cvs, x, y, width, height){
        var context = cvs.getContext("2d");
        context.fillStyle = "red";
        context.save();
                context.beginPath();
                context.moveTo(x, y);
                
                // top left edge
                context.lineTo(x - width / 2, y + height / 2);
                
                // bottom left edge
                context.lineTo(x, y + height);
                
                // bottom right edge
                context.lineTo(x + width / 2, y + height / 2);
                
                // closing the path automatically creates
                // the top right edge
                context.closePath();
                
                context.fillStyle = "red";
                context.fill();
        context.restore();
    }
	this.drawClub = function (cvs, x, y, width, height){
        var context = cvs.getContext("2d");        
        context.fillStyle = "black";

        context.save();
        var circleRadius = width * 0.3;
        var bottomWidth = width * 0.5;
        var bottomHeight = height * 0.35;
                context.fillStyle = "black";
        
                // top circle
                context.beginPath();
                context.arc(
          x, y + circleRadius + (height * 0.05), 
          circleRadius, 0, 2 * Math.PI, false
        );
                context.fill();
                
                // bottom right circle
                context.beginPath();
                context.arc(
          x + circleRadius, y + (height * 0.6), 
          circleRadius, 0, 2 * Math.PI, false
        );
                context.fill();
                
                // bottom left circle
                context.beginPath();
                context.arc(
          x - circleRadius, y + (height * 0.6), 
          circleRadius, 0, 2 * Math.PI, false
        );
                context.fill();
                
                // center filler circle
                context.beginPath();
                context.arc(
          x, y + (height * 0.5), 
          circleRadius / 2, 0, 2 * Math.PI, false
        );
                context.fill();
                
                // bottom of club
                context.moveTo(x, y + (height * 0.6));
                context.quadraticCurveTo(
          x, y + height, 
          x - bottomWidth / 2, y + height
        );
                context.lineTo(x + bottomWidth / 2, y + height);
                context.quadraticCurveTo(
          x, y + height, 
          x, y + (height * 0.6)
        );
                context.closePath();
                context.fill();
        context.restore();
    }
	this.drawHeart = function (cvs, x, y, width, height){
        var context = cvs.getContext("2d");        
        context.fillStyle = "black";
        context.save();
                context.beginPath();
        var topCurveHeight = height * 0.3;
                context.moveTo(x, y + topCurveHeight);
                // top left curve
                context.bezierCurveTo(
          x, y, 
          x - width / 2, y, 
          x - width / 2, y + topCurveHeight
        );
                
                // bottom left curve
                context.bezierCurveTo(
          x - width / 2, y + (height + topCurveHeight) / 2, 
          x, y + (height + topCurveHeight) / 2, 
          x, y + height
        );
                
                // bottom right curve
                context.bezierCurveTo(
          x, y + (height + topCurveHeight) / 2, 
          x + width / 2, y + (height + topCurveHeight) / 2, 
          x + width / 2, y + topCurveHeight
        );
                
                // top right curve
                context.bezierCurveTo(
          x + width / 2, y, 
          x, y, 
          x, y + topCurveHeight
        );
                
                context.closePath();
                context.fillStyle = "red";
                context.fill();
        context.restore();
    }

	this.blCard = function(_s,_n,_x,_y,_w,_h,_c,_ondraw,_onclick){
		var suit=_s,num=_n; 
		var x = _x, y = _y; 
		var myDraw = function(_suit,_num,_toDraw){ 			
			return function(cvs,x,h,w,h,c){
				if(_suit==0)				blo0.drawSpade(cvs,x+w/6,y+h/8,15,15);	
				if(_suit==1)				blo0.drawHeart(cvs,x+w/6,y+h/8,15,15);	
				if(_suit==2)				blo0.drawClub(cvs,x+w/6,y+h/8,15,15);		
				if(_suit==3)				blo0.drawDiamond(cvs,x+w/6,y+h/8,15,15);	
				
				blo0.blText(cvs,_suit,x+w/3,y+h/2,20,"brown");
				blo0.blText(cvs,_num,x+w/3,y+h/3,20,"blue");
				if(_toDraw) _toDraw(cvs,x,y,w,h,c);
			}
		}(suit,num,_ondraw);
		var r = {}; 
		r.x = 0;
		var or = new CCVSRect(_x,_y,_w,_h,_c); 
		or.setFun(_onclick);
		or.setDrawFun(myDraw);	
		
		blo0.regCVSDraw(or);	
		blo0.regMousedown(or); 

		r.setXY = function(_x,_y) {
			or.setXY(_x,_y);
			x = _x, y = _y;
		} 
		r.draw = function(cvs,x,y){
			blo0.blText(cvs,r.y,x,y,20,"yellow");
		}
		return r;
	}
	this.blTime = function(nOption){
		var d = new Date();
		switch(nOption){
			case 0:
				return d.toLocaleTimeString();
				break;			
			default:
				return d;
				break;
		}
	}
	this.blPOST = function(_url,_jsonData,_cb){  
		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		xhr.addEventListener("readystatechange", function() {
			if(this.readyState === 4 && this.status==200) {
				_cb( this.responseText );
			}	
			else{
				_cb("error: " + this.readyState + "," + this.status);
			}
		});
		xhr.open("POST", _url);
		xhr.setRequestHeader("Content-Type", "text/plain");
		xhr.send(JSON.stringify(_jsonData));
	}	
	
	this.blLoadGithubIssueComments = function(tb,icURL,ta){
		
		function _loadIssueComments(o) { 
			var ls = [];
			for(i in o)
			{
				var n=ls.length + 1;
				var bodyTxt = o[i].body;
				var btn= blo0.blBtn(tb,tb.id+"btn"+n,n,blGrey[4]);
				btn.onclick = function(_thisBtn,_n,_curTxt){
					return function(){
						ta.value = _curTxt;
						blo0.blMarkBtnInList(_thisBtn,ls,"yellow","grey");
					}
				}(btn,n,bodyTxt);
				ls.push(btn);
			}
		}
		w3.getHttpObject(icURL + "/comments", _loadIssueComments);	
	}
	this.blSandBox = function(sbDiv){
		var d1 = blo0.blDiv(sbDiv,sbDiv.id+"d1","d1",blColor[1]);
		var ta = blo0.blTextarea(d1,"id_4_ta_blrRunJS","alert(1);",blGrey[3]);
		ta.style.width="95%"; 
		ta.style.height="111"+"px"; 

		var tb = blo0.blDiv(d1,d1.id+"tb","",blGrey[5]);
	    var btnRun= blo0.blBtn(tb,tb.id+"btnRun","run",blColor[4]);
	    btnRun.onclick= function(){	  eval(ta.value);		}
		blo0.blLoadGithubIssueComments(tb,"https://api.github.com/repos/jeremyjia/Games/issues/21",ta);

		return d1;
	}
	this.blNewFun = function(o){
		var video = document.getElementById("id_4_video");
	   var ddbg = document.getElementById("id4Debug");
       video.currentTime = o.id;
	   ddbg.innerHTML = o.id; 
	}
}//END: function CBlClass ()
 
var blo0 = new CBlClass;
 
 
blo0.lsCVS = [];
var mousedownList = [];
var mouseupList = [];
var mousemoveList = [];

function CMyTest(_w,_h,_c){ 
	var x = 0, y=0,w=_w,h=_h,c=_c;
	var txt = "player..."; 
	var b1Txt = "b1";
	var b1 = new CBtn(x,y,20,20,"red",
		function(){
			var d = new Date();
			b1Txt = d.toLocaleTimeString();
			var s = "myTest: v0.0. 12";
			var d = blo0.blMD("myTest", s,    300,100,500,111, blGrey[5]); 
						 
			_on_off_div(null,d);
		},
		function(_cvs,_x,_y){
			blo0.blText(_cvs,b1Txt,_x+22,_y+22,12,"brown");
		}
	);
	this.draw=function(cvs,_x,_y){
		x = _x;
		y = _y;
		blo0.blRect(cvs,x,y,w,h,c); 
		blo0.blText(cvs,txt,x+w/12,y+h/3,12,"blue");
		b1.setXY(x+20,y+25);
		b1.draw(cvs);
	} 
	this.click = function(xx,yy){
		if(blo0.blPiR(xx,yy,x,y,w,h)){
			var d = new Date();
			txt = d.toLocaleTimeString();
		}
		b1.click(xx,yy);
	}
}
function CBtn(_x,_y,_w,_h,_c,cbClick,cbDraw){ 
	var x = _x, y=_y,w=_w,h=_h,c=_c;
	this.draw=function(cvs){
		blo0.blRect(cvs,x,y,w,h,c); 
		if(cbDraw) cbDraw(cvs,x,y);
	} 
	this.click = function(xx,yy){
		if(blo0.blPiR(xx,yy,x,y,w,h)){
			if(cbClick) cbClick();
		}
	}
	this.setXY = function(_x,_y){		x = _x, y=_y;	}
	this.setC = function(_c){		c = _c;	}
}
function CRectBtn(_x,_y,_w,_h,_c1,_c2){ 
	var x = _x, y=_y,w=_w,h=_h,c1=_c1,c2=_c2;
	var c = c1;
	var b = false;
	this.draw=function(cvs){
		blo0.blRect(cvs,x,y,w,h,c); 
	}
	this.click = function(_x,_y){
		if(blo0.blPiR(_x,_y,x,y,w,h)){
			if(!b){
				b=true;		
				c=c2;
			}
			else{
				b=false;
				c=c1;
			}
		}
	}
	this.getStatus = function(){return b;}
	this.setStatus = function(_b){b = _b;c=c1;}
	this.setXY = function(_x,_y){x=_x; y=_y;}
}
function C1Script(_id,_x,_y){
	var id = _id;
	var z = _id;
	var x = _x, y = _y; 
	var w = 15, h = 15;
	var X = x+50+id*100, Y=y+11,W=100,H=100;
	var C = "lightgrey";
	var clickTest = "clickTest:";
	var clickInScreen = "clickInScreen:";
	var m =false;
	var r = new CRectBtn(x,y,w,h,"white","yellow");
	var rc = new CRectBtn(X,Y,w,h,"brown","yellow");

	this.getZ = function(){return z;}
	this.setZ = function(_z){  z=_z;}
	this.getX = function(){return X;}
	this.getY = function(){return Y;}
	this.getW = function(){return W;}
	this.getH = function(){return H;}
	this.setC = function(_c){C = _c;}
	this.inScriptScreen = function(_x,_y){		return blo0.blPiR(_x,_y,X,Y,W,H);	}

	this.draw1Script = function(cvs){   
		r.draw(cvs);
		if(r.getStatus()){
			blo0.blRect(cvs,X,Y,W,H,C);
			blo0.blText(cvs,"id=" + id + " z="+z,X+W/4,Y+H/5,12,"green");
			blo0.blText(cvs,clickInScreen,X+W/12,Y+H/3,12,"brown");
			blo0.blText(cvs,clickTest,X+W/12,Y+H/2,12,"blue");
			rc.draw(cvs);
		}
	} 
	this.click1script = function(_x,_y){    
		r.click(_x,_y);
		if(r.getStatus()){			
			rc.click(_x,_y);	
		}
		if(m){
			X = _x;
			Y = _y;
			m = false;		
			rc.setStatus(false);	
			rc.setXY(_x,_y); 
		}
		if(rc.getStatus()){
			m = true;
		}	 	
		else{
			m = false;
		}

		var d = new Date();
		var n = d.toLocaleTimeString();
		clickTest = n;

		if(blo0.blPiR(_x,_y,X,Y,W,H)){
			clickInScreen = n;
		}
	} 
}
function CScriptMng(){
	const CC = "lightgrey";
	const CC1 = "darkseagreen";
	const CC2 = "lightblue";
	var ls = [];
	var saj = "saj:";
	var clickDbg = "clickDbg:";
	var x = 10;
	var y = 55;
	var w = 20;
	var h = 20;
	var X = 444;
	var Y = 55;
	var W = 200;
	var H = 200;
	var c = CC; 
	var m = false;
	var clickScripts = "clickScripts";
	var clickInClientScripts = "clickInClientScripts";
	var v = "CScriptMng: v0.13";
	var r = new CRectBtn(x,y,w,h,CC,CC2);
	var r1 = new CBtn(x+20,y,w,h,CC1,function(){
		var n = ls.length;
		var s = new C1Script(n,x,y+60+30*n);
		ls.push(s);
	});	
	var rc = new CRectBtn(X,Y,w,h,CC,CC1);
	var myTest = new CMyTest(121,55,"yellow");
 
	this.clickList = function(_x,_y){ 
		var l = ls.length;
		for(var z = l; z>=0;z--){
			for(i in ls){
				if(ls[i].getZ()==z&&ls[i].inScriptScreen(_x,_y)){					
					clickDbg = "clickDbg:z=" +ls[i].getZ();
					ls[i].setC( "lightblue");	
					for(j in ls){
						if(ls[j].getZ()>ls[i].getZ()){
							ls[j].setZ(ls[j].getZ()-1);
							ls[j].setC( "lightgrey");
						}
					}
					ls[i].setZ(ls.length-1);
					z=-1;
					break;
				}
				else{
					ls[i].setC( "lightgrey");
				}
			}
		}
	} 
	this.drawMng = function(cvs,_w,_h){  
		W = _w/5;
		H = _h/2;
		r.draw(cvs);
		if(r.getStatus()){
			blo0.blRect(cvs,X,Y,W,H,CC2);
			rc.draw(cvs);

			r1.draw(cvs);
			var n = ls.length;

			blo0.blText(cvs,clickDbg,X+W/12,Y+H/1.1,12,"red");
			blo0.blText(cvs,saj,X+W/12,Y+H/6,12,"red");
			blo0.blText(cvs,v+" n="+n,X+W/12,Y+H/2,12,CC1);
			blo0.blText(cvs,clickScripts,X+W/12,Y+H/4,12,"blue");
			blo0.blText(cvs,clickInClientScripts,X+W/12,Y+H/3,12,"brown");

			this.drawList_z_0_n(cvs,X+W/18,Y+H/1.8,"brown"); 

			myTest.draw(cvs,X+111,Y+1);
 
		}
	} 
	this.drawList_z_0_n = function(cvs,_x,_y,_c)
	{
		blo0.blRect(cvs,_x,_y,20,20,_c);
		blo0.blText(cvs,"z-0-n:",_x,_y,_c);
		var n = 0;
		var l = ls.length;
		blo0.blText(cvs,n,_x+n*15+20,_y+22,"blue");
		for(var z = 0;z<=l;z++){
			blo0.blText(cvs,n,_x+n*15+20,_y+22,"green");
			for(i in ls){
				if(z==ls[i].getZ()){
					blo0.blText(cvs,i,_x+n*15+20,_y*33,"blue");
					ls[i].draw1Script(cvs);
				}
			}

			n++;
		}

	}
	this.clickMng = function(_x,_y){  
		var now = new Date();
		var s = now.toLocaleTimeString();
		clickScripts = s;
		if(blo0.blPiR(_x,_y,X,Y,W,H) && !(blo0.blPiR(_x,_y,x,y,w,h))){
			var d = new Date();
			var n = "clickInClientScripts: " + d.toLocaleTimeString();
			clickInClientScripts = n;
		}

		r.click(_x,_y);	
		if(r.getStatus()){
			rc.click(_x,_y);	
			r1.click(_x,_y);	
			for(i in ls){
				ls[i].click1script(_x,_y);
			}	
			myTest.click(_x,_y);
		}	
		if(m){
			X = _x;
			Y = _y;
			m = false;		
			rc.setStatus(false);	
			rc.setXY(_x,_y); 
		}
		if(rc.getStatus()){
			m = true;
		}	 	
		else{
			m = false;
		}

		this.clickList(_x,_y); 
	}   
}; 

 
blo0.blPiR = function(x,y,x1,y1,w1,h1){
	if(x<x1|| x>x1+w1 || y<y1 || y>y1+h1){
		return false;
	}
	else {
		return true;
	}
}
blo0.regCVSDraw = function(o){
	blo0.lsCVS.push(o);
}
blo0.regMousedown = function(o){
	mousedownList.push(o);
}
blo0.regMouseup = function(o){
	mouseupList.push(o);
}
blo0.regMousemove = function(o){
	mousemoveList.push(o);
}
blo0.initDraw = function(cvs,_x,_y,_c){
	for(i in blColor){blo0.blRect(cvs,_x+i*20,_y+5,10,10,blColor[i]);}
	for(i in blGrey){blo0.blRect(cvs,_x+i*20,_y+25,10,10,blGrey[i]);}
	for(i in blPink){blo0.blRect(cvs,_x+i*20,_y+55,10,10,blPink[i]);}
}

blo0.blCanvas2 = function(d,w,h){
	var cvs = document.createElement("canvas");
	cvs.width = w;
	cvs.height = h;
	cvs.ms = false;
	cvs.addEventListener('mousedown', function (e) {
		var x = e.offsetX;
		var y = e.offsetY;
		cvs.ms = true;
	});
	cvs.addEventListener('mouseup', function (e) {
		var x = e.offsetX;
		var y = e.offsetY;
		cvs.ms = false;
	});
	
	d.appendChild(cvs);
	cvs.style.float = "left";

	return cvs;
}
blo0.blCanvase = function(d,w,h,color){
	var cvs = document.createElement("canvas");
	cvs.width = w;
	cvs.height = h;
	d.appendChild(cvs);
	cvs.style.float = "left";

	cvs.addEventListener('mousedown', function (e) {
		var x = e.offsetX;
		var y = e.offsetY;
		blo0.scm.clickMng(x,y);

		for(i in mousedownList){
			if(mousedownList[i].onCVSMousedown) mousedownList[i].onCVSMousedown(x,y);
		}
	});

	cvs.addEventListener('mouseup', function (e) {
		var x = e.offsetX;
		var y = e.offsetY; 

		for(i in mouseupList){
			if(mouseupList[i].onCVSMouseup) mouseupList[i].onCVSMouseup(x,y);
		}
	});
	cvs.addEventListener('mousemove', function (e) {
		var x = e.offsetX;
		var y = e.offsetY; 

		for(i in mousemoveList){
			if(mousemoveList[i].onCVSMousemove) mousemoveList[i].onCVSMousemove(x,y);
		}
	});
	
	var fTimer = function(_o,_ls,_cvs){
		blo0.scm = new CScriptMng;
		return function(){
			_o.blRect(_cvs,0,0,_cvs.width,_cvs.height,"grey");	
			_o.initDraw(_cvs,50,10,"brown");

			blo0.scm.drawMng(_cvs,_cvs.width,_cvs.height);
			var n = blo0.lsCVS.length; 
			var s = "[==="+n+"] ";
			for(var i = 0; i < n; i++){
				var r = _ls[i].onCVSDraw(_cvs);
				s += ":";
				s += r;
			}
			s += Date();
			_o.blText(_cvs,s,60,11,11,"white");
		}
	}(blo0,blo0.lsCVS,cvs);

	var interval = setInterval(fTimer, 20);
	return cvs;
}

blo0.blParseURL = function(_url,cb){  
	myAjaxCmd('GET',_url, null, ajaxFun);
	function ajaxFun(resp){
		if(resp.readyState == 4){
		  if(resp.status==200){			   
			  cb(resp.responseText);
		  }else{
			alert("The status code:"+resp.status); 
		  }
		}			 
	 } 
}

blo0.blGetGHI = function(_url,cb){  //git github issue
	var r = "blo0.blGetGHI： "+ _url + "_" + cb + ":"+ Date();
	var token = "f89b0eccf7"+"4c65a65513"+"60062c3e47"+"98d0df4577";//jp
	var xdToken = "023b4e4f"+"a78cff90"+"8afa75bf"+"072567053"+"3bacc60";
	var url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/526806470?access_token="+xdToken;
	//*
	myAjaxCmd('GET',url, null, readCallBack);

	function readCallBack(resp){
		if(resp.readyState == 4){
		  if(resp.status==200){
			  var msg = JSON.parse(resp.responseText);
			  if(msg.body==null || msg.body==""){
				allMsg ="";
			  }else allMsg=msg.body;
			  cb(allMsg);
		  }else{
			alert("The status code:"+resp.status); 
		  }
		}			 
	 }
	 //*/
	return r;
}

blo0.blPlayer = function(_id, _title,_src,_x,_y,_w,_h,_c){
	var d = blo0.blMD(_id, _title,_x,_y,_w,_h,_c);
	ftnPlayer(d,_src);
	return d;
}


blo0.blText = function(cvs,txt,x,y,size,color){
	var ctx = cvs.getContext("2d");
	ctx.font = size + "px Arial";
	ctx.fillStyle = color;
	ctx.fillText(txt, x,y);
	return cvs;
}
blo0.dbgBtn = function(tb,txt,c1,c2,cbDraw,cbInit,cbMousedown,cbMouseup,cbMousemove){
	var x = 110; var y =120; var w = 100; var h = 100;
	var x0 = 0; var y0 =0; var dx = 0; var dy = 0;
	var s = "s";
	var ls = [];
	var isDown = false;
	var b = blo0.blBtn(tb,tb.id+txt,txt,c1);	
	b.style.float = "right";
	b.onclick = function(){
		blon(b,null,c1,c2);
	}
	b.onCVSDraw = function(cvs){
		if(b.b){
			blo0.blText(cvs,"down="+isDown,x+55,y,20,"yellow"); 
			
			blo0.blText(cvs,s,x+55,y+55,20,"Blue"); 

			for(i in ls){
				ls[i].onCVSDraw(cvs);
			}
			if(cbDraw) cbDraw(cvs,x,y,w,h);
		}
	}
	b.onCVSMousedown = function(_x,_y){
		if(b.b){ 
			if(blo0.blPiR(_x,_y,x,y,w,h)){
				if(cbMousedown) cbMousedown(b,_x,_y);
			}
			x0 = _x; y0 = _y;
			for(i in ls){
				ls[i].onCVSMousedown(_x,_y);
			}
		}
	}
	b.onCVSMouseup = function(_x,_y){
		if(b.b){  
			if(cbMouseup) cbMouseup(b,_x,_y);
			x0 = 0; y0 = 0;
		}
	}
	b.onCVSMousemove = function(_x,_y){
		if(b.b){  
			dx = _x - x0; dy = _y -y0; x0 = _x; y0 = _y;
			if(isDown) b.move(dx,dy);
			if(cbMousemove) cbMousemove(b,_x,_y);
		}
	}
	b.setS = function(_s){s = _s;}
	b.setX = function(_x,_y){
		x = _x; y = _y;
	}
	b.addRect = function(_x,_y,_w,_h,_clr){
		var o = new CCVSRect(_x,_y,_w,_h,_clr);
		ls.push(o);
		return o;
	}
	b.move = function(_dx,_dy){
		x += _dx; y += _dy;
		for(i in ls){
			ls[i].move(_dx,_dy);
		}
	}
	b.getDown = function(){return isDown;}
	b.setDown = function(_b){ isDown = _b;}
	blo0.regCVSDraw(b);	
	blo0.regMousedown(b);
	blo0.regMouseup(b);
	blo0.regMousemove(b);
	cbInit(b);
	return b;
}

function CCVSRect(_x,_y,_w,_h,_clr){
	var x = _x; var y = _y; var w = _w; var h = _h; var clr = _clr;
	var fClick = null;
	var fDraw = null;

	this.setFun = function(_f){ fClick = _f;	}
	this.setDrawFun = function(_f){ fDraw = _f;	}
	this.setXY = function(_x,_y) { x = _x; y= _y; }
	this.setColor = function(_clr){ clr = _clr;	}
	this.getColor = function(){ return clr;}
	this.getX = function(){ return x;}
	this.getY = function(){ return y;} 
	this.onCVSDraw = function(cvs){
		blo0.blRect(cvs,x,y,w,h,clr); 
		if(fDraw) { fDraw(cvs,x,y,w,h,clr);}
	}
	this.move = function(_dx,_dy){
		x += _dx; y += _dy;
	} 
	this.onCVSMousedown = function(_x,_y){ 
			if(blo0.blPiR(_x,_y,x,y,w,h)){ 
				if(fClick) fClick(this,_x,_y);
			} 
	} 
}


function ftnPlayer( oDiv ,mySrc){
	var v = blo0.blDiv(oDiv, oDiv.id + "Player", "Player",blGrey[0]);
	var str4V = '<video id="myVideo" width="320" height="240" controls> ';				
	str4V += '<source src=';
	str4V += mySrc;// 'https://littleflute.github.io/ted1/docs/61/v0.mp4';
	str4V +=' type="video/mp4">Your browser does not support HTML5 video.'; 	
	str4V += '</video>';  										
	var vPlayer = blo0.blDiv( v ,"id_div_4_myVideo" , str4V , 300,100,500,400,blColor[1]); 	
	var _p = bl$("myVideo");  
	_p.timeFun = function(player){
		player.mListeners = [];
		player.addListener = function(o){
			player.mListeners.push(o);
		}
		player.getListenerNum = function(){
			return player.mListeners.length;
		}
		return function(){
			for(i in player.mListeners){
				var ii = player.mListeners[i];
				if(ii.timeFun) ii.timeFun(player.currentTime);
			}
		}
	}(_p);
	_p.src = mySrc;//'https://littleflute.github.io/ted1/docs/61/v0.mp4';
	_p.lrc = "https://littleflute.github.io/english/NewConceptEnglish/Book2/1.lrc";
	_p.controls = false;

	v.tb = blo0.blDiv(v, v.id + "tb", "tb",blGrey[3]);

	v.tb.btnLists = blo0.blBtn(v.tb, v.tb+"btnLists","lists",blGrey[0]);
	v.tb.btnLists.onclick = function(){
		if(!this.v){
			this.v = blo0.blDiv(v,v.id + "List","list", "lightblue");
			var d = this.v;

			d.vn = blo0.blDiv(d,d.id+"v4NewURL","v4NewURL","blPink[2]"); 
			//d.vn.ta = blo0.blTA(d.vn,d.vn+"ta","test");
			

			d.v = blo0.blDiv(d,d.id+"v","v",blGrey[3]); 
			d.v4List = blo0.blDiv(d,d.id+"v4List", "v4List",  blColor[4]);
 
			var _makeMp3List2Div = function(d,txt){
				var str = "var a =" +  txt;  
				eval(str);
				d.innerHTML = "";
				var s = "v0.0.12:";
				s += "<a href='https://github.com/littleflute/EXPLORATIONS/issues/1' target='_blank'>EXPLORATIONS:i1#<a/> - "; 
				s += "<a href='https://github.com/littleflute/EXPLORATIONS/edit/master/issues/1/i.js' target='_blank'>i.js* <a/> - ";
				s += "<a href='https://littleflute.github.io/EXPLORATIONS/issues/1/i.js' target='_blank'>i.js<a/>";
				 blo0.blDiv(d,d.id+"_#9_", s,blColor[4]);
				 var t = blo0.blDiv(d,d.id+"_title_", a.title,blColor[5]);
				 t.v = blo0.blDiv(t,t.id+"v", "v4Title",blColor[6]);
				 t.v.onclick = function(){						     	
					 if(!t.v.dLrc){
						 t.v.dLrc = blo0.blMD("id_mdiv_Lrc", "md4Lrc", 300,100,500,400, blGrey[5]);
						 t.v.dLrc.sLrcFile = "";	
						t.v.dLrc.tb = blo0.blDiv(t.v.dLrc, t.v.dLrc.id + "tb","tb",blGrey[0]);
						var btn2Edit = blo0.blBtn(t.v.dLrc.tb,"btn2Edit","2Edit",blGrey[1]);
						btn2Edit.onclick = function(){
							var ta = bl$("ta1");
							ta.value = t.v.dLrc.v.innerHTML;
						} 
						 t.v.dLrc.v = blo0.blDiv(t.v.dLrc, t.v.dLrc.id + "v","cur Lrc",blGrey[3]);
					 } 
					 if(t.v.dLrc.sLrcFile!=t.v.innerHTML){
						 t.v.dLrc.sLrcFile = t.v.innerHTML;
						 var w = {};
						w._2do = function(txt){
							t.v.dLrc.v.innerHTML = txt;
						}
						var urlLrc = t.v.dLrc.sLrcFile;
						blo0.blAjx(w,urlLrc);
					 }
					 _on_off_div(this,t.v.dLrc);
				 }
			 
				 for(i in a.songs){
					   var p = bl$("myVideo");
					   var id4Song = i/2+3;
					   var dSong = blo0.blDiv(d,d.id+"_mp3_"+i, a.songs[i].mp3,blGrey[id4Song]);
					   dSong.id = id4Song;
					   dSong.style.border = "2px solid blue;";
					   dSong .onclick = function(_this, _s ){ 
							return function(){ 
							   if(!p.dNow) p.dNow= null;
							   if(_this!= p.dNow){
								 p.src = _this.innerHTML;  
								 p.lrc = _s.lrc;
								if(p.dNow) p.dNow.style.background = blGrey[5]; 
								 p.dNow = _this;
								 p.play();
								 _this.style.background = blGrey[0]; 
								 t.v.innerHTML = _s.lrc;
							   }
							   else{
								 ;
							   }
							}
					   }(dSong, a.songs[i] )
					   dSong .onmouseover= function(_this){                
							return function(){
							   if(!p.dNow) p.dNow= null;
							   if(_this!= p.dNow){ 
								 _this.style.background = "brown";//blGrey[_this.id-1];
							   }
							 }
					   }(dSong )
					   dSong .onmouseout= function(_this){ 
							return function(){
							   if(!p.dNow) p.dNow= null;
							   if(_this != p.dNow){ 
								 _this.style.background = "green";//blGrey[_this.id];
							   }
							 }
					   }(dSong )
				  }
			}

			function _loadListComments(o) {
				var n = 0;
				for(i in o){ 
					n++;
					var btn = blo0.blBtn(d.v,d.v.id + "_btn_"+i, n,blColor[i]);
					btn.txt = o[i].body; 
					btn.onclick = function(_this){
							return function (){_makeMp3List2Div(d.v4List,_this.txt);};
					}(btn);
				}
			} 
			var _listURL = "https://api.github.com/repos/littleflute/EXPLORATIONS/issues/1/comments";
			w3.getHttpObject(_listURL, _loadListComments);	
		}
		_on_off_div(this,this.v);
	}

	v.tb.b1 = blo0.blBtn(v.tb, v.tb+"b1","lyric",blGrey[0]);
	v.tb.b1.onclick = function(){
		var _fnTimer = function(_this){	      
				var _t = 0;
				var _src = "";
				var _lrc = "";
     			return function(){
     			 	_t++;
     			 	_this.innerHTML = _t;
     			 	_this.v.mv.parseTxt(_p.duration,_p.currentTime, _this.v.mv.lrcTxt);
     			 	if(_p.timeFun){_p.timeFun();}

     			 	if(_src != _p.src){
     			 		_src = _p.src;
     			 		_this.v.src.innerHTML = _src;
     			 	} 
     			 	if(_lrc != _p.lrc) {
     			 		_lrc = _p.lrc;			 		
     			 		_this.v.lrc.innerHTML = _lrc;  
     			 		_this.v.mv.getLrcTxt(_lrc);
     			 	}
     			 }
   		}(this);
		if(!this.v){
			this.v = blo0.blDiv(v,v.id + "v4b1","v4b1",blColor[9]);
			this.v.src = blo0.blDiv(this.v, this.v.id + "src", "url",10,10,300,200,blGrey[0]);
			this.v.lrc = blo0.blDiv(this.v, this.v.id + "lrc", "url",10,10,300,200,blGrey[5]);
			this.v.mv = blo0.blMDiv(this.v, this.v.id + "mv", "mv4Lyrics",310,10,888,200,blGrey[1]);

			this.v.mv.parseTxt = function(_d){

				function _xdMoveLyrics2Div(ta,ct, _timeA,_txtA, oDiv){  
					var ii = 0;
					for(var i=0; i< _timeA.length; i++){
						if(ct>_timeA[i]){
							ii = i;	
						} 
					} 
					oDiv.v.innerHTML = _txtA[ii];
				    
				}
				return function(ta,ct,txt){
					if(!_d.v){
						_d.v 	= blo0.blDiv(_d, _d.id + "v", "v", blGrey[0]);
						_d.vLrc = blo0.blDiv(_d, _d.id + "vLrc", "vLrc", blGrey[3]);
						var b1 	= blo0.blBtn(_d.vLrc, _d.vLrc.id+"b1","b1",blGrey[0]);
						var btnEditTime 	= blo0.blBtn(_d.vLrc, _d.vLrc.id+"eTime","eTime",blGrey[0]);
						_d.vLrc.ta = blo0.blTextarea(_d.vLrc,"ta1","xxx...",blGrey[1]);
						_d.vLrc.ta.style.width="95%"; 
						_d.vLrc.ta.style.height="150px"; 

						_d.v4MovingLrc = blo0.blMDiv(_d, _d.id + "v4MovingLrc", "v4MovingLrc",0,-20,600,50, blColor[9]);
						_d.v4MovingLrc.v = blo0.blMDiv(_d.v4MovingLrc,"id_v4MovingLrc_v","vvvv",blGrey[0]);

						b1.onclick = function(_this,_div){	
							return function(){
								if(!_this.v0) 
								{
									_this.v0 = blo0.blMDiv(_div,_div.id+"v1","v1111",150,100,400,300,blGrey[0]);
									var bUpdate = blo0.blBtn(_this.v0 ,_this.v0.id+"bUpdate","bUpdate",blGrey[4]);
									var bShowLrc = blo0.blBtn(_this.v0 ,_this.v0.id+"bShowLrc","bShowLrc",blGrey[1]);
									var bShowSrt = blo0.blBtn(_this.v0 ,_this.v0.id+"bShowSrt","bShowSrt",blGrey[1]);
									bShowSrt.onclick = function(){
										 
										if(!blo0.plxSrt){
											blo0.plxSrt = blo0.blMD(_div.id+"plxSrt","plxSrt",150,100,400,300,blGrey[0]);
											blo0.plxSrt.ctx = _div; 
											var v = blo0.plxSrt; 
											v.tb = blo0.blDiv(v,v.id+"tb","tb4SRT",blGrey[0]);
											v.v1 = blo0.blDiv(v,v.id+"v1","_v_plx_Srt",blGrey[1]);
											v.v1.ta = blo0.blTextarea(v.v1,v.v1.id+"ta",_s,"lightblue");
											v.v1.ta.style.width = "98%";
											v.v1.ta.style.height = "311px";
										}
										var v = blo0.plxSrt; 
										var tArr = v.ctx.lrcTimeArray;
										var lArr = v.ctx.lrcArray;
										var _fTime = function ( n ){
											var hh = (n/3600).toFixed(2);
											hh = hh<10?"0"+hh:hh;
											hh = hh.split('.')[0];
											
											var mm = ((n%3600)/60).toFixed(1);
											mm = mm<10?"0"+mm:mm;
											mm = mm.split('.')[0];

											var ss = ((n%3600)%60).toFixed(3);
											ss= ss<10?"0"+ss : ss;
											ss = ss.split('.');

											var r = hh + ":" + mm + ":" + ss[0] + "," + ss[1];

											return r;
										}

										var _s = "";
										for(i in tArr){ 
											_s += "\n";
											var ii = i;
											ii++;
											_s += ii;
											_s += "\n"; 
											var dt =  ( ii==tArr.length ) ?  _fTime(tArr[i]+3) : _fTime(tArr[ii]);
											_s += _fTime(tArr[i]) + " --> " + dt;
											_s += "\n";
											_s += lArr[i];
											_s += "\n";

										}
										//*/
										v.v1.ta.value = _s;

										_on_off_div(this,blo0.plxSrt);
									}
									
									_this.v1 = blo0.blDiv(_this.v0,_this.v0.id+"v1","v1",blGrey[0]);
									bShowLrc.onclick = function(_this){
										return function(){
											if(!_this.v){
												_this.v = blo0.blMD("id_mdiv_4bSHowLrc",												 		 "v4bShowLrc", 300,100,500,400, "red");
												_this.v.ta = blo0.blTextarea(_this.v,"ta2","","green");
												_this.v.ta.style.width = "98%";
												_this.v.ta.style.height = "98%";		  
											}
											var tArr = _div.lrcTimeArray;
											var lArr = _div.lrcArray;
											var s = "";
											for(i in tArr){
												var mm = Math.floor(tArr[i]/60); 
												mm = mm<10?"0"+mm:mm;
												var ss = tArr[i]%60;
												ss = ss<10?"0"+ss.toPrecision(3):ss.toPrecision(4);
												s += "[" + mm + ":" + ss  +"]" + lArr[i] + "\n";
											}
											_this.v.ta.value = s;

											_on_off_div(_this,_this.v);
										}
									}(bShowLrc);
									bUpdate.onclick = function(){
										_this.v1.innerHTML = "-";
										var tArray = _div.lrcTimeArray;
										for(i in tArray){
											var dl = blo0.blDiv(_this.v1, _this.v1.id+i,i,blGrey[i]);
											dl.b1 = blo0.blBtn(dl,dl.id+"b1",tArray[i],blGrey[0]);
											
											dl.b1.onclick = function(b1,player,t){
												player.addListener(b1);
												b1.timeFun = function(tNow){
													if(t<tNow) b1.style.backgroundColor = blColor[9];
													else b1.style.backgroundColor = blGrey[4];
												}
												return function(){
													player.currentTime = t;
												}
											}(dl.b1,_p,tArray[i]);


											var mm = tArray[i]/60;
											var ss = tArray[i]%60;
											var sb1a =  "[" + Math.floor(mm) + ":" + ss + "]";																																
											dl.b1a = blo0.blBtn(dl,dl.id+"b1a",sb1a,"lightblue");
											dl.b2 = blo0.blBtn(dl,dl.id+"b2",_div.lrcArray[i],blGrey[0]);
										}
									}

									bUpdate.onclick();									
								} 
								_on_off_div(_this,_this.v0);
							}
						}(b1,_d);

						btnEditTime.onclick = function(_this,_div){													
							return function(){
								var ta 				= _div.vLrc.ta;
								_div.lrcTimeArray 	= [];	
								_div.lrcArray 		= [];

								if(!_div.vLrc.de){
									_div.vLrc.de = blo0.blDiv(_div.vLrc,_div.vLrc.id+"de","dEdit",blGrey[4]);
								}
								var de = _div.vLrc.de;
								var a = ta.value;
								var b = a.split("\n");
								de.innerHTML = "";
								for(i in b){
									var l = blo0.blDiv(de,de.id+i, "l"+i + ":" + b[i],blColor[i%blColor.length]);
									l.onclick = function(_div,_i,_timeA,_txtA, _player)
									{
										return function(){											
											_timeA[_i] 	= _player.currentTime;
											_txtA[_i]	= b[_i];
											var oldHTML = _div.innerHTML;
											_div.innerHTML = _i +"["+ _timeA[_i] + "]"+ b[_i];
										 
										}
									}(l,i,_div.lrcTimeArray,_div.lrcArray,_p);
								}
								_on_off_div(_this,_div.vLrc.de);
							}
						}(btnEditTime,_d);
					}
					_d.v.innerHTML 		= ct + "   /    " + ta  + " n=" + _p.getListenerNum();

					_xdMoveLyrics2Div(ta,ct,_d.lrcTimeArray,_d.lrcArray,_d.v4MovingLrc);
				}
			}(this.v.mv);
			this.v.mv.getLrcTxt = function(_d){
				_d.lrcTxt = "***";
				_d.lrcArray = [];
				_d.lrcTimeArray = []; 

				function _getLrc2Array (txt,timeA,txtA){  		

					var lrcVal = txt.replace(/\[\d\d:\d\d.\d\d]/g,"");					
					var tt = lrcVal.split("\n");
					for(i in tt){
						txtA.push(tt[i]);
					}		 

					 //获取歌词时间轴
            		txt.replace(/\[(\d*):(\d*)([\.|\:]\d*)\]/g,function(){
                    	var min = arguments[1] | 0, //分
                        	sec = arguments[2] | 0, //秒
                        	realMin = min * 60 + sec; //计算总秒数
                    		timeA.push(realMin);
           			 }); 
				}
				_d._2do = function(txt){ 
					_d.lrcTxt = txt;
					_d.lrcArray = [];
					_d.lrcTimeArray = []; 
					_getLrc2Array(txt,_d.lrcTimeArray, _d.lrcArray);
				};
				return function(url){ 
					_d.lrcTxt = "Loading ...";					
					blo0.blAjx(_d,url);
				}
			}(this.v.mv);
			this.timer = setInterval(_fnTimer , 100);   
			_on_off_div(this,this.v);
			var b = this; var d = this.v;
			b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
		}
		else{
			if(this.timer){ 
				clearInterval(this.timer);
				this.timer = null;
			}
			else{
				this.timer = setInterval(_fnTimer , 100);   
			}
			_on_off_div(this,this.v);
			var b = this; var d = this.v;
			b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
		}
	};

	v.tb.btnPlay = blo0.blBtn(v.tb, v.tb+"btnPlay","play",blGrey[0]);
	v.tb.btnPlay.onclick = function(){
		if(!this.run){
			this.run = true;
			this.style.backgroundColor = "green";
			this.innerHTML = "pause";
			_p.play();
		} 
		else{
			this.run = false;
			this.style.backgroundColor = "brown";
			this.innerHTML = "play";
			_p.pause();
		}
	}
	
	v.tb.b3 = blo0.blBtn(v.tb, v.tb+"b3","00",blGrey[0]);
	v.tb.b3.onclick = function(){
		_p.currentTime = 0;
	}
}
