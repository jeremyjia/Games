/**
 * abc框选，同时支持鼠标和触屏滑动，目前仅适用于辅助音频的播放
 * 
 * 注意事项： 1、本插件需要jquery、abcUtil.js支持；
 * 
 * @param win
 * @param doc
 * @param undefined
 * @returns
 */
;
(function(win, doc, undefined) {
	"use strict";
	// parentSelector : 父元素选择器，用于定位顶部距离，比如 .right-top-content，或者 #id
	var Search = function(host, options) {
		this.host = host;
		this.style = {
			position : "fixed",
			display : "none",
			left : 0,
			top : 0,
			color : "#555",
			"background-color" : "#fff",
			fontSize : "14px",
			border : "1px solid #ddd",
			padding : "5px 10px",
			zIndex : "100",
			cursor : "pointer"
		};

		this.closeStyle = {
			padding : "2px 5px"
		}

		// 是否开启搜索功能
		this.isSearch = true;

		// 百度搜索前缀
		this.baiduPrefix = '';

		// 查询条件
		this.text = '';

		// 参数赋值
		if (options) {
			for ( var key in options) {
				this[key] = options[key];
			}
		}
	}

	// 给构造函数 对象原型里添加属性（方法）
	Search.prototype = {
		setPrefixByCode : function(code) {
			this.baiduPrefix = "乐谱 ";
			// 作曲
			if (",composer,".indexOf("," + code + ",") != -1) {
				this.baiduPrefix = "";
			}
		},

		setText : function(code, txt) {
			var result = "";
			var arr = txt.split("");
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].charCodeAt(0) < 50000) {
					// abc中的音符 50000 是自己猜的
					result += arr[i];
				}
			}
			// 参数中不能出现的等号
			txt = result.replaceAll("=", "").trim();
			this.text = txt ? txt : piano.deco_list[code];
			console.log("setText", this.text);
		},

		set2Open : function(code, text) {
			if ("key" == code) {
				// 调号，直接去查abc中的调号
			}
			if (piano.deco_list[code]) {
				this.setPrefixByCode(code);
				this.setText(code, text);
				this.openDialog();
			}
		},

		close : function() {
			this.text = '';
			this.style.display = "none";
		},

		open : function(e) {
			this.text = imusicCommon.getMouseSelectText();
			if (this.text) {
				this.style.left = e.pageX + "px";
				this.style.top = e.pageY + 10 + "px";
				this.style.display = "inline-block";
			} else {
				this.style.display = "none";
			}
		},

		openDialog : function() {
			console.log("openDialog", this.text);
			if (!this.isSearch || !this.text) {
				return;
			}
			this.style.display = "none";

			var stop = true;
			var linkArr = window.top.$("link");
			for (var i = 0; i < linkArr.length; i++) {
				if (linkArr[i].href.indexOf("bootstrap.min.css") != -1) {
					stop = false;
				}
			}

			if (stop) {
				return;
			}

			var url = this.host + "imusic/component/search/know_search.html?CONTENT_OR_TITLE=" + encodeURIComponent(this.text.replaceAll(" ", "")) + "&BAIDU_PARAM=" + encodeURIComponent(this.baiduPrefix);
			var options = $.extend(top.getPopWidHei(1200, 800), {
				isIframe : 1
			});
			window.top.$.popBigWindow("know-search", url, "内容搜索", null, options);
		}
	}
	win.Search = Search;
	// 把这个对象附给window底下的 名字叫VoicePart的对象；要不你调用的时候 new Search()
	// 怕在window的环境下找不到；
}(window, document))
