// 重写alert，因为在exe中打开弹出后，再点击父页面，会导致弹窗alert隐去，父页面的内容又不能点击
var consoleLog = "";
window.alert = function(msg, callback) {
	consoleLog = msg;
	console.log(msg)
	if(msg.length>100){
		
		swConfirm1("很抱歉，服务器开小差去了", "为了提供更好的操作体验，系统将收集您的谱例信息发送给管理员，点击<发送错误报告>发送，点击<关闭>不发送", cb, "发送错误报告","关闭")
	}else{
		swAlert(msg);
	}
}
function cb(){
	console.log("1111111111111111111")
	var content = $("#source").val();
	var userHost = window.location.href;
	var url = "/abc/problemFeedback?time="+Date.parse(new Date());
	$.ajax({
	 type: "POST",
	 url: url,
	 data: {"abcContent":content,"consoleLog":consoleLog,"userHost":userHost},
	 success: function(data){
		 console.log("反馈成功")
         
	 }
	});
	
}
/**
 * 消息提示框
 * 
 * @param title
 * @param txt
 * @returns
 */
function swAlert(title, txt, cball){
	swal({
		title: title,   
		text: txt && txt != undefined ? txt : " ",
		confirmButtonText: "关闭"
	}, function(isConfirm){
		if(typeof cball == 'function'){
			cball(); 
		}
    });
}

/**
 * 会自动关闭的消息提示框
 * 
 * @param title
 * @param txt
 * @returns
 */
function swAutoAlert(title, txt){
	swal({   
        title: title && title != undefined ? title : " " ,  
		text: txt && txt != undefined ? txt : " ", 
        timer: 2000,   
        showConfirmButton: false 
    });
}

/**
 * 确认提示框
 * 
 * @param title
 * @param txt
 * @param callback
 * @returns
 */
function swConfirm1(title, txt, callback, yesText,noText){
	swal({   
        title: title,   
        text: txt && txt != undefined ? txt : " ",   
        type: "warning",   
        showCancelButton: true,   
        confirmButtonColor: "#DD6B55",   
        confirmButtonText: yesText||"确认",   
        cancelButtonText: noText||"取消",   
        closeOnConfirm: true,   
        closeOnCancel: true 
    }, function(isConfirm){  
    	if(isConfirm){
    		callback( isConfirm); 
    	}
    });
}