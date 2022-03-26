// 定义常量
var appCode = 'imusic';
var domain = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "");
var host = domain + "/" + appCode + "/";
var C = {
	HOST : host,// 域名
	SOCKET_INTERACT : ((location.protocol == 'http:') ? 'ws://' : 'wss://') + location.hostname + (location.port ? ":" + location.port : "") + '/' + appCode + '/socketInteract/', // 互动socket链接地址
	// SOCKET_TEAC : "wss://192.168.3.116:8088/", // exe教师端Url
	SOCKET_TEAC : "ws://127.0.0.1:8088/", // exe教师端Url
	SOCKET_STU : "ws://127.0.0.1:8089/", // exe学生端Url
	// SOCKET_STU : "wss://192.168.3.116:8089/", // exe学生端Url
	VERSION : '4.1.3',
	TEST : false,
	OSS_URL : 'https://cyydl.oss-cn-shenzhen.aliyuncs.com',
	// OSS_URL : '//aijida.oss-cn-shenzhen.aliyuncs.com',
	// FILE_UPLOAD_URL : 'http://file.ixzds.com/file/upload',// 文件服務器上传地址
	// FILE_VIEW_URL : 'http://file.ixzds.com/file/view/',// 文件服務器预览地址
	// FILE_DOWN_URL : 'http://file.ixzds.com/file/down/',// 文件服務器下载地址
	// FILE_DEL_URL : 'http://file.ixzds.com/file/del/',// 文件服務器删除地址
	FILE_URL : '',// 文件服務器地址，对应系统参数400 http://csfile.ixzds.com/file
	FILE_URL_UPLOAD_URL : domain + '/savefileurl',// 文件服務器上传地址，上传默认网络地址图片
	FILE_DB_URL : domain + '/file/savefiledb',// 文件服務器上传地址，上传默认网络地址图片
	FILE_UPLOAD_URL : domain + '/file/upload',// 文件服務器上传地址 http://csfile.ixzds.com/file/upload
	FILE_VIEW_URL : domain + '/file/view/',// 文件服務器预览地址
	FILE_DOWN_URL : domain + '/file/down/',// 文件服務器下载地址
	FILE_DEL_URL : domain + '/file/del/',// 文件服務器删除地址
	FILE_UPDATE_URL : domain + '/file/update/',// 文件服務器删除地址
	FILE_APPID : appCode,// 文件服務器删除地址
	PYTB_URL : domain + '/abc/pytb.html?groupid=&attachid=',// 谱音同步的地址，对应系统参数1382http://abc.ixzds.com/abc/main.html
	PYTB_NOTE_URL : domain + '/abc/pytb.html?groupid=&attachid=',// 谱音同步的地址，对应系统参数1382http://abc.ixzds.com/abc/main.html
	//ABC_URL : domain + '/abc/abc.html',// 打谱软件的地址，对应系统参数1382http://abc.ixzds.com/abc/main.html
	ABC_URL : domain + '/abc/editor.html',// 打谱软件的地址，对应系统参数1382http://abc.ixzds.com/abc/main.html
	// INTONATE_PRAC_URL :
	// 'https://imusic.ixzds.com/imusic/HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=know.quesiton.intonate!gotoIntonateParc',//
	// 单音视唱的地址
	// SCHOOL_LOGO_URL :
	// '//cyydl.oss-cn-shenzhen.aliyuncs.com/imusic/def/school_logo_def.png',//
	// 默认学校封面图
	// TRAIN_COVER_URL :
	// '//cyydl.oss-cn-shenzhen.aliyuncs.com/imusic/class/picture/train_cover_def.png',//
	// 默认班级封面图
	// COURSE_COVER_URL :
	// '//cyydl.oss-cn-shenzhen.aliyuncs.com/imusic/def/course_def.png',//
	// 默认课程封面图
	// HEAD_URL :
	// '//cyydl.oss-cn-shenzhen.aliyuncs.com/imusic/def/head_def.jpg',// 默认人头像地址
	// STANDARD_TONE_URL :
	// 'http://music.ixzds.com/attach/yysykt/musiclib/standard/standard_tone.mp3',//
	// 标准音地址
	INTONATE_PRAC_URL : host + 'HttpChannel?action=WEBSITE_ACTION&BUSINESS_TYPE=know.quesiton.intonate!gotoIntonateParc',// 单音视唱的地址
	SCHOOL_LOGO_URL : host + 'imusic/images/default/school_logo_def.png',// 默认学校封面图
	TRAIN_COVER_URL : host + 'imusic/images/default/train_cover_def.png',// 默认班级封面图
	COURSE_COVER_URL : host + 'imusic/images/default/course_def.png',// 默认课程封面图
	CHOIR_COVER_URL : host + 'imusic/images/default/choir_cover_def.png', // 默认合唱团封面图
	HEAD_URL : host + 'imusic/images/default/head_def.jpg',// 默认人头像地址
	STANDARD_TONE_URL : host + 'imusic/pages/main/audios/standard_tone.mp3',// 标准音地址
	THEORY_TEACHING_COURSE_ID : 'COb8d13c27d6bb44e691bdea4387730d', // 乐理教学系统的课程ID
	/**
	 * 审核状态：0、待审核 ；1、已通过；2、未通过
	 */
	AUDIT_STATE_NOT : "0",
	/**
	 * 审核状态：0、待审核 ；1、已通过；2、未通过
	 */
	AUDIT_STATE_PASS : "1",
	/**
	 * 审核状态：0、待审核 ；1、已通过；2、未通过
	 */
	AUDIT_STATE_BACK : "2",
	/**
	 * 用户类型：1、教师 ；2、学生
	 */
	USERTYPE_TEAC : "1",
	/**
	 * 用户类型：1、教师 ；2、学生
	 */
	USERTYPE_STU : "2",
	/* ********** 知识点类型begin *********** */
	/**
	 * 知识类型：1、章节 ；2、课；3、学习内容；4、乐理作业；5、视唱训练；6、节奏训练；7、听力训练
	 */
	KNOW_TYPE_CHAPTER : "1",
	/**
	 * 2、课；1、章节 ；3、学习内容；4、乐理作业；5、视唱训练；6、节奏训练；7、听力训练
	 */
	KNOW_TYPE_LESSON : "2",
	/**
	 * 3、学习内容；1、章节 ；2、课；4、乐理作业；5、视唱训练；6、节奏训练；7、听力训练
	 */
	KNOW_TYPE_NR : "3",
	/**
	 * 4、乐理作业；1、章节 ；2、课；3、学习内容；5、视唱训练；6、节奏训练；7、听力训练
	 */
	KNOW_TYPE_YL : "4",
	/**
	 * 5、视唱训练；1、章节 ；2、课；3、学习内容；4、乐理作业；6、节奏训练；7、听力训练
	 */
	KNOW_TYPE_SC : "5",
	/**
	 * 6、节奏训练；1、章节 ；2、课；3、学习内容；4、乐理作业；5、视唱训练；7、听力训练
	 */
	KNOW_TYPE_JZ : "6",
	/**
	 * 7、听力训练；1、章节 ；2、课；3、学习内容；4、乐理作业；5、视唱训练；6、节奏训练；
	 */
	KNOW_TYPE_TL : "7",

	/* ********** 知识点展示结构begin *********** */
	/**
	 * 1:上下；2：左右；3：下上；4：右左
	 */
	KNOW_SHOW_TYPE_UPDOWN : "1",
	/**
	 * 1:上下；2：左右；3：下上；4：右左
	 */
	KNOW_SHOW_TYPE_LERI : "2",
	/**
	 * 1:上下；2：左右；3：下上；4：右左
	 */
	KNOW_SHOW_TYPE_DOWNUP : "3",
	/**
	 * 1:上下；2：左右；3：下上；4：右左
	 */
	KNOW_SHOW_TYPE_RILE : "4",
	/* ********** 知识点内容类型 begin *********** */
	/**
	 * 知识点内容类型 1: 文字, 2: 图片, 3: 视频, 4：音频, 5：ABC内容
	 */
	KNOW_CONTENT_TYPE : "KNOW_CONTENT_TYPE",

	/**
	 * 1: 文字, 2: 图片, 3: 视频, 4：音频, 5：ABC内容
	 */
	KNOW_CONTENT_TYPE_TXT : "1",
	/**
	 * 2: 图片, 1: 文字, 3: 视频, 4：音频, 5：ABC内容
	 */
	KNOW_CONTENT_TYPE_PIC : "2",
	/**
	 * 3: 视频, 1: 文字, 2: 图片, 4：音频, 5：ABC内容
	 */
	KNOW_CONTENT_TYPE_VEDIO : "3",
	/**
	 * 4：音频；3: 视频, 1: 文字, 2: 图片, 5：ABC内容
	 */
	KNOW_CONTENT_TYPE_AUDIO : "4",
	/**
	 * 5：ABC内容；3: 视频, 1: 文字, 2: 图片, 4：音频
	 */
	KNOW_CONTENT_TYPE_ABC : "5",
	/* ********** 交互类型 begin *********** */
	/**
	 * 交互类型 1: 点击看大图, 2:点击播放声音, 3: 点击播放声音并轮播, 4: 选择对错,
	 */
	INTER_TYPE : "INTER_TYPE",
	/**
	 * 1: 点击看大图, 2: 点击播放声音, 3: 点击播放声音并轮播, 4: 选择对错,
	 */
	INTER_TYPE_BIG : "1",

	/**
	 * 2: 点击播放声音, 1: 点击看大图, 3: 点击播放声音并轮播, 4: 选择对错,
	 */
	INTER_TYPE_VOICE : "2",

	/**
	 * 3: 点击播放声音并轮播, 1: 点击看大图, 2: 点击播放声音, 4: 选择对错,
	 */
	INTER_TYPE_CAROUSEL : "3",

	/**
	 * 3: 点击播放声音并轮播, 1: 点击看大图, 2: 点击播放声音, 4: 选择对错,
	 */
	INTER_TYPE_IS_RIGHT : "4",
	/* ********** 交互类型 end *********** */
	PAGER_PARAMS : getPager(),
	LIST_LOADING : '<i class="list-loading"></i>数据加载中...',
	// 试题类型
	QS_TYPE : {
		/**
		 * "O1"："单选题"，"O2"："多选题"，"O3"："判断题"，"O4"："完形填空(单选题)"，"O5"："完形填空(填空题)"，"O6"： "组合题"，"S1"： "论述题"，"S2"："材料分析题" ，"S3"："简答题"，"S4"： "操作题"，"O5"："完形填空(填空题)"
		 */
		SINGLE : "O1",
		/**
		 * "O2"："多选题"，"O1"："单选题"，"O3"："判断题"，"O4"："完形填空(单选题)"，"O5"："完形填空(填空题)"，"O6"： "组合题"，"S1"： "论述题"，"S2"："材料分析题" ，"S3"："简答题"，"S4"： "操作题"，"O5"："完形填空(填空题)"
		 */
		MULTI : "O2",
		/**
		 * "O3"："判断题"，"O1"："单选题"，"O2"："多选题"，"O4"："完形填空(单选题)"，"O5"："完形填空(填空题)"，"O6"： "组合题"，"S1"： "论述题"，"S2"："材料分析题" ，"S3"："简答题"，"S4"： "操作题"，"O5"："完形填空(填空题)"
		 */
		JUDGE : "O3",
		/**
		 * "O4"："完形填空(单选题)"，"O3"："判断题"，"O1"："单选题"，"O2"："多选题"，"O5"："完形填空(填空题)"，"O6"： "组合题"，"S1"： "论述题"，"S2"："材料分析题" ，"S3"："简答题"，"S4"： "操作题"，"O5"："完形填空(填空题)"
		 */
		CLOZE_SINGLE : "O4",
		/**
		 * "O5"："完形填空(填空题)"，"O1"："单选题"，"O2"："多选题"，"O3"："判断题"，"O4"："完形填空(单选题)"，"O6"： "组合题"，"S1"： "论述题"， "S2"："材料分析题"，"S3"： "简答题"，"S4"："操作题"
		 */
		CLOZE_FILL : "O5",
		/**
		 * "O6"："组合题"，"O1"："单选题"，"O2"："多选题"，"O3"："判断题"，"O4"："完形填空(单选题)"，"O5"： "完形填空(填空题)"，"S1"： "论述题"， "S2"3"： "简答题"，"S4"："操作题"
		 */
		COMBINE : "O6",
		/**
		 * "O7"："完形填空"，"O6"："组合题"，"O1"："单选题"，"O2"："多选题"，"O3"："判断题"，"O4"："完形填空(单选题)"，"O5"： "完形填空(填空题)"，"S1"： "论述题"， "S2"3"： "简答题"，"S4"："操作题"
		 */
		CLOZE : "O7",
		/**
		 * "O8"："连线题（匹配）"，"O7"："完形填空"，"O6"："组合题"，"O1"："单选题"，"O2"："多选题"，"O3"："判断题"，"O4"："完形填空(单选题)"，"O5"： "完形填空(填空题)"，"S1"： "论述题"， "S2"3"： "简答题"，"S4"："操作题"
		 */
		MATCH : "O8",
		/**
		 * "O9"："素材题"，"S1"："论述题"，"O1"："单选题"，"O2"："多选题"，"O3"："判断题"，"O4"："完形填空(单选题)"，"O5"： "完形填空(填空题)"，"O6"："组合题"，"S2"："材料分析题" ，"S3"："简答题"，"S4"： "操作题"
		 */
		SUCAI : "O9",
		/**
		 * "O10"："填谱题"，"O9"："素材题"，"S1"："论述题"，"O1"："单选题"，"O2"："多选题"，"O3"："判断题"，"O4"："完形填空(单选题)"，"O5"： "完形填空(填空题)"，"O6"："组合题"，"S2"："材料分析题" ，"S3"："简答题"，"S4"： "操作题"
		 */
		STUFF : "O10",
		PUZZLE : "OPUZZLE", // 拼图题
		DRAG : "ODRAG", // 拖拽题
		/**
		 * "S1"："论述题"，"O1"："单选题"，"O2"："多选题"，"O3"："判断题"，"O4"："完形填空(单选题)"，"O5"： "完形填空(填空题)"，"O6"："组合题"，"S2"："材料分析题" ，"S3"："简答题"，"S4"： "操作题"
		 */
		THESIS : "S1",
		/**
		 * "S2"："材料分析题"，"O1"："单选题"，"O2"："多选题"，"O3"："判断题"，"O4"："完形填空(单选题)"，"O5"： "完形填空(填空题)"，"O6"："组合题"，"S1"："论述题" ，"S3"："简答题"，"S4"： "操作题"
		 */
		ANALYSE : "S2",
		/**
		 * "S3"："简答题"，"O1"："单选题"，"O2"："多选题"，"O3"："判断题"，"O4"："完形填空(单选题)"，"O5"： "完形填空(填空题)"，"O6"："组合题"，"S1"："论述题"， "S2"："材料分析题"，"S4"： "操作题"
		 */
		SHORT : "S3",
		/**
		 * "S4"："操作题"，"O1"："单选题"，"O2"："多选题"，"O3"："判断题"，"O4"："完形填空(单选题)"，"O5"： "完形填空(填空题)"，"O6"："组合题"，"S1"："论述题"， "S2"："材料分析题"，"S3"： "简答题"
		 */
		OPERATE : "S4"
	},
	SIGN : {
		/**
		 * 签到时间类型: 全天day、自定义custom
		 */
		TIME_TYPE_DAY : "day",
		/**
		 * 打卡方式: 点击签到click，发帖签到post
		 */
		SIGN_TYPE_CLICK : "click",
		/**
		 * 打卡方式: 发帖签到post，点击签到click
		 */
		SIGN_TYPE_POST : "post",
		/**
		 * 打卡方式: 正常签到normal、缺勤absence、迟到late
		 */
		RECORD_STATUS_NORMAL : "normal",
		/**
		 * 打卡方式: 正常签到normal、缺勤absence、迟到late
		 */
		RECORD_STATUS_ABSENCE : "absence",
		/**
		 * 打卡方式: 正常签到normal、缺勤absence、迟到late
		 */
		RECORD_STATUS_LATE : "late"
	},
	/**
	 * 帖子类型，1：帖子，2：作业
	 */
	POST_TYPE_POST : 1,
	/**
	 * 1：帖子，2：作业
	 */
	POST_TYPE_WORK : 2,
	/**
	 * 班级缴费类型 1：学员线上缴费；2：学员线下缴费；
	 */
	PAY_WAY_ONLINE : 1,
	/**
	 * 班级缴费类型 2：学员线下缴费；1：学员线上缴费；
	 */
	PAY_WAY_UNDERLINE : 2,

	/**
	 * 订单状态：0、待支付 ；1、已支付；2、退单；3、取消
	 */
	ORDER_STATUS_NOT : "0",
	/**
	 * 订单状态：0、待支付 ；1、已支付；2、退单；3、取消
	 */
	ORDER_STATUS_YES : "1",
	/**
	 * 订单状态：0、待支付 ；1、已支付；2、退单；3、取消
	 */
	ORDER_STATUS_BACK : "2",
	/**
	 * 订单状态：0、待支付 ；1、已支付；2、退单；3、取消
	 */
	ORDER_STATUS_FILE : "3",

	EXAM_QS_CATE : { // 试卷考题类别
		/**
		 * jz:节奏; tyxw:听音选文; tyxp:听音选谱; yl:乐理; sc:视唱;
		 */
		JZ : 'jz',
		/**
		 * jz:节奏; tyxw:听音选文; tyxp:听音选谱; yl:乐理; sc:视唱;
		 */
		TYXW : 'tyxw',
		/**
		 * jz:节奏; tyxw:听音选文; tyxp:听音选谱; yl:乐理; sc:视唱;
		 */
		TYXP : 'tyxp',
		/**
		 * jz:节奏; tyxw:听音选文; tyxp:听音选谱; yl:乐理; sc:视唱;
		 */
		YL : 'yl',
		/**
		 * jz:节奏; tyxw:听音选文; tyxp:听音选谱; yl:乐理; sc:视唱;
		 */
		SC : 'sc',
		PIANO : 'piano',
		VOCAL : 'vocal',
		QSFX : 'qsfx', // 曲式分析
		JXBZ : 'jxbz', // 即兴伴奏
		ZG : 'zg', // 主观论述题
		CZ : 'cz', // 操作题（例如：和声、即兴伴奏等）
		HH : 'hh'

	},
	QS_STATUS : { // 题库审核状态： 0:待审核, 1:已审核, 2:已发布
		NOT : '0',
		PASS : '1',
		PUBLIC : '2'
	},
	REF_TYPE : { // 知识点引用类型： ref: 引用, copy：复制
		REF : 'ref',
		COPY : 'copy'
	},
	/**
	 * 指标类型：1: 平台登录, 2: 视频学习, 3: 乐理作业, 4: 知识点, 5: 视唱, 6: 听力, yltl: 知识与听力
	 */
	NORM_TYPE_LOGIN : "1",
	/**
	 * 2: 视频学习, 1: 平台登录, 3: 乐理作业, 4: 知识点, 5: 视唱, 6: 听力, yltl: 知识与听力
	 */
	NORM_TYPE_VIDEO : "2",
	/**
	 * 3: 乐理作业, 1: 平台登录, 2: 视频学习, 4: 知识点, 5: 视唱, 6: 听力, yltl: 知识与听力
	 */
	NORM_TYPE_YL : "3",
	/**
	 * 4: 知识点, 1: 平台登录, 2: 视频学习, 3: 乐理作业, 5: 视唱, 6: 听力, yltl: 知识与听力
	 */
	NORM_TYPE_KNOW : "4",
	/**
	 * 5: 视唱, 1: 平台登录, 2: 视频学习, 3: 乐理作业, 4: 知识点, 6: 听力, yltl: 知识与听力
	 */
	NORM_TYPE_SC : "5",
	/**
	 * 6: 听力, 1: 平台登录, 2: 视频学习, 3: 乐理作业, 4: 知识点, 5: 视唱, 6: 听力, yltl: 知识与听力
	 */
	NORM_TYPE_TL : "6",
	/**
	 * piano: 钢琴弹奏, 1: 平台登录, 2: 视频学习, 3: 乐理作业, 4: 知识点, 5: 视唱, 6: 听力, yltl: 知识与听力
	 */
	NORM_TYPE_PIANO : "piano",
	/**
	 * interact: 课堂互动, 1: 平台登录, 2: 视频学习, 3: 乐理作业, 4: 知识点, 5: 视唱, 6: 听力, yltl: 知识与听力
	 */
	NORM_TYPE_INTERACT : "interact",
	/**
	 * yltl: 知识与听力, interact: 课堂互动, 1: 平台登录, 2: 视频学习, 3: 乐理作业, 4: 知识点, 5: 视唱, 6: 听力
	 */
	NORM_TYPE_YLTL : "yltl",

	/**
	 * 1: 待发布; 2: 启用; 3: 暂停; 4: 归档; 5: 取消;
	 */
	TRAIN_STATUS_NOT : "1",
	/**
	 * 2: 启用; 1: 待发布; 3: 暂停; 4: 归档; 5: 取消;
	 */
	TRAIN_STATUS_ING : "2",
	/**
	 * 3: 暂停; 1: 待发布; 2: 启用; 4: 归档; 5: 取消;
	 */
	TRAIN_STATUS_STOP : "3",
	/**
	 * 4: 归档; 1: 待发布; 2: 启用; 3: 暂停; 5: 取消;
	 */
	TRAIN_STATUS_ARCHIVE : "4",
	/**
	 * 5: 取消; 1: 待发布; 2: 启用; 3: 暂停; 4: 归档;
	 */
	TRAIN_STATUS_CANCEL : "5",

	/**
	 * 学期总评成绩的课程ID值
	 */
	TERM_COURSE_ID : "termScore",
	INTERACT : { // 互动课堂的常量
		CLASS_STATUS : { // 上课记录状态： start: 上课中, end：下课了
			START : 'start',
			END : 'end'
		},
		INTERACT_STATUS : { // 活动课堂状态： start: 互动中, end：已结束
			START : 'start',
			END : 'end'
		},
		CALL_STATUS : { // 点名状态：not: 未点名, normal：正常，late: 迟到
			NOT : 'not',
			NORMAL : 'normal',
			LATE : 'late'
		},
		PRAC_MODEL : { // 互动课程->钢琴任务类型 prac: 练习, task: 作业
			PRAC : 'prac',
			TASK : 'task'
		},
		INTE_TYPE : { // 互动类型 all: 全班答题, random: 随机选人 appoint: 指定学生
			ALL : 'all',
			RANDOM : 'random',
			APPOINT : 'appoint'
		}
	},
	COURSE : { // 课程的常量
		COURSE_CLASS : { // 课程类别 1: 学习中心, 2: 拓展训练, base:基础训练, interact: 互动课堂, after: 课后服务（第二课堂）
			STUDY : '1',
			PRAC : '2',
			INTERACT : 'interact',
			AFTER : 'after',
			BASE : 'base'
		},
		COURSE_TYPE : { // 课程类型 theory: 乐理, piano: 钢琴, vocal: 声乐,other: 其他,
			// choir: 合唱
			THEORY : 'theory',
			PIANO : 'piano',
			VOCAL : 'vocal',
			CHOIR : 'choir',
			OTHER : 'other',
			ART : 'art',
		}
	},
	EXAM : { // 试卷的常量
		USE_TYPE : { // 课程类别 task: 作业, interact: 互动
			INTERACT : 'interact',
			TASK : 'task'
		},
		EXAM_TYPE : { // 试卷类型 theory: 乐理, piano: 钢琴, vocal:声乐，jz:节奏;
			// tyxw:听音选文; tyxp:听音选谱;
			YL : 'yl',
			THEORY : 'yl',
			PIANO : 'piano',
			VOCAL : 'vocal',
			SC : 'sc',
			JZ : 'jz',
			TYXW : 'tyxw',
			TYXP : 'tyxp',
			JXBZ : 'jxbz',
			HH : 'hh',
		}
	},
	AUTH_LEVEL : { // 权限类型
		USER : 'user'
	},
	NORM_ID : {
		// 课堂即时表现
		KTJSBX : "ktjsbx",
		// 课堂即时表现->习惯
		KTJSBX_XG : "ktjsbx_xg",
		// 课堂即时表现->习惯->出勤
		KTJSBX_XG_CQ : "ktjsbx_xg_cq",
		// 课堂即时表现->习惯->学具
		KTJSBX_XG_XJ : "ktjsbx_xg_xj",
		// 课堂即时表现->态度
		KTJSBX_TD : "ktjsbx_td",
		// 课堂即时表现->态度->纪律
		KTJSBX_TD_JL : "ktjsbx_td_jl",
		// 课堂即时表现->态度->参与度
		KTJSBX_TD_CYD : "ktjsbx_td_cyd",
		// 阶段性测评
		JDXCP : "jdxcp",
		// 阶段性测评->知识技能
		JDXCP_ZSJN : "jdxcp_zsjn",
		// 阶段性测评->知识技能->听
		JDXCP_ZSJN_T : "jdxcp_zsjn_t",
		// 阶段性测评->音乐表现
		JDXCP_YYBBX : "jdxcp_yybbx",
		// 阶段性测评->音乐表现->唱
		JDXCP_YYBBX_C : "jdxcp_yybbx_c",
		// 阶段性测评->音乐表现->奏、演、创
		JDXCP_YYBBX_ZYC : "jdxcp_yybbx_zyc",
		// 终结性测评（期末）
		ZJXCP : "zjxcp",
		// 终结性测评（期末）->必测一
		ZJXCP_BCY : "zjxcp_bcy",
		// 终结性测评（期末）->必测一->听
		ZJXCP_BCY_T : "zjxcp_bcy_t",
		// 终结性测评（期末）->必测一->班级合唱
		ZJXCP_BCY_BJHC : "zjxcp_bcy_bjhc",
		// 终结性测评（期末）->必测二（二选一）
		ZJXCP_BCE : "zjxcp_bce",
		// 终结性测评（期末）->必测二（二选一）->唱
		ZJXCP_BCE_C : "zjxcp_bce_c",
		// 终结性测评（期末）->必测二（二选一）->奏
		ZJXCP_BCE_Z : "zjxcp_bce_z",
		// 终结性测评（期末）->选测（五选一）
		ZJXCP_XC : "zjxcp_xc",
		// 终结性测评（期末）->选测（五选一）->律动
		ZJXCP_XC_LD : "zjxcp_xc_ld",
		// 终结性测评（期末）->选测（五选一）->节奏
		ZJXCP_XC_JZ : "zjxcp_xc_jz",
		// 终结性测评（期末）->选测（五选一）->旋律
		ZJXCP_XC_XL : "zjxcp_xc_xl",
		// 终结性测评（期末）->选测（五选一）->指挥
		ZJXCP_XC_ZH : "zjxcp_xc_zh",
		// 终结性测评（期末）->选测（五选一）->打击乐器
		ZJXCP_XC_DJYQ : "zjxcp_xc_djyq",
		// 终结性测评（期末）->活动表现（加分项）
		ZJXCP_HDBX : "zjxcp_hdbx",
		// 终结性测评（期末）->活动表现（加分项）->课外活动
		ZJXCP_HDBX_KWHD : "zjxcp_hdbx_kwhd",
		// 终结性测评（期末）->活动表现（加分项）->校外学习
		ZJXCP_HDBX_XWXX : "zjxcp_hdbx_xwxx",

		/** 课堂即时表现 */
		ART_KTJSBX : "art_ktjsbx",
		/** 课堂即时表现->习惯 */
		ART_KTJSBX_XG : "art_ktjsbx_xg",
		/** 课堂即时表现->习惯->出勤 */
		ART_KTJSBX_XG_CQ : "art_ktjsbx_xg_cq",
		/** 课堂即时表现->习惯->学具 */
		ART_KTJSBX_XG_XJ : "art_ktjsbx_xg_xj",
		/** 课堂即时表现->态度 */
		ART_KTJSBX_TD : "art_ktjsbx_td",
		/** 课堂即时表现->态度->纪律 */
		ART_KTJSBX_TD_JL : "art_ktjsbx_td_jl",
		/** 课堂即时表现->态度->参与度 */
		ART_KTJSBX_TD_CYD : "art_ktjsbx_td_cyd",
		/** 阶段性测评 */
		ART_JDXCP : "art_jdxcp",
		/** 阶段性测评->知识技能 */
		ART_JDXCP_ZSJN : "art_jdxcp_zsjn",
		/** 阶段性测评->知识技能->知识 */
		ART_JDXCP_ZSJN_ZS : "art_jdxcp_zsjn_zs",
		/** 阶段性测评->美术表现 */
		ART_JDXCP_MSBX : "art_jdxcp_msbx",
		/** 阶段性测评->美术表现->绘画 */
		ART_JDXCP_MSBX_HH : "art_jdxcp_yybbx_hh",
		/** 终结性测评（期末） */
		ART_ZJXCP : "art_zjxcp",
		/** 终结性测评（期末）->必测一 */
		ART_ZJXCP_BCY : "art_zjxcp_bcy",
		/** 终结性测评（期末）->必测一->知识 */
		ART_ZJXCP_BCY_ZS : "art_zjxcp_bcy_zs",
		/** 终结性测评（期末）->必测二 */
		ART_ZJXCP_BCE : "art_zjxcp_bce",
		/** 终结性测评（期末）->必测二->绘画 */
		ART_ZJXCP_BCE_HH : "art_zjxcp_bce_hh",
		/** 终结性测评（期末）->活动表现（加分项） */
		ART_ZJXCP_HDBX : "art_zjxcp_hdbx",
		/** 终结性测评（期末）->活动表现（加分项）->课外活动 */
		ART_ZJXCP_HDBX_KWHD : "art_zjxcp_hdbx_kwhd",
		/** 终结性测评（期末）->活动表现（加分项）->校外学习 */
		ART_ZJXCP_HDBX_XWXX : "art_zjxcp_hdbx_xwxx"
	}
}

/**
 * 初始化文件上传、在线打谱等URL
 * 
 * @returns
 */
function setWxFileUrl(fileUrl) {
	C.FILE_URL = fileUrl;
	if (location.href.indexOf("https") != -1 && C.FILE_URL.indexOf("https") == -1) {
		C.FILE_URL = C.FILE_URL.replace("http://", "https://");
	}

	setFileServerUrl();
}

function setFileServerUrl() {
	C.FILE_UPLOAD_URL = C.FILE_URL + '/upload';
	C.FILE_DB_URL = C.FILE_URL + '/savefiledb';
	C.FILE_URL_UPLOAD_URL = C.FILE_URL + '/savefileurl';
	C.FILE_VIEW_URL = C.FILE_URL + '/view/';
	C.FILE_DOWN_URL = C.FILE_URL + '/down/';
	C.FILE_DEL_URL = C.FILE_URL + '/del/';
	C.FILE_UPDATE_URL = C.FILE_URL + '/update/';
}

function setFileUrl(cball) {

	if (C.FILE_URL.indexOf("http") == -1) {
		// 初始化文件服务器地址
		var cookiePlat = getCookie("platform");
		if (cookiePlat && isJsonString(cookiePlat)) {
			var platform = JSON.parse(cookiePlat);
			console.log(platform)
			C.FILE_URL = platform.FILE_URL;
			if (location.href.indexOf("https") != -1 && C.FILE_URL.indexOf("https") == -1) {
				C.FILE_URL = C.FILE_URL.replace("http://", "https://");
			}

			setFileServerUrl();

			if (C.HOST.indexOf("https") == 0 && platform.ABC_URL.indexOf("https") != 0) {
				platform.ABC_URL = platform.ABC_URL.replaceAll("http://", "https://");
			}

			C.ABC_URL = platform.ABC_URL + "?appid=" + C.FILE_APPID + "&groupid=";
			if (platform.PYTB_URL) {
				// http://abc.xmajd.cn/abc/pytb.html?groupid=&attachid=
				C.PYTB_URL = platform.PYTB_URL;
				C.PYTB_NOTE_URL = platform.PYTB_URL.replace("pytb.html", "pytbnote.html");
			}

			// var arr = platform.OSS_URL.split("://");
			// if (arr != null && arr.length > 0) {
			// C.OSS_URL = "//" + arr[1];
			// } else {
			// C.OSS_URL = platform.OSS_URL;
			// }
			C.OSS_URL = platform.OSS_URL;
		}
	}
	if (cball) {
		cball();
	}
}

/**
 * 获取文件上传参数
 * 
 * @returns
 */
function getFileData(options) {
	var user = getUser();
	setFileUrl();

	return $.extend({
		fileUrl : C.FILE_UPLOAD_URL, // 文件服务器上传地址
		showFiles : [], // 上传文件列表，仅用于展示
		files : [], // 控件中的上传文件列表
		fileData : {
			groupid : '',
			orgcode : user ? user.orgCode : location.hostname,
			appid : C.FILE_APPID,
			dir_str : '',
			filecategory : '',
			delserverfile : 1, // 默认文件上传至阿里云后删除
			nonewname : 1
		// 上传的文件是否重命名
		}
	// 文件上传时附带的参数
	}, options);
}
/**
 * 获取分页参数
 * 
 * @returns
 */
function getPager() {
	return { // 分页相关参数
		pagination : {
			currentPage : 1
		// 当前页
		},
		prevText : '上一页',
		nextText : '下一页',
		maxSize : 6, // 最多显示几个按钮
		rows : 10, // 每页显示记录数
		totalRows : 0,// 总记录数
		onePageShow : false
	};
}

/**
 * 获取分页参数，微信端
 * 
 * @returns
 */
function getWxPager() {
	return { // 分页相关参数
		rows : 15, // 每页显示记录数
		totalRows : 0,// 总记录数
		currentPage : 0
	// 当前页
	};
}
