$(function(){
	
	$('.head-item').click(function(){
		$('.head-item').toggleClass('item-active', false);
		$(this).toggleClass('item-active', true);
		let type = $(this).attr('data-type');
		if(type == 'puli'){
			$('.bottom-text').text('谱例属性');
			$('#yinfu').hide();
			$('#puli').show();
		}else{
			$('.bottom-text').text('音符属性');
			$('#puli').hide();
			$('#yinfu').show();
		}
	})
	
	$('.keyboard-img').click(function(){
		let url = $(this).attr('src');
		if(url.indexOf('up') > -1){
			$(this).attr('src', 'images/keyboard_down.png');
		}else{
			$(this).attr('src', 'images/keyboard_up.png');
		}
		$('.main-box').toggleClass('main-box-up');
		$('.keyboard-box').toggleClass('keyboard-up');
	})
})
	function selectUnit(idx){
		$('#selectUnitImg').attr('src', 'images/speed' + idx + '.png');
		$("#L").val();
	}
	
	function selectSpeed(idx,val){
		$("#Q").val(val);
		$("#NOTE_Q").val(val);
		$('#selectSpeedImg').attr('src', 'images/speed' + idx + '.png');
		$('#selectSpeedImg').attr('speed', val);
		$('#selectSpeedImg2').attr('src', 'images/speed' + idx + '.png');
		$('#selectSpeedImg2').attr('speed', val);
		$("#Q").change();
	}
	
	function selectSpeed2(idx,val){
		$("#NOTE_Q").val(val);
		$('#selectSpeedImg2').attr('src', 'images/speed' + idx + '.png');
		$('#selectSpeedImg2').attr('speed', val);
		//changeNodeSpeed();
	}
	//选中时长
	function selectShiChang(L){
//		console.log(L)
		var val = L;
		$(".shichang-ul li").removeClass("selected");
		$(".shichang-ul img").each(function(i,item){
			var imgval = $(this).attr("value");
			if(val == imgval){
				$(this).parent().addClass("selected")
			}
		});
	}
	
