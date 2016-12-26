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
<link href="<%=basePath%>css/bootstrap-datetimepicker.min.css" rel="stylesheet">
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.0/bootstrap-table.min.css">

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
<script type="text/javascript" src="<%=basePath%>js/bootstrap-datetimepicker.min.js"></script>
<style type="text/css">
	table{
		font-size: 12px;
	}
</style>
<body>
	<div id="distribution" class="btn-group"> 
		<button id="btn_add" type="button" class="btn btn-xs btn-primary">
			<span class="glyphicon glyphicon-flag" aria-hidden="true">分配</span>
		</button>
		<button id="btn_delete" type="button"
			class="btn btn-xs btn-warning" onclick="delectsigninfo()">
			<span class="glyphicon glyphicon-edit" aria-hidden="true">修改</span>
		</button>
	</div>
	  <table data-toggle="table"
           data-url="customer/allcustomerinfo.do?pagenum=1"
           data-data-type="json"
           data-show-columns="true"
           data-search="true"
           data-show-refresh="true"
           data-show-toggle="true"
           data-pagination="true"
           data-striped="true"
           data-sort-stable="true"
		   data-toolbar="#distribution" 
           class="table  table-striped" style="word-break:break-all; word-wrap:break-all;">
        <thead>
        <tr>
            <th data-checkbox="true" data-field="cid"></th>
            <th data-field="name" data-sortable="true">姓名</th>
            <th data-field="sex" data-sortable="true">性别</th>
            <th data-field="tel" data-sortable="true">电话</th>
            <th data-field="email" data-sortable="true">qq/邮箱</th>
            <th data-field="school" data-sortable="true">学校</th>
            <th data-field="major" data-sortable="true">专业</th>
            <th data-field="education" data-sortable="true">学历</th>
            <th data-field="market" data-sortable="true">市场专员</th>
            <th data-field="source" data-sortable="true">来源渠道</th>
            <th data-field="channel" data-sortable="true">渠道明细</th>
            <th data-field="intentionjob" data-sortable="true">意向课程</th>
            <th data-field="registrant" data-sortable="true">登记人 </th>
            <th data-field="entrydate" data-sortable="true">登记时间</th>
            <th data-field="workexperience" data-sortable="true">工作经历</th>
            <th data-field="birthdate" data-sortable="true">生日</th>
            <th data-field="residence" data-sortable="true">户口</th>
            <th data-field="domicile" data-sortable="true">现居地</th>
            <th data-field="politics" data-sortable="true">政治面貌</th>
            <th data-field="nation" data-sortable="true">民族</th>
            <th data-field="marriage" data-sortable="true">婚育</th>
            <th data-field="worklife" data-sortable="true">工作年限</th>
            <th data-field="workplace" data-sortable="true">期望工作地点</th>
            <th data-field="salary" data-sortable="true">期望薪水</th>
            <th data-field="remark" data-sortable="true">备注</th>
            <th data-field="distribution" data-sortable="true">分配人</th>
            <th data-field="signletimr" data-sortable="true">分单时间</th>
            <th data-field="collectiontime" data-sortable="true">采集时间</th>
            <th data-field="follownum" data-sortable="true">跟进次数</th>
            <th data-field="lastfollowtime" data-sortable="true">最后跟进时间</th>
            <th data-field="lastfollowup" data-sortable="true">最后跟进人</th>
            <th data-field="nowcoursepeople" data-sortable="true">现课程顾问</th>
            <th data-field="oldcoursepeople" data-sortable="true">原课程顾问</th>
        </tr>
        </thead>
    </table>
    
	<!-- Bootstrap core JavaScript  ================================================== -->
	<!-- Placed at the end of the document so the pages load faster -->
	<script src="<%=basePath%>js/bootstrap.js"></script>
	<!-- Just to make our placeholder images work. Don't actually copy the next line! -->
	<!-- <script src="Dashboard_files/holder.htm"></script> -->
	<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
	<script src="<%=basePath%>js/ie10-viewport-bug-workaround.js"></script>
	<script src="<%=basePath%>js/page.js"></script>
	<!-- Latest compiled and minified JavaScript -->
	<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.0/bootstrap-table.min.js"></script>
	<!-- Latest compiled and minified Locales -->
	<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.0/locale/bootstrap-table-zh-CN.min.js"></script>
	<script type="text/javascript" src="<%=basePath%>myjs/consultation.js"></script>

</body>
</html>
	