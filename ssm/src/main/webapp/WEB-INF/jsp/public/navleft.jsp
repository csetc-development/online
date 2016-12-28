<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title></title>

    <!-- Bootstrap -->
    <link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet">
    
	<!-- Custom styles for this template -->
	<link href="<%=basePath%>css/dashboard.css" rel="stylesheet">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    
	<link href="<%=basePath%>css/foldableNavigationMenu.css" rel="stylesheet">

</head>
<body>
	<div class="container-fluid">
		<div class="row"> 
			<div class="col-md-1 col-sm-1 sidebar" style="padding: 0px;">
				<ul id="main-nav" class="main-nav nav nav-stacked" style="padding-left: 10px;">
					<c:forEach items="${menu }" var="m">
						<c:if test="${!m.havanextlevel}">
							<li>
								<a target="con" href="<%=basePath%>${m.url}">${m.text }</a>
							</li>
						</c:if>
						<c:if test="${m.havanextlevel}">
							<li>
								<a href="#${m.quote }" class="nav-header collapsed" data-toggle="collapse" onclick="nextlayer(${m.id},'<%=basePath%>')">
									 ${m.text }<span class="pull-right glyphicon glyphicon-chevron-toggle"></span>
								</a>
								<ul id="${m.quote }" class="nav nav-list secondmenu collapse" style="height: 0px;">
									<li><a target="con" href="#"></a></li>
								</ul>
							</li>
						</c:if>
					</c:forEach>
				</ul>
			</div>
		</div>
	</div>
	
	<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="<%=basePath%>js/bootstrap.min.js"></script>
	<script src="<%=basePath%>js/jquery.date_input.pack.js"></script>
	<!-- Just to make our placeholder images work. Don't actually copy the next line! -->
	<!-- <script src="Dashboard_files/holder.htm"></script> -->
	<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
	<script src="<%=basePath%>js/ie10-viewport-bug-workaround.js"></script>
	
	<script type="text/javascript" src="<%=basePath%>myjs/navleft.js"></script>
</body>
</html>
