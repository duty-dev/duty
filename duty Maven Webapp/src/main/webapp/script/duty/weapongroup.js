/*
 * 武器分组；
 * 
 * 包括分组的增删改查
 * 
 * 小组是否共享到下级
 * 
 * 以及组成员的添加删除
 * 
 */
var m_weaponGroup_Org = {};

var m_weaponGroup_Query = {};

var m_member_Query = {
	groupId : -1
};

$(document).ready(function() {
	var args = getUrlArgs();
	m_weaponGroup_Org.id = args["orgId"];
	m_weaponGroup_Org.code = args["orgCode"];
	m_weaponGroup_Org.path = args["orgPath"];
	m_weaponGroup_Org.userId = args["userId"];
	m_weaponGroup_Org.name = decodeURI(args["orgName"]);

	pack_weaponGroup_Query();
	$('#dtWeaponGroup').datagrid({
		url : 'weaponGroup/list.do',
		queryParams : {
			'weaponGroup_Query' : JSON.stringify(m_weaponGroup_Query)
		},
		pagination : true,
		singleSelect : true,
		idField : 'id',
		resizable : true,
		fitColumns : true,
		width : 'auto',
		onSelect : onSelectGroup,
		columns : [ [ {
			title : 'Id',
			field : 'id',
			align : 'left',
			width : 10,
			hidden : true
		}, {
			title : '组名称',
			field : 'name',
			align : 'left',
			width : 150
		}, {
			title : '共享类型',
			field : 'shareTypeDesc',
			align : 'left',
			width : 200
		} ] ]
	});

	$('#dtGroupMember').datagrid({
		url : 'weaponGroup/loadMemberByGroupId.do',
		queryParams : {
			'member_Query' : JSON.stringify(m_member_Query)
		},
		pagination : true,
		singleSelect : true,
		idField : 'id',
		resizable : true,
		fitColumns : true,
		width : 'auto',
		columns : [ [ {
			title : 'id',
			field : 'id',
			align : 'left',
			width : 0,
			hidden : true
		}, {
			title : '所属单位',
			field : 'orgShortName',
			align : 'left',
			width : 110
		}, {
			title : '武器类型',
			field : 'typeName',
			align : 'left',
			width : 100
		}, {
			title : '武器编号',
			field : 'number',
			align : 'left',
			width : 100
		}, {
			title : '子弹发数',
			field : 'standard',
			align : 'left',
			width : 100
		}, ] ]
	});

	$('#treeOrg').tree({
		// url : "org/list.do?orgCode=" + m_weaponGroup_Org.code
		// + "&orgPath=" + m_weaponGroup_Org.path,
		checkbox : true,
		cascadeCheck : false
	// async : false
	// loadFilter : function(data) {
	// return buildOrgTree(data);
	// }
	});

	$('#treeOrgWithWeapon').tree({
		url : "org/listWithWeapon.do?rootId=" + m_weaponGroup_Org.id,
		checkbox : false,
		onDblClick : dbClickWeapon,
		cascadeCheck : false
	});
	// 分组成员加载
	$('#dtSelGroupMember').datagrid({
		idField : 'id',
		singleSelect : true,
		resizable : true,
		onDblClickRow : ondbClickRow,
		fitColumns : true,
		columns : [ [ {
			title : 'id',
			field : 'id',
			align : 'left',
			width : 10,
			hidden : true
		}, {
			title : '武器类型',
			field : 'name',
			align : 'left',
			width : 100
		}, {
			title : '武器编号',
			field : 'code',
			align : 'left',
			width : 100
		} ] ]
	});
	loadOrgs();
	// forceSelTisOrg();
});

function onPoliceManGroup(name) {
	parent.onDutyDataGroup(name);
}
function onVehicleGroup(name) {
	parent.onDutyDataGroup(name);
}
function onWeaponGroup(name) {
	parent.onDutyDataGroup(name);
}
function onGpsDeviceGroup(name) {
	parent.onDutyDataGroup(name);
}
function loadOrgs() {

	$.ajax({
		url : "org/list.do",
		type : "POST",
		dataType : "json",
		data : {
			orgId : m_weaponGroup_Org.id,
			orgCode : m_weaponGroup_Org.code,
			orgPath : m_weaponGroup_Org.path
		},
		// async : false,
		success : function(req) {
			if (req.isSuccess) {
				var nodes = buildOrgTree(req.rows);
				$('#treeOrg').tree("loadData", nodes);
				// var node =$('#treeOrg').tree('find',m_weaponGroup_Org.id);
				// $('#treeOrg').tree('check',node.target);
				// node.target.attr("disabled", "disabled");
			} else {
				$.messager.alert('提示', req.msg, "warning");
			}
		}
	});
}

function pack_weaponGroup_Query() {
	m_weaponGroup_Query.orgId = m_weaponGroup_Org.id;
	m_weaponGroup_Query.orgCode = m_weaponGroup_Org.code;
	m_weaponGroup_Query.orgPath = m_weaponGroup_Org.path;
}

function showWeaponroupDlg() {
	$('#winPG').window('open');
}

var opteType = "";
function addWeaponGroup(optType) {
	opteType = optType;
	var pg = {};
	pg.shareOrgs = [];
	pg.id = 0;
	pg.shareType = 0;
	var po = {};
	po.orgId = m_weaponGroup_Org.id;
	pg.shareOrgs.push(po);

	displayWeaponGroup(pg);
	showWeaponGroupDlg();
}

function showWeaponGroupDlg() {
	$('#winPG').window('open');
}
function editWeaponGroup(optType) {
	opteType = optType;
	var row = $("#dtWeaponGroup").datagrid("getSelected");
	if (row !== null) {
		var id = row.id;
		loadWeaponGroup(id, displayWeaponGroup);

		showWeaponGroupDlg();
	}
}
var isExist = false;
function saveWeaponGroup() {
	var pg = {};
	pg.shareOrgIds = [];

	pg.orgId = m_weaponGroup_Org.id;
	pg.id = $('#txtWeaponGroupId').val();
	var groupName = $.trim($('#txtWeaponGroupName').val());
	if (groupName == "" && groupName == undefined) {
		$.messager.alert("操作提示", "请填写分组名称", "error");
		$('#txtWeaponGroupName').focus();
		return;
	}

	if(groupName.length>20){
		$.messager.alert("错误提示", "分组名称长度过长，限制长度1-20！", "error");
		$('#txtWeaponGroupName').focus();
		return;
	}
	
	var myReg = /^[^|"'<>]*$/;
	if(!myReg.test(groupName)){
		$.messager.alert("错误提示", "分组名称含有非法字符！", "error");
		$('#txtWeaponGroupName').focus();
		return;
	}
	if (opteType == "add") {
		isExistGroup(groupName, m_weaponGroup_Org.id);
		if (!isExist) {
			$.messager.alert("错误提示", "该分组名称已存在，请重新填写分组名称", "error");
			$('#txtWeaponGroupName').focus();
			return;
		}
	}
	pg.name = groupName;
	pg.shareType = $('input:radio[name="shareType"]:checked').val();

	/**
	 * 强制选择根节点！
	 */
	var node = $('#treeOrg').tree('find', m_weaponGroup_Org.id);
	$('#treeOrg').tree('check', node.target);

	var nodes = $('#treeOrg').tree('getChecked');
	var count = nodes.length;

	for ( var i = 0; i < count; i++) {
		var n = nodes[i];
		pg.shareOrgIds.push(n.id);
	}

	$.ajax({
		url : "weaponGroup/saveWeaponGroup.do",
		type : "POST",
		dataType : "json",
		data : {
			'weaponGroup' : JSON.stringify(pg)
		},
		async : false,
		success : function(req) {
			if (req.isSuccess) {
				$('#dtWeaponGroup').datagrid('reload');
				$('#txtWeaponGroupId').val(req.id);// 回写保存后的id
				$('#winPG').window('close');
				$.messager.alert('提示', '保存成功!');
			} else {
				$.messager.alert('提示', req.msg, "warning");
			}
		}
	});

}
/**
 * 删除警员组
 */
function delWeaponGroup() {
	var row = $("#dtWeaponGroup").datagrid("getSelected");
	if (row !== null) {
		$.messager.confirm('操作提示', "确定删除[ " + row.name + " ]?", function(r) {
			if (r) {
				$.ajax({
					url : "weaponGroup/deleteWeaponGroup.do",
					type : "POST",
					dataType : "json",
					data : {
						"weaponGroupId" : row.id
					},
					async : false,
					success : function(req) {
						if (req.isSuccess) {
							$.messager.alert('提示', '删除成功!');
							$('#dtWeaponGroup').datagrid('reload');
						} else {
							$.messager.alert('提示', req.msg, "warning");
						}
					}
				});
			}
		});
	}
}

function closeWinPG() {
	$('#winPG').window('close');
}

function cleanShareOrgs() {
	var nodes = $('#treeOrg').tree('getChecked');

	var count = nodes.length;

	for ( var i = 0; i < count; i++) {
		var n = nodes[i];
		if (i == 0)
			$('#treeOrg').tree('check', n.target);// 根节点强制选择
		else
			$('#treeOrg').tree('uncheck', n.target);
	}
}

function changeShareType() {

	var val = $('input:radio[name="shareType"]:checked').val();

	if (val == 0) {
		$('#divOrg').css('visibility', 'hidden');
		cleanShareOrgs();
	} else {
		$('#divOrg').css('visibility', 'visible');

	}
}

function loadWeaponGroup(id, callback) {
	$.ajax({
		url : "weaponGroup/loadWeaponGroup.do",
		type : "POST",
		dataType : "json",
		data : {
			'weaponGroupId' : id
		},
		// async : false,
		success : function(req) {
			callback(req);
		}
	});
}

/**
 * 显示警员组信息
 * 
 * @param pg
 */
function displayWeaponGroup(pg) {
	$('#txtWeaponGroupId').val(pg.id);
	$('#txtWeaponGroupName').val(pg.name);

	if (pg.shareType == 0) {
		$('#radioShare1').prop('checked', true);

		$('#divOrg').css('visibility', 'hidden');
	} else {
		$('#radioShare2').prop('checked', true);
		$('#divOrg').css('visibility', 'visible');
	}
	cleanShareOrgs();
	var count = pg.shareOrgs.length;
	for ( var i = 0; i < count; i++) {
		var pgo = pg.shareOrgs[i];
		var node = $('#treeOrg').tree('find', pgo.orgId);
		$('#treeOrg').tree('check', node.target);
	}
}

function onSelectGroup(rowIndex, rowData) {
	m_member_Query.groupId = rowData.id;
	$('#dtGroupMember').datagrid('reload', {
		'member_Query' : JSON.stringify(m_member_Query)
	});
	$("#treeOrgWithWeapon").tree("reload");
	// var x=$('#dtGroupMember').datagrid('queryParams');
}

/**
 * 添加成员
 * -------------------------------------------------------------------------------------
 */
function addWeaponGroupMember() {
	var row = $('#dtWeaponGroup').datagrid("getSelected");
	if (row != null) {
		$('#txtWeaponGroupId').val(row.id);
		showGroupMemberDlg();
		$('#dtSelGroupMember').datagrid('loadData', {
			total : 0,
			rows : []
		});
		var existdata = $("#dtGroupMember").datagrid("getRows");
		for ( var i = 0; i < existdata.length; i++) {
			$('#dtSelGroupMember').datagrid('appendRow', {
				id : existdata[i].weaponId,
				name : existdata[i].typeName,
				code : existdata[i].number
			});
		}
		for ( var j = 0; j < existdata.length; j++) {
			var s = null;
			s = $("#treeOrgWithWeapon").tree("find","wea_" + existdata[j].weaponId);
			$("#treeOrgWithWeapon").tree("remove", s.target);
		}
	} else {
		$.messager.alert('提示', '请先选择组!');
	}
}

function delWeaponGroupMemeber() {
	var row = $('#dtGroupMember').datagrid("getSelected");
	if (row != null) {
		$.ajax({
			url : "weaponGroup/delMemberById.do",
			type : "POST",
			dataType : "json",
			data : {
				'memberId' : row.id
			},
			async : false,
			success : function(req) {
				if (req.isSuccess) {
					$('#dtGroupMember').datagrid('reload');
				}
			}
		});
	} else {
		$.messager.alert('提示', '请先选择警员!!');
	}
}

function cleanPGMember() {

	var row = $('#dtWeaponGroup').datagrid("getSelected");

	if (row != null) {
		$.messager.confirm('操作提示', "确定要清空[ " + row.name + " ]下面所有的成员?",
				function(r) {
					if (r) {
						$.ajax({
							url : "weaponGroup/cleanMemberByGroupId.do",
							type : "POST",
							dataType : "json",
							data : {
								"weaponGroupId" : row.id
							},
							async : false,
							success : function(req) {
								if (req.isSuccess) {
									$('#dtGroupMember').datagrid('reload');
								}
							}
						});
					}
				});
	} else {
		$.messager.alert('提示', '请先选择车辆组!!');
	}
}

function appendMember() {
	var members = [];
	var groupid = $('#txtWeaponGroupId').val();

	var rows = $('#dtSelGroupMember').datagrid('getRows');
	var count = rows.length;

	for ( var i = 0; i < count; i++) {
		var row = rows[i];
		var member = {};
		member.id = 0;
		member.groupId = groupid;
		member.weaponId = row.id;
		members.push(member);
	}

	$.ajax({
		url : "weaponGroup/appendMember.do",
		type : "POST",
		dataType : "json",
		data : {
			'members' : JSON.stringify(members)
		},
		async : false,
		success : function(req) {
			if (req.isSuccess) {
				$.messager.alert('提示', '保存成功!');
				$('#dtGroupMember').datagrid('reload');
				$('#winPGMember').window("close");
			} else {
				$.messager.alert('提示', req.msg, "warning");
			}
		}
	});
}

function closeWinPGMember() {
	$('#winPGMember').window("close");
}

function dbClickWeapon(node) {
	selectMemberModel(node);
}
function selectMember() {
	var node = $('#treeOrgWithWeapon').tree('getSelected');
	selectMemberModel(node);
}
function selectMemberModel(node) {

	if (node != null && node.dataType == 2) {

		var datas = $('#dtSelGroupMember').datagrid('getData');

		var count = datas.rows.length;

		var exists = false;

		for ( var i = 0; i < count; i++) {
			var row = datas.rows[i];
			if (row.id == node.rid) {
				exists = true;
				break;
			}
		}

		if (!exists) {
			$('#dtSelGroupMember').datagrid('appendRow', {
				id : node.rid,
				name : node.typename,
				code : node.code
			});
		}
		var targets = node.target;
		$('#treeOrgWithWeapon').tree('remove', targets);
	}
}

function ondbClickRow(index, rowData) {
	var row = $('#dtSelGroupMember').datagrid('getSelected');
	if (row != null) {
		var selected = $('#treeOrgWithWeapon').tree('getRoot');

		// $('#treeOrgWithWeapon').tree('getChildren',selected.target);
		$('#treeOrgWithWeapon').tree('insert', {
			before : selected.target,
			data : [ {
				"rid" : row.id,
				"name" : row.code,
				"code" : row.code,
				"text" : row.code,
				"typename" : row.name,
				"dataType" : 2
			} ]
		});
		$('#dtSelGroupMember').datagrid('deleteRow', index);
	}
}
function unselectMember() {
	var row = $('#dtSelGroupMember').datagrid('getSelected');

	if (row != null) {
		var index = $('#dtSelGroupMember').datagrid('getRowIndex', row);
		var selected = $('#treeOrgWithWeapon').tree('getRoot');

		// $('#treeOrgWithWeapon').tree('getChildren',selected.target);
		$('#treeOrgWithWeapon').tree('insert', {
			before : selected.target,
			data : [ {
				"rid" : row.id,
				"name" : row.code,
				"code" : row.code,
				"text" : row.code,
				"typename" : row.name,
				"dataType" : 2
			} ]
		});
		$('#dtSelGroupMember').datagrid('deleteRow', index);
	}
}

function showGroupMemberDlg() {

	$("#treetitle").html(m_weaponGroup_Org.name);
	$('#winPGMember').window('open');
}

function displayGroupMember(member) {

}

function isExistGroup(name, orgId) {
	isExist = false;
	$.ajax({
		url : "weaponGroup/isExistGroup.do",
		type : "POST",
		dataType : "json",
		async : false,
		data : {
			"name" : name,
			"orgId" : orgId
		},
		success : function(req) {
			if (req.isSuccess && req.Message == "UnExits") {
				isExist = true;
			}
		}
	});
}