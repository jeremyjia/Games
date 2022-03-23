
// 视频切片播放文件拓展

var videocut = {
	options : {
		isJsLoad: false, // js是否加载完成
		fileUrl: 'https://file.ixzds.com/file', // 文件服务器地址
		arr : null, // [{domId: '', url: ''}]
		selector: null, // .videocut，元素中需要写上id，url
		onload: null
	}, 
 
	init : function(options) {
		var that = this;
		options = $.extend(this.options, options);
		var arr = options.arr;
		var selector = options.selector;
		
		if( !this.options.fileUrl){
			this.options.fileUrl = 'https://file.ixzds.com/file';
		}

		var urlArr = new Array();
		if( arr && arr.length > 0){
			var row, url, fileType;
			for (var i = 0, len = arr.length; i < len; i++) {
				row = arr[i];
				url = row.url;
				fileType = url.split("?")[0];
				fileType = fileType.substring( fileType.lastIndexOf(".") + 1);
				if( fileType != "m3u8" || url.indexOf("blob") == 0){
					continue;
				}

				var video = document.getElementById(row.domId);
				urlArr.push( {
					domId: row.domId,
					url: url,
					video: video
				});
			}
		}else if(selector){
			$(selector).each(function(){
				var id = this.id;
				var url = this.src;
				fileType = url.split("?")[0];
				fileType = fileType.substring( fileType.lastIndexOf(".") + 1);
				// 已经转化过的地址不需要再次转化
				if( fileType != "m3u8" || url.indexOf("blob") == 0){
					return true;
				}
				
				var video = document.getElementById(id);  
				urlArr.push( {
					domId: id,
					url: url,
					video: video
				});
			})
		}else{
			alert("参数未传入");
		}
		
		if( urlArr.length == 0){
			return;
		}
		
		if( this.isJsLoad){
			that.init2play( urlArr);
		}else{
			var count = 0;
			var jsArr = ["/ixzdscommon/videocut/hls.js", "/ixzdscommon/videocut/see.js"];
			for (var i = 0, len = jsArr.length; i < len; i++) {
				this.loadJs(jsArr[i], function(flag){
					if(!flag){
						return;
					}
					count++;
					if( count == 2){
						this.isJsLoad = true; 
						if( location.search.indexOf("zdc") != -1){
							var vConsole = new VConsole();
							setTimeout(function(){
								var msg = "";
								if(!Hls.isSupported()) {
									var time = new Date().getTime();
									var tip = getCookie("hlsNotSupportAlert");
									if( !tip || (time - tip) / 1000 / 60 / 60 / 24 >= 1){
										// 一天提示个一次就足够了
										setCookie("hlsNotSupportAlert", time);
										 msg = "error";
										// alert("您使用的浏览器不支持m3u8类型的视频播放，请使用谷歌浏览器或者小知大数的客户端软件");
									}
									// return;
								}
								that.init2play( urlArr);
							}, 1500);
						}else{
							setTimeout(function(){
								if(!Hls.isSupported()) {
									var time = new Date().getTime();
									var tip = getCookie("hlsNotSupportAlert");
									if( !tip || (time - tip) / 1000 / 60 / 60 / 24 >= 1){
										// 一天提示个一次就足够了
										setCookie("hlsNotSupportAlert", time);
										alert("您使用的浏览器不支持m3u8类型的视频播放，请使用谷歌浏览器或者小知大数的客户端软件");
									}
									// return;
								}
								
								that.init2play( urlArr);
							}, 1300);
						}
					}
				});
			}
		}
	},
	
	loadJs : function( url, cball) {
		var row;
		var sList = document.getElementsByTagName('script');
		for ( var i in sList) {
			row = sList[i];
			if ( row.src && row.src.indexOf(url) > -1 && cball) {
				cball(true);
				console.log("alr load")
				return ;
			}
		}
		
	    var script = document.createElement("script");
	    script.type = "text/javascript";
	    if (script.readyState){ // IE
	        script.onreadystatechange = function(){
	            if (script.readyState == "loaded" || script.readyState == "complete"){
	                script.onreadystatechange = null;
	                if(cball){
	    				console.log("alr load 1")
	                	cball(true);
	                }
	            }
	        };
	    } else { // Others
	        script.onload = function(){
	            if(cball){
					console.log("alr load 2")
	            	cball(true);
	            }
	        };
	    }
	    
	    // 文件不存在
	    script.onerror = function(){
	     	if(cball){
	        	cball(false);
	        }
	    }
	    
	    script.src = url;
	    document.getElementsByTagName("head")[0].appendChild(script);
	},
	
	init2play : function(urlArr) {
		if(!urlArr || urlArr.length == 0){
			return;
		}
		var len = urlArr.length;
		var params= {
			opType : 'getToken',
			num : len
		}
		var fileUrl = this.options.fileUrl;
		console.error("fileUrl", fileUrl);
		$.ajax({  
			async : false,  
			cache: false,  
			type: 'POST',
			dataType : "text",  
			url: fileUrl + "/f08b8356ab03437da21p",
			data: params,
			error: function(xhr,status,error) {
				if( location.search.indexOf("zdc") != -1){
				}else{
					alert( "m3u8视频读取失败，请尝试重启软件，还不行请联系管理员");
				}
				console.error("xhr", xhr);
				console.error("status", status);
				console.error("error", error);
			},
			success: function( tokens) {
				var tokenArr = tokens.split(",");
				var tokenLen = tokenArr.length;
				var row;
				for (var i = 0, len = urlArr.length; i < len; i++) {
					if( tokenLen <= i){
						//没有token，播个锤子
						break;
					}
					row = urlArr[i];
					var url = row.url;
					if( url.indexOf("?") == -1){
						url += '?';
					}
					url += '&tmp=' + new Date().getTime() + "&token=" + tokenArr[i] + "&fileUrl=" + encodeURIComponent(fileUrl);
					var hls = new Hls();
					hls.loadSource(url, tokenArr[i]);
					hls.attachMedia(row.video);
					hls.on(Hls.Events.MANIFEST_PARSED, function() {
						console.log("hls_ext");
						//video.play();
					});
					
					hls.on(Hls.Events.ERROR, function(event, data){
						console.log(event, data);
						// 监听出错事件
						console.log("加载失败");
					});
				}
			} 
		});
	}
}
