$(function() {
	/*图片轮播开始*/
	$('.carousel').carousel({interval:3000});
	$('#scrollUp3').on('mouseover',function(){
		$('#weixin').show();
	})
	$('#scrollUp3').on('mouseout',function(){
		$('#weixin').hide();
	})
	$('button[type=submit]').on('click',function(){
		$(this).html("登录中...");
	})
	
	
	
	
	/*继续加载开始*/
	$('#myButton').on('click', function() {
			var $btn = $(this).button('loading');
			setTimeout(function() {
				$btn.button('reset') //还原
			}, 3000)
		})
		/*继续加载结束*/
		/*意见反馈表单验证+ajax异步交互开始*/
	$('#btn_fd').click(function() {
		var fd = $('#fd').val();
		var fdlink = $('#fdlink').val();
		fd = $.trim(fd);
		fdlink = $.trim(fdlink);
		if (fd == "" || fdlink == "") {
			alert('亲,请留步,给点意见呗!务必留下您的联系方式!')
		}
		var d = {};
		d['fd'] = fd;
		d['fdlink'] = fdlink;
		$(this).html('提交中...');
		$(this).attr("disabled", false);
		$.ajax({
			type: 'post', //get/post   请求方式
			url: '/feedback/', //发送请求的地址
			async: true, //是否异步
			data: d, //发送到服务器的数据,键值对字符串或对象
			cache: false,
			dataType: 'json',
			//succes以后的回调函数
			success: function(data) {
				if (data.error) {
					alert(data.desc);
				} else {
					alert('提交成功');
				}
				$('#btn_fd').html('提交');
				$('#btn_fd').attr("disabled", false);
				$('#btn_fd_cancel').trigger('click');
			},
			//出错的时候
			error: function() {
				alert('请保证您的网络畅通!')
				$('#btn_fd').attr("disabled", false);
			}
		})

	})

	/*意见反馈表单验证结束*/

})
/*返回顶部开始*/
window.onscroll = function() {
	var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
	var backTop = document.getElementById('backtop')
	backTop.onclick = function() {
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	}
}
/*返回顶部结束*/