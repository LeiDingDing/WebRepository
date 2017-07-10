$(function () {
    obj = {
        
        modify: function (index) {
            var rows = parent.$('#dg').datagrid('getRows');
            var row = rows[index];
            $('#ff').form('load', {
                gradeno: row.id,
                chinese: row.语文,
                math: row.数学,
                english: row.英语,
                computer: row.计算机,
                sid: row.sid
            });
        },
        scan: function (index) {
            var rows = parent.$('#dg').datagrid('getRows');
            var row = rows[index];
            $('#save').css('display', 'none');
            $('#ff').form('load', {
                gradeno: row.id,
                chinese: row.语文,
                math: row.数学,
                english: row.英语,
                computer:row.计算机,
                sid: row.sid
            });
        },
        add:function(){
            
        },
        save: function () {
            var id = $('#gradeno').textbox('getValue');
            var chinese = $('#chinese').textbox('getValue');
            var math = $('#math').textbox('getValue');
            var english = $('#english').textbox('getValue');
            var computer = $('#computer').textbox('getValue');
            var sid = $('#sid').combobox('getValue');
            
            var row = [];
            row.push({
                id: id,
                语文: chinese,
                数学: math,
                英语: english,
                计算机: computer,
                学生: sid,
                
            });
            
            $.post('../../ashx/Award.ashx?action=saveGrade', {row:row}, function (result) {
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
    
    $('#gradeno').textbox({
        disabled: true,
        prompt: '自动生成',
    });
    $('#chinese').textbox({
        
    });
    $("#math").textbox({
        
    });
    
    $('#english').textbox({
        
        
    });
    $('#computer').textbox({


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