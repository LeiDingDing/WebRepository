function isInteger(str) {
    var regu = /^[1-9]\d*/;
    return regu.test(str);
}
function Validator(theForm) {
    if (theForm.username.value == "") {
        alert("请输入用户名");
        theForm.username.focus();
        return false;
    }
    else if (theForm.password.value == "") {
        alert("请输入密码");
        theForm.password.focus();
        return false;
    }
    else {
        if (!isInteger(theForm.username.value)) {
            theForm.username.focus();
            alert("用户名为您的工资号!");
            return false;
        }
        return true;
    }
}

$(function () {
    $('.zqtext:first').focus(); //获取页面所有文本
    var $inp = $('.zqtext');
    $inp.bind('keydown', function (e) {
        var key = e.which;
        if (key == 13) {
            e.preventDefault();
            if (this == $("#password")[0]) {
                document.all.btnLogin.click();
                return;
            }
            var nxt = $inp.index(this) + 1;
            $(".zqtext:eq(" + nxt + ")").focus();
        }
    });
});