$(function(){
	
	obj={

		peotable: function (key,newValue, oldValue,peopleobjstr) {
            var newNum = parseInt(newValue);
            var oldNum = 0;
            if (oldValue == '') {
                oldNum = 0;
            } else {
                oldNum = parseInt(oldValue);
            }
            if (newNum > oldNum) {
                var peostr = '';
                for (var i = oldNum + 1; i <= newNum; i++) {
                    peostr += '<tr id="peoinfo' + i + '"><td>第' + i + key +'</td><td><input title="peoplename" name="peoplename" type="text" style="width:70%"/></td><td><input title="peopleunit" name="peopleunit" style="width:80%" /></td><td><input title="gongzi" name="gongzi" style="width:50%"/></td><td><input title="deptid" name="deptid" style="width:50%"/></td><td><input title="peopledept" name="peopledept" style="width:70%"/></td></tr>';
                }
                $(peopleobjstr).append(peostr);
            } else if (newNum < oldNum) {
                for (var i = newNum + 1; i <= oldNum; i++) {
                    var tr = '#peoinfo' + i;
                    $(tr).remove();
                }

            }

           
            
            $('input[name = "peoplename"]').textbox({
                
                onChange: function (newValue, oldValue) {
                        $(this).parent().parent('tr').find('input[title = "peopleunit"]').combobox('clear');
                        $(this).parent().parent('tr').find('input[title = "gongzi"]').combobox('clear');
                        $(this).parent().parent('tr').find('input[title = "deptid"]').combobox('clear');
                        $(this).parent().parent('tr').find('input[title = "peopledept"]').combobox('clear');
                        var obj = $(this).parent().parent('tr').find('input[title = "peopleunit"]');
                        var gzobj = $(this).parent().parent('tr').find('input[title = "gongzi"]');
                        var deptidobj = $(this).parent().parent('tr').find('input[title = "deptid"]');
                        var deptnameobj = $(this).parent().parent('tr').find('input[title = "peopledept"]');
                        var url = '../ashx/Award.ashx?action=isyzu';
                        $.post(url, { peoplename: newValue }, function (result) {
                            if (result == 'True') {
                                $(obj).combobox({
                                    valueField: 'value',
                                    textField: 'value',
                                    editable: true,
                                    data: [{
                                        value: '扬州大学'
                                    }],
                                    onSelect: function (record) {
                                        $(gzobj).combobox('enable');

                                    },
                                    onLoadSuccess: function () { //加载完成后,设置选中第一项  
                                        var val = $(this).combobox('getData');
                                        for (var item in val[0]) {
                                            if (item == 'value') {
                                                $(this).combobox('select', val[0][item]);
                                            }
                                        }
                                    },
                                    onChange: function (newValue, oldValue) {
                                        if (newValue != '扬州大学') {
                                            $(gzobj).combobox('disable');
                                            $(gzobj).combobox('clear');
                                            $(deptidobj).combobox('clear');
                                            $(deptnameobj).combobox('clear');
                                        }

                                    }
                                });
                            }
                            /*else if (result == 'False') {
                                $(obj).combobox({
                                    valueField: 'value',
                                    textField: 'value',
                                    editable: true,
                                    data: [],
                                });

                            }*/


                        });
                    
                    
                }
            });
            $('input[name = "gongzi"]').combobox({
                valueField: '身份',
                textField: '工资号',
                editable: false,
                disabled:true,
                panelWidth: 180,
                formatter: function (row) {
                    var opts = $(this).combobox('options');
                    return row[opts.textField] + ' ' + row[opts.valueField];
                },
                onShowPanel: function () {
                    var obj = $(this);
                    var nameobj = $(this).parent().parent('tr').find('input[name = "peoplename"]');
                    var name = $(nameobj).val();
                    var url = '../ashx/Award.ashx?action=getsalary&peoplename=' + name;
                    $(this).combobox('clear');
                    $(this).combobox('reload', url);
                },
                onSelect: function (record) {
                    if (record) {
                        $(this).parent().parent('tr').find('input[title = "deptid"]').combobox('clear');
                        $(this).parent().parent('tr').find('input[title = "peopledept"]').combobox('clear');
                        //根据工资号自动选中学院码和学院名
                        var gongziobj = $(this).parent().parent('tr').find('input[title = "gongzi"]');
                        var gongzi = $(gongziobj).combobox('getText');
                        var url = '../ashx/Award.ashx?action=getdeptno&gongzi=' + gongzi;
                        $(this).parent().parent('tr').find('input[title = "deptid"]').combobox({
                            url: url,
                            onLoadSuccess: function () { //加载完成后,设置选中第一项  
                                var val = $(this).combobox('getData');
                                for (var item in val[0]) {
                                    if (item == '学院码') {
                                        $(this).combobox('select', val[0][item]);
                                    }
                                }
                            }
                        });
                        $(this).parent().parent('tr').find('input[title = "peopledept"]').combobox({
                            url: url,
                            onLoadSuccess: function () { //加载完成后,设置选中第一项  
                                var val = $(this).combobox('getData');
                                for (var item in val[0]) {
                                    if (item == '学院名') {
                                        $(this).combobox('select', val[0][item]);
                                    }
                                }
                            }
                        });
                    }
                }
            });
            $('input[name="deptid"]').combobox({
                valueField: '学院码',
                textField: '学院码',
                editable: false,
                disabled:true,
                onShowPanel: function () {
                    var gongziobj = $(this).parent().parent('tr').find('input[title = "gongzi"]');
                    var gongzi = $(gongziobj).combobox('getText');
                    var url = '../ashx/Award.ashx?action=getdeptno&gongzi=' + gongzi;
                    $(this).combobox('clear');
                    $(this).combobox('reload', url);
                }
            });
            $('input[name="peopledept"]').combobox({
                valueField: '学院名',
                textField: '学院名',
                editable: false,
                disabled: true,
                onShowPanel: function () {
                    var gongziobj = $(this).parent().parent('tr').find('input[title = "gongzi"]');
                    var gongzi = $(gongziobj).combobox('getText');
                    var url = '../ashx/Award.ashx?action=getdeptno&gongzi=' + gongzi;
                    $(this).combobox('clear');
                    $(this).combobox('reload', url);
                },

            });

            $('input[name="peopleunit"]').combobox({
               
            });
        }
	}
});