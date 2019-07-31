//i4c1
var s= "v0.1. 22 ";
s += "<a target='_blank' href='https://github.com/jeremyjia/Games/edit/master/issues/4/c1.js'"
s += " style='color:blue;'";		s +=">"; s += "c1.js* ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c1.js'"
s += " style='color:green;'";		s +=">"; s += "c1.js ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c1Test.html'"
s += " style='color:brown;'";		s +=">"; s += "c1Test.html";

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
	_p.src = 'https://littleflute.github.io/ted1/docs/61/v0.mp4';
	_p.lrc = "https://littleflute.github.io/english/NewConceptEnglish/Book2/1.lrc";
	_p.controls = false;

	v.tb = blo0.blDiv(v, v.id + "tb", "tb",blGrey[3]);

	v.tb.b0 = blo0.blBtn(v.tb, v.tb+"b0","list",blGrey[0]);
	v.tb.b0.onclick = function(){
		if(!this.v){
			this.v = blo0.blDiv(v,v.id + "List","list", "lightblue");
			var d = this.v;
			d.v = blo0.blDiv(d,d.id+"v","v",blGrey[3]); 
			d.v4List = blo0.blDiv(d,d.id+"v4List", "v4List",  blColor[4]);

			var _makeMp3List2Div = function(d,txt){
							var str = "var a =" +  txt;  
						    eval(str);
						    d.innerHTML = "";
						    var s = "***";
						    s += "<a href='https://github.com/littleflute/EXPLORATIONS/issues/1' target='_blank'>EXPLORATIONS:i1#<a/> - "; 
						    s += "<a href='https://github.com/littleflute/EXPLORATIONS/edit/master/issues/1/i.js' target='_blank'>i.js* <a/> - ";
						    s += "<a href='https://littleflute.github.io/EXPLORATIONS/issues/1/i.js' target='_blank'>i.js<a/>";
						     blo0.blDiv(d,d.id+"_#9_", s,blColor[4]);
						     var t = blo0.blDiv(d,d.id+"_title_", a.title,blColor[4]);
						     t.v = blo0.blDiv(t,t.id+"v", "v",blColor[5]);
						 
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
				for(i in o){ 
					 var btn = blo0.blBtn(d.v,d.v.id + "_btn_"+i, i+1,blColor[i]);
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
		var _TimeFun = function(_this){	      
				var _t = 0;
				var _src = "";
				var _lrc = "";
     			return function(){
     			 	_t++;
     			 	_this.innerHTML = _t;
     			 	_this.v.mv.parseTxt(_p.duration,_p.currentTime, _this.v.mv.lrcTxt);
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
			this.v.mv = blo0.blMDiv(this.v, this.v.id + "mv", "mv4Lyrics",310,10,300,200,blGrey[1]);

			this.v.mv.parseTxt = function(_d){
				function _getLrc2Div (txt,timeA,txtA){  		

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

				function _xdMoveLyrics2Div(ta,ct, _timeA,_txtA, oDiv){  
					var ii = 0;
					for(var i=0; i< _timeA.length; i++){
						if(ct>_timeA[i]){
							ii = i;	
						} 
					} 
					oDiv.innerHTML = _txtA[ii];
				    
				}
				return function(ta,ct,txt){
					if(!_d.v){
						_d.v 	= blo0.blDiv(_d, _d.id + "v", "v", blGrey[0]);
						_d.vLrc = blo0.blDiv(_d, _d.id + "vLrc", "vLrc", blGrey[3]);
						var b1 	= blo0.blBtn(_d.vLrc, _d.vLrc.id+"b1","b1",blGrey[0]);
						var b2 	= blo0.blBtn(_d.vLrc, _d.vLrc.id+"b2","b2",blGrey[0]);
						_d.vLrc.ta = blo0.blTextarea(_d.vLrc,_d.vLrc.id+"ta","xxx",blGrey[1]);
						_d.vLrc.ta.style.width="95%"; 
						_d.vLrc.ta.style.height="150px"; 

						_d.v4MovingLrc = blo0.blDiv(_d, _d.id + "v4MovingLrc", "v4MovingLrc", blColor[9]);

						b1.onclick = function(_this,_div){						
							return function(){
								var ta = _div.vLrc.ta;
								var timeAr = _div.lrcTimeArray;	
								var txtAr = _div.lrcArray;	
								ta.value = timeAr + "\n" + txtAr;
							}
						}(b1,_d);
						b2.onclick = function(_this,_div){													
							return function(){
								var ta = _div.vLrc.ta;
								var timeAr = _div.lrcTimeArray;	
								var txtAr = _div.lrcArray;									
								if(!_div.vLrc.de){
									_div.vLrc.de = blo0.blDiv(_div.vLrc,_div.vLrc.id+"de","dEdit",blGrey[4]);
								}
								var de = _div.vLrc.de;
								var a = ta.value;
								var b = a.split("\n");
								de.innerHTML = "";
								for(i in b){
									var l = blo0.blDiv(de,de.id+i, "l"+i + ":" + b[i],blColor[i]);
									l.onclick = function(_i,_timeA,_txtA, _player){
										return function(){
											
											_timeA[i] = _player.currentTime;
											_txtA[i]	= b[i];
										}
									}(i,timeAr,txtAr,_p);
								}
								_on_off_div(_this,_div.vLrc.de);
							}
						}(b2,_d);
					}
					_d.v.innerHTML 		= ct + "   /    " + ta ;

					_d.lrcArray = [];
					_d.lrcTimeArray = []; 
					_getLrc2Div(txt,_d.lrcTimeArray, _d.lrcArray);
					_xdMoveLyrics2Div(ta,ct,_d.lrcTimeArray,_d.lrcArray,_d.v4MovingLrc);
				}
			}(this.v.mv);
			this.v.mv.getLrcTxt = function(_d){
				_d.lrcTxt = "***";
				_d._2do = function(txt){ 
					_d.lrcTxt = txt;
				};
				return function(url){ 
					_d.lrcTxt = "Loading ...";					
					blo0.blAjx(_d,url);
				}
			}(this.v.mv);
			this.timer = setInterval(_TimeFun , 100);   
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
				this.timer = setInterval(_TimeFun , 100);   
			}
			_on_off_div(this,this.v);
			var b = this; var d = this.v;
			b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
		}
	};

	v.tb.b2 = blo0.blBtn(v.tb, v.tb+"b2","play",blGrey[0]);
	v.tb.b2.onclick = function(){
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
