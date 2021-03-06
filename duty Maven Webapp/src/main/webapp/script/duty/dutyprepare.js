/*
 * 勤务管理主页面
 * 
 * 详细的报备流程操作逻辑；
 * 
 * 
 */

var m_dutyprepare_Org = {}; /* 当前组织机构 */
var m_ymd = null; /* 当前年月日 */
var m_date = null;
var m_duty = {}; /* 备勤记录 */

var m_xid_max = 0; // duty的treegrid的id,必须确保

var m_userNode = {};// 自定义节点信息

var m_shift = {};// 班次信息

var m_changestates = "2";

var m_target = {};

var m_iconCls = {};

var m_policesourceData = null;
var m_vehiclesourceData = null;
var m_gpssourceData = null;
var m_weaponsourceData = null;

var pass_count = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ];

var m_targetPoint = {};
var m_targetRows = {};
$(document)
		.ready(
				function() {
					$('#policeConditionwindow').window('close');
					$('#gpsConditionwindow').window('close');
					$('#weaponConditionwindow').window('close');
					$('#vehicleConditionwindow').window('close');
					$('#dutyTypeSelectwindow').window('close');
					$('#dutyTemplateSelectwindow').window('close');
					$('#userNodeWindows').window('close');
					var args = getUrlArgs();
					m_dutyprepare_Org.id = args["orgId"];
					m_dutyprepare_Org.code = args["orgCode"];
					m_dutyprepare_Org.path = args["orgPath"];
					m_dutyprepare_Org.userId = args["userId"];
					m_dutyprepare_Org.name = decodeURI(args["orgName"]);
					m_ymd = YMD.createNew((args["ymd"]));
					m_date = args["ymd"];
					$("#btnSearchExpendbody").bind("click", function() {
						$('#my-search-box').toggle();
					});

					window.onbeforeunload = isChangeStates;
					// 加载警员资源列表
					$('#source_police').treegrid({
						dnd : true,
						// fitColumns : true,
						resizable : true,
						idField : 'id',
						treeField : 'name',
						toolbar : "#tb_source_police",
						width : '99%',
						height : 400,
						singleSelect : false,
						collapsible : true,
						frozenColumns : [ [ {
							field : 'ck',
							checkbox : true
						} ] ],
						columns : [ [ {
							title : 'id',
							field : 'id',
							align : 'left',
							width : 0,
							hidden : true
						}, {
							title : '姓名',
							field : 'name',
							align : 'left',
							width : 100,
							sortable : true
						}, {
							title : '单位',
							field : 'orgName',
							align : 'left',
							width : 130
						}, {
							title : '图标',
							field : 'iconUrl',
							align : 'left',
							width : 50,
							hidden : true
						}, {
							title : '类型',
							field : 'itemTypeId',
							align : 'left',
							width : 50,
							hidden : true,
							formatter : function(value, row, index) {
								row.itemTypeId = 2;
								row.iconCls = 'icon_default_police';
								return row.itemTypeId;
							}
						} ] ],
						onLoadSuccess : function(row) {
							$(this).treegrid('enableDnd', row ? row.id : null);
						},
						onBeforeDrop : doRejectDrop
					});
					// 加载车辆资源列表
					$('#source_vehicle').treegrid({
						// url : "vehicle/getVehicleSource.do?orgId="
						// +
						// m_dutyprepare_Org.id+"&orgCode="+m_dutyprepare_Org.code+"&orgPath="+m_dutyprepare_Org.path
						// + "&number=",
						// fitColumns : true,
						dnd : true,
						resizable : true,
						idField : 'id',
						treeField : 'number',
						toolbar : "#tb_source_vehicle",
						collapsible : true,
						width : '99%',
						height : 400,
						singleSelect : false,
						frozenColumns : [ [ {
							field : 'ck',
							checkbox : true
						} ] ],
						columns : [ [ {
							title : 'id',
							field : 'id',
							align : 'center',
							width : 0,
							hidden : true
						}, {
							title : '车牌号码',
							field : 'number',
							align : 'left',
							width : 110,
							sortable : true
						}, {
							title : 'GPS显示名称',
							field : 'gpsName',
							align : 'left',
							width : 200
						}, {
							title : '车辆类型',
							field : 'typeName',
							align : 'left',
							width : 200,
							hidden : true
						}, {
							title : '车辆品牌',
							field : 'brand',
							align : 'left',
							width : 100,
							hidden : true
						}, {
							title : '图标',
							field : 'iconUrl',
							align : 'left',
							width : 50,
							hidden : true
						}, {
							title : '类型',
							field : 'itemTypeId',
							align : 'left',
							width : 50,
							hidden : true,
							formatter : function(value, row, index) {
								row.itemTypeId = 1;

								return 1;
							}
						} ] ],
						onLoadSuccess : function(row) {
							$(this).treegrid('enableDnd', row ? row.id : null);
						},
						onBeforeDrop : doRejectDrop
					});
					// 加载定位设备资源列表
					$('#source_gpsdevice').treegrid({
						// url : "gpsdevice/getGpsdeviceSource.do?orgId="
						// +
						// m_dutyprepare_Org.id+"&orgCode="+m_dutyprepare_Org.code+"&orgPath="+m_dutyprepare_Org.path
						// + "&gpsname=",
						// fitColumns : true,
						dnd : true,
						resizable : true,
						idField : 'id',
						treeField : 'typeName',
						toolbar : "#tb_source_gpsdevice",
						collapsible : true,
						width : '99%',
						height : 400,
						singleSelect : false,
						frozenColumns : [ [ {
							field : 'ck',
							checkbox : true
						} ] ],
						columns : [ [ {
							title : 'id',
							field : 'id',
							align : 'left',
							width : 0,
							hidden : true
						}, {
							title : 'GPS类型',
							field : 'typeName',
							align : 'left',
							width : 100
						}, {
							title : 'GPS显示名称',
							field : 'gpsName',
							align : 'left',
							width : 150
						}, {
							title : 'GPS设备编号',
							field : 'number',
							align : 'left',
							width : 50,
							hidden : true
						}, {
							title : '类型',
							field : 'itemTypeId',
							align : 'left',
							width : 50,
							hidden : true,
							formatter : function(value, row, index) {
								row.itemTypeId = 4;
								return 4;
							}
						} ] ],
						onLoadSuccess : function(row) {
							$(this).treegrid('enableDnd', row ? row.id : null);
						},
						onBeforeDrop : doRejectDrop
					});
					// 加载武器资源列表；
					$('#source_weapon').treegrid({
						// url : "weapon/getweaponSource.do?orgId=" +
						// m_dutyprepare_Org.id+"&orgCode="+m_dutyprepare_Org.code+"&orgPath="+m_dutyprepare_Org.path
						// + "&number=",
						// fitColumns : true,
						dnd : true,
						resizable : true,
						idField : 'id',
						treeField : 'typeName',
						toolbar : "#tb_source_weapon",
						collapsible : true,
						width : '99%',
						height : 400,
						singleSelect : false,
						frozenColumns : [ [ {
							field : 'ck',
							checkbox : true
						} ] ],
						columns : [ [ {
							title : 'id',
							field : 'id',
							align : 'left',
							width : 0,
							hidden : true
						}, {
							title : '武器类型',
							field : 'typeName',
							align : 'left',
							width : 120
						}, {
							title : '武器编号',
							field : 'number',
							align : 'left',
							width : 150
						}, {
							title : '规格标准',
							field : 'standard',
							align : 'left',
							width : 50,
							hidden : true
						}, {
							title : '类型',
							field : 'itemTypeId',
							align : 'left',
							width : 50,
							hidden : true,
							formatter : function(value, row, index) {
								row.itemTypeId = 3;
								return 3;
							}
						} ] ],
						onLoadSuccess : function(row) {
							$(this).treegrid('enableDnd', row ? row.id : null);
						},
						onBeforeDrop : doRejectDrop
					});
					// 加载勤务类型列表，供选择使用；
					$('#dtDutyType').treegrid({
						// fitColumns : true,
						rownumbers : false,
						resizable : true,
						idField : 'id',
						treeField : 'name',
						width : '99%',
						height : '100%',
						singleSelect : false,
						onClickRow : isLeafSelected,

						columns : [ [ {
							title : 'id',
							field : 'id',
							align : 'left',
							width : 0,
							hidden : true
						}, {
							title : '名称',
							field : 'name',
							align : 'left',
							width : 500
						}, {
							title : 'parentId',
							field : "parentId",
							align : 'left',
							width : 5,
							hidden : true
						} ] ],
						frozenColumns : [ [ {
							field : 'ck',
							checkbox : true
						}, {
							title : '人数限制',
							field : "maxPolice",
							align : 'left',
							width : 80,
							formatter : function(value, row, index) {
								if (value == 0) {
									return "无限制";
								} else {
									return value + "人";
								}
							}
						} ] ]
					});
					// 根据传入时间，组织机构信息，获取当天的详细报备信息
					$('#tdDuty')
							.treegrid(
									{
										fitColumns : true,
										dnd : true,
										resizable : true,
										idField : 'xid',
										treeField : 'displayName',
										toolbar : '#tdDutyToolbar',
										showFooter : true,
										width : '100%',
										onDblClickRow : onSelRow,
										columns : [ [
												{
													title : 'xid',
													field : 'xid',
													width : 0,
													hidden : true
												},
												{
													title : 'id',
													field : 'id',
													width : 0,
													hidden : true
												},
												{
													title : '人数限制',
													field : 'maxpolice',
													align : 'right',
													width : 50,
													hidden : true
												},
												{
													title : '名称',
													field : 'displayName',
													width : 200
												},
												{
													title : '类型',
													field : 'itemInnerTypeName',
													align : 'left',
													width : 70
												},
												{
													title : '时间区间',
													field : 'beginTime',
													align : 'left',
													width : 100,
													formatter : fmtShiftPeriod
												},
												{
													title : '车辆',
													field : 'velicleCount',
													align : 'right',
													width : 50,
													formatter : fmtDigit
												},
												{
													title : '警员',
													field : 'policeCount',
													align : 'right',
													width : 50,
													formatter : fmtDigit
												},
												{
													title : '武器',
													field : 'weaponCount',
													align : 'right',
													width : 50,
													formatter : fmtDigit
												},
												{
													title : '定位',
													field : 'gpsCount',
													align : 'right',
													width : 50,
													formatter : fmtDigit
												},
												{
													title : '操作',
													field : 'operate',
													align : 'center',
													width : 50,
													formatter : function(value,
															row, index) {
														return "<img alt='删除'  onclick=deleteThisNode('"
																+ row.xid
																+ "','"
																+ row.name
																+ "',"
																+ row.itemTypeId
																+ ")  style='width:16px; height:16px' src='asset/css/easyui/icons/tianyi_delete.png'>";

														// return "<a
														// id='btnDelete'
														// href='javascript:void(0);'
														// class='easyui-linkbutton'
														// iconcls='icon-cancel'>删除</a>";
													}
												} ] ],
										rowStyler : function(row, index) {
											if (row._parentId == "undefined"
													|| row._parentId == undefined) {
												return "font-size:14px;color:#000099;font-weight:bold";
											}
										},
										onLoadSuccess : function(row) {
											$(this).treegrid('enableDnd',
													row ? row.xid : null);
										},
										onBeforeDrop : doBeforeDrop,
										onDrop : doDrop
									});
					// 加载关联任务，若相关任务节点，则选中；
					$('#dgtaskTarget')
							.datagrid(
									{
										fitColumns : true,
										pagination : false,
										toolbar : '#tbTaskTarget',
										columns : [ [
												{
													field : 'ck',
													checkbox : true
												},
												{
													title : 'targetType',
													field : 'targetType',
													align : 'center',
													width : 10,
													hidden : true
												},
												{
													title : 'id',
													field : 'targetId',
													align : 'center',
													width : 10,
													hidden : true
												},
												{
													title : '名称',
													field : 'areaName',
													align : 'left',
													width : 180
												},
												{
													title : '点位名称',
													field : 'name',
													align : 'left',
													width : 220
												},
												{
													title : '经过次数',
													field : 'count',
													align : 'left',
													width : 180,
													editor : {
														type : 'validatebox',
														height : 25,
														width : '99%'
													}
												},
												{
													title : '停留时间(分钟)',
													field : 'stayTime',
													align : 'left',
													width : 180,
													editor : {
														type : 'validatebox',
														height : 25,
														width : '99%'
													}
												},
												{
													field : 'action',
													title : '',
													width : 130,
													align : 'center',
													formatter : function(value,
															row, index) {
														m_targetRows = row;
														if (row.editing) {
															var s = "<img alt='确定'  onclick='saverow(this)' style='width:16px; height:16px' src='asset/css/easyui/icons/tianyi_save.png'>";
															// <a
															// href="javascript:void(0);"
															// onclick="saverow(this)">确定</a>
															// ';
															var c = "<img alt='取消'  onclick='cancelrow(this)' style='width:16px; height:16px; margin-left:10px' src='asset/css/easyui/icons/tianyi_delete.png'>";
															// <a
															// href="javascript:void(0);"
															// >取消</a>';
															return s + c;
														} else {
															var e = "<img alt='编辑'  onclick='editrow(this)' style='width:16px; height:16px' src='asset/css/easyui/icons/tianyi_edit.png'>";
															// '<a
															// href="javascript:void(0);"
															// onclick="editrow(this)">编辑</a>
															// ';
															return e;
														}
													}
												} ] ],
										onBeforeEdit : function(index, row) {
											row.editing = true;
											updateActions(index);
										},
										onAfterEdit : function(index, row) {
											row.editing = false;
											updateActions(index);
										},
										onCancelEdit : function(index, row) {
											row.editing = false;
											updateActions(index);
										}
									});

					initResourceQueryTG();

					// 加载资源列表相关属性；
					loadSourcePolice({
						"orgId" : m_dutyprepare_Org.id,
						"orgCode" : m_dutyprepare_Org.code,
						"orgPath" : m_dutyprepare_Org.path,
						"name" : ""
					});
					// 加载资源列表相关属性；
					loadSourceVehicle({
						"orgId" : m_dutyprepare_Org.id,
						"orgCode" : m_dutyprepare_Org.code,
						"orgPath" : m_dutyprepare_Org.path,
						"number" : ""
					});
					// 加载资源列表相关属性；
					loadSourceGpsDevice({
						"orgId" : m_dutyprepare_Org.id,
						"orgCode" : m_dutyprepare_Org.code,
						"orgPath" : m_dutyprepare_Org.path,
						"gpsname" : ""
					});
					// 加载资源列表相关属性；
					loadSourceWeapon({
						"orgId" : m_dutyprepare_Org.id,
						"orgCode" : m_dutyprepare_Org.code,
						"orgPath" : m_dutyprepare_Org.path,
						"number" : ""
					});
					var pars = {
						orgId : m_dutyprepare_Org.id,
						ymd : m_ymd.ymd
					};
					loadDuty(pars);

					var title = m_dutyprepare_Org.name + '  ' + m_ymd.format();

					$('#divMember').panel({
						'title' : title
					});

				});

// 加载关联任务列表；其中相关逻辑操作
function getRowIndex(target) {
	var tr = $(target).closest('tr.datagrid-row');
	return parseInt(tr.attr('datagrid-row-index'));
}
function updateActions(index) {
	$('#dgtaskTarget').datagrid('updateRow', {
		index : index,
		row : {}
	});
}

// 编辑行信息

function editrow(target) {
	$('#dgtaskTarget').datagrid('beginEdit', getRowIndex(target));
	$('#dgtaskTarget').datagrid('checkRow', getRowIndex(target));
}
function saverow(target) {
	$('#dgtaskTarget').datagrid('endEdit', getRowIndex(target));
}
function cancelrow(target) {
	$('#dgtaskTarget').datagrid('cancelEdit', getRowIndex(target));
	$('#dgtaskTarget').datagrid('checkRow', getRowIndex(target));
}
function checkAllResources(gridId) {
	$("#" + gridId).treegrid("selectAll");
};
function uncheckAllResources(gridId) {
	$("#" + gridId).treegrid("unselectAll");
};

// 加载警员、车辆、武器、定位设备资源过滤条件
function initResourceQueryTG() {
	$('#dt_policeType').datagrid({
		url : "police/getPoliceTypeList.do",
		fitColumns : true,
		pagination : false,
		title : "人员类别",
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			title : 'Id',
			field : 'id',
			align : 'center',
			width : 10,
			hidden : true
		}, {
			title : '类型',
			field : 'name',
			align : 'center',
			width : 150
		} ] ]
	});

	$('#dt_groupType').datagrid(
			{
				url : 'policeGroup/getPoliceGrouplist.do?orgId='
						+ m_dutyprepare_Org.id,
				fitColumns : true,
				pagination : false,
				title : "人员分组",
				columns : [ [ {
					field : 'ck',
					checkbox : true
				}, {
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
				} ] ]
			});

	$('#dt_gpsType').datagrid({
		url : 'gpsdevice/getGpsTypelist.do',
		fitColumns : true,
		pagination : false,
		title : "定位设备类型",
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			title : 'Id',
			field : 'id',
			align : 'left',
			width : 10,
			hidden : true
		}, {
			title : '设备类型',
			field : 'name',
			align : 'left',
			width : 150
		} ] ]
	});

	$('#dt_gpsgroupType').datagrid({
		url : 'gpsGroup/getGpsGrouplist.do?orgId=' + m_dutyprepare_Org.id,
		fitColumns : true,
		pagination : false,
		title : "定位设备分组",
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
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
		} ] ]
	});

	$('#dt_weaponType').datagrid({
		url : 'weapon/getWeaponTypelist.do',
		fitColumns : true,
		pagination : false,
		title : "武器类型",
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			title : 'Id',
			field : 'id',
			align : 'left',
			width : 10,
			hidden : true
		}, {
			title : '武器类型',
			field : 'name',
			align : 'left',
			width : 150
		} ] ]
	});

	$('#dt_weapongroupType').datagrid(
			{
				url : 'weaponGroup/getWeaponGrouplist.do?orgId='
						+ m_dutyprepare_Org.id,
				fitColumns : true,
				pagination : false,
				title : "武器分组",
				columns : [ [ {
					field : 'ck',
					checkbox : true
				}, {
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
				} ] ]
			});

	$('#dt_vehicleType').datagrid({
		url : 'vehicle/getvehicleTypelist.do',
		fitColumns : true,
		pagination : false,
		title : "车辆类型",
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			title : 'Id',
			field : 'id',
			align : 'left',
			width : 10,
			hidden : true
		}, {
			title : '车辆类型',
			field : 'name',
			align : 'left',
			width : 150
		} ] ]
	});

	$('#dt_vehiclegroupType').datagrid(
			{
				url : 'vehicleGroup/getVehicleGrouplist.do?orgId='
						+ m_dutyprepare_Org.id,
				fitColumns : true,
				pagination : false,
				title : "车辆分组",
				columns : [ [ {
					field : 'ck',
					checkbox : true
				}, {
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
				} ] ]
			});

}
// 修改节点名称
function fmtDisplayTypeName(value, row, index) {
	switch (row.itemTypeId) {
	case 101:
		return "班次";
		break;
	case 999:
		return "自定义";
		break;
	default:
		return row.itemTypeName;
	}
}

function fmtDigit(value, row, index) {
	if (value == 0)
		return "";
	else
		return value;
}

function fmtShiftPeriod(value, row, index) {
	var result = "";

	if (row.itemTypeId == 101 && row.beginTime2 != undefined
			&& row.beginTime2 != null) {
		var bstr = row.beginTime2.getMinutes();
		var bs = parseInt(row.beginTime2.getMinutes());
		if (bs < 10) {
			result = row.beginTime2.getHours() + ":0" + bstr + "至";
		} else {
			result = row.beginTime2.getHours() + ":"
					+ row.beginTime2.getMinutes() + "至";
		}
		var diff = row.beginTime2.dateDiffOfDay(row.endTime2);

		switch (diff) {
		case 0:
			var str = row.endTime2.getMinutes();
			var s = parseInt(row.endTime2.getMinutes());
			if (s < 10) {
				result += row.endTime2.getHours() + ":0" + str;
			} else {
				result += row.endTime2.getHours() + ":"
						+ row.endTime2.getMinutes();
			}
			break;
		case 1:
			var str = row.endTime2.getMinutes();
			var s = parseInt(row.endTime2.getMinutes());
			if (s < 10) {
				result += "明日" + row.endTime2.getHours() + ":0" + str;
			} else {
				result += "明日" + row.endTime2.getHours() + ":"
						+ row.endTime2.getMinutes();
			}
			break;
		default:
			result = "起止时间错误!";
		}

		return result;
	}
}
// 加载警员资源
function loadSourcePolice(par) {
	$.ajax({
		url : "police/getPoliceSource.do",
		type : "POST",
		dataType : "json",
		data : par,
		// async : false,
		success : function(req) {
			if (req.isSuccess) {// 成功填充数据
				if (req.rows != null && req.rows.length > 0) {
					$.each(req.rows, function(index, value) {
						var iconUrl = value.iconUrl;// .substring(1,
						// value.length);
						itemiconCls = createIconStyle(value, 2, iconUrl);
					});
				}
				m_policesourceData = req.rows;
				$('#source_police').treegrid('loadData', m_policesourceData);

			} else {
				alert("获取警员资源数据失败");
			}
		}
	});
}
// 加载车辆资源
function loadSourceVehicle(par) {
	$.ajax({
		url : "vehicle/getVehicleSource.do",
		type : "POST",
		dataType : "json",
		data : par,
		// async : false,
		success : function(req) {
			if (req.isSuccess) {// 成功填充数据
				if (req.rows != null && req.rows.length > 0) {
					$.each(req.rows, function(index, value) {
						var iconUrl = value.iconUrl;// .substring(1,
						// value.length);
						itemiconCls = createIconStyle(value, 1, iconUrl);
					});
				}
				m_vehiclesourceData = req.rows;
				$('#source_vehicle').treegrid('loadData', m_vehiclesourceData);

			} else {
				alert("获取车辆资源数据失败");
			}
		}
	});
}
// 加载定位设备资源
function loadSourceGpsDevice(par) {
	$.ajax({
		url : "gpsdevice/getGpsdeviceSource.do",
		type : "POST",
		dataType : "json",
		data : par,
		// async : false,
		success : function(req) {
			if (req.isSuccess) {// 成功填充数据
				if (req.rows != null && req.rows.length > 0) {
					$.each(req.rows, function(index, value) {
						var iconUrl = value.iconUrl;// .substring(1,
						// value.length);
						itemiconCls = createIconStyle(value, 3, iconUrl);
					});
				}
				m_gpssourceData = req.rows;
				$('#source_gpsdevice').treegrid('loadData', m_gpssourceData);

			} else {
				alert("获取定位设备资源数据失败");
			}
		}
	});
}
// 加载武器资源
function loadSourceWeapon(par) {
	$.ajax({
		url : "weapon/getweaponSource.do",
		type : "POST",
		dataType : "json",
		data : par,
		// async : false,
		success : function(req) {
			if (req.isSuccess) {// 成功填充数据
				if (req.rows != null && req.rows.length > 0) {
					$.each(req.rows, function(index, value) {
						value.iconCls = 'icon_default_weapon';
					});
				}
				m_weaponsourceData = req.rows;
				$('#source_weapon').treegrid('loadData', m_weaponsourceData);

			} else {
				alert("获取武器资源数据失败");
			}
		}
	});
}
// 加载勤务类型
function loadDutyType() {
	$.ajax({
		url : "dutyType/list.do",
		type : "POST",
		dataType : "json",
		data : {
			isUsed : true
		},
		// async : false,
		success : function(req) {
			if (req.isSuccess) {// 成功填充数据
				var ss = buildDutyTypeTree(req.rows);
				$('#dtDutyType').treegrid('loadData', ss);
				var roots = $('#tdDuty').treegrid("getRoots");
				if (roots.length > 0) {
					for ( var i = 0; i < roots.length; i++) {
						$('#dtDutyType').treegrid("select", roots[i].id);
					}
				}
			} else {
				alert("获取报备类型数据失败");
			}
		}
	});
};

/**
 * 从后台获取当前duty数据
 */
function loadDuty(pars, type) {
	$.ajax({
		url : "duty/loadDutyByOrgIdAndYMD.do",
		type : "POST",
		dataType : "json",
		data : pars,
		async : false,
		success : function(req) {
			if (req.isSuccess) {// 成功填充数据
				var duty = req.obj;
				m_targetPoint = req.obj;
				if (duty == null) {
					duty = {};
					duty.id = 0;
					duty.ymd = m_ymd.ymd;
					duty.orgId = m_dutyprepare_Org.id;
					duty.items = [];
				}

				switch (type) {
				case 1:
					clearId(duty);
					duty.isTemplate = false;
					break;
				case 2:
					clearId(duty);
					break;
				}
				structureItemTree(duty.items);

				m_duty = duty;
				$('#tdDuty').treegrid('loadData', duty.items);
			} else {
				alert("获取报备明细数据信息失败");
			}
		}
	});

}

function clearId(duty) {
	duty.id = 0;
	if (duty.items != null) {
		$.each(duty.items, function(i, v) {
			clearItemId(v);
		});
	}
}

function clearItemId(item) {
	item.id = 0;
	if (item.targets != null) {
		$.each(item.targets, function(i, v) {
			v.id = 0;
		});
	}
	if (item.children != null) {
		$.each(item.children, function(i2, v2) {
			clearItemId(v2);
		});
	}
}

function initDuty() {
	m_duty.id = 0;
	m_duty.orgId = m_dutyprepare_Org.id;
	m_duty.ymd = m_ymd.ymd;
	m_duty.items = [];
}

/**
 * 汇总各级节点的数据
 * 
 * @param duty
 */
function structureItemTree(items) {
	$.each(items, function(i, val) {
		structureItem(val, null);
	});
}
function structureItem(item, parent) {

	item.getParent = function() {
		return parent;
	};
	/* 初始化数量等于0 */
	item.velicleCount = 0;
	item.policeCount = 0;
	item.weaponCount = 0;
	item.gpsCount = 0;
	item.xid = genXId(item.itemTypeId);

	if (item.itemTypeId == 101) {
		initDate(item);
	}

	itemiconCls = createIconStyle(item, item.itemTypeId, item.iconUrl);

	switch (item.itemTypeId) {
	case 1:
		item.velicleCount = 1;
		break;
	case 2:
		item.policeCount = 1;
		break;
	case 3:
		item.weaponCount = 1;
		break;
	case 4:
		item.gpsCount = 1;
		break;
	}
	if (item.children != undefined && item.children != null
			&& item.children.length > 0) {
		$.each(item.children, function(i, val) {
			structureItem(val, item);/* 获取下级的汇总 */
			item.velicleCount += val.velicleCount;
			item.policeCount += val.policeCount;
			item.weaponCount += val.weaponCount;
			item.gpsCount += val.gpsCount;
		});
	}
}

function searchVehicleAction() {
	var number = $("#txtvnumber").val();
	var row = $('#dt_vehicleType').datagrid("getChecked");
	var grouprow = $('#dt_vehiclegroupType').datagrid("getChecked");
	var typeId = "";
	var groupId = "";
	if (row.length > 0) {
		for ( var i = 0; i < row.length; i++) {
			typeId += row[i].id + ",";
		}
		if (typeId.length > 0) {
			typeId = typeId.substring(0, typeId.length - 1);
		}
	} else {
		typeId = "";
	}
	if (grouprow.length > 0) {
		for ( var i = 0; i < grouprow.length; i++) {
			groupId += grouprow[i].id + ",";
		}
		if (groupId.length > 0) {
			groupId = groupId.substring(0, groupId.length - 1);
		}
	} else {
		groupId = "";
	}

	loadSourceVehicle({
		"orgId" : m_dutyprepare_Org.id,
		"orgCode" : m_dutyprepare_Org.code,
		"orgPath" : m_dutyprepare_Org.path,
		"number" : number,
		"typeId" : typeId,
		"groupId" : groupId
	});
	// var a =row.length>0?row[0].id:0;
	// $('#source_vehicle').treegrid("reload", {
	// "number" : number,
	// "typeId" : typeId,
	// "groupId" : groupId
	// });
	$("#txtvnumber").val("");
	$('#dt_vehicleType').datagrid("unselectAll");
	$('#dt_vehiclegroupType').datagrid("unselectAll");
	$('#vehicleConditionwindow').window('close');
}
function searchGpsAction() {
	var name = $("#txtgname").val();
	var row = $('#dt_gpsType').datagrid("getChecked");
	var grouprow = $('#dt_gpsgroupType').datagrid("getChecked");
	var typeId = "";
	var groupId = "";
	if (row.length > 0) {
		for ( var i = 0; i < row.length; i++) {
			typeId += row[i].id + ",";
		}
		if (typeId.length > 0) {
			typeId = typeId.substring(0, typeId.length - 1);
		}
	} else {
		typeId = "";
	}
	if (grouprow.length > 0) {
		for ( var i = 0; i < grouprow.length; i++) {
			groupId += grouprow[i].id + ",";
		}
		if (groupId.length > 0) {
			groupId = groupId.substring(0, groupId.length - 1);
		}
	} else {
		groupId = "";
	}
	// var typeId = row.length > 0 ? row[0].id : 0;

	loadSourceGpsDevice({
		"orgId" : m_dutyprepare_Org.id,
		"orgCode" : m_dutyprepare_Org.code,
		"orgPath" : m_dutyprepare_Org.path,
		"gpsname" : name,
		"typeId" : typeId,
		"groupId" : groupId
	});
	// $('#source_gpsdevice').treegrid("reload", {
	// "gpsname" : name,
	// "typeId" : typeId,
	// "groupId" : groupId
	// });
	$("#txtgname").val("");
	$('#dt_gpsType').datagrid("unselectAll");
	$('#dt_gpsgroupType').datagrid("unselectAll");
	$('#gpsConditionwindow').window('close');
}
function searchWeaponAction() {
	var number = $("#txtwnumber").val();
	var row = $('#dt_weaponType').datagrid("getChecked");
	var grouprow = $('#dt_weapongroupType').datagrid("getChecked");
	var typeId = "";
	var groupId = "";
	if (row.length > 0) {
		for ( var i = 0; i < row.length; i++) {
			typeId += row[i].id + ",";
		}
		if (typeId.length > 0) {
			typeId = typeId.substring(0, typeId.length - 1);
		}
	} else {
		typeId = "";
	}
	if (grouprow.length > 0) {
		for ( var i = 0; i < grouprow.length; i++) {
			groupId += grouprow[i].id + ",";
		}
		if (groupId.length > 0) {
			groupId = groupId.substring(0, groupId.length - 1);
		}
	} else {
		groupId = "";
	}
	// var typeId = row.length > 0 ? row[0].id : 0;
	loadSourceWeapon({
		"orgId" : m_dutyprepare_Org.id,
		"orgCode" : m_dutyprepare_Org.code,
		"orgPath" : m_dutyprepare_Org.path,
		"number" : number,
		"typeId" : typeId,
		"groupId" : groupId
	});
	// $('#source_weapon').treegrid("reload", {
	// "number" : number,
	// "typeId" : typeId,
	// "groupId" : groupId
	// });
	$("#txtwnumber").val("");
	$('#dt_weaponType').datagrid("unselectAll");
	$('#dt_weapongroupType').datagrid("unselectAll");
	$('#weaponConditionwindow').window('close');
}
function searchPoliceAction() {
	var name = $("#txtpname").val();
	var typerow = $('#dt_policeType').datagrid("getChecked");
	var grouprow = $('#dt_groupType').datagrid("getChecked");
	var typeId = "";
	var groupId = "";
	if (typerow.length > 0) {
		for ( var i = 0; i < typerow.length; i++) {
			typeId += typerow[i].id + ",";
		}
		if (typeId.length > 0) {
			typeId = typeId.substring(0, typeId.length - 1);
		}
	} else {
		typeId = "";
	}
	if (grouprow.length > 0) {
		for ( var i = 0; i < grouprow.length; i++) {
			groupId += grouprow[i].id + ",";
		}
		if (groupId.length > 0) {
			groupId = groupId.substring(0, groupId.length - 1);
		}
	} else {
		groupId = "";
	}

	// var typeId = typerow.length > 0 ? typerow[0].id : 0;
	// var groupId = grouprow.length > 0 ? grouprow[0].id : 0;

	loadSourcePolice({
		"orgId" : m_dutyprepare_Org.id,
		"orgCode" : m_dutyprepare_Org.code,
		"orgPath" : m_dutyprepare_Org.path,
		"name" : name,
		"typeId" : typeId,
		"groupId" : groupId
	});
	// $('#source_police').treegrid("reload", {
	// "orgId" : m_dutyprepare_Org.id,
	// "name" : name,
	// "typeId" : typeId,
	// "groupId" : groupId
	// });
	$("#txtpname").val("");
	$('#dt_policeType').datagrid("unselectAll");
	$('#dt_groupType').datagrid("unselectAll");
	$('#policeConditionwindow').window('close');
};

/** ************勤务报备模块业务逻辑**************** */
// 勤务报备类型选择，根据选择类型，加载区域标签
function showDutyTemplate() {
	$('#dtDutyTemplate').datagrid({
		url : "duty/loadTemplateByOrgId.do",
		queryParams : {
			'orgId' : m_dutyprepare_Org.id
		},
		pagination : false,
		fitColumns : true,
		title : '勤务报备模板',
		width : '90%',
		height : '90%',
		singleSelect : true,
		onDblClickRow : selTemplate,
		columns : [ [ {
			title : '模板名称',
			field : 'name',
			align : 'left',
			width : 100
		}, {
			title : 'Id',
			field : 'id',
			align : 'center',
			width : 10,
			hidden : true
		} ] ]

	});
	$('#dutyTemplateSelectwindow').window('open');
};

function showCalendar() {
	$('#cc').calendar(
			{
				fit : true,
				firstDay : 1,
				border : false,
				// width:280,
				// height:280,
				current : new Date(),
				onSelect : function(date) {
					var y = date.getFullYear();
					var m = date.getMonth() + 1;
					var d = date.getDate();
					var s = y.toString() + (m < 10 ? '0' + m : m)
							+ (d < 10 ? '0' + d : d);
					var pars = {
						orgId : m_dutyprepare_Org.id,
						ymd : s
					};
					loadDuty(pars, 2);
					$('#calendarWindow').window('close');
				}
			});

	$('#calendarWindow').window('open');
}

function selectDutyType() {
	// 加载资源列表相关属性；
	loadDutyType();
	$('#dutyTypeSelectwindow').window('open');
};
function isLeafSelected(row) {
	if (!row.isLeaf) {
		$('#dtDutyType').treegrid("unselect", row.id);
	}
};
function InitDutyTypeTreeGrid() {
	$.ajax({
		url : "dutyType/list.do",
		type : "POST",
		dataType : "json",
		// async:false,
		success : function(req) {
			if (req.isSuccess) {// 成功填充数据
				var ss = buildDutyTypeTree(req.rows);
				$('#dtDutyType').treegrid('loadData', ss);
			} else {
				alert("获取勤务类型数据失败");
			}
		}
	});
};
// 根据选择的勤务类型，加载according标签
function selectDutyTypeAction() {
	var rows = $('#dtDutyType').treegrid('getSelections');
	var hasrows = $('#tdDuty').treegrid('getRoots');
	if (rows.length == 0) {
		$.messager.alert("操作提示", "请选择需要报备的勤务类型", "info");
		return;
	}
	if (hasrows && hasrows.length > 0) {
		for ( var m = 0; m < rows.length; m++) {
			for ( var n = 0; n < hasrows.length; n++) {
				if (rows[m].id == hasrows[n].itemId) {
					rows.splice(m, 1);
				}
			}
		}
	}

	if (rows.length > 0) {
		$.each(rows, function(i, row) {
			if (row.children == null || row.children.length == 0) {
				addDutyTypeRow(row);
			}
		});
		// $('#dtDutyType').treegrid('unselectAll');
		$('#dutyTypeSelectwindow').window('close');
	}

};
// 当资源节点拖入报备页面时候，增加行数据
function addDutyTypeRow(value) {
	var duty = {};
	duty.maxPolice = value.maxPolice;
	duty.taskType = value.assoTaskType;
	duty.targets = [];
	var shift = {};
	genDutyRow(value.id, value.name, 100, value.typeId, value.name, duty);
	shift.getParent = function() {
		return duty;
	};
	shift.beginTime2 = new Date(m_ymd.getYear(), m_ymd.getMonth() - 1, m_ymd
			.getDay(), 9, 30);
	shift.endTime2 = new Date(m_ymd.getYear(), m_ymd.getMonth() - 1, m_ymd
			.getDay(), 16, 30);
	genDutyRow(null, "班次", 101, null, "班次", shift);
	$('#tdDuty').treegrid('append', {
		parent : null,
		data : [ duty ]
	});
	$('#tdDuty').treegrid('enableDnd', duty.xid);
	$('#tdDuty').treegrid('append', {
		parent : duty.xid,
		data : [ shift ]
	});
	$('#tdDuty').treegrid('enableDnd', shift.xid);

}

/** *************主菜单功能-----开始***************** */

function saveDuty() {
	$("#divMember").mask('正在保存数据...');
	save(false, null);
}

function saveTemplate() {
	$('#templateWindows').window('open');
}

function openSaveDutyTemplateWindow() {

}

/* 保存到后台 */
function save(isTemplate, name) {
	var duty = {};
	duty.id = m_duty.id;
	duty.orgId = m_dutyprepare_Org.id;
	duty.name = name;
	duty.isTemplate = isTemplate;
	if (isTemplate) {
		duty.id = 0; // 模板新建
	}

	duty.ymd = m_ymd.ymd;
	duty.items = $('#tdDuty').treegrid('getData');

	dutyRegul(duty);

	$.ajax({
		url : "duty/save.do",
		type : "POST",
		dataType : "json",
		data : {
			'duty' : JSON.stringify(duty)
		},
		async : false,
		success : function(req) {
			if (req.isSuccess) {// 成功填充数据
				m_duty.id = req.id;

				$("#divMember").unmask();
				$.messager.alert('提示', "保存成功!", "info");
			} else {
				$("#divMember").unmask();
				$.messager.alert('提示', "保存失败!", "info");
			}
		},
		error : function(a) {
			$.messager.alert('提示', "保存失败!", "info");
			$("#divMember").unmask();
		}
	});

	reCalcDuty();
	m_changestates = "2";
}

function clearDuty() {
	m_duty.items.length = 0;
	$('#tdDuty').treegrid('loadData', m_duty.items);
	reCalcDuty();
	$('#dtDutyType').treegrid("unselectAll");
	loadDutyType();
}

function dutyRegul(duty) {

	if (duty.items != null) {
		$.each(duty.items, function(i, row) {
			itemRegul(row);
		});
	}
}

/** *************主菜单功能-----结束*************** */

function itemRegul(item) {
	// item.xid=undefined;
	// item.itemInnerTypeId=undefined;
	// item.itemInnerTypeName=undefined;
	// item.velicleCount=undefined;
	// item.policeCount=undefined;
	// item.weaponCount=undefined;
	// item.gpsCount=undefined;

	if (item.itemTypeId == 101) {
		item.beginTime = item.beginTime2.toSimpleString();
		item.endTime = item.endTime2.toSimpleString();
	}
	item.beginTime2 = undefined;
	item.endTime2 = undefined;
	if (item.children != null) {
		$.each(item.children, function(i, row) {
			itemRegul(row);
		});
	}
}

/** *************主菜单功能-----结束*************** */

function genDutyRow(itemId, name, typeId, innerTypeId, innerTypeName, dutyRow) {
	if (dutyRow.id == undefined || dutyRow.id == null)
		dutyRow.id = 0;
	dutyRow.xid = genXId(typeId);
	dutyRow.name = name;
	dutyRow.itemTypeId = typeId;
	dutyRow.itemId = itemId;
	// dutyRow.itemInnerTypeId = innerTypeId;
	dutyRow.itemInnerTypeName = innerTypeName;
	dutyRow.displayName = genDisplayName(typeId, innerTypeName, name);
	dutyRow.itemTypeName = genItemTypeName(typeId);

}

/**
 * 拖动前业务检查
 */
function doBeforeDrop(tRow, sRow, point) {

	var pTypeId = null;

	if (point == "append") {
		pTypeId = tRow.itemTypeId;
	} else {
		var p = tRow.getParent();
		pTypeId = p == null ? 0 : p.itemTypeId;
	}

	var isSuccess = dutyItemRelate.check(pTypeId, sRow.itemTypeId);

	if (!isSuccess) {
		$.messager.alert("操作提示", "资源载入类型不符合规则，请按规则添加资源", "error");
		return false;
	} else {
		var shiftRowT = null;
		var shiftRowS = null;
		var dutyTypeRow = findDutyTypeRow(tRow);
		;
		var exists = false;
		var isMaxPolice = false;

		if (sRow.xid != undefined) {
			shiftRowT = findShiftRow(tRow);
			shiftRowS = findShiftRow(sRow);
			isMaxPolice = checkMaxPolice(dutyTypeRow, shiftRowT, sRow);
			if (shiftRowT.xid != shiftRowS.xid) {
				exists = existsResource(shiftRowT, sRow);

			}
		} else {
			shiftRowT = findShiftRow(tRow);
			isMaxPolice = checkMaxPolice(dutyTypeRow, shiftRowT, sRow);
			exists = existsResource(shiftRowT, sRow);
		}
		if (exists) {
			var name = sRow.itemTypeId == 2 ? sRow.name : sRow.number;
			$.messager.alert('提示', name + ' 在班次 ' + shiftRowT.name + '中已经存在!',
					"warning");
		}

		if (isMaxPolice) {
			$.messager.alert('提示', '勤务类型: ' + dutyTypeRow.name + ' 警员数量上限是:'
					+ dutyTypeRow.maxPolice, "warning");
		}

		return !exists && !isMaxPolice;
	}
}

function findShiftRow(tRow) {
	if (tRow.itemTypeId == 101)
		return tRow;
	else
		return findShiftRow(tRow.getParent());
}

function findDutyTypeRow(tRow) {
	if (tRow.itemTypeId == 100)
		return tRow;
	else
		return findDutyTypeRow(tRow.getParent());
}

/**
 * 判断资源是否在班次中重复
 * 
 * @param p
 * @param row
 * @returns {Boolean}
 */
function existsResource(p, row) {
	var exists = false;
	if (row.xid == undefined && p.itemTypeId == row.itemTypeId
			&& p.itemId == row.id) {
		return true;
	} else if (row.xid != undefined && p.itemTypeId == row.itemTypeId
			&& p.itemId == row.itemId) {
		return true;
	} else if (p.children != null && p.children.length > 0) {
		$.each(p.children, function(index, value) {
			exists = existsResource(value, row);
			if (exists) {
				return false;
			}
		});
	}
	return exists;
}
/**
 * 检查警察数量上限
 * 
 * @param dutyTypeRow
 * @param shiftRow
 * @param row
 * @returns {Boolean}
 */
function checkMaxPolice(dutyTypeRow, shiftRow, row) {
	if (row.itemTypeId == 2 && dutyTypeRow.maxPolice > 0
			&& shiftRow.policeCount >= dutyTypeRow.maxPolice) {
		return true;
	} else {
		return false;
	}
}

/**
 * 资源树拒绝拖动
 * 
 * @param tRow
 * @param sRow
 * @param point
 * @returns {Boolean}
 */
function doRejectDrop(tRow, sRow, point) {
	return false;
}

function doDrop(tRow, sRow, point) {

	if (sRow.xid == undefined) {
		/* 从资源拖动过来 */
		/* itemId,name,typeId,innerTypeId,innerTypeName,dutyRow */
		var name = sRow.itemTypeId == 2 ? sRow.name : sRow.number;
		// sRow.iconUrl = tRow.iconUrl == undefined ? null : tRow.iconUrl;

		switch (sRow.itemTypeId) {
		case 1:
			name = sRow.number;
			break;
		case 2:
			name = sRow.name;
			break;
		case 3:
			name = sRow.number;
			break;
		case 4:
			name = sRow.number;
			break;
		}

		genDutyRow(sRow.id, name, sRow.itemTypeId, sRow.typeId, sRow.typeName,
				sRow);
		if (sRow.itemTypeId == 1) {
			$('#source_vehicle').treegrid('loadData', m_vehiclesourceData);
		} else if (sRow.itemTypeId == 2) {
			if (m_policesourceData != null && m_policesourceData.length > 0) {
				$.each(m_policesourceData, function(index, value) {
					var iconUrl = value.iconUrl;// .substring(1,
					// value.length);
					itemiconCls = createIconStyle(value, 2, iconUrl);
				});
			}
			$('#source_police').treegrid('loadData', m_policesourceData);
		} else if (sRow.itemTypeId == 3) {
			$('#source_weapon').treegrid('loadData', m_weaponsourceData);
		} else if (sRow.itemTypeId == 4) {
			$('#source_gpsdevice').treegrid('loadData', m_gpssourceData);
		}
	}
	reCalcDuty();
}
/* 从新计算并加载数据 */
function reCalcDuty() {
	/* 从新计算并加载数据 */
	var items = $('#tdDuty').treegrid('getData');
	structureItemTree(items);
	$('#tdDuty').treegrid('loadData', items);
	m_changestates = "0";
}

function genXId(itemTypeId, itemId) {
	m_xid_max++;
	return itemTypeId + "_AI_" + m_xid_max;
}

function genItemTypeName(itemTypeId) {
	switch (itemTypeId) {
	case 1:
		return "车辆";
	case 2:
		return "警员";
	case 3:
		return "武器";
	case 4:
		return "定位设备";
	case 100:
		return "备勤类型";
	case 101:
		return "班次";
	case 999:
		return "自定义";
	}
}

function genDisplayName(itemTypeId, iteminnerTypeName, name) {
	var rs = '';
	switch (itemTypeId) {
	case 1:
		rs = iteminnerTypeName + ":" + name;
		break;
	case 2:
		rs = name;
		break;
	case 3:
		rs = iteminnerTypeName + ":" + name;
		break;
	case 4:
		rs = iteminnerTypeName + ":" + name;
		break;
	case 100:
		rs = name;
		break;
	case 101:
		rs = name;
		break;
	case 999:
		rs = name;
		break;
	}
	return rs;
}

var dutyItemRelate = {
	root : {
		children : [ 100 /* 勤务类型 */
		]
	},
	dutytype : {
		children : [ 101 /* 班次 */
		]
	},
	shift : {
		children : [ 1, 2, 999 ]
	},

	vehicle : {
		children : [ 2, 4, 999 ]
	},
	police : {
		children : [ 3, 4 ]
	},
	weapon : {
		children : []
	},
	gps : {
		children : []
	},
	usernode : {
		children : [ 1, 2 ]
	},
	/**
	 * 检查拖动是否符合规则
	 * 
	 * @param parenttype
	 * @param childtype
	 * @returns {Boolean}
	 */
	check : function(parenttype, childtype) {
		var p = null;
		switch (parenttype) {
		case 0:
			p = this.root;
		case 100:
			p = this.dutytype;
			break;
		case 101:
			p = this.shift;
			break;
		case 999:
			p = this.usernode;
			break;
		case 1:
			p = this.vehicle;
			break;
		case 2:
			p = this.police;
			break;
		case 3:
			p = this.weapon;
			break;
		case 4:
			p = this.gps;
			break;
		}

		if ($.inArray(childtype, p.children) >= 0) {
			return true;
		} else {
			return false;
		}
	}
};

function selectDutyTemplateAction() {
	var row = $('#dtDutyTemplate').treegrid('getSelected');
	if (row == null) {
		$.messager.alert('提示', "请选择模板!", "warning");
	} else {
		var pars = {
			id : row.id
		};

		loadDuty(pars, 1);
		$('#dutyTemplateSelectwindow').window('close');
	}
}
function deleteDutyTemplateAction() {
	var row = $('#dtDutyTemplate').treegrid('getSelected');
	if (row == null) {
		$.messager.alert('提示', "请选择删除的模板!", "warning");
	} else {
		$.messager.confirm('操作提示', "确定要删除名称为[ " + row.name + " ] 的模板吗?",
				function(r) {
					if (r) {
						deleteDutyTemplate(row.id);
					}
				});
	}
}
function deleteDutyTemplate(tid) {
	$.ajax({
		url : "duty/deleteDutyTemplateAction.do",
		type : "POST",
		dataType : "json",
		data : {
			"temId" : tid
		},
		success : function(req) {
			if (req.isSuccess) {// 成功填充数据
				$('#dtDutyTemplate').datagrid('reload');
			} else {
				alert("删除模板失败");
			}
		}
	});
}

function selTemplate() {
	selectDutyTemplateAction();
}

function addUserNode() {
	var row = $("#tdDuty").treegrid("getSelected");
	if (row == null) {
		$.messager.alert('提示', "请选择父节点", "warning");
	} else {
		if (dutyItemRelate.check(row.itemTypeId, 999)) {
			$('#txtUserNodeName').val('');
			m_userNode.targetRow = row;
			m_userNode.editType = "new";
			$('#userNodeWindows').window('open');
		} else {
			$.messager.alert('提示', "只能在班次，车辆下面自定义节点!", "warning");
		}
	}
}

function setUserNode() {
	var row = $("#tdDuty").treegrid("getSelected");
	if (row == null) {
		$.messager.alert('提示', "请选择编组!", "warning");
	} else if (row.itemTypeId != 999) {
		$.messager.alert('提示', "请选择编组所在行!", "warning");
	} else {
		$('#txtUserNodeName').val(row.name);
		m_userNode.targetRow = row;
		m_userNode.editType = "edit";
		$('#userNodeWindows').window('open');
	}
}
/**
 * 自定义编组确认
 */
function userNodeConfirm() {
	var name = $('#txtUserNodeName').val();

	if (name == '') {
		$.messager.alert('提示', "请输入编组名称", "warning");
	} else {
		if (m_userNode.editType == 'new') {
			var row = {};
			genDutyRow(0, name, 999, 0, '编组', row);
			$("#tdDuty").treegrid('append', {
				parent : m_userNode.targetRow.xid,
				data : [ row ]
			});
			$('#tdDuty').treegrid('enableDnd', row.xid);
			reCalcDuty();
		} else {
			m_userNode.targetRow.name = name;
			m_userNode.targetRow.displayName = name;
			$("#tdDuty").treegrid('refresh', m_userNode.targetRow.xid);

			$("#tdDuty").treegrid('reload', m_userNode.targetRow.xid);
		}
		$('#userNodeWindows').window('close');
	}
}

function addShift() {
	var row = $("#tdDuty").treegrid("getSelected");
	if (row == null) {
		$.messager.alert('提示', "请选择备勤类型", "warning");
	} else {
		if (dutyItemRelate.check(row.itemTypeId, 101)) {
			$('#txtShiftName').val('');
			$('#txtBeginTime').timespinner('setValue', '09:00');
			$('#txtEndTime').timespinner('setValue', '22:00');
			$('#chkDayType').val(false);
			$('#shiftWindows').window('open');

			m_shift.targetRow = row;
			m_shift.editType = "new";
		} else {
			$.messager.alert('提示', "只能勤务类型下面定义班次!", "warning");
		}
	}
}

function setShift() {
	var row = $("#tdDuty").treegrid("getSelected");
	if (row == null) {
		$.messager.alert('提示', "请选择班次!", "warning");
	} else if (row.itemTypeId != 101) {
		$.messager.alert('提示', "请选择班次所在行!", "warning");
	} else {
		$('#txtShiftName').val(row.name);
		$('#txtBeginTime').timespinner('setValue',
				row.beginTime2.getHours() + ":" + row.beginTime2.getMinutes());
		$('#txtEndTime').timespinner('setValue',
				row.endTime2.getHours() + ":" + row.endTime2.getMinutes());

		if (row.beginTime2.dateDiffOfDay(row.endTime2) == 1) {
			$('#chkDayType').prop('checked', true);
		} else {
			$('#chkDayType').prop('checked', false);
		}
		m_shift.targetRow = row;
		m_shift.editType = "edit";
		$('#shiftWindows').window('open');
	}
}

function deleteNode() {
	var row = $("#tdDuty").treegrid("getSelected");
	if (row != null) {
		if (row.children != undefined && row.children != null
				&& row.children.length > 0) {
			$.messager.confirm('操作提示', "确定要清空[ " + row.displayName
					+ " ]及下级所有节点?", function(r) {
				if (r) {
					$("#tdDuty").treegrid("remove", row.xid);
					reCalcDuty();
				}
			});
		} else {
			$("#tdDuty").treegrid("remove", row.xid);
			reCalcDuty();
		}
	} else {
		$.messager.alert("提示", "请选择要操作的数据！", "warning");
	}
}
function deleteThisNode(xid, name, typeId) {
	var children = $("#tdDuty").treegrid("getChildren", xid);
	if (children != undefined && children != null && children.length > 0) {
		$.messager.confirm('操作提示', "确定要清空[ " + name + " ]及下级所有节点?",
				function(r) {
					if (r) {
						$("#tdDuty").treegrid("remove", xid);
						reCalcDuty();
					}
				});
	} else {
		$("#tdDuty").treegrid("remove", xid);
		reCalcDuty();
	}
	if (typeId == 1) {
		searchVehicleAction();
	} else if (typeId == 2) {
		searchPoliceAction();
	} else if (typeId == 3) {
		searchWeaponAction();
	} else if (typeId == 4) {
		searchGpsAction();
	}
}
/**
 * 双击选择
 * 
 * @param index
 * @param row
 */
function onSelRow(index, row) {
	var row = $("#tdDuty").treegrid("getSelected");
	if (row != null) {
		switch (row.itemTypeId) {
		case 101:
			setShift();
			break;
		case 999:
			setUserNode();
			break;
		case 2:
			showTaskWindow();
			break;
		}
	}
}

function shiftConfirm() {

	var ds = gYmdToStr(m_ymd.ymd);
	var name = $('#txtShiftName').val();
	var bt = gCreateDate(ds + " " + $('#txtBeginTime').timespinner("getValue"));
	var et = gCreateDate(ds + " " + $('#txtEndTime').timespinner("getValue"));

	if ($('#chkDayType').prop('checked')) {
		et.add('d', 1);
	}

	if (!verifyTime(bt, et)) {
		$.messager.alert('提示', "结束时间不能小于开始时间", "warning");
		return;
	} else if (name == null || name.length == 0) {
		$.messager.alert('提示', "请输入班次名称!", "warning");
	} else {
		if (m_shift.editType == 'new') {
			var row = {};
			row.beginTime2 = bt;
			row.endTime2 = et;

			genDutyRow(0, name, 101, 0, '班次', row);
			$("#tdDuty").treegrid('append', {
				parent : m_shift.targetRow.xid,
				data : [ row ]
			});
			$('#tdDuty').treegrid('enableDnd', row.xid);
			reCalcDuty();
		} else {
			m_shift.targetRow.name = name;
			m_shift.targetRow.displayName = name;
			m_shift.targetRow.itemInnerTypeName = name;
			m_shift.targetRow.beginTime2 = bt;
			m_shift.targetRow.endTime2 = et;

			var tmp = $("#tdDuty").treegrid('getData');

			$("#tdDuty").treegrid('loadData', tmp);
			reCalcDuty();
		}
		$('#shiftWindows').window('close');
	}
	function verifyTime(b, e) {
		if (b.dateDiff('n', e) < 0) {
			return false;
		} else {
			return true;
		}
	}
}
/**
 * 根据ymd和日期合并一成一个时间
 * 
 * @param ymd
 * @param dateStr
 * @returns {Date}
 */
function getMergeDate(ymd, dateStr) {
	var str = ymd.toString();
	var str2 = str.substr(0, 4) + "-" + str.substr(4, 2) + "-"
			+ str.substr(6, 2);
	var d = gCreateDate(str2);

	var HH = 0;
	var mm = 0;
	;

	if (dateStr != undefined && dateStr != null) {
		var d2 = gCreateDate(dateStr);
		HH = d2.getHours();
		mm = d2.getMinutes();
	}
	d.setHours(HH, mm, 0, 0);
	return d;
}
/**
 * 初始化日期
 * 
 * @param ymd
 * @param item
 */
function initDate(item) {

	if (item.beginTime2 == undefined || item.endTime2 == undefined) {
		var b = gCreateDate(item.beginTime);
		var e = gCreateDate(item.endTime);

		var diffDay = b.dateDiffOfDay(e);

		if (diffDay > 1) {
			alert('date diff day is error !');
		}

		b.setFullYear(m_ymd.getYear(), m_ymd.getMonth() - 1, m_ymd.getDay());
		e.setFullYear(m_ymd.getYear(), m_ymd.getMonth() - 1, m_ymd.getDay());
		e.add('d', diffDay);

		item.beginTime2 = b;
		item.endTime2 = e;
	}
}

var YMD = {
	createNew : function(ymd) {
		var _ymd = {};
		_ymd.ymd = ymd;

		var yearStr = ymd.substr(0, 4);
		var monthStr = ymd.substr(4, 2);
		var dayStr = ymd.substr(6, 2);

		var year = Number(yearStr);
		var month = Number(monthStr);
		var day = Number(dayStr);

		_ymd.getYear = function() {
			return year;
		};
		_ymd.getMonth = function() {
			return month;
		};
		_ymd.getDay = function() {
			return day;
		};

		_ymd.format = function() {
			return yearStr + '-' + monthStr + '-' + dayStr;
		};
		return _ymd;
	}
};

function templateNameConfirm() {
	$("#divMember").mask('正在保存数据...');
	var name = $('#txtTemplateName').val();

	var myReg = /^[^|"'<>]*$/;
	if (!myReg.test($.trim(name))) {
		$.messager.alert("错误提示", "模板名称含有非法字符！", "error");
		$('#txtTemplateName').focus();
		return;
	}
	if (name.length > 20) {
		$.messager.alert("错误提示", "模板名称长度过长，限制长度1-20！", "error");
		$('#txtTemplateName').focus();
		return;
	}
	if (name == null || name.lenght == 0 || name == "" || name == undefined) {
		$.messager.alert('提示', "请输入模板名称!", "warning");
		return;
	} else {
		save(true, name);
		$('#templateWindows').window('close');
	}
}
/**
 * 设置图标，如果没有图标就采用默认图标
 * 
 * @param row
 * @param itemTypeId
 * @param iconUrl
 */
function createIconStyle(row, itemTypeId, iconUrl) {
	if (row != null) {
		// if (row.iconCls == undefined || row.iconCls == null) {
		if (row.iconUrl != null && row.iconUrl.length > 0) {
			var classId = "icon_" + itemTypeId + "_" + row.id;
			// var classId2 = m_iconCls[classId];
			// if (classId2 == undefined || classId2 == null) {
			var style = "." + classId + "{	background:url('/duty" + iconUrl
					+ "');background-size:contain; width:16px; height:16px}";
			createStyle(style);
			// m_iconCls[classId] = classId;
			// }
			row.iconCls = classId;
		} else {/* 获取默认图标 */
			switch (itemTypeId) {
			case 1:
				row.iconCls = 'icon_default_vehicle';
				break;
			case 2:
				row.iconCls = 'icon_default_police';
				break;
			case 3:
				row.iconCls = 'icon_default_weapon';
				break;
			case 4:
				row.iconCls = 'icon_default_gps';
				break;
			case 100:
				row.iconCls = 'icon_default_dutytype';
				break;
			case 101:
				row.iconCls = 'icon_default_shift';
				break;
			case 999:
				row.iconCls = 'icon_default_usernode';
				break;
			}
		}
		// }
	}
}

function iconTest(row) {
	if (row != null) {
		var classId = "icon_" + itemTypeId + "_" + row.id;
		var style = "." + classId + "{	background:url('" + row + "');}";
		createStyle(style);

		row.iconCls = classId;
	}
}
/**
 * 动态创建一个css样式
 * 
 * @param css
 */
function createStyle(css) {
	try { // IE下可行
		var style = document.createStyleSheet();
		style.cssText = css;
	} catch (e) { // Firefox,Opera,Safari,Chrome下可行
		var style = document.createElement("style");
		style.type = "text/css";
		style.textContent = css;
		document.getElementsByTagName("HEAD").item(0).appendChild(style);
	}
}

function showTaskWindow() {
	var row = $("#tdDuty").treegrid("getSelected");

	if (row != null) {
		/*
		 * row.itemTypeId==100 || row.itemTypeId==101 || row.itemTypeId==999 ||
		 * row.itemTypeId==1 ||
		 */
		if (row.itemTypeId == 2) {
			var dutyTypeRow = getDutyTypeRow(row);
			var taskType = dutyTypeRow.taskType;
			if (taskType > 0) {
				if (taskType == 1) {
					$("#dgtaskTarget").datagrid("hideColumn", "stayTime");
					$("#dgtaskTarget").datagrid("hideColumn", "count");
				} else if (taskType == 2) {
					$("#dgtaskTarget").datagrid("showColumn", "stayTime");
					$("#dgtaskTarget").datagrid("showColumn", "count");
				} else if (taskType == 3) {
					$("#dgtaskTarget").datagrid("hideColumn", "stayTime");
					$("#dgtaskTarget").datagrid("hideColumn", "count");
				}
				loadTaskTarget(taskType);
				$('#lblPoliceInfo').text(row.name + " 关联任务");
				m_target = row;
				setCheckBoxOfTarget(row);
				$('#taskWindow').window('open');
			} else {
				$.messager.alert('提示', "当前勤务类型没有关联任务!", "warning");
			}
		} else {
			$.messager.alert('提示', "只能在警员上设置关联任务!", "warning");
		}
	} else {
		$.messager.alert("提示", "请选择操作数据，只能在警员上设置关联任务", "warning");
	}
}

function taskConfirm() {
	getCheckBoxOfTarget(m_target);
	$('#taskWindow').window('close');
}

function setCheckBoxOfTarget(item) {
	var data = $('#dgtaskTarget').datagrid('getData');
	if (item.targets != undefined) {
		$.each(item.targets, function(index, val) {
			$.each(data.rows, function(index2, val2) {
				if (val.targetId == val2.targetId) {
					$('#dgtaskTarget').datagrid('checkRow', index2);
					// val2.count = val.count;
					// val2.stayTime = val.stayTime;
					$('#dgtaskTarget').datagrid('updateRow', {
						index : index2,
						row : {
							count : val.count,
							stayTime : val.stayTime
						}
					});
					return false;
				}
			});
		});
	}
}

function getCheckBoxOfTarget(item) {
	var rows = $('#dgtaskTarget').datagrid('getSelections');
	if (rows.length == 0) {
		$.messager.alert("消息提示", "请选择要保存的必到点数据信息！", "warning");
		return;
	}
	// var rows = $('#dgtaskTarget').datagrid('getRows');
	item.targets = [];/**/
	$.each(rows, function(index, value) {
		var pt = {};
		pt.dutyId = item.dutyId;
		pt.dutyItemId = item.id;
		pt.policeId = item.itemId;
		pt.taskTypeId = item.taskType;
		pt.targetId = value.targetId;
		pt.count = value.count == null ? 0
				: value.count == null == undefined ? 0 : value.count;
		pt.stayTime = value.stayTime == null ? 0
				: value.stayTime == null == undefined ? 0 : value.stayTime;
		item.targets.push(pt);
	});
}

function getDutyTypeRow(row) {
	if (row.itemTypeId == 100) {
		return row;
	} else {
		return getDutyTypeRow(row.getParent());
	}
}

function loadTaskTarget(taskType) {
	var pars = {
		'orgId' : m_dutyprepare_Org.id,
		'orgCode' : m_dutyprepare_Org.code,
		'taskType' : taskType
	};

	$.ajax({
		url : "duty/loadTaskTargetByOrg.do",
		type : "POST",
		dataType : "json",
		data : pars,
		async : false,
		success : function(req) {
			if (req.isSuccess) {// 成功填充数据
				$('#dgtaskTarget').datagrid('loadData', req);
			} else {
				alert("获取关联任务数据信息失败");
			}
		}
	});
}

/**
 * 一键添加
 */

function addSelVehicles() {
	var ps = $('#source_vehicle').treegrid('getSelections');
	if (ps.length > 0) {
		addItems(1, $('#source_vehicle'));
		$('#source_vehicle').treegrid('loadData', m_vehiclesourceData);
	} else {
		$.messager.alert("操作提示", "请选择要添加的资源数据", "info");
	}
}

function addSelPolices() {
	var ps = $('#source_police').treegrid('getSelections');
	if (ps.length > 0) {
		addItems(2, $('#source_police'));
		if (m_policesourceData != null && m_policesourceData.length > 0) {
			$.each(m_policesourceData, function(index, value) {
				var iconUrl = value.iconUrl;// .substring(1,
				// value.length);
				itemiconCls = createIconStyle(value, 2, iconUrl);
			});
		}
		$('#source_police').treegrid('loadData', m_policesourceData);
	} else {
		$.messager.alert("操作提示", "请选择要添加的资源数据", "info");
	}
}

function addSelWeapons() {
	var ps = $('#source_weapon').treegrid('getSelections');
	if (ps.length > 0) {
		addItems(3, $('#source_weapon'));
		$('#source_weapon').treegrid('loadData', m_weaponsourceData);
	} else {
		$.messager.alert("操作提示", "请选择要添加的资源数据", "info");
	}
}

function addSelgps() {
	var ps = $('#source_gpsdevice').treegrid('getSelections');
	if (ps.length > 0) {
		addItems(4, $('#source_gpsdevice'));
		$('#source_gpsdevice').treegrid('loadData', m_gpssourceData);
	} else {
		$.messager.alert("操作提示", "请选择要添加的资源数据", "info");
	}
}

function addItems(itemTypeId, grid) {
	var row = $("#tdDuty").treegrid("getSelected");
	var errRow = [];
	var errRow2 = [];
	var datas = [];

	if (row != null) {
		if (dutyItemRelate.check(row.itemTypeId, itemTypeId)) {
			var ps = grid.treegrid('getSelections');
			var shiftRowT = findShiftRow(row);
			var dutyTypeRow = findDutyTypeRow(row);
			if (grid.selector == "#source_police") {
				if (dutyTypeRow.maxPolice > 0) {
					if (ps.length > dutyTypeRow.maxPolice) {
						$.messager.alert('提示', '勤务类型: ' + dutyTypeRow.name
								+ ' 警察数量上限是:' + dutyTypeRow.maxPolice,
								"warning");
					}
				} else {
					$.each(ps, function(i, v) {
						var exists = existsResource(shiftRowT, v);
						var isMaxPolice = checkMaxPolice(dutyTypeRow,
								shiftRowT, v);
						if (exists) {
							errRow.push(v);
						} else if (isMaxPolice) {
							errRow2.push(v);
						} else {
							var name = itemTypeId == 2 ? v.name : v.number;
							genDutyRow(v.id, name, itemTypeId, v.typeId,
									v.typeName, v);
							datas.push(v);
						}
					});

				}
			} else {
				$.each(ps,
						function(i, v) {
							var exists = existsResource(shiftRowT, v);
							var isMaxPolice = checkMaxPolice(dutyTypeRow,
									shiftRowT, v);
							if (exists) {
								errRow.push(v);
							} else if (isMaxPolice) {
								errRow2.push(v);
							} else {
								var name = itemTypeId == 2 ? v.name : v.number;
								genDutyRow(v.id, name, itemTypeId, v.typeId,
										v.typeName, v);
								datas.push(v);
							}
						});
			}
			if (datas.length > 0) {
				$("#tdDuty").treegrid('append', {
					parent : row.xid,
					data : datas
				});

				$.each(datas, function(i2, v2) {
					grid.treegrid('remove', v2.id);
				});
				reCalcDuty();
			}

			if (errRow.length > 0) {
				if (itemTypeId == 2)
					$.messager.alert('提示', errRow[0].name + "等在当前班次中已经存在!",
							"warning");
				else
					$.messager.alert('提示', errRow[0].number + "等在当前班次中已经存在!",
							"warning");
			}

			if (errRow2.length > 0) {
				$.messager.alert('提示', '勤务类型: ' + dutyTypeRow.name
						+ ' 警察数量上限是:' + dutyTypeRow.maxPolice, "warning");
			}

		} else {

		}
	} else {
		$.messager.alert('提示', "请选择要添加的节点!", "warning");
	}
}
function btnExportToExcelAction() {
	$.ajax({
		url : "dutyCalendar/exportDataToExcle.do",
		type : "POST",
		dataType : "json",
		async : false,
		timeout : 60000,
		data : {
			orgId : m_dutyprepare_Org.id,
			ymd : m_ymd.ymd
		},
		success : function(req) {
			var urlStr = req.Data.substring(1, req.Data.length);
			if (/msie/.test(navigator.userAgent.toLowerCase())) {
				var b_version = navigator.appVersion;
				if (b_version.length > 0) {
					var s = b_version.split(';');
					if (s.length > 1) {
						if ($.trim(s[1]) == "MSIE 8.0"
								|| $.trim(s[1]) == "MSIE 9.0"
								|| $.trim(s[1]) == "MSIE 10.0") {
							urlStr = "../../" + urlStr;
						}
					}
				}0.
			} else {
				var b_version = navigator.appVersion;
				if (b_version.length > 2) {
					var s = b_version.split(';');
					if (s.length > 2) {
						urlStr = "../../" + urlStr;
					}
				}

			}
			//window.location.href = urlStr;
			// var urlStr = req.Data.substring(1, req.Data.length);
			window.open(urlStr);
		},
		failer : function(a, b) {
			$.messager.alert("消息提示", a, "info");
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$.messager.alert("消息提示", errorThrown, "error");
		}
	});
}

function btnSearchAction() {
	var pars = {
		orgId : m_dutyprepare_Org.id,
		ymd : m_ymd.ymd
	};
	loadDuty(pars);

	var name = $('#txtsearchname').val();
	if (name != "") {
		var a = findDutyPoint(name);
		$('#tdDuty').treegrid("loadData", a);

	}
	// else {
	// var pars = {
	// orgId : m_dutyprepare_Org.id,
	// ymd : m_ymd.ymd
	// };
	// loadDuty(pars);
	// }
}

function findDutyPoint(name) {
	var a = [];
	if (m_duty.items != null) {
		$.each(m_duty.items, function(index, value) {
			var o = findDutyTreeGrid(value, name);
			if (o != null) {
				a.push(o);
			}
		});
	}
	return a;
}
var primId = "";
var lastObj = null;
function findDutyTreeGrid(item, xname) {
	if (xname == "" || item.displayName.indexOf(xname) >= 0) {
		return item;
	} else {
		var ls = [];
		if (item.children != null && item.children.length > 0) {
			$.each(item.children, function(index, value) {
				var o = findDutyTreeGrid(value, xname);
				if (o != null) {
					ls.push(o);
				}
			});
			item.children = ls;
			if (ls.length > 0)
				return item;
			else
				return null;
		} else {
			return null;
		}
	}
}
function btnBackToCalendarAction() {
	var dateY = m_date.substring(0, 4);
	var dateM = "";
	var dateMs = m_date.substring(4, 5);
	var dateMe = m_date.substring(5, 6);
	if (dateMs == "0") {
		dateM = dateMe;
	} else {
		dateM = m_date.substring(4, 6);
	}
	parent.onDutycalendar(dateY, dateM);
};
function isChangeStates() {
	if (/msie/.test(navigator.userAgent.toLowerCase())) {
		var b_version = navigator.appVersion;
		if (b_version.length > 0) {
			var s = b_version.split(';');
			if (s.length > 1) {
				if ($.trim(s[1]) != "MSIE 8.0" && $.trim(s[1]) != "MSIE 9.0") {
					if (m_changestates == "0") {
						return ("您的报备数据信息还没有保存，是否跳转到其他模块?");
					}
				}
			}
		}
	} else {
		if (m_changestates == "0") {
			return ("您的报备数据信息还没有保存，是否跳转到其他模块?");
		}
	}
};
