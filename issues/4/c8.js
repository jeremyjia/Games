//i4c8
var s = "v0.0.16 ";
s += "<a target='_blank' href='https://github.com/jeremyjia/Games/edit/master/issues/4/c8.js'"
s += " style='color:blue;'"; s += ">"; s += "c8.js* ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c8.js'"
s += " style='color:green;'"; s += ">"; s += "c8.js ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/4/c8.html'"
s += " style='color:brown;'"; s += ">"; s += "c8Test.html"; s+="</a>";
s += " <button id='id_div_4_logCmd'>+viewLog</button>"

var md = blo0.blDiv(document.body, "div_ID_4_I4C8", s, blGrey[0]);
if (!md.run) {
	md.run = true;
	var style = "position: absolute;";
	style += "z-index: 9;";
	style += "background-color: #f1f1f1;";
	style += "text-align: center;";
	style += "border: 1px solid #d3d3d3;";
	style += "left: 400px";
	style += "top: 40px";
	style += "width: 540px";
	md.style = style;

	var title = blo0.blDiv(md, "div_ID_4_I4C8" + "Header", "Header");
	style = "padding: 10px;";
	style += "z-index: 10;";
	style += "cursor: move;";
	style += "text-align: center;";
	style += "border: 1px solid #fff;";
	style += "background-color: #2196F3;";
	title.style = style;

	blo0.blMakeDivMovable(md);
	md.style.left = "400px";
	md.style.top = "40px";

	md.v = blo0.blDiv(md, md.id + "v101", "v101", blColor[0]);
	// 调用 jsClass 的 blo0.blShowObj2Div 接口函数，显示一个对象到 DIV（md.v) 上 
	blo0.blShowObj2Div(md.v, new _myTaskProcessClass);
	if (bl$("blrVideoEditor")) {
		bl$("blrVideoEditor").click();
	}

	bl$("id_div_4_logCmd").onclick = function(){
		var b = this;
		if(!this.logCmd){
		  b.logCmd = blo0.blMDiv(md, md.id + "logCmd","log",520,-50,330,50,blGrey[0]);
		  b.logCmd.v = blo0.blDiv(b.logCmd,  "id_div_4_c8_logView" ,blGrey[5]);
		  b.logCmd.ta = blo0.blTextarea(b.logCmd.v, "id_4_ta_logTextArea", "log...", blGrey[3]);
		  b.logCmd.ta.style.width = "95%";
		  b.logCmd.ta.style.height = "300" + "px";
 

		  if(!this.t){
			var i = 0;
			this.t =  blo0.blTimer(1000,60*60,function(nLeft){
			  i++;  
			  function _loadIssue760CommentOfDoc(s) {
				b.logCmd.ta.value = "nLeft=" + nLeft + " " + "i="+i + " \n " + s;
			  }
			  getStringComment(1139435588, _loadIssue760CommentOfDoc);
			  //b.logCmd.ta.value = "nLeft=" + nLeft + " " + "i="+i;    
			});
		 }
		 else{
			  this.t.stop();
			  this.t = null;
			  b.logCmd.ta.value = 0;   
		 } 

		  b.style.background = blColor[4];
		  _on_off_div(this,this.logCmd);	  
		}else{
		  _on_off_div(this,this.logCmd);
		  b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];   
		}
	  }
}
_on_off_div(this, md);


function _myTaskProcessClass() {
	this.blrVideoEditor = function (b, d) {
		if (!d.v) {
			d.parentElement.style.backgroundColor = blColor[3];

			// 调用 jsClass 的 blo0.blDiv 接口函数，创建 DIV。 
			d.v = blo0.blDiv(d, d.id + "v", "", blGrey[5]);
			// 调用 jsClass 的 blo0.blTextarea 接口函数，创建 Textarea 
			d.v.ta = blo0.blTextarea(d.v, "id_4_ta_blrVideoEditor", "{}", blGrey[3]);
			d.v.ta.style.width = "95%";
			d.v.ta.style.height = "300" + "px";
			// 调用 jsClass 的 blo0.blDiv 接口函数，创建 DIV。 
			d.v1 = blo0.blDiv(d, d.id + "v1", "", blGrey[5]);
			// 调用 jsClass 的 blo0.blBtn 接口函数，创建 button. 
			d.v.btnReadVideoDoc = blo0.blBtn(d.v1, d.v1.id + "btnReadVideoDoc", "ReadVideoDoc", blColor[4]);
			d.v.btnReadVideoDoc.onclick = function () {
				function _loadIssue451CommentOfDoc(o) {
					if(o.indexOf("http") == 0) { 
						d.v.ta.value = o;
					}else if(o.indexOf("{") == 0){
						var jsonDocObj = JSON.parse(o);
						d.v.ta.value = JSON.stringify(jsonDocObj);
					}
				}
				getStringComment(939612362, _loadIssue451CommentOfDoc);
			}

			d.v.btnServer = blo0.blBtn(d.v1, d.v1.id + "btnServer", "QueryServer", blColor[4]);
			d.v.btnServer.onclick = function () {
				function _loadIssue451CommentOfServer(o) {
					alert(JSON.stringify(o));
					var serverObj = o.servers;
					var isRunning = false;
					for(var j in serverObj){
					  if(serverObj[j].isLogin == true){
						 isRunning = true;
					  }
					}
					if (isRunning == true) {
						d.v.btnDoTask.disabled = false;
					} else {
						d.v.btnDoTask.disabled = true;
					}
				}
				getGitHubComment(1287654931, _loadIssue451CommentOfServer);//old is 939628092

			}

			d.v.btnDoTask = blo0.blBtn(d.v1, d.v1.id + "btnDoTask", "MakeVideo", blColor[4]);
			d.v.btnDoTask.disabled = true;
			d.v.btnDoTask.onclick = function () {
				function _loadIssue451CommentOfRq(o) {
					var rq = o.rq;
					if (rq == 2) {
						alert("Server is busy!");
						return;
					} else {
						var strDoc = d.v.ta.value;
						if(strDoc.indexOf("{") == 0){
							var docObj = JSON.parse(d.v.ta.value);
							strDoc = JSON.stringify(docObj);
							d.v.ta.value = strDoc;
						}
						updateCommentOnGitHub(939612362, strDoc, CBUpdateVideoDoc);
						function CBUpdateVideoDoc(response) {
							if (response.readyState == 4) {
								if (response.status == 200 || response.status == 201) {
									var jsonAll = {
										"rq": 1
									};
									var jsondata = JSON.stringify(jsonAll);
									updateCommentOnGitHub(939645512, jsondata, function (response) {
									});
									alert("Done for sending request to server!");
								} else {
									alert("Errors, status=" + response.status);
								}
							}
						}
					}
				}
				getGitHubComment(939645512, _loadIssue451CommentOfRq);
			}
		}

		// 调用全局接口函数 _on_off_div，打开或关闭 DIV（此处为 md)
		_on_off_div(b, d);
		b.style.background = b.style.background == "red" ? blGrey[5] : blColor[4];
	}//this.blrVideoEditor

	this.blline = "----------------";
	this.blrShowVideo = function (b, d) {
		d.parentElement.style.backgroundColor = blColor[3];
		if (!d.videoViewer) {
			d.videoViewer = blo0.blDiv(d, "Show_Video_DivID01", "", blGrey[5]);
			if (!d.video) {
				d.video = document.createElement("video");
			}
			d.video.width = "640";
			d.video.height = "480";
			d.video.controls = "controls"
			bl$("Show_Video_DivID01").appendChild(d.video);

			d.v2 = blo0.blDiv(d, d.id + "v2", "", blGrey[5]);
			d.videoViewer.btnRefresh = blo0.blBtn(d.v2, d.v2.id + "btnRefresh", "Refresh", blColor[4]);
			d.videoViewer.btnRefresh.onclick = function () {
				function _loadIssue451CommentOfData(o) {
					var based64_txt = o;
					//var blob = dataURLtoBlob(based64_txt);
                    //var file = blobToFile(blob, "videoName");
					d.video.src = based64_txt;
				}
				//getStringComment(939443982, _loadIssue451CommentOfData);
				getAllCommentOfOneIssue(743, _loadIssue451CommentOfData);
			}

		}
		_on_off_div(b, d);
		b.style.background = b.style.background == "red" ? blGrey[5] : blColor[4];
	}//this.blrShowVideo
}

function updateCommentOnGitHub(commentId, jsonAll, userCallBack) {
	var url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/" + commentId;
	var bodyData = jsonAll;//JSON.stringify(jsonAll);
	var data = {
		"body": bodyData
	};

	myAjaxCmd('PATCH', url, data, function (res) {
		userCallBack(res);
	});
}

function getStringComment(commentId, CBFunObj) {
	var url = "https://api.github.com/repos/jeremyjia/Games/issues/comments/" + commentId;
	myAjaxCmd('GET', url, null, usercallback);

	function usercallback(response) {
		if (response.readyState == 4) {
			if (response.status == 200 || response.status == 201) {
				var msgObj = JSON.parse(response.responseText);
				if (msgObj.body != null && msgObj.body != "") {
					CBFunObj(msgObj.body);
				}
			} else {
				alert("Network error！" + response.status);
			}
		}
	}
}

function getAllCommentOfOneIssue(issueId, CBFunObj) {
	var url = "https://api.github.com/repos/jeremyjia/Games/issues/"+issueId+"/comments?per_page=100";
	myAjaxCmd('GET', url, null, usercallback);

	function usercallback(response) {
		if (response.readyState == 4) {
			if (response.status == 200 || response.status == 201) {
				var msgObj = JSON.parse(response.responseText);
				var all="";
				var count=0;
				for(i in msgObj){
					all += msgObj[i].body;
					count++
				}
				if (all != null && all != "") {
					//alert(count);
					CBFunObj(all);
				}
			} else {
				alert("Network error！" + response.status);
			}
		}
	}
}

//将base64转换为blob
function  dataURLtoBlob(dataurl) { 
	var arr = dataurl.split(',');
	alert(arr[0]);
		var mime = "base64";
		var bstr = atob(arr[1]);
		var n = bstr.length;
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], { type: mime });
}
//将blob转换为file
function blobToFile(theBlob, fileName){
   theBlob.lastModifiedDate = new Date();
   theBlob.name = fileName;
   return URL.createObjectURL(theBlob);
}
