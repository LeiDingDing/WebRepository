function ClearText() {
    $('#user_search').form('reset');
    $('#user_search').form('clear');
}

var scmd = 'selectalldata';
function zqselect(saction, dbtype) {
    scmd = saction;
    var myurl="../condition/condition_c.ashx?action=" + scmd
            + "&dbtype=" + escape(dbtype)
            + ((scmd == 'selectalldata') ? "" : ("&" + $('#user_search').serialize()));
    $.ajax({
        url: myurl,
        type: "get",
        data:{rnd: Math.random().toString()},
        dataType: "json",
        success: function (result) {
            document.getElementById('btnSearchZq').click();
//            $.messager.show({
//                title: '提示信息',
//                msg: result.msg,
//                timeout: 4000,
//                showType: 'slide'
//            });
        }
    });
}
