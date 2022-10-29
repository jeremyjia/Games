/**
 * 给2个点，画可变形的连音线
 * 开始标记："(slur-1-[x:10,y:5,c1x:1,c1y:2,c2x:3,c2y:4]"  注释：x表示开始点x轴偏移，y表示开始点y轴偏移，c1为控制点1,c2为控制点2
 * 结束标记：")slur-1-[x:10,y:5]"   注释：x表示结束点x轴偏移，y表示结束点y轴偏移
 */
var dragRectWidth = 10;//拖动框的边长
//动态更新曲线
var startxDis = 0;//开始点x偏移
var startyDis = 0;//开始点y偏移
var control1xDis = 0;//控制点1
var control1yDis = 0;//控制点1
var control2xDis = 0;//控制点2
var control2yDis = 0;//控制点2
var endxDis = 0;//结束点
var endyDis = 0;//结束点
var selectedStartNote = null;//开始音符
var selectedEndNote = null;//结束音符
function updatePath(e){
	var selectRect = $("rect[selected='selected']");
	$(selectRect).attr("x",e.offsetX-dragRectWidth/2);
	$(selectRect).attr("y",e.offsetY-dragRectWidth/2);
	
	var type = $(selectRect).attr("type");
	
	var targetId = $(selectRect).attr("target");
	var startPoint = new Object();
	var endPoint = new Object();
	var control1 = new Object();
	var control2 = new Object();
	var startRect = $("rect[target='"+targetId+"'][type='startpoint']");
	var endRect = $("rect[target='"+targetId+"'][type='endpoint']");
	var control1Rect = $("rect[target='"+targetId+"'][type='control1']");
	var control2Rect = $("rect[target='"+targetId+"'][type='control2']");
	startPoint.x = parseFloat($(startRect).attr("x"))+dragRectWidth/2;
	startPoint.y = parseFloat($(startRect).attr("y"))+dragRectWidth/2;
	
	endPoint.x = parseFloat($(endRect).attr("x"))+dragRectWidth/2;
	endPoint.y = parseFloat($(endRect).attr("y"))+dragRectWidth/2;
	
	control1.x = parseFloat($(control1Rect).attr("x"))+dragRectWidth/2;
	control1.y = parseFloat($(control1Rect).attr("y"))+dragRectWidth/2;
	
	control2.x = parseFloat($(control2Rect).attr("x"))+dragRectWidth/2;
	control2.y = parseFloat($(control2Rect).attr("y"))+dragRectWidth/2;
	
	var path = $("#"+targetId);
	var oriStartx = parseFloat($(path).attr("ori_start_x"));
	var oriStarty = parseFloat($(path).attr("ori_start_y"));
	
	var oriEndx = parseFloat($(path).attr("ori_end_x"));
	var oriEndy = parseFloat($(path).attr("ori_end_y"));
	
	var oriControl1x = parseFloat($(path).attr("ori_control1_x"));
	var oriControl1y = parseFloat($(path).attr("ori_control1_y"));
	
	var oriControl2x = parseFloat($(path).attr("ori_control2_x"));
	var oriControl2y = parseFloat($(path).attr("ori_control2_y"));
	
	startxDis = startPoint.x - oriStartx;//开始点x偏移
	startyDis = startPoint.y - oriStarty;//开始点y偏移
	control1xDis = control1.x - oriControl1x;//控制点1
	control1yDis = control1.y - oriControl1y;//控制点1
	control2xDis = control2.x - oriControl2x;//控制点2
	control2yDis = control2.y - oriControl2y;//控制点2
	endxDis = endPoint.x - oriEndx;//结束点
	endyDis = endPoint.y - oriEndy;//结束点
	
	var dStr = "M"+startPoint.x+" "+startPoint.y+" Q"+control1.x+ " "+ control1.y+" "+control2.x+" "+control2.y+" T"+endPoint.x+" "+endPoint.y;
	dStr += "M"+startPoint.x+" "+startPoint.y+" Q"+control1.x+ " "+ (control1.y+2)+" "+control2.x+" "+(control2.y+2)+" T"+endPoint.x+" "+endPoint.y;
	path[0].setAttribute("d",dStr);
	$("svg[type='rectnode']").remove();//有时候会选中小节的框，去掉
	//如果拖动的是开始或结束点，则要重新定位对应的音符
	if(type=="startpoint" || type=="endpoint"){
//		var p = $(selectRect).parents("svg")[0];
		var p = $("#target");
		var nearNote = findNearInfo(e.currentTarget,e.offsetX/scale,e.offsetY/scale);
		console.log("nearDecoNote",nearNote)
		if(type=="startpoint" && nearNote!=null){
			selectedStartNote = syms[nearNote.istart]
			return;
		}
		if(type=="endpoint" && nearNote!=null){
			selectedEndNote = syms[nearNote.istart]
		}
	}
}

//给个开始和结束点的xy坐标，画线
function drawBezierWithStartEndPoint(svg,startPoint,endPoint){
	var control2 = {};//控制点2
	control2.x = startPoint.x + (endPoint.x-startPoint.x)/2;
	control2.y = startPoint.y + (endPoint.y-startPoint.y)/2;
	var control1 = {};//控制点1
	control1.x = startPoint.x + 10;
	control1.y = control2.y;
	drawBezierPath(svg,startPoint,endPoint,control1,control2);
}
function drawBezierPath(svg,startPoint,endPoint,control1,control2){
	var path = document.createElementNS("http://www.w3.org/2000/svg","path");
	var dStr = "M"+startPoint.x+" "+startPoint.y+" Q"+control1.x+ " "+ control1.y+" "+control2.x+" "+control2.y+" T"+endPoint.x+" "+endPoint.y;
	dStr += "M"+startPoint.x+" "+startPoint.y+" Q"+control1.x+ " "+ (control1.y+2)+" "+control2.x+" "+(control2.y+2)+" T"+endPoint.x+" "+endPoint.y;
	path.setAttribute("d",dStr);
	path.setAttribute("stroke","#000000");
	path.setAttribute("style","stroke-width: 0.5px;cursor:pointer;");
	path.setAttribute("fill","black");
	path.setAttribute("fill-rule","evenodd");
	
	path.setAttribute("ori_start_x",startPoint.x)
	path.setAttribute("ori_start_y",startPoint.y)
	
	path.setAttribute("ori_end_x",endPoint.x)
	path.setAttribute("ori_end_y",endPoint.y)
	
	path.setAttribute("ori_control1_x",control1.x)
	path.setAttribute("ori_control1_y",control1.y)
	
	path.setAttribute("ori_control2_x",control2.x)
	path.setAttribute("ori_control2_y",control2.y)
	
	path.setAttribute("ss_istart",startPoint.istart)
	path.setAttribute("es_istart",endPoint.istart)
	path.addEventListener("click",function(e){
		console.log()
		var d = $(path).attr("d");
		var arr = d.replace(/[MQT]/g," ").replace(/[MQT]/g," ").replace(/\s+/ig," ").trim().split(" ");
		var startPoint = new Object();
		startPoint.x = arr[0];
		startPoint.y = arr[1];
		
		var control1 = new Object();
		control1.x = arr[2];
		control1.y = arr[3];
		
		var control2 = new Object();
		control2.x = arr[4];
		control2.y = arr[5];
		
		var endPoint = new Object();
		endPoint.x = arr[6];
		endPoint.y = arr[7];
		
		drawrectPath(svg,startPoint.x,startPoint.y,"startpoint",target);
		drawrectPath(svg,endPoint.x,endPoint.y,"endpoint",target);
		drawrectPath(svg,control1.x,control1.y,"control1",target);
		drawrectPath(svg,control2.x,control2.y,"control2",target);
		$("svg[type='rectnode']").remove();//有时候会选中小节的框，去掉
		$("#btnAddBr").remove();//有时候会选中小节的框，去掉
		$("#delStaff").remove();//有时候会选中小节的框，去掉
		e.preventDefault();
		e.stopPropagation();
	})
	
	var target = new Date().getTime();
	path.setAttribute("id",target);
	path.setAttribute("type","customslur");
	svg.append(path);
}

//画连音线
function drawSlurPath(svg,startPoint,endPoint,c1,c2){
	var control1 = new Object();
	control1.x = startPoint.oriX + 10;
	control1.y = startPoint.oriY + (endPoint.oriY-startPoint.oriY)/2 -30;
	if(c1){
		control1.x += c1.x*scale;
		control1.y += c1.y*scale;
	}
	
	var control2 = new Object();
	control2.x = startPoint.oriX + (endPoint.oriX-startPoint.oriX)/2;
	control2.y = startPoint.oriY + (endPoint.oriY-startPoint.oriY)/2 -30;
	if(c2){
		control2.x += c2.x*scale;
		control2.y += c2.y*scale;
	}
	
	drawBezierPath(svg,startPoint,endPoint,control1,control2)
}
//var dragRect = false;//这个变量改到edit-1-spl.js里面定义了，不然abc2svg那边老会报错
function drawrectPath(svg,x,y,type,target){
	
	var nameSpace = 'http://www.w3.org/2000/svg';
	var rect = document.createElementNS(nameSpace,'rect');
	console.log(x,y)
	rect.setAttribute('x', x-dragRectWidth/2);
	rect.setAttribute('y', y-dragRectWidth/2);
	rect.setAttribute('type', type);
	rect.setAttribute('target', target);
	rect.setAttribute('width', dragRectWidth);
	rect.setAttribute('height', dragRectWidth);
	rect.setAttribute('stroke', "red" );
	rect.setAttribute('stroke-width', 1);
	rect.setAttribute('fill', "white");
	
	svg.append(rect);
	rect.addEventListener("mousedown",function(e){
		if(!user.editorAnnot){
			return;
		}
		$(this).attr("selected","selected");
		$(this).attr('fill', "blue");
		dragRect = true;
		rectMouseDownTime = new Date().getTime();
		$(document).off("mouseup").on("mouseup",function(e){
			dragRect = false;
			if($("rect[selected]").length>0){
				
				var targetid = $("rect[selected]").attr("target");
				var targetType = $("#"+targetid).attr("type");
				if(targetType=="customslur"){
					//自定义连音线
					var selectedPath = $("path[id='"+targetid+"']");
					var ssIstart = $(selectedPath).attr("ss_istart");//开始音符
					var esIstart = $(selectedPath).attr("es_istart");//结束音符
					if(!ssIstart || !esIstart){
						return;
					}
					
					changeCuntomSlurSetting(ssIstart,esIstart);//把新的自定义数据定入source文本框中，但不重新渲染谱子

					$("rect[selected]").attr('fill', "white");
					$("rect[selected]").removeAttr("selected");
					
					selectedStartNote=null;
					selectedEndNote=null;
					return;
				}else if(targetType=="bracketgch"){
					//自定义带中括号的注释
					var selectedText = $("text[id='"+targetid+"']");
					var seq = $(selectedText).attr("seq");
					var ssIstart = $(selectedText).attr("start_istart");//开始音符
					var esIstart = $(selectedText).attr("end_istart");//结束音符
					var subType = $(selectedText).attr("subtype");
					changeBracketGchSetting(ssIstart,esIstart,seq,subType);
					console.log("selectedStartNote",selectedStartNote)
					console.log("selectedEndNote",selectedEndNote)
					selectedStartNote=null;
					selectedEndNote=null;
				}
				
			}
			
			
			
		});
		
		e.preventDefault();
		e.stopPropagation();
	});
}

/**
 * 把新的自定义数据定入source文本框中，但不重新渲染谱子
 * @param ssIstart
 * @param esIstart
 * @returns
 */
function changeCuntomSlurSetting(ssIstart,esIstart){
	
	var ss = syms[ssIstart];
	var es = syms[esIstart];
	var seqReg = /slur-(\d*)/;
	var startStr = getGch(ss,"(slur");
	var endStr = getGch(es,")slur");
	
	var seq = seqReg.exec(startStr)[1];
	var old = customSlur.get("slur"+seq);
	var newStartStr = '"(slur-'+seq+'[sx:'+(old.startPoint.x+startxDis/scale).toFixed(1)+',sy:'+(old.startPoint.y+startyDis/scale).toFixed(1)+
									',c1x:'+(old.control1.x+control1xDis/scale).toFixed(1)+',c1y:'+(old.control1.y+control1yDis/scale).toFixed(1)+
									',c2x:'+(old.control2.x+control2xDis/scale).toFixed(1)+',c2y:'+(old.control2.y+control2yDis/scale).toFixed(1)+']"';
	var newEndStr = '")slur-'+seq+'[x:'+(old.endPoint.x+endxDis/scale).toFixed(1)+',y:'+(old.endPoint.y+endyDis/scale).toFixed(1)+']"';
	var content = $("#source").val();
	
	var startReg = new RegExp('\\"\\(slur-'+seq+'.[^\\"]*\\"');
	var endReg = new RegExp('\\"\\)slur-'+seq+'.[^\\"]*\\"');
	
	if(selectedStartNote!=null && selectedStartNote.istart != ssIstart){
		//重新选择了开始点音符，把原来开始点音符相关语法去掉
		var newIstart = selectedStartNote.istart;
		var preStr = content.substring(0,selectedStartNote.istart);
		preStr = preStr.replace(startReg,"");
		var sufStr = content.substring(selectedStartNote.istart).replace(startReg,"");
		
		var newContent = preStr + '"(slur-'+seq+'[sx:0,sy:0,c1x:0,c1y:0,c2x:0,c2y:0]"' + sufStr;
		newContent = newContent.replace(endReg,'")slur-'+seq+'[x:0,y:0]"');
		$("#source").val(newContent);
		doLog();
		src_change();
		return;
	}
	if(selectedEndNote!=null && selectedEndNote.istart != esIstart){
		//重新选择了结束点音符
		var newIstart = selectedEndNote.istart;
		var preStr = content.substring(0,selectedEndNote.istart);
		preStr = preStr.replace(endReg,"");
		var sufStr = content.substring(selectedEndNote.istart).replace(endReg,"");
		
		var newContent = preStr + '")slur-'+seq+'[x:0,y:0]"' + sufStr;
		newContent = newContent.replace(startReg,'"(slur-'+seq+'[sx:0,sy:0,c1x:0,c1y:0,c2x:0,c2y:0]"');
		$("#source").val(newContent);
		doLog();
		src_change();
		return;
	}
	
	
	
	content = content.replace(startReg,newStartStr).replace(endReg,newEndStr);
	$("#source").val(content);
	doLog();
//	src_change();
	
}


/**
 * 含中括号的标注 开始标记 "[-0-注释"  结束标记 "-0-]"
 * @param svg
 * @param startPoint
 * @param endPoint
 * @param word
 * @returns
 */
var bracketGchMouseDownTime = 0;
var dragBracketGch = false;
function drawBracketGchPath(svg,startPoint,endPoint,word,fontSize,drawType){
	startPoint.x +=2;
	endPoint.x -=2;
	var fs = 12;
	if(fontSize){
		fs = fontSize;
	}
	fs = fs*scale;
	var font = {"fontsize":fs,"fontfamily":"sans-serif"};
	var wordWidth = getTextWidth(word,font.fontsize+"px "+font.fontfamily);
	var distance = endPoint.x - startPoint.x
	
	var target = new Date().getTime();
	var seq = startPoint.seq;
	
	
	//显示在下方
	if(startPoint.type=="_"){
		startPoint.y += startPoint.h * scale + 20;
		endPoint.y += startPoint.h * scale + 20;
	}else{
		//显示在上方
		startPoint.y -= 20;
		endPoint.y -= 20;
	}
	
	var text = document.createElementNS("http://www.w3.org/2000/svg","text");
	var rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
	text.setAttribute("id",target);
	text.setAttribute("type","bracketgch");
	text.setAttribute("subtype","bracket");
	text.setAttribute("seq",seq);
	text.setAttribute('x',startPoint.x + (distance/2) - wordWidth/2);
	text.setAttribute('y',startPoint.y-5);
	text.setAttribute('ori-y',startPoint.y-5);
	
	text.setAttribute('start_istart',startPoint.istart);
	text.setAttribute('end_istart',endPoint.istart);
	text.setAttribute('style',"font-size:"+font.fontsize+"px;font-family:"+font.fontfamily+";cursor:pointer;");
	var textNode = document.createTextNode(word);
	text.appendChild(textNode);
	
	text.addEventListener("click",function(e){
		if(!user.editorAnnot){
			return;
		}
		$("rect[type='startpoint']").remove();
		$("rect[type='endpoint']").remove();
		if(drawType){
			//开始和结束点不在一行
			drawrectPath(svg,startPoint.x,startPoint.y,"startpoint",target);
			var endPath = $("path[type='lline'][subtype='end'][seq='"+seq+"']");
			var ex = $(endPath).attr("my_x");
			var ey = parseFloat($(endPath).attr("my_y"))+10;
			drawrectPath($(endPath).parents("svg"),ex,ey,"endpoint",target);
		}else{
			//单击选中,y坐标都使用开始点的，这样能保证在一条线上
			drawrectPath(svg,startPoint.x,startPoint.y,"startpoint",target);
			drawrectPath(svg,endPoint.x,startPoint.y,"endpoint",target);
		}
		e.preventDefault();
		e.stopPropagation();
	});
	text.addEventListener("dblclick",function(e){
		if(!user.editorAnnot){
			return;
		}
		//删除拖动框
		$("rect[target='"+target+"']").remove();
		var box = this.getBoundingClientRect()   
//		var $input = $('#tmpText');
		var input = document.createElement("textarea");//$('#tmpComposerText');
		$(input).css("z-index",2).css("position","absolute");
		$("body").append($(input))
		var $self = $(this);
		// 设置值和属性  
		$(input).val($(this).text()).css({      
			left: box.left,        
			top: box.top,      
			width: box.width+20,      
			height: box.height+20
			}).show()   // 聚焦  
			.focus()    // 失去焦点移除输入框，设置值   
			.on('blur', function(){   
				//console.log("----",$(this).val())
				var textVal = $(this).val();
				$self.text(textVal); 
				$(this).css("display","none");
				var sIstart = $(this).attr("start_istart");
				var eIstart = $(this).attr("end_istart");
				if(textVal==""){
					//删除
					delBracketGch(seq);
				}else{
					updateBracketGchText(seq,textVal)
				}
			})
		});
	text.addEventListener("mousedown",function(e){
		if(user.mode=="editor"){
			bracketGchMouseDownTime = new Date().getTime();
			dragBracketGch = true;
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
	});
	text.addEventListener("mousemove",function(e){
		if(user.mode=="editor"){
			if(dragBracketGch){
				var parent = $(e.target).parents("g")[0];
				var transform = $(parent).attr("transform");
				var o = getTransformsTranslate(transform)
				if(o==null){
					o = new Object();
					o.x=0;
					o.y=0;
				}
				//$(event.target).attr("x",e.offsetX-($(e.target)[0].getBBox().width/2));
				$(event.target).attr("y",e.offsetY-o.y+5);
				var id = $(event.target).attr("id");
				var ori_y = parseFloat($(event.target).attr("ori-y"));
				var curr_y = parseFloat($(event.target).attr("y"));
				var y_dist = curr_y - ori_y;
				var srect = $("rect[target='"+target+"'][type='bg_rect']");
				if(srect){
					$(srect).attr("y",curr_y-y_dist -5-box.height);
				}
				//重新定位横线
				var hLineDStr = "M"+startPoint.x+" "+(startPoint.y-10+y_dist)+"l"+distance+" 0.00";
				hLine.setAttribute("d",hLineDStr);
				if(startPoint.type=="_"){
					//重新定位竖线
					vLineDStr = "M"+startPoint.x+" "+(startPoint.y-15+y_dist)+"v5.00m"+distance+" 0.00v-5.00";
					vLine.setAttribute("d",vLineDStr);
				}else{
					//重新定位竖线
					vLineDStr = "M"+startPoint.x+" "+(startPoint.y-10+y_dist)+"v5.00m"+distance+" 0.00v-5.00";
					vLine.setAttribute("d",vLineDStr);
				}
				
			}
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
		
		
	});
	text.addEventListener("mouseup",function(e){
		if(user.mode=="editor"){
			dragBracketGch = false;
			var bracketGchMouseUpTime = new Date().getTime();
			if((bracketGchMouseUpTime-bracketGchMouseDownTime)<200){
				return;
			}
			var parents = $(this).parents("svg");
			var svg = parents[parents.length-1];
			var x = parseInt((parseInt($(this).attr("x"))));
			var y = parseInt((parseInt($(this).attr("y")))-15);
			console.log("e.x",x,y);
			var ori_y = parseInt($(this).attr("ori-y"));
			var y_dist = y - ori_y ;
			updateBrackGchTop(target);
			
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
		
	});
	//画竖线
	var vLine = document.createElementNS("http://www.w3.org/2000/svg","path");
	var M_y = startPoint.y - 10;//初始移动到Y的坐标
	if(startPoint.type == "_"){//显示在下方
		M_y = startPoint.y - 15
	}
	var vLineDStr = "M"+startPoint.x+" "+ M_y +"v5.00m"+distance+" 0.00v-5.00";
	if(drawType=="start"){
		//只画开始的竖线，结束的在下一行
		vLineDStr = "M"+startPoint.x+" "+ M_y +"v5.00";
		vLine.setAttribute("subtype","start");
	}else if(drawType=="end"){
		//只画结束的竖线
		vLineDStr = "M"+(startPoint.x+distance)+" "+ M_y +"v5.00";
		vLine.setAttribute("subtype","end");
		vLine.setAttribute("my_x",(startPoint.x+distance));
		vLine.setAttribute("my_y",M_y);
	}
	vLine.setAttribute("d",vLineDStr);
	vLine.setAttribute("stroke","#000000");
	vLine.setAttribute("fill","black");
	vLine.setAttribute("target",target);
	vLine.setAttribute("type","vline");
	vLine.setAttribute("seq",seq);
	
	$(svg).append(vLine);
	
	//画横线
	var hLine = document.createElementNS("http://www.w3.org/2000/svg","path");
	var hLineDStr = "M"+startPoint.x+" "+(startPoint.y-10)+"l"+distance+" 0.00";
	hLine.setAttribute("d",hLineDStr);
	hLine.setAttribute("stroke","#000000");
	hLine.setAttribute("fill","black");
	hLine.setAttribute("target",target);
	vLine.setAttribute("type","lline");
	$(svg).append(hLine);
	
	$(svg).append(rect);
	
	$(svg).append(text);
	var box = text.getBBox();
	rect.setAttribute('x',startPoint.x + (distance/2) - wordWidth/2-5);
	rect.setAttribute('y',startPoint.y-5-box.height);
	rect.setAttribute('ori-y',startPoint.y-5-box.height);
	rect.setAttribute('width',box.width+10);
	rect.setAttribute('height',box.height);
	rect.setAttribute('fill',"white");
	rect.setAttribute('type',"bg_rect");
	rect.setAttribute('target',target);
}
//获取文本宽度
function getTextWidth(text, font) {
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d"); 
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}
//删除注释
function delBracketGch(seq,type){
	var selObj = $("text[type='bracketgch'][seq='"+seq+"'][subtype='"+type+"']")
	if($(selObj).length>0){
		var target = $(selObj).attr("id");
		$("path[target='"+target+"']").remove();
		$("use[target='"+target+"']").remove();
		$(selObj).remove();
		var startReg = new RegExp("\\\"(_{0,1})\\\[-"+seq+"-[^\\\"]*\\\"");
		if(type=="wave"){
			startReg = new RegExp("\\\"(_{0,1})\\\[~"+seq+"~[^\\\"]*\\\"");
		}
		var endReg = new RegExp("\""+seq+"-]\"");
		if(type=="wave"){
			endReg = new RegExp("\""+seq+"~]\"");
		}
		var content = $("#source").val();
		content = content.replace(startReg,"").replace(endReg,"");
		$("#source").val(content);
		doLog();
		src_change();
		$("rect[target='"+target+"']").remove();
	}
}
function updateBracketGchText(seq,text,type){
	var selObj = $("text[type='bracketgch'][seq='"+seq+"']")
	if($(selObj).length>0){
		var target = $(selObj).attr("id");
		var startReg = new RegExp("\\\"(_{0,1})\\\[-"+seq+"-[^\\\"]*\\\"");
		if(type=="wave"){
			startReg = new RegExp("\\\"(_{0,1})\\\[\\\~"+seq+"\\\~[^\\\"]*\\\"");
		}
		var content = $("#source").val();
		var node = startReg.exec(content);
		var topStr = "";//设置顶部
		var preStr = "";//上下位置
		if(node){
			var oldText = node[0];
			preStr = node[1];
			var topReg = /\-\((.[^\(]*)\)/;
			var node2 = topReg.exec(oldText);
			if(node2){
				topStr = node2[0];
			}
		}
		if(type=="wave"){
			content = content.replace(startReg,'"'+preStr+'[~'+seq+'~'+text+topStr+'"');
			
		}else{
			content = content.replace(startReg,'"'+preStr+'[-'+seq+'-'+text+topStr+'"');
			
		}
		$("#source").val(content);
		doLog();
		src_change();
	}
}
//更新带中括号注释的高度
function updateBrackGchTop(target){
	var selObj = $("text[id='"+target+"']");
	var seq = $(selObj).attr("seq");
	if($(selObj).length>0){
		var target = $(selObj).attr("id");
		var subType = $(selObj).attr("subtype");
		var ori_y = parseInt($(selObj).attr("ori-y"));
		var y = parseInt($(selObj).attr("y"));
		var dist = y - ori_y
		var startReg = new RegExp("\\\"_{0,1}\\\[-"+seq+"-[^\\\"]*\\\"");
		if(subType=="wave"){
			startReg = new RegExp("\\\"_{0,1}\\\[~"+seq+"~[^\\\"]*\\\"");
		}
		var content = $("#source").val();
		var node = startReg.exec(content);
		var topStr = "";//设置顶部
		if(node){
			var oldText = node[0];
			var topReg = /\-\((.[^\(]*)\)/;
			var node2 = topReg.exec(oldText);
			oldText = oldText.replace(topReg,"");
			if(node2){
				//原来已经有高度设置,则计算差值
				oldText = oldText.replace(topReg,"");
				var oldTop = parseInt(node2[1])
				topStr = "-("+(oldTop + dist)+")";
				oldText = '"'+ oldText.replaceAll('"',"")+ topStr + '"';
				content = content.replace(startReg,oldText);
			}else{
				//如果没有，则增加设置
				oldText = '"'+ oldText.replaceAll('"',"")+ '-('+dist+')' + '"';
				content = content.replace(startReg,oldText);
			}
			
		}
		$("#source").val(content);
		//doLog();
		src_change();
	}
}
//重新设置开始和结束点
function changeBracketGchSetting(ssIstart,esIstart,seq,type){
	var ss = syms[ssIstart];
	var es = syms[esIstart];
	var content = $("#source").val();
	if(selectedStartNote!=null && selectedStartNote.istart != ssIstart){
		var startReg = new RegExp("\\\"_{0,1}\\\[-"+seq+"-[^\\\"]*\\\"");
		if(type=="wave"){
			startReg = new RegExp("\\\"_{0,1}\\\[~"+seq+"~[^\\\"]*\\\"");
		}
		var startMatch = content.match(startReg);
		var startGch = "";
		//重新选择了开始点音符，把原来开始点音符相关语法去掉
		if(startMatch!=null){
			startGch = startMatch[0];
			var newIstart = selectedStartNote.istart;
			var preContent = content.substring(0,newIstart);
			preContent = preContent.replace(startReg,"");
			var sufContent = content.substring(newIstart);
			sufContent = sufContent.replace(startReg,"");
			var newContent = preContent + startGch + sufContent;
			$("#source").val(newContent);
			doLog();
			src_change();
			return;
		}
	}
	if(selectedEndNote!=null && selectedEndNote.istart != esIstart){
		//重新选择了结束点音符
		var newIstart = selectedEndNote.istart;
		var endReg = new RegExp("\""+seq+"-]\"");
		if(type=="wave"){
			endReg = new RegExp("\""+seq+"~]\"");
		}
		var endMatch = content.match(endReg);
		var endGch = "";
		//重新选择了开始点音符，把原来开始点音符相关语法去掉
		if(endMatch!=null){
			endGch = endMatch[0];
			var newIstart = selectedEndNote.istart;
			var preContent = content.substring(0,newIstart);
			preContent = preContent.replace(endReg,"");
			var sufContent = content.substring(newIstart);
			sufContent = sufContent.replace(endReg,"");
			var newContent = preContent + endGch + sufContent;
			$("#source").val(newContent);
			doLog();
			src_change();
			return;
		}
	}
}



//Properties of a line 
//I:  - pointA (array) [x,y]: coordinates
//  - pointB (array) [x,y]: coordinates
//O:  - (object) { length: l, angle: a }: properties of the line
const line = (pointA, pointB) => {
const lengthX = pointB[0] - pointA[0]
const lengthY = pointB[1] - pointA[1]
return {
 length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
 angle: Math.atan2(lengthY, lengthX)
}
}


//Position of a control point 
//I:  - current (array) [x, y]: current point coordinates
//  - previous (array) [x, y]: previous point coordinates
//  - next (array) [x, y]: next point coordinates
//  - reverse (boolean, optional): sets the direction
//O:  - (array) [x,y]: a tuple of coordinates
const controlPoint = (current, previous, next, reverse) => {
// When 'current' is the first or last point of the array
// 'previous' or 'next' don't exist.
// Replace with 'current'
const p = previous || current
const n = next || current
// The smoothing ratio
const smoothing = 0.2
// Properties of the opposed-line
const o = line(p, n)
// If is end-control-point, add PI to the angle to go backward
const angle = o.angle + (reverse ? Math.PI : 0)
const length = o.length * smoothing
// The control point position is relative to the current point
const x = current[0] + Math.cos(angle) * length
const y = current[1] + Math.sin(angle) * length
return [x, y]
}



//Create the bezier curve command 
//I:  - point (array) [x,y]: current point coordinates
//  - i (integer): index of 'point' in the array 'a'
//  - a (array): complete array of points coordinates
//O:  - (string) 'C x2,y2 x1,y1 x,y': SVG cubic bezier C command
const bezierCommand = (point, i, a) => {
// start control point
const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point)
// end control point
const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true)
return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`
}
//Render the svg <path> element 
//I:  - points (array): points coordinates
//- command (function)
// I:  - point (array) [x,y]: current point coordinates
//     - i (integer): index of 'point' in the array 'a'
//     - a (array): complete array of points coordinates
// O:  - (string) a svg path command
//O:  - (string): a Svg <path> element
const svgPath = (points, command) => {
//build the d attributes by looping over the points
const d = points.reduce((acc, point, i, a) => i === 0
// if first point
? `M ${point[0]},${point[1]}`
// else
: `${acc} ${command(point, i, a)}`
, '')

var s = `<path type="XL" d="${d}" fill="none" stroke-width="1.5" stroke="red" />`;
return s;
	
}

function drawXuanLvPath(svg,points){
	var path = $(svgPath(points, bezierCommand));
	svg[0].innerHTML = svg[0].innerHTML+svgPath(points, bezierCommand)
}