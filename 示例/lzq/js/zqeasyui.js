function zqpanelsettitle(layout_id, stitle) {  //在收缩的panel上显示文字
    setTimeout(function () {
        var popts = $("#pwhere").panel('options');
        if (popts.title) {
            var pDiv = $(layout_id + '>div.layout-expand-east>div.panel-body');
            if (pDiv.text() == "") {
                var vTitle = stitle.split('').join('<br/>');
                pDiv.html("<div style='width:25px;text-align:center;'>" + vTitle + "</div>");
            }
        }
    }, 300);
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


function chkcomboboxDelay(id, surl, svalue, stext,ipanelWidth) {
    chkcomboboxDelayWidth(id, surl, svalue, stext,ipanelWidth?ipanelWidth: null);
}
function chkcomboboxDelayWidth(id, surl, svalue, stext,ipanelWidth) //带复选框的combobox
{
    var orgCount=0;
    $(id).combobox({
        url: "",
        method: 'get',
        valueField: svalue,
        textField: stext,
        panelHeight: 210,
        panelWidth: ipanelWidth,
        multiple: true,
        reset: function () {
            $(id).combobox('reset');
            $(id).removeAttr('selected');
        },
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return '<input type="checkbox" class="combobox-checkbox">' + row[opts.textField]
        },
        onShowPanel: function () {
            var opts = $(this).combobox('options');
            if (opts.url == "") {
                $(this).combobox('reload', surl);
            }

            var values = $(this).combobox('getValues');
            var target = this;
            $.map(values, function (value) {
                var el = opts.finder.getEl(target, value);
                el.find('input.combobox-checkbox')._propAttr('checked', true);
            })
        },
        onLoadSuccess: function () {

            var opts = $(this).combobox('options');
            var values = $(this).combobox('getValues');
            var target = this;
            $.map(values, function (value) {
                var el = opts.finder.getEl(target, value);
                el.find('input.combobox-checkbox')._propAttr('checked', true);
            })
        },
        onChange: function (newValue, oldValue) {
            var opts = $(this).combobox('options');
            var data = $(this).combobox('getData');
            var target = this;
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
        //panelHeight: 260,
        multiple: true,
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return '<input type="checkbox" class="combobox-checkbox">' + row[opts.textField]
        },
        onShowPanel: function () {
            var opts = $(this).combobox('options');
            var values = $(this).combobox('getValues');
            var target = this;
            $.map(values, function (value) {
                var el = opts.finder.getEl(target, value);
                el.find('input.combobox-checkbox')._propAttr('checked', true);
            })

            var data = $(this).combobox('getData');
            var orgCount = data.length;
            if (orgCount <= 5)
                $(this).combobox('panel').height(120);
            else if (orgCount <= 10)
                $(this).combobox('panel').height(200);
            else
                $(this).combobox('panel').height(260); 
        },
        onLoadSuccess: function () {
            var opts = $(this).combobox('options');
            var values = $(this).combobox('getValues');
            var target = this;
            $.map(values, function (value) {
                var el = opts.finder.getEl(target, value);
                el.find('input.combobox-checkbox')._propAttr('checked', true);
            })
        },
        onChange: function (newValue, oldValue) {
            var opts = $(this).combobox('options');
            var data = $(this).combobox('getData');
            var target = this;
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

function chkcombobox2(id, surl, svalue, stext, ipanelWidth, onChange2) //带复选框的combobox
{
    $(id).combobox({
        url: surl,
        method: 'get',
        valueField: svalue,
        textField: stext,
        panelHeight: 260,
        panelWidth: ipanelWidth,
        multiple: true,
        onChange: onChange2,
        formatter: function (row) {
            var opts = $(this).combobox('options');
            return '<input type="checkbox" class="combobox-checkbox" />' + row[opts.textField];
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
        onChange: function (newValue, oldValue) {
            var opts = $(this).combobox('options');
            var target = this;
            var data = $(target).combobox('getData');
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