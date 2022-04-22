/**
 * 素材库相关操作
 * 
 * 一个声部对应一个音色，没有配置的默认为钢琴音色
 * 
 * @param win
 * @param doc
 * @param undefined
 * @returns
 */
;
(function(win, doc, undefined) {
	"use strict";
	var Material = function(options) {
		this.options = options = $.extend({
			host : C.HOST + appCode
		}, options);
	}

	// 给构造函数VoicePart对象原型里添加属性（方法）
	Material.prototype = {
		edit : function(cmd, material, cball) {
			var params = {
				CMD : cmd,
				MATERIAL_ID : material ? material.MATERIAL_ID : ''
			}
			$.popBigWindow("materialEdit", this.options.host + "/pages/material/material_edit.html?" + json2urlParams(params), "素材", cball, getPopWidHei(600, 400));
		},

		preview : function(materialId) {
			var params = {
				MATERIAL_ID : materialId
			}
			$.popBigWindow("materialPreview", this.options.host + "/pages/material/material_preview.html?" + json2urlParams(params), "素材", null, $.extend(getPopWidHei(1200, 800), {
				isIframe : 1,
				backdrop : true
			}));
		},

		select : function(params, cball) {
			var params = $.extend({}, params);
			$.popBigWindow("materialSelect", this.options.host + "/pages/material/material_select.html?" + json2urlParams(params), "素材选择", cball, $.extend(getPopWidHei(1200, 800), {
				isIframe : 1
			}));
		}
	}
	win.Material = Material;
	// 把这个对象附给window底下的 名字叫VoicePart的对象；要不你调用的时候 new Material()
	// 怕在window的环境下找不到；
}(window, document))