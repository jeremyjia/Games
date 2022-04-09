/**
 * 树形结构的帮助类
 * 
 * @param win
 * @param doc
 * @param undefined
 * @returns
 */
;
(function(win, doc, undefined) {
	"use strict";
	var TreeUtil = function(tree, option) {
		this.tree = tree;

		this.option = {
			topId : '', // 顶级知识点ID
			expandLevel : 0, // 默认展开的节点层级，从0开始
			lessNum2expand : 10, // 知识点数量少于该数量时，那么展开全部
			searchStyle : {
				color : "red",
				fontSize : "16px"
			}
		// 搜索选中的节点样式
		};

		if (option && typeof option == "object") {
			for ( var key in option) {
				this.option[key] = option[key];
			}
		}

		this.initLevel();

		if (this.option.expandLevel) {
			this.isExpandFirst();
		}
	}

	// 给构造函数TreeUtil对象原型里添加属性（方法）
	TreeUtil.prototype = {

		// 初始化层级，从0开始递增，暂时只设置0，有用再说
		initLevel : function() {
			var allNodes = this.tree.findAll({});
			if (!allNodes) {
				return;
			}
			var node;
			for (var i = 0; i < allNodes.length; i++) {
				node = allNodes[i];
				if (node.parent == null) {
					node.level = 0;
				}
			}
		},

		// 根据层级选择
		findByLevel : function(level) {
			var selNodes = this.tree.findAll({
				level : level
			});
			return selNodes;
		},

		/**
		 * 自动展开节点。 level: 第几级 isNullThenAll: 找不到节点时，展开全部
		 */
		expandAuto : function(level, isNullThenAll) {
			var selNodes = this.tree.findAll({});
			if (!selNodes) {
				return;
			}

			if (selNodes.length <= this.option.lessNum2expand) {
				selNodes.expand();
			} else {
				this.expand(level, isNullThenAll);
			}
		},

		/**
		 * 展开节点。 level: 第几级 isNullThenAll: 找不到节点时，展开全部
		 */
		expand : function(level, isNullThenAll) {
			var allNodes = this.tree.findAll({});

			var selNodes = this.findByLevel(level);
			if (selNodes) {
				// 先收起全部
				allNodes.collapse();
				// 展开选中
				selNodes.expand();
			} else if (isNullThenAll) {
				allNodes.expand();
			}
		},

		/**
		 * 展开全部节点
		 */
		expandAll : function() {
			var selNodes = this.tree.findAll({});
			selNodes.expand();
		},

		/**
		 * 收起全部节点
		 */
		collapseAll : function() {
			var selNodes = this.tree.findAll({});
			selNodes.collapse();
		},

		/**
		 * 搜索
		 */
		search : function(e) {
			var that = this;
			var content = e.currentTarget.value;
			var allNodes = this.tree.findAll({});
			if (!allNodes) {
				return;
			}

			var node;
			for (var i = 0; i < allNodes.length; i++) {
				node = allNodes[i];
				if (content && node.text.indexOf(content) != -1) {
					node.search = 1;
					Vue.set(node, 'searchStyle', that.option.searchStyle);
				} else {
					node.search = 0;
					Vue.set(node, 'searchStyle', '');
				}
			}

			this.collapseAll();

			var selNodes = that.tree.findAll({
				search : 1
			});
			if (selNodes) {
				for (var i = 0; i < selNodes.length; i++) {
					that.expandWithParent(selNodes[i].id);
				}
			}
		},

		/**
		 * 清除因为搜索而标识的知识点
		 */
		searchClear : function() {
			var selNodes = this.tree.findAll({
				search : 1
			});
			if (selNodes) {
				var node;
				for (var i = 0; i < selNodes.length; i++) {
					node = selNodes[i];
					node.search = 0;
					Vue.set(node, 'searchStyle', '');
				}
			}
		},

		expandWithParent : function(id) {
			var selNodes = this.tree.findAll({
				id : id
			});
			if (selNodes) {
				selNodes.expand();
				var parent = selNodes[0].parent;
				if (parent) {
					this.expandWithParent(parent.id);
				}
			}
		},

		treeLine : function() {
			Vue.nextTick(function() {
				$(".tree-line").remove();
				$(".tree-node.has-child").each(function(index, item) {
					var $content = $(this).children(".tree-content");
					if ($content.length == 0) {
						return true;
					}
					var paddingLeft = $content.css("padding-left").replace("px", "");
					var html = '<div class="tree-line" style="left: ' + (parseInt(paddingLeft)) + 'px;"></div>';
					$content.after(html);
				})
			})
		}
	}
	win.TreeUtil = TreeUtil;
	// 把这个对象附给window底下的 名字叫TreeUtil的对象；要不你调用的时候 new TreeUtil()
	// 怕在window的环境下找不到；
}(window, document))
