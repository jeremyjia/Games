/** 同步父页面中的按钮栏 begin * */

/**
 * 获取当前页面的iframe数量
 * 
 * 供子页面调用
 * 
 * @returns
 */
function getIframeNum() {
	var total = 0;
	$(".item-list iframe").each(function() {
		if ($(this).parent().css("display") != "none") {
			total++;
		}
	})
	return total;
}

/**
 * 同步按钮栏
 * 
 * @param toolHtml
 * @param iframeId
 * @returns
 */
function synSingTool(toolHtml, iframeId, isPiano) {
	var moreIframe = content.moreIframe;
	// 不存在，iframe隐藏，已存在（单纯的页面点击，如果是已经生成了，那没必要再次生成）
	var $iframe = $("#" + iframeId);
	if ($iframe.length == 0 || $iframe.parent().css("display") == "none") {
		return;
	}

	if (typeof window.top.bottomTagsWidthChange == 'function') {
		window.top.bottomTagsWidthChange();
	}

	// 全屏模式下，播放abc，因为scrollIntoView的原因，会导致全屏/缩放按钮跑到很底下的位置
	if (!moreIframe.fullIframeId) {
		var arr = new Array();
		var top = parseFloat($iframe.css("top").replace("px", "")), left = parseFloat($iframe.css("left").replace("px", ""));
		$(".item-list .active iframe").each(function() {
			var itop = parseFloat($(this).css("top").replace("px", "")), ileft = parseFloat($(this).css("left").replace("px", ""));

			// 水平是否全屏
			var isHfull = true;
			var parentLeft = 0;
			var parent = $(this).parent();
			if (parent.hasClass("item-box")) {
				// 说明是非全屏的
				isHfull = false;
				parentLeft = parseFloat($(parent).css("left").replace("px", ""));
				console.log("parentLeft", parentLeft);
			}

			arr.push({
				iframeId : this.id,
				top : itop,
				left : ileft,
				width : $(this).width(),
				height : $(this).height(),
				isPiano : $(this).attr('src').indexOf("sing_abc_main") == -1,
				isHfull : isHfull,
				parentLeft : parentLeft
			})
		})

		arr.sort(function(a, b) {
			return a.top - b.top;
		})

		moreIframe.arr = [];
		var numArr = [ '一', '二', '三', '四', '五', '六', '七', '八', '九', '十' ];
		for (var i = 0, len = arr.length; i < len; i++) {
			var row = arr[i];
			if (row.iframeId == iframeId) {
				moreIframe.currIdx = i;
			}

			var obj = {
				name : ' 曲 谱（' + numArr[i] + "）",
				iframeId : row.iframeId,
				top : row.top,
				left : row.left,
				width : row.width,
				height : row.height,
				isPiano : row.isPiano,
				style : {
					left : (row.left + 30) + "px",
					top : (row.top + 40) + "px"
				},
				imgStyle : {
					left : (row.isHfull ? (row.width - 85) : (row.width + row.parentLeft + row.left - 85)) + "px",
					top : (row.top + row.height - 160) + "px"
				}
			};

			moreIframe.arr.push(obj);
		}
	}

	if (!isPiano) {
		toolHtml = toolHtml.replaceAll("images/", "../../component/sing/images/");
	}
	$(".sing-tool-box").html(toolHtml).attr("data-iframe-id", iframeId).removeClass("hide");

	// 清除导入事件，只需要在父页面中触发，子页面中导入
	$(".sing-tool-box input[type='file']").remove();
	// 给input 、select 赋值，v-model是不会给对象的value赋值的
	$(".sing-tool-box input[data-value], .sing-tool-box select[data-value]").each(function() {
		$(this).val($(this).attr("data-value"));
	})

	// 单击事件
	$(".sing-tool-box .click").unbind("click").bind("click", function(e) {
		var tagName = e.currentTarget.tagName.toUpperCase();
		if (tagName == "INPUT" || tagName == "SELECT") {
			stopPropagation(e);
			return;
		}
		var id = $(this).attr("id");
		var iframeId = $(this).parents(".sing-tool-box").attr("data-iframe-id");
		var iframes = $("#" + iframeId);
		var $btn = iframes.contents().find("#" + id);
		if ($btn.length > 0) {
			stopPropagation(e);
			$btn.click();
		}
	});

	// 速度
	speedEvent("#speedChangeInp", "keyup");
	speedEvent("#speedChangeSel", "change");

	// abc导入
	fileEvent(".abc-file", "#abcFile");
	fileEvent(".xml-file", ".file-xml");
}

/**
 * abc导入
 * 
 * @param fileLi
 * @param fileInpId
 * @returns
 */
function fileEvent(fileLi, fileInpId) {
	$(fileLi).unbind("click").bind("click", function(e) {
		var iframeId = $(this).parents(".sing-tool-box").attr("data-iframe-id");
		var $btn = $('#' + iframeId).contents().find(fileInpId);
		//		console.log("fileEvent iframeId:" + iframeId)
		//		console.log("fileEvent fileLi:" + fileLi)
		//		console.log("fileEvent fileInpId:" + fileInpId)
		if ($btn.length > 0) {
			stopPropagation(e);
			$btn.click();
		}
	});
}

/**
 * 速度事件
 * 
 * @param inpId
 * @param eventName
 * @returns
 */
function speedEvent(inpId, eventName) {
	$(".sing-tool-box " + inpId).bind("click", function(e) {
		stopPropagation(e);
	}).unbind(eventName).bind(eventName, function(e) {
		stopPropagation(e);
		var iframeId = $(this).parents(".sing-tool-box").attr("data-iframe-id");
		eval(iframeId + '.contentWindow.getVm().abcSpeed = ' + $(this).val())
		eval(iframeId + '.contentWindow.getVm().speedChange()')
	});
}

/**
 * 阻止冒泡
 * 
 * @param e
 * @returns
 */
function stopPropagation(e) {
	if (e && e.stopPropagation) {
		e.stopPropagation();
	} else {
		window.event.cancelBubble = true;
	}
}

/** 同步按钮栏 end * */

/**
 * 键盘的按下、松开
 * 
 * @param noteNumber
 * @param actType
 * @returns
 */
function keyUpDown(noteNumber, actType) {
	var that = content;
	if (that.pianoKeyboard && typeof that.pianoKeyboard.keyUpDown == "function") {
		that.pianoKeyboard.keyUpDown(noteNumber, actType);
	}
}

/**
 * 设置样式
 * 
 * @param that
 * @returns
 */
function setSingToolStyle(that) {
	// console.log("setSingToolStyle");
	Vue.nextTick(function() {
		// console.log("setSingToolStyle:" + $(".menu-btn-new").outerWidth() + "," + $(".menu-btn-new").length);
		var $tool = $(".sing-tool-box");
		var menuWid = $(".menu-box").width();
		var width = $(window).width();
		$tool.css({
			width : (that.menuShow ? width - menuWid - 24 : width - 24) - ($(".menu-btn-new").outerWidth() * $(".menu-btn-new").length),
			left : that.menuShow ? menuWid + 12 : 12,
		})
	})
}

/**
 * 是否需要显示全屏、缩放按钮
 * 
 * 当页面图文混排时，并且iframe页面中有滚动条时才需要显示
 * @returns
 */
function showFullscreen(iframeId, height) {
	var moreIframe = content.moreIframe;
	if (!moreIframe) {
		return;
	}

	var isShow = $("#" + iframeId).height() < height;
	var row;
	var arr = moreIframe.arr;
	for (var i = 0, len = arr.length; i < len; i++) {
		row = arr[i];
		if (row.iframeId == iframeId) {
			Vue.set(row, 'isShowFull', isShow);
		}
	}
}

var singAbcTool = {
	setSingToolStyle : setSingToolStyle,
	showFullscreen : showFullscreen
}