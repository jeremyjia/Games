var file_server_url = "";
var abcUrl = typeof C == 'undefined' || typeof C.ABC_URL == 'undefined' ? '' : C.ABC_URL.split("?")[0];
(function(){
	req(abcUrl + "/abc/fileserver.json", {}, function(data){
		window.file_server_url = data.fileserver;
	})
})();


function req( url, data, success, fail){
	$.ajax({
		type : "POST",
		url : url,
		data : data,
		async : false,
		dataType : "json",
		success : success,
		error:  function(xhr,status,error) {// 请求失败处理函数
			console.log(error)
			return typeof fail == 'function' && fail();
        }
	})
}

//mfdata必需是json对象，如果是字符串，要用JSON.parse(mfdata);
function save(id, data, cb){
	if(!data){
		return;
	}
	var url = abcUrl + "/abc/updateAbcInfo?time=" + new Date().getTime();
	req(url,{
		"abc_attachid" : id,
		"mfdesc" : JSON.stringify(data)
	}, function(data){
		return typeof cb == 'function' && cb(data);
	})
}

//根據attachid取得mp3的小節線数据
function getAttachInfo( attachid, cb ) {
	var url = file_server_url + "/view/" + attachid;
	console.log(url)
	req(url,{}, function(data){
		return typeof cb == 'function' && cb( data);
//		if(data[attachid] && data[attachid].length){
//		}else{
//			alert('音频文件不存在');
//		}
	})
}

/**
 * {
 * 		"id":"1f0a86d775287ddf653c6145bfce490d",
 * 		"pid":"0",
 * 		"fieldname":"A",
 * 		"starttime":"0.00",
 * 		"endtime":"4.0",
 * 		"fielddesc":"mwpw",
 * }
 */
var depth = 1;
// 将数据转为树形结构
function data2tree( arr){
	var resArr = [];
	var childMap = {}, mfMap = {}
	for(var i = 0; i < arr.length; i++){
		var po = arr[i];
		var id = po.id, pid = po.pid;
		
		var jsonArr = childMap[pid];
		if (jsonArr == null) {
			jsonArr = [];
			childMap[pid] = jsonArr;
		}
		jsonArr.push(po);
		mfMap[id] = po;
	}
	
	// 父节点不存在的节点就是顶级节点
	var topList = [];
	for(var i = 0; i < arr.length; i++){
		var item = arr[i];
		if(!mfMap[item.pid]){
			topList.push(item);
		}
	}
	
	// 构建树形结构
	for(var i = 0; i < topList.length; i++){
		var item = topList[i];
		item = getChild(item, childMap);
		resArr.push(item);
	}
	
	return resArr;
	
}

function getChild(item, childMap){
	var childArr = childMap[item.id];
	if (childArr != null) {
		depth ++;
		for (var i = 0; i < childArr.length; i++) {
			var json = childArr[i];
			getChild(json, childMap);
		}
		item["children"] = childArr;
	}
	return item;
}


// 构建时间片段数据
function buildRegionData(that, starttime, endtime){
//	1.1、判断是否被包含在时间片段内，若是则以当前时间片段作为父级片段，反之为父级时间片段（pid:0）
//	1.2、排序号:以父级排序号开始+001，表第一个子节点，以此类推往后累加
	var musicFormList = that.musicFormList;
	//var arr = musicFormList.filter(item => starttime >= item.starttime && endtime <= item.endtime);
	// 开始时间在谁的范围内就是谁的子级
	var arr = musicFormList.filter(item => starttime >= item.starttime && starttime < item.endtime);
	console.log('buildRegionData--arr--', arr);
	
	// 取当前最小时间片段作为父级
	var arr2order = arr.sort((a, b)=>{
		return (a.endtime - a.starttime) - (b.endtime - b.starttime);
	});
	
	// 特殊情况，父级和子级的时间片段一致时，找到挂靠的子级
	arr2order = arr2order.sort((a, b)=>{
		return (b.orderby + '').length - (a.orderby + '').length;
	});
	console.log('buildRegionData--arr2order--', arr2order);
	
	//debugger;
	var po = arr2order[0];
	// 判断如果超过父级的结束时间那么就取父级的结束时间
	if(po && endtime > po.endtime){
		that.currRegion.endtime = endtime = po.endtime;
		// 切换当前的wave区域的结束时间 也要改变
	}
	console.log('buildRegionData--po--', po);
	
	//console.log(po)
	var data = {};
	data.id = that.currRegion.id;
	data.starttime = starttime;
	data.endtime = endtime;
	data.bgcolor = '';
	data.fieldname = '';
	data.fielddesc = '';
	var str = '000';
	if(po){
		var tmpArr = musicFormList.filter(item => new RegExp( po.orderby + '\\d{1,}','g').test(item.orderby));
		var order = (tmpArr.length + 1 ) + '';
		data.pid = po.id;
		data.orderby = po.orderby + '' + str.slice(0, str.length - order.length) + '' + order;
	}else{
		data.pid = 0;
		var tmpArr = musicFormList.filter(item => new RegExp('^\\d{3}$','g').test(item.orderby));
		var order = (tmpArr.length + 1 ) + '';
		data.orderby =  str.slice(0, str.length - order.length) + '' + order;
	}
	return data;
}

function getMinPoByJsonArr(arr){
	 var list = new Array();
     for(var i in arr){
    	 list.push(arr[i].endtime - arr[i].starttime);
     }
     list.sort(function(a,b){
    	 return a - b;
     })
    return list[list.length-1];
}

/**
 * 获取URL中的参数
 * 
 * @returns json
 */
function getUrlParamJson(url, isDecode) {
	var result = {};
	// 去除'#'hash后面的部分
	if(!url || url == undefined){
		url = document.URL.split('#')[0];
	}
	if( url.indexOf("?") == -1){
		return result;
	}
	if( url.substring(url.length - 1) == "#"){
		url = url.substring(0, url.length - 1);
	}
	
	url = url.substring((url.indexOf("?") != -1) ? (url.indexOf("?") + 1) : 0);
	var urlArr = url.split("&");
	for (var i = 0; i < urlArr.length; i++) {
		var arr = urlArr[i].split("=");
		result[arr[0]] = isDecode ? decodeURIComponent( arr[1]) : arr[1]; 
	}
	return result;
}

/**
 * 复制对象
 * 
 * @param obj
 * @returns
 */
function clone(obj){
	if(!obj){
		return obj;
	}
	return JSON.parse(JSON.stringify(obj));
}

/**
 * 复制JSON
 * @param source
 * @param target
 * @param isKeyInTarget
 * @param passColumns 无需复制的属性，多个属性名称以“,”隔开
 * @returns
 */
function copyJson(source, target, isKeyInTarget, passColumns) {
	if (!source ) {
		return target;
	}
	if( !target){
		target = {};
	}
	
	for ( var key in source) {
		if(passColumns && passColumns.indexOf(key) > -1){
			continue;
		}
		if( isKeyInTarget && isKeyInTarget != undefined && (target[key] == undefined || target[key] === '')){
			continue;
		}
		var cvalue = source[key];
		if(isJson( cvalue)){
			if( cvalue.length != undefined){
				// 数组
				var newArr = new Array();
				for (var i = 0; i < cvalue.length; i++) {
					newArr.push(copyJson(cvalue[i]));
				}
				target[key] = newArr;
			}else{
				target[key] = copyJson( cvalue);
			}
		}else{
			target[key] = cvalue;
		}
	}
	return target;
}

/**
 * 是否是json数据
 * 
 * @param str
 * @returns
 */
function isJson(str) {  
    try {  
        if (typeof str == "object") {  
            return true;  
        }  
    } catch(e) {  
    }  
    return false;  
}


function bindTableEvent(){
	// 绑定表格事件
	$('.table-tr').off('click').on('click',function(){
		clearAllState();
		
		$(this).addClass('active');
		var id = $(this).attr('data-tr-id');
		$('#regions_' + id).addClass('active');
		content.currRegion = content.regionMap[id];
		content.regionMap[id] && content.regionMap[id].update({ color: 'rgba(255, 181, 59, .1)' });		
		content.selTrIndex = $(this).attr('data-index');
		// 选中表格行时，定位到频谱相应的位置
		var v = content.wavesurfer.getVolume();
		content.wavesurfer.setVolume(0);
		content.wavesurfer.play(content.currRegion.start,content.currRegion.end);	
		setTimeout(function(){
			content.wavesurfer.stop();
			content.wavesurfer.setVolume(v);
		},100)
	}).off('dblclick').on('dblclick',function(){
		
		var id = $(this).attr('data-tr-id');
		
		// 弹出编辑框
		content.isPop = true;
		content.cmd = 'U';
		
		var po = content.musicFormList.find(function(item){
			return  id == item.id ;
		})
		content.musicForm = clone(po);
		
		if(po && po.groupid){
			var groupIds = content.fileUpload.fileData.groupid = po.groupid;
			(function(gId, that){
				getFile(gId, function(arr) {
					var files = arr[gId];
					for (var i = 0; i < files.length; i++) {
						that.fileUpload.showFiles.push(files[i]);
					}
					Vue.nextTick(function(){
						if(content.fileUpload.showFiles.length == 0){
							$('.upload-add').show();
						}
					})
				});
			})(groupIds, content);
		}else{
			content.musicForm.groupid = content.fileUpload.fileData.groupid = uuid();
			Vue.nextTick(function(){
				if(content.fileUpload.showFiles.length == 0){
					$('.upload-add').show();
				}
			})
		}
	})
	
	// 时间块的点击事件
	$('.regions-item').off('click').on('click',function(){
		clearAllState();
		$(this).addClass('active');
		
		var id = $(this).attr('id').replace('regions_', '');
		$('[data-tr-id="' + id + '"]').addClass('active');
		content.currRegion = content.regionMap[id];
		content.regionMap[id] && content.regionMap[id].update({ color: 'rgba(255, 181, 59, .1)' });
		content.selTrIndex = $('[data-tr-id="' + id + '"]').attr('data-index');
		return false;
	}).off('dblclick').on('dblclick',function(){
		
		var id = $(this).attr('id').replace('regions_', '');
		
		// 弹出编辑框
		content.isPop = true;
		content.cmd = 'U';
		
		var po = content.musicFormList.find(function(item){
			return  id == item.id ;
		})
		content.musicForm = clone(po);
		if(po && po.groupid){
			var groupIds = content.fileUpload.fileData.groupid = po.groupid;
			(function(gId, that){
				getFile(gId, function(arr) {
					var files = arr[gId];
					for (var i = 0; i < files.length; i++) {
						that.fileUpload.showFiles.push(files[i]);
					}
					Vue.nextTick(function(){
						if(content.fileUpload.showFiles.length == 0){
							$('.upload-add').show();
						}
					})
				});
			})(groupIds, content);
		}else{
			content.musicForm.groupid = content.fileUpload.fileData.groupid = uuid();
			Vue.nextTick(function(){
				if(content.fileUpload.showFiles.length == 0){
					$('.upload-add').show();
				}
			})
		}
	})
}


function clearAllState(){
	$('.active').removeClass('active');
	$('.table-tr').each(function(){
		if(!$(this).hasClass('active')){
			var id = $(this).attr('data-tr-id');
			content.regionMap[id] && content.regionMap[id].update({ color: 'rgba(229, 0, 18, .1)' });
		}
	})
}

/**
 * 构建平台URL地址
 * 
 * @param url
 * @returns
 */
function buildPlatUrl(url) {
	if (url && url.indexOf("http") == 0 && url.indexOf(location.protocol) == -1) {
		return location.protocol + "//" + url.split("://")[1];
	}
	return url;
}
function getFile(groupid, callback) {
	// C.FILE_VIEW_URL = 'http://file.ixzds.com/file/view/';
	var url = file_server_url + "/view/" + groupid;
	req(url,{}, function(res) {
		if (res) {
			if (res['ATTACHURL']) {
				// 返回的是json字符串
				res['ATTACHURL'] = buildPlatUrl(res['ATTACHURL']);
			} else {
				// 返回的是json数组
				var ids = groupid.split(",");
				for (var i = 0; i < ids.length; i++) {
					var files = res[ids[i]];
					if (files && files.length > 0) {
						for (var j = 0; j < files.length; j++) {
							files[j].ATTACHURL = buildPlatUrl(files[j].ATTACHURL);
						}
					}
					res[ids[i]] = files;
				}
			}
		}

		callback(res);
	});
}

/**
 * 将groupid转成对应的图片
 * 
 * @param rows
 *            数组
 * @param column
 *            字段名
 * @param def
 *            默认图路径
 * @returns
 */
function groupid2img(rows, column, def, params, cball) {
	if (rows.length == 0) {
		return;
	}
	var groupid = '';
	var row;
	for (var i = 0; i < rows.length; i++) {
		row = rows[i];
		var cvalue = row[column];
		if (cvalue != undefined && cvalue.indexOf("/") == -1) {
			groupid += "," + cvalue;
		}
	}

	var fileType = params ? params.fileType : "";
	var valiUrl = params ? params.valiUrl : "";
	if (groupid.length > 0) {
		groupid = groupid.substring(1);
		getFile(groupid, function(arr) {
			for (var i = 0; i < rows.length; i++) {
				row = rows[i];
				var cvalue = row[column];
				if (cvalue == undefined || !cvalue) {
					row[column] = def;
					continue;
				}
				if (cvalue.indexOf("/") != -1) {
					continue;
				}

				var files = arr[cvalue];
				if (files == undefined || files.length == 0) {
					row[column] = def;
				} else {
					if (fileType) {
						fileType = fileType.toUpperCase();
						for (var j = 0; j < files.length; j++) {
							if (files[j].FILETYPE.toUpperCase() == fileType) {
								row[column] = files[j].ATTACHURL;
							}
						}
					} else {
						row[column] = files[0].ATTACHURL;
					}
				}
			}

			// 如果有配置了默认 图片，注意是图片，那么就算参数valiUrl未配置，那么也会去检验地址是否正确
			if (def && (valiUrl || /\.(jpeg|jpe|jpg|gif|png|bmp|webp)$/i.test(def))) {
				urlValidate(rows, column, def);
			}

			if (cball) {
				cball(true);
			}
		});
	} else {
		if (cball) {
			cball(false);
		}
	}
}

/**
 * 获取文件上传参数
 * 
 * @returns
 */
function getFileData() {

	return {
		fileUrl : file_server_url + "/upload", // 文件服务器上传地址
		showFiles : [], // 上传文件列表，仅用于展示
		files : [], // 控件中的上传文件列表
		fileData : {
			groupid : '',
			orgcode :  'imusic',
			appid : 'imusic',
			dir_str : '',
			filecategory : ''
		}
	// 文件上传时附带的参数
	};
}

/**
 * 提交文件至服务器
 * 
 * @param newFile
 * @param oldFile
 * @param callback
 * @returns
 */
function submitFile(newFile, oldFile, showFiles, callback) {
	if (newFile && oldFile && !newFile.active && oldFile.active) {
		if (newFile.xhr) {
			if (newFile.xhr.status == 200) {
				// 成功将文件传至服务器
				// "{"attachid":"170ef598b7de4bc3bacd2b9512c83320","code":1,"msg":"上传成功1个文件!","path":"http://csfile.ixzds.com/testfile/2018/08/22/4ed85015ab74485c9baf507b0a77f711.jpg"}"
				var json = JSON.parse(newFile.xhr.responseText);
				if (json.code == 0) {
					callback(1, newFile.xhr.responseText);
					return;
				}
				if (json.path) {
					var arr = json.path.split("/");
					var attachName = arr[arr.length - 1];
					var fileType = attachName.split(".")[1];

					// 这样在删除文件的时候才会删除文件服务器上的文件
					var len = showFiles.length;
					for (var i = 0; i < len; i++) {
						if (showFiles[i].id == newFile.id) {
							var oldName = showFiles[i].ATTACHNAME;
							showFiles[i].ATTACH_ID = json.attachid;
							showFiles[i].ATTACHURL = json.path;
							showFiles[i].OLD_NAME = oldName;
							showFiles[i].ATTACHNAME = attachName;
							showFiles[i].FILETYPE = fileType;

							newFile.ATTACH_ID = json.attachid;
							newFile.ATTACHURL = json.path;
							newFile.OLD_NAME = oldName;
							newFile.ATTACHNAME = attachName;
							newFile.FILETYPE = fileType;
						}
					}
				}

				callback(1, newFile.xhr.responseText);
			} else {
				callback(0, newFile.xhr.status);
				swAutoAlert("文件上传失败，请稍后重试");
			}
		}
	}

	// 如果新增的文件不在展示列表中，那么加入
	add2ShowFiles(newFile, oldFile, showFiles);
}

/**
 * 将文件添加到展示列表中
 * 
 * @param newFile
 * @param oldFile
 * @param showFiles
 * @returns
 */
function add2ShowFiles(newFile, oldFile, showFiles) {
	if (newFile && !oldFile) {
		newFile.blob = ''
		var URL = window.URL || window.webkitURL;
		if (URL && URL.createObjectURL) {
			newFile.blob = URL.createObjectURL(newFile.file)
		}
		var flag = true;
		var len = showFiles;
		for (var i = 0; i < len; i++) {
			if (showFiles[i].id == newFile.id) {
				flag = false;
			}
		}
		if (flag) {
			newFile.ATTACHNAME = newFile.name;
			showFiles.push(newFile);
		}
	}
}

/**
 * 设置文件的展示方式
 * 
 * @param file
 * @returns
 */
function setFileHtml(file) {
	var URL = window.URL || window.webkitURL;
	if (isServerFile(file)) {
		file.blob = file.ATTACHURL;
		file.name = file.ATTACHNAME;
		file.type = file.FILETYPE;
	} else {
		file.ATTACHURL = file.blob;
		file.ATTACHNAME = file.name;
		file.FILETYPE = file.type;
	}

	var html = '';
	if (file.blob != '') {
		if (/\.(jpeg|jpe|jpg|gif|png|bmp|webp)$/i.test(file.name)) {
			html = '<img src="' + file.blob + '" />';
		}
	}
	return html;
}

/**
 * 是否是服务器文件
 * 
 * @param file
 * @returns
 */
function isServerFile(file) {
	if (file.ATTACH_ID) {
		return true;
	}
	return false;
}

/**
 * 删除文件服务器上的文件
 * 
 * @param file
 *            文件
 * @param ref
 *            控件的ref值
 * @param fileUpload
 *            控件的属性
 * @returns
 */
function delFile(file, ref, showFiles, idx, cb) {
	if (isServerFile(file)) {
		req(file_server_url + "/del/" + file.ATTACH_ID,{}, function(res) {
			if (res.code != 0) {
				showFiles.splice(idx, 1);
				return typeof cb == 'function' && cb();
			}
		});
	} else {
		ref.remove(file);
		showFiles.splice(idx, 1);
		return typeof cb == 'function' && cb();
	}
}

/**
 * 获取文件服务器上的文件
 * 
 * @param attachid
 * @returns
 */
function getFile(groupid, callback) {
	var url = file_server_url + "/view/" + groupid;
	req(url ,{}, function(res) {
		if (res) {
			if (res['ATTACHURL']) {
				// 返回的是json字符串
				res['ATTACHURL'] = buildPlatUrl(res['ATTACHURL']);
			} else {
				// 返回的是json数组
				var ids = groupid.split(",");
				for (var i = 0; i < ids.length; i++) {
					var files = res[ids[i]];
					if (files && files.length > 0) {
						for (var j = 0; j < files.length; j++) {
							files[j].ATTACHURL = buildPlatUrl(files[j].ATTACHURL);
						}
					}
					res[ids[i]] = files;
				}
			}
		}

		callback(res);
	});
}

/**
 * 构建平台URL地址
 * 
 * @param url
 * @returns
 */
function buildPlatUrl(url) {
	if (url && url.indexOf("http") == 0 && url.indexOf(location.protocol) == -1) {
		return location.protocol + "//" + url.split("://")[1];
	}
	return url;
}


/**
 * 验证文件是否都已上传
 * 
 * @param files
 * @returns
 */
function isUpload(files) {
	var flag = true;
	var file;
	var len = files.length;
	for (var i = 0; i < len; i++) {
		if (!files[i].success) {
			flag = false;
		}
	}
	return flag;
}

//用于生成uuid
function S4() {
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

// 生成uuid
function uuid() {
	return (S4()+S4()+""+S4()+""+S4()+""+S4()+""+S4()+S4()+S4());
}

/**
 * 确认提示框
 * 
 * @param title
 * @param txt
 * @param callback
 * @returns
 */
function swConfirm(title, txt, callback){
	swal({   
        title: title,   
        text: txt && txt != undefined ? txt : "",   
        type: "warning",   
        showCancelButton: true,   
        confirmButtonColor: "#DD6B55",   
        confirmButtonText: "确认",   
        cancelButtonText: "取消",   
        closeOnConfirm: true,   
        closeOnCancel: true 
    }, function(isConfirm){   
    	callback( isConfirm); 
    });
}

//获取节拍和速度和最小单位
function getData(content,fn){
	// 速度
    var regQ = new RegExp("Q:.*(?=\\n)");
	// 拍号
    var regM = new RegExp("M:.*(?=\\n)");
// var regM = new RegExp("M:.[0-9|/|C|C\|]*(?=\\n)");
    var regL = new RegExp("L:.*(?=\\n)");
    var q = regQ.exec(content);
    var m =regM.exec(content);
    var l = regL.exec(content);
    var qArr, L;
    if(!m){ // 如果没有设置拍号，那么不显示倒计拍
    	 return typeof fn == 'function' && fn();
    }
    
    var mValue = m[0].replace('M:','');
 	// 如果M:C|，则表示M:2/2
    if(mValue.indexOf('C|')>-1){
    	mValue = '2/2';
    } else if(mValue.indexOf('C')>-1){
    // 如果M:C，则表示M:4/4
    	mValue = '4/4';
    } else if(mValue.split('/').length > 2){
        // 如果M:2/4 3/4，则只取2/4
        mValue = mValue.trim().split(' ')[0].replaceAll(" ", "");
    }
    
 	// 拍子
    var beet = mValue.split('/')[0];
    
 	// 若没有设置速度，则默认为120
	if(!q){
		qArr = ['1/' + mValue.split('/')[1],'120']; 
	}else{
        qArr = q[0].replace('Q:','').split("=");
        // 如果碰到Q: "快速的"1/2=88 这样的速度，需要去除引号的内容 
        if(qArr && qArr.length > 0 && qArr[0].indexOf('"') > -1){
        	qAsplit = qArr[0].split('"');
        	qArr[0] = qAsplit[qAsplit.length - 1]
        }
	}
	// console.log("qArr=======",qArr);
 	if(l){
 		L = l[0].replace('L:', '');
 		L = L.split('/')[0] / L.split('/')[1];
 	}
 	
 	// M 是以什么音符为1拍，比如M:3/8, 这里的M就是1/8
 	if(m){
 		M = m[0].replace('M:', '');
 		M = 1 / M.split('/')[1];
 	}
 	
	var speed = 0;
    if(qArr.length > 0){
        var sp = qArr[1]; // 速度
        var arr = qArr[0].split('/');
        var p = eval(qArr[0]); // 最小单位的时值
// var sp1 = (1/(mValue.split('/')[1]))/ p * sp;
        var sp1 = sp * mValue.split('/')[1] / arr[1] * arr[0];
        speed = 60 / sp1;

    }else{
        speed = 60 / qArr[0]; // 速度
    }
 // console.log('curSpeed: ' + speed);
    
    // 设置和弦最小时间
    if(speed * 100 > 50){
    	hxTime = speed * 100;
    }else{
    	hxTime = 50;
    }
 // console.log(hxTime);
    return typeof fn == 'function' && fn(beet,speed,L,M, qArr, l && l[0].replace('L:', ''));
}

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

