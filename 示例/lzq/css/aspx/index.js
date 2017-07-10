var gmenu1 = "";
var gmenu2 = "";
var gmenu3 = "";
//设置登录窗口
function remind() {
    var now = new Date(), hour = now.getHours();
    if (hour > 4 && hour < 6) { $("#labelwelcome").html("凌晨好！") }
    else if (hour < 9) { $("#labelwelcome").html("早上好！") }
    else if (hour < 12) { $("#labelwelcome").html("上午好！") }
    else if (hour < 14) { $("#labelwelcome").html("中午好！") }
    else if (hour < 17) { $("#labelwelcome").html("下午好！") }
    else if (hour < 19) { $("#labelwelcome").html("傍晚好！") }
    else if (hour < 22) { $("#labelwelcome").html("晚上好！") }
    else { $("#labelwelcome").html("夜深了，注意休息！") }
}
function show_copyright() {
    $.fancybox.open({
        'href': 'data/about.aspx',
        'type': 'iframe',
        'scrolling': 'no',
        'padding': 0,
        'iframe': { 'scrolling': 'no' },
        'width': 680
    });
}

function show_mainform() {
    $('#tabs').tabs('select', '欢迎使用');
}

function getuserpicture() {
    $.ajax({
        url: "user/ashx/GetInfo.ashx",
        type: "get",
        data: { action: "getuser_picture", rnd: Math.random().toString() },
        dataType: "json",
        success: function (result) {
            if (result.success) {
                var mypic = result.picture;
                if (mypic)
                    $("#userheader").attr("src", "upload/portrait/" + mypic);
                else
                    $("#userheader").attr("src", "images/user_48.png");

            }
        }
    });
}
function personalinfoupdate() {
    $.fancybox.open({
        href: "homepage/resume.aspx",
        type: 'iframe',
        padding: 0,
        width: 1100,
        height: 500,
        afterClose: function () {
            getuserpicture();
        }
    });
}
function openPwd() {
    $('#w').window({
        title: '修改密码',
        width: 300,
        modal: true,
        shadow: true,
        closed: true,
        height: 160,
        resizable: false
    });
}
//关闭登录窗口
function closePwd() {
    $('#w').window('close');
}

//修改密码
function serverLogin() {
    var $newpass = $('#txtNewPass');
    var $rePass = $('#txtRePass');

    if ($newpass.val() == '') {
        msgShow('系统提示', '请输入密码！', 'warning');
        return false;
    }
    if ($rePass.val() == '') {
        msgShow('系统提示', '请在一次输入密码！', 'warning');
        return false;
    }

    if ($newpass.val() != $rePass.val()) {
        msgShow('系统提示', '两次密码不一至！请重新输入', 'warning');
        return false;
    }

    $.post('user/ashx/editpassword.ashx?newpass=' + $newpass.val(), function (msg) {
        msgShow('系统提示', '恭喜，密码修改成功！', 'info');
        $newpass.val('');
        $rePass.val('');
        $('#w').panel('close', true);
    })
}

function mymenu1() {
    setTimeout(function () {
        gmenu1 = $.getUrlParam('menu1');

        if (gmenu1 == null) gmenu1 = 0;
        if ($("#tb_btn" + gmenu1) == null) gmenu1 = 0;
        if (!$("#tb" + gmenu1).is(':visible')) gmenu1 = 0;
        if (gmenu1 != 0) {
            tpbtn(gmenu1);
            $("#tb_btn" + gmenu1).linkbutton('select');
        }
        else {
            tpbtn(0);                                //默认是首页
            $("#tb_btn0").linkbutton('select');
        }
    }, 500);
}
$(function () {
    getuserpicture();
    remind();
    var sroleclass = $.getUrlParam('roleclass');
    //tpbtn(0);                                //默认是首页
    //$("#tb_btn0").linkbutton('select');
    
    $('#roleclass').combobox({
        valueField: 'id',
        textField: 'text',
        editable: false,
        onSelect: function (rec) {
            top.location.href = 'index.aspx?roleclass=' + rec.id
                + '&menu1=' + gmenu1
                + '&menu2=' + escape(gmenu2) 
                + '&menu3=' + escape(gmenu3)
                ;
        }
    });

    getuser_info(sroleclass);                          //获取用户信息
    openPwd();

    $('#editpass').click(function () {
        $('#w').window('open');
    });

    $('#btnEp').click(function () {
        serverLogin();
    });

    $('#btnCancel').click(function () { closePwd(); });

    $('#loginOut').click(function () {
        $.messager.confirm('系统提示', '您确定要退出本次登录吗?', function (r) {
            if (r) {
                top.location.href = 'logout.aspx?Action=2';
            }
        });
    });
    mymenu1();
});

function getuser_info(sroleclass) {
    $.ajax({
        url: "user/ashx/GetInfo.ashx",
        type: "get",
        data: { action: "getuser_info", rnd: Math.random().toString(), myroleclass: sroleclass },
        dataType: "json",
        success: function (result) {
            if (result.success) {
                $("#user_info").html(result.username);
                $('#roleclass').combobox("loadData", result.data);  //初始化角色
            }
            else {
                msgShow('系统提示', '您没有相关权限，不能进入系统，请与学院或学校管理员联系！！', 'warning');
                top.location.href = "login.aspx";
            }
        }
    });
}

var bcollapse = false;
function tpbtn(_menus_idx) {
    gmenu1 = _menus_idx.toString();
    for (var i = 0; i <= 12; i++) {
        $("#tb_btn" + i).linkbutton('unselect');
    }
    if (_menus_idx == 0) {
        if (!bcollapse) {
            $('#mylayout').layout('collapse', 'west');
            bcollapse = true;
            addTab("欢迎使用", "ashx/cgjlpt.ashx ", '');
        }
        return;
    }
    else if (_menus_idx == 12) {
        return;
    }
    else if (bcollapse) {
        $('#mylayout').layout('expand', 'west');
        bcollapse = false;
    }
    ReInitLeftMenu(_menus_idx);
};