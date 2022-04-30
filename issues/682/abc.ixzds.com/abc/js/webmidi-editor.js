var midiNotes = new Array();
var usemidistyle = 0; // 0:使用电脑播放，1:使用浏览器的MIDI5播放，2:使用WebSocket的jazz-midi播放
// 输入设备
var inputDev = null;
var hasBindInputDev = new Array();
function connectmidi() {
	if (navigator.requestMIDIAccess) {
		navigator.requestMIDIAccess().then(onMIDIInit, onMIDIReject);
	} else {
		// alert("浏览器不支持midi设备。")
		// connectwsmidi();
	}
}

function onMIDIInit(midi) {
	midiAccess = midi;
	hasmidi = true;
	var haveAtLeastOneDevice = false;
	// 有多个设备时，让用户选择输入输出设备
	if (midiAccess.inputs.size > 1 && inputDev == null) {
		$("#midi_label").html('<span style="cursor:pointer;" onclick="openMidiSetting()" data-toggle="modal" data-target="#MIDI_SETTING_div">MIDI设置</span>');
		return;
	}
	$("#midi_label").html('<span style="cursor:pointer;" onclick="openMidiSetting()" data-toggle="modal" data-target="#MIDI_SETTING_div">MIDI设置</span>');
	var inputs = midiAccess.inputs.values();
	var outputs = midiAccess.outputs.values();
	for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
		if (midiAccess.inputs.size == 1) {

			if (input.value.name.indexOf("loop") > -1) {
				return;
			}
			inputDev = input.value.name;
			if (hasBindInputDev.indexOf(inputDev) > -1) {
				return;
			}
			input.value.onmidimessage = MIDIMessageEventHandler;
			hasBindInputDev.push(inputDev);
			haveAtLeastOneDevice = true;
			usemidistyle = 1;
			$("#synpiano_div").css("display", "");
		} else if (midiAccess.inputs.size > 1) {
			if (inputDev != null && input.value.name == inputDev) {
				if (input.value.name == inputDev) {
					inputDev = input.value.name;
					if (hasBindInputDev.indexOf(inputDev) > -1) {
						return;
					}
					input.value.onmidimessage = MIDIMessageEventHandler;
					hasBindInputDev.push(inputDev);
					haveAtLeastOneDevice = true;
					usemidistyle = 1;
					$("#synpiano_div").css("display", "");
				}
			}
		}
	}
}

function onMIDIReject(err) {
	console.log(err);
	// $("#midi_label").html("启动midi设备失败："+err);
	// 启动midi设备失败时，使用WebSocket方式去连
	// connectwsmidi();
}

function connectwsmidi() {
	// 使用WebSocket方式连接
	// 首先调用wsmidiopen，根据返回值查阅是否连接成功
	// 关闭函数是wsmidiclose();socket断开时也会自动断开

	wsmidiopen();
	setTimeout(function() {
		if (ismidiopen) {
			usemidistyle = 2;
			$("#midi_label").html("已连接midi设备，<a href=\"javascript:disconnectmidi()\">断开</a>");
			// 连接成功用midi播放
			setAbcPlayWay(0);
		} else {
			$("#midi_label").html("未连接midi设备，<a href=\"javascript:connectmidi()\">再次连接</a>");
			usemidistyle = 0;
			setAbcPlayWay(1);
		}
	}, 1000);// 1秒钟内判断
}

/*
 * 断开midi设备，用电脑播放 注意：使用何种播放形式，是在edit-1.js中用setplaystyle变量去控制的
 */
function disconnectmidi() {
	usemidistyle = 0;
	wsmidiclose();
	setAbcPlayWay(1);
	$("#midi_label").html("未连接midi设备，<a href=\"javascript:connectmidi()\">再次连接</a>");
}

/*
 * 浏览器方式下的消息处理
 */
function MIDIMessageEventHandler(event) {
	if (event.srcElement.name == inputDev) {
		// Mask off the lower nibble (MIDI channel, which we don't care about)
		switch (event.data[0] & 0xf0) {
			case 0x90:
				if (event.data[2] != 0) { // if velocity != 0, this is a
					// note-on
					// message
					console.log(event);
					noteOn(event.data[1], event.timeStamp);
					return;
				}
				// if velocity == 0, fall thru: it's a note-off. MIDI's weird,
				// y'all.
			case 0x80:
				console.log(event);
				noteOff(event.data[1], event.timeStamp);
				return;
		}
	}

}

/*
 * WebSocket方式下的消息处理
 */
function WSMIDIMessageEventHandler(message) {
	var m = message.split(",");
	if (m.length == 3 && m[0] == 144) {
		if (m[2] != 0) {
			noteOn(m[1], window.performance.now());
		} else {
			noteOff(m[1], window.performance.now());
		}
	}
}

var lastTime;
var currTime;
var downTime;
var upTime;
// 是否是和弦
var is_hx = false;

function noteOn(noteNumber, timeStamp) {
	// 禁用输入设备
	if (!$("#inputDevEnabled").prop("checked")) {
		return;
	}
	showKeyboardAct(noteNumber, 'down');
	if (noteOnVol) {
		console.log("---",timeStamp);
		play_one_note(noteNumber, $("#L").val(), $("#Q").val(), $("#Q_V").val());
	}
	is_hx = false;
	var stime = timeStamp - lastTime;
	if (stime < 50) {
		is_hx = true;
	}
	var note = findStandNoteByIndex(noteNumber);
	var obj = new Object();
	obj.note = note;
	downTime = timeStamp;
	lastTime = timeStamp;
	midiNotes.push(obj);
	// clickPianoByNote(note);
}

function noteOff(noteNumber, timeStamp) {
	// 禁用输入设备
	if (!$("#inputDevEnabled").prop("checked")) {
		return;
	}
	showKeyboardAct(noteNumber, 'up');
	upTime = timeStamp;
	var time = upTime - downTime;
	//var sz = calNoteTime(time);//这里在图形化打谱中，如果选中了固定时值，则不根据用户按下的时长来确定，如果是根据用户按下的时长来确定时值的话，就需要计算(先写死1)
	var sz = "";
	
	var note = getNoteFromNotes(sz);
	if (is_hx && note != "") {
		note = "[" + note + "]";
	}

	if (note != "") {
		//insertText(note);
		//insertWithVoice(note);
		user.midiInput = true;
		updateNextNote(note,noteNumber);
		user.midiInput = false;
	}
	midiNotes = new Array();
	
	//abc_change();
}

function getNoteFromNotes(sz) {
	/*
	 * if (!$("#synpiano").prop("checked")) { sz = ""; }
	 */
	var notestr = "";
	for (var i = 0; i < midiNotes.length; i++) {
		var tmp = getNoteByKeySign($("#K").val(), midiNotes[i].note);
		notestr = notestr + tmp + sz;
	}
	if (!is_hx) {
		midiNotes = new Array();
	}
	return notestr;
}

// 计算音符时值
function calNoteTime(time) {
	var content = $("#source").val();
	var patten = /Q:.*\n/g;

	var result = content.match(patten);
	if (result != null) {
		var Q = result[0];
		Q = Q.replaceAll("Q:", "").replaceAll(" ", "");
		var speed_unit = Q.split("=")[0];
		var speed = Q.split("=")[1];
		var unit = $("#L").val();
		// 一个标准音符的时长计算
		// 60/速度/(节拍单位/标准单位)，60为一分钟60秒，*1000表示计算节果是毫秒,得出的时长表示如果L:1/8对应的时长（就一个8分音符对应的时长）
		var unit_note_speed = 60
		/parseInt(speed)/(toFloat(speed_unit) / toFloat(unit)) * 1000;
		var unit_note_speed2 = (60 * toFloat(unit)) / (speed * toFloat(speed_unit)) * 1000;
		console.log("unit_note_speed:" + unit_note_speed)
		console.log("unit_note_speed2:" + unit_note_speed2)
		// 计算音符的时值
		var sj = Math.ceil(time / unit_note_speed);
		console.log("sj:-------------------" + sj)
		if (sj == 0) {
			sj = "/"
		}
		if (sj == 1) {
			return "";
		}
		return sj;
	}
}

// 显示钢琴按下动作noteNumber: 音符索引值， actType: 按下、松开动作 可选值 down、 up
function showKeyboardAct(noteNumber, actType) {
	var keyGroup, keyIndex;
	var arr = sd.KeyBoard;
	arr && arr.forEach(function(item) {
		var idx = item.index.indexOf(noteNumber)
		if (idx > -1) {
			keyGroup = item.group;
			keyIndex = idx + 1;
			if (keyGroup == 'C0') {
				keyIndex -= 5;
			} else if (keyGroup == 'B0') {
				keyIndex -= 4;
			}
		}
	});

	var $group = $('div[group=' + keyGroup + ']');
	if (actType == 'down') {
		$group.find('.key:nth-child(' + keyIndex + ')').addClass("selected");
	} else if (actType == 'up') {
		$group.find('.key:nth-child(' + keyIndex + ')').removeClass("selected");
	}
}

// ///////////////////////
/*
 * WebSocket连接，断开及消息处理
 */

var sendMidiMsg = {}, midisocket, ismidiopen = false;

sendMidiMsg.method = "";
sendMidiMsg.data = "{}";

var onSocketOpen = function() {
	//
	sendMidiMsg.method = "open";
	sendMidiMsg.data = "";
	midisocket.send(JSON.stringify(sendMidiMsg));
}, onSocketClose = function() {
	ismidiopen = false;
	disconnectmidi();
}, onSocketMessage = function(data) {
	data1 = JSON.parse(data.data);
	if (data1.status == "2") {
		ismidiopen = true;
		// 返回按键信息：指令（144为按键，254为空闲）, 按键(c1--60)，速度(0--noteoff, >0按下）
		WSMIDIMessageEventHandler(data1.message);
	} else if (data1.status == "1") {
		ismidiopen = true;
	} else {
		midisocket.close();
	}
}, onSocketError = function() {
	ismidiopen = false;
};

function wsmidiopen() {
	if (!ismidiopen) {
		midisocket = new WebSocket("ws://127.0.0.1:8090/");
		midisocket.onopen = onSocketOpen;
		midisocket.onerror = onSocketError;
		midisocket.onmessage = onSocketMessage;
		midisocket.onclose = onSocketClose;
	}
}
function wsmidiclose() {
	if (ismidiopen) {
		sendMidiMsg.method = "close";
		sendMidiMsg.data = "";
		midisocket.send(JSON.stringify(sendMidiMsg));
		// midisocket.close();//由服务器关闭
	}
}
function wsmidisend(command, note, velocity) {
	if (ismidiopen) {
		sendMidiMsg.method = "play";
		sendMidiMsg.data = command + "," + note + "," + velocity;// 144,60,100
		midisocket.send(JSON.stringify(sendMidiMsg));
	}
}

// ///////////////////////

function openMidiSetting() {
	$("#MIDI_SETTING_div .modal-content").css("left", ($(window).width() - $("#MIDI_SETTING_div .modal-content").width()) / 2);

	if (navigator.requestMIDIAccess) {
		navigator.requestMIDIAccess().then(scanMidiDevice, onMIDIReject);
	}
}

function scanMidiDevice(midi) {
	$("#inputDev").html("");
	$("#outputDev").html("");
	var inputs = midiAccess.inputs.values();
	var outputs = midiAccess.outputs.values();
	var selected = "";
	if (outputDev == 'audioplay') {
		selected = "selected";
	}
	var option = '<option value="audioplay" ' + selected + '>系统设备</option>';
	$("#outputDev").append(option);
	for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
		var selected = "";
		if (input.value.name == inputDev) {
			selected = "selected";
		}
		var option = "<option value='" + input.value.name + "' " + selected + ">" + input.value.name + "</option>";
		$("#inputDev").append(option);
	}
	for (var output = outputs.next(); output && !output.done; output = outputs.next()) {
		var selected = "";
		if (output.value.name == outputDev) {
			selected = "selected";
		}
		var option = "<option value='" + output.value.name + "' " + selected + ">" + output.value.name + "</option>";
		$("#outputDev").append(option);
	}
}
// 重新设置输入输出设备
function setMidiDevice() {
	inputDev = $("#inputDev").val();
	outputDev = $("#outputDev").val();
	if (outputDev == 'audioplay') {
		setAbcPlayWay(1);
	} else {
		setAbcPlayWay(0);
	}
	if (navigator.requestMIDIAccess) {
		navigator.requestMIDIAccess().then(onMIDIInit, onMIDIReject);
		navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
	}
}
