/*
 * 
 * 武器管理业务逻辑
 * 
 * 包括武器的增删改查等操作；
 */

var m_Weapon_OrgId;
var m_Weapon_OrgCode;
var m_Weapon_OrgPath;
var m_Weapon_Query = {};
var operationType = "";
$(function() {

	$("#weaponinfowindow").window("close");

	var args = getUrlArgs();
	m_Weapon_OrgId = args["orgId"];
	m_Weapon_OrgCode = args["orgCode"];
	m_Weapon_OrgPath = args["orgPath"];
	m_Weapon_UserId = args["userId"];
	pack_Weapon_Query();

	$("#orgtree").tree(
			{
				url : "org/list.do?orgCode=" + m_Weapon_OrgCode + "&orgPath="
						+ m_Weapon_OrgPath,
				loadFilter : function(data) {
					return buildOrgTree(data);
				}
			});

	$('#dtWeapon').datagrid({
		url : "weapon/getWeaponList.do",
		queryParams : {
			'weapon_Query' : JSON.stringify(m_Weapon_Query)
		},
		pagination : true,
		fitColumns : true,
		pageNumber : 1,
		pageSize : 10,
		title : '武器列表',
		onDblClickRow : dblClickRow,
	    onClickRow: clickRow,
		// singleSelect: true,
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			title : 'Id',
			field : 'Id',
			align : 'center',
			width : 10,
			hidden : true
		}, {
			title : '机构',
			field : 'orgName',
			align : 'center',
			width : 100,
			hidden : true
		}, {
			title : '武器类型',
			field : 'typeName',
			align : 'center',
			width : 100
		}, {
			title : '武器编号',
			field : 'number',
			align : 'center',
			width : 100
		}, {
			title : '标准规格',
			field : 'standard',
			align : 'center',
			width : 100
		} ] ]
	});
	$("#btnSearchWeapon").bind("click", function() {
		$('#my-search-box').toggle();
	});
	InitData();
});
//取消点击行选中
function clickRow(index, data) {
    $("#dtWeapon").datagrid("unselectRow", index);
}
function btnSearchAction() {
	pack_Weapon_Query();
	$('#dtWeapon').datagrid("reload", {
		'weapon_Query' : JSON.stringify(m_Weapon_Query)
	});
	$("#isSubOrg").combobox("setValue", "");
	$("#txtsearchnumber").val("");
};
function InitData() {
	getWeaponType();
};
function getWeaponType() {
	getBaseDataCombobox("weapon/getWeaponType.do", "txttype");
};
function btnAddWeapon(optType) {
	operationType = optType;
	clearForm();
	$("#weaponinfowindow").window("open");
	$('#btnsaveWeaponCon').show();
};


function dblClickRow(index,rowData){
	editWeaponModel(rowData);
}

//编辑模块事件
function editWeaponModel(rows){
	clearForm();
	$("#weaponId").val(rows.id);
	$("#txttype").combobox("setValue", rows.typeId);
	$("#txtnumber").val(rows.number);
	$("#txtstandard").val(rows.standard);

	// $('#myModal').modal('show');
	$("#weaponinfowindow").window("open");
	$('#btnsaveWeaponCon').hide();
}

function btnEditWeapon(optType) {
	operationType = optType;
	var hasRows = $('#dtWeapon').datagrid('getRows');
	if (hasRows.length == 0) {
		$.messager.alert('操作提示', "没有可操作数据", "warning");
		return;
	}
	var rows = $("#dtWeapon").datagrid("getChecked");
	if (!rows || rows.length == 0) {
		$.messager.alert('操作提示', "请选择操作项!", "warning");
		return;
	}
	if (rows.length > 1) {
		$.messager.alert('操作提示', "只能选择单个操作项!", "warning");
		return;
	} 
	editWeaponModel(rows[0]);
};
function clearForm() {
	$("#weaponId").val(0);
	$("#txttype").combobox("setValue", "");
	$("#txtnumber").val("");
	$("#txtstandard").val("");
}
function pack_Weapon_Query() {
	m_Weapon_Query.orgId = m_Weapon_OrgId;
	m_Weapon_Query.orgCode = m_Weapon_OrgCode;
	m_Weapon_Query.orgPath = m_Weapon_OrgPath;
	if ($("#isSubOrg").combobox("getValue") != ""
			&& $("#isSubOrg").combobox("getValue") > 0) {
		m_Weapon_Query.isSubOrg = $("#isSubOrg").combobox("getValue");
	} else {
		m_Weapon_Query.isSubOrg = 0;
	}
	m_Weapon_Query.number = $("#txtsearchnumber").val();
};

function btnDelWeapon() {
	var hasRows = $('#dtWeapon').datagrid('getRows');
	if (hasRows.length == 0) {
		$.messager.alert('操作提示', "没有可操作数据", "warning");
		return;
	}
	var rows = $("#dtWeapon").datagrid("getChecked");
	if (!rows || rows.length == 0) {
		$.messager.alert('操作提示', "请选择操作项!", "warning");
		return;
	}
	var ids = "";
	if (rows.length == 1) {
		ids = rows[0].id;
	} else {
		for ( var i = 0; i < rows.length; i++) {
			ids += rows[i].id + ",";
		}
		if (ids.length > 2) {
			ids = ids.substring(0, ids.length - 1);
		}
	}
	// if (rows.length > 1) {
	// $.messager.alert('操作提示', "只能选择单个操作项!", "warning");
	// return;
	// }
	// var number = rows[0].number;
	// var id = rows[0].id;
	$.messager.confirm("系统提示", "确认删除武器数据信息吗？", function(r) {
		if (r) {
			deleteWeapon(ids);
		}
	});
};
//删除事件
function deleteWeapon(id) {
	$.ajax({
		url : "weapon/deleteWeapon.do",
		type : "POST",
		dataType : "json",
		async : false,
		data : {
			"id" : id
		},
		success : function(req) {
			// $.messager.alert("消息提示", req.Message, "info");
			btnSearchAction();
		},
		failer : function(a, b) {
			$.messager.alert("消息提示", a, "info");
		},
		error : function(a) {
			$.messager.alert("消息提示", a, "error");
		}
	});
};

var isComplete = true;
function saveWeaponAction() {
	saveWeaponModel();
};
//保存事件模块
function saveWeaponModel() {
	var weapon = {};

	weapon.id = $("#weaponId").val();

	if ($("#txttype").combobox("getValue") > 0
			&& $("#txttype").combobox("getValue") != null) {
		weapon.typeId = $("#txttype").combobox("getValue");
	} else {
		$.messager.alert("错误提示", "请选择武器类别", "error");
		isComplete= false;
		return;
	}
	if ($("#txtnumber").val() == "") {
		$.messager.alert("错误提示", "请输入武器编号", "error");
		isComplete= false;
		return;
	}
	weapon.number = $("#txtnumber").val();
	// if ($("#txtstandard").val() == "") {
	// $.messager.alert("错误提示", "请输入武器规格型号", "error");
	// return;
	// }
	weapon.standard = $("#txtstandard").val();
	weapon.orgId = m_Weapon_OrgId;
	$.ajax({
		url : "weapon/saveWeapon.do",
		type : "POST",
		dataType : "json",
		async : false,
		data : weapon,
		success : function(req) {
			// $.messager.alert("消息提示", req.Message, "info");
			isComplete = true;
			clearForm();

			btnSearchAction();
		},
		failer : function(a, b) {
			$.messager.alert("消息提示", a, "info");
		},
		error : function(a) {
			$.messager.alert("消息提示", a, "error");
		}
	});
}
function saveWeaponActionExit() {
	saveWeaponModel();
	if(isComplete){
		$("#weaponinfowindow").window("close");
	}
}