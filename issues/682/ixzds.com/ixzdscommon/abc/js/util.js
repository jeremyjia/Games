function getById(id){
	return document.getElementById(id);
}
String.prototype.replaceAll = function(s1,s2){ 
	return this.replace(new RegExp(s1,"gm"),s2); 
}
String.prototype.replaceAllNum = function(s1){ 
	return this.replace(new RegExp(/[0-9]/ig,"gm"),s1); 
}
String.prototype.startWith=function(str){    
	  var reg=new RegExp("^"+str);    
	  return reg.test(this);       
	} 
String.prototype.endWith=function(str){
	var reg=new RegExp(str+"$");  
	return reg.test(this); 
	}
Array.prototype.clone = function(){
    var a = [];
    for(var i=0;i<this.length;i++){
        a.push(this[i]);
    }
    return a;
};
//小节线的正则表达式
var nodeBarReg = /(\|[1-9\.]+)|(\|\[[1-9\.]+)|(:\|\|:)|(:\|:)|(:\|)|(::)|(\|:)|(\|\|)|(\|\])|(\|)/g;
Date.prototype.Format = function (fmt) { // author: meizz
	  var o = {
	    "M+": this.getMonth() + 1, // 月份
	    "d+": this.getDate(), // 日
	    "h+": this.getHours(), // 小时
	    "m+": this.getMinutes(), // 分
	    "s+": this.getSeconds(), // 秒
	    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
	    "S": this.getMilliseconds() // 毫秒
	  };
	  if (/(y+)/.test(fmt))
	    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	  for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	      return fmt;
	}
function unique(arr){
	  var hash=[];
	  for (var i = 0; i < arr.length; i++) {
	     if(hash.indexOf(arr[i])==-1){
	      hash.push(arr[i]);
	     }
	  }
	  return hash;
	}
// 用于生成uuid
function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
// 生成uuid
function uuid() {
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
// 去掉左边空格
function trimLeft(s){  
    if(s == null) {  
        return "";  
    }  
    var whitespace = new String(" \t\n\r");  
    var str = new String(s);  
    if (whitespace.indexOf(str.charAt(0)) != -1) {  
        var j=0, i = str.length;  
        while (j < i && whitespace.indexOf(str.charAt(j)) != -1){  
            j++;  
        }  
        str = str.substring(j, i);  
    }  
    return str;  
} 
function genspace(len){
	var str = "";
	for(var i=0;i<len;i++){
		str = str + " ";
	}
	return str;
}
// 获取textarea选中的开始位置
function getStartPos( textarea ){
		if ( typeof textarea.selectionStart != 'undefined' ){ // 非IE
			start = textarea.selectionStart;
		}else { // IE
			var range = document.selection.createRange();
			var range_textarea = document.body.createTextRange();
			range_textarea .moveToElementText(textarea);
			// 比较start point
			for ( var sel_start = 0; range_textarea .compareEndPoints('StartToStart' , range) < 0; sel_start++)
			range_textarea.moveStart( 'character', 1);
			start = sel_start;
		} 
		return start;
	}

// 获取textarea中选中的内容
function getSelectText(id) {
    var t = document.getElementById(id);
    if (window.getSelection) {
        if (t.selectionStart != undefined && t.selectionEnd != undefined && t.selectionStart!=t.selectionEnd) {
            return t.value.substring(t.selectionStart, t.selectionEnd);
        } else {
            return "";
        }
    } else {
        return document.selection.createRange().text;
    }
}

// 分数改为除法
function toFloat(str){
	if(str==null)return 0;
	if(str==""){return 0}
	
	if(str.indexOf("/")<0){
		return parseFloat(str);
	}
	var s = str.split("/");
	var result = parseFloat(s[0])/parseFloat(s[1]);
	return result;
}

// 在光标处插入
function insertText(str) {
	var obj = document.getElementById("source");
	if (document.selection) {
        var sel = document.selection.createRange();
        sel.text = str;
    } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart,
            endPos = obj.selectionEnd,
            tmpStr = obj.value;
        // 光标位置
        var cursorPos = getStartPos(getById("source"));
        if(cursorPos==0){
        	cursorPos = obj.value.length;
        }
        obj.value = tmpStr.substring(0, cursorPos) + str + tmpStr.substring(cursorPos, tmpStr.length);
        setCaretPosition(document.getElementById("source"),cursorPos+str.length);
        setTimeout(function(){
        	var elts = document.getElementsByClassName("_" + cursorPos + "_");
            if (elts[0]) elts[0].scrollIntoView()
        	
        },300)
    } else {
        obj.value += str;
    }
}
/**
 * 插入到选定的声部
 * @param str
 * @param insertLyric 是否插入歌词
 * @returns
 */
function insertWithVoice(str,insertLyric){
	var content = $("#source").val();
	var lines = content.split("\n");
	var vPattern = new RegExp("V:\s*"+currInputVoice);
	if(!vPattern.test(content)){
		content = replaceBlankLine(content);
		content = content + "\nV:2 bass\n";
		
		lines = content.split("\n");
	}
	var lineStr = "";
	var lineIndex = lines.length-1;
	for(var i=0;i<lines.length;i++){
		var line = lines[i];
		if (vPattern.test(line)) {
			for(var j=i+1;j<lines.length;j++){
				if(lines[j].indexOf("%%")<0 && lines[j].indexOf("w:")<0 && lines[j].indexOf("N:")<0){
					if(lines[j].indexOf("V:")>-1){
						break;
					}
					lineStr = lines[j];
					lineIndex = j;
				}
			}
		}
	}
	if(lineStr == "z"){
		lineStr = "";
	}
	lineStr += str;
	var result = "";
	for(var i=0;i<lines.length;i++){
		if(i != lineIndex){
			result += lines[i];
			if(i!=(lines.length-1)){
				result += "\n";
			}
		}else{
			result += lineStr ; 
			if(lineIndex!=(lines.length-1)){
				result += "\n";
			}
		}
	}
	result = replaceBlankLine(result);
	$("#source").val(result);
	// 自动增加小节线
	autoNodeLine2(lineIndex);
	return lineIndex;
	
}

// 光标移动到最后
function moveEnd(){
	var obj = document.getElementById("source");
	obj.focus();
	var len = obj.value.length;
	if (document.selection) {
		var sel = obj.createTextRange();
		sel.moveStart('character',len);
		sel.collapse();
		sel.select();
	} else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
		obj.selectionStart = obj.selectionEnd = len;
	}
} 

/**
 * 设置textarea的选中区域
 */
function setSelectRange( textarea, start, end ){
	if ( typeof textarea.createTextRange != 'undefined' ){
		var range = textarea.createTextRange();
		// 先把相对起点移动到0处
		range.moveStart( "character", 0)
		range.moveEnd( "character", 0);
		range.collapse( true); // 移动插入光标到start处
		range.moveEnd( "character", end);
		range.moveStart( "character", start);
		range.select();
	}else if(typeof textarea.setSelectionRange!= 'undefined'){
		textarea.setSelectionRange(start, end);
		textarea.focus();
	} 
} 
// 把音高的符号去掉^,_,=
function replaceYinGao(str){
	return str.replace("^","").replace("_","").replace("=","")
}

// 获取URL参数信息
function getUrlParameter(name){
	if(location.search==''){
		return '';
	}
	
	var o={};
	var search=location.search.replace(/\?/,'');// 只替换第一个问号,如果参数中带有问号,当作普通文本
	search = decodeURIComponent(search);
	var s=search.split('&');
	for(var i=0;i<s.length;i++){
		o[s[i].split('=')[0]]=s[i].split('=')[1];
	}
	return o[name]==undefined?'':o[name];
}

/**
 * 显示全屏遮罩层
 * 
 * @returns
 */
function maskFullTxt( txt) {
	if( !txt || txt == undefined){
		txt = "加载中...";
	}
	var html = '';
	html += '<div class="modal-backdrop fade loading" ></div>';
	html += '<div class="modal center-modal fade show loading-box" id="modal-mask" ondblclick="hideMaskFullTxt()">';
	html += '  <div class="modal-dialog">';
	html += '	<div class="modal-content">';
	html += '	  <div class="modal-body text-center"><div class="outer"></div>';
	html += '		<span id="maskfulltxt">' + txt + "</span>";
	html += '	  </div>';
	html += '	</div>';
	html += '  </div>';
	html += '</div>';
	$("body").append( html);
	// return html;
}
function hideMaskFullTxt(){
	$(".loading,.loading-box").remove();
}
// 去掉空行
function replaceBlankLine(){ 
	var reg = /\n(\n)*( )*(\n)*\n/g; 
	var oldStr = $("#source").val(); 
	var newStr = oldStr.replace(reg,"\n"); 
	$("#source").val(newStr); 
}
function replaceBlankLine(val){ 
	var reg = /\n(\n)*( )*(\n)*\n/g; 
	return val.replace(reg,"\n"); 
}
// 替换引号及引号内的内容
function replaceQuotation(str){
	return str.replaceAll(/"[^"]+"/g,"").replace(/[()]/g,"");
}


// 生成谱子对应的节奏谱
function getMetro(sourceid){
	var content = $("#"+sourceid).val();
	var M_pattern = /M:.*\n/g;
	var L_pattern = /L:.*\n/g;
	var m_result = content.match(M_pattern);
	var l_result = content.match(L_pattern);
	var M = m_result[0].replaceAll("M:","").replaceAll(" ","").split("/")[1]
	var L = l_result[0].replaceAll("L:","").replaceAll(" ","").split("/")[1];
	var lines = content.split("\n");
	var result = "";
	if(lines!=null){
		for(var i=0;i<lines.length;i++){
			var line = lines[i];
			 
			var tmp = replaceQuotation(line);
			
			if(tmp.replace(/\{.[^\}]*\}/g,"").indexOf("|")>-1){
				break;
			}
			if(line.indexOf("MIDI program")>-1){
				result = result + "%%MIDI program 115 \n";					 
			}else{
				result = result + line + "\n";
			}
		}
	}
	var sz = parseInt(L)/parseInt(M);
	if(sz<1){
		if(sz==0.5){
			sz = "/";
		}
		if(sz==0.25){
			sz = "//";
		}
	}else if(sz==1){
		sz = "";
	}
	if(result!=""){
		for(var i=0;i<50;i++){
			result = result + "A"+sz;
		}
	}
	if(result.indexOf("MIDI program")<0){
		result = result + "\n%%MIDI program 115";			
	}
	return result;
}
String.prototype.startWith=function(str){    
	  var reg=new RegExp("^"+str);    
	  return reg.test(this);       
	}  

// 工具方法
var formatJson = function(json, options) {
                   return json.replaceAll("\n","").replaceAll("{","\n{").replaceAll("}","}\n")
                };
                
function svgdownload(svgid){
	var svgXml = $(svgid).html();
	 
	var image = new Image();
	image.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgXml))); // 给图片对象写入base64编码的svg流
	 
	var canvas = document.createElement('canvas');  // 准备空画布
	canvas.width = $(svgid+' svg').width();
	canvas.height = $(svgid + ' svg').height();
	 
	var context = canvas.getContext('2d');  // 取得画布的2d绘图上下文
	context.drawImage(image, 0, 0);
	 
	var a = document.createElement('a');
	a.href = canvas.toDataURL('image/png');  // 将画布内的信息导出为png图片数据
	a.download = "MapByMathArtSys";  // 设定下载名称
	a.click(); // 点击触发下载
}

// datauri转为blob，主要是把生成的midi文件传到服务端
function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that
	// does this
    
    var byteString = "";
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // Old Code
    // write the ArrayBuffer to a blob, and you're done
    // var bb = new BlobBuilder();
    // bb.append(ab);
    // return bb.getBlob(mimeString);

    // New Code
    return new Blob([ab], {type: mimeString});
}
// 获取当前谱例的谱表数量V：1，V：2 。。。。
function getVNum(source){
	var pattern = /V:.[^V]*\n/g;
	var content = $("#"+source).val();
	var result = content.match(pattern);
	if(result!=null){
		return result.length;
	}
	return 1;
	
}

/**
 * 使用分析小节线位置的方法，读取所有音符的数据
 * 
 * @param paper
 *            被宣染的svg所在的层的id
 * @param source
 *            abc源代码存放的容器
 * @returns
 */
function getNodeDatas_v1(paper,source){
	var nodeHeight = 0;
	var line1 = 0;
	var line5 = 0;
	var content = $("#source").val();
	// 节奏谱会出现上下错乱的情况
	var one_line_flag = false;
	if(content.indexOf("stafflines=1")>-1){
		one_line_flag = true;
	}
	
	$.each($("#"+paper+" svg>g").first().find("path"),function(i,item){
		if(i==0){
			line1 = $(item).attr("d").split(" ")[2];
		}
		line5 = $(item).attr("d").split(" ")[2];
	})
	// 计算五线的高度
	var h = parseFloat(line5)-parseFloat(line1);
	var datas = new Array();
	var totalHeight = 0;
	var last_y = 0;
	var obj = new Object();
	
	var noteContents = getNoteContent()[0].str;
	var nodes = noteContents.replaceAll("\\|\\|","|").split("|");
	// [{"node_index":"1","point":[19, 26, 19,
	// 106],"meter":"2","notes":[[c,0.5],[d,0.5]]}]
	var node_index = 0;
	var lastBarline = new Object();
	$.each($("#"+paper+" rect[type='bar']"),function(i,item){
		var node = new Object();
		// 开始小节线
		var barline_start = new Array();
		// 结束小节线
		var barline_end = new Array();
		var notes = new Array();
		var nodestr = "";
		var x1,y1,x2,y2;
		x1 = Number($(item).attr("x")) + Number($(item).attr("width"))/2;
		y1 = Number($(item).attr("y"));
		x2 = Number($(item).attr("x")) + Number($(item).attr("width"))/2;
		y2 = Number($(item).attr("y")) + Number($(item).attr("height"));
		if(content.indexOf("stafflines")>-1){
			// 节奏谱的高度直接取bar的属性
			h = Number($(item).attr("height"));
		}
		barline_end.push(x1.toFixed(2)*staffscale);
		barline_end.push((y2-h).toFixed(2)*staffscale);
		barline_end.push(x2.toFixed(2)*staffscale);
		barline_end.push(y2.toFixed(2)*staffscale);
		nodestr = nodes[i];
		if(nodestr==undefined){
			return;
		}
		// 如果内容是空，则忽略
		if(nodestr.replaceAll(" ","")==""){
			return;
		}
		// 去掉修饰符
		nodestr = nodestr.replaceAll(/((![0-9]*!)|(![a-zA-Z]*!)|(!\>!)|(!\<\(!)|(!\<\)!)|(!\>\(!)|(!\>\)!)|\.|v|u|\>|P)/g,"")
		nodestr = nodestr.replaceAll(":","").replaceAll("-","").replaceAll("\{.[^\}]*\}","");
		nodestr = nodestr.replaceAll(/\".*\"/,"");
		var notes = getNotesLength(nodestr);
		node.notes = notes;
		node.barline_end = barline_end;
		// 换行了，则增加一个第一小节的小节线（每行最前面没有小节线）,并把上一行的最后一个小节线标识linelast=1
		if(last_y!=y2){
			barline_start = new Array();
			var line_first_node = new Object();
			var f_x1=10,f_y1=y1,f_x2=10,f_y2=y2;
			barline_start.push(f_x1.toFixed(2)*staffscale);
			barline_start.push((f_y2-h).toFixed(2)*staffscale);
			barline_start.push(f_x2.toFixed(2)*staffscale);
			barline_start.push(f_y2.toFixed(2)*staffscale);
		}else{
			barline_start = lastBarline;
		}
		node.barline_start = barline_start;
		// 原来的索引+1
		node.linefirst = 0;
		node.linelast = 0;
		node.node_index = node_index++;
		last_y = y2;
		lastBarline = barline_end;
		datas.push(node);
		/*
		 * console.log($(item).parents("svg").attr("height")) var height =
		 * $(item).parents("svg").attr("height").replace("px",""); var line =
		 * $(item).parents("svg").attr("line"); if(last_line!=line){ totalHeight =
		 * totalHeight + parseInt(height); } last_line = line; x1 =
		 * $(item).attr("x"); y1 = totalHeight + $(item).attr("y");
		 * 
		 * console.log("totalHeight:"+totalHeight)
		 */
	});
	datas[datas.length-1].linelast = 1;
	// 节奏谱会出现上下错乱的情况
	if(one_line_flag){
		datas.sort(function(a,b){
			return a.barline_end[1]- b.barline_end[1]
		});
	}
	return datas;
	
}
/**
 * 使用分析小节线位置的方法，读取所有音符的数据
 * 
 * @param source
 *            abc源代码存放的容器
 * @returns
 */
function getNodeDatas_v2(source){
	var size = getVNum(source);
	var content = $("#"+source).val();
	var patterns = new Array();
	var pattern_str;
	var last_pattern_str = 0;
	var node_contents = new Array();
	var datas = new Array();
	for(var i=1;i<=size;i++){
		var pattern = eval("/\\[V:\\s*"+i+".[^\\[]*]/");
		var result = content.match(pattern);
		pattern_str = result[0];
		patterns.push(pattern_str)
		if(i>1){
			node_contents.push(content.substring(content.indexOf(last_pattern_str)+last_pattern_str.length,content.indexOf(pattern_str)));
		}
		last_pattern_str = pattern_str;
	}
	node_contents.push(content.substr(content.indexOf(pattern_str)+pattern_str.length));
	for(var i=0;i<node_contents.length;i++){
		var noteContents = node_contents[i];
		var nodes = noteContents.split("|");
		var index = 0;
		for(var j=0;j<nodes.length;j++){
			var node = new Object();
			nodestr = nodes[j];
			// 去掉修饰符
			nodestr = replaceSuffix(nodestr);
			// 如果内容是空，则忽略
			if(nodestr.replace(/\n/,"").replaceAll(" ","")==""){
				continue;
			}
			var notes = getNotesLength(nodestr);
			node.v = i+1;
			node.node_index = index++;
			node.notes = notes;
			datas.push(node);
		}
	}
	return datas;
}

// 取节拍器速度
function getMetroSpeed(sourceid){
	var speed;
	var content = $("#"+sourceid).val();
	var Q_pattern = /Q:.*\n/g;
	var q_result = content.match(Q_pattern);
	var val =  q_result[0].replaceAll("Q:","").replaceAll(" ","");
	
	var M_pattern = /M:.*\n/g;
	var m_result = content.match(M_pattern);
	var m_val = m_result[0].replaceAll("M:","").replaceAll(" ","")
	
	if(val==null || val==""){
		speed==120;
	}else{
		var str = val.split("=");
		var speedUnit = str[0].split("/")[1];
		var speedVal = str[1];
		var m = m_val.split("/")[1];
		if(m!=null && m!=""){
			speed = parseInt(speedVal)*m/speedUnit;
		}
	}
	return speed;
}
/**
 * 批量升高或降低音高
 * 
 * @param oldnotestr
 *            原来的音符字符串
 * @param interval
 *            升降数量
 * @returns
 */
function updownnote(oldnotestr,interval){
	var isChord = false;
	var ori = oldnotestr + "";
	if(oldnotestr.indexOf("[")>-1 && oldnotestr.indexOf("]")>-1){
		var p = /\[(.*)\]\d*/g;
		oldnotestr = p.exec(oldnotestr)[1]//;//oldnotestr.replace(/[\[\]]/g,"");
		isChord = true;
	}
	
	
	var notes = new Array();
	
	var noNoteReg = /\".[^\"]*\"|\!.[^\!]*\!/g;
	var obj;
	var lastIndex = 0;
	while(obj = noNoteReg.exec(oldnotestr)){
		if(obj.index>0){
			var substr = oldnotestr.substring(lastIndex,obj.index);
			updownnote_(substr,lastIndex,notes,interval);
		}
		lastIndex = obj.index + obj[0].length;
	}
	if(lastIndex!=oldnotestr.length){
		var substr = oldnotestr.substring(lastIndex);
		updownnote_(substr,lastIndex,notes,interval);
	}

	var newStr = "";
	for(var i = 0;i<notes.length;i++){
		var curr = notes[i];
		var start = curr.index;
		var end = 0;
		if(i<notes.length-1){
			end = notes[i+1].index;
		}else{
			end = oldnotestr.length;
		}
		var str = oldnotestr.substring(start,end);
		str = str.replace(curr.old_note,curr.new_note);
		if(i==0){
			str = oldnotestr.substring(0,start) + str;
		}
		
		newStr = newStr + str;
	}
	if(isChord){
		newStr = ori.replace(oldnotestr,newStr);
	}
	return newStr;
}
//上面那个方法的子方法
function updownnote_(substr,lastIndex,notes,interval){
	var preMatchs = null,preStr = "";
	var pattern = /\^*\_*\=*[A-Ga-gz]\,*\'*/g;
	var prePattern = /\^{1,2}|\_{1,2}|\={1}/g;
	var notestr = "";
	while(notestr = pattern.exec(substr)){
		var o = new Object();
		o.old_note = notestr[0];
		preMatchs = o.old_note.match(prePattern);
		if(preMatchs!=null){
			preStr = preMatchs[0];
		}
		if(o.old_note=="z"){
			o.new_note="z";
		}else if(o.old_note=="z,"){
			o.new_note="z,";
		}else{
			if(Math.abs(interval)==1){
				o.new_note = getStandNoteByInterval(notestr[0],interval);
			}else if(Math.abs(interval)==12){
				o.new_note = getStandNoteByInterval(notestr[0].replace(/[\^\_\=]/g,""),interval);
				if(preStr!=""){
					//把前面的升降号替换为原来的
					o.new_note = preStr + o.new_note.replace(/[\^\_\=]/g,"");
				}
			}
			
		}
		o.index = lastIndex + notestr.index;
		notes.push(o);
	}
}

//升降8度特殊处理
function updown8(oldNoteStr,interval){
	var noteReg = /\[(.+?)\]|\"(.+?)\"|!(.+?)!|[a-gA-G]{1}[,']*/g;
	
	var notes = oldNoteStr.match(noteReg);
	var newStr = "";
	if(notes != null){
		for(var i=0;i<notes.length;i++){
			var note = notes[i],str = notes[i];
			var index = oldNoteStr.indexOf(str);
			newStr += oldNoteStr.substr(0,index);
			if(str.indexOf("[")>-1){
				//处理[]和弦的
				if(str.indexOf(":")>-1){
					//中间有：号的不处理
					newStr += note;
				}else{
					var reg = /[a-gA-G]{1}[,']*/g;
					var chordNotes = str.match(reg);
					for(var j=0;j<chordNotes.length;j++){
						var chordNote = chordNotes[j];
						newStr += str.substring(0,str.indexOf(chordNote));
						newStr += genUpOrDown8(chordNote,interval);
						str = str.substr(str.indexOf(chordNote) + chordNote.length);
					}
					if(str!=""){
						newStr += str;
					}
				}
			}else if(str.indexOf('"')>-1 || str.indexOf("!")>-1){
				newStr += note;
			}else{
				newStr += genUpOrDown8(str,interval);
			}
			oldNoteStr = oldNoteStr.substring(index+note.length);
		}
		if(oldNoteStr!=""){
			newStr +=oldNoteStr;
		}
	}
	return newStr;
}

var lowerReg = /[a-g]/;
var upperReg = /[A-G]/;
function genUpOrDown8(str,type){
	//升8度
	if(type==8){
		if(lowerReg.test(str)){
			//小写的
			if(str.indexOf(",")>-1){
				return str.replace(",","");
			}else{
				return str + "'";
			}
		}else if(upperReg.test(str)){
			//大写
			if(str.indexOf(",")>-1){
				return str.replace(",","");
			}else if(str.indexOf("'")>-1){
				return str + "'";
			}else{
				return str.toLowerCase();
			}
		}
	}else if(type==-8){
		if(upperReg.test(str)){
			//大写的
			if(str.indexOf("'")>-1){
				return str.replace("'","");
			}else{
				return str+",";
			}
		}else if(lowerReg.test(str)){
			//小写
			if(str.indexOf("'")>-1){
				return str.replace("'","");
			}else if(str.indexOf(",")>-1){
				return str + ",";
			}else{
				return str.toUpperCase();
			}
		}
	}
	return str;
}

// 设置光标位置
function setCaretPosition(textDom, pos){
    if(textDom.setSelectionRange) {
        // IE Support
        textDom.focus();
        textDom.setSelectionRange(pos, pos);
    }else if (textDom.createTextRange) {
        // Firefox support
        var range = textDom.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

function move2End(){
	// 跳到最后，如果有歌词，则跳到歌词的前一行
	var content = document.getElementById("source").value;
	if(content.indexOf("w:")>-1 || content.indexOf("N:")>-1){
		var lastPos = content.length;
		var pattern = /\n(.*)/g;
		var result = content.match(pattern);
		if(result!=null){
			for(var i=result.length-1;i>=0;i--){
				var s = result[i];
				if(s.indexOf("w:")>-1 || s.indexOf("N:")>-1){
					lastPos = lastPos-s.length;
				}else{
					break;
				}
			}
		}
		setCaretPosition(document.getElementById("source"),lastPos)
	}else{
		moveEnd();
	}
}
// 获取音符最后位置（排除歌词）
function getNoteEndPos(){
	var content = document.getElementById("source").value;
	if(content.indexOf("w:")>-1 || content.indexOf("N:")>-1){
		var lastPos = content.length;
		var pattern = /\n(.*)/g;
		var result = content.match(pattern);
		if(result!=null){
			for(var i=result.length-1;i>=0;i--){
				var s = result[i];
				if(s.indexOf("w:")>-1 || s.indexOf("N:")>-1){
					lastPos = lastPos-s.length;
				}else{
					break;
				}
			}
		}
		return lastPos
	}
	return content.length;
}

// 获取textarea当前行字符串
function getCurrentLineContent(textid,cursorPos){
	var content = document.getElementById(textid).value;
	var pattern = /\n(.*)/g;
	var lines = content.split("\n")
	var line_start = 0;
	var line_end = 0;
	
	if(lines!=null){
		for(var i=0;i<lines.length;i++){
			// 这里加1是因为换行占用一个位置
			line_end = line_end + lines[i].length + 1;
			if(line_end>cursorPos){
				return lines[i];
			}
		}
	}
	return "";
}

// 生成歌词的div
// 该 方法没用了
function getLyricDiv_nouse(sourceid){
	$("#lyric_edit_div").html("");
	var content = $("#"+sourceid).val();
	var lines = content.split("\n");
	var input_demo = '<input type="text" style="width:40px;margin:1px;" line="var_line" index="var_index" note="var_note" value="var_value" inner_line="0">';
	// 音符正则表达式
	var notes_pattern = /(\[[\^\_\=A-Ya-y\/1-9,']*\])|(\^){0,1}(\_){0,1}(\=){0,1}[^\[\s\]]{1}[\,\'\/|1-9]*/g;
	var note_pattern = /[a-yA-Y]/;
	var inputbuffer = "";
	var input_count = 0;
	var line_count = 0;
	var newstaff = "";
	if(lines!=null){
		// 遍历所有音符行
		for(var i=0;i<lines.length;i++){
			var line = lines[i];
			// 去掉引号的内容
			line = line.replaceAll(/\".*\"/g,"");
			var next_line = "";
			if((i+1)<lines.length){
				next_line = lines[i+1];
			}
			newstaff += line + "\n";
			// 找到正式谱子
			if(line.replace(/\[.[^\]]*\]/,"").replace(/\{.[^\}]*\}/,"").indexOf("|")>-1){
				// 不是歌词行
				if(line.indexOf("w:")<0 && line.indexOf("N:")<0){
					line_count++;
					inputbuffer +="<div line=\""+(line_count)+"\">";
					// 去掉引号内的内容
					line = line.replaceAll(/\".[^\"]*\"/,"");
					// 去掉小节线
					line = line.replaceAll("\\|","");
					// 得到每个音符
					var notes = line.match(notes_pattern);
					var note_index = 0;
					// 模板行（用于有多于1行的歌词的模板）
					var line_demo = "";
					if(notes!=null){
						// 一个音符一个输入框
						for(var k=0;k<notes.length;k++){
							if(note_pattern.test(notes[k])){
								inputbuffer += input_demo.replace("var_index",input_count++).replace("var_note",notes[k]).replace("var_value","value_"+note_index).replace("var_line",line_count);
								line_demo += input_demo.replace("var_index",input_count++).replace("var_note",notes[k]).replace("var_value","value_"+note_index).replace("var_line",line_count);
								note_index++;
							}
						}
					}
					// 下一行不是歌词，则增加一个空的歌词行
					if(next_line.indexOf("w:")<0 && next_line.indexOf("N:")<0){
						newstaff += "w:\n";
					}
					
					// 下一行是歌词,回填
					if(next_line.indexOf("w:")>-1){
						next_line = next_line.replace("w:","").replaceAll(":","").replaceAll("\\|"," ");
						var lyrics = $.trim(next_line).split(" ");
						var lyric_index = 0;
						if(lyrics!=null){
							for(var k=0;k<lyrics.length;k++){
								if($.trim(lyrics[k])!=""){
									inputbuffer = inputbuffer.replace("value_"+(lyric_index++),lyrics[k].replace("*",""))
								}
							}
						}	
					}
					// i+1行后的歌词行处理
					var tmp_inner_line = 1;
					for(j=2;j<4;j++){
						if((i+j)<lines.length){
							n_line = lines[i+j];
							if(n_line.indexOf("w:")>-1){
								n_line = n_line.replace("w:","").replaceAll(":","").replaceAll("\\|"," ");;
								var m_lyric = line_demo;
								var lyrics = $.trim(n_line).split(" ");
								var lyric_index = 0;
								if(lyrics!=null){
									for(var k=0;k<lyrics.length;k++) {
										if($.trim(lyrics[k])!="") {
											m_lyric = m_lyric.replace("inner_line=\"0\"","inner_line=\""+tmp_inner_line+"\"").replace("value_"+(lyric_index++),lyrics[k].replace("*",""))
										}
									}
								}
								inputbuffer += "<br>"+m_lyric;
							}else{
								break;
							}
							tmp_inner_line++;
						}
					}
					
					
					inputbuffer = inputbuffer.replace(/value\_[0-9]{1,2}/g,"");
					inputbuffer += '<input type="button" value="+" onclick="add_lyric_line(\''+sourceid+'\','+line_count+')">';
					inputbuffer += "</div><hr>";
				}
				
			}
		}
	}
	newstaff = replaceBlankLine(newstaff);
	$("#"+sourceid).val(newstaff)
	return inputbuffer;
}
// 增加同样一行歌词
function add_lyric_line(sourceid,line_num){
	
	var max_inner_line = getMaxInnerLine(line_num);
	
	$.each($("#lyric_edit_div input[line='"+line_num+"'][inner_line='0']"),function(i,item){
		var c = $(item).clone();
		$(c).attr("inner_line",max_inner_line+1).val("");
		$("#lyric_edit_div div[line='"+line_num+"']").append(c);
	});
	$("#lyric_edit_div div[line='"+line_num+"']").append($("<br>"));
	// 歌词输入框输入事件
	$("#lyric_edit_div input").on("input",function(){
		lyricInputChangeHandler(this,sourceid)
	});
}
// 最大行号
function getMaxInnerLine(line_num){
	var max = 0;
	$.each($("#lyric_edit_div input[line='"+line_num+"']"),function(i,item){
		var inner_line = $(item).attr("inner_line");
		if(parseInt(inner_line)>max){
			max = parseInt(inner_line);
		}
	});
	return max;
}
// 根据字符序号找到所在的行号
function findLineNumByIndex(content,index){
	var lines = content.split("\n");
	var char_num = 0;
	for(var i=0;i<lines.length;i++){
		char_num += lines[i].length + 1;
		if(char_num > index){
			return i;
		}
	}
	return 0;
}
// 音符与歌词的对应关系
function note_lyrics_data(sourceid){
	// 所有的音符（包括小节线）
	var content = $("#"+sourceid).val();
	// 添加行号
	for(var j=0;j<syms.length;j++){
		if(!syms[j]){
			continue;
		}
		syms[j].line = findLineNumByIndex(content,syms[j].istart);
	}
	return syms;
}
// 取头部信息
function getHeadStaff(sourceid){
	var content = $("#"+sourceid).val();
	var lines = content.split("\n");
	var headstaff = "";
	var firstNoteLine = getFirstNoteLine(sourceid);
	for(var i=0;i<lines.length;i++){
		if(i<firstNoteLine){
			var line = lines[i];
			headstaff += line+"\n";
		}
	}
	return headstaff;
}
/**
 * 选段
 * 
 * @param sourceid
 * 
 * @param start
 *            开始下标
 * 
 * @param end
 *            结束下标
 * 
 * @param stave
 *            是否是大谱表，true是，false否
 * 
 * @returns
 */
function getPartStaff(sourceid,start,end,stave){
	var firstNoteLine = getFirstNoteLine(sourceid);
	
	var slist = note_lyrics_data(sourceid);
	var content = $("#"+sourceid).val();
	var staff = "";
	var lastLine = -1;
	// 上一个音符的iend
	var lastEnd = -1;
	// 上一个歌词的iend
	var staffArr = new Array();
	var obj = new Object();
	
	// 大谱表，则根据小节来选段(大谱表和单谱表区别在于大谱表按小节来选段，单谱表按音符来选段)
	if(stave){
		var startBar = -1;
		var endBar = -1;
		// 确认开始小节和结束小节数据
		for(var i=0;i<slist.length;i++){
			if(!slist[i]){
				continue;
			}
			if(slist[i].istart == start || getLyricIstart(slist[i]).indexOf(start)>-1){
				startBar = slist[i].bar_index;
			}
			if(slist[i].istart == end || getLyricIstart(slist[i]).indexOf(end)>-1){
				endBar = slist[i].bar_index;
			}
		}
		for(var i=0;i<slist.length;i++){
			if(slist[i].line<firstNoteLine){
				continue;
			}
			var istart  = slist[i].istart;
			var iend = slist[i].iend;
			var ibar = slist[i].bar_index;
			// 歌词
			var ly = slist[i].a_ly;
			var v = slist[i].v;
			// 一个声部数据存在一个staffObj里面
			var staffObj = new Object();
			staffObj.v = v;
			// console.log(slist[i]);
			if(v==1 && slist[i].type==0){
			}
			staffObj.staff = "";
			staffObj.lyrics = new Array();
			// 是否已经存在声部数据
			var exist = false;
			for(var j=0;j<staffArr.length;j++){
				if(staffArr[j].v == v){
					staffObj = staffArr[j];
					exist = true;
					break;
				}
			}
			// 不存在则新增一个声部数据
			if(!exist){
				staffArr.push(staffObj);
			}
			// 按小节选段
			if(ibar>=startBar && ibar<=endBar){
				// 补空
				if(lastEnd!=-1 && istart>lastEnd && staffObj.staff!=""){
// for(var j=0;j<(istart-lastEnd);j++){
// staffObj.staff += " ";
// }
					var tmpStr = content.substring(lastEnd,istart);
					if(tmpStr.indexOf("\n")<0){
						staffObj.staff += tmpStr;
					}
				}
				
				if(lastLine!=-1 && lastLine!=slist[i].line && staffObj.staff!=""){
					staffObj.staff += "\n";
				}
				staffObj.staff += content.substring(istart,iend);
				// 处理歌词start************************************
				handleLyric(slist[i],staffObj,lastLine,content);
				// 处理歌词end************************************
			}
			
			lastLine = slist[i].line;
			lastEnd = slist[i].iend;
		}
		
	}else{
		// 确认开始音符和结束音符数据
		for(var i=0;i<slist.length;i++){
			if(slist[i].istart == start || getLyricIstart(slist[i]).indexOf(start)>-1){
				start = slist[i].istart;
			}
			if(slist[i].istart == end || getLyricIstart(slist[i]).indexOf(end)>-1){
				end = slist[i].istart;
			}
		}
		for(var i=0;i<slist.length;i++){
			var istart = slist[i].istart;
			var iend = slist[i].iend;
			var v = slist[i].v;
			// 一个声部数据存在一个staffObj里面
			var staffObj = new Object();
			staffObj.v = v;
			staffObj.staff = "";
			staffObj.lyrics = new Array();
			
			// 是否已经存在声部数据
			var exist = false;
			for(var j=0;j<staffArr.length;j++){
				if(staffArr[j].v == v){
					staffObj = staffArr[j];
					exist = true;
					break;
				}
			}
			// 不存在则新增一个声部数据
			if(!exist){
				staffArr.push(staffObj);
			}

			if(istart>=start && istart<=end){
				// 补空
				if(lastEnd!=-1 && istart>lastEnd && staffObj.staff!=""){
// for(var j=0;j<(istart-lastEnd);j++){
// staffObj.staff += " ";
// }
					var tmpStr = content.substring(lastEnd,istart);
					if(tmpStr.indexOf("\n")<0){
						staffObj.staff += tmpStr;
					}
				}
				if(lastLine!=-1 && lastLine!=slist[i].line){
					staffObj.staff += "\n";
				}
				staffObj.staff += content.substring(istart,iend);
				// 处理歌词start************************************
				handleLyric(slist[i],staffObj,lastLine,content);
				// 处理歌词end************************************
			}
			
			lastLine = slist[i].line;
			lastEnd = slist[i].iend;
		}
	}
	return arr2Str(staffArr);
}
// 通过歌词确定对应音符的位置（getPartStaff的子方法）
function getLyricIstart(s){
	var arr = new Array();
	if(s.a_ly){
		for(var i=0;i<s.a_ly.length;i++){
			if(s.a_ly[i]){
				arr.push(s.a_ly[i].istart);
			}
		}
	}
	return arr;
}
// 把数组转换为字符串（getPartStaff的子方法）
function arr2Str(staffArr){
	var str = "";
	if(staffArr!=null){
		for(var i=0;i<staffArr.length;i++){
			if(staffArr.length>1){
				str += "V:"+(i+1)+"\n";
			}
			var staff = staffArr[i].staff;
			// 音符行数组
			var staffLines = staff.split("\n");
			for(var k=0;k<staffLines.length;k++){
				str += staffLines[k]+"\n";
				var lyrics = staffArr[i].lyrics;
				for(var j=0;j<lyrics.length;j++){
					// 歌词行数组
					var lyricsLines = lyrics[j].words.split("\n");
					if(lyricsLines[k]){
						str += "w:"+lyricsLines[k]+"\n"
					}
					
				}
			}
			
		}
	}
	return str;
}
// 处理歌词（getPartStaff的子方法）
function handleLyric(s,staffObj,lastLine,content){
	// 歌词
	var ly = s.a_ly;
	if(s.a_ly && ly!=null){
		for(var k=0;k<ly.length;k++){
			var lyric = ly[k];
			var lyricObj = new Object();
			lyricObj.field = k;
			lyricObj.words = "";
			
			
			var existField = false;
			for(var x = 0;x<staffObj.lyrics.length;x++){
				if(staffObj.lyrics[x].field ==k){
					lyricObj = staffObj.lyrics[x];
					existField = true;
					break;
				}
			}
			if(!existField){
				staffObj.lyrics.push(lyricObj);
			}
			if(lyric!=null){
				// 补空格
				if(lyricObj.iend && lyric.istart>lyricObj.iend && lyricObj.words!=""){
// for(var y=0;y<(lyric.istart-lyricObj.iend);y++){
// lyricObj.words += " ";
// }
					var tmpStr2 = content.substring(lyricObj.iend,lyric.istart);
					if(tmpStr2.indexOf("\n")<0){
						lyricObj.words += tmpStr2.replaceAll("\\|","").replaceAll("\\*","");
					}
				}
				if(lyricObj.line && lyricObj.line!=-1 && lyricObj.line!=s.line){
					lyricObj.words += "\n";
				}
				
				lyricObj.words += content.substring(lyric.istart,lyric.iend);
				lyricObj.iend = lyric.iend;
				lyricObj.line = s.line;
			} 
		}
	}else{
		if(s.type==0){
			// lyricObj.words += "|";
			for(var i=0;i<staffObj.lyrics.length;i++){
				var lyricObj = staffObj.lyrics[i];
				if(lyricObj.line && lyricObj.line!=-1 && lyricObj.line!=s.line){
					lyricObj.words += "\n";
				}
				lyricObj.words += "|";
				lyricObj.line = s.line;
			}
		}else if(s.type==8){
			for(var i=0;i<staffObj.lyrics.length;i++){
				var lyricObj = staffObj.lyrics[i];
				if(lyricObj.line && lyricObj.line!=-1 && lyricObj.line!=s.line){
					lyricObj.words += "\n";
				}
				lyricObj.words += "*";
				lyricObj.line = s.line;
			}
		}
	}
}
// 取第一行音符所在的行号
function getFirstNoteLine(sourceid){
	var content = $("#"+sourceid).val();
	var lines = content.split("\n");
	for(var i=0;i<lines.length;i++){
		var line = lines[i];
		if(line.indexOf("%%")==0
				|| line.indexOf("X:")==0
				|| line.indexOf("T:")==0
				|| line.indexOf("C:")==0
				|| line.indexOf("L:")==0
				|| line.indexOf("Q:")==0
				|| line.indexOf("M:")==0
				|| line.indexOf("K:")==0){
			continue;
		}
		if(line.indexOf("|")>-1){
			return i;
		}
	}
//	var slist = note_lyrics_data(sourceid);
//	for(var i=0;i<slist.length;i++){
//		// 第一个音符所在的行号
//		if(slist[i] && slist[i].type==8){
//			return slist[i].line;
//		}
//	}
	return 0;
}
// 音符与歌词的对应关系
function note_lyrics(sourceid){
	// 音符正则表达式
	var notes_pattern = /(\[[\^\_\=A-Ya-y\/1-9,']*\])|(\^){0,1}(\_){0,1}(\=){0,1}[^\[\s\]]{1}[\,\'\/|1-9]*/g;
	var note_pattern = /[a-yA-Y]/;
	
	var content = $("#"+sourceid).val();
	
	var lines = content.split("\n");
	
	var note_lyrics = new Array();
	var line_index = 0;
	var len = 0;
	for(var i=0;i<lines.length;i++){
		len = len+lines[i].length;
		// 去掉引号
		var line = lines[i].replaceAll(/\".[^\"]*\"/g,"");
		// 音符号
		if(line.replace(/\[.[^\]]*\]/,"").replace(/\{.[^\}]*\}/,"").indexOf("|")>-1){
			if(line.indexOf("w:")>-1 || line.indexOf("N:")>-1){
				// 歌词
			}else{
				var count = 0;
				var notes = new Array();
				var lineObj = new Object();
				// 音符
				// 去掉修饰符
				line = line.replaceAll(/(\!.*\!|\([1-9]|\".[^\"]*\"|\.|v|u|\>|P)/g,"");
				line = line.replaceAll(/\[K.[^\]]*\]/g,"");
				line = line.replaceAll(":","").replaceAll("-","").replaceAll("\{.[^\}]*\}","");
				line = line.replaceAll(/\".[^\"]*\"/g,"");
				line = line.replaceAll(/\(/g,"");
				line = line.replaceAll(/\)/g,"");
				var result = line.match(notes_pattern);
				if(result!=null){
					for(var j=0;j<result.length;j++){
						if(note_pattern.test(result[j])){
							if(result[j].indexOf("K")>-1){
								continue;
							}
							var note = new Object();
							note.note = result[j];
							note.index = count++;
							
							notes.push(note);
						}
					}
					lineObj.notes = notes;
					lineObj.line_index = line_index++;
					lineObj.lyrics = new Array();
					for(var k=1;k<10;k++){
						if((k+i)<lines.length){
							var line_num = k+i;
							var line_str = lines[line_num];
							var line_lyric = getLyric(line_str);
							if(line_lyric==null){
								break;
							}else{
								lineObj.lyrics.push(line_lyric);
							}
						}
					}
					note_lyrics.push(lineObj);
					
				}
			}
		}
	}
	
	// console.log(note_lyrics)
	return positionNotes(sourceid,note_lyrics)
	
}

// 获取每个音符对应的下标信息
function positionNotes(sourceid,note_lyrics){
	var content = $("#"+sourceid).val();
	content = content + "\n";
	var linePattern = /.*\n/g;
	var lines = content.match(linePattern);
	var len = 0;
	if(lines!=null){
		var noteLineIndex = -1;
		for(var i=0;i<lines.length;i++){
			var line = lines[i];
			var tmpLine = lines[i].replace(/\[.[^\]]*\]/,"").replace(/\{.[^\}]*\}/,"")
			
			if(tmpLine.indexOf("|")>-1 && tmpLine.indexOf("w:")<0 && tmpLine.indexOf("N:")<0){
				// 小节在当前行的索引
				var nodeIndex = 0;
				noteLineIndex++;
				var notes = note_lyrics[noteLineIndex].notes;
				var reg = /(\".[^\"]*\")|(\!.[^\!]*\!)|\[K.[^\]]*\]/g;
				// 把不是音符的字符全部替换成空格（一个字符一个空格）
				var newstr=line.replace(reg,function(p1,p2){
					return p1.replace(/./g," ");
				}); 
				var noteInNodeIndex = 0
				var lastNodeIndex = 0;
				for(var j=0;j<notes.length;j++){
					var note = notes[j].note;
					// 音符所在小节的索引
					notes[j].pos = len+newstr.indexOf(note);
					// 找到在当前音符之前的字符串，计算前面有几根小节线，就说明是在第几个小节(如果当前行第一个字符就是小节线，则去掉)
					var preStr = content.substring(len,notes[j].pos);
					preStr = trimLeft(preStr);
					// 去掉引号
					preStr = preStr.replace(/\".[^\"]*\"/g,"");
					if(preStr.startWith("\\|")){
						preStr = preStr.substring(1);
					}
					preStr = preStr.replaceAll(/\|\|/g,"|").replaceAll(/\:\:/g,"|");
					nodeIndex = preStr.split("|").length-1;
					notes[j].nodeIndex = nodeIndex;
					if(lastNodeIndex!=nodeIndex){
						noteInNodeIndex = 0;
					}
					notes[j].noteInNodeIndex = noteInNodeIndex++;
					lastNodeIndex = nodeIndex;
					newstr = newstr.replace(note,function(p1,p2){
						return p1.replace(/./g," ");
					});
				}
			}
			if($.trim(lines[i])!=""){
				len += lines[i].length;
			}
		}
		// console.log("note_lyrics:"+note_lyrics)
	}
	return note_lyrics;
}
// 根据给定的一行字符串，解析出歌词
function getLyric(line_str){
	if(line_str.indexOf("w:")<0){
		return null;
	}
	var str = line_str.replace("w:","").replace(/\|/g," ");
	str = trimLeft(str);
	var words = str.split(" ");
	var result = new Array();
	if(words!=null){
		var startlen = 0;
		var preStr = "";
		var noteInNodeIndex = 0;
		var lastNodeIndex = 0;
		for(var i=0;i<words.length;i++){
			if($.trim(words[i])!=""){
				// 歌词所在小节的索引号
				var nodeIndex = 0;
				
				var sufStr = line_str.replace(preStr,"");
				preStr += sufStr.substring(0,sufStr.indexOf(words[i]) + words[i].length);
				var lyric = new Object();
				lyric.word = words[i];
				lyric.nodeIndex = preStr.split("|").length-1;
				if(lyric.nodeIndex!=lastNodeIndex){
					noteInNodeIndex = 0;
				}
				lyric.noteInNodeIndex = noteInNodeIndex++;
				result.push(lyric);
				lastNodeIndex = lyric.nodeIndex;
			}
		}
	}
	return result;
}

// 根据选中的歌词，取出对应的音符的位置
function getNotePositionBySelectLyric(sourceid){
	var st = getSelectText(sourceid);
	var startPos = getStartPos(document.getElementById(sourceid));
// console.log("startPos:"+startPos);
	var content = $("#"+sourceid).val();
	var lines = content.split("\n");
	var line_num = 0;
	var index = 0;
	// 上一行字符数索引号
	var last_line_position = 0;
	var obj = new Object();
	// 歌词行是否有小节线
	var hasNodeLineInLyric = false;
	for(var i=0;i<lines.length;i++){
		
		var line = lines[i];
		if(line.indexOf("|")>-1){
			hasNodeLineInLyric = true;
		}else{
			hasNodeLineInLyric = false;
			
		}
		index += line.length+1;
		// 去掉引号内的内容
		var line_tmp = lines[i].replaceAll(/\".*\"/g,"");
		if(line_tmp.replace(/\[.[^\]]*\]/,"").replace(/\{.[^\}]*\}/,"").indexOf("|")>-1){
			if(line_tmp.indexOf("w:")<0 && line_tmp.indexOf("N:")<0){
				obj.line_index = line_num++;
				obj.note_index = 0;
			}
		}
		// 当索引号大于光标所在位置时
		if(index>startPos){
			// 取出光标所在行之前的数据
			var prefix_str = content.substring(last_line_position,startPos);
			if(prefix_str.indexOf("w:")>-1){
				var spacePattern = /[ ]{1,}/g;
				obj.nodeIndex = prefix_str.split("|").length-1;
				
				var tmpstr = prefix_str.split("|")[obj.nodeIndex].replace("w:","").replace(spacePattern," ");
				var tmparr = tmpstr.split(" ");
				var len = 0;
				for(var i=0;i<tmparr.length;i++){
					if($.trim(tmparr[i])!=""){
						len++;
					}
				}
				obj.note_index = len;
			}
			break;
			// line_num =
		}
		last_line_position += line.length+1;
		line = lines[i].replaceAll(/\".*\"/g,"");
		
	}
	var alldata = note_lyrics(sourceid);
	for(var i=0;i<alldata.length;i++){
		var linedata = alldata[i];
		if(linedata.line_index==obj.line_index){
			var linenotes = linedata.notes;
			for(var j=0;j<linenotes.length;j++){
				// 歌词有小节线时，用小节线和小节线内的排序号匹配
				if(hasNodeLineInLyric){
					if(linenotes[j].noteInNodeIndex==obj.note_index && linenotes[j].nodeIndex==obj.nodeIndex){
						obj.pos = linenotes[j].pos;
					}
				}else{
					if(linenotes[j].index==obj.note_index){
						obj.pos = linenotes[j].pos;
					}
				}
			}
		}
		
	}
	// console.log(obj);
	return obj;
}

// 获取选中音符的行号和所在行的音符索引值
function getSelectNotePosition(sourceid){
	
	
	var st = getSelectText(sourceid);
	// console.log("============="+st);
	var startPos = getStartPos(document.getElementById(sourceid));
	var content = $("#"+sourceid).val();
	var lines = content.split("\n");
	var line_num = 0;
	var index = 0;
	// 上一行字符数索引号
	var last_line_position = 0;
	var obj = new Object();
	for(var i=0;i<lines.length;i++){
		
		var line = lines[i];
		index += line.length+1;
		// 去掉引号内的内容
		var line_tmp = lines[i].replaceAll(/\".*\"/g,"");
		if(line_tmp.replace(/\[.[^\]]*\]/,"").replace(/\{.[^\}]*\}/,"").indexOf("|")>-1){
			if(line_tmp.indexOf("w:")<0){
				obj.line_index = line_num++;
				obj.note_index = 0;
			}
		}
		// 当索引号大于光标所在位置时
		if(index>startPos){
			// 取出光标所在行之前的数据
			var prefix_str = content.substring(last_line_position,startPos);
			// 音符正则表达式
			var notes_pattern = /(\[[\^\_\=A-Ya-y\/1-9,']*\])|(\^){0,1}(\_){0,1}(\=){0,1}[^\[\s\]]{1}[\,\'\/|1-9]*/g;
			var note_pattern = /[a-yA-Y]/;
			prefix_str = prefix_str.replaceAll(/((![0-9]*!)|(![a-zA-Z]*!)|(!\>!)|(!\<\(!)|(!\<\)!)|(!\>\(!)|(!\>\)!)|\.|v|u|\>|P)/g,"")
			prefix_str = prefix_str.replaceAll(":","").replaceAll("-","").replaceAll("\{.[^\}]*\}","");
			prefix_str = prefix_str.replaceAll(/\".*\"/,"");
			prefix_str = prefix_str.replaceAll(/\(/g,"");
			prefix_str = prefix_str.replaceAll(/\)/g,"");
			var result = prefix_str.match(notes_pattern);
			if(result!=null){
				var x = 0;
				for(var j=0;j<result.length;j++){
					if(note_pattern.test(result[j])){
						if(result[j].indexOf("K")>-1){
							continue;
						}
						obj.note_index = ++x;
					}
				}
			}
			break;
			// line_num =
		}
		last_line_position += line.length+1
		line = lines[i].replaceAll(/\".*\"/g,"");
		
	}
	return obj;
}
/**
 * 根据选中的音符起点和终点的位置,取得谱子片段
 * 
 * @param sourceid
 * @param start
 *            开始音符的位置信息：包括音符行号（比如是第一行音符，则值为0），音符在当前行的下标（比如是该行的第1个音符，则值为0）
 * @param end
 *            结束音符的位置信息，具体含义同上
 * @returns
 */
function getSelectLyric(sourceid,start,end){
	var all_lyric = note_lyrics(sourceid)
	var start_line = start.line_index;
	var start_index = start.note_index;
	var end_line = end.line_index;
	var end_index = end.note_index;
	var result = new Array();
	if(end_line>all_lyric.length){
		end_line = all_lyric.length-1;
	}
	for(var i= start_line;i<=end_line;i++){
		var obj = new Object();
		obj.line_index = i;
		obj.lyrics = new Array();
		var line = all_lyric[i];
		var line_lyrics = line.lyrics;
		var line_notes = line.notes;
		
		if(line_lyrics!=null && line_lyrics.length>0){
			for(var j=0;j<line_lyrics.length;j++){
				var nodeIndex = 0;
				var currNodeIndex = -1;
				var userful_lyric = "w:";
				var line_lyric = line_lyrics[j];
//				if(line_lyric.length>line_notes.length){
//					alert("歌词长度大于音符长度")
//				}
				// 是否有小节线标识
				var hasNodeLine = false;
				if(line_lyric!=null){
					if(i==start_line){
						// 处理选中的第一行
						// 歌词总长度小于选中音符的开始位置，说明是有小节线的谱子
						if(line_lyric.length<line_notes.length){
							for(var k=start_index;k<line_notes.length;k++){
								var note = line_notes[k];
								for(var m=0;m<line_lyric.length;m++){
									var lyric = line_lyric[m];
									if(lyric.nodeIndex==note.nodeIndex && lyric.noteInNodeIndex==note.noteInNodeIndex){
										nodeIndex = lyric.nodeIndex;
										if(currNodeIndex==-1){
											currNodeIndex = nodeIndex;
										}
										// 当前的小节索引号如果小于音符所在的小节索引号，则增加空的小节
										if(currNodeIndex<nodeIndex){
											for(var x = currNodeIndex;x<nodeIndex;x++){
												userful_lyric = userful_lyric + "|";
												hasNodeLine = true;
											}
										}
										currNodeIndex = nodeIndex;
										userful_lyric += lyric.word + " ";
									}
								}
							}
						}else{
							var len = line_lyric.length-1;
							if(start_line==end_line){
								len = end_index;
							}
							// 歌词长度和音符长度相等
							for(var k=start_index;k<=len;k++){
								nodeIndex = line_lyric[k].nodeIndex;
								if(currNodeIndex==-1){
									currNodeIndex = nodeIndex;
								}
								// 当前的小节索引号如果小于音符所在的小节索引号，则增加空的小节
								if(currNodeIndex<nodeIndex){
									for(var x=currNodeIndex;x<nodeIndex;x++){
										userful_lyric = userful_lyric + "|";
										hasNodeLine = true;
									}
								}
								currNodeIndex = nodeIndex;
								userful_lyric += line_lyric[k].word + " ";
							}
						}
						
					}else if(i == end_line){
						// 处理选中的最后一行
						// 歌词总长度小于选中音符的开始位置，说明是有小节线的谱子
						if(line_lyric.length<line_notes.length){
							for(var k=0;k<=end_index;k++){
								var note = line_notes[k];
								for(var m=0;m<line_lyric.length;m++){
									var lyric = line_lyric[m];
									if(lyric.nodeIndex==note.nodeIndex && lyric.noteInNodeIndex==note.noteInNodeIndex){
										nodeIndex = lyric.nodeIndex;
										if(currNodeIndex==-1){
											currNodeIndex = nodeIndex;
										}
										// 当前的小节索引号如果小于音符所在的小节索引号，则增加空的小节
										if(currNodeIndex<nodeIndex){
											for(var x = currNodeIndex;x<nodeIndex;x++){
												userful_lyric = userful_lyric + "|";
												hasNodeLine = true;
											}
										}
										currNodeIndex = nodeIndex;
										userful_lyric += lyric.word + " ";
									}
								}
							}
						}else{
							// 歌词长度和音符长度相等
							for(var k=0;k<=end_index;k++){
								nodeIndex = line_lyric[k].nodeIndex;
								if(currNodeIndex==-1){
									currNodeIndex = nodeIndex;
								}
								if(currNodeIndex<nodeIndex){
									for(var x=currNodeIndex;x<nodeIndex;x++){
										userful_lyric = userful_lyric + "|";
										hasNodeLine = true;
									}
								}
								currNodeIndex = nodeIndex;
								userful_lyric += line_lyric[k].word + " ";
							}
						}
					
						
						
					}else{
						// 选中的中间行
						for(var k=0;k<line_lyric.length;k++){
							nodeIndex = line_lyric[k].nodeIndex;
							if(currNodeIndex==-1){
								currNodeIndex = nodeIndex;
							}
							if(currNodeIndex<nodeIndex){
								for(var x=currNodeIndex;x<nodeIndex;x++){
									userful_lyric = userful_lyric + "|";
									hasNodeLine = true;
								}
							}
							currNodeIndex = nodeIndex;
							userful_lyric += line_lyric[k].word + " ";
						}
					}
				}
				if(hasNodeLine){
					userful_lyric += "|\n";
				}
				obj.lyrics.push(userful_lyric);
			}
		}
		result.push(obj);
	}
	// console.log(result);
	return result;
}
/**
 * 测试选中符时抽取歌词
 * 
 * @param line_s
 *            开始行号 2
 * @param note_s
 *            开始音符所在行的索引 0
 * @param line_e
 *            结束行号 2
 * @param note_e
 *            结束音符所在行的索引3
 */
function testSelectLyric(line_s,note_s,line_e,note_e){
	var start = new Object();
	start.line_index=line_s;
	start.note_index=note_s;
	var end = new Object();
	end.line_index=line_e;
	end.note_index=note_e;
	var selectLyric = getSelectLyric("source",start,end);
	console.log("selectLyric:",selectLyric);
}
// 转节奏谱
function convert2Rhythm(sourceid){
	var content = $("#"+sourceid).val();
	var lines = content.split("\n");
	var note_pattern = /[a-gA-G](\,*)(\'*)/g;
	var result = "";
	var v_flag = false;
	var program_flag = false;
	var first_note_line = -1;
	for(var i=0;i<lines.length;i++){
		var line = lines[i];
		if(line.replace(/\{.[^\}]*\}/g,"").indexOf("|")>-1 && line.replaceAll(" ","").indexOf("w:")!=0 && line.indexOf("N:")!=0){
			first_note_line = i;
			line = getRhythmLine(line);
			if(!v_flag){
				line = "V:1 perc stafflines=1 octave=0\n" + line;
				v_flag = true;
			}
		} else if(line.indexOf("V:")>-1){
			var lineMatch = line.match(/V:\s*([0-9])/);
			if(lineMatch!=null){
				var vs = lineMatch[0];
				var reg = new RegExp(vs+".*perc");
				var allMatch = line.match(reg);
				if(allMatch==null){
					if(line.indexOf("perc")<0){
						line = line + " perc stafflines=1 octave=0";
					}
				}
			}
			// line = line + " perc stafflines=1";
			if(first_note_line!=-1){
				line = "%%MIDI program 115\n" + line;
			}
			v_flag = true;
		} else if(line.indexOf("%%score")>-1){
			 line = "%%MIDI program 115\n" + line;
		}
		result += line + "\n";
	}
	// console.log(result);
	result = result + "\n%%MIDI program 115";
	// 去掉移调的设置
	// result = result.replace(/shift.*/,"");
	result = result.replace(/%%MIDI\s*program\s*\d{1,3}/g,"%%MIDI program 115");
	return replaceBlankLine(result);
}
function getRhythmLine(line){
	var result = "";
	// 引号数量
	var quotCount = 0;
	var exclaCount = 0;
	var midQuotCount = 0;
	var midQuotCharCount = 0;//中括号中音符数（中括号中只把第1个音符转为B）
	var midQuotNumCount = 0;//中括号中数字数
	var noteReg = new RegExp(/[a-gA-Gz]/);
	var numReg = new RegExp(/[2-9]/);
	var midQuotIsHx = true;//中括号中是否是和弦（中括号中如果有冒号，则判定为不是合弦）
	var continueToEnd = false;
	for(var i=0;i<line.length;i++){
		var c = line[i];
		if(continueToEnd){
			result += c;
			continue;
		}
		if(c=="%"){
			result += c;
			continueToEnd = true;
			continue;
		}
		if(c=="$"){
			result += c;
			continue;
		}
		if(c=="\""){
			quotCount++;
		}
		if(quotCount%2==1){
			result += c;
			continue;
		}
		if(c=="!"){
			exclaCount++;
		}
		if(exclaCount%2==1){
			result += c;
			continue;
		}
		if(c=="," || c=="'" || c=="^" || c=="_" || c=="=" || c=="(" || c==")"){
			var in_tuplet = false;//N连音判断
			if( c=="(" && i+1<line.length){
				var cnext = line[i+1];
				if(/\d/.test(cnext)){
					in_tuplet = true;
				}
			}
			if(!in_tuplet){
				continue;
			}
		}
		if(c=="[" || c=="]"){
			var skip = false;
			if(c=="]" && line[i-1]=="|"){//处理|]的情况
				skip = true;
			}
			if(c=="["){//处理["结束"或[1.这些情况
				if(line[i+1]){
					if(/\d/.test(line[i+1])){
						skip = true;
					}else if('"'==line[i+1]){
						skip = true;
					}
				}
			}
			if(!skip){
				midQuotCount++;
				midQuotCharCount = 0;
				midQuotNumCount = 0;
				midQuotIsHx = true;
			}
		}
		if(midQuotCount%2==1){
			
			
//			result += c;这里没有考虑和弦的情况，要同时考虑和弦和[K:G]这些情况 ，如果是
			if(c==":"){
				midQuotIsHx = false;
			}
			if(!midQuotIsHx){
				result += c;//这里是和弦处理
				continue;
			}
			if(noteReg.test(c)){
				if(midQuotCharCount==0){
					result += c.replace(/[a-gA-Gz](\,*)(\'*)/g,"B");//这里是和弦处理,只处理和弦里的第一个音符
					midQuotCharCount++;
				}
			} else if(numReg.test(c)){
				if(midQuotNumCount==0){
					result += c;//这里是和弦处理
					midQuotNumCount++;
				}
			}else{
				result += c;
			}
			continue;
		}
		c = c.replace(/[a-gA-G](\,*)(\'*)/g,"B");
		var exts = extnotes.concat(extnotes2);
		for(var j=0,len=exts.length;j<len;j++){
			c = c.replace(exts[j].char,"B");
		}
		result += c;
	}
	
	//result = result.replace(/(\,*)(\'*)/g,"");
	//去掉"midi1-9999"，因为这是音色声明
	result = result.replace(/\"midi[0-9]{1,4}\"/g,"")
	return result;
}
// 取得最后一个节拍的值
function getLastM(sourceid){
	var content = $("#"+sourceid).val();
	var m_pattern = /M\:\s*[1-9]\/[1-9]/g;
	var result = content.match(m_pattern);
	if(result!=null){
		return result[result.length-1];
	}
	return "";
}

/**
 * 获取移调后与移调前的调号相差数量
 * 
 * 先把旧的调转成C调，然后再根据C调转新调查出结果
 * 
 * @param oldKey
 * @param newKey
 * @returns
 */
function getFreCharge(oldKey,newKey,lowerOrHigher) {
	var json;
	if("higher"==lowerOrHigher){
		// do在小字一组
		json = {
				'C' : 0,
				'G' : 7,
				'D' : 2,
				'A' : 9,
				'E' : 4,
				'B' : 11,
				'F#' : 6,
				'C#' : 1,
				'F' : 5,
				'Bb' : 10,
				'Eb' : 3,
				'Ab' : 8,
				'Db' : 1,
				'Gb' : 6,
				'Cb' : -1
			}
	}else if("lower"==lowerOrHigher){
		// do在小字组
		json = {
				'C' : 12,
				'G' : -5,
				'D' : -10,
				'A' : -3,
				'E' : -8,
				'B' : -1,
				'F#' : -6,
				'C#' : -11,
				'F' : -7,
				'Bb' : -2,
				'Eb' : -9,
				'Ab' : -4,
				'Db' : -11,
				'Gb' : -6,
				'Cb' : -1
			}
	} else {
		// 以前打的谱子，没有标识
		json = {
				'C' : 0,
				'G' : 7,
				'D' : 2,
				'A' : 9,
				'E' : 4,
				'B' : 11,
				'F#' : 6,
				'C#' : 1,
				'F' : 5,
				'Bb' : -2,
				'Eb' : 3,
				'Ab' : 8,
				'Db' : 1,
				'Gb' : 6,
				'Cb' : -1
			}
	}

	var num = 0;
	for (key in json) {
		if (oldKey == key) {
			num = json[key] * -1;
		}
	}
	//非C大调
	if(newKey!="C"){
		num += json[newKey];
	}
	return num;
}
//播放过程中临时移调
function changePlayingKey(key){
	var oriKey = $("#K").val();
	var freChange = getFreCharge(oriKey,key);
	user.tmpTransposition = freChange;
}
 
// 查找鼠标点击的位置
function findPosition(evt,svg){
	// 如果未定义showNotePosition变量，或showNotePosition=false，则不做任何操作
	try{
		if(!showNotePosition){
			return;
		}
	}catch(err){return;}
	
	if($(svg).find(".g").length==0){
		$("#mycursor").remove();
		if(cursorInterval){
			clearInterval(cursorInterval)
		}
		return;
	}
	// 如果没有点击在五线谱上，则返回
	if($(svg).find("g[type='staff']").length==0){
		$("#mycursor").remove();
		if(cursorInterval){
			clearInterval(cursorInterval)
		}
		return;
	}
	var staffTop = $(svg).find("g[type='staff']").offset().top;
	var staffHeight = $(svg).find("g[type='staff'] .stroke")[0].getBoundingClientRect().height;
	var x = evt.pageX - $(svg).offset().left;
    var y = evt.pageY - $(svg).offset().top;
    if(evt.pageY<staffTop || evt.pageY>(staffTop+staffHeight)){
    	$("#mycursor").remove();
		if(cursorInterval){
			clearInterval(cursorInterval)
		}
		move2End();
		return;
    }
	var target;
	// 取出所有的rect后排序
	var rectArr = new Array();
	var minVal = 9999999;
	var result;
	$.each($(svg).find("rect.abcr"),function(i,item){
		var g = $(item).parent("g[transform]");
		var translateX = 0;
		var translateY = 0;
		if(g.length>0){
// translate(0,51.00)相对位置x,y
			var str = $(g).attr("transform");
			if(str.indexOf("translate")>-1){
				var arr = str.replace("translate(","").replace(")","").split(",");
				translateX = parseFloat(arr[0]);
				translateY = parseFloat(arr[1]);
			}
		}
		var rect = new Object();
		
		rect.index = parseInt($(item).attr("class").replace(" ","").replace("abcr","").replaceAll("_",""));
		if($(item).attr("type")!="note"){
			return;
		}
		rect.x = parseFloat($(item).attr("x")) + translateX;
		rect.y = parseFloat($(item).attr("y")) + translateY;
		rect.width = parseFloat($(item).attr("width"));
		rect.height = parseFloat($(item).attr("height"));
		rect.x = rect.x*scale;
		rect.y = rect.y*scale;
		rect.width = rect.width*scale;
		rect.height = rect.height*scale;
		// 算出4个角与鼠标点击的位置的距离，取距离最小的
		// 左上角与鼠标点击位置的距离
		// var distance1 = Math.sqrt(Math.pow(Math.abs(parseFloat(x) -
		// (parseFloat(rect.x)+translateX)*scale),2) +
		// Math.pow(Math.abs(parseFloat(y) -
		// (parseFloat(rect.y)+translateY)*scale),2));
		var distance1 = Math.abs(x-rect.x)+Math.abs(y-rect.y);
		// 左下角与鼠标点击位置的距离
		// var distance2 = Math.sqrt(Math.pow(Math.abs(parseFloat(x) -
		// (parseFloat(rect.x)+translateX)*scale),2) +
		// Math.pow(Math.abs(parseFloat(y) -
		// ((parseFloat(rect.y)+translateY)*scale+parseFloat(rect.height)*scale)),2));
		var distance2 = Math.abs(x-rect.x)+Math.abs(y-(rect.y+rect.height));
		// 右上角与鼠标点击位置的距离
		// var distance3 = Math.sqrt(Math.pow(Math.abs(parseFloat(x) -
		// ((parseFloat(rect.x)+translateX)*scale +
		// parseFloat(rect.width)*scale)),2) + Math.pow(Math.abs(parseFloat(y) -
		// (parseFloat(rect.y)+translateY)*scale),2));
		var distance3 = Math.abs(x-(rect.x+rect.width))+Math.abs(y-rect.y);
		// 右下角与鼠标点击位置的距离
		// var distance4 = Math.sqrt(Math.pow(Math.abs(parseFloat(x) -
		// ((parseFloat(rect.x)+translateX)*scale +
		// parseFloat(rect.width)*scale)),2) + Math.pow(Math.abs(parseFloat(y) -
		// ((parseFloat(rect.y)+translateY)*scale+parseFloat(rect.height)*scale)),2));
		var distance4 = Math.abs(x-(rect.x+rect.width))+Math.abs(y-(rect.y+rect.height));
		var minDistance = 999999;
		if(minDistance>distance1){
			minDistance = distance1;
		}
		if(minDistance>distance2){
			minDistance = distance2;
		}
		if(minDistance>distance3){
			minDistance = distance3;
		}
		if(minDistance>distance4){
			minDistance = distance4;
		}
		// console.log("index:"+rect.index+" distance1:"+distance1+"
		// distance2:"+distance2+" distance3:"+distance3+"
		// distance4:"+distance4+" x:"+x+" y:"+y +" rect.x:"+rect.x+" rect.y:"+
		// rect.y);
		if(minDistance < minVal){
			minVal = minDistance;
			result = rect;
		}
		rectArr.push(rect);
	});
	if(result){
		if(x>result.x){
			result.pos = "behind";
		}else{
			result.pos = "before";
		}
		result.staffTop = staffTop;
		result.staffHeight = staffHeight;
		// console.log(result);
		// debugger;
		rectArr.sort(function(a,b){
			return a.index- b.index;
		});
		
		addCursor(evt,result,rectArr);
	}
	
}
var cursorInterval;
function addCursor(evt,rect,rectArr){
	
	// 光标定位到指定的位置
	if(rect.pos=="behind"){
		// 光标在最近的音符后面
		// 取下一个音符的索引号
		var nextIndex = -1;
		var tmpNote = "";
		for(var i=0;i<rectArr.length;i++){
			if(rectArr[i].index>rect.index){
				nextIndex = rectArr[i].index;
				break;
			}
		}
		if(nextIndex!=-1){
			var content = $("#source").val();
			tmpNote = content.substring(rect.index,nextIndex);
		}
		setCaretPosition(document.getElementById("source"),rect.index+tmpNote.replaceAll(" ","").length);
	}else{
		// 光标是最近的音符前面
		setCaretPosition(document.getElementById("source"),rect.index);
	}
	$("#mycursor").remove();
	if(cursorInterval){
		clearInterval(cursorInterval)
	}
	var x = $(".nobrk").offset().left;
	var y = $(".nobrk").offset().top;
	var divStr = '<div id="mycursor" style="position:absolute;left:'+(evt.pageX-x)+'px;top:'+(rect.staffTop-y)+'px;width:20px;height:'+rect.staffHeight+'px;background-color: red;opacity:0.4;"></div>';
	$(".nobrk").append($(divStr));
	$("#mycursor").click(function(){
		$("#mycursor").remove();
		move2End();
	});
	cursorInterval = setInterval(function(){
		if($("#mycursor").length>0){
			$("#mycursor").toggle();
		}else{
			clearInterval(cursorInterval)
		}
	},1000);
}
/**
 * 生成谱子对应的节奏
 * 
 * @param sourceid
 * @param preNodeNum
 *            增加预备拍数量
 * @param type
 *            pre:只增加预备拍，后面全部是休止符，all:全曲增加节拍
 * @returns
 */
function genRhythm(sourceid,preNodeNum,type){
	var content = $("#"+sourceid).val();
	var noteContent = getNoteContent()[0].str;
	var M = get("M:");
	var L = get("L:");
	var n = parseInt(L.split("/")[1])/parseInt(M.split("/")[1]);
	var num = parseInt(M.split("/")[0]);
	noteContent = noteContent.replaceAll("\\|\\|","|");
	noteContent = noteContent.replaceAll("\\:\\:","|");
	var nodes = noteContent.split("|");
	var rhythmNodeContentTitle = "V:99 perc stafflines=1\n%%MIDI program 115\nK:C shift=cc octave=0\n";
	var rhythmNodeContent = "";
	for(var i=0;i<nodes.length;i++){
		var nodeRhythmStr = "";
		var nodeContent = nodes[i];
		if($.trim(nodeContent)=="" || $.trim(nodeContent)=="]"){
			continue;
		}
		// console.log(nodeContent.replaceAll(/[^:]/g,""))
		// 开始写节奏拍的位置
		// 1.如果有：号则从：号后面开始 :z2 z2
		// 2.如果有类似这样的小节内设置[M:3/4]则[M:3/4]z2 z2
		var startIndex = 0;
		if(nodeContent.startWith("\\:")){
			startIndex = 1;
		}
		
		var pattern = /\[.\:.[^\]]*\]/g;
		var result = nodeContent.match(pattern);
		var tmpArr = new Array();
		if(result!=null){
			for(var j=0;j<result.length;j++){
				if(result[j].indexOf("M:")>-1){
					var mPattern = /[1-9]\/[1-9]/;
					M = result[j].match(mPattern)[0];
					n = parseInt(L.split("/")[1])/parseInt(M.split("/")[1]);
					num = parseInt(M.split("/")[0]);
				}
				startIndex = nodeContent.indexOf(result[j])+result[j].length;
			}
		}
		rhythmNodeContent += nodeContent.substr(0,startIndex);
		var c = "B";
		if(type=="pre"){
			c = "z";
		}else{
			c = "B";
		}
		for(var j=0;j<num;j++){
			if(n!=1){
				rhythmNodeContent += c+n;
			}else{
				rhythmNodeContent += c;
			}
		}
		if(nodeContent.endWith("\\:")){
			rhythmNodeContent += ":";
		}
		rhythmNodeContent+="|";
	}
	var preNodeContent = "";
	if(preNodeNum>0){
		for(var i=0;i<preNodeNum;i++){
			preNodeContent += "|";
			for(var j=0;j<num;j++){
				if(n!=1){
					preNodeContent += "B"+n;
				}else{
					
					preNodeContent += "B";
				}
			}
		}
		if(preNodeContent!=""){
			preNodeContent = preNodeContent.substr(1);
		}
	}
	if(preNodeContent!=""){
		if(rhythmNodeContent.startWith("\\|")){
			rhythmNodeContent = preNodeContent + rhythmNodeContent;
		}else{
			rhythmNodeContent = preNodeContent + "|" + rhythmNodeContent;
		}
	}
	rhythmNodeContent = rhythmNodeContent.replaceAll(/\[V:.[^\]]*\]/g,"");
	var res = rhythmNodeContentTitle + rhythmNodeContent;
	if(res.indexOf("|]")>-1){
		return res;
	}else{
		return res + "]";
	}
}

function addPreNode(sourceid,preNodeNum){
	var content = $("#"+sourceid).val();
	// 是否有V:标识
	var vFlag = true;
	if(content.indexOf("V:")<0){
		vFlag = false;
	}
	var lines = content.split("\n");
	var staff = "";
	var firstLine = 0;
	var M = get("M:");
	var L = get("L:");
	// 单位长度与M的倍数关系
	var n = parseInt(L.split("/")[1])/parseInt(M.split("/")[1]);
	// 每小节拍数
	var num = parseInt(M.split("/")[0]);
	// 预备拍
	var preNodeStr = "";
	for(var i=0;i<lines.length;i++){
		var line = lines[i];
		if(line.indexOf("V:")>-1){
			firstLine = 0;
			preNodeStr = "";
		}
		if(line.indexOf("w:")<0 && line.indexOf("N:")<0 && line.replaceAll(/\".*\"/g,"").replace(/\[.[^\]]*\]/,"").replace(/\{.[^\}]*\}/,"").indexOf("|")>-1){
			// 添加预备拍
			if(preNodeNum!=0 && firstLine==0){
				for(var x=0;x<preNodeNum;x++){
					preNodeStr += "|";
					for(var j=0;j<num;j++){
						if(n!=1){
							preNodeStr += "B"+n;
						}else{
							preNodeStr += "B";
						}
					}
				}
				if(preNodeStr!=""){
					preNodeStr = preNodeStr.substr(1);
				}
				if(line.startWith("\\|")){
					line = preNodeStr + line;
				}else{
					line = preNodeStr + "|" + line;
				}
			}
			firstLine++;
		}
		staff += line + "\n";
	}
	// console.log(staff);
}
/**
 * 增加预备拍及节奏谱（如果是弱起小节，则以休止符补全弱起小节） 曲谱+节拍
 * 
 * @param sourceid
 * @param preNodeNum
 *            预备拍数量
 * @param type
 *            pre:只是头部增加节拍，后面的用休止符，all:全曲增加节拍
 * @param standV 标准声部
 * @returns
 */
function addPreNodeAndRhythm(sourceid,preNodeNum,type,standV){
	if(!standV){
		standV = 0;
	}
	var content = $("#"+sourceid).val();
	if(content.indexOf("X:")<0){
		content = "X:1\n" + content;
	}
	// 是否有V:标识
	var vFlag = true;
	if(content.indexOf("V:")<0){
		vFlag = false;
	}
//	var lines = content.split("\n");
	var lines = getNodesInfo(content);
	// 当前处理的声部
	var curr_v= "-1";
	var firstV = "-1";//第一个声部的v的值，正常是1
	if(standV){//如果有传入标准声部，则以标准声部为基准
		firstV = standV;
	}
	if(standV==0){
		firstV = standV;
	}
	
	var staffInfo = getStaffInfo(sourceid);
	
	var staff = "";
	var firstLine = 0;
	var M = get("M:");
	var L = get("L:");
	//取标准声部相对应的L的值，
	for(var i=0;i<syms.length;i++){
		var cs = syms[i];
		if(cs){
			if(cs.v == standV && (cs.type==8||cs.type==10) && !cs.grace){
				L = decimalsToFractional(cs.my_ulen/1536);
				break;
			}
		}
	}
	// 单位长度与M的倍数关系
	var n = parseInt(L.split("/")[1])/parseInt(M.split("/")[1]);
	// 每小节拍数
	var num = parseInt(M.split("/")[0]);
	// 预备拍
	var preNodeStr = "";
	var firstNodeLen = -1;
	var hasHandle_v = new Array();
	
	var lineRhythm = "";
	var barSeq = 0;
	
	var varr = new Array();//实际声部数量，多声部如果只显示1个声部的话，实际声部数量就是1
	for(var w=0;w<syms.length;w++){
		var sn = syms[w];
		if(sn && sn.type==8){
			var sv = sn.v
			if(varr.indexOf(sv)<0){
				varr.push(sv);
			}
		}
	}
	
	
	for(var i=0;i<lines.length;i++){
		var lineObj = lines[i]
		var line = lineObj.lineStr;
		//var currStaff = null;
		if(lineRhythm!="" && (line.indexOf("%%score")>-1 || line.indexOf("%%staves")>-1)){//这段逻辑应对开始有共公声部，后面分声部的情况
			staff += "V:99 perc stafflines=1\n%%MIDI program 115\nK:C shift=cc octave=0\n"+lineRhythm;
			lineRhythm = "";
		}
		if(line.indexOf("V:")>-1){
			var v_pattern = /V:\s*([1-9])/;
			var matchs = line.match(v_pattern);
			if(matchs!=null && matchs.length>0){
				curr_v = matchs[1];
				if(curr_v!=""){
					curr_v = parseInt(curr_v)-1
				}
			}
			if(firstV == "-1"){
				firstV = curr_v;
			}
			// 这里过滤掉已经处理过的声部，一个声部只处理一次，不加这个的话，每行都行增加预备拍
			if(hasHandle_v.indexOf(curr_v)<0){
				firstLine = 0;
				preNodeStr = "";
			}
			if(firstV==curr_v){
				//插入节奏谱声部
				if(lineRhythm!=""){
					staff += "V:99 perc stafflines=1\n%%MIDI program 115\nK:C shift=cc octave=0\n"+lineRhythm;
					lineRhythm = "";
				}
			}
		}
		if(lineObj.type=="note"){
			curr_v = lineObj.v;
			if(curr_v == firstV){
				//生成该 行对应的节奏谱
				var lineStr = line.replace(/::/g,":|:")
									.replace(/\|\]/g,"|")
									.replace(/\|:/g,"|");
				
//				var lineNodes = lineStr.split("|");
				var lineNodes = lineObj.nodes;
				for(var k=0;k<lineNodes.length;k++){
					var nodeStr = lineNodes[k].nodeStr;
//					console.log("----------nodeStr:",nodeStr)
					if(nodeStr==""){
						continue;
					}
					if(nodeStr.indexOf("%V")>-1){
						continue;
					}
					
					
					if(nodeStr.replace(/\s+/g,"")!="" && (/[a-gA-G]/.test(nodeStr) || nodeStr.indexOf("m")>-1 || nodeStr.indexOf("h")>-1 || nodeStr.indexOf("n")>-1 || nodeStr.indexOf("z")>-1 || (staffInfo.vocalCount>1 && nodeStr.indexOf("x")>-1))){
						var tmpStr = nodeStr.replaceAll(/\[\".[^\"]*\"/g,"").replaceAll(/\[.\:.[^\]]*\]/g,"").replaceAll(/\".[^\"]*\"/g,"");
						//如果只有x和数字 
						if(!/[a-gA-g]/.test(tmpStr) && tmpStr.indexOf("x")>-1){
							//如果只有一个声部
							
							if(varr.length==1){
								lineRhythm += tmpStr;
								continue;
							}
							
						}
						if(nodeStr.indexOf("x")>-1){
							nodeLen = calNodeLen(tmpStr);//换用下面那种方法计算小节时值
						}else{
							nodeLen = calNodeLenByIndex(lineNodes[k].startSeq,lineNodes[k].endSeq)
						}
//						console.log("nodeStr:",nodeStr,"    nodeLen:",nodeLen)
						//这里以下还有待修改
						var c = "B";
						if(type=="pre"){
							c = "z";
						}else{
							c = "B";
						}
						if(nodeLen<=n && nodeLen >0){
							//如果小节时值小于1拍
							//lineRhythm += c+nodeLen;
							
							if(nodeLen>0){
								if(nodeLen==n){
									//大于1且有小数点
									lineRhythm += c + parseInt(nodeLen);
									nodeLen = nodeLen - n;
								}
								if(nodeLen>1 && parseInt(nodeLen)!=nodeLen){
//									大于1且有小数点
									lineRhythm += c + parseInt(nodeLen);
									nodeLen = nodeLen - 1;
								}else if(nodeLen>1 && parseInt(nodeLen)==nodeLen){
									lineRhythm += c + parseInt(nodeLen);
									nodeLen = 0;
								}
								if(nodeLen==1){
									lineRhythm += c;
								}
								
								if(nodeLen>0 && nodeLen<1){
									var s = nodeLen;
									var t = "";
									for(var m=2;;m=m*2){
										if(s==0){
											break;	
										}
										if(s>=1/m){
											s = s-1/m;
										}
										t += "/";
									}
									lineRhythm += c+t;
								}
								//lineRhythm += c+nodeLen;
							}
						}else{
							while(nodeLen>=n){
								nodeLen = nodeLen - n;
								if(n==0.5){
									lineRhythm += c+"/";
								}else{
									lineRhythm += c+n;
								}
							}
							if(nodeLen>0){
								if(nodeLen==1){
									//大于1且有小数点
									lineRhythm += c + parseInt(nodeLen);
									nodeLen = nodeLen - 1;
								}
								if(nodeLen>1 && parseInt(nodeLen)!=nodeLen){
//									大于1且有小数点
									lineRhythm += c + parseInt(nodeLen);
									nodeLen = nodeLen - 1;
								}else if(nodeLen>1 && parseInt(nodeLen)==parseInt(nodeLen)){
									lineRhythm += c + parseInt(nodeLen);
									nodeLen = 0;
								}
								if(nodeLen==1){
									lineRhythm += c;
								}
								if(nodeLen>0 && nodeLen<1){
									var s = nodeLen;
									var t = "";
									for(var m=2;;m=m*2){
										if(s==0){
											break;	
										}
										if(s>=1/m){
											s = s-1/m;
										}
										t += "/";
									}
									lineRhythm += c+t;
								}
								//lineRhythm += c+nodeLen;
							}
						}
						lineRhythm += lineNodes[k].barLineStr.replace(/\d\.*/g,"");
					}else if(/x\d*/.test(nodeStr)){
						lineRhythm += nodeStr;
					}
					
				}
				lineRhythm += "\n";
//				console.log("line:",line)
//				console.log("lineRhythm:",lineRhythm)
			}
			if(firstLine==0){
				// 当前声部增加到已处理的声部数组中
				hasHandle_v.push(curr_v);
				var nodeStr = line.split("|")[0];
				if($.trim(nodeStr)==""){
					nodeStr = line.split("|")[1];
				}
				var tmpStr = nodeStr.replaceAll(/\[.\:.[^\]]*\]/g,"").replaceAll(/\".[^\"]*\"/g,"");
				// 中括号内的正则表达式
				var pattern = /\[.\:.[^\]]*\]/g;
				// 第一个小节的长度
				firstNodeLen = calNodeLen(tmpStr);
				// 第一个小节的实际长度与标准长度的差（弱起小节时不为0）
				var misLen = n*num - firstNodeLen;
				// 如果不需要补全弱起小节，则midLen置为0
				if(preNodeNum==0){
					misLen = 0;
				}
				// 用休止符补全弱起小节
				if(misLen>0){
					
					// 差几个完整的1拍，
					// 如：6/8拍，第一个小节只有1拍，则b=2,s=1,总共和起来差5拍
					// 如：6/8拍，第一个小节只有半拍，则b=2,s=1.5,总共和起来差5.5拍
					// 如：6/8拍，第一个小节只有2拍，则b=2,s=0,总共和起来差4拍
					var b = parseInt(misLen/2);
					// 差除了完整的1拍外剩余的拍数
					var s = misLen%2;
					// console.log("s:"+s+" b:"+b);
					var bStr = "";
					if(b!=0){
						bStr = "z"+2*b;
					}
					var sStr = "";
					if(s!=0){
						/*
						 * if(s>=1){ sStr = "z"; s = s-1; } if(s>=0.5){ sStr +=
						 * "z/"; s = s-0.5; } if(s>=0.25){ sStr += "z//"; s =
						 * s-0.25; } if(s>=0.125){ sStr += "z///"; s = s-0.125; }
						 */
						var t = "";
						for(var k=1;;k=k*2){
							if(s==0){
								break;	
							}
							if(s>=1/k){
								sStr += "z"+t;
								s = s-1/k;
							}
							t += "/";
						}
					}
					var specStrs = line.match(pattern);
					var startIndex = 0;
					if(line.indexOf("|:")>-1){
						startIndex = line.indexOf("|:")+2;
					}
					if(specStrs!=null){
						for(var k=0;k<specStrs.length;k++){
							startIndex = line.indexOf(specStrs[k])+specStrs[k].length;
						}
					}
					line = line.substr(0,startIndex)+bStr+sStr+line.substr(startIndex);
					
				}
				// 添加预备拍
				if(preNodeNum!=0){
					for(var x=0;x<preNodeNum;x++){
						preNodeStr += "|";
						for(var j=0;j<num;j++){
							if(n!=1){
								preNodeStr += "z"+n;
							}else{
								preNodeStr += "z";
							}
							
						}
					}
					if(preNodeStr!=""){
						preNodeStr = preNodeStr.substr(1);
					}
				}
				if(preNodeStr!=""){
					if(line.startWith("\\|")){
						line = preNodeStr + line;
					}else{
						line = preNodeStr + "|" + line;
					}
				}
				if(!vFlag){
					line = "V:1\n" + line;
					vFlag = true;
				}
			}
			firstLine++;
			
		}
		// 增加第9个声部
		if(line.indexOf("%%staves")>-1){
			if(line.indexOf("]")>-1 && line.indexOf("]")==(line.length-1)){
				//line = line.replace("]"," | 99]");//
				line = line.replace(/(.*)\]/,'$1  99]]');//替换最后一个
			}else{
				line = line + " 99";
			}
		}
		if(line.indexOf("%%score")>-1){
			if(line.indexOf("]")>-1 && line.indexOf("]")==(line.length-1)){
//				line = line.replace("]"," | 99]");
				line = line.replace(/(.*)\]/,'$1  99]');//替换最后一个
			}else{
				line = line.replace("%%score","%%score [") + " 99]";
			}
		}
		// 如果行中有[V:n]，则放到该行最前面
		var vMatch = line.match(/\[V:.[^\]]*\]/);
		if(vMatch!=null){
			line = line.replace(vMatch[0],"");
			line = vMatch[0] + line;
		}
		if(line.replace("\s","")!=""){
			staff += line + "\n";
		}
		//currStaff.staff += line + "\n";
	}
	
	staff = replaceBlankLine(staff);
	//如果最后是%%endtext结尾，则在%%begintext之前要加一个空行
	if(staff.trim().endWith("%%endtext")){
		var reg = /%%begintext/g;
		var textMatchs = staff.match(reg);
		if(textMatchs.length>0){
			for(var i=textMatchs.length;i>0;i--){
				var r = reg.exec(staff);
				if(i==1){
					//staff = staff.substring(0,r.index)+"\n"+staff.substring(r.index);//这一行代码是加一个空行
					staff = staff.substring(0,r.index);//这一行代码是直接去掉结尾的注释
				}
			}
		}
	}
	
	
	staff += "V:99 perc stafflines=1\n%%MIDI program 115\nK:C shift=cc octave=0\n"+lineRhythm+"\n";//最后一行
	
	//加上L的配置，因为有些谱子不同声部配置了不同的L
	if(staff.match(/L:/g)!=null && staff.match(/L:/g).length>1){
		staff = staff.replace(/V:99 perc stafflines=1/g,"V:99 perc stafflines=1\nL:"+L);
	}
	//var rhythmStr = genRhythm(sourceid,preNodeNum,type);
	
	// 弱起小节，第一节小特殊处理*********start
//	if(preNodeNum==0 && firstNodeLen!=-1 && parseInt(n*num)>firstNodeLen){
//		var pat = /B.[^\|]*\|/;
//		var misLen = firstNodeLen;
//		if(misLen>0){
//			var firstNodeStr = "";
//			while(misLen>=n){
//				firstNodeStr += "B"+n;
//				misLen = misLen - n;
//			}
//			if(misLen>0){
//				if(parseInt(misLen)==misLen){
//					// 整数
//					firstNodeStr += "B"+misLen;
//				}else{
//					// 小数
//					firstNodeStr += "B"+decimalsToFractional(misLen);
//				}
//				
//			}
//			console.log("第一小节",firstNodeStr);
//			
//			rhythmStr = rhythmStr.replace(pat,firstNodeStr+"|");
//		}
//	}
	// 弱起小节，第一节小特殊处理*********end
	// 有弱起小节的，最后一节要特殊处理*********start
//	if(firstNodeLen!=-1 && parseInt(n*num)>firstNodeLen){
//		var pat = /\|.[^\|]*\|\]/;
//		var misLen = n*num - firstNodeLen;
//		if(misLen>0){
//			var lastNodeStr = "";
//			while(misLen>=n){
//				lastNodeStr += "B"+n;
//				misLen = misLen - n;
//			}
//			if(misLen>0){
//				if(parseInt(misLen)==misLen){
//					// 整数
//					lastNodeStr += "B"+misLen;
//				}else{
//					// 小数
//					lastNodeStr += "B"+decimalsToFractional(misLen);
//				}
//				
//			}
//			console.log("最后一小节",lastNodeStr);
//			
//			rhythmStr = rhythmStr.replace(pat,"|"+lastNodeStr+"|]")
//		}
//	}
//	// 有弱起小节的，最后一节要特殊处理*********end
//	staff = staff + rhythmStr;
//	staff = replaceBlankLine(staff);
//	// 如果原来没有配置%%score,则增加score[]*********start
//	if(staff.indexOf("%%score")<0 && staff.indexOf("%%stave")<0){
//		var scoreStr = "%%score [";
//		var tmpArr = new Array();
//		// 没有%%score标记的话，要加上
//		var vPattern = /V:\s*(\d)/g;
//		var vs = staff.match(vPattern);
//		if(vs!=null){
//			for(var i=0;i<vs.length;i++){
//				var scoreNum = vs[i].match(/V:\s*(\d)/)[1];
//				if(tmpArr.indexOf(scoreNum)<0){
//					tmpArr.push(scoreNum);
//				}
//				
//			}
//		}
//		scoreStr += tmpArr.join(' ')+"]";
//		var xPattern = /X:.*\n/;
//		var xLine = staff.match(xPattern);
//		if(xLine!=null){
//			staff = staff.replace(xLine[0],xLine[0]+scoreStr+"\n")
//		}
//	}
	// *********************************end
	
	
	
	// 处理如果一个谱子里有多处定义score或staves则取定义最多的一个替换掉第1个，其它的全部去掉*******start，这里暂时不去掉，因为公共声部如果去掉会有问题
/*	var reg = /%%score.*\n|%%staves.*\n/g;
	var staffMatchs = staff.match(reg);
	if(staffMatchs!=null){
		var lastScore = "";
		for(var i=0;i<staffMatchs.length;i++){
			var tmpScore = staffMatchs[i];
			if(tmpScore.length>lastScore.length){
				lastScore = tmpScore;
			}
		}
		if(lastScore!=""){
			var tmpStaff = "";
			var lastIndex = 0;
			for(var i=0;i<staffMatchs.length;i++){
				if(i==0){
					tmpStaff += staff.substring(0,staff.indexOf(staffMatchs[i])) + lastScore;
				}else{
					tmpStaff += staff.substring(0,staff.indexOf(staffMatchs[i]));
					// staff = staff.replace(staffMatchs[i]+"\n","");
				}
				staff = staff.substring(staff.indexOf(staffMatchs[i])+staffMatchs[i].length);
			}
			tmpStaff += staff;
			if(tmpStaff!=""){
				staff = tmpStaff;
			}
		}
	}*/
	// end***********************
	staff = replaceBlankLine(staff);
	return staff;
	
}
// 合并svg元素，生成png图片
function mergeSvg2Png(){
	staffData = mydolayout($("#source").val(),false);
	var svgs = $("svg.music");
	var firstSvg;
	var height = 0;
	var totalHeight = 0;
	var translateHeight = 0;
	
	
	
	if(svgs!=null && svgs.length>0){
		firstSvg = svgs[0];
		var top = $(firstSvg).find("g.g").offset().top-$(firstSvg).offset().top;
		height = $(firstSvg).height();
		
		for(var i=1;i<svgs.length;i++){
			var svg = svgs[i];
			var g = $(svg).find("g.g");
			var defs = $(svg).find("defs");
			var transform = $(g).attr("transform");
			if(transform!=null){
				transform = transform + "translate(0,"+height/scale+")";
			}else{
				transform = "translate(0,"+height/scale+")";
			}
			// height += $(g)[0].getBoundingClientRect().height;
			if(g.length>0){
				height += $(svg).height();
				if(defs.length>0){
					$(firstSvg).append($(defs));
				}
				$(firstSvg).append($(g).attr("transform",transform));
			}
		}
	}
	$(firstSvg).height(height);
	$(firstSvg).attr("height",height);
	var viewBox = $(firstSvg).attr("viewBox");
	var nums = viewBox.split(" ");
	var newViewBox = "";
	for(var i=0;i<nums.length;i++){
		if(i<nums.length-1){
			newViewBox += nums[i] + " "; 
		}else{
			newViewBox += height;
		}
	}
	if(newViewBox!=""){
		$(firstSvg).attr("viewBox",newViewBox);
	}
	// 获取每一行的偏移量
	var lineoffsets = new Array();
	$.each($(firstSvg).find("g.g"),function(i,item){
		var transform = $(item).attr("transform");
		if($.trim(transform)!=""){
			if(transform.indexOf("translate")>-1){
				var arr = transform.replace("translate(","").replace(")","").split(",");
				translateX = parseFloat(arr[0]);
				translateY = parseFloat(arr[1]);
				lineoffsets.push(parseFloat(translateY.toFixed(2)));
			}else{
				lineoffsets.push(0);
			}
		}
	});
	staffData.line_offsets = lineoffsets;
	// console.log($(firstSvg).prop("outerHTML"))
	var canvas = $($(firstSvg).prop("outerHTML"))[0];
	console.log(canvas)
	return canvas;

	// saveSvgAsPng(canvas, 'test.png');
	/*
	 * svgAsPngUri(canvas, null, function(uri){
	 * $("#imgpreview").attr("src",uri);
	 * 
	 * $("#picdata").val(uri); debugger; });
	 */
	
}

/**
 * 获取小节线原始坐标数据
 * 
 * @returns
 */
function getBarLineData(){
	var obj = new Object();
	var index = 0;
	// x坐标
	var xs = new Array();
	// y坐标（上）
	var ymins = new Array();
	// y坐标（下）
	var ymaxs = new Array();
	// 每个svg的top
	var tops = new Array();
	var lastSeq = -1;
	$.each($("svg.music"),function(i,item){
		var linex = new Array();
		var lineymin = new Array();
		var lineymax = new Array();
		// 存储同一行内的x坐标数据
		var innerlinex = new Array();
		var y = -1;
		tops.push($(item).offset().top)
		$.each($(item).find("rect[type='bar'],rect[type='splnum_bar']"),function(j,rect){
			var seq = $(rect).attr("class").match(/\_([0-9]*)\_/)[1];
			if(j==0){
				y = $(rect).attr("y");
			}
			// 这里判断如果一个小节线连续被用到2次，就忽略后一次（主要是大谱表每一行最后一个是反复符号的情况）
			if(lastSeq==seq){
				return;
			}
			lastSeq = seq;
			
			// 只算一个svg里面第声部的x坐标，理论上一个svg里面后面几排的x坐标应该与第一排保持一致(差值小于30算是在同一行，有些有连音符的，y值并不相等)
			if(Math.abs(parseInt(y)-parseInt($(rect).attr("y")))<50){
				var tmp = parseFloat($(rect).attr("x"));
				// 这里的判断用于过滤掉小节线在第一个的情况
				var isInLineFirst = checkBarIsInLineFirst($(rect));//判断是不是以小节线开头，true表示以小节线开头，false表示以音符或休止符开头
				if(isInLineFirst){
					return;
				}
//				if(tmp>40){
//					if(tmp<70){//如果x坐标小于70,判断如果是反复符号,则跳过
//						var istart = $(rect).attr("istart");
//						var s = syms[istart];
//						if(!s){
//							return;
//						}
//						if(s.bar_type.indexOf(":")>-1 || s.bar_type=="||"){
//							return;
//						}
//					}
					// 同一行内的x坐标如果已经存在，就不再加了，这种情况存在于多声部，如果不做该 判断，会多出几个同样的x坐标
					if(innerlinex.indexOf(tmp)<0){
						linex.push(tmp);
						innerlinex.push(tmp);
					}
//				}
			}
			lineymin.push(parseFloat($(rect).attr("y")));
			lineymax.push(parseFloat($(rect).attr("y"))+parseFloat($(rect).attr("height")));
		});
		xs.push(linex.sort(function(a,b){
			return a - b;
		}));
		lineymin.sort(function(a,b){
			return a - b;
		});
		// 倒序
		lineymax.sort(function(a,b){
			return b - a;
		});
		ymins.push(lineymin[0]);
		ymaxs.push(lineymax[0]);
	});
	obj.tops = tops;
	obj.xs = xs;
	obj.ymins = ymins;
	obj.ymaxs = ymaxs;
	
	return obj;
}
//取得小节的坐标数据（每个声部区分开）-五线谱
function getNodeCoor(){
	var data = getBarLineData();//
	data.staff = new Array();
	$.each($("g[type='staff']"),function(i,item){
		console.log($(item).height())
		var st = $(item).attr("st");
		var staff = new Object();
		var transform = $(item).attr("transform");
		var translate = getTransformsTranslate(transform);
		var lineIndex = $(item).parents("svg").attr("index");
		staff.translate = translate;
		staff.v = parseInt(st);
		staff.lineIndex = parseInt(lineIndex);
		staff.top = $(item).offset().top;
		data.staff.push(staff);
	});
	return data;
}
//取得小节的坐标数据（每个声部区分开）-简谱
function getSimpleNodeCoor(){
	var data = getBarLineData();//
	data.staff = new Array();
	$.each($("rect[type='splnum_bar']"),function(i,item){
		var st = parseInt($(item).attr("st"));
		var x = parseFloat($(item).attr("x"));
		var y = parseFloat($(item).attr("y"));
		var lineIndex = parseInt($(item).parents("svg").attr("index"));
		//判断是否已经加过了，一行只要加一次就行
		var exist = false;
		for(var j=0;j<data.staff.length;j++){
			stf = data.staff[j];
			if(stf.v==st && stf.lineIndex == lineIndex){
				exist = true;
			}
		}
		
		if(!exist){
			var translate = new Object();
			translate.x = x ;
			translate.y = y ;
			var staff = new Object();
			staff.v = parseInt(st);
			staff.lineIndex = parseInt(lineIndex);
			staff.top = $(item).offset().top;
			staff.translate = translate;
			data.staff.push(staff);
		}
	});
	return data;
}
/**
 * 根据不同的scale取小节线具体的坐标数据
 * 
 * @param scale
 * @returns
 */
function getBarLineCoor(scale,addTop,offset_x){
	var data = getBarLineData();
	var array = new Array();
	var nodeIndex = 0;
	// 最大的x坐标，用于赋值给每一行的最后一个对象，保证右对齐
	var maxX2 = 0;
	var lineLast = new Array();

	for(var line=0;line<data.xs.length;line++){
		for(var i=0;i<data.xs[line].length;i++){
			var x1 = 0;
			var ymin = 0;
			var x2 = 0;
			var ymax = 0;
			var obj = new Object();
			
			var barline_start = new Array();
			if(i==0){
				if(musicType==2){
					x1 = 30*scale;
				} else {
					x1 = 0;
				}
			} else {
				x1 = data.xs[line][i-1]*scale;
			}
			x2 = data.xs[line][i]*scale;
			if(addTop){
				ymin = data.ymins[line]*scale + data.tops[line];
				ymax = data.ymaxs[line]*scale + data.tops[line];
			}else{
				ymin = data.ymins[line]*scale;
				ymax = data.ymaxs[line]*scale;
			}
			
			if(offset_x){
				x1 += offset_x * scale;
				x2 += offset_x * scale;
			}
			
			// 非简谱的第一列，左移至起始位置
			if(i == 0 && musicType != 2){
				x1 = 0; 
			}
			// 开始线的坐标
			barline_start.push(x1);
			barline_start.push(ymin);
			barline_start.push(x1);
			barline_start.push(ymax);
			obj.barline_start = barline_start;
			
			// 结束线坐标
			var barline_end = new Array();
			barline_end.push(x2);
			barline_end.push(ymin);
			barline_end.push(x2);
			barline_end.push(ymax);
			obj.barline_end = barline_end;
			obj.node_index = nodeIndex++;
			obj.line = line;
			array.push(obj);
			
			if( maxX2 < x2 ){
				maxX2 = x2;
			}
			if(i + 1 == data.xs[line].length){
				lineLast.push(obj);
			}
		}
	}
	
	// 设置最后一行对齐，但是如果最后一行没满，那么就不设置对齐，不然很难看
	for (var i = 0; i < lineLast.length; i++) {
		var end = lineLast[i].barline_end[0];
		if( Math.abs(maxX2 - end) < 100){
			lineLast[i].barline_end[0] = maxX2;
			lineLast[i].barline_end[2] = maxX2;
		}
	}
	return array;
}
// 去掉空的大括号
function replaceBraces(source){
	var content = $("#"+source).val();
	if(!content){
		return;
	}
	content = content.replaceAll(/\{\/*\s*\}/g,"");
	$("#"+source).val(content);
}
// 取最近的节拍的值
function getNearK(sourceid){
	var content = $("#"+sourceid).val();
	// 光标位置
    var cursorPos = getStartPos(getById(sourceid));
    
    if(cursorPos>0){
    	content = content.substr(0,cursorPos);
    }
    var kPattern = /\[K:\s*(.[^\]]*)\]|K:\s(.*)\n/g;
    var keys = content.match(kPattern);
    if(keys==null){
    	return null;
    }else{
    	var pat = /K:\s*(.[^\]]*)]*/;
    	var nearK = keys[keys.length-1];
    	if(nearK!=""){
    		var ms =nearK.match(pat);
    		if(ms!=null){
    			return ms[1];
    		}
    	}
    	return nearK;
    }
    return "";
	
}
// 小数转分数
function decimalsToFractional(decimals){
    const formatDecimals = decimals.toFixed(5)
    let denominator = 10000 // 初始化分母
    let numerator  = formatDecimals * 10000 // 初始化分子
    let bigger = 0
    function  recursion (){
        bigger = denominator > numerator ? denominator : numerator
        for(let i = bigger; i > 1; i--){
            if(
                Number.isInteger(numerator/i)
                && Number.isInteger(denominator/i)){
                numerator=numerator/i
                denominator=denominator/i
                recursion()
            }
        }
    }
    recursion()
    return numerator+"/"+denominator;
}

// 设置每行显示小节数
// %%barsperstaff 4
function setBarsPerstaff(sourceid,num){
	
	var content = $("#"+sourceid).val();
	/*老的写法，加barsperstaff;
	var pattern = /%%barsperstaff\s*(\d)*\n/;
	if(parseInt(num)<1){
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
	*/
	var newContent = handleBreakLine(content,num);
	$("#"+sourceid).val(newContent);
	abc_change();
}
// 显示/隐藏小节线序号
function showNodeSeq(sourceid){
	var content = $("#"+sourceid).val();
	
	var pattern = /%%measurenb\s*1\n%%contbarnb 1\n/;
	var matches = content.match(pattern);
	var str = "%%measurenb 1\n%%contbarnb 1\n";
	if(matches!=null){
		// 已经存在，则去掉
		content = content.replaceAll(pattern,"");
	}else{
		content = str + content;
	}
	if(content.indexOf("%%showfirstmeasure")>-1){
		content = content.replaceAll(/%%showfirstmeasure\n/,"");
	}
	content = content.replaceAll(/%%measurenb\s*0\n/,"");
	$("#"+sourceid).val(content);
	abc_change();
}
function showNodeSeq5(sourceid){
	var content = $("#"+sourceid).val();
	
	var pattern = /%%measurenb.*\n/;
	var matches = content.match(pattern);
	var str = "%%measurenb 5\n";
	if(matches!=null){
		// 已经存在，则去掉
		content = content.replaceAll(pattern,"");
	}else{
		content = str + content;
	}
	if(content.indexOf("%%showfirstmeasure")>-1){
		content = content.replaceAll(/%%showfirstmeasure\n/,"");
	}
	content = content.replaceAll(/%%measurenb\s*0\n/,"");
	$("#"+sourceid).val(content);
	abc_change();
}
// 显示/隐藏每行第1个小节线序号measurenb 0可以实现该 功能
function showLineFirstNodeSeq(sourceid){
	var content = $("#"+sourceid).val();
	var pattern = /%%measurenb\s*0\n/;
	var matches = content.match(pattern);
	var str = "%%measurenb 0\n";
	if(matches!=null){
		// 已经存在，则去掉
		content = content.replaceAll(pattern,"");
	}else{
		content = str + content;
	}
	content = content.replaceAll(/%%measurenb\s*1\n/,"");
	$("#"+sourceid).val(content);
	abc_change();
}
// 取得不同声部的数据
function getVoicePart(sourceid,varr){
	//all_s(true);
	var content = $("#"+sourceid).val();
	var lines = content.split("\n");
	var body = "";
//	s_list.sort(function(a,b){
//		return a.istart - b.istart
//	});
	for(var j=0;j<varr.length;j++){
		var v = varr[j];
		var vstr = "V:"+(v+1)+"\n";
		var prog = "%%MIDI program PRONUM \n";
		
		var lineStr = vstr + "";
		var lastLineNum = -1;
		
		for(var i=0;i<syms.length;i++){
			if(!syms[i]){
				continue;
			}
			var s = syms[i];
			//if(s.v==v){
				if(prog.indexOf("PRONUM")>-1){
					prog = prog.replace("PRONUM",s.p_v.instr == undefined ? 0 : s.p_v.instr);
				}
				var lineNum = findLineNumByIndex(content,s.istart);
				if(lineNum!=lastLineNum){
					if(lines[lineNum].indexOf("V:")<0 && lines[lineNum].indexOf("score")<0 && lines[lineNum].indexOf("stave")<0){
						lineStr += lines[lineNum]+"\n";
					}
				}
				lastLineNum = lineNum;
			//}
		}
		body += lineStr;
	}
	
	
	var header = getHeadStaff("source");
	return header + prog + body;
}
// 取声部列表1,2,3
function getVoiceList(sourceid){
	all_s(true);
	var voice = new Array();
	for(var i=0;i<s_list.length;i++){
		var s = s_list[i];
		if(voice.indexOf(s.v)<0){
			voice.push(s.v);
		}
	}
	return voice;
}
// 去掉前面的空白x音（替换成y）
function replaceBlankNote(content){
	var firstIndex = -1;
	var slist = all_s(false);
	var noteDatas = getNoteData();
	var newcontent = "";
	var lastEndArr = new Array();
	var lastEnd = 0;
	var varr = new Array();
	for(var i=0;i<noteDatas.length;i++){
		var note = noteDatas[i];
		if(note[3]!=0){
			firstIndex = i;
			break;
		}else{
			var istart = note[0];
			for(var j=0;j<slist.length;j++){
				var s = slist[j];
				if(s.istart == istart){
					content = replaceByIndex(content,s.istart,s.iend);
				}
			}
		}
	}
	return content;
}
// 替换区间内的字符
function replaceByIndex(content,start,end){
	var tmp = content.substring(start,end);
	tmp = tmp.replace("x","y");
	var newContent = content.substring(0,start)+tmp+content.substring(end);
	return newContent;
}
// %%titlecolor red 标题颜色
// %%titlefont serif 24 标题字体大小
function setTitleSize(sourceid,fontSize){
	var content = $("#"+sourceid).val();
	if(fontSize!=""){
		var titleFontSizePattern = /titlefont.*/;
		var matchs = content.match(titleFontSizePattern);
		if(matchs!=null){
			var fontStr = matchs[0];
			var numReg = new RegExp(/[0-9]/);
			if(numReg.test(fontStr)){
				content = content.replace(fontStr,fontStr.replace(/[0-9]\d*/,fontSize));
			}else{
				content = content.replace(fontStr,fontStr + " " +fontSize);
			}
		}else{
			content = "%%titlefont Microsoft-YaHei " + fontSize + "\n"+content;
		}
	}
	
	$("#"+sourceid).val(content);
	abc_change();
}

function setTitleColor(sourceid,color){
	var content = $("#"+sourceid).val();
	if(color!=""){
		color = "#"+color;
		var titleFontColorPattern = /titlecolor.*/;
		var matchs = content.match(titleFontColorPattern);
		if(matchs!=null){
			var fontStr = matchs[0];
			content = content.replace(fontStr,"titlecolor "+color);
		}else{
			content = "%%titlecolor "+color + "\n"+content;
		}
	}
	
	$("#"+sourceid).val(content);
	abc_change();
}
// 加粗
function setTitleBold(sourceid,bold){
	var content = $("#"+sourceid).val();
	if(bold){
		// 加粗
		if(content.indexOf("titlefont serifB")>-1 ){
			return;
		}
		if(content.indexOf("titlefont serif")>-1 ){
			content = content.replace("titlefont serif","titlefont serifB");
		} else {
			content = "%%titlefont serifB\n" + content;
		}
	}else{
		// 取消加粗
		if(content.indexOf("titlefont serifB")>-1 ){
			content = content.replace("titlefont serifB","titlefont serif");
		}
	}
	
	
	$("#"+sourceid).val(content);
	abc_change();
}
// 设置歌词字体大小
function setLyricSize(sourceid,fontSize){
	var content = $("#"+sourceid).val();
	if(fontSize!=""){
		var titleFontSizePattern = /vocalfont.*/;
		var matchs = content.match(titleFontSizePattern);
		if(matchs!=null){
			var fontStr = matchs[0];
			content = content.replace(fontStr,fontStr.replace(/[0-9]\d*/,fontSize));
		} else {
			content = "%%vocalfont serifBold " + fontSize + "\n"+content;
		}
	}
	
	$("#"+sourceid).val(content);
	abc_change();
}
function setBracketGchSize(){
	var fontSize = $("#bracketGchFontSize").val();
	setBracketGchFontSize("source",fontSize);
}
//设备自定义带中括号标注的字体大小
function setBracketGchFontSize(sourceid,fontSize){
	var content = $("#"+sourceid).val();
	if(fontSize!=""){
		var titleFontSizePattern = /brackgchfont.*/;
		var matchs = content.match(titleFontSizePattern);
		if(matchs!=null){
			var fontStr = matchs[0];
			content = content.replace(fontStr,fontStr.replace(/[0-9]\d*/,fontSize));
		} else {
			content = "%%brackgchfont " + fontSize + "\n"+content;
		}
	}
	
	$("#"+sourceid).val(content);
	abc_change();
}

function setLyricColor(sourceid,color){
	var content = $("#"+sourceid).val();
	if(color!=""){
		color = "#"+color;
		var titleFontColorPattern = /lyriccolor.*/;
		var matchs = content.match(titleFontColorPattern);
		if(matchs!=null){
			var fontStr = matchs[0];
			content = content.replace(fontStr,"lyriccolor "+color);
		}else{
			content = "%%lyriccolor "+color + "\n"+content;
		}
	}
	
	$("#"+sourceid).val(content);
	abc_change();
}

// base64的图片转blob
function dataURIToBlob(dataURI) {
	  var binStr = atob(dataURI.split(',')[1]),
	    len = binStr.length,
	    arr = new Uint8Array(len);

	  for (var i = 0; i < len; i++) {
	    arr[i] = binStr.charCodeAt(i);
	  }

	  return new Blob([arr])
}
// 导出pdf (doms是要导出的对象数组)
function exportPdf(doms,callback){
	var pdf = new jsPDF('', 'pt', 'a4');
	var finishIndex = 0;
	var currIndex = 0;
	var process = 0;// 是否正在处理的标记
	var interval1 = setInterval(function(){
		if(process != 0){
			return;
		}
		if(currIndex > doms.length-1){
			clearInterval(interval1);
			return;
		}
		var dom = doms[currIndex++];
		console.log(dom.id)
		process = 1;
		
		console.log("currIndex:",currIndex)
		$("#maskfulltxt").html("正在导出第("+currIndex+"/"+doms.length+")页")
		
		html2canvas(dom, {
			async:false,
	        onrendered:function(canvas) {
	            var contentWidth = canvas.width;
	            var contentHeight = canvas.height;
	            // 一页pdf显示html页面生成的canvas高度;
	            var pageHeight = contentWidth / 592.28 * 841.89;
	            // 未生成pdf的html页面高度
	            var leftHeight = contentHeight;
	            // pdf页面偏移
	            var position = 0;
	            // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
	            var imgWidth = 595.28;
	            var imgHeight = 592.28/contentWidth * contentHeight;

	            var pageData = canvas.toDataURL('image/jpeg', 1.0);

	            // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
	            // 当内容未超过pdf一页显示的范围，无需分页
	            if (leftHeight < pageHeight) {
	            	//pdf.addImage(user_icon, 'JPEG', 0, 0, 600, 100 );
	            	
	                pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
	                if(currIndex<doms.length){
			            pdf.addPage();
	                }
	            } else {
	                while(leftHeight > 0) {
	                	//pdf.addImage(user_icon, 'JPEG', 0, 0, 600, 100 );
	                    pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
	                    leftHeight -= pageHeight;
	                    position -= 841.89;
	                    // 避免添加空白页
	                    if(leftHeight > 0) {
	                        pdf.addPage();
	                    }
	                }
	            }
	            process = 0;
	            finishIndex++;
	        }
	    })
	},500);
	var tmpInterval = setInterval(function(){
		if(finishIndex > doms.length-1){
			var title = getT();
			if(!title){
				title="content";
			}else{
				title = title.replace(/\s/g,"")
			}
			pdf.save(title+'.pdf');
			clearInterval(tmpInterval);
			if (typeof callback == 'function') {
				callback();
			}
		}
	},500);
}

function getImageBase64(img, ext) {
    var canvas = document.createElement("canvas");   //创建canvas DOM元素，并设置其宽高和图片一样
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height); //使用画布画图
    var dataURL = canvas.toDataURL("image/" + ext);  //返回的是一串Base64编码的URL并指定格式
    canvas = null; //释放
    return dataURL;
}

// 让div可拖动
function dragFunc(id) {
    var Drag = document.getElementById(id);
    Drag.onmousedown = function(event) {
        var ev = event || window.event;
        event.stopPropagation();
        var disX = ev.pageX - Drag.offsetLeft;
        var disY = ev.pageY - Drag.offsetTop;
        document.onmousemove = function(event) {
            var ev = event || window.event;
            Drag.style.left = ev.pageX - disX + 350 + "px";
            Drag.style.top = ev.pageY - disY + "px";
            Drag.style.cursor = "move";
        };
    };
    Drag.onmouseup = function() {
        document.onmousemove = null;
        this.style.cursor = "default";
    };
};

function barLineCoorData(barLineCoor,musicType){
	if(!bar_seq){
		getNoteData();
	}
	var offset = 12;
	for(var i=0;i<barLineCoor.length;i++){
		var data = barLineCoor[i];
		if(musicType!=2){
			// 五线谱和简线混排，x坐标要向左偏9
			data.barline_end[0] += offset;
			data.barline_end[2] += offset;
			data.barline_start[0] += offset;
			data.barline_start[2] += offset;
			
		}
		if(data.notes && data.notes.length>0){
			continue;
		}
		var nodeIndex = data.node_index;
		for(var j=0;j<bar_seq.length;j++){
			if(bar_seq[j].node_index==nodeIndex){
				data.notes = new Array();
				var arr = new Array();
				arr.push("");
				arr.push(bar_seq[j].beat);
				data.notes.push(arr);
				break;
			}
		}
	}
}
//显示/隐藏强弱标记
var switchMeter = new Array();//复拍子
function showStrongWeak(sourceid){
	switchMeter = new Array();
	var content = $("#"+sourceid).val();
	if(content.indexOf("showbeat")>-1){
		content = content.replace("%%showbeat\n","");
		$("#"+sourceid).val(content);
		src_change();
		return;
	} else {
		content = "%%showbeat\n" + content;
	}
	$("#"+sourceid).val(content);
	src_change();
	//这里判断一下是否有复拍子，如果有，弹出选择框让用户选择使用哪种模式
	var meters = getAllMeter("source");
	if(meters!=null){
		for(var i=0;i<meters.length;i++){
			var str = meters[i];
			var matchs = str.match(/M\s*:\s*([1-9])\/[1-9]/);
			var m = matchs[1];
			if(m==5 || m == 7){
				switchMeter.push(m);
			}
		}
	}
	if(switchMeter.length>0){
		var m5Exist = false;
		var m7Exist = false;
		for(var i=0;i<switchMeter.length;i++){
			if(switchMeter[i].indexOf("5")>-1){
				m5Exist = true;
				$("#m5_div").css("display","");
				continue;
			}
			if(switchMeter[i].indexOf("7")>-1){
				m7Exist = true;
				$("#m7_div").css("display","");
				continue;
			}
		}
		if(!m5Exist){
			$("#m5_div").css("display","none");
		}
		if(!m7Exist){
			$("#m7_div").css("display","none");
		}
		if(m5Exist && m7Exist){
			$("#METER_MODEL_div .modal-content").css("height",400);
		}
		$("#METER_MODEL_div .modal-content").css("left",($(window).width()-$("#METER_MODEL_div .modal-content").width())/2);
		$("#METER_MODEL_div").modal({
			  keyboard: true
		});
	}else{
		src_change();
	}
}
//切换柯尔文显示隐藏
function toggleKew(sourceid){
	var content = $("#"+sourceid).val();
	if(content.indexOf("showkew")>-1){
		content = content.replace("%%showkew\n","");
		$("#"+sourceid).val(content);
		src_change();
		return;
	} else {
		content = "%%showkew\n" + content;
	}
	$("#"+sourceid).val(content);
	src_change();
}
function changeMeterModel5(model){
	beatModel5 = model;
	src_change();
}
function changeMeterModel7(model){
	beatModel7 = model;
	src_change();
}
//获取所有的拍号
function getAllMeter(sourceid){
	var content = $("#"+sourceid).val();
	var meterPattern = /M\s*:\s*[1-9]\/[1-9]/g;
	return content.match(meterPattern);
}

// 显示隐藏歌词
function toggleLyric(sourceid){
	var content = $("#"+sourceid).val();
	if(content.indexOf("hidelyric")>-1){
		content = content.replace("%%hidelyric\n","");
	}else{
		content = "%%hidelyric\n" + content;
	}
	$("#"+sourceid).val(content);
	src_change();
}

/**
 * 获取abc内容中key对应的值，比如获取宽度、scale、音量等等
 * 
 * @param abcContent
 * @param key
 *            键值，如%%pagewidth、%%gain
 * @returns
 */
function toggleAbcKeyValue(abcContent, key, value) {
	var reg = new RegExp(key + ".*(\\r)*(?=\\n)");
	var kRow = reg.exec(abcContent);
	if (!kRow) {
		return key + " " + value + "\n" + abcContent;
	}

	kRow = kRow[0];
	abcContent = abcContent.replace(kRow, "");
	return abcContent;
}

/**
 * 获取abc内容中key对应的值，比如获取宽度、scale、音量等等
 * 
 * @param abcContent
 * @param key
 *            键值，如%%pagewidth、%%gain
 * @returns
 */
function setAbcKeyValue(abcContent, key, value) {
	if( key.indexOf("%%MIDI program") != -1){
		return setAbcProgram(abcContent, key, value);
	}
	var reg = new RegExp(key + ".*(\\r)*(?=\\n)");
	var kRow = reg.exec(abcContent);
	if (!kRow) {
		if(key == '%%score'){
			var kReg = new RegExp("K:.*(\\r)*(?=\\n)");
			var row = kReg.exec(abcContent);
			if(row){
				abcContent = abcContent.replace(row[0], row[0] + "\n" + key + " " + value);
			}
			return abcContent;
		}else{			
			return key + " " + value + "\n" + abcContent;
		}
	}

	kRow = kRow[0];
	abcContent = abcContent.replace(kRow, key + " " + (value || ''));
	return abcContent;
}


/**
 * 曲谱+节奏   不要了 2021-6-1 hxs
 * varr 
 * score
 */
function convert2RhythmAndPlay(content, varr, score){
	if(score){
		$('#source').val(setAbcKeyValue(content, '%%score', score));
		src_change();
	}
	var voicePartContent = getVoicePart("source", varr);
	
	var L="";
	var standV = 0;//因为节奏谱只能一个声部，所以标准都是0
	//取标准声部相对应的L的值，
	for(var i=0;i<syms.length;i++){
		var cs = syms[i];
		if(cs){
			if(cs.v == standV && (cs.type==8||cs.type==10) && !cs.grace){
				L = decimalsToFractional(cs.my_ulen/1536);
				break;
			}
		}
	}
	
 
	var noScore = content.indexOf("%%score") == -1 && content.indexOf("%%staves") == -1;
	var isSkip = false;
	var start = 0;
	var end = 0;
	var count = 0;
	var selPart = "V:" + ( varr[0] + 1);
	var scoreNew = "%%score [ " + (varr[0] - 0 + 1) + " 9 ]";
	var contentNewArr = new Array();
	var contentArr = getLinesInfo($("#source").val());
	var lines = contentArr;
	
	var hasNote = false;
	for (var i = 0; i < contentArr.length; i++) {
		var lineObj = contentArr[i];
		if(lineObj.v==varr[0] && lineObj.type=="note"){
			end++;
		}
			
		var cont = lineObj.lineStr;
		
		if(contentArr[i].type=="note"){
			hasNote = true;
		}
		var isAdd = false;
		if( cont.indexOf(selPart) != -1 ){
			count++;
			if( count > 1){
				isAdd = true;
			}
		}
		
		if( isSkip){
			isSkip = false;
			isAdd = false;
		}
		
		if(cont.indexOf("%%score") != -1 && count > 0 ){
			isAdd = true;
			isSkip = true;
		}
		
		if(hasNote && isAdd){
			// 从第一次出现该声部，到第二出现这个声部，此时把对应的节奏加上
			var result = "";
			var v_flag = false;
			
			for(var j = start; j < lines.length; j++){
				var line = lines[j].lineStr;
				
				if(lines[j].v==varr[0] && lines[j].type=="note"){
					line = getRhythmLine(line);
					line = line.replace(/\".[^\"]*\"/g,"");//去掉引号相关内容
					if(!v_flag){
						line = "\nV:9 perc stafflines=1 octave=0\n" + line;
						v_flag = true;
					}
					result += line + "\n";
					start = j + 1;
					
					contentNewArr.push( line + "\n");
					end--;
					if(end==0){
						contentNewArr.push("%%MIDI program 115\n");
						break;
					}
				}
			}
		} 
		
		if( cont.indexOf("%%score") != -1){
			contentNewArr.push( scoreNew);
		}else{
			contentNewArr.push( cont);
		}

		// 曲谱+节奏，%%score 的位置不能随意放置，否则不生效，现在放置在X:下一行， update by zhoudc 20201110
		if( noScore && cont.trim().indexOf("X:") == 0){
			contentNewArr.push( scoreNew + "\n");
		}
	}
	// 从第一次出现该声部，到第二出现这个声部，此时把对应的节奏加上
	var result = "";
	var v_flag = false;
	var addFlag = false;
	for(var j = start; j < lines.length; j++){
		var line = lines[j].lineStr;
		if(lines[j].v==varr[0] && lines[j].type=="note"){
			line = getRhythmLine(line);
			line = line.replace(/\".[^\"]*\"/g,"");//去掉引号相关内容
			if(!v_flag){
				line = "\nV:9 perc stafflines=1 octave=0\n" + line;
				v_flag = true;
			}
			result += line + "\n";
			contentNewArr.push( line + "\n");
			addFlag = true;
		}
	}
	
	content = contentNewArr.join("\n");	
	
	result = content;
	if(addFlag){
		result += "\n%%MIDI program 115";
	}
	//result = content + result + "\n%%MIDI program 115";
	// 去掉移调的设置
	// result = result.replace(/shift.*/,"");
	// result = setAbcKeyValue(result, "%%score", scoreNew)
	
	var staff = replaceBlankLine(result);
	//如果最后是%%endtext结尾，则在%%begintext之前要加一个空行
	if(staff.trim().endWith("%%endtext")){
		var reg = /%%begintext/g;
		var textMatchs = staff.match(reg);
		if(textMatchs.length>0){
			for(var i=textMatchs.length;i>0;i--){
				var r = reg.exec(staff);
				if(i==1){
//					staff = staff.substring(0,r.index)+"\n"+staff.substring(r.index);//这一行代码是增加一个空行
					staff = staff.substring(0,r.index)//这一行代码是直接去掉最后一块注释
				}
			}
		}
	}
	if(staff.match(/L:/g)!=null && staff.match(/L:/g).length>1){
		staff = staff.replace(/V:9 perc stafflines=1 octave=0/g,"V:9 perc stafflines=1 octave=0\nL:"+L+"\n%%MIDI program 115");
	}
	return staff;
}

/**
 * 曲谱+节奏
 * @param content 谱子内容
 * @param v 选定的声部，传入0为第1声部（V:1所对应的声部），传入1为第2声部（V:2所对应的声部）
 * @returns
 */
function convertStaffAndRhythm(content,v){
	var lines = getLinesInfo(content);
	var rhythmStr = "";//生成的节奏谱
	var result = "";
	var count = 0;
	for(var i=0;i<lines.length;i++){
		var line = lines[i];
		var lineType = line.type;
		var lineStr = line.lineStr;
		if(lineType=="note" && line.v==v){
			rhythmStr += getRhythmLine(lineStr) + "\n";
		}
		if(rhythmStr!="" && line.v!=v){
			if(count==0){
				//第一次添加时，加上节奏谱的声明
				rhythmStr = "V:9 perc stafflines=1 octave=0\n%%MIDI program 115\n" + rhythmStr;
			}else{
				rhythmStr = "V:9\n" + rhythmStr;
			}
			result += rhythmStr;
			rhythmStr = "";
			count++;
		}
		if(line.type=="score"){
			lineStr = lineStr + " 9"
		}
		result += lineStr+"\n";
	}
	//单声部时最后加上生成的节奏谱
	if(count==0){
		result += "V:9 perc stafflines=1 octave=0\n%%MIDI program 115\n" + rhythmStr;
		rhythmStr = "";
	}
	if(rhythmStr!=""){
		if(count==0){
			//第一次添加时，加上节奏谱的声明
			rhythmStr = "V:9 perc stafflines=1 octave=0\n%%MIDI program 115\n" + rhythmStr;
		}else{
			rhythmStr = "V:9\n" + rhythmStr;
		}
		result += rhythmStr;
		rhythmStr = "";
	}
	result = replaceBlankLine(result);
	return result;
}
/**
 * 设置曲谱音色
 * 
 * 注意不能替换曲谱+节奏、曲谱+节拍时多出的音色配置
 * 
 * @param abcContent
 * @param key
 *            键值，如%%pagewidth、%%gain
 * @returns
 */
function setAbcProgram(abcContent, key, value) {
	var reg = new RegExp(key + ".*(\\r)*(?=\\n)*", "gi");
	var kRow = abcContent.match( reg);
	if (!kRow) {
		return key + " " + value + "\n" + abcContent;
	}else if( kRow.length == 1){
		// 曲谱+节拍
		var isV99 = abcContent.indexOf("V:99 perc") != -1;
		// 曲谱+节奏
		var isV9 = abcContent.indexOf("V:9 perc") != -1;
		if( isV99 || isV9){
			return key + " " + value + "\n" + abcContent;
		}
	}

	kRow = kRow[0];
	abcContent = abcContent.replace(kRow, key + " " + value);
	return abcContent;
}

/**
 * 获取abc内容中key对应的值，比如获取宽度、scale、音量等等
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
	var cvalue = kRow.replace(key, "").replace(/(^\s*)|(\s*$)/g, "");
	return cvalue;
}

/**
 * 删除abc内容中key对应的值，比如获取宽度、scale、音量等等
 * 
 * @param abcContent
 * @param key
 * @returns
 */
function removeAbcKeyValue(abcContent, key){
	var reg = new RegExp(key + ".*(\\r)*(?=\\n)\\n");
	var kRow = reg.exec(abcContent);
	if (!kRow) {
		return abcContent;
	}

	kRow = kRow[0];
	abcContent = abcContent.replace(kRow, "");
	return abcContent;
}

function renderMusicForm(mfSetting,scale, isSelNote){
	if(isSelNote){
		renderMusicFormByNote(mfSetting,scale);
	}else{
		renderMusicFormByBar(mfSetting,scale);
	}
}


// 渲染曲式分析结果
function renderMusicFormByNote(mfSetting, scale, isSelNote){
	if(mfSetting!=null && mfSetting.length > 0){
		
		var tmpList = clone(mfSetting);
		tmpList.sort(function(a, b){
			return b.orderby.length -  a.orderby.length
		})
		var level = (tmpList[0].orderby).length / 3;
		
		$('.music-form').remove();
		$('.nobrk').css({
			position: 'relative',
			padding: 0
		});
		var offsetArr = [] ;
		var $notes ;
		if(musicType == 2){
			//$notes = $("svg rect[type='splnum_note'], svg rect[type='splnum_rest']")
			$notes = $("svg rect[type='splnum_note']:not(.ph), svg rect[type='splnum_rest']:not(.ph)")
		}else{
			$notes = $("svg rect[type='note'], svg rect[type='rest']");
		}

		var barlineArr = getBarLineCoor(scale,0,9);
		// 选择到音符
		$notes.each(function(index, item) {
			var $this = $(this);
			var istart =  $this.attr('istart');
			var line =  $this.parents("svg").index();
			var x = $this.attr('x')*scale ;
			var w = $this.attr('width')*scale;
			var fx;
			var barPo = barlineArr.find(function(item){
				if(index == 0 && item.barline_start[0] >= x ){
					x = item.barline_start[0];
				}
				fx = x+w/2;
				return item.line == line && item.barline_start[0] <= fx && item.barline_end[0] >= fx;
			})
			if(barPo){
				offsetArr.push({
					x1 : x,
					y1 : barPo.barline_start[1],
					x2 : x + w + 2,
					y2 : barPo.barline_end[1] + $(this).outerHeight(),
					istart: istart,
					line: line
				});
			}
		})
		//console.log('offsetArr:',offsetArr)
		offsetArr.sort(function(a, b){
			return a.istart - b.istart;
		})
		
		// 所有音符信息的map
		var sArr = all_s(), sMap = {};
		for(var i = 0; i<sArr.length; i++){
			var sArrPo = sArr[i];
			sMap[sArrPo.istart] = sArrPo;
		}
		
		for(var i = 0; i < offsetArr.length; i++){
			var nextNotePo = offsetArr[i+1];

			var notePo = offsetArr[i];
			var noteS = sMap[notePo.istart], bar_x_pos = 0, $bar;
			var $barS = null, $barE = null, $barW = 0;
			// 前面既有小节线，后面又有小节线的情况
			if(noteS.next && noteS.next.type == 0 && noteS.prev && noteS.prev.type == 0 && syms[noteS.istart].my_line == syms[noteS.prev.istart].my_line){
				$barS = $('._' + noteS.prev.istart + '_');
				$barE = $('._' + noteS.next.istart + '_');
				
				notePo.x1 = $barS.attr('x') * scale + $barS.attr('width') * scale * 0.5;
				notePo.x2 = $barE.attr('x') * scale + $barE.attr('width') * scale * 0.5;
				continue;
			}
			if(!nextNotePo){
				continue;
			}
			// 如果它与下一个音不再同一个小节，那就小节线的坐标结束
			if(noteS.next && noteS.next.type ==  0){
				bar_x_pos = 'end';
				$bar = $('._' + noteS.next.istart + '_');
			}
			// 如果前一个元素是小节线且与其在同一行，那就以小节线的坐标开始
			if(noteS.prev && noteS.prev.type == 0 && syms[noteS.istart].my_line == syms[noteS.prev.istart].my_line){
				bar_x_pos = 'start';
				$bar = $('._' + noteS.prev.istart + '_');
			}
			
			if(bar_x_pos){
				var $bar_x = $bar.attr('x') * scale;
				var $bar_w = $bar.attr('width') * scale;
				var noteX = $bar_x + $bar_w/2;
				
				switch (bar_x_pos) {
					case 'start':
						notePo.x1 = noteX;
						notePo.x2 = nextNotePo.x1;
						break;
					case 'end':
						notePo.x2 = noteX;
						break;
				}
				continue;
			}
			notePo.x2 = nextNotePo.x1;
			
		}
		
		for(var k=0; k < mfSetting.length; k++){
			var mf = mfSetting[k];
			var sPo = offsetArr[mf.startNodeIndex];
			var ePo = offsetArr[mf.endNodeIndex];
			if(!sPo || !ePo){
				continue;
			}
			
			var sTop = sPo.y1; // 第一小节top
			var sLeft = sPo.x1; // 第一小节left
			var eTop = ePo.y2; // 最后一小节top
			var eLeft = ePo.x2; // 最后一小节left
			var sLine = sPo.line; // 第一小节行数
			var eLine = ePo.line; // 最后一小节行数
			// 没有跨行的情况
			if(sLine == eLine){ 
				var width = eLeft - sLeft;
				var left = sLeft;
				var top = sTop
				appendDivstr(mf, eLine, top, left, width, level);
			}else { // 有跨行的情况
				
				// 跨多行时，从最后一行开始渲染
				var isLastLine = true; // 当前渲染的是否最后一行
				
				// 从最后一个小节开始，往前遍历每个小节，来定位在哪个小节跨的行，并处理有跨多行的情况
				for(var line = sLine; line <= eLine; line++){
					// 如果是第一行，从当前选中的第一个音符到该行的最后一个音符
					// 如果是最后一行，从该行开头的音符到选中的最后一个音符
					// 其他情况就是该行的开始音符到结束的音符
					
					var pos = offsetArr.filter(function(item){
						return line == item.line; 
					})
					if(!pos){
						continue;
					}
					
					if(line == sLine){
						pos.sort(function(a, b){
							return b.istart - a.istart;
						})
						var currPo = pos[0];
						
						var width = currPo.x2 - sLeft;
						var left = sLeft;
						var top = sTop;
					}else if(line == eLine){
						pos.sort(function(a, b){
							return a.istart - b.istart;
						})
						var currPo = pos[0];
						
						var width = eLeft - currPo.x1;
						var left = currPo.x1;
						var top = currPo.y1;
					}else if(line != sLine && line != eLine){
						pos.sort(function(a, b){
							return a.istart - b.istart;
						})
						var firstPo = pos[0];
						
						pos.sort(function(a, b){
							return b.istart - a.istart;
						})
						var lastPo = pos[0];
						
						
						var width = lastPo.x2 - firstPo.x1;
						var left = firstPo.x1;
						var top = firstPo.y1;
					}
					appendDivstr(mf, line, top, left, width, level);
					
				}
			}
		}
	}
}
function renderMusicFormByBar(mfSetting,scale){
	if(mfSetting!=null && mfSetting.length > 0){
		
		var tmpList = clone(mfSetting);
		tmpList.sort(function(a, b){
			return b.orderby.length -  a.orderby.length
		})
		var level = (tmpList[0].orderby).length / 3;
		
		$('.music-form').remove();
		$('.nobrk').css({
			position: 'relative',
			padding: 0
		});
		var barlineArr = getBarLineCoor(scale,0,9);
		for(var k=0; k < mfSetting.length; k++){
			var mf = mfSetting[k];
			if(!barlineArr[mf.startNodeIndex] || !barlineArr[mf.endNodeIndex]){
				continue;
			}
			var sTop = barlineArr[mf.startNodeIndex].barline_start[1]; // 第一小节top
			var sLeft = barlineArr[mf.startNodeIndex].barline_start[0]; // 第一小节left
			var eTop = barlineArr[mf.endNodeIndex].barline_end[1]; // 最后一小节top
			var eLeft = barlineArr[mf.endNodeIndex].barline_end[0]; // 最后一小节left
			var sLine = barlineArr[mf.startNodeIndex].line; // 第一小节行数
			var eLine = barlineArr[mf.endNodeIndex].line; // 最后一小节行数
			
			// 没有跨行的情况
			if(sLine == eLine){ 
				var width = eLeft - sLeft;
				var left = sLeft;
				var top = sTop
				appendDivstr(mf, eLine, top, left, width, level);
				
			}else { // 有跨行的情况
				
				// 跨多行时，从最后一行开始渲染
				
				var isLastLine = true; // 当前渲染的是否最后一行
				
				// 从最后一个小节开始，往前遍历每个小节，来定位在哪个小节跨的行，并处理有跨多行的情况
				for(var j = mf.endNodeIndex - 1; j >= mf.startNodeIndex; j--){
					var oTop = barlineArr[j].barline_start[1]; // 当前小节的top
					var oLine = barlineArr[j].line; // 当前小节的行数
					if(oLine != eLine){ // 在这个小节后面就跨行了
						// 开始渲染跨行的小节
						var width = eLeft - barlineArr[j + 1].barline_start[0];
						var left = barlineArr[j + 1].barline_start[0];
						var top = eTop;
						
						appendDivstr(mf, eLine, top, left, width, level);
						
						eLine = barlineArr[j].line;
						if(oLine != sLine){ // 说明这是跨多行，前面还有跨行情况，继续循环
							isLastLine = false;
							eTop = oTop;
							eLeft = barlineArr[j].barline_end[0];
						}else if(oLine == sLine){ // 当前已经是第一行了，前面没有跨行了，开始渲染第一行
							var width = barlineArr[j].barline_end[0] - sLeft;
							var left = sLeft;
							var top = sTop
							line = barlineArr[j].line;
							appendDivstr(mf, eLine, top, left, width, level);
							break; 
						}
					}
				}
			}
		}
	}
}

//画连音线
function draw_slur(){
	var path = '<path class="mypath stroke" d="M48.93 197.00 C100 197 130 197 152 119"></path>';
	
}

// 添加曲式分析节点
function appendDivstr(mf, line, top, left, width, level){
	var color;
	// 第二级的向上偏移30px
	if(mf.level == 2){
		top -= 30;
		color = 'rgba(0,0,255,.4);'
	}else if(mf.level == 1){ // 第一向上偏移60px
		top -= 60;
		color = 'rgba(255,0,0,.4);'
	}
	// created by lhj
	if(mf.orderby){
		top += mf.orderby.length / 3 * 30 - 30 * (level + 1) ;
	}
	
	if(mf.bgcolor){
		color = mf.bgcolor;
	}
	
//	var divstr = '<div class="music-form _id" onclick="mfClick(event)" style="position:absolute;overflow:hidden;font-size:18px;color:#fff;text-align:center;line-height:30px;height:30px;top:_top;left:_left;width:_width;">' + 
//				 	'<div style="width:100%;height:60px;border-radius:100%;background:_bgColor;opacity:.5;border-top:2px solid #000;" title="_desc">_title</div>' +
//				 '</div>';
 	var divstr = '<div class="music-form _id" data-id="_kid" onclick="mfClick(event)" style="position:absolute;overflow:hidden;font-size:18px;color:#fff;text-align:center;line-height:30px;height:30px;top:_top;left:_left;width:_width;">' + 
 				'<div style="width:100%;height:30px;background:_bgColor;opacity:.5;border-top:2px solid #eee;border-right:.5px solid #eee;box-sizing: border-box;" title="_desc">_title</div>' +
 				'</div>';
	// 如果不是第一行，那么top值要加上之前行数的高度和
	if(line > 0){
		for(var i = line - 1; i >= 0; i--){
			top += $('svg.music:eq(' + i + ')').height();
		}
	}
	
	if(musicType==2){
		//left -= 9*scale;
	}
//	var ds = divstr.replace('_top', top + 'px').replace('_width', width + 'px').replace('_left', left + 'px').replace('_bgColor', color)
//	.replace('_title', mf.title).replace('_desc', mf.desc).replace('_id', 'mf-' + mf.startNodeIndex + '-' + mf.endNodeIndex + '-' + mf.level);
	
	var ds = divstr.replace('_top', top + 'px').replace('_width', width + 'px').replace('_left', left + 'px').replace('_bgColor', color);
	if(mf.fieldno){
		ds = ds.replace('_title', mf.fieldno);
	}
	
	if(mf.fielddesc){
		ds = ds.replace('_desc', mf.fielddesc);
	}
	
	if(mf.id){
		ds = ds.replace('_kid', mf.id);
	}
	
	ds = ds.replace('_title', mf.title).replace('_desc', mf.desc).replace('_id', 'mf-' + mf.startNodeIndex + '-' + mf.endNodeIndex + '-' + (mf.level || mf.orderby.length / 3 ) );
	$('.nobrk').append(ds);
}

/**
*设置音符背景色
*开始音符"-s-nb-1-rgb(1,2,2)"   如果只有一个音符，则只要设置开始音符
*结束音符"-e-nb-1-rgb(1,2,2)"
 * @param type 类型为1时只渲染音符，类型为2时，渲染当前音符到下一个音符前面
 * @returns
 */
function setNoteBgColor(type){
	var color = "";
	if(type==1){
		color = "#"+$("#noteBgColorInput").val();
	}else if(type==2){
		color = "#"+$("#noteBgColorInput2").val();
	}
	color = colorRGB(color);
	var selectedNotes = $(".selected_text");
	if(selectedNotes.length==0){
		return;
	}
	var typeStr = "";
	if(type==2){//
		typeStr = "l";
	}
	var index = noteBgLength;
	
	var content = $("#source").val();
	
	var startStr = '"-s-nb' + typeStr + '-' + index + '-' + color + '"';
	var endStr = '"-e-nb-'+index+'-'+color+'"';
	if(selectedNotes.length==1){
		var istart = $(selectedNotes).attr("istart");
		
		content = content.substring(0,istart) + startStr + content.substring(istart);
		var s = syms[istart];
		if(s ){
			content = setNoteBgColor_(s,content)
		}
	}else if(selectedNotes.length==2){
		var sistart = parseInt($(selectedNotes[0]).attr("istart"));
		var eistart = parseInt($(selectedNotes[1]).attr("istart"));
		if(sistart>eistart){
			var tmpIstart = sistart+0;
			sistart = eistart;
			eistart = tmpIstart;
		}
		content = content.substring(0,sistart)+startStr+content.substring(sistart,eistart)+endStr+content.substring(eistart);
		var ss = syms[sistart];
		var es = syms[eistart];
		if(ss){
			content = setNoteBgColor_(ss,content)
		}
		if(es){
			content = setNoteBgColor_(es,content)
		}
	}else if(selectedNotes.length>2){
		window.top.alert("设置音符背景色时最多选中两个音符")
		return;
	}
	$("#source").val(content);
	doLog();
	src_change();
}
function setNoteBgColor_(s,content){
	if(s ){
		if(likeGch(s,"-s-nb")){
			var gch = '"'+getGch(s,"-s-nb")+'"';
			var eGch = gch.replace("-s-","-e-")
			content = content.replace(gch,"").replace(eGch,"")
		}else if(likeGch(s,"-e-nb")){
			var gch = '"'+getGch(s,"-e-nb")+'"';
			var sGch = gch.replace("-e-","-s-")
			content = content.replace(gch,"").replace(sGch,"")
			
		}
	}
	return content;
}
function clearNoteBgColor(type){
	var selectedNotes = $(".selected_text");
	if(selectedNotes.length==0){
		return;
	}
	var content = $("#source").val();
	if(selectedNotes.length==1){
		var istart = $(selectedNotes).attr("istart");
		
		var s = syms[istart];
		if(s ){
			content = setNoteBgColor_(s,content)
		}
	}else if(selectedNotes.length==2){
		var sistart = parseInt($(selectedNotes[0]).attr("istart"));
		var eistart = parseInt($(selectedNotes[1]).attr("istart"));
		if(sistart>eistart){
			var tmpIstart = sistart+0;
			sistart = eistart;
			eistart = tmpIstart;
		}
		var ss = syms[sistart];
		var es = syms[eistart];
		if(ss){
			content = setNoteBgColor_(ss,content)
		}
		if(es){
			content = setNoteBgColor_(es,content)
		}
	}
	if(type==1){
		$("#noteBgColorInput").val("000000");
		$("#noteBgColorInput").css("background-color","#000000");
	}else if(type==2){
		$("#noteBgColorInput2").val("000000");
		$("#noteBgColorInput2").css("background-color","#000000");
	}
	$("#source").val(content);
	doLog();
	src_change();
}
//16进制颜色转rgb  #000000
function colorRGB(sColor){
    sColor = sColor.toLowerCase();
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i=1; i<4; i+=1) {
                sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));    
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i=1; i<7; i+=2) {
            sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));    
        }
        return "rgb(" + sColorChange.join(",") + ")";
    }
    return sColor;
}
//rgb转为16进制
//十进制转化为16进制
function hex(x){
  return ("0" + parseInt(x).toString(16)).slice(-2);
}

//RGB颜色转为十六进制颜色
function RGB2HEX(rgb){
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);  
 return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
/**
 * 设置跨声部连音线
 * @param source textareaid
 * @param direct ,表示连音线在下方，'表示连音线在上方
 * @returns
 */
function setVoiceSlur(source,direct){
	var st = getSelectText(source);
	if(st==""){
		return;
	}
	var startStr = "";
	var endStr = "";
	var startPos = getStartPos(document.getElementById(source));
	//判断前面是否已经在连音线
	var preStr = $("#"+source).val().substring(startPos-6,startPos);
	var regStart = new RegExp(/\([,']([0-9]+)\-/);
	if(regStart.test(preStr)){
		var start = preStr.match(regStart);
		startStr = start[0];
		var seq = start[1];
		endStr = "\"-" + seq + ")\"";
		var content = $("#"+source).val();
		content = content.replace("\""+startStr+"\"","").replace(endStr,"");
		$("#"+source).val(content);
		abc_change();
		return;
	}
	var regEnd = new RegExp(/\-([0-9]+)\)/);
	if(regEnd.test(preStr)){
		var end = preStr.match(regEnd);
		endStr = end[0];
		var seq = end[1];
		startStr1 = "\"(," + seq + "-\"";
		startStr2 = "\"('" + seq + "-\"";
		var content = $("#"+source).val();
		content = content.replace(startStr1,"").replace(startStr2,"").replace(endStr,"");
		$("#"+source).val(content);
		abc_change();
		return;
	}
	
	
	var index = voice_slurs_len;
	//var st = getSelectText(source);
	startStr = "\"(" + direct + index + "-\"";
	endStr = "\"-" + index + ")\"";
	
	var newStr = startStr;
	var matchs = st.match(notes_pattern);
	if(matchs!=null){
		var lastNote = matchs[matchs.length-1];
		newStr += st.substring(0,st.length-lastNote.length)+endStr+lastNote;
	}
	replaceSelected(st,newStr);
	//abc_change();
}
//设置音符背景色
function renderNoteBgColor(){
	
	for(var i = 0;i < noteBgArray.length;i++){
		var noteBg = noteBgArray[i];
		var start = noteBg.start;
		var end = noteBg.end;
		var isLongRender = noteBg.is_long;//是否需要长渲染
		if(start && end){
			//选中多个
			
			var s = start.s;
			var start_rect = $("rect.abcr._" + s.istart + "_");
			
			var trans_x = 0;
			var trans_y = 0;
			if(musicType == 2){
				//简谱要计算父节点的translate(0,117.00) 值
				var g = $(start_rect).parent("g");
				if(g){
					var transform = $(g).attr("transform");
					var translateReg = /translate\((.[^\[]*)\)/;
					var translateMatchs = transform.match(translateReg);
					if(translateMatchs!=null){
						var transStr = translateMatchs[1];
						trans_x = parseFloat(transStr.replace(/\s/g,"").split(",")[0]);
						trans_y = parseFloat(transStr.replace(/\s/g,"").split(",")[1]);
					}
				}
			}
			
			
			var start_x = parseFloat(start_rect.attr("x"));
			var start_y = parseFloat(start_rect.attr("y"));
			var start_width = parseFloat(start_rect.attr("width"));
			var start_height = parseFloat(start_rect.attr("height"));
			
			var e = end.s;
			var end_rect = $("rect.abcr._" + e.istart + "_");
			var end_x = parseFloat(end_rect.attr("x"));
			var end_y = parseFloat(end_rect.attr("y"));
			var end_width = parseFloat(end_rect.attr("width"));
			var end_height = parseFloat(end_rect.attr("height"));
			
			
			var color = start.color;
			var w = end_x - start_x + end_width;
			var h = start_height>end_height?start_height:end_height;
			if(isLongRender){
				var next = e.next;
				while(next){
					if(next.grace || (next.extra && next.extra.grace)){//在后面是倚音的情况下，继续往后寻找
						next = next.next;
					}else{
						break;
					}
				}
				if(next){
					var end_next_rect = $("rect.abcr._" + next.istart + "_");
					w = parseFloat(end_next_rect.attr("x")) - start_x;
				}
			}
			
			$(start_rect).parents("svg").prepend('<svg id="note_bg_svg'+start.seq+'" type="note_rect"><rect type="bg_rect" x="' + ((start_x+trans_x)*scale) + '" y="' + ((start_y+trans_y)*scale) + '" width="' + w*scale + '" height="' + h*scale + '" fill="'+color+'" fill-opacity="0.3"></rect></svg>');
		}else{
			//选中一个
			var s = start.s;
			var start_rect = $("rect.abcr._" + s.istart + "_");
			
			var trans_x = 0;
			var trans_y = 0;
			if(musicType == 2){
				//简谱要计算父节点的translate(0,117.00) 值
				var g = $(start_rect).parent("g");
				if(g){
					var transform = $(g).attr("transform");
					var translateReg = /translate\((.[^\[]*)\)/;
					var translateMatchs = transform.match(translateReg);
					if(translateMatchs!=null){
						var transStr = translateMatchs[1];
						trans_x = parseFloat(transStr.replace(/\s/g,"").split(",")[0]);
						trans_y = parseFloat(transStr.replace(/\s/g,"").split(",")[1]);
					}
				}
			}
			
			
			var start_x = parseFloat(start_rect.attr("x"));
			var start_y = parseFloat(start_rect.attr("y"));
			var w = parseFloat(start_rect.attr("width"));
			var h = parseFloat(start_rect.attr("height"));
			var color = start.color;
			
			if(isLongRender){
				var next = s.next;
				while(next){
					if(next.grace || (next.extra && next.extra.grace)){//在后面是倚音的情况下，继续往后寻找
						next = next.next;
					}else{
						break;
					}
				}
				if(next){
					var start_next_rect = $("rect.abcr._" + next.istart + "_");
					w = parseFloat(start_next_rect.attr("x")) - start_x;
				}
			}
			
			$(start_rect).parents("svg").prepend('<svg id="note_bg_svg'+start.seq+'" type="note_rect"><rect type="bg_rect" x="' + ((start_x+trans_x)*scale) + '" y="' + ((start_y+trans_y)*scale) + '" width="' + w*scale + '" height="' + h*scale + '" fill="'+color+'" fill-opacity="0.3"></rect></svg>');
		}
	}
}

//设置歌词背景色
function renderLyricBgColor(){
	
	for(var i = 0;i < lyricBgArray.length;i++){
		var lyricBg = lyricBgArray[i];
		var start = lyricBg.start;
		var end = lyricBg.end;
		var isLongRender = lyricBg.is_long;//是否需要长渲染
		if(start && end){
			//选中多个
			
			var s_istart = start.istart;
			var start_rect = $("rect.abcr._" + s_istart + "_");
			
			var trans_x = 0;
			var trans_y = 0;
			//if(musicType == 2){
				//简谱要计算父节点的translate(0,117.00) 值
				var g = $(start_rect).parent("g");
				if(g){
					var transform = $(g).attr("transform");
					var translateReg = /translate\((.[^\[]*)\)/;
					var translateMatchs = transform.match(translateReg);
					if(translateMatchs!=null){
						var transStr = translateMatchs[1];
						trans_x = parseFloat(transStr.replace(/\s/g,"").split(",")[0]);
						trans_y = parseFloat(transStr.replace(/\s/g,"").split(",")[1]);
					}
				}
			//}
			
			
			var start_x = parseFloat(start_rect.attr("x"));
			var start_y = parseFloat(start_rect.attr("y"));
			var start_width = parseFloat(start_rect.attr("width"));
			var start_height = parseFloat(start_rect.attr("height"));
			
			var e_istart = end.istart;
			var end_rect = $("rect.abcr._" + e_istart + "_");
			var end_x = parseFloat(end_rect.attr("x"));
			var end_y = parseFloat(end_rect.attr("y"));
			var end_width = parseFloat(end_rect.attr("width"));
			var end_height = parseFloat(end_rect.attr("height"));
			
			
			var color = start.color;
			var w = end_x - start_x + end_width;
			var h = start_height>end_height?start_height:end_height;
			if(isLongRender){
				if(end.s.next){
					var end_next_rect = $("rect.abcr._" + end.s.next.istart + "_");
					w = parseFloat(end_next_rect.attr("x")) - start_x;
				}
			}
			
			$(start_rect).parents("svg").prepend('<svg id="lyric_bg_svg'+start.seq+'" type="lyric_bg_rect"><rect type="bg_rect" x="' + ((start_x+trans_x)*scale) + '" y="' + ((start_y+trans_y)*scale) + '" width="' + w*scale + '" height="' + h*scale + '" fill="'+color+'" fill-opacity="0.3"></rect></svg>');
		}else{
			//选中一个
			var s_istart = start.istart;
			var start_rect = $("rect.abcr._" + s_istart + "_");
			
			var trans_x = 0;
			var trans_y = 0;
			//if(musicType == 2){
				//简谱要计算父节点的translate(0,117.00) 值
				var g = $(start_rect).parent("g");
				if(g){
					var transform = $(g).attr("transform");
					var translateReg = /translate\((.[^\[]*)\)/;
					var translateMatchs = transform.match(translateReg);
					if(translateMatchs!=null){
						var transStr = translateMatchs[1];
						trans_x = parseFloat(transStr.replace(/\s/g,"").split(",")[0]);
						trans_y = parseFloat(transStr.replace(/\s/g,"").split(",")[1]);
					}
				}
			//}
			
			
			var start_x = parseFloat(start_rect.attr("x"));
			var start_y = parseFloat(start_rect.attr("y"));
			var w = parseFloat(start_rect.attr("width"));
			var h = parseFloat(start_rect.attr("height"));
			var color = start.color;
			
			if(isLongRender){
				if(start.s.next){
					var start_next_rect = $("rect.abcr._" + start.s.next.istart + "_");
					w = parseFloat(start_next_rect.attr("x")) - start_x;
				}
			}
			
			$(start_rect).parents("svg").prepend('<svg id="lyric_bg_svg'+start.seq+'" type="lyric_bg_rect"><rect x="' + ((start_x+trans_x)*scale) + '" y="' + ((start_y+trans_y)*scale) + '" width="' + w*scale + '" height="' + h*scale + '" fill="'+color+'" fill-opacity="0.3"></rect></svg>');
		}
	}
}


//设置上下声部琶音连接"(arp0-"!arpeggio![cde]
function setArpLink(source){
	var content = $("#"+source).val();
	var startStr = "";
	var endStr = "";
	startPos = cen.istart;
	//判断前面是否已经在连音线
	var preStr = $("#"+source).val().substring(startPos-19,startPos);
	// 去掉开始
	var regStart = new RegExp(/\"\(arp([0-9]+)\-\"\!arpeggio\!/);
	if(regStart.test(preStr)){
		var start = preStr.match(regStart);
		startStr = start[0];
		var seq = start[1];
		endStr = "\"-" + seq + "arp)\"\!arpeggio\!";
		var content = $("#"+source).val();
		content = content.replace(startStr,"").replace(endStr,"");
		$("#"+source).val(content);
		doLog();
		abc_change();
		return;
	}
	// 去掉结束
	var regEnd = new RegExp(/\"\-([0-9]+)arp\)\"\!arpeggio\!/);
	if(regEnd.test(preStr)){
		var end = preStr.match(regEnd);
		endStr = end[0];
		var seq = end[1];
		startStr = '"(arp' + seq + '-"!arpeggio!';
		var content = $("#"+source).val();
		content = content.replace(startStr,"").replace(endStr,"");
		$("#"+source).val(content);
		doLog();
		abc_change();
		return;
	}
	
	var index = arp_link_len;
	
	startStr = "\"(arp" + index + "-\"!arpeggio!";
	endStr = "\"-" + index + "arp)\"!arpeggio!";
	if(cen.ts_next && cen.ts_next.st!=cen.st){
		var tsNext = cen.ts_next;
		var newContent = "";
		if(cen.istart<tsNext.istart){
			//选中的是上面声部
			newContent = content.substring(0,cen.istart) + startStr + content.substring(cen.istart,tsNext.istart) + endStr + content.substring(tsNext.istart);
		}else{
			//选中的是下面声部
			var tsPrev = cen.ts_prev;
			if(tsPrev && tsPrev.st!=cen.st){
				newContent = content.substring(0,tsPrev.istart) + startStr + content.substring(tsPrev.istart,cen.istart) + endStr + content.substring(cen.istart);
			}
		}
		if(newContent!=""){
			$("#"+source).val(newContent);
			doLog();
			abc_change();
			return;
		}
		
	}
	
	
	
}

//取属性值
function get(flag){
	var content = $("#source").val();
	var reg = new RegExp(flag+"(.*)");
	var matchs = content.match(reg);
	var result = "";
	if(matchs!=null){
		result = matchs[1];
		//result = result.replace(/\s/g,"").replace(/\".*\"/g,"");
		result = result.replace(/^\s+/, '').replace(/\s+$/, '').replace(/\!invisible\!M/,"");
	}
	return result;
	
//	var str = $("#source").val();
//	var temp = str.split(/[\n,]/g);
//	var val = "";
//	for(var i =0;i<temp.length;i++){
//		var line = temp[i];
//		if(line.indexOf(flag)==0){
//			if(val!=""){
//				val += "\n"; 
//			}
//			val += $.trim(line.replace(flag,""));
//			//return $.trim(val);
//		}
//	}
//	return val;
}

function calNodeLen(nodestr){
	try{
		var len = 0;
		nodestr = nodestr.replaceAll(/\[.[^\[]*\:.[^\[]*\]/g,"").replaceAll(/!.[^!]*!/,"");
		nodestr = replaceDivide(nodestr);
		var hx_len = calNodeLen_HX(nodestr);
		var hx_len_val = hx_len.split("|")[0];
		nodestr = hx_len.split("|")[1];
		var ly_len = calNodeLen_LY(nodestr);
		// console.log("ly_len:"+ly_len)
		var ly_len_val = ly_len.split("|")[0]
		nodestr = ly_len.split("|")[1];
		
		var note_len = calNodeLen_PT(nodestr);
		len = parseFloat(hx_len_val) + parseFloat(ly_len_val) + parseFloat(note_len);
		return len;
	}catch(e){
		console.log(e);
	}
}
//根据小节头尾序号，计划小节时长
function calNodeLenByIndex(startSeq,endSeq){
	var totalDur = 0;
	var ulen = 0;
	var hasHandleNoteArr = [];
	for(var i=startSeq;i<endSeq;i++){
		var s = syms[i];
		if(s && !s.grace){
			if(s.dur && hasHandleNoteArr.indexOf(s.istart)<0){
				totalDur += s.dur;
				hasHandleNoteArr.push(s.istart)
			}
			if(ulen==0 && s.my_ulen){
				ulen = s.my_ulen;
			}
		}
	}
	return totalDur/ulen;
}
//把F/2，F/4等替换成F/,F//
function replaceDivide(str){
	if(str){
		return str.replace(/\/2/g,"/").replace(/\/4/g,"//").replace(/\/8/g,"///").replace(/\/16/g,"////");
	}
	return str;
}
// 计算小节内和弦的长度:这里解析[d3f3]中的长度
function calNodeLen_HX(nodestr){
//	var L = $("#L").val().split("/")[1];
//	var M = $("#M").val().split("/")[1];
	var L = get("L:").split("/")[1];
	var M = get("M:").split("/")[1];
	var bs = parseInt(M)/parseInt(L);
	// [c2G2] z2 (3ded
	var k_pattern = /\[(.[^\[^\:]*)\][\d\/]*/g;
	var k_result = nodestr.match(k_pattern);
	// 和弦取最大的
	var hx_len = 0;
	var total_len = 0;
	var num = "123456789";
	var note_pattern = new RegExp("[a-gA-G]")
	var notestr = "cdefgab,'CDEFGABz";
	// 计算和弦的长度:这里解析[]中的长度
	if(k_result!=null){
		var flag = 1;
		hx_len = 1;
		for(var i=0;i<k_result.length;i++){
			var note = k_result[i];
			if(note_pattern.test(note)){
				for(var j=0;j<note.length;j++){
					if(notestr.indexOf(note[j])>-1){
						flag = 1;
						hx_len = 1;
					}else if(num.indexOf(note[j])>-1){
						if(parseInt(note[j])>hx_len){
							hx_len = parseInt(note[j]);
						}
					}else if(note[j]=="/"){
						flag = flag * 2;
						hx_len = 1/flag;
					}
				}
				total_len = total_len + hx_len
			}
			
		}
	}
	nodestr = nodestr.replace(k_pattern,"");
	return total_len+"|"+nodestr;
}
// 计算小节内连音的长度（3eee这样算一拍(不管是节拍是多少，都算一拍，所以这里算法要根据L来转换)
function calNodeLen_LY(nodestr){
	try{
		var L = get("L:").split("/")[1];
		var M = get("M:").split("/")[1];
		// \([2-9](.[^\s]*)\s|
		// 这里解析(3这类连音的长度，这种算1拍
		var pattern2 = /\([2-9](.*)/g;
		var result2 = nodestr.match(pattern2);
		var ly_len = 0;
		if(nodestr!=null){
			var notes = nodestr.split(" ");
			for(var i=0;i<notes.length;i++){
				var str = notes[i].match(pattern2);
				if(str!=null){
					// console.log("ly_str:"+str)
					var reg1 = /\((\d)/;
					var lyvals = str[0].match(reg1);
					var n = -1;
					if(lyvals!=null){
						n = lyvals[1];
					}
					var tmp = str[0].replace(/\(\d/,"");
					if(tmp.indexOf("/")>-1){
						var halfLen = tmp.match(/\//g).length;
						ly_len += 0.5*n/halfLen;
					} else {
						var val = 1;
						var nums = tmp.match(/\d/);
						if(nums!=null){
							ly_len += parseInt(nums[0]);
						}else{
							ly_len++;
						}
					}
					nodestr = nodestr.replace(str[0],"");
				}
			}
		}
		return ly_len*L/M+"|"+nodestr;
	}catch(e){
		console.log(e)
	}
	
}
// 计算小节内普通音符的长度
function calNodeLen_PT(nodestr){
	//去掉倚音，倚音不计入时长
	nodestr = nodestr.replace(/\{.[^\{]*\}/g,"");
	var L = get("L:").split("/")[1];
	var M = get("M:").split("/")[1];
	var bs = parseInt(M)/parseInt(L);
//	var pattern = /[cdefgabzCDEFGABZx](\,*)(\'*)([1-9]*)(\/*)/g;
	var regstr = "[cdefgabzCDEFGABZx";
	var exts = extnotes.concat(extnotes2);
	for(var j=0,len=exts.length;j<len;j++){
		regstr += exts[j].char;
	}
	regstr += "](\,*)(\'*)([0-9]*)(\/*)";
	var pattern = new RegExp(regstr,"g");
	var num_pattern = /([0-9]*)/g;
	var result = nodestr.match(pattern);
	var len = 0;
	if(result!=null){
		for(var i=0;i<result.length;i++){
			var index = 0;
			var note = result[i];
			var singleLen = 0;
			var num_result = note.match(num_pattern);
			if(num_result!=null){
				for(var j=0;j<num_result.length;j++){
					if(num_result[j]!=""){
						index++;
//						len = len + parseInt(num_result[j]);
						singleLen += parseInt(num_result[j]);
					}
				}
			}
			
			if(note.indexOf("/")>-1){
				var temp = 1;
				if(singleLen!=0){
					temp = singleLen;
				}
				var flag = false;
				for(var j=0;j<note.length;j++){
					if(note[j]=="/"){
						index++;
						temp = temp/2;
						flag = true;
					}
				}
				if(flag){
					len = len+temp;
				}
			}else{
				len = len+singleLen;
			}
			if(index==0){
				len++;
			}
			
		}
	}
	return len;
}

function setVoiceVol(obj,val){
	var v = $(obj).attr("index");
	$("span[name='voicevolspan'][index='"+v+"']").html(val)
	var exist = false;
	for(var i=0;i<vols.length;i++){
		var vol = vols[i];
		if(vol.v == v){
			vol.vol = val;
			exist = true;
		}
	}
	if(!exist){
		var obj = new Object();
		obj.v = v;
		obj.vol = val;
		vols.push(obj);
	}
	var content = $("#source").val();
	var newVal = "";
	for(var i=0;i<vols.length;i++){
		newVal += ","+vols[i].v+"="+vols[i].vol;
	}
	if(newVal!=""){
		newVal = newVal.substring(1);
	}
	if(content.indexOf("voicevol")>-1){
		content = content.replace(/voicevol\(.*\)/,"voicevol("+newVal+")");
	}else{
		content = "%%voicevol("+newVal+")\n"+content;
	}
	$("#source").val(content);
	src_change();
}

//添加和弦
function insertChord(noteStr,chordType){
	currInputVoice = 2;
	var suffix = getSuffix();
	var lineIndex = insertWithVoice(noteStr+suffix,chordType,true);
	insertChordLyric(lineIndex,chordType);
	play_chord(noteStr);
	src_change();
}
/**
 * 插入和弦歌词
 * @param lineIndex
 * @param str
 * @returns
 */
function insertChordLyric(lineIndex,type){
	var content = $("#source").val();
	var lines = content.split("\n");
	if((lineIndex+1) >= lines.length){
		//当前编辑行是最后一行，则新增一个歌词行
		var lyricLine = "w:"+type;
		content = content + "\n" + lyricLine;
	}else{
		var nextLine = lines[lineIndex +1];
		//判断下一行是不是歌词，如果是歌词，就直接在歌词后面新增，如果不是歌词，就新增一个歌词行
		
		var lyricLine = "w:"+type;
		var tmpStr = "";
		lines.forEach(function(item,index){
			if(index != (lineIndex + 1)){
				tmpStr += item + "\n";
			}else {
				if(nextLine.indexOf("w:")>-1){
					tmpStr += item + " " + type;
				}else{
					tmpStr += item + "\n" + lyricLine + "\n"
				}
			}
		});
		content = tmpStr;
		
	}
	$("#source").val(content);
}

/**
 * 播放和弦
 * @param noteStr 
 * @returns
 */
function play_chord(noteStr){
	if(noteStr){
		var notes_pattern = /(\[[\^\_\=A-Ya-y\/1-9,']*\])|(\^){0,1}(\_){0,1}(\=){0,1}[^\[\s\]]{1}[\,\'\/|1-9]*/g;
		noteStr = noteStr.replace("[","").replace("]","");
		var notearr = new Array();
		var notes = noteStr.match(notes_pattern);
		notes.forEach(function(item,i){
			var note = new Float32Array(7);
			note[0]=-1;// 这个参数决定谱面上哪个高亮
			note[1]=0;// 开始时间
			note[2]=0;// 音色
			note[3]=findIndexByNote(item);// 音高
			note[4]=1;// 持续时间
			note[5]=1; //音量
			note[6]=0;// 声部
			notearr.push(note);
		});
		play_arr(notearr);
	}
	
}

function getTotalLengthByLine(content,lineNum){
	var lines = content.split("\n");
	var total = 0;
	lines.forEach(function(item,index){
		if(index <= lineNum){
			total += item.length + 1;
		}
	});
	return total;
}

// 把abc内容放到剪贴板中
function source2ClipBoard(){
	$("#source").focus();
	$("#source").select();
	if(document.execCommand('copy')) { 
		document.execCommand('copy');
	}
}


//偏移量
var bar_offset_x = 9;
// 根据小节索引号（node_index）渲染
function renderByBarIndex(indexArr,type) {
	// 如果是简谱，就不需要偏移
	if (musicType == 2) {
		bar_offset_x = 7;
	} else {
		bar_offset_x = 9;
	}
	
	var typestr = "";
	if(type){
		typestr = type;
	}
	
	var data = getBarLineCoor(scale);
	for(var i=0;i<indexArr.length;i++){
		var index = indexArr[i].bar_num;
		var color = indexArr[i].color;
		var stroke = indexArr[i].stroke;
		if(color==""){
			color = "blue";
		}
		if (index > (data.length - 1)) {
			return;
		}
		// var content = $("#nodelinedata").val();
		// var nodeLineData = $.parseJSON(content);
		var barline_start = data[index].barline_start;
		var barline_end = data[index].barline_end;

		var x = bar_offset_x * scale + barline_start[0];
		var y = barline_start[1];
		var w = barline_end[0] - barline_start[0];
		var h = barline_end[3] - barline_start[1];

		var currSvg = $("svg.music")[data[index].line];
		$("#mysvg" + typestr + index).remove();
		
		if(stroke){
			//如果有边框属性，则说明是渲染边框
			$(currSvg).prepend('<svg id="mysvg' + typestr + index+'" type="rect'+typestr+'"><rect type="bg_rect" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" stroke="red" stroke-width="3" fill="'+color+'" fill-opacity="0"></rect></svg>');
		}else{
			$(currSvg).prepend('<svg id="mysvg' + typestr + index+'" type="rect'+typestr+'"><rect type="bg_rect" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="'+color+'" fill-opacity="0.3"></rect></svg>');
		}
	}
}

function doLog(){
	if(log[log.length-1]!=$("#source").val()){
		log[log.length] = $("#source").val();
	}
}
//字母输入,e为事件，editorType为输入界面类型(old,editor)
function handleKeyPress(e,editorType){
	if(e.keyCode>=65 && e.keyCode<=71){
		var keyArr = ["A","B","C","D","E","F","G"];
		var c = keyArr[e.keyCode-65];
		
		var notestr = "CDEFGAB";
		
		var val = c;
		current_group = $('.group-active').attr("group")
		if(e.shiftKey){
//			按下shift键，升高8度
			current_group = "C"+(parseInt(current_group.replace("C",""))+1);
		}else if(e.ctrlKey){
			//按下ctrl键 ,降低8度
			current_group = "C"+(parseInt(current_group.replace("C",""))-1);
			
		}
		if(notestr.indexOf(val)>-1){
			var keyValue = val;
			var pianoKeys = sd.KeyBoardStand;
			var vals;
			var groups = sd.KeyBoardStand.group;
			for(var i=0;i<pianoKeys.length;i++){
				var group = pianoKeys[i].group;
				if(current_group == group){
					vals = pianoKeys[i].val;
					for(var j=0;j<vals.length;j++){
						if(vals[j].toUpperCase().indexOf(keyValue.toUpperCase())>-1){
							var noteSeq = pianoKeys[i].index[j];
							//播放
							play_note(noteSeq,durSetting);
							if(editorType=="editor"){
								updateNextNote(vals[j],-1);
								return;
							}else{
								var selectText = getSelectText("source");
								if(selectText!=""){
									replaceSelected(selectText,vals[j]);
								} else {
									insertText(vals[j]);
								}
							}
							
							typeof(autoNodeLine) == 'function' && autoNodeLine();
							typeof(abc_change) == 'function' && abc_change();
							$("#source").focus();
							break;
						}
					}
				}
			}
		}
	}
}
//处理数字键的输入事件,e为事件，editorType为输入界面类型(old,editor)
function handleNumPress(e,editorType){
	if(e.keyCode==96 || e.keyCode==48){
		//处理输入0的情况
		val = "z";
		if(editorType=="editor"){
			updateNextNote(val,-1);
			return;
		}
	}
	var pressShiftKey = false;
	if(e.shiftKey){
		pressShiftKey = true;
	}
	var key = "";
	var pattern = /K:\s*([CDEFGAB]#{0,1}b{0,1})/g;
	var content = $("#source").val();
	var keysMatchs = content.match(pattern);
	if(keysMatchs!=null){
		var keyStr = keysMatchs[keysMatchs.length-1];
		var keyMatch = keyStr.match(/K:\s*([CDEFGAB]#{0,1}b{0,1})/);
		key = keyMatch[1];
	}
	var c;
	if(e.keyCode>=49 && e.keyCode<=55){
		c = e.keyCode - 48;
	}else if(e.keyCode>=97 && e.keyCode<=103){
		c = e.keyCode - 96;
	}
	var simpleValue = sd.Simple2Staff.SimpleValue;
	var index = -1;
	var note = "";
	for(var i=0;i<simpleValue.length;i++){
		if(simpleValue[i] == c){
			index = i;
			break;
		}
	}
	var noteSeq = -1;
	if(index!=-1){
		var datas = sd.Simple2Staff.StaffValue;
		for(var i=0;i<datas.length;i++){
			var data = datas[i];
			if(data.K==key){
				note = data.STAFF[index];
				noteSeq = data.index[index];
				break;
			}
		}
	}
	
	
//	console.log("press:",note);
	play_note(noteSeq,durSetting);
	
	var notestr = "CDEFGAB";
	
	var val = note.toUpperCase();
	
	current_group = $('.group-active').attr("group");
	if(!current_group){
		current_group = 'C4';
	}
	if(notestr.indexOf(val)>-1){
		var keyValue = val;
		var pianoKeys = sd.KeyBoardStand;
		var vals;
		var groups = sd.KeyBoardStand.group;
		for(var i=0;i<pianoKeys.length;i++){
			var group = pianoKeys[i].group;
			if(current_group == group){
				vals = pianoKeys[i].val;
				for(var j=0;j<vals.length;j++){
					if(vals[j].toUpperCase().indexOf(keyValue.toUpperCase())>-1){
						if(editorType=="editor"){
							//updateNextNote(vals[j],-1);//这样会输入选中的那个区域的，比如G调会变成1234567为GABCDEF
							updateNextNote(note,-1,pressShiftKey||chordInput);//这样的输入比较合理，比如G调1234567分别为GABcdef
							return;
						}else{
							var selectText = getSelectText("source");
							if(selectText!=""){
								replaceSelected(selectText,vals[j]);
							} else {
								insertText(vals[j]);
							}
						}
						autoNodeLine();
						//abc_change();
						$("#source").focus();
						break;
					}
				}
			}
		}
	}
}
/**
 * 验证abc语法
 * @returns
 */
function checkGramm(){
	var content = $("#source").val();
	// 验证拍号
	if(!checkMeter(content)){
		return false;
	}
	//验证速度
	if(!checkTempo(content)){
		return false;
	}
	//验证边距是否设置多次
	if(!checkMargin(content)){
		return false;
	}
	//验证V标签 
	if(!checkV(content)){
		return false;
	}
	//验证::反复标记
	if(!checkRepeat(content)){
		return false;
	}
	return true;
}
//验证::这样的反复符号，中间必需加一个|即:|:
function checkRepeat(content){
	if(content.indexOf("::")>-1){
		window.top.alert("不允许出现::这样的反复标记，请用:|:替换")
		return false;
	}
	return true;
}
//验证拍号
function checkMeter(content){
	var regM = /M:(.*)/;
	var matchs = content.match(regM);
	if(matchs==null){
		window.top.alert("未设置拍号")
		return false;
	} else {
		if(matchs[0].indexOf("none")>-1){
			window.top.alert("拍号不能设置为none")
			return false;
		}
		if(matchs[1].replace(/\s/g,"")==""){
			window.top.alert("拍号不能为空值")
			return false;
		}
	}
	return true;
}
//验证速度
function checkTempo(content){
	var regQ = /Q:(.*)/;
	var matchs = content.match(regQ);
	if(matchs==null || matchs.length==0){
		window.top.alert("未设置速度")
		return false;
	} else {
		if(matchs[1].replace(/\s/g,"")==""){
			window.top.alert("速度不能为空值")
			return false;
		}
		var Q_str = matchs[1].replace(/\".*\"/,"");
		if(Q_str.indexOf(":")>-1 || /[a-zA-Z]/.test(Q_str)){
			window.top.alert("速度设置不正确")
			return false;
		}
	}
	return true;
}
// 验证边距（是否重复设置了边距）
function checkMargin(content){
	var regLeftMargin = /%%leftmargin/g;
	var regRightMargin = /%%rightmargin/g;
	var leftMarginMatchs = content.match(regLeftMargin);
	if(leftMarginMatchs!=null && leftMarginMatchs.length>1){
		window.top.alert("多次设置了左边距的值(leftmargin)")
		return false;
	}
	var rightMarginMatchs = content.match(regRightMargin);
	if(rightMarginMatchs!=null && rightMarginMatchs.length>1){
		window.top.alert("多次设置了右边距的值(rightmargin)")
		return false;
	}
	return true;
}
//验证是否设置了V:标签
function checkV(content){
	var regQ = /V:(.*)/g;
	var matchs = content.match(regQ);
	if(matchs==null){
		window.top.alert("未设置V:标签，请至少设置一个V:标签")
		return false;
	} 
	return true;
}
//验证每个小节的时值是否符合要求
function checkDur(content){
	
}
//缩小到一屏显示谱子（把换行符替换成其它的符号（这样能保证让系统自动调整每行小节数），把%%barsperstaff的设置去掉，把scale逐步缩小到整个高度小于等于一屏的高度）
function zoomSvg(height){
	//$("#maskfulltxt").html("正在自动适配显示区域...")
	var content = $("#source").val();
	var newLineBreakStr = "%%linebreak @";
	var newContent = "";
	if(content.indexOf("linebreak")>-1){
		var lineBreakReg = /%%linebreak(.*)/;
		var matchs = content.match(lineBreakReg);
		if(matchs!=null){
			var breakChar = matchs[1].replace(/\s/g,"");
			var newLineBreakStr = "%%linebreak";
			var breakCharReg = new RegExp("\\"+breakChar,"g");
			newContent = content.replace(lineBreakReg,newLineBreakStr);
		}
	}else{
		newContent = newLineBreakStr+"\n"+content;
	}
	$("#source").val(newContent);
	src_change();
	var timeInterval = 500;//每次缩放间隔时间，因为src_change需要一定的时间,这个地方如果谱子渲染比较慢的话，时间可能需要调整长一些
	var intervalId = setInterval(function(){
		var currHeight = getSvgTotalHeight();
		if(currHeight<=height){
			//$(".loading,.loading-box").remove();
			clearInterval(intervalId);
			scale = scale + 0.05;
			src_change();
			setTimeout(function(){
				var currHeight = getSvgTotalHeight();
				
				if(currHeight>height){
					scale = scale - 0.05;
					src_change();
				}
			},timeInterval)
			
		}else{
			scale = scale - 0.1;
			src_change();
		}
	},timeInterval)
}
function getSvgTotalHeight(){
	var totalHeight = 0;
	$("svg").each(function(i,item){
		totalHeight += parseFloat($(item).height());
	})
	return totalHeight;
}
/*//小数转分数
function decimalsToFractional(decimals){
    const formatDecimals = decimals.toFixed(5)
    let denominator = 100 //初始化分母
    let numerator  = formatDecimals * 100 //初始化分子
    let bigger = 0
    function  recursion (){
        bigger = denominator > numerator ? denominator : numerator
        for(let i = bigger; i > 1; i--){
            if(
                Number.isInteger(numerator/i)
                && Number.isInteger(denominator/i)){
                numerator=numerator/i
                denominator=denominator/i
                recursion()
            }
        }
    }
    recursion()
    return `${numerator}/${denominator}`
}*/
//查询数组中的值，arr：数组，property:属性，value:值
function findArrayItem(arr,property,value){
	if(arr!=null){
		for(var i=0,len=arr.length;i<len;i++){
			var val = arr[i][property];
			if(val==value){
				return arr[i];
			}
		}
	}
	return null;
}
//取到transform里的translate属性的x，y值，并返回
function getTransformsTranslate(transform){
	if(transform && transform!=""){
		var reg = /translate\((.[^\(]*)\)/;
		var m = transform.match(reg);
		if(m != null){
			var coorStr = m[1].replace(/\s/g,"");
			var coors = coorStr.split(",");
			sx = coors[0];
			sy = coors[1];
			var obj = new Object();
			obj.x = sx;
			obj.y = sy;
			return obj;
		}
	}
	return null;
}

//取到transform里的translate属性的x，y值，并返回
function getTransformsScale(transform){
	if(transform && transform!=""){
		var reg = /scale\((.[^\(]*)\)/;
		var m = transform.match(reg);
		if(m != null){
			var coorStr = m[1].replace(/\s/g,"");
			return coorStr;
		}
	}
	return "";
}

//获取保存在本地的历史记录
function getContentHistory(){
	var jsonStr = storage(true,"abc_content_his");
	var hisArr = JSON.parse(jsonStr);
	return hisArr;
}
//显示谱子历史记录
function showLocalAbcHistory(){
	var his = getContentHistory();
	$("#abchistorytab tbody").html("");
	if(his && his!=null){
		for(var i=1;i<his.length;i++){
			 var tr = "<tr>";
			  tr += "<td onclick='getHisItemContent(this)'>"+his[i].time+"</td>";
			  tr += "</tr>";
			  $("#abchistorytab tbody").append($(tr));
		}
	}
	$('#CONTENT_HIS_div').modal('toggle');
}
//获取历史记录
function getHisItemContent(obj){
	var time = $(obj).html();
	var his = getContentHistory();
	var item = his.find(function(s){
		return s.time == time;
	})
	$("#source").val(item.content);
	src_change();
}

function resetForm(){
	$("#STAFFNUM").val(1);
	$("#barsperstaff").val(-1);
	$("#isR").prop('checked',false); 
	$("#weakBarTop").val(1);
	$("#weakBarTop").attr("disabled","disabled");
	$("#weakBarBot").val(4);
	$("#weakBarBot").attr("disabled","disabled");
	$("#X").val(1);
	$("#staffsepheight").val(46);
	$("#nodecount").val(32);
	$("#T_S").val("");
	$("#stafftypeid").val("");
	$("#M_mol").val(2);
	$("#M_den").val(4);
	$("#L").val("1/8");
	$("#Q_V").val(88);
	$("#nometer").prop("checked",false);
	$("#titleFontSize").val(28);
	$("#titleColor").val("000000");
	$("#titleColor").css("background-color","#000000")
	setTitleFontColor()
	$("#lyricFontSize").val(14);
	$("#lyricColor").val("000000");
	$("#lyricColor").css("background-color","#000000")
	
	setLyricFontSize();
	$("#plsxspeedtype").val("88")
	$("#plsxspeedtype option[text='88']").attr("selected", true);
	
}

//简谱音符的拖动
var lastNumStaffY = -1;
function numStaffDrag(e){
	if(!user.numStaffCanDrag){
		return;
	}
	if(lastNumStaffY ==-1){
		lastNumStaffY = e.offsetY;
	}
	
	if((e.offsetY-lastNumStaffY)>10){
//		往下移动
		console.log("往下移动");
		var content = $("#source").val();
		var istart = -1;
		var selectNote = $(".selected_text[type='note']");
		var st = "";
		if(selectNote.length>0){
			istart = $(selectNote).attr("istart");
			var s = syms[istart];
			if(s){
				st = content.substring(s.istart,s.iend);
			}
		}
		if(istart==-1){
			return;
		}
		var s = syms[istart];
		if(st==""){
			return;
		}
		var newStr = updownnote(st,-1);
		var newContent = content.substring(0,s.istart)+newStr+content.substring(s.iend);
		$("#source").val(newContent);
		doLog();
		src_change();
		lastNumStaffY =  e.offsetY;
	}else if((e.offsetY-lastNumStaffY)<-10){
//		往上移动
		console.log("往上移动");
		var content = $("#source").val();
		var istart = -1;
		var selectNote = $(".selected_text[type='note']");
		var st = "";
		if(selectNote.length>0){
			istart = $(selectNote).attr("istart");
			var s = syms[istart];
			if(s){
				st = content.substring(s.istart,s.iend);
			}
		}
		if(istart==-1){
			return;
		}
		var s = syms[istart];
		if(st==""){
			return;
		}
		var newStr = updownnote(st,1);
		var newContent = content.substring(0,s.istart)+newStr+content.substring(s.iend);
		$("#source").val(newContent);
		doLog();
		src_change();
		lastNumStaffY =  e.offsetY;
	}
}
//获取声部总数
function getStaffCount(){
	var content = $("#source").val();
	var vReg = /V:\s*\d{1,2}/g;
	var vReg2 = /V:\s*(\d{1,2})/;
	var matchs = content.match(vReg);
	var num = 1;
	if(matchs!=null){
		for(var i=0;i<matchs.length;i++){
			var str = matchs[i];
			var n = str.match(vReg2)[1];
			if(parseInt(n)>num){
				num = n;
			}
		}
	}
	return num;
}
//添加新的声部
function addNewPartStaff(index){
	
	var content = $("#source").val();
	var v1 = /.*%V1line0end/;
	var matchs = content.match(v1);
	var result = "";
	if(matchs!=null){
		result += "V:" + index + "\n";
		var line = matchs[0];
		var tmp = line.replace("||","|");
		var bars = tmp.split("|");
		var num = bars.length;
		
		var weakBarNodeStr = "";
		//看有没有设置弱起小节
		var weakBar = null;
		if($("#isR").is(":checked")){
			weakBar = new Object();
			weakBar.top = parseInt($("#weakBarTop").val());
			weakBar.bot = parseInt($("#weakBarBot").val());
		}
		
		//根据弱起小节设置生成相应的谱子
		if(weakBar!=null){
			weakBarNodeStr = genWeakBarRestNotes(weakBar);
			if(weakBarNodeStr!=""){
				weakBarNodeStr += "|";
			}
		}
		
		var lineNodeStr = weakBarNodeStr + genNodesByCount(num);
		result += lineNodeStr + "%V" + index + "line0end\n";
	}
	return result;
}
//获取标题副标题
function getAllTitle(){
	var content = $("#source").val();
	var titleReg = /T:.*/g;
	var matchs = content.match(titleReg);
	var allTitle = "";
	if(matchs!=null){
		for(var i=0,len=matchs.length; i<len; i++){
			var title = matchs[i];
			if(i>0){
				allTitle += "\n";
			}
			allTitle += title.replace("T:","").trim();
		}
	}
	return allTitle;
}
//获取谱子信息
function getStaffInfo(sourceid){
	var content = $("#source").val();
	var staff = new Object();
	//获取声部数量 vocalCount
	staff.vocalCount = 1;//默认一个声部
	staff.barCount = 0;
	var vocalReg = /V:\s*\d{1,2}/g;
	var vocalReg2 = /V:\s*(\d{1,2})/;
	var vocalMatch = content.match(vocalReg);
	if(vocalMatch!=null){
		var vocalArr = new Array();
		for(var i=0;i<vocalMatch.length;i++){
			var vocalStr = vocalMatch[i];
			var vocalSeq = vocalStr.match(vocalReg2)[1];
			if(vocalArr.indexOf(vocalSeq)<0){
				vocalArr.push(vocalSeq);
			}
		}
		staff.vocalCount = vocalArr.length;
	}
	
	//获取小节数量
	if(!syms){
		return;
	}
	for(var i=0;i<syms.length;i++){
		if(syms[i]){
			if(syms[i].bar_num>staff.barCount){
				staff.barCount = syms[i].bar_num-1;
			}
		}
	}
	
	//获取每行小节数
	staff.lineBarNum = -1;
	var lineBarNumReg = /%%barsperstaff\s*(\d{1,2})/;
	var lineBarMatch = content.match(lineBarNumReg);
	if(lineBarMatch != null){
		staff.lineBarNum = lineBarMatch[1];
	}
	
	//是否有弱起小节
	staff.hasWeakNode = has_weak_node;
	//弱起小节时值
	staff.weakNodeVal = weak_node_dur;
	if(staff.hasWeakNode && staff.weakNodeVal>0){
		staff.weakNode = new Object();
		var tmp = decimalsToFractional(weak_node_dur/1536);
		staff.weakNode.top = tmp.split("/")[0];
		staff.weakNode.bot = tmp.split("/")[1];
	}
	
	//行高
	staff.lineHeight = -1;
	var lineHeightReg = /%%staffsep\s*(\d{1,3})/;
	var lineHeightMatch = content.match(lineHeightReg);
	if(lineHeightMatch!=null){
		staff.lineHeight = lineHeightMatch[1];
	}
	//取节拍
	staff.meter = null;
	var meterReg = /M:\s*(\d{1,2}\/\d{1,2})/;
	var meterMatch = content.match(meterReg);
	if(meterMatch!=null){
		staff.meter = new Object();
		var top = meterMatch[1].split("/")[0];
		var bot = meterMatch[1].split("/")[1];
		staff.meter.top = top;
		staff.meter.bot = bot;
	}
	
	//是否散板
	staff.isFreeMeasure = false;
	var freeMeasureReg = /!invisible!M:.*/;
	var freeMeasureMatch = content.match(freeMeasureReg);
	if(freeMeasureReg!=null){
		staff.isFreeMeasure = true;
	}
	
	//速度描述
	staff.speedDesc = "";
	var freeDescReg = /Q:\s*\"(.[^\"]*)\"/;
	var freeDescMatch = content.match(freeDescReg);
	if(freeDescMatch!=null){
		staff.speedDesc = freeDescMatch[1];
	}
	
	//速度
	staff.speed = null;
	var speedReg = /Q:.*(\d{1,2}\/\d{1,2}\=\d{1,3})/;
	var speedMatch = content.match(speedReg);
	if(speedMatch!=null){
		var speedStr = speedMatch[1];
		var meterStr = speedStr.split("=")[0];
		var speedVal = speedStr.split("=")[1];
		staff.speed = new Object();
		staff.speed.meter = new Object();
		staff.speed.meter.top = meterStr.split("/")[0];
		staff.speed.meter.bot = meterStr.split("/")[1];
		staff.speed.val = speedVal;
	}
	
	//调号
	staff.key = getStaffKey().value;
	
	//标题字体
	staff.titleFontSize = null;
	var titleFontSizeReg = /%%titlefont.*(\d{2})/;
	var titleFontSizeMatch = content.match(titleFontSizeReg);
	if(titleFontSizeMatch != null){
		staff.titleFontSize = titleFontSizeMatch[1];
	}
	
	//标题颜色
	staff.titleFontColor = null;
	var titleFontColorReg = /%%titlecolor\s*(.*)/;
	var titleFontColorMatch = content.match(titleFontColorReg);
	if(titleFontColorMatch!=null){
		staff.titleFontColor = titleFontColorMatch[1];
	}
	
	//歌词字体
	staff.lyricFontSize = null;
	var lyricFontSizeReg = /%%vocalfont.*(\d{2})/;
	var lyricFontSizeMatch = content.match(lyricFontSizeReg);
	if(lyricFontSizeMatch != null){
		staff.lyricFontSize = lyricFontSizeMatch[1];
	}
	
	//歌词颜色
	staff.lyricFontColor = null;
	var lyricFontColorReg = /%%lyriccolor\s*(.*)/;
	var lyricFontColorMatch = content.match(lyricFontColorReg);
	if(lyricFontColorMatch!=null){
		staff.lyricFontColor = lyricFontColorMatch[1];
	}
	
	//是否是节奏谱
	var rhythmReg = /V:.*perc/;
	staff.isRhythmStaff = false;
	if(staff.vocalCount==1){
		if(rhythmReg.test(content)){
			staff.isRhythmStaff = true;
		}
	}
	return staff;
}
/*
*把文本转为行的对象
*
*/
function getLinesInfo(content){
	var lines = content.split("\n");
	var linesArray = new Array();
	var lastSeq = 0;
	var lastV = -1;
	var currV = -1;
	var nextV = -1;
	var vLineIndex = -1;
	var map = new Map();
	var lastNoteLineNum = -1;//最近的是音符类型的行号，用于把歌词的行号信息加到音符的行里面
	for(var i=0,len=lines.length;i<len;i++){
		var lineStr = lines[i];
		var tmpLineStr = lineStr.replace(/\[\d+/,"").replace(/\[\"/,"").replace(/\[.[^\[^\]]*\]/g,"").replace(/\".[^\"]*\"/g,"");
		var scoreReg = /(%%score)|(%%staves)/;
		var vReg = /V:\s*(\d{1,2})/;
		var lineObj = new Object();
		if(scoreReg.test(tmpLineStr)){
			currV = -1;
			lineObj.v = currV;//行所在声部
			lineObj.type = "score";//行类型
		}else if(vReg.test(tmpLineStr)){
			nextV = parseInt(vReg.exec(tmpLineStr)[1])-1;
			currV = -1;
			lineObj.v = currV;
			lineObj.type = "v";
			lineObj.vNum = nextV;
		}else if(tmpLineStr.indexOf("|")>-1 || tmpLineStr.indexOf("S:")==0 || tmpLineStr.indexOf("w:")==0){
			if(nextV==-1){
				nextV = 0;
			}
			//谱子正文
			lineObj.v = nextV;
			lineObj.vLineIndex = vLineIndex;
			if(tmpLineStr.indexOf("w")==0){
				lineObj.type = "w";
				linesArray[lastNoteLineNum].lyricLineNums.push(i);
			}else if(tmpLineStr.indexOf("S:")==0){
				lineObj.type = "S";
			}else if(tmpLineStr.indexOf("N:")==0){
				lineObj.type = "N";
			}else{
				lineObj.type = "note";
				lastNoteLineNum = i;
				if(lineObj.type=="note"){
					if(map.get("vLineIndex"+lineObj.v)==null){
						map.set("vLineIndex"+lineObj.v,-1);
					}
					vLineIndex = map.get("vLineIndex"+lineObj.v);
					vLineIndex++;
					map.set("vLineIndex"+lineObj.v,vLineIndex);
				}
				lineObj.vLineIndex = vLineIndex;
			}
		}else if(tmpLineStr.indexOf("%%")==0){
			lineObj.v = -1;
			lineObj.type = "zs";//注释 
		}else {
			if(tmpLineStr.indexOf("S:")==0){
				lineObj.type = "S";
				lineObj.vLineIndex = vLineIndex;
			}else{
				lineObj.v = nextV;
				lineObj.type = "other";
			}
		}
		
		lineObj.lineStr = lineStr;
		lineObj.index = i;//索引号
		lineObj.startSeq = lastSeq;
		lineObj.endSeq = lastSeq + lineStr.length + 1;
		lineObj.lyricLineNums = [];
		
		lastSeq += lineStr.length + 1;
		linesArray.push(lineObj);
	}
	return linesArray;
}
//获取谱子小节信息
function getNodesInfo(content){
	var lines = getLinesInfo(content);
	var startFlag = false;//标记开始谱子内容
	var nodeBarReg = /(\|[1-9\.]+)|(\|\[[1-9\.]+)|(:\|\|:)|(:\|:)|(:\|)|(::)|(\|:)|(\|\|)|(\|\])|(\|)/g;
	var nodeBarRegOther = /(\|)/g;
	var reg = null;
	var nodeIndex = 0;
	var globalNodeIndex = 0;
	var lineNodeCount = 0;//当前行
	var lastVLineIndex = -1;
	var map = new Map();
	var globalNodeIndexMap = new Map();
	var lastV = -1;
	for(var i=0;i<lines.length;i++){
		var nodeIndex = 0;
		var line = lines[i];
		var type = line.type;
		
		
		if(type=="note" && !startFlag){
			startFlag = true;
		}
		if(startFlag && (type=="note" || type=="w" || type=="N" || type=="S")){
			line.nodes = new Array();
			var vLineIndex = line.vLineIndex;
			if(lastVLineIndex!=vLineIndex || line.v!=lastV){
				lineNodeCount = 0;
			}
			var lineStr = line.lineStr;
			var lineIndex = line.index;
			var lineStartSeq = line.startSeq;
			var lastIndex = 0;
			var v = line.v;
			
			var node = "";
			if(type=="note"){
				reg = nodeBarReg;
			}else {
				reg = nodeBarRegOther;
			}
			while(node=reg.exec(lineStr)){
				if(globalNodeIndexMap.get("globalNodeIndexMap"+v)==null){
					globalNodeIndexMap.set("globalNodeIndexMap"+v,0);
				}
				var nodeObj = new Object();
				nodeObj.nodeStr = lineStr.substring(lastIndex,node.index) + node[0];
				if(nodeObj.nodeStr.trim()=="|" ||
						nodeObj.nodeStr.trim()=="||" ||
						nodeObj.nodeStr.trim()=="|:" ||
						nodeObj.nodeStr.trim()==":|" ||
						nodeObj.nodeStr.trim()==":|:" ||
						nodeObj.nodeStr.trim()==":||:" ||
						nodeObj.nodeStr.trim()=="[M:C|]"
					){
					continue;
				}
				nodeObj.nodeIndex = globalNodeIndexMap.get("globalNodeIndexMap"+v) + (nodeIndex++);
				if(lastVLineIndex==vLineIndex && line.v==lastV){
					nodeObj.nodeIndex = nodeObj.nodeIndex - lineNodeCount;
				}
				nodeObj.startSeq = lineStartSeq+lastIndex;
				nodeObj.lineIndex = lineIndex;
				nodeObj.v = v;
				nodeObj.br = false;
				nodeObj.preStr = "";//小节的前置字符串
					
				if(nodeObj.nodeStr.indexOf("w:")===0 
						|| nodeObj.nodeStr.indexOf("N:")===0
						|| nodeObj.nodeStr.indexOf("S:")===0){
					//nodeObj.startSeq += 2;
					nodeObj.preStr = nodeObj.nodeStr.substr(0,2);
					//nodeObj.nodeStr = nodeObj.nodeStr.replace("w:","").replace("N:","").replace("S:","");
				}
				if(nodeObj.nodeStr.indexOf("$")==0){
					nodeObj.preStr = nodeObj.nodeStr.substr(0,1);
					nodeObj.br = true;
				}
				nodeObj.endSeq = nodeObj.startSeq + nodeObj.nodeStr.length;
				if(type=="note"){
					nodeObj.barLineStr = node[0];
				}
				lastIndex = node.index+node[0].length;
				if(line.nodes.length == 0){
					nodeObj.isLineFirstNode = true;//一行的第一个小节，换行时用到
				}
				line.nodes.push(nodeObj);
				if(type=="note"){
					lineNodeCount++;
				}
			}
			var endStr = content.substring(lineStartSeq+lastIndex,line.endSeq);
			if(line.nodes.length>0 && endStr.indexOf("$")>-1){
				line.nodes[line.nodes.length-1].nextBr = true;
			}
			if(type=="note"){
				
				globalNodeIndex = globalNodeIndexMap.get("globalNodeIndexMap"+v);
				globalNodeIndex += lineNodeCount;
				globalNodeIndexMap.set("globalNodeIndexMap"+v,globalNodeIndex);
				
			}
			lastVLineIndex = vLineIndex;
			lastV = line.v;
		}
	}
	return lines;
}
//获取字符串与小节，行之间的关系 
function getCharsInfo(content){
	var lines = getNodesInfo(content);
	var startStaffFlag = false;//开始音符解析
	for(var i=0;i<lines.length;i++){
		var line = lines[i];
		if(line.type=="note" && !startStaffFlag){
			startStaffFlag = true;
		}
		if(startStaffFlag){
			var lineStartSeq = line.startSeq;
			
		}
	}
}

//把小节的内容还原为休止符，用于重置拍号的情况 
function replaceNodeContentToRestWithMeter(nodeStr,meter){
	if(nodeStr.replace(/\s/g,"")!=""){
		var oriNodeStr = nodeStr+"";
		var newMeterStr = meter.replace("[M:","").replace("]","");
		if(newMeterStr=="C|"){
			newMeterStr = "2/2";
		}else if(newMeterStr=="C"){
			newMeterStr = "4/4";
		}
		var newMeterObj = new Object();
		newMeterObj.top = newMeterStr.split("/")[0];
		newMeterObj.bot = newMeterStr.split("/")[1];
		//没有中括号
		var newNodeStr = genNodesByCount(1,newMeterObj).replace("|","");
		console.log("newNodeStr:",newNodeStr);
		
		nodeStr = nodeStr.replace(/\".[^\[]*\"/g,"");//把引号的内容清空
		nodeStr = nodeStr.replace(/\s/g,"");//把空格清空
		
		var zReg = /\[.[^\[]*\]/g;
		var node = "";
		//if(zReg.test(nodeStr)){//有中括号
		var tmpStr = "";
		var lastIndex = 0;
		while(node = zReg.exec(nodeStr)){
			console.log(node,node[0])
			var tmp = node[0];
			if(tmp.indexOf(":")>-1){
				//有：号说明是声明了拍号，则原样返回
				if(tmp.indexOf("M")>-1){
					//如果是申明拍号
					return oriNodeStr;
				}else{
					tmpStr += node[0];
				}
			}
		}
		if(tmpStr!=""){
			tmpStr += newNodeStr;
			return tmpStr;
		}
		return newNodeStr;
	}
}
//根据拍号重置小节休止符内容
function getMeterRest(nodeStrArr,meter){
	var nodeStr = "";
	var result = "";
	for(var i=0,len=nodeStrArr.length;i<len;i++){
		nodeStr = nodeStrArr[i];
		result += replaceNodeContentToRestWithMeter(nodeStr,meter);
	}
	return result;
}
//清除所有元素焦点
function clearFocus(){
	$.each($("input"),function(i,item){
		if($(item).attr("type")=="input"){
			$(item).blur();
		}
	});
	$("#source").blur();
}
//滚动到选中的音符
function scroll2SelectNote(istart){
	var ta = document.getElementById("source");
	var line = findLineNumByIndex($("#source").val(), istart);
	ta.scrollTop = (line * ta.scrollHeight) / $("#source").val().split("\n").length - 10;
	var s = syms[istart];
	if(s){
		textSelect(ta,s.istart,s.iend);
	}
}

function textSelect(textBox,start,end){
	if(textBox.setSelectionRange){
		textBox.setSelectionRange(start,end);	
	}else if(textBox.createTextRange){
		var rang = textBox.createTextRange();
		rang.collapse(true);
		rang.moveStart('character',start);
		rang.moveEnd('character',end-start);
		rang.select();	
	}
	//textBox.focus();
}

//测试方法
function toStaff(){
	var content = $("#source").val();
	var vArr = new Array();
	var v0 = "";
	var v1 = "";
	for(var i=0,len=syms.length;i<len;i++){
		var c = syms[i];
		if(c){
			if(c.v==0){
				v0 += content.substring(c.istart,c.iend);
			}else if(c.v==1){
				v1 += content.substring(c.istart,c.iend);
			}
			console.log("str:",content.substring(c.istart,c.iend),"  istatt-iend:",c.istart,c.iend,"  st:",c.st,"  v:",c.v,"  bar_num:",c.my_bar_num," line:",c.my_line)
		}
	}
	console.log("v0:",v0);
	console.log("v1:",v1);
}
//根据给定的istart取到选段播放需要的数据barNum:小节序号，present:当前音符开始时间在当前小节的百分比，fields段落数组
function getNoteInfoByIstart(istart,v){
	
	if(!v){
		v = 0;
	}
	var s = syms[istart];
	var obj = new Object();
	
	if(s){
		console.log(s.my_bar_num);
		var barNum = s.my_bar_num;//小节号
		var v = s.v;//声部序号
		var totalTime = 0;
		var sTime = 0;
		var noteInNodeSeq = 0;//音符在小节的序号
		var match = 0;
		//取当前音符在小节的时间位置（百分比）
		for(var i=0,len=syms.length;i<len;i++){
			var c = syms[i];
			if(c){
				if((c.type==8 || c.type==10) && c.my_bar_num==barNum && c.v==v){
					
					if(c.istart == istart && i==c.istart){
						sTime = totalTime + 0;
						obj.stime = sTime;
						match=1;
					}
					if(i==c.istart){//这里加这个判断是因为如果音符前面有注释，也会生成一个同样的istart的syms对象，不知道会不会带来其它问题
						if(match==0){
							noteInNodeSeq++;
						}
						totalTime += c.dur;
					}
				}
			}
		}
		obj.noteInNodeSeq = noteInNodeSeq;
		obj.barNum = s.my_bar_num;
		if(has_weak_node){//弱起小节
			obj.barNum++;
		}
		obj.totalTime = totalTime;
		obj.present = obj.stime/obj.totalTime;
		var noteDatas = getNoteData();
		var fields = new Array();
		var fieldCount = 0;
		if(noteDatas!=null){
			for(var i=0,len=noteDatas.length;i<len;i++){
				if(noteDatas[i][0]==istart){
					fields.push(fieldCount++);
				}
			}
		}
		if(fieldCount==0){
			fields.push(0);
		}
		obj.fields = fields;//段落
	}
	return obj;
}
//根据音符 的小节序号，在小节内的序号，声部值，取得音符对应的istart
function getIstartByNoteInfo(noteInfo){
	var match = 0;
	var noteInNodeSeq = 0;
	var noteBarNum = noteInfo.barNum;
	if(has_weak_node){//弱起小节
		noteBarNum--;
	}
	for(var i=0,len=syms.length;i<len;i++){
		var c = syms[i];
		if(c){
			if((c.type==8 || c.type==10) && c.my_bar_num==noteBarNum && c.v==noteInfo.v){
				if(noteInNodeSeq==noteInfo.noteInNodeSeq){
					return c;
				}
				if(i==c.istart){//这里加这个判断是因为如果音符前面有注释，也会生成一个同样的istart的syms对象，不知道会不会带来其它问题
					if(match==0){
						noteInNodeSeq++;
					}
				}
			}
		}
	}
}
//测试的方法，可以删除
function testgetIstartByNoteInfo(barNum,v,noteseq){
	var noteInfo = new Object();
	noteInfo.noteInNodeSeq = noteseq;
	noteInfo.barNum = barNum;
	noteInfo.v = v;
	var s = getIstartByNoteInfo(noteInfo)
	return s;
}
//复制小节
var copyNodeInfo = new Map();//需要拷贝的字符串先存放在这个变量里面
function copyNodes(){
	copyNodeInfo = new Map();
	var selectedBars = $("svg[type='rectbar'],svg[type='rectnode']");
	var content = $("#source").val();
	var nodeBarReg = /(\|[1-9\.]+)|(\|\[[1-9\.]+)|(:\|\|:)|(:\|:)|(:\|)|(::)|(\|:)|(\|\|)|(\|\])|(\|)/g;
	//选中的是小节
	if(selectedBars.length>0){
		var copyBarInfoArr = new Array();
		$.each($(selectedBars),function(i,item){
			var copyBar = new Object();
			var id = $(item).attr("id");
			var barNum = id.replace("mysvgbar","").replace("mysvgnode","");
			if(barNum.indexOf("_")>-1){
				copyBar.v = parseInt(barNum.split("_")[0]);
				copyBar.barNum = parseInt(barNum.split("_")[1]);
			}else{
				copyBar.barNum = parseInt(barNum);
				copyBar.v = -1;
			}
			copyBarInfoArr.push(copyBar);
		});
		if(copyBarInfoArr.length>0){
			var lines = getLinesInfo(content);
			var nodeCount = 0;
			var result = "";
			var map = new Map();
			for(var i=0,len=lines.length;i<len;i++){
				var lineObj = lines[i];
				if(lineObj.type=="note"){
					if(map.get("key"+lineObj.v)==null){
						map.set("key"+lineObj.v,0);
					}
					nodeCount = map.get("key"+lineObj.v);
					var node = "";
					var lastIndex = 0;
					var lineStr = lineObj.lineStr;
					while(node=nodeBarReg.exec(lineStr)){
						for(var j=0;j<copyBarInfoArr.length;j++){
							var cb = copyBarInfoArr[j];
							if(cb.barNum == nodeCount){
								if(cb.v!=-1){
									if(cb.v==lineObj.v){
										//选中的是某个声部
										if(copyNodeInfo.get("v"+cb.v)==null){
											copyNodeInfo.set("v"+cb.v,"");
										}
										copyNodeInfo.set("v"+cb.v,copyNodeInfo.get("v"+cb.v) + lineObj.lineStr.substring(lastIndex,node.index) + node[0]);
									}
								}else{
									//选中的是全部声部(暂时未实现)
									
								}
								
							}
						}
						nodeCount++;
						lastIndex = node.index+node[0].length;
					}
					map.set("key"+lineObj.v,nodeCount);
				}
			}
		}
	}
}
//粘贴小节
function pasteNode(){
	if(copyNodeInfo==null){
		return;
	}
	var copyVCount = copyNodeInfo.size;
	var selectedBars = $("svg[type='rectbar'],svg[type='rectnode']");
	var barIndexArr = new Array();
	if(selectedBars.length>0){
		var pasteBarInfoArr = new Array();
		$.each($(selectedBars),function(i,item){
			var pasteBar = new Object();
			var id = $(item).attr("id");
			var barNum = id.replace("mysvgbar","").replace("mysvgnode","");
			if(barNum.indexOf("_")>-1){
				pasteBar.v = parseInt(barNum.split("_")[0]);
				pasteBar.barNum = parseInt(barNum.split("_")[1]);
			}else{
				pasteBar.barNum = parseInt(barNum);
				pasteBar.v = -1;
			}
			pasteBarInfoArr.push(pasteBar);
		});
		
		
		var content = $("#source").val();
		var linesArr = getNodesInfo(content);
		var result = "";
		var hasPaste = false;//只要粘贴一次就好
		var nodeBarReg = /(\|[1-9\.]+)|(\|\[[1-9\.]+)|(:\|\|:)|(:\|:)|(:\|)|(::)|(\|:)|(\|\|)|(\|\])|(\|)/g;
		var vp = new Map();//每个声部是否已经粘贴过
		for(var i=0,len=linesArr.length;i<len;i++){
			var lineObj = linesArr[i];
			//每行小节数设置大于0
			if(lineObj.type=="note"){
				var lineStr = lineObj.lineStr;
				var node = "";
				var lastIndex = 0;
				var newLineStr = "";
				var nodes = lineObj.nodes;
				for(var x=0;x<nodes.length;x++){
					node = nodes[x];
					

					hasPaste = false;
					for(var j=0;j<pasteBarInfoArr.length;j++){
						var pb = pasteBarInfoArr[j];
						if(pb.barNum==node.nodeIndex && pb.v==lineObj.v ){
							if(vp.get("v"+pb.v)){
								hasPaste = true;
								continue;
							}
							var copyNodeStr = copyNodeInfo.get("v"+pb.v);
							if(!copyNodeStr && copyVCount==1){
								copyNodeStr = copyNodeInfo.get(copyNodeInfo.keys().next().value);
							}
							if(!hasPaste){
								//var oriNodeStr = lineObj.lineStr.substring(lastIndex,node.index);
								var oriNodeStr = node.nodeStr;
								if(oriNodeStr.indexOf("$")>-1){
									if(copyNodeStr.indexOf("$")<0){
										newLineStr += "$"+copyNodeStr;
									}else{
										newLineStr += copyNodeStr.replace("$","");
									}
								}else{
									newLineStr += copyNodeStr.replace("$","");
								}
								hasPaste = true;
								vp.set("v"+pb.v,true);
							}
						} 
						
					}
					if(!hasPaste){
						newLineStr += node.nodeStr;
					}
					
					lastIndex = node.endSeq;
				
					
					
					
				}
//				while(node=nodeBarReg.exec(lineStr)){
//					hasPaste = false;
//					for(var j=0;j<pasteBarInfoArr.length;j++){
//						var pb = pasteBarInfoArr[j];
//						if(pb.barNum==nodeCount && pb.v==lineObj.v ){
//							if(vp.get("v"+pb.v)){
//								hasPaste = true;
//								nodeCount++;
//								continue;
//							}
//							var copyNodeStr = copyNodeInfo.get("v"+pb.v);
//							if(!copyNodeStr && copyVCount==1){
//								copyNodeStr = copyNodeInfo.get(copyNodeInfo.keys().next().value);
//							}
//							if(!hasPaste){
//								var oriNodeStr = lineObj.lineStr.substring(lastIndex,node.index);
//								if(oriNodeStr.indexOf("$")>-1){
//									if(copyNodeStr.indexOf("$")<0){
//										newLineStr += "$"+copyNodeStr;
//									}else{
//										newLineStr += copyNodeStr.replace("$","");
//									}
//								}else{
//									newLineStr += copyNodeStr.replace("$","");
//								}
//								hasPaste = true;
//								nodeCount++;
//								vp.set("v"+pb.v,true);
//							}
//						} 
//						
//					}
//					if(!hasPaste){
//						newLineStr += lineObj.lineStr.substring(lastIndex,node.index) + node[0];
//						nodeCount++;
//					}
//					
//					lastIndex = node.index+node[0].length;
//				}
				if(lastIndex!=lineObj.endSeq){
					newLineStr += content.substring(lastIndex,lineObj.endSeq);
					
				}
				result += newLineStr + "\n";
			}else{
				if(lineObj.v!=-1 && lineObj.type=="note"){
					//其它声部
					result += lineObj.lineStr.replace(/\$/g,"")+"\n";
				}else{
					result += lineObj.lineStr+"\n";
				}
			}
		}
		result = replaceBlankLine(result);
		$("#source").val(result);
		src_change();
		doLog();
	}
	
}
//复制音符
function copyNote(){
	hiddenMenu()
	var selectNotes = $(".selected_text[type*='HD'],.selected_text[type^='r'],.selected_text[type='note']")
	if(selectNotes.length>0){
		var istart = $(selectNotes[0]).attr("istart");
		var s = syms[istart];
		if(s){
			var content = $("#source").val();
			var noteStr = content.substring(s.istart,s.iend);
			user.copyNoteInfo.s = s;
			user.copyNoteInfo.copyNoteStr = noteStr;
		}
	}
}
//粘贴音符
function pasteNote(){
	hiddenMenu()
	var selectNotes = $(".selected_text[type*='HD'],.selected_text[type^='r'],.selected_text[type='note']")
	if(selectNotes.length>0){
		var istart = $(selectNotes[0]).attr("istart");
		var s = syms[istart];
		if(s){
			var content = $("#source").val();
			if(user.copyNoteInfo.copyNoteStr!=""){
				user.pasteNote = true;
				var noteInfo = genNoteAndDur(user.copyNoteInfo.copyNoteStr,s);
				noteInfo.note = user.copyNoteInfo.copyNoteStr.replace(/\d/g,"").replace(/[\/]/g,"");
				user.pasteNote = false;
				if(!noteInfo){
					return;
				}
				replaceNote("source",s.istart,s.iend,noteInfo);
				
			}
		}
	}
}
//根据传入的dur的值及L的值，取得对应时值的描述串
function getDurStrByNoteDur(dur,ulen){
	var bs = parseInt(dur)/parseInt(ulen);
	var str = decimalsToFractional(bs);
	str = str.replace("/1","");
	str = str.replace("/2","/");
	str = str.replace("/4","//");
	str = str.replace("/8","///");
	str = str.replace("/16","////");
	
	
	str = str.replace("1/","/");
	if(str=="1"){
		str = "";
	}
	return str;
}
//变速
function changePlaySpeed(speed){
	user.tmpSpeed = speed;
	play.abcplay.set_speed(speed)
}
/**
 * dur转time
 * 
 * @param dur 音符时值
 * @param q 速度，例: 1/4=60
 * @returns time 音符持续时长，单位：秒
 */
function durToTime(dur, q){
	if(dur > 0 && q){
		var note = dur / 1536; // 计算传入音符是什么音符，例dur=96时, 96 / 1536 = 0.0625 = 1/16 就是16分音符
		q = q.replace(/\s/g, ''); // 清除空白符号
		var qNum = q.split('=')[0]; // 速度音符分数
		var qNote = qNum.split('/')[0] / qNum.split('/')[1]; // 速度音符
		var qSecond = q.split('=')[1] / 60; // 计算一个音符是多少秒
		
		var time = note / qNote * qSecond; // 例：dur=96,q: 1/4=60 时， 音符为16分音符 time = (1/16) / (1/4) * (60/60)
		
		return time;
	}
	return 0;
}
//获取所有声部的小节坐标数据
function getStaffNodeCoor(scale,addTop,offset_x){
	var data = null;
	if(musicType==2){
		data = getSimpleNodeCoor();
	}else{
		data = getNodeCoor();
	}
	var array = new Array();
	var nodeIndex = 0;
	// 最大的x坐标，用于赋值给每一行的最后一个对象，保证右对齐
	var maxX2 = 0;
	var lineLast = new Array();

	for(var line=0;line<data.xs.length;line++){
		for(var i=0;i<data.xs[line].length;i++){
			for(var ni=0;ni<data.staff.length;ni++){
				var staff = data.staff[ni];
				if(staff.lineIndex==line){
					var x1 = 0;
					var ymin = 0;
					var x2 = 0;
					var ymax = 0;
					var obj = new Object();
					
					var nodeline_start = new Array();
					if(i==0){
						if(musicType==2){
							x1 = 30*scale;
						} else {
							x1 = 0;
						}
					} else {
						x1 = data.xs[line][i-1]*scale;
					}
					x2 = data.xs[line][i]*scale;
					if(addTop){
						if(musicType==2){
							ymin = (parseFloat(staff.translate.y))*scale + data.tops[line];
							ymax = ymin + 24 *scale;
						}else{
							ymin = (parseFloat(staff.translate.y)-24)*scale + data.tops[line];
							ymax = parseFloat(staff.translate.y) *scale;
							
						}
					}else{
						if(musicType==2){
							ymin = (parseFloat(staff.translate.y))*scale;
							ymax = ymin + 24 *scale;
						}else{
							ymin = (parseFloat(staff.translate.y)-24)*scale;
							ymax = parseFloat(staff.translate.y) *scale;
							
						}
					}
					
					if(offset_x){
						x1 += offset_x * scale;
						x2 += offset_x * scale;
					}
					
					// 非简谱的第一列，左移至起始位置
					if(i == 0 && musicType != 2){
						x1 = 0; 
					}
					// 开始线的坐标
					nodeline_start.push(x1);
					nodeline_start.push(ymin);
					nodeline_start.push(x1);
					nodeline_start.push(ymax);
					obj.nodeline_start = nodeline_start;
					obj.v = staff.v;
					
					// 结束线坐标
					var nodeline_end = new Array();
					nodeline_end.push(x2);
					nodeline_end.push(ymin);
					nodeline_end.push(x2);
					nodeline_end.push(ymax);
					obj.nodeline_end = nodeline_end;
					obj.node_index = nodeIndex;
					obj.line = line;
					array.push(obj);
					
					if( maxX2 < x2 ){
						maxX2 = x2;
					}
					if(i + 1 == data.xs[line].length){
						lineLast.push(obj);
					}
				}
			}
			nodeIndex++;
		}
	}
	
	// 设置最后一行对齐，但是如果最后一行没满，那么就不设置对齐，不然很难看
	for (var i = 0; i < lineLast.length; i++) {
		var end = lineLast[i].nodeline_end[0];
		if( Math.abs(maxX2 - end) < 100){
			lineLast[i].nodeline_end[0] = maxX2;
			lineLast[i].nodeline_end[2] = maxX2;
		}
	}
	return array;
}
//根据小节线的x坐标，判断这个小节线是不是在这一行的最前面
//判断方法：找x坐标小于xval的休止符或音符，如果未到找，就说明该小节线是在最前面
function checkBarIsInLineFirst(barRect){
	var barX = parseFloat($(barRect).attr("x"));
	var svg = $(barRect).parents("svg");
	var findStr = "rect[type='rest'],rect[type='note']";
	if(musicType==2){
		findStr = "rect[type='splnum_note'],rect[type='splnum_rest']";
	}
	var isInLineFirst = true;
	$(svg).find(findStr).each(function(i,item){
		var ix = parseFloat($(item).attr("x"));
		if(ix<barX){//有比小节线的x坐票更小的音符或休止符，则说明不是以小节线开头
			isInLineFirst = false;
		}
	});
	return isInLineFirst;
}
//分声部渲染小节，传入的是需要渲染的小节数据，包函小节声部号st,小节序号bar_num,颜色color
function renderStaffNodeBySt(indexArr,typestr){
	//模拟数据start
//	var indexArr = new Array();
//	var e = new Object;
//	e.bar_num = 0;
//	e.v = 0;
//	e.color = "";
//	indexArr.push(e);
//	var e1 = new Object;
//	e1.bar_num = 1;
//	e1.v = 1;
//	e1.color = "";
//	indexArr.push(e1);
	//模拟数据end
	
	
//	var typestr = "node";
	var data = getStaffNodeCoor(scale,false,0);
	for(var i=0;i<indexArr.length;i++){
		var index = indexArr[i].bar_num;
		var color = indexArr[i].color;
		var stroke = indexArr[i].stroke;
		if(color==""){
			color = "blue";
		}
		if (index > (data.length - 1)) {
			return;
		}
		// var content = $("#nodelinedata").val();
		// var nodeLineData = $.parseJSON(content);
		for(var j=0;j<data.length;j++){
			var currData = data[j];
			if(currData.v == indexArr[i].v && currData.node_index==indexArr[i].bar_num){
				
				var nodeline_start = currData.nodeline_start;
				var nodeline_end = currData.nodeline_end;

				var x = bar_offset_x * scale + nodeline_start[0];
				var y = nodeline_start[1];
				var w = nodeline_end[0] - nodeline_start[0];
				var h = nodeline_end[3] - nodeline_start[1];

				var currSvg = $("svg.music")[currData.line];
				$("#mysvg" + typestr + currData.v + "_" + index).remove();
				
				if(stroke){
					//如果有边框属性，则说明是渲染边框
					$(currSvg).prepend('<svg id="mysvg' + typestr + currData.v + "_" + index+'" barIndex="' + index + '" type="rect'+typestr+'"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" stroke="red" stroke-width="3" fill="'+color+'" fill-opacity="0"></rect></svg>');
				}else{
					$(currSvg).prepend('<svg id="mysvg' + typestr + currData.v + "_" + index+'" barIndex="' + index + '" type="rect'+typestr+'"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="'+color+'" fill-opacity="0.3"></rect></svg>');
				}
			}
		}
		
	}
}

//自动添加小节线
function autoNodeLine(){
	try {
		
		var startPos = getStartPos(document.getElementById("source"));
		var content = $("#source").val();
		var preContent = content.substr(0,startPos);
		var lineNum = findLineNumByIndex(content,startPos);
		var lines = preContent.split("\n");
		var lastLine = lines[lines.length-1];
		
		var br = "";
		if(lineNum < content.split("\n").length-1){
			br = "\n";
		}
		// if(startPos==content.length){
			// 节拍2/4
			var M = $.trim(getLastM("source").split(":")[1]);
			// 单位1/8
			var L = $("#L").val();
			// 算出每小节有几个单位
			var unitNodeLen = toFloat(M)/toFloat(L);
			// 找到最后一个小节线|,如果没有小节线，就全部
			var nodes = lastLine.split("|");
			var lastNode = nodes[nodes.length-1];
			// lastNode = replaceSuffix(lastNode);
			var nodeLen = calNodeLen(lastNode);
			// console.log("nodeLen:"+nodeLen);
			var x = get("M:").split("/")[1];
			var y = get("L:").split("/")[1];
			var z = parseInt(y)/parseInt(x);
			// 大于4拍的，有各种规则，并不是第一拍就断开
			if(parseInt($("#M").val().split("/")[0])<=4){
				if(nodeLen%z==0){
					$("#source").val(preContent  + " " + br + content.substr(startPos+1));
				}
			}else{
				if(parseInt(n)==6 || parseInt(n)==9){
					//6拍子或9拍子
					console.log("nodeLen------",nodeLen);
					if(nodeLen/3){
						
					}
				}
			}
			
			if(nodeLen>=unitNodeLen){
				$("#source").val(preContent + "| " + br  +content.substr(startPos+1));
			}
		// }
	} catch (e) {
		console.log(e)
	}
}

function autoNodeLine2(lineIndex){
	try {
		var startPos = 0;
		var content = $("#source").val();
		
		var lines = content.split("\n");
		
		for(var i=0;i<lines.length;i++){
			var line = lines[i];
			if(i != (lines.length-1)){
				startPos += line.length + 1;
			}else{
				
				startPos += line.length;
			}
			if(i==lineIndex){
				break;
			}
		}
		
		var preContent = content.substr(0,startPos);
		var index = lines.length-1;
		if(lineIndex){
			index = lineIndex;
		}
		var lastLine = lines[index];
		
		// if(startPos==content.length){
			// 节拍2/4
			var M = $.trim(getLastM("source").split(":")[1]);
			// 单位1/8
			var L = $("#L").val();
			// 算出每小节有几个单位
			var unitNodeLen = toFloat(M)/toFloat(L);
			// 找到最后一个小节线|,如果没有小节线，就全部
			var nodes = lastLine.split("|");
			var lastNode = nodes[nodes.length-1];
			// lastNode = replaceSuffix(lastNode);
			var nodeLen = calNodeLen(lastNode);
			// console.log("nodeLen:"+nodeLen);
			var n = $("#M").val().split("/")[0];
			var x = $("#M").val().split("/")[1];
			var y = $("#L").val().split("/")[1];
			var z = parseInt(y)/parseInt(x);
			// 大于4拍的，有各种规则，并不是第一拍就断开
			if(parseInt(n)<=4){
				if(nodeLen%z==0){
					if(lineIndex != (lines.length-1)){
						//不是最后一行时，增加一个回车符
						$("#source").val(preContent.substring(0,preContent.length - 1) + " \n" + content.substr(startPos));
					}else{
						$("#source").val(preContent + " " + content.substr(startPos+1));
					}
				}
			}else{
				
				if(parseInt(n)==6 || parseInt(n)==9){
					//6拍子或9拍子
					console.log("nodeLen------",nodeLen);
					if(nodeLen/3){
						
					}
				}
			}
			
			if(nodeLen>=unitNodeLen){
				if(lineIndex != (lines.length-1)){
					$("#source").val(preContent.substring(0,preContent.length-1) + "| \n"+content.substr(startPos));
				}else{
					$("#source").val(preContent+"| "+content.substr(startPos+1));
				}
			}
		// }
	} catch (e) {
		console.log(e)
	}
}
//删除小节,传入小节序号数组，删除多个小节
function delNodes(nodeIndexArr){
	var lines = getNodesInfo($("#source").val());
	var result = "";
	for(var i=0;i<lines.length;i++){
		var line = lines[i];
		var lineStr = line.lineStr;
		if(line.nodes){
			var nodes = line.nodes;
			for(var j=0;j<nodes.length;j++){
				var node = nodes[j];
				var nodeIndexMatch = false;
				for(var k=0;k<nodeIndexArr.length;k++){
					var nodeIndex = nodeIndexArr[k];
					if(node.nodeIndex==nodeIndex){
						nodeIndexMatch = true;
						break;
					}
				}
				if(nodeIndexMatch){
					result += node.preStr;
				}else{
					result += node.nodeStr;
				}
			}
			result += "\n";
		}else{
			result += lineStr + "\n";
		}
	}
	$("#source").val(result);
	src_change();
	doLog();
}
//根据小节序号插入小节
function insertNodeByIndex(nodeIndex){
	//先取到拍号
	var meter = null;
	for(var i=0;i<syms.length;i++){
		if(syms[i]){
			var s = syms[i];
			if((s.type==8 || s.type==10) && s.my_bar_num==nodeIndex){
				meter = s.my_meter[0];
				break;
			}
		}
	}
	var nodeStr = "";
	if(meter!=null){
		nodeStr = genNodesByCount(1,meter);
	}
	if(nodeStr==""){
		return;
	}
	var lines = getNodesInfo($("#source").val());
	var result = "";
	for(var i=0;i<lines.length;i++){
		var line = lines[i];
		var lineStr = line.lineStr;
		if(line.nodes){
			var nodes = line.nodes;
			for(var j=0;j<nodes.length;j++){
				var node = nodes[j];
				if(node.nodeIndex==nodeIndex){
					result += nodeStr + node.nodeStr;
				}else{
					result += node.nodeStr;
				}
			}
			result += "\n";
		}else{
			result += lineStr + "\n";
		}
	}
	$("#source").val(result);
	src_change();
	doLog();
}
//重新换行，原来的换行只在第一声部换行，如果不显示第一声部，则会出现问题
function reBr(sourceid){
	var content = $("#"+sourceid).val();
	if(content.indexOf("%%linebreak")<0 && content.indexOf("%%breakline")<0){
		return content;
	}
	var lines = getNodesInfo(content);
	var brNodes = new Array();
	for(var i=0;i<lines.length;i++){
		var lineObj = lines[i];
		if(lineObj.v==0 && lineObj.type=="note"){
			var nodes = lineObj.nodes;
			var lineStr = lineObj.lineStr;
			var nodeIndex = 0;
			if(nodes){
				for(var j=0;j<nodes.length;j++){
					var node = nodes[j];
					nodeIndex = node.nodeIndex;
					if(node.nodeStr && node.nodeStr.indexOf("$")>-1){
						brNodes.push(node.nodeIndex);
					}
				}
			}
			var strs = lineStr.split("|");
			if(strs.length>0){//这里处理最后一个小节是换行符的情况|$
				var lastStr = strs[strs.length-1];
				if(lastStr.replace(/\s|\||\]|\:/g,"").indexOf("$")==0){
					brNodes.push(nodeIndex+1);
				}
			}
		}
	}
	var newContent = "";
	for(var i=0;i<lines.length;i++){
		var lineObj = lines[i];
		if(lineObj.v!=0 && lineObj.type=="note"){
			var nodes = lineObj.nodes;
			var nodeEndIend = -1;
			if(nodes){
				for(var j=0;j<nodes.length;j++){
					var node = nodes[j];
					nodeEndIend = node.endSeq;
					if(brNodes.indexOf(node.nodeIndex)>-1 && node.nodeStr.indexOf("$")<0){
						if(j!=0){
							newContent = newContent + "$" + node.nodeStr;
						}else{
							newContent = newContent + node.nodeStr;
							
						}
					}else{
						newContent = newContent + node.nodeStr;
					}
				}
			}
			if(nodeEndIend != lineObj.endSeq){
				newContent += content.substring(nodeEndIend,lineObj.endSeq);
			}else{
				newContent += "\n";
			}
		}else{
			newContent = newContent + lineObj.lineStr + "\n";
		}
	}
	
	return newContent;
}
//替换js
function replacejscssfile(oldfilename,newfilename, filetype){

	var targetelement=(filetype=="js")?"script" : (filetype=="css")? "link" :"none"

	var targetattr=(filetype=="js")?"src" : (filetype=="css")? "href" :"none"

	var allsuspects=document.getElementsByTagName(targetelement)

	for (var i=allsuspects.length; i>=0;i--){

		if (allsuspects[i] &&allsuspects[i].getAttribute(targetattr)!=null &&allsuspects[i].getAttribute(targetattr).indexOf(oldfilename)!=-1){
	
		  var newelement=createjscssfile(newfilename, filetype)
	
		  allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i])
	
		}

	}

}

//传入调号和音符组合，获取相应的和弦功能标记
function getChordGnbj(key, noteStr, chordKeyType) {
	if(!chordKeyType){
		chordKeyType = "";
	}
	var noteReg = /[a-gA-G]/g;
	var matchs = noteStr.match(noteReg);
	var noteLen = 0;
	if(matchs!=null){
		noteLen = matchs.length;
	}
	var jb = -1, hx = -1; // 级别，和弦
	for(var i=0;i<7;i++	){
		var level = i;
		var yw = "yuanwei";
		var zw1 = "zhuangwei1";
		var zw2 = "zhuangwei2";
		var zw3 = "zhuangwei3";
		if(chordKeyType!=""){//hsdd、zrxd、hsxd
			yw += "-"+chordKeyType;
			zw1 += "-"+chordKeyType;
			zw2 += "-"+chordKeyType;
			zw3 += "-"+chordKeyType;
		}
		var result = "";
		if(noteLen==3){
			result = gen37ChordString(3,yw,level,key);
			if(result==noteStr){
				hx = '3';
				jb = i;
				break;
			}
			result = gen37ChordString(3,zw1,level,key)
			if(result==noteStr){
				hx = '3';
				jb = i;
				break;
			}
			result = gen37ChordString(3,zw2,level,key)
			if(result==noteStr){
				hx = '3';
				jb = i;
				break;
			}
		} else if (noteLen == 4) {
			result = gen37ChordString(7,yw,level,key)
			if (result==noteStr) {
				hx = '7';
				jb = i;
				break;
			}
			result = gen37ChordString(7,zw1,level,key)
			if (result==noteStr) {
				hx = '7';
				jb = i;
				break;
			}
			result = gen37ChordString(7,zw2,level,key)
			if (result==noteStr) {
				hx = '7';
				jb = i;
				break;
			}
			result = gen37ChordString(7,zw3,level,key)
			if (result==noteStr) {
				hx = '7';
				jb = i;
				break;
			}
		}
	}
	var gnbj = null;
	switch(chordKeyType) {
		case '':
		case 'hsdd':
			if (hx == '7') {
				gnbj = ["fmt:T/7","fmt:SⅡ/7","fmt:DTⅢ/7","fmt:S/7","fmt:D/7","fmt:TSⅥ/7","fmt:DⅦ/7"];
			} else {
				gnbj = ["T","SⅡ","DTⅢ","S","D","TSⅥ","DⅦ"];
			}
			break;
		case 'zrxd':
		case 'hsxd':
			if (hx == '7') {
				gnbj = ["fmt:t/7","fmt:sⅡ/7","fmt:dtⅢ/7","fmt:s/7","fmt:d/7","fmt:tsⅥ/7","fmt:dⅦ/7"];
			} else {
				gnbj = ["t","sⅡ","dtⅢ","s","d","tsⅥ","dⅦ"];
			}
			break;
	}
	if (null == gnbj || jb == -1 || hx == -1) {
		return '';
	}
	
	return gnbj[jb];
}

//重新设置拍号
function resetMeter(meter){
	var totalDur = 0;
	var hasHandleArr = [];
	var map = new Map();
	map.set("1/4",0.25)
	map.set("2/4",0.5)
	map.set("3/4",0.75)
	map.set("4/4",1)
	map.set("5/4",1.25)
	map.set("6/4",1.5)
	map.set("3/8",0.375)
	map.set("4/8",0.5)
	map.set("6/8",0.75)
	map.set("9/8",1.125)
	map.set("12/8",1.5)
	map.set("2/2",1)
	map.set("4/2",2)
	var content = $("#source").val();
	var nodeDurVal = map.get(meter);
	if(!nodeDurVal){
		return;
	}
	var oldMeter = "";
	var lastIndex = 0;
	var result = "";
	var wmeasure = 0;
	var ulen = 0;
	var nodeTotalLen = 0;
	var vTotalMap = new Map();
	var nodeBarReg = /(\|[1-9\.]+)|(\|\[[1-9\.]+)|(:\|\|:)|(:\|:)|(:\|)|(::)|(\|:)|(\|\|)|(\|\])|(\|)/g;
	var lastNoteChar = "";
	if(!syms){
		return;
	}
	for(var i=0;i<syms.length;i++){
		if(syms[i]){
			var s = syms[i];
			if(s.type==6){
				if(oldMeter==""){
					oldMeter = s.a_meter[0].top+"/"+s.a_meter[0].bot;
				}
			}
			if(hasHandleArr.indexOf(s.istart)<0){
				if(s.type==8 || s.type==10){
					if(wmeasure==0){
						wmeasure = s.my_wmeasure;
						ulen = s.my_ulen;
						nodeTotalLen = wmeasure/ulen;
					}
					totalDur = vTotalMap.get(s.v);
					if(totalDur==null){
						totalDur = 0;
					}
					totalDur += s.dur/1536;
					
					if(totalDur==nodeDurVal){
						//当前累积时值==新设定的时值，则增加一个小节线
						var subStr = content.substring(lastIndex,s.iend);
						if(lastIndex!=0){
							result += subStr.replace(nodeBarReg,"");
						}else{
							result += subStr;
						}
						result += "|"
						totalDur = 0;
						lastIndex = s.iend;
					}else if(totalDur>nodeDurVal){
						//当前累积时值>新设定的时值，则需要把音符拆分
						var moreDurVal = totalDur - nodeDurVal;//多出来的拍数
						if(moreDurVal<nodeDurVal){
							var moreDur = moreDurVal * 1536;//多出来的时值
							var currNoteRemainDur = s.dur - moreDur;//当前音符剩下的时值
							
							var currNoteDurStr = getDurStrByNoteDur(currNoteRemainDur,s.my_ulen);//当前音符被切割的前半部分时值字符串
							var genNoteDurStr = getDurStrByNoteDur(moreDur,s.my_ulen);//当前音符被切割的后半部分时值字符串
							
							var noteStr = content.substring(s.istart,s.iend);
							var noteStr1 = noteStr.replace(/[0-9]*$|\//,currNoteDurStr);//当前音符被切割的前半部分
							var noteStr2 = noteStr.replace(/[0-9]*$|\//,genNoteDurStr);//当前音符被切割的后半部分
							var newNoteStr = "";
							if(noteStr1.indexOf("z")<0){
								newNoteStr = noteStr1+"-|"+noteStr2;
							}else{
								newNoteStr = noteStr1+"|"+noteStr2;
							}
							result += content.substring(lastIndex,s.istart) + newNoteStr;
							lastIndex = s.iend;
							totalDur = totalDur - nodeDurVal;
						}else{
							while(moreDurVal>=nodeDurVal){
								var moreDur = nodeDurVal * 1536;//多出来的时值
								var currNoteRemainDur = s.dur - moreDur;//当前音符剩下的时值
								
								var currNoteDurStr = getDurStrByNoteDur(currNoteRemainDur,s.my_ulen);//当前音符被切割的前半部分时值字符串
								var genNoteDurStr = getDurStrByNoteDur(moreDur,s.my_ulen);//当前音符被切割的后半部分时值字符串
								
								var noteStr = content.substring(s.istart,s.iend);
								var noteStr1 = noteStr.replace(/[0-9]*$|\//,currNoteDurStr);//当前音符被切割的前半部分
								var noteStr2 = noteStr.replace(/[0-9]*$|\//,genNoteDurStr);//当前音符被切割的后半部分
								
								var newNoteStr = "";
								if(noteStr1.indexOf("z")<0){
									newNoteStr = noteStr1+"-|"+noteStr2+"|";
								}else{
									newNoteStr = noteStr1+"|"+noteStr2+"|";
								}
								
								
								result += content.substring(lastIndex,s.istart) + newNoteStr;
								lastIndex = s.iend;
								totalDur = totalDur - nodeDurVal- nodeDurVal;
								moreDurVal = totalDur;
							}
							
						}
					}
					console.log(i,"当前位置：",s.istart," 拍数：",totalDur);
					hasHandleArr.push(s.istart);
					vTotalMap.set(s.v,totalDur);
				}else if(s.type==0){
					if(s.time!=0){
						result += content.substring(lastIndex,s.istart);
					}else{
						result += content.substring(lastIndex,s.iend);
					}
					lastIndex = s.iend;
					if(content.substr(s.iend,1)=="$"){
						lastIndex++;
					}
				}
			}
		}
	}
	//最后一小节如果不完整，则删除
	var lastChar = result.substr(result.length-1,1);
	if(lastChar!="|"){
		var lastBarIndex = result.lastIndexOf("|");
		result = result.substring(0,lastBarIndex+1);
	}
	if(lastIndex<content.length){
		result += content.substring(lastIndex);
	}
	result = mergeRest(result,toFloat(meter)/toFloat(oldMeter)*nodeTotalLen);//合并同一小节内的休止符
	result = result.replace(/M:.*/,"M: "+meter);
	$("#source").val(result);
	src_change();
	doLog();
	return result;
}
/**
 * 合并同一小节内的休止符
 * @param content 谱子内容
 * @param totalLen 一个小节总长度，如单位音符是1/8,4/4拍的话，总长度为8
 * @returns
 */
function mergeRest(content,nodeTotalLen){
	var restReg = /\|{0,1}z[,1-9][^\|]*\|/g;
	var restNoteReg = /z[,]{0,1}[/]{0,}\d{0,2}/g;
	var restNoteReg2 = /z[,]{0,1}([/]{0,}\d{0,2})/;
	var node;
	var lastIndex = 0;
	var newContent = "";
	var count = 0;
	while(node = restReg.exec(content)){
		var str = node[0].replace(/\|/,"");
		newContent += content.substring(lastIndex,node.index)
		var match = str.match(restNoteReg);
		if(match!=null){
			var restTotalLen = 0;
			for(var i=0;i<match.length;i++){
				var restStr = match[i];
				var matchs2 = restStr.match(restNoteReg2);
				var len = 0;
				if(matchs2!=null){
					var lenStr = matchs2[1];
					
					if(lenStr == "/"){
						len = 0.5
					}else if(lenStr == "//"){
						len = 0.25
					}else if(lenStr == "///"){
						len = 0.125
					}else if(parseInt(lenStr).toString()==lenStr){
						len = parseInt(lenStr);
					}
				}else{
					len = 1;
				}
				restTotalLen += len;
			}
			if(restTotalLen==nodeTotalLen){
//				if(count==0){//不知道为什么要加这一段，先注释掉，否则会在第一小节前加一个小节线
//					newContent += "|";
//				}
				newContent += "z,"+nodeTotalLen+"|";
				console.log("小节内容：",node[0]," 全是休止符")
			}else{
				newContent += node[0];
			}
		}else{
			newContent += node[0];
		}
		lastIndex = node.index + node[0].length;
		count++;
	}

	if(lastIndex<content.length){
		newContent += content.substring(lastIndex,content.length)
	}
	return newContent;
}
function getNoteBgColor(s){
	$("#noteBgColorInput2").css("background-color","#000000");
	$("#noteBgColorInput2").val("000000")
	$("#noteBgColorInput").css("background-color","#000000");
	$("#noteBgColorInput").val("000000")
	var bgStr = "";
	if(likeGch(s,"-s-nb")||likeGch(s,"-e-nb")){
		var gch = s.a_gch;
		if(gch!=null){
			for(var i=0;i<gch.length;i++){
				var g = gch[i];
				if(g.text.indexOf("-s-nb")==0 || g.text.indexOf("-e-nb")==0){
					bgStr = g.text;
					break;
				}
			}
		}
	}
	if(bgStr!=""){
		var reg = /rgb\(.*\)/;
		var type = "short";//背景色类型（长背景色、短背景色）
		if(bgStr.indexOf("-nbl-")>-1){
			type = "long";
		}
		var matchs = bgStr.match(reg);
		if(matchs!=null){
			var bgColor = matchs[0];
			var colorStr = RGB2HEX(bgColor);
			if(type=="short"){
				$("#noteBgColorInput").val(colorStr.replace("#",""))
				$("#noteBgColorInput").css("background-color",colorStr);
			}else if(type=="long"){
				$("#noteBgColorInput2").val(colorStr.replace("#",""))
				$("#noteBgColorInput2").css("background-color",colorStr);
				
			}
		}
	}
}
//显示相关音符的属性
function showProperties(type,e,clickObj){
	if(!user.editorAnnot){
		return;
	}
	
	if(type=="deco" && selectDecoInfo!=null && $(selectDecoInfo).attr("type")=="slur"){
		return;
	}
	$("#layoutPanel").hide();
	$("#panelName").removeClass("active");
	console.log("showProperties:",type,e);
	$(".panel-body").css("display","none");
	if(type=="lyric"){
		$("#panelName").html("歌词属性");
		var content = $("#source").val();
		
		var istart = $(selectGchInfo).attr("istart");
		var lyricIstart = $(selectGchInfo).attr("lyric_istart");
		var lyricIend = $(selectGchInfo).attr("lyric_iend");
		$("#editorLyricIstart").val(lyricIstart);
		$("#editorLyricIend").val(lyricIend);
		var textStr = content.substring(lyricIstart,lyricIend);
		var reg = /\[[se]\.lb\.[^\]]*\]/;
		var bgcolor = "";
		if(reg.test(textStr)){
			bgcolor = reg.exec(textStr)[0];
			textStr = textStr.replace(reg,"");
			$("#lyricBgColor").val(bgcolor);
		}
		var text = "";
		var upText = "";
		var downText = "";
		var align = "";
		if(textStr.indexOf("[R]")==0){
			align = "[R]";
			textStr = textStr.replace("[R]","");
		}else if(textStr.indexOf("[L]")==0){
			align = "[L]";
			textStr = textStr.replace("[L]","");
		}
		if(textStr.indexOf("fmt:")>-1){
			var fmtReg = /fmt:(.[^\/]*\/.*)/;
			var matchs = textStr.match(fmtReg);
			if(matchs!=null){
				textStr = matchs[1];
				if(textStr.indexOf("/")>-1){
					//如果有/，那么/前面是文本
					text = textStr.substring(0,textStr.indexOf("/"));
					var sufStr = textStr.substring(textStr.indexOf("/")+1);//上下标字符串
					var qReg = /\((.[^\)]*)\)/;
					if(qReg.test(sufStr)){
						var node = qReg.exec(sufStr)
						downText = node[1];
						upText = sufStr.replace(node[0],"");
						if(qReg.test(upText)){
							var up = qReg.exec(upText);
							upText = up[1]
						}
					}else{
						downText = sufStr.substring(0,1);
						upText = sufStr.substring(1);
					}
					
				}
			}else{
				//如果没有/，则第一个字符是文本，第二个字符是下标，第三个字符是上标
				textStr = textStr.replace("fmt:","")
				text = textStr.substring(0,1);
				downText = textStr.substring(1,2);
				upText = textStr.substring(2);
			}
		}else{
			text = textStr;
		}
		if("[R]"==align){
			$("input[name='lyricAlign'][value='right']").prop("checked","checked");
		}else if("[L]"==align){
			$("input[name='lyricAlign'][value='left']").prop("checked","checked");
		}else{
			$("input[name='lyricAlign'][value='center']").prop("checked","checked");
		}
		$("#lyricText").val(text)
		$("#lyricTextUp").val(upText)
		$("#lyricTextDown").val(downText)
		$(".panel-body.lyricpropertyes").show();
	}else if(type=="nodeline"){
		//小节线
		$("#panelName").html("小节线属性");
		var istart = $("rect[selected='selected']").attr("istart");
		var s = syms[istart];
		if(s){
			var content = $("#source").val();
			var nodeLineStr = content.substring(s.istart,s.iend);
			if(s.bar_dotted){
				nodeLineStr = "." + nodeLineStr;
			}
			$("#nodelineType").val(nodeLineStr)
		}
		$(".panel-body.nodeline").show();
	} else if(type=="tempo"){
		$("#panelName").html("速度属性");
		$(".panel-body.speed").show();
	}else if(type=="staff"){
		$("#panelName").html("谱例属性");
		$(".panel-body.staff").show();
	}else if(type=="text"){
		$("#panelName").html("文本属性");
		$(".panel-body.text").show();
	}else  if(type=="slur"){
		$("input[name='slurdirect']").prop("checked",false);
		setSlurInfo();
		$("#panelName").html("连音线属性");
		$(".panel-body.slur").show();
	}else if(type=="note"){
		$("#panelName").html("音符属性");
		$(".panel-body.note").show();
		$("input[name='stemdirect']").prop("checked",false)
		//获取音符背景色设置
		var istart = $(e.target).attr("istart");
		var s = syms[istart];
		
		if(s){
			
			//播放选中的音start
			var ori_y = $(clickObj).attr("y");
			var ori_p = $(clickObj).parents("svg").find("text[type='hd']."+istart+",text[type='Hd']."+istart+",text[type='HD']."+istart+",text[type='note'][istart='"+istart+"']").sort(function(a,b){
				return $(b).attr("y") - $(a).attr("y");
			})
			var update_index = -1;//找到要更新的音符
			for(var i=0;i<ori_p.length;i++){
				if(parseFloat(ori_y) == parseFloat($(ori_p[i]).attr("y"))){
					update_index = i;
				}
			}
			if(s.type==8 && s.notes && update_index!=-1 && s.notes.length>update_index){
				var noteSeq = mypit2mid(s,update_index);
				if(user.playNoteChangMing){
					genNoteChangMing(s.istart,$("#source").val())
				}else{
					play_note(noteSeq,s.dur);
				}
				
			}
			//播放选中的音end
			getNoteBgColor(s);
			if(s.my_key){
				switchJiTaChord(s.my_key);
				swithchJianPu(s.my_key)
			}
			if(s.type==8 && !e.ctrlKey){
				var sDur = s.dur;
				var scObj = $(".operator_sc[dur='"+sDur+"']");
				if(scObj.length>0){
					$(".operator_sc[dur='"+sDur+"']").click();
				}else{
					//未找到整时值的，就是可能有休止符
					var matchDur = 0;
					$.each($(".operator_sc[dur]"),function(i,item){
						var itemDur = parseInt($(item).attr("dur"));
						if(itemDur <= sDur && itemDur>matchDur){
							matchDur = itemDur;
						}
					});
					console.log("matchDur:",matchDur);
					$(".operator_sc[dur='"+matchDur+"']").click();
					var remainDur = sDur - matchDur;
					var r = remainDur/matchDur;
					if(r==0.5){
						$(".dotstatus[value='3/']").click();
					}else if(r==0.75){
						$(".dotstatus[value='7//']").click();
					}
				}
			}
			
		}
		
		
		$(".stemdir").show();
		$(".notemove").show();
		if(musicType==2){
			//简谱
			$(".stemdir").hide();
			$(".notemove").hide();
		}
	}else if(type=="deco"){
		$("#panelName").html("属性");
		$('input[type="radio"][name="decodirect"]').prop("checked","")
		
		$(".panel-body.deco").show();
	}else if(type=="gch"){
		
		$("#panelName").html("属性");
		$('input[type="radio"][name="gchdirect"]').prop("checked","")
		$("#gchText").val($(selectGchInfo).html())
		$("#gchText").attr("ori_val",$(selectGchInfo).html())
		var istart = $(selectGchInfo).attr("istart");
		$("#zsistart").val(istart);
		var s = syms[istart];
		if(s){
			var gchText = getGch(s,$(selectGchInfo).html())
			getGchCoorInfo(gchText)
			var fs = "14";
			if(gchText.indexOf("[font-size:")>-1){
				var fontsizeset = /\[(font-size:.*)\]/.exec(gchText);
				if(fontsizeset!=null){
					fs = /\[font-size:(.*)\]/.exec(gchText)[1];
				}
			}
			if(fs && fs!=""){
				$("#gchfontsize").val(fs);
			}
			var gch = s.a_gch;
			var pos="^";
			var fontType= "";
			if(gch){
				for(var i=0;i<gch.length;i++){
					if(gch[i].text==gchText){
						pos = gch[i].type;
						fontType = gch[i].fonttype;
					}
				}
			}
			if(pos==""){
				pos="^";
			}
			$("input[name='gchdirect'][value='"+pos+"']").prop("checked","checked");
			if(fontType == "∆"){
				$("input[name='gchfonttype'][value='∆']").prop("checked","checked");
			}else{
				$("input[name='gchfonttype'][value='']").prop("checked","checked");
			}
		}
		var gch_istart = $(selectGchInfo).attr("gch_istart");
		$("rect[istart='"+gch_istart+"']").remove();
		$(selectGchInfo).attr("ori_x",$(selectGchInfo).attr("x"))
		$(selectGchInfo).attr("ori_y",$(selectGchInfo).attr("y"))
		
		var parent = $(selectGchInfo).parent();
		var pParent = $(parent).parent();
		$(pParent).append(parent);
		
		
		$(".panel-body.gch").show();
		return true;
	}else if(type=="rest"){
		$("#panelName").html("休止符属性");
		//反向设置时值
//		var istart = $(e.target).attr("istart");
//		var s = syms[istart];
//		if(s){
//			var sDur = s.dur;
//			var scObj = $(".operator_sc[dur='"+sDur+"']");
//			if(scObj.length>0){
//				$(".operator_sc[dur='"+sDur+"']").click();
//			}
//		}
		$('input[type="radio"][name="restsh"]').prop("checked","")
		$(".panel-body.rest").show();
	}else if(type=="bar"){
		$("#panelName").html("小节属性");
		$("#barBgColorInput").val("000000");
		$("#barBgColorInput").css("background-color","rgb(0, 0, 0)");
		$("input[name='barrestsh']").prop("checked",false);
		getNodeBgColor();
		$(".panel-body.bar").show();
	}
	
//	console.log("event:",event)
//	event.cancelBubble = true;
//	event.stopPropagation()
	if(type=="staff"){
		$("#layoutPanel").show();
		$("#panelName").addClass("active");
		return;
	}
	e = e || window.event
	// 禁止事件冒泡
	if (e && e.stopPropagation) {
		e.stopPropagation();
	} else {
		window.event.cancelBubble = true;
	}
}
function getNodeBgColor(){
	var index = parseInt($("#nodeMenu").attr("barIndex"));
	var lines = getNodesInfo($("#source").val());
	for(var i=0;i<lines.length;i++){
		var line = lines[i];
		if(line.type=="note"){
			var nodes = line.nodes;
			for(var j=0;j<nodes.length;j++){
				var node = nodes[j];
				if(node.nodeIndex==index){
					var nodeStr = node.nodeStr;
					//"-mb-rgb(46,53,255)"
					var reg = /(rgb\(.[^\)]*\))/;
					var match = nodeStr.match(reg);
					if(match!=null){
						var color = match[1];
						var colorStr = RGB2HEX(color);
						barBgColorInput
						$("#barBgColorInput").val(colorStr.replace("#",""));
						$("#barBgColorInput").css("background-color",colorStr);
						
						return;
					}
				}
			}
		}
	}
}
//设置装饰音方向
function setDecoStemDirect(dir){
//	dynamic for dynamic decorations (crescendo, diminuendo..)
//	gchord for chord information
//	gstem for stem direction of grace notes
//	ornament for ornament decorations (mordent, trill..)
//	stem for stem direction
//	tuplet for tuplet direction (abc2svg only)
//	vocal for the words under the staff
//	volume for the volume decorations (!p!, !fff!...)
	var deco = $("[cat='decos'][selected='selected'],.selected_text[cat='decos']");
	var decoType = $(deco).attr("type");
	var decoText = "";
	if($(deco).hasClass("fng")){
		//指法特殊处理
		decoText = decoType + "";
		decoType = "fng";
	}
	var decoText = $(deco)
	var istart = parseInt($(deco).attr("istart"));
	var s = syms[istart];
	var decoIstart = -1;
	var decoIend = -1;
	if(s){
		var arr = getA_ddInfo(s,decoType);
		if(arr.length==1){
			var decoInfo = arr[0];
			decoIstart = decoInfo.istart;
			decoIend = decoInfo.iend;
		}else if(arr.length>1){
			for(var i=0;i<arr.length;i++){
				var decoInfo = arr[i];
				if(decoInfo.str == decoText){
					decoIstart = decoInfo.istart;
					decoIend = decoInfo.iend;
				}
			}
		}
	}
//	if(decoType=="img"){
//		var content = $("#source").val();
//		content = content.substring(0,decoIstart)+"[I:pos orn "+dir+"]"+content.substring(decoIend);
//		$("#source").val(content);
//		src_change();
//		doLog();
//		return;
//	}

	var reverseDir = "up";
	if(dir=="up"){
		reverseDir = "down";
	}
	var pos = "[I:pos type " + dir + "]";
	var reversePos = "[I:pos type " + reverseDir + "]";
	var autoPos = "[I:pos type auto]";
	switch (decoType) {
		case "p":
		case "pp":
		case "ppp":
		case "pppp":
		case "f":
		case "ff":
		case "fff":
		case "ffff":
		case "mp":
		case "mf":
		case "sf":
		case "sfz":
		case "sfp":
		case "fp":
		case "fz":
		case "rit":
		case "accel":
			pos = pos.replace("type","vol");
			reversePos = reversePos.replace("type","vol");
			autoPos = autoPos.replace("type","vol");
			break;
		case "dnb":
		case "invertedturn":
		case "hld":
		case "marcato":
		case "wedge":
		case "accent":
		case "stc":
		case "emb":
		case "opend":
		case "umrd":
		case "lmrd":
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "img":
			pos = pos.replace("type","orn");
			reversePos = reversePos.replace("type","orn");
			autoPos = autoPos.replace("type","orn");
			break;
		case "jq":
		case "jr":
			istart = $(deco).attr("start")
			pos = pos.replace("type","dyn");
			reversePos = reversePos.replace("type","dyn");
			autoPos = autoPos.replace("type","dyn");
			break;
		case "slur":
		
			break;
	}
	var content = $("#source").val();
	var newContent = "";
	var preIstart = -1;
	for(var i = istart-1;i>0;i--){
		var s = syms[i];
		if(s){
			preIstart = s.istart;
		}
	}
	var subStr = content.substring(preIstart,istart);
	subStr = subStr.replace(reversePos,"").replace(pos,"").replace(autoPos,"");
	var newContent = content.substring(0,preIstart) + subStr + pos + content.substring(istart);
	$("#source").val(newContent);
	src_change();
	doLog();
}
//显示隐藏休止符
function switchRestShow(val){
	if(val=="hide"){
		var deco = $(".selected_text[type^='r']");
		var istart = $(deco).attr("istart");
		var s = syms[istart];
		if(s){
			var content = $("#source").val();
			var restStr = content.substring(s.istart,s.iend);
			var newContent = content.substring(0,s.istart)+restStr.replace("z","x")+content.substring(s.iend);
			$("#source").val(newContent);
			src_change();
			doLog();
		}
	}
	
}
//获取副属三和弦
function getF3ChordString(level,key){
	return f3_chord[key][level];
}
/**
 * 取和弦值
 * category:类型（3：三和弦，7：七和弦）,
 * chord:类型：yuanwei：原位, zhuangwei1:第一转位,  zhuangwei2：第二转位 -hsdd：和声大调, -zrxd:自然小调， -hsxd:和声小调
 * level:级别：第1-7级，对应I,II,III,IV,V,VI,VII
 * key:调号
 */
function gen37ChordString(category,chord,level,key){
	//副属三和弦
	if("f3"==category){
		var val = getF3ChordString(level,key);
		//取到该调号原来的升降音配置
		var keyChangeNotes = getModeChangeNote(key);
		
		return val;
	}
	//根音为调号对应的音，如果有升降调则去掉升降号
	//3和弦： 三和弦(Triad)的构成是由三个音按三度叠置而成的一种和弦,或称“三和音”
	//	根音：和弦最下面的音。这个音是和弦的基础，在和弦的原始排列中处于最低位置。
	//	三音：根音上的三度音。在三和弦的原始排列中处于中间位置。
	//	五音：根音上的五度音称为五音。在三和弦的原始排列中处于最高位置。
	//原位，以根音为最低音的和弦叫原位和弦，后面每个3度关系  例：C（根音）E（三音）G（五音）
	//第一转位（6和弦）以三音为最低音,三音与根音（最高音）的关系 是6度关系 所以叫6和弦
	//第二转位（46和弦）以五音做最低音，最低音的五音与根音的关系是四度，而三音与五音的关系是六度，因此得名46和弦
	//7和弦：七和弦的构成是由四个音按三度叠置而成的一种和弦，其显著特点是 根音（最低音）与冠音（最高音）音相距为七度，故名七和弦，七和弦共有七类，其不协和性及紧张度来自七音。
	//原位（71和弦，1可省略），以根音为最低位，  例：C（根音）E（三音）G（五音）B(七音) 原位七和弦的低音与根音是同一个音，纯一度，低音与七音的关系是7度。
	//第一转位(56和弦)，是以三音为最低音，低音与根音的关系是6度，低音与七音的关系是5度。它的第一转位叫做“五六和弦”
	//第二转位(34和弦)，以原五音为最低音，低音与根音的关系是4度，低音与七音的关系是3度。
	//第三转位(21和弦，1可省略) 以七音为最低音，低音与根音的关系是2度，低音与七音是同一个音，即纯一度。
	
	//和声大调：和声大调是把自然大调的第六级音降低一个半音（这里要注意如果有些调号对应的第6个音正好本来就是升的，就要变成还原,如果原来就有降号的，就要变成重降），其调式音阶的结构为：“全音、全音、半音、全音、半音、增二度、半音” C D E F G _A B c (2 2 1 2 1 3 1)
	
	var bot = 40;// 低音谱号最低线上的音
	var top = 60;// 低音谱号最高线上的音
	var notes = [
		"C,,", "D,,", "E,,", "F,,", "G,,", "A,,", "B,,",
		"C,", "D,", "E,", "F,", "G,", "A,", "B,",
		"C", "D", "E", "F", "G", "A", "B"];
	var pitchs = [36, 38, 40, 41, 53, 45, 47, 48, 50, 52, 53, 55, 57, 59, 60, 62, 64, 65, 67, 69, 71];
	var startIndex = -1;
	if(key!=""){
		//根据调号取到根音的序号
		startIndex = notes.indexOf(key.substring(0,1)+",")
	}
	var chordKeyType = "";//空值默认值为自然大调，hsdd：和声大调(从startIndex开始第六个音降半音，跟转位没有关系), zrxd:自然小调， hsxd:和声小调
	
	if(chord.split("-").length>1){
		chordKeyType = chord.split("-")[1];
	}
	//和声大调的处理  start----- 
	//处理规则:1.先找出对应的调号和声大调中需要降半音的音符，2.到各调号升降配置表中查到需要降半音的音符是否有在配置表中，如果有，需要特殊处理，原来是升的音，降半音变成还原符号，原来是降的音再降半音变成重降号
	var hsddNote = "";//和声大调需要降半音的音符
	var hsddPreStr = "_";//和声大调第6个音降半音
	if(chordKeyType=="hsdd"){
		hsddNote = notes[startIndex+5].replace(",","");//找到和声大调需要降半音的音符,第6个音，实际上是加5
		//查找对应的调号是否有包含该音符，如果有，那么如果是升号，降半音就变成还原号
		var keyInfo = getModeChangeNote(key);
		if(keyInfo.type=="up" && keyInfo.val.indexOf(hsddNote)>-1){
			//在相关的调号中，原来就是升的音，降半音，变成还原号
			hsddPreStr = "=";
		}else if(keyInfo.type=="down" && keyInfo.val.indexOf(hsddNote)>-1){
			//在相关的调号中，原来就是降的音，降半音，变成重降
			hsddPreStr = "__";
		}
	}
	//和声大调处理----end
	
	//自然小调处理，自然大调的序号-2 *********start
	//自然小调 是相对于大调而言的，现代音乐两种主要调式之一。
	//例如以自然C大调音阶C的音级下方小三度的音级a（la）为主音，并以此排列成的一个八度音阶，每个音之间的音程大小，依序为 “ 全音-半音-全音-全音-半音-全音-全音”
	//
	if(chordKeyType=="zrxd"){
		startIndex -=2;
	}
	//自然小调处理----end
	
	//和声小调处理----start
	//在自然小调里面只要把第七级音升高半个音就是“和声小调”,
	//处理规则：1.先找出对应的调号和声小调中需要升半音的音符，2.到各调号升降配置表中查到需要升半音的音符是否有在配置表中，如果有，需要特殊处理，原来是升的音，升半音变成重升符号，原来是降的音升半音变成还原号
	var hsxdNote = "";//和声小调需要升半音的音符
	var hsxdPreStr = "^";//和声小调第7个音升半音
	if(chordKeyType=="hsxd"){
		startIndex -=2;
		hsxdNote = notes[startIndex+6].replace(",","");//找到和声大调需要降半音的音符,第7个音，实际上是加6
		//查找对应的调号是否有包含该音符，如果有，那么如果是升号，降半音就变成还原号
		var keyInfo = getModeChangeNote(key);
		if(keyInfo.type=="up" && keyInfo.val.indexOf(hsxdNote)>-1){
			//在相关的调号中，原来就是升的音，升半音，变成重升
			hsddPreStr = "^^";
		}else if(keyInfo.type=="down" && keyInfo.val.indexOf(hsxdNote)>-1){
			//在相关的调号中，原来就是降的音，升半音，变成还原
			hsddPreStr = "=";
		}
	}
	//和声小调处理完成---end
	startIndex += parseInt(level)
	var note1AddPitch = 0;//在第一二三转位时，根音升高8度
	var note3AddPitch = 0;//在第二三转位时，三音升高8度
	var note5AddPitch = 0;//在第三转位时，五音升高8度,七音不存在升高8度的情况
	
	if(chord.indexOf("yuanwei")==0){
		//原位
	}else if(chord.indexOf("zhuangwei1")==0){
		//第一转位
		note1AddPitch = 7;
	}else if(chord.indexOf("zhuangwei2")==0){
		//第二转位
		note1AddPitch = 7;
		note3AddPitch = 7;
	}else if(chord.indexOf("zhuangwei3")==0){
		//第三转位
		note1AddPitch = 7;
		note3AddPitch = 7;
		note5AddPitch = 7;
	}
	//音区大于71
	while((startIndex+6)>20
			|| (startIndex + note1AddPitch)>20
			|| (startIndex + note3AddPitch + 2)>20
			|| (startIndex + note5AddPitch + 4)>20){
		startIndex -= 7;
	}
	
	var note1 = notes[startIndex + note1AddPitch];//第1个音
	var note3 = notes[startIndex + note3AddPitch + 2];//第2个音
	var note5 = notes[startIndex + note5AddPitch + 4];//第3个音
	var note7 = "";//第4个音（7和弦才有）
	
	
	var noteCount = 3;
	var pitch1 = pitchs[startIndex + note1AddPitch];
	var pitch3 = pitchs[startIndex+ note3AddPitch + 2];
	var pitch5 = pitchs[startIndex + note5AddPitch + 4];
	var pitch7 = pitchs[startIndex+6];
	var totalPitch = pitch1 + pitch3 + pitch5;
	if(category==7){
		//7和弦
		noteCount = 4;
		totalPitch += pitch7;
	}
	
	var avgPitch = totalPitch/noteCount;//平均音高
	var down8 = "";
	if(avgPitch > top){
		//整体太高（平均音高在低音谱号的五线外），调低8度
		down8 = ",";
	}else{
		//如果在低音谱号的五线内，但是降低8度后，仍然在低音谱号的五线内，且更多的音符大低音谱号的五线内，则选降低8度的
		var botAvgPitch = avgPitch - 12;
		if((botAvgPitch-bot)>=(top-avgPitch)){
			down8 = ",";
		}
	}
	
	if(category==7){
		note7 = notes[startIndex + 6] + down8;//第4个音（7和弦才有）
	}
	
	var result = "";
	if(chord.indexOf("yuanwei")==0){
		//135(7)
		result = note1 + down8 + note3+ down8 + note5+ down8+ note7;
	}else if(chord.indexOf("zhuangwei1")==0){
		//35(7)1
		result =  note3+ down8 + note5+ down8+ note7+note1 + down8;
	}else if(chord.indexOf("zhuangwei2")==0){
		//5(7)13
		result =  note5+ down8+ note7+note1 + down8+note3+ down8;
	}else if(chord.indexOf("zhuangwei3")==0){
		//7135
		result =  note7+note1 + down8+note3+ down8+note5+ down8;
	}
	//和声大调的处理----start
	if(hsddNote!=""){
		result = result.replace(hsddNote,hsddPreStr + hsddNote);
	}
	//和声大调的处理----end
	//和声小调的处理---start
	if(hsxdNote!=""){
		result = result.replace(hsxdNote,hsxdPreStr + hsxdNote);
	}
	//和声小调的处理---end
	
	//console.log(result);
	
	return result;
}
/**
 * 测试37和弦
 * @param chordKeyType 自然大调传空值"" ,和声大调hsdd，自然小调zrxd,和声小调hsxd
 * @param key
 * @returns
 */
function test37(chordKeyType,key){
	
		$.each($("#chordLevel option"),function(j,levelItem){
			var arr = [];
			var level = parseInt($(levelItem).attr("level"))-1;//I II III IV V
			var yw = "yuanwei";
			var zw1 = "zhuangwei1";
			var zw2 = "zhuangwei2";
			var zw3 = "zhuangwei3";
			if(chordKeyType!=""){//hsdd、zrxd、hsxd
				yw += "-"+chordKeyType;
				zw1 += "-"+chordKeyType;
				zw2 += "-"+chordKeyType;
				zw3 += "-"+chordKeyType;
			}
			arr.push(gen37ChordString(3,yw,level,key));
			arr.push(gen37ChordString(3,zw1,level,key));
			arr.push(gen37ChordString(3,zw2,level,key));
			
			arr.push(gen37ChordString(7,yw,level,key));
			arr.push(gen37ChordString(7,zw1,level,key));
			arr.push(gen37ChordString(7,zw2,level,key));
			arr.push(gen37ChordString(7,zw3,level,key));
			console.log(arr[0]+"\n"+arr[1]+"\n"+arr[2]+"\n"+arr[3]+"\n"+arr[4]+"\n"+arr[5]+"\n"+arr[6]+"\n"+$(levelItem).attr("type")+"级**********************")
		})
		console.log("----------------------------")
	
}
/**
 * 传入调号和音符组合，获取相应的三和弦或七和弦名称
 * @param key 调号
 * @param noteStr 音符字符串
 * @param chordKeyType 自然大调传空值"" ,和声大调hsdd，自然小调zrxd,和声小调hsxd
 * @returns
 */
function getChordLyric(key,noteStr,chordKeyType){
	if(!chordKeyType){
		chordKeyType = "";
	}
	console.log("noteStr",noteStr)
	var luoma = ["Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ","Ⅵ","Ⅶ"];
	var noteReg = /[a-gA-G]/g;
	var matchs = noteStr.match(noteReg);
	var noteLen = 0;
	if(matchs!=null){
		noteLen = matchs.length;
	}
	for(var i=0;i<7;i++	){
		var level = i;
		var yw = "yuanwei";
		var zw1 = "zhuangwei1";
		var zw2 = "zhuangwei2";
		var zw3 = "zhuangwei3";
		if(chordKeyType!=""){//hsdd、zrxd、hsxd
			yw += "-"+chordKeyType;
			zw1 += "-"+chordKeyType;
			zw2 += "-"+chordKeyType;
			zw3 += "-"+chordKeyType;
		}
		var result = "";
		if(noteLen==3){
			result = gen37ChordString(3,yw,level,key);
			if(result==noteStr){
				return luoma[i]+chordCategorySetting[3][yw.split('-')[0]];
			}
			result = gen37ChordString(3,zw1,level,key)
			if(result==noteStr){
				return luoma[i]+chordCategorySetting[3][zw1.split('-')[0]];
			}
			result = gen37ChordString(3,zw2,level,key)
			if(result==noteStr){
				return luoma[i]+chordCategorySetting[3][zw2.split('-')[0]];
			}
		}else if(noteLen==4){
			result = gen37ChordString(7,yw,level,key)
			if(result==noteStr){
				return luoma[i]+chordCategorySetting[7][yw.split('-')[0]];
			}
			result = gen37ChordString(7,zw1,level,key)
			if(result==noteStr){
				return luoma[i]+chordCategorySetting[7][zw1.split('-')[0]];
			}
			result = gen37ChordString(7,zw2,level,key)
			if(result==noteStr){
				return luoma[i]+chordCategorySetting[7][zw2.split('-')[0]];
			}
			result = gen37ChordString(7,zw3,level,key)
			if(result==noteStr){
				return luoma[i]+chordCategorySetting[7][zw3.split('-')[0]];
			}
		}
		
		
		
	}
}

//传入调号和音符组合，获取相应的三和弦或七和弦名称
//function getChordLyric(key,noteStr){
//	var luoma = ["Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ","Ⅵ","Ⅶ"];
//	var numType = "";//3、7和弦类型
//	var cType = "";//原位转位类型
//	var levelType = -1;//级别
//	for(var num in chord_setting){
//		for(var type in chord_setting[num]){
//			var arr = chord_setting[num][type][key];
//			for(var i=0;i<arr.length;i++){
//				if(arr[i]==noteStr){
//					numType = num;
//					cType = type;
//					levelType = i;
//				}
//			}
//		}
//	}
//	if(levelType==-1){
//		return "";
//	}
//	return luoma[levelType]+chordCategorySetting[numType][cType];
//}
/**
 * 增加时值
 * @param flag -1减半 1加倍
 * @returns
 */
function noteDurMove(flag){
	if($(".selected_text").length>0 || $(".select_text_g").length>0){
//		有选中的待更新的音符
		var istart = -1;
		if($(".selected_text").length>0){
			istart = $(".selected_text").attr("istart");
		}else if($(".select_text_g").length>0){
			istart = $("g[istart]").attr("istart");
		}
		if(istart==-1){
			return false;
		}
		var s = syms[istart];
		var content = $("#source").val();
		update_note_index = 0;
		update_note_istart = istart;
		var oldNoteStr = content.substring(s.istart,s.iend);
		
		var newDur = s.dur;
		if(flag == -1){
			newDur = newDur/2;
		}else if(flag==1){
			newDur = newDur*2;
		}
		var ulen = s.my_ulen;
		if(!ulen){
			ulen = s.p_v.ulen;
		}
		var newNoteStr = oldNoteStr.replace(/[\/\d]/g,"")+getDurStrByNoteDur(newDur,ulen);
		console.log("newNoteStr:",newNoteStr);
		var newContent = content.substring(0,s.istart) + newNoteStr + content.substring(s.iend);
		$("#source").val(newContent);
		src_change();
		doLog();
		return true;
	}
}

function eqs(val,val2){
	var strs = val.split(",");
	if(strs.indexOf(val2)>-1){
		return true;
	}
	return false;
}
//note转频率
function midiNoteToFrequency (note) {
    return Math.pow(2, ((note - 69) / 12)) * 440;
}

//取json数据给阎二乐
function getStandData_Test() {
	var cms = ["do","re","mi","fa","sol","la","si"]
	//var cms = ["doe","ray","me","far","sew","la","sea"]
	var standArr = getNoteData();
	if (standArr == undefined || standArr.length == 0) {
		return '';
	}

	var arr = [];
	var delayTime = editSplnum.delay.time;
		// 如果有拍子
		standArr.forEach(function(item) {
			if (item[1] >= delayTime && item[0] > -1) {
				var json = {};
				json.time = (item[1] - delayTime).toFixed(6);
				json.pitch = item[3];
				json.dur = item[4];
				var istart = item[0];
				var s = syms[istart];
				if(s){
					var a_dd = s.a_dd;
					if(a_dd!=null){
						for(var i=0;i<a_dd.length;i++){
							var dd = a_dd[i];
							if(cms.indexOf(dd.glyph)>-1){
								json.lyric = dd.glyph;
								break;
							}
						}
					}
				}
				arr.push(json);
			}
		})
	return JSON.stringify(arr);
}
//取唱名
function getStandData_Test3() {
	var cms = ["doe","ray","me","far","sew","la","sea"]
	var standArr = getNoteData();
	if (standArr == undefined || standArr.length == 0) {
		return '';
	}

	var arr = [];
	var str = "";
	var delayTime = editSplnum.delay.time;
		// 如果有拍子
		standArr.forEach(function(item) {
			if (item[1] >= delayTime && item[0] > -1) {
				var json = {};
				json.time = (item[1] - delayTime).toFixed(6);
				json.pitch = item[3];
				json.dur = item[4];
				var istart = item[0];
				var s = syms[istart];
				if(s){
					var a_dd = s.a_dd;
					if(a_dd!=null){
						for(var i=0;i<a_dd.length;i++){
							var dd = a_dd[i];
							if(cms.indexOf(dd.glyph)>-1){
								json.lyric = dd.glyph;
								str += dd.glyph + " ";
								break;
							}
						}
					}
				}
				arr.push(json);
			}
		})
	return str;
}
//取json数据给阎二乐
function getStandDataWithLyric_Test2() {
	var cms = ["do","re","mi","fa","sol","la","si"]
	var standArr = getNoteData();
	if (standArr == undefined || standArr.length == 0) {
		return '';
	}

	var arr = [];
	var delayTime = editSplnum.delay.time;
		// 如果有拍子
		standArr.forEach(function(item) {
			if (item[1] >= delayTime && item[0] > -1) {
				var json = {};
				json.time = (item[1] - delayTime).toFixed(6);
				json.pitch = item[3];
				json.dur = item[4];
				var istart = item[0];
				var s = syms[istart];
				if(s){
					var a_ly = s.a_ly;
					if(a_ly!=null){
						for(var i=0;i<a_ly.length;i++){
							var ly = a_ly[i];
							if(ly){
								json.lyric = ly.t.replace(/\[.*\]/,"").replace(/\d/g,"").replace(/\./,"");
								break;//只取一个歌词，后面如果要多个歌词，需要优化
							}
						}
					}
				}
				arr.push(json);
			}
		})
	return JSON.stringify(arr);
}
//获取第一个音符的位置
function getFirstNoteSeq(){
	for(var i=0;i<syms.length;i++){
		var s = syms[i];
		if(s){
			if(s.type && (s.type==0 || s.type==8 || s.type==10)){
				return s.istart;
			}
		}
	}
	return -1;
}
//显示隐藏速度
function switchSpeedShow(type){
	var content = $("#source").val();
	if(type=="show"){
		content = content.replace(/%%hiddenspeed.*\n/g,"");
	}else if(type="hide"){
		content = content.replace(/%%hiddenspeed.*\n/g,"");
		content = "%%hiddenspeed\n"+content;
	}
	$("#source").val(content);
	doLog();
	src_change();
}
/**
 * 播放单个音符
 * 
 * noteIndex:音符索引号，C0为12开始
 * 
 * L:节拍单位 Q:速度单位 Q_V：速度值， tone 音色
 */
function play_one_note(noteIndex, L, Q, Q_V, dur, tone){
	var d = toFloat(L)/toFloat(Q)/toFloat(Q_V)*60;
	if(dur && dur>0){
		d = dur;
	}
	var notearr = [];
	var notes = new Float32Array(7);
	notes[0]=-1;// 这个参数决定谱面上哪个高亮
	notes[1]=0;
	notes[2]= tone || 0;
	notes[3]=noteIndex;
	notes[4]=d;
	notes[5]=1;
	notes[6]=0;
	notearr[0] = notes;
	play_one(notearr);
}

/**
 * 单音播放
 * @param sourceId
 * 
 * @param istart
 * 
 * @param options
 * @returns
 */
function playOneNoteByIstart( options ){
	options = $.extend({
		sourceId: 'source',
		istart: '',
		noteData: null
	}, options);
	
	var istart = options.istart;
	var noteData = options.noteData;
	if( noteData == null){
		noteData = getNoteData();
	}
	
	var abcContent = $("#" + options.sourceId).val(); 
	var l = getL(abcContent);
	var staffInfo = getStaffInfo(options.sourceId);
	
	var note;
	var noteIndex;
	for (var i = 0, len = noteData.length; i < len; i++) {
		note = noteData[i];
		if( note[0] == istart){
			noteIndex = note[3];
			play_one_note(noteIndex, l, staffInfo.speed.meter.top + "/" + staffInfo.speed.meter.bot, staffInfo.speed.val, null, note[2]);
			break;
		}
	}
	if( !noteIndex){
		console.error("单音播放失败，找不到对应的数据，可能是休止符", options);
	}
}
/**
 * 取到当前音符和上一个音符之间的字符串
 * @param s
 * @returns
 */
function getMidStr(s){
	var preS = s.prev;
	if(preS && (preS.type==8 ||preS.type==0 || preS.type==10)){
		var preIend = preS.iend;
		var curIstart = s.istart;
		var midStr = $("#source").val().substring(preIend,curIstart);
		return midStr;
	}
	return "";
}
/**
 * 判断是否需要评分，返回none不需要评分,rhythm只需要评节奏分，all需要评所有维度的分
 * feeling 乐感
 * whole 整体性
 * rhythm 节奏
 * pitch 音准
 * @param istart
 * @returns
 */
function checkScorePitch(istart){
	console.log(istart);
	var s = syms[istart];
	if(!s.a_ly){//在没有歌词的情况下，不需要评音高分和节奏分
		return "none";
	}
	if(s.a_stk){//有相声词的情况，不需要评音高分,需要评节奏分
		return "rhythm,whole,feeling";
	}
	if(s.is_ext || s.is_ext2){//扩展音符，不需要评音高分,需要评节奏分
		return "rhythm,whole,feeling";
	}
	return "all";
}
//取到音符对应的midi序号
function mypit2mid(s, i) {
	var transp = new Int8Array(1);
	var cmaps = [0];
	var map= [0];
	for(var k=0;k<128;k++){
		map[k] = 0;
	}
	var temper;
	var scale = new Uint8Array([0, 2, 4, 5, 7, 9, 11]);
	if(!s.notes){
		return -1
	}
    var note = s.notes[i],
    p = note.apit + 19,
    a = note.acc;
    if (transp[s.v]) p += transp[s.v];
    if(a==0){
    	
    }else{
    	if (a) {
            if (a == 3) a = 0;
            else if (note.micro_n) a = (a < 0 ? -note.micro_n: note.micro_n) / note.micro_d * 2;
            map[p] = a
        } else {
            a = map[p]
        }
    }
    p = (p / 7 | 0) * 12 + scale[p % 7] + a;
    if(typeof s.octave!= "undefined"){//add by hxs
    	p = p + s.octave*12;
    }
    if (!temper || a | 0 != a) return p;
    return p + temper[p % 12]
}
//生成唱名abc,并处理好反复，用于提交给厦大生成唱名mp3
function genChangMingAbc(content){
	var startIstart = -1;
	var ae = getNoteData();
	var preContent = "";
	var staffContent = "";
	var lyricContent = "w:";
	var rel = ["","doe", "ray", "me", "far", "sew", "la", "sea"];
	if(ae!=null){
		var lastKey = "";
		var lastTempo = -1;
		var inTuplet = 0;
		for(var i=0;i<ae.length;i++){
			var istart = ae[i][0];
			var s = syms[istart];
			if(startIstart==-1){
				
				startIstart = istart;
				if(s.grace){
					//startIstart--;
					preContent = content.substring(0,startIstart);
					preContent = content.substring(0,preContent.lastIndexOf("{"));
				}else{
					preContent = content.substring(0,startIstart);
				}
				//弱起小节，要补全，否则生成会错乱
				if(has_weak_node && s){
					var addDur = 1536*s.my_meter[0].top/s.my_meter[0].bot - weak_node_dur
					var lenStr = getDurStrByNoteDur(addDur,s.my_ulen);
					preContent = preContent + "z"+lenStr;
				}
			}
			
			if(s){
				
				if(s.grace){
					continue;//暂时不处理倚音
				}
				var noteStr = content.substring(s.istart,s.iend);
				
				var lenStr = "";
				if(s.in_tuplet){
					//是N连音的一部分
					var tupletStr = content.substring(s.istart-2,s.istart);
					if(/\(\d/.exec(tupletStr)){
						noteStr = tupletStr + noteStr;
					}
				}else{
					if(noteStr.indexOf("-")>-1){
						//
					}else{
						noteStr = noteStr.replace(/[\{\}\(\)]/g,"").replace(/\d/g,"").replace(/[/]/g,"");
						lenStr = getDurStrByNoteDur(s.dur,s.my_ulen);
						if(lenStr=="1"){
							lenStr = "";
						}
					}
				}
				
				
				
				noteStr = noteStr + lenStr;
				if(s.type==8 ||s.type==10){
					if(lastKey!="" && lastKey!=s.my_key){
						//变调
						staffContent += "[K:"+s.my_key+"]"
					}
					if(lastTempo!=-1 && lastTempo!=s.my_tempo){
						//变速
						var sp = decimalsToFractional(s.my_tempo_notes[0]/1536)
						staffContent += "[Q:"+sp +"="+ s.my_tempo+"]"
					}
				}
				staffContent += noteStr;
				
				if(s.next && s.next.type==0){
					staffContent += "|"; 
				}
				
				var tieLyric = "";
				if(s.tie_s){
					
					var ts = s.tie_s;
					while(ts){
						
						staffContent += content.substring(ts.istart,ts.iend).replace(/[\{\}\(\)]/g,"");
						if(ts.next && ts.next.type==0){
							staffContent += "|"; 
						}
						tieLyric += "* ";
						ts = ts.tie_s;
					}
				}
				
				if(s.type==8){
					if(s.slur_istart){
						lyricContent += "* ";
					}else{
						var skey = s.my_key;
						var kv = s.my_k_sf;
						var num = getSimpleNameByKAndStaff(keyTransfer[kv].value,noteStr.replaceAll(/[\/0-9\(\)\-]/,""),content);
						var lyric = rel[parseInt((num+"").replaceAll(/[\,\=\^\_\']/,""))];
						lyricContent += lyric +" " + tieLyric;
					}
				}
				
				if(s.type==8 || s.type==10){
					lastKey = s.my_key
					lastTempo = s.my_tempo
				}
			}
		}
	}
	var result = preContent + staffContent + "\n" + lyricContent + "\n";
	return result;
}
//生成唱名-调用厦大的方法
function genChangMing(){
	var content = $("#source").val();
	var staffInfo = getStaffInfo()
	if(staffInfo.vocalCount>1){
		console.log("大于一个声部的无法生成唱名")
		return;
	}
	var content = genChangMingAbc(content);
	sendChangMingContent2Server(content)
	
}
function sendChangMingContent2Server(content,info){
	var pathName=window.document.location.pathname;
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1); 
    $.ajax({
        url:projectName + '/genChangMing',
        dataType:'json',
        type:'POST',
        async: false,
        data: {"abcContent":content,"info":info},
        success: function(data){
            if(data && data.indexOf("失败")>-1){
            	window.top.alert(data)
            }
        },
        error:function(response){
            console.log(response);
        }
    });
}
//生成单个音符的唱名
function genNoteChangMing(istart,content){
	var lines = getLinesInfo(content);
	var preContent = "";
	for(var i=0;i<lines.length;i++){
		var line = lines[i];
		if(line.type=="note"){
			break;
		}
		preContent += line.lineStr + "\n";
	}
	var s = syms[istart];
	
	var rel = ["","doe", "ray", "me", "far", "sew", "la", "sea"];
	var noteStr = content.substring(s.istart,s.iend);
	noteStr = noteStr.replace(/[\{\}\(\)]/g,"").replace(/\d/g,"").replace(/[/]/g,"");
	lenStr = getDurStrByNoteDur(s.dur_orig,s.my_ulen);
	var skey = s.my_key;
	var kv = s.my_k_sf;
	var num = getSimpleNameByKAndStaff(keyTransfer[kv].value,noteStr.replaceAll(/[\/0-9\(\)\-]/,""),content);
	var lyric = rel[parseInt((num+"").replaceAll(/[\,\=\^\_\']/,""))];
	preContent = preContent + "\n" + "z//"+noteStr+lenStr + "z//\nw:"+lyric;
	var cmContent = replaceBlankLine(preContent);
	console.log(cmContent);
	
	var info = "";//存到attachname里的包括：音符_调号_速度_时值
	info += noteStr;//音符
	info += "_" + s.dur_orig;//时值，这里用这个是因为有些N连音换算有问题
	info += "_" + s.my_k_sf;//调号
	info += "_" + s.my_tempo;//速度
	console.log("info",info)
	//var url = file_server_url + "/findByAttachName?time="+(new Date()).getTime();
	var url = "https://file.ixzds.com/file/findByAttachName?time="+(new Date()).getTime();
	$.ajax({
        url:url,
        dataType:'json',
        type:'POST',
        async: false,
        data: {"ATTACHNAME":info},
        success: function(data){
            console.log(data);
            if(data.code==0){
            	//未找到数据，生成
            	sendChangMingContent2Server(cmContent,info)
            }else if(data.code==1){
            	//已找到数据，播放
            	var mp3Url = data.data[0].ATTACHURL;
            	var mp3 = new Audio(mp3Url);  // 创建音频对象
            	mp3.play(); // 播放
            }
        },
        error:function(response){
            console.log(response);
        }
    });
	
	
	//
}
/**
 * 获取谱子原始的key的偏移值(这个配合piano.js里面的keyTransfer的配置，可取到对应移调的调号)
 * @returns
 */
function getStaffOriKey(){
	return keyTransfer[staffOriKSF];
}
/**
 * 取谱子实际调号
 * @returns
 */
function getStaffKey(){
	if(staffKSF==9999){
		return keyTransfer[staffOriKSF];
	}
	if(staffKSF!=9999){
		return keyTransfer[staffKSF];
	}
}
//关联getNo
function getNodeSeq(){
	
	var noteData = getNoteData();
//	{"time":"0.000000","pitch":62,"dur":0.6818181872367859,"scoretype":"all","node_index":0}
	var arr = new Array();
	for(var i=0;i<noteData.length;i++){
		var obj = new Object();
		var data = noteData[i];
		var istart = data[0];
		var time = parseFloat(data[1].toFixed(4));
		var dur = parseFloat(data[4].toFixed(4));
		obj.time = time;
		obj.pitch = data[3];
		obj.dur = dur;
		obj.scoretype = checkScorePitch(istart);
		obj.node_index = getNodeIndexByIstart(istart);
		arr.push(obj);
	}
	console.log(arr);
	return JSON.stringify(arr);
}
function getNodeIndexByIstart(istart){
	var content = $("#source").val();
	var lines = getNodesInfo(content);
	for(var i=0;i<lines.length;i++){
		var line = lines[i];
		if(line.type=="note"){
			var nodes = line.nodes;
			for(var j=0;j<nodes.length;j++){
				var node = nodes[j];
				if(istart>=node.startSeq && istart<node.endSeq){
					return node.nodeIndex;
				}
			}
		}
	}
}
var pytbData =  [
		{"linefirst":0,"linelast":0,"node_index":0,"notes":[["c",1],["A",1],["z",1]],"repeat":0,"starttime":"6.0"}
		,
		{"linefirst":0,"linelast":0,"node_index":1,"notes":[["c",1],["A",1],["z",1]],"repeat":0,"starttime":"7.4"}
		,
		{"linefirst":0,"linelast":0,"node_index":2,"notes":[["G",1],["F",1],["G",1]],"repeat":0,"starttime":"9.1"}
		,
		{"linefirst":0,"linelast":0,"node_index":3,"notes":[["F",2],["z",1]],"repeat":0,"starttime":"10.5"}
		,
		{"linefirst":0,"linelast":0,"node_index":4,"notes":[["G",1],["G",1],["A",1]],"repeat":0,"starttime":"11.9"}
		,
		{"linefirst":0,"linelast":0,"node_index":5,"notes":[["B",2],["G",1]],"repeat":0,"starttime":"13.4"}
		,
		{"linefirst":0,"linelast":0,"node_index":6,"notes":[["A",1],["A",1],["B",1]],"repeat":0,"starttime":"14.7"}
		,
		{"linefirst":0,"linelast":0,"node_index":7,"notes":[["c",2],["A",1]],"repeat":0,"starttime":"16.2"}
		,
		{"linefirst":0,"linelast":0,"node_index":8,"notes":[["c",2],["A",1]],"repeat":0,"starttime":"17.7"}
		,
		{"linefirst":0,"linelast":0,"node_index":9,"notes":[["c",2],["A",1]],"repeat":0,"starttime":"19.1"}
		,
		{"linefirst":0,"linelast":0,"node_index":10,"notes":[["B",1],["A",1],["G",1]],"repeat":0,"starttime":"20.5"}
		,
		{"linefirst":0,"linelast":1,"node_index":11,"notes":[["F",2],["z",1]],"repeat":0,"starttime":"22.0"}
		,
		{"linefirst":0,"linelast":0,"node_index":0,"notes":[["c",1],["A",1],["z",1]],"repeat":1,"starttime":"29.1"}
		,
		{"linefirst":0,"linelast":0,"node_index":1,"notes":[["c",1],["A",1],["z",1]],"repeat":1,"starttime":"30.5"}
		,
		{"linefirst":0,"linelast":0,"node_index":2,"notes":[["G",1],["F",1],["G",1]],"repeat":1,"starttime":"31.9"}
		,
		{"linefirst":0,"linelast":0,"node_index":3,"notes":[["F",2],["z",1]],"repeat":1,"starttime":"33.4"}
		,
		{"linefirst":0,"linelast":0,"node_index":4,"notes":[["G",1],["G",1],["A",1]],"repeat":1,"starttime":"34.8"}
		,
		{"linefirst":0,"linelast":0,"node_index":5,"notes":[["B",2],["G",1]],"repeat":1,"starttime":"36.3"}
		,
		{"linefirst":0,"linelast":0,"node_index":6,"notes":[["A",1],["A",1],["B",1]],"repeat":1,"starttime":"37.7"}
		,
		{"linefirst":0,"linelast":0,"node_index":7,"notes":[["c",2],["A",1]],"repeat":1,"starttime":"39.2"}
		,
		{"linefirst":0,"linelast":0,"node_index":8,"notes":[["c",2],["A",1]],"repeat":1,"starttime":"40.6"}
		,
		{"linefirst":0,"linelast":0,"node_index":9,"notes":[["c",2],["A",1]],"repeat":1,"starttime":"42.0"}
		,
		{"linefirst":0,"linelast":0,"node_index":10,"notes":[["B",1],["A",1],["G",1]],"repeat":1,"starttime":"43.4"}
		,
		{"linefirst":0,"linelast":1,"node_index":11,"notes":[["F",2],["z",1]],"repeat":1,"starttime":"44.8"}
		];
//一个歌词唱多个音的，第一个音为正常，第二个音歌词标记为原来的歌词后面加个短横线“词-”，评分类型改为all，可参考“清晨”这首歌
/**
 * 根据谱音同步的数据，生成标准json数据
 * @param pytbData 谱音同步数据
 * @returns
 */
function resetStaffByPytb(pytbData){
	var result = new Object();
	var noteData = getNoteData();
	var istartMap = new Map();
	var lyricLineCount = 0;//歌词行数，
	for(var i=0;i<noteData.length;i++){
		var item = noteData[i];
		var istart = item[0];
		var s = syms[istart];
		if(s){
			item.node_index = s.my_node_index;
		}
	}
	var lastStartTime = -1;
	for(var i=0;i<pytbData.length;i++){
		var item = pytbData[i];
		item.notes = new Array();
		var itemNoteCount = 0;
		var nodeIndex = item.node_index;
		var lastIstart =-2;
		
		var noteDurSum = 0;
		for(var j=0;j<noteData.length;j++){
			var note = noteData[j];
			if(note.node_index == nodeIndex){
				var obj = new Object();
				obj.istart = note[0];
				if(lastIstart!=obj.istart){
					var s = syms[note[0]];
					
					if(itemNoteCount==0){
						//小节里的第一个音符，要判断前面还有没有音符（如果是上一个小节的连音线连到下一个小节，就会出现前面还会有音符的情况）
						var prev = s.prev;
						while(prev){
							if((prev.type==8 || prev.type==10)){
								var tmpObj = new Object();
								tmpObj.istart = prev.istart;
								tmpObj.sdur = prev.dur;
								noteDurSum += tmpObj.sdur;
								tmpObj.pitch = 0;
								tmpObj.scoretype = "none";
								tmpObj.lyric = [];
								item.notes.push(tmpObj);
								prev = prev.perv;
								
							}else{
								break;
							}
						}
					}
					
					
					
					obj.sdur = s.dur;
					if(s.tie_s){
						var tie_s = s.tie_s;
						while(tie_s){
							obj.sdur += tie_s.dur;
							if(tie_s.tie_s){
								tie_s = tie_s.tie_s;
							}else{
								tie_s = null;
							}
						}
					}
					noteDurSum += obj.sdur;
					obj.pitch = note[3];
					obj.meter = s.my_meter[0].top+"/"+s.my_meter[0].bot;
					obj.scoretype = checkScorePitch(obj.istart);
					obj.lyric = getLyric(s);
					if(obj.lyric.length>lyricLineCount){
						lyricLineCount = obj.lyric.length;
					}
					item.notes.push(obj);
					
				}
				item.noteDurSum = noteDurSum;
				lastIstart = obj.istart;
				itemNoteCount++;
			}
		}
		if(i>0){
			//更新上一个小节的时长
			var lastItem = pytbData[i-1];
			lastItem.nodeDur = parseFloat(item.starttime) - lastStartTime;//这里有个问题，中间有间奏的情况下，这样算小节的时长不对
			if(i>2){
				//如果当前小节的时长比上一小节的大1倍，认为当前小节有间奏，那么当前小节的时长调整为与上一个小节的时长一样
				var preItem = pytbData[i-2];
				if(lastItem.nodeDur>(preItem.nodeDur*2)){
					if(lastItem.noteDurSum>=(preItem.noteDurSum*2)){
						//如果音符时值也同样大于前一个小节的2倍，说明前一个小节可能是弱起
					}else{
						//取到之前与之noteDurSum相同的小节的时值
						for(var x=i-2;x>0;x--){
							var tmpData = pytbData[x];
							if(tmpData.noteDurSum==lastItem.noteDurSum){
								lastItem.nodeDur = tmpData.nodeDur - 0;
								break;
							}
						}
					}
					
				}
			}
			//最后一个小节处理(处理成跟倒数第二小节时值一样)
			if(i==pytbData.length-1){
				pytbData[i].nodeDur = lastItem.nodeDur;
			}
			
			var lastItemStartTime = parseFloat(lastItem.starttime);
			var durSum = 0;
			var nodeLastNoteLyric = new Array();
			var nodeLastNoteScoreType = "";
			//处理每一个音符的开始时间，持续时长
			for(var k=0;k<lastItem.notes.length;k++){
				var note = lastItem.notes[k];
				note.startTime = lastItemStartTime + durSum/lastItem.noteDurSum * lastItem.nodeDur;
				durSum += note.sdur;
				note.dur = note.sdur/lastItem.noteDurSum * lastItem.nodeDur;
				
				//处理歌词1：如果歌词有多个歌词，则根据istart判断之前出现过几次
				var count = istartMap.get("key"+note.istart);
				if(!count){
					count=0;
				}
				note.currlyric = "";
				if(note.lyric.length>0){
					if(note.lyric.length>count){
						note.currlyric = note.lyric[count++]
					}else{
						if(lyricLineCount>note.lyric.length){
							//如果歌词总行数大于当前音符的歌词行数，则说明当前音符有某个声部没有歌词(这个地方有冲突，有时候要使用同样的歌词，有时候又不要使用)
//							note.currlyric = "";
							note.currlyric = note.lyric[note.lyric.length-1];
						}else{
							note.currlyric = note.lyric[note.lyric.length-1];
						}
						
					}
				}
				istartMap.set("key"+note.istart,count);	
				
				//处理歌词2：如果当前音符没有歌词，但是该小节的前一个音符有歌词，则该音符歌词与前一个音符相同，在原歌词后面加一个-标记
				if(note.pitch!=0 && !note.currlyric && nodeLastNoteLyric!=""){
					note.scoretype = nodeLastNoteScoreType;
					note.currlyric = nodeLastNoteLyric + "-";
				}
				nodeLastNoteScoreType = note.scoretype;
				nodeLastNoteLyric = note.currlyric;
			}
			
			
			
			nodeLastNoteLyric = new Array();
			nodeLastNoteScoreType = "";
			if(i==pytbData.length-1){//处理最后一个小节的音符
				var lastItem = pytbData[i];
				durSum = 0;
				lastItemStartTime = parseFloat(lastItem.starttime);
				for(var k=0;k<lastItem.notes.length;k++){
					var note = lastItem.notes[k];
					note.startTime = lastItemStartTime + durSum/lastItem.noteDurSum * lastItem.nodeDur;
					durSum += note.sdur;
					note.dur = note.sdur/lastItem.noteDurSum * lastItem.nodeDur;
					
					//处理歌词1：如果歌词有多个歌词，则根据istart判断之前出现过几次
					var count = istartMap.get("key"+note.istart);
					if(!count){
						count=0;
					}
					note.currlyric = "";
					if(note.lyric.length>0){
						if(note.lyric.length>count){
							note.currlyric = note.lyric[count++]
						}else{
							note.currlyric = note.lyric[note.lyric.length-1];
						}
						
					}
					istartMap.set("key"+note.istart,count);	
					
					//处理歌词2：如果当前音符没有歌词，但是该小节的前一个音符有歌词，则该音符歌词与前一个音符相同，在原歌词后面加一个-标记
					if(note.pitch!=0 && !note.currlyric && nodeLastNoteLyric!=""){
						note.scoretype = nodeLastNoteScoreType;
						note.currlyric = nodeLastNoteLyric + "-";
					}
					nodeLastNoteScoreType = note.scoretype;
					nodeLastNoteLyric = note.currlyric;
					
									
				}
			}
			
			
		}
		lastStartTime = parseFloat(item.starttime);
	}
	var standData = new Array();
	for(var i=0;i<pytbData.length;i++){
		var item = pytbData[i];
		for(var j=0;j<item.notes.length;j++){
			var note = item.notes[j];
			standData.push(note);
		}
	}
	result.noteData = standData;//这里是返回音符数据（）
	result.nodeData = pytbData;//这里是返回小节数据
	
	console.log(JSON.stringify(result.noteData));
	//打印一下小节时间
//	for(var i=0;i<pytbData.length;i++){
//		console.log("小节号："+(pytbData[i].node_index+1),"   小节时长："+pytbData[i].nodeDur)
//	}
	//console.log("pytbData",pytbData)
	return result;
}
function getLyric(s){
	var arr = new Array();
	var lys = s.a_ly;
	if(lys){
		for(var i=0;i<lys.length;i++){
			var ly = lys[i];
			if(!ly){
				arr.push("")
				continue;
			}
			var word = ly.t;
			word = word.replace(/(\[R\])|[1-9.\[\]\!.。,，！'‘\(\)\（\）?？“”"]/g,"");
			arr.push(word)
		}
	}
	return arr;
}


function tmpMethod(){
	var arr = [{"time":"7.200000","pitch":67,"dur":0.8999999761581421,"scoretype":"all"},{"time":"8.100000","pitch":67,"dur":0.30000001192092896,"scoretype":"all"},{"time":"8.400000","pitch":67,"dur":0.44999998807907104,"scoretype":"all"},{"time":"8.850000","pitch":67,"dur":0.15000000596046448,"scoretype":"all"},{"time":"9.000000","pitch":62,"dur":0.30000001192092896,"scoretype":"all"},{"time":"9.300000","pitch":64,"dur":0.15000000596046448,"scoretype":"all"},{"time":"9.450000","pitch":66,"dur":0.15000000596046448,"scoretype":"all"},{"time":"9.600000","pitch":67,"dur":0.6000000238418579,"scoretype":"all"},{"time":"10.200000","pitch":67,"dur":0.6000000238418579,"scoretype":"all"},{"time":"10.800000","pitch":0,"dur":0.30000001192092896,"scoretype":"none"},{"time":"11.100000","pitch":71,"dur":0.30000001192092896,"scoretype":"all"},{"time":"11.400000","pitch":67,"dur":0.30000001192092896,"scoretype":"all"},{"time":"11.700000","pitch":69,"dur":0.15000000596046448,"scoretype":"all"},{"time":"11.850000","pitch":71,"dur":0.15000000596046448,"scoretype":"all"},{"time":"12.000000","pitch":74,"dur":0.6000000238418579,"scoretype":"all"},{"time":"12.600000","pitch":74,"dur":0.6000000238418579,"scoretype":"all"},{"time":"13.200000","pitch":71,"dur":0.44999998807907104,"scoretype":"all"},{"time":"13.650000","pitch":71,"dur":0.15000000596046448,"scoretype":"all"},{"time":"13.800000","pitch":67,"dur":0.44999998807907104,"scoretype":"all"},{"time":"14.250000","pitch":71,"dur":0.15000000596046448,"scoretype":"all"},{"time":"14.400000","pitch":74,"dur":0.44999998807907104,"scoretype":"all"},{"time":"14.850000","pitch":71,"dur":0.15000000596046448,"scoretype":"all"},{"time":"15.000000","pitch":69,"dur":0.6000000238418579,"scoretype":"all"},{"time":"15.600000","pitch":69,"dur":1.2000000476837158,"scoretype":"all"},{"time":"16.799999","pitch":76,"dur":0.6000000238418579,"scoretype":"all"},{"time":"17.400000","pitch":74,"dur":0.6000000238418579,"scoretype":"all"},{"time":"18.000000","pitch":69,"dur":0.6000000238418579,"scoretype":"all"},{"time":"18.600000","pitch":71,"dur":0.6000000238418579,"scoretype":"all"},{"time":"19.200001","pitch":74,"dur":0.30000001192092896,"scoretype":"all"},{"time":"19.500000","pitch":71,"dur":0.30000001192092896,"scoretype":"all"},{"time":"19.799999","pitch":0,"dur":0.30000001192092896,"scoretype":"none"},{"time":"20.100000","pitch":74,"dur":0.30000001192092896,"scoretype":"all"},{"time":"20.400000","pitch":71,"dur":0.30000001192092896,"scoretype":"all"},{"time":"20.700001","pitch":69,"dur":0.15000000596046448,"scoretype":"all"},{"time":"20.850000","pitch":71,"dur":0.15000000596046448,"scoretype":"all"},{"time":"21.000000","pitch":67,"dur":0.6000000238418579,"scoretype":"all"},{"time":"21.600000","pitch":71,"dur":0.6000000238418579,"scoretype":"all"},{"time":"22.200001","pitch":0,"dur":0.6000000238418579,"scoretype":"none"},{"time":"22.799999","pitch":62,"dur":0.44999998807907104,"scoretype":"all"},{"time":"23.250000","pitch":64,"dur":0.15000000596046448,"scoretype":"all"},{"time":"23.400000","pitch":67,"dur":0.30000001192092896,"scoretype":"all"},{"time":"23.700001","pitch":67,"dur":0.30000001192092896,"scoretype":"all"},{"time":"24.000000","pitch":71,"dur":0.44999998807907104,"scoretype":"all"},{"time":"24.450001","pitch":71,"dur":0.15000000596046448,"scoretype":"all"},{"time":"24.600000","pitch":74,"dur":0.30000001192092896,"scoretype":"all"},{"time":"24.900000","pitch":74,"dur":0.30000001192092896,"scoretype":"all"},{"time":"25.200001","pitch":69,"dur":0.30000001192092896,"scoretype":"all"},{"time":"25.500000","pitch":69,"dur":0.15000000596046448,"scoretype":"all"},{"time":"25.650000","pitch":69,"dur":0.15000000596046448,"scoretype":"all"},{"time":"25.799999","pitch":64,"dur":0.6000000238418579,"scoretype":"all"},{"time":"26.400000","pitch":69,"dur":0.8999999761581421,"scoretype":"all"},{"time":"27.299999","pitch":62,"dur":0.30000001192092896,"scoretype":"all"},{"time":"27.600000","pitch":67,"dur":0.8999999761581421,"scoretype":"all"},{"time":"28.500000","pitch":67,"dur":0.30000001192092896,"scoretype":"all"},{"time":"28.799999","pitch":71,"dur":0.8999999761581421,"scoretype":"all"},{"time":"29.700001","pitch":71,"dur":0.30000001192092896,"scoretype":"all"},{"time":"30.000000","pitch":74,"dur":1.2000000476837158,"scoretype":"all"},{"time":"31.200001","pitch":67,"dur":0.44999998807907104,"scoretype":"all"},{"time":"31.650000","pitch":71,"dur":0.15000000596046448,"scoretype":"all"},{"time":"31.799999","pitch":74,"dur":0.30000001192092896,"scoretype":"all"},{"time":"32.099998","pitch":74,"dur":0.30000001192092896,"scoretype":"all"},{"time":"32.400002","pitch":76,"dur":0.6000000238418579,"scoretype":"all"},{"time":"33.000000","pitch":74,"dur":0.6000000238418579,"scoretype":"all"},{"time":"33.599998","pitch":71,"dur":0.44999998807907104,"scoretype":"all"},{"time":"34.049999","pitch":67,"dur":0.15000000596046448,"scoretype":"all"},{"time":"34.200001","pitch":74,"dur":0.20000000298023224,"scoretype":"all"},{"time":"34.400002","pitch":74,"dur":0.20000000298023224,"scoretype":"all"},{"time":"34.599998","pitch":74,"dur":0.20000000298023224,"scoretype":"all"},{"time":"34.799999","pitch":71,"dur":0.30000001192092896,"scoretype":"all"},{"time":"35.099998","pitch":0,"dur":0.30000001192092896,"scoretype":"none"},{"time":"35.400002","pitch":67,"dur":0.30000001192092896,"scoretype":"all"},{"time":"35.700001","pitch":0,"dur":0.30000001192092896,"scoretype":"none"},{"time":"36.000000","pitch":62,"dur":0.6000000238418579,"scoretype":"all"},{"time":"36.599998","pitch":67,"dur":0.6000000238418579,"scoretype":"all"},{"time":"37.200001","pitch":71,"dur":0.44999998807907104,"scoretype":"all"},{"time":"37.650002","pitch":67,"dur":0.15000000596046448,"scoretype":"all"},{"time":"37.799999","pitch":74,"dur":0.20000000298023224,"scoretype":"all"},{"time":"38.000000","pitch":74,"dur":0.20000000298023224,"scoretype":"all"},{"time":"38.200001","pitch":74,"dur":0.20000000298023224,"scoretype":"all"},{"time":"38.400002","pitch":71,"dur":0.30000001192092896,"scoretype":"all"},{"time":"38.700001","pitch":0,"dur":0.30000001192092896,"scoretype":"none"},{"time":"39.000000","pitch":67,"dur":0.30000001192092896,"scoretype":"all"},{"time":"39.299999","pitch":0,"dur":0.30000001192092896,"scoretype":"none"},{"time":"39.599998","pitch":62,"dur":0.6000000238418579,"scoretype":"all"},{"time":"40.200001","pitch":67,"dur":0.6000000238418579,"scoretype":"all"},{"time":"40.799999","pitch":62,"dur":0.6000000238418579,"scoretype":"all"},{"time":"41.400002","pitch":67,"dur":0.6000000238418579,"scoretype":"all"},{"time":"42.000000","pitch":62,"dur":0.6000000238418579,"scoretype":"all"},{"time":"42.599998","pitch":67,"dur":0.6000000238418579,"scoretype":"all"},{"time":"43.200001","pitch":67,"dur":0.6000000238418579,"scoretype":"all"},{"time":"43.799999","pitch":0,"dur":0.6000000238418579,"scoretype":"none"}]
	var newArr = [];
	for(var i=0;i<arr.length;i++){
		var d = arr[i];
		d.time = parseFloat(d.time)-7.2;
		newArr.push(d);
	}
	console.log(JSON.stringify(newArr))
}
/*
var sf;
function testsoundfont(){
	var noteDatas = getNoteData();
	var arr = [];
	for(var i=0;i<noteDatas.length;i++){
		var note = noteDatas[i];
		var obj = new Object();
		obj.time = note[1];
		obj.note = note[3];
		obj.duration = note[4];
		arr.push(obj);
	}
	console.log(arr);
	
	var ctx = new AudioContext();
	sf = Soundfont.instrument(ctx, 'acoustic_grand_piano').then(function (clavinet) {


	  // Or schedule events at a given time
//	  clavinet.schedule(ctx.currentTime, [ { time: 0, note: 60,duration:0.5}, { time: 0.5, note: 61,duration:0.5}, { time: 1.5, note: 62,duration:0.5}])
	  clavinet.schedule(ctx.currentTime, arr)
	})
}

function stop(){
	sf.stop();
}
*/
//根据行号,声部取得该行的所有音符的坐标
function getNoteCoors(){
	var linesPointsMap = new Map();
	for(var i=0;i<syms.length;i++){
		if(syms[i]){
			var s = syms[i];
			if(s.type==8){
				var lineNum = s.my_line;
				var v = s.v;
				var obj = new Object();
				var points = [];
				if(linesPointsMap.get("line_"+lineNum+"_"+v)!=null){
					obj = linesPointsMap.get("line_"+lineNum+"_"+v);
					points = obj.points;
				}

				var coor = [];
				var text = $("text[type*='HD'][istart='"+s.istart+"'],text[type='x'][istart='"+s.istart+"']");
				if(!obj.svg){
					var svg = $(text).parents("svg");
					obj.svg = svg;
				}
				var x = parseFloat($(text).attr("x"));
				var box = $(text)[0].getBoundingClientRect();
				x = x+box.width/2/scale;
				var y = parseFloat($(text).attr("y"));
				coor.push(x);
				coor.push(y);
				points.push(coor);
				obj.points = points;
				linesPointsMap.set("line_"+lineNum+"_"+v,obj);
			}
		}
	}
	return linesPointsMap;
}
//画旋律线
function drawXuanLv(){
	var linesPointsMap = getNoteCoors();
	linesPointsMap.forEach(function(value,key){
		drawXuanLvPath($(value.svg).children("g"),value.points);
	});
}
//删除旋律线
function delXuanLv(){
	$("path[type='XL']").remove();
}
//根据谱子获取标准json数据
function getStandJsonData(){
	var noteData = getNoteData();
	var arr = new Array();
	var istartMap = new Map();
	var nodeLastNoteLyric = new Array();
	var nodeLastNoteScoreType = "";
	var lastBarNum = 0;
	var lyricLineCount = 0;//歌词行数，
	for(var i=0;i<noteData.length;i++){
		var note = new Object();
		var data = noteData[i];
		var istart = data[0];
		var time = parseFloat(data[1].toFixed(4));
		var dur = parseFloat(data[4].toFixed(4));
		var s = syms[istart];
		note.istart = istart;
		note.startTime = time;
		note.time = time;
		note.pitch = data[3];
		note.dur = dur;
		note.scoretype = checkScorePitch(istart);
		note.lyric = getLyric(s);
		if(note.lyric.length>lyricLineCount){
			lyricLineCount = note.lyric.length;
		}
		
		
		//处理歌词1：如果歌词有多个歌词，则根据istart判断之前出现过几次
		var count = istartMap.get("key"+note.istart);
		if(!count){
			count=0;
		}
		note.currlyric = "";
		if(note.lyric.length>0){
			if(note.lyric.length>count){
				note.currlyric = note.lyric[count++]
			}else{
				if(lyricLineCount>note.lyric.length){
					//如果歌词总行数大于当前音符的歌词行数，则说明当前音符有某个声部没有歌词(这个地方有冲突，有时候要使用同样的歌词，有时候又不要使用)
					note.currlyric = "";
					//note.currlyric = note.lyric[note.lyric.length-1];
				}else{
					note.currlyric = note.lyric[note.lyric.length-1];
				}
				
			}
		}
		istartMap.set("key"+note.istart,count);	
		
		//处理歌词2：如果当前音符没有歌词，但是该小节的前一个音符有歌词，则该音符歌词与前一个音符相同，在原歌词后面加一个-标记
		if(note.pitch!=0 && !note.currlyric && nodeLastNoteLyric!="" && s.my_bar_num==lastBarNum){
			note.scoretype = nodeLastNoteScoreType;
			note.currlyric = nodeLastNoteLyric + "-";
		}
		lastBarNum = s.my_bar_num;
		nodeLastNoteScoreType = note.scoretype;
		nodeLastNoteLyric = note.currlyric;
		
		
		
		arr.push(note);
		
	}
	console.log(arr);
	return JSON.stringify(arr);
}