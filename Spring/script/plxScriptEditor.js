const tag = "[plxScriptEditor.js_v0.0.312]";
var d = bl$( "id_mdiv_plx_script_editor" );
d.tb = blo0.blDiv(d, d.id + "tb", tag, blGrey[0]);

d.tb.btnScriptEditor 		= blo0.blBtn(d.tb, d.tb.id+ "btnScriptEditor", "scriptEditor", blGrey[2]); 
d.tb.btnScriptEditor.style.float = "left";
d.tb.btnServer 		= blo0.blBtn(d.tb, d.tb.id+ "btnServer", "server", blGrey[2]); 
d.tb.btnServer.style.float = "left";
d.tb.b3_upload 		= blo0.blBtn(d.tb, d.tb.id+ "b3", "uploadFile", blGrey[2]);  
d.tb.b3_upload.style.float = "left";
d.tb.b4_uploadJson 	= blo0.blBtn(d.tb, d.tb.id+ "b4", "uploadJson", blGrey[2]); 
d.tb.b4_uploadJson.style.float = "left";
 
d.tb.btnScriptEditor.onclick = function(){
	if(!d.v0){
		d.v0 = blo0.blDiv(d, d.id + "v0", "v0", blGrey[1]);
		var btnV1 = blo0.blBtn(d.v0, d.v0.id+ "b1", "gh.V1", blGrey[2]);
		var btnV2 = blo0.blBtn(d.v0, d.v0.id+ "b2", "gh.V2", blGrey[2]);
		var btnV3 = blo0.blBtn(d.v0, d.v0.id+ "b3", "lh.V1", blGrey[2]);
		var btnV4 = blo0.blBtn(d.v0, d.v0.id+ "b4", "lh.V2", blGrey[2]);
		var btnPlx1 = blo0.blBtn(d.v0, d.v0.id+ "b5", "plx1", blGrey[2]);
		var btnPlx2 = blo0.blBtn(d.v0, d.v0.id+ "b6", "plx2", blGrey[2]);
		var v = blo0.blDiv(d.v0, d.v0.id + "v", "", blGrey[1]); 
		var ta = blo0.blTextarea(v, "id_ta_4_script_editor" , "xd", blGrey[2]);  
		ta.style.width = "98%";
		ta.style.height = "300px";

		var _loadUrl_2_Ta =  function(_ta,_url){
			var w = {};	w._2do = function(txt){				_ta.value = txt;			}
			blo0.blAjx(w, _url );
		}	
		btnV1.onclick = function(){ _loadUrl_2_Ta (ta,"https://littleflute.github.io/J2EE/Spring/script/v1.json");		}
		btnV2.onclick = function(){ _loadUrl_2_Ta (ta,"https://littleflute.github.io/J2EE/Spring/script/v2.json");	}	
		btnV3.onclick = function(){ _loadUrl_2_Ta (ta,"http://localhost:8080/v1.json");		}
		btnV4.onclick = function(){ _loadUrl_2_Ta (ta,"http://localhost:8080/v2.json");	}
		btnPlx1.onclick = function(){
			if(!btnPlx1.v)
			{
				btnPlx1.v = blo0.blMDiv(d.v0,"id_div_4_Plx1","plx1.v0.14",200,120,800,600,blGrey[0]);
				//blo0.blScript( "id_js_plx1_script_editor" ,"plx1.js");
				var w = {};	w._2do = function(txt){		eval(txt);}
				blo0.blAjx(w, "plx1.js" );
			} 
			_on_off_div(this,btnPlx1.v);
			var b=this; b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];   
		}			 
		btnPlx2.onclick = function(){ 
				if(!this.player){
					var sss = '<video id="vPlayer" width="180" height="1" controls>';
					sss+= '<source src="1.mp3" type="video/mp4">';
					sss+='Your browser does not support HTML5 video. '
					sss+='</video>';
					this.vPlayer = blo0.blDiv(this.parentElement,this.parentElement.id+"vPlayer",sss,"lightblue");
				}

				var v = blo0.frameMD();
				var b = this;
				_on_off_div(b,v);
				b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];   
		}
	}
	_on_off_div(this,d.v0);
	var b=this; b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];      
}

d.tb.btnServer.onclick = function(){
	if(!d.v2){
		d.v2 = blo0.blDiv(d, d.id + "v2", "jsonFiles", blGrey[1]); 
		var btnJSONF = blo0.blBtn(d.v2, d.v2.id+ "btnJSONF", "getAllJsonFiles", blGrey[2]);
		var btnMp3F = blo0.blBtn(d.v2, d.v2.id+ "btnMp3F", "getAllMp3Files", blGrey[2]);
		var btnExeCmd = blo0.blBtn(d.v2, d.v2.id+ "btnExeCmd", "ExeCmd", blGrey[2]);
		var v = blo0.blDiv(d.v2, d.v2.id + "v", "v", blGrey[5]); 	
		var v0 = blo0.blDiv(v, v.id + "v0", "v0", blGrey[0]);  
		var v1 = blo0.blDiv(v, v.id + "v1", "v1", blGrey[1]);	
		var v2 = blo0.blDiv(v, v.id + "v2", "v2", blGrey[2]);  
	
		btnJSONF.onclick = function(){ 
			var c = new CClient();
			c.getJSFiles(v0,v1,v2);			
		}
		btnMp3F.onclick = function(){ 
			var c = new CClient();
			c.getMp3Files(v0,v1,v2);			
		}
		btnExeCmd.onclick = function(){ 
			var c = new CClient();
			c.exeCmd(v0,v1,v2);			
		}
	}
	_on_off_div(this,d.v2);
	var b=this; b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];      
}

d.tb.b3_upload.onclick = function(){
	if(!d.v3){
		d.v3 = blo0.blDiv(d, d.id + "v3", "v3", blGrey[1]); 
		var b1 = blo0.blBtn(d.v3, d.v3.id+ "b1", "b1", blGrey[2]);
		var v = blo0.blDiv(d.v3, d.v3.id + "v", "v", blGrey[1]); 		 
	
		b1.onclick = function(){ 
			var w = {};
			w._2do = function(txt){ v.innerHTML = txt;}
			blo0.blAjx(w, "http://localhost:8080/uploadpage" );
		}
	}
	_on_off_div(this,d.v3);
	var b=this; b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];      
}
d.tb.b4_uploadJson.onclick = function(){
	if(!d.v4){
		d.v4 = blo0.blDiv(d, d.id + "v4", "v4", blGrey[1]); 
		var b1 = blo0.blBtn(d.v4, d.v4.id+ "b1", "b1", blGrey[2]);
		var v = blo0.blDiv(d.v4, d.v4.id + "v", "v", blGrey[1]); 		 
	
		b1.onclick = function(){ 
			var data = bl$("id_ta_4_script_editor" ).value;
			var xhr = new XMLHttpRequest();
			xhr.withCredentials = true;
			xhr.addEventListener("readystatechange", function() {
			  if(this.readyState === 4) {
			    v.innerHTML = this.responseText;
			  }	
			});
			xhr.open("POST", "http://localhost:8080/json?fileName=v3.json");
			xhr.setRequestHeader("Content-Type", "text/plain");
			xhr.send(data);
		}
	}
	_on_off_div(this,d.v4);
	var b=this; b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];      
}
