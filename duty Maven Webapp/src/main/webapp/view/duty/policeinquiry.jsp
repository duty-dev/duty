<%@ page language="java" pageEncoding="utf-8"%>
<%@ include file="/view/lib.jsp"%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<!--  
<link href='//cdn.datatables.net/plug-ins/a5734b29083/integration/jqueryui/dataTables.jqueryui.css' type='text/css' />
-->
<link href='<%=basePath%>asset/css/images/dateStyle.css' media='all'
	rel='stylesheet' type='text/css' />
<script src='<%=basePath%>script/duty/policeinquiry.js'
	type='text/javascript'></script>
 
<title>勤务报备</title> 
</head>

<body class="easyui-layout" oncontextmenu=self.event.returnValue=false>
	<div data-options="region:'center',split:true"  >
		 
			<div id="tbPoliceInquiry" class="btn-toolbar dtyinquirytoolbar"> 
				<div class="btn-group dtyinquirybtngroup">
					 <a id="exportData" name="exportData" href="javascript:void(0);" class="easyui-linkbutton dtyinquirybtn"
                   iconcls="icon-tianyi-export" onclick="btnExportDataAction()" >导出</a>
                   
                   <a id="btnsearchQueryBox" href="javascript:void(0);" class="easyui-linkbutton" 
                     style="float:right">展开查询</a>
				</div>
		 	</div>
		 	<div class="MySearch" id="my-search-box">
		 		<div class="MySearchMain">
				 	<div>
							<form>
								<table border=0>
									<tr>
										<td class="MySearchTDTitle">时间范围:</td>
										<td><input id="dteBeginDate" class="easyui-datebox dtyinquiryinput" /></td>
										<td>&nbsp;</td>
										<td><input id="spnBeginTime" class="easyui-timespinner dtyinquirytimespan" data-options="min:'00:00',showSeconds:false,highlight:0" />&nbsp;-</td>
										<td><input id="spnEndTime"   class="easyui-timespinner dtyinquirytimespaner"  data-options="min:'00:00',showSeconds:false,highlight:0" /></td>
										<td colspan="3">&nbsp;</td>
									</tr>
									<tr>
										<td class="MySearchTDTitle">任务属性:</td>
										<td><input id="dutyProperty" class="dtyinquiryinput"/></td>
										<td>&nbsp;</td>
										<td class="MySearchTDTitle">勤务类型 :</td>
										<td><input id="cmbdutytype"  class="easyui-combotree dtyinquiryinput" ></td>
										<td colspan="3">&nbsp;</td>
									</tr>
									<tr>
										<td class="MySearchTDTitle">人员类别 :</td>
										<td><input id="cmbpoliceType"  class="dtyinquiryinput" /></td>
										<td>&nbsp;</td>
										<td class="MySearchTDTitle">衣着:</td>
										<td>
											<input id="ckAttireType1" type="checkbox"  value="0">着装　　　
											<input id="ckAttireType2" type="checkbox"  value="1">便衣
										</td>
										<td class="MySearchTDTitle">武装:　</td>
										<td>
											<input id="ckArmamentType1" type="checkbox" value="0">非武装　　
											<input id="ckArmamentType2" type="checkbox" value="1">武装　　
										</td>
										<td class="MySearchTDTitle"> <a href="javascript:void(0);" class="easyui-linkbutton" iconcls="icon-search" onclick="btnSearchQueryAction()" >查询</a> 　</td>
									</tr>
								</table>
							</form>
						</div>	
					</div>		
				
				</div> 
			<div id="div_totalPoliceInfo">
				<div id="dtReportSum">
				</div>
			</div>
			<div id="div_detailsPoliceInfo">
				<div>
				<a href="javascript:void(0);" class="easyui-linkbutton"
                    iconcls="icon-report"  plain="true"></a>
                    <label class="dtyinquirylabel">详情</label>
				</div>
				<div id="dtReport"></div>
			</div>
		 
	</div>
</body>
</html>
