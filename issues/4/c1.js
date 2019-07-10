//i4c1
var s= "v0.0. 52 ";
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
	var vid = document.getElementById("myVideo"); 
	vid.controls = false;

	v.tb = blo0.blDiv(v, v.id + "tb", "tb",blGrey[3]);

	v.tb.b0 = blo0.blBtn(v.tb, v.tb+"b0","list",blGrey[0]);
	v.tb.b0.onclick = function(){
		if(!this.v){
			this.v = blo0.blDiv(v,v.id + "List","list", "lightblue");
			var d = this.v;
			d.v = blo0.blDiv(d,d.id+"v","v",blGrey[3]); 
			d.v4List = blo0.blDiv(d,d.id+"v4List", "v4List", blColor[4]);

			var _makeMp3List2Div = function(d,txt){
							var str = "var a =" +  txt;  
						    eval(str);
						    d.innerHTML = "";
						    var s = "***";
						    //s += "<a href='https://github.com/littleflute/JavaScript/issues/9' target='_blank'>#9 v0.0. 115<a/> - "; 
						    //s += "<a href='https://github.com/littleflute/JavaScript/edit/master/issues/9/i.js' target='_blank'>i.js* <a/> - ";
						    //s += "<a href='https://littleflute.github.io/JavaScript/issues/9/i.js' target='_blank'>i.js<a/>";
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
		if(!this.v){
			this.v = blo0.blDiv(v,v.id + "v4b1","v4b1",blColor[3]);
		}
		_on_off_div(this,this.v);
	}
	v.tb.b2 = blo0.blBtn(v.tb, v.tb+"b2","play",blGrey[0]);
	v.tb.b2.onclick = function(){
		if(!this.run){
			this.run = true;
			this.style.backgroundColor = "green";
			this.innerHTML = "pause";
			vid.play();
		} 
		else{
			this.run = false;
			this.style.backgroundColor = "brown";
			this.innerHTML = "play";
			vid.pause();
		}
	}
}
