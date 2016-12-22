<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"
	isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html>
<html>
<head>
<base href="<%=basePath%>">

<title>ETC-客户管理</title>
<!-- Bootstrap core CSS -->
<%-- <link href=" <%=basePath%>css/add_stu.css" rel="stylesheet" type="text/css"> --%>
<link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet">
<!-- page CSS -->
<link href="<%=basePath%>css/page.css" rel="stylesheet">

<!-- Custom styles for this template -->
<link href="<%=basePath%>css/dashboard.css" rel="stylesheet">
<link href="<%=basePath%>css/bootstrap-datetimepicker.min.css"
	rel="stylesheet">


<!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
<!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
<script src="<%=basePath%>js/ie-emulation-modes-warning.js"></script>

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
  <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
  <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
<script type="text/javascript" src="<%=basePath%>js/jquery.min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>js/moment-with-locales.min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>js/bootstrap-datetimepicker.min.js"></script>
</head>

<body>

	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-12">
				<div class="container" style="height:20px;"></div>
				<table
					class="table table-striped table-hover table-responsive table-bordered" id="customerinfotable">
					<thead>
						<tr>
							<td colspan="13">
								<div class="btn-group">
									<button id="btn_add" type="button" class="btn btn-xs btn-danger"  data-toggle="modal" data-target="#importTemplates">
										<span class="glyphicon glyphicon-arrow-down" aria-hidden="true">导入</span>
									</button>
									<button id="btn_add" type="button" class="btn btn-xs btn-primary" data-toggle="modal" data-target="#addonesign">
										<span class="glyphicon glyphicon-plus" aria-hidden="true">新增</span>
									</button>
									<button id="btn_delete" type="button"
										class="btn btn-xs btn-warning" onclick="delectsigninfo()">
										<span class="glyphicon glyphicon-remove" aria-hidden="true">删除</span>
									</button>
									<button id="btn_add" type="button"
										class="btn btn-xs btn-danger" onclick="BackModel()">
										<span class="glyphicon glyphicon-arrow-up" aria-hidden="true">返款</span>
									</button>
									<button id="btn_add" type="button"
										class="btn btn-xs  btn-success" onclick="ExitModel()">
										<span class="glyphicon glyphicon-arrow-up" aria-hidden="true">退款</span>
									</button>
								</div>
							</td>
							<td id="notpaymoney" colspan="2">
								
							</td>
						</tr>
						<tr class="active">
							<th style="width:30px;"><input type="checkbox" value="all" id="signedinfo"></th>
							<th>编号</th>
							<th>签单时间</th>
							<th>业务类型</th>
							<th>销售</th>
							<th>部门</th>
							<th>客户姓名</th>
							<th>学费</th>
							<th>住宿费</th>
							<th>补贴</th>
							<th>定金</th>
							<th>应缴</th>
							<th>实缴</th>
							<th>区域</th>
							<th>订单状态</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${signedinfo }" var="signed">
							<c:if test="${signed.condition=='已完成'}">
								<tr class="success">
							</c:if>
							<c:if test="${signed.condition=='未收款'}">
								<tr class="warning">
							</c:if>
							<c:if test="${signed.condition=='已收款'}">
								<tr class="info">
							</c:if>
							<c:if test="${signed.condition=='已删除'}">
								<tr class="danger">
							</c:if>
							<td><input type="checkbox" value="${signed.sid}" name="signed_checkbox"></td>
							<td>${signed.sid}</td>
							<td>${signed.stime}</td>
							<td>${signed.sbusinesstype}</td>
							<td>${signed.sale}</td>
							<td>${signed.dept}</td>
							<td>${signed.scustomername}</td>
							<td><fmt:formatNumber value="${signed.studyfee}" type="currency" /></td>
							<td><fmt:formatNumber value="${signed.spacefee}" type="currency" /></td>
							<td><fmt:formatNumber value="${signed.backfee}" type="currency" /></td>
							<td><fmt:formatNumber value="${signed.depositfee}" type="currency" /></td>
							<td><fmt:formatNumber value="${signed.studyfee+signed.spacefee+signed.backfee+signed.depositfee}" type="currency" /></td>
							<td><fmt:formatNumber value="${signed.stateid}" type="currency" /></td>
							<td>${signed.sarea}</td>
							<td>${signed.condition}</td>
							</tr>
						</c:forEach>
					</tbody>
				</table>
				<!-- 分页按钮  -->
				<div class="container">
					<div class="row">
						<div id="mysign"
							class="tcdPageCode sign col-xs-12 col-sm-6 col-md-8 col-lg-6 col-sm-offset-3 col-md-offset-2 col-lg-offset-3">
						</div>
					</div>
				</div>
			</div>
		</div>
</div>
	<div class="modal" id="importTemplates">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title">导入签单信息</h4>
				</div>
				<form action="signed/readExcel.do" enctype="multipart/form-data"
					method="post">
					<div class="modal-body">
						<input id="mFile" type="file" class="file" name="mFile">
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="submit" class="btn btn-primary">导入</button>
					</div>
				</form>
			</div>
		</div>
	</div>

	
	<!-- Bootstrap core JavaScript  ================================================== -->
	<!-- Placed at the end of the document so the pages load faster -->
	<script src="<%=basePath%>js/bootstrap.js"></script>
	<!-- Just to make our placeholder images work. Don't actually copy the next line! -->
	<!-- <script src="Dashboard_files/holder.htm"></script> -->
	<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
	<script src="<%=basePath%>js/ie10-viewport-bug-workaround.js"></script>
	<script src="<%=basePath%>js/page.js"></script>
</body>
</html>
	