/**
 * 配置知识点链接， 有排序的
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
	var Link = function() {
		this.isOk = true;
		// 是否显示图标
		this.isIconShow = false;
		// 是否显示链接窗口
		this.isDialogShow = false;
		// 知识点列表
		this.knowArr = [];

		// this.knowArr.push({
		// COURSE_ID : 'CO1072d8b8ca3e47abb5dd25ec1d003e',
		// KNOWLEDGE_ID : 'CO1aad6f4e54a949d4b5a6b707711d3a',
		// KNOWLEDGE_TITLE : '小松鼠1',
		// })
		// this.knowArr.push({
		// COURSE_ID : 'CO1072d8b8ca3e47abb5dd25ec1d003e',
		// KNOWLEDGE_ID : 'CO1aad6f4e54a949d4b5a6b707711d3a',
		// KNOWLEDGE_TITLE : '小松鼠2',
		// })
		// this.knowArr.push({
		// COURSE_ID : 'CO1072d8b8ca3e47abb5dd25ec1d003e',
		// KNOWLEDGE_ID : 'CO1aad6f4e54a949d4b5a6b707711d3a',
		// KNOWLEDGE_TITLE : '小松鼠3',
		// })
		// this.knowArr.push({
		// COURSE_ID : 'CO1072d8b8ca3e47abb5dd25ec1d003e',
		// KNOWLEDGE_ID : 'CO1aad6f4e54a949d4b5a6b707711d3a',
		// KNOWLEDGE_TITLE : '小松鼠4',
		// })
	}

	// 给构造函数bg对象原型里添加属性（方法）
	Link.prototype = {

		// 初始化
		init : function(knowArr) {
			this.isDialogShow = false;
			this.knowArr = knowArr ? knowArr : [];
			if (knowArr && knowArr.length > 0) {
				this.isIconShow = true;
			} else {
				this.isIconShow = false;
			}
		},

		// 初始化 showIconNotNull:true，当结果不为空时，显示图标
		initByItemPage : function(itemArr, page, showIconNotNull) {
			if (!itemArr) {
				this.init([]);
				return;
			}
			var result = this.getCurrPageLink(itemArr, page);
			if (result) {
				this.initByIds(result.CONTENT);
			} else {
				this.init([]);
			}
		},

		// 获取当前页面中的链接对象
		getCurrPageLink : function(itemArr, page) {
			var result = null;
			for (var i = 0; i < itemArr.length; i++) {
				var item = itemArr[i];
				if (item.PAGE == page && item.CTYPE == 'link') {
					result = item;
					break;
				}
			}
			return result;
		},
		
		isJsonString : function(str) {
			try {  
				if (typeof JSON.parse(str) == "object") {  
					return true;  
				}  
			} catch(e) {  
			}  
			return false;  
		},

		// 根据知识点ID初始化
		initByIds : function(ids) {
			var that = this;
			this.init([]);

			if (!ids || !ids.trim()) {
				return;
			}
			
			// 注意： 旧版本中存知识点ID字符串，新版本存json数组对象
			if( this.isJsonString( ids)){
				that.init(JSON.parse( ids));
				return;
			}
			if( typeof ids == 'object'){
				that.init(ids);
				return;
			}
			var params = {
				KNOWLEDGE_ID : ids
			}
			ajaxPost("HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=co.know!queryList", params, function(res) {
				if (res.result == 1 && res.data) {
					var rows = JSON.parse(res.data).Rows;
					var idArr = ids.split(",");
					var newArr = [];
					for (var i = 0; i < idArr.length; i++) {
						var knowId = idArr[i];
						for (var j = 0; j < rows.length; j++) {
							if (knowId == rows[j].KNOWLEDGE_ID) {
								newArr.push(rows[j]);
							}
						}
					}
					that.init(newArr);
				}
			});
		},

		// 显示图标
		showIcon : function() {
			this.isIconShow = true;
		},

		// 显示图标
		showDialog : function() {
			this.isDialogShow = true;
		},

		// 隐藏所有
		hideAll : function(isDel) {
			this.isIconShow = false;
			this.isDialogShow = false;
			if(isDel){
				this.knowArr = [];
			}
		},

		// 打开知识点选择器
		openKnowSelector : function() {
			var that = this;
			$.popBigWindow("know-select", "../../pages/course/know_select.html", "选择要关联的知识点", function(rows) {
				if (!rows || rows.length == 0) {
					return;
				}
				var oldIds = that.getKnowIds();

				var know;
				for (var i = 0; i < rows.length; i++) {
					know = rows[i].data;
					if (oldIds.indexOf(know.KNOWLEDGE_ID) == -1 && know.KNOW_TYPE > C.KNOW_TYPE_LESSON) {
						that.knowArr.push({
							COURSE_ID : know.COURSE_ID,
							KNOWLEDGE_ID : know.KNOWLEDGE_ID,
							KNOWLEDGE_TITLE : know.KNOWLEDGE_TITLE,
						});
					}
				}
			}, getPopWidHei(500, 600));
		},

		// 删除指定关联知识点
		remove : function(index) {
			this.knowArr.splice(index, 1);
		},

		// 预览
		preview : function(model) {
			var params = {
				COURSE_ID : model.COURSE_ID,
				KNOWLEDGE_ID : model.KNOWLEDGE_ID
			}
			var url = "../course/know_teac_preview.html?" + json2urlParams(params) + "&TMP=" + new Date().getTime();
			if (isExe()) {
				window.top.open(url, "knowTeacPreview2", "fullscreen=no," + getWinOpenWidHei(), '_blank');
			} else {
				window.top.open(url, "knowTeacPreview2");
			}
		},

		// 保存
		save : function(itemArr, page) {
			var item = this.getCurrPageLink(itemArr, page);
			if (item) {
				var row;
				var arr = new Array();
				for (var i = 0; i < this.knowArr.length; i++) {
					row = this.knowArr[i]; 
					arr.push({
						COURSE_ID : row.COURSE_ID,
						KNOWLEDGE_ID : row.KNOWLEDGE_ID,
						KNOWLEDGE_TITLE : row.KNOWLEDGE_TITLE,
					})
				}
				
				item.CONTENT = JSON.stringify( arr);
				// item.CONTENT = this.getKnowIds();
			}
		},

		// 获取知识点IDs
		getKnowIds : function() {
			var ids = '';
			$(".link-item").each(function() {
				ids += "," + $(this).attr("data-know-id");
			})
			// for (var i = 0; i < this.knowArr.length; i++) {
			// ids += "," + this.knowArr[i].KNOWLEDGE_ID;
			// }
			if (ids) {
				ids = ids.substring(1);
			}
			return ids;
		}
	}
	win.Link = Link;
	// 把这个对象附给window底下的 名字叫bg的对象；要不你调用的时候 new Link() 怕在window的环境下找不到；
}(window, document))