$(function () {
    obj = {
        reset:function(){
            $('#ff')[0].reset();
        },
        validate_img: function (ele) {
            if (((ele.files[0].size).toFixed(2)) > (4 * 1024 * 1024)) {

                alert("请上传小于4M的图片");
                var file = $("#uploadaward");
                file.after(file.clone().val(""));
                file.remove();
                
            }
                  
        },
        upload: function () {
            $('#ff').form('submit', {
                url: '../ashx/Award.ashx?action=upload',
                type:'post',
                success: function (result) {
                    var arr = result.split('/');
                    var picname = arr[4];
                    $('#files').val(picname);
                    $('#uploadInfo').remove();
                    var str = '<span id="uploadInfo">上传成功！文件名：' + picname + '</span>';
                    $('#uploaddiv').append(str);
                    $('#prepic').attr('src',result);
                }
            });

        },
        update: function (id) {
            $.post("../ashx/Award.ashx?action=query", {id:id}, function (result) {
                var arr = eval(result);
                //用来存放主要完成人的信息
                var peoplearr = [];
                for (var i = 1; i <= 20;i++){
                    var peoplename = '第' + i + '完成人';
                    var peopleunit = '第' + i + '完成人所在单位';
                    var gongzi = '第' + i + '完成人工资号';
                    var deptid = '第' + i + '完成人所在部门码';
                    var deptname = '第' + i + '完成人所在部门名';
                    if (arr[0][peoplename] != '') {
                        peoplearr.push({
                            peoplename: arr[0][peoplename],
                            peopleunit: arr[0][peopleunit],
                            gongzi: arr[0][gongzi],
                            deptid: arr[0][deptid],
                            deptname: arr[0][deptname]
                        })
                    } 
                }
                //填充完成人信息表
                var num = peoplearr.length;
                $('#peonum').combobox('setValue', num);
                
                for (var i = 1; i <= num; i++) {
                    var peoplenameobj = '#peopletb tr:eq(' + i + ') input[name="peoplename"]';
                    var peopleunitobj = '#peopletb tr:eq(' + i + ') input[title="peopleunit"]';
                    var gongziobj = '#peopletb tr:eq(' + i + ') input[title="gongzi"]';
                    var deptidobj = '#peopletb tr:eq(' + i + ') input[title="deptid"]';
                    var deptnameobj = '#peopletb tr:eq(' + i + ') input[title="peopledept"]';
                    $(peoplenameobj).val(peoplearr[i - 1]['peoplename']);
                    $(peopleunitobj).combobox('setText', peoplearr[i - 1]['peopleunit']);
                    $(gongziobj).combobox('setValue', peoplearr[i - 1]['gongzi']);
                    $(deptidobj).combobox('setText', peoplearr[i - 1]['deptid']);
                    $(deptnameobj).combobox('setText', peoplearr[i - 1]['deptname']);

                }
                //用来存放完成单位的信息
                var deptarr = [];
                for (var i = 1; i <= 10; i++) {
                    var deptname = '第' + i + '完成单位';
                    if(arr[0][deptname]!=''){
                        deptarr.push(arr[0][deptname]);
                    }
                }
                var deptnum = deptarr.length;
                $('#unitorder').combobox('setValue', deptnum);
                for (var i = 1; i <= deptnum;i++){
                    var deptobj = '#depttb tr:eq(' + i + ') input[name="unitname"]';
                    $(deptobj).val(deptarr[i-1]);
                }
                var pic = '<span id="uploadInfo">文件名：' + arr[0].获奖证书 + '</span>';
                $('#files').val(arr[0].获奖证书);
                $('#uploaddiv').append(pic);
                //加载表单数据
                $('#ff').form('load', {
                    name: arr[0].申报人,
                    declareunit: arr[0].申报人所在单位,
                    dyear: arr[0].申报年度,
                    awardunit: arr[0].颁奖单位,
                    declaregrade: arr[0].等级,
                    awardname: arr[0].奖种名称,
                    awardrank: arr[0].奖种级别,
                    achievement: arr[0].成果名称,
                    getname: arr[0].领奖人,
                    getnamegz: arr[0].领奖人工资号,
                    ayear:arr[0].获奖年度,
                    reward: arr[0].奖励金额,
                    xk1: arr[0].xkmc1,
                    xk2: arr[0].xkmc2,
                    xk3: arr[0].xkmc3,
                    achievetype: arr[0].成果类型,
                    
                });
                //加载图片
                var allpic = '';
                switch (arr[0].成果类型) {
                    case "基础研究":
                        allpic = '../Upload/Image/base/' + arr[0].获奖证书;
                        break;
                    case "应用基础研究":
                        allpic = '../Upload/Image/applicationBase/' + arr[0].获奖证书;
                        break;
                    case "工程技术服务":
                        allpic = '../Upload/Image/project/' + arr[0].获奖证书;
                        break;
                    case "技术服务":
                        allpic = '../Upload/Image/technology/' + arr[0].获奖证书;
                        break;
                }
                $('#prepic').attr('src',allpic);
            });
            
        },
        formsubmit: function () {
            
            $('#name').validatebox({
                required: true,
                missingMessage: '申报人不能为空!'
            });
            $('#awardunit').validatebox({
                required: true,
                missingMessage: '颁奖单位不能为空!'
            });
            $('#awardname').validatebox({
                required: true,
                missingMessage: '奖种名称不能为空!'
            });
            $('#achievement').validatebox({
                required: true,
                missingMessage: '成果名称不能为空!'
            });
            //申报人
            var name = $('#name').val();
            //颁奖单位
            var awardunit = $('#awardunit').val();
            //申报单位
            var declareunit = $('#declareunit').combobox('getText');
            //申报年度
            var dyear = $('#dyear').combobox('getValue');
            //奖种名称
            var awardname = $('#awardname').val();
            //成果名称
            var achievement = $('#achievement').val();
            //成果类型
            var achievetype = $('input[name="achievetype"]:checked').val();
            //等级
            var declaregrade = $('#declaregrade').combobox('getValue');
            //奖种级别
            var awardrank = $('#awardrank').combobox('getText');
            //单位排序
            var unitorder = $('#unitorder').combobox('getValue');
            
            var xkmc1 = $('#xk1').combobox('getText');
            var xkmc2 = $('#xk2').combobox('getText');
            var xkmc3 = $('#xk3').combobox('getText');
            
            
            if (name == '' || awardunit == '' || awardname == '' || achievement == '' || declareunit == '' || xkmc1 == '' || xkmc2 == '') {
                $.messager.show({
                    title: '提示消息',
                    msg: '带 * 标记处不能为空',
                    timeout: 2000,
                    showType: 'slide'
                });
            } else {
                //完成单位
                
                var workunit = [];
                $('input[name="unitname"]').each(function () {
                    workunit.push($(this).val());
                });
                //完成人姓名
                var workname = [];
                $('input[name="peoplename"]').each(function () {
                    workname.push($(this).val());

                });
                //完成人工资号
                var gongzi = [];
                $('input[title="gongzi"]').each(function () {
                    gongzi.push($(this).combobox('getText'));
                });

                //完成人部门码
                var deptid = [];
                $('input[name="deptid"]').each(function () {
                    deptid.push($(this).val());
                });
                //完成人部门名
                var workdept = [];
                $('input[name="peopledept"]').each(function () {
                    workdept.push($(this).val());
                });
                //完成人所在单位
                var peopleunit = [];
                $('input[name="peopleunit"]').each(function () {
                    peopleunit.push($(this).val());
                });
                //完成单位
                var unitnum = workunit.length;
                var unit = [];
                for (var i = 0; i < 10; i++) {
                    if (i < unitnum) {
                        unit.push({
                            unitname: workunit[i]
                        });
                    } else {
                        unit.push({
                            unitname: ''
                        });
                    }

                }
                //完成人信息
                var pernum = workname.length;
                var person = [];
                for (var i = 0; i < 20; i++) {
                    if (i < pernum) {
                        person.push({
                            pername: workname[i],
                            perunit: peopleunit[i],
                            pergongzi: gongzi[i],
                            perdeptid: deptid[i],
                            perdept: workdept[i]
                        });
                    } else {
                        person.push({
                            pername: '',
                            perunit: '',
                            pergongzi: '',
                            perdeptid: '',
                            perdept: ''
                        });
                    }

                }
                if ($('#ids').val() == '') {
                    var insertarr = [];
                    insertarr.push({
                        '申报人': name,
                        '申报人所在单位': declareunit,
                        '成果名称': achievement,
                        '颁奖单位': awardunit,
                        '申报年度': dyear,
                        '奖种名称': awardname,
                        '奖种级别': awardrank,
                        '等级': declaregrade,
                        '单位排序': unitorder,
                        'xkmc1': xkmc1,
                        'xkmc2': xkmc2,
                        'xkmc3': xkmc3,
                        '成果类型': achievetype,
                        '完成单位': unit,
                        '完成人': person
                    });
                    $.post('../ashx/Award.ashx?action=save', { row: insertarr }, function (result) {
                        $.messager.alert('提示', '添加成功!');
                    });
                } else {
                    
                    var id = $('#ids').val();
                    //领奖人
                    var getname = $('#getname').val();
                    //领奖人工资号
                    var getnamegz = $('#getnamegz').combobox('getText');
                    //获奖年度
                    var ayear = $('#ayear').combobox('getValue');
                    //奖励
                    var reward = $('#reward').val();
                    //获奖证书
                    var awardpic = $('#files').val();
                    if (getname == '' || getnamegz == '' || ayear == '' || awardpic == '') {
                        $.messager.show({
                            title: '提示消息',
                            msg: '带 * 标记处不能为空',
                            timeout: 2000,
                            showType: 'slide'
                        });
                    } else {
                        var updatearr = [];
                        updatearr.push({
                            'ID': id,
                            '申报人': name,
                            '申报人所在单位': declareunit,
                            '成果名称': achievement,
                            '颁奖单位': awardunit,
                            '申报年度': dyear,
                            '奖种名称': awardname,
                            '奖种级别': awardrank,
                            '等级': declaregrade,
                            '领奖人': getname,
                            '领奖人工资号': getnamegz,
                            '获奖年度': ayear,
                            '奖励金额': reward,
                            '单位排序': unitorder,
                            'xkmc1': xkmc1,
                            'xkmc2': xkmc2,
                            'xkmc3': xkmc3,
                            '成果类型': achievetype,
                            '完成单位': unit,
                            '完成人': person,
                            '获奖证书': awardpic
                        });
                        $.post('../ashx/Award.ashx?action=update', { row: updatearr }, function (result) {
                            $.messager.alert('提示', '更新成功!');
                        });
                    }
                    
                }
                
            }
            
            
        }


    };
    
    $('#name').blur(function () {
        var name = $("#name").val();
        $('#declareunit').combobox({
            valueField: '学院码',
            textField: '学院名',
            editable: false,
            panelHeight: 100,
            url: '../ashx/Award.ashx?action=getdept&name=' + name,
            onLoadSuccess: function () { //加载完成后,设置选中第一项  
                var val = $(this).combobox('getData');
                for (var item in val[0]) {
                    if (item == '学院名') {
                        $(this).combobox('select', val[0][item]);
                    }
                }
            }
        });
    });
    $('#declareunit').combobox({
        valueField: '学院码',
        textField: '学院名',
        editable: false,
        panelHeight: 100,
        onShowPanel: function () {
            var name = $("#name").val();
            var url = '../ashx/Award.ashx?action=getdept&name=' + name;
            $('#declareunit').combobox('reload', url);
        }

    });
    //设置申报年份
    $("#dyear").combobox({
        valueField:'year',    
        textField:'year',  
        panelHeight:'auto'
    });
    $("#ayear").combobox({
        valueField: 'year',
        textField: 'year',
        panelHeight: 'auto'
    });
    var data = [];//创建年度数组
    var startYear;//起始年份
    var thisYear=new Date().getUTCFullYear();//今年
    var endYear=thisYear+1;//结束年份
    //数组添加值（2012-2016）//根据情况自己修改
    for(startYear=endYear-4;startYear<=endYear;startYear++){
        data.push({"year":startYear});
    }
    $("#dyear").combobox("loadData", data);//下拉框加载数据
    $("#dyear").combobox("setValue", thisYear);//设置默认值为今年
    $("#ayear").combobox("loadData", data);//下拉框加载数据
    $("#ayear").combobox("setValue", thisYear);//设置默认值为今年
    //设置三级学科
    $('#xk1').combobox({
        valueField: 'id',
        textField: 'content',
        editable: false,
        panelHeight:200,
        url: '../ashx/Award.ashx?action=xk1',
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return row[opts.valueField] + '-' + row[opts.textField];
        },
        onSelect: function (record) {
            var url2 = '../ashx/Award.ashx?action=xk2&id1=' + record.id;
           // $('#xk2').combobox('enable');
            $('#xk2').combobox('clear');
            $('#xk2').combobox('reload', url2);
          //  $('#xk3').combobox('disable');
            $('#xk3').combobox('clear');
          
        }
    });

    $('#xk2').combobox({
        valueField: 'id',
        textField: 'content',
        panelHeight: 200,
        editable: false,
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return row[opts.valueField] + '-' + row[opts.textField];
        },

        onSelect: function (record) {
            if (record) {
                var url3 = '../ashx/Award.ashx?action=xk3&id2=' + record.id;
              //  $('#xk3').combobox('enable');
                $('#xk3').combobox('clear');
                $('#xk3').combobox('reload', url3);
            }
        }
    });
    $('#xk3').combobox({
        valueField: 'id',
        textField: 'content',
        panelHeight: 200,
        editable: false,
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return row[opts.valueField] + '-' + row[opts.textField];
        },

    });

    $('#getname').blur(function () {
        var name = $("#getname").val();
        $('#getnamegz').combobox({
            valueField: '身份',
            textField: '工资号',
            editable: false,
            panelWidth: 180,
            url: '../ashx/Award.ashx?action=getsalary&peoplename=' + name,
            onLoadSuccess: function () { //加载完成后,设置选中第一项  
                var val = $(this).combobox('getData');
                for (var item in val[0]) {
                    if (item == '工资号') {
                        $(this).combobox('select', val[0][item]);
                    }
                }
            }
        });
    });
    $('#getnamegz').combobox({
        valueField: '身份',
        textField: '工资号',
        editable: false,
        panelWidth: 180,
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return row[opts.textField] + ' ' + row[opts.valueField];
        },
        onShowPanel: function () {
            var obj = $(this);
            var nameobj = $('#getname');
            var name = $(nameobj).val();
            var url = '../ashx/Award.ashx?action=getsalary&peoplename=' + name;
            $(this).combobox('clear');
            $(this).combobox('reload', url);
            

        }
    });
        
   
    $('#unitorder').combobox({

        onChange: function (newValue, oldValue) {
            var newNum = parseInt(newValue);
            var oldNum = 0;
            if (oldValue == '') {
                oldNum = 0;
            } else {
                oldNum = parseInt(oldValue);
            }
            if(newNum>oldNum){
                var deptstr = '';
                for (var i = oldNum+1; i <= newValue; i++) {
                    deptstr += '<tr id="deptinfo' + i + '"><td>第' + i + '完成单位:</td><td><input name="unitname" type="text" style="width:90%;"/></td>';
                }
                $('#depttb').append(deptstr);
            }else if(newNum<oldNum){
                for (var i = newNum + 1; i <= oldNum; i++) {
                    var tr = '#deptinfo' + i;
                    $(tr).remove();
                }
            }
            

        }
    });

    
    //动态显示完成人列表
    $('#peonum').combobox({
        editable:false,
        panelHeight: 200,
          onChange: function (newValue, oldValue) {
               
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
                        peostr += '<tr id="peoinfo' + i + '"><td>第' + i + '完成人:</td><td><input name="peoplename" type="text" style="width:70%"/></td><td><input title="peopleunit" name="peopleunit" style="width:80%" /></td><td><input title="gongzi" name="gongzi" style="width:50%"/></td><td><input title="deptid" name="deptid" style="width:50%"/></td><td><input title="peopledept" name="peopledept" style="width:70%"/></td></tr>';
                    }
                    $('#peopletb').append(peostr);
                } else if (newNum < oldNum) {
                    for (var i = newNum + 1; i <= oldNum; i++) {
                        var tr = '#peoinfo' + i;
                        $(tr).remove();
                    }
                    
                }
              
                $('#peopletb input[name = "peoplename"]').blur(function () {
                    $(this).parent().parent('tr').find('input[title = "peopleunit"]').combobox('clear');
                    $(this).parent().parent('tr').find('input[title = "gongzi"]').combobox('clear');
                    $(this).parent().parent('tr').find('input[title = "deptid"]').combobox('clear');
                    $(this).parent().parent('tr').find('input[title = "peopledept"]').combobox('clear');
                    
                });
                $('#peopletb input[name = "gongzi"]').combobox({
                    valueField: '身份',
                    textField: '工资号',
                    editable: false,
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
                    }
                }
                });
                $('#peopletb input[name="deptid"]').combobox({
                    valueField: '学院码',
                    textField: '学院码',
                    editable: false,
                    onShowPanel: function () {
                        var gongziobj = $(this).parent().parent('tr').find('input[title = "gongzi"]');
                        var gongzi = $(gongziobj).combobox('getText');
                        var url = '../ashx/Award.ashx?action=getdeptno&gongzi=' + gongzi;
                        $(this).combobox('clear');
                        $(this).combobox('reload', url);
                    }
                });
                $('#peopletb input[name="peopledept"]').combobox({
                    valueField: '学院名',
                    textField: '学院名',
                    editable: false,
                    onShowPanel: function () {
                        var gongziobj = $(this).parent().parent('tr').find('input[title = "gongzi"]');
                        var gongzi = $(gongziobj).combobox('getText');
                        var url = '../ashx/Award.ashx?action=getdeptno&gongzi=' + gongzi;
                        $(this).combobox('clear');
                        $(this).combobox('reload', url);
                    },
                    
                });
                
                $('#peopletb input[name="peopleunit"]').combobox({
                    valueField: 'label',
                    textField: 'value',
                    editable: true,
                    data: [{
                        label: '扬州大学',
                        value:'扬州大学'
                    }],
                    onSelect: function (record) {

                    },
                    onChange: function (newValue, oldValue) {
                        var obj = $('#peopletb input[name="peopleunit"]');
                        var unitarr = [];
                        $(obj).each(function () {
                            if($(this).val()!=''){
                                if ($.inArray($(this).val(), unitarr) == -1) {
                                    unitarr.push($(this).val());
                                }
                                
                            }
                        });
                        var num = unitarr.length;
                        $('#unitorder').combobox('setValue',num);
                        $('#depttb tr:gt(0)').remove();
                        var deptstr='';
                        for (var i = 1; i <= num;i++){
                            deptstr += '<tr id="deptinfo' + i + '"><td>第' + i + '完成单位:</td><td><input name="unitname" type="text" style="width:90%;" value="' + unitarr[i - 1] + '" readonly/></td></tr>';
                        }
                        $('#depttb').append(deptstr);
                        
                        
                    }
                });
               
                

            }
    });
    $.extend($.fn.validatebox.defaults.rules, {
        // key:value  [key:函数名  value:{key:value}]
        // type: 函数名称, validator: 函数实现体
        // message: 错误key, value：具体的错误消息
        type: {
            validator: function (value, param) {
                // alert("value:" + value + ",param:" + param.length);
                // 获取当前文件的扩展名
                var ext = value.substring(value.lastIndexOf(".") + 1);
                var params = param[0].split(",");
                for (var i = 0; i < params.length; i++) {
                    if (ext == params[i])
                        return true;
                }
                return false;
            },
            // {0} 代表传入的第一个参数
            message: '文件类型必须为:{0}'
        }
    });
    $('#uploadaward').validatebox({
        required: true,   // file文本域 validatebox不能实现及时验证. 
        missingMessage: '必须要上传图片',
        // 如果验证的函数有参数,则直接在后面添中括号
        validType: "type['gif,png,jpg']"
    });
    
});