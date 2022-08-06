var gloParams = getUrlParamJson("", true);
var content = new Vue({
	el : '#content',
	data : {
		C : C, // 各种常量
		treeData : [],
		CONT_ARR : [], // 知识内容
		treeOptions : {
			checkbox : false, // 有复选框
			checkOnSelect : true, // 点击文字时，复选框选中
			autoCheckChildren : false, // 选中父节点时不关联选中子节点
			propertyNames : {},
			isFold : true
		},
		params : {
			COURSE_ID : '',
			USER_TYPE : '',
			IS_ALONE : '0' // 是否单机独立版
		},

		menuShow : true, // 左边菜单是否显示
		leftPageListShow : false, // 左边页码列表是否显示
		rightPageListShow : false, // 右边页码列表是否显示
		pageList : [], // 页码列表
		currPage : 1, // 当前页码
		nodeList : [], // 节点数组
		nodeSelect : '', // 选中的节点id
		nodeIdx : -1, // 当前选中的节点的下标
		selKnow : {},
		isTeac : false,
		bg : {}, // 背景图片插件对象
		isByJson : true, // true:课程内容根据json文件查询，false：课程内容根据数据库内容查询，先查目录，点击目录后再根据目录查询具体内容
		isShow : {
			btnBrush : true, // 是否显示画笔按钮
			btnInteract : false,
			btnTool : typeof top.openCloseTool == 'function'
		},
		bgItemJson : {}, // 背景图
		examTask : {
			list : [],
			isShow : false
		},
		isFullScreen : false,
		linkKnowJson : {},// 知识点链接：页码~数组
		link : {},// 知识点链接对象
		brush : {}, // 画笔对象
		isShowCont : true,
		knowStudy : {
			intId : 0,
			lastKnowId : ''
		},
		course : {},
		courseParam : {},// 课程针对学校的配置
		menu : {
			isFold : true, // 是否折叠
			isSearchIng : false,// 是否打开搜索
			isShow : true
		// 是否显示菜单
		},
		treeUtil : {},
		isExe : isExe(),
		pianoKeyboard : {}, // 钢琴虚拟对象
		isKnowPreview : false, // 是否知识点预览
		isCurrPageHasAbc : false, // 当前页是否含有abc
		isMusicPerson : gloParams.COURSE_ID == "COa1df639b533b44548ffe3c0083fe52", // 是否
																					// 9911
																					// 世界音乐名人
		itemBoxStyle : {},
		search : {},
		musicFormParams : {},
		isShowMusicForm : false, // 是否显示曲式分析
		isShowMusicFormBtn : false, // 是否显示曲式分析
		wavesurferMap : {},
		user : getUserPo(),
		isAndroid : imusicCommon.isAndroid(),
		isOpusLib : false, // 是否显示作品库
		opusList : [], // 作品库
		opusMsg : '', // 作品库信息
		opusType : 'MF', // 作品库类型 MF：曲式分析 SJXBZ：即兴伴奏
		searchTimer : null,
		editOpusId : '', // 显示作品库的操作按钮
		opusReqFrm : {
			COURSE_ID : '',
			KNOWLEDGE_ID : '',
			PERSON_ID : '',
			TITLE : ''// 作品名称
		},
		midi : {},
		material : {}, // 素材库
		qrcodeObj : qrcodeObj, // 二维码
		moreIframe : {
			fullIframeId : '',
			arr : [ {
				idx : 1,
				style : {}
			} ]
		},
		isShowOpusLib : false,
		dragZIdx : 9999, // 被拖拽的窗口层级
		notResize : false, // 不要重新计算排版
		isDd : false,
		isArt: false,	// 是否钉钉
		isOnlyOneTopKnow: true // 是否只有一个顶级知识点
	},
	computed : {
		isAlone : function() { // 是否单机独立版，单机独立版没有后台
			return gloParams.IS_ALONE == "1" ? true : false;
		},
		isKtjsbx : function() {
			return isVersionComplete() && typeof parent.mainKtjsbx == 'object';
		}
	},
	watch : {
		'course.COURSE_TYPE': function( val){
			this.isArt = C.COURSE.COURSE_TYPE.ART == val;
		},
		leftPageListShow : function(newVal) {
			if (newVal) {
				$('.page-jump.left .page-list-box').fadeIn();
			} else {
				$('.page-jump.left .page-list-box').fadeOut();
			}
		},
		rightPageListShow : function(newVal) {
			if (newVal) {
				$('.page-jump.right .page-list-box').fadeIn();
			} else {
				$('.page-jump.right .page-list-box').fadeOut();
			}
		},
		currPage : function(newVal, oldVal) {
			if (typeof top.bottomTagsWidthChange == 'function') {
				top.bottomTagsWidthChange();
			}
			Vue.nextTick(function() {
				singAbcTool.setSingToolStyle(this);
			})
		},
		menuShow : function(newVal, oldVal) {
			var that = this;
			// 左边菜单栏展开、收起重新计算排版位置，这里设置延迟是为了让菜单栏的动作先完成再执行计算操作
			setTimeout(function() {
				that.resetData();
				singAbcTool.setSingToolStyle(that);
			}, 100);

			// this.setTopShowKnowTree();
			if (typeof top.bottomTagsWidthChange == 'function') {
				top.bottomTagsWidthChange();
			}
			/**
			 * 这两个原本是用:class的方法写在html上的，和新的界面有点冲突，做一下让步哈 ps:在新界面下这两个新增的样式貌似也没什么用
			 * created by lhq
			 */
			$('.right-box').toggleClass('box-expand', !this.menuShow);
			/* $('.bottom-box').toggleClass('box-expand', !this.menuShow); */
		},
		isOpusLib : function(val) {
			if (val) {
				if (this.editOpusId) {
					// 打开作品库时，如果处于编辑模式，则关闭。
					this.editOpusId = false;
				}
				this.opusReqFrm.TITLE = '';
				this.queryOpus();
			}
		},
		'examTask.isShow' : function(newVal, oldVal) {
			if (newVal) {
				this.queryExamByKnow(false);
			}
		}
	},
	methods : {
		// 课堂及时表现
		openKtjsbx : function() {
			top.mainKtjsbx.open();
		},

		// setTopShowKnowTree : function() {
		// if (parent.content && parent.content.isShow) {
		// parent.content.isShow.knowTree = this.nodeList.length > 1 &&
		// !this.menuShow;
		// }
		// },
		// 打开曲式分析
		popMusicForm : function(id, attachId) {
			this.stopAllMedia();
			var widHei = window.top.getPopWidHei(9999, 9999);
			var params = {
				"COURSE_ID" : this.selKnow.COURSE_ID,
				"KNOWLEDGE_ID" : this.selKnow.KNOWLEDGE_ID
			}

			var url = '../musicform/music_form_show.html?attachid=' + attachId + '&iframeId=' + id + '&' + json2urlParams(params);
			window.top.$.popBigWindow(id, url, "曲式分析", function() {
				that.queryOpus();
			}, {
				width : widHei.width,
				height : widHei.height,
				isIframe : true,
				isAriaHidden : true,
				isCloseBtn : 0
			});
		},
		// 树的折叠和收起
		treeUnfold : function() {
			this.treeOptions.isFold = !this.treeOptions.isFold;
			if (this.treeOptions.isFold) {
				// 折叠
				this.treeUtil.expandAll();
			} else {
				// 展开第一个节点
				var nodes = this.treeUtil.findByLevel(0);
				if (nodes && nodes.length > 1) {
					this.treeUtil.collapseAll();
				} else {
					this.treeUtil.expand(0, true);
				}
			}
			this.treeUtil.treeLine();
		},

		// 亮出搜索
		treeSearchToggle : function() {
			var that = this;
			$(".tree-search-box").toggleClass('hide');
			$(".app-search").toggle(200);
			setTimeout(function() {
				$(".app-search input.form-control").focus();
				if ($(".app-search").css("display") == "none") {
					that.treeUtil.searchClear();
				}
			}, 210);
		},

		nodeChecked : function(id, flag) {
			// 知识点，加选中
			var selNodes = this.$refs.tree.findAll({
				id : id
			});
			if (selNodes) {
				if (flag) {
					selNodes.select(true);
				} else {
					selNodes.unselect(true);
				}
				selNodes.expand();
			}
		},
		nodeClick : function(model, index) {
			var that = this;
			// 线
			that.treeUtil.treeLine();
			if (model.data.KNOW_TYPE <= C.KNOW_TYPE_LESSON) {
				if (this.nodeSelect) {
					this.nodeChecked(this.nodeSelect, true);
				}
				return;
			}
			if (this.nodeSelect == model.id) {
				this.nodeChecked(model.id, true);
				return;
			}
			this.notResize = true;
			// 知识点，取消前一个的选中
			if (this.nodeSelect) {
				this.nodeChecked(this.nodeSelect, false);
			}

			this.selKnow = model.data;
			this.nodeSelect = model.id;
			this.nodeIdx = parseInt(index);
			$('#empty').remove();
			$(".tooltip").remove();
			this.currPage = 1;
			// 清空子页面中的映射出来的按钮栏
			$(".sing-tool-box").html("").attr("data-iframe-id", "").addClass("hide");

			this.isShowCont = true;
			// 知识点，加选中
			this.nodeChecked(model.id, true);
			// 先查内容，没有内容再查作业
			this.getKnowTeac(model, this.selKnow.COURSE_ID, this.selKnow.KNOWLEDGE_ID);
			
			if( this.isKnowPreview){
				setDocTitle( this.selKnow.KNOWLEDGE_TITLE );
			}
		},
		// 初始化授课内容
		getKnowTeac : function(model, courseId, knowId) {
			var that = this;
			this.bgItemJson = {};
			this.linkKnowJson = {};

			// 单机独立版
			if (this.isAlone) {
				model.CONT_ARR = model.data.CONT_ARR;
				this.notResize = false;
				this.initKnow(model);
				return;
			}

			loading();
			var params = {
				// "URL2HTTP" : 0,
				"COURSE_ID" : courseId,
				"KNOWLEDGE_ID" : knowId,
				"IS_SAVE_READ" : 1
			}
			ajaxPost("HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=co.know.teac!queryKnowTeac", params, function(res) {
				hideLoading();
				that.notResize = false;
				if (res.result == 1) {
					var data = JSON.parse(res.data);
					model.CONT_ARR = data[0].data.CONT_ARR;
					// getFile 获取音频信息
					// for(var i = 0; i < model.CONT_ARR.length; i++){
					// var currDataArr = model.CONT_ARR[i].DATA;
					// for(var j = 0; j < currDataArr.length; j++){
					//							
					// }
					// }
					that.initKnow(model);
				} else {
					top.alert(res.msg);
				}
			})
		},
		// 初始化授课内容
		initKnow : function(model) {
			var that = this;
			this.currPage = 1;
			this.isShowCont = true;
			this.examTask.isShow = false;
			this.CONT_ARR = [];
			this.setPageList(0);
			this.setRightStyle();
			if (!(model.CONT_ARR && model.CONT_ARR.length)) {
				// 查询作业
				window.top.isLogin(function() {
					that.queryExamByKnow(true);
				})
				return;
			} else {
				// 查询作业
				this.queryExamByKnow(false);
			}
			// 节点切换的时候要清楚原来首次刷新纪录，否则节点再切回来的时候，第一次进入也不会刷新，导致谱子出不来说
			// this.CONT_ARR && this.CONT_ARR.forEach(function(item, idx) {
			// item.REFRESH = 0;
			// });

			var rcW, dataJson;
			for (var i = 0; i < model.CONT_ARR.length; i++) {
				// //获取当前页面的内容
				var arr = model.CONT_ARR[i];

				for (var j = 0; j < arr.DATA.length; j++) {
					var r = arr.DATA[j];
					// 曲式数据
					if(r.DATA_JSON){
						r.DATA_JSON = JSON.parse(r.DATA_JSON);
						if(r.CTYPE == 'audio' && r.DATA_JSON.IS_AUDIO_MFDESC == 1){
							// 碰到有配置曲式分析的音频，直接显示，不要点击弹出
							r.CTYPE = 'sx';
							arr.DATA = [].concat(r);
							break;
						}
					}
					
					if (r.CTYPE == 'audio') {
						!(function(that, id) {
							getAttach(id, function(data) {
								if (data.MFDESC && data.MFDESC != '[]') {
									Vue.set(that.musicFormParams, id, {
										'isShowMusicFormBtn' : true,
										'isShowMusicForm' : false
									})
								}
							})
						})(that, r.ATTACH_ID);
					}
				}
				
				if (i == 0) {
					rcW = that.setRightStyle(arr);
				}
				arr.DATA = this.initData(arr.DATA, rcW); // 初始化元素宽高、位置数据
			}

			// 按頁碼排序
			model.CONT_ARR.sort(function(a, b) {
				return a.PAGE - b.PAGE;
			})

			this.CONT_ARR = model.CONT_ARR;
			this.setPageList(content.CONT_ARR.length); // 设置page
			this.gotoPage(1);

			Vue.nextTick(function() {
				that.initFilePreview();

				// 将数学公式代码转换为数学公式
				MathJax.startup.defaultReady();
			})

			// 存储学时时长
			this.saveLearnPeriod();
			
			if(top.wsUploadControl && top.wsUploadControl.wsSend2Server){
				
				top.wsUploadControl.wsSend2Server({
					'OP_TYPE': 'teaching2phone',
					'COURSE_ID': this.selKnow.COURSE_ID,
					'KNOWLEDGE_ID': this.selKnow.PARENT_ID
				})
			}
		},

		ratio2arr : function(ratio) {
			if (!ratio) {
				ratio = "16:9";
			}
			// var pageHei = $(".page-box").height() || 46;
			// var width = window.screen.width;
			// var height = window.screen.height;
			// // 因为要扣除底部按钮栏高度，所以
			// switch (ratio) {
			// case "16:9":
			// // 1920 ~ 1080-46 = 1920 ~ 1034
			// ratio = "1920:1034";
			// break;
			// case "16:10":
			// // 1920 ~ 1200-46 = 1920 ~ 1154
			// ratio = "1920:1154";
			// break;
			// case "4:3":
			// // 1920 ~ 1440-46 = 1920 ~ 1394
			// ratio = "1920:1394";
			// break;
			// default:
			// break;
			// }
			return ratio.split(":");
		},
		// 图片预览，顺序排序规则：
		// 1、先按页排序；2、以图片左上角距离页面左上角的间距为基准，越小的排序越靠前；/3、因为页面是长方形的，会出现最右的图片比最左下的图片还靠前，所以把高度加大
		initFilePreview : function() {
			if (!this.CONT_ARR || this.CONT_ARR.length == 0) {
				return;
			}
			var files = new Array();
			var row, ratio;
			for (var i = 0; i < this.CONT_ARR.length; i++) {
				row = this.CONT_ARR[i];

				if (!ratio) {
					ratio = '16:9';
					if (row.DATA && row.DATA.length > 0) {
						ratio = row.DATA[0].RATIO;
					}
					// ratio = ratio.split(':');
					ratio = this.ratio2arr(ratio);
					ratio = ratio[0] / ratio[1];
				}

				for (var j = 0; j < row.DATA.length; j++) {
					var r = row.DATA[j];
					if (r.CTYPE != 'img') {
						continue;
					}

					var dis = Math.sqrt(Math.pow(Math.abs(r.X), 2) + Math.pow(Math.abs(r.Y * ratio), 2));
					files.push({
						ATTACHURL : r.CONTENT,
						DIS : row.PAGE + dis
					});
				}
			}

			files.sort(function(a, b) {
				return a.DIS - b.DIS
			});

			this.filePreviewFiles = files;
		},

		contImgClick : function(model) {
			if(model.CONTENT){
				model.CONTENT = model.CONTENT.replace(/[\?\&]v\=\d{1,}/g, '');
			}
			top.filePreview.init(this.filePreviewFiles, 0, model.CONTENT);
		},

		// 左边菜单展开、收起
		menuBtnClick : function() {
			var that = this;
			this.menuShow = !this.menuShow;
		},

		// 页面跳转
		gotoPage : function(page) {
			var that = this;
			var isGoNext = page >= this.currPage;
			if (page == this.currPage) {
				$('.page-jump .page-list-box').fadeOut();
			}
			$('#empty').remove();

			this.pianoKeyboard.isOpen = false;
			this.moreIframe.fullIframeId = '';
			this.moreIframe.arr = [];

			if (page <= 0) {
				this.gotoPrevKnow();
				return;
			}
			if (page > this.pageList.length) {
				this.gotoNextKnow();
				return;
			}
			if (page > 0 && page <= this.pageList.length) {
				// 切换画布
				// if (this.brush.isOk) {
				// this.brush.switchCanvas(page - 1);
				// }
				// 清空子页面中的映射出来的按钮栏
				$(".sing-tool-box").html("").attr("data-iframe-id", "").addClass("hide");

				this.currPage = page;
				Vue.nextTick(function() {
					$('.right-box').removeClass('full-screen-new');
					$('.bottom-box').removeClass('full-screen-new');
					that.resetData();
				})
				// 页面跳转的时候停止音频、视频
				this.stopAllMedia();
				try { // 如果操作过快，在页面未加载完成时调用会抛异常，这里捕获异常
					// 页面跳转时停止钢琴授课里的所有播放
					var $btn = $('.piano-if').contents().find("#btnStopAll");
					if ($btn.length > 0) {
						$btn.click();
					}
					// 页面跳转时停止声乐授课里的所有播放
					$btn = $('.vocal-iframe').contents().find("#btnStopAll");
					if ($btn.length > 0) {
						$btn.click();
					}
				} catch (e) {

				}

				/* 跳转页面时，让声乐的iframe刷新1次，以免五线谱显示不出来 */
				// var idx = imusicCommon.getArrIdx(this.CONT_ARR, 'PAGE',
				// page); // 获取当前页面在CONT_ARR的索引值
				// Vue.set(this.CONT_ARR[idx], 'REFRESH', 1); //
				// 将REFRESH字段设为1，iframe地址改变就会刷新，而后面每次都是1,所以只刷新一次
				// 设置页面背景，默认第一页
				// this.bg.setBoxBg2(this.bgItemJson, this.currPage,
				// this.isFullScreen);
				this.bg.setBoxBg2(this.bgItemJson, this.currPage, false);
				// this.bg.setBoxBg3(this.bgItemJson, this.currPage,
				// ".right-bg", ".right-content-container");

				// 初始化知识点链接
				this.link.initByItemPage(this.linkKnowJson[this.currPage], this.currPage, true);

				var knowTeacArr = imusicCommon.getArrItem(this.CONT_ARR, 'PAGE', this.currPage);

				// 初始化动画数据，在window.click中使用
				this.animation.getArrByKnowTeac(knowTeacArr.DATA, this.currPage, true, {
					"audio" : "p-"
				});

				Vue.nextTick(function() {
					// 防止整个页面的动画都是跟在上一页动画之后，就会导致点击上一页时，无法回到上一页，应该回去之后，各种动画跑一遍后又到了下一页
					if( isGoNext){
						var list = that.animation.list;
						if (list && list.length > 0) {
							var first = list[0];
							if (first.start == "prevSynch" || first.start == "prevNext") {
								that.gotoNextPage();
							}
						}
					}

					if (knowTeacArr.DATA) {
						var po;
						that.isShowOpusLib = false;
						for (var i = 0; i < knowTeacArr.DATA.length; i++) {
							po = knowTeacArr.DATA[i];
							if (po.ATTACH_ID && po.CTYPE == 'audio') {

								!(function(that, id) {
									getAttach(id, function(data) {
										if (data.MFDESC) {
											that.isShowOpusLib = true;
										}
									})
								})(that, po.ATTACH_ID);
							}
						}

					}

					// 初始化切片视频的播放
					videocut.init({
						fileUrl : top.C.FILE_URL,
						selector : '.videocut'
					});

					// 工具栏
					singAbcTool.setSingToolStyle(that);
				})
			}

			// 只有教师才需要有开启互动功能，资源库课程也不需要
			setCookie("appCode", this.appCode);
			// this.isShow.btnInteract = imusicCommon.isShowInteract() &&
			// this.isTeac && (!gloParams.IS_RESOURCE || gloParams.IS_RESOURCE
			// != "1");
		},
		gotoPrevPage : function() {
			var that = this;
			// 初始化动画数据，在window.click中使用
			if (this.animation.list.length > 0) {
				this.animation.hidePrev(function(result) {
					if (result == "first") {
						// 第一个动画，再点就翻页了
						that.gotoPage(that.currPage - 1);
					}
				});
			} else {
				this.gotoPage(this.currPage - 1);
			}
		},
		gotoNextPage : function() {
			$('#empty').remove();
			var that = this;
			// 初始化动画数据，在window.click中使用
			if (this.animation.list.length > 0) {
				this.animation.playNext(function(result) {
					if (result == "last") {
						// 最后一个动画，再点就翻页了
						that.gotoPage(that.currPage + 1);
					}
				});
			} else {
				this.gotoPage(this.currPage + 1);
			}
		},
		gotoPrevKnow : function() { // 跳转至上一个知识点
			$('#empty').remove();
			if (this.nodeIdx > 0) { // 如果当前节点不是第一个节点，那就调到上一个节点
				this.nodeClick(this.nodeList[this.nodeIdx - 1], this.nodeIdx - 1);
			} else {
				this.getPrevOrNextKnow("prev", "已经是第一个知识点");
			}
		},
		gotoNextKnow : function() { // 跳转至上一个知识点
			if (this.nodeIdx < this.nodeList.length - 1) { // 如果当前节点不是最后一个节点，就跳到下一个节点
				this.nodeClick(this.nodeList[this.nodeIdx + 1], this.nodeIdx + 1);
			} else {
				this.getPrevOrNextKnow("next", "已经是最后一个知识点");
			}
		},
		getPrevOrNextKnow : function(opType, msg) { // 跳转至上一个或者下一个知识点
			if (this.isAlone) {
				return;
			}
			var that = this;
			var params = {
				"COURSE_ID" : gloParams.COURSE_ID,
				"KRELATION_NO" : this.selKnow.KRELATION_NO,
				"OP_TYPE" : opType
			}
			ajaxPost("HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=co.know!getPrevOrNextKnow", params, function(res) {
				hideLoading();
				if (res.result == 1 && res.data) {
					var know = JSON.parse(res.data);
					if (that.isMusicPerson) {
						that.selKnow = know;
						that.currPage = 1;
						// 清空子页面中的映射出来的按钮栏
						$(".sing-tool-box").html("").attr("data-iframe-id", "").addClass("hide");
						that.isShowCont = true;
						that.getKnowTeac({}, know.COURSE_ID, know.KNOWLEDGE_ID);
					} else if (know.KRELATION_NO) {
						queryKnow(gloParams.COURSE_ID, know.KRELATION_NO.substr(0, 6), function(db) {
							initDb(that, db, opType == "prev");
						})
					}
				} else {
					autoAlert(msg);
				}
			})
		},
		// 设置页面列表
		setPageList : function(pageSize) {
			var that = this;
			if (pageSize > 0) {
				this.pageList = new Array(pageSize);
				this.resetData();
				
				if(isArt()){
					// 美术系统中用
					var canvasIds = '';
					for (var i = 0; i < this.pageList.length; i++) {
						canvasIds += ",brushCanvas" + i;
					}
					if (canvasIds) {
						Vue.nextTick(function() {
							canvasIds = canvasIds.substring(1);
							// 画笔
							that.brush = new Brush(canvasIds, "brushCanvasTmp");
						})
					}
					// 美术系统中用
				}
			} else {
				this.pageList = [ 1 ];
			}
		},

		// 换算CONT_ARR里data数组的width, height, x, y 属性以及父元素的宽度、高度
		initData : function(arr, rcW) {
			var that = this;
			this.isCurrPageHasAbc = false;
			return knowTeac.initKnowTeacArr(arr, {
				width : rcW,
				contLink : this.contLink
			}, function(itemArr, vocalPianoItem, bgItem, linkArr) {
				arr = itemArr;
				if (bgItem) {
					that.bgItemJson[bgItem.PAGE] = bgItem;
				}
				if (linkArr) {
					that.linkKnowJson[linkArr[0].PAGE] = linkArr;
				}
				if (vocalPianoItem) {
					that.isCurrPageHasAbc = true;
				}
				if (vocalPianoItem && vocalPianoItem.IS_LOAD != "1") {
					// 在子页面中abc加载完成后关闭
					top.loading();
				} else {
					// to do， 之前一次莫名其妙的情况，不知道哪里出现一个 loading()
					setTimeout(function() {
						hideLoading();
					}, 1500);
				}
			});
		},

		setRightStyle : function(arr) {
			// 钢琴全屏，一个中只有一个视唱或者声乐的也全屏
			this.isFullScreen = false;

			var $rcc = $('.right-content-container');
			var $rc = $('.right-content');
			// 每次设置之前先全屏，防止页面切换之后用旧的宽度去计算
			$rc.css({
				/* height : '100%', */
				width : '100%',
				left : 0,
				top : 0
			});
			var knowType = this.selKnow.KNOW_TYPE;
			if (!arr || !arr.DATA || arr.DATA.length == 0) {// 试卷
				return;
			}

			if (arr.DATA.length == 1 && ("piano,vocal,sing".indexOf(arr.DATA[0].CTYPE) != -1)) {
				this.isFullScreen = true;
			}
			if (this.isFullScreen) {
				return false;
			}

			var rows = arr.DATA;

			// 获取备课比例
			// var ratio = rows[0].RATIO || '16:9';
			// ratio = ratio.split(':')[0] / ratio.split(':')[1];
			ratio = rows[0].RATIO;
			ratio = this.ratio2arr(ratio);
			ratio = ratio[0] / ratio[1];

			// 直接用windiw的高度，防止因为备课配置的高度过高，或者页面各种padding之类的影响总高度，导致图文混排的页面，曲谱高度计算有误
			// var winW = $rc.width(), winH = $rc.height();
			var winW = $rc.width(), winH = $(window).height() - 12 - 72;
			var rcW, rcH;

			if (this.course.COURSE_ID == 'COb2cd0c4cfeda4265a3496bffae2d31') {
				winH = $(window).height() - 12;
				console.log("bad")
			}

			var vocalPianoItem = knowTeac.getVocalPianoItem(rows);
			if (vocalPianoItem && vocalPianoItem.ABC_MIXED_UNFOLD != '1') {
				// 不展开，那么需要扣除底部按钮栏的高度
				// winH = winH - 61;

			}

			// 如果当前窗口比例比备课比例大，则高度沾满，宽度按比例算，左右居中
			if (winW / winH > ratio) {
				rcW = winH * ratio;
				rcH = winH;
			} else { // 反之则宽度占满，高度按比例算，垂直居中
				rcW = winW;
				rcH = winW / ratio;
			}

			// 备课时候的课件比例
			var top = (rcW == winW ? ($rcc.height() - rcH) / 2 : 0);
			this.itemBoxStyle = {
				position : 'absolute',
				width : rcW + 'px',
				top : (top < 0 ? 0 : top) + 'px',
				left : (rcH == winH ? ($rcc.width() - rcW) / 2 : 0) + 'px'
			}
			return rcW;
		},
		// 重新初始化数据
		resetData : function() {
			if (this.CONT_ARR.length == 0) {
				return;
			}
			var arr = imusicCommon.getArrItem(this.CONT_ARR, 'PAGE', this.currPage); // 获取当前页面的内容

			// if((arr.DATA.length == 1 && (arr.DATA[0].CTYPE == 'sing' ||
			// arr.DATA[0].CTYPE == 'vocal'|| arr.DATA[0].CTYPE == 'piano'))
			// || (arr.DATA.length == 2 && (arr.DATA[0].HAS_BG ||
			// arr.DATA[1].HAS_BG)
			// && ((arr.DATA[0].CTYPE == 'sing' || arr.DATA[0].CTYPE ==
			// 'vocal'|| arr.DATA[0].CTYPE == 'piano')
			// || (arr.DATA[1].CTYPE == 'sing' || arr.DATA[1].CTYPE == 'vocal'||
			// arr.DATA[1].CTYPE == 'piano')))){
			if (this.isAbcContent(arr.DATA)) {
				Vue.nextTick(function() {
					$('.right-box').addClass('full-screen-new');
					for (var i = 0, len = arr.DATA.length; i < len; i++) {
						if (arr.DATA[i].IS_LOAD == 1) {
							$('.bottom-box').addClass('full-screen-new');
						}
					}
				})
			}
			var rcW = this.setRightStyle(arr);
			this.initData(arr.DATA, rcW); // 初始化元素宽高、位置数据
		},
		// 是否有abc内容
		isAbcContent : function(arr) {
			if (!arr || arr.length <= 0) {
				return false;
			}
			for (var i = 0, len = arr.length; i < len; i++) {
				if (arr[i].CTYPE == 'sing' || arr[i].CTYPE == 'vocal' || arr[i].CTYPE == 'piano') {
					return true;
				}
			}
			return false;
		},
		// 暂停所有音频、视频
		stopAllMedia : function() {
			var audios = document.getElementsByTagName("audio");
			[].forEach.call(audios, function(i) { // 这里不能用audios.forEach,会报audios.forEach
				// is not a function的错误
				i.pause();
			})
			var videos = document.getElementsByTagName("video");
			[].forEach.call(videos, function(i) {
				i.pause();
			})
		},

		openInteract : function(useType) { // 开启互动
			window.top.interactYl(this.selKnow.KNOWLEDGE_ID, useType);
		},

		openExamKnow : function() { // 布置作业
			var that = this;
			var params = {
				USE_TYPE : C.EXAM.USE_TYPE.TASK,
				COURSE_ID : this.selKnow.COURSE_ID,
				KNOWLEDGE_ID : this.selKnow.KNOWLEDGE_ID,
				TMP : new Date().getTime()
			};
			var url = "&ITEMNO=" + ( 'art' == getSubject() ? 'a.': '') + "web.know.exammain&" + json2urlParams(params);
			var user = getUser();
			if (!user || !user.personId) {
				window.top.openLogin(null, '', function(res) {
					top.menuClick('manager', '管理与分析系统', url);
				});
			} else {
				top.menuClick('manager', '管理与分析系统', url);
			}
		},

		// 查询知识点下的作业列表
		queryExamByKnow : function(showMsg) {
			if (this.isAlone) {
				return;
			}

			var that = this;
			var params = {
				"USERTYPE" : getUser().userType,
				"KNOWLEDGE_ID" : this.selKnow.KNOWLEDGE_ID,
				"USE_TYPE" : C.EXAM.USE_TYPE.TASK,
				"IS_ALL" : 'false'
			}
			ajaxPost("HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=exam.paper!queryByKnow", params, function(res) {
				if (res.result == 1 && res.data) {
					that.examTask.list = JSON.parse(res.data).Rows;
				} else {
					that.examTask.list = [];
				}
				if (showMsg) {
					if (that.examTask.list.length == 0) {
						$('.right-content').append('<div id="empty">内容正在维护中</div>')
					} else {
						$('#empty').remove();
						// 没有内容，直接显示第一个作业
						that.showExam(that.examTask.list[0]);
					}
				}
			});
		},

		// 查询知识点下的作业列表
		showExam : function(exam) {
			if (this.isAlone) {
				alert("课件独立版不支持此试卷功能，请使用正式版本");
				return;
			}

			var that = this;
			if (this.knowStudy.intId) {
				clearInterval(this.knowStudy.intId);
				this.knowStudy.intId = 0;
			}
			this.isShowCont = false;
			var params = {
				EXAMPAPER_ID : exam.EXAMPAPER_ID,
				COURSE_ID : this.selKnow.COURSE_ID,
				KNOWLEDGE_ID : this.selKnow.KNOWLEDGE_ID,
				KNOW_TYPE : this.selKnow.KNOW_TYPE,
				USER_TYPE : this.isTeac ? 'teac' : 'stu',
				TMP : new Date().getTime()
			}

			window.top.isLogin(function(trainTerm) {
				params.TRAIN_ID = trainTerm.TRAIN_ID;
				params.TERM_CODE = trainTerm.TERM_CODE;

				if (that.selKnow.EXAM_TYPE == C.EXAM.EXAM_TYPE.JZ) {
					params.PAR_KNOW_ID = that.selKnow.PARENT_ID;

					var person = getUser();
					params.PERSON_ID = person.personId;
					params.ORGCODE = person.orgCode;
					var url = C.HOST + "HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=know.question!goTo&" + json2urlParams(params);
					var widHei = getPopWidHei(1200, 1200);
					$.popBigWindow("w-question-main", url, "节奏视唱", function() {

					}, {
						width : widHei.width,
						height : widHei.height,
						isIframe : 1
					});
				} else {
					$("#examIframe")[0].src = "../course/know_exampaper.html?" + json2urlParams(params);
				}
			})

			var $rc = $('.right-content');
			// 每次设置之前先全屏，防止页面切换之后用旧的宽度去计算
			$rc.css({
				/* height : '100%', */
				width : '100%',
				left : 0,
				top : 0,
			});
		},
		saveLearnPeriod : function() { // 保存学习时长
			if (this.isAlone) {
				return;
			}

			var that = this;
			var user = null;
			if (!imusicCommon.isSupportInteract()) {
				return;
			}
			var isAlert = true;
			this.knowStudy.intId = setInterval(function() {
				if (user == null) {
					user = getUser();
				}
				if (!user || !user.personId || !isStu()) {
					return;
				}

				if (!user.trainId) {
					user = getUser();
				}
				if (!user.trainId && isAlert) {
					isAlert = false;
					// window.top.alert("请教师前往【管理与分析系统->班级管理】，配置班级、学期（有效期内）、学生信息，否则学生学时时长不予统计");
					return;
				}

				// 每隔5秒保存一次学时
				var params = {
					TRAIN_ID : user.trainId,
					TERM_CODE : user.termCode,
					COURSE_ID : that.selKnow.COURSE_ID,
					PAR_KNOW_ID : that.selKnow.PARENT_ID,
					KNOWLEDGE_ID : that.selKnow.KNOWLEDGE_ID,
					STUDY_TIME : 5,
					PERSON_ID : user.personId,
					ORGCODE : user.orgCode
				};

				ajaxPost('HttpChannel?action=APP_ACTION&BUSINESS_TYPE=co.know!saveLearnPeriod', params, function(res) {
				});
			}, 5 * 1000);
		},

		// 打开画笔
		openBrush : function() {
			if (this.isFullScreen) {
				// 全屏的时候调用子页面中的白板和视图
				var $iframe = $(".item-list > .active iframe");
				if ($iframe.length == 0) {
					return;
				}
				$iframe[0].contentWindow.isRightBtnShow();
			} else {
				this.brush.openClose();
			}
		},

		// 监听音频播放
		audioPlay : function(that) {
			$this = that;
			var audios = $('audio');
			var audiosLen = $('audio').length;
			var videos = $('video');
			var videosLen = $('video').length;
			for (var j = 0; j < audiosLen; j++) {
				if (audios.get(j) != $this.get(0)) {
					audios.get(j).pause();
				}
			}
			for (var k = 0; k < videosLen; k++) {
				videos.get(k).pause();
			}
		},

		// 监听视频播放
		videoPlay : function(id) {
			$this = $('#' + id);
			var audios = $('audio');
			var audiosLen = $('audio').length;
			var videos = $('video');
			var videosLen = $('video').length;
			for (var j = 0; j < videosLen; j++) {
				if (videos.get(j) != $this.get(0)) {
					videos.get(j).pause();
				}
			}
			for (var k = 0; k < audiosLen; k++) {
				audios.get(k).pause();
			}
		},

		// 监听视频播放结束，是否要重复播放
		videoLoop : function(id, e) {
			var checked = e.target.checked;
			if (checked == undefined) {
				return;
			}

			var $video = $('#' + id);
			if (checked) {
				$video.attr("loop", true);
			} else {
				$video.removeAttr("loop");
			}
		},

		itemMouseDown : function(model, e) { // 块鼠标按下事件
			itemMouseDown(this, model, e);
		},
		coorMouseDown : function(model, e) { // 拖动区域鼠标按下事件
			coorMouseDown(this, model, e);
		},
		contentMouseDown : function(e) { // 拖动区域鼠标按下事件
			var that = this;
			imusicCommon.mouseDown(e, {
				left : $(".menu-box").width(),
				cball : function(direction, isBrushOpen) {
					if (direction == "up") {
						top.getBrush().close();
					} else if (direction == "down" && isBrushOpen) {
						top.getBrush().open();
					} else if (direction == "left") {
						// 下翻一页
						that.gotoNextPage();
					} else if (direction == "right") {
						// 上翻一页
						that.gotoPrevPage();
					}
				}
			});
		},
		openTopKnow : function() { // 打开顶级知识点页面，顶级知识点的PARENT_ID 即 COURSE_ID
			var that = this;
			var courseId = gloParams.COURSE_ID;
			that.isChooseKnow = false;
			this.isOnlyOneTopKnow = true;
			if (this.isMusicPerson) {
				var params = {
					COURSE_ID : courseId
				};
				var url = "../../pages/course/know_head_list.html?" + json2urlParams(params);
				$.popBigWindow("knowTopList", url, "名人堂", function(know) {
					that.isChooseKnow = true;
					that.isOnlyOneTopKnow = false;
					queryKnow(courseId, know.KRELATION_NO, function(db) {
						initDb(that, db, false);
					})
				}, $.extend(getPopWidHei(1920, 1080), {
					keyboard : true,
					hideCball : that.listDialogClose
				}));
			} else {
				var params = {
					PARENT_ID : courseId
				};
				loading();
				ajaxPost("HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=co.know!queryList", params, function(res) {
					if (res.result == 1 && res.data) {
						var knowList = JSON.parse(res.data).Rows;
						if ( knowList.length == 1) {
							that.queryTopListCball( knowList[0]);
						}else{
							that.isOnlyOneTopKnow = false;
							params.knowList = knowList;
							var url = "../../pages/course/know_top_list.html?" + json2urlParams(params);
							$.popBigWindow("knowTopList", url, "目录选择", function(know) {
								that.queryTopListCball( know);
							}, $.extend(getPopWidHei(1122, 600), {
								keyboard : true,
								hideCball : that.listDialogClose,
								params: {
									knowList : knowList
								}
							}));
						}
					} else {
						swAlert(res.msg);
					}
					hideLoading();
				});
			}
		},
		
		queryTopListCball : function( know) {
			var that = this;
			this.isChooseKnow = true;
			queryKnow( know.COURSE_ID, know.KRELATION_NO, function(db) {
				initDb(that, db, false);
			})
		},
		

		// 如果未选中章节，且原来知识点列表页为空，那么关闭页面
		listDialogClose : function() {
			if (!this.isChooseKnow && this.nodeList.length <= 0) {
				parent.closeTag();
			}
		},

		// 已登录，获取最近一次学习到的知识点，并且查出该知识点下的顶级知识，如果存在，那么直接查询该顶级知识下的所有知识点。
		// 否则弹出一级菜单供用户选择
		getLastKnow : function(personId) {
			if (this.isAlone) {
				return;
			}
			var that = this;
			var courseId = gloParams.COURSE_ID;
			var params = {
				COURSE_ID : courseId,
				PERSON_ID : personId,
				IS_TOP_KNOW : 1
			};
			ajaxPost("HttpChannel?action=APP_ACTION&BUSINESS_TYPE=co.know!getLastStudyKnow", params, function(res) {
				hideLoading();
				var topKrelationNo = "";
				if (res.result == 1 && res.data) {
					var know = JSON.parse(res.data);
					if (know.TOP_KRELATION_NO) {
						topKrelationNo = know.TOP_KRELATION_NO;
					}
					that.knowStudy.lastKnowId = know.KNOWLEDGE_ID;
				}
				queryKnow(courseId, topKrelationNo, function(db) {
					initDb(that, db, false);
				})
			})
		},

		getCourseParam : function() {
			if (this.isAlone) {
				return;
			}

			var that = this;
			var courseId = gloParams.COURSE_ID;
			var params = {
				"COURSE_ID" : courseId
			}
			ajaxPost("HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=co.course!getCourseParam", params, function(res) {
				if (res.result == 1 && res.data) {
					that.courseParam = JSON.parse(res.data);
				}
			})
		},

		buildVocalIframeUrl : function(model, cndex, index, isFull) {
			var user = getUser();
			var url = '../../component/sing/sing_abc_main.html?INDEX=' + cndex + '&PAGE=' + model.PAGE + '&KNOW_TEAC_ID=' + model.KNOW_TEAC_ID;
			url += '&IFRAME_ID=' + model.KNOW_TEAC_ID + '&NEW_STYLE=1';
			if (this.isKnowPreview) {
				url += '&IS_KNOW_PREVIEW=1';
			}
			if (this.isAlone) {
				url += '&IS_ALONE=1';
			}

			if (isFull) {
				// 子页面中不显示钢琴键盘，直接在外面页面调起，实际上还是在用子页面中的钢琴键盘
				url += "&FULL=1&IS_SET_IFRAME_HEIGHT=0&HIDE_BTN_PIANO=1";
			} else {
				url += "&IS_TOOL_PARENT=1&FULL=-1";
				if (model.ATTR_JSON && model.ATTR_JSON.ABC_MIXED_UNFOLD == '1') {
					url += "&IS_SET_IFRAME_HEIGHT=1";
				} else {
					url += "&IS_SET_IFRAME_HEIGHT=0";
				}
			}
			if (this.course.COURSE_TYPE == 'jxbz') {
				url += '&IS_JXBZ=1';
			}
			url += "&HIDE_BTN_PIANO=1";
			url += '&IS_DD=' + gloParams.IS_DD;
			url = imusicCommon.initUrl( url);
			return url;
		},

		buildQsUrl : function(model) {
			var user = getUser();
			var url = C.HOST + "imusic/pages/creation/creation_editor.html?QUESTION_ID=" + model.QUESTION_ID + "&IS_MINE=1&FROM=main_teaching&USER_TYPE=teac";
			url += "&OP_ACCOUNT=" + user.opno + "&ORGCODE=" + user.orgCode + "&IS_HIDE_BACK=1&TMP=1";
			url = imusicCommon.initUrl( url);
			return url;
		},

		buildRhythmUrl : function(model) {
			var user = getUser();
			var url = '../../pages/creation/rhythm.html?FROM=know_teac&USER_TYPE=teac&OP_ACCOUNT=' + (user.opAccount || 'imusic') + '&ORGCODE=' + getSchool().ORGCODE;
			url = imusicCommon.initUrl( url);
			return url;
		},

		openVideo : function(model) {
			$.popBigWindow("menuVideo", "../common/video_play.html?VIDEO_URL=" + model.CONTENT, "", null, $.extend({
				isIframe : 1,
				showCloseBtn : 1,
				isCloseBtn : 0,
				closeBtnStyle : 'color:#fff;opacity: 1;',
				hideCball : function() {
				}
			}, getPopWidHei(19200, 10800)));
		},
		handleMf : function(v, wid) {
			// console.log('handleMf:', v)
			var id = v.replace('p-audio', 'musicformIframe');
			this.popMusicForm(id, wid);

			// console.log('id:', id)
			this.musicFormParams[wid].isShowMusicForm = !this.musicFormParams[wid].isShowMusicForm;
			Vue.set(this.musicFormParams, wid, {
				isShowMusicForm : this.musicFormParams[wid].isShowMusicForm,
				isShowMusicFormBtn : true
			});
		},
		// 显示作品的操作按钮
		switchOpusEdit : function(id) {
			if (this.editOpusId != id) {
				this.editOpusId = id;
			} else {
				this.editOpusId = false;
			}
		},
		// 打开作品明细
		openOpusDetail : function(id, formType) {
			this.stopAllMedia();
			var iframeId = 'musicformIframe';
			var widHei = window.top.getPopWidHei(9999, 9999);
			if ('yp' == formType) {

				var url = '../musicform/music_form_show.html?IS_OPUS=1&MUSIC_FORM_ID=' + id + '&iframeId=' + iframeId;
				window.top.$.popBigWindow(iframeId, url, "曲式分析", function() {
				}, {
					width : widHei.width,
					height : widHei.height,
					isIframe : true,
					isAriaHidden : true,
					isCloseBtn : 0
				});
			} else {
				var url = '../musicform/exam_music_form_edit_qp.html?IS_INTERACT=1&IS_CORRENT=1&IS_TEAC=1&MUSIC_TYPE=opus&MUSIC_FORM_ID=' + id + '&iframeId=' + iframeId;
				window.top.$.popBigWindow(iframeId, url, "曲式分析", function() {
				}, {
					width : widHei.width,
					height : widHei.height,
					isIframe : true,
					isAriaHidden : true
				});
			}
		},
		openOpusJxbzDetail : function(po) {
			var widHei = window.top.getPopWidHei(9999, 9999);
			var url = '../opus/opus_jxbz.html?EXAMPAPER_ID=' + po.EXAMPAPER_ID + '&EXAM_EXAMINEE_ID=' + po.EXAM_EXAMINEE_ID + '&PERSON_ID=' + po.USER_ID;
			$.popBigWindow('opusJxbz', url, po.USERNAME ? (po.USERNAME + "的作品") : "即兴伴奏作品", function() {
			}, {
				width : widHei.width,
				height : widHei.height,
				isIframe : true,
				isAriaHidden : true
			});
		},
		// 新增曲式作品
		openOpusEdit : function(v, wid) {
			var that = this;
			this.stopAllMedia();
			var id = v.replace('p-audio', 'musicformIframe').replace('p-audio', 'musicformEditIframe');
			var widHei = window.top.getPopWidHei(9999, 9999);

			var params = {
				KNOWLEDGE_ID : that.selKnow.KNOWLEDGE_ID,
				COURSE_ID : that.params.COURSE_ID,
				ATTACH_ID : wid,
				PERSON_ID : this.user.personId,
				ORGCODE : this.user.orgCode,
				FORM_TYPE : 'yp',
				FILE_PATH : '',
				MUSIC_TYPE : 'opus'
			}

			var url = '../musicform/exam_music_form_edit.html?' + json2urlParams(params);
			window.top.$.popBigWindow(id, url, "曲式分析", function() {
				// 保存成功后刷新列表
				that.queryOpus();
			}, {
				width : widHei.width,
				height : widHei.height,
				isAriaHidden : true,
				isIframe : true,
				hideCball : function() {
					// console.log('hideCball:')
					that.queryOpus();
				},
				closeCball : function() {
					console.log('closeCball:')
					that.queryOpus();
				}
			}, function() {
				// 保存成功后刷新列表
				that.queryOpus();
			});
		},
		// 展示曲式作品
		handleOpusLib : function(v, wid) {
			if (this.menuShow) {
				this.isOpusLib = !this.isOpusLib;
			} else {
				this.menuShow = true;
				this.isOpusLib = true;

			}
		},
		// 查询曲式作品
		searchOpus : function(e) {
			var that = this;
			clearTimeout(that.searchTimer);
			that.searchTimer = setTimeout(function() {
				that.queryOpus(e.data)
			}, 250);

		},

		// 查询知识点下的作业列表
		queryOpus : function(title) {
			if (this.isAlone) {
				return;
			}
			var that = this;
			var url = "HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=mf.music.form!queryOpusMF";
			if (this.opusType == 'SJXBZ') {
				// url =
				// "HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=know.question!getOpusJxbz";
				url = "HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=pc.piano.comping!queryArr";
			}
			url = imusicCommon.initUrl( url);

			var opusReqFrm = {
				"COURSE_ID" : this.selKnow.COURSE_ID,
				"KNOWLEDGE_ID" : this.selKnow.KNOWLEDGE_ID,
				"PERSON_ID" : this.user.personId,
				"TITLE" : title ? title.replace(/\s/g, '') : ''
			}

			if (this.opusType == 'SJXBZ') {
				opusReqFrm['STATUS'] = 1;
				opusReqFrm['EXAM_TYPE'] = 'jxbz';
			}

			that.editOpusId = false;
			that.opusMsg = '正在加载...';
			ajaxPost(url, opusReqFrm, function(res) {
				// console.log('res.data:',res.data)
				if (res.result == 1 && res.data) {
					that.opusMsg = false;
					that.opusList = JSON.parse(res.data).Rows;
					for (var i = 0, len = that.opusList.length; i < len; i++) {
						that.opusList[i].CREATE_TIME = that.opusList[i].CREATE_TIME.split('.')[0];
					}
				} else {
					that.opusMsg = '暂无作品';
					that.opusList = [];
				}
			});
		},
		// 删除作品
		delOpus : function(id) {
			if (this.isAlone) {
				alert("课件独立版不支持此功能，请使用正式版本");
				return;
			}
			var that = this;

			top.swConfirm("确定要删除吗？", "", function(isConfirm) {
				if (!isConfirm) {
					return;
				}
				var url, params;
				if (that.opusType == 'SJXBZ') {
					url = 'HttpChannel?action=APP_ACTION&BUSINESS_TYPE=pc.piano.comping!delete';
					params = {
						PIANO_COMPING_ID : id
					}
				} else {
					url = 'HttpChannel?action=APP_ACTION&BUSINESS_TYPE=mf.music.form!delOpusMf';
					params = {
						MUSIC_FORM_ID : id
					}
				}
				ajaxPost(url, params, function(res) {
					if (res.result == 1) {
						that.queryOpus();
						return;
					}
				})
			})
		},
		// 修改作品
		editOpus : function(po) {
			if (this.opusType == 'SJXBZ') {
				this.editJxbzOpus(po);
				return;
			}
			if (this.opus)
				var that = this;
			var id = 'musicformIframe';
			this.stopAllMedia();

			var widHei = window.top.getPopWidHei(9999, 9999);
			var params = {
				KNOWLEDGE_ID : po.KNOWLEDGE_ID,
				MUSIC_FORM_ID : po.MUSIC_FORM_ID,
				COURSE_ID : po.COURSE_ID,
				ATTACH_ID : po.ATTACH_ID,
				PERSON_ID : po.PERSON_ID,
				ORGCODE : po.ORGCODE,
				FORM_TYPE : po.FORM_TYPE,
				MUSIC_TYPE : 'opus'
			}
			var url;
			if ('yp' == po.FORM_TYPE) {
				url = '../musicform/exam_music_form_edit.html?' + json2urlParams(params);
			} else {
				url = '../musicform/exam_music_form_edit_qp.html?' + json2urlParams(params);
			}
			window.top.$.popBigWindow(id, url, "曲式分析", function() {
				// 保存成功后刷新列表
				that.queryOpus();
			}, {
				width : widHei.width,
				height : widHei.height,
				isIframe : true,
			});
		},

		editJxbzOpus : function(po) {
			var knowTeacId = this.knowTeacId;
			if (knowTeacId) {
				if ($('#' + knowTeacId).get(0) && $('#' + knowTeacId).get(0).contentWindow && typeof ($('#' + knowTeacId).get(0).contentWindow.openJxbzOpus) == 'function') {
					$('#' + knowTeacId).get(0).contentWindow.openJxbzOpus(po);
				}
			}
		},

		// 打开、关闭 工具箱
		openCloseTool : function(po) {
			if (typeof top.openCloseTool == 'function') {
				top.openCloseTool();
			}
		},

		// 打开、关闭 二维码
		openQrcode : function(po) {
			var $img = $("#wsQrCodeImg");
			if ($img.attr("src")) {
				$(".qrcode-box").toggleClass("hide");
			} else if (top.wsControl) {
				loading("二维码生成中...");
				if(top.wsControl.options){
					top.wsControl.options.params.SUBJECT_TYPE = getSubject();
				}
				top.wsControl.init({
					openCball : function(key) {
						setTimeout(function() {
							hideLoading();
							$img.attr("src", C.HOST + "tmpfiles/" + key + ".png");
							$(".qrcode-box").removeClass("hide");
						}, 2000);
					}
				});
			}
		},

		// 多曲谱切换
		singIframeChange : function() {
			var item = this.moreIframe.arr[this.moreIframe.currIdx];

			var iframes = $("#" + item.iframeId);
			if (iframes.length > 0) {
				synSingTool(iframes[0].contentWindow.window.$(".sing-tool-box").html(), item.iframeId);
			}
		},

		// 多曲谱全屏
		singFullscreen : function(m, index, isFullScreen) {
			var oldIdx = this.moreIframe.currIdx;
			var item = this.moreIframe.arr[index];
			var iframeId = item.iframeId;

			this.moreIframe.currIdx = index;
			if (isFullScreen) {
				this.moreIframe.fullIframeId = iframeId;

				if (oldIdx != index) {
					var iframes = $("#" + iframeId);
					var toolHtml = iframes.contents().find(".sing-tool-box").html();
					synSingTool(toolHtml, iframeId, item.isPiano);
				}
			} else {
				this.moreIframe.fullIframeId = '';
			}
		},
		build3dUrl : function(obj) {
			var objUrl = '', mtlUrl = '';
			if (obj.CONTENT) {
				var arr = obj.CONTENT.ARR;
				for (var i = 0, len = arr.length; i < len; i++) {
					if (arr[i].indexOf('.obj') > -1) {
						objUrl = arr[i];
					} else if (arr[i].indexOf('.mtl') > -1) {
						mtlUrl = arr[i];
					}
				}
			}
			var url = '../../component/three/pages/music.html?objUrl=' + objUrl + '&mtlUrl=' + mtlUrl + '&scale=' + obj.CONTENT.SCALE;
			url = imusicCommon.initUrl( url);
			return url;
		},

		openPianoKeyboard : function(e) {
			var flag = true;
			if (this.isCurrPageHasAbc) {
				// 全屏的时候调用子页面中的钢琴键盘
				var $iframe = $(".item-list > .active iframe");
				if ($iframe.length > 0) {
					var $btn = $iframe.contents().find("#isPianoKey");
					if ($btn.length > 0) {
						flag = false;
						stopPropagation(e);
						$btn.click();
					}
				}
			}

			if (flag) {
				this.pianoKeyboard.showOrHide();
			}
		},
		
		/** *******************美术功能************************************** */
		
		// 打开作品
		openOpus: function(){
			top.content.menuClick('opus', null, '&COURSE_ID=' + this.selKnow.COURSE_ID + '&KNOWLEDGE_ID=' + this.selKnow.PARENT_ID + '&tmp=' + new Date().getTime());
		},
		// 扫码上传
		scanQrcode2login: function(){
			var that = this;
			var $img = $("#qrcodeOpus");
			if ($img.attr("src")) {
				$(".qrcode-opus-box").toggleClass("hide");
			} else if (top.wsUploadControl) {
				loading("二维码生成中...");
				top.wsUploadControl.init({
					openCball : function(key, ws) {
						setTimeout(()=> {
							hideLoading();
							$img.attr("src", C.HOST + "tmpfiles/" + key + ".png");
							$(".qrcode-opus-box").removeClass("hide");
							
							ws.wsSend2Server({
								'KEY': key,
								'OP_TYPE': 'teaching2phone',
								'COURSE_ID': that.selKnow.COURSE_ID,
								'KNOWLEDGE_ID': that.selKnow.PARENT_ID,
							})
						}, 2000);
					}
				});
			}
		},
		
		scanQrcode: function(){
			var that = this;
			var user = getUser();
			if (user && user.personId) {
				that.scanQrcode2login();
			} else {
				window.top.openLogin(null, '', function(res) {
					that.scanQrcode2login();
				});
			}
		},
		
		// 手机上传作品的选择界面
		openOpusSelect: function( id, data,cb ){
			var that =this;
			var params = {IFRAME_ID : 'teach2opusSelect' };
			$.popBigWindow("teach2opusSelect", "../opus/opus_upload_select.html?" + json2urlParams(params), "", function(){
				Vue.nextTick(function() {
					$("body").css({
						"overflow" : 'hidden'
					})
				})
				return typeof cb == 'function' && cb(data);
		
			},$.extend(top.getTopWidthHeight(), {isIframe: true, isCloseBtn : 0}));
		},
		/** *******************美术功能************************************** */
		
	},
	created : function() {
		var that = this;
		// 背景图片
		this.bg = new Bg(C.HOST, ".right-content-container");
		// 知识点链接
		this.link = new Link();
		// 知识点链接
		this.search = new Search(C.HOST);
		// 素材库
		this.material = new Material();
		// 动画插件
		this.animation = new AnimationPlug();
		// 内容链接
		this.contLink = new ContLink();

		knowTeac.that = this;

		this.isTeac = isTeac() || gloParams.USER_TYPE == 'teac';
		this.isKnowPreview = !!gloParams.KNOWLEDGE_ID;
		this.isDd = gloParams.IS_DD == '1';
		if (this.isAlone) {

		} else {
			this.getCourseParam();

			var personId = getPersonId();
			// 根据课程ID进行查询
			if (gloParams.QUERY_BY_COURSE && gloParams.QUERY_BY_COURSE == '1') {
				this.isByJson = false;
				if (this.isKnowPreview) {
					queryKnow(gloParams.COURSE_ID, gloParams.KNOWLEDGE_ID, function(db) {
						initDb(that, db, false);
					})
				} else {
					this.openTopKnow();
				}
			} else {
				queryByJson(function(db) {
					initDb(that, db, false);
				})
			}
		}

		Vue.nextTick(function() {
			that.treeUtil = new TreeUtil(that.$refs.tree, {});

			if (that.isAlone) {
				// 单机版，延迟一下，否则tree还没有加载完全
				queryByAlone(that, function(db) {
					setTimeout(function() {
						initDb(that, db, false);
					}, 300)
				})
			}

			// 拖动事件
			initWindowDrag(true);
			initWindowDrag(false);

			// 禁用右键
			banRightClick();

			// 钢琴键盘初始化
			that.pianoKeyboard = new PianoKeyboard({
				isClick2play : true
			});

			initMidi(that);

			// 初始化，鼠标移到指定位置的提示
			$('[data-toggle="tooltip"]').tooltip();

			// 工具栏
			singAbcTool.setSingToolStyle(that);

			// 变化太小，就不需要resize了
			imusicCommon.initWinResize(function(xMove, yMove) {
				if (!that.notResize && (xMove > 15 || yMove > 60)) {
					Vue.nextTick(function() {
						that.resetData();
					})
					singAbcTool.setSingToolStyle(that);
				}
			});

			// 翻页笔
			$(window).keyup(function(e) {
				if (e.keyCode == "38" || e.keyCode == "33") {
					// 上一页
					that.gotoPrevPage();
				} else if (e.keyCode == "40" || e.keyCode == "34") {
					// 下一页
					that.gotoNextPage();
				}
			}).click(function() {
				that.leftPageListShow = false;
				that.rightPageListShow = false;
			});
		})
	}
})

// 二维码对象
var qrcodeObj = {
	url : '',
	isShow : false,

	getQrCode : function(cb) {
		if (this.isAlone) {
			alert("课件独立版不支持此功能，请使用正式版本");
			return;
		}
		var that = this;
		var interact = getCookie('interact');
		if (interact) {
			interact = JSON.parse(interact);
		}
		var url = 'HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=imusic.main!getQrCodeByExeTeac';
		var params = {
			CLASS_ID : interact.CLASS_ID,
			TRAIN_ID : interact.TRAIN_ID
		}
		ajaxPost(url, params, function(res) {
			if (res.result == 1) {
				that.hasCode = true;
				$("#qrCodeImg").attr("src", res.data);
				that.codeUrl = res.data;
			} else {
				that.hasCode = false;
			}
		})
	},
	showCode : function(imgUrl) {
		// $("#qrCodeImg").attr("src", imgUrl);
		$("#qrCodeModal").modal('toggle');
	}
}

/**
 * midi连接，学生端或者教师端电钢，向授课端发送按键信息
 * 
 * @param that
 * @returns
 */
function initMidi(that) {
	// midi设备连接
	that.midi = new Midi({
		isPiano2name : false,
		noteOn : function(noteNumber, timeStamp, volume, inputValue) {
			that.pianoKeyboard.keyUpDown(noteNumber, 'down');
		},
		noteOff : function(noteNumber, timeStamp, inputValue) {
			that.pianoKeyboard.keyUpDown(noteNumber, 'up');
		}
	});
}

// 供首页调用
function getMenuShow() {
	return content.menuShow;
}

// 供首页调用
function setMenuShow() {
	content.menuShow = !content.menuShow;
}

// 供子页面调用
function getPianoKeyboard() {
	return content.pianoKeyboard;
}

// 向左滑，翻下一页
function toLeftCallBack() {
	content.gotoNextPage();
}

// 向右滑，翻上一页
function toRightCallBack() {
	content.gotoPrevPage();
}

// 初始化数据 isSelEnd: 是否选中最后一个知识点
function initDb(that, db, isSelEnd) {
	top.hideLoading();
	that.treeOptions.isFold = true;

	var selNodes = that.$refs.tree.findAll({});
	if (selNodes) {
		selNodes.remove();
	}
	for (var i = 0; i < db.length; i++) {
		that.$refs.tree.append(db[i]);
	}
	// 展开所有
	selNodes = that.$refs.tree.findAll({});

	that.nodeList = [];
	var node, firstNode;
	if (selNodes) {
		for (var i = 0; i < selNodes.length; i++) {
			node = selNodes[i];
			if (node.data.KNOW_TYPE > C.KNOW_TYPE_LESSON) {
				node.nodeIdx = that.nodeList.length;
				that.nodeList.push(node);

				if (!firstNode) {
					firstNode = node;
				}

				if (node.data.KNOWLEDGE_ID == that.knowStudy.lastKnowId) {
					firstNode = node;
				}
			}
		}
	}

	var nodeLen = that.nodeList.length;
	if (nodeLen < 1) {
		alert("该课程下暂无可见知识点");
		return;
	} else if (nodeLen == 1) {
		that.menuShow = false;
	}
	// that.setTopShowKnowTree();

	if (isSelEnd) {
		that.nodeClick(that.nodeList[nodeLen - 1], nodeLen - 1);
	} else {
		that.nodeClick(firstNode, 0);
	}

	if (!that.isTreeKnowShow) {
		that.isTreeKnowShow = true;

		var menuCls = that.nodeList.length > 1 ? '.tree-know' : '.menu-top-know';
		$(menuCls).tooltip("show");
		setTimeout(function() {
			$(menuCls).tooltip("hide");
		}, 3600);
	} else {
		$('[data-toggle="tooltip"]').tooltip("hide");
	}

	// 初始化树的层级
	that.treeUtil.initLevel();
	// 自动展开
	// that.treeUtil.expandAuto(0, true);
	that.treeUtil.expandAll();
	// 线
	that.treeUtil.treeLine();

	that.params.COURSE_ID = firstNode.data.COURSE_ID;

	// 显示作品库
	that.queryOpus();

	if (!that.isAlone) {
		getPo("CO_COURSE", "COURSE_ID", that.params.COURSE_ID, function(course) {
			if (course != null) {
				if (!that.isKnowPreview && typeof top.singleGroupid2img == 'function') {
					window.top.singleGroupid2img(course, "COVER_PIC_PATH", C.COURSE_COVER_URL);
				} else {
					course.COVER_PIC_PATH = C.COURSE_COVER_URL;
					$(".course-box").addClass("hide");
				}
				that.course = course;
				that.isShow.btnInteract = imusicCommon.isShowInteract() && that.isTeac;
				//  && course.IS_RESOURCE != "1" 
			}
		});
	}
}

/**
 * 查询json中的授课内容
 * 
 * @param cb
 *            回调函数
 * @returns
 */
function queryByJson(cb) {
	var url = C.HOST + "HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=co.know.teac!readDbJson&TMP=" + new Date().getTime();
	jQuery.ajax({
		url : url, // 提交的页面
		data : {
			"URL" : gloParams.COURSE_ID || gloParams.url
		},
		type : "POST", // 设置请求类型为"POST"，默认为"GET"
		dataType : "json",
		error : function(request) { // 设置表单提交出错
			alert("解压失败，请联系管理员");
		},
		success : function(res) {
			if (res.result == 0) {
				alert("解压失败，请联系管理员");
				return;
			}
			return typeof cb == 'function' && cb(JSON.parse(res.data));
		}
	});
}

/**
 * 查询json中的授课内容
 * 
 * @param cb
 *            回调函数
 * @returns
 */
function queryByAlone(that, cb) {
	// 直接打开页面，还是通过tomcat单独打开此页面
	jQuery.ajax({
		url : "/attach/course/know.json", // 提交的页面
		data : {},
		type : "POST", // 设置请求类型为"POST"，默认为"GET"
		dataType : "text",
		error : function(request) { // 设置表单提交出错
			alert("找不到课件，请检查是否将课件解压至目录\ixzds\imusicTomcat\webapps\attach，解压后重启软件");
		},
		success : function(data) {
			// 变更地址
			data = data.replaceAll("/attach/unzip/res/file", "/attach/course/file");

			// 背景图

			data = JSON.parse(data);
			var course = data.course;
			var knowIds = data.knowIds;
			var knowArr = data.knowArr.Rows;
			var knowTeacArr = data.knowTeacArr.Rows;

			that.course = data.course;

			// 1、构建知识点的树形结构
			// knowId ~ po
			var knowId2po = {};
			var knowTree = new Array();

			var know, knowId, knowTitle;
			for (var i = 0, len = knowArr.length; i < len; i++) {
				know = knowArr[i];
				knowId = know.KNOWLEDGE_ID;
				knowTitle = know.KNOWLEDGE_TITLE;
				if (knowIds.indexOf(knowId) == -1) {
					continue;
				}

				knowId2po[knowId] = {
					id : knowId,
					nid : knowId,
					pid : "pid",
					text : knowTitle,
					state : {
						expanded : true
					},
					data : {
						CONT_ARR : [],
						COURSE_ID : course.COURSE_ID,
						COURSE_NAME : course.COURSE_NAME,
						KNOWLEDGE_ID : knowId,
						KNOWLEDGE_NO : know.KNOWLEDGE_NO,
						KNOWLEDGE_TITLE : knowTitle,
						KNOW_TYPE : know.KNOW_TYPE,
						KRELATION_NO : know.KRELATION_NO,
						ORGCODE : know.ORGCODE,
						PARENT_ID : know.PARENT_ID,
					}
				};

				knowTree.push(knowId2po[knowId]);
			}

			// 2、构建知识点下的课程内容
			// knowId + page ~ 内容列表
			var page2arr = {};
			// knowId + page ~ 内容个数
			var page2num = {};
			var knowTeac, key;
			for (var i = 0, len = knowTeacArr.length; i < len; i++) {
				knowTeac = knowTeacArr[i];
				knowId = knowTeac.KNOWLEDGE_ID;
				key = knowId + "_" + knowTeac.PAGE;

				if (page2num[key]) {
					page2num[key].childNum += 1;
				} else {
					page2num[key] = {
						childNum : 1,
						knowId : knowId,
						page : knowTeac.PAGE
					};

					page2arr[key] = [];
				}

				page2arr[key].push(knowTeac);
			}

			var pageObj;
			for ( var key in page2num) {
				pageObj = page2num[key];
				knowId = pageObj.knowId;

				var know = knowId2po[knowId];
				if (!know) {
					continue;
				}

				know.data.CONT_ARR.push({
					PAGE : pageObj.page,
					DATA : page2arr[key]
				});
			}

			return typeof cb == 'function' && cb(knowTree);
		}
	});
}

/**
 * 查询课程下的知识点目录树
 * 
 * @param cb
 *            回调函数
 * @returns
 */
function queryKnow(courseId, krelationNo, cb) {
	// 只访问单独一个知识点的时候
	var knowId = gloParams.KNOWLEDGE_ID;
	var params = {
		"COURSE_ID" : courseId,
		"KRELATION_NO" : krelationNo ? krelationNo : "",
		"IS_EXCEPT_TOP" : 1
	};
	if (knowId) {
		params['KNOWLEDGE_ID'] = knowId;
		params['KRELATION_NO'] = '';
	}
	var url = "HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=co.know!query2tree&TMP=" + new Date().getTime();
	ajaxPost(url, params, function(res) {
		hideLoading();
		if (res.result == 0) {
			alert("解压失败，请联系管理员");
			return;
		}
		return typeof cb == 'function' && cb(JSON.parse(res.data));
	})
}

// 子页面获取父页面参数
function getParentParam(index, page, isExam) {
	var that = content;
	var po = that.CONT_ARR && that.CONT_ARR.find(function(item) {
		return (item.PAGE == (page || that.currPage));
	})

	var result = copyJson(po.DATA[index], {});
	result.HOST = C.HOST;
	result.IS_TEAC = that.isTeac;

	// iframe的话，背景图放到里面
	var bgItem = that.bgItemJson[that.currPage];
	if (bgItem) {
		result.BG_IMG_URL = bgItem.CONTENT;
		if(bgItem.CONTENT){
			if(/\?/g.test(bgItem.CONTENT)){
				bgItem.CONTENT += '&v=' + new Date().getTime(); 
			}else{
				bgItem.CONTENT += '?v=' + new Date().getTime(); 
			}
		}
	}

	if (isJsonString(result.VOCAL_JSON)) {
		result.VOCAL_JSON = JSON.parse(result.VOCAL_JSON);
	}

	if (that.selKnow.COURSE_ID) {
		result.VOCAL_JSON.COURSE_ID = that.selKnow.COURSE_ID;
	}

	// 只有作业类的才需要从课程中获取这些参数
	if (that.courseParam && isExam) {

		if (that.courseParam.NOTATION_TYPE_DEF) {
			result.VOCAL_JSON.NOTATION_TYPE_DEF = that.courseParam.NOTATION_TYPE_DEF;
		}
		if (that.courseParam.NOTATION_TYPE) {
			result.VOCAL_JSON.NOTATION_TYPE = that.courseParam.NOTATION_TYPE;
		}

	}
	return result;
}

// 隐藏声乐模块的工具栏
function hideToolBox() {
	var $iframes = $('.vocal-iframe');
	for (var i = 0, len = $iframes.length; i < len; i++) {
		var win = $iframes[i].contentWindow;
		if (typeof (win.hideToolBox) != "undefined") {
			win.hideToolBox();
		}
	}
}

/**
 * 钢琴子页面调用，全屏
 * 
 * @param index
 * @param page
 * @param isFull
 * @returns
 */
function fullScreen(index, page, isFull) {
	var $iframe = $('#pianoIframe' + index + '_' + (page - 1));
	if ($iframe.length == 0) {
		console.log("fullScreen 找不到对应的iframe");
		return;
	}
	$iframe.toggleClass("full-screen");

	$iframe = window.top.$("#teaching");
	if ($iframe.length > 0) {
		$iframe.toggleClass("full-screen");
	}
}

// 获取拖动事件，触屏和鼠标是不一样的
function getEvt(e) {
	if (e.changedTouches && e.changedTouches.length > 0) {
		return (e.changedTouches)[0];
	}
	return e;
}

/**
 * 块鼠标按下事件
 * 
 * @param that
 * @param model
 * @param e
 * @returns
 */
function itemMouseDown(that, model, e) {
	e = getEvt(e);
	var top = parseFloat(model.POS.top);
	var left = parseFloat(model.POS.left);
	this.posix = {
		'x' : left - e.pageX,
		'y' : top - e.pageY
	};
	content.dragZIdx++;
	$.extend(document, {
		'move' : true,
		'move_target' : this,
		'call_down' : function(e, posix) {
			e = getEvt(e);

			// 块拖动
			model.POS.top = e.pageY + posix.y;
			model.POS.left = e.pageX + posix.x;
			model.STYLE.top = model.POS.top + "px";
			model.STYLE.left = model.POS.left + "px";
			model.STYLE.zIndex = content.dragZIdx;
			Vue.set(model, "IS_MOVE", 1);
		}
	});
}

/**
 * 块中的放大缩小模块鼠标按下事件
 * 
 * @param that
 * @param model
 * @param e
 * @returns
 */
function coorMouseDown(that, model, e) {
	e = getEvt(e);
	var top = parseFloat(model.POS.top);
	var left = parseFloat(model.POS.left);
	var width = parseFloat(model.POS.width);
	var height = parseFloat(model.POS.height);
	var posix = {
		'w' : width,
		'h' : height,
		'x' : e.pageX,
		'y' : e.pageY
	};

	$.extend(document, {
		'move' : true,
		'call_down' : function(e) {
			e = getEvt(e);
			var width = Math.max(30, e.pageX - posix.x + posix.w);
			var height = Math.max(30, e.pageY - posix.y + posix.h);

			if ('img,slide,video'.indexOf(model.CTYPE) != -1) {
				// 初始高度
				if (!model.ORI_WIDTH) {
					model.ORI_WIDTH = width;
					model.ORI_HEIGHT = height;
				}

				// 按照比例进行缩放
				var orgWith = model.ORI_WIDTH;
				var orgHeight = model.ORI_HEIGHT;
				if (orgWith && orgWith != "undefined") {
					height = orgHeight * width / orgWith;
				}
			}

			model.POS.width = width;
			model.POS.height = height;
			model.STYLE.width = width + "px";
			model.STYLE.height = height + "px";
			Vue.set(model, "IS_MOVE", 1);
		}
	})
}

function isIframeShow(page) {
	var that = content;
	return that.currPage == page;
}

/**
 * 供子页面调用
 * 
 * @param knowTeacId
 * @returns
 */
function getKnowTeacById(knowTeacId) {
	var that = content;

	var result;
	for (var i = 0; i < that.CONT_ARR.length; i++) {
		var rows = that.CONT_ARR[i].DATA;
		for (var j = 0; j < rows.length; j++) {
			if (rows[j].KNOW_TEAC_ID == knowTeacId) {
				result = rows[j];
			}
		}
	}
	if (result) {
		return result.HEIGHT * $(".right-content").width();
	}
	return null;
}

// 备课预览
function isLogin(cball) {
	var user = getUser();
	cball({
		"TRAIN_ID" : 'knowTeacPreview',
		"TERM_CODE" : 'knowTeacPreview'
	});
}

// 设置每一个音频的wave
function setWavesurfer(id, wavesurfer) {
	Vue.set(content.wavesurferMap, id, wavesurfer);
}

/**
 * 将exe返回的信息，发布到各个子页面中
 * 
 * @param msg
 * @returns
 */
function onExeSocketMsg(data) {
	
	// EXE 返回的消息
	console.log('--hb--onExeSocketMsg---11-:', data)
	if('phone2teaching' == data.OP_TYPE && 'opus' == data.IFRAME_NAME && !parent.$('#teaching').is(":hidden")){
		// 弹出 手机上传作品的预览界面
		var iframes = $("#teach2opusSelectIframe")  ;
		if(!iframes[0]){
			iframes = parent.$("#teach2opusSelectIframe")
		}
		if(iframes[0]){
			if (iframes[0] && iframes[0].contentWindow && typeof (iframes[0].contentWindow.onExeSocketMsg) != "undefined") {
				iframes[0].contentWindow.onExeSocketMsg(data);
			}
		}else{
			
			var iframes = $("#teach2opusSelectIframe");
			if(!iframes[0]){
				iframes = parent.$("#teach2opusSelectIframe")
			}
			content.openOpusSelect(null, data, function( data){
				return data;
			});
		}
		return;
	}
	
	var ctype = data.CTYPE;
	var msg = data.MSG;
	Vue.nextTick(function() {
		switch (ctype) {
			case 'page':
				if (msg == 'prev') {
					// 上一页
					content.gotoPrevPage();
				} else {
					content.gotoNextPage();
				}
				break;
			case "bottomTagsWidthChange":
				var $tool = $(".sing-tool-box");
				var menuW = $(".menu-box").hasClass("menu-hide") ? 0 : $(".menu-box").width();

				// 传到子页面
				data.MSG = msg - menuW > 0 ? msg - menuW : 0;
				data.paddingRight = $(".bottom-box").outerWidth();

				$tool.css({
					"padding-left" : (data.MSG - 10 > 0 ? data.MSG - 10 : 0) + "px"
				});
				break;
			default:
				break;
		}

		$("iframe").each(function() {
			if (typeof (this.contentWindow.onExeSocketMsg) != "undefined") {
				this.contentWindow.onExeSocketMsg(data);
			}
		})
	})
}

/**
 * 查询作品
 */
function queryOpus2parent() {
	content.queryOpus();
}
function openOpusEdit2parent(v, wid) {
	content.openOpusEdit(v, wid);
}
/**
 * 显、隐作品
 */
function isOpusLib2parent(opusType, knowTeacId) {
	content.isOpusLib = !content.isOpusLib;
	content.knowTeacId = knowTeacId;
	if (opusType) {
		content.opusType = opusType;
	}
	if (content.isOpusLib) {
		content.menuShow = true;
	}
}

/**
 * 由子页面调用，视唱开启的时候隐藏按钮栏
 * 
 * @param val
 * @returns
 */
function toggleSingTools(isOpenSc) {
	if (isOpenSc) {
		$('.sing-tool-box').addClass("hide");
	} else {
		$('.sing-tool-box').removeClass("hide");
	}
}

/**
 * 由子页面调用，点击空白处隐藏页码列表
 * 
 * @returns
 */
function hidePageList() {
	content.leftPageListShow = false;
	content.rightPageListShow = false;
}

/**
 * 由子页面调用，保存即兴伴奏个人作品
 * 
 * @param abcContent
 * @param cb
 * @returns
 */
function saveJxbz(abcContent, cb) {
	loading();
	var that = content;
	var url = 'HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=pc.piano.comping!save';
	var params = {
		TITLE : that.selKnow.KNOWLEDGE_TITLE,
		COURSE_ID : that.selKnow.COURSE_ID,
		KNOWLEDGE_ID : that.selKnow.KNOWLEDGE_ID,
		PERSON_ID : getUser().personId || '',
		ABC_CONTENT : abcContent
	}
	ajaxPost(url, params, function(res) {
		hideLoading();
		that.queryOpus();
		typeof cb == 'function' && cb();
	})
}