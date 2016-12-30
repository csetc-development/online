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

<title>ETC-客户管理-资源分配</title>
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!-- Bootstrap core CSS -->
<%-- <link href=" <%=basePath%>css/add_stu.css" rel="stylesheet" type="text/css"> --%>
<link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet">
<!-- page CSS -->
<link href="<%=basePath%>css/page.css" rel="stylesheet">
<link href="<%=basePath %>css/datePicker.css" rel="stylesheet" type="text/css" />
<!-- Custom styles for this template -->
<link href="<%=basePath%>css/dashboard.css" rel="stylesheet">
<link href="<%=basePath%>css/bootstrap-datetimepicker.min.css" rel="stylesheet">
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.0/bootstrap-table.min.css">
<link rel="stylesheet" href="<%=basePath%>css/consultation.css">

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
<script type="text/javascript" src="<%=basePath %>laydate/laydate.js"></script>

	
<body>
	<div id="distribution">
		<form id="Screenform" enctype="multipart/form-data" class="formcontrols">
			<div class="btn-group"> 
				<button id="btn_add" type="button" class="btn btn-xs btn-primary" onclick="allot()">
					<span class="glyphicon glyphicon-flag" aria-hidden="true">分配</span>
				</button>
				<button id="btn_delete" type="button"
					class="btn btn-xs btn-warning" onclick="updatecustomerinfo()">
					<span class="glyphicon glyphicon-edit" aria-hidden="true">修改</span>
				</button>
			</div>
			<select class="timeselect" name="remark">
				<option value="">日期</option>
				<option value="entrydate">登记日期</option>
				<option value="lastfollowtime">最近跟进</option>
				<option value="birthdate">出生日期</option>
			</select>
			<input placeholder="开始日期" class="laydate-icon" onclick="laydate()" id="startime" name="startime" size="10px">
			<input placeholder="结束日期" class="laydate-icon" onclick="laydate()" id="endtime" name="endtime" size="10px">
			<select class="sourceselect" name="source">
				<option value="">来源渠道</option>
			</select>
			<select class="channelselect" name="channel">
				<option value="">渠道明细</option>
			</select>
			<select class="validityselect" name="validityid">
				<option value="">有效性</option>
			</select>
			<select class="customertypeselect" name="ctypeid">
				<option value="">客户类型</option>
			</select>
			<select class="nowcoursepeopleselect" name="nowcoursepeople">
				<option value="">课程顾问</option>
			</select>
			<select class="customerlabelselect" name="clabelid">
				<option value="">标签</option>
			</select>
			<select class="intentionjobselect" name="intentionjob">
				<option value="">意向课程</option>
			</select>
		</form>
	</div>
	<table class="table table-striped">
		<tr>
			<td>
				<table id="distributiontable" data-toggle="table"
			           data-url="customer/allcustomerinfo.do?pagenum=1"
			           data-data-type="json"
			           data-show-columns="true"
			           data-search="true"
			           data-show-toggle="true"
			           data-pagination="true"
			           data-striped="true"
			           data-sort-stable="true"
			           data-minimum-count-columns="10"
			           data-id-field="cid"
			           data-unique-id="cid"
					   data-toolbar="#distribution" 
			           class="table table-striped" style="width:100%">
			        <thead>
			        <tr>
			            <th data-checkbox="true" data-width="1%"></th>
			            <th data-align="center" data-width="1.5%" data-field="cid" data-sortable="true" data-title-tooltip="编号">编号</th>
			            <th data-width="2%" data-field="name" data-sortable="true" data-title-tooltip="姓名">姓名</th>
			            <th data-width="1.5%" data-field="sex" data-sortable="true" data-title-tooltip="性别">性别</th>
			            <th data-width="2%" data-field="tel" data-sortable="true" data-title-tooltip="电话">电话</th>
			            <th data-width="2.5%" data-field="email" data-sortable="true" data-title-tooltip="qq/邮箱">qq/邮箱</th>
			            <th data-width="2%" data-field="school" data-sortable="true" data-title-tooltip="学校">学校</th>
			            <th data-width="2%" data-field="major" data-sortable="true" data-title-tooltip="专业 ">专业</th>
			            <th data-width="2%" data-field="education" data-sortable="true" data-title-tooltip="学历">学历</th>
			            <th data-width="2%" data-field="market" data-sortable="true" data-title-tooltip="市场专员">市场专员</th>
			            <th data-width="2%" data-field="source" data-sortable="true" data-title-tooltip="来源渠道">来源渠道</th>
			            <th data-width="3%" data-field="channel" data-sortable="true" data-title-tooltip="渠道明细">渠道明细</th>
			            <th data-width="3%" data-field="intentionjob" data-sortable="true" data-title-tooltip="意向课程">意向课程</th>
			            <th data-width="2%" data-field="registrant" data-sortable="true" data-title-tooltip="登记人">登记人 </th>
			            <th data-width="3%" data-field="entrydate" data-sortable="true" data-title-tooltip="登记时间">登记时间</th>
			            <th data-width="2%" data-field="workexperience" data-sortable="true" data-title-tooltip="工作经历">工作经历</th>
			            <th data-width="3%" data-field="birthdate" data-sortable="true" data-title-tooltip="生日">生日</th>
			            <th data-width="3%" data-field="residence" data-sortable="true" data-title-tooltip="户口">户口</th>
			            <th data-width="3%" data-field="domicile" data-sortable="true" data-title-tooltip="现居地">现居地</th>
			            <th data-width="3%" data-field="politics" data-sortable="true" data-title-tooltip="政治面貌">政治面貌</th>
			            <th data-width="3%" data-field="nation" data-sortable="true" data-title-tooltip="民族">民族</th>
			            <th data-width="3%" data-field="marriage" data-sortable="true" data-title-tooltip="婚育">婚育</th>
			            <th data-width="3%" data-field="worklife" data-sortable="true" data-title-tooltip="工作年限">工作年限</th>
			            <th data-width="3%" data-field="workplace" data-sortable="true" data-title-tooltip="期望工作地点">期望工作地点</th>
			            <th data-width="3%" data-field="salary" data-sortable="true" data-title-tooltip="期望薪水">期望薪水</th>
			            <th data-width="3%" data-field="remark" data-sortable="true" data-title-tooltip="备注">备注</th>
			            <th data-width="2%" data-field="distribution" data-sortable="true" data-title-tooltip="分配">分配人</th>
			            <th data-width="3%" data-field="signletimr" data-sortable="true" data-title-tooltip="分单时间">分单时间</th>
			            <th data-width="3%" data-field="collectiontime" data-sortable="true" data-title-tooltip="采集时间">采集时间</th>
			            <th data-width="3%" data-field="follownum" data-sortable="true" data-title-tooltip="跟进次数">跟进次数</th>
			            <th data-width="3%" data-field="lastfollowtime" data-sortable="true" data-title-tooltip="最后跟进时间">最后跟进时间</th>
			            <th data-width="3%" data-field="lastfollowup" data-sortable="true" data-title-tooltip="最后跟进人">最后跟进人</th>
			            <th data-width="2%" data-field="nowcoursepeople" data-sortable="true" data-title-tooltip="现课程顾问">现课程顾问</th>
			            <th data-width="2%" data-field="oldcoursepeople" data-sortable="true" data-title-tooltip="原课程顾问">原课程顾问</th>
			        </tr>
			        </thead>
			    </table>
			</td>
		</tr>
	</table>
	  
    <div class="modal" id="distributionModal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title">客户分配</h4>
				</div>
				<div class="modal-body">
					跟进负责人：<select id="disributionSelect"></select>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" onclick="dismodalsubmit()">分配</button>
				</div>
			</div>
		</div>
	</div>
	<div id="errormsg"></div>
    <div class="modal" id="updatecustomerModal">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title">客户修改</h4>
				</div>
				<form id="updatecustomerform" class="form-horizontal" enctype="multipart/form-data">
				<input type="hidden" name="cid">
				<div class="modal-body">
					<div class="form-group">
						<span class="col-md-2 control-label">姓名：</span>
						<div class="col-md-3">
							<input class="input-sm form-control" name="name" type="text" required="required">
						</div>
						<span class="col-md-2 control-label">性别：</span>
						<div class="col-md-3">
							<input type="radio" value="男" name="sex" id="male" /><label for="male">男</label> 
							<input type="radio" value="女" name="sex" id="female" /><label for="female">女</label>
						</div>
					</div>
					<div class="form-group">
						<span class="col-md-2 control-label">手机：</span>
						<div class="col-md-3">
							<input class="input-sm form-control" name="tel"type="text" required="required">
						</div>
						<span class="col-md-2 control-label">邮箱：</span>
						<div class="col-md-3">
							<input class="input-sm form-control" name="email" maxlength="8" type="text" required="required">
						</div>
					</div>
					<div class="form-group">
						<span class="col-md-2 control-label">客户类型：</span>
						<div class="col-md-3">
							<input class="input-sm form-control" name="ctypeid" type="text" required="required">
						</div>
						<span class="col-md-2 control-label">来源渠道：</span>
						<div class="col-md-3">
							<input class="input-sm form-control" name="source" maxlength="8" type="text" required="required">
						</div>
					</div>
					<div class="form-group">
						<span class="col-md-2 control-label">渠道明细：</span>
						<div class="col-md-3">
							<input class="input-sm form-control" name="channel" type="text" required="required">
						</div>
						<span class="col-md-2 control-label">采集人：</span>
						<div class="col-md-3">
							<input class="input-sm form-control" name="market" maxlength="8" type="text" required="required">
						</div>
					</div>
					<div class="form-group">
						<span class="col-md-2 control-label">意向课程：</span>
						<div class="col-md-3">
							<input class="input-sm form-control" name="intentionjob" type="text" required="required">
						</div>
					</div>
					<div>
						<div class="form-group">
							<span class="col-md-2 control-label">学校：</span>
							<div class="col-md-3">
								<input class="input-sm form-control" name="school" type="text" required="required">
							</div>
						</div>
						<div class="form-group">
							<span class="col-md-2 control-label">学历：</span>
							<div class="col-md-3">
								<input class="input-sm form-control" name="education" type="text" required="required">
							</div>
							<span class="col-md-2 control-label">专业：</span>
							<div class="col-md-3">
								<input class="input-sm form-control" name="major" type="text" required="required">
							</div>
						</div>
					</div>
					<div class="form-group">
						<span class="col-md-2 control-label">备注：</span>
						<div class="col-md-3">
							<input class="input-sm form-control" name="remark" type="text">
						</div>
					</div>
					
				</div>
				</form>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button class="btn btn-primary" onclick="updatecustomersubmit()">修改</button>
				</div>
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
	<!-- Latest compiled and minified JavaScript -->
	<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.0/bootstrap-table.min.js"></script>
	<!-- Latest compiled and minified Locales -->
	<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.0/locale/bootstrap-table-zh-CN.min.js"></script>
	<script type="text/javascript" src="<%=basePath%>myjs/allocation.js"></script>
</body>
</html>
	