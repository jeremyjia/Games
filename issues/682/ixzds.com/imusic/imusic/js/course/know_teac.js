/**
 * 初始化课程内容模块
 * 
 * @param rows
 *            课程内容
 * @param options
 *            参数
 * @param callback
 *            回调函数
 * @returns 内容数组（除背景、链接、声乐、钢琴）
 */
function initKnowTeacArr(rows, options, callback) {
	options = $.extend({
		contLink : null,
		width : $(window).width()
	}, options);
	var width = options.width;

	// 每页数量
	var pageCount = {};
	var vocalPianoList = [];

	var item;
	// 背景
	var bgItem = null;
	// 声乐、或者钢琴
	var vocalPianoItem = null;
	// 返回数组
	var itemArr = new Array();
	// 链接数组
	var linkArr = new Array();
	for (var i = 0; i < rows.length; i++) {
		item = rows[i];
		var page = item.PAGE;
		var ctype = item.CTYPE;
		var vocalJson = item.VOCAL_JSON;
		var pianoJson = item.PIANO_JSON;

		if (ctype == "3d" && imusicCommon.isJsonString(item.CONTENT)) {
			item.CONTENT = JSON.parse(item.CONTENT);
		}

		if (ctype == "slide" && item.CONTENT && imusicCommon.isJsonString(item.CONTENT)) {
			item.CONTENT = JSON.parse(item.CONTENT);
			if (item.CONTENT.ITEMS && imusicCommon.isJsonString(item.CONTENT.ITEMS)) {
				item.CONTENT.ITEMS = JSON.parse(item.CONTENT.ITEMS);
			}

			if (item.CONTENT.INTERVAL) {
				item.CONTENT.INTERVAL = parseInt(item.CONTENT.INTERVAL / 1000);
			}
			item.CONTENT.INDEX = 0;
		}

		if (item.CTYPE == 'slide' && item.CONTENT && imusicCommon.isJsonString(item.CONTENT)) {
			item.CONTENT = JSON.parse(item.CONTENT);
			// item.CONTENT.NO_BOOTSTRAP = true;
			if (item.CONTENT.ITEMS && imusicCommon.isJsonString(item.CONTENT.ITEMS)) {
				item.CONTENT.ITEMS = JSON.parse(item.CONTENT.ITEMS);
			}
		}

		// 防止画板存图的时候异常，不认识的字体导不出来
		// if (item.CTYPE == 'txt') {
		// item.CONTENT = item.CONTENT.replaceAll('\\\\5 b8b\\\\4 f53', '\\\\5b8b\\\\4f53');
		// }

		if (!item.VOCAL_JSON) {
			item.VOCAL_JSON = {};
		} else if (item.VOCAL_JSON && imusicCommon.isJsonString(item.VOCAL_JSON)) {
			item.VOCAL_JSON = JSON.parse(item.VOCAL_JSON);
		}

		if (!item.PIANO_JSON) {
			item.PIANO_JSON = {};
		} else if (item.PIANO_JSON && imusicCommon.isJsonString(item.PIANO_JSON)) {
			item.PIANO_JSON = JSON.parse(item.PIANO_JSON);
		}

		if (!item.QS_JSON) {
			item.QS_JSON = {};
		} else if (item.QS_JSON && imusicCommon.isJsonString(item.QS_JSON)) {
			item.QS_JSON = JSON.parse(item.QS_JSON);
		}

		if (!item.ATTR_JSON) {
			item.ATTR_JSON = {};
		} else if (item.ATTR_JSON && imusicCommon.isJsonString(item.ATTR_JSON)) {
			item.ATTR_JSON = JSON.parse(item.ATTR_JSON);
		}

		if (!item.LINK_JSON) {
			item.LINK_JSON = [];
		} else if (item.LINK_JSON && imusicCommon.isJsonString(item.LINK_JSON)) {
			item.LINK_JSON = JSON.parse(item.LINK_JSON);

			if (options.contLink != null) {
				var arr = options.contLink.getKnowTeacArr(item);
				for (var j = 0, jLen = arr.length; j < jLen; j++) {
					var tmp = arr[j];
					if (!tmp.CONTENT) {
						continue;
					}
					initItemStyle(tmp, width);
					itemArr.push(tmp);
				}
			}
		}

		// 防止阿里云缓存
		if (item.CONTENT && item.CTYPE == 'img') {
			if (/\?/g.test(item.CONTENT)) {
				item.CONTENT += '&v=' + new Date().getTime();
			} else {
				item.CONTENT += '?v=' + new Date().getTime();
			}
		}

		if (item.IS_BG == '1') {
			bgItem = item;
			continue;
		}
		if (ctype == 'link') {
			linkArr.push(item);
			continue
		}
		if (ctype == "sing" || ctype == "vocal" || ctype == "piano") {
			vocalPianoItem = item;
			vocalPianoList.push(item);
		}
		if (pageCount[page]) {
			pageCount[page] += 1;
		} else {
			pageCount[page] = 1;
		}

		initItemStyle(item, width);
		itemArr.push(item);
	}

	for (var i = 0, len = vocalPianoList.length; i < len; i++) {
		item = vocalPianoList[i];
		// 一个页面只要一个元素，那么全屏
		if (pageCount[item.PAGE] == 1) {
			item.STYLE.width = "100%";
			item.STYLE.height = "100%";
			item.STYLE.left = "0";
			item.STYLE.top = "0";
		}
	}

	if (typeof callback == 'function') {
		callback(itemArr, vocalPianoItem, bgItem, linkArr.length > 0 ? linkArr : null);
	}
	return itemArr;
}

/**
 * 获取当前数组中的声乐、或者钢琴
 * 
 * @param rows
 * @returns
 */
function getVocalPianoItem(rows) {
	if (!rows) {
		return null;
	}
	var item;
	var vocalPianoItem = null;
	for (var i = 0; i < rows.length; i++) {
		item = rows[i];
		var ctype = item.CTYPE;
		if (ctype == "sing" || ctype == "vocal" || ctype == "piano") {
			vocalPianoItem = item;
		}
	}
	return vocalPianoItem;
}

/**
 * 初始化课程内容块样式
 * 
 * @param item
 * @param width
 * @returns
 */
function initItemStyle(item, width) {
	var oldW = item.STYLE.width;
	var oldH = item.STYLE.height;
	item.STYLE = $.extend(item.STYLE, {
		position : "absolute",
		width : (item.WIDTH * width) + "px",
		height : (item.HEIGHT * width) + "px",
		left : (item.X * width) + "px",
		top : (item.Y * width) + "px",
		fontSize : (item.FONT_SIZE * width).toFixed(5) + "px",
		zIndex : item.Z_INDEX ? parseInt(item.Z_INDEX) : 1
	})
	item.POS = {
		width : (item.WIDTH * width),
		height : (item.HEIGHT * width),
		left : (item.X * width),
		top : (item.Y * width),
		fontSize : (item.FONT_SIZE * width).toFixed(5),
		zIndex : item.Z_INDEX ? parseInt(item.Z_INDEX) : 1
	}

	// 配置了全屏的才 全屏
	var ctype = item.CTYPE;
	if (item.WIDTH >= 1 && "sing,vocal,piano,video".indexOf(ctype) != -1) {
		//if (item.WIDTH >= 1 && (ctype == "sing" || ctype == "vocal" || ctype == "piano")) {
		item.STYLE.width = "100%";
		item.STYLE.left = "0";
		Vue.set(item, 'IS_H_FULL', 1);
	}

	if (item.IS_LEVEL_CHILD == '1') {
		Vue.set(item.STYLE, 'display', "none");
	}

	if (item.CTYPE == 'contLinkList') {
		item.STYLE.width = oldW;
		item.STYLE.height = oldH;
		Vue.set(item.STYLE, 'background', "url('" + item.CONTENT + "') center center no-repeat");

		var list = item.list;
		if (list && list.length > 0) {
			var liPadding = 10;
			var liWidth = 222;
			var liHeight = 51;
			var len = list.length;
			var width = parseFloat(oldW);
			var col = parseInt(width / (liWidth + liPadding));
			if (col <= 0) {
				col = 1;
			}
			var rowLen = Math.ceil(len / col);

			item.STYLE.height = (rowLen * liHeight + 10) + "px";

			var row;
			for (var i = 0; i < len; i++) {
				row = list[i];
				var title = row.title;

				var sty = {};
				if ((i + 1) % col == 0 || i == len - 1) {
					sty["border-right-width"] = 0;
				}
				// 最后一行
				var last = len % col;
				if (last == 0) {
					last = col;
				}
				if (i >= len - last) {
					sty["border-bottom-width"] = 0;
				}

				Vue.set(row, 'STYLE', sty);
			}
		}
	}
}

/**
 * 设置课程内容（非曲谱）的样式
 * 
 * @param height
 * @returns
 */
function setStyleByIframeHeight(height) {
	var that = knowTeac.that;
	var rows = imusicCommon.getArrItem(that.CONT_ARR, 'PAGE', that.currPage).DATA;
	if (!rows) {
		return;
	}

	var vocalPianoItem = getVocalPianoItem(rows);
	if (!vocalPianoItem || rows.length < 2) {
		return;
	}
	var top = parseFloat(vocalPianoItem.STYLE.top.replace("px", ""));

	var item;
	for (var i = 0; i < rows.length; i++) {
		item = rows[i];
		var ctype = item.CTYPE;
		if (ctype != "sing" && ctype != "vocal" && ctype != "piano" && item.Y > vocalPianoItem.Y) {
			item.STYLE.top = (top + height) + "px";
			Vue.set(item.STYLE, 'marginBottom', 130 + "px")
		}
	}
}

var knowTeac = {
	that : content,
	initKnowTeacArr : initKnowTeacArr,
	getVocalPianoItem : getVocalPianoItem,
	setStyleByIframeHeight : setStyleByIframeHeight
}