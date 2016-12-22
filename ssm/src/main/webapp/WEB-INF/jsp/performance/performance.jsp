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

<title>ETC-销售绩效</title>
<!-- Bootstrap core CSS -->
<%-- <link href=" <%=basePath%>css/add_stu.css" rel="stylesheet" type="text/css"> --%>
<link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet">
<!-- page CSS -->
<link href="<%=basePath%>css/page.css" rel="stylesheet">

<!-- Custom styles for this template -->
<link href="<%=basePath%>css/dashboard.css" rel="stylesheet">
<link href="<%=basePath%>css/bootstrap-datetimepicker.min.css" rel="stylesheet">


<!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
<!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
<script src="<%=basePath%>js/ie-emulation-modes-warning.js"></script>

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
  <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
  <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
<script type="text/javascript" src="<%=basePath%>js/jquery.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/moment-with-locales.min.js"></script>
<script type="text/javascript" src="<%=basePath %>laydate/laydate.js"></script>
</head>

<body>
	<input value="${salesignpages }" id="saleperformance" type="hidden">
	<input value="${refundsignpages }" id="refundperformance" type="hidden">
	<div class="container-fluid" style="height:20px;">
		<div class="row-fluid">
			<div class="col-md-1">
				<select id="selectdateP">
					<option value="thismonth">本月 </option>
					<option value="lastmonth">上月 </option>
					<option value="today">今日 </option>
					<option value="thisweek">本周</option>
					<option value="thisseason">本季</option>
					<option value="thisyear">今年</option>
				</select>
			</div>
			<div class="col-md-1">
				<div class="text-left">
					<input type="text" name="sale" placeholder="销售姓名" size="5">
				</div>
			</div>
			<div class="col-md-5" >
				<input placeholder="开始日期" class="laydate-icon" onclick="laydate()" id="startime" size="8px" name="stime">
				<input placeholder="结束日期" class="laydate-icon" onclick="laydate()" id="endtime" size="8px" name="sremark">
				<input class="btn btn-primary btn-xs" type="button" style="margin-left: 2px; line-height: 1.2;font-size: 13px;margin-bottom: 3px; padding: 2px 5px;" onclick="selectbyall()" value="确定" />
			</div>
		</div>
	</div>
	<div class="container" style="height:20px;"></div>
	<div class="container-fluid">
		<div class="row-fluid">
			<div class="col-lg-6 col-md-6 col-xs-12 col-sm-12">
				<table class="table table-striped table-hover table-responsive table-bordered" id="inperformancetable">
					<thead>
						<tr>
							<th colspan="4" style="font-size: 24px;text-align:center;vertical-align:middle; font-weight: bold;">各销售签单人数统计</th>
						</tr>
						<tr class="active">
							<th>销售</th>
							<th>签单金额</th>
							<th>收款金额</th>
							<th>签单人数</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${salesign }" var="signed">
							<tr>
							<td><a>${signed.sale}</a></td>
							<td>${signed.spacefee}</td>
							<td>${signed.backfee}</td>
							<td>${signed.speoplenum}</td>
							</tr>
						</c:forEach>
					</tbody>
				</table>
				<!-- 分页按钮  -->
				<div class="container">
					<div class="row">
						<div id="comeinperformance"
							class="tcdPageCode sign col-xs-12 col-sm-6 col-md-8 col-lg-6 col-sm-offset-3 col-md-offset-2 col-lg-offset-3">
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-6 col-md-6 col-xs-12 col-sm-12">
				<table class="table table-striped table-hover table-responsive table-bordered" id="outperformancetable">
					<thead>
						<tr>
							<th colspan="4" style="font-size: 24px;text-align:center;vertical-align:middle; font-weight: bold;">各销售退学人数统计</th>
						</tr>
						<tr class="active">
							<th>销售</th>
							<th>签单金额</th>
							<th>退款金额</th>
							<th>退学人数</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${refundsign }" var="signed">
							<tr>
							<td><a>${signed.sale}</a></td>
							<td>${signed.studyfee}</td>
							<td>${signed.depositfee}</td>
							<td>${signed.speoplenum}</td>
							</tr>
						</c:forEach>
					</tbody>
				</table>
				<!-- 分页按钮  -->
				<div class="container">
					<div class="row">
						<div id="outperformance"
							class="tcdPageCode sign col-xs-12 col-sm-6 col-md-8 col-lg-6 col-sm-offset-3 col-md-offset-2 col-lg-offset-3">
						</div>
					</div>
				</div>
			</div>
		</div>
</div>
	
	<div class="modal" id="ponesalesigned">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title text-center"></h4>
				</div>
				<div  class="modal-body">
				   	<table class="table table-striped table-hover table-responsive table-bordered" id="ponesalesignstable">
						<thead>
							<tr>
								<th>编号</th>
								<th>姓名</th>
								<th>签单时间</th>
								<th>学费</th>
								<th>住宿费</th>
								<th>返款</th>
								<th>定金</th>
								<th>总计</th>
								<th>退款时间</th>
								<th>金额</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal" id="ponesalerefund">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title text-center"></h4>
				</div>
				<div  class="modal-body">
				   	<table class="table table-striped table-hover table-responsive table-bordered" id="ponesalerefundtable">
						<thead>
							<tr>
								<th>编号</th>
								<th>姓名</th>
								<th>签单时间</th>
								<th>学费</th>
								<th>住宿费</th>
								<th>返款</th>
								<th>定金</th>
								<th>总计</th>
								<th>最后收款时间</th>
								<th>收款</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	<!-- Bootstrap core JavaScript  ================================================== -->
	<!-- Placed at the end of the document so the pages load faster -->
	<script src="<%=basePath%>js/bootstrap.js"></script>
	<script src="<%=basePath %>js/jquery.date_input.pack.js"></script>
	<!-- Just to make our placeholder images work. Don't actually copy the next line! -->
	<!-- <script src="Dashboard_files/holder.htm"></script> -->
	<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
	<script src="<%=basePath%>js/ie10-viewport-bug-workaround.js"></script>
	<script src="<%=basePath%>js/page.js"></script>
	<script src="<%=basePath%>myjs/performance.js"></script>
</body>
</html>
	