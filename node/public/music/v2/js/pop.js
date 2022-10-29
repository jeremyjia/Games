var modalParams = {};// 弹框参数
var modal;// 弹框vue对象 这个对象基本上就没用了
var pageArr = new Array(); // 用于记录打开过的各个页面（跳转、弹窗）地址以及参数
var pageParams = {
		date: new Date().getTime()  // 用于表示
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
		
		var isIframe = options.isIframe;
		var modalId = id + "Modal";
		var iframeId = id + "Iframe";
		try{
			// 删除原来有的层
			window.top.$("#" + modalId).remove();
		}catch(err){}
		
		var urlParams = getUrlParamJson(url);
		// urlParams = copyJson(modalParams, urlParams);
		for ( var key in modalParams) { 
			var cvalue = modalParams[key];
			if(cvalue){
				urlParams[key] = cvalue;
			}
		}
		var iframeParams = options.params;
		if(iframeParams){
			for ( var key in iframeParams) { 
				var cvalue = iframeParams[key];
				if(cvalue){
					urlParams[key] = encodeURIComponent(cvalue);
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
		
		url = url + (url.indexOf("?") == -1 ? "?" : "&") + "tmp=" + encodeURI(new Date());  
		
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
		
		//aria-hidden="true"
		var html = '';
		html += '<div class="modal center-modal bd-example-modal-lg fade ' + modalId + '" id="' + modalId + '" tabindex="-1" role="dialog" aria-labelledby="' + modalId + 'Title" ' + isAriaHiddenHtml + '>';
		html += '  <div class="modal-dialog modal-lg modal-dialog-centered" role="document" style="' + mWidth + '">';
		html += '    <div class="modal-content" style="height: ' + mHeight + ';left:0">';
		if( options.showCloseBtn ){
			// 显示关闭按钮，但不显示标题栏
			html += '        <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="font-size: 40px; position: absolute; right: 17px; top: 2px;z-index: 1000;' + (options.closeBtnStyle || '') + '">';
			html += '          <span aria-hidden="true">&times;</span>';
			html += '        </button>';
		}else if(options.isCloseBtn != 0){
			html += '      <div class="modal-header">';
			html += '        <h5 class="modal-title" id="' + modalId + 'LongTitle">' + title + '</h5>';
			
//			if( window.top.isExe() && !window.top.isAndroid() ){
//				html += '	  <div class="keyboard" onclick="window.top.getSocket().runwincmd(\'osk\');"></div>';
//			}
			
			html += '        <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="font-size: 40px; position: absolute; right: 15px; top: 5px;">';
			html += '          <span aria-hidden="true">&times;</span>';
			html += '        </button>';
			html += '      </div>';
		}
		
		if( isIframe){
			html += '      <div class="modal-body" style="overflow: hidden;height:' + mcHeight + ';padding:0;font-size:0;">';
			html += '      	<iframe id="' + iframeId + '" src="' + url + '" frameborder="0" style="overflow-y: auto;height:100%;width:100%;">';
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
			//hideLoading();
			destoryLastPage();
			window.top.$("." + modalId ).prev(".modal-backdrop").remove();
			window.top.$("." + modalId ).remove();
			
			if( options.hideCball && typeof options.hideCball == 'function'){
				options.hideCball();
			}
		}).on('hidden.bs.modal', function (e) {
			// 偶尔重复打开，关闭那么两个都要关掉
			// window.top.$("." + modalId ).prev(".modal-backdrop").remove();
			window.top.$(".modal-backdrop").remove(); 
			window.top.$("." + modalId ).remove();
		});
		
		console.log('popBigWindow url ', url);
	}
});


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
 * 获取弹框的宽高
 * 
 * @param width
 * @param height
 * @returns
 */
function getPopWidHei( width, height){
	var clientW = window.top.document.getElementsByTagName("body")[0].clientWidth;
	var clientH = window.top.document.getElementsByTagName("body")[0].clientHeight;
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
 * 页面关闭（跳转或关闭弹窗）时销毁对应的vm对象
 * 
 * @returns
 */
function destoryLastPage( date){
	var last = getLastPage();
	if(last){
		var vm = last.vm;
		if( vm){
			vm.$destroy(); 
		}
		if(!last.isDirect){
			window.top.pageArr.splice(last.index, 1); 
		}
		console.log("destoryLastPage last", last);
	}
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
