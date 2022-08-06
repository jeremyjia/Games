// 重写alert，因为在exe中打开弹出后，再点击父页面，会导致弹窗alert隐去，父页面的内容又不能点击
window.alert = function(msg, callback, isHtml) {
	msg = msg + "";

	// msg.length > 150 ||
	if (msg.indexOf("property") != -1 || msg.indexOf("Cannot") != -1 || msg.indexOf("error") != -1 || msg.indexOf("TypeError") != -1) {
		// 错误信息
		console.error(msg);
		msg = "曲谱异常，请整个屏幕截图后发给客服";
		return;
	}
	swal({
		title : msg,
		text : " ",
		confirmButtonText : "关闭",
		html : isHtml || false
	});
}
