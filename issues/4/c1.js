//i4c1
var s= "v0.1. 53 ";
s += "<a target='_blank' href='https://github.com/jeremyjia/Games/edit/master/issues/4/c1.js'"
s += " style='color:blue;'";		s +=">"; s += "c1.js* ";
s += "<a target='_blank' href='issues/4/c1.js'"
s += " style='color:green;'";		s +=">"; s += "c1.js ";
s += "<a target='_blank' href='";
var s1 = window.location.pathname;
if(s1.search("issues")==-1){
	s1.replace
}
s += "/issues/4/c1Test.html'";
s += " style='color:brown;'";		s +=">"; s += "c1Test.html";
s += "</a>";

var md = blo0.blDiv(document.body, "div_ID_4_I4C1", s ,blGrey[0]);  
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

	var title = blo0.blDiv(md , "div_ID_4_I4C1" + "Header", "Header");
	style ="padding: 10px;";
	style += "z-index: 10;";
	style += "cursor: move;";
	style += "text-align: center;";
	style += "border: 1px solid #fff;";
	style += "background-color: #2196F3;";
	title.style =style;

	ftnPlayer(md);

    blo0.blMakeDivMovable(md );
	md.style.left = "400px";
	md.style.top = "40px";
}
_on_off_div(this,md);

function ftnPlayer( oDiv ){
	var v = blo0.blDiv(oDiv, oDiv.id + "Player", "Player",blGrey[0]);
	var str4V = '<video id="myVideo" width="320" height="240" controls> ';				
	str4V += '<source src=';
	str4V += 'https://littleflute.github.io/ted1/docs/61/v0.mp4';
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
	_p.src = 'https://littleflute.github.io/ted1/docs/61/v0.mp4';
	_p.lrc = "https://littleflute.github.io/english/NewConceptEnglish/Book2/1.lrc";
	_p.controls = false;

	v.tb = blo0.blDiv(v, v.id + "tb", "tb",blGrey[3]);

	v.tb.btnLists = blo0.blBtn(v.tb, v.tb+"btnLists","lists",blGrey[0]);
	v.tb.btnLists.onclick = function(){
		if(!this.v){
			this.v = blo0.blDiv(v,v.id + "List","list", "lightblue");
			var d = this.v;
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
			var _listURL = "https://api.github.com/repos/littleflute/EXPLORATIONS/issues/1";
			w3.getHttpObject(_listURL  + "/comments", _loadListComments);	
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
											blo0.blScript("id_4_js_plxSrt","c1/p1.js");
										}
										_on_off_div(this,blo0.plxSrt);
									}
									
									_this.v1 = blo0.blDiv(_this.v0,_this.v0.id+"v1","v1",blGrey[0]);
									bShowLrc.onclick = function(_this){
										return function(){
											if(!_this.v){
												_this.v = blo0.blMD("id_mdiv_4bSHowLrc",
												 		 "v4bShowLrc", 300,100,500,400, blGrey[0]);
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
												_this.v.ta = blo0.blTextarea(_this.v,"ta2",s,blGrey[1]);
												_this.v.ta.style.width = "98%";
												_this.v.ta.style.height = "98%";
												 
											}
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