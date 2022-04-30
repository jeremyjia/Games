//i4c6
var idBtn = "btn_i4c6";
var s = "<button style='float:left;' id='"+idBtn+"'>sel2Move</button>";
s += "bv0.0.45 "; 
s += "<a target='_blank' href='https://github.com/jeremyjia/Games/edit/master/issues/4/c6.js'"
s += " style='color:blue;'";		s +=">"; s += "c6.js* ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c6.js'"
s += " style='color:green;'";		s +=">"; s += "c6.js ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c6Test.html'"
s += " style='color:brown;'";		s +=">"; s += "c6Test.html";

var md = blo0.blDiv(document.body, "div_ID_4_I4C6", s ,blGrey[0]);  
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
	md.style.left = "100px";
	md.style.top = "40px";

	md.v = blo0.blDiv(md,md.id+"v","v",blColor[0]);
	// 调用 jsClass 的 blo0.blShowObj2Div 接口函数，显示一个对象到 DIV（md.v) 上 
    blo0.blShowObj2Div(md.v, new _myMediaProcessClass);
	
    if(bl$("blrNewImage")){
		bl$("blrNewImage").click();
		bl$("blrNewImage").click();
	} 
    if(bl$("blrShowImage")){
		bl$("blrShowImage").click();
		bl$("blrShowImage").click();
	} 
    if(bl$("blrShowVideo")){
		bl$("blrShowVideo").click();
		bl$("blrShowVideo").click();
	} 
    if(bl$("blrShowAudio")){
		bl$("blrShowAudio").click();
		bl$("blrShowAudio").click();
	} 
}
_on_off_div(this,md);


function _myMediaProcessClass(){  
	      
    this.blrNewImage = function(b,d){
		if(!d.viewer){
			d.parentElement.style.backgroundColor = blColor[3]; 
			d.viewer = newCreateImgView(d);
        }
		_on_off_div(b,d);		
		b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];                  
	}//this.blrNewImage   
	this.bllNewImg = "";

    this.blrShowImage = function(b,d){
		if(!d.viewer){
			d.parentElement.style.backgroundColor = blColor[3]; 
			d.viewer = oldCreateImgView(d);
        }
		_on_off_div(b,d);		
		b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];                  
	}//this.blrShowImage

	this.blline = "...";
	this.blrShowVideo = function(b,d){
		if(!d.videoViewer){
			d.videoViewer = blo0.blDiv(d,"Show_Video_DivID","",blGrey[5]);
			if(!d.video){
			   d.video = document.createElement("video");
			}	  
			d.video.width = "640";
			d.video.height = "480";
			d.video.controls="controls"
            bl$("Show_Video_DivID").appendChild(d.video);
				 
			var _srcVideo = "https://api.github.com/repos/jeremyjia/Games/issues/442/comments";
			w3.getHttpObject(_srcVideo, function(o){
				var _index = 0;
				var _sInfo = "<a target='_balnk' href ='";
				_sInfo += "https://github.com/jeremyjia/Games/issues/442'";
				_sInfo += ">#442</a>"; 
				var _video = blo0.blDiv(d.videoViewer, d.videoViewer.id+"_video", _sInfo, blGrey[1]);
				var lsVideoBtn = [];
				for(id in o){
					_index++;
					var txt = o[id].body;
					var btn = blo0.blBtn(_video, _video.id+"btn"+_index, _index, blGrey[2]);
					//以下代码使用JS的闭包，保存住Comments中的视频链接
					btn.onclick = function(_txt,_thisVideoListBtn,_thisVideoBtn){
			              return function(){
							  d.video.src=_txt;
							  blo0.blMarkBtnInList(_thisVideoBtn,_thisVideoListBtn,"yellow","grey");
						    }
				    }(txt,lsVideoBtn,btn);
					lsVideoBtn.push(btn);
				}

			});	
        }
		_on_off_div(b, d);		
		b.style.background = b.style.background=="red"? blGrey[5]:blColor[4];                  
	}//this.blrShowVideo
	
	this.blline1 = "...";
	this.blrShowAudio = function(b,d){
		if(!d.audioViewer){
			d.parentElement.style.backgroundColor = blColor[3]; 
			d.audioViewer = blo0.blDiv(d,"Show_Audio_DivID","",blGrey[5]);
			if(!d.audio){
			   d.audio = document.createElement("audio");
			}	  
			d.audio.controls="controls";
            bl$("Show_Audio_DivID").appendChild(d.audio);
				
			
			var _src = "https://api.github.com/repos/jeremyjia/Games/issues/550/comments";
			w3.getHttpObject(_src, function _loadIssue550Comments(o) {
				var _i = 0;
				var _s = "<a target='_balnk' href ='";
				_s += "https://github.com/jeremyjia/Games/issues/550'";
				_s += ">#550</a>"; 
				var _v = blo0.blDiv(d.audioViewer,d.audioViewer.id+"_v", _s, blGrey[1]);
				var lsAudioBtn = [];
				for(i in o){
					_i++;
					var a = o[i].body;
					var btnJS = blo0.blBtn(_v, _v.id+"btnJS"+i,_i,blGrey[2]);
					btnJS.onclick = function(_txt,_thisAudioBtn,_thisAudioListBtn){
			              return function(){
							  d.audio.src=_txt;							  
							  blo0.blMarkBtnInList(_thisAudioBtn,_thisAudioListBtn,"yellow","grey");
						  }
				    }(a,btnJS,lsAudioBtn);
					lsAudioBtn.push(btnJS);
				}
			});	
        }
		_on_off_div(b,d);		
		b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];                  
	}//this.blrShowAudio

	function newCreateImgView(d){
		var mv = blo0.blMDiv(d,"new_Image_DivID","newImg",444,11,444,333,blGrey[5]);
		var tb = blo0.blDiv(mv,mv.id+"tb","tb","grey");
		var v = blo0.blDiv(mv,mv.id+"v","v","lightgrey");
		var btnReflash = blo0.blBtn(tb,tb.id+"reflash","reflash","brown");
		var btnAdd = blo0.blBtn(tb,tb.id+"btnAdd","add","green");
		var btnDel= blo0.blBtn(tb,tb.id+"btnDel","delete","gray");
		btnReflash.style.float = "left";
		btnAdd.style.float = "left";
		btnDel.style.float = "left";
		btnAdd.onclick = function(){			
			v.innerHTML = '<input type="file" id="fileInput">';      
      		var fileInput = document.querySelector('#fileInput');
			fileInput.onchange = function () {
				var file = this.files[0];
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function () {            
					console.log(reader.result);  
					v.innerHTML = "";
					
					var vImg = blo0.blDiv(v,v.id+"vImg","vImg","grey"); 
					var oImg = document.createElement("img");
					oImg.width = "444";
					oImg.height = "333";
					vImg.appendChild(oImg); 
					oImg.src = reader.result;  

					//*  
					addNewGitHubComment(46,reader.result,function(response){                            
						if (response.readyState == 4) {
							if (response.status == 200 || response.status == 201) {
								v.innerHTML = Date();
							} else {
								d.v.innerHTML = "Errors, status=" + response.status;
							}
						}
					}); 
					//*/
				};
			};
		}
		btnDel.onclick = function(){
			v.innerHTML = this.cid;
			deleteGitHubComment(this.cid,function(){});
		}

		btnReflash.onclick = function(){
			v.innerHTML = "";
			var vImg = blo0.blDiv(v,v.id+"vImg","vImg","grey"); 
			
			var _src = "https://api.github.com/repos/jeremyjia/Games/issues/46/comments";
			listGitHubComments(_src, function(o) {
				var lsImgBtn = [];
				for(i in o){ 
					var btnImg = blo0.blBtn(v,v.id+i,i,"grey");
					btnImg.onclick = function(_thisImgBtn,_i){
						return function(){ 
							vImg.innerHTML = "";
							var oImg = document.createElement("img");
							oImg.width = "444";
							oImg.height = "333";
							vImg.appendChild(oImg); 
							oImg.src = o[_i].body;  
							btnDel.cid = o[_i].id;
							blo0.blMarkBtnInList(_thisImgBtn,lsImgBtn,"yellow","grey");
						}
					}(btnImg,i)
					lsImgBtn.push(btnImg);
				}
			});	
		}
	}
	function oldCreateImgView(d){ 
		var _imgV = blo0.blMDiv(d,"Show_Image_DivID","img",333,1,444,333,blGrey[5]);
		if(!d.img){
			d.img = document.createElement("img");
		}	  
		d.img.width = "444";
		d.img.height = "333";
		bl$("Show_Image_DivID").appendChild(d.img); 
			
		
		var _src = "https://api.github.com/repos/jeremyjia/Games/issues/46/comments";
		w3.getHttpObject(_src, function _loadIssue46Comments(o) {
			var _i = 0;
			var _s = "<a target='_balnk' href ='";
			_s += "https://github.com/jeremyjia/Games/issues/46'";
			_s += ">#46</a>"; 
			var _v = blo0.blDiv(_imgV,_imgV.id+"_v", _s, blGrey[1]);
			var btnDel = blo0.blBtn(_v,_v.id+"del","del","brown");
			btnDel.onclick = function(){ 
				deleteGitHubComment(this.cid,function(){
					b.click();
				});
			}
			var lsImgBtn = [];
			for(i in o){
				_i++;
				var a = o[i].body;
				var btnJS = blo0.blBtn(_v, _v.id+"btnJS"+i,_i,blGrey[2]);
				btnJS.onclick = function(_txt,_thisImgBtn,_thisListImgBtn,_CImgs,_cImgIdx){
					return function(){
						d.img.src=_txt;	
						blo0.blMarkBtnInList(_thisImgBtn,_thisListImgBtn,"yellow","grey");
						btnDel.cid = _CImgs[_cImgIdx].id;
					}
				}(a,btnJS,lsImgBtn,o,i);
				lsImgBtn.push(btnJS);
			}
		});	

	}
}
 