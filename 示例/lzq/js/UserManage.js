$(function () {
obj = {
    editRow:undefined,
//    search : function () {
//        $('#RegulateSet').datagrid('load', {
//				user : $.trim($('input[name="user"]').val()),
//				balance_from : $.trim($('input[name="balance_from"]').val()),
//				balance_to : $.trim($('input[name="balance_to"]').val()),
//		});
//    },
    add : function () {
          $('#edit,#remove,#add').hide();
          $('#redo,#save').show();
          if(obj.editRow == undefined)
          {
              $('#RegulateSet').datagrid('insertRow', {
                  index : 0,
                  row : {
                  },
              });
              $('#RegulateSet').datagrid('beginEdit',0);
              this.editRow=0;
          }
    },
    	save : function () {
            $('#RegulateSet').datagrid('endEdit', this.editRow);
		},
		redo : function () {
            $('#save,#redo').hide();
            $('#edit,#remove,#add').show();
			this.editRow = undefined;
			$('#RegulateSet').datagrid('rejectChanges');
            $('#RegulateSet').datagrid('reload');
		},
        edit : function () {
			var rows = $('#RegulateSet').datagrid('getSelections');
			if (rows.length == 1) {
				if (this.editRow != undefined) {
					$('#RegulateSet').datagrid('endEdit', this.editRow);
				}
			
				if (this.editRow == undefined) {
					var index = $('#RegulateSet').datagrid('getRowIndex', rows[0]);
					$('#save,#redo').show();
                    $('#edit,#remove,#add').hide();
					$('#RegulateSet').datagrid('beginEdit', index);
					this.editRow = index;
                    console.log(index);
					$('#RegulateSet').datagrid('unselectRow', index);
				}
			} else {
				$.messager.alert('警告', '修改必须或只能选择一行！', 'warning');
			}
		},
        remove : function () {
			var rows = $('#RegulateSet').datagrid('getSelections');
			if (rows.length > 0) {
				$.messager.confirm('确定操作', '您正在要删除所选的记录吗？', function (flag) {
					if (flag) {
						var ids = [];
						for (var i = 0; i < rows.length; i ++) {
							ids.push(rows[i].id);
						}
						console.log(ids.join(','));
                        $.ajax({
							type : 'POST',
							url : '../ashx/Users.ashx?action=remove',
							data : {
								ids : ids.join(','),
							},
							beforeSend : function () {
								$('#RegulateSet').datagrid('loading');
							},
							success : function (data) {
								if (data) {
									$('#RegulateSet').datagrid('loaded');
									$('#RegulateSet').datagrid('load');
									$('#RegulateSet').datagrid('unselectAll');
									$.messager.show({
										title : '提示',
										msg : data + '个用户被删除成功！',
									});
								}
							},
						});
					}
				});
			} else {
				$.messager.alert('提示', '请选择要删除的记录！', 'info');
			}
		},
};
    $('#RegulateSet').datagrid({
        width : 600,
        title: '用户列表',
        striped : true,
        rownumbers : true,
        fit:true,
//        singleSelect : true,
        fitColumns : true,
        url:"../ashx/Users.ashx?action=search",
        iconCls : 'icon-search',
        columns : [[
            {
                field : 'id',
                align : 'center',
                width : 100,
                checkbox:true,
            },
             {
                field : '姓名',
                title : '真实姓名',
                width : 100,
                align : 'center',
                editor : {
                    type : 'text',
                    options : {
                    required : true,
                    },
                },
            },
            {
                field : '用户名',
                title : '用户名',
                width : 100,
                align : 'center',
                editor : {
                    type : 'text',
                    options : {
                    required : true,
                    },
                },
            },
             {
                field : '部门',
                title : '部门',
                width : 100,
                align : 'center',
                editor : {
                    type : 'text',
                    options : {
                     required : true,
                    },
                },
            },
            {
                field : '身份',
                title : '身份',
                width : 100,
                align : 'center',
                editor : {
                    type : 'combobox',
                    options : {
                     data: [ {text:'处长', value: '领导' },{ text:'科长', value: '负责人' }, { text:'出纳', value: '出纳' }, {text:'操作员',  value: '操作员' }],
                     valueField: "value", 
                     textField: "text",
                     editable:false,
                     required:true,
                    },
                },
            },
            {
                field : '手机',
                title : '手机号码',
                width : 100,
                align : 'center',
                editor : {
                    type : 'validatebox',
                    options : {
                    validType:'phoneRex',
                    },
                },
            },
        ]],
        toolbar:'#tb',
        pagination : true,
        onDblClickRow : function (rowIndex, rowData) {	
//            console.log("编辑行为"+obj.editRow);
			if (obj.editRow != undefined) {
				$('#RegulateSet').datagrid('endEdit', obj.editRow);
			}
		
			if (obj.editRow == undefined) {
				$('#save,#redo').show();
                $('#add,#edit,#remove').hide();
				$('#RegulateSet').datagrid('beginEdit', rowIndex);
				obj.editRow = rowIndex;
			}
			
		},
        onAfterEdit : function (rowIndex, rowData, changes) {
            $('#edit,#remove,#add').show();
			$('#save,#redo').hide();
            var inserted = $('#RegulateSet').datagrid('getChanges', 'inserted');
			var updated = $('#RegulateSet').datagrid('getChanges', 'updated');
            var url = info =  '';
			
			//新增用户
            console.log(rowData);
			console.log(inserted);
            console.log(updated);
			if (inserted.length > 0) {
				url = "../ashx/Users.ashx?action=insert";
				info = '新增';
			}
			//修改用户
			else 
            {
				url = "../ashx/Users.ashx?action=update";
				info = '修改';
			}
			$.ajax({
				type : 'POST',
				url : url,
				data : {
					row : rowData,
				},
				success : function (data) {
					if (data) {
						$('#RegulateSet').datagrid('unselectAll');
						$.messager.show({
							title : '提示',
							msg : data + '条人员信息被' + info + '成功！',
						});
					}
				},
			});
			obj.editRow = undefined;
            if (inserted.length > 0) {//新增需要刷新，否则有bug
				$('#RegulateSet').datagrid('reload'); 
			}
		},
     });
})