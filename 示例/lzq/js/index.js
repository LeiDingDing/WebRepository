$(function () {
    obj = {
        //图片预览
        previewPic:function PreviewImage(fileObj, imgPreviewId, divPreviewId) {
            var allowExtention = ".jpg,.bmp,.gif,.png"; //允许上传文件的后缀名document.getElementById("hfAllowPicSuffix").value;
            var extention = fileObj.value.substring(fileObj.value.lastIndexOf(".") + 1).toLowerCase();
            var browserVersion = window.navigator.userAgent.toUpperCase();
            if (allowExtention.indexOf(extention) > -1) {
                if (fileObj.files) {//HTML5实现预览，兼容chrome、火狐7+等
                    if (window.FileReader) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            document.getElementById(imgPreviewId).setAttribute("src", e.target.result);
                            document.getElementById(imgPreviewId).setAttribute("jqimg", e.target.result);
                        }
                        reader.readAsDataURL(fileObj.files[0]);
                    } else if (browserVersion.indexOf("SAFARI") > -1) {
                        alert("不支持Safari6.0以下浏览器的图片预览!");
                    }
                } else if (browserVersion.indexOf("MSIE") > -1) {
                    if (browserVersion.indexOf("MSIE 6") > -1) {//ie6
                        document.getElementById(imgPreviewId).setAttribute("src", fileObj.value);
                        document.getElementById(imgPreviewId).setAttribute("jqimg", fileObj.value);
                    } else {//ie[7-9]
                        fileObj.select();
                        if (browserVersion.indexOf("MSIE 9") > -1)
                            fileObj.blur(); //不加上document.selection.createRange().text在ie9会拒绝访问
                        var newPreview = document.getElementById(divPreviewId + "New");
                        if (newPreview == null) {
                            newPreview = document.createElement("div");
                            newPreview.setAttribute("id", divPreviewId + "New");
                            newPreview.style.width = document.getElementById(imgPreviewId).width + "px";
                            newPreview.style.height = document.getElementById(imgPreviewId).height + "px";
                            newPreview.style.border = "solid 1px #d2e2e2";
                        }
                        newPreview.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + document.selection.createRange().text + "')";
                        var tempDivPreview = document.getElementById(divPreviewId);
                        tempDivPreview.parentNode.insertBefore(newPreview, tempDivPreview);
                        tempDivPreview.style.display = "none";
                    }
                } else if (browserVersion.indexOf("FIREFOX") > -1) {//firefox
                    var firefoxVersion = parseFloat(browserVersion.toLowerCase().match(/firefox\/([\d.]+)/)[1]);
                    if (firefoxVersion < 7) {//firefox7以下版本
                        document.getElementById(imgPreviewId).setAttribute("src", fileObj.files[0].getAsDataURL());
                        document.getElementById(imgPreviewId).setAttribute("jqimg", fileObj.files[0].getAsDataURL());
                    } else {//firefox7.0+
                        document.getElementById(imgPreviewId).setAttribute("src", window.URL.createObjectURL(fileObj.files[0]));
                        document.getElementById(imgPreviewId).setAttribute("jqimg", window.URL.createObjectURL(fileObj.files[0]));
                    }
                } else {
                    document.getElementById(imgPreviewId).setAttribute("src", fileObj.value);
                    document.getElementById(imgPreviewId).setAttribute("jqimg", fileObj.value);
                }
            } else {
                alert("仅支持" + allowExtention + "为后缀名的文件!");
                fileObj.value = ""; //清空选中文件
                if (browserVersion.indexOf("MSIE") > -1) {
                    fileObj.select();
                    document.selection.clear();
                }
                fileObj.outerHTML = fileObj.outerHTML;
            }
            return fileObj.value;    //返回路径
        },
        close: function () {
            parent.$('#win').window("close");
        },
        //清空表单
        reset: function () {
            //清空表单时不能清空id
            var id=$('#ids').val();
            $('#ff').form('clear');
            $('#ids').val(id);
            $('#uploadInfo').remove();
            $('#prepic').attr('src','');
        },
        //验证图片大小,可省略
        validate_img: function (ele) {
            if (((ele.files[0].size).toFixed(2)) > (4 * 1024 * 1024)) {

                alert("请上传小于4M的图片");
                var file = $("#uploadaward");
                file.after(file.clone().val(""));
                file.remove();
                
            }
                  
        },
        //上传文件
        upload: function () {
            var achievetype = $('#achievetype').combobox('getValue');
            var file = $('#uploadaward').filebox('getValue');
            if (achievetype == '') {
                parent.$.messager.alert('提示','请选择成果类型！');
            }else if(file==''){
                parent.$.messager.alert('提示', '请选择图片文件！');
            } else {
                $.ajax({
                    url: '../ashx/Award.ashx?action=upload',
                    type: 'post',
                    data: new FormData($('#ff')[0]),
                    processData: false,
                    contentType: false,
                    success: function (result) {
                        var arr = result.split('/');
                        var picname = arr[4];
                        $('#files').val(picname);
                        $('#uploadInfo').remove();
                        var str = '<span id="uploadInfo">上传成功！文件名：' + picname + '</span>';
                        $('#uploaddiv').append(str);
                        // $('#prepic').attr('src', result);
                    }
                });
            }
           
            
        },
        check:function(){
            var id = $('#ids').val();
            var role = parent.$('#roleclass').combobox('getValue');
            $.post('../ashx/Award.ashx?action=check', { id: id, role: role }, function (result) {
                parent.$.messager.alert('提示', '审核成功!', 'info', function () {
                    parent.$("#win").window("close");
                    parent.$("iframe[title='获奖管理']").get(0).contentWindow.$("#dg").datagrid("reload");
                });
                
            });
            
        },
        add: function () {
            $('#checkdiv').css('display', 'none');
            $('#peonum').combobox('setValue', 5);
            $('#deptnum').combobox('setValue', 3);

            $('#getname').textbox('disable');
            $('#getnamegz').combobox({
                disabled: true
            });
            $('#getunit').textbox('disable');
            $('#ayear').combobox({
                disabled: true
            });
            $('#reward').textbox('disable');
            $('#prepic').css('display', 'none');
            $("#uploadaward").filebox("disable");
            $("#uploadbtn").css("display", 'none');
        },
        scan: function (id) {
            //设置disable
            var role = parent.$('#roleclass').combobox('getValue');
            if(role=='1'){
                $('#checkdiv').css('display', 'none');
            }
            $('#savediv').css('display','none');

            $('#name').textbox('disable');
            $('#declareunit').combobox({
                disabled:true
            });
            $('#declaregongzi').textbox('disable');

            $('#dyear').combobox({
                disabled: true
            });
            $('#awardunit').textbox('disable');

            $('#declaregrade').combobox({
                disabled: true
            });
            $('#awardname').textbox('disable');

            $('#awardrank').combobox({
                disabled: true
            });
            $('#achievement').textbox('disable');
            
            $('#getname').textbox('disable');
            $('#getnamegz').combobox({
                disabled: true
            });
            $('#getunit').textbox('disable');

            $('#ayear').combobox({
                disabled: true
            });
            $('#reward').textbox('disable');

            $('#peonum').combobox({
                disabled: true
            });
            $('#deptnum').combobox({
                disabled: true
            });
            
            $('#xk1').combobox('disable');
            $('#xk2').combobox('disable');
            $('#xk3').combobox('disable');
            $('#achievetype').combobox('disable');
            $("#uploadaward").filebox("disable");
            $("#uploadbtn").css("display", 'none');

            $.post("../ashx/Award.ashx?action=query", { id: id }, function (result) {
                var arr = eval(result);
                //用来存放主要完成人的信息
                var peoplearr = [];
                for (var i = 1; i <= 20; i++) {
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
                    var peoplenameobj = '#peopletb tr:eq(' + i + ') input[title="peoplename"]';
                    var peopleunitobj = '#peopletb tr:eq(' + i + ') input[title="peopleunit"]';
                    var gongziobj = '#peopletb tr:eq(' + i + ') input[title="gongzi"]';
                    var deptidobj = '#peopletb tr:eq(' + i + ') input[title="deptid"]';
                    var deptnameobj = '#peopletb tr:eq(' + i + ') input[title="peopledept"]';
                    $(peoplenameobj).textbox('setValue', peoplearr[i - 1]['peoplename']);
                    $(peopleunitobj).combobox('setText', peoplearr[i - 1]['peopleunit']);
                    $(gongziobj).combobox('setText', peoplearr[i - 1]['gongzi']);
                    $(deptidobj).combobox('setText', peoplearr[i - 1]['deptid']);
                    $(deptnameobj).combobox('setText', peoplearr[i - 1]['deptname']);
                    $(peoplenameobj).textbox('disable');
                    $(peopleunitobj).combobox('disable');
                    $(gongziobj).combobox('disable');
                    
                }
                //用来存放完成单位的信息
                var deptarr = [];
                for (var i = 1; i <= 10; i++) {
                    var deptname = '第' + i + '完成单位';
                    if (arr[0][deptname] != '') {
                        deptarr.push(arr[0][deptname]);
                    }
                }

                var deptnum = deptarr.length;
                $('#deptnum').combobox('setValue', deptnum);
                for (var i = 1; i <= deptnum; i++) {
                    var deptobj = '#depttb tr:eq(' + i + ') input[title="unitname"]';
                    $(deptobj).combobox('setValue', deptarr[i - 1]);
                    $(deptobj).combobox('disable');
                }
                var pic = '<span id="uploadInfo">文件名：' + arr[0].获奖证书 + '</span>';
                $('#files').val(arr[0].获奖证书);
                $('#uploaddiv').append(pic);
                //加载表单数据
                $('#ff').form('load', {
                    name: arr[0].申报人,
                    declareunit: arr[0].申报人所在单位,
                    declaregongzi: arr[0].申报人工资号,
                    dyear: arr[0].申报年度,
                    awardunit: arr[0].颁奖单位,
                    declaregrade: arr[0].等级,
                    awardname: arr[0].奖种名称,
                    awardrank: arr[0].奖种级别,
                    achievement: arr[0].成果名称,
                    getname: arr[0].领奖人,
                    getnamegz: arr[0].领奖人工资号,
                    getunit: arr[0].领奖人所在单位,
                    ayear: arr[0].获奖年度,
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
                $('#prepic').attr('src', allpic);
                $('#prepic').attr('jqimg', allpic);
            });
            
            
        },
        //更新数据时自动填充表单
        update: function (id) {
            $('#checkdiv').css('display', 'none');

            $('#getname').textbox({
                prompt: '领奖人不能为空',
                required:true
            });
            
            $('#getunit').textbox({
                required: true
            });
            $('#ayear').datebox({
                required:true
            });
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
                    var peoplenameobj = '#peopletb tr:eq(' + i + ') input[title="peoplename"]';
                    var peopleunitobj = '#peopletb tr:eq(' + i + ') input[title="peopleunit"]';
                    var gongziobj = '#peopletb tr:eq(' + i + ') input[title="gongzi"]';
                    var deptidobj = '#peopletb tr:eq(' + i + ') input[title="deptid"]';
                    var deptnameobj = '#peopletb tr:eq(' + i + ') input[title="peopledept"]';
                    $(peoplenameobj).textbox('setValue',peoplearr[i - 1]['peoplename']);
                    $(peopleunitobj).combobox('setText', peoplearr[i - 1]['peopleunit']);
                    $(gongziobj).combobox('setText', peoplearr[i - 1]['gongzi']);
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
                $('#deptnum').combobox('setValue', deptnum);
                for (var i = 1; i <= deptnum;i++){
                    var deptobj = '#depttb tr:eq(' + i + ') input[title="unitname"]';
                    $(deptobj).combobox('setValue',deptarr[i-1]);
                }
                var pic = '<span id="uploadInfo">文件名：' + arr[0].获奖证书 + '</span>';
                $('#files').val(arr[0].获奖证书);
                $('#uploaddiv').append(pic);
                //加载表单数据
                $('#ff').form('load', {
                    name: arr[0].申报人,
                    declareunit: arr[0].申报人所在单位,
                    declaregongzi:arr[0].申报人工资号,
                    dyear: arr[0].申报年度,
                    awardunit: arr[0].颁奖单位,
                    declaregrade: arr[0].等级,
                    awardname: arr[0].奖种名称,
                    awardrank: arr[0].奖种级别,
                    achievement: arr[0].成果名称,
                    getname: arr[0].领奖人,
                    getnamegz: arr[0].领奖人工资号,
                    getunit:arr[0].领奖人所在单位,
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
                $('#prepic').attr('src', allpic);
                $('#prepic').attr('jqimg', allpic);
            });
            
            
        },
        confirm:function(){
            parent.$.messager.confirm('提示', '是否确认提交?', function (r) {
                if (r) {
                    obj.formsubmit();
                }
            });
        },
        formsubmit: function () {
            
            
            //申报人
            var name = $('#name').val();
            //申报人工资号
            var declaregongzi = $('#declaregongzi').textbox('getText');
            //颁奖单位
            var awardunit = $('#awardunit').val();
            //申报单位
            var declareunit = $('#declareunit').combobox('getText');
            //申报年度
            var dyear = $('#dyear').datebox('getValue');
            //奖种名称
            var awardname = $('#awardname').val();
            //成果名称
            var achievement = $('#achievement').val();
            //成果类型
            var achievetype = $('#achievetype').combobox('getValue');
            //等级
            var declaregrade = $('#declaregrade').combobox('getValue');
            //奖种级别
            var awardrank = $('#awardrank').combobox('getText');
            //单位排序
            var unitorder = $('#unitorder').combobox('getValue');

            var xkmc1 = $('#xk1').combobox('getText');
            var xkmc2 = $('#xk2').combobox('getText');
            var xkmc3 = $('#xk3').combobox('getText');
            //判断完成人信息是否填写完整
            var peoflag = true;
            $('input[title="peoplename"]').each(function () {
                var obj = $(this).parent().parent('tr').find('input[title = "peopleunit"]');
                var gzobj = $(this).parent().parent('tr').find('input[title = "gongzi"]');
                //var id = $(this).parent().parent('tr').children("td:first").text();
                // $(obj).combobox('setValue', 'aaa');
                // $('#peopletb input[title = "peopleunit"]').combobox('setValue', 'aaa');
                if ($(this).textbox('getValue') == '' && $(obj).combobox('getText') != '' || $(this).textbox('getValue') != '' && $(obj).combobox('getText') == '') {
                    peoflag = false;
                    return false;
                } else if ($(this).val() != '' && $(obj).combobox('getText') == '扬州大学' && $(gzobj).combobox('getText') == '') {
                    peoflag = false;
                    return false;
                }
                
            });
            
            if (name == '' || declaregongzi == '' || awardunit == '' || awardname == '' || achievement == '' || declareunit == '' || xkmc1 == '' || xkmc2 == '' || dyear == '' || declaregrade == '' || achievetype=='') {
                $.messager.show({
                    title: '提示消息',
                    msg: '带 ' + '<span class="star">*</span>' + ' 标记处不能为空',
                    timeout: 2000,
                    showType: 'slide'
                });
            } else if (peoflag == false) {
                $.messager.show({
                    title: '提示消息',
                    msg: '完成人信息未填写完整,请继续填写!',
                    timeout: 2000,
                    showType: 'slide'
                });
            } else {
                //领奖人
                var getname = $('#getname').val();
                //领奖人工资号
                var getnamegz = $('#getnamegz').combobox('getText');
                //领奖人工所在单位
                var getunit = $('#getunit').textbox('getText');
                //获奖年度
                var ayear = $('#ayear').datebox('getValue');
                 //奖励
                var reward = $('#reward').val();
                //参与人工资号字符串
                var gzs = declaregongzi;
                if(getnamegz!=''){
                    gzs = gzs + ',' + getnamegz;
                }
                //完成单位
                
                var workunit = [];
                $('input[name="unitname"]').each(function () {
                    workunit.push($(this).val());
                });
                //完成人姓名
                var workname = [];
                //完成人工资号
                var gongzi = [];
                //完成人部门码
                var deptid = [];
                //完成人部门名
                var workdept = [];
                //完成人所在单位
                var peopleunit = [];
                $('input[title="peoplename"]').each(function () {
                    var obj = $(this).parent().parent('tr').find('input[title = "peopleunit"]');
                    var gzobj = $(this).parent().parent('tr').find('input[title = "gongzi"]');
                    var deptidobj = $(this).parent().parent('tr').find('input[title = "deptid"]');
                    var deptnameobj = $(this).parent().parent('tr').find('input[title = "peopledept"]');
                    if($(this).val()!=''){
                        workname.push($(this).textbox('getValue'));
                        gongzi.push($(gzobj).combobox('getText'));
                        deptid.push($(deptidobj).combobox('getText'));
                        workdept.push($(deptnameobj).combobox('getText'));
                        peopleunit.push($(obj).combobox('getText'));
                    }
                    

                });
                for (var i = 0; i < gongzi.length;i++){
                    if(gongzi[i]!=''){
                        gzs = gzs + ',' + gongzi[i];
                    }
                }
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
                        '申报人工资号': declaregongzi,
                        '成果名称': achievement,
                        '颁奖单位': awardunit,
                        '申报年度': dyear,
                        '奖种名称': awardname,
                        '奖种级别': awardrank,
                        '等级': declaregrade,
                        '领奖人': getname,
                        '领奖人工资号': getnamegz,
                        '领奖人所在单位': getunit,
                        '获奖年度': ayear,
                        '奖励金额': reward,
                        '单位排序': unitorder,
                        'xkmc1': xkmc1,
                        'xkmc2': xkmc2,
                        'xkmc3': xkmc3,
                        '成果类型': achievetype,
                        '完成单位': unit,
                        '完成人': person,
                        '参与人工资号':gzs
                    });
                    $.post('../ashx/Award.ashx?action=save', { row: insertarr }, function (result) {
                        parent.$.messager.alert('提示', '添加成功!', 'info', function () {
                            parent.$("#win").window("close");
                            parent.$("iframe[title='获奖管理']").get(0).contentWindow.$("#dg").datagrid("reload");
                        });
                    });
                } else {
                    
                    var id = $('#ids').val();
                    
                    //获奖证书
                    var awardpic = $('#files').val();
                    if (getname == '' || getnamegz == '' || ayear == '' || awardpic == '' || getunit == '') {
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
                            '申报人工资号':declaregongzi,
                            '成果名称': achievement,
                            '颁奖单位': awardunit,
                            '申报年度': dyear,
                            '奖种名称': awardname,
                            '奖种级别': awardrank,
                            '等级': declaregrade,
                            '领奖人': getname,
                            '领奖人工资号': getnamegz,
                            '领奖人所在单位':getunit,
                            '获奖年度': ayear,
                            '奖励金额': reward,
                            '单位排序': unitorder,
                            'xkmc1': xkmc1,
                            'xkmc2': xkmc2,
                            'xkmc3': xkmc3,
                            '成果类型': achievetype,
                            '完成单位': unit,
                            '完成人': person,
                            '获奖证书': awardpic,
                            '参与人工资号': gzs
                        });
                        $.post('../ashx/Award.ashx?action=update', { row: updatearr }, function (result) {
                            parent.$.messager.alert('提示', '更新成功!','info', function () {
                                parent.$("#win").window("close");
                                parent.$("iframe[title='获奖管理']").get(0).contentWindow.$("#dg").datagrid("reload");
                            });
                        });
                    }
                    
                }
                
            }
            
            
        },
        peotable: function (newValue, oldValue) {
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
                    peostr += '<tr id="peoinfo' + i + '"><td>第' + i + '完成人</td><td><input title="peoplename" name="peoplename" type="text" style="width:70%"/></td><td><input title="peopleunit" name="peopleunit" style="width:80%" /></td><td><input title="gongzi" name="gongzi" style="width:50%"/></td><td><input title="deptid" name="deptid" style="width:50%"/></td><td><input title="peopledept" name="peopledept" style="width:70%"/></td></tr>';
                }
                $('#peopletb').append(peostr);
            } else if (newNum < oldNum) {
                for (var i = newNum + 1; i <= oldNum; i++) {
                    var tr = '#peoinfo' + i;
                    $(tr).remove();
                }

            }

            /*
            *完成人改变立即清空该行其他信息,并判断该完成人单位是否为扬州大学
            */

            $('#peopletb input[name = "peoplename"]').textbox({
                
                onChange: function (newValue, oldValue) {
                       $(this).parent().parent('tr').find('input[title = "peopleunit"]').combobox({
                            valueField: 'value',
                            textField: 'value',
                            editable: true,
                            data: [],
                        });
                        $(this).parent().parent('tr').find('input[title = "gongzi"]').combobox('clear');
                        $(this).parent().parent('tr').find('input[title = "deptid"]').combobox('clear');
                        $(this).parent().parent('tr').find('input[title = "peopledept"]').combobox('clear');
                        var obj = $(this).parent().parent('tr').find('input[title = "peopleunit"]');
                        var gzobj = $(this).parent().parent('tr').find('input[title = "gongzi"]');
                        var deptidobj = $(this).parent().parent('tr').find('input[title = "deptid"]');
                        var deptnameobj = $(this).parent().parent('tr').find('input[title = "peopledept"]');
                        var url = '../ashx/Award.ashx?action=isyzu';
                        $(obj).combobox({
                            valueField: 'value',
                            textField: 'value',
                            editable: true,
                            onShowPanel: function () {
                                $.post(url, { peoplename: newValue }, function (result) {
                                    if (result == 'True') {
                                        $(obj).combobox({
                                            valueField: 'value',
                                            textField: 'value',
                                            editable: true,
                                            data: [{
                                                value: '扬州大学'
                                            }],
                                            
                                        });
                                    }

                                });
                            },
                            onSelect: function (record) {
                                $(gzobj).combobox('enable');

                            },
                            onLoadSuccess: function () { //加载完成后,设置选中第一项  
                                /*var val = $(this).combobox('getData');
                                for (var item in val[0]) {
                                    if (item == 'value') {
                                        $(this).combobox('select', val[0][item]);
                                    }
                                }*/

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
                       /* $.post(url, { peoplename: newValue }, function (result) {
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

                        });*/
                        
                        
                           
                        
                    
                    
                }
            });
            $('#peopletb input[name = "gongzi"]').combobox({
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
            $('#peopletb input[name="deptid"]').combobox({
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
            $('#peopletb input[name="peopledept"]').combobox({
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

            $('#peopletb input[name="peopleunit"]').combobox({
               /* valueField: 'label',
                textField: 'value',
                editable: true,
                data: [{
                    label: '扬州大学',
                    value: '扬州大学'
                }],
                onSelect: function (record) {
                    alert(record.value);
                },
                onChange: function (newValue, oldValue) {
                    var obj = $('#peopletb input[name="peopleunit"]');
                    var unitarr = [];
                    $(obj).each(function () {
                        if ($(this).val() != '') {
                            if ($.inArray($(this).val(), unitarr) == -1) {
                                unitarr.push($(this).val());
                            }

                        }
                    });
                    var num = unitarr.length;
                    $('#deptnum').combobox('setValue', num);
                    for (var i = 1; i <= num; i++) {
                        var objstr = '#depttb tr:eq(' + i + ') input[title="unitname"]';
                        $(objstr).combobox('clear');
                        $(objstr).combobox('setValue',unitarr[i-1]);
                    }


                }*/
            });
        }


    };
    
    /*
    **页面初始化
    */
    $('#declareunit').combobox({
        valueField: '身份',
        textField: '学院名',
        editable: false,
        panelHeight: 100,
        panelWidth: 200,
        formatter: function (row) {
            return row['学院名'] + ' ' + row['身份'];
        },
        onShowPanel: function () {
            var name = $("#name").val();
            var url = '../ashx/Award.ashx?action=getdept&name=' + name;
            $('#declareunit').combobox('reload', url);
        },
        onSelect: function (record) {
            if(record){
                var info = record.身份;
                var arr = info.split(' ');
                $('#declaregongzi').textbox('setText',arr[1]);
            }
        }

    });
    //设置申报年份
    /*$("#dyear").combobox({
        valueField:'year',    
        textField: 'year',
        editable: false,
        panelHeight:'auto'
    });
    $("#ayear").combobox({
        valueField: 'year',
        textField: 'year',
        editable: false,
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
    $("#ayear").combobox("setValue", thisYear);//设置默认值为今年*/
    $("#dyear").datebox({
        required:true

    });
    $("#ayear").datebox({


    });
    //设置三级学科
    $('#xk1').combobox({
        valueField: 'id',
        textField: 'content',
        editable: false,
        panelHeight: 200,
        panelWidth: 200,
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
        panelWidth: 200,
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
        panelWidth: 240,
        editable: false,
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return row[opts.valueField] + '-' + row[opts.textField];
        },

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
            

        },
        onSelect: function (record) {
            if (record) {
                var info = record.身份;
                var arr = info.split(' ');
                $('#getunit').textbox('setText', arr[0]);
            }
        }
    });
        
   
    $('#deptnum').combobox({
        editable: false,
        panelHeight: 200,
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
                    deptstr += '<tr id="deptinfo' + i + '"><td>第' + i + '完成单位</td><td><input title="unitname" name="unitname" type="text" style="width:90%;"/></td>';
                }
                $('#depttb').append(deptstr);
            }else if(newNum<oldNum){
                for (var i = newNum + 1; i <= oldNum; i++) {
                    var tr = '#deptinfo' + i;
                    $(tr).remove();
                }
            }
            
            $('#depttb input[name="unitname"]').combobox({
                valueField:'value',    
                textField:'value',
                onChange: function (newValue, oldValue) {
                    var obj = $(this);
                    $('#depttb input[title="unitname"]').each(function () {
                        var sobj = $(this);
                        if ($(sobj).combobox('getText') == newValue && !obj.is(sobj)) {
                            $(sobj).combobox('setValue',oldValue);
                        }
                    });
                    var obj = $('#depttb input[title="unitname"]');
                    var allunit = [];
                    $(obj).each(function () {
                        var unit = $(this).combobox('getText');
                        if (unit != '') {
                            if ($.inArray(unit, allunit) == -1) {
                                allunit.push(unit);
                            }
                            
                        }
                    });
                    var order = $.inArray('扬州大学', allunit);
                    $('#unitorder').combobox('setValue',order+1);
                },
                onShowPanel: function () {
                    var old=$(this).combobox('getValue');
                    var obj = $('#peopletb input[title="peopleunit"]');
                    var unitarr = [];
                    $(obj).each(function () {
                        var unitsingle = $(this).combobox('getText');
                        if (unitsingle != '') {
                            if ($.inArray(unitsingle, unitarr) == -1) {
                                unitarr.push(unitsingle);
                            }

                        }
                    });
                    var num = unitarr.length;
                    var data = [];
                    for (var i = 0; i < num; i++) {
                        data.push({
                            value: unitarr[i]
                        });
                    }
                    $(this).combobox({
                        valueField: 'value',
                        textField: 'value',
                        data: data,
                    });
                    $(this).combobox('setValue', old);
                }
            });

        }
    });
    
    //动态显示完成人列表
    $('#peonum').combobox({
        editable:false,
        panelHeight: 200,
        onChange: function (newValue, oldValue) {
                obj.peotable(newValue, oldValue);
                
            }
    });
    //var peonum = $('#peonum').combobox('getValue');
    //obj.peotable(peonum, 0);
    
    
    $('#name').textbox({
        prompt: '申报人不能为空',
        required: true,
        onChange: function (newValue, oldValue) {
            $('#declaregongzi').textbox('clear');
            var url='../ashx/Award.ashx?action=getdept&name=' + newValue;
            $('#declareunit').combobox({
                valueField: '身份',
                textField: '学院名',
                url:url
            });
        }
    });
    $('#awardunit').textbox({
        prompt: '颁奖单位不能为空',
        required: true
    });
    $('#awardname').textbox({
        prompt: '奖种名称不能为空',
        required: true
    });
    $('#achievement').textbox({
        prompt: '成果名称不能为空',
        required: true
    });
    $('#getname').textbox({
        onChange: function (newValue, oldValue) {
            $('#getunit').textbox('clear');
            var url = '../ashx/Award.ashx?action=getsalary&peoplename=' + newValue;
            $('#getnamegz').combobox({
                valueField: '身份',
                textField: '工资号',
                url: url
            });
        }
    });
    
    $('#reward').textbox({

    });
    
    $('#uploadaward').filebox({
        buttonText: '选择',
        buttonAlign: 'right',
        accept: 'image/jpeg',
        width: 180,
        prompt: '选择小于4M的jpg图片',
        onChange: function (e) {
            // file对象
            var fileobj = $(this).next().find('input[id^="filebox_file_id_"]');
            // 上传的文件大小
            var file = fileobj[0].files[0];
            //浏览器版本
            var browserVersion = window.navigator.userAgent.toUpperCase();
            var path = $(this).filebox('getValue');
            var ext = path.substring(path.lastIndexOf(".") + 1);
            var fileSzie = file.size;
            if (fileSzie > (4 * 1024 * 1024)) {
                parent.$.messager.alert("请上传小于4M的图片");
            }
            obj.previewPic(fileobj[0], 'prepic', 'divPreview');
            
        }
    });
    $(".jqzoom").jqueryzoom({
        xzoom: 200, //放大图的宽度(默认是 200)
        yzoom: 200, //放大图的高度(默认是 200)
        offset: 10, //离原图的距离(默认是 10)
        position: "right", //放大图的定位(默认是 "right")
        preload: 1
    });
});