function ClearText() {
    $('#user_search').form('reset');
    $('#user_search').form('clear');
}

var scmd = 'selectalldata';
function zqselect(saction, dbtype) {
    scmd = saction;
    $.ajax({
        url: "../condition/condition_z.ashx?action=" + scmd
            + "&dbtype=" + escape(dbtype)
            + ((scmd == 'selectalldata') ? "" : ("&" + $('#user_search').serialize())),
        type: "get",
        data: { rnd: Math.random().toString() },
        dataType: "json",
        success: function (result) {
            document.getElementById('btnSearchZq').click();  ////运行时要去除
//            $.messager.show({
//                title: '提示信息',
//                msg: result.msg,
//                timeout: 4000,
//                showType: 'slide'
//            });
        }
    });
}
