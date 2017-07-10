//高度动态设置  修改

function zqFancyboxOpenRefresh(url, fnRefresh) {
    $.fancybox.open({
        href: url,
        type: 'iframe',
        padding: 0,
        width: 1000,
        height: 500,
        afterClose: function () {
            fnRefresh();
        }
    });
}

function zqFancyboxOpenOnlyTop(url) {
    var jq = top.jQuery;
    jq.fancybox.open({
        href: url,
        type: 'iframe',
        padding: 0,
        width: 1200,
        height: 500
    });
}

function zqFancyboxOpenOnly(url) {
    $.fancybox.open({
        href: url,
        type: 'iframe',
        padding: 0,
        width: 1000,
        height: 500
    });
}

function zqFancyboxOpenAdd(url,urlParent) {
    $.fancybox.open({
        href: url,
        type: 'iframe',
        padding: 0,
        width: 1000,
        height: 500,
        afterClose: function () {
            window.location.href = urlParent;
            //myFrame.window.goback();  //ZqBar.ascx 
            //$('.fancybox-inner').window.goback();  //ZqBar.ascx 
            //goback();
        }
    });
}
function zqFancyboxOpen(url) {
    $.fancybox.open({
        href: url,
        type: 'iframe',
        padding: 0,
        width: 1000,
        height: 500,
        afterClose: function () {
            window.location.reload(true);
        }
    });
}

var zqfancybox_OpenAjaxSearchPage = function (zqTable, zqXml) {
    $.fancybox.open(
    { href: "../zqdbwhere/AJAXGENERALSEARCH/AjaxSeachPage.aspx?table="
        + zqTable + "&XmlFile=" + zqXml
        , type: 'iframe', padding: 5,width:580, height:450
    });
}

var zqfancybox_OpenAjaxSearchPageSql = function (zqTable, zqXml, sqlx) {
    $.fancybox.open(
    { href: "../zqdbwhere/AJAXGENERALSEARCH/AjaxSeachPage.aspx?table="
        + zqTable + "&XmlFile=" + zqXml+"&sqlx="+escape(sqlx)
        , type: 'iframe', padding: 5, width: 580, height: 450
    });
}

//var zqfancybox_OpenPaper_OldImport = function (itype) {
//    $.fancybox.open(
//    {   href: "paper_import.aspx?itype=" + itype,
//        type: 'iframe', 
//        padding: 5,
//        width: 880, 
//        height: 500,
//        afterClose: function() { window.location.reload(true);}
//    });
//}

var zqfancybox_OpenRewardImport = function (sname, itype) {
    $.fancybox.open(
    { href: "../import/zqUserImport.aspx?dtype=" + sname + "&itype=" + itype,
        type: 'iframe',
        padding: 5,
        width: 880,
        height: 500,
        afterClose: function () { window.location.reload(true); }
    });
}

var zqfancybox_OpenFormImport = function (sname, itype) {
    var surl = "";
    if (sname == "") return;
    surl = "../import/zqImport.aspx?stbname=" + sname + "&itype=" + itype
    $.fancybox.open(
    { href: surl,
        type: 'iframe',
        padding: 5,
        width: 800,
        height: 600,
        afterClose: function () { window.location.reload(true); }
    });
}

var zqfancybox_OpenDataGrid = function (srow, scol, svrow, svcol) {
    $.fancybox.open(
    { href: "../zqcharts/WfChart_DataGrid.aspx?row=" + srow + "&col=" + scol + "&vrow="
        + svrow + "&vcol=" + svcol, type: 'iframe', padding: 5,
        width: 820, height: 620,scrolling: 'none',
        transitionIn: 'none', transitionOut: 'none'
    });
}

var zqfancybox_OpenDataGrid2 = function (srow, svrow) {
    $.fancybox.open(
    { href: "../zqcharts/WfChart_DataGrid.aspx?row=" + srow + "&vrow="
        + svrow , type: 'iframe', padding: 5,
        width: 820, height: 620, scrolling: 'none',
        transitionIn: 'none', transitionOut: 'none'
    });
}