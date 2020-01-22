//i4c6
var s = "v0.0.1"; 
s += "<a target='_blank' href='https://github.com/jeremyjia/Games/edit/master/issues/4/c6.js'"
s += " style='color:blue;'";		s +=">"; s += "c6.js* ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c6.js'"
s += " style='color:green;'";		s +=">"; s += "c6.js ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c6Test.html'"
s += " style='color:brown;'";		s +=">"; s += "c6Test.html";

var md = blo0.blDiv(document.body, "div_ID_4_I4C6", s ,blGrey[0]);  
if(!md.run){
    md.run = true; 
	var style ="position: absolute;";
	style += "z-index: 9;";
	style += "background-color: #f1f1f1;";
	style += "text-align: center;";
	style += "border: 1px solid #d3d3d3;";
	style += "left: 400px";
	style += "top: 40px";
	style += "width: 540px";
	md.style =style;

	var title = blo0.blDiv(md , "div_ID_4_I4C6" + "Header", "Header");
	style ="padding: 10px;";
	style += "z-index: 10;";
	style += "cursor: move;";
	style += "text-align: center;";
	style += "border: 1px solid #fff;";
	style += "background-color: #2196F3;";
	title.style =style;
 
    blo0.blMakeDivMovable(md );
	md.style.left = "400px";
	md.style.top = "40px";

	md.v = blo0.blDiv(md,md.id+"v","v",blColor[0]);
	// 调用 jsClass 的 blo0.blShowObj2Div 接口函数，显示一个对象到 DIV（md.v) 上 
    blo0.blShowObj2Div(md.v, new _myImageProcessClass);
    if(bl$("blrShowImage")){
		bl$("blrShowImage").click();
	} 
}
_on_off_div(this,md);


function _myImageProcessClass(){        
	this.blline = "";
    this.blrShowImage = function(b,d){
		if(!d.v){
			d.parentElement.style.backgroundColor = blColor[3]; 
			d.v = blo0.blDiv(d,"Show_Image_DivID","",blGrey[5]);
			if(!d.img){
			   d.img = document.createElement("img");
			}	  
			d.img.width = "640";
			d.img.height = "480";
            bl$("Show_Image_DivID").appendChild(d.img);
		    d.v.style.width="640"; 
	        d.v.style.height="480"; 
				
			function _loadIssue46Comments(o) {
				var _i = 0;
				var _s = "<a target='_balnk' href ='";
				_s += "https://github.com/jeremyjia/Games/issues/46'";
				_s += ">#46</a>"; 
				var _v = blo0.blDiv(d.v,d.v.id+"_v", _s, blGrey[1]);
				for(i in o){
					_i++;
					var a = o[i].body;
					var btnJS = blo0.blBtn(_v, _v.id+"btnJS"+i,_i,blGrey[2]);
					btnJS.onclick = function(_txt){
			              return function(){
							  d.img.src=_txt;
							  }
				        }(a);
				}
			}
			var _src = "https://api.github.com/repos/jeremyjia/Games/issues/46/comments";
			w3.getHttpObject(_src, _loadIssue46Comments);	
        }
		_on_off_div(b,d);		
		b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];                  
	}//this.blrShowImage
}
 