$(function () {
    obj = {
        
        modify: function (index) {
            var rows = parent.$('#dg').datagrid('getRows');
            var row = rows[index];
            $('#ff').form('load', {
                awardno: row.id,
                award: row.获奖名称,
                ayear: row.获奖时间,
                awardrank: row.奖项级别,
                sid:row.sid
            });
        },
        scan: function (index) {
            var rows = parent.$('#dg').datagrid('getRows');
            var row = rows[index];
            $('#save').css('display', 'none');
            $('#ff').form('load', {
                awardno: row.id,
                award: row.获奖名称,
                ayear: row.获奖时间,
                awardrank: row.奖项级别,
                sid: row.sid
            });
        },
        add:function(){
            
        },
        save: function () {
            var id = $('#awardno').textbox('getValue');
            var award = $('#award').textbox('getValue');
            var ayear = $('#ayear').datebox('getValue');
            var awardrank = $('#awardrank').combobox('getText');
            var sid = $('#sid').combobox('getValue');
            
            var row = [];
            row.push({
                id: id,
                获奖名称: award,
                获奖时间: ayear,
                奖项级别: awardrank,
                学生: sid,
                
            });
            
            $.post('../../ashx/Award.ashx?action=saveAward', {row:row}, function (result) {
                parent.$('#upstu').colorbox.close();
                parent.$('#dg').datagrid('reload');
            });
        }

    }
    var url = window.location.search;
    var index = getUrlParam(url, 'index');
    var action = getUrlParam(url, 'action');
    if(action=='modify'){
        obj.modify(index);
    } else if (action == 'scan') {
        obj.scan(index);
    }else if(action=='add'){
        obj.add();
    }
    
    $('#awardno').textbox({
        disabled: true,
        prompt: '自动生成',
    });
    $('#award').textbox({
        
    });
    $("#ayear").datebox({
        
    });
    
    $('#sid').combobox({
        valueField: 'id',
        textField: '姓名',
        editable: false,
        panelHeight: 100,
        url: '../../ashx/Award.ashx?action=getStudent',
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return row[opts.valueField] + '-' + row[opts.textField];
        },
        
    });
    











});