var modalParams = {};// 弹框参数
var modal;// 弹框vue对象 这个对象基本上就没用了
var pageArr = new Array(); // 用于记录打开过的各个页面（跳转、弹窗）地址以及参数
var pageParams = {
	date: new Date().getTime()  // 用于表示
}

var loginUrl = "../login/login.html"; // 异常时返回的页面

// 屏蔽各路控制台打印，主要用于发出去的版本
// window.console.log = function(msg1, msg2, msg3) {
// // console.error("console.log", msg1, msg2, msg3);
// }

// 替换
String.prototype.replaceAll = function(s1,s2){ 
	return this.replace(new RegExp(s1,"gm"),s2); 
}
// 日期格式化
Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth()+1, // month
		"d+" : this.getDate(),    // day
		"h+" : this.getHours(),   // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth()+3)/3),  // quarter
		"S" : this.getMilliseconds() // millisecond
	}
	if(/(y+)/.test(format)) {
		format=format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	for(var k in o){
		 if(new RegExp("("+ k +")").test(format)){
			 format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] :  ("00"+ o[k]).substr((""+ o[k]).length));
		 }
	 }
	 return format;
}

/**
 * 字符串日期格式化
 * 
 * @param str
 *            日期字符串
 * @param format
 *            格式
 * @returns
 */
function str2date(str, format){
	var result = "";
	if(str ==""){
		return result;	
	}
	try {
		var date;
		var arr = (str.split(".")[0]).split(" ");
		var ymd = arr[0].split("-");
		if( arr.length > 1){
			var hms = arr[1].split(":");
			date = new Date(parseInt(ymd[0]), parseInt(ymd[1]) - 1, parseInt(ymd[2]), parseInt(hms[0]), parseInt(hms[1]), hms.length > 2 ? parseInt(hms[2]) : 0);
		}else{
			date = new Date(parseInt(ymd[0]), parseInt(ymd[1]) - 1, parseInt(ymd[2]) );
		}
		result = date.format(format);
	} catch (e) {
		result = "";
	}
	return result;
}


/**
 * 字符串日期格式化
 * 
 * @param rows
 *            数组
 * @param column
 *            字段名
 * @param format
 *            格式
 * @returns
 */
function column2date(rows, column, format){
	var row;
	for (var i = 0; i < rows.length; i++) {
		row = rows[i];
		row[column] = str2date(row[column], format);
	}
}

/**
 * 初始化日期
 * 
 * @param hideCball
 *            选择框关闭之后的回调函数
 * @returns
 */
function initDatePicker( hideCball) { 
	$('input[datepiker="DATE"]').each(function() {
		var $date = $(this);
		var date = this.value;
		if(date){
			var index = date.lastIndexOf(".");// Date.parse(date)中date格式不能为2013-01-01
												// 13:00:32.0
			if(index != -1)
				date = date.substring(0, index);
			$(this).val( str2date(date, 'yyyy-MM-dd'));
		}
		
		$(this).datepicker($.extend({}, $.datepicker.regional['zh-CN'], {			
			showOtherMonths: true,
			duration : true,
			showStatus : true,
			showOn : 'both', 
			buttonImageOnly : true,
			showButtonPanel: true,
			buttonText : '选择日期',
			onClose: function(){ 
				console.log("date close")
			},
			beforeShow: function(){ 
				console.log("date beforeShow")
			}
		})).on("hide", function( ev){
	    	if( hideCball){
	    		hideCball( this);
	    	}
	    });
	});

	// 初始日期控件（带时间）
	$('input[datepiker="DATETIME"]').each(function() {
		var $date = $(this);
		var timeFormat = $(this).attr("timeFormat");
		if(!timeFormat)
			timeFormat = 'hh:mm'; 
		
		var date = this.value;
		if(date){
			var index = date.lastIndexOf(".");
			if(index != -1)
				date = date.substring(0, index);
			$(this).val( str2date(date, 'yyyy-MM-dd ' + timeFormat)); 
		}
		
		$(this).datetimepicker({		
			showOtherMonths: true,
			currentText : '今天',
			closeText : '关闭',
			timeText : '时间',
			showSecond : timeFormat.indexOf("ss") != -1 ? true : false,
			duration : true,
			showStatus : true,
			showOn : 'both', 
			buttonImageOnly : true,
			timeFormat: timeFormat.replace("HH", "hh"),// 必须用小写
			showButtonPanel: true,
			onClose: function(){
				console.log("date close")
			},
			beforeShow: function(){
				console.log("date beforeShow")
			}
		}).on("hide", function( ev){
	    	if( hideCball){
	    		hideCball( this);
	    	}
	    });
	});
}


/**
 * 存值缓存
 * 
 * 目前已使用key值：user,school,opno,pwd,checkPwd
 * 
 * @param cname
 * @param cvalue
 * @returns
 */
function setCookie(cname, cvalue) {
	try {
		localStorage.setItem(cname, cvalue);
	} catch (e) {
		window.top.alert( "请关闭浏览器的无痕浏览模式，以便于您的继续访问");
	}
}

function setTopCookie(cname, cvalue) {
	try {
		top.localStorage.setItem(cname, cvalue);
	} catch (e) {
		window.top.alert( "请关闭浏览器的无痕浏览模式，以便于您的继续访问");
	}
}

/**
 * 从缓存中取值
 * 
 * @param cname
 * @returns
 */
function getCookie(cname) {
	var cvalue = localStorage.getItem( cname);
	return cvalue && cvalue != "undefined" ? cvalue : "";
}
function getTopCookie(cname) {
	return top.localStorage.getItem( cname);
}

/**
 * 从缓存中取值，如果是json数据，那么返回json格式的数据，否则返回null
 * 
 * @param cname
 * @returns
 */
function getCookie2json(cname) {
	var cvalue = getCookie( cname);
	if( cvalue && isJsonString(cvalue)){
		return JSON.parse(cvalue) ;
	}
	return null;
}
function getTopCookie2json(cname) {
	var cvalue = getTopCookie( cname);
	if( cvalue && isJsonString(cvalue)){
		return JSON.parse(cvalue) ;
	}
	return null;
}

/**
 * 获取用户信息
 * 
 * @returns
 */
function getUser(){
	var user = getCookie2json( "user");
	if( user){ 
		return user;
	}
	return {};
} 
function getUserPo(){
	var user = getCookie( "user");
	if( user){
		var obj = {};
		try {
			obj = JSON.parse( user);
		} catch (e) {
			obj = {};
		}
		return obj;
	}
	return {};
} 

/**
 * 获取学校信息
 * 
 * @param fromCookie
 *            true:从缓存中取
 * @returns
 */
function getSchool() {
	var school = getCookie( "school");
	if( school){
		return JSON.parse( school);
	}
	return null;
}

/**
 * 获取学校信息
 * 
 * @param fromCookie
 *            true:从缓存中取
 * @returns
 */
function getPlatform() {
	var platform = getCookie( "platform");
	if( platform){
		return JSON.parse( platform);
	}
	return null;
}

/**
 * 获取可见模块 appCode
 * 
 * @returns
 */
function getAppCode(){
	var platform = getCookie("platform");
	if (platform) {
		platform = JSON.parse(platform);
		return platform.APP_CODE;
	}
	return "";
}

/**
 * 是否美术系统
 * 
 * @returns {Boolean}
 */
function isArt(){
	var platform = getPlatform();
	if(platform){
		return platform.SUBJECT_TYPE == 'art';
	}
	return false;
}
/**
 * 获取学科
 * @returns {Boolean}
 */
function getSubject(){
	var platform = getPlatform();
	if(platform && platform.SUBJECT_TYPE){
		return platform.SUBJECT_TYPE;
	}
	return 'music';
}

/**
 * 是否支持互动
 * 
 * @returns
 */
function isSupportInteract(){
	return getAppCode().indexOf("interact") != -1 ? true : false;
}
/**
 * @returns
 */
function isExe() {
	var isExe = getCookie( "isExe");
	if( isExe && isExe == '1'){
		return true;
	}
	return false;
}

/**
 * @returns
 */
function isAndroid() {
	var isAndroid = getCookie( "isAndroid");
	if( isAndroid && isAndroid == '1'){
		return true;
	}
	return false;
}

/**
 * 是否拥有root权限，一般用于安卓机
 * 
 * 安卓电钢琴可以获取root，平板电脑不行（曲谱的scale要小一点）
 * @returns
 */
function isRoot() {
	var isRoot = getCookie( "isRoot");
	if( isRoot && isRoot == '1'){
		return true;
	}
	return false;
}

/**
 * 当前用户是否是管理员
 * 
 * @returns
 */
function isManager(){
	var user = getUser();
	if (user && user.isPlatAdmin || user.isManager == '1') {
		// 平台管理员 + 管理员
		return true; 
	}
	return false;
}

/**
 * 是否支持互动
 * 
 * @returns
 */
function isShowInteract(){
	var platform = getCookie2json("platform");
	if (platform && platform.APP_CODE && platform.APP_CODE.indexOf("interact") != -1) {
		return true;
	}
	return false;
}
/**
 * 当前用户是否是管理员
 * 
 * @returns
 */
function isManager(){
	// isManager：1、是；0、否；
	var user = getUser();
	if(user && user.isManager == '1'){
		return true;
	}
	return false;
}
/**
 * 当前用户是否是教师
 * 
 * @returns
 */
function isTeac(){
	// 用户类型：1、教师 ；2、学生
	var user = getUser();
	if(user && user.userType == '1'){
		return true;
	}
	return false;
}

/**
 * 当前用户是否是学生
 * 
 * @returns
 */
function isStu(){
	// 用户类型：1、教师 ；2、学生
	var user = getUser();
	if(user && user.userType == '2'){
		return true;
	}
	var url = getUrlParamJson(top.document.URL);
	if( url && url.USER_TYPE == 'stu'){
		return true;
	}
	return false;
}

/**
 * 获取当前用户ID
 * 
 * @returns
 */
function getPersonId(){
	// 用户类型：1、教师 ；2、学生
	var user = getUser();
	if(user && user.personId){
		return user.personId;
	}
	return "";
}

/**
 * 获取学校信息
 * 
 * @param fromCookie
 *            true:从缓存中取
 * @returns
 */
function isExperience() {
	var platform = getCookie( "platform");
	if( platform){
		return JSON.parse( platform).IS_EXPERIENCE == '1';
	}
	return false;
}

/**
 * 更新token
 * 
 * @param user
 * @returns
 */
function updateToken(cb) {
	var user = getUser();
	if(!user || !user.personId){
		return;
	}
	var params = {
		"PERSON_ID" : user.personId
	};
	console.log("user.token", user.token);
	ajaxPost('HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=imusic.login!getToken', params, function(res) {
		if (res.result == 1) {
			console.log("token", res.data);
			user.token = JSON.parse(res.data).token;
			setCookie("user", JSON.stringify(user));
			typeof(cb) == 'function' && cb();
		}
	})
}

/**
 * 登出
 * 
 * @param redirectUrl
 *            登出后的页面跳转地址
 * @param cb
 *            回调函数
 * @param noDirect
 *            登出后是否跳转
 * @returns
 */
function logout( redirectUrl, cb, noDirect) {
	ajaxPost("HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=imusic.login!logout", {}, function(res) {
		if (res.result == 1) {
			setCookie("user", "");
			setCookie("activeSchool", "");
			typeof(cb) == 'function' && cb();
			if(noDirect){
				return;
			}
			var url = (redirectUrl && redirectUrl != undefined) ? redirectUrl : window.top.loginUrl;
			if( url.substr(url.length - 1) == "#"){
				url = url.substring(0, url.length - 1);
			}
			window.top.location.href = url;
		}
	});
}


/**
 * ajax 通过post方式提交数据
 * 
 * @param url
 *            不含域名的地址，域名地址从Constant中取
 * @param params
 * @param succBack
 *            成功后回调方法
 * @param errBack
 *            方法调用异常回调方法（如连接不上服务器）
 * @returns
 */
function ajaxPost(url, params, succBack, errBack, options){
	try {
		if( !params['ORGCODE']){
			var school = getSchool();
			if(school){
				params['ORGCODE'] = school.ORGCODE;
			}
		}
		var user = getUser();
		if( user && user.personId){
			if( !params){
				params = {};
			}
			params['SESSION_OPNAME'] = user.opname;
			params['token'] = user.token;
			params['USER_NAME'] = user.personId;
			if( !params['ORGCODE']){
				params['ORGCODE'] = user.orgCode;
			}
		}
	} catch (e) {
	}

	ajaxPost2(C.HOST + url, params, succBack, errBack, options);
}

/**
 * ajax 通过post方式提交数据
 * 
 * @param url
 *            含http的地址
 * @param params
 * @param succBack
 *            成功后回调方法
 * @param errBack
 *            方法调用异常回调方法（如连接不上服务器）
 * @returns
 */
function ajaxPost2(url, params, succBack, errBack, options){
	var date = new Date();
	url = url + (url.indexOf("?") == -1 ? "?" : "&") + "tmp=" + date.format("MMddhhmmssqq");
	params['interface'] = 1;
	params['protocol'] = location.protocol.split(":")[0];
	if( !params.SUBJECT_TYPE && (!params.NO_SUBJECT_TYPE || params.NO_SUBJECT_TYPE != '1')){
		params['SUBJECT_TYPE'] = getSubject();
	}
	var ops = {
		method: 'POST',
		url: url,
		data: params,
		transformRequest: [function (data) {
			var ret = ''
			for (var it in data) {
				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
			}
			return ret;
		}],
		headers:{'Content-Type': "application/x-www-form-urlencoded"}
	}
	// Object.assign(ops, options);
	$.extend(ops, options);
	axios(ops).then(function(res){
		if(res.data && !isJson(res.data) && res.data.indexOf("加密狗验证失败") != -1 ){
			// 后台返回报错页面
			res.data = {
				result: 0,
				msg: "请插入加密狗，并重启电脑"
			};
			setTimeout(function(){
				window.close();
			}, 3000);
			console.log('Error! ajaxPost url: 加密狗验证失败', res);
		} else if(res.data && (!isJson(res.data) || (res.data.result + "").indexOf("业务操作失败") != -1)){
			// 后台返回报错页面
			var msg = "请求异常";
			if( typeof(res.data) == 'object' ){
				msg = res.data.result;
			}else{
				var regArr = res.data.match('<font color="red">.*</font>');
				if(regArr && regArr.length > 0){
					msg = regArr[0].replaceAll('<font color="red">', '').replaceAll('</font>', '');
				}
			}
			res.data = {
				result: 0,
				msg: msg.indexOf("所调用业务逻辑没有找到") != -1 ? "请插入加密狗，并重启电脑" : msg
			};
			console.log('Error! ajaxPost url: 返回格式异常', res );
		} else if(res.data && res.data.msg && res.data.msg.indexOf("token失效") != -1){
			setCookie("user", "");
		} else if(res.data && res.data.msg && res.data.msg.indexOf("您已在其它地方登录，如果这不是您本人的操作，请立即修改密码") != -1){
			swAutoAlert(res.data.msg, "", function(){
				logout();
			});
			return;
		}
		
		if( succBack){
			succBack(res.data);
		}
		
		if( res.data.result == -1){
			console.log('Error! ajaxPost url: ' + url);
			console.log('Error! ajaxPost. ' , res.data.msg );
			if( res.data.msg.indexOf("token失效") != -1 || res.data.msg.indexOf("未传入token") != -1){
				if( loginUrl){
					swAutoAlert("登录信息已失效，请重新登录", res.data.msg, function(){
						if( isExe()){
							if( getSubject() == 'music'){
								if('bzxy' == getSchool().ORGCODE){ // 亳州学院只跳到自己的首页
									top.top.location.href = window.top.loginUrl;
									return;
								}
								var themePage = getCookie("themePage") || 'main_teaching_v2';
								top.location.href = top.host + "imusic/pages/main/" + themePage + ".html" + top.location.search;
							}else{
								top.location.href = top.host + "imusic/pages/main/main_teaching_ms.html" + top.location.search;
							}
						}else{
							top.top.location.href = window.top.loginUrl;
						}
					});
				}
			}
			// alertMsg( res.data.msg);
		}else if( res.data.result == 0){
			console.log('Error! ajaxPost url: ', url);
			console.log('Error! ajaxPost. ' , res.data.msg );
		}
	}).catch(function(error){
		/* 请求失败 */  
		if( errBack){
			errBack( error);
		}
		hideLoading();
		console.log('catch! ajaxPost url: ' , url);
		console.log('catch! ajaxPost. ', error );
	})
}
 
/**
 * ajax 通过get方式提交数据
 * 
 * @param url
 * @param succBack
 *            成功后回调方法
 * @param errBack
 *            方法调用异常回调方法（如连接不上服务器）
 * @returns
 */
function ajaxGet(url, succBack, errBack){
	// console.log( "ajax get url:" + url);
	axios.get(url).then(function (res) {	
		succBack(res.data);
	}).catch(function (error) {
		console.log('Error! Could not reach the API. ' , error);
	});
}

/**
 * 通过ajax加载界面
 * 
 * @param selector
 * @param url
 * @param isAppend
 * @returns
 */
function ajaxLoadPage(selector, url, isAppend){
	axios.get(url).then(function (res) {
		if( isAppend){
			$(selector).append( res.data);
		}else{
			$(selector).html( res.data);
		}
	});
}
 
/**
 * 显示全屏遮罩层
 * 
 * @returns
 */
function maskFull(){
	var html = '';
	html += '<div class="modal-backdrop fade show"></div>';
	html += ' <div class="modal center-modal fade show" id="modal-center" style="display: block;">';
	html += '  <div class="modal-dialog" style="max-width: 300px">';
	html += '	<div class="modal-content"> ';
	html += '	  <div class="modal-body">';
	html += '		<img src="../../images/common/loading.gif"/></div>';
	html += '	  </div>'; 
	html += '	</div>';
	html += '  </div>';
	html += ' </div>';
	return html;
}



/**
 * 显示全屏遮罩层
 * 
 * @param txt
 * @param option
 *            {isAutoClose: 是否定时自动关闭， closeTime：多少秒后自动关闭}
 * @returns
 */
function loading(txt, option) {
	hideLoading();
	if( !txt || txt == undefined){
		txt = "加载中...";
	}
	var html = '';
	html += '<div class="modal-backdrop fade loading" ></div>';
	html += '<div class="modal center-modal fade show loading-box" id="modal-mask">';
	html += '  <div class="modal-dialog">';
	html += '	<div class="modal-content">';
	html += '	  <div onclick="hideLoading()" class="close">&times</div>';
	html += '	  <div class="modal-body text-center"><div class="outer"></div>';
	html += '		' + txt;
	html += '	  </div>';
	html += '	</div>';
	html += '  </div>';
	html += '</div>';
	window.top.$("body").append( html);

	setTimeout(function(){
		window.top.$(".loading-box .close").css("display", "block");
	}, 3000);
	
	// 双击可关闭
	window.top.$(".loading, .loading-box").unbind("dblclick").bind("dblclick", function(){
		hideLoading();
	})
	
	if( option && option.isAutoClose){
		// 定时自动关闭
		setTimeout(function(){
			hideLoading();
		}, (option.closeTime || 3.6) * 1000);
	}
}

/**
 * 隐藏、关闭 全屏遮罩层
 * 
 * @returns
 */
function hideLoading() {
	$(".loading, .loading-box, .wx-loading").remove();
	if(window.top.$ && window.top.$(".loading, .loading-box, .wx-loading").length > 0){
		window.top.$(".loading, .loading-box, .wx-loading").remove();
	}
}

/**
 * 隐藏、关闭 全屏遮罩层
 * 
 * @returns
 */
function loading2(txt) {
	hideLoading();
	if( !txt || txt == undefined){
		txt = "加载中...";
	}
	var html = '';
	html += '<div class="modal-backdrop fade loading" ></div>';
	html += '<div class="modal center-modal fade show loading-box" id="modal-mask">';
	html += '  <div class="modal-dialog">';
	html += '	<div class="modal-content">';
	html += '<div class="loading-box2">';
	html += '	<img src="' + C.HOST + 'imusic/images/common/loading_note.png">';
	html += '  	<img class="loading" src="' + C.HOST + 'imusic/images/common/loading.png">';
	html += '	<span id="persentLabel">' + txt + '</span>';
	html += '</div>';
	html += '	  </div>';
	html += '	</div>';
	html += '  </div>';
	html += '</div>';
	
	$("body").append( html); 
}

function seaLoading(txt){
	hideLoading();
	if( !txt || txt == undefined){
		txt = "加载中...";
	}
	var html = '';
	html += '<div class="modal-backdrop fade loading" ></div>';
	html += '<div class="modal center-modal fade show loading-box" id="modal-mask">';
	html += '  <div class="modal-dialog">';
	html += '	<div class="modal-content sea-content">';
	html += '	 <div class="bubble-main-box"> <img class="bubble-box bubble-01" src="../../images/common/bubble.png"></img>';
	html += '	  <img class="bubble-box bubble-02" src="../../images/common/bubble.png"></img>';
	html += '	  <img class="bubble-box bubble-03" src="../../images/common/bubble.png"></img>';
	html += '	  <img class="bubble-box bubble-04" src="../../images/common/bubble.png"></img>';
	html += '	  <img class="bubble-box bubble-05" src="../../images/common/bubble.png"></img> </div>';
	html += '		' + txt || '';
	html += '	  </div>';
	html += '	</div>';
	html += '  </div>';
	html += '</div>';
	$("body").append( html);
}
function wxLoading(){
	hideLoading();
	var html = '';
	html += ' <div class="wx-loading"><div style="position:fixed;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,.2);z-index:999;"></div>';
	html += '  <div id="ajaxloader3" style="position:fixed;width:100px;height:100px;top:0;bottom:0;left:0;right:0;margin:auto;z-index:10000;">';
	html += '  	<div class="outer"></div>';
	html += '  	<div class="inner"></div>';
	html += '  </div></div>';
	$("body").append( html);
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
	} catch(e) {  
	}  
	return false;  
}  

/**
 * 弹出框 autoClose: 是否自动关闭， true：是；false：否
 */
jQuery.extend(jQuery, {
	/**
	 * 弹出框
	 * 
	 * @param id
	 *            弹出框ID
	 * @param url
	 * @param title
	 * @param afterSuccess
	 *            当打开页面关闭时调用回调函数
	 * @param options
	 *            弹出框参数
	 */
	popBigWindow: function(id, url, title, afterSuccess, options) {
		var params = $.extend({
			width: 800,
			height: 600,
			keyboard: true,
			showCloseBtn: false // 是否只显示关闭按钮，不显示弹窗标题
		}, options);
		url = initUrl( url);

		var isIframe = options.isIframe;
		var modalId = id + "Modal";
		var iframeId = id + "Iframe";
		try{
			// 删除原来有的层
			window.top.$("#" + modalId).remove();
		}catch(err){}
		
		var urlParams = getUrlParamJson(url);
		var iframeParams = options.params;
		if(iframeParams){
			for ( var key in iframeParams) { 
				var cvalue = iframeParams[key];
				if(cvalue){
					// 只有字符串才需要编码，为了防止可能是地址之类的； 否则都编码一下，结果都成字符串了
					urlParams[key] = typeof cvalue == "string" ? encodeURIComponent(cvalue) : cvalue;
				}
			}
		}else{
			// 兼容旧版本
			var flag = false;
			for ( var key in urlParams) { 
				flag = true;
			}
			if( !flag){
				for ( var key in modalParams) { 
					var cvalue = modalParams[key];
					if(cvalue){
						urlParams[key] = cvalue;
					}
				}
			}
		}
		
		// 将地址，参数存起来，vue的对象vm在页面初始化之后传入
		window.top.pageArr.push({
			date: window.top.pageParams ? window.top.pageParams.date : pageParams.date,
			vm: null,
			url : url,
			isDirect: false, // 是否页面直接跳转
			modalId: modalId,
			params : urlParams,
			iframeId: isIframe ? iframeId : "",
			pModalId: params.pModalId ? params.pModalId : "",
			closeCball: afterSuccess ? afterSuccess : null // 关闭时的回调函数
		})
		
		if( window != window.top){
			pageArr.push({
				closeCball: afterSuccess ? afterSuccess : null // 关闭时的回调函数
			})
		}
		
		// IE的最小2083
		if( url.length > 2083){
			url = url.split("?")[0];
		}
		
		url = url + (url.indexOf("?") == -1 ? "?" : "&") + "tmp=" + new Date().getTime();  
		
		var headerHei = 55;
		if(options.isCloseBtn == 0 || options.showCloseBtn){
			headerHei = 0;
		}
		var mWidth = 0, mHeight = 0, mcHeight = 0 ;
		if(params.width && (params.width + '').indexOf('rem') > -1){
			mWidth = params.width == "auto" ? '' : 'width:' + params.width + ';max-width: ' + params.width ;
			mHeight = mcHeight = params.height;
		}else{
			mWidth = params.width == "auto" ? '' : 'width:' + params.width + 'px;max-width: ' + params.width + 'px;';
			mHeight = params.height + 'px';
			mcHeight = (params.height - 55) + 'px';
		}
		
		// 点击蒙版是否关闭弹出框
		var isAriaHiddenHtml = '';
		if(!options.isAriaHidden){
			isAriaHiddenHtml = 'aria-hidden="true"';
		}
		var html = '';
		html += '<div class="modal center-modal bd-example-modal-lg fade ' + modalId + '" id="' + modalId + '" tabindex="-1" role="dialog" aria-labelledby="' + modalId + 'Title" ' + isAriaHiddenHtml + '>';
		html += '  <div class="modal-dialog modal-lg modal-dialog-centered" role="document" style="' + mWidth + '">';
		html += '    <div class="modal-content" style="height: ' + mHeight + ';">';
		if( options.showCloseBtn == true ){
			// 显示关闭按钮，但不显示标题栏
			html += '        <button type="button" class="close" onclick="closePop();" data-dismiss="modal" aria-label="Close" style="font-size: 40px; position: absolute; right: 17px; top: 2px;z-index: 1000;' + (options.closeBtnStyle || '') + '">';
			html += '          <span aria-hidden="true">&times;</span>';
			html += '        </button>';
		}else if(options.isCloseBtn != 0){
			html += '      <div class="modal-header">';
			html += '        <h5 class="modal-title" id="' + modalId + 'LongTitle">' + title + '</h5>';
			
			if( window.top.isExe() && !window.top.isAndroid() ){
				html += '	  <div class="keyboard" onclick="window.top.getSocket().runwincmd(\'osk\');"></div>';
			}
			
			html += '        <button type="button" class="close" onclick="closePop();" data-dismiss="modal" aria-label="Close" style="font-size: 40px; position: absolute; right: 15px; top: 5px;">';
			html += '          <span aria-hidden="true">&times;</span>';
			html += '        </button>';
			html += '      </div>';
		}
		if( isIframe){
			html += '      <div class="modal-body" style="height:' + mcHeight + ';padding:0;font-size:0;">';
			html += '      	<iframe id="' + iframeId + '" src="' + url + '" frameborder="0" style="overflow-y: auto;height:100%;width:100%;"></iframe>';
			if('outside'== options.showCloseBtn){ // 关闭按钮显示在外面
				html += '<div class="modal-close-btn" data-dismiss="modal" onclick="closePop();"></div>';
			}
		}else{
			html += '      <div class="modal-body" style="overflow-y: auto;height:' + mcHeight + ';">';
		}

		html += '      </div>'; 
		html += '    </div>';
		html += '  </div>';
		html += '</div>';
		 
		window.top.$(html).modal($.extend({
			keyboard: false,
			backdrop: 'static'
	    }, options)).on('shown.bs.modal', function (e) {
	    	// 加载页面
	    	if(afterSuccess){
	    		window.top.modalParams[id] = afterSuccess;
	    	}
	    	if( !isIframe){
	    		window.top.$("#" + modalId + " .modal-body").load(url);
	    	}
	    	
	    	// 双击可关闭
	    	window.top.$(".modal-backdrop").unbind("dblclick").bind("dblclick", function(){
	    		$(this).remove();
	    	})
		}).on('hide.bs.modal', function (e) {
			// 防止关闭日期弹窗的时候，不知道怎么跳到了这里
			if( e.target.className.indexOf("datetime") != -1){
				return;
			}
			hideLoading();
			destoryLastPage( e.target.id );
			window.top.$(".modal-backdrop").remove(); 
			window.top.$("." + modalId ).remove();
			
			if( options.hideCball && typeof options.hideCball == 'function'){
				options.hideCball();
			}
		}).on('hidden.bs.modal', function (e) {
			if( e.target.className.indexOf("datetime") != -1){
				return;
			}
			// 偶尔重复打开，关闭那么两个都要关掉
			// window.top.$("." + modalId ).prev(".modal-backdrop").remove();
			window.top.$(".modal-backdrop").remove(); 
			window.top.$("." + modalId ).remove();
		});
		
		console.log('popBigWindow url ', url);
	}
});

/**
 * 获取弹框的宽高
 * 
 * @param width
 * @param height
 * @returns
 */
function getPopWidHei( width, height){
//	var clientW = window.top.document.getElementsByTagName("body")[0].clientWidth;
//	var clientH = window.top.document.getElementsByTagName("body")[0].clientHeight;
/** updated by lhq 这样取才是取到屏宽，上面的如果页面有滚动条，取到的宽度会减去滚动条的宽度 */
	var clientW = $(window.top).outerWidth();
	var clientH = $(window.top).outerHeight();
	if( clientW <= width){
		width = clientW;
	}
	if( clientH <= height){
		height = clientH;
	}
	return {
		width : width,
		height : height
	};
}

/**
 * 获取屏幕的分辨率宽高
 * 
 * @param width
 * @param height
 * @returns
 */
function getScreenWidHei( rate){
	if(!rate){
		rate = 1;
	}
	var width = window.screen.width;
	var height = window.screen.height;
	return {
		width : width * rate,
		height : height * rate
	};
}

/**
 * 获取弹窗的默认宽高
 * 
 * @returns
 */
function getWinOpenWidHei(){
	var width = window.top.document.getElementsByTagName("body")[0].clientWidth * 0.95;
	var height = window.top.document.getElementsByTagName("body")[0].clientHeight * 0.95;
// var width = window.screen.width * 0.85;
// var height = window.screen.height * 0.85;
	return "width="+width+",height=" + height;
}

/**
 * 删除弹出框
 * 
 * @param dialogId
 */
function closePop( modalId){
	if( !modalId){
		var last = getLastPage();
		if(last){
			modalId = last.modalId;
		}	
	}
	var $modal = window.top.$("#" + modalId );
	if($modal.length > 0){  
		destoryLastPage( modalId);
		$modal.modal("hide");
		setTimeout(function(){
			// $modal.prev(".modal-backdrop").remove();
			window.top.$(".modal-backdrop").remove();
			$modal.remove();
			console.log("closePop setTimeout")
		}, 2600);
	}
}

/**
 * 删除弹出框
 * 
 * @param dialogId
 */
function removePop( modalId){
	var $modal = window.top.$("#" + modalId );
	if($modal.length > 0){
		$modal.modal("hide");
		setTimeout(function(){
			window.top.$("." + modalId ).remove();
		}, 1000);
	}
}

// 销毁vm对象
function destoryVm( vm){
	try {
		if( vm != null){
			vm.$destroy(); 
		}
	} catch (e) {
	}
}

/**
 * 消息提示框
 * 
 * @param title
 * @param txt
 * @returns
 */
function swAlert(title, txt, cball){
	swal({
		title: title,   
		text: txt && txt != undefined ? txt : "",
		confirmButtonText: "关闭"
	}, function(isConfirm){
		if(typeof cball == 'function'){
			cball(); 
		}
    });
}

/**
 * 会自动关闭的消息提示框
 * 
 * @param title
 * @param txt
 * @returns
 */
function swAutoAlert(title, txt, cball){
	swal({   
        title: title && title != undefined ? title : " " ,  
		text: txt && txt != undefined ? txt : " ", 
        timer: 2000,   
        showConfirmButton: false 
    });
	if(typeof cball == 'function'){
		setTimeout(function(){
			cball(); 
		}, 1900);
	}
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
function swConfirmCst(options, callback){
	// swal(Object.assign({
	swal($.extend({   
		title: '',   
		text: '',   
		type: "warning",   
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",   
		confirmButtonText: "确认",   
		cancelButtonText: "取消",   
		closeOnConfirm: true,   
		closeOnCancel: true 
	}, options), function(isConfirm){   
		callback( isConfirm); 
	});
}

/**
 * 底部黑色弹框
 * 
 * @param content
 * @param autoClose
 * @returns
 */
function autoAlert(content, autoClose, cb) {
	try {
		var $modalDiv = $(".auto-alert-modal");
		if($modalDiv.length > 0){
			$(".auto-alert-modal").fadeOut().remove();
		}
	} catch (e) {} 
	var topHeight = $(window).height() + $(document).scrollTop() - 140;
	var html = '<div id="autoAlertMoal" class="modal-dialog modal-sm auto-alert-modal" style="display: none;position: absolute;top: ' + topHeight + 'px; left: 10%;z-index:99999;font-size: 14px;width:auto;">';
	html += ' <div class="modal-content" style="background: rgba(69, 69, 69, .85); color: white;padding: 5px 15px; text-align: center;border-radius: 5px;">' + content + '</div></div>';
	$("body").append( html);
	
	// 设置位置（居中等），以及限制
	var $modal = $("#autoAlertMoal");
	var left = (($(window).width() - $modal.width())/2).toFixed(0);
	$modal.css("left", left + "px").fadeIn();
	
	$modal.bind("click", function(){
		$modal.remove();
		$modal = null;
		return typeof cb == 'function' && cb();
	});
	
	if(autoClose != false){
		// 自动隐藏
		setTimeout(function(){
			if( $modal == null){
				return;
			}
			$modal.fadeOut().remove();
			return typeof cb == 'function' && cb();
		}, 3600);
	}
}

/**
 * 根据参数名，获取URL中的参数
 * 
 * @param paramName
 * @returns {String}
 */
function getUrlParamValue(paramName) {
	var result = "";
	// 去除'#'hash后面的部分
	var url = document.URL.split('#')[0];
	url = url.substring((url.indexOf("?") != -1) ? (url.indexOf("?") + 1) : 0);
	var urlArr = url.split("&");
	for (var i = 0; i < urlArr.length; i++) {
		var arr = urlArr[i].split("=");
		if (arr[0] == paramName) {
			result = arr[1];
			break;
		}
	}
	return result;
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
 * 获取#app页面传递的参数
 * 
 * @param isRedirect
 *            是否页面跳转
 * @returns
 */
function getPageParams(){ 
	var last = getLastPage();
	if(last){
		var json = {};
		var params = last.params;
		for(var key in params){
			var cvalue = params[key];
			if( cvalue){
				json[key] = typeof cvalue == "string" ? decodeURIComponent(cvalue) : cvalue;
			}
		}
		return json;
	}else{
		return {noParams: 1};
	}
}

/**
 * 将vue对象vm存起来，方便在关闭当前页的时候销毁vue对象
 * 
 * @param vm
 * @returns
 */
function saveVm(vm){
	if(typeof C != "undefined" && C.TEST){
		debugger;
	}
	var last = getLastPage();
	if(last){
		last.vm = vm;
	}
}

/**
 * 页面关闭（跳转或关闭弹窗）时销毁对应的vm对象
 * 
 * @returns
 */
function destoryLastPage( modalId){
	var last = null;
	console.log("destoryLastPage modalId", modalId);
	if( modalId){
		var pageArr = window.top.pageArr;
		if( pageArr && pageArr.length > 0){
			var index = pageArr.length - 1;
			var page = pageArr[ index ];
			if( page.modalId == modalId){
				last = page;
				last.index = index;
			}
		}
	}else{
		last = getLastPage();
	}
	if(last){
		var vm = last.vm;
		if( vm){
			vm.$destroy(); 
		}
		if(!last.isDirect){
			window.top.pageArr.splice(last.index); 
		}
		console.log("destoryLastPage last 1", last);
	}
}

/**
 * 获取最后一页
 * 
 * @returns
 */
function getLastPage(addNum){
	if(!addNum){
		addNum = 1;
	}
	var page = null;
	if(window.top && window.top.pageArr.length > addNum - 1){
		for (var i = window.top.pageArr.length - addNum; i >= 0; i--) {
			var last = window.top.pageArr[i];
			if ((!last.isDirect && last.date == window.top.pageParams.date) || (last.isDirect && last.date == pageParams.date)) {
				page = last;
				last.index = i;
				break;
			}
		}
	}
	
	return page;
}


/**
 * 获取弹窗的回调函数
 * 
 * @returns
 */
function getModalCball(){
	var last = getLastPage(true);
	if(last){
		if(typeof last.closeCball == 'function'){
			return last.closeCball;
		}
	}else{
		return null;
	}
}

/**
 * 获取URL中的参数
 * 
 * @returns json
 */
function json2urlParams(json) {
	if( !json.TMP){
		json.TMP = C.VERSION + new Date().format("yyyyMMdd");
	}
	
	var urlParam = "";
	for ( var key in json) { 
		urlParam += "&" + key + "=" + encodeURIComponent( json[key]);
	}
	if( urlParam){
		urlParam = urlParam.substring(1);
	}
	// urlParam = initUrl( urlParam);
	return urlParam;
}

/**
 * 设置标题
 * 
 * @param title
 * @returns
 */
function setDocTitle( title){
	top.document.title = title;
}

/**
 * 查询课程列表
 * 
 * @param params
 * @param callback
 * @returns
 */
function queryCourseList(params, callback){
	if( !params){
		params ={};
	}
	params['rows'] = 100;
	params['page'] = 1;
	ajaxPost("HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=co.course!queryCourseList", params, function(res){
		if( res.result == 1){
			callback( JSON.parse( res.data).Rows);
		}else{
			callback( "");
		}
	});
} 

/**
 * 查询顶级分类列表
 * 
 * @param params
 * @param callback
 * @returns
 */
function queryTopQsCateList(params, callback){
	if( !params){
		params ={};
	}
	params['rows'] = 100;
	params['page'] = 1;
	
	if( !params['PARENT_ID']){
		params['PARENT_ID'] = "0";
	}
	 
	ajaxPost("HttpChannel?action=APP_ACTION&BUSINESS_TYPE=question.cate!query", params, function(res){
		if( res.result == 1){
			callback( JSON.parse( res.data).Rows);
		}else{
			callback( "");
		}
	});
} 

/**
 * 查询单个字典列表
 * 
 * @param categoryno
 *            字典类型
 * @param callback
 * @returns
 */
function queryCodeList(categoryno, callback){
	var params = {
		"CATEGORYNO" : categoryno
	}
	ajaxPost("HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=imusic.main!queryCodeList", params, function(res){
		if( res.result == 1){
			callback( JSON.parse( res.data).Rows);
		}else{
			swAlert("字典获取失败，请刷新页面后重试");
		}
	});
} 

/**
 * 查询多个字典列表
 * 
 * @param categorynos
 *            字典类型集合，格式：XXX,XXX,XXX
 * @param callback
 * @returns
 */
function queryMultiCodeList(categorynos, callback){
	var params = {
		"CATEGORYNOS" : categorynos
	}
	ajaxPost("HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=imusic.main!queryMultiCodeList", params, function(res){
		if( res.result == 1){
			callback( JSON.parse( res.data) );
		}else{
			swAlert("字典获取失败，请刷新页面后重试");
		}
	});
} 

/**
 * 查询多个系统参数
 * 
 * @param cnos
 *            系统参数ID集合，格式：XXX,XXX,XXX
 * @param callback
 * @returns
 */
function queryMultiParamList(cnos, callback){
	var params = {
		"CNO" : cnos
	}
	ajaxPost("HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=imusic.main!queryParamList", params, function(res){
		if( res.result == 1){
			callback( JSON.parse( res.data) );
		}else{
			swAlert("系统参数获取失败，请刷新页面后重试");
		}
	});
} 

/**
 * 查询我可见的级别
 * 
 * @param callback
 * @returns
 */
function queryAuthLevel(callback){ 
	ajaxPost("HttpChannel?action=APP_ACTION&BUSINESS_TYPE=imusic.main!queryAuthLevel", {}, function(res){
		if( res.result == 1){
			callback( JSON.parse( res.data).Rows);
		}
	});
} 

/**
 * 查询我可见的机构
 * 
 * @param callback
 * @returns
 */
function queryOrgList( callback){
	querySchoolList( callback, {
		SEL_COLUMNS: 'ORGCODE, SCHOOL_NAME AS ORGNAME'
	});
	// 直接废弃，查学校表更精确 update by zhoudc, 2022-01-22
//	ajaxPost("HttpChannel?action=APP_ACTION&BUSINESS_TYPE=imusic.main!queryOrgList", {}, function(res){
//		if( res.result == 1){
//			callback( JSON.parse( res.data).Rows);
//		}
//	});
} 

/**
 * 查询我可见的机构
 * 
 * @param callback
 * @returns
 */
function querySchoolList( callback, params){ 
	params = $.extend({
		NOT_COVER_TRANSFER: 1,
		PLATFORM_CODE : 'imusic',
		rows: 999}, params);
	ajaxPost("HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=bs.school!querySchoolList", params, function(res){
		if( res.result == 1){
			callback( JSON.parse( res.data).Rows);
		}
	});
} 

/**
 * 查询我可见的班级
 * 
 * @param callback
 * @returns
 */
function queryTrainList( callback, params){ 
	if(!params){
		params = {};
	}
	// 默认查询 启用中 的班级
	if( !params.TRAIN_STATUS){
		params.TRAIN_STATUS = C.TRAIN_STATUS_ING ? C.TRAIN_STATUS_ING : 2;
	}
	ajaxPost("HttpChannel?action=APP_ACTION&BUSINESS_TYPE=tr.train!queryList", params, function(res){
		if( res.result == 1){
			callback( JSON.parse( res.data).Rows);
		}
	});
} 

/**
 * 查询我可见的班级
 * 
 * @param callback
 * @returns
 */
function queryTermList(params, callback){ 
	ajaxPost("HttpChannel?action=APP_ACTION&BUSINESS_TYPE=tr.term!queryWithPage", params, function(res){
		if( res.result == 1){
			callback( JSON.parse( res.data).Rows);
		}
	});
} 


/**
 * 查询我可见的班级
 * 
 * @param callback
 * @returns
 */
function queryTrainPersonList(params, callback){ 
	var p = $.extend({
		AUDIT_STATUS : '1',
		pageSize : 999,
		ROWS : 999
	}, params);
	ajaxPost("HttpChannel?action=APP_ACTION&BUSINESS_TYPE=tr.person!queryWithPage", p, function(res){
		if( res.result == 1){
			callback( JSON.parse( res.data).Rows);
		}
	});
} 

/**
 * 字典：code转name
 * 
 * @param codeList
 *            字典列表
 * @param cvalue
 *            字典值
 * @returns
 */
function code2name(codeList, cvalue ){
	var value = '';
	try {
		if( !codeList || codeList.length == 0){
			return value;
		}
		var row;
		for (var i = 0; i < codeList.length; i++) {
			row = codeList[i];
			if( cvalue == row.CODE){
				value += "，" + row.NAME;
			}
		}
		if( value.indexOf("，") != -1){
			value = value.substring(1);
		}
	} catch (e) {
		console.log("code2name err" + e);
	}
	return value;
}

/**
 * 从列表中获取某个字段的值的集合
 * 
 * @param list
 *            列表
 * @param column
 *            字段名
 * @returns
 */
function getColValueList(list, column){
	var value = '';
	try {
		if( !list || list.length == 0){
			return value;
		}
		var row;
		for (var i = 0; i < list.length; i++) {
			value += "," + list[i][column];
		}
		if( value.indexOf(",") != -1){
			value = value.substring(1);
		}
	} catch (e) {
		console.log("getColValueList" + e);
	}
	return value;
}

/**
 * 字典：code转name，（code存值为多个字典code的和）
 * 
 * @param codeList
 *            字典列表
 * @param cvalue
 *            字典值
 * @returns
 */
function codeTotal2name(codeList, cvalue ){
	var value = '';
	try {
		if( !codeList || codeList.length == 0){
			return value;
		}
		var row;
		for (var i = 0; i < codeList.length; i++) {
			row = codeList[i];
			if( (cvalue & row.CODE) == row.CODE){
				value += "，" + row.NAME;
			}
		}
		if( value.indexOf("，") != -1){
			value = value.substring(1);
		}
	} catch (e) {
		console.log("codeTotal2name err" + e);
	}
	return value;
}

/**
 * 按钮点击操作，如保存、删除
 * 
 * @param url
 * @param params
 * @param btn
 *            点击按钮对象
 * @param cball
 *            回调函数
 * @returns
 */
function save(url, params, btn, cball){
	var btnTxt;
	if( btn.innerText.indexOf("保存") != -1 || btn.innerText.indexOf("删除") != -1){
		btnTxt = btn.innerText;
		btn.innerText = btnTxt + "中";
	}
	if( btn){
		btn.disabled = true;
	}
	ajaxPost(url, params, function(res) {
		if( btnTxt){
			btn.innerText = btnTxt;
		}
		if( btn){
			btn.disabled = false;
		}
		if (res.result == 1 ) {
			swAutoAlert( res.msg);
		} else {
			swAlert( (res.data && res.data != undefined) ? res.data : res.msg);
		}
		if( cball){
			cball(res);
		}
	}, function(res) { 
		if( btn){
			btn.disabled = false;
		}
		if( cball){
			cball(res);
		}
	});
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
	if (!source ) {
		return target;
	}
	if( !target){
		target = {};
	}
	for ( var key in source) {
		if( isKeyInTarget && isKeyInTarget != undefined && target[key] == undefined){
			continue;
		}
		try {
			var cvalue = source[key];
			if(cvalue && isJson( cvalue)){
				if( cvalue.length != undefined){
					// 数组
					var newArr = new Array();
					for (var i = 0; i < cvalue.length; i++) {
						if( isJson(cvalue[i])){
							newArr.push(copyJson(cvalue[i]));
						}else{
							// 基本类型
							newArr.push(cvalue[i]);
						}
					}
					target[key] = newArr;
				}else{
					target[key] = copyJson( cvalue);
				}
			}else{
				target[key] = cvalue;
			}
		} catch (e) {
			console.log("copyJson", e);
		}
	}
	return target;
}

/**
 * 构建谱例库文件内容展示
 * 
 * @param groupId
 * @returns
 */
function getMusicLibHtml(arr, groupId, showParams){
	if( !showParams){
		showParams = {}
	}
	var showMp3 = showParams.mp3 == undefined ? true : showParams.mp3;
	var showMp4 = showParams.mp4 == undefined ? true :  showParams.mp4 ;
	var showImg = showParams.img == undefined ? true : showParams.img;
	var showOther = showParams.other == undefined ? true : showParams.other;
	
	var file;
	var imgHtml = '', videoHtml = '', audioHtml = '', otherHtml = '';
  	var files = arr[ groupId];
  	for (var i = 0; i < files.length; i++) {
	  	file = files[i];
	  	if( showMp3 && file.FILETYPE == 'mp3'){
  			var id = groupId + "-" + i;
  			audioHtml += getFileAudioHtml(id, file.ATTACHURL);
	  	}else if( showMp4 && (file.FILETYPE == 'mp4' || file.FILETYPE == 'mkv')){
	  		videoHtml += '<video class="tbl-video" src="' + file.ATTACHURL + '" controls="controls" controlslist="nodownload">您的浏览器不支持视频播放，建议使用谷歌Chrome浏览器</video>';
	  	}else if (showImg && /(jpeg|jpe|jpg|gif|png|bmp|webp)$/i.test( file.FILETYPE)){
  			// imgHtml += '<a class="tbl-img js-click" href="' +
			// file.ATTACHURL
  			// + '"
  			// target="_blank"><img src="' + file.ATTACHURL + '" /></a>' ;
  			imgHtml += '<a class="tbl-img js-click"><img src="' + file.ATTACHURL + '" /></a>' ;
	  	}else if( showOther){
  			otherHtml += '<a class="tbl-abc js-click" >' + file.FILETYPE + '文件</a>' ;
	  		// otherHtml += '<a class="tbl-abc js-click" href="' +
	  		// file.ATTACHURL + '" target="_blank">abc文件</a>' ;
	  	}
	}
  	return imgHtml + videoHtml + audioHtml + otherHtml;
}

/**
 * 获取音频文件的html
 * 
 * @param id
 * @param audioUrl
 * @returns
 */
function getFileAudioHtml(id, audioUrl){ 
	var audioHtml = '<img id="img' + id + '" onclick="audioImgClick( this)" src="../../css/termcourse/images/icon_qs_play.png" class="audio-play-pause js-click"/>';
	audioHtml += '<audio id="audio' + id + '" src="' + audioUrl + '" onended="audioEnd(this)" class="hide" controlslist="nodownload">您的浏览器不支持音频播放，建议使用谷歌Chrome浏览器。</audio>';
	return audioHtml;
}

/**
 * 点击音频图片，播放/暂停音频
 * 
 * @param id
 * @returns
 */
function audioImgClick( img, playUrl, pauseUrl) {
	var id = img.id.replace("img", "");
	var audio = document.getElementById("audio" + id);
	if (audio.paused) {
		audio.play();
		// img.src = (playUrl && playUrl != undefined) ? playUrl :
		// "../../../images/wx/sign/audio_pause.png";
		img.src = (playUrl && playUrl != undefined) ? playUrl : "../../css/termcourse/images/icon_qs_pause.png";
	} else {
		audio.pause();
		// img.src = (pauseUrl && pauseUrl != undefined) ? pauseUrl :
		// "../../../images/wx/sign/audio_play.png";
		img.src = (pauseUrl && pauseUrl != undefined) ? pauseUrl : "../../css/termcourse/images/icon_qs_play.png";
	}
	
	var intervalId = null;
	intervalId = setInterval(function(){
		if( document.getElementById("audio" + id) == null){
			if (audio.paused != null && !audio.paused) {
				audio.pause();
			}
			if( intervalId != null){
				clearInterval(intervalId);
			}
		}
	}, 1000);
}

/**
 * 音频播放结束，将图片切换回播放状态
 * 
 * @param audio
 * @returns
 */
function audioEnd(audio, playUrl) {
	var id = audio.id.replace("audio", "img");
	var img = document.getElementById(id);
	img.src = (playUrl && playUrl != undefined) ? playUrl : "../../css/termcourse/images/icon_qs_play.png";
}

/**
 * 保存当前页面的查询条件至全局参数中
 * 
 * @param key
 *            全局参数中的key，自定义
 * @param selFrm
 *            vue对象的查询条件
 * @returns
 */
function saveQueryParams(key, selFrm){
	gloParams[key] = selFrm;
}

/**
 * 返回上一页时，将上一个方法saveQueryParams中保存的参数重新赋值回来
 * 
 * @param key
 *            全局参数中的key，自定义
 * @param selFrm
 *            vue对象的查询条件
 * @returns
 */
function initQueryParams(key, selFrm){
	var params = gloParams[key];
	if (params && params != undefined) {
		gloParams[key] = ''; 
		for ( var key in params) {
			if( "token,USER_NAME,ORGCODE".indexOf(key) != -1){
				continue;
			}
			Vue.set(selFrm, key, params[key]);
		}
	}
}

/**
 * 权限过滤
 * 
 * @param auth
 *            拥有的权限值，一般用于删除没有用户不具备权限的操作按钮
 * @returns
 */
function auth( auth, isVueNext){  
	if( isVueNext != undefined && isVueNext == true){
		Vue.nextTick(function () {
			// DOM 更新了
			$(".rightval").each(function(){
				var rightVal = $(this).attr("data-rightval");
				if( ( auth & rightVal) != rightVal ){
					$(this).remove();
				}
			});
		})
	}else{
		// DOM 更新了
		$(".rightval").each(function(){
			var rightVal = $(this).attr("data-rightval");
			if( ( auth & rightVal) != rightVal ){
				$(this).remove();
			}
		});
	}
}

/**
 * 权限过滤
 * 
 * @param auth
 *            拥有的权限值，一般用于删除没有用户不具备权限的操作按钮
 * @returns
 */
function authHide( auth, isVueNext){  
	if( isVueNext != undefined && isVueNext == true){
		Vue.nextTick(function () {
			// DOM 更新了
			$(".rightval").each(function(){
				var rightVal = $(this).attr("data-rightval");
				if( ( auth & rightVal) != rightVal ){
					$(this)[0].style.display = "none";
				}
			});
		})
	}else{
		// DOM 更新了
		$(".rightval").each(function(){
			var rightVal = $(this).attr("data-rightval");
			if( ( auth & rightVal) != rightVal ){
				$(this)[0].style.display = "none";
			}
		});
	}
}

/**
 * 获取随机数
 * 
 * @param numLen
 *            随机数长度
 * @param maxValue
 *            最大值（定义范围）
 * @param isNotRepeat
 *            true: 排除重复数据
 * @returns
 */
function getRandNum(numLen, maxValue, isNotRepeat){
	if( !isNotRepeat){
		isNotRepeat = false;
	}
	
    var rnd = "";
    for(var i = 0; i < 1000; i++){
    	var cValue = Math.floor(Math.random() * maxValue);
    	if( isNotRepeat && rnd.indexOf(cValue) != -1){
    		continue;
    	}
    	rnd += cValue;
    	if( rnd.length >= numLen){
    		break;
    	}
    }
    return rnd;
}

/**
 * 从abc内容中获取速度、节拍
 * 
 * @param content
 * @param fn
 * @returns
 */
function getSpeedAndBeatByAbc(content,fn){
	// 速度
    var regQ = new RegExp("Q:.*(?=\\n)");
	// 拍号
    var regM = new RegExp("M:.[0-9|/|C|C\|]*(?=\\n)");
    var q = regQ.exec(content);
    var m =regM.exec(content);
    var qArr;
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
	}
    
	var speed = 0;
    if(qArr.length > 0){
        var sp = qArr[1]; // 速度
        var arr = qArr[0].split('/');
        var p = eval(qArr[0]); // 最小单位的时值
        // var sp1 = (1/(mValue.split('/')[1]))/ p * sp;
        var sp1 = sp * mValue.split('/')[1] / arr[1];
        speed = 60 / sp1;
    }else{
        speed = 60 / qArr[0]; // 速度
    }
    console.log('curSpeed: ' + speed);
    return typeof fn == 'function' && fn(beet,speed);
}

/**
 * 从abc内容中获取速度、节拍
 * 
 * @param content
 * @param fn
 * @returns
 */
function getSpeedByAbc(content, fn){
	// 速度
	var regQ = new RegExp("Q:.*(?=\\n)"); 
	var q = regQ.exec(content);
	var qArr = q[0].replace('Q:','').split("=");
	
	var speed = qArr.length > 0 ? parseInt( qArr[1]) : 0 ;
	return typeof fn == 'function' && fn( speed);
}

/**
 * 根据页面宽度来设置根元素的字体大小
 * 
 * @param winWidth
 * @param fontSize
 * @returns
 */
function setHtmlFontSize( winWidth, fontSize){
	if( !winWidth || winWidth == undefined){
		winWidth = 1920;
	}
	if( !fontSize || fontSize == undefined){
		fontSize = 100;
	}
	// 如果页面宽度小于最小宽度，那么页面上的基础单位（html的font-size属性）需要变更
	(function (doc, win) {
	    var docEl = doc.documentElement, resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	        recalc = function () {
	            // var clientWidth = docEl.clientWidth > winWidth ? winWidth :
				// docEl.clientWidth;
	            var clientWidth = docEl.clientWidth ;
	            if (!clientWidth) return;
	            var fontSizeNew = ( clientWidth * fontSize / winWidth).toFixed(1);
	            docEl.style.fontSize = fontSizeNew + 'px';
	        };
	    if (!doc.addEventListener) return;
	    win.addEventListener(resizeEvt, recalc, false);
	    recalc(fontSize);
	})(document, window);
}

/**
 * 获取图片的原始尺寸宽高
 * 
 * @param img
 *            dom对象
 * @param callback
 *            回调函数
 * @returns
 */
function getImgWidthHeight(imgId, callback) {
    var nWidth, nHeight;
    var img = document.getElementById( imgId);
    if( img == null){
    	return;
    }
    if (img.naturalWidth) { // 现代浏览器
        nWidth = img.naturalWidth;
        nHeight = img.naturalHeight;
        callback(nWidth, nHeight);
    } else { // IE6/7/8
        var imgae2 = new Image();
        imgae2.src = img.src;
        imgae2.onload = function() {
            callback(imgae2.width, imgae2.height);
        }
    };
}

/**
 * 开启长连接，防止一些涉及到文件的保存操作，因为时间过长，而被NGINX断掉（如备课）
 * 
 * @returns
 */
function keepConnect( keepIntervalId) { 
	if (keepIntervalId && keepIntervalId != 0) {
		clearInterval(keepIntervalId);
	}
	keepIntervalId = setInterval(function() {
		ajaxPost("HttpChannel?action=APP_ACTION&BUSINESS_TYPE=imusic.main!keepConnect", {}, function(res) {
			console.log("keepConnect");
		});
	}, 50 * 1000);
	return keepIntervalId;
}

// 单音播放
// 调用前引入midiJs <script src="/ixzdscommon/abc/js/abcjs_midi_5.2.0.js"
// type="text/javascript"></script>
// 如： var ins = new PlayNoteUtil();
// ins.play('C')
// 
function PlayNoteUtil(){
	
	this.notePreString = 'L:4/4\nK:C\nV:1 clef=treble\n';
	this.midiId = 'midi-id';
	
	// 创建midi 播放器
	this.init = function(){
		// abcjs_midi_5.2.0.js 这几个变量未声明，控制台会报错。
		window.noteon_time=0;
		window.noteoff_time=0;
		window.curr_time=0;
		window.last_time=0;
		// -------------------------
		window.playnotes = [];
		if(!document.getElementById('div')){
			var el = document.createElement("div");
			el.id = this.midiId;
			document.getElementsByTagName('body')[0].appendChild(el); 
		}
	}
	this.init();
	// 播放音符
	this.play = function( note){
		ABCJS.renderMidi(
				this.midiId,
			    this.notePreString + note,
			    {
			        inlineControls: {
			            hide: true,
			        },
			    });
		ABCJS.midi.startPlaying(document.querySelector(".abcjs-inline-midi"));
	}
	
}

/**
 * 获取当前事件
 * 
 * @returns
 */
function getEvent() {
	return (window.event) ? window.event : null;
}

/**
 * 禁用右键
 * 
 * @returns
 */
function banRightClick(){
// $(document).bind("contextmenu",function(e){ return false; });
}

/**
 * 禁用返回键，防止页面后退，屏蔽浏览器，键盘等页面后退功能
 * 
 * @returns
 */
function banHistoryBack( callback){
	history.pushState(null, null, document.URL);
	window.addEventListener('popstate', function() {
		if( typeof callback == 'function'){
			callback();
		}
		history.pushState(null, null, document.URL);
	});
}

banHistoryBack();


/**
 * 登出
 * 
 * @returns
 */
function getPo( tableName, keyName, keyValue, cball) {
	var params = {
		TABLE_NAME : tableName,
		KEY_NAME : keyName,
		KEY_VALUE : keyValue
	}
	ajaxPost("HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=imusic.main!getPo", params, function(res) {
		var po = (res.result == 1 && res.data) ? JSON.parse( res.data) : null;
		if(cball){
			cball( po);
		}
	});
}


/**
 * 动态加载脚本
 * 
 * @param url
 * @param callback
 * @returns
 */
function loadJs(url, cball){
	var row;
	var sList = document.getElementsByTagName('script');
	for ( var i in sList) {
		row = sList[i];
		if ( row.src && row.src.indexOf(url) > -1 && cball) {
			cball(true);
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
                	cball(true);
                }
            }
        };
    } else { // Others
        script.onload = function(){
            if(cball){
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
}


/**
 * 动态加载脚本
 * 
 * @param url
 * @param callback
 * @returns
 */
function loadCss(url, options){
	options = $.extend({
		attrArr:[],
		success : null
	}, options);
	
	var row;
	var sList = document.getElementsByTagName('link');
	for ( var i in sList) {
		row = sList[i];
		if ( row.src && row.src.indexOf(url) > -1 && cball) {
			cball();
			return ;
		}
	}
	
	var link = document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = url;
	
	if(options.attrArr){
		var attr;
		for (var i = 0; i < options.attrArr.length; i++) {
			attr = options.attrArr[i];
			var att = document.createAttribute(attr.code);
			att.value = attr.name;
			link.setAttributeNode(att);
		}
	}
	 
	if (link.readyState){ // IE
		link.onreadystatechange = function(){
			if (link.readyState == "loaded" || link.readyState == "complete"){
				link.onreadystatechange = null;
				if(typeof options.success == 'function'){
					options.success();
				}
			}
		};
	} else { // Others
		link.onload = function(){
			if(typeof options.success == 'function'){
				options.success();
			}
		};
	}
	document.getElementsByTagName("head")[0].appendChild(link);
}



/**
 * 当前版本是否是完整版（网络版）
 * 
 * @returns
 */
function isVersionComplete(){
	var cookiePlat = getCookie("platform");
	if (cookiePlat && isJsonString(cookiePlat)) {
		var platform = JSON.parse(cookiePlat);
		if (platform.IS_VERSION_COMPLETE == "1") {
			return true;
		}
	}
	return false;
}
/**
 * 当前版本是否是完整版（网络版）
 * 
 * @returns
 */
function isVersionComplete(){
	return getVersion() == "complete";
}

/**
 * 当前版本是否是普及版
 * 
 * @returns
 */
function isVersionCommon(){
	return getVersion() == "common";
}

/**
 * 当前版本是否是标准版
 * 
 * @returns
 */
function isVersionStandar(){
	return getVersion() == "standar";
}

/**
 * 当前版本是否是互动版
 * 
 * @returns
 */
function isVersionInteract(){
	return getVersion() == "interact";
}

function getVersion(){
	var cookiePlat = getCookie("platform");
	if (cookiePlat && isJsonString(cookiePlat)) {
		var platform = JSON.parse(cookiePlat);
		return platform.VERSION;
	}
	return "common";
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
 * 通过URL获取ABC内容
 * 
 * @param abcUrl
 * @returns
 */
function getAbcByUrl(abcUrl, cb){
	ajaxPost('HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=oe.music.library!getAbcContent',{
		IMAGE_PATH: abcUrl
	}, function(res){
		if(res && res.result == 1){
			typeof(cb) == 'function' && cb (res.data);
			return res.data;
		}else{
			typeof(cb) == 'function' && cb (false);
			return false;
		}
	})
}

/**
 * 是否PC端
 * 
 * @returns
 */
function isPc(){
	var userAgentInfo = navigator.userAgent;
    var agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
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
 * 将数组中的某个字段取出来，拼成XX,XX,XX
 * 
 * @param rows
 * @param column
 *            可为空
 * @returns
 */
function arr2str(rows, column){
	var cvalue = "";
	if( !rows || rows.length == 0){
		return cvalue;
	}
	for (var i = 0, cArr; i < rows.length; i++) {
		if(column){
			cArr = column.split(":");
			if(cArr && cArr.length > 1){
				if(!rows[i][cArr[0]]){
					continue;
				}
				cvalue += "," + rows[i][cArr[0]] + ':' + rows[i][cArr[1]];
			}else{
				cvalue += "," + rows[i][column];
			}
		}else{
			cvalue += "," + rows[i];
		}
	} 
	if(cvalue){
		cvalue = cvalue.substring(1);
	}
	return cvalue;
}

/**
 * 过滤数组，查出字段集合
 * 
 * @param rows
 *            数组
 * @param equCol
 *            要判断的列名
 * @param equColVal
 *            要判断的列名的值
 * @param resultCol
 *            要返回的列字段名称
 * @returns
 */
function arr2strByEqu(rows, equCol, equColVal, resultCol){
	var cvalue = "";
	if( !rows || rows.length == 0){
		return cvalue;
	}
	var row ;
	for (var i = 0; i < rows.length; i++) {
		row = rows[i];
		if(equColVal == row[equCol]){
			cvalue += "," + row[resultCol];
		} 
	}
	if(cvalue){
		cvalue = cvalue.substring(1);
	}
	return cvalue;
}

/**
 * 根据操作权限显示或隐藏表格中的按钮
 * 
 * @param tableData
 * @param classString
 * @returns
 */
function opAuth2Btn(tableData, classString){
	var arr = new Array();
	var clsArr = classString.split(",");
	for (var j = 0; j < clsArr.length; j++) {
		var tmpArr = document.getElementsByName(clsArr[j]);
		if(tmpArr){
			arr = arr.concat(tmpArr);
		}
	}
	var user = getUserPo();
	var row;
	for (var i = 0; i < tableData.length; i++) {
		row = tableData[i];
		if( row.IS_SESSION_TIMEOUT == '1'){
			swAutoAlert("登录信息已失效，请重新登录", "", function(){
				top.location.href = loginUrl + location.search;
			});
		}
		
		// 亳州的需求：老师只能修改自己创建的习题
		var flag =  'bzxy' == user.orgCode && user.userType == 1 && user.isManager != 1 ;
		if(flag){
			row.OP_AUTH = row.CREATE_BY == user.personId? '1' : '0';
		}
		if('bzxy' == user.orgCode && user.userType == 1 && user.isManager == 1){
			row.OP_AUTH = 1;
		}
		
		for (var j = 0; j < arr.length; j++) {
			var $btn = arr[j][i];
			if($btn){
				$btn.style.display = row.OP_AUTH == "1" ? "inline-block" : "none";
			}
		}
	}
}


/**
 * 初始化页面的拖动事件
 * 
 * @returns
 */
function initWindowDrag( isPc, moveCball, endCball) {
	var startMethod = isPc ? "mousedown" : "touchstart";
	var moveMethod = isPc ? "mousemove" : "touchmove";
	var endMethod = isPc ? "mouseup" : "touchend";
	$(document).off(moveMethod).on(moveMethod, function(e) {
		if (!!this.move) {
			if( !isPc){
				e = getMouseEvent( e);
			}
			var posix = !document.move_target ? {
				'x' : 0,
				'y' : 0
			} : document.move_target.posix;
			var callback = document.call_down || function() {
				// console.log("call-down")
			};
			callback.call(this, e, posix);
			
			if( moveCball == 'function'){
				moveCball( e);
			}
		}
	}).off(endMethod).on(endMethod, function(e) {
		if (!!this.move) {
			if( !isPc){
				e = getMouseEvent( e);
			}
			var callback = document.call_up || function() {
			};
			callback.call(this, e);
			$.extend(this, {
				'move' : false,
				'move_target' : null,
				'call_down' : false,
				'call_up' : false
			});
			
			if( endCball == 'function'){
				endCball( e);
			}
		}
	});
}

// 获取拖动事件，触屏和鼠标是不一样的
function getMouseEvent(e) {
	if (e.changedTouches && e.changedTouches.length > 0) {
		return (e.changedTouches)[0];
	}
	return e;
}

/**
 * 整个区域鼠标按下事件
 * 
 * @param that
 * @param model
 * @param e
 * @returns
 */
function mouseDown(e, options) {
	var e = getMouseEvent(e);
	options = $.extend({
		width: 300,
		left: 0,
		cball: null
	}, options);
	
	var range = $(window).height() / 3;
	var posix = {
		'x' : e.pageX,
		'y' : e.pageY
	};
	$.extend(document, {
		'move' : true,
		'move_target' : this,
		'call_up' : function(e) {
			e = getMouseEvent(e);
			// 仅限点击屏幕两边的操作时，才能进行翻页
			if (e.pageX > (options.width + options.left) && e.pageX < $(window).width() - options.width) {
				return;
			}
			var direction = "";
			if (e.pageX - posix.x > 80) {
				direction = "right"; 
			} else if (e.pageX - posix.x < -80) {
				direction = "left"; 
			} else if (e.pageY - posix.y > 80) {
				direction = "down"; 
			} else if (e.pageY - posix.y < -80) {
				direction = "up"; 
			}
			
			if( direction && typeof options.cball == 'function'){
				// 是否打开画笔，防止平板上误触发，所以在屏幕1/3处以上下拉时，才能打开画笔
				var isBrushOpen = posix.y < range;
				options.cball( direction, isBrushOpen);
			}
		}
	});
}

/**
 * 初始化 window 的 resize 事件
 * 
 * 没有一触发resize就调用相关的回调函数，性能不好
 * 
 * @param cball
 * @returns
 */
function initWinResize(cball) {
	var lastWidth = $(window).width();
	var lastHeight = $(window).height();
	var count = 3;
	var intervalId = 0;
	$(window).resize(function() {
		count = 3;
		if (intervalId) {
			return;
		}
		intervalId = setInterval(function() {
			count--;
			if (count == 0) {
				var width = $(window).width();
				var height = $(window).height();

				var xMove = Math.abs(lastWidth - width);
				var yMove = Math.abs(lastHeight - height);
				console.log("xMove, yMove", xMove, yMove);

				lastWidth = width;
				lastHeight = height;

				clearInterval(intervalId);
				intervalId = 0;

				if (typeof cball == 'function') {
					cball(xMove, yMove);
				}
			}
		}, 250);
	})
}


/**
 * 获取数组中的元素
 * 
 * @param arr
 *            数组
 * @param col
 *            字段名称
 * @param val
 *            字段名称对应的值
 * @returns 数组
 */
function getArrItem(arr, col, val) {
	return arr && arr.find(function(item) {
		return (item[col] == val);
	})
}

/**
 * 获取符合条件的数组第一个元素位置下标
 * 
 * @param arr
 *            数组
 * @param col
 *            字段名称
 * @param val
 *            字段名称对应的值
 * @returns 下标
 */
function getArrIdx(arr, col, val) {
	return arr && arr.findIndex(function(item) {
		return (item[col] == val);
	})
}
/**
 * 设置logo，默认是小知大数 /ixzdscommon/favicon.ico
 * 
 * @returns
 */
function setFavicon( projectCode){
	if( !projectCode){
	 	var school = getSchool();
	 	if(school){
	 		projectCode = school.PROJECT_CODE;
	 	}
	}
	$("link[rel='icon']").attr("href", "/ixzdscommon/" + (projectCode == 'ajd' ? 'ajd48' : 'favicon') + ".ico?tmp=" + new Date().getTime());
}

// 打开即调用
setFavicon();

/**
 * 获取鼠标选中的文本
 * 
 * @returns
 */
function getMouseSelectText() {
    var txt = "";
    if( document.selection) {
        txt = document.selection.createRange().text;
    } else {
        txt = document.getSelection(); 
    }
    return $.trim(txt.toString());
}

/**
 * 加载页面
 * 
 * @param selector
 * @param url
 * @returns
 */
function loadByAjax(selector, url) {
	axios.get(url).then(function(res) {
		$(selector).append(res.data);
	});
}

/**
 * 打开弹窗
 * 
 * @param isAndroid
 * @param socket
 * @param url
 * @param name
 * @returns
 */
function openWin(url, name, spec, replace){
	if( !name){
		name = "";
	}
	var win = null;
	url = initUrl( url);
	// alert( "isAndroid(): " + isAndroid() + ", top.getSocket: " + (top.getSocket == 'function') )
	console.log("openWin url", url)
	if( isExe() ){
		// alert("isAndroid 2: " + isAndroid());
		// top.getSocket().sendMsg2exe("openwindow", name, url);
		top.location.href = url;
	}else{
		if(spec){
			win = window.top.open(url, name, spec, replace);
		}else {
			win = window.top.open(url, name);
		}
	}
	return win;
}

/**
 * 初始化地址，主要是加上临时参数
 * @returns
 */
function initUrl( url){
	if(!url){
		return url;
	}
	
	if( url.indexOf("?") == -1 ){
		url += "?";
	}
	
	var date = new Date().format("yyyyMMdd");
	if( typeof C == 'object'){
		date = C.VERSION + date;
	}
	
	if( url.indexOf("TMP=") == -1 ){
		url += "&TMP=" + date;
	} else {
		url += "&V=" + date;
	}
	return url;
}

/**
 * 设置返回上一页的参数
 * 
 * @returns
 */
function setHistoryBackParams(){
	if( top.location != location){
		return;
	}
	
	var isExists = false;
	var href = location.href;
	var pathname = location.pathname;
	var historyCookie = getTopCookie2json("historyCookie");
	
	if( historyCookie && historyCookie.length > 0){
		var last = historyCookie[ historyCookie.length - 1];
		if( last.pathname == pathname){
			isExists = true;
			last.href = href;
		} 
	}else{
		historyCookie = [];
	}
	
	if( !isExists){
		historyCookie.push({
			pathname : pathname,
			href : href,
			len : history.length
		});
	}
	setTopCookie("historyCookie", JSON.stringify(historyCookie));
}

setHistoryBackParams();

/**
 * 关闭、返回
 * 
 * @returns
 */
function closeWin(){
	loading("返回中...");
	if(isExe()){
		var url = top.host + "imusic/pages/main/main_teaching.html" + top.location.search;
		var historyCookie = getTopCookie2json("historyCookie");
		
		if( historyCookie && historyCookie.length > 0){
			var pathname = top.location.pathname;
			
			var idx, row;
			for (var i = historyCookie.length - 1; i >= 0; i--) {
				row = historyCookie[i];
				if( row.pathname == pathname){
					idx = i;
					break;
				}
			}
			
			if( idx != undefined && idx >= 0){
				historyCookie.splice( idx );
				setTopCookie("historyCookie", JSON.stringify(historyCookie));	
				
				if( idx >= 1){
					url = historyCookie[idx - 1].href;
				}
			}
		}else{
			top.window.close();
			hideLoading();
		}
		
		if( url.indexOf("main_teaching.html") != -1){
			// 都已经回到首页了，那么就清空吧，不然再返回都不知道调哪里去了
			setTopCookie("historyCookie", "[]");
		}
		top.location.href = url;
	}else{
		top.window.close();
		hideLoading();
	}
}

/**
 * 初始化一些exe传进来的参数
 * @param that
 * @param isDefNotByCookie 是否根据cookie设置默认值
 * @returns
 */
function exeParamsInit(that, isDefNotByCookie) {
	var paramsJson = getUrlParamJson(top.document.URL, true);
	// 防止报错
	if( !that.params){
		that.params = {};
	}
	
	// 防止跳来跳去，参数漏掉了
	var arr1 = ['isAndroid', 'isExe', 'isPad', 'isDd', 'isAlone', 'isRoot'];
	var arr2 = ['IS_ANDROID', 'IS_EXE', 'IS_PAD', 'IS_DD', 'IS_ALONE', 'IS_ROOT'];
	for (var i = 0, len = arr1.length; i < len; i++) {
		var value = "0";
		var name1 = arr1[i];
		var name2 = arr2[i];
		if( paramsJson[name2] != undefined){
			value = (paramsJson[name2] == "1") ? "1" : "0";
			setCookie(name1, value);
		}else if( !isDefNotByCookie){
			value = getCookie(name1) || "0";
		}
		Vue.set(that.params, name2, value);
	}
	
	if (paramsJson.IS_VCONSOLE == '1') {
		var vConsole = new VConsole();
	}
}

/**
 * 初始化socket设置
 * 
 * @param that
 * @param options
 * @returns
 */
function socketInit(that, openCball, closeCball, errorCball, msgCball, options) {
	if (!that.isExe) {
		return;
	}
	options = $.extend({
		vueObj : that
	}, options);
	imusicCommon.socket.vueObj = that;
	
	if(options.WS_PORT){
		var reg = /\:\d+/g;
		
		C.SOCKET_STU = C.SOCKET_STU.replace(reg, `:${options.WS_PORT}`);
		C.SOCKET_TEAC = C.SOCKET_TEAC.replace(reg, `:${options.WS_PORT}`);
		console.log('C.SOCKET_STU--',C.SOCKET_STU,'C.SOCKET_TEAC--',C.SOCKET_TEAC);
	}
	
	if (that.params.IS_TEAC_PIANO == '1') {
		// 教师端钢琴，模拟成学生端，功能还是教师的功能，只是连接端口换了
		loadJs("../../js/main/socket_teac_piano.js", function() {
			imusicCommon.socket.socketObj = that.socketTeac = new Socket(C.SOCKET_STU, openCball, closeCball, errorCball, msgCball, options);
		});
	} else if (that.isTeac) {
		// 教师授课端
		loadJs("../../js/main/socket_teac.js", function() {
			imusicCommon.socket.socketObj = that.socketTeac = new Socket(C.SOCKET_TEAC, openCball, closeCball, errorCball, msgCball, options);
		});
	} else {
		loadJs("../../js/main/socket_stu.js", function() {
			imusicCommon.socket.socketObj = that.socketStu = new Socket(C.SOCKET_STU, openCball, closeCball, errorCball, msgCball, options);
		});
	}
}

/**
 * 
 * 获取socket对象
 * 
 * @returns
 */
function getSocket() {
	return imusicCommon.socket.socketObj;
}

/**
 * 收到WS发来的消息，在electron主进程中调用，学生端使用，该方法给exe调用
 * 
 * @param method
 * @param method2
 * @param msg
 * @returns
 */
function receiveWsMessage(method, method2, msg) {
	var that = imusicCommon.socket.vueObj;
	var socket = imusicCommon.socket.socketObj;
	// console.log("receiveWsMessage 2 -- ", method + "," + method2 + "," + msg + ", " + that.isTeac);
	// 这里可以处理各种消息要求，比如显示请注意黑板等
	if (!that.isTeac) {
		var data = {
			status : 1,
			method : method,
			method2 : method2,
			message : msg
		};
		console.log("imusiccommon receiveWsMessage", data);
		if (that.params.IS_ANDROID == '1') {
			if (socket && typeof socket.onMessage == 'function') {
				socket.onMessage({
					data : JSON.stringify(data)
				});
			}
		} else {
			socket.msgFromTeac(data);
		}
	}
}

/**
 * 教师是否为一个大屏对应多个无屏幕的钢琴
 * 
 * @returns
 */
function isBigscreen2noscreenpiano(){
	var json = getUrlParamJson(top.document.URL);
	return "bigscreen2noscreenpiano" === json.EXE_VER;
}

/**
 * 是否谷歌浏览器
 * 
 * @returns
 */
function validateChrome(){
	if( navigator.userAgent.toLowerCase().match(/chrome/) == null){
		if(typeof swal == 'function'){
			swAlert("请使用谷歌浏览器进行访问", "谷歌浏览器对音乐技术的支持比较完善\r\n\r\n复制以下地址进入下载页面\r\n\r\nhttps://www.google.cn/chrome");
		}else{
			alert("请使用谷歌浏览器进行访问\r\n\r\n谷歌浏览器对音乐技术的支持比较完善\r\n\r\n百度搜索“谷歌浏览器官网”进入下载");
		}
		return false;
	}
	return true;
}

/**
 * exe中，url添加默认参数
 * 
 * @returns
 */
function addUrlParams(url){
	var json = getUrlParamJson(top.document.URL);
	
	if( url.indexOf("?") == -1){
		url += "?";
	}
	if( url.indexOf("&IS_EXE=") == -1 && json.IS_EXE == 1){
		url += "&IS_EXE=1";
	}
	if( url.indexOf("&IS_ANDROID=") == -1 && json.IS_ANDROID == 1){
		url += "&IS_ANDROID=1";
	}
	if( url.indexOf("&USER_TYPE=") == -1 && json.USER_TYPE){
		url += "&USER_TYPE=" + json.USER_TYPE;
	}
	if( url.indexOf("&TMP") == -1){
		url += "&TMP=" + new Date().getTime();
	}
	return url;
}

/**
 * 将转义字符 转成 html 代码
 * 
 * @param content
 * @returns
 */
function code2html(content) {
	return content.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", "\"");
}

function setPrevPath(path){
	if( path && path.indexOf('/') >-1 && path.indexOf('http') == -1){
		return top.domain + path;
	}
	return path;
}


function getPlatformInfo( param, cb){ // 获取平台信息
	if(getCookie('platform')){
		return typeof cb == 'function' && cb();
	}
	ajaxPost2(C.HOST + "HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=imusic.main!getPlatformInfo", {}, function(res){
		if( res.result == 1){
			var platform = JSON.parse( res.data); 
			setCookie("platform", JSON.stringify( platform));
			setFileUrl();
			return typeof cb == 'function' && cb();
		}
	});
}

function getActiveSchoolInfo(cb){ // 获取激活码对应学校
	if(getCookie('activeSchool')){
		return typeof cb == 'function' && cb();
	}
	var url = 'HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=bs.school.active!getActSchoolByActCode';
	ajaxPost(url, '', function(res){
		var that = this;
		if(res.result == 1){
			setCookie('activeSchool', res.data);
		}
		return typeof cb == 'function' && cb();
	})
}

/**
 * 获取激活的学校信息
 * 
 * @param fromCookie
 *            true:从缓存中取
 * @returns
 */
function getActiveSchool() {
	var school = getCookie( "activeSchool");
	if( school){
		return JSON.parse( school);
	}
	return null;
}

/**
 * 用于瑞安的考试的维护权限控制
 */
function isPlatOrg( ){
	var user = getUserPo();
	// 上级机构
	if(user.topOrgCode == user.orgCode){
		return true;
	}else{
		return false;
	}
}

/**
 * 是否普教，小学、初中、高中
 * 
 * @returns
 */
function isProPj( eduGrade) {
	if( !eduGrade){
		var school = getCookie2json( "school");
		if( school){
			eduGrade = school.EDU_GRADE;
		}
	}
	if( eduGrade && (eduGrade.indexOf("primarySchool") != -1 || eduGrade.indexOf("middleSchool") != -1||eduGrade.indexOf("highSchool") != -1)){
		return true;
	}
	return false;
}

/**
 * 判断字符串是否不为空
 * 
 * @param arg
 * @returns
 */
function isNotBlank(arg) {
  if (arg !== null && typeof arg !== undefined && arg !== 'undefined' && arg !== '' && !isEmptyObject(arg)) {
    return true;
  }
  return false;
}

function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}

/**
 * 判断字符串是否含有emoji表情
 * 
 * @param substring
 * @returns
 */
function isEmojiCharacter(substring) {
  for (var i = 0; i < substring.length; i++) {
    var hs = substring.charCodeAt(i);
    if (0xd800 <= hs && hs <= 0xdbff) {
      if (substring.length > 1) {
        var ls = substring.charCodeAt(i + 1);
        var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
        if (0x1d000 <= uc && uc <= 0x1f77f) {
          return true;
        }
      }
    } else if (substring.length > 1) {
      var ls = substring.charCodeAt(i + 1);
      if (ls == 0x20e3) {
        return true;
      }
    } else {
      if (0x2100 <= hs && hs <= 0x27ff) {
        return true;
      } else if (0x2B05 <= hs && hs <= 0x2b07) {
        return true;
      } else if (0x2934 <= hs && hs <= 0x2935) {
        return true;
      } else if (0x3297 <= hs && hs <= 0x3299) {
        return true;
      } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
        || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
        || hs == 0x2b50) {
        return true;
      }
    }
  }
}
/**
 * 字典加教育等级（xxx-xx&xx...）
 * @param name
 */
function codeWithEduGrade( name){
	var school = getCookie2json( "school");
	if(!school ){
		return name;
	}
	return name + '-' + school.EDU_GRADE.replace(/,/g,'&');
}


function getEnterYearByGrade( eduGrade,  grade) {
	var year = new Date().getFullYear();
	var month = new Date().getMonth() + 1;
	if(grade){
		grade = grade.replace('g','');
	}

	var enterYear = 0; 
	if (month >= 9) {
	//	grade = year - enterYear + 1;
		//	term = 1;// 上册
		enterYear = year - grade + 1;
	} else {
	//	grade = year - enterYear;
	//	term = 2;// 下册
		enterYear = year - grade;
	}

	if (eduGrade.indexOf("primarySchool") != -1) {

	} else if (eduGrade.indexOf("middleSchool") != -1 || eduGrade.indexOf("middleVocation") != -1) {
		// 没用小学，有初中
		enterYear += 6;
	} else if (eduGrade.indexOf("middleSchool") != -1 || eduGrade.indexOf("hignVocation") != -1) {
		// 没用小学，初中，只有高中
		enterYear += 9;
	} else if (eduGrade.indexOf("special") != -1 || eduGrade.indexOf("undergraduate") != -1) {
		// 没用小学，初中,高中，只有大学
		enterYear += 12;
	}

	return enterYear;
}

/**
 * 将字符串"XXX,XXX,XXX"转换成适用于sql中in语句的字符串，格式为"'XXX','XXX','XXX'"
 * 
 * @param sourceString
 * @return
 */
function formatString(sourceString) {
	if (!sourceString) {
		return '';
	}
	var strArr = sourceString.split(",");
	var s = '';
	for (var i = 0, str; i < strArr.length; i++) {
		str = strArr[i];
		if(!str){
			continue;
		}
		s += ",'" + str + "'";
	}

	if(s){
		s = s.substring(1);
	}
	return s;
}

/**
 * 过滤数组元素
 * @param list
 * @param attr 过滤的元素（多个以“，”隔开）
 * @returns {Array}
 */
function filterListAttr( list, attr){
	if(!( list && list.length) || !attr){
		return list;
	}
	
	var tmpList = []
	for(var i = 0; i < list.length; i++){
		if( formatString(attr).indexOf("'" + list[i].CODE + "'") == -1){
			tmpList.push(list[i]);
		}
	}
	
	return tmpList;
}

/**
 * 保留数组的指定元素
 * @param list
 * @param attr 保留的元素（多个以“，”隔开） xx, xx, xx-{attr=yy}...，
 * 若需替换list某个属性值，以短线'-'连接加{attr=yy}
 * @returns {Array}
 */
function retainListAttr( list, attr){
	if(!( list && list.length) || !attr){
		return list;
	}
	
	var attrMap = {};
	var attrArr = attr.split(',');
	for( var i = 0, valArr; i < attrArr.length; i++){
		valArr = attrArr[i].split('-');
		if(valArr && valArr.length){
			// attrMap['xx'] = '{attr=yy}';
			attrMap[valArr[0]] = valArr[1];
		}
	}
	var tmpList = [];
	for(var i = 0, arr, nArr; i < list.length; i++){
		if( formatString(attr).indexOf(list[i].CODE) == -1){
			continue;
		}
		if(attrMap[list[i].CODE]){
			nArr = (attrMap[list[i].CODE].replace(/\{|\}/g, '')).split('=');
			if(nArr && nArr.length){
				list[i][nArr[0]] = nArr[1];
			}
		}
		tmpList.push(list[i]);
	}
	
	return tmpList;
}

/**
 * 过滤html标签
 * @param msg
 * @returns
 */
function filterHtmlTag(msg) {
    var msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
    msg = msg.replace(/[|]*\n/, '') //去除行尾空格
    msg = msg.replace(/&nbsp;/ig, ''); //去掉空格
    return msg;
}
	
/**
 * 设置超时时间的cookie
 * @param cname 键
 * @param cvalue 值
 * @param expire 超时时间，不填则不超时，单位（毫秒）
 * @returns
 */
function setCookie2(cname, cvalue, expire) {
	try {
		var obj = {
			data: cvalue,
			time: Date.now(),
			expire: expire || 0
		};
		localStorage.setItem(cname, JSON.stringify(obj));
	} catch (e) {
		window.top.alert( "请关闭浏览器的无痕浏览模式，以便于您的继续访问");
	}
}

/**
 * 获取带超时时间的cookie
 * @param cname
 * @returns
 */
function getCookie2(cname) {
	var cvalue = localStorage.getItem(cname);
	if (cvalue && isJsonString(cvalue)) {
		cvalue = JSON.parse(cvalue);
		if (cvalue.expire > 0 && Date.now() - cvalue.time > cvalue.expire) {
			localStorage.removeItem(cname);
			return null;
		}
		return cvalue.data;
	} 
	return null;
}

/**
 * 老师只能维护自己创建的课程以及相关的实训和考试数据
 * @param po
 */
function opAuth( po, c){
	if(!c){
		return;
	}
	var user = getUserPo();
	if(user.userType == 1 && user.isManager == 0 &&  po.CREATE_BY != user.personId){
		var arr = c.split(',');
		for(var i = 0; i<arr.length; i++ ){
			if(!po.po_auth_style){
				po.po_auth_style = {}
			}
			po.po_auth_style[arr[i]] = 'display: none;';
		}
	}
}
	
var imusicCommon = {
	socket: {
		vueObj: null,
		socketObj: null
	},
	exeParamsInit: exeParamsInit,
	socketInit: socketInit,
	isShowInteract: isShowInteract,
	arr2str: arr2str,
	arr2strByEqu: arr2strByEqu,
	isJsonString: isJsonString,
	getArrItem: getArrItem,
	getArrIdx: getArrIdx,
	opAuth2Btn: opAuth2Btn,
	initWindowDrag: initWindowDrag,
	initWinResize: initWinResize,
	mouseDown: mouseDown,
	getPo: getPo,
	getRandNum: getRandNum,
	getMouseSelectText: getMouseSelectText,
	isAndroid: isAndroid,
	openWin: openWin,
	closeWin: closeWin,
	getAppCode: getAppCode,
	isSupportInteract: isSupportInteract,
	isBigscreen2noscreenpiano: isBigscreen2noscreenpiano,
	loadJs: loadJs,
	addUrlParams: addUrlParams,
	querySchoolList: querySchoolList,
	validateChrome: validateChrome,
	code2html: code2html,
	isProPj: isProPj,
	getActiveSchool: getActiveSchool,
	getActiveSchoolInfo: getActiveSchoolInfo,
	isNotBlank: isNotBlank,
	queryTrainPersonList: queryTrainPersonList,
	codeWithEduGrade: codeWithEduGrade,
	getEnterYearByGrade: getEnterYearByGrade,
	filterHtmlTag: filterHtmlTag,
	initUrl: initUrl
}