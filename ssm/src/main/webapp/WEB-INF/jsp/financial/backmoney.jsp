<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
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

<title>ETC-财务管理-返款</title>
<!-- Bootstrap core CSS -->
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
<!-- <script type="text/javascript" src="<%=basePath%>js/moment-with-locales.min.js"></script> -->
<!-- <script type="text/javascript" src="<%=basePath%>js/bootstrap-datetimepicker.min.js"></script> -->
<script type="text/javascript" src="<%=basePath%>myjs/financial.js"></script>
<script type="text/javascript" src="<%=basePath%>myjs/refund.js"></script>
</head>

<body>
	<input value="${pages }" id="pagecountF" type="hidden">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12">
				<div class="text_left">
					<a href="<%=basePath %>signed/backmoney.do" style="text-decoration:underline;">返款</a> | 
					<a href="<%=basePath %>signed/refund.do">退款</a> | 
					<a href="<%=basePath %>signed/tobeprint.do">检索</a> | 
				</div>
				<div class="container" style="height:20px;"></div>
				<table class="table table-striped table-hover table-responsive table-bordered" id="backinfotable">
					<thead>
						<tr>
						  <th>编号</th>
						  <th>申请日期</th>
						  <th>申请发起人</th>
						  <th>申请金额</th>
						  <th>申请状态</th>
						  <th>客户姓名</th>
						  <th>身份证号码</th>
						  <th>银行卡号码</th>
						  <th>备注</th>
						  <th>操作</th>
						</tr>
					  </thead>
					  <tbody>
					 	<c:forEach items="${backmoney }" var="signed">
					 	<tr data-toggle="tooltip" data-placement="bottom" data-original-title="${signed.dbremark}" >
						  <td>${signed.sid}</td>
						  <td>${signed.dbtime}</td>
						  <td>${signed.dbemp}</td>
						  <td><fmt:formatNumber value="${signed.dbamount}" type="currency"/></td>
						  <td>${signed.statu}</td>
						  <td>${signed.scustomername}</td>
						  <td>${signed.scustomercardid}</td>
						  <td>${signed.scustomerbankcardid}</td>
						  <td>${signed.dbremark}</td>
						  <td><a onclick="showoutModel(${signed.dbid})">返款</a></td>
						</tr>
					 	</c:forEach>
					</tbody>
				</table>
				<!-- 分页按钮  -->
				<div class="container">
					<div class="row" id="pagegroup">
					<div id="fankuan" class="tcdPageCode col-xs-12 col-sm-6 col-md-8 col-lg-6 col-sm-offset-3 col-md-offset-2 col-lg-offset-3"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
		

<div class="modal" id="backmoneyinfo" tabindex="-1" role="dialog" aria-labelledby="myModal" aria-hidden="true" >
  <div class="modal-dialog modal-md">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title"><b>返款</b></h4>
      </div>
      <!--    -->
      <form id="backmoneyform" action="signed/addoneiaer.do?ask=10&stateid=10" method="post" onsubmit="return identification()">
      	<input type="hidden" name="type" value="支出">
      	<input type="hidden" name="stateid" value="1">
      	<input type="hidden" name="dbid" value="1">
	      <div class="modal-body">
		      <div class="panel panel-default">
				  <div class="panel-heading">
				   <div class="container">
			      		<div class="row">
			      			<div class="col-sm-3">
			      				<span>日期：</span><input size="5" name="time" type="text" style="border-style:none; background:rgba(0,0,0,0)" readonly="readonly"></div>
			      			<div class="col-sm-4">
			      				<span>返款人：</span><input name="handler" type="text" style="border-style:none; background:rgba(0,0,0,0)" readonly="readonly">
			      			</div>
		      		 	</div>
	      		 	</div>
	      		  </div>
				  <div class="panel-body">
				    <div class="container">
			      		<div class="row">
			      			<div class="col-md-3">订单编号：<input size="9" type="text" name="sid" style="border-style:none;width:60px; background:rgba(0,0,0,0);" readonly="readonly"></div>
			      			<div class="col-md-8">申请发起人：<span></span></div>
			      		</div>
			      		<div class="row">
			      			<div class="col-md-3">客户姓名：<span></span></div>
			      			<div class="col-md-8">应返金额：<input name="amount" type="text" style="border-style:none; background:rgba(0,0,0,0);" readonly="readonly"></div>
			      		</div>
			      		<div class="row">
			      			<div class="col-md-3">身份证：<span></span></div>
							<div class="col-md-8">银行卡：<span></span></div>		      			
			      		</div>
			      		<div class="row">
			      			<div class="text-left">
			      				<div class="col-md-11">开户行：<span></span></div>
			      			</div>
			      		</div>
			      	</div>
			      	<div class="container">
			      		
			      		<div class="row">
			      			<div class="col-md-2">为此次返款说明：<textarea name="remark" rows="3" cols="" placeholder="填写本次所返款说明" required></textarea></div>
			      		</div>
			      	</div>
				  </div>
			  </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="submit" class="btn btn-primary">确定</button>
	      </div>
      </form>
    </div>
  </div>
</div>

	<%-- <%@ include file="../public/footer.jsp"%> --%>
	<!-- Bootstrap core JavaScript  ================================================== -->
	<!-- Placed at the end of the document so the pages load faster -->
	<script src="<%=basePath%>js/bootstrap.js"></script>
	<!-- Just to make our placeholder images work. Don't actually copy the next line! -->
	<!-- <script src="Dashboard_files/holder.htm"></script> -->
	<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
	<script src="<%=basePath%>js/ie10-viewport-bug-workaround.js"></script>
	<%-- <script type="text/javascript" src="<%=basePath%>myjs/customer.js"></script> --%>
	<script src="<%=basePath%>js/page.js"></script>
	<script src="<%=basePath%>js/move-model.js"></script>
	<script type="text/javascript">
		$(function () { $("tr").tooltip(); });
	</script>

</body>
</html>
						