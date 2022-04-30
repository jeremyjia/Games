/**
 * 配置课程内容的链接，比如点击
 * 
 * @param win
 * @param doc
 * @param undefined
 * @returns
 */
;
(function(win, doc, undefined) {
	"use strict";
	// platUrl: 平台地址，如 http://localhost:8080/imusic/
	// modelSelCball，模板选中回调函数
	var ContLink = function(options) {
		this.options = $.extend({
			vm : null,
			onSelect : null
		}, options);

		// 是否显示
		this.isShow = false;

		// 是否显示链接窗口
		this.isDialogShow = false;

		this.knowSelFrm = {
			COURSE_ID : ''
		};
		this.courseList = [];
		this.treeData = [];
		this.treeOptions = {
			checkbox : false, // 有复选框
			checkOnSelect : true, // 点击文字时，复选框选中
			autoCheckChildren : false
		// 选中父节点时不关联选中子节点
		};
		this.courseName = '';
		this.tmpCourseList = [];

		
		this.treeData2 = [];
		this.treeOptions2 = {
			checkbox : false // 有复选框  
		};
		
		this.bgList = this.initBgList();
		
		this.selItem = null;
		this.selNode = null;
		this.list = null;
		this.id2node = {};

		// 是否显示
		this.isShowAttr = false;
		
		this.tempArr = [1];
		
//		this.queryCourseList();
	}

	// 给构造函数bg对象原型里添加属性（方法）
	ContLink.prototype = {
		
		// 初始化列表
		initBgList : function(isShow) {
			// appCode, 来源于constants.js
			var angleUrl = '/' + appCode + '/imusic/images/teacing/knowteac/';
			var bgList = [{
				type: 'common',
				angle: 0,
				txtLeft: 69,
				txtTop: 15,
				width: 204,
				height: 75,
				url : angleUrl + 'angle_0.png',
			},{
				type: 'common',
				angle: 30, 
				txtLeft: 69,
				txtTop: 15,
				width: 199,
				height: 75,
				url : angleUrl + 'angle_1.png',
			},{
				type: 'common',
				angle: 60,
				txtLeft: 35,
				txtTop: 30,
				width: 170,
				height: 90,
				url : angleUrl + 'angle_2.png',
			},{
				type: 'common',
				angle: 90,
				txtLeft: 35,
				txtTop: 45,
				width: 173,
				height: 99,
				url : angleUrl + 'angle_3.png',
			},{
				type: 'common',
				angle: 120,
				txtLeft: 35,
				txtTop: 30,
				width: 170,
				height: 90,
				url : angleUrl + 'angle_4.png',
			},{
				type: 'common',
				angle: 150,
				txtLeft: 35,
				txtTop: 15,
				width: 199,
				height: 75,
				url : angleUrl + 'angle_5.png',
			},{
				type: 'common',
				angle: 180,
				txtLeft: 35,
				txtTop: 15,
				width: 204,
				height: 75,
				url : angleUrl + 'angle_6.png',
			},{
				type: 'common',
				angle: 225,
				txtLeft: 35,
				txtTop: 15,
				width: 170,
				height: 90,
				url : angleUrl + 'angle_7.png',
			},{
				type: 'common',
				angle: 270,
				txtLeft: 35,
				txtTop: 15,
				width: 173,
				height: 99,
				url : angleUrl + 'angle_8.png',
			},{
				type: 'common',
				angle: 315,
				txtLeft: 35,
				txtTop: 15,
				width: 170,
				height: 90,
				url : angleUrl + 'angle_9.png',
			},{
				type: 'common',
				angle: 0,
				isChild: true,
				txtLeft: 25,
				txtTop: 10,
				width: 150,
				height: 70,
				url : angleUrl + 'angle_child.png',
			},{
				type: 'list',
				angle: 0, 
				width: 300,
				height: 360,
				url : angleUrl + 'rectangle.png',
			}];
			return bgList;
		},

		// 初始化
		showOrHide : function(isShow) {
			this.isShow = isShow != undefined ? isShow : !this.isShow;
			if (this.isShow && this.courseList.length == 0) {
				this.queryCourseList();
			}
		},

		// 查询可见课程列表
		queryCourseList : function() {
			var that = this;
			var params = {
				"PLATFORM_CODE" : getSchool().PLATFORM_CODE,
				'SEL_SCHOOL_COURSE' : 1,
				rows : 999,
				page : 1
			}
			loading();
			ajaxPost("HttpChannel?action=APP_ACTION&BUSINESS_TYPE=co.course!queryWithPage", params, function(res) {
				hideLoading();
				if (res.result == 1 && res.data) {
					that.courseList = JSON.parse(res.data).Rows;
				} else {
					autoAlert("课程目录为空");
				}
			});
		},
		
		getVm : function() {
			return this.options.vm;
		},

		getTree : function() {
			return this.getVm().$refs.contLinkTree;
		},

		// 查询可见课程列表
		queryKnowTree : function() {
			var that = this;
			if (this.knowSelFrm.COURSE_ID == '') {
				return;
			}
			var tree = this.getTree();
			var selNodes = tree.findAll({});
			if (selNodes) {
				selNodes.remove(true);
			}

			loading();
			ajaxPost("HttpChannel?action=APP_ACTION&BUSINESS_TYPE=co.know!query2tree", this.knowSelFrm, function(res) {
				if (res.result == 1) {
					var jsonArr = JSON.parse(res.data);
					var json;
					for (var i = 0; i < jsonArr.length; i++) {
						tree.append(jsonArr[i]);
					}
				}
				hideLoading();
			});
		},

		onNodeSelected : function(node) {
			console.log("onNodeSelected", node);
		},

		onNodeUnSelected : function(node) {
			console.log("onNodeUnSelected", node);
		},

		del : function(model) {
			model.LINK_JSON = null;
		},

		// 获取当前课程
		getCurrCourse : function() {
			var course = null;
			for (var i = 0; i < this.courseList.length; i++) {
				if (this.courseList[i].COURSE_ID == this.knowSelFrm.COURSE_ID) {
					course = this.courseList[i];
				}
			}
			return course;
		},

		courseNameChange : function() {
			this.tmpCourseList = [];
			for (var i = 0; i < this.courseList.length; i++) {
				var course = this.courseList[i];
				if (course.COURSE_NAME.indexOf(this.courseName) != -1 || course.COURSE_CODE.indexOf(this.courseName) != -1) {
					this.tmpCourseList.push(course);
				}
			}
			if (this.tmpCourseList.length == 1) {
				this.knowSelFrm.COURSE_ID = this.tmpCourseList[0].COURSE_ID;
				this.queryKnowTree();
			}
		},
		
		//点击确认
		sure : function() { 
			var nodes = this.getTree().findAll({ state: { selected: true } });
			if( nodes && nodes.length > 0 && this.selLink){
				var know = nodes[0].data;
				if (know.KNOW_TYPE == C.KNOW_TYPE_CHAPTER || know.KNOW_TYPE == C.KNOW_TYPE_LESSON) {
					autoAlert("请选择知识点");
					return;
				}
				
				var course = this.getCurrCourse();
				var selLink = this.selLink ;
				selLink.TYPE = 'know';
				selLink.KNOWLEDGE_ID = know.KNOWLEDGE_ID;
				selLink.KNOWLEDGE_TITLE = know.KNOWLEDGE_TITLE;
				selLink.COURSE_ID = course.COURSE_ID;
				selLink.COURSE_NAME = course.COURSE_NAME;
				 
				
				this.showOrHide( false);
			}
		},

		contLinkClick : function(e, model) {
			console.log(" contLinkClick");
			if (!model.contLinkId) {
				return;
			}
			if (model.link) {
				this.openLink(model, e);
				return;
			}
			
			var $parent = $("[data-contlink-pid=" + model.contLinkId + "]");
			if ($parent.length > 0) {
				// Vue.set(tmp.STYLE, "display", tmp.STYLE.display == "none" ? "block" : "none");
				
				var display = $parent.css("display");
				if (display == "none") {
//					if(model.contLinkId == model.KNOW_TEAC_ID ){
//						// 如果是一级目录，那么要把其他的都隐藏掉
//						$("[data-contlink-child='1']").css({
//							display : "none"
//						});
//					}
					$("[data-contlink-child='1']").not("[data-contlink-pid$=" + model.contLinkPid + "]").css({
						display : "none"
					});
					
					this.shake(e.currentTarget, 0, 0, function(){
						/*$parent.animate({
							"display" : "block"
						}, 600);*/
						$parent.fadeIn();
					});
				} else {
					$("[data-contlink-id$=-" + model.contLinkId + "]").css({
						display : "none"
					});
				}
			}
		},
		
		// 震动
		shake : function(domObj, count, end, cball) {
			count++;
			if (end > 2) {
				if (typeof cball == "function") {
					cball();
				}
				return;
			}
			var that = this;
			var duration = 3;
			var style = domObj.style;
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
				that.shake(domObj, count, end, cball);
			}, 50)
		},
		
		// 预览
		openLink : function(model, e) {
			var link = model.link;
			if ( link) {
				switch (link.TYPE) {
					case 'know':
						if (typeof window.top.addIframeByLink == 'function') {
							window.top.addIframeByLink( link);
							e.stopPropagation();
							e.preventDefault();
						} else {
							var url = '../course/know_teac_preview.html?IS_KNOW_PREVIEW=1&QUERY_BY_COURSE=1&USER_TYPE=teac&COURSE_ID=' + link.COURSE_ID + '&KNOWLEDGE_ID=' + link.KNOWLEDGE_ID + '&TMP=' + new Date().getTime();
							openWin(url, "预览");
						}
						break;

					default:
						if (link.CVALUE && link.CVALUE.indexOf("/") != -1) {
							openWin(link.CVALUE, "预览");
						}
						break;
				}
			}
		},
		
		// 预览
		buildKnowEditUrl : function( link) {
			var url = C.HOST + 'imusic/pages/course/know_teac_edit.html?COURSE_ID=' + link.COURSE_ID + '&KNOWLEDGE_ID=' + link.KNOWLEDGE_ID + '&TMP=' + new Date().getTime();
			return url;
		},

		// 获取对象
		get : function( options) {
			var id = "cl" + new Date().getTime();
			var item = $.extend({
				id : id, // id 
				pid: '0',
				text : "", // 文本内容
				depth : 1, // 层级
				state: { expanded: false},
				data : {// 内容
					type: '', // 节点类型， common: 普通的单个； list: 数组（knowteac中只有一个ctype=contLinkList的co_know_teac记录）
					knowteac: [], // co_know_teac的列表记录
					style : {},
					link: {
						TYPE : 'know', // know: 知识点，link：URL链接
						URL: '',
						KNOWLEDGE_ID : "",
						KNOWLEDGE_TITLE : "",
						COURSE_ID : "",
						COURSE_NAME : ""
					}
				},
				children : [] // 子级节点
			}, options);
			return item;
		},

		getLevelTree : function() {
			return this.options.vm.$refs.contLinkLevelTree;
		},

		initLevelTree : function( selItem) {
			console.log("initLevelTree");
			if(this.selItem && this.selItem.KNOW_TEAC_ID == selItem.KNOW_TEAC_ID){
				return;
			}
			
			this.selItem = selItem;
			this.list = new Array();
			this.id2node = {};
			this.selNode = null;
			
			var tree = this.getLevelTree();
			var selNodes = tree.findAll({});
			if (selNodes) {
				selNodes.remove(true);
			}
 
			var item = this.get();
			if( selItem.LINK_JSON){
				var node;
				var nodes = selItem.LINK_JSON;
				for (var i = 0, len = nodes.length; i < len; i++) {
					node = nodes[i];
					tree.append( JSON.parse( JSON.stringify(node)));
					
					this.initIdjson( node);
					this.list.push( node);
				}
			}
		},
		
		// 将节点初始至相关对象
		initIdjson : function( node) {
			this.id2node[ node.id ] = node;
			
			var children = node.children;
			if( !children){
				return;
			}
			for (var i = 0, len = children.length; i < len; i++) {
				this.initIdjson( children[i]);
			}
		},
		
		getNodeById : function(arr, nodeId ) {
			var row, selRow; 
			for (var i = 0, len = arr.length; i < len; i++) {
				row = arr[i];
				if( row.id == nodeId){
					selRow = row; 
					break;
				}
				
				var children = row.children;
				row = this.getNodeById(children, nodeId);
				if( row){
					selRow = row; 
					break;
				}
			}
			return selRow;
		},
		
		// 根据节点ID，删除节点数据
		delNodeById : function(arr, nodeId ) {
			var row, selRow; 
			for (var i = 0, len = arr.length; i < len; i++) {
				row = arr[i];
				if( row.id == nodeId){
					selRow = row; 
					arr.splice(i, 1);
					break;
				}
				
				var children = row.children;
				row = this.delNodeById(children, nodeId);
				if( row){
					selRow = row; 
					break;
				}
			}
			return selRow;
		},

		levelTreeAdd : function( node ) {
			var item = null;
			if( node){
				item = this.get({
					pid: node.id,
					depth: parseInt( node.depth ) + 1
				});
				node.append( item);
				node.states.expanded = true;
			}else{
				item = this.get();
				var tree = this.getLevelTree(); 
				tree.append( item); 
			}
			var selItem = this.selItem;
			
			var newItem = copyJson(item);
			this.id2node[ item.id ] = newItem;
			if( node){
				// 不能直接使用list，list中包含了很多树的内容
				var currNode = this.getNodeById( this.list, node.id);
				currNode.children.push( newItem);
			}else{
				this.list.push( newItem);
				Vue.set(this.selItem, "LINK_JSON", this.list);
			}
		},
		
		levelTreeDel : function( node, nodeByList ) {
			node.remove(true);
			var selRow = this.delNodeById(this.list, node.id );
			if( !selRow){
				return;
			}
			Vue.set(this.selItem, "LINK_JSON", this.list);
			
			var itemArr = this.getVm().itemArr; 
			var arr = new Array();
			arr = this.getKnowTeacArrByNode(nodeByList, arr);
			for (var i = 0, len = arr.length; i < len; i++) {
				var item = arr[i];
				var knowTeacId = item.KNOW_TEAC_ID;
				
				for (var j = 0, jLen = itemArr.length; j < jLen; j++) {
					if( knowTeacId == itemArr[j].KNOW_TEAC_ID){
						vm.itemDel(itemArr[j], j, true);
						break;
					}
				}
			}
		},
		
		// 根据顶级节点，删除旗下的所有子节点
		levelTreeDelByItem : function(item) {
			if(!this.selItem || item.KNOW_TEAC_ID != this.selItem.KNOW_TEAC_ID){
				return;
			}
			var tree = this.getLevelTree();
			var selNodes = tree.findAll({});
			if (!selNodes) {
				return;
			}
			
			var node;
			for (var i = 0, len = selNodes.length; i < len; i++) {
				node = selNodes[i];
				this.levelTreeDel( node, this.id2node[ node.id ] );
			}
		},
		
		// 根据顶级节点，显示、隐藏旗下的所有子节点
		showOrHideByItem : function( item) {
			if( !item){
				item = this.selItem;
			}
			var arr = this.getKnowTeacArr(item);
			for (var j = 0, jLen = arr.length; j < jLen; j++) {
				var tmp = arr[j];
				Vue.set(tmp.STYLE, "display", tmp.STYLE.display == "none" ? "block" : "none");
			}
		},
		
		// 显示、隐藏所有子节点
		showOrHideAllItem : function(itemArr) {
			for (var i = 0, len = itemArr.length; i < len; i++) {
				this.showOrHideByItem( itemArr[i]);
			}
		},
		
		levelTreeAddKnow : function( link ) {
			this.selLink = link;
			this.showOrHide( true);
		},
		
		levelTreeGet : function(node, ctype ) {
			if( !node){
				return;
			}
			var item = null;
			var arr = node.data.knowteac;
			if( arr){
				for (var i = 0, len = arr.length; i < len; i++) {
					var row = arr[i];
					if( row.CTYPE == ctype){
						item = row;
						break;
					}
				}
			}
			return item;
		},
		
		linkClick : function(node, nodeByList, model, linkItem) {
			// 列表
			if( !linkItem ){
				var listW = $(".item-list").width();
				var vm = this.getVm();
				var selItem = this.selItem;
				var x = parseFloat( selItem.X ) + parseFloat( selItem.WIDTH);
				linkItem = initItem('contLinkList', vm, null, {list: [ this.linkItemGet()], IS_LEVEL_CHILD : 1, WIDTH: model.width / listW, HEIGHT: model.height / listW, X: x, Y: selItem.Y, CONTENT: model.url}, true, { isActive: false});
				initItemByStyle( linkItem);
				
				nodeByList.data.knowteac = [];
				nodeByList.data.knowteac.push( linkItem);
				this.tempArr[0] = [ this.tempArr[0] + 1];
			}else{
				linkItem.CONTENT = model.url;
			}
		},
		
		linkItemGet : function() {
			return {
				title: '',
				link: {
					TYPE : 'know', // know: 知识点，link：URL链接
					URL: '',
					KNOWLEDGE_ID : "",
					KNOWLEDGE_TITLE : "",
					COURSE_ID : "",
					COURSE_NAME : ""
				}
			};
		},
		
		linkItemAdd : function(item) {
			item.list.push( this.linkItemGet());
		},
		
		linkItemDel : function(arr, index) {
			arr.splice(index, 1);
		},
		
		angleImgClick : function(node, model, imgItem, txtItem, linkItem) {
			if(node.data.type && node.data.type != model.type){
				autoAlert("不能切换，请添加新节点");
				return;
			}
			var nodeByList = this.id2node[ node.id ];
			if( model.type == 'list'){
				this.linkClick(node, nodeByList, model, linkItem);
				return;
			}
			var selItem = this.selItem;
			if( imgItem == null){
				var vm = this.getVm();
				imgItem = initItem('img', vm, null, {IS_LEVEL_CHILD : 1, WIDTH: 0.15, HEIGHT: 0.07, X: selItem.X - 0.15, Y: selItem.Y - 0.07 }, true, { isActive: false});
				txtItem = initItem('txt', vm, null, {IS_LEVEL_CHILD : 1, WIDTH: 0.15, HEIGHT: 0.07, X: selItem.X - 0.15, Y: selItem.Y - 0.07, CONTENT: '<span style="color:#fff0f5;">&nbsp;</span>'}, true, {openCkWhenTxt: false, isActive: false});
				nodeByList.data.knowteac = [];
				nodeByList.data.knowteac.push( imgItem);
				nodeByList.data.knowteac.push( txtItem);
				this.tempArr[0] = [ this.tempArr[0] + 1];
			}
			model.type = model.ctype;

			var listW = $(".item-list").width();
			var rate = listW / 1920;
			var txtLeft = model.txtLeft * rate;
			var txtTop = model.txtTop * rate;
			var modelW = model.width * rate;
			var modelH = model.height * rate;
			var fontSize = parseInt(35 * rate);
			var angle = model.angle;
			
			if( model.isChild){
				var parNodeByList = this.getNodeById(this.list, node.parent.id);
				if( parNodeByList){
					// 找到父节点，找出父节点的角度
					var img = this.levelTreeGet( parNodeByList, "img");
					if( img && img.CONTENT){
						var row;
						for (var i = 0, len = this.bgList.length; i < len; i++) {
							row = this.bgList[i];
							if( row.url == img.CONTENT){
								angle = row.angle - 15 + parseInt( Math.random() * 15);
								break;
							}
						}
					}
				}
			}
			
			var itemW = parseInt( selItem.STYLE.width) / 2;
			var itemH = parseInt( selItem.STYLE.height) / 2;
			var itemL = parseInt( selItem.STYLE.left);
			var itemT = parseInt( selItem.STYLE.top);
			// 半径，圆心坐标
			var bevelLen = Math.sqrt(Math.pow(itemW, 2) + Math.pow(itemH, 2)) + 25;
			var x = itemL + itemW;
			var y = itemT + itemH;
			var depth = node.depth;
			bevelLen += ( depth ) * 160;
			
			// 求出在圆上的坐标点
			var x1 = x + bevelLen * Math.cos(angle * Math.PI / 180);
			var y1 = y + bevelLen * Math.sin(angle * Math.PI / 180);
			if( angle > 90 && angle < 270){
				x1 -= modelW;
			}else if( angle == 90 || angle == 270){
				x1 -= modelW / 2;
			}
			
			var vm = this.getVm();
			var winW = getScreenWith(vm, selItem);
			var fontSizeShow = parseInt(fontSize / listW * winW); 
			Vue.set(txtItem, 'fontSize', fontSize);
			Vue.set(txtItem, 'fontSizeShow', fontSizeShow); 
			txtItem.STYLE.FONT_SIZE = fontSize / listW + "px";
			txtItem.STYLE.fontSize = fontSize + "px";
			txtItem.STYLE.left = (x1 + txtLeft) + "px";
			txtItem.STYLE.top = (y1 + txtTop) + "px";
			txtItem.STYLE.width = modelW + "px";
			txtItem.STYLE.height = modelH + "px";
			initItemByStyle(txtItem);
			
			imgItem.STYLE.left = x1 + "px";
			imgItem.STYLE.top = y1 + "px";
			imgItem.STYLE.width = modelW + "px";
			imgItem.STYLE.height = modelH + "px";
			imgItem.CONTENT = model.url;
			imgItem.IS_IMG_LOAD = false;
			initItemByStyle(imgItem);
			
			console.log("x1:" + x1 + ", y1:" + y1 + ", rate:" + rate , JSON.stringify( model))
		},
		
		// 打开文件选择器,
		openFile : function( node, nodeByList, linkImgKnowTeac) {
			var vm = this.getVm();
			var fileData = vm.fileUpload.fileData;
			Vue.set(fileData, "KNOW_TEAC_ID", linkImgKnowTeac.KNOW_TEAC_ID);
			Vue.set(fileData, "isContLinkNode", true);
			Vue.set(fileData, "contLinkNode", node);
			// nonewname：1， 上传的文件不设置新的文件名称
			Vue.set(fileData, "nonewname", 0);
			// 初始化地址
			fileData.dir_str = fileData.dir_str_init;
			
			// 不能延迟，不能放在Vue.nextTick中，否则上面的accept改了就没效果，to go
			var file = document.getElementById('file');// 这里是取第一个classname的对象
			file.setAttribute('accept', 'image/png,image/gif,image/jpeg,image/jpg');
			file.click();
		},
		
		// 获取同一个节点下的课程内容模块
		getItemArrExcludeChild : function( itemArr) {
			var arr = new Array();
			for (var i = 0, len = itemArr.length; i < len; i++) {
				var item = itemArr[i];
				if( !item.IS_LEVEL_CHILD){
					arr.push( item);
				}
			}
			return arr;
		},
		
		getKnowTeacArr : function( item) {
			console.log("getKnowTeacArr");
			var arr = new Array();
			if( item.LINK_JSON){
				Vue.set(item, "contLinkId", item.KNOW_TEAC_ID);
				
				var node;
				for (var i = 0, len = item.LINK_JSON.length; i < len; i++) {
					node = item.LINK_JSON[i];
					arr = this.getKnowTeacArrByNode(node, arr, item.KNOW_TEAC_ID);
				}
			}
			return arr;
		},
		
		getKnowTeacArrByNode : function(node, arr, pid) {
			var knowteac = node.data.knowteac;
			if( knowteac.length > 0){
				var row;
				for (var i = 0, len = knowteac.length; i < len; i++) {
					row = knowteac[i];
					row.contLinkId = node.id + "-" + pid; 
					row.contLinkPid = pid; // 如果是顶级节点，那么换成 KNOW_TEAC_ID
					if( node.data.link && node.data.link.KNOWLEDGE_ID){
						row.link = node.data.link;
					}
					arr.push( row);
				}
			}
			for (var j = 0, jLen = node.children.length; j < jLen; j++) {
				arr = this.getKnowTeacArrByNode(node.children[j], arr, node.id + "-" + pid); 
			}
			return arr;
		},
	}
	win.ContLink = ContLink;
	// 把这个对象附给window底下的 名字叫bg的对象；要不你调用的时候 new ContLink() 怕在window的环境下找不到；
}(window, document))