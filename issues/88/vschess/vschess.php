<?php
/*
 * 微思象棋播放器服务器支持组件 PHP 版 V1.1.6
 * http://www.xiaxiangqi.com/
 *
 * Copyright &copy; 2009-2012 飞影阁 版权所有
 * 本程序遵循 GPL 协议
 * http://www.gnu.org/licenses/fdl.html
 *
 * 最后修改日期：北京时间 2013年1月20日
 */

error_reporting(0);

// 棋谱保存功能
if ($_GET['action'] == 'save') {
	$content = trim($_POST['content']);
	if ($content{0} == '[' && $content{1} == 'D') {
		if (mb_detect_encoding($content) == 'UTF-8') {
			$content = iconv('UTF-8', 'GB2312//IGNORE', $content);
		}
		header('Content-Disposition: attachment; filename="'.date('YmdHis').'.txt"');
		echo $content;
	}
	else if ($content{0} == '[') {
		if (mb_detect_encoding($content) == 'UTF-8') {
			$content = iconv('UTF-8', 'GB2312//IGNORE', $content);
		}
		header('Content-Disposition: attachment; filename="'.date('YmdHis').'.pgn"');
		echo $content;
	}
	elseif ($content{0} == '<') {
		if (mb_detect_encoding($content) == 'GB2312') {
			$content = iconv('GB2312', 'UTF-8//IGNORE', $content);
		}
		header('Content-Disposition: attachment; filename="'.date('YmdHis').'.pfc"');
		echo $content;
	}
	elseif ($content{0} == '1') {
		if (mb_detect_encoding($content) == 'UTF-8') {
			$content = iconv('UTF-8', 'GB2312//IGNORE', $content);
		}
		header('Content-Disposition: attachment; filename="'.date('YmdHis').'.che"');
		echo $content, ' ';
	}
	else {
		if (mb_detect_encoding($content) == 'UTF-8') {
			$content = iconv('UTF-8', 'GB2312//IGNORE', $content);
		}
		header('Content-Disposition: attachment; filename="'.date('YmdHis').'.txt"');
		echo $content;
	}
}

// 象棋直播间功能，建议使用数据库
elseif ($_GET['action'] == 'live') {
	header("Content-type: text/html; charset=utf-8");
	$id = intval($_GET['id']);
	if ($_GET['mode'] == 'getdom') {
		//建议从数据库中读取
		echo base64_decode(@file_get_contents("live/{$id}.dom"));
	}
	elseif ($_GET['mode'] == 'setdom') {
		if (!file_exists('live')) {
			mkdir('live');
		}
		//使用base64编码存储数据，确保服务器安全，建议存储到数据库
		@file_put_contents("live/{$id}.dom", base64_encode($_POST['dom']));
	}
}

// 局面截图功能，需要服务器支持 GD 库
elseif ($_GET['action'] == 'pic') {
	header ('Content-type:image/png');
	list($fen, $step) = explode(':', $_GET['fen']);
	$board   = imagecreatefrompng('chinese/board.png');
	list($fen) = explode(' ', $fen);
	$fen = str_replace('/', '', $fen);
	$fen = str_replace('1', '*', $fen);
	$fen = str_replace('2', '**', $fen);
	$fen = str_replace('3', '***', $fen);
	$fen = str_replace('4', '****', $fen);
	$fen = str_replace('5', '*****', $fen);
	$fen = str_replace('6', '******', $fen);
	$fen = str_replace('7', '*******', $fen);
	$fen = str_replace('8', '********', $fen);
	$fen = str_replace('9', '*********', $fen);
	for ($i=0;$i<90;++$i) {
		$x = $i % 9 * 40 + 8;
		$y = floor($i / 9) * 40 + 9;
		switch ($fen{$i}) {
			case 'R': $chess = imagecreatefrompng('chinese/normal/rr.png'); break;
			case 'N': $chess = imagecreatefrompng('chinese/normal/rn.png'); break;
			case 'B': $chess = imagecreatefrompng('chinese/normal/rb.png'); break;
			case 'A': $chess = imagecreatefrompng('chinese/normal/ra.png'); break;
			case 'K': $chess = imagecreatefrompng('chinese/normal/rk.png'); break;
			case 'C': $chess = imagecreatefrompng('chinese/normal/rc.png'); break;
			case 'P': $chess = imagecreatefrompng('chinese/normal/rp.png'); break;
			case 'r': $chess = imagecreatefrompng('chinese/normal/br.png'); break;
			case 'n': $chess = imagecreatefrompng('chinese/normal/bn.png'); break;
			case 'b': $chess = imagecreatefrompng('chinese/normal/bb.png'); break;
			case 'a': $chess = imagecreatefrompng('chinese/normal/ba.png'); break;
			case 'k': $chess = imagecreatefrompng('chinese/normal/bk.png'); break;
			case 'c': $chess = imagecreatefrompng('chinese/normal/bc.png'); break;
			case 'p': $chess = imagecreatefrompng('chinese/normal/bp.png'); break;
			default : $chess = 0; break;
		}
		if ($chess) {
			imagecopy($board, $chess, $x, $y, 0, 0, 40, 40);
		}
	}
	imagepng($board);
	imagedestroy($board);
	imagedestroy($chess);
}
?>