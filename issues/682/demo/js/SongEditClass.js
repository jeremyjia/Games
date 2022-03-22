
//file: SongEditClass.js  
function _blSongEditClass (_d,_t){ 
	var _v = null;
	var d = _d;
	var ta = _t; 
	this.blhInit = function(){
		bl$("blr_Debug").click();
		bl$("blr_Edit").click();
	}
	this.blr_Debug = function(b,d){
		var tb = blo0.blDiv(d,d.id+"tb","tb",blGrey[5]);
		var btnArtist = blo0.blBtn(tb,tb.id+"btnArtist","btnArtist",blGrey[0]);
		btnArtist.onclick = function(){			
			var md = blo0.blMDiv(d,d.id+"btnArtist","btnArtist",55,10,888,200, "white");
			md.v = blo0.blDiv(md,md.id+"v","v",blGrey[1]);
			blo0.blShowObj2Div(md.v,vextab.getArtist());
			_on_off_div(this,md);	
			this.style.background = this.style.background=="red"?blGrey[5]:blColor[4];
		}
		var btnVextab = blo0.blBtn(tb,tb.id+"btnVextab","btnVextab",blGrey[0]);
		btnVextab.onclick = function(){			
			var md = blo0.blMDiv(d,d.id+"btnVextab","btnVextab",55,10,888,200, "white");
			md.v = blo0.blDiv(md,md.id+"v","v",blGrey[1]);
			blo0.blShowObj2Div(md.v,VexTab);
			_on_off_div(this,md);	
			this.style.background = this.style.background=="red"?blGrey[5]:blColor[4];
		}
		_on_off_div(b,d);	
		b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
	};this.bllv= "--v0.21--";
	this.blr_Edit = function(b,d){
		if(!_v){_v=blo0.blDiv(d,d.id+"_v","v::",blGrey[0]);_v.majorChord = new _blEditClass(_v,d,ta);}
		_on_off_div(b,d);	
		b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
	};	this.bll1= "--1--";
	this.blr_Songs = function(btn,div){
		if(!div.v){
			div.v=blo0.blDiv(div,div.id+"_v","",blColor[0]); 			 	
			_loadSongsList(div.v);
			div.v.tb=blo0.blDiv(div.v,div.v.id+"tb","tb:",blGrey[2]); 
			var b1 = blo0.blBtn(div.v.tb,div.v.tb.id + "b1","[+song]",blColor[1]);
			b1.onclick = function(this_){
				var ns = [];
				return function(){
					var id = this_.id + (ns.length + 1);
					var html = "ns" + (ns.length + 1);
					var b = blo0.blBtn(div.v.tb,id,html,blColor[1]);
					b.ta = blo0.blTextarea(document.body,b.id+"_ta","",blColor[4]);
					b.onclick = function(tt){return function(){
						if(!ta.old){ta.old=null;}
						if(ta.old!=null){ta.old.value = ta.value;}
						ta.value = tt.value;
						ta.old=tt; 
						d.showVextab();}
					}(b.ta);
					ns.push(b);
				}
			}(b1);

			var t = document.getElementsByTagName("textarea");
			for (var i = 0; i < t.length; i++){
				if(t[i].id!="blah")
				{	
					var b = blo0.blBtn(div.v.tb,div.v.tb.id + t[i].id,t[i].id,blGrey[0]);
					b.onclick = function(tt){return function(){
						if(!ta.old){ta.old=null;}
						if(ta.old!=null){ta.old.value = ta.value;}
						ta.value = tt.value;
						ta.old=tt; 
						d.showVextab();}
					}(t[i]);
				}
			}
		}_on_off_div(btn,div);		
	}; this.bll2= "--2--"; 
	this.blr_AboutMe = function(btn,div){
		var s = blo0.blhMakeLink ("SongEditClass.js","SongEditClass.js","color:blue","_blank");
		s += blo0.blhMakeLink ("SongEditClass.js*","https://github.com/littleflute/vextab/edit/master/tests/SongEditClass.js","color:red","_blank");
		div.innerHTML = s;
		_on_off_div(btn,div);	
	};  
}
function _blEditClass (_o,_d,_t){
	this.v = "v0.0.34";
	var o = _o;
	var d = _d;
	var ta = _t;
	var r = blo0.blDiv(o,o.id+"_blMajorChordClass","_blMajorChordClass",blColor[4]);	 
  	r.C = blo0.blBtn(r,r.id + "C","C",blGrey[3]);  	
	r.C.onclick = function(){		ta.value += bl$("s1").value + _strMajorChord(1,2); d.showVextab(); 		}
  	r.D = blo0.blBtn(r,r.id + "D","D",blGrey[3]);  	
	r.D.onclick = function(){		ta.value += bl$("s1").value + _strMajorChord(3,2); d.showVextab(); 		}
  	r.E = blo0.blBtn(r,r.id + "E","E",blGrey[3]);
  	r.E.onclick = function(){		ta.value += bl$("s1").value + _strMajorChord(5,2); d.showVextab(); 		}
	function _strMajorChord(i,j){
		var r = "notes :8  " + i + "/" + j + " " + (i+4)+ "/" + j +" " + (i+7) + "/" + j + " " + (i+12) + "/" + j + " " + (i+7) +"/" + j + " |";
		return r;
	}
	var r = blo0.blDiv(o,o.id+"_add_line","[+line]",blColor[4]);	 
  	r.a0 = blo0.blBtn(r,r.id + "a0","a0",blGrey[0]);r.a0.onclick = function(){	ta.value += "\ntabstave"; d.showVextab(); }
  	r.a1 = blo0.blBtn(r,r.id + "a1","a1",blGrey[0]);r.a1.onclick = function(){ta.value += "\ntabstave notation=true clef=bass key=Ab time=C| \n notes 4-5/6"; d.showVextab(); }
  	r.a2 = blo0.blBtn(r,r.id + "a2","a2",blGrey[0]);r.a2.onclick = function(){ta.value += "\ntabstave notation=true tablature=false \n notes Cn-D-E/4 F#/5"; d.showVextab(); }
	r.a3 = blo0.blBtn(r,r.id + "a3","a3",blGrey[0]);r.a3.onclick = function(){ta.value += "\ntabstave notation=true \n notes 4-5-6/3 10/4"; d.showVextab(); }
} 
var _loadSongsList = function(d){
		var sd = blo0.blDiv(d,"id_div_songs_list","",blGrey[5]);
		blo0.blScript("id_script_songs_list","songs/SongsList.js");
}
