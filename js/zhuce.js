/*高度自适应开始*/
$('input').on('click', function() {
					var height = $('.container').height();
					$('.container').css({
						marginTop: -(height/2)
					})
				})
/*高度自适应结束*/


/*表单验证开始*/
var c_name, c_mail, c_passwd, c_read;
$(function() {
	$("[data-valid]").focus(function() {
		var dv = $(this).attr("data-valid");
		var $tip = $("#" + dv + "-tip");
		var $error = $("#" + dv + "-error");
		$error.hide();
		$tip.show();
	}).blur(
		function() {
			validate(this);
		}
	);

	function validate(elem) {
		var Valid = {
			type: elem.getAttribute("data-valid") || elem.id,
			Method: {
				name: function() {
					nameValidate();
				},
				mail: function() {
					mailValidate();
				},
				passwd: function() {
					passwdValidate();
				}
			}
		};
		Valid.Method[Valid.type]();
	};

	$("#reg-form").submit(function(event) {
		//event.preventDefault();
		validateAll(event);
	});

	$("#read").click(function() {
		if ($(this).is(":checked")) {
			$("#submit").attr("disabled", false).addClass("enabled");
		} else {
			$("#submit").attr("disabled", true).removeClass("enabled");
		}
	});
});

function fail(elem, errorInfo) {
	var dv = $(elem).attr("data-valid");
	var $tip = $("#" + dv + "-tip");
	var $error = $("#" + dv + "-error");
	var $serror = $("#" + dv + "-s-error");
	if ($serror) $serror.hide();
	$tip.hide();
	$error.html(errorInfo);
	$error.show();
}

function success(elem) {
	var dv = $(elem).attr("data-valid");
	var $tip = $("#" + dv + "-tip");
	var $error = $("#" + dv + "-error");
	var $serror = $("#" + dv + "-s-error");
	if ($serror) $serror.hide();
	$tip.hide();
	$error.hide();
}

//邮箱验证
function mailValidate() {
	var elem = $("#mail");
	var mail = elem.val();
	mail = $.trim(mail);
	if (mail == "") {
		fail(elem, "邮箱不能为空");
		return;
	} else {
		var reg = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if (!reg.test(mail)) {
			fail(elem, "输入的邮箱格式错误");
			return;
		} else {
			c_mail = true;
			success(elem);
		}
	}
}
//昵称验证
function nameValidate() {
	var elem = $("#name");
	var name = elem.val();
	name = $.trim(name);
	if (name == "") {
		fail(elem, "昵称不能为空");
		return;
	} else {
		var reg = /^[-_a-zA-Z0-9\u4e00-\u9fa5]{2,30}$/;
		if (!reg.test(name)) {
			fail(elem, "昵称格式错误");
			return;
		} else {
			c_name = true;
			success(elem);
		}
	}
}

//密码验证
function passwdValidate() {
	var elem = $("#passwd");
	var passwd = elem.val();
	passwd = $.trim(passwd);
	if (passwd == "") {
		fail(elem, "密码不能为空");
		return;
	} else {
		var reg = "";
		if (passwd.length < 8) {
			fail(elem, "密码长度不足8个字符");
			return;
		} else if (!(/\d/.test(passwd))) {
			fail(elem, "密码过于简单，请包含字母和数字");
			return;
		} else if (!(/[a-zA-Z\~\)\!$\%\*\(\_\+\-\=\{\}\[\]\|\:\;\<\>\?\,\.\/\@#\^\"\'\`\?\&]/.test(passwd))) {
			fail(elem, "密码过于简单，请包含字母和数字");
			return;
		} else {
			c_passwd = true;
			success(elem);
		}
	}
}

function validateAll(event) {
	if (!c_name) {
		nameValidate();
		if (!c_name) event.preventDefault();
	}
	if (!c_mail) {
		mailValidate();
		if (!c_mail) event.preventDefault();
	}
	if (!c_passwd) {
		passwdValidate();
		if (!c_passwd) event.preventDefault();
	}
	if (c_name && c_mail && c_passwd) {} else {
		event.preventDefault();
	}
}
/*表单验证结束*/