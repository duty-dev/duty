<%@ page language="java" pageEncoding="utf-8"%>
<%@ include file="/view/lib.jsp"%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<!--  
<link href='//cdn.datatables.net/plug-ins/a5734b29083/integration/jqueryui/dataTables.jqueryui.css' type='text/css' />
-->
<script src='<%=basePath%>script/basedata/gpsdevice.js'
	type='text/javascript'></script>
<title>定位设备管理</title>


</head>

<body class="easyui-layout" style="padding:2px"> 
	 
	
	<div data-options="region:'center'"style="padding:2px;"> 
	 
			<div id="tbGpsdevice" class="btn-toolbar" style="height:30px; margin-top:3px">
  				<div class="btn-group">
  					<a id="btnAddGpsdevice" href="javascript:void(0);" class="easyui-linkbutton"  iconcls="icon-add"  onclick="btnAddGpsdevice()">创建</a>
                	<a id="btnEditGpsdevice" href="javascript:void(0);" class="easyui-linkbutton" iconcls="icon-edit"   onclick="btnEditGpsdevice()">修改</a>
                	<a id="btnDelGpsdevice" href="javascript:void(0);" class="easyui-linkbutton" iconcls="icon-cancel"  onclick="btnDelGpsdevice()">删除</a>
                	
  				</div>  				
  				<div class="btn-group" style="float:right">
  					<a id="btnSearchGpsdevice" href="javascript:void(0);" class="easyui-linkbutton"  iconcls="icon-search"    onclick="btnSearchGpsdevice()">查询</a>
                	<!-- a id="btnPrintList" href="javascript:void(0);" class="easyui-linkbutton" iconcls="icon-print" plain="true" onclick="btnPrintList()">打印</a>
                	<a id="btnExportList" href="javascript:void(0);" class="easyui-linkbutton" iconcls="icon-export" plain="true" onclick="btnExportList()">导出</a> -->
               	</div>
  			</div>
  			<div id="my-search-box" class="panel-body" style="border:0px;display:none">
  			 <form class="form-inline"> 
                  <div class="form-group">
                      <div class="form-group">
                        <div class="input-group">
                      			   　　查询范围选择	
                          <input id="isSubOrg" class="easyui-combobox" name="dept"
										data-options="valueField:'id',textField:'name',data:[{id: 0,name: '本級机构'},{id: 1,name: '本级及下级机构'}]" />

                        </div>
                      </div>
                  </div>
                  
                  <div class="form-group">
                      <div class="form-group">
                        <div class="input-group">
                           GPS名称: 
                           <input id="txtsearchname" class="easyui-validatebox" type="text">
                        </div>
                      </div>
                  </div>  
                  
                 <a id="btnSearchAction" href="javascript:void(0);" class="easyui-linkbutton"  iconcls="icon-search"  plain="true" onclick="btnSearchAction()">查询</a>
				<!-- button type="submit" class="btn btn-info">查询</button -->
				</form>
			</div>	
  			<div id="dtGpsdevice" >
  			</div> 
 
	</div>   
	 <div id="gpsdeviceinfowindow" class="easyui-window" title="新增/编辑武器信息"
			data-options="iconCls:'icon-edit',modal:true" closed="true" 
	 	collapsible="false" minimizable="false" maximizable="false" resizable="false" shadow="false" 
			style="width: 400px; height: 240px; padding: 10px;">
			<div class="easyui-layout" data-options="fit:true">
				<div data-options="region:'south',border:false"
					style="padding: 2px; height: 30px;"> 
					<a href="javascript:void(0);" class="easyui-linkbutton"
						 style="float:right"
						onclick="saveGpsdeviceAction()">保存并继续</a> 
				</div>
				<div data-options="region:'center',border:false"
					style="text-align: right; margin-left: 5px;
            padding: 5px 0 0;">
					<table style="width:100%;height:99%; font: 12px 微软雅黑;"> 
						<tr>
							<td style="text-align: right;"><input type="hidden" id="gpsdeviceId"><label>GPS类型:　</label></td>
							<td><input id="txttype" class="easyui-combobox" /></td>
						</tr>
						<tr>
							<td style="text-align: right;"><label>GPS名称:　</label></td>
							<td><input type="text" class="easyui-validatebox" id="txtgpsname"></td>
						</tr>
						<tr>
							<td style="text-align: right;"><label>GPS编号:　</label></td>
							<td><input type="text" class="easyui-validatebox" id="txtgpsnumber"></td>
						</tr> 
						<tr>
							<td style="text-align: right;"><label>GPS图标:　</label></td>
							
							<td><input type="text"  id="txtgpsicon"><input type="hidden" id="txtIconUrl"></td>
						</tr> 
					</table>
				</div>
			</div>
		</div>
	 
</body>
</html>