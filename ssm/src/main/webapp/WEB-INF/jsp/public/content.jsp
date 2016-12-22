<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
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
	<div class="container" style="height:20px;">
		<div class="row">
			<div class="col-md-1">
				<select id="selectdate">
					<option value="thismonth">本月 </option>
					<option value="lastmonth">上月 </option>
					<option value="today">今日 </option>
					<option value="thisweek">本周</option>
					<option value="thisseason">本季</option>
					<option value="thisyear">今年</option>
				</select>
			</div>
			<div class="col-md-5" >
				<input placeholder="开始日期" class="laydate-icon" onclick="laydate()" id="startime" size="8px">
				<input placeholder="结束日期" class="laydate-icon" onclick="laydate()" id="endtime" size="8px">
				<input class="btn btn-primary btn-xs" type="button" style="margin-left: 2px; line-height: 1.2;font-size: 13px;margin-bottom: 3px; padding: 2px 5px;" onclick="timeselect()" value="确定" />
			</div>
		</div>
	</div>
	
	<div class="container" style="height:20px;"></div>
	<div class="container" id="echartsmain" style="width: 85%;height:600px;"></div>
	
	<div class="container" id="DepyCollections" style="width: 75%;height:80px;"></div>
	<div class="container" id="AmountCollections" style="display: none;width: 75%;height:80%;"></div> 
	
	<div class="modal" id="onesalesigned">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title text-center"></h4>
				</div>
				<div  class="modal-body">
				   	<table class="table table-striped table-hover table-responsive table-bordered" id="onesalesignstable">
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
	<script src="<%=basePath %>js/bootstrap.js"></script>
	<script src="<%=basePath %>js/jquery.date_input.pack.js"></script>
	<!-- Just to make our placeholder images work. Don't actually copy the next line! -->
	<!-- <script src="Dashboard_files/holder.htm"></script> -->
	<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
	<script src="<%=basePath %>js/ie10-viewport-bug-workaround.js"></script>
	<script type="text/javascript" src="<%=basePath %>myjs/content.js"></script>
	
	<script src="<%=basePath %>js/bootstrap.js"></script>
</body>
</html>
