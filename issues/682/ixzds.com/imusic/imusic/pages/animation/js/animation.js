/**
 * 动画效果的配置和展示
 * 
 * @param win
 * 
 * @param doc
 * @param undefined
 * @returns
 */
;
(function(win, doc, undefined) {
	"use strict";
	var AnimationPlug = function(options) {
		this.options = options = $.extend({
			host : C.HOST + appCode
		}, options);

		this.isShow = options.isShow || false;

		// 父元素表达式，内容展示区域
		this.parentSelector = options.parentSelector || '.item-list';

		// 动画列表
		this.list = [];
		this.playIdx = 0;

		// 播放历史, recId ~ true
		this.playHistory = {};

		this.init();
	}

	// 给构造函数VoicePart对象原型里添加属性（方法）
	AnimationPlug.prototype = {

		// 初始化
		init : function() {
			this.effectList = [ {
				code : 'flyInto',
				name : '飞入'
			}, {
				code : 'shake',
				name : '抖动'
			}, {
				code : 'showByLocal',
				name : '渐渐显示'
			}, {
				code : 'hideByLocal',
				name : '渐渐隐藏'
			} ];

			this.directionList = [ {
				code : 'bottom2top',
				name : '自底部'
			}, {
				code : 'top2bottom',
				name : '自顶部'
			}, {
				code : 'left2right',
				name : '自左侧'
			}, {
				code : 'right2left',
				name : '自右侧'
			} ];

			this.startList = [ {
				code : 'click',
				name : '单击时'
			}, {
				code : 'prevSynch',
				name : '与上一动画同时'
			}, {
				code : 'prevNext',
				name : '上一动画之后'
			} ],

			this.durationList = [ {
				code : 0.5,
				name : '非常快（0.5秒）'
			}, {
				code : 1,
				name : '快速（1秒）'
			}, {
				code : 2,
				name : '中速（2秒）'
			}, {
				code : 3,
				name : '慢速（3秒）'
			}, {
				code : 5,
				name : '非常慢（5秒）'
			} ],

			this.repeatList = [ {
				code : '',
				name : '（无）'
			}, {
				code : '2',
				name : '2'
			}, {
				code : '3',
				name : '3'
			}, {
				code : '4',
				name : '4'
			}, {
				code : '5',
				name : '5'
			}, {
				code : '10',
				name : '10'
			}, {
				code : 'nextClick',
				name : '直到下一次单击'
			}, {
				code : 'pptEnd',
				name : '直到幻灯片末尾'
			} ]
		},
		// 编辑页面
		edit : function(options) {
			var params = this.getPo();
			if (!options) {
				options = {};
			} else {
				params = $.extend(params, options.params);
			}
			$.popBigWindow("animationEdit", this.options.host + "/pages/animation/animation_edit.html?" + json2urlParams(params), "动画", options.success || null, $.extend(getPopWidHei(360, 400), {
				isIframe : 1
			}));
		},

		// 添加一个效果，暂时只有飞入，
		getPo : function(options) {
			return $.extend({
				effect : 'flyInto', // 飞入
				direction : 'right2left',
				start : 'click',
				duration : 0.5,
				delay : 0,
				repeat : '',
				ordidx : 1,
				recId : '' // 关联ID，比如know_teac_id
			}, options);
		},

		code2name : function(listName, code) {
			var name = '';
			var list = this[listName];
			if (list) {
				for (var i = 0, len = list.length; i < len; i++) {
					if (list[i].code == code) {
						name = list[i].name;
						break;
					}
				}
			}
			return name;
		},

		select : function(params, cball) {
			var params = $.extend({}, params);
			$.popBigWindow("AnimationPlugSelect", this.options.host + "/pages/animation/animation_select.html?" + json2urlParams(params), "素材选择", cball, $.extend(getPopWidHei(1200, 800), {
				isIframe : 1
			}));
		},

		play : function(animation, cball) {
			if (!animation) {
				return;
			}

			switch (animation.effect) {
				case 'shake':
					this.playShake(animation, 0, 0, cball);
					break;

				case 'flyInto':
					// 飞入
					this.playFlyInto(animation, cball);
					break;

				case 'showByLocal':
					// 渐渐显示
					this.showByLocal(animation, cball);
					break;

				case 'hideByLocal':
					// 渐渐隐藏
					this.hideByLocal(animation, cball);
					break;

				default:
					break;
			}
		},

		// 播放抖动
		playShake : function(animation, count, end, cball) {
			count++;
			if (end > 2) {
				if (typeof cball == "function") {
					cball();
				}
				return;
			}
			var that = this;
			var duration = 3;
			var style = document.getElementById(animation.recId).style;
			if (count == 1) {
				style.top = parseInt(style.top) + duration + 'px';
			} else if (count == 2) {
				style.left = parseInt(style.left) + duration + 'px';
			} else if (count == 3) {
				style.top = parseInt(style.top) - duration + 'px';
			} else {
				style.left = parseInt(style.left) - duration + 'px';
			}

			if (count >= 4) {
				count = 0;
				end++;
			}

			setTimeout(function() {
				that.playShake(animation, count, end, cball);
			}, 50)
		},

		// 播放飞入
		playFlyInto : function(animation, cball) {
			var $obj = $("#" + animation.recId);
			var width = $obj.width();
			var height = $obj.height();
			var parWidth = $(this.parentSelector).width() * 0.95;
			var parHeight = $(this.parentSelector).height();

			var source = {
				opacity : 1
			};
			var target = {
				top : $obj.css("top"),
				left : $obj.css("left")
			};

			var direction = animation.direction;
			if (direction == "top2bottom") {
				source.top = (-1 * height) + "px";
			} else if (direction == "bottom2top") {
				source.top = parHeight + "px";
			} else if (direction == "left2right") {
				source.left = (-1 * width) + "px";
			} else if (direction == "right2left") {
				source.left = parWidth + "px";
			}

			$obj.css(source).animate(target, animation.duration * 1000, function() {
				if (typeof cball == "function") {
					cball();
				}
			})
		},

		// 
		showByLocal : function(animation, cball) {
			var $obj = $("#" + animation.recId);
			var source = {
				opacity : 1
			};
			$obj.animate(source, animation.duration * 1000, function() {
				if (typeof cball == "function") {
					cball();
				}
			})
		},

		// 
		hideByLocal : function(animation, cball) {
			var $obj = $("#" + animation.recId);
			var source = {
				opacity : 0
			};
			$obj.animate(source, animation.duration * 1000, function() {
				if (typeof cball == "function") {
					cball();
				}
			})
		},

		// 播放下一个
		playNext : function(cball) {
			var that = this;
			if (this.list.length == 0 || this.list.length <= this.playIdx) {
				if (typeof cball == "function") {
					cball("last");
				}
				return;
			}
			var animation = this.list[this.playIdx++];
			this.playHistory[animation.recId] = true;

			var next = (this.playIdx <= this.list.length - 1) ? this.list[this.playIdx] : null;

			this.play(animation, function() {
				// 上一动画之后
				if (next != null && next.start == "prevNext") {
					that.playNext(next, cball);
				} else if (typeof cball == "function") {
					cball();
				}
			});

			// 与上一动画同时
			if (next != null && next.start == "prevSynch") {
				this.playNext();
			}
		},

		// 隐藏上一个
		hidePrev : function(cball) {
			if (this.list.length == 0 || 0 == this.playIdx) {
				if (typeof cball == "function") {
					cball("first");
				}
				return;
			}

			var animation = this.list[--this.playIdx];
			var $obj = $("#" + animation.recId);

			switch (animation.effect) {
				case 'shake':
					break;

				case 'hideByLocal':
					$obj.css({
						opacity : 1
					});
					break;

				default:
					$obj.css({
						opacity : 0
					});
					break;
			}

			this.playHistory[animation.recId] = false;
			if (typeof cball == "function") {
				cball();
			}
		},

		// 从课程内容中获取动画数据
		getArrByKnowTeac : function(itemArr, currPage, isHide, idPrefix) {
			this.list = [];
			this.playIdx = 0;

			var list = [];
			if (!itemArr || itemArr.length == 0) {
				return list;
			}

			if (!idPrefix) {
				idPrefix = {};
			}

			var knowTeac, animation, knowTeacId, ctype;
			var isPlay;// 当前页中的对象是否有播放过，如果有播放过，那么再次打开该页时，该对象不隐藏, playIdx为list长度-1
			for (var i = 0, len = itemArr.length; i < len; i++) {
				knowTeac = itemArr[i];
				knowTeacId = knowTeac.KNOW_TEAC_ID;
				ctype = knowTeac.CTYPE;

				if (knowTeac.PAGE != currPage || !knowTeac.ATTR_JSON) {
					continue;
				}

				if (typeof knowTeac.ATTR_JSON != 'object') {
					knowTeac.ATTR_JSON = JSON.parse(knowTeac.ATTR_JSON);
				}
				animation = knowTeac.ATTR_JSON.ANIMATION;
				if (!animation) {
					continue;
				}
				animation.recId = (idPrefix[ctype] || '') + knowTeacId;
				list.push(animation);

				isPlay = this.playHistory[animation.recId];

				if (isHide && !isPlay) {
					if ('flyInto,showByLocal'.indexOf(animation.effect) != -1 && knowTeac.STYLE) {
						knowTeac.STYLE.opacity = 0;
						Vue.set(knowTeac.STYLE, "opacity", 0);
					}
					$("#" + animation.recId).css({
						opacity : 0
					});
				}
			}

			list.sort(function(a, b) {
				return a.ordidx - b.ordidx;
			})

			for (var i = 0, len = list.length; i < len; i++) {
				if (this.playHistory[list[i].recId]) {
					this.playIdx = i + 1;
				}
			}

			this.list = list;
			return list;
		}
	}
	win.AnimationPlug = AnimationPlug;
	// 把这个对象附给window底下的 名字叫VoicePart的对象；要不你调用的时候 new AnimationPlug()
	// 怕在window的环境下找不到；
}(window, document))