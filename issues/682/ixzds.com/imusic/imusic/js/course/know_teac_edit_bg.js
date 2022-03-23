;
(function(win, doc, undefined) {
	"use strict";
	// platUrl: 平台地址，如 http://localhost:8080/imusic/
	// modelSelCball，模板选中回调函数
	var Bg = function(platUrl, boxSelector, modelSelCball, params) {
		this.platUrl = platUrl;
		// 模板列表
		this.modelList = [];
		// 盒子 ，用于设置背景图片的区域
		this.boxSelector = boxSelector ? boxSelector : ".item-list";
		// 当前选中模板
		this.selModel = "";
		// 是否显示模板
		this.isModelShow = false;
		// 是否显示模板的子模板
		this.isChildShow = false;
		// 设置替换背景类型，course替换课程，know替换当前知识点
		this.replaceBgType = false;

		// 子图标的样式
		this.childBoxStyle = {
			"max-width" : $(window).width() - 80
		};

		// 不同版本的背景
		this.bookVersionArr = [ {
			code : 'hc',
			name : '花城版',
			arr : [ 'hc', 'hc_cy', 'hc_dd', 'hc_gk', 'hc_gw', 'hc_gz', 'hc_ld', 'hc_mc', 'hc_qq', 'hc_tc', 'hc_wdxyk', 'hc_xc', 'hc_xs', 'hc_xx' ],
			nameArr : [ '', '唱游', '读读', '观看', '歌舞', '感知', '律动', '模唱', '敲敲', '听唱', '我的小音库', '学唱', '欣赏', '想想' ],
			childNum : [
			//				{
			//				arr : [ '唱歌', '歌表演', '活动', '集体舞', '律动', '童话剧', '欣赏', '葫芦丝吹奏' ],
			//				codeArr : [ '14_1', '14_2', '14_3', '14_4', '14_5', '14_6', '14_7', '14_8' ],
			//				imgWidth : 130, // 图片宽度
			//				teacWidth : 0.12908, // 模块宽度
			//				teacHeight : 0.06991
			//			},
			{
				arr : [ '唱游', '读读', '歌舞', '观看', '律动', '模唱', '敲敲', '听唱', '想想', '欣赏', '学唱', '我的小音库', '感知' ],
				codeArr : [ '14_9', '14_10', '14_11', '14_12', '14_13', '14_14', '14_15', '14_16', '14_17', '14_18', '14_19', '14_20', '14_21' ],
				imgWidth : 130, // 图片宽度
				teacWidth : 0.10755, // 模块宽度
				teacHeight : 0.08604
			} ]
		} ]

		this.params = params;

		if (typeof modelSelCball == 'function') {
			this.modelSelCball = modelSelCball;
		}
		this.initModel();
	}

	// 给构造函数bg对象原型里添加属性（方法）
	Bg.prototype = {
		// 初始化背景图片, bookVersion:某个教材版本的背景模板
		initModel : function(bookVersion) {
			var that = this;
			var isBv = !!bookVersion;
			// appCode 在 constants.js中
			var url = "/" + appCode + '/' + appCode + '/images/teacing/bgmodel/';
			if (isArt()) {
				url = url.replace('bgmodel', 'bgmodel_ms');
			}

			var exist = {};
			var list = new Array();
			// 要排除的背景
			var except = {
				9 : 1,
				10 : 1,
				11 : 1,
				12 : 1
			};
			// 9, 10, 11, 12,
			var arr = [ 1, 2, 3, 4, 5, 6, 7, 8, 13, 14 ];
			// 美术系统
			if (isArt()) {
				arr = [ 1, 2, 3, 4, 5, 6 ];
			}

			if (isBv) {
				arr = bookVersion.arr;
			} else {
				var knowTeacBgList = getCookie("knowTeacBgList-" + getSubject());
				if (knowTeacBgList) {
					list = JSON.parse(knowTeacBgList);

					var newList = [];
					for (var i = 0; i < list.length; i++) {
						var id = list[i].id;
						if (except[id]) {
							continue;
						}
						exist[id] = true;
						newList.push(list[i]);
					}
					list = newList;
				}
			}

			// 模板名称
			var nameArr = [ '', '', '', '', '', '', '', '', '演唱', '活动', '听赏', '唱歌的小鸟', '' ];
			// 模板中对应的子模板
			var childNum = {
				2 : [ {
					arr : [ '作品介绍' ],
					imgWidth : 68, // 图片宽度
					teacWidth : 0.09679, // 模块宽度
					teacHeight : 0.06991
				} ],
				13 : [ {
					arr : [ '名人堂', '欣赏与哼唱', '艺术小词典', '音乐欣赏' ],
					imgWidth : 68, // 图片宽度
					teacWidth : 0.0753
				// 模块宽度
				} ],
				14 : [ {
					arr : [ '唱歌', '歌表演', '活动', '集体舞', '律动', '童话剧', '欣赏', '葫芦丝吹奏' ],
					imgWidth : 130, // 图片宽度
					teacWidth : 0.12908, // 模块宽度
					teacHeight : 0.06991
				}, {
					arr : [ '唱游', '读读', '歌舞', '观看', '律动', '模唱', '敲敲', '听唱', '想想', '欣赏', '学唱', '我的小音库', '感知' ],
					imgWidth : 130, // 图片宽度
					teacWidth : 0.10755, // 模块宽度
					teacHeight : 0.08604
				} ]
			}

			if (isBv) {
				nameArr = bookVersion.nameArr;
				childNum[bookVersion.code] = bookVersion.childNum;
			}

			// 美术系统
			if (isArt()) {
				childNum = [];
			}

			for (var j = 0; j < arr.length; j++) {
				var i = arr[j];
				if (exist[i]) {
					continue;
				}

				list.push({
					id : i,
					isBv : isBv,
					name : isBv ? nameArr[j] : nameArr[i],
					url : url + i + '.jpg',
					ordidx : 1639387500898
				// new Date().getTime()
				});
			}

			var item;
			for (var i = 0; i < list.length; i++) {
				item = list[i];
				if (!item.id) {
					item.id = item.url.substring(item.url.lastIndexOf("/") + 1, item.url.lastIndexOf("."));
				}
				item.childList = [];

				var childNumArr = childNum[item.id];
				if (childNumArr) {
					var count = 1;
					var child, childArr, codeArr;
					for (var childIdx = 0, childLen = childNumArr.length; childIdx < childLen; childIdx++) {
						child = childNumArr[childIdx];
						childArr = child.arr;
						codeArr = child.codeArr || [];

						var childList = [];
						for (var j = 1; j <= childArr.length; j++) {
							childList.push({
								code : childArr[j],
								url : url + (codeArr[j - 1] ? codeArr[j - 1] : (item.id + '_' + count)) + '.png',
								imgWidth : child.imgWidth,
								teacWidth : child.teacWidth,
								teacHeight : child.teacHeight || child.teacWidth
							})
							count++;
						}
						item.childList.push(childList);
					}
				}
			}

			this.modelList = list;

			//			Vue.nextTick(function() {
			//				if (isBv) {
			//					setTimeout(function() {
			//						that.modelHover(list[0], '.bg-child-box');
			//					}, 300);
			//				}
			//			})

			//autoAlert("双击背景图，选中且关闭");
		},

		// 鼠标悬浮
		modelHover : function(model, selector) {
			this.selModel = model;

			var $obj = $(selector);
			var winW = $(window).width();
			var max = winW - 30;

			console.log("$obj.length ", $obj.length, max);
			if ($obj.length >= 1) {
				var left = $obj.offset().left;
				if (left > winW / 2) {
					// 超过一半，右对齐，左边间距大于0就行
					max = left;
				} else {
					max -= $obj.offset().left;
					console.log("$obj.offset().left", $obj.offset().left, max);
				}
			} else {
				max -= 100;
			}

			this.childBoxStyle = {
				"max-width" : max + "px"
			};
		},

		// 打开模板选择器
		openBg : function(bookVersion) {
			this.initModel(bookVersion);
			this.isModelShow = true;
			this.replaceBgType = '';
		},

		// 设置替换背景类型，course替换课程，know替换当前知识点
		setReplaceBgType : function(replaceBgType) {
			this.replaceBgType = replaceBgType;
		},

		// 判断当前块是否是背景块
		isBg : function(item) {
			if (item.IS_BG == 1) {
				return true;
			}
			return false;
		},
		// 获取当前页面的背景item；itemArr块列表，page指定页面
		get : function(itemArr, page) {
			var result = null;
			for (var i = 0; i < itemArr.length; i++) {
				var item = itemArr[i];
				if (item.PAGE == page && item.IS_BG == 1) {
					result = item;
					break;
				}
			}
			return result;
		},

		// 获取需要新增背景记录的页数；itemArr块列表，pageArr页数列表
		getAddPageArr : function(pageArr, itemArr) {
			var arr = new Array();
			for (var i = 0; i < pageArr.length; i++) {
				var page = pageArr[i];

				var isExists = false;
				for (var j = 0; j < itemArr.length; j++) {
					var item = itemArr[j];
					if (item.PAGE == page && item.IS_BG == 1) {
						isExists = true;
						break;
					}
				}
				if (!isExists) {
					arr.push(arr);
				}
			}
			return arr;
		},

		// 删除当前页中的背景
		removePageBg : function(itemArr, page) {
			var idxArr = new Array();
			var item;
			for (var i = 0; i < itemArr.length; i++) {
				item = itemArr[i];
				if (item.PAGE == page && item.IS_BG == 1) {
					idxArr.unshift(i);
				}
			}
			console.log("idxArr", idxArr);
			for (var i = 0, len = idxArr.length; i < len; i++) {
				itemArr.splice(idxArr[i], 1);
			}
			this.clearBoxBg();
		},

		// 删除所有页面中的背景
		removeAllPageBg : function(itemArr, pageArr) {
			var that = this;
			for (var i = 0; i < pageArr.length; i++) {
				var page = pageArr[i];
				that.removePageBg(itemArr, page);
			}
			this.clearBoxBg();
		},

		// 给当前盒子设置背景图片
		setBoxBg : function(itemArr, page) {
			var item = this.get(itemArr, page);
			if (item) {
				var $obj = $(this.boxSelector);
				$obj.css({
					"background" : "url(" + item.CONTENT + ") top center no-repeat #fff",
					"background-size" : "100% 100%"
				})
				// this.isUrlValid(item.CONTENT, function() {
				// })
			} else {
				this.clearBoxBg();
			}
		},

		// 清空当前盒子设置背景图片
		clearBoxBg : function(selector) {
			$(this.boxSelector).css({
				"background" : ""
			})
		},

		// 选中模板
		modelClick : function(model, know) {
			var that = this;
			this.selModel = model;
			if (this.replaceBgType) {
				var params = {
					"COURSE_ID" : this.params.COURSE_ID,
					"URL" : model.url
				}
				if (this.replaceBgType == 'know') {
					params.KNOWLEDGE_ID = know.KNOWLEDGE_ID;
				}
				loading("替换中...")
				ajaxPost("HttpChannel?action=APP_ACTION&BUSINESS_TYPE=co.know.teac!saveCourseBg", params, function(res) {
					hideLoading();
					if (res.result == 1) {
						swAutoAlert("替换成功");
					}
				});
			}

			if (!model.isBv) {
				// 教材版本的位置不变
				setTimeout(function() {
					that.selModel.ordidx = new Date().getTime();
					that.modelList.sort(function(a, b) {
						return b.ordidx - a.ordidx;
					})
					setCookie("knowTeacBgList-" + getSubject(), JSON.stringify(that.modelList));
				}, 1000);
			}

			if (this.modelSelCball) {
				this.modelSelCball(model.url, !!this.replaceBgType);
			}
		},
		// 给当前盒子设置背景图片，给预览和授课界面使用，数据结构不一样
		setBoxBg2 : function(bgItemJson, page, isFullScreen) {
			var item = bgItemJson[page];
			if (item && !isFullScreen) {
				var url = item.CONTENT;
				var $obj = $(this.boxSelector);

				$obj.css({
					"background" : "url(" + url + ") top left no-repeat #fff",
					"background-size" : "100% 100%"
				})

				//				"background-size" : "100% auto"
				//				$obj.css({
				//					"background" : "url(" + url + ") center center no-repeat #fff",
				//					"background-size" : "100% auto"
				//				})
				// this.isUrlValid(url, function() {
				//					
				// })
			} else {
				this.clearBoxBg();
			}
		},
		// 给当前盒子设置背景图片，给预览和授课界面使用，数据结构不一样
		setBoxBg3 : function(bgItemJson, page, selector, parentSelector) {
			var item = bgItemJson[page];
			if (item) {
				var url = item.CONTENT;
				var $obj = $(selector);
				var $parObj = $(parentSelector);

				var isSelf = url.indexOf("bgmodel") != -1;
				if (!isSelf) {
					var name = url.substr(url.lastIndexOf("/") + 1);
					for (var i = 1; i <= 14; i++) {
						if (name == i + ".jpg") {
							isSelf = true;
							break;
						}
					}
				}

				/*重复的不要设置*/
				if ($obj.css("background").indexOf(url) != -1) {
					return;
				}

				// 如果是我们自已的背景图，那么只要一层背景就够了
				if (isSelf) {
					$obj.css({
						"background" : ""
					})
					$parObj.css({
						"background" : "url(" + url + ") center center no-repeat #fff",
						"background-size" : "100% 100%"
					})
				} else {
					$obj.css({
						"background" : "url(" + url + ") center center no-repeat",
						"background-size" : "100% 100%"
					})
					parObj.css({
						"background" : " #fff",
						"background-size" : "cover"
					})
				}
			} else {
				this.clearBoxBg();
			}
		},
		// 验证地址是否正确
		isUrlValid : function(url, cball) {
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
	}
	win.Bg = Bg;
	// 把这个对象附给window底下的 名字叫bg的对象；要不你调用的时候 new Bg() 怕在window的环境下找不到；
}(window, document))