// file: blclass.js   
var g_ver_blClass = "CBlClass_bv1.7.32"

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
	function _on_off_div(b,d){
		if(d.style.display=="block"){
			d.style.display="none"; 
			if(b) b.style.backgroundColor="red"; 
		}
		else{
			d.style.display="block"; 
			if(b!=null) b.style.background="green"; 
		}
	};
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

	let nKline = 0;
	this.blDrawKline = function(ctx,x,y,w,h){		
		nKline++;
		ctx.fillStyle = "gray"; 
		ctx.fillRect(x,y,w,h);
		const drawKlineTest = function(ctx,gN){
			const dataHistory = [
			  {
				"o":100,
				"c":120,
				"h":140,
				"l":90
			  },
			  
			  {
				"o":110,
				"c":120,
				"h":140,
				"l":90
			  },
			  {
				"o":110,
				"c":130,
				"h":140,
				"l":90
			  },
			  {
				"o":80,
				"c":130,
				"h":140,
				"l":70
			  }
			];
			  ctx.fillStyle = 'blue';
			  ctx.fillRect(110, 110, 22, 22);
			  
			  ctx.fillRect(110+10, 90, 2, 33);
	  
			  const x0 = 111;
			  const y0 = 333;
			  let xC = x0;
			  const dx = 50;
			  const w = 11;
			  ctx.fillRect(x0, y0, 2,2);
	  
			  for(i in dataHistory){
				xC = x0 + i*dx;
				ctx.fillRect(xC, y0-dataHistory[i].o, w*2,20);
				
				ctx.fillRect(xC+w, y0-dataHistory[i].h, 2,40);
	  
			  }
	  
			  ctx.fillStyle = 'brown';
		   
			  xC += dx;
			  let oCur = 80;
			  let yCur = 80 + gN%20;
			  ctx.fillRect(xC, y0-oCur, w*2,yCur - oCur);
				
			  ctx.fillRect(xC+w, y0-123, 2,40);
		}
		
		drawKlineTest(ctx,nKline);
	}
	this.blDrawOKText = function(cvs,text,progress,x,y,baseColor,highlightColor,){
		const ctx = cvs.getContext('2d');
		ctx.fillStyle = "green"; 
		ctx.fillRect(x,y,55,55); 
		
		const canvasWidth = cvs.width / (window.devicePixelRatio || 1);
		const canvasHeight = cvs.height / (window.devicePixelRatio || 1);


		// 绘制基础文本
		ctx.fillStyle = baseColor;
		ctx.textBaseline = 'middle';
		ctx.fillText(text, x,y);
		
		// 保存画布状态
		ctx.save();
		
		// 设置高亮裁剪区域
		ctx.beginPath();
		ctx.rect(0, 0, canvasWidth * progress, canvasHeight);
		ctx.clip();

		// 绘制高亮文本
		ctx.fillStyle = highlightColor;
		ctx.fillText(text, x,y);

		// 恢复画布状态
		ctx.restore();
             
	}
	this.blMousePos = function(ctx,x,y,b){
		if(b){
			const dd = 21;
			ctx.fillStyle = "red"; 
			ctx.fillRect(x,y,1,dd); 
			ctx.fillRect(x,y,dd,1); 
			ctx.fillRect(x,y-dd,1,dd); 
			ctx.fillRect(x-dd,y,dd,1); 

		}
	}

	this.blh_test_blSpider = function(b,v){
		var d = blo0.blSpider("id_4_test_blSpider",50,50,555,111); 		
		return d;
	}			
	this.blSpider = function(_id,_x,_y,_w,_h){ 		 
		var d= blo0.blMD(_id, "blSpider-"+_id,_x,_y,_w,_h,blGrey[1]);
		if(!d.load){
			d.load = true;
			const tb = blo0.blDiv(d,"id_4_tb_spider","tb","lightgray");
			const v = blo0.blDiv(d,d.id+"v","v","brown");
			const v1 = blo0.blDiv(d,d.id+"v1","v1","gray");
			const targetUrl = 'https://www.21voa.com/special_english/in-india-sudden-sea-turtle-deaths-cause-concern-93323.html';
			var ta	= blo0.blTextarea(v,v.id+"ta",targetUrl,"grey");
			ta.style.width="95%"; 
			ta.style.height="130px"; 
			const b1 = blo0.blBtn(tb,tb.id+"b1","fetch","green");
			b1.onclick = async function fetchAndParse() {
				try {
					const corsProxy = 'https://api.allorigins.win/get?url=';
					// 通过代理获取内容
					const response = await fetch(corsProxy + encodeURIComponent(ta.value));
					const data = await response.json();
					
					// 创建临时DOM解析
					const parser = new DOMParser();
					const doc = parser.parseFromString(data.contents, 'text/html');
	
					// 查找所有音频链接
					const audioLinks = Array.from(doc.querySelectorAll('a'))
						.map(a => a.href)
						.filter(href => href.toLowerCase().endsWith('.mp3'));
	 
					if (audioLinks.length > 0) {
						v1.innerHTML = `
							<h3>找到的MP3链接：</h3>
							<a class="mp3-link" href="${audioLinks[0]}" target="_blank">${audioLinks[0]}</a>
						`;
					} else {
						v1.innerHTML = '未找到MP3链接';
					}
					
				} catch (error) {
					v1.innerHTML = '获取内容失败，请尝试刷新页面或检查控制台。错误信息：' + error.message;
				}
			}			
		} 
		return d;
	}
	this.blh_test_blPaint = function(b,v){
		var d = blo0.blPaint("id_4_test_blPaint",50,50,1111,1111); 		
		return d;
	}			
	this.blPaint = function(_id,_x,_y,_w,_h){ 		 
		var d= blo0.blMD(_id, "blPaint-"+_id,_x,_y,_w,_h,blGrey[1]);
		if(!d.load){
			d.load = true;	 
			var xHit = -1, yHit = -1;
			var items = [];   
			d.parseTa = function(){ 
				const x0 = 200, y0 = 100, dx = 30, dy = 33;  
				 
				const _C4Parse = function(id4Ta){					
					var ta = bl$(id4Ta);
					var r = {};
					r.draw = function (ctx,_x,_y){
						var x = _x;
						var y = _y;
						ctx.fillStyle = "brown"; 
						ctx.fillRect(x,y,55,22);
						y += dy;
						ctx.fillText(ta.value, x,y); 
						y += dy;
						if(blo0.f2do){blo0.f2do(ctx,x,y);}
					}
					return r;
				}
				return function(ctx,id4Ta){
					var x = x0, y = y0;
					ctx.fillStyle = "white"; 
					ctx.fillRect(x,y,555,444);
					ctx.fillStyle = "#FF0000";
					ctx.font = "30px Arial"; 
					y += dy;
					ctx.fillText("parse Ta #"+id4Ta, x,y);  
					y += dy;
					const pst = new _C4Parse(id4Ta);
					pst.draw(ctx,x,y);
				}

			}(); 

			d.selectItem = function(x,y){
				for(i in items){
					const oi = items[i];
					if(blo0.blPiR(x,y,oi.x,oi.y,oi.w,oi.h)){						
						if (typeof oi.selectMe == "function") {
							oi.selectMe();
						}
					} 
				}
			}
			d.turnoverItem = function(x,y){
				for(i in items){
					const oi = items[i];
					if(blo0.blPiR(x,y,oi.x,oi.y,oi.w,oi.y)){						
						if (typeof oi.turnMeOver == "function") {
							oi.turnMeOver();
						}
					}
				}
			}
			d.hitItems = function(x,y){
				xHit = x;
				yHit = y;
				for(i in items){
					if (typeof items[i].hitTest == "function") {
						items[i].hitTest(x,y);
					}
				}
			}
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
				var clrFill = "lightgreen";
				var bSelect = false;
				var bTurnover = false;

				i.draw = function(ctx){
					if(type == "rect"){
						ctx.fillStyle = bTurnover?clrFill:"black"; 
						ctx.fillRect(i.x,i.y,i.w,i.h);
						if(bSelect){
							ctx.fillStyle = "brown"; 
							ctx.fillRect(i.x,i.y,15,15);
						} 
					}
					else if(type == "turn5Items"){
						ctx.fillStyle = bTurnover?clrFill:"black"; 
						ctx.fillRect(i.x,i.y,i.w,i.h);
						if(bSelect){
							ctx.fillStyle = "brown"; 
							ctx.fillRect(i.x,i.y,5,5);
						} 
					}
					else if(type == "div"){
						ctx.fillStyle = clrFill; 
						ctx.fillRect(i.x,i.y,i.w,i.h);
						if(iHandle&&iHandle.drawMe){
							iHandle.drawMe(ctx,i.x,i.y,i.w,i.h);
						}
					}
					else if(type == "circle"){						
					   ctx.beginPath();
					   ctx.arc(x, y, w, h, 2 * Math.PI);				
					   ctx.moveTo(x, y);
					   ctx.stroke(); 
					}
				}
				i._2move = function(dx,dy){ i.x += dx; i.y += dy;}
				i.hitTest = function(_x,_y){
					if(blo0.blPiR(_x,_y,i.x,i.y,i.w,i.h)){
						clrFill = "red";
					}
					else{
						clrFill = "blue";
					}
				}
				i.selectMe = function(){
					bSelect = !bSelect; 
				}
				i.turnMeOver = function(){
					bTurnover = !bTurnover;
				}
				i.selectStatus = function(){
					return bSelect;
				}
				if(iHandle){ iHandle._followMe(i);}
				items.push(i);
				return i;
			}
			d.getItems = function(){ return items;}
			d.drawItems = function(ctx){
				
				ctx.fillStyle = "green"; 
				ctx.fillRect(110,50,555,444);

				
				ctx.fillStyle = "#FF0000";
				ctx.font = "30px Arial";
				ctx.fillText("l=" + items.length, 150,50);
				ctx.fillStyle = "#aa11bb";
				ctx.fillText("hit at [" + xHit + "," + yHit + "]", 250,50);
				
				for(i in items){
					items[i].draw(ctx);
				}
			}
			d.turn5anonce = function(handle){
				var n = 0;
				var si = [];
				for(i in items){
					if (typeof items[i].selectStatus == "function") {
						if(items[i].selectStatus()){
							n++;
							si.push(items[i]);
						}  
					}
				}
				if(5==n){
					for(j in si){
						si[j].turnMeOver();
						si[j].selectMe();
					}
					handle.okMsg();
				}
				else{
					handle.errorMsg();
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

				//d.parseTa(ctx,"id_4_ta_blrRunJS");
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
			var CO_Hit = function(){
				this.getName = function(){return "HitTest";}
				this.funMD = function(){				 
					d.hitItems(x,y);
				}
				this.funMU = function(){}
				this.funMM = function(){}
			};
			var CO_Select = function(){
				this.getName = function(){return "toSelect";}
				this.funMD = function(){				 
					d.selectItem(x,y);
				}
				this.funMU = function(){}
				this.funMM = function(){}
			};
			var CO_Turnover = function(){
				this.getName = function(){return "toTurnover";}
				this.funMD = function(){				 
					d.turnoverItem(x,y);
				}
				this.funMU = function(){}
				this.funMM = function(){}
			};
			var CO_Turn5Over = function(){
				var n = 0;
				var fs = "gray";
				const i = d.addItem("turn5Items",666,20,44,33);
				i.draw = function(ctx){					
					ctx.fillStyle = fs; 
					ctx.fillRect(i.x,i.y,i.w,i.h); 
					ctx.font = "30px Arial";
					ctx.strokeText(n, i.x, i.y);

				}
				i.errorMsg = function(){
					fs = "red";
				}
				i.okMsg = function(){
					fs = "green";
					n++;
				}
				this.getName = function(){return "toTurn5Over";}
				this.funMD = function(){	
					d.turn5anonce(i);	
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

					d.addItem("rect",x,y,44,33);
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
					var dHandle = blo0.blDiv(document.body, "id_4_co_div_"+n,n,blGrey[0]);  
					var style ="position: absolute;cursor:move;";
					style += "z-index: 9;";
					style += "background-color: #11f1f1;";
					style += "text-align: center;";
					style += "border: 1px solid #d3d3d3;";
					style += "left: 400px";
					style += "top: 40px"; 
					dHandle .style =style;
					dHandle.style.left = xdx+"px";
					dHandle.style.top = xdy+"px";
					dHandle.style.width = 50+"px";			
					dHandle.style.height = 50+"px";
					dHandle._2move = function(_thisMD){
						return function(dx,dy){
							_move_div(_thisMD,dx,dy);
						}
					}(dHandle);
					dHandle.txt = "3,-/_line1_测_试;2,-/_line1_测_试";
					var m = new blo0.C4Music();
					dHandle.drawMe = function(ctx,_x,_y,_w,_h){
						ctx.fillStyle = "blue";
						ctx.fillText(dHandle.id,_x,_y); 
						var x = _x;
						var y = _y + 111;
						m.parseString(ctx,x,y,dHandle.txt);
					}
					var tb = blo0.blToolbar(dHandle,dHandle.id+"tb","tb",1,1,100,33,"gray"); 
					var b1 = blo0.blBtn(tb,tb.id+"b1","b1","green");
					b1.onclick = function(_d){
						return function(){
							_d.txt =  bl$("id_4_ta_blrRunJS").value;
						}
					}(dHandle)
					blo0.blMakeDivMovable(dHandle); 
					d._followMe(dHandle);
					Ds.push(dHandle);
					
					d.addItem("div",x,y,150,75,dHandle);
				}
				this.funMU = function(){}
				this.funMM = function(){}
			};
			var o1 = new CO_Circle(vc,st);		d.os.push(o1); 
			var o2 = new CO_Rect();				d.os.push(o2); 
			var o3 = new CO_FreeDraw();			d.os.push(o3); 
			var o4 = new CO_Img(vc,st);			d.os.push(o4); 
			var o5 = new CO_Div(vc,st);			d.os.push(o5); 
			var o6 = new CO_Hit();				d.os.push(o6); 			
			var o7 = new CO_Select();			d.os.push(o7); 	
			var o8 = new CO_Turnover();			d.os.push(o8); 
			var o9 = new CO_Turn5Over();		d.os.push(o9);
			

			
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
	this.c = function(n){
		const cs = ["#00FFFF","#00CCFF","#00CCCC","#00CC99","#009999","#009966","#006666","#006633","#006600","#003300",//0-9
		"#6666CC","#6633CC","#663399","#660099","#663366","#660066","#663333","#663300","#660033","#660000",//10-19
	    ];
		return cs[n];
	}
	this.blPoints = function(){
		const c4Points = function(){
			var ptsCMD = -1;
			var x1,y1,x2,y2,iSel = -1 ;
			var ls = [];
			this.mkUI = function(d){
				const bs = [
					{
						"id":1,
						"name":"new",
						"click":function(b,v){
							v.innerHTML = this.name;
							ptsCMD = this.id;
						}
					},
					{
						"id":2,
						"name":"name2",
						"click":function(b,v){
							v.innerHTML = this.name;
							ptsCMD = this.id;
						}
					},
				];
				
				var v = blo0.blDiv(d,d.id+"v","v",blo0.c(12));
				v.innerHTML = "";
				var tb = blo0.blDiv(v,v.id+"tb","tb",blo0.c(1));
				var d = blo0.blDiv(v,v.id+"d","d",blo0.c(2));
				blo0.blBtns(bs,tb,d,"lightgreen","brown");
			};
			
			this.mdFun = function(x,y){
				if(ptsCMD==1) ls.push({"x":x-x1,"y":y-y1});
				if(ptsCMD==2) {
					if(iSel==-1){
						for(i in ls){
							if(blo0.blPiR(x,y,x1+ls[i].x,y1+ls[i].y,5,5)){ 
								iSel = i;
								break;
							}
						}
					}
					else{
						ls[iSel].x = x-x1;
						ls[iSel].y = y-y1;
						iSel = -1;
					}
				}
			};
			this.data2Plx = function(){
				const o = {};
				o.ver = "0.12";
				o.ls = ls;
				return o;
			}
			this.fun2Plx = function(){
				return `
				var o = JSON.parse(s);
				for(i in o.ls){
					ctx.fillRect(o.ls[i].x+x,o.ls[i].y+y,5,5);
				}
				ctx.beginPath(); 	
				if(time%5==0){
				ctx.moveTo(o.ls[0].x+x,o.ls[0].y+y); 
				ctx.lineTo(o.ls[2].x+x,o.ls[2].y+y);
				}	
				else{
				ctx.moveTo(o.ls[1].x+x,o.ls[1].y+y); 
				ctx.lineTo(o.ls[2].x+x,o.ls[2].y+y);
				}
				ctx.strokeStyle = "rgb(122,11,22)";
				ctx.stroke();

				`;
			}
			this.drawPoints = function(cvs,_x1,_y1,_x2,_y2){
				x1 = _x1; y1 = _y1; x2 = _x2; y2 = _y2;
				var ctx = cvs.getContext("2d");		
				var oldFillStyle = ctx.fillStyle;
				ctx.fillStyle = "grey"; 
				ctx.fillRect(x1+10,y1+10,20,20);
				ctx.fillText(`n=${ls.length}`,x1+50,y1+50);
				for(i in ls){
					ctx.fillRect(ls[i].x+x1,ls[i].y+y1,5,5);
				}
				if(iSel!=-1){
					ctx.fillStyle = "red"; 
					ctx.fillRect(ls[iSel].x+x1,ls[iSel].y+y1,5,5);
				}
				ctx.fillStyle = oldFillStyle;

			};
		};
		return new c4Points();
	}
	this.blAudioTimer = function(){	
		const r = function() {	
			var bRun = false;
			var fps = 1;
			var time = 5; //added by jeremyjia
			var m_bWebsiteAccessible = false;
			var n = 0; 
			var t1 = Date.now();
			var t2 = Date.now();
			const vp = blo0.blc4Video(t1);
			var ct = 0;

			var fn4Loop = function(){
				if(0==n) vp.play();
				setTimeout(() => {
					n++; 
					t2 = Date.now();
					ct = vp.currentTime;
					if(bRun) fn4Loop();
				}, 1000/fps);
			}
			var o = {};
			o.stop = function(){
				bRun = false; 
				vp.pause();
				vp.currentTime = ct = 0;
			}
			o.start = function(){
				bRun = true;
				n = 0; 
				t1 = Date.now();
				fn4Loop();
			}
			o.isPlaying = function(){
				return bRun;
			}

			o.paintCurFrame = function(ctx,_lsf,n,x1,y1,x2,y2){
				ctx.fillStyle = function(){
					var c = n>-1?_lsf[n].backgroundColor:"Khaki";					
					c = "rgb(" + c + ")";
					return c;
				}(); 
				ctx.fillRect(x1,y1,x2-x1,y2-y1);
				 
				if(n>-1){
					const os = _lsf[n].objects;
					for(i in os){
						os[i].selfDraw(ctx,x1,y1);
					}
				}
			}
			o.setFPS = function(n){
				fps = n;
			}
			o.getFPS = function(){
				return fps;
			}
			o.setVideoTime = function(n){
				time = n;
			}
			o.getVideoTime = function(){
				return time;
			}
			o.getServerStatus = function(){
				return m_bWebsiteAccessible;
			}
			o.getVP = function(){ return vp;}
			o.getFrameNo = function(l,nf){
				var nr = 0;
				var m = 0;
				var n = 0;
				for(i in l){
					m += l[i].time;
					if(nf<=m){
						nr = n;
						break;
					}
					n++;
				}
				return nr;
			}
			o.drawOnLoop = function(cvs,_thisBLS,x1,y1,x2,y2){		
				var ctx = cvs.getContext("2d");		
				if(bRun){ 	
					const _frms = _thisBLS.getScenes();
					ctx.fillStyle = "lightblue";
					ctx.fillRect(x1,y1,x2-x1,y2-y1);
					this.paintCurFrame(ctx,_frms,this.getFrameNo(_frms,n),x1,y1,x2,y2);
					_thisBLS.paintSuperObjects(cvs,n);
				}	
				ctx.fillStyle = "blue";
				ctx.font = "10px Arial";
				var s = " Timer: bRun = " + bRun;
				s += " n = " + n; 
				s += " startTime = " + t1; 
				s += " curTime = " + t2;  
				s += " t2-t1 = " + (t2-t1)/1000 + "s";
				s += " fps = " + fps;
				ctx.fillText(s, x1,y1 + 20);


				
				

				const checkSite = function(_x,_y){
					async function isWebsiteAccessible(url) {
						try {
							const response = await fetch(url, { method: 'HEAD' }); // 使用 HEAD 请求以减轻负载
							if (response.ok) {
								return true; // 状态码在200-299之间
							} else {
								return false;
							}
						} catch (error) {
							console.error('Error fetching the URL:', error);
							return false;
						}
					}

					// 示例使用
					isWebsiteAccessible('http://localhost:8080/')
					.then(isAccessible => {
						m_bWebsiteAccessible = isAccessible; //不在此处绘图，否则会闪烁
					});
					
				}();
			}
			return o;
		}();
		return r;
	}
	this.blSoScripts = function(){
		var mysos = [
			` 
		var C4Plx = function(){
			this.drawPlx2Frame = function(ctx,time,x0,y0){ 
			  var x = x0?x0:0;
			  var y = y0?y0:0
			  ctx.fillStyle = 'red';
			  ctx.fillRect(x+0+time%111, y+30, 5, 44);
			  ctx.font = 11+ "px Consolas";
			  ctx.fillStyle = "blue";
			  ctx.fillText("C4Plx v0.14: time="+time ,x+10,y+55); 
			};
		  } 
		  function animateFrame(time){
			  var canvas = document.getElementById('myCanvas');
			  var ctx = canvas.getContext('2d');  
					   
			  var o = new C4Plx();
			  var x = typeof x0 === "undefined"?0:x0;
			  var y = typeof y0 === "undefined"?0:y0;
			  o.drawPlx2Frame (ctx,time,x,y);   
		  }`,
		  ` 
		  var C4Plx = function(){
			  this.drawPlx2Frame = function(ctx,time,x0,y0){ 
				var x = x0?x0:0;
				var y = y0?y0:0
				ctx.fillStyle = 'blue';
				ctx.fillRect(x+0+time%155, y+55, 5, 44);
				ctx.font = 11+ "px Consolas";
				ctx.fillStyle = "blue";
				ctx.fillText("C4Plx v0.14: time="+time ,x+10,y+55); 
			  };
			} 
			function animateFrame(time){
				var canvas = document.getElementById('myCanvas');
				var ctx = canvas.getContext('2d');  
						 
				var o = new C4Plx();
				var x = typeof x0 === "undefined"?0:x0;
				var y = typeof y0 === "undefined"?0:y0;
				o.drawPlx2Frame (ctx,time,x,y);   
			}`,
			` 
			var imgObj = new Image();
	
			imgObj.src = "https://img-blog.csdnimg.cn/90e2883e5d4241d78aa282a0e7d963f0.jpeg";
			var C4Plx = function(){
				this.drawPlx2Frame = function(ctx,time,x0,y0){  
				  var x = x0?x0:0;
				  var y = y0?y0:0
				  ctx.fillStyle = 'green';
				  ctx.fillRect(x+0+time%111, y+30, 5, 44);
				  ctx.font = 11+ "px Consolas";
				  ctx.fillStyle = "blue";
				  ctx.fillText("C4Plx v0.14: time="+time ,x+10,y+55);
				 	
				  var index = time%7; 
				  ctx.drawImage(imgObj, index * 185, 0, 180, 325, x+55, y+20, 18.0, 32.5);
				};
			  } 
			  function animateFrame(time){
				  var canvas = document.getElementById('myCanvas');
				  var ctx = canvas.getContext('2d');  
						   
				  var o = new C4Plx();
				  var x = typeof x0 === "undefined"?0:x0;
				  var y = typeof y0 === "undefined"?0:y0;
				  o.drawPlx2Frame (ctx,time,x,y);   
			  }`,
			 

		];
		const C4SoScripts = function(){
			this.updateIdx = function(l,i){ 
				var url = l[i].attribute.script;  
				var w = {}; 
				w._2do = function(txt){
					if("error xd 11"==txt) return; 
					mysos[i]=txt;
				}
				blo0.blAjx(w,url)
			}
			this.sosUpdate = function(l){
				mysos = [];
				for(i in l){
					var url = "http://localhost:8080/" + l[i].srcipt; 
					var w = {};
					w._2do = function(txt){
						mysos.push(txt);
					}
					blo0.blAjx(w,url);
				}
			}
			this.soDraw = function(cvs,n,x1,y1,x2,y2){
				for(i in mysos){ 
					var op = blo0.blWrapPlx(cvs,mysos[i],x1,y1);
					op.callPlx (n,x1,y1);
				} 
			} 
		}
		return new C4SoScripts();
	}
	this.blWrapPlx = function(cvs,_pt,x1,y1){
		var pt2 = _pt.replace("myCanvas",cvs.id);
		var s = "var CBlsPlx = function(cvs,x1,y1){";
		s += '       var x0 = x1, y0 = y1;';
		s += '       var ctx = cvs.getContext("2d");';
		s += '       var nc = 0;';
		s +=         pt2;
		s += "       this.v = 123;";  

		s += "       this.callPlx = function(n,x,y){";
		s += '          if(1){'
		s += '          	nc++;';
		s += '          	ctx.fillText("nc=" + nc,x+x0,y+y0-60);';
		s += "          	animateFrame(n);";
		s += '          }'; 
		s += '          return n;';
	    s += '        };';	

		s += "       this.setPlxXY = function(x,y){"; 
	    s += '            x0 = x; y0 = y;';		
	    s += '        };';		

		s += "    }";
		eval(s);
		return new CBlsPlx(cvs,x1,y1);  
	}
	this.f2do =  function (ctx,_x,_y){
		var x = _x;
		var y = _y;

		ctx.fillStyle = "blue"; 
		ctx.fillRect(x,y,55,22); 	

		y+=55; 
		gBlNote(ctx,x,y,1,0,0);
		x+=55; gBlNote(ctx,x,y,2,1,1);
		x+=55; gBlNote(ctx,x,y,3,2,2);
		x+=55; gBlNote(ctx,x,y,4,-1,3);
		x+=88; gBlNote(ctx,x,y,5,-2,4);
		x+=111; gBlNote(ctx,x,y,6,-2,3);
		x+=111; gBlNote(ctx,x,y,7,-2,2);
		
		y += 55;
		x = _x;
		gBlBeat_2Nl (ctx,x,y,1,2,2,0);
		x += 111;
		gBlBeat_2Nl (ctx,x,y,1,-1,2,-2);

		
 
		x += 111;
		gBlBeat_4Nll (ctx,x,y,1,2,2,0,1,2,2,0);
		x += 111;
		gBlBeat_4Nll (ctx,x,y,1,-1,2,-2,1,2,2,0);
		x += 111;
		gBlBeat_4Nll (ctx,x,y,1,-1,2,-2,1,2,2,0);

		
		y+=66; x = _x +10;
		gBlBeat_Nl2Nll(ctx,x,y,1,0,2,0,3,0);
		x += 111;
		gBlBeat_Nl2Nll(ctx,x,y,1,1,2,-1,3,2);

		  x = _x +310;
		gBlBeat_2NllNl(ctx,x,y,1,0,2,0,3,0);
 		x += 111;
		gBlBeat_2NllNl(ctx,x,y,3,1,2,-1,3,2);

		y+=55; x = _x +10;
		gBlBeat_NllNlNll(ctx,x,y,5,0,2,0,3,0);
 		x += 111;
		gBlBeat_NllNlNll(ctx,x,y,3,1,2,-1,3,2);

		y+=55; x = _x +10;
		gBlBeat_NldNll(ctx,x,y,1,0,2,0);
 		x += 111;
		gBlBeat_NldNll(ctx,x,y,3,1,2,-1);

 		x += 111;
		gBlBeat_NllNld(ctx,x,y,5,1,2,-1);
 		x += 111;
		gBlBeat_NllNld(ctx,x,y,3,1,2,-1);

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
	this.blc4Video = function(id){
		var v = document.createElement("VIDEO");
		v.id = id;
		if (v.canPlayType("video/mp4")) {
			v.setAttribute("src","https://littleflute.github.io/english/NewConceptEnglish/Book2/1.mp3");
		}
		v.setAttribute("width", "1");
		v.setAttribute("height", "1"); 
		document.body.appendChild(v);
		return v;
	}
	var _blVideo = this.blc4Video("id_4_blc_video");
	 
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
						var btnFrameTime = blo0.blBtn(v,"btnFrameTime","frame_time:"+_fs[_i].time,"lightblue");
						btnFrameTime.style.float = "right";
						const nFrames = [1,-1,5,-5,10,-10];
						for(j in nFrames){
							var a = nFrames[j]>0?"+"+nFrames[j]:nFrames[j];
							var b = blo0.blBtn(v,"nFrames"+j,a,blGrey[3]);
							b.style.float = "right";
							b.onclick = function(_thisBtn,_ls,_j){
								return function(){
									_fs[_i].time = Number(_fs[_i].time)+_ls[_j];
									btnFrameTime.innerHTML ="frame_time:"+_fs[_i].time;
								}
							}(b,nFrames,j)

						}

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
										blo0.blEditObjInDiv(_obtn,ov,_fos[_i]);
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
		this.drawCurFrame = function(cvs){
			var ctx = cvs.getContext("2d");
			var xF = 44, yF = 111, wF = 200, hF= 200;
			var c = "#347B98"; 
			ctx.fillStyle = c;
			ctx.fillRect(xF,yF,wF,hF);		
			if(_frames.FrameIndex) { 				
				_frames[_frames.FrameIndex].draw_Frame(cvs,xF,yF,wF,hF);			
			}
		}
		this.drawSuperObjects = function(ctx){
			ctx.fillStyle = "#11f100"; 
			ctx.fillRect(333,211,111,222);
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
					"y": 252,
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
					var btnUI = blo0.blBtn(tb,tb.id+"btnUI","uiFrame",blGrey[1]);
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
								_thisOBlScript.drawCurFrame(fCVS);
								_thisOBlScript.drawSuperObjects(ctx);
 
								ctx.font = 12 + "px Consolas";
								ctx.fillStyle = "yellow";
								ctx.fillText(ls.length + "_ " + fCVS.ms + "_ " + fCVS.n + " " + Date(), 11, 22);

								ctx.fillStyle = "green";
								ctx.fillText("mouseStatus:[" + fCVS.x + "," + fCVS.y + "]" , 11, 44);

								
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
 
			this.try2Move = function(os,cvs){
				var ctx = cvs.getContext("2d");
				var old = ctx.fillStyle;

				for(i in os){
					if(blo0.blPiR(cvs.x,cvs.y,os[i].x,os[i].y,15,15)){
						ctx.fillStyle = "blue";
						ctx.fillRect(cvs.x,cvs.y,15,15);
						os[i].x = cvs.x-5;
						os[i].y = cvs.y-5;
						break;

					}	
					
				}
				ctx.fillStyle = old;
			}

			this.draw_Frame = function(_this,_time){
				return function(cvs,x,y,w,h){
					var ctx = cvs.getContext("2d");
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
					_this.try2Move(os,cvs);
					for(i in os){
						ctx.fillText("o"+i + ":" + os[i].x +","+ os[i].y, x+30, y + i*30 + 110); 

						ctx.fillStyle = "brown";
						ctx.fillRect(os[i].x,os[i].y,15,15);	
						ctx.fillText(os[i].text, os[i].x, os[i].y); 
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
				var v1 = blo0.blDiv(d,d.id+"v1","v1",blGrey[4]);
				var v2 = blo0.blDiv(d,d.id+"v2","v2",blGrey[5]);
				var v3 = blo0.blDiv(d,d.id+"v3","v3",blGrey[6]);
				var btnMakeScript = blo0.blBtn(d.tb,d.tb.id+"btnMakeScript","makeScript",blGrey[1]);				
				var btnSaveScript = blo0.blBtn(d.tb,d.tb.id+"btnSaveScript","saveScript",blGrey[1]);
				var btnMakeMp4 = blo0.blBtn(d.tb,d.tb.id+"btnMakeMp4","MakeMp4",blGrey[1]);
				
						
				btnMakeMp4.onclick = function(b,d){ 			
					var url = "http://localhost:8080/image/json2video?script=" + blScriptName + ".json&video=" + blScriptName + ".mp4"; 
					b._2do = function(txt){v3.innerHTML = txt};
					blo0.blAjx(b,url);
				}		 
				btnSaveScript.onclick = function(){
				 
					var pl = _bl2MakeScript(_oScript,_frames,_sos); 
					var url = "http://localhost:8080/json?fileName=" + blScriptName + ".json"; 
   
					blo0.blPOST(url,pl,function(txt){
						v2.innerHTML = "<a href ='http://localhost:8080/"+blScriptName+".json' target='_blank'>"+blScriptName+".json</a>";
					}); 
				}
				btnMakeScript.onclick = function(){
					var os = _bl2MakeScript(_oScript,_frames,_sos);
					var txt = JSON.stringify(os); 
					v1.innerHTML = "";
					var ta	= blo0.blTextarea(v1,v1.id+"ta","ta...","grey");
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
	this.blMakePlxJS = function(oi){
		var sJS = `
		var C4Plx = function(){
			var s = '${oi.compileData()}';
			this.drawPlx2Frame = function(ctx,time,x0,y0){ 
			  var x = x0?x0:0;
			  var y = y0?y0:0;

			  ctx.fillStyle = 'red';
			  ctx.font = 11+ "px Consolas";			  
			  ctx.fillText("blMakePlxJS C4Plx v0.21: time="+time ,x+10,y+33);  
			  ${oi.compileFrameFun()}
			};
		} 
		function animateFrame(time){
			var canvas = document.getElementById('myCanvas');
			var ctx = canvas.getContext('2d');  
					 
			var o = new C4Plx();
			var x = typeof x0 === "undefined"?0:x0;
			var y = typeof y0 === "undefined"?0:y0;
			o.drawPlx2Frame (ctx,time,x,y);   
		}`;
		return sJS;
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
	this.blWrapCVS = function(cvs,oi){
		if(cvs){
			cvs.addEventListener('mousedown', function (e) {
				var x = e.offsetX;
				var y = e.offsetY;
				if(oi.mdCVS) oi.mdCVS(x,y);
			});
			cvs.addEventListener('mousemove', function (e) {
				var x = e.offsetX;
				var y = e.offsetY;
				if(oi.mmCVS) oi.mmCVS(x,y);
			});
			cvs.addEventListener('mouseup', function (e) {
				var x = e.offsetX;
				var y = e.offsetY;
				if(oi.muCVS) oi.muCVS(x,y);
			});
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
			var btnParseMe			= blo0.blBtn(tb,tb.id+"btnParseMe","parseMe",blGrey[0]);
			btnParseMe.style.float = "left";
			btnParseMe.onclick		= function(_this,_v){
					return function(){
						blo0.blShowObj2Div(_v,blo0);blon(_this,_v,"grey","green");
						bl$("blrAboutMe").click();						
					}
			}(btnParseMe,div4Parse);
			var btnTest			= blo0.blBtn(tb,tb.id+"btnTest","[test]",blGrey[0]);
			btnTest.style.float = "left";
			btnTest.onclick		= function(_this,_v){
				return function(){ 
						_v.innerHTML = _this.id;						
						_oTest.runAt(_v);
						blon(_this,_v,"grey","green");
				}
			}(btnTest,div4Parse);
			var btnAutoRun			= blo0.blBtn(tb,tb.id+"btnAutoRun","autoRun",blGrey[0]);
			btnAutoRun.style.float = "right";
			
			btnAutoRun.onclick		= function(_this,_v){
				return function(){ 
					const r = blo0.C4AutoRun(); 
					r.uiBuild(_v);
					blon(_this,_v,"grey","green");
				}
			}(btnAutoRun,div4Parse);
			
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
	
    this.blToolbar = function (oBoss,id,html,x,y,w,h,bkClr){ 
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

    this.baiduEn2Zh = function(sEn,cbBaidu){
		cbBaidu(sEn);
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
				if (xmlhttp.readyState >= 1 && xmlhttp.readyState < 4) {
					worker._2do("Task is in progress");
				}
				else {
					worker._2do("error xd 11");
				}
			}
        }
        xmlhttp.open("GET",href,true);
        xmlhttp.send();
    }

	this.blBtns = function(bs,tb,v,hc,lc){
		var ls = [];
		for(i in bs){
			const btn = blo0.blBtn(tb,tb.id+bs[i].id,bs[i].name,bs[i].color);
			btn.style.float = bs[i].float;
			btn.onclick = function(_btn,_i,_v){
			  return function(){
				bs[_i].click(_btn,_v);
				var bSkip = bs[_i].skip?bs[_i].skip:false;
				if(!bSkip) blo0.blMarkBtnInList(_btn,ls,hc?hc:"yellow",lc?lc:"grey");
			  }
			}(btn,i,v);
			var bSkip = bs[i].skip?bs[i].skip:false;
			if(!bSkip) 			ls.push(btn);
		  }
	}
	this.blEditObjInDiv = function(btn4Obj,oDiv,obj){		
		oDiv.innerHTML = "";
		for(i in obj)
		{
			const b = blo0.blBtn(oDiv,oDiv.id+i,i+":"+obj[i],blGrey[4]);
			b.onclick = function(_btn,_obj,_i){
				return function(){
					if(_i=="text")
					{
						_obj[_i] = blo0.blGetTa().value;
						btn4Obj.click();
					}
				}
			}(b,obj,i);
		}
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
	this.blColorPicker = function(oBoss,id,bkClr,oCaller){
		
		let r = '';
		r += '<h2>颜色选择器</h2>';
		r += '<label id="colorDisplay'+id+'">cc</label>';
		r += '<label for="red">红:</label>';
		r += '<input type="range" id="red'+id+'" min="0" max="255" value="255">';
		r += '<label for="green">绿:</label>';
		r += '<input type="range" id="green'+id+'" min="0" max="255" value="0">';
		r += '<label for="blue">蓝:</label>';
		r += '<input type="range" id="blue'+id+'" min="0" max="255" value="0">';
		r += '<p id="colorCode'+id+'"></p >';
		
			
		var o = document.getElementById(id);
		if(!o){
			o = document.createElement("div");
			o.id = id;
			o.innerHTML = r;  
			o.style.backgroundColor=bkClr?bkClr:"gray";
			if(oBoss!=null)oBoss.appendChild(o);


			//xddbg11
			console.log(blo0.blTime(0) + " xddbg");
				const redSlider = document.getElementById('red' + id);
				const greenSlider = document.getElementById('green' + id);
				const blueSlider = document.getElementById('blue' + id);
				const colorDisplay = document.getElementById('colorDisplay' + id);
				const colorCode = document.getElementById('colorCode' + id);
				colorDisplay.style.width    = "100px" ;
				colorDisplay.style.height   = "100px" ;
				colorDisplay.style.border   = '1px solid #000';
				colorDisplay.style.marginTop = "20px";
				blueSlider.value = 115;
				updateColor();

				function updateColor() {
					const red = redSlider.value;
					const green = greenSlider.value;
					const blue = blueSlider.value;
					const rgbColor = `rgb(${red}, ${green}, ${blue})`;
	
					colorDisplay.style.backgroundColor = rgbColor;
					colorCode.textContent = `RGB: ${red}, ${green}, ${blue}`;
					if(oCaller.setBKColor){
						oCaller.setBKColor(red, green, blue);
					}
				}
	
				redSlider.addEventListener('input', updateColor);
				greenSlider.addEventListener('input', updateColor);
				blueSlider.addEventListener('input', updateColor);
			//xddbg11
		}
		return o;
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
	this.blTimer = function(vInterval,nLimit,cbTimer){
		var bStop = false;
		var t = {};
		t.stop = function(){
			bStop = true;
		};

		var timeLeft = nLimit;
		var timePassed = 0;
		const _Interval = setInterval(() => {
			timePassed++;
			timeLeft = nLimit - timePassed;
			
			if(typeof cbTimer == "function"){
				cbTimer(timeLeft);
			}
		
			if (timeLeft === 0 || bStop==true) {
				clearInterval(_Interval);
			}
		  }, vInterval);

		  return t;
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
		var r = {};
		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		xhr.addEventListener("readystatechange", function() {
			if(this.readyState === 4 && this.status==200) {
				r.responseText = this.responseText;
				r.status = 1;
				_cb(r);
			}	
			else{
				r.error = "error: " + this.readyState + "," + this.status;
				r.status = 0;
				_cb(r);
			}
		});
		xhr.open("POST", _url);
		xhr.setRequestHeader("Content-Type", "text/plain");
		xhr.send(JSON.stringify(_jsonData));
	}	
	this.blSendTextByPOST = function(_url,txt,_cb){  
		var r = {};
		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		xhr.addEventListener("readystatechange", function() {
			if(this.readyState === 4 && this.status==200) {
				r.responseText = this.responseText;
				r.status = 1;
				_cb(r);
			}	
			else if(this.readyState === 4 && this.status==0){ 
				r.responseText = this.responseText;
				r.status = 2;
				r.errorMsg = "xhr: " + this.readyState + "," + this.status;
				_cb(r);
			} 
			else{
				r.status = 0;
				r.errorMsg = "xhr: " + this.readyState + "," + this.status;
				_cb(r);
			}
		});
		xhr.open("POST", _url);
		xhr.setRequestHeader("Content-Type", "text/plain");
		xhr.send(txt);
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
	this.blSandBox = function(sbDiv,id4SandBox){
		var d1 = blo0.blDiv(sbDiv,sbDiv.id+"d1","d1",blColor[1]);
		var ta = blo0.blTextarea(d1,id4SandBox?id4SandBox:"id_4_ta_blrRunJS","alert(1);",blGrey[3]);
		ta.style.width="95%"; 
		ta.style.height="111"+"px"; 
		d1.ta = ta;

		var tb = blo0.blDiv(d1,d1.id+"tb_4_i21","",blGrey[5]);
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

	 	
	this.blCheckOnline = function(config) {
		var img = new Image();
        img.onload = function () { if (typeof config.success == 'function') config.success(config.url); }
        img.onerror = function () { if (typeof config.error == 'function') config.error(config.url); }
        img.src = config.url + (config.isImage ? '' : '/favicon.ico');
	}
	this.blLog = function(){//xd2do1

	}
	this.blList = function(){//xd2do1
		const C4List = function(id){
			const ghi = "[i5c1]";
			const ui = blo0.blMD(id,ghi+"_"+id,blo0.c(1));
			const _thisList = this;
			this.getUI = function(){ return ui;} 
			this.addBtn2Tb = function(tb,_v,cbf){
			  if(!tb.btnList) tb.btnList = [];
			  var n = tb.btnList.length;
			  var btn = blo0.blBtn(tb,tb.id+"_btn_"+n,n,"gray");
			  btn.onclick = function(_btn,_bs){
				  return function(){
					 blo0.blMarkBtnInList(_btn,_bs,"yellow","grey");
					 _v.innerHTML = _btn.id;
					 tb.curBtn = _btn;
				  }
			  }(btn,tb.btnList);
			  tb.btnList.push(btn);
			}
			this.newToolbar = function(d,tbName,color){
				const bs = [
					{"id":1,
					"name":"+",
					"color":blo0.c(11),
					"float":"left",
					"clickMe":function(tb,v){
						_thisList.addBtn2Tb(tb,v,null); 
					}
					},
					{"id":2,
					"name":"--",
					"color":blo0.c(13),
					"float":"left",
					"clickMe":function(tb,v){
							tb.innerHTML = "";
							tb.btnList = [];
						v.innerHTML = tb.id + ":" + tb.curBtn.id;
					}}
				];
				const tb = blo0.blDiv(d,d.id+tbName,tbName,color);
				const tb1 = blo0.blDiv(d,d.id+tbName+"tb1","tb1","purple");
				const v4tb = blo0.blDiv(d,d.id+tbName+"v","v4tb","gray");
				for(i in bs){
					const btn = blo0.blBtn(tb,tb.id+bs[i].id,bs[i].name,bs[i].color);
					btn.style.float = bs[i].float?bs[i].float:"right";
					btn.onclick = function(_i){
						return function(){bs[_i].clickMe(tb1,v4tb);}
					}(i);
				}
				return tb;
		   };
		}
		const l = new C4List("bllist 31");  
		/* //usage:
		l.newToolbar(l.getUI(),"tb1",blo0.c(12));
		l.newToolbar(l.getUI(),"tb2",blo0.c(12));
		l.newToolbar(l.getUI(),"tb3","green");
		_on_off_div(null,l.getUI ());
		//*/
		return l;
	}
	this.blParseTask = function(_srcURL,_vRes,_cbParse){		
		const C4ParseTask = function(_srcURL,_vRes,_cbParse){ 
			const srcURL = _srcURL; 
			const vRes = _vRes;
			var b = false;

			this.type = blc_4_t_PARSE;
			
			this.done = function(){return b;};

			this.bl2Do = function(){			
				var url = srcURL;  
				var w = {};
				w._2do = function(txt){ 
					if("error xd 11"==txt){
						vRes.innerHTML = `txt=${txt} ` ; 
						b = false;
					}
					else{
						vRes.innerHTML = `txt=${txt} ` ; 
						b = true; 
						_cbParse(vRes,txt);
					} 
				}
				blo0.blAjx(w,url);		 
			};
		}
		const o = new C4ParseTask(_srcURL,_vRes,_cbParse);
		return o;
	}
	this.blBls2VideoTask = function(blsSrc,videoName,v,cbWork){
		const CBls2Video = function(blsSrc,videoName,v,cbWork){
			const oi = {};
			oi.api = "http://localhost:8080/image/json2video?script=";
			oi.fn = videoName;
			oi.src = blsSrc;   
			oi.v = v;

			var b = false;

			var times2Try = 0;
			this.type = blc_4_t_MAKE_VIDEO;
			
			this.done = function(){return b;};
			this.tickLog = function(){return times2Try;};
			this.bl2Do = function(){	 
				var url = oi.api + "?url="+ oi.src + "&video="+ oi.fn;  
				var w = {};
				times2Try = 0; 
				w._2do = function(txt){ 
					times2Try++;
					if("error xd 11"==txt){
						oi.v.innerHTML = `times2Try=${times2Try} rs: not 4 && not 200.` ; 
						b = false;
					}
					else{
						oi.v.innerHTML = `times2Try=${times2Try} ${txt}`; 
						oi.responseText;
						cbWork(oi.v,oi);
						b = true; 
					}
				}
				blo0.blAjx(w,url);	
			};
		}
		const o = new CBls2Video(blsSrc,videoName,v,cbWork);
		return o;
	}
	this.blMakeBlsTask = function(mp3,lrc,v,cbSendOK){
		const CMakeBlsTask = function(mp3,lrc,v,cbSendOK){
			const o = {};
			o.mp3 = mp3;  
			o.lrc = lrc;
			o.fn  = "bls1.json";
			var b = false;
			var nSend = 0;
			const blsJSON = function(){
				const blos = {
					"request": {
						"version": "0.0.16",
						"description":"LRC字幕超级对象",
						"width": 1024,
						"height": 768,
						"music": "${VAR_MUSIC}",
						"rate": "2",
						"frames": [
							{
								"number": "1",
								"time": "${VAR_FRAMES}",
								"objects": [
									{
										"text": "${VAR_TITLE}",
										"x": 80,
										"y": 320,
										"size": 60,
										"color": "160,32,240",
										"layer": 2
									}
								],
								"backgroundColor": "100,149,237"
							}
						],
						"superObjects": [
							{
								"type": "subtitle",
								"frameRange": "(1,${VAR_FRAMES})",
								"attribute": {
									"script": "${VAR_LRC_PATH}",
									"x1": 20,
									"y1": 670,
									"size": 30,
									"color": "255,255,0",
									"replace":[
										 {
										   "regex":"American",
										   "target":"美国"
										 },
										 {
										   "regex":"更多听力请访问21VOA.COM",
										   "target":"漂泊者乐园团队制作"
										 }
									]
								},
								"layer": 1
							},
							{
								"type": "picture",
								"attribute": {
									"x1": 220,
									"y1": 200,
									"x2": 510,
									"y2": 380,
									"size": -1,
									"color": "255,0,0",
									"name": "${VAR_IMG_PATH}"
								},
								"frameRange": "(1,${VAR_TIME})",
								"action": {
									"trace": "y=0*x*x+0*x+200",
									"step": 0
								}
							} 
						],
						"Macros": [
							{
								"name": "VAR_TITLE",
								"value": "LRC字幕超级对象-演示程序"
							},
							{
								"name": "VAR_MUSIC",
								"value": o.mp3
							},
							{
								"name": "VAR_LRC_PATH",
								"value": o.lrc
							},
							{
								"name": "VAR_IMG_PATH",
								"value": "https://img.21voa.cn/1/C501D07B-81C5-462A-89C8-E630C2DD9A1F_w268_r1.jpg"
							}
						]
					}
				};
				return blos;
			}();

			this.type = blc_4_t_MP3LRC2BLS;
			
			this.done = function(){return b;};
			this.tickLog = function(){return nSend;};
			this.bl2Do = function(){	
				var url = "http://localhost:8080/json?fileName=" + o.fn; 
				nSend = 0;
				blo0.blPOST(url,blsJSON,function(oReturn){
					nSend++;
					 
					v.innerHTML = `nSend=${nSend}  , oReturn=${JSON.stringify(oReturn)}`; 
				}); 	 
			};
		}
		const o = new CMakeBlsTask(mp3,lrc,v,cbSendOK);
		return o;
	}
	this.blDownloadTask = function(_svrAPI,_srcURL,_saveAsFileName,_vRes,_cbOK){		
		const C4Download = function(_svrAPI,_srcURL,_saveAsFileName,_vRes){
			const svrAPI = _svrAPI;
			const srcURL = _srcURL;
			const fn = _saveAsFileName;
			const vRes = _vRes;
			var b = false;
			var nTry = 0;

			this.type = blc_4_t_DOWNLOAD;
			
			this.done = function(){return b;};
			this.tickLog = function(){return nTry;};

			this.bl2Do = function(){			
				var url = svrAPI + "?url="+ srcURL + "&filename="+ fn;  
				var w = {};
				nTry = 0;
				w._2do = function(txt){ 
					nTry++;
					if("error xd 11"==txt){
						vRes.innerHTML = `nTry=${nTry} rs: not 4 && not 200.` ; 
						b = false;
					}
					else{
						vRes.innerHTML = `nTry=${nTry} ${txt}`; 
						b = true; 
						_cbOK(vRes,txt);
					}
				}
				blo0.blAjx(w,url);		 
			};
		}
		const o = new C4Download(_svrAPI,_srcURL,_saveAsFileName,_vRes);
		return o;
	}
	this.blIdleTask = function(_second){
		const C4IdleTask = function(){ 
			var oi = {};
			oi.name = "Idle_Task";
			oi.waitTime = _second + "s";
			oi.innerTick = 0;
			oi.nDo = 0;
			var b = false; 
			var idleTime = _second*1000;

			this.type = blc_4_t_IDLE;
			this.done = function(){return b;};
			this.tickLog = function(){oi.innerTick++; return `${JSON.stringify(oi)}`;};
			this.bl2Do = function(){
				oi.nDo++;
				if(oi.innerTick>0) return;

				setTimeout(() => {
					b = true;
				}, idleTime);
			};
		};
		const o = new C4IdleTask();
		return o;
	}
	this.blTask = function(){		
		const C4Task = function(){
			var nTaskTick = 0;
			var btn = null;
			var inf = null;

			this.setBtn = function(_btn){
				btn = _btn;
			}
			this.setInfo = function(_inf){
				inf = _inf;
			}
			this.getInfo = function(){
				var s = "";
				s += nTaskTick + "<br>";
				if(inf){
					if(blc_4_t_DOWNLOAD==inf.type)	s += "t = blc_4_t_DOWNLOAD";
					if(blc_4_t_PARSE==inf.type)	s += "t = blc_4_t_PARSE";
					if(blc_4_t_IDLE==inf.type)	s += "t = blc_4_t_IDLE";
					if(blc_4_t_MAKE_VIDEO==inf.type)	s += "t = blc_4_t_MAKE_VIDEO";
					if(blc_4_t_MP3LRC2BLS==inf.type)	s += "t = blc_4_t_MP3LRC2BLS";
					
				}
				else 	s+= "t = unkown";
				return s;
			}
			this.toLock = function(l){
				if(l.lock) l.lock();
			}
			this.doing = function(l){
				nTaskTick++;
				if(nTaskTick==1){
					inf.bl2Do();
				}
				if(inf.done()){
					if(l.unlock) l.unlock();					
					if(btn) btn.style.backgroundColor = "gray";
				}
				else{
					if(btn) btn.style.backgroundColor = "yellow";
				}

				if(btn) {
					var s = inf.tickLog; 
					if(s==undefined){
						s= "no tickLog function.";
					}
					else{
						s= inf.tickLog(); 
						if(nTaskTick>5){
							nTaskTick = 2;
							inf.bl2Do();
						}
					}
					btn.innerHTML = `nTaskTick=${nTaskTick} nTry=${s}`;
				}
			}
		}
		
		const o = new C4Task();
		return o;
	}
	this.blLock = function(){
		var b = true;
		var o = {};
		o.isLocked = function(){
			return b;
		}
		o.lock = function(){
			b = true;
		}
		o.unlock = function(){
			b = false;
		}
		return o;
	}
	this.C4AutoRun = function(){	
		const blco1 = this;  
		var tb = null,v=null; 
		var ls = [];
		var lock4Run 	= blco1.blLock();
		var curIndex 	= -1;
		var f = function(){
			var o = {};
			o.uiBuild = function(d){
				const makeAutoRunTaskTb = function(){
					tb = blco1.blDiv(d,"tb_4_AutoRun","tb","gray");
					tb.createBLS = function(mp3,lrc,v,cb){
						const o = tb.getObj();
						const t = blco1.blTask();
						var i = blco1.blMakeBlsTask(mp3,lrc,v,cb);
						t.setInfo(i);
						o.addTask(t); 
					}
					tb.createVideo = function(blsSrc,fnVideo,v,cb){
						const o = tb.getObj();
						const t = blco1.blTask();
						var i = blco1.blBls2VideoTask(blsSrc,fnVideo,v,cb);
						t.setInfo(i);
						o.addTask(t); 
					}
					tb.waitSomeTime = function(secTime){
						const o = tb.getObj();
						const t = blco1.blTask();
						var i = blco1.blIdleTask(secTime);
						t.setInfo(i);
						o.addTask(t);
					}
					tb.downloadPage = function(_url,_filename,_v,_cb){ 
						const o = tb.getObj();
						const t = blco1.blTask();
						const svrAPI = "http://localhost:8080/download";  
						var i = blco1.blDownloadTask(svrAPI ,_url,_filename,_v,_cb); 
						t.setInfo(i);
						o.addTask(t);
					};
					tb.parsePage = function(_url,_v,cbfParse){ 
						const o = tb.getObj();
						const t = blco1.blTask();
						var i = blco1.blParseTask(_url,_v,cbfParse);
						t.setInfo(i);
						o.addTask(t);
					};
				}();
				const lv1 = blco1.blDiv(d,"lv1_4_AutoRun","-","green");
				const lv2 = blco1.blDiv(d,"lv2_4_AutoRun","-","Plum");
				v = blco1.blDiv(d,"v_4_AutoRun","v","Pink");	
				
				vTask = blco1.blDiv(d,"vTask","vTask","lightblue");	
				const btnTimer = blco1.blBtn(v,v.id+"btnTimer","btnTimer","green");
				btnTimer.style.float = "right";
				btnTimer.style.color = "white";
				const btnCurTask = blco1.blBtn(v,v.id+"btnCurTask","btnCurTask","brown");
				btnCurTask.style.float = "right";
				btnCurTask.style.color = "white";
				btnCurTask.onclick = function(){
					lock4Run.unlock();
				}
				const makeTasks = function(){
					const tasks = [
						{
						"id":-5,
						"name":"wait_2s",
						"runTask":function(){ 
							tb.waitSomeTime(2);		
						},
						"color":"gray",
						"float":"right"
					},
					{
						"id":-4,
						"name":"wait_5s",
						"runTask":function(){ 
							tb.waitSomeTime(5);		
						},
						"color":"gray",
						"float":"right"
					},
						{
							"id":-3,
							"name":"createBLS",
							"runTask":function(){ 
								tb.createBLS(
									"https://files.51voa.cn/202212/scientists-study-oldest-known-dna.mp3",
									"https://www.51voa.com/lrc/202212/scientists-study-oldest-known-dna.lrc",
									bl$("vTask"),
									function(_v,_o){
										 //to do...
								});		
							},
							"color":blco1.c(13),
							"float":"left"
						},
						{
							"id":-2,
							"name":"bls2MP4",
							"runTask":function(){ 
								tb.createVideo(
									"video.json",
									bl$("vTask"),
									function(_v,_o){
										//to do...
								});		
							},
							"color":blco1.c(12),
							"float":"right"
						},
						
						{
							"id":1,
							"name":"dl-51voaIndex",
							"runTask":function(){ 
								tb.downloadPage("https://www.51voa.com/","51voa_Index.html",bl$("vTask"),
									function(_v,txt){
										_v.innerHTML = txt;
								});		
							},
							"color":blco1.c(3),
							"float":"right"
						},
						{
							"id":2,
							"name":"parse-51voaIndex",
							"runTask":function(){ 
								tb.parsePage("http://localhost:8080/51voa_Index.html",bl$("vTask"),
								function(v,txt){
									v.innerHTML = "";
									const lv1 = blco1.blDiv(v,v.id+"lv1","lv1","blue");
									const vDate = blco1.blDiv(v,v.id+"vDate","date","lightgreen");
									const vNew = blco1.blDiv(v,"id4vParse","new","lightblue");
									var a = txt.split('更新时间：');
									var b = a[1].split('）');
									var c = b[0].split('-');
									var d = c[0]+"/"+c[1]+"/"+c[2];
	
									var e = a[1].split(d); 
									const url51voa = "https://www.51voa.com";
									var s = "";
									for(var i=0; i<e.length-1;i++){
										s += "<br>";
										var f = e[i].split('href="'); 
										var sPage = "";
										var ls = [];
										for(var j=1; j<f.length;j++){
											var g = f[j].split("</a>");
											sPage += '<a '; 
											sPage += ' href="' +url51voa + g[0]+'</a> * ';
											ls.push(url51voa + g[0]);
										}
										var dPage = blco1.blDiv(vNew,vNew.id+i+"dPage",sPage,"lightgreen"); 
										var v4dl = blco1.blDiv(vNew,vNew.id+i+"v4dl","v4dl",blco1.c(15)); 
										var btnDlPage = blco1.blBtn(dPage,dPage.id+"btnDlPage","DlPage","green");
										btnDlPage.onclick =  function(_v,_i){
											return function(){
												_v.innerHTML = ls[_i];
											}
										}(v4dl,i)
									}
	
									vDate.innerHTML = b[0]; 
								});	
							},
							"color":blco1.c(14),
							"float":"right"
						},
					];
					const v4Tasks0 = blco1.blDiv(v,v.id+"v4Tasks0","v4Tasks0","white");
					const v4Tasks1 = blco1.blDiv(v,v.id+"v4Tasks1","v4Tasks1","gray");
					for(i in tasks){
						const b = blco1.blBtn(v4Tasks1,v4Tasks1.id+tasks[i].id,tasks[i].name,tasks[i].color);
						b.onclick = function(_i){
							return function(){
								tasks[_i].runTask();
							}
						}(i);
					}
				}(); 

				lock4Run.unlock();
				blco1.blTimer(1000,1000,function(tl){
					btnTimer.innerHTML = tl;
					btnCurTask.innerHTML = curIndex;
					if(lock4Run.isLocked()){ 	
						if(ls[curIndex].doing) ls[curIndex].doing(lock4Run);						
					}
					else{
						if(curIndex<ls.length-1) 
						{
							curIndex++;
							if(ls[curIndex].toLock) ls[curIndex].toLock(lock4Run);
						}
					}
					
				});
				
				tb.getObj = function(){return rAutoRun;}
			} 
			o.addTask = function(o){
				const btnT = blco1.blBtn(tb,tb.id+ls.length,ls.length,"lightblue");
				btnT.style.float = "left";				
				btnT.onclick = function(_v,_this,_oTask){
					return function(){
						_v.innerHTML = _this.id + ": n=" + _oTask.getInfo(); ;
					}
				}(vTask,btnT,o);
				o.setBtn(btnT);				
				ls.push(o);
			}
			return o;
		};
		const rAutoRun = new f();
		return rAutoRun;		
	}
	this.blAOI = function(){
		var x1 = 0,x2 = 0,y1 = 0,y2 = 0;
		var bSelect = false;
		var lsX1Y1 = [];
		var lsX2Y2 = [];
		const _aoi = function(){
			this.setTargetXY = function(_x1,_y1,_x2,_y2){
				x1 = _x1; y1 = _y1; x2 = _x2; y2 = _y2;
			}
			this.drawAOI = function(ctx,c){ 
				const oldStyle = ctx.fillStyle;
				const oldStrokeStyle = ctx.strokeStyle;
				ctx.fillStyle = c; 	
				ctx.strokeStyle = c;
				ctx.fillText(`blAOI: nlsX2Y2=${lsX2Y2.length}`, x1,y1-10);
				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y1);
				ctx.lineTo(x2, y2);
				ctx.lineTo(x1, y2);
				ctx.lineTo(x1, y1);
				ctx.stroke();
				if(bSelect) ctx.fillStyle = "brown";
				for(i in lsX1Y1){
					ctx.fillRect(x1+lsX1Y1[i].x,y1+lsX1Y1[i].y,lsX1Y1[i].w,lsX1Y1[i].h);
				}
				for(i in lsX2Y2){
					ctx.fillRect(x2+lsX2Y2[i].x,y2+lsX2Y2[i].y,lsX2Y2[i].w,lsX2Y2[i].h);
				}
				ctx.fillStyle = oldStyle;
				ctx.strokeStyle = oldStrokeStyle;
			}
			this.addX1Y1AOI = function(x,y,w,h){
				var o = {};
				o.x = x; o.y = y; o.w = w; o.h = h;
				lsX1Y1.push(o);
			}
			this.addX2Y2AOI = function(x,y,w,h){
				var o = {};
				o.x = x; o.y = y; o.w = w; o.h = h;
				lsX2Y2.push(o);
			}
			this.inAOI = function(x,y){
				var b = false;
				for(i in lsX1Y1){ 
					if(blo0.blPiR(x,y,x1+lsX1Y1[i].x,y1+lsX1Y1[i].y,lsX1Y1[i].w,lsX1Y1[i].h)) 
					{b = true;break;}
				}
				for(i in lsX2Y2){ 
					if(blo0.blPiR(x,y,x2+lsX2Y2[i].x,y2+lsX2Y2[i].y,lsX2Y2[i].w,lsX2Y2[i].h)) 
					{b = true;break;}
				}
				return b;
			}
			this.setSelected = function(b){bSelect = b;}
		}
		return new _aoi();
	}
	this.C4Canvas = function(d,w,h,initColor){
		function _blCanvas(d,w,h){
			var cvs = document.createElement("canvas");
			cvs.id = d.id + "_C4Canvas";
			cvs.width = w;
			cvs.height = h;
			var bMS = false;
			var x = 0, y = 0;
			var lsOs = []; 
			var curDrawingType = 0;
			var newObj = null;
			var moveObj = null;			
			var eui = null;
 
			var draw_a_bar_of_Notes = function(ctx,ib,xBarStart,_y,_dx,_dy){  
				var oldStyle = ctx.fillStyle;
				ctx.fillStyle = "purple"; 

				var xBarEnd = xBarStart + _dx* 3;
				ctx.fillText("bar" +(ib+1),xBarStart,_y);
				for(var i = 0; i<4; i++){//beat
					var xBeatStart = xBarStart + i * _dx * .8; 
					//ctx.fillText("beat" +(i+1),xBeatStart,_y + _dy);
					gBlBeat_2Nl (ctx,xBeatStart,_y + _dy,1,2,2,0);
				}

				ctx.fillText((ib+1) + "|",xBarEnd ,_y);

				ctx.fillStyle = oldStyle; 
			}
			var draw_a_row_of_Notes = function(ctx,_s,_x,_y,_dx,_dy){  
				var oldStyle = ctx.fillStyle;
				ctx.fillStyle = "blue"; 

				for(var i = 0; i<4; i++){
					var xBarStart = _x + i * _dx * 3.5;
					draw_a_bar_of_Notes(ctx,i,xBarStart,_y,_dx,_dy);
				}

				ctx.fillText(_s,_x,_y+_dy*2);

				ctx.fillStyle = oldStyle; 
			}
			cvs.addEventListener('mousedown', function (e) {
				x = e.offsetX;
				y = e.offsetY;
				bMS= true;
				if(curDrawingType==1){
					const o = {};
					o.x = x;
					o.y = y;
					o.draw_me = function(cvs){
						var ctx = cvs.getContext("2d");
						ctx.fillText(".",o.x,o.y);
					}
					lsOs.push(o);
				}
				else if(curDrawingType==G_DRAW_LINE){
					newObj = new gc4Line();
					newObj.setXY1(x,y);					
				} 
				else if(curDrawingType==G_DRAW_AUTORUN){
					newObj = new gc4AutoRun();
					newObj.setXY1(x,y);					
				} 
				else if(curDrawingType==G_DRAW_SO_EDITOR){
					newObj = new gc4SoEditor();
					newObj.setXY1(x,y);					
				}
				else if(curDrawingType==G_DRAW_BLS){
					newObj = new gc4BLS();
					newObj.setXY1(x,y);					
				} 
				
				else if(curDrawingType==G_EDIT_OBJECT){  	
					eui = blo0.blMD("id_eui","uiEditor",100,100,333,100,"blue");		
					eui.v1 = blo0.blDiv(eui,eui.id+"v1","v1","lightblue");		
					for(i in lsOs){
						if(lsOs[i].edit_me) {
							lsOs[i].edit_me(eui,x,y);
						} 
					}			
				}
				else if(curDrawingType==G_SELECT_OBJECT){  					
					for(i in lsOs){
						if(lsOs[i].select_me) lsOs[i].select_me(x,y); 
					}			
				}
				else if(curDrawingType==G_MOVE_OBJECT){  
					moveObj =  new gc4Move();	
					moveObj.setXY1(x,y);
					moveObj.setXY2(x,y);	
					for(i in lsOs){
						lsOs[i].move_start(); 
					}				
				}
			});
			cvs.addEventListener('mousemove', function (e) {
				if(bMS){
					x = e.offsetX;
					y = e.offsetY; 
					 
					if(curDrawingType==1){
						const o = {};
						o.x = x;
						o.y = y;
						o.draw_me = function(cvs){
							var ctx = cvs.getContext("2d");
							ctx.fillText(".",o.x,o.y);
						}
						lsOs.push(o);
					}			
					else if(curDrawingType==G_DRAW_LINE){						
						newObj.setXY2(x,y);
					}					
					else if(curDrawingType==G_DRAW_AUTORUN){						
						newObj.setXY2(x,y);
					}			
					else if(curDrawingType==G_DRAW_SO_EDITOR){
						newObj.setXY2(x,y);
					}
					else if(curDrawingType==G_DRAW_BLS){						
						newObj.setXY2(x,y);
					}	
					else if(curDrawingType==G_EDIT_OBJECT){		 
						for(i in lsOs){
							if(lsOs[i].edit_move) lsOs[i].edit_move(x,y); 
						}	
					}
					else if(curDrawingType==G_MOVE_OBJECT){ 
						moveObj.setXY2(x,y);	
						var d = moveObj.getDXY();	
						for(i in lsOs){
							lsOs[i].move_me(d.dx,d.dy); 
						}	
					}
				}				
			});
			cvs.addEventListener('mouseup', function (e) {
				x = e.offsetX;
				y = e.offsetY;
				bMS = false;

				if(curDrawingType==G_DRAW_LINE){
					lsOs.push(newObj);
					newObj = null;
				} 
				
				if(curDrawingType==G_DRAW_AUTORUN){
					lsOs.push(newObj);
					newObj = null;
				} 
				if(curDrawingType==G_DRAW_SO_EDITOR){
					lsOs.push(newObj);
					newObj = null;
				}
				if(curDrawingType==G_DRAW_BLS){
					lsOs.push(newObj);
					newObj = null;
				} 
				else if(curDrawingType==G_MOVE_OBJECT){  	
					moveObj = null;	
				}
				else if(curDrawingType==G_EDIT_OBJECT){		 
					for(i in lsOs){
						if(lsOs[i].edit_up) lsOs[i].edit_up(x,y); 
					}	
				}
			}); 

			cvs.parseStr = function(s){
				var ctx = cvs.getContext("2d");			
				ctx.fillStyle = "red"; 
				ctx.font = "20px Arial";
				const X0 = 11;
				const Y0 = 77;
				var _x = X0;
				var _y = Y0;
				var _dy = 44;
				var _dx = 80;
				var a = s.split(/Q[1-7]*:/g); 
				for(i in a)
				{ 
					if(i==0) continue;

					ctx.fillText("[" + i + "]", _x, _y);
					_y += _dy;
					
						 
					var r = a[i].split(/C[1-7]*:/g);
					for(j in r){
						if(j==0){
							 
							
							var ns = r[0].match(/[|1-70][ />.',"]*[A-Za-z]*["]*[ />.',"-]*/g);
							
							draw_a_row_of_Notes(ctx,ns,_x,_y,_dx,_dy);
							_y += _dy*3;

							_x = X0;
							for(k in ns){
								ctx.fillText(ns[k], _x,_y); 
								_x += _dx;
							}
							
						}
						else{
							_x = X0;
							ctx.fillText(j + " = " + r[j], _x,_y);
						}
						_y += _dy;
					} 
				}
			}
			cvs._2runCmd = function(cmdID,b,oBoss){
				if(ID_CMD_BLS_UI == cmdID){
					var d = blo0.blMDiv(oBoss,oBoss.id+"mdiv4_bls_UI","blsUI",555,100,222,100,"green");
					var tb = blo0.blDiv(d,d.id+"tb","tb","gray");
					var b1= blo0.blBtn(tb,tb.id+"b1","blsNew","gray");
					b1.onclick = function(){
						curDrawingType = G_DRAW_BLS;
					}
					_on_off_div(b,d); 
					b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
				}
			}
			cvs.setType = function (_type){ curDrawingType = _type;}
			cvs.removeAll = function(){ lsOs = [];}
			cvs.drawAllOs = function(){
				var ctx = cvs.getContext("2d");			
				ctx.fillStyle = "lightgreen"; 
				ctx.fillRect(0,0,w,h);
				
				ctx.fillStyle = "blue"; 
				ctx.font = "30px Arial";
				ctx.fillText(nTicks++, 10, 50);
				ctx.font = "30px Arial";
				ctx.fillText("bMS=" + bMS, 111, 50);
				ctx.fillText("["+x+","+y+"]", 333, 50);
				blo0.blDrawKline(ctx,33,55,555,444);
				blo0.blDrawOKText(cvs,"卡拉ok字幕测试。: 号两岸三地号两岸三地号两岸三地号两岸三地号两岸三地号两岸三地",nTicks/100,33,55,"gray","red");

				blo0.blMousePos(ctx,x,y,bMS);
				
				for(i in lsOs){
					lsOs[i].draw_me(cvs); 
				}
				if(newObj) newObj.draw_me(cvs);
				if(moveObj) moveObj.draw_me(cvs);
			}

			d.appendChild(cvs);
			cvs.style.float = "left";

			var ctx = cvs.getContext("2d");								 
			ctx.fillStyle = initColor; 
			ctx.fillRect(0,0,w,h);	

			return cvs;
		}
		const c = new _blCanvas(d,w,h);

		var cvxTimer = null;
		var nTicks = 0;
		var fn2do = null;
		const drawInTimer = function(){
			c.drawAllOs();
			if(fn2do) fn2do();
		}
		var r = {};
		r.parseStr = function(s){ c.parseStr(s);	}
		r.drawCircle = function(x,y,r,fillColor,strokeColor,lineWidth){	
			var ctx = c.getContext("2d");		 
			ctx.beginPath();
			ctx.arc(x, y, r, 0, 2 * Math.PI);
			ctx.fillStyle = fillColor;
			ctx.fill();
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = strokeColor;
			ctx.stroke(); 	
		}
		r.startTimer = function(_fn){
			if(cvxTimer) return;
			fn2do = _fn;
			cvxTimer = setInterval(drawInTimer, 20);
		}
		r.stopTimer = function(){
			clearInterval(cvxTimer);
			cvxTimer = null;
			nTicks = 0;
		}
		r.setDrawType = function(_type){ c.setType(_type);	}
		r.runCmd = function(cmdID,btn,oBoss){ c._2runCmd(cmdID,btn,oBoss);	}
		r.removeAll = function(){ c.removeAll();}

		return r;
	}

	this.C4SVG = function (w,h){        
		function _C4SVG(w,h){
			var d = null;
			var lsDef = [];
			var makeID = function(){ var id = "id_4_svg_def_"+lsDef.length; return id;}
			this.addDef = function(id,str){
				var o = {}
				o.id = id;
				o.str = str;
				lsDef.push(o);
			}
			this.ui = function(id,html,x,y,w,h,color){
				if(!d){
					d = blo0.blMD(id,html,x,y,w,h,color);
					const tbDefs = blo0.blDiv(d,d.id+"tbDefs","tbDefs","gray");
					const vDefs = blo0.blDiv(d,d.id+"vDefs","vDefs","lightblue");
					const btnRefreshDefs = blo0.blBtn(tbDefs,tbDefs.id + "btnRefreshDefs","rDefs","brown");
					btnRefreshDefs.style.float = "left";
					btnRefreshDefs.onclick = function(){
						vDefs.innerHTML = Date();
						for(i in lsDef){
							const btnDef = blo0.blBtn(vDefs,vDefs.id+i,i,"gray");
							btnDef.onclick = function(_b,_i,_l){
								return function(){
									blo0.blGetTa().value = _l[_i].str;

									var s = u.s1(); 
									s += r.def(_l[_i].id,_l[_i].str);
									s += r.use(_l[_i].id,20,22);
									s += u.s2();
									v.innerHTML = s;
								}
							}(btnDef,i,lsDef);
						}
					}
					
					const btnAddDef = blo0.blBtn(tbDefs,tbDefs.id + "btnAddDef","+","green");
					btnAddDef.style.float = "left";
					btnAddDef.onclick = function(){						
						var s = u.addDef(makeID(),blo0.blGetTa().value);
						v.innerHTML = JSON.stringify(s);
						btnRefreshDefs.click();
					}

					const tb = blo0.blDiv(d,d.id+"tb","tb","gray");
					const v = blo0.blDiv(d,d.id+"v","v","lightblue");
					const b1 = blo0.blBtn(tb,tb.id + "b1","string2svg(ta.value)","green");
					b1.style.float = "left";
					b1.onclick = function(){
						var s = r.string2svg(blo0.blGetTa().value);
						v.innerHTML = s;
					} 
					const use1 = blo0.blBtn(tb,tb.id + "use1","use1","green");
					use1.style.float = "left";
					use1.onclick = function(){ 
						var s = u.s1(); 
						s += r.def(lsDef[0].id,lsDef[0].str);
						s += r.use(lsDef[0].id,20,22);
						s += u.s2();
						v.innerHTML = s;
						blo0.blGetTa().value = s;
					}
				}
				_on_off_div(null,d);
			}
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
			this.text = function(sText,x,y,size,fillColor){
				var s = '<text ';
				s += 'x="'+x+'" y="'+y+'" ';
				s += 'dy="30.078" text-anchor="middle" ';
				s += 'fill = "'+ fillColor +'" ';
				s += 'style="font-weight:bold;" font-size="'+size+'" font-family="Microsoft YaHei">';
				s += sText;
				s += '</text>';
				return s;
			}
			this.ntMusic = function(ls){  
				var ms = ls[0].split(" ");
				var c = [];
				for(i in ls){
				  c[i] = 0;
				}
				for(i in ls){
				  if(i==0) continue; 
				  for(j in ms){
					if(ms[j]=='-' || ms[j]=='|'){
					  continue;
					}
					var l = ls[i][c[i]];
					c[i]++;
					if(ls[i][c[i]]=="，" || ls[i][c[i]]=="。") {
					  l += ls[i][c[i]];
					  c[i]++;
					}
					ms[j] += "_"+l; 
				  }
				}
				return ms;
			}
			 
		
		}
		const u = new _C4SVG(w,h);  

		var r = {};
		r.ui = function(id,html,x,y,w,h,color){			u.ui(id,html,x,y,w,h,color);		}
		r.string2svg = function(str){
			var s = "";
			s = u.s1();
			
			s += u.text("1",1,1,11, "red");
			s += u.text("11",11,11,22, "red");
			
			var dy = 31;
			var y = 111;
			var x = 555;
			var dx = 24;

			var a = str.split(/Q[1-7]*:/g); 
			for(i in a)
			{
				if(i==0) continue; 
				var r = a[i].split(/C[1-4]*:/g);
				var music = u.ntMusic(r);
				s += u.text(music,x,y,dx, "lightgreen");
				y += dy*3;
			}
			
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
	this.blStr2JpSVG = function (v,ntStr,lyStrs){  
		var _notes = function(lsNotes,x,y,dx,_makeText,_use_shuzi_by_id,_use_yingao_by_id){     
				const _getNoteId = function(c){
					var sID = "";
					if(c=='0'||c=='1'|| c=='2'|| c=='3'|| c=='4'|| c=='5'|| c=='6'|| c=='7'){
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
				s += _makeText("notes: v0.14",111, 11,"yellow");
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
		var blcWork1 = function(ntStr,lyStrs){
		  this.blMakeSVG = function(){ return _makeSVG1(1000,1415); }
	
		  
		  var _makeSVG1 = function (w,h){        
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
			s += _use_shuzi_by_id("shuzi_c_0",11,300);
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
			  this.shuzi_c_0 = function(){ return _2_def_shuzi_c_0(); }
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
			  
			  var _2_def_shuzi_c_0 = function(){
				const id = "shuzi_c_0";
				var s = '';
				s += '<g id="'+id+'" ';
				s += 'transform="translate(-50,-50)">';
				
				s += '<rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#1fffff"/>';
				
				s += '<path fill="blue" d="m49.99374,41.08005c0.94927,0 1.7798,0.19606 2.48943,0.58818c0.71017,0.39212 1.3027,0.97158 1.77761,1.7384s0.83218,1.71009 1.07181,2.82927c0.23963,1.11972 0.35943,2.40719 0.35943,3.86185c0,2.89299 -0.47707,5.08615 -1.43124,6.58057c-0.95415,1.49442 -2.37614,2.24163 -4.26704,2.24163c-1.89962,0 -3.32215,-0.74721 -4.26759,-2.24163c-0.9449,-1.49442 -1.41818,-3.68758 -1.41818,-6.58057c0,-1.45466 0.11764,-2.74213 0.35292,-3.86185c0.23528,-1.11973 0.58982,-2.063 1.06471,-2.82927s1.06746,-1.34629 1.77817,-1.7384c0.71018,-0.39212 1.54017,-0.58818 2.48997,-0.58818zm0,15.23937c0.41827,0 0.7837,-0.10892 1.09793,-0.32676c0.31371,-0.2173 0.57729,-0.57294 0.79078,-1.06527c0.2135,-0.49232 0.37471,-1.1328 0.48362,-1.9214c0.10893,-0.7886 0.16339,-1.75801 0.16339,-2.90823s-0.05446,-2.13053 -0.16339,-2.94036s-0.27011,-1.47264 -0.48362,-1.98621c-0.21402,-0.51411 -0.47707,-0.89098 -0.79078,-1.13062c-0.31369,-0.23963 -0.67967,-0.35944 -1.09793,-0.35944c-0.40954,0 -0.77117,0.11763 -1.08488,0.35291c-0.31314,0.23527 -0.57892,0.60997 -0.79731,1.12354c-0.21731,0.51411 -0.38123,1.17636 -0.48962,1.98676c-0.10891,0.81038 -0.16338,1.79504 -0.16338,2.95343c0,1.15023 0.05447,2.12181 0.16338,2.91478c0.10839,0.79295 0.27231,1.43341 0.48962,1.9214c0.21785,0.48797 0.48417,0.84087 0.79731,1.05873c0.31371,0.21784 0.67533,0.32676 1.08488,0.32676z"/>';            
				
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
			s += od.shuzi_c_0();
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
		var w = new blcWork1(ntStr,lyStrs);
		r = w.blMakeSVG();
		v.v.innerHTML = r;
		return r;
	}
	this.blStr2JpSVG2 = function (txt,x,y,w,h,vTime){    
		var r = "";
		var blcWork2 = function(sInit,x,y,w,h,vTime){
		  this.blMakeSVG = function(){ return _makeSVG2(x,y,w,h,vTime); }
	
		  const _getNoteId = function(c){
			var sID = "";
			if(c=='0'|| c=='1'|| c=='2'|| c=='3'|| c=='4'|| c=='5'|| c=='6'|| c=='7'){
				sID = "shuzi_c_" + c;
			}
			else if(c=='|'){
				sID = "xiaojiexian";
			} 
			else if(c=='-'){
				sID = "yanyinfu";
			}
			else if(c==','){
				sID = "yingao_di";
			}
			else if(c=='.'){
				sID = "fudian";
			}
			else if(c=='/'){
				sID = "jianShi";
			}
			return sID;
		  }
		  var _mkMusicRow = function(ls){  
			var ms = ls[0].split(" ");
			var c = [];
			for(i in ls){
			  c[i] = 0;
			}
			for(i in ls){
			  if(i==0) continue; 
			  for(j in ms){
				if(  
					ms[j]=='-' 
					|| ms[j]=='|'
				){
				  continue;
				}
				var l = ls[i][c[i]];
				c[i]++;
				if(ls[i][c[i]]=="，" || ls[i][c[i]]=="。") {
				  l += ls[i][c[i]];
				  c[i]++;
				}
				ms[j] += "_"+l;  
			  }
			}
			return ms;
		  }
			
	
		  var _getBars = function(lsNotes){ 
			var l = lsNotes;
			var nBar = 0;
			var lsBar = [];
			lsBar.push(0);

			for(i in l){     		 
				var idNote =  _getNoteId(l[i][0]);
				if("xiaojiexian"==idNote){
						nBar++;
						lsBar.push(i); 
				} 
			}
			return lsBar;
		  }
		  var _renderMusicRow = function(lsNotes,lsBars,x,y,dx,_makeText,_use_shuzi_by_id,_use_yingao_by_id,_t,_mr){
				var s = "";
				s += _makeText("nts: xv0.234",222, 11, 36, "red");
				var l = lsNotes;
	
				var nBar = 0; 

				for(i in l){     				
					var dy = 0;       
					var idNote = "";
					if(l[i][0]=='('){
						idNote = _getNoteId(l[i][1]);
						s += _use_shuzi_by_id("bl_lianYinXian_1",x + i*dx -30,y-81);  
					}
					else{
						idNote = _getNoteId(l[i][0]);
						if("xiaojiexian"==idNote){ 
							nBar++; 
							if(Math.ceil(_t/16)==_mr && Math.ceil((_t-(_mr-1)*16)/4)==nBar){
								var xBarStart = x +lsBars[nBar-1]*dx;
								var xBarEnd = x + lsBars[nBar]*dx;

								var n = _t%4;
								n = n?n:4;
								s += _makeText("["+ nBar+"."+ n + "]",xBarStart, y+13, 22, "brown");
								s += _makeText(_mr+"*" + _t,xBarEnd, y+13, 22, "red");
							} 
						}
					}
					s += _use_shuzi_by_id(idNote,x + i*dx,y);   
				
					var jsNt = l[i].split('/');    
					if(jsNt.length>1){
						for(var j = 0; j < (jsNt.length -1);j++){
							s += _use_yingao_by_id("jianShi",x + i*dx,y - j*8 + dy*12);  
							dy++;
						}
					}
					var jsNt = l[i].split('>');    
					if(jsNt.length>1){
						for(var j = 0; j < (jsNt.length -1);j++){
							s += _use_yingao_by_id("jianShi",x + i*dx,y - j*8 + dy*12); 
							s += _use_yingao_by_id("jianShi",x + i*dx+0.35*dx,y - j*8 + dy*12); 
							s += _use_yingao_by_id("jianShi",x + i*dx+0.7*dx,y - j*8 + dy*12); 
							dy++;
						}
					}


					var nt = l[i].split(',');
					if(nt.length>1){
						for(var j = 0; j < (nt.length -1);j++){
							s += _use_yingao_by_id("yingao_di",x + i*dx,y + j*8 + dy*8); 
						}
					}
	
					var nt = l[i].split("'");
					if(nt.length>1){
						for(var j = 0; j < (nt.length -1);j++){
							s += _use_yingao_by_id("yingao_di",x + i*dx,y - j*8 -28);
						}
					} 
					
	
					var fdNt = l[i].split('.');    
					if(fdNt.length>1){
						for(var j = 0; j < (fdNt.length -1);j++){
							s += _use_yingao_by_id("fudian",x + i*dx,y - j*8);
						}
					}
					var ly = l[i].split('_');    
					if(ly.length>1){
						for(var j = 0; j < (ly.length -1);j++){
							s += _makeText(ly[j+1],x + i*dx,y + j*24 + 10 + 12 + 8 , 20, "black");
							
						}
					}
					
					var Chord = l[i].split('"');    
					if(Chord.length>1){
						s += _makeText(Chord[1],x + i*dx,y + j*24 - 66, 20, "brown");
					}

				}
				return s;
			  }
	
		  
		  var _makeSVG2 = function (_x,_y,_w,_h,_t){        
			var s = '<svg ';
			s +='width="' + _w +'" ';
			s +='height="' + _h + '" ';
			s +='version="1.1" ';
			s +='viewBox="' + _x + ' ' + _y +' ' + _w + ' ' + _h + '" ';
			s +='encoding="UTF-8" xmlns="http://www.w3.org/2000/svg">';
			s += '<rect x="0" y="0" height="100%" width="100%" fill="white" />';
			
			s += _makeText("Title" + _t,500,1, 36, "yellow");
			s += _defs();
			s += _uses(555,11);
			
			
			var a = sInit.split(/Q[1-7]*:/g); 
			var dy = 44;
			var y = 111;
			var x = 55;
			var dx = 30;
			var nRow = 0;
			for(i in a)
			{
			  if(i==0) continue; 
			  nRow++;
			  var r = a[i].split(/C[1-4]*:/g);
	
			  var rowNotes = _mkMusicRow(r);   
			  s += _renderMusicRow(rowNotes,_getBars(rowNotes),x,y, dx,_makeText,_use_shuzi_by_id,_use_yingao_by_id,_t,nRow);    
			  s += _makeText("r:" + nRow,x,y, 15, "blue");
			   
			  y += dy*3;
			}
	
			s += '</svg>';
			return s;
		  }
		  
		  var _uses = function(x,y){
			var _x = x;
			var _y = y;
			var _dx = 30;
			var s = "";
			s += _use_shuzi_by_id("bl_lianYinXian_1",_x,_y); _x += _dx;
			s += _use_shuzi_by_id("shuzi_c_0",_x,_y); _x += _dx;
			s += _use_shuzi_by_id("shuzi_c_1",_x,_y); _x += _dx;
			s += _use_shuzi_by_id("shuzi_c_2",_x,_y); _x += _dx;
			s += _use_shuzi_by_id("shuzi_c_3",_x,_y); _x += _dx;
			s += _use_shuzi_by_id("shuzi_c_4",_x,_y); _x += _dx;
			s += _use_shuzi_by_id("shuzi_c_5",_x,_y); _x += _dx;
			s += _use_yingao_by_id("yingao_di",_x,_y); _x += _dx;
			s += _use_shuzi_by_id("shuzi_c_6",_x,_y); _x += _dx;
			s += _use_shuzi_by_id("shuzi_c_7",_x,_y);   _x += _dx;
			s += _use_shuzi_by_id("xiaojiexian",_x,_y); _x += _dx;
			s += _use_shuzi_by_id("yanyinfu",_x,_y); _x += _dx;
			s += _use_yingao_by_id("fudian",_x,_y); _x += _dx;
			s += _use_yingao_by_id("jianShi",_x,_y); _x += _dx;
			
			return s;
		  }
		  var _defs = function(){
			const CDefs = function(){  
			  this.bl_lianYinXian_1 = function(){ return _2_def_bl_lianYinXian_1(); }
			  this.shuzi_c_0 = function(){ return _2_def_shuzi_c_0(); }
			  this.shuzi_c_1 = function(){ return _2_def_shuzi_c_1(); }
			  this.shuzi_c_2 = function(){ return _2_def_shuzi_c_2(); }
			  this.shuzi_c_3 = function(){ return _2_def_shuzi_c_3(); }
			  this.shuzi_c_4 = function(){ return _2_def_shuzi_c_4(); }
			  this.shuzi_c_5 = function(){ return _2_def_shuzi_c_5(); }
			  this.yingao_di = function(){ return _2_def_yingao_di(); }
			  this.fudian = function(){ return _2_def_fudian(); }
			  this.jianShi = function(){ return _2_def_jianShi(); }
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
			  
			  var _2_def_fudian = function(){
				const id = "fudian";
				var s = '';
				s += '<g id="'+id+'" ';
				s += 'transform="translate(-50,-50)">';
				s += '<ellipse fill="#1b1b1b" cx="62.35" cy="49.75" rx="2.45" ry="2.45"/>';
				s += '</g>';
				return s;
			  } 
			  
			  var _2_def_jianShi = function(){
				const id = "jianShi"; 
				var s = '';
				s += '<g id="'+id+'" ';
				s += 'transform="translate(-50,-50)">';
	
				//s += '<rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#1fffff"/>';
				s += '<rect height="3.2" width="11" y="64.05" x="44.5" stroke-width="null" fill="#1b1bab"/>';
				
				s += '</g>';
				return s;
			  }
			  var _2_def_bl_lianYinXian_1 = function(){
				const id = "bl_lianYinXian_1";
				var s = '';
				s += '<g id="'+id+'" ';
				s += 'transform="translate(-50,-50)">';
		   
				s += '<path d="M 84,114 C 90.5,104,100.5,104,107,114 M 107,114 C  100.5,105,90.5,105,84,114" stroke-width="0.5" stroke="#fb1b1b"/>';            
	
				s += '</g>';
				return s;
			  }
			  var _2_def_shuzi_c_0 = function(){
				const id = "shuzi_c_0";
				var s = '';
				s += '<g id="'+id+'" ';
				s += 'transform="translate(-50,-50)">';
				
				s += '<rect height="17.9" width="11.1" y="41.05" x="44.45" stroke-width="0" fill="#1fffff"/>';
				
				s += '<path fill="red" d="m49.99374,41.08005c0.94927,0 1.7798,0.19606 2.48943,0.58818c0.71017,0.39212 1.3027,0.97158 1.77761,1.7384s0.83218,1.71009 1.07181,2.82927c0.23963,1.11972 0.35943,2.40719 0.35943,3.86185c0,2.89299 -0.47707,5.08615 -1.43124,6.58057c-0.95415,1.49442 -2.37614,2.24163 -4.26704,2.24163c-1.89962,0 -3.32215,-0.74721 -4.26759,-2.24163c-0.9449,-1.49442 -1.41818,-3.68758 -1.41818,-6.58057c0,-1.45466 0.11764,-2.74213 0.35292,-3.86185c0.23528,-1.11973 0.58982,-2.063 1.06471,-2.82927s1.06746,-1.34629 1.77817,-1.7384c0.71018,-0.39212 1.54017,-0.58818 2.48997,-0.58818zm0,15.23937c0.41827,0 0.7837,-0.10892 1.09793,-0.32676c0.31371,-0.2173 0.57729,-0.57294 0.79078,-1.06527c0.2135,-0.49232 0.37471,-1.1328 0.48362,-1.9214c0.10893,-0.7886 0.16339,-1.75801 0.16339,-2.90823s-0.05446,-2.13053 -0.16339,-2.94036s-0.27011,-1.47264 -0.48362,-1.98621c-0.21402,-0.51411 -0.47707,-0.89098 -0.79078,-1.13062c-0.31369,-0.23963 -0.67967,-0.35944 -1.09793,-0.35944c-0.40954,0 -0.77117,0.11763 -1.08488,0.35291c-0.31314,0.23527 -0.57892,0.60997 -0.79731,1.12354c-0.21731,0.51411 -0.38123,1.17636 -0.48962,1.98676c-0.10891,0.81038 -0.16338,1.79504 -0.16338,2.95343c0,1.15023 0.05447,2.12181 0.16338,2.91478c0.10839,0.79295 0.27231,1.43341 0.48962,1.9214c0.21785,0.48797 0.48417,0.84087 0.79731,1.05873c0.31371,0.21784 0.67533,0.32676 1.08488,0.32676z"/>';            
				
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
			s += od.bl_lianYinXian_1();
			s += od.shuzi_c_0();
			s += od.shuzi_c_1();
			s += od.shuzi_c_2();
			s += od.shuzi_c_3();
			s += od.shuzi_c_4();
			s += od.shuzi_c_5();
			s += od.yingao_di();
			s += od.fudian();
			s += od.jianShi();
			s += od.shuzi_c_6();
			s += od.shuzi_c_7();
			s += od.xiaojiexian(); 
			s += od.yanyinfu();
			s += '</defs>';
			return s;
		  } 
	
		  var _makeText = function(sText,x,y,sz,fillColor){
			var s = '<text ';
			s += 'x="'+x+'" y="'+y+'" ';
			s += 'dy="30.078" text-anchor="middle" ';
			s += 'fill = "'+ fillColor +'" ';
			s += 'style="font-weight:bold;" font-size="'+ sz + '" font-family="Microsoft YaHei">';
			s += sText;
			s += '</text>';
			return s;
		  }
		  
		  var _use_shuzi_by_id = function(id,x,y){
			var s = '<use x="'+x+'" y="'+y+'" ';
			s += 'onmousedown="selectElement(this)" ';
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
		
		var w = new blcWork2(txt,x,y,w,h,vTime);
		r = w.blMakeSVG();
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
	this.blObject = function(_txt,_x,_y,_w,_h,_c){
		var o = {};
		var txt = _txt,x = _x,y=_y,w=_w,h=_h,c = _c;
		o.square = function(){
			return w*h;
		}
		o.renderMe = function(cvs,mode,x0,y0,scale){
			switch (mode){
				case 0:
					blo0.blRect(cvs,x0 + x*scale, y0 + y*scale,w*scale,h*scale,c);
					blo0.blText(cvs,txt,x0 + x*scale + 2, y0 + y*scale + 20,12,"green");
					blo0.blText(cvs,"东西长度：" + w + " 米",x0 + x*scale + 2, y0 + y*scale + 33,12,"green");
					blo0.blText(cvs,"南北长度：" + h + " 米",x0 + x*scale + 2, y0 + y*scale + 45,12,"green");
					blo0.blText(cvs,"面积：" + o.square().toFixed(2) + " 平方米",x0 + x*scale + 2, y0 + y*scale + 58,12,"green");
					break;
				default:
					break;
			}
		}
		return o;
	}
	this.blObjectList = function(){
		var l = [];
		var ol = {};
		ol.addObject = function(o){
			l.push(o);
		}
		ol.sumSquare = function(){
			var s = 0;
			for(i in l){
				s += l[i].square();
			}
			return s;
		}
		ol.drawAllObjects = function(cvs,x0,y0,scale){
			
			var ctx = cvs.getContext("2d");								 
			var old = ctx.fillStyle; 

			ctx.fillStyle = "green"; 
			ctx.fillRect(x0,y0,15,15);	
			ctx.fillText( "总面积 = " + ol.sumSquare()+ " 平方米" , 111, 111);	  

			for(i in l){ 
				l[i].renderMe(cvs,0,x0,y0,scale);
			}
			ctx.fillStyle = old;
		}
		return ol;
	}
	this.C4Music = function(){
		const _CMusic = function(){
			this.note = function( ctx, _x, _y, _s){
			   ctx.fillStyle = "yellow";
			   var a = _s.split("_"); 
	  
			   var x = _x ;
			   var y = _y; 
			   for(i in a){
				   if(i==0){
					   var n = a[0].match(/[|1-70][,']*[ /-]*/g);
					   var c = n[0].match(/[|1-70]*/g);
					   var tn = -2;
					   var tone = n[0].split("'");
					   if(tone.length>1){
							tn = tone.length-1;
					   }
					   else{
							tone = n[0].split(",");
							tn = -(tone.length-1);
					   }
	  
					   var tm= 1;
					   var time= n[0].split("/");
					   if(time.length>1){
						   const v = [1,0.5,0.25];
						   tm= v[time.length-1];
					   }
					   else{
							time= n[0].split("-");
							tm = time.length;
					   }
					   
					   gBlNote(ctx,x,y,c[0],tn,tm);      
	   				   y += 55;     
				   }
				   else{
						ctx.fillText(a[i],x,y);     y += 55;
				   }
			   }       
			}
		}
		const _m = new _CMusic();
	  
		this.draw_1_note = function(ctx,_x,_y,s){ 
		   var x = _x;
		   var y = _y; 	   
		   _m.note(ctx,x,y,s);
		}
		this.draw_beat_hh = function(ctx,_x,_y,s){
			const dx = 55;
			var ns = s.split(";");
			var x = _x;
			var y = _y;
		    _m.note  (ctx,x,y,ns[0]);
			x += dx;
			_m.note  (ctx,x,y,ns[1]);
			ctx.fillRect(_x,_y+5,dx,2);
		}
		this.parseString = function(ctx,_x,_y,s){
			this.draw_beat_hh(ctx,_x,_y,s);
		}
	}
	this.blPlayer0 = function ( oDiv ,_id4video,mySrc){
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
	this.blPlayer = function(_id, _title,_src,_x,_y,_w,_h,_c){		 
		var d = blo0.blMD(_id, _title,_x,_y,_w,_h,_c);
		d.p = blo0.blPlayer0(d,_id+"_video",_src);
		return d;
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

			
			const btnDetail = blo0.blBtn(d.tb,d.tb.id+"btnDetail","body","gray");
			btnDetail.style.float = "right";
			btnDetail.onclick = function(){
				d.v1.innerHTML = btnDetail.id;
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
				const btnShowBody = blo0.blBtn(tb,tb.id+"btnShowBody","showBody","lightgreen");
				btnShowBody.style.float = "right";
				btnShowBody.onclick = function(){
					blo0.blGetTa().value = d.o.body;
				}
				const btnSetBody = blo0.blBtn(tb,tb.id+"btnSetBody","setBody","lightblue");
				btnSetBody.style.float = "right";
				btnSetBody.onclick = function(){
					blo0.blGetTa().value = blo0.blDate();
					var url = "https://api.github.com/repos/jeremyjia/Games/issues/" + i;
					var bodyData = blo0.blGetTa().value ;
					var data = {
					  "body": bodyData
					};
				  
					myAjaxCmd('PATCH', url, data, function (res) {
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
		  const testTargets = ["blPaint","blSpider"]; 
		  const testMethors = [blo0.blh_test_blPaint,blo0.blh_test_blSpider];
		  b.onclick = function(_b,_d,_2Ts,_fun2Ts){
			  for(j in _2Ts){
				if(_b.id==_2Ts[j]){
					_b.j = j;
					b.style.backgroundColor = "brown";
					return function(){ 
						var tv = _fun2Ts[_b.j](_b,_d); 
						_on_off_div(_b,tv);
						_b.style.background = _b.style.background=="red"?blGrey[5]:blColor[4];
					}
				}
			  }
			  return function(){}
		  }(b,d,testTargets,testMethors);

		 
		  
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
	cvs.x = -1;
	cvs.y = -1;
	cvs.addEventListener('mousedown', function (e) {
		cvs.x = e.offsetX;
		cvs.y = e.offsetY;
		cvs.ms = true;
	});
	cvs.addEventListener('mousemove', function (e) {
		if(cvs.ms){
			cvs.x = e.offsetX;
			cvs.y = e.offsetY;
		}		
	});
	cvs.addEventListener('mouseup', function (e) {
		cvs.x = -1;
		cvs.y = -1;
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
var MD5 = function (string) {
  
    function RotateLeft(lValue, iShiftBits) {
        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }
  
    function AddUnsigned(lX,lY) {
        var lX4,lY4,lX8,lY8,lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
  
    function F(x,y,z) { return (x & y) | ((~x) & z); }
    function G(x,y,z) { return (x & z) | (y & (~z)); }
    function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }
  
    function FF(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
  
    function GG(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
  
    function HH(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
  
    function II(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
  
    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1=lMessageLength + 8;
        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
        var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
        var lWordArray=Array(lNumberOfWords-1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while ( lByteCount < lMessageLength ) {
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount-(lByteCount % 4))/4;
        lBytePosition = (lByteCount % 4)*8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
        return lWordArray;
    };
  
    function WordToHex(lValue) {
        var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
        for (lCount = 0;lCount<=3;lCount++) {
            lByte = (lValue>>>(lCount*8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
        }
        return WordToHexValue;
    };
  
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
  
        for (var n = 0; n < string.length; n++) {
  
            var c = string.charCodeAt(n);
  
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
  
        }
  
        return utftext;
    };
  
    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;
  
    string = Utf8Encode(string);
  
    x = ConvertToWordArray(string);
  
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
  
    for (k=0;k<x.length;k+=16) {
        AA=a; BB=b; CC=c; DD=d;
        a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
        d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
        c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
        b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
        a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
        d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
        c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
        b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
        a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
        d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
        c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
        b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
        a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
        d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
        c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
        b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
        a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
        d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
        c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
        b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
        a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
        d=GG(d,a,b,c,x[k+10],S22,0x2441453);
        c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
        b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
        a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
        d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
        c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
        b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
        a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
        d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
        c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
        b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
        a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
        d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
        c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
        b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
        a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
        d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
        c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
        b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
        a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
        d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
        c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
        b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
        a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
        d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
        c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
        b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
        a=II(a,b,c,d,x[k+0], S41,0xF4292244);
        d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
        c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
        b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
        a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
        d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
        c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
        b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
        a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
        d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
        c=II(c,d,a,b,x[k+6], S43,0xA3014314);
        b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
        a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
        d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
        c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
        b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
        a=AddUnsigned(a,AA);
        b=AddUnsigned(b,BB);
        c=AddUnsigned(c,CC);
        d=AddUnsigned(d,DD);
    }
  
    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
  
    return temp.toLowerCase();
}

const gBlNote = function(ctx,_x,_y,c,tone,time){
	var x = _x;
	var y = _y;
	var dy = 10;
	var dx = 10;
	ctx.fillStyle = "#1122ff";
	ctx.font = "30px Arial";
	ctx.fillText(c, x,y);
	if(time==0.5){
	  y = _y + 0.5*dy;    
	  ctx.fillRect(x,y,18, 2); 
	} 
	if(time==0.25){
	  y = _y + 0.5*dy;    
	  ctx.fillRect(x,y,18, 2); 
	  y = _y + 1*dy;    
	  ctx.fillRect(x,y,18, 2); 
	}  
	if(time==0.75){
	  ctx.fillText('.', x + dx*2,y);
	  y = _y + 0.5*dy;    
	  ctx.fillRect(x,y,18  + dx*2, 2); 
	} 
	if(time==2){
	  x = _x + 2*dx;
	  ctx.fillText("-", x,y);
	}  
	if(time==3){
	  x = _x + 2*dx;
	  ctx.fillText("-", x,y);
	  x = _x + 4*dx;
	  ctx.fillText("-", x,y);
	}  
	if(time==4){
	  x = _x + 2*dx;
	  ctx.fillText("-", x,y);
	  x = _x + 4*dx;
	  ctx.fillText("-", x,y);
	  x = _x + 6*dx;
	  ctx.fillText("-", x,y);
	}  
	if(tone==1){
	  y -= 3*dy;
	  x = _x + 0.3*dx;
	  ctx.fillText(".", x,y);
	}  
	if(tone==2){
	  y -= 3*dy;
	  x = _x + 0.3*dx;
	  ctx.fillText(".", x,y);
	  y -= 0.4*dy; 
	  ctx.fillText(".", x,y);
	}  
	if(tone==-1){
	  y += 1*dy;
	  x = _x + 0.3*dx;
	  ctx.fillText(".", x,y); 
	} 
	if(tone==-2){
	  y += 1*dy;
	  x = _x + 0.3*dx;
	  ctx.fillText(".", x,y);
	  y += 0.4*dy; 
	  ctx.fillText(".", x,y);
	}  
}

const gBlBeat_2Nl = function(ctx,_x,_y,n1,t1,n2,t2){
	var x = _x;
	var y = _y;
   x += 33;
  
	ctx.fillRect(x,y+5,33,2);
  
	gBlNote(ctx,x,y,n1,t1,.5);
   x += 33;
	gBlNote(ctx,x,y,n2,t2,.5);
  }
  var gBlBeat_4Nll  = function(ctx,_x,_y,n1,t1,n2,t2,n3,t3,n4,t4){
	var x = _x;
	var y = _y;

	y += 2;
	ctx.fillRect(x,y+5,4*20,2);
	ctx.fillRect(x,y+10,4*20,2);
	gBlNote(ctx,x,y,n1,t1,0.25); 
	x += 20;
	gBlNote(ctx,x,y,n2,t2,0.25); 
	x += 20;
	gBlNote(ctx,x,y,n3,t3,0.25); 
	x += 20;
	gBlNote(ctx,x,y,n4,t4,0.25); 
}

const gBlBeat_Nl2Nll = function(ctx,_x,_y,n1,t1,n2,t2,n3,t3){
    var x = _x;
    var y = _y;
    y += 2;    
	ctx.fillRect(x,y+5,3*20,2); 
	ctx.fillRect(x+20,y+10,2*20,2); 
    
    gBlNote(ctx,x,y,n1,t1,.5); 
    x += 20;
    gBlNote(ctx,x,y,n2,t2,.25); 
    x += 20;
    gBlNote(ctx,x,y,n3,t3,.25); 
}


const gBlBeat_2NllNl = function(ctx,_x,_y,n1,t1,n2,t2,n3,t3){
    var x = _x;
    var y = _y;
    y += 2;    
	ctx.fillRect(x,y+5,3*20,2); 
	ctx.fillRect(x,y+10,2*20,2); 
    
    gBlNote(ctx,x,y,n1,t1,.25); 
    x += 20;
    gBlNote(ctx,x,y,n2,t2,.25); 
    x += 20;
    gBlNote(ctx,x,y,n3,t3,.5); 
}

const gBlBeat_NllNlNll= function(ctx,_x,_y,n1,t1,n2,t2,n3,t3){
    var x = _x;
    var y = _y;
    y += 2;    
    ctx.fillRect(x,y+5,2*20,2);  
    
    gBlNote(ctx,x,y,n1,t1,.25); 
    x += 20;
    gBlNote(ctx,x,y,n2,t2,.5); 
    x += 20;
    gBlNote(ctx,x,y,n3,t3,.25); 
}

const gBlBeat_NldNll= function(ctx,_x,_y,n1,t1,n2,t2){
    var x = _x;
    var y = _y;
    y += 2;    
    ctx.fillRect(x,y+5,2*20,2);  
    
    gBlNote(ctx,x,y,n1,t1,.5); 
    x += 20;
    gBlNote(ctx,x,y,".",0,.5); 
    x += 20;
    gBlNote(ctx,x,y,n2,t2,.25); 
}
const gBlBeat_NllNld= function(ctx,_x,_y,n1,t1,n2,t2){
    var x = _x;
    var y = _y;
    y += 2;    
    ctx.fillRect(x,y+5,2*20,2);  
    
    gBlNote(ctx,x,y,n1,t1,.25); 
    x += 20;
    gBlNote(ctx,x,y,n2,t2,.5); 
    x += 20;
    gBlNote(ctx,x,y,".",0,.5); 
} 
const G_DRAW_LINE 				= 2;
const G_DRAW_AUTORUN			= 3;
const G_DRAW_BLS				= 4;
const G_DRAW_SO_EDITOR			= 5;

const G_SELECT_OBJECT 			= -2;
const G_MOVE_OBJECT 			= -3;
const G_EDIT_OBJECT 			= -4;

const ID_CMD_BLS_UI				= 1;

const gc4Move = function(){
	var x1,y1,x2,y2;
	this.getDXY = function(){
		const d = {};
		d.dx = x2-x1;
		d.dy = y2-y1;
		return d;
	}
	this.setXY1 = function(x,y){		x1 = x; y1 = y;		}
	this.setXY2 = function(x,y){		x2 = x; y2 = y;		}
	this.draw_me = function(cvs){
		var ctx = cvs.getContext("2d");			
		const d = 10;  
		var oldStyle = ctx.fillStyle;

		ctx.fillStyle = "yellow";
		ctx.fillRect(x1-d,y1-d,d*2,d*2);
		ctx.fillText("["+x1+","+y1+"]",x1,y1);
		ctx.fillStyle = "brown";
		ctx.fillRect(x2-d,y2-d,d*2,d*2);
		ctx.fillText("["+x2+","+y2+"]",x2,y2);		
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();

		ctx.fillstyle = oldStyle; 
	}
}

const gc4Line = function(){
	var x1,y1,x2,y2,s = false,mx1,my1,mx2,my2;
	this.select = function(b){		s = b;		}
	this.setXY1 = function(x,y){		x1 = x; y1 = y;		}
	this.setXY2 = function(x,y){		x2 = x; y2 = y;		}
	this.draw_me = function(cvs){
		var ctx = cvs.getContext("2d");		
		const d = 10; 
		if(s){
			var oldStyle = ctx.fillStyle;
			ctx.fillStyle = "red";
			ctx.fillRect(x1-d,y1-d,d*2,d*2);

			ctx.fillstyle = oldStyle;
		}
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}
	this.select_me = function(x,y){
		if(blo0.blPiR(x,y,x1,y1,10,10)){
			 s = !s;
		}
	}
	
	this.move_start = function(dx,dy){
		if(s){ 
			mx1 = x1;
			my1 = y1;
			mx2 = x2;
			my2 = y2;
		}
	}
	this.move_me = function(dx,dy){
		if(s){ 
			x1 = mx1 + dx;
			y1 = my1 + dy;
			x2 = mx2 + dx;
			y2 = my2 + dy;
		}
	}
}


const gc4AutoRun = function(){
	var x1,y1,x2,y2,s = false,e = false,mx1,my1,mx2,my2,txt = "...";
	var ex1,ey1,ex2,ey2;

	const c_4_autoRun = function(){
		this.uiAutoRun = function(v){
			var tb = blo0.blDiv(v,v.id+"tb","tb",blo0.c(1));
			var d = blo0.blDiv(v,v.id+"d","d",blo0.c(2));
			const bs = [
				{
					"id":1,
					"name":"new",
					"float":"left",
					"skip": true,
					"color": "brown",
					"click":function(b,v){
						v.innerHTML = this.name; 
					}
				},
				{
					"id":2,
					"name":"name2",
					"float":"right",
					"click":function(b,v){
						v.innerHTML = this.name;  
						if(1){
							v.v = blo0.blDiv(v,v.id+"v","v",blGrey[0]);
							var blse = new CBlOnlineEditor();
							blo0.blShowObj2Div(d.v,blse);                
							bl$("blrI1").click();             
							bl$("blrI2").click();
						} 

						function CBlOnlineEditor(){
							this.blrI1 = function(b,d){blo0.blLoadGhIssue("jeremyjia","Games",1,b,d);}
							this.blrI2 = function(b,d){blo0.blLoadGhIssue("jeremyjia","Games",2,b,d);}
							this.blrI3 = function(b,d){blo0.blLoadGhIssue("jeremyjia","Games",3,b,d);} 
						}
					}
				},
				{
					"id":3,
					"name":"name3",
					"float":"right",
					"click":function(b,v){
						v.innerHTML = this.name; 
					}
				},
			];
			blo0.blBtns(bs,tb,d,"lightgreen","brown"); 
		}
		this.drawAutoRun = function(ctx){
			var oldStyle = ctx.fillStyle;
			ctx.fillStyle = "yellow"; 
			ctx.fillRect(x1,y1,x2-x1,y2-y1);
			
			ctx.fillStyle = "blue";
			ctx.font = "30px Arial";
			ctx.fillText(txt, x1,y1);
	
			ctx.fillstyle = oldStyle;
		}
	};
	const oAutoRun = new c_4_autoRun();

	this.select = function(b){		s = b;		}
	this.setXY1 = function(x,y){		x1 = x; y1 = y;		}
	this.setXY2 = function(x,y){		x2 = x; y2 = y;		}
	this.draw_me = function(cvs){		
		var ctx = cvs.getContext("2d");
		const d = 10; 
		if(s){
			var oldStyle = ctx.fillStyle;
			ctx.fillStyle = "red";
			ctx.fillRect(x1-d,y1-d,d*2,d*2);

			ctx.fillstyle = oldStyle;
		}
		if(e){
			var oldStyle = ctx.fillStyle;
			ctx.fillStyle = "brown";
			ctx.fillRect(x2-d,y2-d,d*2,d*2); 

			ctx.fillstyle = oldStyle;
		}
		oAutoRun.drawAutoRun(ctx);		
	}
	this.select_me = function(x,y){
		if(blo0.blPiR(x,y,x1,y1,10,10)){
			 s = !s;
		}
	} 
	this.edit_me = function(eui,x,y){
		if(blo0.blPiR(x,y,x2,y2,10,10)){
			 e = true; 
			 eui.v1.innerHTML = "";
			 oAutoRun.uiAutoRun(eui.v1);
			 ex1 = x;
			 ey1 = y;
		}
		else{
			e = false;
		}
	}
	this.edit_move = function(x,y){
		if(e){
			
			ex2 = x;
			ey2 = y;

			x1 += ex2 -ex1;
			y1 += ey2 -ey1;
			x2 += ex2 -ex1;
			y2 += ey2 -ey1;
	
			ex1 = ex2;
			ey1 = ey2;
	
		}
	}
	
	this.move_start = function(dx,dy){
		if(s){ 
			mx1 = x1;
			my1 = y1;
			mx2 = x2;
			my2 = y2;
		}
	}
	this.move_me = function(dx,dy){
		if(s){ 
			x1 = mx1 + dx;
			y1 = my1 + dy;
			x2 = mx2 + dx;
			y2 = my2 + dy;
		}
	}
}

var soText = ` 
		var C4Plx = function(){
			this.drawPlx2Frame = function(ctx,time,x0,y0){ 
			  var x = x0?x0:0;
			  var y = y0?y0:0
			  ctx.fillStyle = 'green';
			  ctx.fillRect(x+0+time%111, y+30, 5, 44);
			  ctx.font = 11+ "px Consolas";
			  ctx.fillStyle = "blue";
			  ctx.fillText("C4Plx v0.14: time="+time ,x+10,y+55); 
			};
		  } 
		  function animateFrame(time){
			  var canvas = document.getElementById('myCanvas');
			  var ctx = canvas.getContext('2d');  
					   
			  var o = new C4Plx();
			  var x = typeof x0 === "undefined"?0:x0;
			  var y = typeof y0 === "undefined"?0:y0;
			  o.drawPlx2Frame (ctx,time,x,y);   
		  }`;
const gc4SoEditor = function(){
	var x1,y1,x2,y2,s = false,e = false;
	var mx1=0,my1=0,mx2=0,my2=0,soName = "so01";
	var mx = 50,my = 50; 
	var ex1,ey1,ex2,ey2;
	const _C4SoEditor = function(){ 
		var soFPS = 1;
		var runStartTime = 0, runNowTime = 0;
		var nTick = 0;
		var vCanStatus = null;
		var bRunScript = false; 
		var op = null;
		const osubo = function(){
			var blPts = null;
			var lsPic = [];
			var curSubId = -1;
			const makeBtnList = function(ls,o,v){
				ls.push(o);
				var tb = blo0.blDiv(v,v.id+"tb","tb",blo0.c(1));
				var d = blo0.blDiv(v,v.id+"d","d",blo0.c(2));
				blo0.blBtns(ls,tb,d,"lightgreen","brown");
			};
			const btnSubOs = [
				{
					"id":1,
					"name":"point",
					"color":blo0.c(17),
					"float":"left",
					"description":`
					  1. blPoints.
					  `,
					"click": function(b,v){    
						v.innerHTML = this.description;
						if(null==blPts) blPts = blo0.blPoints();
						curSubId = this.id;
						blPts.mkUI(v);
					}, 
				},
				{
					"id":2,
					"name":"pic",
					"color":blo0.c(18),
					"float":"left",
					"description":`
					  1. add new picture.
					  `,
					"click": function(b,v){ 
						curSubId = this.id;
						const ls = this.getSubList();
					  	v.innerHTML = this.description; 
						const oNewPic = function(){
							return {
								"id":ls.length,
								"name":"pic",
								"color":"gray",
								"float": "left",
								"description":`new pic ...`,
								"click": function(b,v){
									v.innerHTML = this.description;   
								},
								"src":"http://localhost:8080/x1.jpg"
							}
						}();
					  	makeBtnList(ls,oNewPic,v);
					},
					"getSubList": function(){ return lsPic;}
				},
			];
			const _C4SubObjects = function(){
				
				this.mDown = function(x,y){
					if(curSubId==1)	blPts.mdFun(x,y);
				}
				this.ui4SubObjects = function(v){
					var tb = blo0.blDiv(v,v.id+"tb4Pics","tb",blo0.c(15));
					var d = blo0.blDiv(v,v.id+"d4Pics","d",blo0.c(16));
					blo0.blBtns(btnSubOs,tb,d,"lightgreen","brown");
				}
				this.showSubObjects = function(cvs){
					var ctx = cvs.getContext("2d");
					ctx.fillText(`suObjects`,x1,y1 + 55);  

					if(blPts) blPts.drawPoints(cvs,x1,y1,x2,y2);

				}
				this.compileData = function(){
					var o = blPts?blPts.data2Plx():{};
					return JSON.stringify(o);
				}
				this.compileFrameFun = function(){
					return blPts?blPts.fun2Plx():`
					ctx.fillText('xd try: s= '+ s,x+10,y+55); 
					`;
				}
			}
			return new _C4SubObjects();
		}();
		this.ui4Editor = function(v){ 
			var tb = blo0.blDiv(v,v.id+"tb","tb",blo0.c(13));
			var d = blo0.blDiv(v,v.id+"d","d",blo0.c(14));
			osubo.ui4SubObjects(v);
			vCanStatus = blo0.blDiv(v,v.id+"vCanStatus","black","white");
			vCanStatus.updateMsg = function(x,y){
				vCanStatus.innerHTML =`[${x},${y}]`;
			}
			 
			const bs = [
				{
					"id":1,
					"name":"setName",
					"clickOnMe": function(d){
						soName = blo0.blGetTa().value;	
					},
					"color": "cyan"
				}, 
				{
					"id":1.1,
					"name":"fpsFrmTa",
					"clickOnMe": function(d){
						soFPS = blo0.blGetTa().value;	 
					},
					"color": "darkGray"
				}, 
				{
					"id":2,
					"name":"2server",
					"clickOnMe": function(d){ 
						var url = "http://localhost:8080/json?fileName=" + soName + ".js"; 

						blo0.blSendTextByPOST(url,soText,function(resTxt){
							d.innerHTML = "<a href ='http://localhost:8080/" + soName+".js' target='_blank'>" + soName+".js</a>";
						}); 
					},
					"color": "Bisque",
					"float": "right"
				},
				{
					"id":3,
					"name":"init",
					"clickOnMe": function(d){
						blo0.blGetTa().value = soText;
					},
					"color": "white",
					"float": "left"
				},
				{
					"id":3.1,
					"name":"F5",
					"clickOnMe": function(d){
						blo0.blGetTa().value = blo0.blMakePlxJS(osubo);
					},
					"color": "pink",
					"float": "left"
				},
				{
					"id":4,
					"name":"frmTa",
					"clickOnMe": function(d){
						op = null;
						soText = blo0.blGetTa().value;
					},
					"color": blo0.c(15),
					"float": "left"
				},
				{
					"id":5,
					"name":"runSo", 
					"clickOnMe": function(d){
						bRunScript = bRunScript?false:true;
						d.innerHTML = bRunScript;
						runStartTime = bRunScript ?  Date.now() : 0;
						if(bRunScript) nTick = 0;
					},
					"color": "green",
					"float": "left"
				},
			];
			for(i in bs){
				const b = blo0.blBtn(tb,tb.id+bs[i].id,bs[i].name,bs[i].color);
				b.style.float = bs[i].float?bs[i].float:"left";
				b.onclick = function(_b,_d,_i){
					return function(){
						bs[_i].clickOnMe(_d);
					}
				}(b,d,i);
			} 
		};

		this.drawEffect = function(cvs){
			osubo.showSubObjects(cvs);
			var ctx = cvs.getContext("2d");
			
			ctx.fillText("soe1: nTick = " + nTick,x1,y1 + 10); 
			
			runNowTime = Date.now();
			if(runNowTime>runStartTime +1000/soFPS) {
				runStartTime = runNowTime;
				nTick++;
			}
			ctx.fillStyle = "green";
			let ss = "soFPS = " + soFPS + " runStartTime:" + runStartTime  + " runNowTime:" + runNowTime;
			ctx.fillText(ss,x2,y2);
 
			_2RunScript(cvs);
		}
		
		const _2RunScript = function(cvs){
			if(!bRunScript) return;
			var ctx = cvs.getContext("2d");
			ctx.fillStyle = "green";
			ctx.fillRect(mx+x1+5,my+y1+5,5,5); 
			
			if(op==null) op = blo0.blWrapPlx(cvs,soText,x1,y1);
			ctx.fillText("_2RunScript: nTick="+nTick + "byPlx="+op.callPlx (nTick,mx,my),mx+x1+10,my+my-40);	 

		}
		this.setOSXY = function(x,y){
			if(op) op.setPlxXY(x,y);
		}
		this.downSOEditor = function(x,y){
			if(!blo0.blPiR(x,y,x1,y1,x2-x1,y2-y1)){
				return;
			} 
			osubo.mDown(x,y);
		} 
	};
	const osoe = new _C4SoEditor();

	this.select = function(b){		s = b;		}
	this.setXY1 = function(x,y){		x1 = x; y1 = y;		}
	this.setXY2 = function(x,y){		x2 = x; y2 = y;		}
	this.draw_me = function(cvs){		
		var ctx = cvs.getContext("2d");
		const d = 10; 
		if(s){
			var oldStyle = ctx.fillStyle;
			ctx.fillStyle = "red";
			ctx.fillRect(x1-d,y1-d,d*2,d*2);

			ctx.fillstyle = oldStyle;
		}
		if(e){
			var oldStyle = ctx.fillStyle;
			ctx.fillStyle = "brown";
			ctx.fillRect(x2-d,y2-d,d*2,d*2); 

			ctx.fillstyle = oldStyle;
		}
		
		var oldStyle = ctx.fillStyle;
		ctx.fillStyle = "turquoise"; 
		ctx.fillRect(x1,y1,x2-x1,y2-y1);
		
		ctx.fillStyle = "red";
		ctx.font = "10px Arial";
		ctx.fillText(soName, x1,y1);
		
		osoe.drawEffect(cvs);

		ctx.fillStyle = oldStyle;

	}
	this.select_me = function(x,y){
		if(blo0.blPiR(x,y,x1,y1,10,10)){
			 s = !s;
		}
	} 
	this.edit_me = function(eui,x,y){
		if(blo0.blPiR(x,y,x2,y2,10,10)){
			 e = true; 
			 eui.v1.innerHTML = "";
			 osoe.ui4Editor(eui.v1);
			 ex1 = x;
			 ey1 = y;
		}
		else{
			e = false;
			osoe.downSOEditor(x,y);
		}
	}
	this.edit_move = function(x,y){
		if(e){			
			ex2 = x;
			ey2 = y;

			x1 += ex2 -ex1;
			y1 += ey2 -ey1;
			x2 += ex2 -ex1;
			y2 += ey2 -ey1;
	
			ex1 = ex2;
			ey1 = ey2;
			osoe.setOSXY(x1,y1);
	
		}
	}
	
	this.move_start = function(dx,dy){
		if(s){ 
			mx1 = x1;
			my1 = y1;
			mx2 = x2;
			my2 = y2;
		}
	}
	this.move_me = function(dx,dy){
		if(s){ 
			x1 = mx1 + dx;
			y1 = my1 + dy;
			x2 = mx2 + dx;
			y2 = my2 + dy;
		}
	}
}



const gc4BLS = function(){

	const _thisBLS = this;
	const blsTimer = blo0.blAudioTimer();
	var lsScene = [];   
	var iCurScene = -1; 
	var x1,y1,x2,y2,s = false,e = false,mx1,my1,mx2,my2,sBlsTitle = "...";
	var msgDbg = "msgBLS"; 
	const blsAOI = blo0.blAOI();
	blsAOI.addX1Y1AOI(-10,-10,10,10);
	blsAOI.addX2Y2AOI(10,10,10,10);
	blsAOI.addX2Y2AOI(22,22,10,10);
	
	
	var lsSuperObjects = function(){
		
		var w ={};
		w._2do= function(txt){ pt = txt;};
		blo0.blAjx(w,"http://localhost:8080/firework.js");
		
		var ls = [];
		const o = {
			"type": "javascript",
			"frameRange": "(1,500)",
			"attribute": {
				"script": "http://localhost:8080/firework.js",
				"function": "animateFrame",
				"start": 1
			},
			"layer": 1
		};
		ls.push(o);
		return ls;
	}();	 
	const lsso = blo0.blSoScripts();
	this.paintSuperObjects = function(cvs,n){
		const l = _thisBLS.getSOs();
		var ctx = cvs.getContext("2d");	
		ctx.fillStyle = "blue";
		ctx.font = "10px Arial";
		var s = `so: nFrame=${n} os = ${l.length}`;
		ctx.fillText(s, x2-20,y2 - 20);
		lsso.soDraw(cvs,n,x1,y1,x2,y2); 
	}
	this.getScenes = function(){return lsScene;}
	this._getAllFramesNumber = function(){
		var n = 0;
		const l = lsScene;
		for(i in l){
			n += l[i].time;
		}
		return n;
	}
	this.getSOs = function(){return lsSuperObjects;}
	this.select = function(b){		s = b;		}
	this.setXY1 = function(x,y){		x1 = x; y1 = y;		}
	this.setXY2 = function(x,y){ 
		x2 = x; y2 = y;	
		if(x1>x2)	x2 = x1 + 100;
		if(y1>y2)	y2 = y1 + 100;
		x2 = (x2-x1)%2?x2+1:x2; 
		y2 = (y2-y1)%2?y2+1:y2; 
	}
	this.draw_me = function(cvs){	
		var ctx = cvs.getContext("2d");	
		const d = 10; 
		if(s){
			var oldStyle = ctx.fillStyle;
			ctx.fillStyle = "red";
			ctx.fillRect(x1-d,y1-d,d*2,d*2);
			ctx.fillstyle = oldStyle;
		} 
		var oldStyle = ctx.fillStyle;
		
		if(!blsTimer.isPlaying()){
			blsTimer.paintCurFrame(ctx,this.getScenes(),iCurScene,x1,y1,x2,y2);
			_objCmd.drawObjCmdUI(ctx,x1+5,y1-15); 
		}

		if(iCurScene>-1){
			ctx.fillStyle = "rgb(200,111,1)";//"blue";
			ctx.font = "30px Arial";
			var ss = sBlsTitle + " : curSceneNo=" + iCurScene + " time=" + lsScene[iCurScene].time;
			ctx.fillText(ss, x1,y1 + 50);
		}

		blsTimer.drawOnLoop(cvs,this,x1,y1,x2,y2);

		const showDebugMsg4BLS = function(){
			ctx.fillStyle = "purple";
			ctx.font = "10px Arial";
			var s = _makeDbgMsgInFrame();
			ctx.fillText(s, x1,y1+30);
			
			ctx.fillStyle = "rgb(200,111,1)";
			ctx.font = "20px Arial";
			if(blsTimer.getServerStatus() == true){
				ctx.fillText("server_status: OK! ", x1,y1+70);
			}else{
				ctx.fillText("server_status: Not connected! ", x1,y1+70);
			}
			
		}();
		ctx.fillStyle = oldStyle;
		blsAOI.setTargetXY(x1,y1,x2,y2);
		blsAOI.drawAOI(ctx,"green");
	}
	this.select_me = function(x,y){
		if(blo0.blPiR(x,y,x1,y1,10,10)){
			 s = !s;
		}
	} 
	this.edit_me = function(eui,x,y){
		if(blsAOI.inAOI(x,y)){
			 blsAOI.setSelected(true);
			 e = true; 
			 eui.v1.innerHTML = "";
			 const tb = blo0.blDiv(eui.v1,eui.v1.id+"tb","tb","gray");
			 var b1 = blo0.blBtn(tb,tb.id+"b1","setTitleFromTA","lightblue");
			 b1.style.float = "left";
			 b1.onclick = function(){
				sBlsTitle = blo0.blGetTa().value;	
			 } 
			 var b2 = blo0.blBtn(tb,tb.id+"b2","bls2TA","lightgreen");
			 b2.style.float = "left";
			 b2.onclick = function(){
				blo0.blGetTa().value = JSON.stringify(_makeBLS());	
			 } 

			 const split4tb1 = blo0.blDiv(eui.v1,eui.v1.id+"split4tb1","split4tb1","gray");
			 const makeToolbar1 = function(t,_thisBLS){
				
				const bs1 = [
					{
						"name":"ver",
						"fn4ui": function(v){
							const tb = blo0.blDiv(v,v.id+"tb",this.name,this.color);
						},
						"color": "CadetBlue"
					},
					{
						"name":"music",
						"fn4ui": function(v){ 
							const ms = function(){
								var ls = [];
								for(var i = 0; i < 10; i++){
									var o = {};
									o.id = i;
									o.name = "nce2-"+(i+1);
									o.src = "https://littleflute.github.io/english/NewConceptEnglish/Book2/"+(i+1)+".mp3";
									ls.push(o);
								}
								var o = {};
								o.id = 10;
								o.name = "1.mp3";
								o.src = "http://localhost:8080/1.mp3";
								ls.push(o);
								var o = {};
								o.id = 11;
								o.name = "bzll.mp3";
								o.src = "http://localhost:8080/bzll.mp3";
								ls.push(o);
								var o = {};
								o.id = 12;
								o.name = "j72_4_4";
								o.src = "https://littleflute.github.io/gt1/mp3/j72_4_4.mp3";
								ls.push(o);
								var o = {};
								o.id = 13;
								o.name = "colorDream";
								o.src = "https://github.com/littleflute/Songs/releases/download/%E5%BD%A9%E8%89%B2%E7%9A%84%E6%A2%A6/littleflute.flac.mp3";
								ls.push(o);
								return ls;
							}(); 
							
							const tb = blo0.blDiv(v,v.id+"tb","tb","Violet"); 
							const vSrc = blo0.blDiv(tb,tb.id+"vSrc",t.getVP().src,"lightgreen");
							const setSrc = blo0.blBtn(tb,tb.id+"setSrc","setFromTA","green");
							setSrc.onclick = function(){
								vSrc.innerHTML = blo0.blGetTa().value;
								t.getVP().src = 	blo0.blGetTa().value;
							}
							for(i in ms){
								const b = blo0.blBtn(tb,tb.id+ms[i].id,ms[i].name,"Fuchsia");
								b.onclick = function(_i){
									return function(){
										vSrc.innerHTML = t.getVP().src = ms[_i].src;										
									}
								}(i);
							}

							if(blo0.ls51voaMp3){
								const tb51voaMp3 = blo0.blDiv(tb,tb.id+"tb51voaMp3","tb51voaMp3","lightblue"); 
								for(i in blo0.ls51voaMp3){
									const btn = blo0.blBtn(tb51voaMp3,tb51voaMp3.id+i,i,"gray");
									btn.onclick = function(_b,_l,_i){
										return function(){
											vSrc.innerHTML = t.getVP().src = _l[_i];	
										}
									}(btn,blo0.ls51voaMp3,i);
								}
							}
						},
						"color": "Orchid"
					},
					{
						"name":"rate",
						"fn4ui": function(v){ 
							const fs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,25,30,60,72,76,80,104];
							const tb = blo0.blDiv(v,v.id+"tb","tb","Violet"); 
							for(i in fs){
								const b = blo0.blBtn(tb,tb.id+i,fs[i],"Fuchsia");
								b.onclick = function(_i){
									return function(){
										t.setFPS(fs[_i]) ;
									}
								}(i);
							}
						},
						"color": "Orchid"
					},
					{
						"name":"time",
						"fn4ui": function(v){							
							const tb = blo0.blDiv(v,v.id+"tb_time","video time for w/o frame","Violet"); 
							const ta = blo0.blTextarea(tb,tb.id+"Tafortime",t.getVideoTime(),blGrey[1]);
							ta.style.width="15%";
							ta.style.height="22px";
							ta.addEventListener("input", function(e) {
								var tav = this.value;
								t.setVideoTime(tav) ;
							})
						},
						"color": "Orchid"
					},
					{
						"name":"so",
						"fn4ui": function(v){ 
							const tb = blo0.blDiv(v,v.id+"tb","tb",this.color);
							const allSO = blo0.blDiv(v,v.id+"allSO","so:","gray");
							const vos = blo0.blDiv(v,v.id+"vos","vos","BurlyWood");
							const vEndOfOS = blo0.blDiv(v,v.id+"vEndOfOS","vEndOfOS","white");
							tb.refreshSOs = function(l){  
								allSO.innerHTML = "so:";
								for(i in l){
									const b = blo0.blBtn(allSO,allSO.id+i,i,"Lavender"); 
									newSO.style.float = "right";
 
									b.onclick = function(_b,_i,_v){
										return function(){
											_v.innerHTML = JSON.stringify(l[_i]);
											const soSet = function(){
												const ss = [
													{
														"id":1,
														"name": "scriptFromTa",
														"fnSet": function(l,i){
															l[i].attribute.script = blo0.blGetTa().value;
														},
														"color": "Indigo",
														"float": "left"
													},
													{
														"id":2,
														"name": "funFromTa",
														"fnSet": function(l,i){
															l[i].attribute.function = blo0.blGetTa().value;
														},
														"color": "Crimson",
														"float": "left"
													},
													{
														"id":3,
														"name": "AllFromTa",
														"fnSet": function(l,i){
															l[i]  = JSON.parse(blo0.blGetTa().value);
														},
														"color": "Khaki",
														"float": "right"
													},
													{
														"id":4,
														"name": "All2Ta",
														"fnSet": function(l,i){
															blo0.blGetTa().value = JSON.stringify(l[i]);
														},
														"color": "Teal",
														"float": "right"
													},
													{
														"id":5,
														"name": "Text1",
														"fnSet": function(l,i){ 
															l[i]  = {
																"type": "text",
																"attribute": {
																	"x1": 50,
																	"y1": 500,
																	"x2": -1,
																	"y2": -1,
																	"size": 22,
																	"color": "200,182,193",
																	"name": "Text test 0.11"
																},
																"frameRange": "(2,100)",
																"action": {
																	"trace": "y=0*x*x+0*x+55",
																	"step": 10
																}
															};
														},
														"color": "Teal",
														"float": "right"
													},
													{
														"id":6,
														"name": "updateIdx",
														"fnSet": function(l,i){
															lsso.updateIdx(l,i);
														},
														"color": "Teal",
														"float": "right"
													},
													{
														"id":7,
														"name": "redLight",
														"fnSet": function(l,i){ 
															l[i]  = {
																"type": "circle",
																"attribute": {
																	"x1": 50,
																	"y1": 400,
																	"x2": 40,
																	"y2": 40,
																	"size": 5,
																	"color": "200,0,0",
																	"name": "红灯"
																},
																"frameRange": "(1,100)",
																"frameSubset": "(2,1)",
																"action": {
																	"trace": "function trace(x) { return 400; }",
																	"step": 0
																}
															};
														},
														"color": "red",
														"float": "right"
													},
												];
												for(i in ss){
													const btn = blo0.blBtn(_v,_v.id+ss[i].id,ss[i].name,ss[i].color);
													btn.style.float = ss[i].float;
													btn.onclick = function(_b,_i,_l,_n,btnParent){
														return function(){
															ss[_i].fnSet(_l,_n);
															btnParent.click();
														}
													}(btn,i,l,_i,_b);
												}
											}();											 
										}
									}(b,i,vos);
								}
							}							
							const l = _thisBLS.getSOs();
							const newSO = blo0.blBtn(tb,tb.id+"newSO","newSO","Salmon"); 
							newSO.style.float = "right";
							newSO.onclick = function(){
								var o = {};
								o.type = "javascript";
								o.frameRange = "(1,1000)";
								var a = {};
								a.script = "http://localhost:8080/so01.js";
								a.function = "animateFrame";
								a.start = 1;
								o.attribute = a;
								o.layer = 1;
								l.push(o); 
								tb.refreshSOs(l); 
							}
							
							const delSO = blo0.blBtn(tb,tb.id+"delSO","delSO","brown"); 
							delSO.style.float = "right";
							delSO.onclick = function(){
								l.splice(l.length-1,1); // changed by jeremyjia
								tb.refreshSOs(l);  
							}
							const soPlugIns = function(){
								let pis = [
									"https://jeremyjia.github.io/Games/pbzTools/scriptengine/plugin/myplx.js",
									"https://jeremyjia.github.io/Games/pbzTools/scriptengine/plugin/plxRain.js",
									"https://jeremyjia.github.io/Games/pbzTools/scriptengine/plugin/plxWaterDrop.js",
									"https://jeremyjia.github.io/Games/pbzTools/scriptengine/plugin/plxRunning.js"
								];
								for (i in pis){
									let b = blo0.blBtn(tb,tb.id+"pi" + i, i,"darkgray"); 
									b.onclick = function(_p,_i){
										return function(){
											var o = {};
											o.type = "javascript";
											o.frameRange = "(1,1000)";
											var a = {};
											a.script = _p[_i];
											a.function = "animateFrame";
											a.start = 1;
											o.attribute = a;
											o.layer = 1;
											l.push(o); 
											tb.refreshSOs(l); 
										}
									}(pis,i);
								}
							}();

							tb.refreshSOs(l);
						},
						"color": "Turquoise"
					},
					{
						"name":"height", 
						"float": "right",
						"fnInit": function(){
							return "h:" + (y2-y1);
						},
						"fn4ui": function(_v,_b){
							const hs = [2,-2,10,-10,100,-100,200,-200,500,-500];
							for(i in hs){
								var s = hs[i]>0?"+"+hs[i]:hs[i];
								var b = blo0.blBtn(_v,_v.id+i,s,"Indigo");
								b.onclick = function(_i){
									return function(){
										y2 += hs[_i];
										_b.innerHTML = "h:" + (y2-y1);
									}
								}(i);
							}
						},
						"color": "lightgreen"
					},
					{
						"name":"witdh", 
						"float": "right",
						"fnInit": function(){
							return "w:" + (x2-x1);
						},
						"fn4ui": function(_v,_b){ 
							const ws = [2,-2,10,-10,100,-100,200,-200,500,-500];
							for(i in ws){
								var s = ws[i]>0?"+"+ws[i]:ws[i];
								var b = blo0.blBtn(_v,_v.id+i,s,"purple");
								b.onclick = function(_i){
									return function(){
										x2 += ws[_i];
										_b.innerHTML = "w:" + (x2-x1);
									}
								}(i);
							}
						},
						"color": "lightgreen"
					},
				 ]
				const tb1 = blo0.blDiv(eui.v1,eui.v1.id+"tb1","tb1","plum");
				const v4tb1 = blo0.blDiv(eui.v1,eui.v1.id+"v4tb1","v4tb1","Thistle");
				
				for(i in bs1){
				   var s = bs1[i].fnInit?bs1[i].fnInit():bs1[i].name;
				   const btn = blo0.blBtn(tb1,tb1.id+bs1[i].name,s,bs1[i].color);
				   btn.style.float = bs1[i].float?bs1[i].float:"left";
				   btn.onclick = function(_b,_v,_i){
					   return function(){
						   _v.innerHTML = "";
						   const split4btns = blo0.blDiv(_v,_v.id+"split4btns","split4btns","gray");
						   bs1[_i].fn4ui(_v,_b);
					   }
				   }(btn,v4tb1,i);
				}

			 }(blsTimer,this);

			 
			 const split4tb2 = blo0.blDiv(eui.v1,eui.v1.id+"split4tb2","split4tb2","gray");
			 const makeToolbar2 = function(t,_myBls){
				const bs2 = [
					{
						"name":"+1x1",
						"title":"add 1 scene to bls.",
						"color":"green",
						"fn4ui": function(_v,_b){  
							var sc = {};
							sc.time = 1;
							sc.backgroundColor = "11,22,33"; 
							sc.objects = [];
							lsScene.push(sc); 
							tabFrames.refreshFrames(); 
						},
					},
					{
						"name":"+1x5",
						"title":"add 1 scene to bls, time=5",
						"color":"green",
						"fn4ui": function(_v,_b){  
							var sc = {};
							sc.time = 5;
							sc.backgroundColor = "121,22,33"; 
							sc.objects = [];
							lsScene.push(sc); 
							tabFrames.refreshFrames(); 
						},
					},
					{
						"name":"+MxN",
						"title":"add M scenes to bls, time=N",
						"color":"green",
						"fn4ui": function(_v,_b){  
							let a = blo0.blGetTa().value;
							if(a[0]=="f"&&a[1]=="s"&&a[2]==":"){
								let b = a.split(":");
								let mnc = b[1].split(";");
								let c = mnc[0];
								let d = c.split("x");
								let m = d[0];
								let n = d[1];
								let bkRGB = mnc[1];
								for(var i = 0; i < m ; i ++){
									var f = {};
									f.time = parseInt(n);
									f.backgroundColor = bkRGB; 
									f.objects = [];
									f.objects.push(_newObject("musicNote","1/2/",111+i*10,55+i*10,155,111,25,"0,200,0"));
									f.objects.push(_newObject("line","1/2/",111+i*10,55+i*10,155,111,25,"220,11,0"));
									
									lsScene.push(f); 
								}
								tabFrames.refreshFrames(); 
							}
							else{
								blo0.blGetTa().value = "fs:5x1;214,11,22";
							}	
						},
					},
					{
						"name":"sameClr",
						"color":"white",
						"title":"set all scenes to the same background color.(sc:13,121,22)",
						"fn4ui": function(_v,_b){ 
							let a = blo0.blGetTa().value;
							if(a[0]=="s"&&a[1]=="c"&&a[2]==":"){
								let b = a.split(":"); 
								let sameColor = b[1]; 
								let l = lsScene; 
								for(i in l){
									l[i].backgroundColor = sameColor;
								} 
							}
							else{
								blo0.blGetTa().value = "sc:13,121,22";
							}	
						},
					},
					{
						"name":"to do...",
						"color":"gray",
						"fn4ui": function(_v,_b){ 
							_v.innerHTML = Date(); 
						},
					},
				];
				const tb2 = blo0.blDiv(eui.v1,eui.v1.id+"tb2","tb2","plum");
				const v4tb2 = blo0.blDiv(eui.v1,eui.v1.id+"v4tb2","v4tb2","Thistle");
				for(i in bs2){
					var s = bs2[i].fnInit?bs2[i].fnInit():bs2[i].name;
					const btn = blo0.blBtn(tb2,tb2.id+bs2[i].name,s,bs2[i].color); 
					btn.style.float = bs2[i].float?bs2[i].float:"left";
					btn.setAttribute('title',bs2[i].title?bs2[i].title:"no title yet.");
					btn.onclick = function(_b,_v,_i){
						return function(){
							_v.innerHTML = "";
							const split4btns = blo0.blDiv(_v,_v.id+"split4btns","split4btns","red");
							if(bs2[_i].fn4ui) bs2[_i].fn4ui(_v,_b);
							else{_v.innerHTML = "no fn4ui()"}
						}
					}(btn,v4tb2,i);

				}


			 }(blsTimer,this);

			 const tbScenes = blo0.blDiv(eui.v1,eui.v1.id+"tbScenes","blsScenes:","green");
			 tbScenes.style.color = "white";
			 const dAllFrames = blo0.blDiv(eui.v1,"id_4_all_frames","allFrames","lightgray");
			 const tabFrames = blo0.blDiv(eui.v1,eui.v1.id+"tabFrames","tabFrames:","lightgray");
			 tabFrames.refreshFrames = function(){
				tabFrames.innerHTML = "";
				var lsBtn4Scenes = [];
				for(i in lsScene){ 
				   var b = blo0.blBtn(tabFrames,tabFrames.id+i,i,"purple");
				   b.style.float = "left";
				   b.onclick = function(_b,_i,_scs){
					   return function(){ 
							iCurScene = _i; 
						   _ui4CurScene(_b,v4curF,_scs,_i,_thisBLS);
						   blo0.blMarkBtnInList(_b,lsBtn4Scenes,"yellow","grey");
					   }
				   }(b,i,lsScene);
				   lsBtn4Scenes.push(b);
				}
				dAllFrames.innerHTML = _thisBLS._getAllFramesNumber();
			 }
			 
			 
			 const blsPlay = blo0.blBtn(tbScenes,tbScenes.id+"btnBlsPlay",blsTimer.isPlaying()?"blsStop":"blsPlay","green");
			 blsPlay.style.float = "right";
			 blsPlay.style.color = "white";
			 blsPlay.onclick = function(){
				const b = blsTimer;
				this.t = b; 
				if(b.isPlaying()){
					b.stop();
					this.innerHTML = "blsPlay";
				}
				else{
					b.start();
					this.innerHTML = "blsStop";
				} 
			 }


			 tabFrames.refreshFrames(); 
			 
			 const split2 = blo0.blDiv(eui.v1,eui.v1.id+"split2","split2","green");
			 const v4curF = blo0.blDiv(eui.v1,eui.v1.id+"v4curF","v4curF","gray");

			 const fnMakeServerTb = function(){
				const split3= blo0.blDiv(eui.v1,eui.v1.id+"split3","split3","lightblue");
			 	const tbServer = blo0.blDiv(eui.v1,eui.v1.id+"tbServer","tbServer:","gray");
				const vServer = blo0.blDiv(eui.v1,eui.v1.id+"vServer","vServer:","lightblue");
				const bs = [
					{
						"id":1,
						"name":"bls2svr",
						"fn2server": function(b,v,_bs,_i){
							var pl = _makeBLS(); 
							var url = "http://localhost:8080/json?fileName=" + sBlsTitle + ".json"; 

							blo0.blPOST(url,pl,function(txt){
								v.innerHTML = "<a href ='http://localhost:8080/"+sBlsTitle+".json' target='_blank'>"+sBlsTitle+".json</a>";
							}); 
						},
						"color": "gray",
						"float": "left",
					},
					{
						"id":2,
						"name":"mkMP4",
						"fn2server": function(b,v,_bs,_i){
							var url = "http://localhost:8080/image/json2video?script=" + sBlsTitle + ".json&video=" + sBlsTitle + ".mp4"; 
							b._2do = function(txt){
								v.innerHTML = txt;
								const refactorPage = function(){
									var tl = [1.0,2.0,3.0,4.0,5.0,6.0];
									
									function createBtn(dtl,ddbg,id,video) {  
										var btn = document.createElement("button");
										btn.id = id;
										btn.innerHTML = id;  
										btn.onclick = function(){ 
											ddbg.innerHTML = this.id; 
											video.currentTime = this.id;
										} 
										dtl.appendChild(btn);
										return btn;
									}
									
									bl$("btnPlay").onclick = function play() {
										var video = document.getElementById("id_4_video");
										video.play();
									} 
									bl$("btn2createToolbar").onclick = function createToolbar() { 
										var video = document.getElementById("id_4_video");
										var dtl = document.getElementById("id4toolbar");
										var ddbg = document.getElementById("id4Debug");
										if(!dtl.done){
										dtl.done = true;
										for(i in tl){
											createBtn(dtl,ddbg,tl[i],video);     
										}     
										}
									} 
								}();
							};
							blo0.blAjx(b,url);
						},
						"color": "gray",
						"float": "left",
					},
					{
						"id":3,
						"name":"dl-21voa-index",
						"fn2server": function(b,v,_bs,_i){
							v.innerHTML = this.name + ` ${_i}`; 
							const svrAPI = "http://localhost:8080/download";  
							var i = blo0.blDownloadTask(svrAPI ,
								"https://www.21voa.com/","51voaIndex.html",v,
								function afterDL51voaIndex(){
									var n = parseInt(_i) + 1;
									_bs[n].fn2server(b,v,_bs,n);
								}
							);  
							i.bl2Do();
						},
						"color": "gray",
						"float": "right",
					},
					{
						"id":4,
						"name":"parse-51voa-index",
						"fn2server": function(b,v,_bs,_i){
							v.ps = [];
							v.innerHTML = this.name + ` ${_i}`; 
							let file = "http://localhost:8080/51voaIndex.html"

							fetch (file)
							.then(x => x.text())
							.then(y => { 
								const blco1 = blo0;
								const lv1 = blco1.blDiv(v,v.id+"lv1","lv1","blue");
								const vDate = blco1.blDiv(v,v.id+"vDate","date","lightgreen");
								const vNew = blco1.blDiv(v,"id4vParse","new","lightblue");
								var a = y.split('更新时间：');
								var b = a[1].split('）');
								var c = b[0].split('-');
								var d = "(" + c[0]+"/"+c[1]+"/"+c[2];
	
								var e = a[1].split(d); 
								const urlVOA = "https://www.21voa.com";
								var s = "";
								for(var i=0; i<e.length-1;i++){
									var f = e[i].split('" target="_blank">');
									var g = f[f.length-2].split('<a href="');
									var h = g[g.length-1];
									var s = `<a href="${urlVOA}${h}" target="_blank">${f[f.length-1]}</a>`;
									const page = blco1.blDiv(vNew,vNew.id+i,s,blo0.c(i));
									v.ps.push({"href":`${urlVOA}${h}`,"txt":f[f.length-1]})	 
								}
	
								vDate.innerHTML = b[0]; 

								var n = parseInt(_i) + 1;
								_bs[n].fn2server(b,v,_bs,n);
							});
							 
						},
						"color": "gray",
						"float": "right",
					},
					{
						"id":5,
						"name":"p1dl",
						"fn2server": function(b,v,_bs,_i){
							v.innerHTML = this.name + ` ${_i} ${v.ps[0].href}`; 
							const svrAPI = "http://localhost:8080/download";  
							const pageName = "p1In51voa.html";
							var i = blo0.blDownloadTask(svrAPI ,
								v.ps[0].href,pageName,v,
								function afterDLP1In51voa(){
									v.nextStep = pageName;
									var n = parseInt(_i) + 1;
									_bs[n].fn2server(b,v,_bs,n);
								}
							);  
							i.bl2Do();
						},
						"color": "gray",
						"float": "right",
					},
					{
						"id":6,
						"name":"p1Parse",
						"fn2server": function(b,v,_bs,_i){
							v.innerHTML = this.name + ` ${_i}  <a href="http://localhost:8080/${v.nextStep}" target="_blank">${v.nextStep}</a>`;  
							let file = `http://localhost:8080/${v.nextStep}`;

							fetch (file)
							.then(x => x.text())
							.then(y => { 
								var a = y.split('<a id="mp3" href="');
								var b = a[1].split('"></a>');
								var mp3url = b[0]; 
								if(!blo0.ls51voaMp3) blo0.ls51voaMp3 = [];
								blo0.ls51voaMp3[0] = mp3url;

								
								var a = y.split('<a id="lrc" href="');
								var b = a[1].split('"></a>');
								var lrcUrl = `https://www.21voa.com/${b[0]}`; 
								if(!blo0.ls51voaLrc) blo0.ls51voaLrc = [];
								blo0.ls51voaLrc[0] = lrcUrl;

								v.infBls = {"mp3":mp3url,"lrc":lrcUrl};
								var n = parseInt(_i) + 1;
								_bs[n].fn2server(b,v,_bs,n);
							});
						},
						"color": "gray",
						"float": "right",
					},
					{
						"id":7,
						"name":"p1bls",
						"fn2server": function(b,v,_bs,_i){
							v.innerHTML = this.name + ` ${_i} ${JSON.stringify(v.infBls)} `;
							const blsP1 = "p1voa.json";
							var pl = {
								"request": {
									"version": "0.0.16",
									"description": `VOA慢速英语听力 ${blo0.blDate()}`,
									"width": 1920,
									"height": 1080,
									"music": "${VAR_MUSIC}",
									"rate": "2",
									"frames": [
										{
											"number": "1",
											"time": "${VAR_FRAMES}",
											"objects": [
												{
													"text": "${VAR_TITLE}",
													"x": 80,
													"y": 320,
													"size": 60,
													"color": "160,32,240",
													"layer": 2
												}
											],
											"backgroundColor": "100,149,237"
										}
									],
									"superObjects": [
										{
											"type": "subtitle",
											"frameRange": "(1,${VAR_FRAMES})",
											"attribute": {
												"script": "${VAR_LRC_PATH}",
												"x1": 20,
												"y1": 670,
												"size": 44,
												"color": "255,255,0",
												"replace":[
													 {
													   "regex":"American",
													   "target":"美国"
													 },
													 {
													   "regex":"更多听力请访问21VOA.COM",
													   "target":"漂泊者乐园团队制作"
													 }
												]
											},
											"layer": 1
										},
										{
											"type": "picture",
											"attribute": {
												"x1": 220,
												"y1": 200,
												"x2": 510,
												"y2": 380,
												"size": -1,
												"color": "255,0,0",
												"name": "${VAR_IMG_PATH}"
											},
											"frameRange": "(1,${VAR_TIME})",
											"action": {
												"trace": "y=0*x*x+0*x+200",
												"step": 0
											}
										} 
									],
									"Macros": [
										{
											"name": "VAR_TITLE",
											"value": `VOA慢速英语听力 ${blo0.blDate()}`
										},
										{
											"name": "VAR_MUSIC",
											"value": v.infBls.mp3
										},
										{
											"name": "VAR_LRC_PATH",
											"value": v.infBls.lrc
										},
										{
											"name": "VAR_IMG_PATH",
											"value": "https://img.21voa.cn/1/022a0000-0aff-0242-008a-08dae3bd0580_cx0_cy1_cw0_w268_r1.jpg"
										}
									]
								}
							}; 
							var url = "http://localhost:8080/json?fileName=" + blsP1 ; 

							blo0.blPOST(url,pl,function(txt){
								v.innerHTML = "<a href ='http://localhost:8080/"+blsP1+"' target='_blank'>"+blsP1+"</a>";
								
								v.infMp4 = {"json":blsP1,"date":Date()};
								var n = parseInt(_i) + 1;
								_bs[n].fn2server(b,v,_bs,n);
							}); 
						},
						"color": "gray",
						"float": "right",
					},
					{
						"id":8,
						"name":"p1Mp4",
						"fn2server": function(b,v,_bs,_i){
							v.innerHTML = this.name + ` ${_i} ${JSON.stringify(v.infMp4)} `;  
							var url = "http://localhost:8080/image/json2video?script=" + v.infMp4.json + "&video=p1v51voa.mp4"; 
							b._2do = function(txt){
								v.innerHTML = txt;
								const refactorPage = function(){
									var tl = [1.0,2.0,3.0,4.0,5.0,6.0];
									
									function createBtn(dtl,ddbg,id,video) {  
										var btn = document.createElement("button");
										btn.id = id;
										btn.innerHTML = id;  
										btn.onclick = function(){ 
											ddbg.innerHTML = this.id; 
											video.currentTime = this.id;
										} 
										dtl.appendChild(btn);
										return btn;
									}
									
									bl$("btnPlay").onclick = function play() {
										var video = document.getElementById("id_4_video");
										video.play();
									} 
									bl$("btn2createToolbar").onclick = function createToolbar() { 
										var video = document.getElementById("id_4_video");
										var dtl = document.getElementById("id4toolbar");
										var ddbg = document.getElementById("id4Debug");
										if(!dtl.done){
										dtl.done = true;
										for(i in tl){
											createBtn(dtl,ddbg,tl[i],video);     
										}     
										}
									} 
								}();
							};
							blo0.blAjx(b,url);
						},
						"color": "gray",
						"float": "right",
					},
				];
				for(i in bs){
					var btn = blo0.blBtn(tbServer,tbServer.id+bs[i].id,bs[i].name,bs[i].color);
					btn.style.float = bs[i].float;
					btn.onclick = function(_btn,_v,_bs,_i){
						return function(){
							bs[_i].fn2server(_btn,_v,_bs,_i);
						}
					}(btn,vServer,bs,i);
				}  
				var btn51voaNews = blo0.blBtn(tbServer, "btn51voaNews","51voaNews","blue");
				btn51voaNews.onclick = function(){
					var a = blo0.txt.split("VOA美国之音听力最近更新");
  					alert(a.length);
				}
			 }();
			 
		   ex1 = x;
		   ey1 = y;
		}
		else{
			blsAOI.setSelected(false);
			e = false;			
			_curFrameDown(x,y,x1,y1);
		}
	}
	this.edit_move = function(x,y){
		if(e){
			
			ex2 = x;
			ey2 = y;

			x1 += ex2 -ex1;
			y1 += ey2 -ey1;
			x2 += ex2 -ex1;
			y2 += ey2 -ey1;
	
			ex1 = ex2;
			ey1 = ey2;
	
			msgDbg = "msgDbg1 xy:" + x + "," + y;
		}
		else{
			msgDbg = "msgDbg2 xy:" + x + "," + y;
			_curFrameMove(x,y,x1,y1);
		}

	}
	
	this.edit_up = function(x,y){
		_curFrameUp(x,y,x1,y1);
	}
	this.move_start = function(dx,dy){
		if(s){ 
			mx1 = x1;
			my1 = y1;
			mx2 = x2;
			my2 = y2;
		}
	}
	this.move_me = function(dx,dy){
		if(s){ 
			x1 = mx1 + dx;
			y1 = my1 + dy;
			x2 = mx2 + dx;
			y2 = my2 + dy; 
		}
	}

	const _newObject = function(_oType,sText,x1,y1,x2,y2,size,color){ 
		const osDefine = [
			{
				"id": "id_4_line",
				"type": "line",
				"makeData": function(r,x1,y1,x2,y2,size,color){
					var mdLine = "mdLine";
					var bMoveLine = false;
					var mxLine1 = -1, myLine1 = -1,mxLine2 = -1, myLine2 = -1;
					var mmx = -1;

					r.graphic 			= "line"; 
					var a = {};
					a.left 		= x1;
					a.top 		= y1;
					a.right 	= x2;
					a.bottom 	= y2;
					a.size 		= size;
					a.color 	= color;
					r.attribute 		= a;

					const setPointInLine = function(x,y,x1,y1){
						if(blo0.blPiR(x,y,a.left+x1,a.top+y1,20,20)){
							bMoveLine = true;
							mxLine1 = x;
							myLine1 = y;
						}
						else{
							bMoveLine = false;
						}
					}
					const toMoveLine = function(x,y,x1,y1){
						if(bMoveLine){
							mxLine2 = x;
							myLine2 = y;
							a.left += mxLine2 - mxLine1;
							a.right += mxLine2 - mxLine1;
							a.top += myLine2 - myLine1;
							a.bottom += myLine2 - myLine1;
							mxLine1 = mxLine2;
							myLine1 = myLine2;
						}
					}
					r.getMDMsg = function(){ return mdLine;} 
					r.downOnMe = function(x,y,x1,y1){  
						mdLine = "mdLine: " + x + "," + y;
						setPointInLine(x,y,x1,y1);
					}
					r.upOnMe = function(x,y,x1,y1){
						toMoveLine(x,y,x1,y1);
						bMoveLine = false;
					} 
					r.drawMyself = function(ctx,x,y){
						var x1 = a.left + x;

						var y1 = a.top + y;
						var x2 = a.right + x;
						var y2 = a.bottom + y;
						ctx.beginPath(); 				 
						ctx.moveTo(x1,y1);
						ctx.lineTo(x2,y2);		 
						ctx.strokeStyle = "rgb(" + a.color+")";
						ctx.stroke();	

						if(bMoveLine){
							ctx.fillStyle = "yellow";
							ctx.fillRect(x1,y1,20,20);
						}	 
					}
				},
				"drawObject": function(r,ctx,x,y){												
					r.drawMyself(ctx,x,y);				
				},
				
			},
			{
				"id": "id_4_text",
				"type": "text",
				"makeData": function(r,x1,y1,x2,y2,size,color){
					var bMoveText = false;
					var mxLine1 = -1, myLine1 = -1,mxLine2 = -1, myLine2 = -1;

					r.text = blo0.blGetTa().value;
					r.x = x1;
					r.y = y1;
					r.size = size;
					r.color = color;
					r.drawMyself = function(ctx,x,y){
						ctx.fillStyle = "red";
						ctx.font = "10px Arial";					
						ctx.fillText(r.text,r.x+x,r.y+y);	 
						if(bMoveText){
							ctx.fillStyle = "red";
							ctx.fillRect(r.x+x,r.y+y,20,20);
						} 
					}
					r.downOnMe = function(x,y,x1,y1){   
						setPointInText(x,y,x1,y1);
					}
					r.upOnMe = function(x,y,x1,y1){
						toMoveText(x,y,x1,y1);
						bMoveText = false;
					} 

					const setPointInText = function(x,y,x1,y1){
						if(blo0.blPiR(x,y,r.x+x1,r.y+y1,20,20)){
							bMoveText = true; 
							mxLine1 = x;
							myLine1 = y;
						}
						else{
							bMoveText = false;
						}
					}
					const toMoveText = function(x,y,x1,y1){
						if(bMoveText){
							mxLine2 = x;
							myLine2 = y;

							r.x += mxLine2 - mxLine1;
							r.y += myLine2 - myLine1; 

							mxLine1 = mxLine2;
							myLine1 = myLine2;
						}
					}
				},
				"drawObject": function(r,ctx,x,y){			
					r.drawMyself(ctx,x,y);	
				},
			}, 
			{
				"id": "id_4_musicNote",
				"type": "musicNote",
				"makeData": function(r,x1,y1,x2,y2,size,color){ 

					var v = sText.split(',');//blo0.blGetTa().value.split(','); 

					r.graphic 			= "musicNote"; 
					var a = {};
					a.left 		= x1;
					a.top 		= y1;
					a.right 	= x2;
					a.bottom 	= y2;
					a.size 		= size;
					a.color 	= color;
					a.note = v[0];
					a.time = parseFloat(v[1]);
					a.tone = parseInt(v[2]);

					r.attribute 		= a;

					r.drawMyself = function(ctx,x,y){
						ctx.fillStyle = "green";
						ctx.font = "10px Arial";					
						
						var pattern1 = /[0-7][du]*\/[0-7][du]*\/\/[0-7][du]*\/\//g;  //   1/2//3//
						var matches1 = r.attribute.note.match(pattern1); 
						var pattern2 = /[0-7][du]*\/[0-7][du]*\//g;  //   1/2/
						var matches2 = r.attribute.note.match(pattern2);
						var pattern3 = /[0-7][du]*\/\/[0-7][du]*\/\/[0-7][du]*\/\/[0-7][du]*\/\//g;  //   1//2//3//4//
						var matches3 = r.attribute.note.match(pattern3);
						var pattern4 = /[0-7][du]*\/\/[0-7][du]*\/\/[0-7][du]*\//g;  //   1//2//3/
						var matches4 = r.attribute.note.match(pattern4); 

						if (matches1) {
							matches1.forEach(function(match) { 
								gBlNote(ctx,
									r.attribute.left+x,
									r.attribute.top+y,
									1, // note
									0, // tone
									0.5  // time
								);
								gBlNote(ctx,
									r.attribute.left+x + 20,
									r.attribute.top+y,
									2, // note
									0, // tone
									0.25  // time
								);
								gBlNote(ctx,
									r.attribute.left+x + 40,
									r.attribute.top+y,
									3, // note
									0, // tone
									0.25  // time
								);
							});
						}
						else if(matches2){
							var a = r.attribute.note;// 1/2/
							var b = a.split('/');					
							
							matches2.forEach(function(match) { 
								gBlNote(ctx,
									r.attribute.left+x,
									r.attribute.top+y,
									b[0], // note
									0, // tone
									0.5  // time
								);
								gBlNote(ctx,
									r.attribute.left+x + 20,
									r.attribute.top+y,
									b[1], // note
									0, // tone
									0.5  // time
								); 
							}); 
						}
						else if(matches3){
							matches3.forEach(function(match) { 
								gBlNote(ctx,
									r.attribute.left+x,
									r.attribute.top+y,
									1, // note
									0, // tone
									0.25  // time
								);
								gBlNote(ctx,
									r.attribute.left+x + 20,
									r.attribute.top+y,
									2, // note
									0, // tone
									0.25  // time
								); 
								gBlNote(ctx,
									r.attribute.left+x + 40,
									r.attribute.top+y,
									3, // note
									0, // tone
									0.25  // time
								); 
								gBlNote(ctx,
									r.attribute.left+x + 60,
									r.attribute.top+y,
									4, // note
									0, // tone
									0.25  // time
								); 
							}); 
						}
						else if(matches4){
							matches4.forEach(function(match) { 
								gBlNote(ctx,
									r.attribute.left+x,
									r.attribute.top+y,
									1, // note
									0, // tone
									0.25  // time
								);
								gBlNote(ctx,
									r.attribute.left+x + 20,
									r.attribute.top+y,
									2, // note
									0, // tone
									0.25  // time
								); 
								gBlNote(ctx,
									r.attribute.left+x + 40,
									r.attribute.top+y,
									3, // note
									0, // tone
									0.5  // time
								);  
							}); 
						}
						else{
							var aNote = function (c,n,tm,tn,_x,_y){ 
								gBlNote(c,_x,_y,n,tn,tm);
							}(ctx,r.attribute.note,r.attribute.time,+r.attribute.tone,
							r.attribute.left+x,r.attribute.top+y);

						} 
					} 
				},
				"drawObject": function(r,ctx,x,y){			
					r.drawMyself(ctx,x,y);	
				},
			}, 
			{
				"id": "id_4_sprite",
				"type": "sprite",
				"makeData": function(r,x1,y1,x2,y2,size,color){
					 
					r.graphic 			= "sprite"; 
					var a = {};
					a.left 		= x1;
					a.top 		= y1;
					a.right 	= x2;
					a.bottom 	= y2;
					a.size 		= size; 
					a.color 	= color;

					r.attribute 		= a;

					r.drawMyself = function(){
						let t = 0;
						const gridSize = 5; // 每个格子的大小
						const gridWidth = 100;
						const gridHeight = 100;

						// 初始化滑翔机模式
						let grid = Array.from({ length: gridHeight }, () => Array(gridWidth).fill(false));
						grid[2][3] = true;
						grid[3][4] = true;
						grid[4][2] = true;
						grid[4][3] = true;
						grid[4][4] = true;

						function drawGrid(ctx) { 
							for (let y = 0; y < gridHeight; y++) {
								for (let x = 0; x < gridWidth; x++) {
									if (grid[y][x]) {
										ctx.fillStyle = 'black';
										ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
									}
								}
							}
						}

						function countNeighbors(x, y) {
							let count = 0;
							for (let i = -1; i <= 1; i++) {
								for (let j = -1; j <= 1; j++) {
									const nx = x + i;
									const ny = y + j;
									if (
										nx >= 0 && nx < gridWidth &&
										ny >= 0 && ny < gridHeight &&
										!(i === 0 && j === 0) &&
										grid[ny][nx]
									) {
										count++;
									}
								}
							}
							return count;
						}

						function nextGeneration(ctx) {
							const nextGrid = Array.from(grid, row => row.slice());
							for (let y = 0; y < gridHeight; y++) {
								for (let x = 0; x < gridWidth; x++) {
									const neighbors = countNeighbors(x, y);
									if (grid[y][x]) {
										if (neighbors < 2 || neighbors > 3) {
											nextGrid[y][x] = false; // 死亡
										}
									} else {
										if (neighbors === 3) {
											nextGrid[y][x] = true; // 诞生
										}
									s}
								}
							}
							grid = nextGrid;
							drawGrid(ctx);
						}

						return function(_ctx,_x,_y){
							t++;
							_ctx.fillStyle = r.attribute.color;
							_ctx.fillRect(r.attribute.left+_x,r.attribute.top+_y,20,20);
							
							_ctx.fillStyle = "white";
							_ctx.fillText("spr" + t,r.attribute.left+_x,r.attribute.top+_y);
							nextGeneration(_ctx);
						}
					}();
				},
				"drawObject": function(r,ctx,x,y){			
					r.drawMyself(ctx,x,y);	
				},
			}, 
		];
		var o = function(_t,_x1,_y1){			
			var left = _x1;
			var top = _y1;
			var r = {};
			r.getLeft = function(){return left;}
			r.getTop = function(){return top;}
			const makeData4Object = function(_osd,t){
				var of = null;
				for(i in _osd){					
					if(_osd[i].type == t){ 
						of = _osd[i];
						break;
					}
				}
				if(of){
					of.makeData(r,x1,y1,x2,y2,size,color);
				}
			}(osDefine,_t);
			return r;
		}(_oType,x1,y1); 
		
		var s = false;
		var msgO = "msgO"; 
		o.selfDraw = function(ctx,x1,y1){ 
			const drawThisObject = function(_osd){ 
				
				var of = null;
				for(i in _osd){
					if(_osd[i].type==_oType){
						of = _osd[i];
						break;
					}
				}
				 
				if(of.drawObject){ 					of.drawObject(o,ctx,x1,y1);			}
				
			}(osDefine); 
		}  
		return o;
	}
	const _curFrameDown = function(x,y,x1,y1){ 
		if(iCurScene>-1) 		_objCmd.downObjCmd(x,y,x1,y1,lsScene[iCurScene].objects); 
	}
	const _curFrameMove = function(x,y,x1,y1){
		if(iCurScene>-1) 		_objCmd.moveObjCmd(x,y,x1,y1,lsScene[iCurScene].objects); 
	}
	
	const _curFrameUp = function(x,y,x1,y1){
		if(iCurScene>-1) 		_objCmd.upObjCmd(x,y,x1,y1,lsScene[iCurScene].objects); 
	}
	
	
	var _makeBLS = function(){
		var s = {};
		var r = {};		
		r.version 		= "gc4BLS: bv0.15";
		r.width 		= x2 - x1;
		r.height 		= y2 - y1;
		r.time          = blsTimer.getVideoTime();  //add by jeremyjia
		r.music 		= blsTimer.getVP().src;
		r.rate 			= function(){
			var s = "";
			s += blsTimer.getFPS();
			return s;
		}(); 
		r.frames 		= lsScene;		
		r.superObjects 	= lsSuperObjects;
		s.request 		= r;			
		return s;	
	}
	
	const _makeDbgMsgInFrame = function(){
		var r; 
		r = msgDbg + " :: v 13 showDebugMsg4BLS: x1y1[" + x1 + ","+ y1 + "]";;
		return r;
	}
	const _ui4CurScene = function(curFrameBtn,_v,f,n,_thisBLS){
		_v.innerHTML = "";
		const btns4CurScene = [
			{	
				"id": "id_4_time",	
				"name": "time",
				"fn4click": function(targetV,myBtn){		fn4settime(targetV);	},
				"bgc":"Cornsilk"
			},
			{	
				"id": "id_4_bgc",	
				"name": "bgc",
				"fn4click": function(targetV,myBtn){	fn4setbackgroundColor(targetV,myBtn);	},
				"bgc":"BlanchedAlmond"
			},
			{	
				"id": "id_4_objects",	
				"name": "os",
				"fn4click": function(targetV,myBtn){ 
					const btns4ObjectsInCurScene = [
						{
							"id":"id_4_objSprite",
							"name":"sprite",
							"fn2click":function(_v,btn){ 
								_v.innerHTML = btn.id;
							},
							"bgc":"lightgreen"
						},
						{
							"id":"id_4_objMusicNote",
							"name":"musicNote",
							"fn2click":function(_v,btn){ 
								_v.innerHTML = btn.id;
								const btns4MNotes =[
									{
										"id"	: "1",
										"name"	: "1,1,1", 
										"bgc":"lightgreen",
										"clickNoteType": function(div4NoteType,thisNoteType){	
											let noteC = "1";
											let noteTime = 1; 
											let noteTone = 1;
											const tb = blo0.blDiv(div4NoteType,div4NoteType.id+thisNoteType.name,thisNoteType.name,"gray"); 
											const fn2mkNote = function(_tb){
												const tbNote = blo0.blDiv(_tb,_tb.id+"tbNote","tbNote",blColor[1]);
												const nsCode = [1,2,3,4,5,6,7,0];
												for(i in nsCode){
													const b = blo0.blBtn(tbNote,tbNote.id+nsCode[i],nsCode[i],"gray");
													b.style.float = "left";		
													b.onclick = function(_nsCode,_i){
														return function(){
															noteC = _nsCode[_i];
															blo0.blGetTa().value = noteC + "," + noteTime + "," + noteTone; 
														}
													}(nsCode,i);
												}
											}(tb);
											const fn2mkTime = function(_tb){
												const tbTime = blo0.blDiv(_tb,_tb.id+"tbTime","tbTime",blColor[2]);
												const nsTime = [1,2,3,4,0.75,0.5,0.25];
												for(i in nsTime){
													const b = blo0.blBtn(tbTime,tbTime.id+nsTime[i],nsTime[i],"lightblue");
													b.style.float = "left";		
													b.onclick = function(_nsTime,_i){
														return function(){
															noteTime = _nsTime[_i];
															blo0.blGetTa().value = noteC + "," + noteTime + "," + noteTone; 
														}
													}(nsTime,i);
												}
											}(tb);  
											const fn2mkTone = function(_tb){
												const tbTone = blo0.blDiv(_tb,_tb.id+"tbTone","tbTone",blColor[3]);
												const nsTone = [1,2,-1,-2,0];
												for(i in nsTone){
													const b = blo0.blBtn(tbTone,tbTone.id+nsTone[i],nsTone[i],"brown");
													b.style.float = "left";		
													b.onclick = function(_nsTone,_i){
														return function(){
															noteTone = _nsTone[_i];
															blo0.blGetTa().value = noteC + "," + noteTime + "," + noteTone; 
														}
													}(nsTone,i);
												}
											}(tb);  
										}
									},
									{
										"id"	: "1/2/",
										"name"	: "1/2/", 
										"bgc":"lightgreen"
									},
									{
										"id"	: "1//2//3//4//",
										"name"	: "1//2//3//4//", 
										"bgc":"lightgreen"
									},
									{
										"id"	: "1/2//3//",
										"name"	: "1/2//3//", 
										"bgc":"lightgreen"
									},
									{
										"id"	: "1//2//3/",
										"name"	: "1//2//3/", 
										"bgc":"lightgreen"
									},
									{
										"id"	: "1./2//",
										"name"	: "1./2//", 
										"bgc":"lightgreen"
									},
									{
										"id"	: "1//2./",
										"name"	: "1//2./", 
										"bgc":"lightgreen"
									},

								];
								const fn4MNotes = function(os){
									const tb = blo0.blDiv(_v,_v.id+"tb4NoteType","noteType","gray");
									const v1 = blo0.blDiv(_v,_v.id+"v1","v1","white");
									for(i in os){ 
										const b = blo0.blBtn(tb,tb.id+os[i].id,os[i].name,os[i].bgc);
										b.style.float = "left";
										b.onclick = function(_b,_os,_i){
											return function(){			 			 
												blo0.blGetTa().value = _os[_i].name; 
												v1.innerHTML = _os[_i].name;
												if(_os[_i].clickNoteType){
													_os[_i].clickNoteType(v1,_os[_i]);
												}
											}
										}(b,os,i);
									}
								}(btns4MNotes);
							},
							"bgc":"white"
						},
						{
							"id":"id_4_objText",
							"name":"text",
							"fn2click":function(_v,btn){ 
								_v.innerHTML = btn.id;
							},
							"bgc":"LightBlue"
						},
						{
							"id":"id_4_objLine",
							"name":"line",
							"fn2click":function(_v,btn){  
								_v.innerHTML = btn.id;
							},
							"bgc":"PowderBlue"
						},
						{
							"id":"id_4_objEdit",
							"name":"eObject",
							"fn2click":function(_v,btn){  
								_v.innerHTML = btn.id;
							},
							"bgc":"LightSkyBlue"
						},
						{
							"id":"id_4_objUndo",
							"name":"undo",
							"fn2click":function(_v,btn){  
								_v.innerHTML = btn.id;
							},
							"bgc":"lightgray"
						},
					];
					const split4CurFrame = blo0.blDiv(targetV,targetV.id+"split4CurFrame","split4CurFrame","lightgreen");
					const tb = blo0.blDiv(targetV,targetV.id+"tb","tb","gray");
					const v = blo0.blDiv(targetV,targetV.id+"v","v","white");
					const fnObjectsInCurScene = function(os){
						for(i in os){
							const b = blo0.blBtn(tb,tb.id+os[i].id,os[i].name,os[i].bgc);
							b.style.float = "left";
							b.onclick = function(_b,_os,_i){
								return function(){			
									_objCmd.setObjectType(_os[_i].id);					
									_os[_i].fn2click(v,_b);
								}
							}(b,os,i);
						}
					}(btns4ObjectsInCurScene);
				},
				"bgc":"Bisque"
			},
		];
		const splitline1 = blo0.blDiv(_v,_v.id+"splitline1","splitline1","green");	
		const tb = blo0.blDiv(_v,_v.id+"tb4curScene","tb4curScene","lightgreen");	
		const v4curScene = blo0.blDiv(_v,_v.id+"v4curScene","v4curScene","gray");	
		const _2_make_ui_4_curScene = function(ts){
			for(i in ts){ 
				const b = blo0.blBtn(tb,tb.id+ts[i].id,ts[i].name,ts[i].bgc); 
				b.style.float = "left";
				b.onclick = function(_b,_ts,_i,_vTarget){
					return function(){
						_vTarget.innerHTML = "";
						_ts[_i].fn4click(_vTarget,_b);
					}
				}(b,ts,i,v4curScene);
			}
		}(btns4CurScene);


		const fn4settime = function(v){
			const tb4time = blo0.blDiv(v,v.id+"tb4time","time0.11","brown");		
			const btn4TimeStatic = blo0.blBtn(tb4time,tb4time.id+"btn4TimeStatic","f.time","gray");
			btn4TimeStatic.style.float = "left";
			const btn4TimeVal = blo0.blBtn(tb4time,tb4time.id+"btn4TimeVal",f[n].time,"lightblue");
			btn4TimeVal.style.float = "left";
			const ws = [1,-1,2,-2,5,-5,10,-10,20,-10,50,-50,100,-100,200,-200,500,-500,1000,-1000];
			for(i in ws){
					var s = ws[i]>0?"+"+ws[i]:ws[i];
					var b = blo0.blBtn(tb4time,tb4time.id+i,s,"gray");
					b.onclick = function(_i){
						return function(){
							f[n].time += ws[_i];
							btn4TimeVal.innerHTML = f[n].time;
							bl$("id_4_all_frames").innerHTML = _thisBLS._getAllFramesNumber();
						}
					}(i);
			}
		}
		const fn4setbackgroundColor = function(v,btnBoss){
			const tb = blo0.blDiv(v,v.id+"tb4backgroundcolor","backgroundcolor0.12","blue");	
			tb.innerHTML = blo0.blTime(0);	
			const static = blo0.blBtn(tb,"a123jia","f.backgroundColor","gray");
			static.style.float = "left"; 	
			const fn4ColorPicker = function(_tb){
				const tb = blo0.blDiv(_tb,_tb.id+"tb4Blue","blueDiv","blue");		
				tb.setBKColor = function(r,g,b){
					let s = r + "," + g +"," + b;
					console.log(blo0.blTime(0) + " tb.fn : rgb = " + r + "," + g +"," + b);
					f[n].backgroundColor = s;
				}
				const cp = blo0.blColorPicker(_tb,"cpTest","green",tb);
			}(tb);
		} 
	}
	const _objCmd = function(){
		const c = function(){	
			var type = "null";
			var msgObjCmd = "msgObjCmd";
			var x1 = -1, y1 = -1, x2 = -1, y2 = -1;
			var bDownCmd = false;

			this.drawObjCmdUI = function(ctx,x,y){
				ctx.fillStyle = "red";
				ctx.fillRect(x,y,10,10);
				var s = msgObjCmd + " type=" + type + ", [" + x1 + "," + y1 + "] - [" + x2 + "," + y2 + "]";
				ctx.fillText(s,x+20,y+20);

				if(!bDownCmd) return;
				ctx.beginPath(); 				 
				ctx.moveTo(x1,y1);
				ctx.lineTo(x2,y2);		 
				ctx.strokeStyle = "blue";
				ctx.stroke();
			};
			this.setObjectType = function(id){
				type = id; 
			}
			this.downObjCmd = function(x,y,x0,y0,os){ 
				x1 = x2 = x;
				y1 = y2 = y;
				bDownCmd = true;
				if("id_4_objEdit"==type){
					for(i in os){
						if(os[i].downOnMe) os[i].downOnMe(x,y,x0,y0);
					}
				}
			}
			this.upObjCmd = function(x,y,x0,y0,os){
				if(bDownCmd){
					if("id_4_objLine"==type){
						os.push(_newObject("line","sText",x1-x0,y1-y0,x2-x0,y2-y0,5.5,"0,200,0"));
					}	
					if("id_4_objText"==type){
						os.push(_newObject("text","sText",x1-x0,y1-y0,x2-x0,y2-y0,25,"0,200,0"));
					}	 
					if("id_4_objMusicNote"==type){ 
						os.push(_newObject("musicNote",blo0.blGetTa().value,x1-x0,y1-y0,x2-x0,y2-y0,25,"0,200,0"));
					}	
					if("id_4_objSprite"==type){
						os.push(_newObject("sprite","sText",x1-x0,y1-y0,x2-x0,y2-y0,25,"210,200,0"));
					}	
					if("id_4_objEdit"==type){
						for(i in os){
							if(os[i].upOnMe) os[i].upOnMe(x,y,x0,y0);
						}
					}	
					 
					if("id_4_objUndo"==type){ 
						os.pop();
					}	 
				}				
				else{
					msgObjCmd = "upObjCmd:xxx";
				}
				x1 = x2 = y1 = y2 = -1;
				bDownCmd = false;
			}
			this.moveObjCmd = function(x,y,x0,y0,os){
				 
				x2 = x;
				y2 = y;
			}

		};
		return new c();
	}();

}


const 			blc_4_t_IDLE 			= 0;
const 			blc_4_t_DOWNLOAD 		= 1;
const 			blc_4_t_PARSE 			= 2;
const			blc_4_t_MAKE_VIDEO 	= 3;
const			blc_4_t_MP3LRC2BLS		= 4;
