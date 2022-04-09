//五线谱图片放大比例，变量已移动至abcUtils.js
var scale = 2.2;
var notes_pattern = /(\[[\^\_\=A-Ya-y\/1-9,']*\])|(\^){0,1}(\_){0,1}(\=){0,1}[^\[\s\]]{1}[\,\'\/|1-9]*/g;
// 当前点中的简谱
var currJpVal= "";
// 钢琴弹奏历史音符提示
var noteTipPos;

// 平板上，音符不要太大
if(typeof top.isAndroid == 'function' && top.isAndroid()){
	if( navigator.userAgent.indexOf("uniwin") == -1 || (typeof top.isRoot == 'function' && !top.isRoot()) ){
		// 排除电钢琴
		scale = 1.2;
	}
}

String.prototype.getNum = function() {
	return this.replace(/[^0-9]/ig,"");
}

/**
 * 是否是json字符串
 * 
 * @param str
 * @returns
 */
function isJsonString(str) {
	try {
		if (typeof JSON.parse(str) == "object") {
			return true;
		}
	} catch (e) {
	}
	return false;
}

/**
 * json串内容复制
 * 
 * @param source
 * @param target
 * @param isKeyInTarget
 *            true：只复制target已有的键
 * @returns
 */
function copyJson(source, target, isKeyInTarget) {
	if (!source || !target) {
		return target;
	}
	for ( var key in source) {
		if (isKeyInTarget && isKeyInTarget != undefined && target[key] == undefined) {
			continue;
		}
		target[key] = source[key];
	}
	return target;
}

/**
 * 获取URL中的参数
 * 
 * @returns json
 */
function json2urlParams(json) {
	var urlParam = "";
	for ( var key in json) {
		urlParam += "&" + key + "=" + encodeURIComponent(json[key]);
	}
	if (urlParam) {
		urlParam = urlParam.substring(1);
	}
	return urlParam;
}

/**
 * 获取URL中的参数
 * 
 * @returns json
 */
function getUrlParamJson(url, isDecode) {
	if( isDecode == undefined){
		isDecode = true;
	}
	var result = {};
	// 去除'#'hash后面的部分
	if(!url || url == undefined){
		url = location.search.split('#')[0];
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
		if( !urlArr[i]){
			continue;
		}
		var arr = urlArr[i].split("=");
		result[arr[0]] = isDecode ? decodeURIComponent( arr[1]) : arr[1]; 
	}
	return result;
}

/**
 * 根据页面宽度来设置根元素的字体大小
 * 
 * @param winWidth
 * @param fontSize
 * @returns
 */
function setHtmlFontSize(winWidth, fontSize) {
	if (!winWidth || winWidth == undefined) {
		winWidth = 1920;
	}
	if (!fontSize || fontSize == undefined) {
		fontSize = 100;
	}
	// 如果页面宽度小于最小宽度，那么页面上的基础单位（html的font-size属性）需要变更
	(function(doc, win) {
		var docEl = doc.documentElement, resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize', recalc = function() {
			// var clientWidth = docEl.clientWidth > winWidth ? winWidth :
			// docEl.clientWidth;
			var clientWidth = docEl.clientWidth;
			if (!clientWidth)
				return;
			var fontSize = (clientWidth * fontSize / winWidth).toFixed(1);
			/*
			 * if( fontSize < 14){ fontSize = 14; }
			 */
			docEl.style.fontSize = fontSize + 'px';
		};
		if (!doc.addEventListener)
			return;
		win.addEventListener(resizeEvt, recalc, false);
		recalc();
	})(document, window);
}



/**
 * 获取选中的abc内容
 * 
 * @param txtId
 * @returns
 */
function getChooseAbc(txtId, abcContent, lyricArr) {
	// 获取选中值
	var selTxt = getSelectText(txtId);
	// 判断选中项的前后一个音符是否是"()"，是的话自动补上，上面方法选中时是不会选中“()”的
	var idx = abcContent.indexOf(selTxt);
	while (--idx > 0) {
		var note = abcContent.substr(idx, 1);
		if (note) {
			if (note == "(") {
				selTxt = "(" + selTxt;
			}
			break;
		}
	}

	idx = abcContent.indexOf(selTxt) + selTxt.length;
	while (++idx < abcContent.length) {
		var note = abcContent.substr(idx - 1, 1);
		if (note && note.trim()) {
			if (note == ")") {
				selTxt = selTxt + ")";
			}
			break;
		}
	}

	// 去掉歌词
	var reg = new RegExp("w.*(?=\\n)\\n", "g");
	selTxt = selTxt.replace(reg, "").replace(/N:.*\n/g,"");

	// 生成新的曲谱，获取非曲谱部分
	var lines = abcContent.split("\n");
	var newstaff = "";
	var header = "";
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i];
		if (line && line.indexOf("|") < 0 && line.replaceAll(" ", "") != "") {
			header += line + "\n";
		}
	}
	if (header.substr(header.length - 2, header.length) == "\n\n") {
		header = header.substr(0, header.length - 1);
	}

	var contentTxt = '';
	var contentIdx = 0;
	var selTxtRows = selTxt.split("\n");
	for (var i = 0; i < selTxtRows.length; i++) {
		contentTxt += selTxtRows[i];

		if (i == selTxtRows.length - 1) {
			if (contentTxt.substr(contentTxt.length - 2, contentTxt.length) == "\n\n") {
				contentTxt = contentTxt.substr(0, contentTxt.length - 1);
			}
			if (contentTxt.substr(contentTxt.length - 1, 1) != '|') {
				contentTxt = contentTxt + "|";
			}
			if (contentTxt.substr(contentTxt.length - 1, 1) != ']') {
				contentTxt = contentTxt + "]";
			}
		}
		contentTxt += "\n";
		if (lyricArr.length > contentIdx && lyricArr[contentIdx].lyrics) {
			var arr = lyricArr[contentIdx++].lyrics;
			for (var j = 0; j < arr.length; j++) {
				contentTxt += arr[j].indexOf("\n") != -1 ? arr[j] : arr[j] + "\n";
			}
		}
	}

	abcContent = header + contentTxt;

	selsrc(0);
	// console.log("abcContent: ", abcContent);
	return abcContent;
}

// 去掉空行
function replaceBlankLine(val) {
	var flag = false;
	if(!val){
		flag = true;
		val = $("#source").val();
	}
	
	var reg = /\n(\n)*( )*(\n)*\n/g;
	val = val.replace(reg, "\n");
	if( flag){
		$("#source").val(val);
	}
	return val;
}


/**
 * 获取节拍和速度
 * 
 * @param content
 * @param fn
 * @returns
 */
function getAbcParams(content, fn) {
	// 速度
	var regQ = new RegExp("Q:.*(?=\\n)");
	// 拍号
	var regM = new RegExp("M:.*(?=\\n)");
	var q = regQ.exec(content);
	var m = regM.exec(content);
	var qArr;
	if (!m) { // 如果没有设置拍号，那么不显示倒计拍
		return typeof fn == 'function' && fn();
	}

	var mValue = m[0].replace(new RegExp('M\\s*:', 'g'), '');
	// 如果M:C|，则表示M:2/2
	if (mValue.indexOf('C|') > -1) {
		mValue = '2/2';
	} else if (mValue.indexOf('C') > -1) {
		// 如果M:C，则表示M:4/4
		mValue = '4/4';
	} else if (mValue.split('/').length > 2) {
		// 如果M:2/4 3/4，则只取2/4
		mValue = mValue.trim().split(' ')[0];
	}
	mValue = mValue.replaceAll(" ", "");

	// 拍子
	var beet = mValue.split('/')[0];

	// 若没有设置速度，则默认为120
	if (!q) {
		qArr = [ '1/' + mValue.split('/')[1], '120' ];
	} else {
		qArr = q[0].replace('Q:', '').split("=");
		// 如果碰到Q: "快速的"1/2=88 这样的速度，需要去除引号的内容 
        if(qArr && qArr.length > 0 && qArr[0].indexOf('"') > -1){
        	qAsplit = qArr[0].split('"');
        	qArr[0] = qAsplit[qAsplit.length - 1]
        }
	}

	// 速度
	var speed = 0;
	if (qArr.length > 0) {
		var sp = qArr[1];
		var arr = qArr[0].split('/');
		var p = eval(qArr[0]); // 最小单位的时值
		// var sp1 = (1/(mValue.split('/')[1]))/ p * sp;
		var sp1 = sp * mValue.split('/')[1] / arr[1] * arr[0];
		speed = 60 / sp1;
	} else {
		speed = 60 / qArr[0];
	}

	// console.log('curSpeed: ' + speed);
	// qArr[1] abc的速度，比如72
	var abcSpeed = qArr[1];
	getK(content, function(zKey) {
		return typeof fn == 'function' && fn(beet, speed, abcSpeed, zKey, mValue);
	});
}

/**
 * 获取abc速度
 * @param content
 * @returns speed (单位：秒，每speed秒一拍)
 */
function getAbcSpeed(content){
	// 速度
	var regQ = new RegExp("Q:.*(?=\\n)");
	// 拍号
	var regM = new RegExp("M:.*(?=\\n)");
	var q = regQ.exec(content);
	var m = regM.exec(content);
	var qArr;
	if (!m) { // 如果没有设置拍号，那么不显示倒计拍
		return typeof fn == 'function' && fn();
	}

	var mValue = m[0].replace(new RegExp('M\\s*:', 'g'), '');
	// 如果M:C|，则表示M:2/2
	if (mValue.indexOf('C|') > -1) {
		mValue = '2/2';
	} else if (mValue.indexOf('C') > -1) {
		// 如果M:C，则表示M:4/4
		mValue = '4/4';
	} else if (mValue.split('/').length > 2) {
		// 如果M:2/4 3/4，则只取2/4
		mValue = mValue.trim().split(' ')[0];
	}
	mValue = mValue.replaceAll(" ", "");

	// 拍子
	var beet = mValue.split('/')[0];

	// 若没有设置速度，则默认为120
	if (!q) {
		qArr = [ '1/' + mValue.split('/')[1], '120' ];
	} else {
		qArr = q[0].replace('Q:', '').split("=");
		// 如果碰到Q: "快速的"1/2=88 这样的速度，需要去除引号的内容 
        if(qArr && qArr.length > 0 && qArr[0].indexOf('"') > -1){
        	qAsplit = qArr[0].split('"');
        	qArr[0] = qAsplit[qAsplit.length - 1]
        }
	}

	// 速度
	var speed = 0;
	if (qArr.length > 0) {
		var sp = qArr[1];
		var arr = qArr[0].split('/');
		var p = eval(qArr[0]); // 最小单位的时值
		// var sp1 = (1/(mValue.split('/')[1]))/ p * sp;
		var sp1 = sp * mValue.split('/')[1] / arr[1] * arr[0];
		speed = 60 / sp1;
	} else {
		speed = 60 / qArr[0];
	}
	return speed;
}

/**
 * 取标题区域内容
 * 
 * @param content
 *            abc内容
 * 
 * @param isExceptPart
 *            true 去除大谱表中的声部标识
 * @returns
 */
function getTitleContent(content, isExceptPart) {
	// 这里去掉歌词
	content = content.replaceAll(/w:.[^\n]*\n/g, "");
	var lines = content.split("\n");
	var str = "";
	if (lines != null) {
		for (var i = 0; i < lines.length; i++) {
			// 去除双引号，括号、头尾空格内容
			var line_tmp = lines[i].replaceAll(/\".*\"/g, "").replace(/\{.[^\}]*\}/, "").replace(/^\s+|\s+$/gm, '');
			if (isExceptPart && (line_tmp.indexOf("%%score") == 0 || line_tmp.indexOf("%%staves") == 0 || line_tmp.indexOf("V:") >= 0)) {
				continue;
			}
			if (line_tmp.indexOf("|") < 0) {
				str = str + lines[i] + "\n";
			} else {
				break;
			}
		}
	}
	return str.trim();
}

/**
 * 获取拍号
 * 
 * @param abcContent
 * @returns
 */
function getBeet(abcContent) {
	var regM = new RegExp("M:.[0-9|/|C|C\|]*(?=\\n)");
	var m = regM.exec(abcContent);
	if (!m) { // 如果没有设置拍号，那么不显示倒计拍
		return "";
	}

	var mValue = m[0].replace('M:', '');
	// 如果M:C|，则表示M:2/2
	if (mValue.indexOf('C|') > -1) {
		mValue = '2/2';
	} else if (mValue.indexOf('C') > -1) {
		// 如果M:C，则表示M:4/4
		mValue = '4/4';
	}

	// 拍子
	var beet = mValue.split('/')[0];
	return beet;
}

/**
 * 获取移调
 * 
 * @param abcContent
 * @returns
 */
function getK(abcContent, fn) {
	var reg = new RegExp("K:.*(?=\\n)");
	var reg2 = /K:\s*([CDEFGAB#bm]{1,3})/;
	
	var kRow = reg.exec(abcContent);
	if (!kRow) {
		kRow = [ "K:C" ];
	}
	kRow = kRow[0];

	var k = kRow.replace("K:", "");
	var old_k = "C";
	var old_kvalue = "C";
	if (k != "") {
		old_k = k;
	}
	if (k.indexOf("shift") > -1) {
		var tmp = k.substr(0, k.indexOf("shift"));
		old_k = tmp.replace("K:", "");
	}
	if(k.indexOf("clef")>-1){
		var tmp = k.substr(0, k.indexOf("clef"));
		old_k = tmp.replace("K:", "");
	}
	if(k.indexOf("octave")>-1){
		var tmp = k.substr(0, k.indexOf("octave"));
		old_k = tmp.replace("K:", "");
	}
	
	
	old_k = old_k.replaceAll(" ", "");
	
	var keyMatch = abcContent.match(reg2);
	if(keyMatch!=null){
		old_k = keyMatch[1];
	}
	
	// 关系小调与调号的关联关系，左右相等， 从musicScore中获取
	var json = {
		"Am" : "C",
		"Dm" : "F",
		"Gm" : "Bb",
		"Cm" : "Eb",
		"Fm" : "Ab",
		"Bbm" : "Db",
		"Ebm" : "Gb",
		"Abm" : "Cb",
		"A#m" : "C#",
		"D#m" : "F#",
		"G#m" : "B",
		"C#m" : "E",
		"F#m" : "A",
		"Bm" : "D",
		"Em" : "G",
	}
	if (json[old_k]) {
		old_k = json[old_k];
	}
	return typeof fn == 'function' && fn(old_k, kRow);
}

/**
 * 获取拍号
 * 
 * @param abcContent
 * @returns
 */
function getM(abcContent) {
	var reg = new RegExp("M:.*(?=\\n)");
	var kRow = reg.exec(abcContent);
	if (kRow && kRow.length > 0) {

	}
	kRow = kRow[0];
	var k = kRow.replace("M:", "").replace(/^\s+|\s+$/gm, '');
	return k;
}

/**
 * 获取拍号
 * 
 * @param abcContent
 * @returns
 */
function getL(abcContent) {
	var reg = new RegExp("L:.*(?=\\n)");
	var kRow = reg.exec(abcContent);
	kRow = kRow[0];

	var k = kRow.replace("L:", "").replace(/^\s+|\s+$/gm, '');
	return k;
}

function getQ(abcContent){
	var reg = new RegExp("Q:.*(?=\\n)");
	var kRow = reg.exec(abcContent);
	kRow = kRow[0];

	var k = kRow.replace("Q:", "").replace(/^\s+|\s+$/gm, '');
	return k;
}

/**
 * 速度变更 vm.abcSpeed
 * 
 * @returns
 */
function speedChange(abcContent, newSpeed, fn) {
	// 速度
	var regQ = new RegExp("Q:.*(?=\\n)");
	var speedRow = regQ.exec(abcContent);
	if (!speedRow) {
		top.alert('曲谱中尚未配置速度，请联系管理员');
		return;
	}
	speedRow = speedRow[0];
	var speedRowArr = speedRow.split("=");
	var oldSpeed = speedRowArr[1];

	var newSpeedRow = speedRowArr[0] + "=" + newSpeed;
	abcContent = abcContent.replace(speedRow, newSpeedRow);
	return typeof fn == 'function' && fn(abcContent);
}

/**
 * 移调，shift=CD（从C转为D）
 * 
 * 最终 K: C shift=ca,
 * 
 * @param abcContent
 *            abc内容
 * @param key
 *            新的调
 * @param selId
 *            移调下拉框的ID
 * @param fn
 *            回调函数
 * @returns
 */
function changeZKey(abcContent, key, selId, fn) {
	var old_kvalue = "C";
	getK(abcContent, function(old_k, kRow) {
		$.each($("#" + selId + " option"), function(i, item) {
			if (old_k == $(item).text()) {
				old_kvalue = $(item).val();
			}
		});
		// 如果是一样的调，就不加移调标识
		if (old_kvalue != key) {
			shift_key = "K:" + old_k + " shift=" + old_kvalue + key;
		} else {
			shift_key = "K:" + old_k;
		}

		abcContent = abcContent.replace(kRow, shift_key);
		return typeof fn == 'function' && fn(abcContent);
	});
}

/**
 * 移调，shift=CD（从C转为D）
 * 
 * 最终 K: C shift=ca,
 * 
 * @param abcContent
 *            abc内容
 * @param keyArr
 *            调号数组
 * @param key
 *            新的调
 * @param fn
 *            回调函数
 * @returns
 */
function changeZKeyNew(abcContent, keyArr, key, fn) {
	var old_k_obj = getStaffOriKey(); // util.js
	var reg = new RegExp("K:.*(?=\\n)");
	var kRow = reg.exec(abcContent);
	if (!kRow) {
		kRow = [ "K:C" ];
	}
	kRow = kRow[0];
	
	if( old_k_obj){
		// 如果是一样的调，就不加移调标识
		if (old_k_obj.code != key) {
			shift_key = "K:" + old_k_obj.value + " shift=" + old_k_obj.code + key;
		} else {
			shift_key = "K:" + old_k_obj.value;
		}

		// 保留octave参数
		if( kRow){
			var arr = kRow.match(/(octave\s*=\s*-*[0-9]*)|(clef\s*=\s*treble)/g)
			if( arr && arr.length > 0){
				for (var i = 0; i < arr.length; i++) {
					shift_key += ' ' + arr[i];
				}
			}
		}

		abcContent = abcContent.replace(kRow, shift_key);
	}else{
		top.alert(key + "找不到对应的调号，请联系平台客服");
	}
	return typeof fn == 'function' && fn(abcContent, key);
}
 
/**
 * 完全替换字符串中所有符合的字符
 * @param str
 * @param subStr
 * @param replaceStr
 * @returns  replaceAllStr("  a    b   d ", "  ", " ") == " a b d "
 */
function replaceAllStr(str, subStr, replaceStr){
	if( !str){
		return str;
	}
	str = str.replace(new RegExp(subStr, "gm"), replaceStr);
	if( str.indexOf(subStr) != -1){
		return replaceAllStr(str, subStr, replaceStr);
	}else{
		return str;
	}
} 
 

function getSelNotePos(txtId, idx) {
	// console.log("getSelNotePos idx", idx)
	var isLyric = isSelLyric(txtId);
	var noteLyrics = note_lyrics(txtId);

	if (isLyric) {
		idx = getNotePositionBySelectLyric(txtId).pos;
	}
	var obj = {
		idx : idx,
		line_index : 0,
		note_index : 0,
		isLyric : isLyric
	}
	var line_index = 0;
	var note_index = 0;
	var note_lyric;
	for (var i = 0; i < noteLyrics.length; i++) {
		note_lyric = noteLyrics[i];

		var note;
		var arr = note_lyric.notes;
		for (var j = 0; j < arr.length; j++) {
			note = arr[j];
			if (note.pos == idx) {
				obj.line_index = i;
				obj.note_index = note.index;
			}
		}
	}
	// console.log("getSelNotePos obj", JSON.stringify(obj))
	return obj;
}

/**
 * 判断当前选中文本是否是歌词
 * 
 * @param txtId
 * @returns
 */
function isSelLyric(txtId) {
	var isLyric = false;
	var txtObj = document.getElementById(txtId);
	var st = getSelectText(txtId);
	var startPos = getStartPos(txtObj);
	var lineArr = txtObj.value.substring(0, startPos).split("\n");
	if (lineArr[lineArr.length - 1].indexOf("w") == 0) {
		isLyric = true;
	}
	return isLyric;
}
 


// 取音符区域的内容，返回的是一个对象数组，包括属性v:表示是哪一个声部，str：表示对应声部的谱子(如果是多谱表，返回的是多个数组)
function getNoteContent() {
	var content = $("#source").val();
	content = content + "\n";
	// 这里去掉歌词
	content = content.replaceAll(/w:.[^\n]*\n/g, "");
	var lines = content.split("\n");
	var str = "";
	var arr = new Array();
	var vPattern = /V:[1-9]/;
	if (lines != null) {
		var lastV = "";

		var newV = false;
		for (var i = 0; i < lines.length; i++) {

			var exist = false;
			if (lines[i].indexOf("V:") > -1) {
				var v = lines[i].match(vPattern);
				if (v != null && v.length > 0) {
					lastV = v[0];
				}
			}
			var line_tmp = lines[i].replaceAll(/\".*\"/g, "");
			if (line_tmp.replace(/\[.[^\]]*\]/, "").replace(/\{.[^\}]*\}/, "").indexOf("|") > -1) {
				var obj = new Object();

				for (var j = 0; j < arr.length; j++) {
					if (arr[j].v == lastV) {
						obj = arr[j];
						obj.str = obj.str + lines[i];
						exist = true;
						break;
					}
				}
				if (!exist) {
					obj.str = lines[i];
					obj.v = lastV;
					arr.push(obj);
				}
			}

		}
	}
	return arr;
}


// 计算第个音符的长度：返回值为两维数组[[音符,长度],[音符,长度]],如果是和弦，则是[['音符,音符',长度],[]]
function getNotesLength(nodestr){
	// console.log(notestr)
	// var pattern =
	// /([cdefgabzCDEFGABZ](\,*)(\'*)(\/*)([1-9]*))|(\[([cdefgabzCDEFGABZ](\,*)(\'*)(\/*)([1-9]*))\])/g;
	var pattern = /\([2-9].[^\s]*\s|(\[[\^\_\=A-Za-z\/1-9,']*\])|(\^){0,1}(\_){0,1}(\=){0,1}[^\[\s\]]{1}[\,\'\/|1-9]*/g;
	var content = $("#source").val();
	var M = getM(content).split("/")[1];
	var L = getL(content).split("/")[1]; 
	// 计算一拍需要几个单位音符
	var bs = L/M;
	var num_pattern = /([1-9]*)/g
	var result = nodestr.match(pattern);
	var len = 0;
	var data = new Array();
	// 连音符正则表达式
	var reg = /\([1-9]/;
	var note_reg = /[a-gA-GzZ]/;
	if(result!=null){
		for(var i=0;i<result.length;i++){
			// 判断是否有音符，
			if(!note_reg.test(result[i])){
				continue;
			}
			var noteinfo = new Array();
			var index = 0;
			var note = result[i];
			if(reg.test(note)){
				// 有连音号的处理
				// noteinfo.push(note.replaceAll("/","").replace("[","").replace("]",""));
			}else{
				noteinfo.push(note.replaceAll("/","").replaceAll(/[1-9]*/g,"").replace("[","").replace("]",""));
			}
			
			 
			if(note.indexOf("[")>-1){
				var tmp = getNotesLength(note.replace("[","").replace("]",""));
				// console.log("----------")
				// console.log(tmp[0][1])
				noteinfo.push(tmp[0][1]);
			}else if(reg.test(note)){
				if(note.indexOf("(3")==0){
					ly3handle(3,data,note,pattern,num_pattern);
				}
				if(note.indexOf("(5")==0){
					ly5handle(5,noteinfo,note,pattern,num_pattern);
				}
				if(note.indexOf("(6")==0){
					ly5handle(6,noteinfo,note,pattern,num_pattern);
				}
				if(note.indexOf("(7")==0){
					ly5handle(7,noteinfo,note,pattern,num_pattern);
				}
			}else{
				var num_result = note.match(num_pattern);
				if(note.indexOf("/")>-1){
					var temp = 1;
					var flag = false;
					for(var j=0;j<note.length;j++){
						if(note[j]=="/"){
							index++;
							temp = temp/2;
							flag = true;
						}
					}
					if(flag){
						noteinfo.push(temp/bs);
					}
				}else if(num_result!=null){
					for(var j=0;j<num_result.length;j++){
						if(num_result[j]!=""){
							index++;
							noteinfo.push(parseInt(num_result[j])/bs);
						}
					}
				}
				
				if(index==0){
					noteinfo.push(1/bs);
				}
				
			}
			if(noteinfo.length>0){
				data.push(noteinfo);
			}
		}
	}
	return data;
}

// 3连音处理
function ly3handle(n,data,note,pattern,num_pattern){
	var index = 0;
	var tmp = note.replace("("+n,"");
	var result1 = tmp.match(pattern);
	var note_reg = /[a-gA-GzZ]/;
	if(result1!=null){
		for(var k=0;k<result1.length;k++){
			if(!note_reg.test(result1[k])){
				continue;
			}
			var noteinfo = new Array();
			var t = result1[k];
			noteinfo.push(t.replaceAll("/","").replaceAll(/[1-9]*/g,"").replace("[","").replace("]",""));
			var num_result = t.match(num_pattern);
			
			if(num_result!=null){
				for(var j=0;j<num_result.length;j++){
					if(num_result[j]!=""){
						index++;
						noteinfo.push((parseInt(num_result[j])/n).toFixed(2));
					}
				}
				if(t.indexOf("/")>-1){
					var temp = 1;
					var flag = false;
					for(var j=0;j<t.length;j++){
						if(t[j]=="/"){
							index++;
							temp = temp/2;
							flag = true;
						}
					}
					if(flag){
						noteinfo.push((temp/n).toFixed(2));
					}
				}
				if(index==0){
					noteinfo.push((1/n).toFixed(2));
				}
			}
			if(noteinfo.length>0){
				data.push(noteinfo);
			}
		}
	}
}
// 5-6-7连音处理
function ly5handle(n,data,note,pattern,num_pattern){
	var index = 0;
	var tmp = note.replace("("+n,"");
	var result1 = tmp.match(pattern);
	var note_reg = /[a-gA-GzZ]/;
	if(result1!=null){
		for(var k=0;k<result1.length;k++){
			if(!note_reg.test(result1[k])){
				continue;
			}
			var noteinfo = new Array();
			var t = result1[k];
			noteinfo.push(t.replaceAll("/","").replaceAll(/[1-9]*/g,"").replace("[","").replace("]",""));
			var num_result = t.match(num_pattern);
			
			if(num_result!=null){
				for(var j=0;j<num_result.length;j++){
					if(num_result[j]!=""){
						index++;
						noteinfo.push((parseInt(num_result[j])*2/n).toFixed(2));
					}
				}
				if(t.indexOf("/")>-1){
					var temp = 1;
					var flag = false;
					for(var j=0;j<t.length;j++){
						if(t[j]=="/"){
							index++;
							temp = temp/2;
							flag = true;
						}
					}
					if(flag){
						noteinfo.push((temp*2/n).toFixed(2));
					}
				}
				if(index==0){
					noteinfo.push((2/n).toFixed(2));
				}
			}
			if(noteinfo.length>0){
				data.push(noteinfo);
			}
		}
	}
}


/**
 * 如果abc中未配置缩放比例，那么设置初始值
 * 
 * @param abcContent
 *            abc内容
 * @param scale
 *            缩放初始值，为空则默认为1.8
 * @returns
 */
function setScaleIfnull(abcContent, scale) {
	var reg = new RegExp("%%scale .*(?=\\n)");
	var kRow = reg.exec(abcContent);
	if (!kRow) {
		if (!scale) {
			scale = 1.8;
		}
		abcContent = "%%scale " + scale + "\n" + abcContent;
	}
	return abcContent;
}

/**
 * 设置abc中的缩放比例
 * 
 * @param abcContent
 *            abc内容
 * @param addNum
 *            增加或者减少的缩放值
 * @returns
 */
function scaleAdd(abcContent, addNum) {
	var reg = new RegExp("%%scale .*(?=\\n)");
	var kRow = reg.exec(abcContent);
	if (!kRow) {
		return setAbcKeyValue(abcContent, "%%scale", 2.2);
	}

	kRow = kRow[0];
	var scale = kRow.replace("%%scale", "").replaceAll(" ", "");
	scale = parseFloat(scale) + addNum;
	scale = scale.toFixed(2);
	return setAbcKeyValue(abcContent, "%%scale", scale);
}

/**
 * 获取可移调数组
 * 
 * @returns
 */
function getAbcKeyArr() {
	return [ { // 移调 参数
		code : 'c',
		value : 'C',
		trueValue: 'C', 
		aliasName : ['Am', 'CMAJOR', 'Cmaj', 'Cmajor', 'C Ionian'] // 别名
	}, {
		code : 'g',
		value : 'G',
		trueValue: 'G', 
		aliasName : ['Em', 'GMAJOR', 'Gmaj', 'Gmajor', 'G Ionian'] // 别名
	}, {
		code : 'd',
		value : 'D',
		trueValue: 'D', 
		aliasName : ['Bm', 'DMAJOR', 'Dmaj', 'Dmajor', 'D Ionian'] // 别名
	}, {
		code : 'a',
		value : 'A',
		trueValue: 'A',
		aliasName : ['F#m', 'AMAJOR', 'Amaj', 'Amajor', 'A Ionian'] // 别名
	}, {
		code : 'e',
		value : 'E',
		trueValue: 'E',
		aliasName : ['C#m', 'EMAJOR', 'Emaj', 'Emajor', 'E Ionian'] // 别名
	}, {
		code : 'b,',
		value : 'B',
		trueValue: 'B',
		aliasName : ['G#m', 'BMAJOR', 'Bmaj', 'Bmajor', 'B Ionian'] // 别名
	}, {
		code : '^f',
		value : 'F#',
		trueValue: '#F',
		aliasName : ['D#m', 'F#MAJOR', 'F#maj', 'F#major', 'F# Ionian'] // 别名
	}, {
		code : '^c',
		value : 'C#',
		trueValue: '#C',
		aliasName : ['A#m', 'C#MAJOR', 'C#maj', 'C#major', 'C# Ionian'] // 别名
	}, {
		code : 'f',
		value : 'F',
		trueValue: 'F',
		aliasName : ['Dm', 'FMAJOR', 'Fmaj', 'Fmajor', 'F Ionian'] // 别名
	}, {
		code : '_b,',
		value : 'Bb',
		trueValue: 'bB',
		aliasName : ['Gm', 'BbMAJOR', 'Bbmaj', 'Bbmajor', 'Bb Ionian'] // 别名
	}, {
		code : '_e',
		value : 'Eb',
		trueValue: 'bE',
		aliasName : ['Cm', 'EbMAJOR', 'Ebmaj', 'Ebmajor', 'Eb Ionian'] // 别名
	}, {
		code : '_a,',
		value : 'Ab',
		trueValue: 'bA',
		aliasName : ['Fm', 'AbMAJOR', 'Abmaj', 'Abmajor', 'Ab Ionian'] // 别名
	}, {
		code : '_d',
		value : 'Db',
		trueValue: 'bD',
		aliasName : ['Bbm', 'DbMAJOR', 'Dbmaj', 'Dbmajor', 'Db Ionian'] // 别名
	}, {
		code : '_g',
		value : 'Gb',
		trueValue: 'bG',
		aliasName : ['Ebm', 'GbMAJOR', 'Gbmaj', 'Gbmajor', 'Gb Ionian'] // 别名
	}, {
		code : '_c',
		value : 'Cb',
		trueValue: 'bC',
		aliasName : ['Abm', 'CbMAJOR', 'Cbmaj', 'Cbmajor', 'Cb Ionian'] // 别名
	} ];
}

/**
 * 获取原始的key,该方法用于在原始的谱子里就有进行过移调的谱子，用该方法可以取到该谱子实际的调号
 * @param content
 * @returns
 */
function getStaffAccKey(content){
	var keyPattern = /K:(.*)/;
	var keyMatchs = content.match(keyPattern);
	if(keyMatchs!=null){
		var keyStr = keyMatchs[1];
		if(keyStr.indexOf("shift")>-1){
			var shiftPattern = /shift=(.[^\s]*)/;
			var shiftMatchs = keyStr.match(shiftPattern)
			if(shiftMatchs){
				var shiftStr = shiftMatchs[1];
				var kPattern = /\_{0,1}\^{0,1}[a-gA-G]/g;
				var oriMatchs = shiftStr.match(kPattern);
				if(oriMatchs!=null){
					var oriKeyStr = oriMatchs[1];
					var keyArr = getAbcKeyArr();
					for(var i=0;i<keyArr.length;i++){
						if(keyArr[i].code==oriKeyStr){
							return keyArr[i].value;
						}
					}
				}
			}
		}
	}
	return "";
}

/**
 * 是否PC端
 * 
 * @returns
 */
function isPc(){
	var userAgentInfo = navigator.userAgent;
    var agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < agents.length; v++) {
        if (userAgentInfo.indexOf(agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}


/**
 * 初始化abc的key、value，更新abc内容中的数据参数，
 * 1、设置的宽度不能超过当前浏览器的宽度；未设置宽度的，按照屏幕的80%进行展示；宽度超出浏览器范围的，按照浏览器的90%来显示；
 * 
 * @param abcContent
 * @param abcImg
 * @param keyValueJson
 *            需要设置的key~value值，比如 {"%%scale": 2.2}
 * @param cball
 * @returns
 */
function initAbcKeyValue(abcContent, abcImg, keyValueJson, cball) {
	// 清除abc中的scale，统一采用公用变量scale
	var reg = new RegExp("%%scale.*(?=\\n)", "g");
	
	var abcScale = getAbcKeyValue(abcContent, "%%scale");
	if( abcScale){
		scale = parseFloat( abcScale);
	}
	
	abcContent = abcContent.replace(reg, "");
	
	if (keyValueJson) {
		for ( var key in keyValueJson) {
			abcContent = setAbcKeyValue(abcContent, key, keyValueJson[key]);
		}
	}
	
	// 一行中默认显示几个小节
	if( isPc()){
		var barsperstaff = getAbcKeyValue(abcContent, "%%pcbarsperstaff");
		if(barsperstaff){
			abcContent = setAbcKeyValue(abcContent, "%%barsperstaff", barsperstaff);
		}
	}
	
	// 标题默认需要设置字体
	var titlefont = getAbcKeyValue(abcContent, "%%titlefont");
	if(!titlefont || titlefont.indexOf("serif") != -1){
		abcContent = setAbcKeyValue(abcContent, "%%titlefont", "Microsoft-YaHei 28");
	}
	
	// 设置标题字体和文本字体
	// 打谱那边的配置： scale1.6 : 标题20px, 内容14px，最终要显示成80px的标题
	// %%vocalfont serifBold 16
	// %%titlefont serif 22
	// 打谱那边默认的scale值
//	if(!titlefont){
//		titlefont = "serifB";
//	}
//	var abcScale = 1.6;
//	var fontsize = titlefont.getNum();
//	if( fontsize){
//		fontsize = scale * fontsize / abcScale;
//		titlefont = "serifB " + fontsize.toFixed(0);
//	}
	//abcContent = setAbcKeyValue(abcContent, "%%titlefont", titlefont);
	
//	var vocalfont = getAbcKeyValue(abcContent, "%%vocalfont serifBold");
//	if( vocalfont && vocalfont.getNum()){
//		vocalfont = scale * vocalfont.getNum() / abcScale;
//		//abcContent = setAbcKeyValue(abcContent, "%%vocalfont serifBold", vocalfont.toFixed(0));
//	}
	
	abcContent = initAbcWidth(abcContent, abcContent.indexOf("pcpagewidth") == -1);
	if (cball) {
		cball(abcContent);
	}
}

/**
 * 配置abc的宽度
 * 
 * @param abcContent
 * @param isReset
 *            是否重置宽度
 * @param winW
 *            abc容器的宽度，默认window.width
 * @returns
 */
function initAbcWidth(abcContent, isReset, winW){
	if(!winW){
		// 起码也要两边各留15px; 
		winW = $(window).width() - 30;
	}
	if(!winW){
		// 比如页面未加载
		return abcContent;
	}
	
	// 260，一个视图/白板的宽度 * 2;
	// var boxWid = 180; 
	var width = getAbcKeyValue(abcContent, "%%pagewidth");
	
	// 宽度配置
//	if (width && width > winW) {
//		// 如果abc中配置了宽度，且宽度大于当前屏幕宽度，那么宽度需要重新计算
//		width = (winW - boxWid).toFixed(0);
//	} else if (!width || isReset) {
//		// 音符数量
//		width = winW * 0.85;
//		width = width.toFixed(0);
//	}
//	if( winW - width < boxWid){
//		width = winW - boxWid;
//	}
	
	if (width && width >= winW) {
		// 如果abc中配置了宽度，且宽度大于当前屏幕宽度，那么宽度需要重新计算
		width = winW;
	} else if (!width || isReset) {
		// 有一种边距75px的背景图
		width = winW * 0.94;
		width = width.toFixed(0);
	}
	
	// 宽度至少都得是4位，防止和在线打谱中的音符 seq对应不上，即每个音符的索引
	if( width < 1000){
		width = ("0000" + width); 
		width = width.substring(width.length - 4);
	}

	abcContent = setAbcKeyValue(abcContent, "%%pagewidth", width);
	return abcContent;
}

/**
 * 获取图片的原始宽高
 * 
 * @param oImg
 *            图片元素对象
 * @param cball
 * @returns
 */
function getImgNatureWH(oImg, cball) {
	var nWidth, nHeight;
	if (oImg.naturalWidth) {
		nWidth = oImg.naturalWidth;
		nHeight = oImg.naturalHeight;
		cball(nWidth, nHeight);
	} else {
		var nImg = new Image();
		nImg.src = oImg.src;
		nImg.onload = function() {
			cball(nImg.width, nImg.height);
		}
	}
}

// 获取节拍和速度和最小单位
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

// 选取选中的abc内容
function getSelectAbcContent(txtId, abcContent){
	// 获取选中值
	var selTxt = getSelectText(txtId);
	// 判断选中项的前后一个音符是否是"()"，是的话自动补上，上面方法选中时是不会选中“()”的
	var idx = abcContent.indexOf(selTxt);
	while (--idx > 0) {
		var note = abcContent.substr(idx, 1);
		if (note) {
			if (note == "(") {
				selTxt = "(" + selTxt;
			}
			break;
		}
	}

	idx = abcContent.indexOf(selTxt) + selTxt.length;
	while (++idx < abcContent.length) {
		var note = abcContent.substr(idx - 1, 1);
		if (note && note.trim()) {
			if (note == ")") {
				selTxt = selTxt + ")";
			}
			break;
		}
	}

	var contentTxt = '';
	var contentIdx = 0;
	var selTxtRows = selTxt.split("\n");
	for (var i = 0; i < selTxtRows.length; i++) {
		contentTxt += selTxtRows[i];

		if (i == selTxtRows.length - 1) {
			if (contentTxt.substr(contentTxt.length - 2, contentTxt.length) == "\n\n") {
				contentTxt = contentTxt.substr(0, contentTxt.length - 1);
			}
			if (contentTxt.substr(contentTxt.length - 1, 1) != '|') {
				contentTxt = contentTxt + "|";
			}
			if (contentTxt.substr(contentTxt.length - 1, 1) != ']') {
				contentTxt = contentTxt + "]";
			}
		}
		contentTxt += "\n";
	}
	
	return contentTxt;
}


// 根据不同的声调取不同的音符，如G大调时，弹奏F，应该显示在谱子上为“=F”,如果弹奏"^F"显示F
function getNoteByKeySign(key, note) {
	// 与当前音符在同一小节内的的有有升降符、还原符的音符
	var barlineNotes = getNotesByBarLine();

	// 本节内最后一个升降号，如果本节内最后一个升降号与当前的一至，则当前的就不需要加升降号和还原号
	// var lastUpOrDown = getNodePreUpOrDownSymbol();
	var lastUpOrDown = getLastFlag(barlineNotes, note);
	// 所有声调数据
	var sigs = sd.KeySignature;
	if (sigs != null && currJpVal == "") {
		for (var i = 0; i < sigs.length; i++) {
			if (key == sigs[i].key) {
				var val = sigs[i].val;
				var type = sigs[i].type;
				if (type == "down") {
					// var noteIndex = findIndexByNote(note);
					// note = findNoteByIndex_D(noteIndex);
					// console.log("note:=================="+note)
				}
				if (val != "") {
					var notes = val.split(",");
					for (var j = 0; j < notes.length; j++) {
						// 符号相应的调子的音符，则去掉前面的升降号，如^F->F
						if (note.toUpperCase().indexOf(notes[j]) > -1) {
							// 输入的音符是需要处理的音符
							if (note.startWith("\\^\\^")) {
								if (lastUpOrDown == "" || lastUpOrDown == "^^") {
									return note.replace("^^", "");
								} else {
									return note;
								}
							} else if (note.startWith("\\^")) {
								// 如果该音符前没有升降符号，或者该音符前已经有升号，则该音符不需要加升号
								if (lastUpOrDown == "" || lastUpOrDown == "^") {
									return note.replace("^", "");
								} else {
									return note;
								}
							} else if (note.startWith("\\_\\_")) {
								if (lastUpOrDown == "" || lastUpOrDown == "__") {
									return note.replace("__", "");
								} else {
									return note;
								}
							} else if (note.startWith("\\_")) {
								// 如果该音符前没有升降符号，或者该音符前已经有升号，则该音符不需要加升号
								if (lastUpOrDown == "" || lastUpOrDown == "_") {
									return note.replace("_", "");
								} else {
									return note;
								}
							} else {
								// 如果该音符前没有升降符号，或者该音符前已经有升号，则该音符不需要加升号
								if (lastUpOrDown == "=") {
									return note;
								} else {
									if (note.indexOf("=") > -1) {
										return note;
									}
									// return "=" + note;
									return restoreNote(key, note);
								}
							}
						} else {
							if (type == "down") {
								var tmpnote = "_" + note;
								if (tmpnote.toUpperCase().indexOf(notes[j]) > -1) {
									if (note.indexOf("=") > -1) {
										return note;
									}
									// return "=" + note;
									return restoreNote(key, note);
								}
							} else if (type == "up") {
								var tmpnote = "^" + note;
								if (tmpnote.toUpperCase().indexOf(notes[j]) > -1) {
									if (note.indexOf("=") > -1) {
										return note;
									}
									// return "=" + note;
									return restoreNote(key, note);
								}
							}
						}
					}
				}

			}
		}
	}
	if (note.startWith("\\^\\^")) {
		if (lastUpOrDown == "^^") {
			return note.replace("^^", "");
		} else {
			return note;
		}
	} else if (note.startWith("\\^")) {
		// 如果该音符前没有升降符号，或者该音符前已经有升号，则该音符不需要加升号
		if (lastUpOrDown == "^") {
			return note.replace("^", "");
		} else {
			return note;
		}
	} else if (note.startWith("\\_\\_")) {
		if (lastUpOrDown == "__") {
			return note.replace("__", "");
		} else {
			return note;
		}
	} else if (note.startWith("\\_")) {
		// 如果该音符前没有升降符号，或者该音符前已经有升号，则该音符不需要加升号
		if (lastUpOrDown == "_") {
			return note.replace("_", "");
		} else {
			return note;
		}
	} else {
		// 如果该音符前没有升降符号，或者该音符前已经有升号，则该音符不需要加升号
		if (lastUpOrDown == "=") {
			var rnote = restoreNote(key, note);
			return rnote.replace("=", "");
		} else {
			if (lastUpOrDown != "") {
				if (note.indexOf("=") > -1) {
					return note;
				}
				// return "=" + note;
				return restoreNote(key, note);
			} else {
				return note;
			}
		}

	}

	return note;
}

// 取小节内所有带升降号、还原号的音符
function getNotesByBarLine() {
	var pattern = /(\^{1,2}[a-zA-Z],*)|(\=[a-zA-Z],*)|(\_{1,2}[a-zA-Z],*)/g;
	var startPos = getStartPos(document.getElementById("source"));
	var content = $("#source").val();
	content = replaceBlankLine(content).substr(0, startPos);

	var idx = content.lastIndexOf("|");
	if (idx == -1) {
		idx = content.lastIndexOf("\n");
	}
	var nodeStr = content.substring(idx + 1, startPos);
	var result = nodeStr.match(pattern);
	console.log(result);
	return result;
}

// 判断当前输入的音符是否需要加升降号
function getLastFlag(notes, currentNote) {
	console.log("currentNote:" + currentNote)
	var flag = "";
	if (notes != null) {
		for (var i = 0; i < notes.length; i++) {
			if (notes[i].toLowerCase().indexOf(currentNote.replaceAll("\\^", "").replaceAll("\\_", "").replace("=", "").toLowerCase()) > -1) {
				if (notes[i].indexOf("^^") > -1) {
					flag = "^^";
				} else if (notes[i].indexOf("__") > -1) {
					flag = "__";
				} else {
					flag = notes[i].substring(0, 1);
				}
			}
		}
	}
	console.log("flag:" + flag)
	return flag;
}

//设置每行显示小节数
//%%barsperstaff 4
function setBarsPerstaff(content, num){
	var pattern = /%%barsperstaff\s*(\d)*\n/;
	if(num=="-1"){
		// 不限制
		content = content.replaceAll(pattern,"");
	}else{
		var matches = content.match(pattern);
		var str = "%%barsperstaff " + num + "\n";
		if(matches!=null){
			// 已经存在，则替换
			content = content.replaceAll(pattern,str);
		}else{
			content = str + content;
		}
	}
	return content;
}

// 显示/隐藏小节线序号
function showNodeSeq(content, on){ 
	var pattern = /%%measurenb.*\n/;
	var matches = content.match(pattern);
	var str = "%%measurenb 1\n";
	if(matches!=null){
		if(!on){
			content = content.replaceAll(pattern,"");
		}
	}else{
		if(on){
			content = str + content;
		}
	}
	return content;
}

// 获取abc速度列表
function getAbcSpeedArr(){
	return [{
		value: 40,
		name: '庄板(极慢板)'
	},{
		value: 46,
		name: '广板'
	},{
		value: 52,
		name: '慢板'
	},{
		value: 56,
		name: '柔板'
	},{
		value: 66,
		name: '行板'
	},{
		value: 69,
		name: '小行板'
	},{
		value: 88,
		name: '中板'
	},{
		value: 108,
		name: '小快板'
	},{
		value: 132,
		name: '快板'
	},{
		value: 158,
		name: '活板'
	},{
		value: 184,
		name: '急板'
	},{
		value: 208,
		name: '最急板'
	}]
}

// 获取abc乐器列表
function getAbcInstrument(){
	return [{"code":0,"name":"大钢琴（声学钢琴）"},{"code":1,"name":"明亮的钢琴"},{"code":2,"name":"电钢琴"},{"code":3,"name":"酒吧钢琴"},{"code":4,"name":"柔和的电钢琴"},{"code":5,"name":"加合唱效果的电钢琴"},{"code":6,"name":"羽管键琴（拨弦古钢琴）"},{"code":7,"name":"科拉维科特琴（击弦古钢琴）"},{"code":8,"name":"钢片琴"},{"code":10,"name":"八音盒"},{"code":11,"name":"颤音琴"},{"code":12,"name":"马林巴"},{"code":13,"name":"木琴"},{"code":14,"name":"管钟"},{"code":15,"name":"大扬琴"},{"code":16,"name":"击杆风琴"},{"code":17,"name":"打击式风琴"},{"code":18,"name":"摇滚风琴"},{"code":19,"name":"教堂风琴"},{"code":20,"name":"簧管风琴"},{"code":21,"name":"手风琴"},{"code":22,"name":"口琴"},{"code":23,"name":"探戈手风琴"},{"code":24,"name":"尼龙弦吉他"},{"code":25,"name":"钢弦吉他"},{"code":26,"name":"爵士电吉他"},{"code":27,"name":"清音电吉他"},{"code":28,"name":"闷音电吉他"},{"code":29,"name":"加驱动效果的电吉他"},{"code":30,"name":"加失真效果的电吉他"},{"code":31,"name":"吉他和音"},{"code":32,"name":"大贝司（声学贝司）"},{"code":33,"name":"电贝司（指弹）"},{"code":34,"name":"电贝司（拨片）"},{"code":35,"name":"无品贝司"},{"code":36,"name":"贝司掌击1"},{"code":37,"name":"贝司掌击2"},{"code":38,"name":"电子合成贝司1"},{"code":39,"name":"电子合成贝司2"},{"code":40,"name":"小提琴"},{"code":41,"name":"中提琴"},{"code":42,"name":"大提琴"},{"code":43,"name":"低音大提琴"},{"code":44,"name":"弦乐群颤音音色"},{"code":45,"name":"弦乐群拨弦音色"},{"code":46,"name":"竖琴"},{"code":47,"name":"定音鼓"},{"code":48,"name":"弦乐合奏音色1"},{"code":49,"name":"弦乐合奏音色2"},{"code":50,"name":"合成弦乐合奏音色1"},{"code":51,"name":"合成弦乐合奏音色2"},{"code":52,"name":"人声合唱“啊”"},{"code":53,"name":"人声“嘟”"},{"code":54,"name":"合成人声"},{"code":55,"name":"管弦乐敲击齐奏"},{"code":56,"name":"小号"},{"code":57,"name":"长号"},{"code":58,"name":"大号"},{"code":59,"name":"加弱音器小号"},{"code":60,"name":"法国号（圆号）"},{"code":61,"name":"铜管组（铜管乐器合奏音色）"},{"code":62,"name":"合成铜管音色1"},{"code":63,"name":"合成铜管音色2"},{"code":64,"name":"高音萨克斯风"},{"code":65,"name":"次中音萨克斯风"},{"code":66,"name":"中音萨克斯风"},{"code":67,"name":"低音萨克斯风"},{"code":68,"name":"双簧管"},{"code":69,"name":"英国管"},{"code":70,"name":"巴松（大管）"},{"code":71,"name":"单簧管（黑管）"},{"code":72,"name":"短笛"},{"code":73,"name":"长笛"},{"code":74,"name":"竖笛"},{"code":75,"name":"排箫"},{"code":76,"name":"吹瓶子"},{"code":77,"name":"日本尺八"},{"code":78,"name":"口哨声"},{"code":79,"name":"奥卡雷那"},{"code":80,"name":"合成主音1（方波）"},{"code":81,"name":"合成主音2（锯齿波）"},{"code":82,"name":"合成主音3"},{"code":83,"name":"合成主音4"},{"code":84,"name":"合成主音5"},{"code":85,"name":"合成主音6（人声）"},{"code":86,"name":"合成主音7（平行五度）"},{"code":87,"name":"合成主音8（贝司加主音）"},{"code":88,"name":"合成音色1（新世纪）"},{"code":89,"name":"合成音色2（温暖）"},{"code":90,"name":"合成音色3"},{"code":91,"name":"合成音色4（合唱）"},{"code":92,"name":"合成音色5"},{"code":93,"name":"合成音色6（金属声）"},{"code":94,"name":"合成音色7（光环）"},{"code":95,"name":"合成音色8"},{"code":96,"name":"合成效果1雨声"},{"code":97,"name":"合成效果2音轨"},{"code":98,"name":"合成效果3水晶"},{"code":99,"name":"合成效果4大气"},{"code":100,"name":"合成效果5明亮"},{"code":101,"name":"合成效果6鬼怪"},{"code":102,"name":"合成效果7回声"},{"code":103,"name":"合成效果8科幻"},{"code":104,"name":"西塔尔（印度）"},{"code":105,"name":"班卓琴（美洲）"},{"code":106,"name":"三昧线（日本）"},{"code":107,"name":"十三弦筝（日本）"},{"code":108,"name":"卡林巴"},{"code":109,"name":"风笛"},{"code":110,"name":"民族提琴"},{"code":111,"name":"山奈"},{"code":112,"name":"叮当铃"},{"code":113,"name":"Agogo"},{"code":114,"name":"钢鼓"},{"code":115,"name":"木鱼"},{"code":116,"name":"日本太鼓"},{"code":117,"name":"通通鼓"},{"code":118,"name":"合成鼓"},{"code":120,"name":"吉他换把杂音"},{"code":121,"name":"声音效果"},{"code":122,"name":"海浪声"},{"code":123,"name":"鸟鸣"},{"code":124,"name":"电话铃"},{"code":125,"name":"直升机"},{"code":126,"name":"鼓掌声"},{"code":127,"name":"枪声"},{"code":129,"name":"铃鼓"},{"code":130,"name":"响板"},{"code":131,"name":"竹笛"},{"code":132,"name":"二胡"},{"code":133,"name":"葫芦丝"},{"code":134,"name":"一批打击乐"},{"code":135,"name":"大锣"},{"code":136,"name":"口琴"},{"code":137,"name":"古筝"},{"code":138,"name":"琵琶"},{"code":139,"name":"唢呐"},{"code":140,"name":"京剧打击乐"},{"code":141,"name":"民族打击乐"},{"code":143,"name":"合成人声1"},{"code":144,"name":"合成人声2"},{"code":145,"name":"合成人声3"},{"code":146,"name":"合成人声4"},{"code":147,"name":"合成人声5"},{"code":148,"name":"合成人声6"},{"code":222,"name":"人声"},{"code":201,"name":"铙"},{"code":202,"name":"小军鼓"},{"code":1000,"name":"手铃"},{"code":1003,"name":"钟琴"},{"code":1004,"name":"沙锤"},{"code":1008,"name":"棒铃"},{"code":1010,"name":"双响筒"},{"code":1011,"name":"响板"},{"code":1012,"name":"响棒" },{"code":1014,"name":"蛙鸣筒"},{"code":1018,"name":"三角铁"},{"code":1021,"name":"跺脚"},{"code":1022,"name":"拍肩"},{"code":1023,"name":"拍腿"},{"code":1024,"name":"拍手"},{"code":1025,"name":"响指"},{"code":1026,"name":"手串铃"},{"code":5005,"name":"中虎音锣"},{"code":5007,"name":"钹"},{"code":5027,"name":"小鼓"},{"code":5030,"name":"小锣"},{"code":5018,"name":"月琴"},{"code":5019,"name":"柳琴"},{"code": 5040,"name": "萧"}];
}
 

/**
 * 从abc中提取声部数组
 * 
 * @param abc
 * @returns Array 返回数组
 */
function getVoicePartByAbc(abc){
	if(abc){
		try{
			// 这里两个空格不一样, 第一个空格不是键盘敲出来的空格,现在替换成键盘敲出来的空格
			abc = abc.replaceAll(' ', ' ');
			var regM = new RegExp(" nm=\"[^\"]*\"", "g");
			var list = abc.match(regM);
			if(list && list.length > 0){
				var len = list.length;
				for(var i = 0; i < len; i++){
					list[i] = list[i].substring(list[i].indexOf('"') + 1, list[i].length - 1).toString().trim();
				}
				return list;
			}
		}catch(e){
			return [];
		}
	}
	
	return [];
}

/**
 * 将简谱的12345670转成CDEFGABz
 * 
 * @param content
 *            abc内容
 * @param note
 *            唱名123456
 * @returns
 */
function getNoteFromJpToWxp(content, note, cb){
	if(note != undefined && note != ''){
		note = note.toString();
	}else{
		return false;
	}
	if(note == '0'){
		return typeof(cb) == 'function' && cb('z');
	}
	var hl = getAbcKeyValue(content, '%%keydefined');
	if(hl && hl.indexOf(',') > -1){
		hl = hl.split(',');
	}else if(hl){
		hl = [hl]
	}
	getK(content, function(k, arr){
		if(hl && hl.length > 0){
			for(var j = 0; j < hl.length; j++){
				if(hl[j] && hl[j].split('=')[0] && hl[j].split('=')[0].trim() == k){
					hl = hl[j].split('=')[1];
					break;
				}
			}
		}
		var Simple2Staff = sd.Simple2Staff;
		var arr = Simple2Staff.StaffValue;
		// 获取唱名在SimpleValue里的索引
		var index = Simple2Staff.SimpleValue.indexOf(note);
		for(var i in arr){
			if(arr[i].K == k){
				if(hl && hl == 'lower'){
					return typeof(cb) == 'function' && cb(arr[i].STAFF_LOWER[index]);
				}else{
					return typeof(cb) == 'function' && cb(arr[i].STAFF[index]);
				}
			}
		}
	})
}


/**
 * 有网络的前提下，点击作曲可以打开百度搜索
 * 
 * @param selector 需要点击后可百度搜索的表达式
 * @returns
 */
function initBaiduDialog( selector){
	if( !window.navigator.onLine){
		return;
	}
	
	if( !selector){
		selector = "text[type='composer']";
	}

	var baiduUrl = "https://www.baidu.com/s?wd="; // 百度搜索URL
	var urlParams = top.getUrlParamJson(); 
	var isExe = urlParams && urlParams.IS_EXE == 1;
	$(selector).on("click", function(){
		var text = $(this).text().trim();
		if(isExe){
			var winWid = $(window).width();
			var winHei = $(window).height();
			var sWid = winWid * 0.8;
			var sHei = sWid * 9 / 16;
			var sLeft = winWid * 0.1;
			var sTop = ( winHei - sHei) / 2;
			var style = ",width=" + parseInt(sWid) + ",height=" + parseInt(sHei) + ",left=" + parseInt(sLeft) + ",top=" + parseInt(sTop); 
			abcUtil.baiduDialog = top.window.open( baiduUrl + text, "baidu", "fullscreen=no,location=no,menubar=no,status=no,toolbar=no" + style, '_blank');
		}else{
			abcUtil.baiduDialog = top.window.open( baiduUrl + text, "baidu" );
		}
		if(abcUtil.baiduDialog && typeof abcUtil.baiduDialog.focus == 'function'){
			abcUtil.baiduDialog.focus();
		}
	});
}

/**
 * 获取abc内容中key对应的值，比如获取宽度、scale、音量等等
 * 
 * 覆盖util.js 中的方法
 * 
 * @param abcContent
 * @param key
 *            键值，如%%pagewidth、%%gain
 * @returns
 */
function getAbcKeyValue(abcContent, key) {
	var reg = new RegExp(key + ".*(\\r)*(?=\\n)");
	var kRow = reg.exec(abcContent);
	if (!kRow) {
		return "";
	}

	kRow = kRow[0];
	var cvalue = kRow.replace(key, "").trim();
	return cvalue;
}

/**
 * 钢琴弹奏展示历史弹奏记录 begin
 * @param playContent 弹奏记录
 * @param notRender 是否不要重新渲染音符颜色
 * @returns
 */
// 测验模式
function showHistoryLive(playContent, notRender, isPower) {
	var hl = [];
	playContent.forEach(function(item, index) {
		var userNotes = item.userNotes;
		if (item.v0Correct == item.v0NoteNum) {
			var obj = {
				seq : item.v0seq,
				msg : '弹奏正确',
				result : 1,
			}
			for (var i = 0; i < item.notes.length; i++) {
				var note = item.notes[i];
				if (!note || note.note == 0 || note.v != 0) {
					continue;
				}
				obj.seq = note.seq;
				if(note.correct == 2){
					obj.msg = '弹错后改正';
					obj.result = 2;
				}
				var timeDiff = parseInt((note.userStartTime - note.startTime) / 100);
				if (timeDiff < 0) {
					obj.msg += '<br>' + findNameAndNameUpByIndexPlus(note.note) + '比拍点快了' + -timeDiff / 10 + '秒';
				} else if (timeDiff > 0) {
					obj.msg += '<br>' + findNameAndNameUpByIndexPlus(note.note) + '比拍点慢了' + timeDiff / 10 + '秒';
				} else if (timeDiff == 0) {
					obj.msg += '<br>' + findNameAndNameUpByIndexPlus(note.note) + '完美拍点';
				}
				var lenDiff = parseInt((note.userDuration - note.duration) * 10);
				if(lenDiff < 0 && lenDiff >= -2){
					lenDiff = 0;
				}else if(lenDiff < -2){
					lenDiff -= 2;
				}
				if (lenDiff < 0) {
					obj.msg += ', 少弹了' + -lenDiff / 10 + '秒';
				} else if (lenDiff > 0) {
					obj.msg += ', 多弹了' + lenDiff / 10 + '秒';
				} else if (lenDiff == 0) {
					obj.msg += ', 完美时值';
				}
				
				if (isPower && note.powerComment) {
					obj.msg += '<br>' + note.powerComment;
				}
			}
			if (item.v0NoteNum > 0) {
				hl.push(obj);
			}
		} else {
			var sn = [], pn = [];
			var seq = '';
			var isXzf = false;
			for (var i = 0; i < item.notes.length; i++) {
				var n = item.notes[i];
				if(!n){
					continue;
				}
				if (n.v == 0) {
					seq = n.seq;
					if(n.note == 0){
						isXzf = true;
						break;
					}
					sn.push(findNameAndNameUpByIndexPlus(n.note));
					if (userNotes.length > 0) {
						pn.push(findNameAndNameUpByIndexPlus(userNotes[0]));
						userNotes.splice(0, 1);
					}
				}
			}
			var obj = {
				seq : seq,
				msg : isXzf ? '弹奏正确' : ('正确的是【' + sn.join(',') + '】，您弹的是【' + pn.join(',') + '】'),
				result : isXzf ? 1 : 0
			}
			hl.push(obj);
		}
		if (item.v1Correct == item.v1NoteNum) {
			var obj = {
				seq : item.v1seq,
				msg : '弹奏正确',
				result : 1,
			}
			for (var i = 0; i < item.notes.length; i++) {
				var note = item.notes[i];
				if (!note || note.note == 0 || note.v != 1) {
					continue;
				}
				obj.seq = note.seq;
				if(note.correct == 2){
					obj.msg = '弹错后改正';
					obj.result = 2;
				}
				var timeDiff = parseInt((note.userStartTime - note.startTime) / 100);
				if (timeDiff < 0) {
					obj.msg += '<br>' + findNameAndNameUpByIndexPlus(note.note) + '比拍点快了' + -timeDiff / 10 + '秒';
				} else if (timeDiff > 0) {
					obj.msg += '<br>' + findNameAndNameUpByIndexPlus(note.note) + '比拍点慢了' + timeDiff / 10 + '秒';
				} else if (timeDiff == 0) {
					obj.msg += '<br>' + findNameAndNameUpByIndexPlus(note.note) + '完美拍点';
				}
				var lenDiff = parseInt((note.userDuration - note.duration) * 10);
				if(lenDiff < 0 && lenDiff >= -2){
					lenDiff = 0;
				}else if(lenDiff < -2){
					lenDiff -= 2;
				}
				if (lenDiff < 0) {
					obj.msg += ', 少弹了' + -lenDiff / 10 + '秒';
				} else if (lenDiff > 0) {
					obj.msg += ', 多弹了' + lenDiff / 10 + '秒';
				} else if (lenDiff == 0) {
					obj.msg += ', 完美时值';
				}
				
				if (isPower && note.powerComment) {
					obj.msg += '<br>' + note.powerComment;
				}
			}
			if (item.v1NoteNum > 0) {
				hl.push(obj);
			}
		} else {
			var sn = [], pn = [];
			var seq = '';
			var isXzf = false;
			for (var i = 0; i < item.notes.length; i++) {
				var n = item.notes[i];
				if(!n){
					continue;
				}
				if (n.v == 1) {
					seq = n.seq;
					if(n.note == 0){
						isXzf = true;
						break;
					}
					sn.push(findNameAndNameUpByIndexPlus(n.note));
					if (userNotes.length > 0) {
						pn.push(findNameAndNameUpByIndexPlus(userNotes[0]));
						userNotes.splice(0, 1);
					}
				}
			}
			var obj = {
				seq : seq,
				msg : isXzf ? '弹奏正确' : ('正确的是【' + sn.join(',') + '】，您弹的是【' + pn.join(',') + '】'),
				result : isXzf ? 1 : 0
			}
			hl.push(obj);
		}
		if (item.v2Correct == item.v2NoteNum) {
			var obj = {
				seq : item.v2seq,
				msg : '弹奏正确',
				result : 1,
			}
			for (var i = 0; i < item.notes.length; i++) {
				var note = item.notes[i];
				if (!note || note.note == 0 || note.v != 2) {
					continue;
				}
				obj.seq = note.seq;
				if(note.correct == 2){
					obj.msg = '弹错后改正';
					obj.result = 2;
				}
				var timeDiff = parseInt((note.userStartTime - note.startTime) / 100);
				if (timeDiff < 0) {
					obj.msg += '<br>' + findNameAndNameUpByIndexPlus(note.note) + '比拍点快了' + -timeDiff / 10 + '秒';
				} else if (timeDiff > 0) {
					obj.msg += '<br>' + findNameAndNameUpByIndexPlus(note.note) + '比拍点慢了' + timeDiff / 10 + '秒';
				} else if (timeDiff == 0) {
					obj.msg += '<br>' + findNameAndNameUpByIndexPlus(note.note) + '完美拍点';
				}
				var lenDiff = parseInt((note.userDuration - note.duration) * 10);
				if(lenDiff < 0 && lenDiff >= -2){
					lenDiff = 0;
				}else if(lenDiff < -2){
					lenDiff -= 2;
				}
				if (lenDiff < 0) {
					obj.msg += ', 少弹了' + -lenDiff / 10 + '秒';
				} else if (lenDiff > 0) {
					obj.msg += ', 多弹了' + lenDiff / 10 + '秒';
				} else if (lenDiff == 0) {
					obj.msg += ', 完美时值';
				}
				
				if (isPower && note.powerComment) {
					obj.msg += '<br>' + note.powerComment;
				}
			}
			if (item.v2NoteNum > 0) {
				hl.push(obj);
			}
		} else {
			var sn = [], pn = [];
			var seq = '';
			var isXzf = false;
			for (var i = 0; i < item.notes.length; i++) {
				var n = item.notes[i];
				if(!n){
					continue;
				}
				if (n.v == 2) {
					seq = n.seq;
					if(n.note == 0){
						isXzf = true;
						break;
					}
					sn.push(findNameAndNameUpByIndexPlus(n.note));
					if (userNotes.length > 0) {
						pn.push(findNameAndNameUpByIndexPlus(userNotes[0]));
						userNotes.splice(0, 1);
					}
				}
			}
			var obj = {
				seq : seq,
				msg : isXzf ? '弹奏正确' : ('正确的是【' + sn.join(',') + '】，您弹的是【' + pn.join(',') + '】'),
				result : isXzf ? 1 : 0
			}
			hl.push(obj);
		}
		if (item.v3Correct == item.v3NoteNum) {
			var obj = {
				seq : item.v3seq,
				msg : '弹奏正确',
				result : 1,
			}
			for (var i = 0; i < item.notes.length; i++) {
				var note = item.notes[i];
				if (!note || note.note == 0 || note.v != 3) {
					continue;
				}
				obj.seq = note.seq;
				if(note.correct == 2){
					obj.msg = '弹错后改正';
					obj.result = 2;
				}
				var timeDiff = parseInt((note.userStartTime - note.startTime) / 100);
				if (timeDiff < 0) {
					obj.msg += '<br>' + findNameAndNameUpByIndexPlus(note.note) + '比拍点快了' + -timeDiff / 10 + '秒';
				} else if (timeDiff > 0) {
					obj.msg += '<br>' + findNameAndNameUpByIndexPlus(note.note) + '比拍点慢了' + timeDiff / 10 + '秒';
				} else if (timeDiff == 0) {
					obj.msg += '<br>' + findNameAndNameUpByIndexPlus(note.note) + '完美拍点';
				}
				var lenDiff = parseInt((note.userDuration - note.duration) * 10);
				if(lenDiff < 0 && lenDiff >= -2){
					lenDiff = 0;
				}else if(lenDiff < -2){
					lenDiff -= 2;
				}
				if (lenDiff < 0) {
					obj.msg += ', 少弹了' + -lenDiff / 10 + '秒';
				} else if (lenDiff > 0) {
					obj.msg += ', 多弹了' + lenDiff / 10 + '秒';
				} else if (lenDiff == 0) {
					obj.msg += ', 完美时值';
				}
				
				if (isPower && note.powerComment) {
					obj.msg += '<br>' + note.powerComment;
				}
			}
			if (item.v3NoteNum > 0) {
				hl.push(obj);
			}
		} else {
			var sn = [], pn = [];
			var seq = '';
			var isXzf = false;
			for (var i = 0; i < item.notes.length; i++) {
				var n = item.notes[i];
				if(!n){
					continue;
				}
				if (n.v == 3) {
					seq = n.seq;
					if(n.note == 0){
						isXzf = true;
						break;
					}
					sn.push(findNameAndNameUpByIndexPlus(n.note));
					if (userNotes.length > 0) {
						pn.push(findNameAndNameUpByIndexPlus(userNotes[0]));
						userNotes.splice(0, 1);
					}
				}
			}
			var obj = {
				seq : seq,
				msg : isXzf ? '弹奏正确' : ('正确的是【' + sn.join(',') + '】，您弹的是【' + pn.join(',') + '】'),
				result : isXzf ? 1 : 0
			}
			hl.push(obj);
		}
	})

	if(!notRender){		
		$("svg text").removeClass("errcheck-red errcheck-yellow errcheck-green");
	}
	hl && hl.forEach(function(item, index) {
		if (item.result == 1) {
			if(!notRender){				
				$("svg text." + item.seq).removeClass('errcheck-red errcheck-green errcheck-yellow').addClass('errcheck-green');
			}
//			$("._" + item.seq + "_").eq(0).css({
//				'fill' : 'green',
//				'fill-opacity' : '0.4'
//			})
			$("._" + item.seq + "_").mouseenter(function(e) {
				showNoteTip(e, item.msg);
			}).mouseout(function(e) {
				if (noteTipPos && (e.clientX == noteTipPos.x || e.clientY == noteTipPos.y)) {
					return;
				}
				$('.noteTip').remove();
			}).on('touchstart', function(e) {
				setTimeout(function() {
					showNoteTip(e.touches[0], item.msg);
				}, 300);
			})
		} else if(item.result == 2){
			if(!notRender){	
				$("svg text." + item.seq).removeClass('errcheck-red errcheck-green errcheck-yellow').addClass('errcheck-yellow');
			}
//			$("._" + item.seq + "_").eq(0).css({
//				'fill' : 'yellow',
//				'fill-opacity' : '0.4'
//			})
			$("._" + item.seq + "_").mouseenter(function(e) {
				showNoteTip(e, item.msg);
			}).mouseout(function(e) {
				if (noteTipPos && (e.clientX == noteTipPos.x || e.clientY == noteTipPos.y)) {
					return;
				}
				$('.noteTip').remove();
			}).on('touchstart', function(e) {
				setTimeout(function() {
					showNoteTip(e.touches[0], item.msg);
				}, 300);
			})
		} else {
			if(!notRender){	
				$("svg text." + item.seq).removeClass('errcheck-red errcheck-green errcheck-yellow').addClass('errcheck-red');
			}
//			$("._" + item.seq + "_").eq(0).css({
//				'fill' : 'red',
//				'fill-opacity' : '0.4'
//			})
			$("._" + item.seq + "_").mouseenter(function(e) {
				showNoteTip(e, item.msg);
			}).mouseout(function(e) {
				if (noteTipPos && (e.clientX == noteTipPos.x || e.clientY == noteTipPos.y)) {
					return;
				}
				$('.noteTip').remove();
			}).on('touchstart', function(e) {
				setTimeout(function() {
					showNoteTip(e.touches[0], item.msg);
				}, 300);
			})
		}
	})
}

//练习模式
function showHistory(playContent) {
	var hl = [];
	playContent.forEach(function(item, index) {
		var l1 = [];
		var l2 = [];
		if (item.result == 1) {
			for (var i = 0; i < item.notes.length; i++) {
				var obj = {
					seq : item.notes[i].seq,
					note : [ findNameAndNameUpByIndexPlus(item.notes[i].note) || 0 ],
					msg : '弹奏正确',
					result : 1,
				}
				var isExist = false;
				for (var j = 0; j < hl.length; j++) {
					if (hl[j].seq == obj.seq) {
						isExist = true;
					}
				}
				if (!isExist) {
					hl.push(obj);
				}
			}
		} else {
			if (item.userNotes && item.userNotes.length > 0) {
				for (var i = 0; i < item.notes.length; i++) {
					for (var j = 0; j < item.userNotes[item.userNotes.length - 1].length; j++) {
						var un = item.userNotes[item.userNotes.length - 1][j];
						if (l1.indexOf(i) == -1 && l2.indexOf(j) == -1 && item.notes[i].note == un) {
							var obj = {
								seq : item.notes[i].seq,
								note : [ findNameAndNameUpByIndexPlus(item.notes[i].note) ],
								userNotes : [ findNameAndNameUpByIndexPlus(un) ],
								msg : '弹奏正确',
								result : 1,
							}
							var isExist = false;
							for (var n = 0; n < hl.length; n++) {
								if (hl[n].seq == obj.seq) {
									hl[n].note = hl[n].note.concat(obj.note);
									hl[n].userNotes = hl[n].userNotes.concat(obj.userNotes);
									isExist = true;
								}
							}
							if (!isExist) {
								hl.push(obj);
							}
							l1.push(i);
							l2.push(j);
						}
					}
				}
				var leftNum = 0;
				for (var o = 0; o < item.notes.length; o++) {
					if (l1.indexOf(o) == -1 && item.notes[o].note != '0') {
						leftNum++;
					}
				}
				for (var k = 0; k < item.notes.length; k++) {
					if (l1.indexOf(k) == -1) {
						leftNum--;
						if (l2.length == item.userNotes[item.userNotes.length - 1].length) {
							var obj = {
								seq : item.notes[k].seq,
								note : [ findNameAndNameUpByIndexPlus(item.notes[k].note) || 0 ],
								userNotes : [],
								msg : '正确的是【' + findNameAndNameUpByIndexPlus(item.notes[k].note) + '】,您弹的是【】',
								result : 0,
							}
							var isExist = false;
							for (var n = 0; n < hl.length; n++) {
								if (hl[n].seq == obj.seq) {
									hl[n].note = hl[n].note.concat(obj.note);
									hl[n].msg = '正确的是【' + hl[n].note.join(',') + '】,您弹的是【' + hl[n].userNotes.join(',') + '】';
									hl[n].result = 0;
									isExist = true;
								}
							}
							if (!isExist) {
								hl.push(obj);
							}
						} else {
							for (var l = 0; l < item.userNotes[item.userNotes.length - 1].length; l++) {
								var un = item.userNotes[item.userNotes.length - 1][l];
								if (l2.indexOf(l) == -1) {
									var obj = {
										seq : item.notes[k].seq,
										note : [ findNameAndNameUpByIndexPlus(item.notes[k].note) || 0 ],
										userNotes : [ findNameAndNameUpByIndexPlus(un) ],
										msg : '正确的是【' + findNameAndNameUpByIndexPlus(item.notes[k].note) + '】,您弹的是【' + findNameAndNameUpByIndexPlus(un) + '】',
										result : 0,
									}
									var isExist = false;
									for (var n = 0; n < hl.length; n++) {
										if (hl[n].seq == obj.seq) {
											hl[n].note = hl[n].note.concat(obj.note);
											hl[n].note = unique1(hl[n].note); // 数组去重
											hl[n].userNotes = hl[n].userNotes.concat(obj.userNotes);
											hl[n].msg = '正确的是【' + hl[n].note.join(',') + '】,您弹的是【' + hl[n].userNotes.join(',') + '】';
											hl[n].result = 0;
											isExist = true;
										}
									}
									if (!isExist) {
										hl.push(obj);
									}
									if (item.notes[k].note != '0') {
										l2.push(l);
									}
									if (leftNum > 0) {
										break;
									}
								}
							}
						}
					}
				}
			} else {
				for (var i = 0; i < item.notes.length; i++) {
					var obj = {
						seq : item.notes[i].seq,
						note : [ findNameAndNameUpByIndexPlus(item.notes[i].note) || 0 ],
						userNotes : [],
						msg : '正确的是【' + findNameAndNameUpByIndexPlus(item.notes[i].note) + '】,您弹的是【】',
						result : 0,
					}
					var isExist = false;
					for (var n = 0; n < hl.length; n++) {
						if (hl[n].seq == obj.seq) {
							hl[n].note = hl[n].note.concat(obj.note);
							hl[n].msg = '正确的是【' + hl[n].note.join(',') + '】,您弹的是【' + hl[n].userNotes.join(',') + '】';
							hl[n].result = 0;
							isExist = true;
						}
					}
					if (!isExist) {
						hl.push(obj);
					}
				}
			}
		}
	})

	hl && hl.forEach(function(item, index) {
		if (item.note[0] == "0") {
			$("svg text." + item.seq).removeClass('errcheck-red errcheck-green errcheck-yellow').addClass('errcheck-green');
			return;
		}
		if (item.result == 1) {
			$("svg text." + item.seq).removeClass('errcheck-red errcheck-green errcheck-yellow').addClass('errcheck-green');
			$("._" + item.seq + "_").mouseenter(function(e) {
				showNoteTip(e, item.msg);
			}).mouseout(function(e) {
				if (noteTipPos && (e.clientX == noteTipPos.x || e.clientY == noteTipPos.y)) {
					return;
				}
				$('.noteTip').remove();
			}).on('touchstart', function(e) {
				setTimeout(function() {
					showNoteTip(e.touches[0], item.msg);
				}, 300);
			})
		} else {
			$("svg text." + item.seq).removeClass('errcheck-red errcheck-green errcheck-yellow').addClass('errcheck-red');
			$("._" + item.seq + "_").mouseenter(function(e) {
				showNoteTip(e, item.msg);
			}).mouseout(function(e) {
				if (noteTipPos && (e.clientX == noteTipPos.x || e.clientY == noteTipPos.y)) {
					return;
				}
				$('.noteTip').remove();
			}).on('touchstart', function(e) {
				setTimeout(function() {
					showNoteTip(e.touches[0], item.msg);
				}, 300);
			})
		}
	})
}

function showNoteTip(e, msg) {
	$('.noteTip').remove();
	noteTipPos = {
		x : e.clientX,
		y : e.clientY
	};
	var divstr = '<div class="noteTip" style="position:fixed;top:' + e.clientY + 'px;left:' + e.clientX + 'px;padding: 5px 10px; font-size: 12px;color: #fff;background: rgba(0,0,0,.7); z-index: 9999;">' + msg + '</div>'
	$('body').append(divstr);
}

// 通过noteIdx获取音名，并且加上上标下标
function findNameAndNameUpByIndexPlus(noteIdx){
	var note = findNameAndNameUpByIndex(noteIdx);
	if(note){
		var notes = note.split('');
		if(notes.length == 2){
			if(upperCase(notes[0])){
				note = notes[0] + '<sub>' + notes[1] + '</sub>';
			}else{
				note = notes[0] + '<sup>' + notes[1] + '</sup>';
			}
		}else if(notes.length == 3){
			if(upperCase(notes[1])){
				note = notes[0] + notes[1] + '<sub>' + notes[2] + '</sub>';
			}else{
				note = notes[0] + notes[1] + '<sup>' + notes[2] + '</sup>';
			}
		}
	}
	return note;
}

//英文是否大写
function upperCase(num) {
	var reg = /^[A-Z]+$/;
	return reg.test(num)
}

/** 钢琴弹奏展示历史记录 end */

/**
 * 根据音符下标（getNoteData()中的第一个字段）获取其所在的小节序号
 * 
 * @param seq
 * @returns
 */
function getBarIndexByNoteSeq(seq){
	var barIndex = "";
	
	var rows = all_s(true);
	var row;
	var len = rows.length;
	for (var i = 0; i < len; i++) {
		row = rows[i];
		var isNote = (row.type == '4' || row.type == '8' || row.type == '10');
		if( !isNote){
			continue;
		}

		if (row.istart == seq) {
			barIndex = row.bar_index;
			break;
		}
	}
	return barIndex;
}

/**
 * 验证url是否正确
 * @param url
 * @param cball
 * @returns
 */
function isUrlValid( url, cball){
	$.ajax({
		type : "GET",
		cache : true,
		url : url,
		data : "",
		timeout : 2 * 1000, // 设置超时的时间 2s
		success : function(res) {
			cball(res);
		}
	});
}

function setLoopJump(noteData){
	editSplnum.loopJump.isOpen = false;
	editSplnum.loopJump.jump = [];
	if(noteData && noteData.length > 0){
		var item;
		var seq = 0, startTime = -1, count, jumpSeq, obj;
		for(var i = 0, len = noteData.length; i < len; i++){
			item = noteData[i];
			if(item[0] == -1 || item[1] == startTime || item[6] != 0){
				continue;
			}
			if(item[0] < seq && item[1] > startTime){
				editSplnum.loopJump.isOpen = true;
				count = i - 0;
				jumpSeq = count == 0 ? noteData[0][0] : -1;
				while(count > 0 && jumpSeq == -1){
					jumpSeq = noteData[--count][0];
				}
				obj = {
					jumpTime: item[1] - editSplnum.loopJump.time, // 跳转开始时间（提前editSplnum.loopJump.time秒跳转）
					jumpToSeq: item[0], // 跳转到的音符seq
					jumpSeq: jumpSeq,  // 跳转开始的音符（防止一个音符超过editSplnum.loopJump.time的时长，而没有提前跳转）
					isJump: false
				}
				editSplnum.loopJump.jump.push(obj);
			}
			seq = item[0];
			startTime = item[1];
		}
	}
}

function setPrevJump(syms){
	if(!syms){
		return;
	}
	editSplnum.prevJump.isOpen = false;
	editSplnum.prevJump.jump = {};
	var list = [];
	var sItem;
	for(var i in syms){
		sItem = syms[i];
		if(i != 'clone' && sItem && (sItem.type == 0 || sItem.type == 8 || sItem.type == 10)){
			list.push(syms[i]);
		}
	}
	var item, count, lastBaridx, j;
	for(var i = 0, len = list.length; i < len; i++){
		item = list[i];
		if(i != len - 1 && i > 0 && (item.next && item.my_line && list[i + 1].my_line && item.my_line != list[i + 1].my_line || !item.next && item.type == 0)){
			editSplnum.prevJump.isOpen = true;
			if(item.type == 0){				
				lastBaridx = list[i - 1].my_bar_num;
				j = i - 1;
			}else{
				lastBaridx = item.my_bar_num;
				j = i;
			}
			for(; j >= 0; j--){
				item = list[j];
				if(!editSplnum.prevJump.jump[item.istart] && item.my_bar_num == lastBaridx && (item.type == 8 || item.type == 10)){
					editSplnum.prevJump.jump[item.istart] = 1;
				}else if(item.type != 8 && item.type != 10){
					break;
				}
			}
		}
	}
	list = null;
}

//谱子整体升8度
function staffUp8(sourceid){
	var content = $("#"+sourceid).val();
	if(content.indexOf("octave=")>-1){
		content = content.replace(/octave=(-*\d)/,function(a,b){
			return "octave="+(parseInt(b)+1);
		});
	}else{
		content = content.replace(/(K\s*:.*)/,"$1 octave=1");
	}
	$("#"+sourceid).val(content);
	src_change();
}
//谱子整体降8度
function staffDown8(sourceid){
	var content = $("#"+sourceid).val();
	if(content.indexOf("octave=")>-1){
		content = content.replace(/octave=(-*\d)/,function(a,b){
			return "octave="+(parseInt(b)-1);
		});
	}else{
		content = content.replace(/(K\s*:.*)/,"$1 octave=-1");
	}
	$("#"+sourceid).val(content);
	src_change();
}

//获取小节线数据
function getBarLineCoorData(){
	var data = getBarLineCoor(scale, null, musicType == 2 ? 6 : 9);
	if( !data){
		return [];
	}
	
	var firstBarStart = data[0].barline_start;
	var firstX = firstBarStart[0];
	var firstY = firstBarStart[1];
	
	var bar;
	var lastLine;
	for (var i = 0, len = data.length; i < len; i++) {
		bar = data[i];
		if (bar.line == 0) {
			// 第一行的数据
			bar.barline_start[1] -= 50;
			bar.barline_start[3] -= 50;
			bar.barline_end[1] -= 50;
			bar.barline_end[3] -= 50;
		}
		if (bar.line != lastLine) {
			// 第一列的数据
			bar.barline_start[0] = 0;
			bar.barline_start[2] = 0;
		}
		lastLine = bar.line;
	}
	return data;
}

/**
 * 将文件保存到本地，并生成本地URL地址，这样在外网中用起来速度快一点
 * @param url
 * @param cball
 * @returns
 */
function file2localurl( url, cball){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
	    if (this.readyState == 4 && this.status == 200){
	    	var localurl = (window.URL || window.webkitURL).createObjectURL(this.response);
			cball(localurl , url);
	    }
	}
	xhr.open('GET', url);
	xhr.responseType = 'blob';
	xhr.send(); 
}

// 对外调用
var abcUtil = {
	initBaiduDialog: initBaiduDialog,
	isJsonString: isJsonString,
	copyJson: copyJson,
	json2urlParams: json2urlParams,
	getUrlParamJson: getUrlParamJson,
	setHtmlFontSize: setHtmlFontSize,
	getChooseAbc: getChooseAbc,
	getAbcParams: getAbcParams,
	getTitleContent: getTitleContent,
	getBeet: getBeet,
	getK: getK,
	getM: getM,
	getL: getL,
	getQ: getQ,
	speedChange: speedChange,
	changeZKey: changeZKey,
	changeZKeyNew: changeZKeyNew,
	getSelNotePos: getSelNotePos,
	convert2RhythmAndPlay: convert2RhythmAndPlay,
	getNoteContent: getNoteContent,
	setScaleIfnull: setScaleIfnull,
	scaleAdd: scaleAdd,
	getAbcKeyArr: getAbcKeyArr,
	isPc: isPc,
	initAbcKeyValue: initAbcKeyValue,
	initAbcWidth: initAbcWidth,
	getData: getData,
	getSelectAbcContent: getSelectAbcContent,
	getNoteByKeySign: getNoteByKeySign,
	getNotesByBarLine: getNotesByBarLine,
	getLastFlag: getLastFlag,
	showNodeSeq: showNodeSeq,
	getAbcSpeedArr: getAbcSpeedArr,
	getAbcInstrument: getAbcInstrument,
	getNoteFromJpToWxp: getNoteFromJpToWxp,
	getBarIndexByNoteSeq: getBarIndexByNoteSeq, // 根据音符下标（getNoteData()中的第一个字段）获取其所在的小节序号
	isUrlValid: isUrlValid, // 根据音符下标（getNoteData()中的第一个字段）获取其所在的小节序号
	setLoopJump: setLoopJump,
	setPrevJump: setPrevJump,
	staffUp8: staffUp8,
	staffDown8: staffDown8,
	getBarLineCoorData: getBarLineCoorData,
	file2localurl: file2localurl
}