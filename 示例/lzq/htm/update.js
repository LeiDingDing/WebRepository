$(function () {
    obj = {
        
        modify: function (index) {
            var rows = parent.$('#dg').datagrid('getRows');
            var row = rows[index];
            $('#ff').form('load', {
                sid: row.id,
                name: row.姓名,
                password:row.密码,
                role: row.roleid,
                tel: row.电话,
                email: row.邮箱,
                address:row.住址
            });
        },
        scan: function (index) {
            var rows = parent.$('#dg').datagrid('getRows');
            var row = rows[index];
            $('#save').css('display', 'none');
            $('#ff').form('load', {
                sid: row.id,
                name: row.姓名,
                password: row.密码,
                role: row.roleid,
                tel: row.电话,
                email: row.邮箱,
                address: row.住址
            });
        },
        add:function(){
            
        },
        save: function () {
            var id = $('#sid').textbox('getValue');
            var name = $('#name').textbox('getValue');
            var pass = $('#password').textbox('getValue');
            var role = $('#role').combobox('getValue');
            var tel = $('#tel').textbox('getValue');
            var email = $('#email').textbox('getValue');
            var address = $('#address').textbox('getValue');
            var row = [];
            row.push({
                id: id,
                姓名: name,
                密码:pass,
                角色: role,
                电话: tel,
                邮箱: email,
                住址:address
            });
            
            $.post('../ashx/Award.ashx?action=save', {row:row}, function (result) {
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
    
    $('#sid').textbox({
        disabled: true,
        prompt: '自动生成',
    });
    $('#name').textbox({

    });
    $('#password').textbox({
        type: 'password'
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
        disabled:true,
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
        onLoadSuccess: function () { //加载完成后,设置选中第一项  
            var val = $(this).combobox('getData');
            for (var item in val[3]) {
                if (item == 'value') {
                    $(this).combobox('select', val[3][item]);
                }
            }

        },
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return row[opts.valueField] + '-' + row[opts.textField];
        }
    });











});