<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- 导入shiro标签库 -->
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
<!-- Bootstrap core CSS -->
<link href="<%=basePath %>css/bootstrap.min.css" rel="stylesheet">

<!-- Custom styles for this template -->
<link href="<%=basePath %>css/dashboard.css" rel="stylesheet">
<link href="<%=basePath %>css/datePicker.css" rel="stylesheet" type="text/css" />
<!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
<!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
<script src="<%=basePath %>js/ie-emulation-modes-warning.js"></script>

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
      <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
<script type="text/javascript" src="<%=basePath %>js/jquery.min.js"></script>
<script type="text/javascript" src="<%=basePath %>js/echarts.js"></script>
<script type="text/javascript" src="<%=basePath %>laydate/laydate.js"></script>
</head>
<body>
<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed"
				data-toggle="collapse" data-target="#navbar" aria-expanded="false"
				aria-controls="navbar">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span> <span class="icon-bar"></span> 
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">
				<img src="<%=basePath %>images/dclogo.gif" alt="logo">
			</a>
		</div>
		<div id="navbar" class="navbar-collapse collapse">
			<ul class="nav navbar-nav navbar-right">
				<li><a id="username" href="JavaScript:void(0);">您好,<shiro:user>[<shiro:principal type="java.lang.String"/>]</shiro:user></a>
				<li><a href="<%=basePath %>user/edit_pwd.do" onclick="menuurl('<%=basePath %>user/edit_pwd.do')" target="con">更改密码</a></li>
				<li><a href="<%=basePath %>user/logout.do" target="_parent">退出</a></li>
			</ul>
		</div>
	</div>
</nav>
</body>
</html>