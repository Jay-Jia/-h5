(function(){
var is_dati=0;
var url=window.location.href;
//监听touch事件
document.addEventListener('touchmove',function(event){
	event.preventDefault(); },false);
//翻页函数
function up(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	 if ( (last.row == 2&&is_dati!=1)||  last.row == 15) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}
	 if(has_form==1){
	 	if(last.row==14){
	 		now.row = last.row+1; now.col = 1; pageMove(towards.up);
	 	}
	 }
}
function down(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row == 14||  last.row == 15 ||last.row == 16) { now.row = last.row-1; now.col = 1; pageMove(towards.down);}	
}
//处理手势事件
$(document).swipeUp(function(){
	up();
})

$(document).swipeDown(function(){
	down();
})


document.getElementById('changemus').onclick=function(){
		if(myvideo.paused){
		myvideo.play();
		//document.getElementById("mus_pic").src="img/musicon.png";
		$("#mus_pic").addClass("mus_rotate");
		}
	else{
		myvideo.pause();
		document.getElementById("mus_pic").src="img/musicon.png";
		$("#mus_pic").removeClass("mus_rotate");
		}
}
 var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {//移动终端浏览器版本信息 
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        } (),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }

if(browser.versions.iPhone==true)
{
	$('.contain_img').css('width','100%');
	$('.contain_img').css('max-width','36rem');
	$('.answer').css('width','100%');
	$('.answer').css('max-width','36rem');
}
    
    
   

var fixScreen = function() {
    var metaEl = document.querySelector('meta[name="viewport"]'),
        metaCtt = metaEl ? metaEl.content : '',
        matchScale = metaCtt.match(/initial\-scale=([\d\.]+)/),
        matchWidth = metaCtt.match(/width=([^,\s]+)/);

    if ( metaEl && !matchScale && ( matchWidth && matchWidth[1] != 'device-width') ) {
        var width = parseInt(matchWidth[1]),
            iw = win.innerWidth || width,
            ow = win.outerWidth || iw,
            sw = win.screen.width || iw,
            saw = win.screen.availWidth || iw,
            ih = win.innerHeight || width,
            oh = win.outerHeight || ih,
            ish = win.screen.height || ih,
            sah = win.screen.availHeight || ih,
            w = Math.min(iw,ow,sw,saw,ih,oh,ish,sah),
            scale = w / width;

        if ( ratio < 1) {
            metaEl.content += ',initial-scale=' + ratio + ',maximum-scale=' + ratio + ', minimum-scale=' + scale;
        }
    }
}
fixScreen();
if(document.readyState=="loading"){
		$("#loading-back").animate('load',3000,'ease',function(){$("#loading-back").css('width','100%')});
						setTimeout(function(){
							$('.loading-num').html('5%');
						},150);
						setTimeout(function(){
							$('.loading-num').html('13%');
						},300);
						setTimeout(function(){
							$('.loading-num').html('33%');
						},1000);
						setTimeout(function(){
							$('.loading-num').html('34%');
						},1650);
						setTimeout(function(){
							$('.loading-num').html('50%');
						},2100);
						setTimeout(function(){
							$('.loading-num').html('52%');
						},2370);
						setTimeout(function(){
							$('.loading-num').html('54%');
						},2850);
						setTimeout(function(){
							$('.loading-num').html('100%');
							if (isAnimating) return;
							last.row = now.row;
							last.col = now.col;
							now.row = last.row+1; now.col = 1; pageMove(towards.up);
							document.getElementById('changemus').style.display="block";
							document.getElementById('videoContainer').innerHTML='<audio loop="loop" id="myVideobox"><source src="img/bgm.mp3"></audio>';
							myvideo=document.getElementById('myVideobox');
							myvideo.play();
							$.ajax({
									url: 'is_meng.php',  //请求地址
									data: '',  //表单序列化
									type: "POST",
									success: function(res)
									{
									//在异步提交成功后要做的操作
										
										if(res=='1'){
											is_dati=1;
											$('.fade_wrap').removeClass('hide');
												
										}
									},
									error:function(){
										alert('网络连接错误,请刷新页面.');
									}
							});
						},3000);
}

//状态初始化
var now = { row:1, col:1 }, last = { row:0, col:0};
const towards = { up:1, right:2, down:3, left:4};
var isAnimating = false;




$.ajax({
		url: url,  //请求地址
		data: {
			a:1
		},  
		type: "POST",
		dataType:"json",
		success: function(res)
		{
				//alert("id="+app.appId);
				//alert("timestamp="+app.timestamp);
				//alert("nonceStr="+app.nonceStr);
				//alert(res);
				//alert(res.appId);
				//alert(res.rawString);

				wx.config({
				    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				    appId: res.appId, // 必填，公众号的唯一标识
				    timestamp: ""+res.timestamp, // 必填，生成签名的时间戳
				    nonceStr: res.nonceStr, // 必填，生成签名的随机串
				    signature: res.signature,// 必填，签名，见附录1
				    jsApiList: ['onMenuShareTimeline',
				    'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});  

				//检查接口是否支持
				/*wx.checkJsApi({
				            jsApiList: [
				                'onMenuShareTimeline',
				                'onMenuShareAppMessage'
				            ],
				            success: function (res) {
				                alert(JSON.stringify(res));
				            }
				        });*/    
				wx.ready(function() {
					//document.getElementById('myVideobox').play();
					wx.onMenuShareTimeline({
				    title: '邓超最新表情包流出,下载从速。', // 分享标题
				    link: 'http://changhong.andyly.cn/changhong/index.php', // 分享链接
				    imgUrl: 'http://changhong.andyly.cn/changhong/img/share_pic.jpg', // 分享图标
				    success: function (res) { 
				        // 用户确认分享后执行的回调函数
				        $.ajax({
							url: 'share.php',  //请求地址
							data: '',  
							type: "POST",
							success: function(){
								//alert('分享成功');
                                $('.share').addClass('hide');
                                $('.prize').addClass('hide');
							}
							})
				    },
				    cancel: function (res) { 
				        // 用户取消分享后执行的回调函数
				       // alert('cao');
				    }
					});
					wx.onMenuShareAppMessage({
					    title: '邓超最新表情包流出,下载从速。', // 分享标题
					    desc: '赶紧来下载吧~', // 分享描述
					    link: 'http://changhong.andyly.cn/changhong/index.php', // 分享链接
					    imgUrl: 'http://changhong.andyly.cn/changhong/img/share_pic.jpg', // 分享图标
					    type: '', // 分享类型,music、video或link，不填默认为link
					    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					    success: function (res) { 
					        // 用户确认分享后执行的回调函数
					         $.ajax({
							url: 'share.php',  //请求地址
							data: '',  
							type: "POST",
							success: function(){
								//alert('分享成功');
                                $('.share').addClass('hide');
                                $('.prize').addClass('hide');
							}
							})
					    },
					    cancel: function () { 
					        // 用户取消分享后执行的回调函数
					        //alert('cao');
					    }
					});
				    
				});
		}
});




 

//处理按钮点击之后的样式问题
$(".pay_list_c1").on("click",function(){
  $(this).addClass("on").siblings().removeClass("on").find('input[type=radio]').attr("checked",false);
  $(this).find('input[type=radio]').attr("checked",true);
})

$(".piaochecked").on("click",function(){
    $(this).hasClass("on_check")? 
    $(this).removeClass("on_check").find('input[type=checkbox]').attr("checked",false):$(this).addClass("on_check").find('input[type=checkbox]').attr("checked",true);
   //或者这么写
  // $(this).toggleClass( "on_check" );
})


//闭包处理select值的传递
var btnSelect = document.getElementsByName("btn_select"); 
for(var i=0;i<btnSelect.length;i++){
	(function(j){
		var curSelect = btnSelect[j].getElementsByTagName("span")[1]; 
		var oSelect = btnSelect[j].getElementsByTagName("select")[0];
		var aOption = btnSelect[j].getElementsByTagName("option"); 
		oSelect.onchange = function () { 
			var text=oSelect.options[oSelect.selectedIndex].text;
			console.log(this.selectedIndex);
			curSelect.innerHTML = text; 
		}
	})(i);
}




//处理翻页事件
$('#faceback').on("click",function(){
	up();
})
$("input[type='checkbox']").on("click",function(){
	up();
})
$(".last").each(function(){
	$(this).on("click",function(){
		if(now.row==5||now.row==6)
		{
			if (isAnimating) return;
			last.row = now.row;
			last.col = now.col;
			if (last.row!=1) { now.row = 4; now.col = 1; pageMove(towards.down);}
		}
		else if(now.row==9){
			if (isAnimating) return;
			last.row = now.row;
			last.col = now.col;
			if (last.row!=1) { now.row = 5; now.col = 1; pageMove(towards.down);}
		}
		else{
			if (isAnimating) return;
			last.row = now.row;
			last.col = now.col;
			if (last.row!=1) { now.row = last.row-1; now.col = 1; pageMove(towards.down);}
		}
		 
		})
})
//信息提交处理
var form_check=0;
var has_form=0;
$('#form_to_prize').on("click",function(){
	 	
    	$('#information_sub').find('select').each(function(){
    		if($(this).val()=="请选择"){
    			alert('请选择您的信息');
    			form_check+=1;
    			return false;
    		}
    		else{
    			form_check=0;
    		}
    	})
    	if(form_check==0){
		has_form=1;
		up();
		$.ajax({
		url: 'insertPrize.php',  //请求地址
		data: $('#information_sub').serializeArray(),  //表单序列化
		type: "POST",
		success: function()
		{
		//在异步提交成功后要做的操作
			alert('提交成功');
			
		},
		error:function(){
			alert('网络连接错误,请刷新页面.');
		}
		});
		}
		else{
			return false;
		}

});

//手势回调函数
function pageMove(tw){
	var lastPage = ".page-"+last.row+"-"+last.col,
		nowPage = ".page-"+now.row+"-"+now.col;
	switch(tw) {
		case towards.up:
			outClass = 'pt-page-flipOutTop';
			inClass = 'pt-page-rotateCubeLeftOut';
			break;
		case towards.right:
			outClass = 'pt-page-moveToRight';
			inClass = 'pt-page-moveFromLeft';
			break;
		case towards.down:
			outClass = 'pt-page-flipOutBottom';
			inClass = 'pt-page-flipInTop';
			break;
		case towards.left:
			outClass = 'pt-page-moveToLeft';
			inClass = 'pt-page-moveFromRight';
			break;
	}
	isAnimating = true;
	$(nowPage).removeClass("hide");
	$(lastPage).addClass(outClass);
	$(nowPage).addClass(inClass);
	
	//处理答案提交
	//分为两种情况，一种为单选按钮，一种为复选框
	$(nowPage).find(".next").on("click",function(){
		if($(nowPage).find("input[type=radio]:checked").val()){
			//alert($(nowPage).find("input[type=radio]:checked").val());
			if(now.row==4&&$(nowPage).find("input[type=radio][checked=true]").val()==1){
						if (isAnimating) return;
						last.row = now.row;
						last.col = now.col;
						now.row = last.row+2; now.col = 1; pageMove(towards.up);
						console.log($(nowPage).find("input[type=radio]:checked").val());
					}
					else{
						if(now.row==5){
							if (isAnimating) return;
							last.row = now.row;
							last.col = now.col;
							now.row = last.row+4; now.col = 1; pageMove(towards.up);
							console.log(now.row);
						}
						else{
						if (isAnimating) return;
						last.row = now.row;
						last.col = now.col;
						now.row = last.row+1; now.col = 1; pageMove(towards.up);
						console.log(now.row);
						}
					}	
			$.ajax({
				url: 'insertAnswer.php',  //请求地址
				data: {
						question: $(nowPage).find("input[type=radio]").attr('name'),
						answer: $(nowPage).find("input[type=radio]:checked").val()
					},
				type: "POST",
				success: function(res)
				{
					
					//alert(res);
					
					
				}

			});
			
		}
		if($(nowPage).find("input[type=checkbox]:checked").val()){
			var array=[];
			//console.log($(nowPage).find("input[type=checkbox]").attr('name'));
			//console.log($(nowPage).find("input[type=checkbox]:checked"));

			$(nowPage).find("input[type=checkbox]:checked").each(function(){
					if ($(this).attr("checked")) {  
						array.push($(this).val());  
            		} 
			});
			if (isAnimating) return;
					last.row = now.row;
					last.col = now.col;
					now.row = last.row+1; now.col = 1; pageMove(towards.up);
			//alert(array.join(','));
			$.ajax({
				url: 'insertAnswer.php',  //请求地址
				data: {
						question: $(nowPage).find("input[type=checkbox]").attr('name'),
						answer: array.join(',')
					},
				type: "POST",
				success: function(res)
				{
					
					//alert(res);
					
				}

			});
			
			
		}
	})
	
	setTimeout(function(){
		$(lastPage).removeClass('page-current');
		$(lastPage).removeClass(outClass);
		$(lastPage).addClass("hide");
		$(lastPage).find("img").addClass("hide");
		$(nowPage).addClass('page-current');
		$(nowPage).removeClass(inClass);
		$(nowPage).find("img").removeClass("hide");
		
		isAnimating = false;
	},600);
}

//抽奖部分函数
var lottery={
	index:-1,	//当前转动到哪个位置，起点位置
	count:0,	//总共有多少个位置
	timer:0,	//setTimeout的ID，用clearTimeout清除
	speed:20,	//初始转动速度
	times:0,	//转动次数
	cycle:40,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
	prize:-1,	//中奖位置
	init:function(id){
		if ($("#"+id).find(".lottery-unit").length>0) {
			$lottery = $("#"+id);
			$units = $lottery.find(".lottery-unit");
			this.obj = $lottery;
			this.count = $units.length;
			$lottery.find(".lottery-unit-"+this.index).addClass("roll_on");
		};
	},
	roll:function(){
		var index = this.index;
		var count = this.count;
		var lottery = this.obj;
		$(lottery).find(".lottery-unit-"+index).removeClass("roll_on");
		index += 1;
		if (index>count-1) {
			index = 0;
		};
		$(lottery).find(".lottery-unit-"+index).addClass("roll_on");
		this.index=index;
		return false;
	},
	stop:function(index){
		this.prize=index;
		return false;
	}
};
//滚动抽奖部分
function roll(){
	lottery.times += 1;
	lottery.roll();
	if (lottery.times > lottery.cycle+7 && lottery.prize==lottery.index) {
		clearTimeout(lottery.timer);
		if(lottery.prize=="0" ||lottery.prize=="2" ||lottery.prize=="4"||lottery.prize=="6" ){
			if(lottery.prize=="0")
				$('.prize_tip').html('恭喜您获得5元话费');
			if(lottery.prize=="2")
				$('.prize_tip').html('恭喜您获得10元话费');
			if(lottery.prize=="4")
				$('.prize_tip').html('恭喜您获得20元话费');
			if(lottery.prize=="6")
				$('.prize_tip').html('恭喜您获得长虹流云移动硬盘和16G U盘');

			setTimeout(function(){
				$('.prize_res').removeClass('hide');
			},300);
		}
		else if(lottery.prize=='1'||lottery.prize=='3'||lottery.prize=='5'||lottery.prize=='7'){
			setTimeout(function(){
			$('.no_prize').first().removeClass('hide');
			},300);
		}
		lottery.prize=-1;
		lottery.times=0;
		click=false;
	}else{
		if (lottery.times<lottery.cycle) {
			lottery.speed -= 10;
		}else if(lottery.times==lottery.cycle) {
			//var index = Math.random()*(lottery.count)|0;
			//lottery.prize = index;
		}else{
			if (lottery.times > lottery.cycle+7 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
				lottery.speed += 110;
			}else{
				lottery.speed += 20;
			}
		}
		if (lottery.speed<40) {
			lottery.speed=40;
		};
		//console.log(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
		lottery.timer = setTimeout(roll,lottery.speed);
	}
	return false;
}


//设置抽奖状态变量
//为false则为没在抽奖 否则为正在抽奖
var click=false;
lottery.init('lottery');
$("#start").click(function(){
		if (click) {
			return false;
		}else{
            $.ajax({
                url: 'prize.php',  //请求地址
                data: '',
                type: "POST",
                dataType:"json",
                success: function(res)
                {
                      //设置中奖位置
                    if(res.a=="您的抽奖次数已经用完了哦")
                    {
                    	$('.no_prize').eq(2).removeClass('hide');
                    	
                    }
                    else if(res.a=="您已经中过奖了"){
                    	$('.no_prize').eq(1).removeClass('hide');
                    }
                    else if(res.a=="分享后还有一次抽奖机会哦"){
                    	$('.no_prize').last().removeClass('hide');
                    }
                    else if(res==''){
                    	alert('网络链接错误');
                    }
                    else{
                    	console.log(res.a);
                    	lottery.prize=res.b-1; 
                    	$('.prize_id').attr('value',res.b);
                    	lottery.speed=100;
						roll();
						click=true;
                    }
                },
                error:function(){
					alert('网络连接错误,请刷新页面.');
				}
            });
			return false;
		}
});
$('#to_continiu').on("click",function(){
	$('.no_prize').first().addClass('hide');
});
$('#have_prize').on("click",function(){
	$('.no_prize').eq(1).addClass('hide');
	$('.share').removeClass('hide');
});
    $('#no_num').on("click",function(){
        $('.no_prize').eq(2).addClass('hide');
    });
$('#friend').on("click",function(){
	$('.no_prize').last().addClass('hide');
	$('.share').removeClass('hide');
});
$('#sure_share').on("click",function(){
	$('.page2-share').removeClass('hide');
});
$('.page15-img4').on("click",function(){
	up();
});

$('.prize_sub').on("click",function(){
	var re = /^1\d{10}$/;
	if($('#pesron').val()==''){
		alert('请输入姓名');
	}
	else if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test($('#mobile').val())))
	{
		alert('请输入正确的手机号');
	}
	else{
	$.ajax({
		url: 'insertBaseInfo.php',  //请求地址
		data: $('#detail_form').serializeArray(),  //表单序列化
		type: "POST",
		
		success: function()
		{
		//在异步提交成功后要做的操作
			//document.removeEventListener('touchmove',function(event){
				//event.preventDefault(); },false);
			alert('领奖成功，奖品将在15个工作日内发放');
            wx.closeWindow();

        }
		});
	}
})
})();
