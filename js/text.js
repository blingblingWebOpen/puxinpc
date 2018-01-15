//$.ajax({
//	type:"post",
//	url:"",
//	async:true
//});


$(function() {
	//表单隔行变色 兼容IE
	$(".c03_c01 table tr:nth-child(even)").css({
		'background': '#fafafa'
	});
	$(".c03_c01 table tr:nth-child(odd)").css({
		'background': '#fff'
	});
	$(".data01 .c03_c01 table tr:nth-child(even)").css({
		'background': '#fff'
	});
	$(".data01 .c03_c01 table tr:nth-child(odd)").css({
		'background': '#fafafa'
	});


})

//input输入框的提示placeolder的提示兼容ie
$(function() {
	// 如果不支持placeholder，用jQuery来完成
	if (!isSupportPlaceholder()) {
		// 遍历所有input对象, 除了密码框
		$('input').not("input[type='password']").each(
			function() {
				var self = $(this);
				var val = self.attr("placeholder");
				input(self, val);
			}
		);

		/**
		 *  对password框的特殊处理
		 * 1.创建一个text框
		 * 2.获取焦点和失去焦点的时候切换
		 */
		$('input[type="password"]').each(
			function() {
				var pwdField = $(this);
				var pwdVal = pwdField.attr('placeholder');
				var pwdId = pwdField.attr('id');
				// 重命名该input的id为原id后跟1
				pwdField.after('<input id="' + pwdId + '1" type="text" value=' + pwdVal + ' autocomplete="off" />');
				var pwdPlaceholder = $('#' + pwdId + '1');
				pwdPlaceholder.show();
				pwdField.hide();

				pwdPlaceholder.focus(function() {
					pwdPlaceholder.hide();
					pwdField.show();
					pwdField.focus();
				});

				pwdField.blur(function() {
					if (pwdField.val() == '') {
						pwdPlaceholder.show();
						pwdField.hide();
					}
				});
			}
		);
	}
});

// 判断浏览器是否支持placeholder属性
function isSupportPlaceholder() {
	var input = document.createElement('input');
	return 'placeholder' in input;
}

// jQuery替换placeholder的处理
function input(obj, val) {
	var $input = obj;
	var val = val;
	$input.attr({
		value: val
	});
	$input.focus(function() {
		if ($input.val() == val) {
			$(this).attr({
				value: " "
			});
		}
	}).blur(function() {
		if ($input.val() == " ") {
			$(this).attr({
				value: val
			});
		}
	});
}

/*
 注册表单验证  
 * 
 * */
function checkreg() {
	var rphone = document.forms["regform"]["rphone"].value; /*手机号*/
	var ryanz = document.forms["regform"]["ryanz"].value; /*验证码*/
	var rdyanz = document.forms["regform"]["rdyanz"].value; /*短信验证码*/
	var rpassword = document.forms["regform"]["rpassword"].value; /*密码*/
	var shuom = $("input[type='checkbox']").is(':checked');
	if (rphone == null || rphone == '') {
		alert("请输入手机号，手机号不能为空");
		return false;
	}
	if (ryanz == null || ryanz == '') {
		alert("请输入右侧验证码");
		return false;
	}
	if (rdyanz == null || rdyanz == '') {
		alert("请短信验证码");
		return false;
	}
	if (rpassword == null || rpassword == '') {
		alert("请输入密码，密码不能为空");
		return false;
	}
	if (shuom == false) {
		alert("请认真阅读浦新金服保密协议");
		return false;
	}
}

//随机验证码
$(function(){	
	var code; //在全局 定义验证码 
function createCode() {
	code = "";
	var codeLength = 6; //验证码的长度    
	var checkCode = document.getElementById("checkCode");
	var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的          
	for (var i = 0; i < codeLength; i++) {
		var charIndex = Math.floor(Math.random() * 36);
		code += selectChar[charIndex];
	}
	//    alert(code);
	if (checkCode) //这里不是很懂,有高手可以解释下     
	{
		checkCode.className = "code";
		checkCode.value = code;
	}
}

function validate() {
	var inputCode = document.getElementById("input1").value;
	if (inputCode.length <= 0) {
		alert("请输入验证码！");
		document.getElementById("input1").focus();
	} else if (inputCode != code) {
		alert("验证码输入错误！");
		createCode(); //刷新验证码      
		inputCode = "";
		document.getElementById("input1").focus();
	} else {
		document.frmRegister.submit();
	}
} 
})
	