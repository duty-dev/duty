<%@ page language="java" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="tiyi" uri="com.tiyi.tiyiTagLib/tags"%>
<%@page import="com.tianyi.drs.duty.common.Constants"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!--[if lt IE 9]>
    <script src='<%=basePath%>js/sys/html5shiv.js' type='text/javascript'></script>
    <![endif]-->
 
<!-- <link href='<%=basePath%>asset/css/bootstrap.min.css' media='all'	rel='stylesheet' type='text/css' /> -->
  
<link href='<%=basePath%>asset/css/easyui/icon.css'
	media='all' rel='stylesheet' type='text/css' />
<link href='<%=basePath%>asset/css/jquery.loadmask.css'
	media='all' rel='stylesheet' type='text/css' />
<link href='<%=basePath%>asset/css/easyui/metro/easyui.css'
	media='all' rel='stylesheet' type='text/css' />
<link href='<%=basePath%>asset/css/images/main.css'
	media='all' rel='stylesheet' type='text/css' />
<link href='<%=basePath%>asset/css/fontawesome/css/font-awesome.min.css'
	media='all' rel='stylesheet' type='text/css' /> 
<link href='<%=basePath%>resource/css/tianyi.duty.icon.css'' media='all' rel='stylesheet' type='text/css' />
<!-- 
<link href='<%=basePath%>asset/css/Dialogdefault.css'	media='all' rel='stylesheet' type='text/css' />
 -->

	
<script src='<%=basePath%>asset/script/jquery-1.11.1.min.js'	type='text/javascript'></script>
<!-- <script src='<%=basePath%>asset/script/jquery-1.8.0.min.js'	type='text/javascript'></script> -->
<!-- 
<script src='<%=basePath%>asset/script/bootstrap.min.js'	type='text/javascript'></script>
 -->

 <script src='<%=basePath%>asset/script/easyui/jquery.easyui.1.4.min.js'	type='text/javascript'></script>
<!--<script src='<%=basePath%>asset/script/easyui/jquery.1.3.2.easyui.min.js'	type='text/javascript'></script> -->
<script
	src='<%=basePath%>script/jquery.loadmask.min.js'	type='text/javascript'></script>

<script src='<%=basePath%>asset/script/json2.js' type='text/javascript'></script>
<script src='<%=basePath%>asset/script/easyui/easyui-lang-zh_CN.js' type='text/javascript'></script>
<script src='<%=basePath%>asset/script/easyui/treegrid2-dnd.js' type='text/javascript'></script>
<script src='<%=basePath%>script/common.js' type='text/javascript'></script>
<!--
<script src='<%=basePath%>asset/script/jquery.artDialog.js'></script> 
<script src='<%=basePath%>asset/script/jquery.bootstrap.min.js'></script> 
 -->


