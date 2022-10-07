//取得当前选中的升或降一的音符
function getNewNote(note, flag) {
	if (note == "") {
		return note;
	}
	// 判断音符出现的次数，如果出现次数大于1，则于无做升降调
	var count = 0;
	for (var i = 1; i < note.length; i++) {
		if (notestr.indexOf(note.substr(i - 1, i)) > -1) {
			count++;
		}
	}
	if (count > 1) {
		return note;
	}
	var suffix = "";
	var start = note.lastIndexOf(",");
	if (start == -1) {
		start = note.lastIndexOf("'");
	}
	if (start == -1) {
		start = 0
	}
	var all = [];
	for (var i = 0; i < sd.KeyBoardStand.length; i++) {
		all = all.concat(sd.KeyBoardStand[i].val);
	}
	for (var i = 0; i < all.length; i++) {
		if (all[i] == note.substr(0, start + 1)) {
			if (flag == "UP") {
				if (i + 1 < all.length) {
					playNote(all[i + 1]);
					return all[i + 1] + note.substr(start + 1, note.length);
				}
			}
			if (flag == "DOWN") {
				if (i - 1 > 0) {
					playNote(all[i - 1]);
					return all[i - 1] + note.substr(start + 1, note.length);
				}
			}
			return all[i];
		}
	}
	return note;
}

// 取键盘对应的音符
function getNoteByKey(group, index) {
	// 所有键盘数据
	var keys = sd.KeyBoard;
	// 取键盘对应的音符
	for (var i = 0; i < keys.length; i++) {
		if (keys[i].group == group) {
			return keys[i].val[index];
		}
	}
	return "";
}
//取键盘对应的音符
function getNoteByKey2(group, index, riseOrDown, sourceid, lower,key) {
	// 所有键盘数据
	var keys;
	if(riseOrDown == "undefined" || riseOrDown == undefined || riseOrDown == ""){
		keys = sd.KeyBoardStand;
	} else if (riseOrDown == "rise") {
		keys = sd.KeyBoard;
	} else if (riseOrDown == "down") {
		keys = sd.KeyBoard_D;
	}
	// 取键盘对应的音符
	for (var i = 0; i < keys.length; i++) {
		if (keys[i].group == group) {
			var note = keys[i].val[index];
			// 上面返回的是C大调的对应的音符，要转成当前相对应的调子的音符
			var val = getNoteByKeyWithC(sourceid, lower,key);
			if (val == "") {
				return keys[i].val[index];
			} else {
				return val;
			}
		}
	}
	return "";
}

function findCNote(jpVal) {

	var arr = sd.Simple2Staff.SimpleValue;
	var index = -1;
	for (var i = 0; i < arr.length; i++) {
		var n = arr[i];
		if (jpVal.replaceAll("'", "").replaceAll(",", "").replaceAll("\\^", "#").replaceAll("\\_", "b") == n.replace(",", "")) {
			index = i;
		}
	}
	if (index != -1) {

		var tmpNote = sd.Simple2Staff.StaffValue[0].STAFF[index];
		var suffix = jpVal.substr(tmpNote.length);
		return tmpNote + suffix;
	}
	return "";
}

// 根据C大调的音符值，取得其它大调的音符值
function getNoteByKeyWithC(sourceid, lower,K) {
	var cNote = findCNote(currJpVal);
	if (cNote == "") {
		return "";
	}
	var content = $("#" + sourceid).val();
	if (content == "undefined" || content == undefined) {
		return;
	}

	//K的值改为传入
//	var kPattern = /K:\s{0,}.[^\s]*/;
//	var kResult = content.match(kPattern);
//	var K = "";
//	if (kResult != null) {
//		K = kResult[0].replace("K:", "");
//		K = $.trim(K);
//	}

	var carr = sd.Simple2Staff.StaffValue[0].STAFF;
	var tmpNote = cNote.replaceAll(",", "").replaceAll("'", "");
	var index = -1;
	var note = "";
	var resultNote = "";
	// 1.先找到与C大调对应的
	for (var i = 0; i < carr.length; i++) {
		if (tmpNote.toLowerCase() == carr[i].replaceAll(",", "").replaceAll("'", "").toLowerCase()) {
			index = i;
			note = carr[i];
		}
	}
	for (var i = 0; i < sd.Simple2Staff.StaffValue.length; i++) {
		if (sd.Simple2Staff.StaffValue[i].K == K) {
			if (lower == "lower") {
				resultNote = sd.Simple2Staff.StaffValue[i].STAFF_LOWER[index];
			} else if (lower == "higher") {

				resultNote = sd.Simple2Staff.StaffValue[i].STAFF[index];
			} else {
				// 这里主要处理前期没有这个标识时，降b调使用的是小字组
				if (K == "Bb") {
					resultNote = sd.Simple2Staff.StaffValue[i].STAFF_LOWER[index];
				} else {
					resultNote = sd.Simple2Staff.StaffValue[i].STAFF[index];
				}
			}
		}
	}
	var suffix = cNote.substr(note.length);

	var result = resultNote + suffix;
	if (result.indexOf(",'") > -1) {
		result = result.replace(",'", "");
	}
	var pattern = /[A-G]'/g;
	result = result.replace(pattern, function(m, p1, p2, p3) {
		return m.replace("'", "").toLowerCase();
	});
	var pattern2 = /[a-g],/g;
	result = result.replace(pattern2, function(m, p1, p2, p3) {
		return m.replace(",", "").toUpperCase();
	});
	return result;
}

// 取键盘对应的音符
function getNoteNameByKey(group, index) {
	// 所有键盘数据
	var keys = sd.KeyBoard;
	// 取键盘对应的音符
	for (var i = 0; i < keys.length; i++) {
		if (keys[i].group == group) {
			return keys[i].name[index];
		}
	}
	return "";
}
// 取键盘对应的简谱
function getNumStaffByKey(group, index) {
	// 所有键盘数据
	var keys = sd.KeyBoard;
	// 取键盘对应的音符
	for (var i = 0; i < keys.length; i++) {
		if (keys[i].group == group) {
			return keys[i].numstaff[index];
		}
	}
	return "";
}
// 根据不同的声调取不同的音符，如G大调时，弹奏F，应该显示在谱子上为“=F”,如果弹奏"^F"显示F
function getNoteByKeySign(key, note) {
	// 与当前音符在同一小节内的的有有升降符、还原符的音符
	var barlineNotes = getNotesByBarLine();

	// 本节内最后一个升降号，如果本节内最后一个升降号与当前的一至，则当前的就不需要加升降号和还原号
	// var lastUpOrDown = getNodePreUpOrDownSymbol();
	var lastUpOrDown = getLastFlag(barlineNotes, note);
	// 所有声调数据
	var sigs = sd.KeySignature;
	if (sigs != null && currJpVal == "") {
		for (var i = 0; i < sigs.length; i++) {
			if (key == sigs[i].key) {
				var val = sigs[i].val;
				var type = sigs[i].type;
				if (type == "down") {
					// var noteIndex = findIndexByNote(note);
					// note = findNoteByIndex_D(noteIndex);
					// console.log("note:=================="+note)
				}
				if (val != "") {
					var notes = val.split(",");
					for (var j = 0; j < notes.length; j++) {
						// 符号相应的调子的音符，则去掉前面的升降号，如^F->F
						if (note.toUpperCase().indexOf(notes[j]) > -1) {
							// 输入的音符是需要处理的音符
							if (note.startWith("\\^\\^")) {
								if (lastUpOrDown == "" || lastUpOrDown == "^^") {
									return note.replace("^^", "");
								} else {
									return note;
								}
							} else if (note.startWith("\\^")) {
								// 如果该音符前没有升降符号，或者该音符前已经有升号，则该音符不需要加升号
								if (lastUpOrDown == "" || lastUpOrDown == "^") {
									return note.replace("^", "");
								} else {
									return note;
								}
							} else if (note.startWith("\\_\\_")) {
								if (lastUpOrDown == "" || lastUpOrDown == "__") {
									return note.replace("__", "");
								} else {
									return note;
								}
							} else if (note.startWith("\\_")) {
								// 如果该音符前没有升降符号，或者该音符前已经有升号，则该音符不需要加升号
								if (lastUpOrDown == "" || lastUpOrDown == "_") {
									return note.replace("_", "");
								} else {
									return note;
								}
							} else {
								// 如果该音符前没有升降符号，或者该音符前已经有升号，则该音符不需要加升号
								if (lastUpOrDown == "=") {
									return note;
								} else {
									if (note.indexOf("=") > -1) {
										return note;
									}
									// return "=" + note;
									return restoreNote(key, note);
								}
							}
						} else {
							if (type == "down") {
								var tmpnote = "_" + note;
								if (tmpnote.toUpperCase().indexOf(notes[j]) > -1) {
									if (note.indexOf("=") > -1) {
										return note;
									}
									// return "=" + note;
									return restoreNote(key, note);
								}
							} else if (type == "up") {
								var tmpnote = "^" + note;
								if (tmpnote.toUpperCase().indexOf(notes[j]) > -1) {
									if (note.indexOf("=") > -1) {
										return note;
									}
									// return "=" + note;
									return restoreNote(key, note);
								}
							}
						}
					}
				}

			}
		}
	}
	if (note.startWith("\\^\\^")) {
		if (lastUpOrDown == "^^") {
			return note.replace("^^", "");
		} else {
			return note;
		}
	} else if (note.startWith("\\^")) {
		// 如果该音符前没有升降符号，或者该音符前已经有升号，则该音符不需要加升号
		if (lastUpOrDown == "^") {
			return note.replace("^", "");
		} else {
			return note;
		}
	} else if (note.startWith("\\_\\_")) {
		if (lastUpOrDown == "__") {
			return note.replace("__", "");
		} else {
			return note;
		}
	} else if (note.startWith("\\_")) {
		// 如果该音符前没有升降符号，或者该音符前已经有升号，则该音符不需要加升号
		if (lastUpOrDown == "_") {
			return note.replace("_", "");
		} else {
			return note;
		}
	} else {
		// 如果该音符前没有升降符号，或者该音符前已经有升号，则该音符不需要加升号
		if (lastUpOrDown == "=") {
			var rnote = restoreNote(key, note);
			return rnote.replace("=", "");
		} else {
			if (lastUpOrDown != "") {
				if (note.indexOf("=") > -1) {
					return note;
				}
				// return "=" + note;
				return restoreNote(key, note);
			} else {
				return note;
			}
		}

	}

	return note;
}
// 根据调式取得还原的音符，如bA调的A其还原音符为_A
function restoreNote(key, note) {
	var sigs = sd.KeySignature;
	var keynote = "";
	for (var i = 0; i < sigs.length; i++) {
		if (key == sigs[i].key) {
			var val = sigs[i].val;
			if (val != "") {
				var notes = val.split(",");
				for (var j = 0; j < notes.length; j++) {
					// 符号相应的调子的音符，则去掉前面的升降号，如^F->F
					var tmpnote = note.replace(",", "").replace("'", "").replaceAll("\\/", "").replace(/[0-9]{0,}/g, "").toUpperCase();
					if (notes[j].toUpperCase().indexOf(tmpnote) > -1) {
						keynote = notes[j].substr(0, 1) + note;
					}
				}
			}
		}
	}
	if (keynote == "") {
		return "=" + note;
	} else {
		return keynote;
	}
}

function playNote(note) {
	var keyBoards = sd.KeyBoard;
	var parentIndex = 0;
	var index_all = 0;
	for (var i = 0; i < keyBoards.length; i++) {
		var group = keyBoards[i];
		var notes = group.val;
		for (var j = 0; j < notes.length; j++) {
			if (notes[j] == note) {
				/*
				 * if(i<8){ var c0 = sd.SoundIndex.C0; index_all = i * 12 +
				 * c0[j]; }else{ var b0 = sd.SoundIndex.B0; index_all = (i-8) *
				 * 12 + b0[j]; }
				 * play_one_note(index_all,$("#L").val(),$("#Q").val(),$("#Q_V").val())
				 */
				insert = false;
				// $("#pianoKeysWhite div[group="+group.group
				// +"]>div").eq(j).click();
				clickPianoKey(group.group, j);
				insert = true;
				return;
			}
		}
	}
}
// 从字符串中取出所有音符
function getNotes(str) {
	//扩展音符
	var extendNotes = "";
	for(var i=0;i<extnotes.length;i++){
		extendNotes += extnotes[i].char;
	}
	var reg = new RegExp("[cdefgabzCDEFGABZ"+extendNotes+"](\,*)(\'*)(\/*)([1-9]*)","g");
	var result = str.match(reg);
	return result;
}
// 增加或减少音符长度
function editNoteLen(selectText, editType) {
	var lastchar = selectText.substr(selectText.length - 1, selectText.length);
	var selectText2 = selectText.substr(0, selectText.length - 1);
	var numstr = "0123456789";
	var result = selectText;
	if (numstr.indexOf(lastchar) > -1) {
		// 如果结尾是数字
		if (editType == "2") {
			if (parseInt(lastchar) >= 8) {
				// 这里最多只算到 * 8
				$("#source").focus();
				return result;
			}
			// 增加时长
			editType = parseInt(lastchar) * 2;
		} else if (editType == "/") {
			// 减少时长
			editType = parseInt(lastchar) / 2;
			if (editType == "1") {
				editType = "";
			}
		}
		result = selectText2 + editType;
	} else if (lastchar == "/") {
		if (editType == "2") {
			result = selectText.substr(0, selectText.length - 1);
		} else {
			result = selectText + editType;
		}
	} else {
		result = selectText + editType;
	}
	return result;
}
// 取音符区域的内容，返回的是一个对象数组，包括属性v:表示是哪一个声部，str：表示对应声部的谱子(如果是多谱表，返回的是多个数组)
function getNoteContent() {
	var content = $("#source").val();
	content = content + "\n";
	// 这里去掉歌词
	content = content.replaceAll(/w:.[^\n]*\n/g, "");
	var lines = content.split("\n");
	var str = "";
	var arr = new Array();
	var vPattern = /V:[1-9]/;
	if (lines != null) {
		var lastV = "";

		var newV = false;
		for (var i = 0; i < lines.length; i++) {

			var exist = false;
			if (lines[i].indexOf("V:") > -1) {
				var v = lines[i].match(vPattern);
				if (v != null && v.length > 0) {
					lastV = v[0];
				}
			}
			var line_tmp = lines[i].replaceAll(/\".*\"/g, "");
			if (line_tmp.replace(/\[.[^\]]*\]/, "").replace(/\{.[^\}]*\}/, "").indexOf("|") > -1) {
				var obj = new Object();

				for (var j = 0; j < arr.length; j++) {
					if (arr[j].v == lastV) {
						obj = arr[j];
						obj.str = obj.str + lines[i];
						exist = true;
						break;
					}
				}
				if (!exist) {
					obj.str = lines[i];
					obj.v = lastV;
					arr.push(obj);
				}
			}

		}
	}
	return arr;
}
// 取标题区域内容
function getTitleContent() {
	var content = $("#source").val();
	// 这里去掉歌词
	content = content.replaceAll(/w:.[^\n]*\n/g, "");
	var lines = content.split("\n");
	var str = "";
	if (lines != null) {
		for (var i = 0; i < lines.length; i++) {
			var line_tmp = lines[i].replaceAll(/\".*\"/g, "");
			if (line_tmp.replace(/\[.[^\]]*\]/, "").replace(/\{.[^\}]*\}/, "").indexOf("|") < 0) {
				str = str + lines[i] + "\n";
			} else {
				break;
			}
		}
	}
	return str;
}
// 取
function getNoteAndLyricContent() {
	var content = $("#source").val();
	// 这里去掉歌词
	var lines = content.split("\n");
	var str = "";
	if (lines != null) {
		for (var i = 0; i < lines.length; i++) {
			var line_tmp = lines[i].replaceAll(/\".*\"/g, "");
			if (line_tmp.replace(/\[.[^\]]*\]/, "").replace(/\{.[^\}]*\}/, "").indexOf("|") > -1 || line_tmp.replace(/\[.[^\]]*\]/, "").replace(/\{.[^\}]*\}/, "").indexOf("w:") > -1) {
				str = str + lines[i] + "\n";
			}
		}
	}
	return str;
}

// 取小节内前一个升降符号
function getNodePreUpOrDownSymbol() {
	try {
		var startPos = getStartPos(document.getElementById("source"));
		var content = $("#source").val();
		var idx = content.lastIndexOf("|")
		if (idx == -1) {
			idx = content.lastIndexOf("\n");
		}
		var nodeStr = content.substring(idx + 1, startPos);
		var max = -1;
		var s = "";
		// 最后一个升符的位置
		var u = nodeStr.lastIndexOf("^");
		if (u > max) {
			max = u;
			s = "^";
		}
		// 最后一个还原符的位置
		var e = nodeStr.lastIndexOf("=");
		if (e > max) {
			max = e;
			s = "=";
		}
		// 最后一个降符的位置
		var d = nodeStr.lastIndexOf("_");
		if (d > max) {
			max = d;
			s = "_";
		}
		console.log(nodeStr.substr(max, 2))
		// return nodeStr.substr(max,2);
		return s;
	} catch (e) {
		return "";
	}

}

// 取小节内所有带升降号、还原号的音符
function getNotesByBarLine() {
	var pattern = /(\^{1,2}[a-zA-Z],*)|(\=[a-zA-Z],*)|(\_{1,2}[a-zA-Z],*)/g;
	var startPos = getStartPos(document.getElementById("source"));
	if(document.getElementById("source").value.length==startPos){
		startPos = $("svg rect[style='fill-opacity: 0.4']").attr("istart");
	}
	var content = $("#source").val();
	content = replaceBlankLine(content).substr(0, startPos);

	var idx = content.lastIndexOf("|");
	if (idx == -1) {
		idx = content.lastIndexOf("\n");
	}
	var nodeStr = content.substring(idx + 1, startPos);
	var result = nodeStr.match(pattern);
	console.log(result);
	return result;
}
// 判断当前输入的音符是否需要加升降号
function getLastFlag(notes, currentNote) {
	console.log("currentNote:" + currentNote)
	var flag = "";
	if (notes != null) {
		for (var i = 0; i < notes.length; i++) {
			if (notes[i].toLowerCase().indexOf(currentNote.replaceAll("\\^", "").replaceAll("\\_", "").replace("=", "").toLowerCase()) > -1) {
				if (notes[i].indexOf("^^") > -1) {
					flag = "^^";
				} else if (notes[i].indexOf("__") > -1) {
					flag = "__";
				} else {
					flag = notes[i].substring(0, 1);
				}
			}
		}
	}
	console.log("flag:" + flag)
	return flag;
}
