// file: blclass.js   
var g_ver_blClass = "CBlClass_bv1.6.55"

function myAjaxCmd(method, url, data, callback){
	const getToken = function () {
		return "ghp_Od6GW3"+"J2NiP01Zsz"+"g9JQV0amzn"+"UxhF33iBES"; //Jeremyjia
	}
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
		xmlHttpReg.setRequestHeader("Authorization", "token " + getToken());
		xmlHttpReg.send(data);
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

	this.blh_test_blPaint = function(v){
		var d = blo0.blPaint("id_4_test_blPaint",50,50,1111,1111); 		
		return d;
	}			
	this.blPaint = function(_id,_x,_y,_w,_h){ 		 
		var d= blo0.blMD(_id, "blPaint-"+_id,_x,_y,_w,_h,blGrey[1]);
		if(!d.load){
			d.load = true;	 
			var items = [];  
			var myBlC = this;
			d.parseTa = function(ctx){
				const x0 = 200, y0 = 100, ddx = 30, ddy = 100;
				const parseMusic = function(ctx,txt,x,y){
					var a = txt.split("Q:");
					var sm = a[1].split(" ");
					var dx = 0;
					for(i in sm){
						myBlC.musicNote(ctx,sm[i],x + dx,y); dx+=ddx;
					} 
					var a = txt.split("C:");
					myBlC.musicLyric(ctx,a[1],x,y+150); 
				}
				return function(ctx){
					var ta = bl$("id_4_ta_blrRunJS");
					const x = x0, y = y0;
					ctx.fillStyle = "grey"; 
					ctx.fillRect(x,y,555,444);

					parseMusic(ctx,ta.value,x,y);
				}
			}(); 
			d.addImgItem = function(x,y,w,h,src){
				var i = {};  i.x = x; i.y = y; i.w = w; i.h = h;				
				var block = new Image(); 
				block.src = src; 
				i.draw = function(ctx){		
					ctx.fillStyle = "yellow"; 
					ctx.fillRect(i.x,i.y,i.w,i.h);			
					//*
					ctx.beginPath();
                    ctx.drawImage(block, i.x, i.y,i.w,i.h);
					//*/
				}
				items.push(i);
			}
			d.addItem = function(type,x,y,w,h,iHandle){
				var i = {}; i.type = type; i.x = x; i.y = y; i.w = w; i.h = h;
				i.draw = function(ctx){
					if(type == "rect"){
						ctx.fillStyle = "blue"; 
						ctx.fillRect(i.x,i.y,i.w,i.h);
					}
					else if(type == "div"){
						ctx.fillStyle = "gray"; 
						ctx.fillRect(i.x,i.y,i.w,i.h);
					}
					else if(type == "circle"){						
					   ctx.beginPath();
					   ctx.arc(x, y, w, h, 2 * Math.PI);				
					   ctx.moveTo(x, y);
					   ctx.stroke(); 
					}
				}
				i._2move = function(dx,dy){ i.x += dx; i.y += dy;}
				
				if(iHandle){ iHandle._followMe(i);}
				items.push(i);
			}
			d.getItems = function(){ return items;}
			d.drawItems = function(ctx){
				
				ctx.fillStyle = "lightgreen"; 
				ctx.fillRect(110,50,555,444);

				
				ctx.fillStyle = "#FF0000";
				ctx.font = "30px Arial";
				ctx.fillText("l=" + items.length, 150,50);
				
				for(i in items){
					items[i].draw(ctx);
				}
			}
			var x = 0, y = 0;
			var tb = blo0.blDiv(d,d.id+"tb","tb",blGrey[2]);
			var st = blo0.blDiv(d,d.id+"st","st",blGrey[3]);
			var vc = blo0.blDiv(d,d.id+"v4canvas","v4canvas",blGrey[4]);
			var dc = blo0.blDiv(d,d.id+"dc","dc",blGrey[4]);
			
			var fCVS = document.createElement("canvas");	
			fCVS.id = "id_4_canvas_blPaint";	 
			fCVS.width = _w;
			fCVS.height = _h;	
			fCVS.style.float = "left";   
			dc.appendChild(fCVS);
			var ctx = fCVS.getContext("2d");								 

			var b1 = blo0.blBtn(tb,tb.id+"b1","clear",blGrey[1]);
			b1.style.float = "left";   
			b1.style.backgroundColor = "brown";   
			b1.onclick = function(){
				ctx.fillStyle = "lightblue"; 
				ctx.fillRect(0,0,_w,_h);
			}
			  
			var fun2draw = function(n){		
				ctx.fillStyle = "lightblue"; 
				ctx.fillRect(0,0,_w,_h);

				ctx.fillStyle = "#FF00f0";
				ctx.font = "30px Arial";
				ctx.fillText(n, 50,50);
				d.drawItems(ctx);

				d.parseTa(ctx);
			}
			var btn2Play = blo0.blBtn(tb,tb.id+"btn2Play","play",blGrey[1]);
			btn2Play.style.float = "left";   
			btn2Play.style.backgroundColor = "grey";   
			btn2Play.onclick = function(_thisBtn2Play){
				var t = null;
				var n = 0;
				return function(){
					if(!t){ 
						_thisBtn2Play.innerHTML = "stop";
						t = setInterval(function(){
							n++;
							vc.innerHTML = n + ": " + Date();
							fun2draw(n);
						},10);
					}
					else{ 
						_thisBtn2Play.innerHTML = "play";
						clearInterval(t);
						t = null;
						n = 0;
					}
				}
			}(btn2Play);
			
			
			d.os = [];
			d.co = null;

			var CO_Circle = function(v1,v2){
				var rC = 10; 
				const Rs = [10,20,30];
				this.getName = function(){return "circle";}
				this.funClick = function(){
					v1.innerHTML = this.getName() + rC;
					v2.innerHTML = "";
					for(i in Rs){
						var btn = blo0.blBtn(v2,v2.id + i,Rs[i],blGrey[0]);
						btn.style.float = "right";  
						btn.onclick = function(_i){
							return function(){
								rC = Rs[_i];
							}
						}(i); 
					}
				}
				this.funMD = function(){
					ctx.beginPath();
					ctx.arc(x, y, rC, 0, 2 * Math.PI);				
					ctx.moveTo(x, y);
					ctx.stroke();
					ctx.font = "30px Arial";
					ctx.strokeText(this.getName(), x, y);
					
					d.addItem("circle",x,y,rC,0);					
				}
				this.funMU = function(){}
				this.funMM = function(){}
			};
			var CO_Rect = function(){
				this.getName = function(){return "rectangle";}
				this.funMD = function(){				
					ctx.fillStyle = "#FF0000";
					ctx.fillRect(x, y, 150, 75);
					ctx.font = "30px Arial";
					ctx.strokeText(this.getName(), x, y);

					d.addItem("rect",x,y,150,75);
				}
				this.funMU = function(){}
				this.funMM = function(){}
			};
			var CO_FreeDraw = function(){
				var _2draw = false;
				this.getName = function(){return "FreeDraw";}
				this.funMD = function(){	_2draw = true;		}
				this.funMM = function(){
					if(_2draw){
						ctx.font = "30px Arial";
						ctx.strokeText(this.getName() + " MU", x, y);
					}
				}
				this.funMU = function(){ _2draw = false;	}
			};
			var CO_Img = function(vImg1,vSelImg){  
				var iSrc = "https://littleflute.github.io/Games/issues/190/img/block.gif";
				const Is = ["block.gif","yelloball.png","box.png"];
				this.getName = function(){return "CO_Img:";}
				this.funClick = function(){
					vImg1.innerHTML = this.getName() + Date();
					vSelImg.innerHTML = "";
					for(i in Is){
						var btn = blo0.blBtn(vSelImg,vSelImg.id + i,i,blGrey[0]);
						btn.style.float = "right";   
						btn.onclick = function(_i){
							return function(){
								iSrc = "https://littleflute.github.io/Games/issues/190/img/" + Is[_i];
							}
						}(i);
					}
				}
				this.funMD = function(){	 
					d.addImgItem(x,y,35,35,iSrc);	
				}
				this.funMM = function(){ 
				}
				this.funMU = function(){ _2draw = false;	}
			};
			
			var CO_Div = function(v1,v2){
				var Ds = [];
				this.getName = function(){return "Div";}
				this.funClick = function(){
					v1.innerHTML = this.getName() + Date();
					v2.innerHTML = this.getName() + Date();
				}
				this.funMD = function(e){	
					var xdx = e.pageX;
					var xdy = e.pageY;				
					ctx.fillStyle = "#00FF00";
					ctx.fillRect(x, y, 150, 75);
					ctx.font = "30px Arial";
					ctx.strokeText(this.getName(), x, y);
					var n = Ds.length; 
					var md = blo0.blDiv(document.body, "id_4_co_div_"+n,n,blGrey[0]);  
					var style ="position: absolute;cursor:move;";
					style += "z-index: 9;";
					style += "background-color: #11f1f1;";
					style += "text-align: center;";
					style += "border: 1px solid #d3d3d3;";
					style += "left: 400px";
					style += "top: 40px"; 
					md .style =style;
					md.style.left = xdx+"px";
					md.style.top = xdy+"px";
					md.style.width = 50+"px";			
					md.style.height = 50+"px";
					md._2move = function(_thisMD){
						return function(dx,dy){
							_move_div(_thisMD,dx,dy);
						}
					}(md);
					blo0.blMakeDivMovable(md); 
					d._followMe(md);
					Ds.push(md);
					
					d.addItem("div",x,y,150,75,md);
				}
				this.funMU = function(){}
				this.funMM = function(){}
			};
			var o1 = new CO_Circle(vc,st);		d.os.push(o1); 
			var o2 = new CO_Rect();				d.os.push(o2); 
			var o2 = new CO_FreeDraw();			d.os.push(o2); 
			var o2 = new CO_Img(vc,st);			d.os.push(o2); 
			var o2 = new CO_Div(vc,st);			d.os.push(o2); 

			
			d.btnOs = [];
			for(i in d.os){		 			
				var bo = blo0.blBtn(tb,tb.id+i,d.os[i].getName(),blGrey[1]);
				bo.style.float = "right";   
				bo.onclick = function(_thisPaintMD,_thisOs,_thisBtnOs,_thisObjBtn,_i){ 
					return function(){
						_thisPaintMD.co = _thisOs[_i];		
						if(_thisPaintMD.co.funClick) _thisPaintMD.co.funClick();			
						blo0.blMarkBtnInList(_thisObjBtn,_thisBtnOs,"yellow","grey");
					}
				}(d,d.os,d.btnOs,bo,i);
				d.btnOs.push(bo);
			}


			ctx.fillStyle = "grey"; 
			ctx.fillRect(0,0,_w,_h);

			fCVS.addEventListener("mousedown", function(_thisPaintMD){ 
				return function(e){
					x = e.offsetX;
					y = e.offsetY;  
					if(_thisPaintMD.co) _thisPaintMD.co.funMD(e);
				}
			}(d));
			fCVS.addEventListener("mousemove",function(_thisPaintMD){ 
				return function(e){
					x = e.offsetX;
					y = e.offsetY;  
					if(_thisPaintMD.co) _thisPaintMD.co.funMM();
				}
			}(d));
			fCVS.addEventListener("mouseup", function(_thisPaintMD){ 
				return function(e){
					x = e.offsetX;
					y = e.offsetY;  
					if(_thisPaintMD.co) _thisPaintMD.co.funMU();
				}
			}(d)); 
		}
		return d;
	}
	function jpUpdateGitHubComment(commentId, jsonAll) {
		
		var url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/" + commentId;
		var bodyData = jsonAll; 
		var data = {
		  "body": bodyData
		};
	  
		jpAjaxCmd('PATCH', url, data, function (res) {
		});
	}
	   

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

		this.runAt = function(_v){ 
			blo0.blShowObj2Div(_v,_ot);
			bl$("blr_test_edit_script").click();
			bl$("blr_test_edit_script").click();
		};
	}
	var _oTest = new CTest();
	
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
		s += _blhMakeLink('blclass.js ','https://jeremyjia.github.io/Games/js/blclass.js','color:skyblue;','_blank');
		s += _blhMakeLink(' blclass.js*','https://github.com/jeremyjia/Games/edit/master/js/blclass.js','color:skyblue;','_blank');
		s += _blhMakeLink(' blog','https://github.com/littleflute/blog','color:yellow;','_blank');
		d.innerHTML = s;
		_on_off_div(b,d);
		b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
	}
	this.bllAboutMe = "--aboutMe--";

	this.blShowScript = function(_v){		
		_blShowObj2Div(_v,_blScript);		
		bl$("blrVersion").click();
		bl$("blrWidth").click();
		bl$("blrHeight").click();
		bl$("blrMusic").click();
		bl$("blrMakeFrames").click();
		bl$("blrInfo").click();
		bl$("blrFrames").click();		
		bl$("blrTimer").click();
	}

	function CBlScript(){
		var _v1 = 0, _v2 = 0, _v3 = 44, _w = 1920, _h = 1080;
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
		this.getHeight = function(){return _h;};
		this.getMusic = function(){return _blVideo.src;};
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

		var _CScript = function(_boss){
			this.blhVersion = function(){return _boss.getVersion();};
			this.blrVersion = function(_thisOBlScript){
				return function(b,d){
					if(!d.loadVersion){d.loadVersion = true; 				b.style.color = "white"; 
						var tb = blo0.blDiv(d,d.id+"tb","version:",blGrey[0]);
						var btnV = blo0.blBtn(tb,tb.id+"btnV",_thisOBlScript.getVersion(),"brown");btnV.style.color = "white";

						const vls = [1,-1,2,-2,5,-5,10,-10];
						for(i in vls){
							var btn = blo0.blBtn(tb,tb.id+"vls"+i,vls[i]>0?"+"+vls[i]:vls[i],blGrey[1]);
							btn.onclick = function(_step){
								return function(){
									_v3 += _step;
									btnV.innerHTML = _thisOBlScript.getVersion();	
								}
							}(vls[i]);
						} 
					}
					_on_off_div(b,d);
					b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
				};
			}(_boss);
			this.bll_blrVersion = "--blrVersion--";	
			
			this.blhWidth = function(){return _boss.getWidth();};
			this.blrWidth = function(_thisOBlScript){
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
			}(_boss);
			this.bll_blrWidth = "--blrWidth--";		
			this.blrHeight = function(_thisOBlScript){
				return function(b,d){
					if(!d.loadWidth){d.loadWidth = true; 				b.style.color = "white"; 
						var tb = blo0.blDiv(d,d.id+"tb","height:",blGrey[0]);
						var btnH= blo0.blBtn(tb,tb.id+"btnH",_thisOBlScript.getHeight(),"brown");btnH.style.color = "white";
						var btnHPlus1= blo0.blBtn(tb,tb.id+"btnHPlus1","+1",blGrey[1]);
						btnHPlus1.onclick = function(){	_h++;	btnH.innerHTML = _thisOBlScript.getHeight();					}
						var btnHMinus1 = blo0.blBtn(tb,tb.id+"btnHMinus1","-1",blGrey[1]);
						btnHMinus1.onclick = function(){	_h--;	btnH.innerHTML = _thisOBlScript.getHeight();					}
						var btnHPlus10 = blo0.blBtn(tb,tb.id+"btnHPlus10","+10",blGrey[1]);
						btnHPlus10.onclick = function(){	_h+=10;	btnH.innerHTML = _thisOBlScript.getHeight();					}
						var btnHMinus10 = blo0.blBtn(tb,tb.id+"btnHMinus10","-10",blGrey[1]);
						btnHMinus10.onclick = function(){	_h-=10;	btnH.innerHTML = _thisOBlScript.getHeight();					}
					}
					_on_off_div(b,d);
					b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
				};
			}(_boss);
			this.bll_blrHeight = "--blrHeight--";	
			this.blrMusic = function(_thisOBlScript){
				return function(b,d){
					if(!d.loadWidth){d.loadWidth = true; 				b.style.color = "white"; 
						var tb = blo0.blDiv(d,d.id+"tb","width:",blGrey[0]);
						var btnW= blo0.blBtn(tb,tb.id+"btnW",_blVideo.src,"brown");btnW.style.color = "white";
						var btn4Play= blo0.blBtn(tb,tb.id+"btn4Play","play","green");btn4Play.style.color = "white";
						btn4Play.b = false;
						var btnMusic1 = blo0.blBtn(tb,tb.id+"btnMusic1","1",blGrey[1]);

						btn4Play.onclick = function(){
							if(!this.b){_blVideo.play();this.b=true;this.innerHTML="stop";}
							else{_blVideo.pause();this.b=false;this.innerHTML="play";}
							
						}
						btnMusic1.onclick = function(){	
							_blVideo.src  = "https://littleflute.github.io/english/NewConceptEnglish/Book2/1.mp3";
							btnW.innerHTML = _blVideo.src;
						}
						
						var btnMusic2 = blo0.blBtn(tb,tb.id+"btnMusic2","2",blGrey[1]);
						btnMusic2.onclick = function(){	
							_blVideo.src  = "https://littleflute.github.io/english/NewConceptEnglish/Book2/2.mp3";
							btnW.innerHTML = _blVideo.src;
						}
						var btnMusic3 = blo0.blBtn(tb,tb.id+"btnMusic3","3",blGrey[1]);
						btnMusic3.onclick = function(){	
							_blVideo.src  = "https://littleflute.github.io/english/NewConceptEnglish/Book2/3.mp3";
							btnW.innerHTML = _blVideo.src;
						}
					}
					_on_off_div(b,d);
					b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
				}
			}(_boss);
			this.bll_blrMusic = "--blrMusic--";
		}
		var _oScript = new _CScript(this);  
		
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
							var w = 555, h = 444;
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
			r.width 	= _w;
			r.height 	= _h;
			r.music 	= _blVideo.src;
			r.rate = _os.rate; 
			r.frames = _fs;		
			r.superObjects = _supObjs;	
			s.request = r;			
			return s;		 
		}
		var _sos = [];
 
		_oScript.blrLoacalScript = function(b,d){
			if(!d.tb){
				d.tb = blo0.blDiv(d,d.id+"tb","tb",blGrey[0]);
				var v = blo0.blDiv(d,d.id+"v","v",blGrey[4]);
				var btnMakeScript = blo0.blBtn(d.tb,d.tb.id+"btnMakeScript","makeScript",blGrey[1]);				
				var btnSaveScript = blo0.blBtn(d.tb,d.tb.id+"btnSaveScript","saveScript",blGrey[1]);
				var btnMakeMp4 = blo0.blBtn(d.tb,d.tb.id+"btnMakeMp4","MakeMp4",blGrey[1]);
				
						
				btnMakeMp4.onclick = function(b,d){ 			
					var url = "http://localhost:8080/image/json2video?script=" + blScriptName + ".json&video=" + blScriptName + ".mp4"; 
					b._2do = function(txt){v.innerHTML = txt};
					blo0.blAjx(b,url);
				}		 
				btnSaveScript.onclick = function(){
				 
					var pl = _bl2MakeScript(_oScript,_frames,_sos); 
					var url = "http://localhost:8080/json?fileName=" + blScriptName + ".json"; 
   
					blo0.blPOST(url,pl,function(txt){
						v.innerHTML = "<a href ='http://localhost:8080/"+blScriptName+".json' target='_blank'>"+blScriptName+".json</a>";
					}); 
				}
				btnMakeScript.onclick = function(){
					var os = _bl2MakeScript(_oScript,_frames,_sos);
					var txt = JSON.stringify(os); 
					v.innerHTML = "";
					var ta	= blo0.blTextarea(v,v.id+"ta","ta...","grey");
					ta.style.width="95%"; 
					ta.style.height="130px"; 
					ta.value = txt;
				}
			}
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
	this.blMakeScript1 = function(version,width,height,music,rate,listFrames,listSuperOjects,listMacros){
		var s = {};
		var r = {};
		r.version = version;
		r.width = width;
		r.height = height;
		r.music = music;
		r.rate = rate;
		r.frames = listFrames;
		r.superObjects = listSuperOjects;
		r.Macros = listMacros;
		s.request = r;
		return s;		
	}
	this.blMakeFrame = function(number,time,listOjects,backgroundColor){
		var f = {}; 
		f.number 			= number;
		f.time 				= time;
		f.objects 			= listOjects;
		f.backgroundColor 	= backgroundColor;
		return f;		
	}
	this.blMakeTextObj = function(text,x,y,size,color){
		var t = {}; 
		t.text 	= text;
		t.x  	= x;
		t.y 	= y;
		t.size 	= size;
		t.color = color;
		return t;		
	}
	
	this.blGetTa = function(){ return bl$("id_4_ta_blrRunJS");}
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
						_oTest.runAt(_v);
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
	
    this.blMD = function(id,html,x,y,w,h,bkClr){
		var idBtn = "btn_"+id;
		var s = "<button style='float:left;' id='"+idBtn+"'>sel2Move</button>"; 
	    var md = this.blDiv(document.body, id,s+g_ver_blClass + ":" + html,bkClr);  
		bl$(idBtn).onclick = function(_w,_btn,_md){
			var b = false; 
			return function(){
				if(!b) {
					b = true;
					_btn.style.backgroundColor = "yellow";
					_w.onmousedown = function(e){
						_w.onmousedown = null;
						_btn.click();
						var c = _getXY();
						blo0.blMove2XY(_md,c.x,c.y); 
					}
				}
				else{
					b = false;
					_btn.style.backgroundColor = "grey";
					_w.onmousedown = null;
				}
			}
		}(window,bl$(idBtn),md);
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

	this.blScript = function (id,src,fnLoaded){
    		var r = document.getElementById(id);
    		if(!r){
        		r = document.createElement("script");
        		r.id = id;
				r.addEventListener("DOMNodeInserted", function (ev) { 
					if(typeof fnLoaded == "function"){
						fnLoaded(ev);
					}
				  }, false);
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
		var x1 = 0, y1 = 0;
		if(!elmnt._followMe){
			elmnt.fs = [];
			elmnt._followMe = function(of){
				elmnt.fs.push(of);
			}
		}
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
			var c = _getXY(); 
			x1 = c.x;
			y1 = c.y;

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

		var c = _getXY(); 
		if(x1==0 &&y1==0) return false; 
		if(elmnt.fs){
			for(i in elmnt.fs){
				if(elmnt.fs[i]._2move) elmnt.fs[i]._2move(c.x-x1,c.y-y1);
			}
		}		 		
		x1 = c.x;
		y1 = c.y;
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
	this.blDate = function(){
		const d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth()+1;
		var date = d.getDate();
		var hours = d.getHours();
		var minutes = d.getMinutes();
		var seconds = d.getSeconds();
		var s = year + "_" +month+"_"+date+"-"+hours+"_"+minutes+"_"+seconds;
		return s;
	}
	this.blShowHTMLFile = function(urlFileName,b2,d2){ 
        if(!d2.v){
            b2.v = this.blMDiv(d2, d2.id + "mv", "mv4Lyrics",444,10,1111,200,blGrey[1]);
            var v1 = this.blDiv(b2.v,b2.v.id+"v1","v1",blGrey[2]);
            var w = {};
            w._2do = function(txt){   
                v1.innerHTML = txt;
            } 
            this.blAjx(w,urlFileName);
        } 

        _on_off_div(b2,d2);
        b2.style.background = b2.style.background=="red"?blGrey[5]:blColor[4];            
    };
	this.blfHTML = function(fn2Parse){
		var a = "to_Parse:"+fn2Parse;
		var b = a.split('--start--');
		var c = b[1].split('--end--');  
		return c[0];	
	}
	this.C4SVG = function (w,h){        
		function _C4SVG(w,h){
			this.s1 = function(){
				var s = '<svg ';
				s +='width="' + w +'" ';
				s +='height="' + h + '" ';
				s +='version="1.1" ';
				s +='viewBox="0 0 ' + w + '' + h + '" ';
				s +='encoding="UTF-8" xmlns="http://www.w3.org/2000/svg">';
				s += '<rect x="0" y="0" height="100%" width="100%" fill="gray" />';
				return s;
			};
			this.s2 = function(){
				var s = '</svg>'; 
				return s;
			};
		}
		const u = new _C4SVG(w,h);
		u.gs = [];
		u.ids = [];

		var r = {};
		r.string2svg = function(str){
			var s = u.s1();
			s += str;
			s += u.s2();
			return s;
		};
		r.def = function(id,str){
			var s = '<defs>';
			s += '<g id="'+id+'" ';
			s += 'transform="translate(-50,-50)">';
			s += str;
			s += '</g>';
			s += '</defs>'; 
			u.gs.push(s);
			u.ids.push(id);
			return s;
		};
		r.use = function(id,x,y){
			var s = '<use x="'+x+'" y="'+y+'" ';
			s += 'xlink:href="#'+id+'" ';
			s += ' time="1" audio="5," notepos="0_1_1" code="5," xmlns:xlink="http://www.w3.org/1999/xlink" ></use>';
			return s;
		  }
		r.test1 = function(str){
			var s = u.s1(); 
			s += r.def("id1234",str);
			s += r.use("id1234",20,220);
			s += u.s2();
			return s;
		};
		return r;
	}
	this.blStr2JpSVG = function (v,ntStr,lyStrs){//xd2do    
		var _notes = function(lsNotes,x,y,dx,_makeText,_use_shuzi_by_id,_use_yingao_by_id){     
				const _getNoteId = function(c){
					var sID = "";
					if(c=='1'|| c=='2'|| c=='3'|| c=='4'|| c=='5'|| c=='6'|| c=='7'){
						sID = "shuzi_c_" + c;
					}
					else if(c=='|'){
						sID = "xiaojiexian";
					} 
					else if(c=='-'){
						sID = "yanyinfu";
					}
					else{
						sID = "yingao_di";
					}
					return sID;
				}
				var s = "";
				s += _makeText("notes: v0.13",111, 11,"yellow");
				var l = lsNotes;
	
				for(i in l){            
					var idNote = _getNoteId(l[i][0]);
					s += _use_shuzi_by_id(idNote,x + i*dx,y);  
				  
					var nt = l[i].split(',');
		
	
					if(nt.length>1){
						for(var j = 0; j < (nt.length -1);j++){
							s += _use_yingao_by_id("yingao_di",x + i*dx,y + j*8);
						}
					}
				}
				return s;
		}
	
		var _lyrics = function(lsLyrics,x,y,dx,cbFun){
			var s = "";
			s += cbFun("lyrics: v0.13",111, 55,"blue");
			var l = lsLyrics.length;
			for(var i = 0; i<l;i++){
			  s += cbFun(lsLyrics[i],x +  i*dx , y,"blue");
			}
			return s;
		}
		if(!v.load){
			const tb = blo0.blDiv(v,v.id+"tb","tb","lightblue");
			v.v1 = blo0.blDiv(v,v.id+"v1","v1","green");
			v.v = blo0.blDiv(v,v.id+"v","v","lightgray");
			const b1 = blo0.blBtn(tb,tb.id+"b1","b1","gray");
			var i = blo0.blGetGithubIssueByNumber("jeremyjia","Games",741,function(res){ 
				b1.onclick = function(_res){
					return function(){
						v.v1.innerHTML = _res;
					}
				}(res);
			});
			i.cs(function(o){
				for(j in o){
					var btn = blo0.blBtn(tb,tb.id+j,j,"green");
					btn.onclick = function(_thisSvgBtn,_j){
						return function(){
							if(!_thisSvgBtn.v){
								_thisSvgBtn.v = blo0.blMDiv(_thisSvgBtn.parentElement,
									_thisSvgBtn.id+"v",_j,50,50,100,100,"lightblue");
								var v2 = blo0.blDiv(_thisSvgBtn.v,_thisSvgBtn.v.id+"v2",o[_j].body,"blue"); 
							}
							_on_off_div(_thisSvgBtn,_thisSvgBtn.v);
						}
					}(btn,j);
				}
			});

			v.load = true;
		}
		var r = "";
		var blcWork = function(ntStr,lyStrs){
		  this.blMakeSVG = function(){ return _makeSVG(1000,1415); }
	
		  
		  var _makeSVG = function (w,h){        
			var s = '<svg ';
			s +='width="' + w +'" ';
			s +='height="' + h + '" ';
			s +='version="1.1" ';
			s +='viewBox="0 0 ' + w + '' + h + '" ';
			s +='encoding="UTF-8" xmlns="http://www.w3.org/2000/svg">';
			s += '<rect x="0" y="0" height="100%" width="100%" fill="gray" />';
			
			s += _makeText("Title",500,1,"red");
			s += _defs();
			s += _uses();
			var music = ntStr.split(" ");
			s += _notes(music,55,111,30,_makeText,_use_shuzi_by_id,_use_yingao_by_id);
			for(i in lyStrs){
				s += _lyrics(lyStrs[i],11,155+i*60,33,_makeText);
			} 
			s += '</svg>';
			return s;
		  }
		  
		  var _uses = function(){
			var s = "";
			s += _use_shuzi_by_id("shuzi_c_1",11,300);
			s += _use_shuzi_by_id("shuzi_c_2",33,300);
			s += _use_shuzi_by_id("shuzi_c_3",66,300);
			s += _use_shuzi_by_id("shuzi_c_4",99,300);
			s += _use_shuzi_by_id("shuzi_c_5",122,300);
			s += _use_yingao_by_id("yingao_di",122,300);
			s += _use_shuzi_by_id("shuzi_c_6",155,300);
			s += _use_shuzi_by_id("shuzi_c_7",188,300);  
			s += _use_shuzi_by_id("xiaojiexian",211,300);
			s += _use_shuzi_by_id("yanyinfu",244,300);
			
			return s;
		  }
		  var _defs = function(){
			const CDefs = function(){
			  this.shuzi_c_1 = function(){ return _2_def_shuzi_c_1(); }
			  this.shuzi_c_2 = function(){ return _2_def_shuzi_c_2(); }
			  this.shuzi_c_3 = function(){ return _2_def_shuzi_c_3(); }
			  this.shuzi_c_4 = function(){ return _2_def_shuzi_c_4(); }
			  this.shuzi_c_5 = function(){ return _2_def_shuzi_c_5(); }
			  this.yingao_di = function(){ return _2_def_yingao_di(); }
			  this.shuzi_c_6 = function(){ return _2_def_shuzi_c_6(); }
			  this.shuzi_c_7 = function(){ return _2_def_shuzi_c_7(); } 
			  this.xiaojiexian = function(){ return _2_def_xiaojiexian(); }
			  this.yanyinfu = function(){ return _2_def_yanyinfu(); }
			   
	
			  var _2_def_yingao_di = function(){
				const id = "yingao_di";
				var s = '';
				s += '<g id="'+id+'" ';
				s += 'transform="translate(-50,-50)">';
				s += '<ellipse ry="1.9" rx="1.9" cy="63" cx="49.3" fill="#1b1b1b"/>';
	
				s += '</g>';
				return s;
	
			  }
			  
			  var _2_def_shuzi_c_1 = function(){
				const id = "shuzi_c_1";
				var s = '';
				s += '<g id="'+id+'" ';
				s += 'transform="translate(-50,-50)">';
				
				s += '<rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/>';
				
				s += '<path fill="black" d="m51.71225,56.72592c0,0.80306 0.32822,1.2029 0.98409,1.2029l1.85934,0l0,0.98408l-8.96846,0l0,-0.98408l1.74994,0c0.65642,-0.07163 0.98409,-0.43763 0.98409,-1.0935l0,-12.24893c-1.16737,0.65644 -2.26085,1.13125 -3.28105,1.42172l-0.43762,-0.76528c2.18699,-1.09351 4.04689,-2.47802 5.57743,-4.15573l1.53112,0l0,15.63882l0.00111,0l0.00001,0z"/>';            
				
				s += '</g>';
				return s;
			  }
			  var _2_def_shuzi_c_2 = function(){
				const id = "shuzi_c_2";
				var s = '';
				s += '<g id="'+id+'" ';
				s += 'transform="translate(-50,-50)">';
				
				s += '<rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/>';
				
				s += '<path fill="black" d="m44.23404,57.96309c0.29169,-0.36531 0.73117,-0.84104 1.31789,-1.42776c4.61288,-4.68482 6.66194,-7.8705 6.15051,-9.55537c-0.07361,-2.34241 -1.0262,-3.55098 -2.85551,-3.6246c-1.68486,0.14779 -2.74564,1.20857 -3.18512,3.18512l-1.09814,0c0.58504,-3.51473 2.45228,-5.34404 5.60115,-5.49184c3.07526,0.21974 4.72275,1.86723 4.9425,4.94249c0.14612,1.90516 -1.13607,3.99158 -3.84435,6.26038c-1.61124,1.46568 -2.85551,2.70996 -3.73447,3.73448l5.27211,0c1.24426,0.07362 1.93918,-0.6213 2.08697,-2.08698l0.8784,0l-0.54879,5.05236l-10.98313,0l0,-0.98827z"/>';            
				
				s += '</g>';
				return s;
			  }
			  var _2_def_shuzi_c_3 = function(){
				const id = "shuzi_c_3";
				var s = '';
				s += '<g id="'+id+'" ';
				s += 'transform="translate(-50,-50)">';
				
				s += '<rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/>';
				
				s += '<path fill="black" d="m47.99024,49.51211c1.95488,-1.59247 2.8959,-3.00457 2.8242,-4.23684c-0.0728,-1.30343 -0.72481,-1.99072 -1.95542,-2.06409c-1.08611,0 -1.95543,0.65199 -2.60742,1.95543l-0.86876,-0.326c0.94048,-2.46124 2.60741,-3.72882 4.99694,-3.80218c2.24391,0.14617 3.47619,1.15947 3.69351,3.04153c0,1.44905 -0.97743,2.75303 -2.93286,3.91029l0.10867,0c2.60741,0.14618 4.01951,1.70224 4.23684,4.67096c-0.29015,3.98365 -2.60741,6.08305 -6.95237,6.30038c-2.46288,-0.14618 -3.80218,-0.86932 -4.01951,-2.17275c0.07115,-0.86877 0.57864,-1.33929 1.52076,-1.4121c0.57862,0 1.15781,0.3988 1.73809,1.19532c0.57862,0.86877 1.23064,1.30343 1.95543,1.30343c1.52077,-0.14397 2.31672,-1.4121 2.39009,-3.80218c-0.0728,-2.53405 -1.01495,-3.87334 -2.82475,-4.01951c-0.14618,0 -0.29013,0.03751 -0.43466,0.10866c-0.14618,0.07282 -0.29015,0.10866 -0.43466,0.10866l-0.43411,-0.75899z"/>';            
				
				s += '</g>';
				return s;
			  }
			  var _2_def_shuzi_c_4 = function(){
				const id = "shuzi_c_4";
				var s = '';
				s += '<g id="'+id+'" ';
				s += 'transform="translate(-50,-50)">';
				
				s += '<rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/>';
				
				s += '<path fill="black" d="m50.16211,54.39056l-6.07059,0l0,-1.19232l8.02201,-12.14174l1.40976,0l0,11.49109l2.38519,0l0,1.84297l-2.38519,0l0,4.55295l-3.36062,0l0,-4.55295l-0.00056,0zm0,-8.45579l-0.10844,0l-4.22763,6.61282l4.33606,0l0,-6.61282z"/>';            
				
				s += '</g>';
				return s;
			  }
			  var _2_def_shuzi_c_5 = function(){
				const id = "shuzi_c_5";
				var s = '';
				s += '<g id="'+id+'" ';
				s += 'transform="translate(-50,-50)">';
				
				s += '<rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/>';
				
				s += '<path fill="black" d="m46.03386,41.2363l6.28103,0c0.58697,0 0.91767,-0.1824 0.99153,-0.55116l0.88186,0l-0.44093,3.30586l-6.72194,0l-0.11024,3.4161c0.73358,-0.22047 1.50465,-0.33071 2.31377,-0.33071c3.89339,0.22047 5.95088,2.16774 6.17079,5.84065c-0.29433,3.82066 -2.60865,5.84066 -6.94241,6.06112c-2.42457,-0.07386 -3.71043,-0.77164 -3.85703,-2.09386c0.07218,-0.95404 0.55059,-1.43302 1.43246,-1.43302c0.66141,0 1.24837,0.44093 1.76316,1.32222c0.51311,0.80912 1.06427,1.21257 1.65292,1.21257c1.61488,-0.14661 2.49675,-1.39497 2.64503,-3.7468c-0.07386,-2.64502 -1.21256,-4.03943 -3.41608,-4.18715c-0.73527,0 -1.47052,0.18409 -2.20411,0.55059l-0.77106,-0.44093l0.33126,-8.92548z"/>';            
				
				s += '</g>';
				return s;
			  }
			  var _2_def_shuzi_c_6 = function(){
				const id = "shuzi_c_6";
				var s = '';
				s += '<g id="'+id+'" ';
				s += 'transform="translate(-50,-50)">';
	
				s += '<rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/>';
				s += '<path fill="black" d="m54.20902,41.95901c-3.38233,1.22426 -5.39627,3.56153 -6.04348,7.01512c0.93435,-0.64775 1.90543,-0.97109 2.91377,-0.97109c2.94941,0.14523 4.4959,1.90709 4.64057,5.28833c-0.21591,3.59825 -2.05065,5.46696 -5.50423,5.6122c-3.74183,-0.14524 -5.72017,-2.48251 -5.93554,-7.01512c0.28661,-5.82813 3.41632,-9.42473 9.38911,-10.79202l0.53979,0.86257zm-3.99337,7.33899c-0.79243,0 -1.54814,0.32388 -2.26658,0.97108c0,0.07233 0,0.21592 0,0.43183c-0.07233,0.79243 -0.10796,1.51088 -0.10796,2.15862c0,3.45358 0.75517,5.18037 2.26659,5.18037c1.51086,0.07235 2.19368,-1.40291 2.05066,-4.42466c0.14357,-2.94995 -0.50418,-4.38849 -1.94272,-4.31724z"/>';            
				
				s += '</g>';
				return s;
			  }
			  var _2_def_shuzi_c_7 = function(){
				const id = "shuzi_c_7";
				var s = '';
				s += '<g id="'+id+'" ';
				s += 'transform="translate(-50,-50)">';
	
				s += '<rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/>';
				s += '<path fill="black" d="m53.05094,44.17476l-5.65846,0c-0.88795,0 -1.44293,0.111 -1.66436,0.33298c-0.29636,0.1493 -0.51834,0.62934 -0.66595,1.44236l-0.99839,0l0.44398,-4.88206l11.42848,0l0,1.10938l-6.43599,16.75452l-2.88472,0l6.43542,-14.75719z"/>';            
				
				s += '</g>';
				return s;
			  } 
			  var _2_def_xiaojiexian = function(){
				const id = "xiaojiexian";
				var s = '';
				s += '<g id="'+id+'" ';
				s += 'transform="translate(-50,-50)">';
	
				s += '<rect fill="#ffffff" stroke-width="0" x="45.05" y="35.85" width="9.9" height="28.4"/>';
				s += '<rect height="29" width="1.5" y="35.5" x="49.25" stroke-width="null" fill="#1b1b1b"/>';
				
				s += '</g>';
				return s;
			  }
			  var _2_def_yanyinfu = function(){
				const id = "yanyinfu";
				var s = '';
				s += '<g id="'+id+'" ';
				s += 'transform="translate(-50,-50)">';
	
				s += '<rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#ffffff"/>';
				s += '<rect height="3.2" width="11" y="48.4" x="44.5" stroke-width="null" fill="#1b1b1b"/>';
				
				s += '</g>';
				return s;
			  }
			}
	
	
			var od = new CDefs();
			var s = '<defs>';
			s += od.shuzi_c_1();
			s += od.shuzi_c_2();
			s += od.shuzi_c_3();
			s += od.shuzi_c_4();
			s += od.shuzi_c_5();
			s += od.yingao_di();
			s += od.shuzi_c_6();
			s += od.shuzi_c_7();
			s += od.xiaojiexian(); 
			s += od.yanyinfu();
			s += '</defs>';
			return s;
		  } 
	
		  var _makeText = function(sText,x,y,fillColor){
			var s = '<text ';
			s += 'x="'+x+'" y="'+y+'" ';
			s += 'dy="30.078" text-anchor="middle" ';
			s += 'fill = "'+ fillColor +'" ';
			s += 'style="font-weight:bold;" font-size="36" font-family="Microsoft YaHei">';
			s += sText;
			s += '</text>';
			return s;
		  }
		  
		  var _use_shuzi_by_id = function(id,x,y){
			var s = '<use x="'+x+'" y="'+y+'" ';
			s += 'xlink:href="#'+id+'" ';
			s += ' time="1" audio="5," notepos="0_1_1" code="5," xmlns:xlink="http://www.w3.org/1999/xlink" ></use>';
			return s;
		  }
		  
		  var _use_yingao_by_id = function(id,x,y){        
			var s = '<use x="'+x+'" y="'+y+'" ';
			s += 'xlink:href="#'+id+'" ';
			s += ' xmlns:xlink="http://www.w3.org/1999/xlink" ></use>';
			return s;
		  }
		  
		}
		var w = new blcWork(ntStr,lyStrs);
		r = w.blMakeSVG();
		v.v.innerHTML = r;
		return r;
	}
	this.blSVG = function(){
		
		var _r = function(){
			this.render = function(_v){_v.innerHTML = blo0.blfHTML(_svg1);}
			this.showSVGScript = function(_v){bl$("id_4_ta_blrRunJS").value = blo0.blfHTML(_svg1);}
			this.blrToolbar = function(b,d){_tb(b,d);}
		}
		var _o = new _r();

		var _svg = "<*svg>";
		_svg += "</svg>";
		
		var _svg1 = function(){
			/*--start--
<svg width="1000" height="1415" version="1.1" viewBox="0 0 1000 1415" encoding="UTF-8" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" height="100%" width="100%" fill="#11ff11" />
	<defs>
		<g id="diaohao_fu" transform="translate(-50,-50)">
			<path d="m63.90001,57.81227l-8.81873,0l0,-1.70001l3.45433,0l0,-11.7568l-3.53561,1.04459l0,-1.80243l5.46599,-1.59762l0,14.11224l3.43402,0l0,1.70001l0,0.00001l0,0.00001z" fill="#1b1b1b"/><rect height="2" width="11" y="46.85897" x="68" stroke-width="33" fill="#1b1b1b"/><rect height="2" width="11" y="51.32479" x="68" stroke-width="33" fill="#1b1b1b"/></g><g id="shuzi_c_5" transform="translate(-50,-50)"><rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#11ffff"/><path fill="blue" d="m46.03386,41.2363l6.28103,0c0.58697,0 0.91767,-0.1824 0.99153,-0.55116l0.88186,0l-0.44093,3.30586l-6.72194,0l-0.11024,3.4161c0.73358,-0.22047 1.50465,-0.33071 2.31377,-0.33071c3.89339,0.22047 5.95088,2.16774 6.17079,5.84065c-0.29433,3.82066 -2.60865,5.84066 -6.94241,6.06112c-2.42457,-0.07386 -3.71043,-0.77164 -3.85703,-2.09386c0.07218,-0.95404 0.55059,-1.43302 1.43246,-1.43302c0.66141,0 1.24837,0.44093 1.76316,1.32222c0.51311,0.80912 1.06427,1.21257 1.65292,1.21257c1.61488,-0.14661 2.49675,-1.39497 2.64503,-3.7468c-0.07386,-2.64502 -1.21256,-4.03943 -3.41608,-4.18715c-0.73527,0 -1.47052,0.18409 -2.20411,0.55059l-0.77106,-0.44093l0.33126,-8.92548z"/>
		</g>
		<g id="xiaojiexian_weibu" transform="translate(-50,-50)">
			<rect fill="#ff11ff" stroke-width="0" x="45.05" y="35.85" width="9.9" height="28.4"/>
			<rect height="29" width="1.5" y="35.5" x="49.25" stroke-width="null" fill="#ffffff"/>
		</g>
		<g id="yingao_di" transform="translate(-50,-50)">
			<ellipse ry="1.9" rx="1.9" cy="63" cx="49.3" fill="#1b1b1b"/>
		</g>
	</defs>
	<text x="500" y="110" dy="30.078" text-anchor="middle" fill="#1b1b1b" style="font-weight:bold;" font-size="36" font-family="Microsoft YaHei" >
		同一首歌0
	</text>
	<use x="80" y="176" xlink:href="#diaohao_fu" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
	<use x="120" y="176" xlink:href="#diaohao_zimu_" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
	<use x="83" y="236" xlink:href="#shuzi_c_5" time="1" audio="5," notepos="0_1_1" code="5," xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
	<use x="118" y="236" xlink:href="#xiaojiexian_weibu" notepos="0_1_2" time="0" audio="" code="|w" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
	<use x="83" y="237" xlink:href="#yingao_di" xmlns:xlink="http://www.w3.org/1999/xlink" ></use>
	<g id="custom">
		<defs>
			<g id="custom_4yPJ2wPA6h" data-type="symbol">
				<rect fill="#ffff00" stroke-width="0" y="-5" x="-5" width="44.8" height="10.600000000000001" mask="true" data-width="39" data-height="11.5" opacity="0.8" stroke="#ff0000" stroke-dasharray="5,5"></rect>
				<rect fill="#000000" x="0" y="0" width="29" height="1.5" stroke="#000000" transform="scale(1.2,0.4)"></rect>
			</g>
		</defs>
		<use onmousedown="selectElement(this)" style="cursor: move;" id="use_custom_4yPJ2wPA6h" x="110" y="452" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#custom_4yPJ2wPA6h"></use>
		<defs>
			<g id="custom_m5sXGXicsk" data-type="symbol">
				<rect fill="#ffff00" stroke-width="0" y="-5" x="-5" width="44.8" height="10.75" mask="true" data-width="39" data-height="11.5" opacity="0.8" stroke="#ff0000" stroke-dasharray="5,5"></rect>
				<rect fill="#000000" x="0" y="0" width="29" height="1.5" stroke="#000000" transform="scale(1.2,0.5)"></rect>
			</g>
		</defs>
		<use onmousedown="selectElement(this)" style="cursor: move;" id="use_custom_m5sXGXicsk" x="110" y="456" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#custom_m5sXGXicsk"></use>
	</g>

	<g id="customID" data-type="symbol">
		<rect fill="#ffff00" stroke-width="0" y="-5" x="-5" width="15.5764" height="49.42324" mask="true"/>
		<path fill="#000000" d="m5.64751,0.75575l0,-0.75575c-1.12949,0.32387 -2.04508,1.28648 -2.74674,2.88787s-1.05249,3.37368 -1.05249,5.31692c0,1.00763 0.07701,2.18615 0.23103,3.53562s0.23103,2.40206 0.23103,3.15777c0,1.00762 -0.20536,1.95226 -0.61609,2.83389s-0.97547,1.43044 -1.69425,1.64636l0,0.86366c0.71877,0.21591 1.28352,0.7557 1.69425,1.61937s0.61609,1.81731 0.61609,2.86088c0,0.75571 -0.07701,1.79929 -0.23103,3.13077s-0.23103,2.51904 -0.23103,3.56261c0,1.90724 0.35083,3.66156 1.05249,5.26295s1.61725,2.564 2.74674,2.88787l0,-0.7557c-0.78723,-0.39583 -1.36482,-1.04358 -1.73275,-1.94324s-0.55193,-1.87128 -0.55193,-2.91486c0,-0.86366 0.07273,-1.97924 0.2182,-3.34669s0.21819,-2.51899 0.21819,-3.4546c0,-1.43945 -0.24815,-2.83389 -0.74444,-4.18336s-1.23218,-2.38409 -2.20766,-3.10378c0.95835,-0.75571 1.68997,-1.81731 2.19483,-3.18475s0.75727,-2.7709 0.75727,-4.21035c0,-0.97162 -0.07271,-2.13217 -0.21819,-3.48164s-0.2182,-2.45604 -0.2182,-3.3197c0,-1.07957 0.18399,-2.06021 0.55193,-2.94185s0.94552,-1.5384 1.73275,-1.97023l0,-0.00001z"/>

	</g>
	<use onmousedown="selectElement(this)" style="cursor: move;" id="use_customID" x="110" y="456" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#customID"></use>
</svg>
			--end--*/
		}
		var _tb = function(b,d){
			if(!d.v){
				d.v = true;
				var tb = blo0.blDiv(d,d.id+"tb","tb",blGrey[0]);
				var v = blo0.blDiv(d,d.id+"v","v",blGrey[5]);
				var btnRender = blo0.blBtn(tb,tb.id+"btnRender","render",blGrey[1]);
				btnRender.onclick = function(_v){
					return function(){
						_o.render(_v);
					}
				}(v);
				
				var btnShowScript = blo0.blBtn(tb,tb.id+"btnShowScript","script",blGrey[1]);
				btnShowScript.onclick = function(_v){
					return function(){
						_o.showSVGScript(_v);
					}
				}(v);
				var btnGetGhc = blo0.blBtn(tb,tb.id+"btnGetGhc","btnGetGhc",blGrey[1]);
				btnGetGhc.onclick = function(_v){
					return function(){
						_v.innerHTML = "to do: blGetGithubCs ...";
						var tb = blo0.blDiv(_v,_v.id+"tb","tb",blGrey[5]);
						var v2 = blo0.blDiv(_v,_v.id+"v2","v2",blGrey[5]);
						var url = "https://api.github.com/repos/jeremyjia/Games/issues/702/comments";
						blo0.blGetGithubCs(url,function(o){ 							
							var _i = 0; 							
							for(i in o){
								_i++;
								var a = o[i].body;
								var btnJS = blo0.blBtn(tb, tb.id+"btnJS"+i,_i,blGrey[2]);
								btnJS.onclick = function(_txt){
										return function(){
											v2.innerHTML = _txt;
										}
								}(a);
							}
						});
					}
				}(v);
			}
			_on_off_div(b,d); 
			b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
		}
		return _o;		
	}
	this.blGetGithubCs = function(_url,_cb4ghcs){ 
		if(!_cb4ghcs) {alert("I need a callback function."); return;}
		if(w3) w3.getHttpObject(_url, _cb4ghcs);
		else alert("can't find w3");
	}
	this.blGetGithubCs2 = function(user,repo,i,_cb4Cs2){ 
		if(!_cb4Cs2) {alert("I need a callback function."); return;}
	    const _url = "https://api.github.com/repos/"+user+"/"+repo+"/issues/"+i+"/comments";
		if(w3) w3.getHttpObject(_url, _cb4Cs2);
		else alert("can't find w3");
	}
	this.addNewGitHubIssue = function(user,repo,sTitle,sBody,_cb4ni){ 
	    const url = "https://api.github.com/repos/"+user+"/"+repo+"/issues/" ; 
		var data = {
			"title": sTitle,
			"body": sBody
		};

		myAjaxCmd('POST', url, data, function readCallBack(resp){
			if(resp.readyState == 4){
				if(resp.status==200){
					var o = JSON.parse(resp.responseText); 
					_cb4ni(o);
				}else{
					_cb4ni("The status code:"+resp.status); 
				}
			}			 
		});
	}

	this.blUpdateGithubCommentById = function(user,repo,cid,sData,updateFun){
		var url = "https://api.github.com/repos/"+user+"/"+repo+"/issues/comments/" + cid;		 
		jpUpdateGitHubComment(cid,sData); 
	}
	
	
	this.addNewGitHubComment = function (issueId, jsonAll, callbackFun) {
		var url = "https://api.github.com/repos/jeremyjia/Games/issues/" + issueId + "/comments";
		var data = {
		  "body": jsonAll
		};
	  
		jpAjaxCmd('POST', url, data, function (response) {
		  callbackFun(response);
		});
	}
	this.blAjaxFormData = function(method,url,data,cb_fun){ 
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				cb_fun(this.responseText);
			}
		};
		xhttp.open(method, url, true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(data);	 
	}  

	this.blGetGithubIssueByNumber = function(user,repo,i,cb){ 
		var url = "https://api.github.com/repos/";
		url += user;
		url += "/" + repo;
		url += "/issues/"+i;
		
		myAjaxCmd('GET',url, null, function readCallBack(resp){
			if(resp.readyState == 4){
				if(resp.status==200){
					var o = JSON.parse(resp.responseText); 
					cb(o);
				}else{
					alert("blGetGithubIssueByNumber: The status code:"+resp.status); 
				}
			}			 
		});		
		var i = {};
		i.cs = function(csFun){
			myAjaxCmd('GET',url+"/comments", null, function readCallBack(resp){
				if(resp.readyState == 4){
					if(resp.status==200){
						var o = JSON.parse(resp.responseText); 
						csFun(o);
					}else{
						alert("cs: The status code:"+resp.status); 
					}
				}			 
			});	
		}
		return i;
	}
	this.blLoadGhIssue= function(user,repo,i,b,d){
		if(!d.v){
			d.tb = blo0.blDiv(d,d.id+"tb","blclass:"+user+"-"+repo+"-i="+i,"gray");
			d.v1 = blo0.blDiv(d,d.id+"v1","v1","lightblue");
			d.v2 = blo0.blDiv(d,d.id+"v2","-","gray");
			b.style.float = "left";

			const btnReflash = blo0.blBtn(d.tb,d.tb.id+"btnReflash","reflash","gray");
			btnReflash.style.float = "right";
			btnReflash.onclick = function(){
				d.i = blo0.blGetGithubIssueByNumber(user,repo,i,function(o){
					d.o = o;
					blo0.blShowObj2Div(d.v1,o);
				});
			} 

			
			const btnBody = blo0.blBtn(d.tb,d.tb.id+"btnBody","body","gray");
			btnBody.style.float = "right";
			btnBody.onclick = function(){
				d.v1.innerHTML = btnBody.id;
				var tb = blo0.blDiv(d.v1,d.v1.id+"tb","tb","lightgray"); 
				var v = blo0.blDiv(d.v1,d.v1.id+"v","v","gray");
				const btnCs = blo0.blBtn(tb,tb.id+"btnCs","Cs","lightblue");
				btnCs.style.float = "left";


				btnCs.onclick = function(){  
					v.innerHTML = this.id;
					
					var ta = blo0.blGetTa();
					var tb1 = blo0.blDiv(v,v.id+"tb1","tb1","gray");  
					var v2 = blo0.blDiv(v,v.id+"v2","v2","lightblue");  
					var tb2 = blo0.blDiv(v2,v2.id+"tb2","tb2","lightgray");  
					d.i.cs(function(o){
						for(j in o){
							const btn = blo0.blBtn(tb1,tb1.id+j,j,"gray");
							btn.style.float = "left";
							const btn2 = blo0.blBtn(tb2,tb2.id+j,j,"green");
							btn2.style.float = "left";
							
							btn.btn2 = btn2;
							btn.code =  o[j].body;//JSON.parse(o[j].body); 
							btn.cid  = o[j].id;
							btn.save2gh = function(){
								if( typeof blo0.blUpdateGithubCommentById == "function"){  
									blo0.blUpdateGithubCommentById(user,repo,this.cid,this.code,function(r){
										ta.value = r;
									}); 
									var b = bl$(this.btn2.id); 
									b.onclick = function(_code){
										var s = "var f = " + _code;
										eval(s);
										return f;
									}(this.code);
									ta.status (this.id + ": save to i=" + i+ " : c=" + j + " cid="+this.cid);
								}
								else{
									ta.status (this.id + ": can't find function blo0.blUpdateGithubCommentById");
								}
							}

							btn.onclick = function(_thisBtn,_j){
								return function(){
									ta.co = _thisBtn;
									ta.value = _thisBtn.code;
								}
							}(btn,j)

							
							btn2.onclick = function(_thisBtn){
								var a = _thisBtn.code;
								var b = a.split("function");
								var c = b[0].replace(/ /g,"");	
								if(c==""){ 						
									var s = "var f = " + _thisBtn.code;
									eval(s);
								}
								else{
									var f = function(){ta.value="else";} 
								}
								return f;
							}(btn)
						}
					});
				}
			}
		}
		_on_off_div(b,d.v1);
		b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
	}
	this.blMove2XY = function(o,x,y){		
		o.style.left = x + "px";
		o.style.top =  y + "px";
	}
	this.blParsePS = function(){ 
		var r = "";
		var ps = this.blGetPS();
		for(i in ps){
			r += "&";
			if(!ps[i].className){
				var s = ps[i].innerText; 
				r += "p"+i+"="+s;
			}
			else{
				r += "p"+i+"="+"==============";
			}
		} 
		
		return r;
	 }
	this.blWord = function(data,fnWord){ 
		var url = "http://localhost:3001/word";
		blo0.blAjaxFormData("POST",url,data,function(oRes){
			fnWord(oRes);
		});
	 }
		
}//END: function CBlClass ()
 
var blo0 = new CBlClass;
 

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
		  d.innerHTML = "";//obj[i];   
		  d.style.border = "blue 1px solid";
		  d.style.backgroundColor = "green";
		  d.style.color = "yellow";
		  oBoss.appendChild(d);
		  b.onclick = function(_thisBtnFun,_thisDivFun){
			  const _2Ts = ["blPaint"]; 
			  const _fun2Ts = [blo0.blh_test_blPaint];
			  for(j in _2Ts){
				if(_thisBtnFun.id==_2Ts[j]){
					b.style.backgroundColor = "brown";
					return function(){ 
						var tv = _fun2Ts[j](_thisDivFun); 
						_on_off_div(_thisBtnFun,tv);
						_thisBtnFun.style.background = _thisBtnFun.style.background=="red"?blGrey[5]:blColor[4];
					}
				}
			  }
			  return function(){}
		  }(b,d);

		 
		  
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
	return r;
}

blo0.blPlayer = function(_id, _title,_src,_x,_y,_w,_h,_c){
	var ftnPlayer = function ( oDiv ,_id4video,mySrc){
		var v = blo0.blDiv(oDiv, oDiv.id + "Player", "Player",blGrey[0]);
		var str4V = '<video id=' + _id4video + ' width="320" height="240" controls> ';				
		str4V += '<source src=';
		str4V += mySrc;// 'https://littleflute.github.io/ted1/docs/61/v0.mp4';
		str4V +=' type="video/mp4">Your browser does not support HTML5 video.'; 	
		str4V += '</video>';  										
		var vPlayer = blo0.blDiv( v ,"id_div_4_myVideo" , str4V , 300,100,500,400,blColor[1]); 	
		var _p = bl$(_id4video);  
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
						   var p = bl$(_id4video);
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
		return _p;
	}
	var d = blo0.blMD(_id, _title,_x,_y,_w,_h,_c);
	d.p = ftnPlayer(d,_id+"_video",_src);
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

function selectElement(e){ 
	e.onclick = function(){
		alert(1);
	}
}
function jpAjaxCmd(method, url, data, callback) {
	const getToken = function () {
		return "ghp_Od6GW3"+"J2NiP01Zsz"+"g9JQV0amzn"+"UxhF33iBES"; //Jeremyjia
	}
	var xmlHttpReg = null;
	if (window.XMLHttpRequest) {
	  xmlHttpReg = new XMLHttpRequest();
	} else {
	  xmlHttpReg = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlHttpReg.onreadystatechange = function () {
	  callback(xmlHttpReg);
	};
	xmlHttpReg.open(method, url, true);
	if (method == "PATCH" || method == "POST") {
	  xmlHttpReg.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	  xmlHttpReg.setRequestHeader("Authorization", "token " + getToken());
	  xmlHttpReg.send(JSON.stringify(data));
	}else if (method == "DELETE") {
	  xmlHttpReg.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	  xmlHttpReg.setRequestHeader("Authorization", "token " + getToken());
	  xmlHttpReg.send(null);
	} else if (method == "GET") {
	  xmlHttpReg.setRequestHeader('If-Modified-Since', '0');
	  xmlHttpReg.setRequestHeader("Authorization", "token " + getToken());
	  xmlHttpReg.send(null);
	} else {
	  xmlHttpReg.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	  xmlHttpReg.setRequestHeader("Authorization", "token " + getToken());
	  xmlHttpReg.send(JSON.stringify(data));
	}
}