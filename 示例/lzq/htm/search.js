$(function () {
    obj = {
        
        
        
        search: function () {
            var id = $('#sid').textbox('getValue');
            var name = $('#name').textbox('getValue');
            var role = $('#role').combobox('getValue');
            var tel = $('#tel').textbox('getValue');
            var email = $('#email').textbox('getValue');
            var address = $('#address').textbox('getValue');
            var row = [];
            row.push({
                id: id,
                姓名: name,
                角色: role,
                电话: tel,
                邮箱: email,
                住址:address
            });
            
            var options = parent.$('#dg').datagrid('getPager').data("pagination").options;
            var curr = options.pageNumber;
            var size = options.pageSize;
            $.post('../ashx/Award.ashx?action=searchstu', { row: row ,page:curr,rows:size}, function (result) {
                var obj = JSON.parse(result);
                parent.$('#upstu').colorbox.close();
                //parent.$('#dg').datagrid('reload');
                parent.$("#dg").datagrid("loadData", obj);
                
            });
        }

    }
    
    
    $('#sid').textbox({
        
    });
    $('#name').textbox({

    });
    
    $('#tel').textbox({

    });
    $('#email').textbox({

    });
    $('#address').textbox({

    });
    $('#role').combobox({
        valueField: 'value',
        textField: 'text',
        editable: false,
        data: [{
            value: 1,
            text: '管理员'
        }, {
            value: 2,
            text: '管理教师'
        }, {
            value: 3,
            text: '班主任'
        }, {
            value: 4,
            text: '学生'
        }, ],
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return row[opts.valueField] + '-' + row[opts.textField];
        }
    });











});