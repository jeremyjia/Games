/** *******各种常量都方法 constants.js ************** */
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
		if (/\.(mp4)$/i.test(file.name)) {
			html = '<img src="../../css/file/images/file_video.jpg" />';
			// html = '<video src="' + file.blob + '"
			// controls="controls">您的浏览器不支持 video 标签。</video>';
		} else if (/\.(mp3)$/i.test(file.name)) {
			html = '<img src="../../css/file/images/file_audio.jpg" />';
			// var id = (new Date()).format('MMddhhmmssS');
			// html = getFileAudioHtml(id, file.blob);
		} else if (/\.(abc)$/i.test(file.name)) {
			html = '<img src="../../css/file/images/file_abc.jpg" />';
		} else if (/\.(doc|docx|xlsx|xls)$/i.test(file.name)) {
			html = '<img src="../../css/file/images/file_doc.jpg" />';
		} else if (/\.(jpeg|jpe|jpg|gif|png|bmp|webp)$/i.test(file.name)) {
			html = '<img src="' + file.blob + '" />';
		} else {
			html = '<img src="../../css/file/images/file_other.jpg" />';
		}
		// var fileType = file.type.toUpperCase();
		// console.log("fileType: " + fileType)
		// 之所以不用fileType判断是因为，有些文件上传时，不一定有fileType字段，比如abc文件
		// if (fileType == "MP4" || fileType.indexOf("VIDEO") != -1) {
		// html = '<img src="../../css/file/images/file_video.jpg" />';
		// // html = '<video src="' + file.blob + '"
		// // controls="controls">您的浏览器不支持 video 标签。</video>';
		// } else if (fileType == "MP3" || fileType.indexOf("AUDIO") != -1) {
		// html = '<img src="../../css/file/images/file_audio.jpg" />';
		// // var id = (new Date()).format('MMddhhmmssS');
		// // html = getFileAudioHtml(id, file.blob);
		// } else if (fileType == "ABC") {
		// html = '<img src="../../css/file/images/file_abc.jpg" />';
		// } else if ("DOC|DOCX|XLSX|XLS".indexOf(fileType) != -1 ||
		// fileType.indexOf("APPLICATION") != -1) {
		// html = '<img src="../../css/file/images/file_doc.jpg" />';
		// } else if ("JPEG|JPE|JPG|GIF|PNG|BMP|WEBP".indexOf(fileType) != -1 ||
		// fileType.indexOf("IMAGE") != -1) {
		// html = '<img src="' + file.blob + '" />';
		// } else {
		// html = '<img src="../../css/file/images/file_other.jpg" />';
		// }
	}
	return html;
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
		var len = showFiles.length;
		for (var i = 0; i < len; i++) {
			if (showFiles[i].id == newFile.id) {
				flag = false;
				break;
			}
		}
		if (flag) {
			newFile.ATTACHNAME = newFile.name;
			showFiles.push(newFile);
		}
	}
}

/**
 * 获取文件服务器上的文件
 * 
 * @param attachid
 * @returns
 */
function getFile(groupid, callback) {
	// C.FILE_VIEW_URL = 'http://file.ixzds.com/file/view/';
	var url = C.FILE_VIEW_URL;
	ajaxGet(url + groupid, function(res) {
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
							files[j].ATTACHURL = buildPlatUrl(files[j].ATTACHURL) ;
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
	if(/\?/g.test(url)){
		url+= '?v=' + new Date().getTime(); 
	}
	if (url && url.indexOf("http") == 0 && url.indexOf(location.protocol) == -1) {
		return location.protocol + "//" + url.split("://")[1];
	}
	return url;
}

/**
 * 获取abc文件的内容
 * 
 * @param file
 * @returns
 */
function getAbcContent(file, callback) {
	if (/\.(abc)$/i.test(file.ATTACHURL)) {
		var params = {
			"IMAGE_PATH" : file.ATTACHURL
		};
		ajaxPost("HttpChannel?action=APP_ACTION&BUSINESS_TYPE=oe.music.library!getAbcContent", params, function(res) {
			if (res.result == 1) {
				callback(file, res.data);
			}
		});
	}
}

/**
 * 获取文件内容
 * 
 * @param file
 * @param callback
 * @returns
 */
function getFileContent(url, cball) {
	if (url.indexOf("blob") != -1) {
		ajaxPost2(url, {}, function(res) {
			cball(res);
		});
	} else {
		var params = {
			"IMAGE_PATH" : url
		};
		ajaxPost("HttpChannel?action=APP_ACTION&BUSINESS_TYPE=oe.music.library!getAbcContent", params, function(res) {
			cball(res);
		});
	}
}

/**
 * 删除文件服务器上的文件
 * 
 * @param attachid
 *            可以是attachid也可以是groupid
 * @returns
 */
function removeFile(file) {
	ajaxGet(C.FILE_DEL_URL + file.ATTACH_ID, function(res) {
		if (res.code == 0) {
			console.log(res.msg)
		}
	});
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
function delFile(file, ref, showFiles, idx) {
	if (isServerFile(file)) {
		swConfirm("确定要删除该文件吗", "删除之后不可恢复", function(isConfirm) {
			if (isConfirm) {
				ajaxGet(C.FILE_DEL_URL + file.ATTACH_ID, function(res) {
					if (res.code != 0) {
						showFiles.splice(idx, 1);
					}
				});
			}
		})
	} else {
		ref.remove(file);
		showFiles.splice(idx, 1);
	}
}

/**
 * 根据attach_id删除文件
 * @param attachId
 * @returns
 */
function delFileByAttachId(attachId) {
	if (!attachId && typeof attachId == 'undefined') {
		return;
	}
	ajaxGet(C.FILE_DEL_URL + attachId, function(res) {
		console.log("delFileByAttachId", res);
	});
}

function getAttach(attachid, cb) {
	setFileUrl()
	var url = C.FILE_VIEW_URL + attachid;
	ajaxGet(url, function(data) {
		return typeof cb == 'function' && cb(data);
	})
}

/**
 * 获取groupid
 * 
 * @param attachid
 * @returns
 */
function getGroupId(callback, num) {
	var params = {
		"NUM" : num ? num : 1
	}
	ajaxPost("HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=imusic.main!getUuid", params, function(res) {
		if (res.result == 1) {
			console.log(res.data);
			callback(res.data);
		}
	});
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

/**
 * 上传默认图，不会把url对应的文件下载到文件服务器上
 * 
 * @param url
 * @param groupid
 * @param callback
 * @returns
 */
function uploadDefFile(url, groupid, callback) {
	var user = getUser();
	var params = {
		'url' : url,
		'groupid' : groupid,
		'orgcode' : user.orgCode,
		'appid' : C.FILE_APPID
	}
	ajaxPost2(C.FILE_DB_URL, params, function(res) {
		if (res.code == 1) {
			console.log("uploadDefFile res", res);
			callback(res);
		}
	});
}

/**
 * 上传阿里云文件图，会把url对应的文件下载到文件服务器上
 * 
 * @param url
 * @param groupid
 * @param callback
 * @returns
 */
function uploadOssFile(url, groupid, callback, orgcode, param) {
	var params = {
		'url' : url,
		'groupid' : groupid,
		'orgcode' : orgcode,
		'appid' : C.FILE_APPID
	}
	if (param) {
		copyJson(param, params);
	}
	ajaxPost2(C.FILE_DB_URL, params, function(res) {
		if (res.code == 1) {
			console.log("uploadDefFile res", res);
			callback(res);
		}
	});
}

/**
 * 更新文件备注
 * 
 * @param url
 * @param groupid
 * @param callback
 * @returns
 */
function updateDesc(obj) {
	updateFileAttr($(obj).attr("data-attach-id"), 'ATTACHDESC', obj.value);
}

/**
 * 更新服务器文件属性
 * 
 * @param url
 * @param groupid
 * @param callback
 * @returns
 */
function updateFileAttr(attachId, columnName, columnValue, cball) {
	var params = {};
	params[columnName] = columnValue;
	ajaxPost2(C.FILE_UPDATE_URL + attachId, params, function(res) {
		console.log("updateFileAttr res", res);
		if (typeof cball == 'function') {
			cball(res);
		}
	});
}

/**
 * 单个PO中的attachid转成文件
 * 
 * @param row
 * @param column
 * @param def
 * @param cball
 * @returns
 */
function singleAttachid2file(row, column, def, cball) {
	var attachid = row[column];

	if (attachid && attachid != undefined) {
		getFile(attachid, function(res) {
			var cvalue = row[column];
			if (cvalue == undefined) {
				row[column] = def;
				return;
			}
			if (cvalue.indexOf("/") != -1) {
				return;
			}

			var files = res['ATTACHURL'];
			if (files == undefined || files.length == 0) {
				row[column] = def;
			} else {
				row[column] = files;
			}

			if (cball) {
				cball();
			}
		});
	}
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
		if (cvalue != undefined && cvalue && cvalue.indexOf("/") == -1) {
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
			//			if (def && (valiUrl || /\.(jpeg|jpe|jpg|gif|png|bmp|webp)$/i.test(def))) {
			//				urlValidate(rows, column, def);
			//			}

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
 * URL地址有效性验证
 * 
 * @param rows
 * @param column
 * @param def
 * @returns
 */
function urlValidate(rows, column, def) {
	// 废弃该方法，不然有很多其他网站可用的地址验证不通过
	return;
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		var cvalue = row[column];
		if (cvalue == undefined || !cvalue || cvalue.indexOf("/") == -1) {
			row[column] = def;
			continue;
		}
		ajaxDef(row, column, cvalue, def);
	}
}

/**
 * ajax验证图片是否存在，不存在，则配置默认值
 * 
 * @param row
 * @param column
 * @param cvalue
 * @param def
 * @returns
 */
function ajaxDef(row, column, cvalue, def) {
	cvalue += (cvalue.indexOf("?") != -1 ? "&" : "?") + "tmp=" + new Date().getTime();
	if (C.HOST.indexOf("https") == 0 && cvalue.indexOf("https") != 0) {
		cvalue = cvalue.replaceAll("http://", "https://");
	}
	$.ajax({
		type : "GET",
		cache : true,
		url : cvalue,
		data : "",
		timeout : 2 * 1000, // 设置超时的时间 2s
		success : function(res) {
		},
		error : function() {
			row[column] = def;
		}
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
function attachid2file(rows, column, def, cball) {
	if (rows.length == 0) {
		return;
	}
	var groupid = '';
	var row;
	for (var i = 0; i < rows.length; i++) {
		row = rows[i];
		var cvalue = row[column];
		if (cvalue != undefined && cvalue && cvalue.indexOf("/") == -1) {
			groupid += "," + cvalue;
		}
	}
	if (groupid.length > 0) {
		groupid = groupid.substring(1);
		getFile(groupid, function(arr) {
			for (var i = 0; i < rows.length; i++) {
				row = rows[i];
				var cvalue = row[column];
				if (cvalue == undefined) {
					row[column] = def;
					continue;
				}
				if (cvalue.indexOf("/") != -1) {
					continue;
				}

				var files = arr;
				if (files == undefined) {
					row[column] = def;
				} else {
					row[column] = files.ATTACHURL;
				}
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
 * 单个PO中groupid转图片
 * 
 * @param row
 * @param column
 * @param def
 * @returns
 */
function singleGroupid2img(row, column, def, cball) {
	var groupid = row[column];

	if (groupid && groupid != undefined && groupid.indexOf("http") != 0) {
		getFile(groupid, function(arr) {
			var cvalue = row[column];
			if (cvalue == undefined) {
				row[column] = def;
			} else if (cvalue.indexOf("/") != -1) {
			} else {
				var files = arr[cvalue];
				if (files == undefined || files.length == 0) {
					row[column] = def;
				} else {
					row[column] = files[0].ATTACHURL;
					//					ajaxDef(row, column, files[0].ATTACHURL, def);
				}
			}

			if (cball) {
				cball(row);
			}
		});
	} else {
		if (cball) {
			cball(row);
		}
	}
}

/**
 * 将groupid转成对应的文件
 * 
 * @param rows
 *            数组
 * @param column
 *            字段名
 * @param def
 *            默认图路径
 * @returns
 */
function groupid2file(rows, column, def, cb) {
	if (rows.length == 0) {
		return;
	}
	var groupid = '';
	var row;
	for (var i = 0; i < rows.length; i++) {
		row = rows[i];
		var cvalue = row[column];
		if (cvalue != undefined && cvalue && cvalue.indexOf("/") == -1) {
			groupid += "," + cvalue;
		}
	}
	if (groupid.length > 0) {
		groupid = groupid.substring(1);
		getFile(groupid, function(arr) {
			for (var i = 0; i < rows.length; i++) {
				row = rows[i];
				var cvalue = row[column];
				if (cvalue == undefined) {
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
					row[column] = files[0].ATTACHURL;
				}
			}
			return typeof cb == 'function' && cb(rows);
		});
	} else {
		console.log('groupid2img', rows)
		return typeof cb == 'function' && cb(rows);
	}
}

/*
 * demo: var rows = [{ 'COVER_IMG': '0001b7223a684eedb818a103ed8b9b69', 'AUDIO': '000724c175754dd3b16eebecc6528b8b' }, { 'COVER_IMG': '00089430479b4b0eb204c6a0236d3faf', 'AUDIO': 'http:///' }]
 * 
 * groupid2file(rows, 'COVER_IMG-1,AUDIO', null, res => { console.log('文件转化==================', res); })
 */
function groupid2fileUg(rows, columns, def, cb) {

	if (rows.length == 0 || !columns) {
		typeof (cb) == 'function' && cb(rows);
		return;
	}
	var groupid = '', columns = columns.split(',');
	var row;

	// 取出待转化的字段值
	for (var i = 0; i < rows.length; i++) {
		row = rows[i];
		for ( var j in columns) {
			if (j == 'clone') {
				continue;
			}
			var cvalue = row[columns[j].split('-')[0]];
			if (cvalue != undefined && cvalue && cvalue.indexOf("/") == -1) {
				groupid += "," + cvalue;
			}
		}
	}

	if (groupid && groupid != undefined) {
		groupid = groupid.substring(1);
		// 一股脑扔到文件服务器中找
		getFile(groupid, function(arr) {
			if (!arr) {
				return typeof cb == 'function' && cb(rows);
			}
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				// 转化每个字段
				for ( var j in columns) {
					var column = columns[j].split('-')[0];
					var cvalue = row[column];
					if (cvalue == undefined) {
						row[column] = def || row[column];
						continue;
					}
					if (cvalue.indexOf("/") != -1) {
						continue;
					}

					var files = arr[cvalue];
					if (files == undefined || files.length == 0) {
						row[column] = def || row[column];
					} else if (files.length == 1) {
						row[column] = files[0].ATTACHURL;
					} else {
						var count = columns[j].split('-')[1] || 1;

						if (count <= 1) {
							row[column] = files[0].ATTACHURL;
							continue;
						}

						var fileArr = [];
						for (var m = 0; m < files.length; m++) {
							if ((m + 1 > count) && count != 'n') {
								continue;
							}
							fileArr.push(files[m].ATTACHURL);
						}

						row[column] = fileArr;
					}

				}
				// 转化每个字段
			}
			typeof (cb) == 'function' && cb(rows);
		});
	} else {
		typeof (cb) == 'function' && cb(rows);
	}
}

/**
 * 获取文件格式
 * 
 * @param file
 * @returns img：图片， video：视频， audio：音频， abc：曲谱， ...：其他
 */
function getFileType(file) {
	var type = file.FILETYPE.toLowerCase();
	if (/(mp4|avi|mkv|mov)$/i.test(type)) {
		type = "video";
	} else if (/(mp3)$/i.test(type)) {
		type = "audio";
	} else if (/(jpeg|jpe|jpg|gif|png|bmp|webp)$/i.test(type)) {
		type = "img";
	}
	return type;
}

var fileJs = {
	getFileType : getFileType,
	delFileByAttachId : delFileByAttachId,
}