//i4c3  
var s= "v0.0. 135 "; 
s += "<a target='_blank' href='https://github.com/jeremyjia/Games/edit/master/issues/4/c3.js'"
s += " style='color:blue;'";		s +=">"; s += "c3.js* ";
s += "<a target='_blank' href='issues/4/c3.js'"
s += " style='color:green;'";		s +=">"; s += "c3.js ";
s += "<a target='_blank' href='issues/4/c3Test.html'"
s += " style='color:brown;'";		s +=">"; s += "c3Test.html";
s += "</a>";

// blo0 是 blclass 库中的一个全局对象
// 调用 blo0.blDiv 接口函数，创建 DIV。 
// blGrey 是 blclass 库中的一个全局数组(灰色)
// 
var md = blo0.blDiv(document.body, "div_ID_4_I4C3", s ,blGrey[0]);  
if(!md.run){
    md.run = true; 
	var style ="position: absolute;";
	style += "z-index: 9;";
	style += "background-color: #f1f1f1;";
	style += "text-align: center;";
	style += "border: 1px solid #d3d3d3;";
	style += "left: 11px;";
	style += "top: 40px;";
	style += "width: " + "555" + "px;";
	style += "height: " + "333" + "px;";
	md .style =style;
    // 调用 blo0.blDiv 接口函数，创建 DIV，没有传入颜色参数。 
	var title = blo0.blDiv(md , "div_ID_4_I4C3" + "Header", "Header");
	style ="padding: 10px;";
	style += "z-index: 10;";
	style += "cursor: move;";
	style += "text-align: center;";
	style += "border: 1px solid #fff;";
	style += "background-color: #2196F3;";
	title.style =style;
 
    // 调用 blo0.blMakeDivMovable 接口函数，让 DIV 可拖动
    blo0.blMakeDivMovable(md ); 

	// 调用 blo0.blDiv 接口函数，创建 DIV。 
	md.v = blo0.blDiv(md,md.id+"v","v",blColor[0]);

	// 调用 blo0.blShowObj2Div 接口函数，显示一个对象到一个 DIV（md.v) 上。 
    blo0.blShowObj2Div(md.v, new _myJobClass);
    // 调用的全局接口函数 bl$,获取 id 为 “blrRunJS" 的 DOM对象（此处为按钮，点击此按钮）
    if(bl$("blrRunJS")){bl$("blrRunJS").click();} 
    // 调用的全局接口函数 bl$,获取 id 为 “blrRunJS" 的 DOM对象（此处为按钮，点击此按钮）
    if(bl$("blrTest1")){
		bl$("blrTest1").click();
		//bl$("blrTest1").click();
	} 
}
// 调用全局接口函数 _on_off_div，打开或关闭 DIV（此处为 md)
_on_off_div(this,md);
 


function _myJobClass(){       
	var lastPath= "";
	var sss = blo0.blURL();//"xd:";
	var pos = sss.search("issues");
	
	var pos = sss.search("issues");
	if(pos!=-1){
		lastPath = "c3/";
	}
	else{
		lastPath = "issues/4/c3/"
	}

    this.bll0=  "<div id = 'id_div_4__myJobClass' title = 'title: _myJobClass'> [" + lastPath + "] _myJobClass: v0.0. 24</div>";
 
	this.blrTest1 = function(b,d){
		if(!d.v){ 
			d.v = blo0.blDiv(d, "id_4_div_i4_c3_blrTest1","test1",blGrey[5]); 			
			blo0.blScript("id_4_js_i4_c3_blrTest1",lastPath + "blrTest1.js");
		}
		_on_off_div(b,d);	
		b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];     
	}
	this.blline = "----";
    this.blrRunJS = function(b,d){
		if(!d.v){
			d.parentElement.style.backgroundColor	 = blColor[3]; 

			// 调用 jsClass 的 blo0.blDiv 接口函数，创建 DIV。 
			d.v = blo0.blDiv(d,d.id+"v","",blGrey[5]);
			// 调用 jsClass 的 blo0.blTextarea 接口函数，创建 Textarea 
			d.v.ta = blo0.blTextarea(d.v,"id_4_ta_blrRunJS","alert(1);",blGrey[3]);
	        d.v.ta.style.width="95%"; 
	        d.v.ta.style.height="444"+"px"; 


			// 调用 jsClass 的 blo0.blDiv 接口函数，创建 DIV。 
			d.v1 = blo0.blDiv(d,d.id+"v1","",blGrey[5]);
			// 调用 jsClass 的 blo0.blBtn 接口函数，创建 button. 
			d.v.btnRun= blo0.blBtn(d.v1,d.v1.id+"btnRun","run;",blColor[4]);
			d.v.btnRun.onclick= function(){	  eval(d.v.ta.value);		}
				

			function _loadIssueComments(o) {
				var _i = 0;
				var _s = "<a target='_balnk' href ='";
				_s += "https://github.com/jeremyjia/Games/issues/21'";
				_s += ">issue#21</a>"; 
				
				_s += "<a target='_balnk' href ='";
				_s += "https://jeremyjia.github.io/Games/issues/21'";
				_s += ">page#21</a>"; 

				var _v = blo0.blDiv(d.v,d.v.id+"_v", _s, blGrey[1]);
				_v.bs = [];
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
			}
			var _src = "https://api.github.com/repos/jeremyjia/Games/issues/21/comments";
			w3.getHttpObject(_src, _loadIssueComments);	
        }

        // 调用全局接口函数 _on_off_div，打开或关闭 DIV（此处为 md)
		_on_off_div(b,d);		
		b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];                  
	}//this.blrRunJS
}
 