$(function () {
    obj = {
        
        search: function () {
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

            var options = parent.$('#dg').datagrid('getPager').data("pagination").options;
            var curr = options.pageNumber;
            var size = options.pageSize;
            $.post('../../ashx/Award.ashx?action=searchgrd', { row: row, page: curr, rows: size }, function (result) {
                var obj = JSON.parse(result);
                parent.$('#upstu').colorbox.close();
                //parent.$('#dg').datagrid('reload');
                parent.$("#dg").datagrid("loadData", obj);
                
            });
        }

    }
    
    
    $('#gradeno').textbox({
        
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