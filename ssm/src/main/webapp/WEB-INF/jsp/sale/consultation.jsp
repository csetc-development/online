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

<title>ETC-客户管理-咨询客户</title>
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!-- Bootstrap core CSS -->
<%-- <link href=" <%=basePath%>css/add_stu.css" rel="stylesheet" type="text/css"> --%>
<link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet">
<!-- page CSS -->
<link href="<%=basePath%>css/page.css" rel="stylesheet">
<link href="<%=basePath %>css/datePicker.css" rel="stylesheet" type="text/css" />
<!-- Custom styles for this template -->
<link href="<%=basePath%>css/dashboard.css" rel="stylesheet">


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
<script type="text/javascript" src="<%=basePath %>laydate/laydate.js"></script>

	
<body>
	<!-- 表格中toolbar -->
	<div id="consulation">
		<form id="Screenform" enctype="multipart/form-data" class="formcontrols">
			<div class="text-left">
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
			</div>
			<div class="text-left">
				<div class="btn-group"> 
					<button id="btn_add" type="button" class="btn btn-xs btn-primary" onclick="register()">
						<span class="glyphicon glyphicon-plus" aria-hidden="true">登记</span>
					</button>
					<button id="btn_delete" type="button"
						class="btn btn-xs btn-warning" onclick="updatecustomerinfo('updatecustomerModalcon','consulationtable')">
						<span class="glyphicon glyphicon-edit" aria-hidden="true">修改</span>
					</button>
					<button id="btn_delete" type="button"
						class="btn btn-xs btn-success" onclick="followupmodal()">
						<span class=" glyphicon glyphicon-transfer" aria-hidden="true">跟进</span>
					</button>
					<button id="btn_delete" type="button"
						class="btn btn-xs btn-info" onclick="order()">
						<span class="glyphicon glyphicon-time" aria-hidden="true">预约</span>
					</button>
					<button id="btn_delete" type="button"
						class="btn btn-xs btn-danger" onclick="audition()">
						<span class=" glyphicon glyphicon-headphones" aria-hidden="true">试听</span>
					</button>
				</div>	
			</div>
		</form>
	</div><!-- toolbar结束 -->
	<!-- 客户表格信息 -->
	<table class="table table-striped">
		<tr>
			<td>
				<table id="consulationtable" data-toggle="table"
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
					   data-toolbar="#consulation" 
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
	</table><!-- 客户表格信息结束  -->
	
	<!-- 登记客户信息对话框 -->  
    <div class="modal" id="registerModal">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title">登记客户信息</h4>
				</div>
				<form id="insertcustomerform" class="form-horizontal" enctype="multipart/form-data">
				<input type="hidden" name="cid">
				<input type="hidden" name="lyqd">
				<input type="hidden" name="qdmx">
				<div class="modal-body">
					<div class="form-group">
						<span class="col-md-2 control-label">姓名：</span>
						<div class="col-md-3">
							<input class="input-sm form-control" name="name" type="text" required="required">
						</div>
						<span class="col-md-2 control-label">性别：</span>
						<div class="col-md-3">
							<input type="radio" value="男" name="sex" id="male" checked="checked"/><label for="male">男</label> 
							<input type="radio" value="女" name="sex" id="female" /><label for="female">女</label>
						</div>
					</div>
					<div class="form-group">
						<span class="col-md-2 control-label">手机：</span>
						<div class="col-md-3">
							<input class="input-sm form-control" maxlength="11" name="tel"type="text" required="required">
						</div>
						<span class="col-md-2 control-label">qq/邮箱：</span>
						<div class="col-md-3">
							<input class="input-sm form-control" name="email" maxlength="20" type="text" required="required">
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
						<span class="col-md-2 control-label">客户类型：</span>
						<div class="col-md-3">
							<select name="ctypeid">
								<option>请选择</option>
							</select>
						</div>
						<span class="col-md-2 control-label">来源渠道：</span>
						<div class="col-md-3">
							<select name="source">
								<option>请选择</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<span class="col-md-2 control-label">渠道明细：</span>
						<div class="col-md-3">
							<select name="channel">
								<option>请选择</option>
							</select>
						</div>
						<span class="col-md-2 control-label">采集人：</span>
						<div class="col-md-3">
							<select name="market">
								<option>请选择</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<span class="col-md-2 control-label">意向课程：</span>
						<div class="col-md-3">
							<select name="intentionjob">
								<option>请选择</option>
							</select>
						</div>
					</div>
					
					<div class="form-group">
						<span class="col-md-2 control-label">备注：</span>
						<div class="col-md-8">
							<textarea class="input-sm form-control" rows="3" cols="12" name="remark"></textarea>
						</div>
					</div>
					
				</div>
				
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" onclick="registersubmit()">登记</button>
				</div>
				</form>
			</div>
		</div>
	</div><!-- 登记客户信息对话框结束 -->
	
	<!-- 更新(修改)对话框    -->
	<div class="modal" id="updatecustomerModalcon">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title">客户修改</h4>
				</div>
				<form id="updatecustomerform" class="form-horizontal" enctype="multipart/form-data">
				<input type="hidden" name="cid">
				<input type="hidden" name="lyqd">
				<input type="hidden" name="qdmx">
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
						<span class="col-md-2 control-label">qq/邮箱：</span>
						<div class="col-md-3">
							<input class="input-sm form-control" name="email" maxlength="8" type="text" required="required">
						</div>
					</div>
					<div class="form-group">
						<span class="col-md-2 control-label">客户类型：</span>
						<div class="col-md-3">
							<select name="ctypeid"></select>
						</div>
						<span class="col-md-2 control-label">来源渠道：</span>
						<div class="col-md-3">
							<select name="source"></select>
						</div>
					</div>
					<div class="form-group">
						<span class="col-md-2 control-label">渠道明细：</span>
						<div class="col-md-3">
							<select name="channel"></select>
						</div>
						<span class="col-md-2 control-label">采集人：</span>
						<div class="col-md-3">
							<select name="market"></select>
						</div>
					</div>
					<div class="form-group">
						<span class="col-md-2 control-label">意向课程：</span>
						<div class="col-md-3">
							<select name="intentionjob"></select>
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
						<div class="col-md-8">
							<textarea class="input-sm form-control" rows="3" cols="12" name="remark"></textarea>
						</div>
					</div>
				</div>
				</form>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button class="btn btn-primary" onclick="updatecustomersubmit('updatecustomerform','updatecustomerModalcon')">修改</button>
				</div>
			</div>
		</div>
	</div><!-- 更新对话框结束 -->
	
	<!-- 客户跟进框  -->
	<div class="modal" id="followupModla">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title">跟进客户</h4>
				</div>
				<div class="modal-body">
					<div class="container-fluid">
						<div class="row-fluid">
							<div class="col-md-5" >
								<div class="panel panel-primary">
								  <div class="panel-heading">
								    <h3 class="panel-title">基本信息</h3>
								  </div>
								  <div class="panel-body">
								    <table class="table table-bordered" id="basicinformation">
								    	<tr>
								    		<td width="35%">编号</td>
								    		<td></td>
								    	</tr>
								    	<tr>
								    		<td>姓名</td>
								    		<td></td>
								    	</tr>
								    	<tr>
								    		<td>手机</td>
								    		<td></td>
								    	</tr>
								    	<tr>
								    		<td>现居地</td>
								    		<td></td>
								    	</tr>
								    	<tr>
								    		<td>渠道</td>
								    		<td></td>
								    	</tr>
								    	<tr>
								    		<td>备注</td>
								    		<td></td>
								    	</tr>
								    </table>
								  </div>
								</div>
							</div>
							<div class="col-md-7">
								<div class="panel panel-primary">
								  <div class="panel-heading">
								    <h3 class="panel-title">跟进客户</h3>
								  </div>
								  <div class="panel-body">
								  	<form id="followuocustomerform" enctype="application/x-www-form-urlencoded" class="form-horizontal">
								  		<input type="hidden" name="cid">
								  		<div class="form-group">
								  			<label class="col-md-3 col-md-offset-1">* 跟进时间</label>
								  			<span class="col-md-7"></span>
								  		</div>
								  		<div class="form-group">
								  			<label class="col-md-3 col-md-offset-1">* 有效性</label>
								  			<div class="col-md-7">
								  				<select id="yxx" name="validityid">
									    				<option></option>
									    			</select>
								  			</div>
								  		</div>
								  		<div class="form-group">
								  			<label class="col-md-3 col-md-offset-1">* 客户分类</label>
								  			<div class="col-md-7">
								  				<select id="khfl" name="ctypeid">
								    				<option></option>
								    			</select>
								  			</div>
								  		</div>
								  		<div class="form-group">
								  			<label class="col-md-3 col-md-offset-1">* 跟进内容</label>
								  			<div class="col-md-7">
								  				<textarea name="fcontent" class="form-control" rows="3"  cols="10" required="required"></textarea>
								  			</div>
								  		</div>
								  		<div class="form-group">
								  			<label class="col-md-3 col-md-offset-1">* 下次跟进</label>
								  			<div class="col-md-7">
								  				<input name="xcgjsj" id="xcgj" class="laydate-icon" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})" required="required">
								  			</div>
								  		</div>
								  		<div class="form-group">
								  			<label class="col-md-3 col-md-offset-1">* 提醒内容</label>
								  			<div class="col-md-7">
								  				<input name="fremind" class="input-sm form-control" type="text" required="required"/>
								  			</div>
								  		</div>
							  			<div class="col-md-5 col-md-offset-5">
							  				<input type="button" class="btn btn-primary" onclick="followupsubmits()" value="确定" />  
								    		<button class="btn btn-default" type="reset">重置</button>
							  			</div>
								  	</form>
								  </div>
								</div>
							</div>
							<div class="col-md-12">
								<div class="panel panel-primary">
								  <div class="panel-heading">
								    <h3 class="panel-title">跟进历史</h3>
								  </div>
								  <div class="panel-body">
								    <table class="table table-bordered" id="followhistory">
								    	<thead>
									    	<tr>
									    		<th width="60px">编号</th>
									    		<th>跟进内容</th>
									    		<th>提醒内容</th>
									    		<th>跟进人</th>
									    		<th>跟进时间</th>
									    		<th>下次跟进时间</th>
									    	</tr>
								    	</thead>
								    	<tbody>
								    	</tbody>
								    </table>
								  </div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div><!-- 客户跟进框结束  -->
	
	<!-- 预约客户模态框 -->
	<div class="modal" id="orderModal">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title">预约客户</h4>
				</div>
				<div class="modal-body">
				    <ul class="nav nav-pills">
				      <li class="active">
				        <a href="#tab1" data-toggle="tab">预约</a>
				      </li>
				      <li><a href="#tab2" data-toggle="tab">预约记录</a></li>
				    </ul>
				     <div class="tab-content">
					    <div class="tab-pane fade active in" id="tab1">
					      <form id="orderform" enctype="application/x-www-form-urlencoded" class="form-horizontal">
					      	<input type="hidden" name="cid">
					      	<div style="height: 20px;"></div>
					      	<div class="form-group">
					      		<label class="col-md-3 col-md-offset-2">* 预约目的：</label>
					      		<div class="col-md-7">
					      			<select name="bintent">
					      				<option>请选择</option>
					      			</select>
					      		</div>
					      	</div>
					      	<div class="form-group">
					      		<label class="col-md-3 col-md-offset-2">* 接待校区：</label>
					      		<div class="col-md-7">
					      			<select  name="baddress">
					      				<option>请选择</option>
					      			</select>
					      		</div>
					      	</div>
					      	<div class="form-group">
					      		<label class="col-md-3 col-md-offset-2">* 接待老师：</label>
					      		<div class="col-md-7">
					      			<select name="bteacher">
					      				<option>请选择</option>
					      			</select>
					      		</div>
					      	</div>
					      	<div class="form-group">
					      		<label class="col-md-3 col-md-offset-2">* 拟到达时间：</label>
					      		<div class="col-md-7">
					      			<input type="text" name="barritime" class="laydate-icon" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})" required="required">
					      		</div>
					      	</div>
					      	<div class="form-group">
					      		<label class="col-md-3 col-md-offset-2">* 沟通内容：</label>
					      		<div class="col-md-5">
					      			<textarea class="form-control" name="bcontents"></textarea>
					      		</div>
					      	</div>
					      	<div class="form-group">
					      		<div class=" col-md-offset-4">
					      			<button type="button" class="btn btn-primary" onclick="ordersubmits()">预约</button> 
									<button type="button" class="btn btn-default">重置</button>
					      		</div>
					      	</div>
					      </form>
					      <div id="ordermessage"></div>
					    </div>
					    <div class="tab-pane fade" id="tab2">
					      <div style="height: 20px;"></div>
					      <table class="table table-bordered" id="ordertable" >
					      	<thead>
						      	<tr>
						      		<th width="60px">编号</th>
						      		<th width="80px">预约目的</th>
						      		<th width="80px">接待校区</th>
						      		<th>接待老师</th>
						      		<th>沟通内容</th>
						      		<th>到访状态</th>
						      		<th>预约时间</th>
						      		<th>预约人</th>
						      		<th>拟到达时间</th>
						      		<th>实际到达时间</th>
						      	</tr>
					      	</thead>
					      	<tbody></tbody>
					      </table>
					    </div>
					 </div>
					 <div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					</div>
				</div>
			</div>
		</div>
	</div><!-- 预约客户模态框结束 -->
	
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
	<script type="text/javascript" src="<%=basePath %>myjs/allocation.js"></script>
</body>
</html>
	