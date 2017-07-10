$(function () {
    obj = {
        
        search: function () {
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

            var options = parent.$('#dg').datagrid('getPager').data("pagination").options;
            var curr = options.pageNumber;
            var size = options.pageSize;
            $.post('../../ashx/Award.ashx?action=searchawd', { row: row, page: curr, rows: size }, function (result) {
                var obj = JSON.parse(result);
                parent.$('#upstu').colorbox.close();
                //parent.$('#dg').datagrid('reload');
                parent.$("#dg").datagrid("loadData", obj);
                
            });
        }

    }
    
    
    $('#awardno').textbox({
        
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