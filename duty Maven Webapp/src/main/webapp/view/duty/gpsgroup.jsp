<%@ page language="java" pageEncoding="utf-8"%>
<%@ include file="/view/lib.jsp"%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<!--  
<link href='//cdn.datatables.net/plug-ins/a5734b29083/integration/jqueryui/dataTables.jqueryui.css' type='text/css' />
-->	<link rel="stylesheet" type="text/css" href="asset/css/images/dateStyle.css"/>
<script src='<%=basePath%>script/duty/gpsgroup.js'
	type='text/javascript'></script>
<title>定位设备分组</title>

</head>
  
<body class="easyui-layout grouplayout"   oncontextmenu=self.event.returnValue=false>
	<div  class="easyui-layout grouplayout" >
		 <div data-options="region:'north'" class="grouplayoutnorth">
		 	<div class="dateBoxMenu">
					<ul>
						<li><div id="policemanage" doc="dateBoxMenu">
								<a href="javascript:void(0)" onclick="onPoliceManGroup('policegroup')">警员分组
								</a>
							</div></li>
						<li><div id="vehiclemanage" doc="dateBoxMenu">
								<a href="javascript:void(0)" onclick="onVehicleGroup('vehiclegroup')">车辆分组</a>
							</div></li>
						<li><div id="weaponmanage"  doc="dateBoxMenu">
								<a href="javascript:void(0)" onclick="onWeaponGroup('weapongroup')">武器分组</a>
							</div></li>
						<li><div id="gpsdevicemanage" doc="dateBoxMenu" class="dateBoxMenuOn">
								<a href="javascript:void(0)" onclick="onGpsDeviceGroup('gpsgroup')">定位设备分组</a>
							</div></li> 
					</ul>
				</div>
		  
		 </div>
		 <div data-options="region:'center'"  class="grouplayoutcenter">
		 	<div  class="easyui-layout" style="width:100%; height:100%;">
		 		
		<div id="divPG" data-options="region:'west'" title="定位设备分组" class="groupwestArea">
			<div id="tbGroup" class="btn-toolbar grouptoolbar">

				<div class="btn-group">
					<a id="btnAddGpsGroup" href="javascript:void(0);" 
						class="easyui-linkbutton icon-camera-retro groupfstbtn" iconcls="icon-tianyi-add" 
						onclick="addGpsGroup('add')">创建</a> <a id="btnEditGpsGroup"
						href="javascript:void(0);" class="easyui-linkbutton"
						iconcls="icon-tianyi-edit"  onclick="editGpsGroup('edit')">修改</a>
					<a id="btnDelGpsGroup" href="javascript:void(0);" iconcls="icon-tianyi-delete" 
						class="easyui-linkbutton" 
						onclick="delGpsGroup()">删除</a>
				</div>
			</div>
			<div id="dtGpsGroup"></div>
		</div>
		<div id="dtGroup"></div>
		<div data-options="region:'center',title:'定位设备'" class="groupgridcenter">
			<div id="tbGroupMember" class="btn-toolbar grouptoolbar">
				<div class="btn-group" >
					<a id="btnAddGpsGroupMember" href="javascript:void(0);"  
						class="easyui-linkbutton groupfstbtn" iconcls="icon-tianyi-add"  
						onclick="addGpsGroupMember()">添加</a> <a
						id="btnEditGpsGroupMember" href="javascript:void(0);"
						class="easyui-linkbutton" iconcls="icon-tianyi-edit"  
						onclick="delGpsGroupMemeber()">删除</a> <a
						id="btnCleanGpsGroupMember" href="javascript:void(0);"
						class="easyui-linkbutton" iconcls="icon-tianyi-cancel" 
						onclick="cleanPGMember()">清空</a>
				</div>
			</div>
			<div id="dtGroupMember"></div>
		</div>
	</div>
			 </div>
	</div>
	<div id="winPG" class="easyui-window" title="GPS-分组管理"  
	style="width:330px;height:320px;"
        data-options="iconCls:'icon-tianyi-save',modal:true" closed="true" 
        collapsible="false" minimizable="false" maximizable="false" resizable="false" shadow="false">

			<input type="hidden" id="txtGpsGroupId"></input>
			<table class="groupwindowtable">
				<tr>
					<td style="text-align:right"><lable>组名称:</lable></td>
					<td><input id="txtGpsGroupName" type="text"
						class="easyui-validatebox"  data-options="required:true,validType:['length[1,20]']"></input></td>
				</tr>
				<tr>
					<td style="text-align:right"><lable>共享类型:</lable></td>
					<td><label><input id="radioShare1" name="shareType"
							type="radio" value="0" onclick="changeShareType()"></input>不共享</label> 
							<label><input
							id="radioShare2" name="shareType" type="radio" value="1"
							onclick="changeShareType()"></input>共享到下级</label></td>
				</tr>

				<tr>
					<td colspan="2">
						<div class="groupwindowdiv">
							<div id="divOrg">
								<ul id="treeOrg" class="easyui-tree" style="overflow:auto"></ul>
							</div>

						</div>
					</td>
				</tr>
			</table>
						<div id="tbGroup" class="btn-toolbar groupwindowtoolbar"  >
				<div class="btn-group groupwindowtoolbar">
					<a id="btnSaveGpsGroup" href="javascript:void(0);"
						class="easyui-linkbutton groupwindowbtn" 
						onclick="saveGpsGroup()"> 保　存 </a> 
				</div>
			</div>
		</div>

	<div id="winPGMember" class="easyui-window groupmemberwindow" title="组成员选择"  
	style="width:450px;height:400px;"
        data-options="iconCls:'icon-save',modal:true" closed="true" 
        collapsible="false" minimizable="false" maximizable="false" resizable="false" shadow="false">    
   	 		
			<input id="txtGpsGroupId"  type="hidden"></input>
			<table>
				<tr>
					<td class="groupmemberwindowtdf">
						
						<div class="groupmemberwindowdiv" >
						<label id="treetitle" class="treetitle"></label>
							<ul id="treeOrgWithGps" class="easyui-tree"
								style="overflow:auto"></ul>
						</div>
					</td>
					<td class="groupmemberwindowtds">
						<button onclick="selectMember()">&gt&gt</button>
						<button onclick="unselectMember()">&lt&lt</button>
					</td>

					<td class="groupmemberwindowtdt">
						<div id="dtSelGroupMember" fit="true"></div>
					</td>
				</tr>
			</table>   
			<div id="tbGroup" class="btn-toolbar groupwindowtoolbar" >
				<div class="btn-group groupwindowtoolbar" >
					<a id="btnSaveGpsGroup" href="javascript:void(0);"
						class="easyui-linkbutton groupwindowbtn" 
						onclick="appendMember()">保存</a> 
				</div>
			</div>
	</div> 


</body>
</html>
