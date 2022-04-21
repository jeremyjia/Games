//index.js
var s= "bv0.32";
var d = blo0.blMD("div_ID_4_Plx", s ,550,50,500,400,"gray");  
if(!d.v){
    d.v = blo0.blDiv(d,d.id+"v","v",blGrey[0]);
    var blse = new CBlOnlineEditor();
    blo0.blShowObj2Div(d.v,blse);                
    bl$("blrString2JpSVG").click();             
    bl$("blrMakeScript").click();           
    bl$("blrRunJS").click();
}
_on_off_div(null,d);

function CBlOnlineEditor(){ 
    this.blrMakeScript = function(b,d){blo0.blLoadGithubIssue("jeremyjia","Game",2,b,d);}
    this.blrString2JpSVG = function(b,d){blo0.blLoadGithubIssue("jeremyjia","Game",724,b,d);} 
    this.blrRunJS = function(b,d){
		if(!d.v){
			d.parentElement.style.backgroundColor	 = blColor[3]; 

			// 调用 jsClass 的 blo0.blDiv 接口函数，创建 DIV。 
			d.v = blo0.blDiv(d,d.id+"v","",blGrey[5]);
			// 调用 jsClass 的 blo0.blTextarea 接口函数，创建 Textarea 
			d.v.ta = blo0.blTextarea(d.v,"id_4_ta_blrRunJS","alert(21);",blGrey[3]);
	        d.v.ta.style.width="95%"; 
	        d.v.ta.style.height="111"+"px"; 


			// 调用 jsClass 的 blo0.blDiv 接口函数，创建 DIV。 
			d.v1 = blo0.blDiv(d,d.id+"v1","",blGrey[5]);
			d.vs = blo0.blDiv(d,d.id+"vs","status",blGrey[5]);			
			d.v.ta.status = function(txt){ d.vs.innerHTML = blo0.blDate()+ ":"+ txt;}

			// 调用 jsClass 的 blo0.blBtn 接口函数，创建 button. 
			d.v.btnRun= blo0.blBtn(d.v1,d.v1.id+"btnRun","run;",blColor[4]);
			d.v.btnRun.onclick= function(){	  eval(d.v.ta.value);		}

			d.v.btnSave2CO= blo0.blBtn(d.v1,d.v1.id+"btnSave2CO","s2co","brown");
			d.v.btnSave2CO.style.float = "right";
			d.v.btnSave2CO.onclick= function(){	 
				if(d.v.ta.co) {
					d.v.ta.co.code = d.v.ta.value;	
				}				
				else{
					d.v.ta.status ("not set current object yet.")
				}
			}
			d.v.btnGetCoCode= blo0.blBtn(d.v1,d.v1.id+"btnGetCoCode","co","white");
			d.v.btnGetCoCode.style.float = "right";
			d.v.btnGetCoCode.onclick= function(){	 
				if(d.v.ta.co) {
					d.v.ta.value = d.v.ta.co.code;	
					d.v.ta.status (d.v.ta.co.id);
				}
				else{
					d.v.ta.status ("not set current object yet.")
				}
			}
			
			d.v.btnCO2Gh= blo0.blBtn(d.v1,d.v1.id+"btnCO2Gh","co2gh","lightblue");
			d.v.btnCO2Gh.style.float = "right";
			d.v.btnCO2Gh.onclick= function(){	 
				if(d.v.ta.co) {
					if(d.v.ta.co.save2gh) d.v.ta.co.save2gh();	
					else d.v.ta.status ("No save2gh function in current object.")
				}				
				else{
					d.v.ta.status ("not set current object yet.")
				}
			}			

			
			var _src = "https://api.github.com/repos/jeremyjia/Games/issues/21/comments";
			w3.getHttpObject(_src, function _loadIssueComments(o) {
				var _i = 0;
				var _s = "<a target='_balnk' href ='";
				_s += "https://github.com/jeremyjia/Games/issues/21'";
				_s += ">issue#21</a>"; 
				
				_s += "<a target='_balnk' href ='";
				_s += "https://jeremyjia.github.io/Games/issues/21'";
				_s += ">page#21</a>"; 

				var _v = blo0.blDiv(d.v,d.v.id+"_v", _s, blGrey[1]);
				_v.bs = [];
				
				var vSnap = blo0.blDiv(d.v,d.v.id+"vSnap", "vSnap", "darkgrey");
				vSnap.ls = [];
				vSnap.cur = null;
				var btnSnap = blo0.blBtn(_v, _v.id+"btnJS_Snap","+","brown"); 
				btnSnap.onclick = function(){
					var n = vSnap.ls.length;
					if(n==0){
						var btnSave = blo0.blBtn(vSnap,vSnap.id+"btnSave","save",blGrey[0]);
						btnSave.onclick = function(){
							vSnap.cur.txt = d.v.ta.value;
						}
					}
					var btn = blo0.blBtn(vSnap,vSnap.id+n,n,blGrey[0]);
					btn.txt = d.v.ta.value;
					btn.onclick = function(_myTa,_thisBtn,_thisList){
						return function(){
							_myTa.value = _thisBtn.txt;
							blo0.blMarkBtnInList(_thisBtn,_thisList,"green","grey");
							vSnap.cur = _thisBtn;
						}
					}(d.v.ta,btn,vSnap.ls);
					vSnap.ls.push(btn);
				}

				for(i in o){
					_i++;
					var bodyTxt = o[i].body;
					// 调用 jsClass 的 blo0.blDiv 接口函数，创建 DIV。 
					var btnJS = blo0.blBtn(_v, _v.id+"btnJS"+i,_i,blGrey[2]);
					btnJS.i = i;
					btnJS.onclick = function(_this,_txt){
			              return function(){
							  d.v.ta.value = _txt;
							  var bs = _v.bs;
							  for(i in bs){
								  if(i==_this.i){
									bs[i].style.backgroundColor = "yellow";
								  }
								  else{
									bs[i].style.backgroundColor = "grey";
								  }
							  }
							}
				    }(btnJS,bodyTxt);
					_v.bs.push(btnJS);
				}
			});	
        }

        // 调用全局接口函数 _on_off_div，打开或关闭 DIV（此处为 md)
		_on_off_div(b,d);		
		b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];                  
	}//this.blrRunJS
 
} 
 