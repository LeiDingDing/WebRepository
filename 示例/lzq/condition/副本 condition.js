function zqpanelsettitle(layout_id, stitle) {  //在收缩的panel上显示文字
    setTimeout(function () {
        var pDiv = $(layout_id + ' .layout-button-left').closest('.layout-expand').css({
            textAlign: 'center', lineHeight: '18px', fontWeight: 'bold'
        });
        var vTitle = stitle.split('').join('<br/>');
        pDiv.find('.panel-body').html(vTitle);
        /*
        var popts = $("#pwhere").panel('options');
        if (popts.title) {
        var vTitle = popts.title.split('').join('<br/>');
        pDiv.find('.panel-body').html(vTitle);
        }
        */
    }, 100);
}

function ClearText() {
    $('#user_search').form('reset');
    $('#user_search').form('clear');
}

var scmd = 'selectalldata';
function zqselect(saction,dbtype) {
    scmd = saction;
    $.ajax({
        url: "../condition/condition.ashx?action=" + scmd
            + "&dbtype=" + dbtype
            + ((scmd == 'selectalldata') ? "" : ("&" + $('#user_search').serialize())),
        type: "get",
        dataType: "json",
        success: function (result) {
            document.getElementById('btnSearchZq').click();  ////运行时要去除
        }
    });
}

function zqcombobox(id, surl, svalue, stext) //带复选框的combobox
{
    $(id).combobox({
        url: surl,
        method: 'get',
        valueField: svalue,
        textField: stext,
        panelHeight: 'auto',
        multiple: true
    });
}

function chkcombobox5(id, surl, svalue, stext) //带复选框的combobox
{
    $(id).combobox({
        url: surl,
        method: 'get',
        valueField: svalue,
        textField: stext,
        panelHeight: 'auto',
        multiple: true,
        formatter: function (row) {
            var opts = $(this).combobox("options");
            return "<input type='checkbox' class='combobox-checkbox'>" + row[opts.textField];
        },
        onShowPanel: function () {
            var opts = $(this).combobox("options");
            target = this;
            var values = $(target).combobox("getValues");
            $.map(values, function (value) {
                var children = $(target).combobox("panel").children();
                $.each(children, function (index, obj) {
                    if (value == obj.getAttribute("value") && obj.children && obj.children.length > 0) {
                        obj.children[0].checked = true;
                    }
                });
            });
        },
        onLoadSuccess: function () {
            var opts = $(this).combobox("options");
            var target = this;
            var values = $(target).combobox("getValues");
            $.map(values, function (value) {
                var children = $(target).combobox("panel").children();
                $.each(children, function (index, obj) {
                    if (value == obj.getAttribute("value") && obj.children && obj.children.length > 0) {
                        obj.children[0].checked = true;
                    }
                });
            });
        },
        onSelect: function (row) {
            var opts = $(this).combobox("options");
            var objCom = null;
            var children = $(this).combobox("panel").children();
            $.each(children, function (index, obj) {
                if (row[opts.valueField] == obj.getAttribute("value")) {
                    objCom = obj;
                }
            });
            if (objCom != null && objCom.children && objCom.children.length > 0) {
                objCom.children[0].checked = true;
            }
        },
        onUnselect: function (row) {
            var opts = $(this).combobox("options");
            var objCom = null;
            var children = $(this).combobox("panel").children();
            $.each(children, function (index, obj) {
                if (row[opts.valueField] == obj.getAttribute("value")) {
                    objCom = obj;
                }
            });
            if (objCom != null && objCom.children && objCom.children.length > 0) {
                objCom.children[0].checked = false;
            }
        }
    });
}

function chkcombobox3(id, surl, svalue, stext) //带复选框的combobox
{
    $(id).combobox({
        url: surl,
        textField: stext,
        valueField: svalue,
        multiple: true,
        editable: false,
        panelHeight: "auto",
        formatter: function (row) {
            var opts;
            if (row.selected == true) {
                opts = "<input type='checkbox' checked='checked' id='" + row.id + "' value='" + row.id + "'>" + row.text + "</input>";
            } else {
                opts = "<input type='checkbox' id='" + row.id + "' value='" + row.id + "'>" + row.text + "</input>";
            }
            return opts;
        },
        
        //width: 200,
        onSelect: function (rec) {
            oCheckbox = document.getElementById(rec.id);
            oCheckbox.checked = true;
        }, 
        onUnselect: function (rec) {
            oCheckbox = document.getElementById(rec.id);
            oCheckbox.checked = false;
        }
    });
}

function chkcomboboxDelay(id, surl, svalue, stext) //带复选框的combobox
{
    $(id).combobox({
        //url: surl,
        url: "",
        method: 'get',
        valueField: svalue,
        textField: stext,
        panelHeight: 260,
        multiple: true,
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return '<input type="checkbox" class="combobox-checkbox">' + row[opts.textField]
        },
        onShowPanel: function () {
            var opts = $(this).combobox('options');
            if (opts.url == "") {
                $(this).combobox('reload', surl);
            }
            var target = this;
            var values = $(target).combobox('getValues');
            $.map(values, function (value) {
                var el = opts.finder.getEl(target, value);
                el.find('input.combobox-checkbox')._propAttr('checked', true);
            })
        },
        onLoadSuccess: function () {
            var opts = $(this).combobox('options');
            var target = this;
            var values = $(target).combobox('getValues');
            $.map(values, function (value) {
                var el = opts.finder.getEl(target, value);
                el.find('input.combobox-checkbox')._propAttr('checked', true);
            })
        },
        //        onSelect: function (row) {
        //            //console.log(row);
        //            var opts = $(this).combobox('options');
        //            var el = opts.finder.getEl(this, row[opts.valueField]);
        //            el.find('input.combobox-checkbox')._propAttr('checked', true);
        //        },
        //        onUnselect: function (row) {
        //            var opts = $(this).combobox('options');
        //            var el = opts.finder.getEl(this, row[opts.valueField]);
        //            el.find('input.combobox-checkbox')._propAttr('checked', false);
        //        },
        onChange: function (newValue, oldValue) {
            var opts = $(this).combobox('options');
            var target = this;
            var data = $(target).combobox('getData');

            alert("change");
            //for (var i = 0; i < data.length; i++) {
            //  if (i == index) {
            //      $(jq).combobox('setValue', eval('data[index].' + opt.valueField));
            //      break;
            //  }
            //}

            $.map(data, function (value) {
                var el = opts.finder.getEl(target, value.text);
                el.find('input.combobox-checkbox')._propAttr('checked', false);
            })
            var values = $(target).combobox('getValues');
            $.map(values, function (value) {
                var el = opts.finder.getEl(target, value);
                el.find('input.combobox-checkbox')._propAttr('checked', true);
            })
        }
    });
}

function chkcombobox(id,surl,svalue,stext) //带复选框的combobox
{
    $(id).combobox({
        url: surl,
        method: 'get',
        valueField: svalue,
        textField: stext,
        panelHeight: 260,
        multiple: true,
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return '<input type="checkbox" class="combobox-checkbox">' + row[opts.textField]
        },
        onShowPanel: function () {
            var opts = $(this).combobox('options');
            var target = this;
            var values = $(target).combobox('getValues');
            $.map(values, function (value) {
                var el = opts.finder.getEl(target, value);
                el.find('input.combobox-checkbox')._propAttr('checked', true);
            })
        },
        onLoadSuccess: function () {
            var opts = $(this).combobox('options');
            var target = this;
            var values = $(target).combobox('getValues');
            $.map(values, function (value) {
                var el = opts.finder.getEl(target, value);
                el.find('input.combobox-checkbox')._propAttr('checked', true);
            })
        },
        //        onSelect: function (row) {
        //            //console.log(row);
        //            var opts = $(this).combobox('options');
        //            var el = opts.finder.getEl(this, row[opts.valueField]);
        //            el.find('input.combobox-checkbox')._propAttr('checked', true);
        //        },
        //        onUnselect: function (row) {
        //            var opts = $(this).combobox('options');
        //            var el = opts.finder.getEl(this, row[opts.valueField]);
        //            el.find('input.combobox-checkbox')._propAttr('checked', false);
        //        },
        onChange: function (newValue, oldValue) {
            var opts = $(this).combobox('options');
            var target = this;
            var data = $(target).combobox('getData');


            //for (var i = 0; i < data.length; i++) {
            //  if (i == index) {
            //      $(jq).combobox('setValue', eval('data[index].' + opt.valueField));
            //      break;
            //  }
            //}

            $.map(data, function (value) {
                var el = opts.finder.getEl(target, value.text);
                el.find('input.combobox-checkbox')._propAttr('checked', false);
            })
            var values = $(target).combobox('getValues');
            $.map(values, function (value) {
                var el = opts.finder.getEl(target, value);
                el.find('input.combobox-checkbox')._propAttr('checked', true);
            })
        }
    });
}

function setCmbTree(myid, cacheData, bmultiple) {
    $(myid).combotree({
        cascadeCheck: false,
        lines: true,
        editable: false,
        multiple: bmultiple,
        panelWidth: 300
    });
    if (cacheData== null) {
        $.ajax({
            url: "condition.ashx",
            type: "get",
            data: { action: "query_" + myid.replace("#", "") , rnd: Math.random().toString() },
            dataType: "json",
            success: function (result) {
                cacheData = result;
                $(myid).combotree('loadData', result);
            }
        });
    }
    else {
        $(myid).combotree('loadData', cacheData);
    }
}