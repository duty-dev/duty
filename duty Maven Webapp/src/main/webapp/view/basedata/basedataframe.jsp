<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/view/lib.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>基础数据管理</title>

<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<link rel="stylesheet" type="text/css" href="asset/css/images/dateStyle.css"/>
<script src='<%=basePath%>script/basedata/basedataframe.js'
	type='text/javascript'></script> 
</head>

<body class="easyui-layout">
	<div data-options="region:'west',split:true,title:'组织机构导航树'"
		style="width:14%;padding:10px;">
		<!-- div>
				<input type="text">
			</div> -->

		<div>
			<input id="txtOrgName" style="width:70%; margin-left:4px;margin-top:2px" type="text"/>
			<a id="btnSearchOrg" href="javascript:void(0);" class="easyui-linkbutton"
                    iconcls="icon-search" onclick="searchOrgAction()" plain="true"></a>
		</div>
		<ul id="orgtree" class="easyui-tree">
		</ul>
	</div>
	<div data-options="region:'center'">
		<div class="easyui-layout" data-options="fit:true">
			<div data-options="region:'north',border:false"
				style="padding: 2px; height: 43px;overflow:hidden">
				<div class="dateBoxMenu">
					<ul>
						<li><div id="policemanage" doc="dateBoxMenu">
								<a href="javascript:void(0)" onclick="onPoliceManage()">人员管理
								</a>
							</div></li>
						<li><div id="vehiclemanage" doc="dateBoxMenu">
								<a href="javascript:void(0)" onclick="onVehicleManage()">车辆管理</a>
							</div></li>
						<li><div id="weaponmanage"  doc="dateBoxMenu">
								<a href="javascript:void(0)" onclick="onWeaponManage()">武器管理</a>
							</div></li>
						<li><div id="gpsdevicemanage" doc="dateBoxMenu">
								<a href="javascript:void(0)" onclick="onGpsdeviceManage()">定位设备</a>
							</div></li>
						<li><div id="iconsmanage" doc="dateBoxMenu">
								<a href="javascript:void(0)" onclick="onIconsManage()">图标管理</a>
							</div></li>
					</ul>
				</div>
				
			</div>
			<div data-options="region:'center'" style="padding:10px;">
				<iframe id="ifmWorkSpace" name="ifmWorkSpace" scrolling='yes'
					frameborder='0' style="width:100%;height:100%"></iframe>
			</div>
		</div>
	</div>
</body>
</html>
